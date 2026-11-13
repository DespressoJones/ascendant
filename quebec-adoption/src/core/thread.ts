/**
 * LE FIL ROUGE: the red thread that runs through the whole page.
 *
 * Any element can pin the thread with a data attribute:
 *   data-thread="left|right|center|<0..1>"   x position (fraction of the page width or a side)
 *   data-thread-y="top|center|bottom"         which edge of the element (default center)
 *   data-knot                                 tie a small loop at this point (legal milestone)
 * Anchors are read top-to-bottom. The thread is drawn up to ~62% of the viewport as you scroll,
 * with a "needle" at its tip; anchors it has passed get the class .is-sewn (sections can style it).
 *
 * On narrow screens every anchor is pulled into the left gutter so the thread never crosses text.
 */
import { gsap, ScrollTrigger, motion, onTeardown } from './motion'
import { s, qsa } from './dom'

interface Pt {
  x: number
  y: number
  knot: boolean
  el: HTMLElement
}

export function initThread(main: HTMLElement) {
  const svg = s('svg', { class: 'thread-layer', 'aria-hidden': 'true' }) as SVGSVGElement
  const ghost = s('path', { class: 'thread-ghost' }) as SVGPathElement
  const live = s('path', { class: 'thread-live' }) as SVGPathElement
  const halo = s('circle', { class: 'thread-needle-halo', r: 11 }) as SVGCircleElement
  const needle = s('circle', { class: 'thread-needle', r: 4.5 }) as SVGCircleElement
  svg.append(ghost, live, halo, needle)
  main.prepend(svg)

  let total = 0
  let samples: { y: number; l: number }[] = []
  let anchors: Pt[] = []
  const state = { len: 0 }

  const build = () => {
    const mainRect = main.getBoundingClientRect()
    const top = mainRect.top + window.scrollY
    const W = main.clientWidth
    const H = main.scrollHeight
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    svg.style.height = `${H}px`
    const narrow = W < 720
    const gutter = narrow ? 7 : Math.max(18, (W - 1240) / 2 - 24)

    anchors = qsa('[data-thread]', main)
      .filter((el) => el.offsetParent !== null || el.getClientRects().length)
      .map((el) => {
        const r = el.getBoundingClientRect()
        const spec = el.dataset.thread || 'left'
        const yMode = el.dataset.threadY || 'center'
        const y = (yMode === 'top' ? r.top : yMode === 'bottom' ? r.bottom : r.top + r.height / 2) + window.scrollY - top
        let x: number
        if (narrow) x = gutter
        else if (spec === 'left') x = gutter
        else if (spec === 'right') x = W - gutter
        else if (spec === 'center') x = W / 2
        else if (spec === 'self') x = r.left + r.width / 2 - mainRect.left
        else x = parseFloat(spec) * W
        return { x, y, knot: el.hasAttribute('data-knot'), el }
      })
      .sort((a, b) => a.y - b.y)

    if (anchors.length < 2) {
      live.setAttribute('d', '')
      ghost.setAttribute('d', '')
      return
    }

    // smooth vertical S-curves between anchors, with a teardrop loop at knots
    const p0 = anchors[0]
    let d = `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`
    for (let i = 1; i < anchors.length; i++) {
      const a = anchors[i - 1]
      const b = anchors[i]
      const dy = b.y - a.y
      const k = Math.max(40, dy * 0.5)
      d += ` C ${a.x.toFixed(1)} ${(a.y + k).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - k).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
      if (b.knot) {
        const r = narrow ? 9 : 15
        const sgn = b.x > W / 2 ? -1 : 1
        d += ` C ${(b.x + sgn * r * 2.2).toFixed(1)} ${(b.y + r * 0.6).toFixed(1)}, ${(b.x + sgn * r * 2.2).toFixed(1)} ${(b.y - r * 2.2).toFixed(1)}, ${(b.x + sgn * r * 0.2).toFixed(1)} ${(b.y - r * 1.4).toFixed(1)}`
        d += ` C ${(b.x - sgn * r * 1.2).toFixed(1)} ${(b.y - r * 0.8).toFixed(1)}, ${(b.x - sgn * r * 0.4).toFixed(1)} ${(b.y + r * 0.4).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y + r * 0.2).toFixed(1)}`
      }
    }
    ghost.setAttribute('d', d)
    live.setAttribute('d', d)
    total = live.getTotalLength()
    live.style.strokeDasharray = `${total} ${total}`

    // y → length lookup (monotonic max so loops don't confuse it)
    samples = []
    const N = Math.min(2400, Math.max(200, Math.round(total / 6)))
    let maxY = -Infinity
    for (let i = 0; i <= N; i++) {
      const l = (i / N) * total
      const pt = live.getPointAtLength(l)
      maxY = Math.max(maxY, pt.y)
      samples.push({ y: maxY, l })
    }
    update(true)
  }

  const lengthAtY = (y: number) => {
    if (!samples.length) return 0
    let lo = 0
    let hi = samples.length - 1
    if (y <= samples[0].y) return 0
    if (y >= samples[hi].y) return total
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (samples[mid].y < y) lo = mid
      else hi = mid
    }
    const a = samples[lo]
    const b = samples[hi]
    const t = b.y === a.y ? 0 : (y - a.y) / (b.y - a.y)
    return a.l + (b.l - a.l) * t
  }

  const setLen = (l: number) => {
    state.len = l
    live.style.strokeDashoffset = String(total - l)
    if (total > 0) {
      const pt = live.getPointAtLength(Math.max(0, Math.min(total, l)))
      needle.setAttribute('cx', pt.x.toFixed(1))
      needle.setAttribute('cy', pt.y.toFixed(1))
      halo.setAttribute('cx', pt.x.toFixed(1))
      halo.setAttribute('cy', pt.y.toFixed(1))
    }
    const tipY = samples.length ? (live.getPointAtLength(Math.max(0, Math.min(total, l))).y) : 0
    for (const a of anchors) a.el.classList.toggle('is-sewn', a.y <= tipY + 2)
  }

  const tween = gsap.quickTo(state, 'len', {
    duration: motion.reduced ? 0 : 0.9,
    ease: 'power3.out',
    onUpdate: () => setLen(state.len),
  })

  const update = (instant = false) => {
    const top = main.getBoundingClientRect().top + window.scrollY
    const y = window.scrollY + window.innerHeight * 0.62 - top
    const target = lengthAtY(y)
    if (instant || motion.reduced) {
      setLen(target)
      tween(target, target)
    } else tween(target)
  }

  const st = ScrollTrigger.create({ trigger: main, start: 'top bottom', end: 'bottom top', onUpdate: () => update() })

  let raf = 0
  const rebuild = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(build)
  }
  const ro = new ResizeObserver(rebuild)
  ro.observe(main)
  window.addEventListener('resize', rebuild)
  document.fonts?.ready.then(rebuild)
  ScrollTrigger.addEventListener('refresh', rebuild)
  build()

  onTeardown(() => {
    st.kill()
    ro.disconnect()
    window.removeEventListener('resize', rebuild)
    ScrollTrigger.removeEventListener('refresh', rebuild)
    svg.remove()
  })

  return { rebuild }
}
