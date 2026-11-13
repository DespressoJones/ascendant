# Assistant proxy (optional)

The guide's "Ask the guide / Demandez au fil" assistant works in three places:

| Where the site runs | What answers | Setup |
|---|---|---|
| claude.ai artifact link | Claude, on the visitor's own Claude account (the page asks them once) | none |
| Self-hosted (GitHub Pages…) **with** this proxy | Claude, billed to your Anthropic API key | this folder |
| Self-hosted without the proxy | Built-in guide search (no AI) | none |

This folder is a tiny Cloudflare Worker that holds your API key and sends Claude the whole verified
guide as a cached system prompt (`claude-opus-5-5`, low effort, server-side refusal fallback enabled).
Visitors only send their short conversation; requests that are not a short guide conversation are
rejected, so the proxy can't be used as a general-purpose chatbot.

## Deploy

    cd quebec-adoption/assistant-worker
    npm install
    # set ALLOWED_ORIGIN in wrangler.toml to the site's origin, e.g. https://despressojones.github.io
    npx wrangler secret put ANTHROPIC_API_KEY
    npm run deploy            # regenerates src/guide.generated.json from the site content, then deploys

Then build the site with the proxy URL:

    cd quebec-adoption
    VITE_ASK_ENDPOINT=https://fil-rouge-assistant.<your-subdomain>.workers.dev npm run build

(For the GitHub Pages workflow, add `VITE_ASK_ENDPOINT` as an `env:` on the quebec-adoption build step.)

## Cost and limits

- The guide (~50k tokens) is cached for an hour, so each question mostly pays cache reads plus a short
  answer. Check real usage in the Anthropic Console before sharing widely.
- A best-effort limit of 12 questions per minute per visitor is built in; add a Cloudflare
  rate-limiting rule on the route for real protection.
- Re-deploy after any content change so the proxy answers from the current guide.
