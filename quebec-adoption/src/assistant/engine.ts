/**
 * ENGINES behind the guide assistant, picked at run time:
 *   'claude'   inside a claude.ai artifact viewer: the page's `sample` capability (the visitor's own
 *              Claude account; the viewer asks them to allow it on first use)
 *   'endpoint' on the self-hosted site, when VITE_ASK_ENDPOINT points at assistant-worker/
 *   'local'    everywhere else: a fast keyword search of the guide (no AI)
 */
import type { Content, Lang } from '../content/types'
import { buildKB, type KB } from './kb'
import { indexKB, search, guessLang, chunksFor, type Index } from './search'
import { buildHead, buildTurns, type Turn } from './prompt'
import { fr } from '../content/fr'
import { en } from '../content/en'

export type Mode = 'claude' | 'endpoint' | 'local'

interface SampleTextUpdate {
  text: string
  delta: string
}
interface SampleTool {
  name: string
  description: string
  inputSchema?: Record<string, unknown>
  execute(input: Record<string, unknown>, ctx: { signal: AbortSignal }): unknown
}
interface SampleFn {
  (input: string | Turn[], options?: Record<string, unknown>): Promise<{ text: string; truncated: boolean }>
  limits(): Promise<{ maxPromptBytes: number; tools?: { maxCount: number } }>
}
declare global {
  interface Window {
    claude?: { use(name: string): Promise<unknown> }
  }
}

/* ---------------------------------------------------------------- knowledge (built once) */
let cache: { kb: Record<Lang, KB>; index: Index } | null = null
export function knowledge() {
  if (!cache) {
    const kb = { fr: buildKB(fr as Content), en: buildKB(en as Content) }
    cache = { kb, index: indexKB([kb.fr, kb.en]) }
  }
  return cache
}

/* ---------------------------------------------------------------- detection */
let samplePromise: Promise<SampleFn | null> | null = null
function getSample(): Promise<SampleFn | null> {
  if (!samplePromise) {
    samplePromise = window.claude?.use
      ? window.claude.use('sample').then((s) => (typeof s === 'function' ? (s as SampleFn) : null)).catch(() => null)
      : Promise.resolve(null)
  }
  return samplePromise
}

const ENDPOINT = (import.meta.env.VITE_ASK_ENDPOINT as string | undefined) || ''

/** Resolves the best engine available here. Never rejects. */
export async function detectMode(): Promise<Mode> {
  if (await getSample()) return 'claude'
  if (ENDPOINT) return 'endpoint'
  return 'local'
}

/* ---------------------------------------------------------------- errors */
export interface AskError {
  code: string
  /** what may stay on screen */
  text?: string
  /** this engine can't be used again in this view: switch to local search */
  fatal?: boolean
}
const FATAL = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed', 'session_expired'])

/* ---------------------------------------------------------------- asking */
export interface AskResult {
  text: string
  lang: Lang
  contextIds: string[]
  truncated?: boolean
}

