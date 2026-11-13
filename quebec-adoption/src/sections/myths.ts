/**
 * MYTHS: the untangling board ("Mythes et réalités").
 *
 * Each myth is a pencilled, dashed paper card with a hand-drawn question mark that glitches now and then.
 * Pressing it blows the myth away as dust (core/dust, "Mr. Stark, I don't feel so good") while the card
 * settles into a confident state (solid card, an atoca seam stitched down its left edge) and the fact
 * assembles in its place, with the struck-through myth kept above it for context.
 *
 * Signature: the sticky dock holds a thread meter with one tangle per myth. Every myth you clear pulls the
 * thread a little straighter (elastic snap); when the last one goes, the thread ties a knot.
 * "Show all the facts" untangles everything (staggered dust for cards on screen, instant off screen);
 * the reset button reassembles the myths.
 *
 * Accessibility: each myth button is described by a visually-hidden copy of its fact, so the facts are
 * available without pressing anything. Faces are stacked in one grid cell, so the card never jumps.
 */
import type { Content, Myth } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations } from './shared'
import { h, rich, s, clamp } from '../core/dom'
import { gsap, ScrollTrigger, motion, scope, onTeardown } from '../core/motion'
import { disintegrate, assemble } from '../core/dust'
import { magnetic } from '../core/interactions'
import { icon } from '../core/icons'

/* Small UI words this section needs that are not in the content contract (see the final report). */
const UI = {
  fr: {
    progress: 'démêlés',
    of: 'sur',
    progressLabel: 'Progression : mythes démêlés',
    showAll: 'Voir toutes les réalités',
    showAllShort: 'Tout voir',
    cue: 'Voir la réalité',
    back: 'Revoir le mythe',
    allShown: 'Toutes les réalités sont affichées.',
    allReset: 'Tous les mythes sont réaffichés.',
    complete: 'Tout est démêlé.',
  },
  en: {
    progress: 'untangled',
    of: 'of',
    progressLabel: 'Progress: myths untangled',
    showAll: 'Show all the facts',
    showAllShort: 'Show all',
    cue: 'See the fact',
    back: 'See the myth again',
    allShown: 'All the facts are now shown.',
    allReset: 'All the myths are shown again.',
    complete: 'All untangled.',
  },
} as const

type State = 'myth' | 'fact'

const colon = (lang: string) => (lang === 'fr' ? ' : ' : ': ')
const quote = (t: string, lang: string) => (lang === 'fr' ? `« ${t} »` : `“${t}”`)
/** content markup → plain text (for screen-reader copies and announcements) */
const plain = (t: string) =>
  t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')

/**
 * Desktop rhythm on a 12-column grid: rows of 2 (7+5, then 5+7) alternate with rows of 3 (4+4+4).
 * Row sizes adapt to the item count so the last row is always full and no card is left alone.
 */
function rowSpans(n: number): number[] {
  const out: number[] = []
  let rem = n
  let row = 0
  let pairs = 0
  while (rem > 0) {
    let size = row % 2 === 0 ? 2 : 3
    if (rem <= 3) size = rem
    else if (rem - size === 1) size = size === 2 ? 3 : 2
    if (size === 1) out.push(12)
    else if (size === 3) out.push(4, 4, 4)
    else out.push(...(pairs++ % 2 === 0 ? [7, 5] : [5, 7]))
    rem -= size
    row++
  }
  return out
}

/* ------------------------------------------------------------------ drawings */
const Q_PATH = 'M9.5 16.5C8.6 9.4 13.6 4.2 20.6 4.3 27.4 4.4 31.9 8.9 31.6 14.6 31.3 19.6 27.8 21.8 24.6 24 21.7 26 20.2 28 20.3 32.4L20.4 36'
const Q_SKETCH = 'M11.6 12.4C13.4 8 17 6 21.6 6.4'
const Q_DOT = 'M20.3 46.2l.4.5'

function questionMark() {
  return s(
    'svg',
    { class: 'myths-q', viewBox: '0 0 40 56', 'aria-hidden': 'true', focusable: 'false' },
    s('path', { class: 'myths-q-echo', d: Q_PATH }),
    s('path', { class: 'myths-q-main', d: Q_PATH, pathLength: 100 }),
    s('path', { class: 'myths-q-sketch', d: Q_SKETCH }),
    s('path', { class: 'myths-q-dot', d: Q_DOT }),
  )
}

