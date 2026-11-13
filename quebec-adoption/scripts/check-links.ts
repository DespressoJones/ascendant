// usage: npx tsx scripts/check-links.ts <answer.txt> <fr|en>  → lists go-link ids and whether each exists
import { readFileSync } from 'node:fs'
import { fr } from '../src/content/fr/index'
import { en } from '../src/content/en/index'
import { buildKB } from '../src/assistant/kb'
const [file, lang = 'fr'] = process.argv.slice(2)
const kb = buildKB(lang === 'en' ? en : fr)
const text = readFileSync(file, 'utf8')
for (const m of text.matchAll(/\[([^\]]+)\]\(#go:([^)\s]+)\)/g)) {
  const ok = m[2].startsWith('section:') || kb.byId.has(m[2])
  console.log(`${ok ? 'OK     ' : 'MISSING'} ${m[2]}  (${m[1]})`)
}
