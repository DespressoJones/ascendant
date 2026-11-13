/**
 * HERO: the thesis.
 * Huge condensed title rises char by char; a red thread is drawn across the page and can be
 * plucked like a string (1-D wave simulation); then the last words ("without the fog") turn to dust
 * and "step by step" assembles in their place.
 */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { h, rich, s } from '../core/dom'
import { gsap, SplitText, motion, ease, scope, onTeardown, scrollToTarget } from '../core/motion'
import { disintegrate, assemble } from '../core/dust'
import { magnetic } from '../core/interactions'
import { icon } from '../core/icons'

function render(c: Content) {
  const hero = c.hero
  const lines = hero.titleLines.map((line, i) => {
    const isLast = i === hero.titleLines.length - 1
    if (isLast && hero.swap && line.includes(hero.swap.from)) {
      const [before, after] = line.split(hero.swap.from)
      return h(
        'span.hero-line.hero-line-swap',
        null,
        before,
        h('span.hero-swap-from', null, hero.swap.from),
        h('span.hero-swap-to', { 'aria-hidden': 'true' }, hero.swap.to),
        after,
      )
    }
    return h('span.hero-line', null, line)
  })
  const srTitle = hero.swap
    ? hero.titleLines.join(' ').replace(hero.swap.from, hero.swap.to)
    : hero.titleLines.join(' ')

  const stats = hero.stats.length
    ? h(
        'dl.hero-stats',
        null,
        hero.stats.map((st) => {
          const num = parseFloat(st.value.replace(/[^\d.,]/g, '').replace(/\s/g, '').replace(',', '.'))
          return h(
            'div.hero-stat',
            null,
            h('dt', null, st.label),
            h('dd', { 'data-count': Number.isFinite(num) ? String(num) : null }, st.value),
          )
        }),
      )
    : null

  const lede = h('p.hero-lede')
  lede.append(rich(hero.lede))

  const primary = h(
    'a.btn',
    { href: '#paths', 'data-magnetic': '' },
    h('span.btn-label', null, hero.ctaPrimary),
    icon('arrow-down'),
  )
  const secondary = h('a.btn.btn-ghost', { href: '#myths', 'data-magnetic': '' }, h('span.btn-label', null, hero.ctaSecondary))

  const string = s('svg', { class: 'pluck-svg', 'aria-hidden': 'true', preserveAspectRatio: 'none' }, s('path', { class: 'pluck-path' }))

  const dossier = hero.dossier.length
    ? h(
        'div.dossier',
        null,
        h(
          'ol.dossier-stack',
          null,
          hero.dossier.map((d, i) =>
            h(
              'li.dossier-card',
              { style: `--i:${i}`, 'data-cursor': '' },
              h('span.dossier-hole', { 'aria-hidden': 'true' }),
              h('span.dossier-tag', null, d.tag),
              h('strong.dossier-title', null, d.title),
              h('span.dossier-note', null, d.note),
            ),
          ),
        ),
        s('svg', { class: 'dossier-lace', 'aria-hidden': 'true' }, s('path', { class: 'dossier-lace-path' })),
      )
    : null

  return h(
    'section.hero#top',
    { 'aria-labelledby': 'hero-title' },
    h(
      'div.wrap.hero-inner',
      null,
      h(
        'div.hero-top',
        null,
        h(
          'div.hero-headline',
          null,
          h('p.eyebrow.hero-eyebrow', null, hero.eyebrow),
          h('h1.hero-title#hero-title', { 'aria-label': srTitle }, h('span', { 'aria-hidden': 'true', class: 'hero-lines' }, lines)),
        ),
        dossier,
      ),
      h('div.pluck', null, string, h('span.pluck-hint.mono', null, hero.pluckHint)),
      h('div.hero-foot', null, lede, h('div.hero-ctas', null, primary, secondary)),
      stats,
      h('a.scroll-hint', { href: '#principles', 'data-thread': 'left', 'data-thread-y': 'center' }, h('span.scroll-needle'), hero.scrollHint),
    ),
  )
}

