import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

/* Rasterize public/icon.svg (the familiar mark) into the PNG sizes a PWA + iOS need. */
const svg = readFileSync(new URL('../public/icon.svg', import.meta.url))
const targets = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['maskable-512.png', 512],
]

for (const [name, size] of targets) {
  const out = fileURLToPath(new URL(`../public/${name}`, import.meta.url))
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out)
  console.log('wrote', name, `${size}x${size}`)
}