function undoIcon() {
  return s(
    'svg',
    { class: 'icon', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' },
    s('path', { d: 'M9 14 4 9l5-5' }),
    s('path', { d: 'M4 9h10.5a5.5 5.5 0 0 1 0 11H11' }),
  )
}

/* ------------------------------------------------------------------ render */
function card(m: Myth, i: number, n: number, span: number, c: Content) {
  const M = c.myths
  const t = UI[c.lang]
  const num = String(i + 1).padStart(2, '0')
  const ids = { myth: `myths-m-${m.id}`, fact: `myths-f-${m.id}`, sr: `myths-sr-${m.id}` }

  const mythInner = h(
    'span.myths-inner.myths-myth-inner',
    null,
    h('span.myths-meta', null, h('span.myths-num', null, num), h('span.myths-rule', { 'aria-hidden': 'true' }), h('span.myths-label', null, M.mythLabel)),
    h('span.myths-myth-text', null, quote(m.myth, c.lang)),
    h(
      'span.myths-cue',
      { 'aria-hidden': 'true' },
      h('span.myths-cue-rule'),
      h('span.myths-cue-label', null, t.cue),
      icon('arrow'),
    ),
    questionMark(),
  )
  const mythBtn = h(
    'button.myths-face.myths-myth',
    { type: 'button', id: ids.myth, 'aria-expanded': 'false', 'aria-controls': ids.fact, 'aria-describedby': ids.sr },
    mythInner,
  )

  const factText = h('p.myths-fact-text')
  factText.append(rich(m.fact))
  const factInner = h(
    'div.myths-inner.myths-fact-inner',
    null,
    h(
      'p.myths-meta',
      null,
      h('span.myths-num', null, num),
      h('span.myths-rule', { 'aria-hidden': 'true' }),
      h('span.myths-label.myths-label-fact', null, icon('check'), M.factLabel),
    ),
    h('p.myths-was', null, h('span.sr-only', null, `${M.mythLabel}${colon(c.lang)}`), h('s', null, quote(m.myth, c.lang))),
    factText,
    citations(m.refs, m.sources, c.lang),
  )
  const back = h(
    'button.myths-back',
    { type: 'button', 'aria-label': `${t.back} ${num}`, title: t.back, 'aria-controls': ids.myth },
    undoIcon(),
  )
  const factFace = h('div.myths-face.myths-fact', { id: ids.fact }, factInner, back)
  const sr = h('p.sr-only.myths-sr', { id: ids.sr }, `${M.factLabel}${colon(c.lang)}${plain(m.fact)}`)

  const mid = Math.floor((n - 1) / 2)
  const thread =
    n > 2 && i === mid
      ? { 'data-thread': 'left', 'data-thread-y': 'center' }
      : i === n - 1
        ? { 'data-thread': 'right', 'data-thread-y': 'bottom', 'data-knot': '' }
        : {}
  const lastOdd = n % 2 === 1 && i === n - 1
  return h(
    'li.myths-card',
    { 'data-state': 'myth', style: `--span:${span};--i:${i}`, class: lastOdd ? 'myths-card-wide' : '', ...thread },
    mythBtn,
    factFace,
    sr,
  )
}

function render(c: Content) {
  const M = c.myths
  const t = UI[c.lang]
  const { section, head, body } = sectionShell('myths', {
    eyebrow: M.eyebrow,
    title: M.title,
    lede: M.lede,
    className: 'myths',
  })
  const n = M.items.length

  if (M.hint) {
    head.append(
      h(
        'p.myths-hint',
        { 'data-reveal': 'fade', 'data-delay': '0.3', 'data-thread': 'left' },
        h('span.myths-tap', { 'aria-hidden': 'true' }),
        M.hint,
      ),
    )
  }
  if (!n) return section

  const meter = h(
    'div.myths-meter',
    { 'aria-hidden': 'true' },
    s(
      'svg',
      { class: 'myths-meter-svg', preserveAspectRatio: 'none' },
      s('path', { class: 'myths-meter-tangle' }),
      s('path', { class: 'myths-meter-taut' }),
      s('path', { class: 'myths-meter-knot', pathLength: 1 }),
      s('circle', { class: 'myths-meter-bead', r: 3.6, cx: -10, cy: -10 }),
    ),
  )
  const showAll = h(
    'button.btn.btn-small.myths-showall',
    { type: 'button', 'aria-controls': 'myths-grid' },
    h('span.btn-label.myths-long', null, t.showAll),
    h('span.btn-label.myths-short', null, t.showAllShort),
  )
  const reset = h(
    'button.btn.btn-ghost.btn-small.myths-reset',
    { type: 'button', 'aria-controls': 'myths-grid', title: M.resetLabel, hidden: true },
    undoIcon(),
    h('span.btn-label.myths-reset-label', null, M.resetLabel),
  )
  const dock = h(
    'div.myths-dock',
    { role: 'group', 'aria-label': t.progressLabel, 'data-reveal': 'up' },
    h(
      'p.myths-count',
      null,
      h(
        'span.myths-count-num',
        null,
        h('span.myths-count-mask', null, h('span.myths-count-done', null, '0')),
        h('span.myths-count-sep', { 'aria-hidden': 'true' }, '/'),
        h('span.sr-only', null, ` ${t.of} `),
        h('span.myths-count-total', null, String(n)),
      ),
      h('span.myths-count-word', null, t.progress),
    ),
    meter,
    h('div.myths-actions', null, showAll, reset),
  )

  const spans = rowSpans(n)
  const grid = h(
    'ul.myths-grid#myths-grid',
    { role: 'list', 'data-reveal-stagger': '' },
    M.items.map((m, i) => card(m, i, n, spans[i] ?? 4, c)),
  )
  const live = h('p.sr-only.myths-live', { 'aria-live': 'polite', 'aria-atomic': 'true' })
  // an empty anchor in the gap above the dock: the page thread crosses here, never through the title
  const weave = h('div.myths-weave', { 'aria-hidden': 'true', 'data-thread': 'right', 'data-thread-y': 'top' })
  body.append(weave, dock, grid, live)
  return section
}

/* ------------------------------------------------------------------ the thread meter */
/**
 * A thread that runs across the dock. Its right part is a tangle with `n` clumps (one per myth),
 * drawn as a prolate cycloid with a wandering radius; its left part is pulled taut in atoca.
 * set(p) moves the pull point; p = 1 consumes the whole tangle and ties a knot at the end.
 */
function threadMeter(root: HTMLElement, n: number) {
  const svg = root.querySelector<SVGSVGElement>('svg')!
  const tangle = svg.querySelector<SVGPathElement>('.myths-meter-tangle')!
  const taut = svg.querySelector<SVGPathElement>('.myths-meter-taut')!
  const knot = svg.querySelector<SVGPathElement>('.myths-meter-knot')!
  const bead = svg.querySelector<SVGCircleElement>('.myths-meter-bead')!
  const st = { p: 0, phase: 0 }
  let W = 0
  let H = 0
  const TAU = Math.PI * 2

  const draw = () => {
    if (W < 20) return
    const xs = 10
    const xe = W - 24
    const L = (xe - xs) / n
    const per = L >= 56 ? 3 : L >= 30 ? 2 : 1 // curls per myth
    const a = L / (TAU * per)
    const b1 = clamp(L * 0.09 + 3.4, 3.6, H * 0.2) // small curls
    const b2 = clamp(L * 0.14 + 4, 4, H * 0.28) // slow, wide doubling-back
    const y0 = H / 2
    const p = clamp(st.p, 0, 1)
    const k = n * (1 - p)
    const S = TAU * per * k
    const ph = st.phase
    const w2 = 0.41 // incommensurate with the curls, so the snarl never looks periodic

    // a centred trochoid (curls) riding a slow wander that doubles back over itself. It is parametrised from
    // the fixed right end, so clumps stay put and are consumed from the left as the thread is pulled.
    let d = `M ${(W - 3).toFixed(1)} ${y0.toFixed(1)} L ${xe.toFixed(1)} ${y0.toFixed(1)}`
    let px = xe
    let py = y0
    if (S > 0.02) {
      const steps = Math.max(6, Math.ceil(S / 0.16))
      for (let j = 1; j <= steps; j++) {
        const sv = (j / steps) * S
        // taper at both ends: the snarl hangs off the fixed end, and straightens where it is pulled
        const ramp = Math.min(1, sv / 3, (S - sv) / 4)
        const pull = Math.min(1, (S - sv) / 2.2)
        const b = pull * b1 * (0.82 + 0.2 * Math.sin(0.53 * sv + 1.7 + ph) + 0.12 * Math.sin(1.7 * sv + ph * 1.3))
        const x = xe - b - a * sv + b * Math.cos(sv) - b2 * ramp * Math.sin(w2 * sv + ph * 0.6)
        const y = y0 + b * Math.sin(sv) * 0.92 + b2 * 0.6 * ramp * Math.sin(w2 * 1.37 * sv + 0.8 + ph)
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
        px = x
        py = y
      }
    }
    tangle.setAttribute('d', S > 0.02 ? d : '')

    // the taut part, from the left end to where it is pulled out of the tangle
    let t = ''
    if (S <= 0.02) t = `M ${xs} ${y0.toFixed(1)} L ${xe.toFixed(1)} ${y0.toFixed(1)}`
    else if (px - xs > 2) {
      const q = Math.max(xs, px - 16)
      t = `M ${xs} ${y0.toFixed(1)} L ${q.toFixed(1)} ${y0.toFixed(1)} Q ${(q + 10).toFixed(1)} ${y0.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}`
    }
    taut.setAttribute('d', t)
    bead.setAttribute('cx', (S <= 0.02 ? xs : px).toFixed(1))
    bead.setAttribute('cy', (S <= 0.02 ? y0 : py).toFixed(1))
    bead.style.opacity = S <= 0.02 ? '0' : '1'

    // the knot at the end (shown by .is-complete)
    const r = 7.5
    knot.setAttribute(
      'd',
      `M ${(xe - 14).toFixed(1)} ${y0.toFixed(1)} L ${xe.toFixed(1)} ${y0.toFixed(1)}` +
        ` C ${(xe + r * 1.6).toFixed(1)} ${y0.toFixed(1)}, ${(xe + r * 2).toFixed(1)} ${(y0 - r * 1.9).toFixed(1)}, ${(xe + r * 0.6).toFixed(1)} ${(y0 - r * 2).toFixed(1)}` +
        ` C ${(xe - r * 0.9).toFixed(1)} ${(y0 - r * 2.1).toFixed(1)}, ${(xe - r * 0.7).toFixed(1)} ${(y0 - r * 0.2).toFixed(1)}, ${(xe + r * 0.5).toFixed(1)} ${(y0 + r * 0.15).toFixed(1)}` +
        ` C ${(xe + r * 1.4).toFixed(1)} ${(y0 + r * 0.4).toFixed(1)}, ${(W - 9).toFixed(1)} ${(y0 + r * 0.5).toFixed(1)}, ${(W - 2).toFixed(1)} ${(y0 + r * 0.9).toFixed(1)}`,
    )
  }

  const resize = () => {
    W = root.clientWidth
    H = root.clientHeight
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    draw()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(root)
  resize()

  // the tangle breathes very slowly while the section is on screen
  let active = false
  const tick = (_t: number, dt: number) => {
    if (!active || motion.reduced) return
    st.phase += dt * 0.00032
    draw()
  }
  gsap.ticker.add(tick)
  onTeardown(() => {
    ro.disconnect()
    gsap.ticker.remove(tick)
  })

  return {
    set(p: number, animate: boolean) {
      gsap.killTweensOf(st, 'p')
      if (!animate || motion.reduced) {
        st.p = p
        draw()
        return
      }
      gsap.to(st, { p, duration: p >= 1 ? 1.4 : 1.15, ease: 'elastic.out(1, 0.55)', onUpdate: draw })
    },
    setActive(on: boolean) {
      active = on
    },
  }
}

/* ------------------------------------------------------------------ behaviour */
interface Rec {
  el: HTMLElement
  myth: HTMLButtonElement
  mythInner: HTMLElement
  factInner: HTMLElement
  back: HTMLButtonElement
  sr: HTMLElement
  data: Myth
  state: State
  want: State
  busy: boolean
}

function enhance(el: HTMLElement, c: Content) {
  const M = c.myths
  const t = UI[c.lang]
  const grid = el.querySelector<HTMLElement>('.myths-grid')
  const dock = el.querySelector<HTMLElement>('.myths-dock')
  if (!grid || !dock) return
  const live = el.querySelector<HTMLElement>('.myths-live')!
  const doneEl = dock.querySelector<HTMLElement>('.myths-count-done')!
  const showAll = dock.querySelector<HTMLButtonElement>('.myths-showall')!
  const reset = dock.querySelector<HTMLButtonElement>('.myths-reset')!

  const recs: Rec[] = Array.from(grid.querySelectorAll<HTMLElement>('.myths-card')).map((li, i) => ({
    el: li,
    myth: li.querySelector<HTMLButtonElement>('.myths-myth')!,
    mythInner: li.querySelector<HTMLElement>('.myths-myth-inner')!,
    factInner: li.querySelector<HTMLElement>('.myths-fact-inner')!,
    back: li.querySelector<HTMLButtonElement>('.myths-back')!,
    sr: li.querySelector<HTMLElement>('.myths-sr')!,
    data: M.items[i],
    state: 'myth',
    want: 'myth',
    busy: false,
  }))
  const n = recs.length
  if (!n) return

  const meter = threadMeter(dock.querySelector<HTMLElement>('.myths-meter')!, n)
  const ctx = scope(el, () => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => meter.setActive(self.isActive),
    })
    if (!motion.reduced) {
      // the thread is laid across the dock the first time it comes into view
      const svg = dock.querySelector('.myths-meter-svg')
      gsap.set(svg, { clipPath: 'inset(0 100% 0 0)' })
      ScrollTrigger.create({
        trigger: dock.parentElement, // the static body, not the sticky dock (its offset changes once stuck)
        start: 'top 88%',
        once: true,
        onEnter: () => gsap.to(svg, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power3.inOut', delay: 0.2 }),
      })
    }
  })

  const timers: number[] = []
  onTeardown(() => {
    timers.forEach((id) => clearTimeout(id))
    // particles still in flight belong to the page being torn down: sweep them so no stale ash drifts
    // over the rebuilt page (dust.ts removes its canvas itself when a run ends, so this is only for runs cut short)
    document.querySelectorAll('.dust-canvas').forEach((cv) => cv.remove())
  })
  const wait = (ms: number) =>
    new Promise<void>((res) => {
      if (ms <= 0) return res()
      timers.push(window.setTimeout(res, ms))
    })

  const announce = (msg: string) => {
    live.textContent = ''
    timers.push(window.setTimeout(() => (live.textContent = msg), 60))
  }

  /* ---------- progress */
  let shown = 0
  const refresh = (animate = true) => {
    const k = recs.filter((r) => r.want === 'fact').length
    if (k !== shown) {
      const up = k > shown
      doneEl.textContent = String(k)
      if (animate && !motion.reduced) {
        ctx.add(() =>
          gsap.fromTo(doneEl, { yPercent: up ? 90 : -90 }, { yPercent: 0, duration: 0.6, ease: 'expo.out', overwrite: true }),
        )
      }
      shown = k
    }
    const focusShowAll = document.activeElement === showAll
    const focusReset = document.activeElement === reset
    showAll.hidden = k >= n
    reset.hidden = k === 0
    if (focusShowAll && showAll.hidden) reset.focus({ preventScroll: true })
    if (focusReset && reset.hidden) showAll.focus({ preventScroll: true })
    dock.classList.toggle('is-complete', k === n)
    meter.set(k / n, animate)
  }

  /* ---------- one card */
  const inView = (node: HTMLElement) => {
    const r = node.getBoundingClientRect()
    return r.bottom > 24 && r.top < innerHeight - 24 && parseFloat(getComputedStyle(node).opacity) > 0.5
  }
  const settle = (r: Rec) => gsap.set([r.mythInner, r.factInner], { clearProps: 'opacity,visibility' })
  const apply = (r: Rec, state: State) => {
    r.el.dataset.state = state
    r.myth.setAttribute('aria-expanded', String(state === 'fact'))
    r.sr.hidden = state === 'fact'
  }

  async function turn(r: Rec, target: State, animate: boolean) {
    const out = target === 'fact' ? r.mythInner : r.factInner
    const inn = target === 'fact' ? r.factInner : r.mythInner
    if (!animate) {
      apply(r, target)
      settle(r)
      return
    }
    r.busy = true
    inn.style.visibility = 'hidden'
    r.el.setAttribute('data-busy', '')
    apply(r, target)
    const dir = target === 'fact' ? 'right' : 'left'
    try {
      await Promise.all([
        disintegrate(out, { direction: dir, sweep: target === 'fact' ? 0.8 : 0.6, wind: target === 'fact' ? 1 : 0.8 }),
        wait(motion.reduced ? 0 : target === 'fact' ? 480 : 380).then(() =>
          assemble(inn, { direction: dir, sweep: target === 'fact' ? 0.75 : 0.55 }),
        ),
      ])
    } finally {
      r.el.removeAttribute('data-busy')
      settle(r)
      r.busy = false
    }
  }

  async function go(r: Rec, target: State, animate: boolean) {
    r.want = target
    if (r.busy) return
    while (r.state !== r.want) {
      const next = r.want
      const focusOwner = next === 'fact' ? r.myth : r.back
      const focusTarget = next === 'fact' ? r.back : r.myth
      const hadFocus = document.activeElement === focusOwner
      await turn(r, next, animate && inView(r.el))
      r.state = next
      // the button the reader pressed is now hidden: hand focus to its counterpart (unless they moved on)
      const active = document.activeElement
      if (active === focusOwner || (hadFocus && (active === document.body || active === null))) {
        focusTarget.focus({ preventScroll: true })
      }
    }
  }

  const untangle = (r: Rec) => {
    if (r.want === 'fact') return
    void go(r, 'fact', true)
    refresh()
    const tail = shown === n ? ` ${t.complete}` : ` (${shown} ${t.of} ${n})`
    announce(`${M.factLabel}${colon(c.lang)}${plain(r.data.fact)}${tail}`)
  }
  const retangle = (r: Rec) => {
    if (r.want === 'myth') return
    void go(r, 'myth', true)
    refresh()
  }

  for (const r of recs) {
    r.myth.addEventListener('click', () => untangle(r))
    r.back.addEventListener('click', () => retangle(r))
  }

  /* ---------- all at once */
  const cascade = (target: State, gap: number) => {
    const todo = recs.filter((r) => r.want !== target)
    let j = 0
    for (const r of todo) {
      if (motion.reduced || !inView(r.el)) {
        void go(r, target, motion.reduced)
      } else {
        r.want = target // count it right away; the card turns in sequence
        const delay = j++ * gap
        void wait(delay).then(() => {
          if (r.want === target) void go(r, target, true)
        })
      }
    }
    refresh()
  }
  showAll.addEventListener('click', () => {
    cascade('fact', 150)
    announce(`${t.allShown} ${t.complete} ${n} ${t.of} ${n}.`)
  })
  reset.addEventListener('click', () => {
    cascade('myth', 90)
    announce(t.allReset)
  })
  magnetic(showAll, 0.18)

  /* ---------- pointer spotlight on myth cards (fine pointers only) */
  if (motion.finePointer && !motion.reduced) {
    const onMove = (e: PointerEvent) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>('.myths-card')
      if (!li) return
      const b = li.getBoundingClientRect()
      li.style.setProperty('--mx', `${(e.clientX - b.left).toFixed(0)}px`)
      li.style.setProperty('--my', `${(e.clientY - b.top).toFixed(0)}px`)
    }
    grid.addEventListener('pointermove', onMove, { passive: true })
    onTeardown(() => grid.removeEventListener('pointermove', onMove))
  }

  refresh(false)
}

export const mythsSection: SectionDef = { id: 'myths', render, enhance }
