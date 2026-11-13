/**
 * DUST: the disintegration effect ("Mr. Stark, I don't feel so good").
 *
 *   await disintegrate(el)   rasterises el, hides it, and blows it away as particles
 *   await assemble(el)       the reverse: particles fly in and settle into el, then el is shown
 *
 * How it works
 *   1. rasterize(): paints the element into an offscreen canvas ourselves (no html2canvas):
 *      backgrounds, borders, inset-shadow hairlines, SVG icons and every word of text at its exact
 *      DOM position, using the computed font/colour.
 *   2. Each 2×2 CSS-px cell with ink becomes a particle that keeps its colour.
 *   3. Particles leave in a jagged sweep (left → right by default), drift up-wind with turbulence
 *      and fade. Motion is a pure function of time, so assemble() just runs the clock backwards.
 *   4. Rendering writes straight into an ImageData buffer (fast enough for ~40k particles).
 */
import { motion, gsap } from './motion'

export interface DustOptions {
  /** where the wind blows */
  direction?: 'right' | 'left' | 'up'
  /** seconds the sweep takes to cross the element */
  sweep?: number
  /** particle size in CSS px */
  size?: number
  /** strength multiplier for drift distance */
  wind?: number
}

interface Raster {
  canvas: HTMLCanvasElement
  rect: DOMRect
  dpr: number
}

const TRANSPARENT = /rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)|transparent/

function stretchKeyword(pct: string): string {
  const v = parseFloat(pct) || 100
  const table: [number, string][] = [
    [50, 'ultra-condensed'],
    [62.5, 'extra-condensed'],
    [75, 'condensed'],
    [87.5, 'semi-condensed'],
    [100, 'normal'],
    [112.5, 'semi-expanded'],
    [125, 'expanded'],
  ]
  let best = table[4]
  for (const t of table) if (Math.abs(t[0] - v) < Math.abs(best[0] - v)) best = t
  return best[1]
}

function applyTransform(word: string, tt: string) {
  if (tt === 'uppercase') return word.toUpperCase()
  if (tt === 'lowercase') return word.toLowerCase()
  if (tt === 'capitalize') return word.charAt(0).toUpperCase() + word.slice(1)
  return word
}