/* ------------------------------------------------------------------ pluckable string */
function pluck(wrap: HTMLElement) {
  const svg = wrap.querySelector<SVGSVGElement>('.pluck-svg')!
  const path = svg.querySelector<SVGPathElement>('path')!
  const N = 90
  const u = new Float32Array(N)
  const v = new Float32Array(N)
  let W = 0
  let H = 0
  const resize = () => {
    W = wrap.clientWidth
    H = wrap.clientHeight
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(wrap)

  let grab = -1
  let grabY = 0
  const onMove = (e: PointerEvent) => {
    const r = wrap.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top - H / 2
    const inside = x > 0 && x < W && Math.abs(y) < H / 2
    if (inside) {
      grab = Math.round((x / W) * (N - 1))
      grabY = Math.max(-H / 2 + 4, Math.min(H / 2 - 4, y))
    } else grab = -1
  }
  const onLeave = () => (grab = -1)
  wrap.addEventListener('pointermove', onMove)
  wrap.addEventListener('pointerleave', onLeave)
  wrap.addEventListener('pointerup', onLeave)

  // a gentle idle shimmer so the string feels alive
  let t = 0
  const draw = () => {
    t += 1 / 60
    // pinned ends
    for (let k = 0; k < 2; k++) {
      for (let i = 1; i < N - 1; i++) {
        const a = (u[i - 1] - 2 * u[i] + u[i + 1]) * 0.48 - v[i] * 0.018
        v[i] += a
      }
      for (let i = 1; i < N - 1; i++) u[i] += v[i] * 0.5
    }
    if (grab > 0 && grab < N - 1) {
      // pull the nearby points toward the pointer (falloff), which "plucks" when released
      for (let i = 1; i < N - 1; i++) {
        const d = (i - grab) / 6
        const f = Math.exp(-d * d)
        u[i] += (grabY * f - u[i]) * 0.35 * f
        v[i] *= 1 - 0.5 * f
      }
    }
    let d = `M 0 ${(H / 2).toFixed(1)}`
    for (let i = 1; i < N; i++) {
      const x = (i / (N - 1)) * W
      const idle = Math.sin(t * 1.4 + i * 0.18) * 0.8 * Math.sin((i / (N - 1)) * Math.PI)
      d += ` L ${x.toFixed(1)} ${(H / 2 + u[i] + idle).toFixed(1)}`
    }
    path.setAttribute('d', d)
  }
  gsap.ticker.add(draw)
  onTeardown(() => {
    gsap.ticker.remove(draw)
    ro.disconnect()
  })
  // initial "twang" so people see it's interactive
  return () => {
    for (let i = 1; i < N - 1; i++) u[i] = Math.sin((i / (N - 1)) * Math.PI) * 14
  }
}

/* ------------------------------------------------------------------ dossier lace */
function dossierLace(el: HTMLElement) {
  const box = el.querySelector<HTMLElement>('.dossier')
  if (!box) return { draw: () => {}, path: null as SVGPathElement | null }
  const svg = box.querySelector<SVGSVGElement>('.dossier-lace')!
  const path = svg.querySelector<SVGPathElement>('path')!
  const cards = Array.from(box.querySelectorAll<HTMLElement>('.dossier-card'))
  const draw = () => {
    const b = box.getBoundingClientRect()
    svg.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`)
    const pts = cards.map((c) => {
      const r = c.querySelector('.dossier-hole')!.getBoundingClientRect()
      return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top }
    })
    if (!pts.length) return
    const start = { x: b.width + 30, y: -40 }
    // finish exactly at the right end of the pluckable string, so it reads as one thread
    const pl = el.querySelector<SVGSVGElement>('.pluck-svg')?.getBoundingClientRect()
    const end = pl ? { x: pl.right - b.left, y: pl.top + pl.height / 2 - b.top } : { x: -40, y: b.height + 60 }
    const all = [start, ...pts, end]
    let d = `M ${start.x} ${start.y}`
    for (let i = 1; i < all.length; i++) {
      const a = all[i - 1]
      const c = all[i]
      const k = (c.y - a.y) * 0.55
      const last = i === all.length - 1
      // between holes the lace hugs the cards' left margin; the last run dips under the stack
      d += last
        ? ` C ${a.x - 40} ${a.y + Math.max(160, k * 1.6)}, ${c.x - 220} ${c.y + 6}, ${c.x} ${c.y}`
        : i === 1
          ? ` C ${a.x - 120} ${a.y + 30}, ${c.x + 40} ${c.y - 90}, ${c.x} ${c.y}`
          : ` C ${a.x - 55} ${a.y + k * 0.6}, ${c.x - 55} ${c.y - k * 0.6}, ${c.x} ${c.y}`
    }
    path.setAttribute('d', d)
  }
  return { draw, path }
}

/** Cards drift with the pointer at different depths; the lace follows. */
function dossierParallax(el: HTMLElement, redraw: () => void) {
  const box = el.querySelector<HTMLElement>('.dossier')
  if (!box || !motion.finePointer) return
  const cards = Array.from(box.querySelectorAll<HTMLElement>('.dossier-card'))
  const setters = cards.map((c) => ({
    x: gsap.quickTo(c, 'x', { duration: 1, ease: 'power3.out', onUpdate: redraw }),
    y: gsap.quickTo(c, 'y', { duration: 1, ease: 'power3.out' }),
  }))
  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / innerWidth - 0.5
    const ny = e.clientY / innerHeight - 0.5
    setters.forEach((st, i) => {
      const depth = 10 + i * 9
      st.x(nx * depth)
      st.y(ny * depth)
    })
  }
  addEventListener('pointermove', onMove, { passive: true })
  onTeardown(() => removeEventListener('pointermove', onMove))
}

function enhance(el: HTMLElement) {
  const titleLines = el.querySelector<HTMLElement>('.hero-lines')!
  const from = el.querySelector<HTMLElement>('.hero-swap-from')
  const to = el.querySelector<HTMLElement>('.hero-swap-to')
  const pluckEl = el.querySelector<HTMLElement>('.pluck')!
  const path = el.querySelector<SVGPathElement>('.pluck-path')!

  el.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((b) => magnetic(b))
  el.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault()
      scrollToTarget(a.getAttribute('href')!)
    }),
  )

  const twang = pluck(pluckEl)
  const lace = dossierLace(el)
  lace.draw()
  const ro = new ResizeObserver(() => lace.draw())
  const dossierEl = el.querySelector<HTMLElement>('.dossier')
  if (dossierEl) ro.observe(dossierEl)
  onTeardown(() => ro.disconnect())
  dossierParallax(el, lace.draw)

  const doSwap = async () => {
    if (!from || !to) return
    await Promise.all([
      disintegrate(from, { direction: 'right', sweep: 1.1, wind: 1.2 }),
      new Promise<void>((res) => setTimeout(res, 650)).then(() => assemble(to, { direction: 'right' })),
    ])
    from.remove()
    to.classList.add('is-in')
    to.removeAttribute('aria-hidden')
  }

  if (motion.reduced) {
    if (from && to) {
      from.remove()
      to.classList.add('is-in')
      to.removeAttribute('aria-hidden')
    }
    return
  }
  if (from && to) {
    to.style.visibility = 'hidden'
    to.style.left = `${from.offsetLeft}px`
  }

  scope(el, () => {
    // split plain lines and the "fog" words, never the whole swap line (it would re-nest the spans)
    const targets = [
      ...Array.from(titleLines.querySelectorAll<HTMLElement>('.hero-line:not(.hero-line-swap)')),
      ...(from ? [from] : []),
    ]
    const split = SplitText.create(targets, { type: 'words,chars', charsClass: 'split-char', wordsClass: 'split-word', mask: 'chars' })
    const chars = split.chars
    onTeardown(() => split.revert())
    const len = path.getTotalLength?.() || 1200
    const tl = gsap.timeline({ defaults: { ease: ease.out } })
    tl.from('.hero-eyebrow', { autoAlpha: 0, y: 12, duration: 0.8 })
      .from(chars, { yPercent: 110, rotate: 8, duration: 1.2, stagger: 0.022 }, 0.1)
      .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: 'power3.inOut' }, 0.7)
      .add(() => {
        path.style.strokeDasharray = ''
        path.style.strokeDashoffset = ''
        twang()
      })
      .from('.pluck-hint', { autoAlpha: 0, x: -10, duration: 0.6 }, '-=0.4')
      .from('.hero-lede', { autoAlpha: 0, y: 24, duration: 1 }, 1.0)
      .from('.hero-ctas > *', { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.1 }, 1.15)
      .from('.hero-stat', { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.1 }, 1.3)
      .from('.scroll-hint', { autoAlpha: 0, duration: 0.8 }, 1.6)
      .from(
        '.dossier-card',
        { x: 160, y: -60, rotate: 18, autoAlpha: 0, duration: 1.3, stagger: 0.12, onUpdate: lace.draw },
        0.35,
      )
      .add(() => {
        if (!lace.path) return
        const l = lace.path.getTotalLength()
        gsap.fromTo(lace.path, { strokeDasharray: l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', onComplete: () => { lace.path!.style.strokeDasharray = '' } })
      }, 1.0)
      .add(() => void doSwap(), 2.5)

    // the title gently parallaxes away as you leave the hero
    gsap.to(titleLines, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })
  })
}

export const heroSection: SectionDef = { id: 'top', render, enhance }
