/**
 * ACTORS: "Who's who", drawn as a constellation.
 *
 * Signature: the child sits at the centre of a calm sky. Every actor is a star on an ellipse around
 * them, tied to the child by a thin red thread. When the stage scrolls into view the threads are sewn
 * out from the child one after another, and each star blooms as its thread arrives. Stars drift gently
 * (idle sine), lean toward the pointer, and the field parallaxes; the orbit rings turn slowly with scroll.
 *
 * Selecting a star (hover-intent, focus, click, arrow keys) pulls its thread taut with a small elastic
 * twang (a spring on the curve's bend), thickens it, sends a pulse from the child to the actor, turns the
 * child slightly toward them and swaps the card beside the stage (the acronym scrambles into place).
 * While you explore (pointer or focus inside), the other stars and threads dim.
 *
 * Semantics: the stars are a real tablist (role="tab" buttons, roving tabindex, ←/→/↑/↓/Home/End,
 * aria-selected + aria-controls). The card holds one tabpanel per actor stacked in one grid cell, so the
 * card never changes height.
 *
 * Under 900px there is no constellation: a clean accordion list (button[aria-expanded] → panel), the
 * acronym in a mono chip; opening a row stitches a red thread down its left edge.
 * Reduced motion: static constellation (no drift, no draw-in, no pulse), instant swaps.
 */