async function drawSvg(ctx: CanvasRenderingContext2D, svg: SVGSVGElement, x: number, y: number, w: number, h: number) {
  const clone = svg.cloneNode(true) as SVGSVGElement
  const src = [svg, ...Array.from(svg.querySelectorAll('*'))]
  const dst = [clone, ...Array.from(clone.querySelectorAll('*'))]
  src.forEach((node, i) => {
    const cs = getComputedStyle(node as Element)
    const d = dst[i] as SVGElement
    d.setAttribute(
      'style',
      `fill:${cs.fill};stroke:${cs.stroke};stroke-width:${cs.strokeWidth};stroke-linecap:${cs.strokeLinecap};stroke-linejoin:${cs.strokeLinejoin};opacity:${cs.opacity};color:${cs.color}`,
    )
  })
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', String(w))
  clone.setAttribute('height', String(h))
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }))
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    ctx.drawImage(img, x, y, w, h)
  } catch {
    /* an icon that fails to decode is simply skipped */
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** Paint an element (and its subtree) into a canvas. `force` ignores visibility:hidden (for assemble). */
export async function rasterize(el: HTMLElement, force = false): Promise<Raster> {
  const rect = el.getBoundingClientRect()
  const area = rect.width * rect.height
  const dpr = Math.min(area > 280_000 ? 1 : 2, window.devicePixelRatio || 1)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.ceil(rect.width * dpr))
  canvas.height = Math.max(1, Math.ceil(rect.height * dpr))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.scale(dpr, dpr)
  const ox = rect.left
  const oy = rect.top

  const hidden = (cs: CSSStyleDeclaration) =>
    cs.display === 'none' || cs.opacity === '0' || (!force && cs.visibility === 'hidden')

  // 1) boxes: backgrounds, borders, inset hairlines
  const nodes = [el, ...Array.from(el.querySelectorAll<HTMLElement>('*'))]
  const svgs: SVGSVGElement[] = []
  for (const node of nodes) {
    if (node instanceof SVGSVGElement) {
      svgs.push(node)
      continue
    }
    if (!(node instanceof HTMLElement)) continue
    const cs = getComputedStyle(node)
    if (hidden(cs)) continue
    const r = node.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const x = r.left - ox
    const y = r.top - oy
    const rad = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, r.width / 2, r.height / 2)
    if (cs.backgroundColor && !TRANSPARENT.test(cs.backgroundColor)) {
      ctx.fillStyle = cs.backgroundColor
      ctx.beginPath()
      ctx.roundRect(x, y, r.width, r.height, rad)
      ctx.fill()
    }
    const bw = parseFloat(cs.borderTopWidth) || 0
    if (bw > 0 && cs.borderTopStyle !== 'none' && !TRANSPARENT.test(cs.borderTopColor)) {
      ctx.strokeStyle = cs.borderTopColor
      ctx.lineWidth = bw
      ctx.beginPath()
      ctx.roundRect(x + bw / 2, y + bw / 2, r.width - bw, r.height - bw, Math.max(0, rad - bw / 2))
      ctx.stroke()
    }
    const inset = cs.boxShadow.match(/(rgba?\([^)]+\)|#[0-9a-f]{3,8})\s+0px\s+0px\s+0px\s+([\d.]+)px\s+inset/i)
    if (inset) {
      const lw = parseFloat(inset[2])
      ctx.strokeStyle = inset[1]
      ctx.lineWidth = lw
      ctx.beginPath()
      ctx.roundRect(x + lw / 2, y + lw / 2, r.width - lw, r.height - lw, Math.max(0, rad - lw / 2))
      ctx.stroke()
    }
  }

  // 2) icons
  for (const svg of svgs) {
    const cs = getComputedStyle(svg)
    if (hidden(cs)) continue
    const r = svg.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    await drawSvg(ctx, svg, r.left - ox, r.top - oy, r.width, r.height)
  }

  // 3) text, word by word at its real position
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const range = document.createRange()
  let n: Node | null
  while ((n = walker.nextNode())) {
    const text = n.nodeValue ?? ''
    if (!text.trim()) continue
    const parent = n.parentElement
    if (!parent || parent.closest('svg')) continue
    const cs = getComputedStyle(parent)
    if (hidden(cs)) continue
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    try {
      ctx.fontStretch = stretchKeyword(cs.fontStretch) as CanvasFontStretch
    } catch {
      /* older engines */
    }
    try {
      ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing
    } catch {
      /* older engines */
    }
    ctx.fillStyle = cs.color
    ctx.textBaseline = 'alphabetic'
    const re = /\S+/g
    let m: RegExpExecArray | null
    while ((m = re.exec(text))) {
      range.setStart(n, m.index)
      range.setEnd(n, m.index + m[0].length)
      const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0)
      if (!rects.length) continue
      const pieces: [string, DOMRect][] =
        rects.length === 1
          ? [[m[0], rects[0]]]
          : Array.from(m[0]).flatMap((ch, i): [string, DOMRect][] => {
              range.setStart(n!, m!.index + i)
              range.setEnd(n!, m!.index + i + 1)
              const r = range.getBoundingClientRect()
              return r.width > 0 ? [[ch, r]] : []
            })
      for (const [word, r] of pieces) {
        const w = applyTransform(word, cs.textTransform)
        const mt = ctx.measureText(w)
        const asc = mt.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.8
        const desc = mt.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.2
        const baseline = r.top - oy + (r.height - (asc + desc)) / 2 + asc
        const sx = mt.width > 0 ? r.width / mt.width : 1
        ctx.save()
        ctx.translate(r.left - ox, 0)
        if (sx > 0.6 && sx < 1.4) ctx.scale(sx, 1)
        ctx.fillText(w, 0, baseline)
        ctx.restore()
      }
    }
  }
  return { canvas, rect, dpr }
}

/* ------------------------------------------------------------------ particle system */

interface System {
  play(reverse: boolean): Promise<void>
  destroy(): void
}

const PAD = { left: 60, right: 460, top: 340, bottom: 90 }

