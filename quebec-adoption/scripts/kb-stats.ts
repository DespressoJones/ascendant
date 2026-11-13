import { fr } from '../src/content/fr/index'
import { en } from '../src/content/en/index'
import { buildKB, tocOf, fullText } from '../src/assistant/kb'
for (const c of [fr, en]) {
  const kb = buildKB(c)
  const kinds: Record<string, number> = {}
  for (const ch of kb.chunks) kinds[ch.kind] = (kinds[ch.kind] ?? 0) + 1
  const full = fullText(kb)
  console.log(c.lang, 'chunks', kb.chunks.length, JSON.stringify(kinds))
  console.log('  full bytes', Buffer.byteLength(full), 'toc bytes', Buffer.byteLength(tocOf(kb)), 'max chunk', Math.max(...kb.chunks.map((x) => x.text.length)))
}