export async function ask(opts: {
  mode: Mode
  question: string
  history: Turn[]
  siteLang: Lang
  signal: AbortSignal
  onText: (text: string) => void
}): Promise<AskResult> {
  const { mode, question, history, siteLang, signal, onText } = opts
  const k = knowledge()
  const lang = guessLang(question, siteLang)

  if (mode === 'local') {
    const text = localAnswer(question, lang)
    onText(text)
    return { text, lang, contextIds: [] }
  }

  if (mode === 'endpoint') {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lang, messages: [...history.slice(-6), { role: 'user', content: question }] }),
      signal,
    }).catch((e: unknown) => {
      throw { code: (e as Error)?.name === 'AbortError' ? 'cancelled' : 'upstream_error' } satisfies AskError
    })
    if (!res.ok || !res.body) throw { code: res.status === 429 ? 'rate_limited' : 'upstream_error' } satisfies AskError
    const reader = res.body.getReader()
    const dec = new TextDecoder()
    let text = ''
    try {
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        text += dec.decode(value, { stream: true })
        if (text.trim()) onText(text)
      }
    } catch (e) {
      throw { code: (e as Error)?.name === 'AbortError' ? 'cancelled' : 'upstream_error', text } satisfies AskError
    }
    if (!text.trim()) throw { code: 'empty_completion' } satisfies AskError
    return { text, lang, contextIds: [] }
  }

  // mode === 'claude'
  const sample = await getSample()
  if (!sample) throw { code: 'not_declared', fatal: true } satisfies AskError
  const answerKB = k.kb[lang]
  const { head, contextIds } = buildHead({ question, history, answerKB, index: k.index })
  const turns = buildTurns(head, history, question)
  const limits = await sample.limits().catch(() => null)
  const tools: SampleTool[] | undefined = limits?.tools
    ? [
        {
          name: 'read_guide',
          description:
            'Returns the full text of up to 8 places in the guide, by their ids from the GUIDE MAP. Use it only when the excerpts you were given do not cover the question.',
          inputSchema: {
            type: 'object',
            properties: { ids: { type: 'array', items: { type: 'string' }, maxItems: 8 } },
            required: ['ids'],
          },
          execute(input) {
            const ids = Array.isArray(input.ids) ? input.ids.map(String).slice(0, 8) : []
            const found = ids.map((id) => answerKB.byId.get(id)).filter(Boolean)
            if (!found.length) throw new Error('No such ids in the guide map.')
            return found.map((c) => `### [${c!.id}]\n${c!.text}`).join('\n\n')
          },
        },
      ]
    : undefined
  try {
    const res = await sample(turns, {
      signal,
      cache: false,
      modelTier: 'default',
      effort: 'low',
      onText: ({ text }: SampleTextUpdate) => onText(text),
      ...(tools ? { tools } : {}),
    })
    return { text: res.text, lang, contextIds, truncated: res.truncated }
  } catch (e) {
    const err = e as { code?: string; text?: string }
    const code = err?.code ?? 'upstream_error'
    throw { code, text: err?.text, fatal: FATAL.has(code) } satisfies AskError
  }
}

/* ---------------------------------------------------------------- local (no AI) */
export function localAnswer(question: string, lang: Lang): string {
  const k = knowledge()
  const kb = k.kb[lang]
  const hits = search(k.index, question, 12)
  const chunks = chunksFor(hits, kb)
  const fr = lang === 'fr'
  if (!chunks.length) {
    return fr
      ? "Je n'ai rien trouvé de précis dans le guide pour ces mots. Essayez d'autres mots (par exemple « consentement », « DPJ », « grands-parents »), ou parcourez les situations.\n→ [Votre situation](#go:section:paths)\n→ [Obtenir de l'aide](#go:help:emergency)"
      : 'I could not find anything specific in the guide for those words. Try other words (for example "consent", "DPJ", "grandparents"), or browse the situations.\n→ [Your situation](#go:section:paths)\n→ [Get help](#go:help:emergency)'
  }
  // prefer variety: at most 2 steps from the same scenario
  const per = new Map<string, number>()
  const top = chunks
    .filter((c) => {
      const key = c.kind === 'path' ? c.id.split('/').slice(0, 2).join('/') : c.id
      const n = (per.get(key) ?? 0) + 1
      per.set(key, n)
      return n <= 2
    })
    .slice(0, 4)
  const intro = fr ? 'Voici les passages du guide qui correspondent le mieux :' : 'Here are the parts of the guide that match best:'
  const items = top.map((c) => {
    const first = c.text.split('\n').slice(1).join(' ').split(/(?<=[.!?])\s/)[0] ?? ''
    return `- **${c.title}**${first ? ` — ${first}` : ''} [${fr ? 'Lire' : 'Read'}](#go:${c.id})`
  })
  return [intro, ...items].join('\n')
}