import type { Actor, Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'
import { h, rich, s, qsa, slug } from '../core/dom'
import { gsap, ScrollTrigger, motion, ease, scope, onTeardown, refreshSoon } from '../core/motion'
import { scrambleTo } from '../core/interactions'
import { icon } from '../core/icons'

/* Small UI words this section needs that are not in the content contract (see the final report). */
const UI = {
  fr: {
    child: 'L’enfant',
    hintTouch: 'Touchez un nom pour voir son rôle',
    hintFine: 'Survolez ou cliquez sur un nom pour voir son rôle',
    tablist: 'Les intervenants autour de l’enfant',
    role: 'Son rôle',
    when: 'Quand vous le croisez',
    more: 'En savoir plus',
    prev: 'Intervenant précédent',
    next: 'Intervenant suivant',
    newTab: '(s’ouvre dans un nouvel onglet)',
  },
  en: {
    child: 'The child',
    hintTouch: 'Tap a name to see what they do',
    hintFine: 'Hover over or click a name to see what they do',
    tablist: 'The people and services around the child',
    role: 'What they do',
    when: 'When you’ll meet them',
    more: 'Learn more',
    prev: 'Previous',
    next: 'Next',
    newTab: '(opens in a new tab)',
  },
} as const

/* ------------------------------------------------------------------ geometry
 * One coordinate space (a viewBox with the stage's exact aspect ratio) for the SVG threads and the
 * absolutely-positioned stars, so render() can lay everything out without measuring anything.
 */
const VW = 1000
const VH = 920
const CX = VW / 2
const CY = VH / 2
const RX = 290
const RY = 332

type Side = 'left' | 'right' | 'top' | 'bottom'
interface Geo {
  x: number
  y: number
  side: Side
  /** resting curvature of the thread, as a fraction of its length (signed) */
  bend: number
}

/** Stars on an ellipse, clockwise from just right of the top. Alternate stars sit a little inside the
 *  ring (more so when there are many) so labels never crowd and it reads as a constellation, not a clock. */
function layout(n: number): Geo[] {
  const out: Geo[] = []
  const start = -90 + 180 / Math.max(n, 1)
  for (let i = 0; i < n; i++) {
    const jitter = (((i * 37) % 7) - 3) * 1.2
    const a = ((start + (360 / n) * i + jitter) * Math.PI) / 180
    const inner = i % 2 === 1 ? (n >= 9 ? 0.8 : 0.9) : 1
    const x = CX + Math.cos(a) * RX * inner
    const y = CY + Math.sin(a) * RY * inner
    const cos = Math.cos(a)
    const side: Side = cos > 0.42 ? 'right' : cos < -0.42 ? 'left' : Math.sin(a) < 0 ? 'top' : 'bottom'
    out.push({ x, y, side, bend: (i % 2 ? -1 : 1) * (0.11 + ((i * 13) % 5) * 0.012) })
  }
  return out
}

/** A slightly curved thread from the child (cx, cy) to a star (px, py). */
function threadD(cx: number, cy: number, px: number, py: number, bend: number) {
  const dx = px - cx
  const dy = py - cy
  const qx = (cx + px) / 2 - dy * bend
  const qy = (cy + py) / 2 + dx * bend
  return `M${cx.toFixed(1)} ${cy.toFixed(1)}Q${qx.toFixed(1)} ${qy.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}`
}

/** Deterministic star dust (keeps the child's space clear). */
function starfield(count: number) {
  let seed = 11
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const out: { x: number; y: number; r: number; tw: boolean }[] = []
  let guard = 0
  while (out.length < count && guard++ < 2000) {
    const x = 24 + rnd() * (VW - 48)
    const y = 24 + rnd() * (VH - 48)
    const e = ((x - CX) / (RX * 0.46)) ** 2 + ((y - CY) / (RY * 0.46)) ** 2
    const r = 1.1 + rnd() * 1.7
    const tw = rnd() < 0.28
    if (e < 1) continue
    out.push({ x, y, r, tw })
  }
  return out
}

const pad = (v: number) => String(v).padStart(2, '0')
const hostOf = (url?: string) => {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
const lenClass = (short: string) => (short.length <= 5 ? 'xl' : short.length <= 9 ? 'l' : 'm')

/* ------------------------------------------------------------------ render */
/** role + when + link, shared by the desktop card and the mobile rows */
function facts(a: Actor, c: Content) {
  const t = UI[c.lang]
  const role = h('p.actors-role')
  role.append(rich(a.role))
  const when = h('p.actors-when-text')
  when.append(rich(a.when))
  const host = hostOf(a.url)
  return [
    h('div.actors-what', null, h('p.actors-k', null, t.role), role),
    h('div.actors-when', null, icon('compass'), h('div', null, h('p.actors-k', null, t.when), when)),
    a.url
      ? h(
          'a.btn.btn-ghost.btn-small.actors-link',
          { href: a.url, target: '_blank', rel: 'noopener' },
          h('span.btn-label', null, t.more),
          host ? h('span.actors-host', null, host) : null,
          icon('external'),
          h('span.sr-only', null, ` ${t.newTab}`),
        )
      : null,
  ]
}

function desk(items: Actor[], ids: string[], c: Content) {
  const t = UI[c.lang]
  const n = items.length
  const geo = layout(n)

  const orbits = s(
    'g',
    { class: 'actors-orbits' },
    ...[0.44, 0.8, 1.16, 1.5].map((k, i) =>
      s('ellipse', { class: `actors-ring actors-ring-${i}`, cx: CX, cy: CY, rx: (RX * k).toFixed(1), ry: (RY * k).toFixed(1) }),
    ),
  )
  const stars = s(
    'g',
    { class: 'actors-stars' },
    ...starfield(54).map((st, i) =>
      s('circle', {
        class: st.tw ? 'actors-star is-twinkle' : 'actors-star',
        cx: st.x.toFixed(1),
        cy: st.y.toFixed(1),
        r: st.r.toFixed(2),
        style: `--d:${((i * 0.73) % 4.6).toFixed(2)}s`,
      }),
    ),
  )
  const sky = h(
    'div.actors-sky',
    { 'aria-hidden': 'true' },
    s('svg', { viewBox: `0 0 ${VW} ${VH}`, focusable: 'false' }, orbits, stars),
  )

  const threads = geo.map((g, i) =>
    s('path', { class: i === 0 ? 'actors-thread is-active' : 'actors-thread', d: threadD(CX, CY, g.x, g.y, i === 0 ? 0 : g.bend), pathLength: 1 }),
  )
  const pulse = s('path', { class: 'actors-pulse', d: threadD(CX, CY, geo[0].x, geo[0].y, 0), pathLength: 1 })
  const svg = s('svg', { class: 'actors-threads', viewBox: `0 0 ${VW} ${VH}`, 'aria-hidden': 'true', focusable: 'false' }, ...threads, pulse)

  const core = h(
    'div.actors-core',
    { 'aria-hidden': 'true' },
    h('span.actors-halo'),
    h('span.actors-ripple'),
    h('span.actors-child', null, icon('knot', 'actors-child-knot'), h('span.actors-child-label', null, t.child)),
  )

  const tabs = h(
    'div.actors-nodes',
    { role: 'tablist', 'aria-label': t.tablist },
    items.map((a, i) => {
      const g = geo[i]
      return h(
        'div.actors-node',
        {
          role: 'presentation',
          class: i === 0 ? 'is-active' : '',
          'data-side': g.side,
          style: `left:${((g.x / VW) * 100).toFixed(3)}%;top:${((g.y / VH) * 100).toFixed(3)}%`,
        },
        h(
          'button.actors-node-btn',
          {
            type: 'button',
            role: 'tab',
            id: `actors-tab-${ids[i]}`,
            'aria-selected': String(i === 0),
            'aria-controls': `actors-panel-${ids[i]}`,
            tabindex: i === 0 ? '0' : '-1',
            'data-i': String(i),
          },
          h('span.actors-bead', { 'aria-hidden': 'true' }),
          h('span.actors-label', null, a.short),
          h('span.sr-only', null, `, ${a.name}`),
        ),
      )
    }),
  )

  const stage = h(
    'div.actors-stage',
    null,
    sky,
    h('div.actors-field', null, svg, core, tabs),
  )

  const panels = items.map((a, i) =>
    h(
      'div.actors-panel',
      {
        role: 'tabpanel',
        id: `actors-panel-${ids[i]}`,
        'aria-labelledby': `actors-tab-${ids[i]}`,
        class: i === 0 ? 'is-active' : '',
        tabindex: a.url ? null : '0',
      },
      h(
        'h3.actors-title',
        null,
        h('span.actors-big', { 'aria-hidden': 'true', 'data-len': lenClass(a.short) }, a.short),
        h('span.sr-only', null, `${a.short}, `),
        h('span.actors-name', null, a.name),
      ),
      ...facts(a, c),
    ),
  )

  const card = h(
    'div.actors-detail',
    { 'data-thread': 'right', 'data-thread-y': 'bottom', 'data-knot': '' },
    h(
      'div.actors-detail-top',
      null,
      h(
        'p.actors-index',
        { 'aria-hidden': 'true' },
        h('span.actors-index-mask', null, h('span.actors-index-cur', null, pad(1))),
        h('span.actors-index-sep', null, '/'),
        h('span.actors-index-total', null, pad(n)),
      ),
      h(
        'div.actors-nav',
        null,
        h('button.actors-step.actors-prev', { type: 'button', 'aria-label': t.prev, title: t.prev }, icon('arrow', 'actors-flip')),
        h('button.actors-step.actors-next', { type: 'button', 'aria-label': t.next, title: t.next }, icon('arrow')),
      ),
    ),
    h('div.actors-panels', null, panels),
  )

  // the page thread dives under the stage at its top-left corner and comes out, knotted, under the card
  return h('div.actors-desk', { 'data-thread': 'left', 'data-thread-y': 'top' }, stage, card)
}

function list(items: Actor[], ids: string[], c: Content) {
  return h(
    'ul.actors-list',
    { 'data-thread': 'left', 'data-thread-y': 'bottom', 'data-knot': '' },
    items.map((a, i) =>
      h(
        'li.actors-row',
        null,
        h(
          'h3.actors-row-h',
          null,
          h(
            'button.actors-row-btn',
            { type: 'button', id: `actors-acc-${ids[i]}`, 'aria-expanded': 'false', 'aria-controls': `actors-acc-panel-${ids[i]}` },
            h('span.actors-row-text', null, h('span.actors-chip', null, a.short), h('span.actors-row-name', null, a.name)),
            h('span.actors-plus', { 'aria-hidden': 'true' }),
          ),
        ),
        h('div.actors-row-panel', { id: `actors-acc-panel-${ids[i]}`, hidden: true }, h('div.actors-row-inner', null, ...facts(a, c))),
      ),
    ),
  )
}

function render(c: Content) {
  const A = c.actors
  const t = UI[c.lang]
  const { section, head, body } = sectionShell('actors', { eyebrow: A.eyebrow, title: A.title, lede: A.lede, className: 'actors' })
  if (!A.items.length) return section
  head.append(
    h(
      'p.actors-hint',
      { 'data-reveal': 'fade', 'data-delay': '0.3' },
      h('span.actors-tap', { 'aria-hidden': 'true' }),
      h('span.actors-hint-touch', null, t.hintTouch),
      h('span.actors-hint-fine', null, t.hintFine),
    ),
  )
  const ids = A.items.map((a, i) => slug(a.id) || `a${i}`)
  body.append(desk(A.items, ids, c), list(A.items, ids, c))
  return section
}

/* ------------------------------------------------------------------ mobile accordion */
function enhanceList(el: HTMLElement, ctx: gsap.Context) {
  const list = el.querySelector<HTMLElement>('.actors-list')
  if (!list) return
  const toggle = (btn: HTMLButtonElement) => {
    const row = btn.closest<HTMLElement>('.actors-row')!
    const panel = row.querySelector<HTMLElement>('.actors-row-panel')!
    const open = btn.getAttribute('aria-expanded') !== 'true'
    btn.setAttribute('aria-expanded', String(open))
    row.classList.toggle('is-open', open)
    if (motion.reduced) {
      panel.hidden = !open
      refreshSoon()
      return
    }
    ctx.add(() => {
      const from = panel.hidden ? 0 : panel.getBoundingClientRect().height
      gsap.killTweensOf(panel)
      if (open) {
        panel.hidden = false
        gsap.fromTo(panel, { height: from }, {
          height: 'auto',
          duration: 0.7,
          ease: ease.out,
          onComplete: () => {
            gsap.set(panel, { clearProps: 'height' })
            refreshSoon()
          },
        })
        gsap.fromTo(
          panel.querySelectorAll('.actors-row-inner > *'),
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: ease.out, stagger: 0.06, delay: 0.08, overwrite: true },
        )
      } else {
        gsap.fromTo(panel, { height: from }, {
          height: 0,
          duration: 0.45,
          ease: ease.inOut,
          onComplete: () => {
            panel.hidden = true
            gsap.set(panel, { clearProps: 'height' })
            refreshSoon()
          },
        })
      }
    })
  }
  const onClick = (e: MouseEvent) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('.actors-row-btn')
    if (btn) toggle(btn)
  }
  list.addEventListener('click', onClick)
  onTeardown(() => list.removeEventListener('click', onClick))
}

