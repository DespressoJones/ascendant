# Le fil rouge — adoption et placement au Québec

An interactive, bilingual (FR/EN) guide that explains, in plain words, what happens when a child
needs placement or adoption in Québec: at the hospital, at home (youth protection), within the
family, adopting a child from here, from abroad, and after the adoption.

Independent information site. It is not a government site and does not replace legal advice.
Content checked November 13, 2026 against primary sources (Civil Code of Québec consolidation of
September 9, 2026, Youth Protection Act, the 2017–2025 reform statutes, Québec.ca, MSSS, RQAP,
CNESST, Revenu Québec, Éducaloi). Every factual statement carries a legal reference and/or source.

## Run

    npm install
    npm run dev            # http://localhost:5173
    npm run build          # static site in dist/ (served at /ascendant/quebec-adoption/ on Pages)
    npm run build:single   # one self-contained HTML file in dist-single/ (previews)

## How it's built

- Vite + TypeScript, no framework. GSAP (ScrollTrigger, SplitText, Flip) + Lenis smooth scroll.
- `src/content/types.ts` — the content contract. All words live in `src/content/{fr,en}/`, every
  source in `src/content/sources/*.ts` (merged by `src/content/sources.ts`).
- `src/sections/*.ts` — one module per section (`render()` builds DOM, `enhance()` adds motion);
  page order in `src/sections/registry.ts`; styles in `src/styles/sections/`.
- `src/core/` — motion core, the page-long red thread (`thread.ts`), the canvas "dust"
  disintegrate/assemble effect (`dust.ts`), reveals, cursor rope, micro-interactions.
- Light/dark themes from tokens (`src/styles/tokens.css`), `prefers-reduced-motion` respected
  everywhere, keyboard-operable tabs/accordions, no horizontal overflow at 360–1440 px.

Fonts (OFL): Bricolage Grotesque, Atkinson Hyperlegible Next, JetBrains Mono — see
`src/assets/fonts/LICENSE.md`.
