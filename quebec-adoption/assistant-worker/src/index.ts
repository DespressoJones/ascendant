/**
 * Le fil rouge: assistant proxy (Cloudflare Worker).
 *
 * Lets the self-hosted site answer questions with Claude without exposing an API key.
 * The guide (rules + every verified passage) is bundled in guide.generated.json and sent as a
 * cached system prompt, so the visitor's browser only sends the short conversation.
 *
 *   POST /   { lang: "fr" | "en", messages: [{ role: "user" | "assistant", content: string }] }
 *   → 200 text/plain stream of the answer
 *
 * Secrets / vars (wrangler.toml + `wrangler secret put ANTHROPIC_API_KEY`):
 *   ANTHROPIC_API_KEY  required
 *   ALLOWED_ORIGIN     the site's origin, e.g. https://example.github.io (CORS)
 *   MODEL              optional, defaults to claude-opus-5-5
 */
import Anthropic from '@anthropic-ai/sdk'
import guide from './guide.generated.json'

interface Env {
  ANTHROPIC_API_KEY: string
  ALLOWED_ORIGIN?: string
  MODEL?: string
}

type Lang = 'fr' | 'en'
interface InTurn {
  role: 'user' | 'assistant'
  content: string
}

const LIMITS = { turns: 13, user: 1200, assistant: 4000, total: 24000 }

/* best-effort per-isolate rate limit; add a Cloudflare rate-limiting rule for real protection */
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 12
}

function cors(env: Env): Record<string, string> {
  return {
    'access-control-allow-origin': env.ALLOWED_ORIGIN || '*',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'origin',
  }
}

function bad(env: Env, status: number, msg: string) {
  return new Response(msg, { status, headers: { ...cors(env), 'content-type': 'text/plain; charset=utf-8' } })
}

/** Accept only a short, well-formed conversation that ends with the visitor's question. */
function validate(body: unknown): { lang: Lang; messages: InTurn[] } | null {
  if (!body || typeof body !== 'object') return null
  const { lang, messages } = body as { lang?: unknown; messages?: unknown }
  if (lang !== 'fr' && lang !== 'en') return null
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > LIMITS.turns) return null
  let total = 0
  const out: InTurn[] = []
  for (const m of messages) {
    if (!m || typeof m !== 'object') return null
    const { role, content } = m as { role?: unknown; content?: unknown }
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string' || !content.trim()) return null
    if (content.length > (role === 'user' ? LIMITS.user : LIMITS.assistant)) return null
    total += content.length
    out.push({ role, content })
  }
  if (total > LIMITS.total || out[0].role !== 'user' || out[out.length - 1].role !== 'user') return null
  return { lang, messages: out }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(env) })
    if (request.method !== 'POST') return bad(env, 405, 'POST only')
    if (env.ALLOWED_ORIGIN && request.headers.get('origin') !== env.ALLOWED_ORIGIN) return bad(env, 403, 'Origin not allowed')
    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
    if (limited(ip)) return bad(env, 429, 'Too many questions, try again in a minute')

    const parsed = validate(await request.json().catch(() => null))
    if (!parsed) return bad(env, 400, 'Invalid request')
    const g = guide[parsed.lang]

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })
    const stream = client.beta.messages.stream({
      model: env.MODEL || 'claude-opus-5-5',
      max_tokens: 8000,
      // short, grounded answers: low effort keeps them fast; adaptive thinking stays on
      output_config: { effort: 'low' },
      // if a safety classifier declines, the API retries on a suitable fallback model
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: [
        { type: 'text', text: g.rules },
        // the whole guide is identical for every visitor: cache it
        { type: 'text', text: g.guide, cache_control: { type: 'ephemeral', ttl: '1h' } },
      ],
      messages: parsed.messages,
    })

    const enc = new TextEncoder()
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(enc.encode(event.delta.text))
            }
          }
          const final = await stream.finalMessage()
          if (final.stop_reason === 'refusal') {
            controller.enqueue(
              enc.encode(
                parsed.lang === 'fr'
                  ? "\n\nJe ne peux pas répondre à cette question. Consultez la section Aide du guide."
                  : "\n\nI can't answer that question. Please see the guide's Help section.",
              ),
            )
          }
        } catch (err) {
          if (err instanceof Anthropic.RateLimitError) controller.enqueue(enc.encode('\n\n[rate_limited]'))
          else if (err instanceof Anthropic.APIError) controller.enqueue(enc.encode('\n\n[upstream_error]'))
          else controller.enqueue(enc.encode('\n\n[upstream_error]'))
        } finally {
          controller.close()
        }
      },
      cancel() {
        stream.abort()
      },
    })

    return new Response(body, {
      headers: { ...cors(env), 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    })
  },
}