/* ------------------------------------------------------------------ constellation */
function enhanceStage(el: HTMLElement, c: Content, ctx: gsap.Context, mm: gsap.MatchMedia) {
  const stage = el.querySelector<HTMLElement>('.actors-stage')
  const card = el.querySelector<HTMLElement>('.actors-detail')
  if (!stage || !card) return
  const items = c.actors.items
  const field = stage.querySelector<HTMLElement>('.actors-field')!
  const sky = stage.querySelector<HTMLElement>('.actors-sky')!
  const orbits = stage.querySelector<SVGGElement>('.actors-orbits')!
  const core = stage.querySelector<HTMLElement>('.actors-core')!
  const ripple = stage.querySelector<HTMLElement>('.actors-ripple')!
  const tablist = stage.querySelector<HTMLElement>('.actors-nodes')!
  const nodes = qsa('.actors-node', stage)
  const tabs = qsa<HTMLButtonElement>('.actors-node-btn', stage)
  const beads = qsa('.actors-bead', stage)
  const labels = qsa('.actors-label', stage)
  const threads = qsa<SVGPathElement>('.actors-thread', stage)
  const pulse = stage.querySelector<SVGPathElement>('.actors-pulse')!
  const panels = qsa('.actors-panel', card)
  const idxCur = card.querySelector<HTMLElement>('.actors-index-cur')!
  const n = tabs.length
  const geo = layout(n)

  /* ---------------------------------------------------------------- state */
  const st = { cur: 0, engaged: false, pin: false, px: 0, py: 0, W: 1, H: 1, k: 1 }
  const bend = geo.map((g, i) => (i === 0 ? 0 : g.bend))
  const bendV = geo.map(() => 0)
  const off = geo.map(() => ({ x: 0, y: 0 }))
  const lean = { x: 0, y: 0, vx: 0, vy: 0 }
  const wave = geo.map((_, i) => ({
    a: i * 1.7 + 0.3,
    b: i * 2.3 + 1.1,
    w1: 0.42 + ((i * 37) % 11) / 40,
    w2: 0.36 + ((i * 53) % 13) / 46,
  }))
  const bendTarget = (i: number) => (i === st.cur ? 0 : geo[i].bend * (st.engaged ? 1.5 : 1))
  const leanTarget = () => {
    const g = geo[st.cur]
    const dx = g.x - CX
    const dy = g.y - CY
    const L = Math.hypot(dx, dy) || 1
    return { x: (dx / L) * 9, y: (dy / L) * 9 }
  }

  const measure = () => {
    const W = field.clientWidth
    const H = field.clientHeight
    if (!W || !H) return
    st.W = W
    st.H = H
    st.k = VW / W
  }
  measure()

  const setCoreX = gsap.quickSetter(core, 'x', 'px') as (v: number) => void
  const setCoreY = gsap.quickSetter(core, 'y', 'px') as (v: number) => void

  /** Write the current state into the DOM (thread curves, star offsets, child lean). */
  const draw = () => {
    const k = st.k
    const cx = CX + lean.x * k
    const cy = CY + lean.y * k
    for (let i = 0; i < n; i++) {
      const o = off[i]
      const d = threadD(cx, cy, geo[i].x + o.x * k, geo[i].y + o.y * k, bend[i])
      threads[i].setAttribute('d', d)
      if (i === st.cur) pulse.setAttribute('d', d)
      nodes[i].style.transform = `translate3d(${o.x.toFixed(2)}px,${o.y.toFixed(2)}px,0)`
    }
    setCoreX(lean.x)
    setCoreY(lean.y)
  }
  /** Reduced motion: jump straight to the resting shape. */
  const snap = () => {
    for (let i = 0; i < n; i++) {
      bend[i] = bendTarget(i)
      bendV[i] = 0
    }
    draw()
  }

  /* ---------------------------------------------------------------- per-frame physics */
  const tick = (time: number, deltaMs: number) => {
    // integrate in fixed ~60 Hz steps so the springs feel the same on 60, 120 and 144 Hz screens
    const steps = Math.min(4, Math.max(1, Math.round(deltaMs / 16.7)))
    const lt = leanTarget()
    for (let i = 0; i < n; i++) {
      // idle drift (the selected star is held almost still)
      const amp = i === st.cur ? 1.4 : 5.5
      let tx = Math.sin(time * wave[i].w1 + wave[i].a) * amp
      let ty = Math.cos(time * wave[i].w2 + wave[i].b) * amp
      // stars lean toward a nearby pointer
      if (st.pin) {
        const dx = st.px - (geo[i].x / VW) * st.W
        const dy = st.py - (geo[i].y / VH) * st.H
        const dist = Math.hypot(dx, dy)
        if (dist < 170) {
          const f = (1 - dist / 170) ** 2 * 0.32
          tx += dx * f
          ty += dy * f
        }
      }
      const target = bendTarget(i)
      for (let k = 0; k < steps; k++) {
        // a spring on the curvature: a thread pulled taut overshoots a touch, like a plucked string
        bendV[i] = (bendV[i] + (target - bend[i]) * 0.085) * 0.8
        bend[i] += bendV[i]
        off[i].x += (tx - off[i].x) * 0.07
        off[i].y += (ty - off[i].y) * 0.07
      }
    }
    for (let k = 0; k < steps; k++) {
      lean.vx = (lean.vx + (lt.x - lean.x) * 0.05) * 0.84
      lean.vy = (lean.vy + (lt.y - lean.y) * 0.05) * 0.84
      lean.x += lean.vx
      lean.y += lean.vy
    }
    draw()
  }
  let running = false
  const play = () => {
    if (running || motion.reduced) return
    running = true
    gsap.ticker.add(tick)
  }
  const pause = () => {
    if (!running) return
    running = false
    gsap.ticker.remove(tick)
  }
  onTeardown(pause)

  /* ---------------------------------------------------------------- selection */
  const finishLeaving = () => {
    for (const p of panels) {
      if (!p.classList.contains('is-leaving')) continue
      gsap.killTweensOf(p)
      p.classList.remove('is-leaving')
      gsap.set(p, { clearProps: 'opacity,visibility,transform' })
    }
  }

  const swapPanel = (prev: number, i: number) => {
    const out = panels[prev]
    const inn = panels[i]
    idxCur.textContent = pad(i + 1)
    finishLeaving()
    out.classList.remove('is-active')
    inn.classList.add('is-active')
    if (motion.reduced) return
    ctx.add(() => {
      out.classList.add('is-leaving')
      gsap.to(out, {
        autoAlpha: 0,
        y: -10,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          out.classList.remove('is-leaving')
          gsap.set(out, { clearProps: 'opacity,visibility,transform' })
        },
      })
      gsap.fromTo(
        inn.querySelectorAll(':scope > :not(.actors-title), .actors-name'),
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.75, ease: ease.out, stagger: 0.06, delay: 0.12, overwrite: true },
      )
      const big = inn.querySelector<HTMLElement>('.actors-big')
      if (big) {
        big.textContent = items[prev].short
        void scrambleTo(big, items[i].short, 0.55)
      }
      gsap.fromTo(idxCur, { yPercent: 90 }, { yPercent: 0, duration: 0.55, ease: ease.out, overwrite: true })
    })
  }

  const restartPulse = () => {
    pulse.style.animation = 'none'
    void pulse.getBoundingClientRect()
    pulse.style.animation = ''
  }

  const select = (raw: number, opts: { focus?: boolean } = {}) => {
    const i = ((raw % n) + n) % n
    if (opts.focus) tabs[i].focus({ preventScroll: true })
    if (i === st.cur) return
    const prev = st.cur
    st.cur = i
    tabs.forEach((b, k) => {
      b.setAttribute('aria-selected', String(k === i))
      b.tabIndex = k === i ? 0 : -1
    })
    nodes.forEach((nd, k) => nd.classList.toggle('is-active', k === i))
    threads.forEach((p, k) => p.classList.toggle('is-active', k === i))
    swapPanel(prev, i)
    restartPulse()
    if (motion.reduced || !running) snap()
    if (!motion.reduced) {
      ctx.add(() => {
        gsap.fromTo(ripple, { scale: 1, opacity: 0.7 }, { scale: 2.3, opacity: 0, duration: 1.3, ease: ease.out, overwrite: true })
        // a small kick so the newly chosen thread visibly snaps taut
        bendV[i] -= geo[i].bend * 0.25
      })
    }
  }

  const setEngaged = () => {
    const on = st.pin || tablist.contains(document.activeElement)
    if (on === st.engaged) return
    st.engaged = on
    stage.classList.toggle('is-engaged', on)
    if (motion.reduced || !running) snap()
  }

  /* ---------------------------------------------------------------- input */
  let dwell = 0
  const hover = (i: number, on: boolean) => threads[i]?.classList.toggle('is-hover', on)
  tabs.forEach((b, i) => {
    b.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return
      hover(i, true)
      window.clearTimeout(dwell)
      dwell = window.setTimeout(() => select(i), 140)
    })
    b.addEventListener('pointerleave', () => {
      hover(i, false)
      window.clearTimeout(dwell)
    })
    b.addEventListener('click', () => select(i))
    b.addEventListener('focus', () => select(i))
  })
  onTeardown(() => window.clearTimeout(dwell))

  tablist.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    if (next === -1) return
    e.preventDefault()
    select(next, { focus: true })
  })
  tablist.addEventListener('focusin', setEngaged)
  tablist.addEventListener('focusout', () => requestAnimationFrame(setEngaged))

  card.querySelector('.actors-prev')?.addEventListener('click', () => select(st.cur - 1))
  card.querySelector('.actors-next')?.addEventListener('click', () => select(st.cur + 1))

  const ro = new ResizeObserver(() => {
    measure()
    if (!running) draw()
  })
  ro.observe(field)
  onTeardown(() => ro.disconnect())

  if (motion.reduced) return

  /* ---------------------------------------------------------------- motion (wide screens only) */
  mm.add('(min-width: 900px)', () => {
    measure()
    const dir: Record<Side, [number, number]> = { right: [12, 0], left: [-12, 0], top: [0, -12], bottom: [0, 12] }

    // sewing in: the child appears, then each thread runs out from it and its star blooms
    const tl = gsap.timeline({ paused: true, defaults: { ease: ease.out } })
    tl.fromTo(sky, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1.6 }, 0)
      .fromTo(core, { scale: 0.5, opacity: 0.15 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.7)' }, 0.1)
      .fromTo(card, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.25)
      .fromTo(
        panels[0].children,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.07 },
        0.35,
      )
    const gap = Math.min(0.13, 1.25 / n)
    threads.forEach((p, i) => {
      const at = 0.4 + i * gap
      const [dx, dy] = dir[geo[i].side]
      tl.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, at)
        .fromTo(beads[i], { scale: 0 }, { scale: 1, duration: 0.7, ease: 'back.out(2.6)' }, at + 0.62)
        .fromTo(labels[i], { opacity: 0.12, x: dx, y: dy }, { opacity: 1, x: 0, y: 0, duration: 0.9 }, at + 0.66)
    })
    tl.add(() => {
      stage.classList.add('is-drawn')
      restartPulse()
    })
    // idempotent, and robust to jumps (nav links, reloads mid-page): any progress past the start plays it
    const sew = () => {
      if (tl.progress() === 0 && !tl.isActive()) tl.play()
    }
    ScrollTrigger.create({
      trigger: stage,
      start: 'top 74%',
      end: 'bottom top',
      onEnter: sew,
      onLeave: sew,
      onEnterBack: sew,
      onRefresh: (self) => {
        if (self.progress > 0) sew()
      },
    })
    // keyboard users can land here before it has finished: hurry it along
    const hurry = () => {
      if (tl.progress() < 1) tl.play().timeScale(4)
    }
    tablist.addEventListener('focusin', hurry)

    // the orbit rings turn slowly as the page scrolls
    gsap.fromTo(orbits, { rotation: -8 }, {
      rotation: 8,
      svgOrigin: `${CX} ${CY}`,
      ease: 'none',
      scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })

    // physics runs only while the stage is on screen
    ScrollTrigger.create({
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? play() : pause()),
    })

    // pointer: parallax depth + stars leaning toward the hand
    const fx = gsap.quickTo(field, 'x', { duration: 1.1, ease: 'power3.out' })
    const fy = gsap.quickTo(field, 'y', { duration: 1.1, ease: 'power3.out' })
    const sx = gsap.quickTo(sky, 'x', { duration: 1.4, ease: 'power3.out' })
    const sy = gsap.quickTo(sky, 'y', { duration: 1.4, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      const r = field.getBoundingClientRect()
      st.px = e.clientX - r.left
      st.py = e.clientY - r.top
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      fx(nx * -10)
      fy(ny * -10)
      sx(nx * 6)
      sy(ny * 6)
    }
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      st.pin = true
      setEngaged()
    }
    const onLeave = () => {
      st.pin = false
      setEngaged()
      fx(0)
      fy(0)
      sx(0)
      sy(0)
    }
    if (motion.finePointer) {
      stage.addEventListener('pointermove', onMove)
      stage.addEventListener('pointerenter', onEnter)
      stage.addEventListener('pointerleave', onLeave)
    }

    return () => {
      pause()
      tablist.removeEventListener('focusin', hurry)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
      stage.classList.remove('is-drawn')
      st.pin = false
      for (const o of off) o.x = o.y = 0
      lean.x = lean.y = lean.vx = lean.vy = 0
      snap()
    }
  })
}

function enhance(el: HTMLElement, c: Content) {
  if (!c.actors.items.length) return
  const ctx = scope(el, () => {})
  const mm = gsap.matchMedia(el)
  onTeardown(() => mm.revert())

  enhanceList(el, ctx)
  enhanceStage(el, c, ctx, mm)

  // narrow screens: the rows rise in as they enter
  if (!motion.reduced) {
    mm.add('(max-width: 899.98px)', () => {
      const rows = qsa('.actors-row', el)
      gsap.set(rows, { y: 26, autoAlpha: 0 })
      ScrollTrigger.batch(rows, {
        start: 'top 94%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: ease.out, stagger: 0.07, overwrite: true }),
      })
    })
  }
}

export const actorsSection: SectionDef = { id: 'actors', render, enhance }
