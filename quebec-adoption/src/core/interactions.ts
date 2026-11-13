/**
 * Small, reusable micro-interactions.
 *   initCursor()           fine-pointer only: a dot plus a short red "thread" rope that trails it
 *   magnetic(el)           element leans toward the pointer
 *   scrambleTo(el, text)   letters shuffle into new text (used for language changes, counters)
 *   tilt(el)               3D tilt toward the pointer
 *   toast(msg)             tiny confirmation pill
 *   copyText(text)         clipboard with a selection fallback
 */
import { gsap, motion, onTeardown } from './motion'
import { h } from './dom'

/* ------------------------------------------------------------------ cursor rope */
export function initCursor() {
  if (!motion.finePointer || motion.reduced) return
  const canvas = h('canvas.cursor-canvas', { 'aria-hidden': 'true' })
  const dot = h('div.cursor-dot', { 'aria-hidden': 'true', style: 'opacity:0' })
  document.body.append(canvas, dot)
  const ctx = canvas.getContext('2d')!
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const resize = () => {
    canvas.width = innerWidth * dpr
    canvas.height = innerHeight * dpr
    canvas.style.width = `${innerWidth}px`
    canvas.style.height = `${innerHeight}px`
  }
  resize()
  addEventListener('resize', resize)

  // verlet rope
  const N = 18
  const SEG = 7
  const pts = Array.from({ length: N }, () => ({ x: innerWidth / 2, y: innerHeight / 2, px: innerWidth / 2, py: innerHeight / 2 }))
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, seen: false }
  const xTo = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3.out' })
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3.out' })
  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    if (!mouse.seen) {
      mouse.seen = true
      dot.style.opacity = '1'
      pts.forEach((p) => {
        p.x = p.px = e.clientX
        p.y = p.py = e.clientY
      })
    }
    xTo(e.clientX)
    yTo(e.clientY)
  }
  const onOver = (e: PointerEvent) => {
    const t = (e.target as HTMLElement).closest('a, button, [role="tab"], input, label, [data-cursor]')
    dot.classList.toggle('is-hover', !!t)
  }
  addEventListener('pointermove', onMove, { passive: true })
  addEventListener('pointerover', onOver, { passive: true })

  const color = () => getComputedStyle(document.documentElement).getPropertyValue('--atoca').trim() || '#c62f45'
  let stroke = color()
  const mo = new MutationObserver(() => (stroke = color()))
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  const tick = () => {
    if (!mouse.seen) return
    pts[0].x = mouse.x
    pts[0].y = mouse.y
    for (let i = 1; i < N; i++) {
      const p = pts[i]
      const vx = (p.x - p.px) * 0.9
      const vy = (p.y - p.py) * 0.9
      p.px = p.x
      p.py = p.y
      p.x += vx
      p.y += vy + 0.35 // a little gravity so it hangs like thread
    }
    for (let k = 0; k < 4; k++) {
      pts[0].x = mouse.x
      pts[0].y = mouse.y
      for (let i = 1; i < N; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.hypot(dx, dy) || 1
        const diff = (dist - SEG) / dist
        if (i === 1) {
          b.x -= dx * diff
          b.y -= dy * diff
        } else {
          a.x += dx * diff * 0.5
          a.y += dy * diff * 0.5
          b.x -= dx * diff * 0.5
          b.y -= dy * diff * 0.5
        }
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < N - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2
      const my = (pts[i].y + pts[i + 1].y) / 2
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
    }
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.6
    ctx.lineCap = 'round'
    ctx.globalAlpha = 0.85
    ctx.stroke()
    ctx.globalAlpha = 1
  }
  gsap.ticker.add(tick)
  document.documentElement.classList.add('has-cursor')
}

/* ------------------------------------------------------------------ magnetic */
export function magnetic(el: HTMLElement, strength = 0.28) {
  if (!motion.finePointer || motion.reduced) return
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    xTo((e.clientX - (r.left + r.width / 2)) * strength)
    yTo((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    xTo(0)
    yTo(0)
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  onTeardown(() => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  })
}

/* ------------------------------------------------------------------ tilt */
export function tilt(el: HTMLElement, max = 6) {
  if (!motion.finePointer || motion.reduced) return
  gsap.set(el, { transformPerspective: 900 })
  const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
  const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    ry(nx * max * 2)
    rx(-ny * max * 2)
    el.style.setProperty('--mx', `${(nx + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(ny + 0.5) * 100}%`)
  }
  const leave = () => {
    rx(0)
    ry(0)
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  onTeardown(() => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  })
}

/* ------------------------------------------------------------------ scramble */
const GLYPHS = 'abcdefghijklmnopqrstuvwxyzéèàçôABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§'
export function scrambleTo(el: HTMLElement, text: string, duration = 0.7): Promise<void> {
  if (motion.reduced) {
    el.textContent = text
    return Promise.resolve()
  }
  const from = el.textContent ?? ''
  const len = Math.max(from.length, text.length)
  const state = { p: 0 }
  return new Promise((resolve) => {
    gsap.to(state, {
      p: 1,
      duration,
      ease: 'none',
      onUpdate: () => {
        let out = ''
        for (let i = 0; i < len; i++) {
          const settle = i / len
          if (state.p > settle + 0.25) out += text[i] ?? ''
          else if (state.p > settle) out += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          else out += from[i] ?? ''
        }
        el.textContent = out
      },
      onComplete: () => {
        el.textContent = text
        resolve()
      },
    })
  })
}

/* ------------------------------------------------------------------ toast */
let toastEl: HTMLElement | null = null
let toastTimer = 0
export function toast(msg: string) {
  if (!toastEl) {
    toastEl = h('div.toast', { role: 'status', 'aria-live': 'polite' })
    document.body.append(toastEl)
  }
  toastEl.textContent = msg
  requestAnimationFrame(() => toastEl!.classList.add('is-on'))
  clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => toastEl!.classList.remove('is-on'), 2200)
}

/* ------------------------------------------------------------------ clipboard */
export async function copyText(text: string, selectFallback?: HTMLElement): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    if (selectFallback) {
      const sel = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(selectFallback)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
    return false
  }
}
