// Builds the guide text the API proxy sends to Claude (rules + whole guide, per language).
// usage (from quebec-adoption/): npx tsx scripts/build-kb.ts
import { writeFileSync } from 'node:fs'
import { fr } from '../src/content/fr/index'
import { en } from '../src/content/en/index'
import { buildKB } from '../src/assistant/kb'
import { serverSystem } from '../src/assistant/prompt'

const out = {
  fr: serverSystem(buildKB(fr)),
  en: serverSystem(buildKB(en)),
  ids: { fr: buildKB(fr).chunks.map((c) => c.id), en: buildKB(en).chunks.map((c) => c.id) },
}
writeFileSync(
  new URL('../assistant-worker/src/guide.generated.json', import.meta.url),
  JSON.stringify(out),
)
console.log(`guide.generated.json: fr ${out.fr.guide.length} chars, en ${out.en.guide.length} chars`)
