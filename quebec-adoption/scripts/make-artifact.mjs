// Turns the single-file build (dist-single/index.html) into a body-only page for hosts that
// supply their own <!doctype>/<head>/<body> skeleton: keeps <title>, metas, inline <style> and
// the inline module <script>, drops the outer document tags.
// usage: node scripts/make-artifact.mjs [out=dist-single/le-fil-rouge.html]
import { readFileSync, writeFileSync } from 'node:fs'

const src = readFileSync(new URL('../dist-single/index.html', import.meta.url), 'utf8')
const out = process.argv[2] ?? new URL('../dist-single/le-fil-rouge.html', import.meta.url)

const pick = (re) => Array.from(src.matchAll(re)).map((m) => m[0])
const title = pick(/<title>[\s\S]*?<\/title>/g)[0] ?? '<title>Le fil rouge</title>'
const metas = pick(/<meta\s+name="(?:claude:viewport-fit-sides|description)"[^>]*>/g)
const styles = pick(/<style[^>]*>[\s\S]*?<\/style>/g)
const scripts = pick(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g)
const body = (src.match(/<body[^>]*>([\s\S]*?)<\/body>/) ?? [, ''])[1]
  .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '')
  .trim()

if (!scripts.length) throw new Error('no inline module script found; did the single-file build run?')

const page = [title, ...metas, ...styles, body, ...scripts].join('\n')
writeFileSync(out, page)
console.log(`wrote ${out} (${(page.length / 1024).toFixed(0)} KiB)`)