function buildSystem(r: Raster, opts: DustOptions): System {
  const { canvas: src, rect, dpr } = r
  const sweep = opts.sweep ?? 0.9
  const size = opts.size ?? 2
  const wind = opts.wind ?? 1
  const dir = opts.direction ?? 'right'
  const sw = src.width
  const sh = src.height
  const data = src.getContext('2d')!.getImageData(0, 0, sw, sh).data

  let step = Math.max(1, Math.round(size * dpr))
  // keep the particle budget sane on big elements
  while ((sw / step) * (sh / step) > 48_000) step++

  const xs: number[] = []
  const ys: number[] = []
  const cols: number[] = []
  const alphas: number[] = []
  for (let y = 0; y < sh; y += step) {
    for (let x = 0; x < sw; x += step) {
      const i = (Math.min(sh - 1, y + (step >> 1)) * sw + Math.min(sw - 1, x + (step >> 1))) * 4
      const a = data[i + 3]
      if (a < 24) continue
      xs.push(x)
      ys.push(y)
      cols.push((data[i + 2] << 16) | (data[i + 1] << 8) | data[i])
      alphas.push(a)
    }
  }
  const count = xs.length
  const pl = PAD.left * dpr
  const pt = PAD.top * dpr
  const W = sw + pl + PAD.right * dpr
  const H = sh + pt + PAD.bottom * dpr

  // per-particle constants
  const delay = new Float32Array(count)
  const life = new Float32Array(count)
  const vx = new Float32Array(count)
  const vy = new Float32Array(count)
  const amp = new Float32Array(count)
  const freq = new Float32Array(count)
  const phase = new Float32Array(count)
  const base = dir === 'up' ? -Math.PI / 2 : dir === 'left' ? Math.PI + 0.45 : -0.45
  let maxEnd = 0
  for (let i = 0; i < count; i++) {
    const nx = xs[i] / sw
    const ny = ys[i] / sh
    const front = dir === 'left' ? 1 - nx : dir === 'up' ? 1 - ny : nx
    // jagged sweep front: blend of position, banded noise and pure jitter
    const band = Math.sin(ny * 17.3 + nx * 3.1) * 0.06 + Math.sin(ny * 43.7) * 0.03
    delay[i] = Math.max(0, front * sweep + band * sweep + Math.random() * 0.22)
    life[i] = 0.75 + Math.random() * 0.95
    const ang = base + (Math.random() - 0.5) * 1.15
    const spd = (38 + Math.random() * 170) * dpr * wind
    vx[i] = Math.cos(ang) * spd
    vy[i] = Math.sin(ang) * spd
    amp[i] = (8 + Math.random() * 30) * dpr
    freq[i] = 2 + Math.random() * 3.5
    phase[i] = Math.random() * Math.PI * 2
    maxEnd = Math.max(maxEnd, delay[i] + life[i])
  }

  const out = document.createElement('canvas')
  out.className = 'dust-canvas'
  out.width = Math.ceil(W)
  out.height = Math.ceil(H)
  out.style.position = 'absolute'
  out.style.left = `${rect.left + window.scrollX - PAD.left}px`
  out.style.top = `${rect.top + window.scrollY - PAD.top}px`
  out.style.width = `${W / dpr}px`
  out.style.height = `${H / dpr}px`
  out.setAttribute('aria-hidden', 'true')
  document.body.appendChild(out)
  const octx = out.getContext('2d')!
  const img = octx.createImageData(out.width, out.height)
  const buf = new Uint32Array(img.data.buffer)
  const OW = out.width
  const OH = out.height

  const frame = (t: number) => {
    buf.fill(0)
    for (let i = 0; i < count; i++) {
      const tt = t - delay[i]
      let px: number
      let py: number
      let a = alphas[i]
      let s = step
      if (tt <= 0) {
        px = xs[i] + pl
        py = ys[i] + pt
      } else {
        const k = tt / life[i]
        if (k >= 1) continue
        const fade = 1 - k * k * (3 - 2 * k)
        a = a * fade
        const acc = 1 + tt * 0.85
        px = xs[i] + pl + vx[i] * tt * acc + Math.sin(freq[i] * tt + phase[i]) * amp[i] * tt
        py = ys[i] + pt + vy[i] * tt * acc + Math.cos(freq[i] * 1.3 * tt + phase[i]) * amp[i] * tt
        if (k > 0.35) s = Math.max(1, step - 1)
      }
      px |= 0
      py |= 0
      if (px < 0 || py < 0 || px + s >= OW || py + s >= OH) continue
      const c = cols[i] | ((a & 255) << 24)
      for (let yy = 0; yy < s; yy++) {
        const row = (py + yy) * OW + px
        for (let xx = 0; xx < s; xx++) buf[row + xx] = c
      }
    }
    octx.putImageData(img, 0, 0)
  }

  let raf = 0
  return {
    play(reverse) {
      return new Promise<void>((resolve) => {
        const total = maxEnd
        const start = performance.now()
        const tick = (now: number) => {
          const e = (now - start) / 1000
          const t = reverse ? Math.max(0, total - e * 1.15) : e
          frame(t)
          if ((!reverse && t >= total) || (reverse && t <= 0)) {
            resolve()
            return
          }
          raf = requestAnimationFrame(tick)
        }
        frame(reverse ? total : 0)
        raf = requestAnimationFrame(tick)
      })
    },
    destroy() {
      cancelAnimationFrame(raf)
      out.remove()
    },
  }
}

/** Blow an element away into dust. Leaves it with visibility:hidden (layout is preserved). */
export async function disintegrate(el: HTMLElement, opts: DustOptions = {}): Promise<void> {
  if (motion.reduced) {
    await gsap.to(el, { autoAlpha: 0, duration: 0.35 })
    return
  }
  const raster = await rasterize(el)
  const sys = buildSystem(raster, opts)
  el.style.visibility = 'hidden'
  await sys.play(false)
  sys.destroy()
}

/** Particles fly in and settle into the element, which is then shown. */
export async function assemble(el: HTMLElement, opts: DustOptions = {}): Promise<void> {
  if (motion.reduced) {
    gsap.set(el, { visibility: 'visible', opacity: 0 })
    await gsap.to(el, { autoAlpha: 1, duration: 0.35 })
    return
  }
  el.style.visibility = 'hidden'
  const raster = await rasterize(el, true)
  const sys = buildSystem(raster, { sweep: 0.7, ...opts })
  await sys.play(true)
  el.style.visibility = ''
  // one frame of overlap so the hand-off is invisible
  requestAnimationFrame(() => sys.destroy())
}
