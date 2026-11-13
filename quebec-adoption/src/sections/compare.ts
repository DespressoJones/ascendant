/**
 * COMPARE: kinds of adoption side by side, then what isn't adoption.
 *
 * Signature: "the thread turns the corner".
 * On wide screens the stage pins. The page's red thread, which came down the left margin, bends 90°
 * and runs under a row of tall cards; vertical scrolling pulls the cards sideways while the thread's
 * tip stays under the card in focus (it rises to full size, the others settle back and dim). At the
 * end the thread turns down again on the right and hands back to the page thread, which ties a knot
 * at "What isn't adoption".
 * Each card shows whether the legal tie with the birth family survives as a tiny drawn thread
 * between two rings: intact (yes), dashed (partly) or cut (no). A cut thread snaps apart when its
 * card comes into focus.
 *
 * Narrow screens, short screens and reduced motion: a native swipe row with scroll-snap, prev/next
 * buttons and the same progress thread under the cards; nothing is pinned or scrubbed.
 */
import type { CompareRow, Content, Lang } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations } from './shared'
import { h, rich, clamp } from '../core/dom'
import { gsap, ScrollTrigger, motion, scope, onTeardown, getLenis } from '../core/motion'
import { magnetic } from '../core/interactions'
import { icon } from '../core/icons'

/* ------------------------------------------------------------------ microcopy (not in the content contract yet) */
const UI = {
  fr: {
    prev: 'Forme précédente',
    next: 'Forme suivante',
    scrollHint: 'Défilez pour comparer',
    swipeHint: 'Glissez pour comparer',
    dragHint: 'Faites glisser ou utilisez les flèches',
    form: 'Forme',
    of: 'sur',
    list: 'Les formes d’adoption, côte à côte',
    legend: { yes: 'maintenu', partial: 'en partie', no: 'remplacé' },
    verdict: { yes: 'Oui', partial: 'En partie', no: 'Non', unknown: '' },
    colon: ' : ',
  },
  en: {
    prev: 'Previous form',
    next: 'Next form',
    scrollHint: 'Scroll to compare',
    swipeHint: 'Swipe to compare',
    dragHint: 'Drag or use the arrows',
    form: 'Form',
    of: 'of',
    list: 'Kinds of adoption, side by side',
    legend: { yes: 'kept', partial: 'partly', no: 'replaced' },
    verdict: { yes: 'Yes', partial: 'Partly', no: 'No', unknown: '' },
    colon: ': ',
  },
} satisfies Record<Lang, unknown>

type Tie = 'yes' | 'partial' | 'no' | 'unknown'
const pad2 = (n: number) => String(n).padStart(2, '0')
const norm = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

/**
 * keepsTie is free text. Writers start it with a short verdict, then " — " and an explanation:
 *   "Non — la filiation adoptive remplace…"  /  "Partly — ties remain during foster care…"
 * The verdict becomes the chip; the rest becomes the explanation.
 */
function parseTie(raw: string, lang: Lang) {
  const text = (raw ?? '').trim()
  let verdict = ''
  let detail = text
  const m = text.match(/^(.{1,34}?)\s*(?:—|–|:|\s-\s)\s*([\s\S]+)$/)
  if (m) {
    verdict = m[1].trim()
    detail = m[2].trim()
  } else {
    const w = text.match(/^(oui|non|yes|no)\b[.,;!]?\s*([\s\S]*)$/i)
    if (w) {
      verdict = w[1]
      detail = w[2].trim()
    }
  }
  const v = norm(verdict || text.split(/[.,;—–]/)[0])
  const kind: Tie = /\b(en partie|partiel\w*|partly|partial\w*|in part|selon|depend\w*|parfois|sometimes|varie\w*|mixte?)\b/.test(v)
    ? 'partial'
    : /^(non|no)\b/.test(v)
      ? 'no'
      : /^(oui|yes)\b/.test(v)
        ? 'yes'
        : 'unknown'
  if (!verdict) verdict = UI[lang].verdict[kind]
  if (detail) detail = detail.charAt(0).toUpperCase() + detail.slice(1)
  return { kind, verdict, detail }
}

/* ------------------------------------------------------------------ small drawings */
function svgFrom(markup: string): SVGSVGElement {
  const t = document.createElement('template')
  t.innerHTML = markup
  return t.content.firstElementChild as SVGSVGElement
}

/** Two rings joined (or not) by a red thread: the legal tie with the birth family. */
function tieGlyph(kind: Tie, cls = '') {
  const wave = 'M8.4 9c5-5 9.4-5 15.6 0s10.6 5 15.6 0'
  const thread = {
    yes: `<path class="g-thread" d="${wave}"/>`,
    partial: `<path class="g-thread g-dash" d="${wave}"/>`,
    no:
      '<g class="g-cut g-cut-l"><path class="g-thread" d="M8.4 9c3.4-3.4 6.4-4.5 9.8-3.4"/><path class="g-fray" d="M18.2 5.6l1.6-1.9M18.3 5.7l2.3.1"/></g>' +
      '<g class="g-cut g-cut-r"><path class="g-thread" d="M29.8 12.4c3.4 1.1 6.4 0 9.8-3.4"/><path class="g-fray" d="M29.8 12.4l-1.6 1.9M29.7 12.3l-2.3-.1"/></g>',
    unknown: `<path class="g-thread g-dot" d="M8.4 9h31.2"/>`,
  }[kind]
  return svgFrom(
    `<svg class="compare-glyph compare-glyph-${kind} ${cls}" viewBox="0 0 48 18" aria-hidden="true" focusable="false">` +
      `<circle class="g-ring" cx="5" cy="9" r="3.4"/><circle class="g-ring" cx="43" cy="9" r="3.4"/>${thread}</svg>`,
  )
}

const coinIcon = () =>
  svgFrom(
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/>' +
      '<path d="M14.6 9.4c-.5-.9-1.5-1.4-2.7-1.4-1.5 0-2.6.8-2.6 1.9 0 2.7 5.5 1.3 5.5 4.3 0 1.1-1.2 1.9-2.8 1.9-1.3 0-2.4-.5-2.9-1.4"/>' +
      '<path d="M12 6.2v1.8M12 16.2V18"/></svg>',
  )
const startIcon = () =>
  svgFrom(
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6" cy="12" r="2.4"/>' +
      '<path d="M8.4 12h11M15.5 8l4 4-4 4"/></svg>',
  )
const tieIcon = () =>
  svgFrom(
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="5" cy="12" r="2.6"/>' +
      '<circle cx="19" cy="12" r="2.6"/><path d="M7.6 12c2.2-2.6 4.2-2.6 4.4 0s2.2 2.6 4.4 0"/></svg>',
  )

/* ------------------------------------------------------------------ render */
function fact(cls: string, label: string, ic: Element, value: string | undefined, wide = false) {
  if (!value) return null
  const dd = h('dd')
  dd.append(rich(value))
  return h('div', { class: `compare-fact compare-fact-${cls}${wide ? ' is-wide' : ''}` }, h('dt', null, ic, h('span', null, label)), dd)
}

function chip(kind: Tie, verdict: string, label: string, lang: Lang) {
  if (!verdict) return null
  return h(
    'p.compare-chip',
    { 'data-tie': kind },
    tieGlyph(kind),
    h('span.sr-only', null, `${label}${UI[lang].colon}`),
    h('span.compare-chip-text', null, verdict),
  )
}

function rowBody(row: CompareRow, c: Content, headingTag: 'h3' | 'h4', idBase: string) {
  const cols = c.compare.columns
  const tie = parseTie(row.keepsTie, c.lang)
  const name = h(headingTag, { class: 'compare-name', id: `${idBase}-name` }, row.name)
  const forWho = row.forWho
    ? (() => {
        const p = h('p.compare-for', null, h('span.compare-for-label', null, icon('people'), cols.forWho))
        p.append(' ', rich(row.forWho))
        return p
      })()
    : null
  const facts = h(
    'dl.compare-facts',
    null,
    fact('tie', cols.keepsTie, tieIcon(), tie.detail, true),
    fact('start', cols.start, startIcon(), row.start, true),
    fact('who', cols.whoDecides, icon('scale'), row.whoDecides, true),
    fact('time', cols.time, icon('clock'), row.time),
    fact('cost', cols.cost, coinIcon(), row.cost),
  )
  return { tie, name, forWho, facts, refs: citations(row.refs, row.sources, c.lang) }
}

function adoptionCard(row: CompareRow, c: Content, i: number) {
  const idBase = `compare-form-${row.id}`
  const b = rowBody(row, c, 'h3', idBase)
  return h(
    'li.compare-item',
    { 'data-i': i },
    h(
      'article.compare-card',
      { 'aria-labelledby': `${idBase}-name`, 'data-tie': b.tie.kind },
      // name first for screen readers; CSS puts the index + chip row on top
      b.name,
      h(
        'div.compare-card-top',
        null,
        h('span.compare-card-index', { 'aria-hidden': 'true' }, pad2(i + 1)),
        chip(b.tie.kind, b.tie.verdict, c.compare.columns.keepsTie, c.lang),
      ),
      b.forWho,
      b.facts,
      b.refs ? h('div.compare-card-refs', null, b.refs) : null,
    ),
  )
}

function altCard(row: CompareRow, c: Content) {
  const idBase = `compare-alt-${row.id}`
  const b = rowBody(row, c, 'h4', idBase)
  return h(
    'li.compare-alt-item',
    null,
    h(
      'article.compare-alt',
      { 'aria-labelledby': `${idBase}-name`, 'data-tie': b.tie.kind },
      b.name,
      chip(b.tie.kind, b.tie.verdict, c.compare.columns.keepsTie, c.lang),
      b.forWho,
      b.facts,
      b.refs ? h('div.compare-card-refs', null, b.refs) : null,
    ),
  )
}

function render(c: Content) {
  const cmp = c.compare
  const ui = UI[c.lang]
  const { section, body } = sectionShell('compare', {
    eyebrow: cmp.eyebrow,
    title: cmp.title,
    lede: cmp.lede,
    className: 'compare',
  })
  body.remove()
  const n = cmp.adoption.length
  const hasAlts = cmp.alternatives.length > 0

  const legend = h(
    'div.compare-legend',
    { 'aria-hidden': 'true' },
    h('span.compare-legend-label', null, cmp.columns.keepsTie),
    h(
      'ul',
      null,
      (['yes', 'partial', 'no'] as const).map((k) => h('li', { 'data-tie': k }, tieGlyph(k), h('span', null, ui.legend[k]))),
    ),
  )

  const prev = h(
    'button.compare-navbtn.compare-prev',
    { type: 'button', 'aria-label': ui.prev, 'aria-controls': 'compare-viewport', 'aria-disabled': 'true' },
    icon('arrow'),
  )
  const next = h(
    'button.compare-navbtn.compare-next',
    { type: 'button', 'aria-label': ui.next, 'aria-controls': 'compare-viewport' },
    icon('arrow'),
  )

  const bar = h(
    'div.wrap.compare-bar',
    null,
    h(
      'p.compare-count',
      { 'aria-hidden': 'true' },
      h('span.compare-count-roll', null, h('span', null, pad2(n ? 1 : 0))),
      h('span.compare-count-total', null, `/ ${pad2(n)}`),
    ),
    h('p.compare-hint', { 'aria-hidden': 'true' }, h('span.compare-hint-text', null, ui.swipeHint), icon('arrow')),
    legend,
    h('div.compare-nav', null, prev, next),
  )

  const end = hasAlts
    ? h(
        'a.compare-end',
        { href: '#compare-alts', 'data-reveal': 'up' },
        tieGlyph('yes', 'compare-end-glyph'),
        h('span.compare-end-title', null, cmp.alternativesTitle),
        h('span.compare-end-arrow', null, icon('arrow-down')),
      )
    : null

  const track = h(
    'div.compare-track',
    null,
    h(
      'ol.compare-list',
      { 'data-reveal-stagger': '' },
      cmp.adoption.map((row, i) => adoptionCard(row, c, i)),
    ),
    end,
  )

  const viewport = h(
    'div.compare-viewport#compare-viewport',
    { role: 'region', 'aria-label': ui.list, tabindex: '0', 'data-lenis-prevent-horizontal': '' },
    track,
  )

  const ticks = [...cmp.adoption.map((r) => r.name), ...(hasAlts ? [cmp.alternativesTitle] : [])].map((label, i, all) =>
    h(
      'button.compare-tick',
      { type: 'button', tabindex: '-1', 'data-i': i, class: i === all.length - 1 && hasAlts ? 'is-end' : '' },
      h('span.compare-tick-knot'),
      h('span.compare-tick-label', null, label),
    ),
  )
  const rail = h('div.wrap.compare-rail', { 'aria-hidden': 'true' }, h('div.compare-rail-inner', null, ticks))

  const threadSvg = svgFrom(
    '<svg class="compare-thread" aria-hidden="true" focusable="false"><path class="compare-thread-ghost"/>' +
      '<path class="compare-thread-live"/><circle class="compare-thread-halo" r="11"/><circle class="compare-thread-tip" r="4.5"/></svg>',
  )

  const stage = h(
    'div.compare-stage.is-swipe',
    null,
    threadSvg,
    h('div.compare-stage-inner', null, bar, viewport, rail),
    h('p.sr-only.compare-live', { 'aria-live': 'polite', 'aria-atomic': 'true' }),
  )

  // the page thread enters the stage exactly where the stage draws its own corner
  const anchorIn = h('div.compare-anchor', { 'data-thread': 'left', 'data-thread-y': 'top', 'aria-hidden': 'true' })

  let alts: HTMLElement | null = null
  if (hasAlts) {
    const cols = cmp.alternatives.length <= 2 ? cmp.alternatives.length : cmp.alternatives.length === 4 ? 2 : 3
    alts = h(
      'div.wrap.compare-alts#compare-alts',
      { tabindex: '-1' },
      h(
        'div.compare-alts-head',
        null,
        h('h3.compare-alts-title', { 'data-thread': 'right', 'data-knot': '', 'data-split': 'words' }, cmp.alternativesTitle),
      ),
      h(
        'ul.compare-alts-grid',
        { style: `--cols:${cols}`, 'data-reveal-stagger': '', 'data-thread': 'right', 'data-thread-y': 'bottom' },
        cmp.alternatives.map((row) => altCard(row, c)),
      ),
    )
  }

  section.append(anchorIn, stage)
  if (alts) section.append(alts)
  return section
}

/* ------------------------------------------------------------------ behaviour */
type Mode = 'pin' | 'swipe'

interface Geo {
  W: number
  H: number
  y: number
  xa: number
  xb: number
  L1: number
  Lh: number
  L2: number
  a: number
  b: number
  D: number
  centers: number[]
  p: number[]
  step: number
  total: number
}

/** length of the quadratic quarter-corner used at each bend (sampled) */
function quadLen(r: number) {
  let len = 0
  let px = 0
  let py = -r
  for (let i = 1; i <= 24; i++) {
    const t = i / 24
    // P0 (0,-r)  P1 (0,0)  P2 (r,0)
    const x = t * t * r
    const y = (1 - t) * (1 - t) * -r
    len += Math.hypot(x - px, y - py)
    px = x
    py = y
  }
  return len
}

function enhance(el: HTMLElement, c: Content) {
  const ui = UI[c.lang]
  const stage = el.querySelector<HTMLElement>('.compare-stage')
  if (!stage) return
  const inner = stage.querySelector<HTMLElement>('.compare-stage-inner')!
  const viewport = stage.querySelector<HTMLElement>('.compare-viewport')!
  const track = stage.querySelector<HTMLElement>('.compare-track')!
  const railInner = stage.querySelector<HTMLElement>('.compare-rail-inner')!
  const svg = stage.querySelector<SVGSVGElement>('.compare-thread')!
  const ghost = svg.querySelector<SVGPathElement>('.compare-thread-ghost')!
  const live = svg.querySelector<SVGPathElement>('.compare-thread-live')!
  const tip = svg.querySelector<SVGCircleElement>('.compare-thread-tip')!
  const halo = svg.querySelector<SVGCircleElement>('.compare-thread-halo')!
  const liveRegion = stage.querySelector<HTMLElement>('.compare-live')!
  const hint = stage.querySelector<HTMLElement>('.compare-hint-text')!
  const roll = stage.querySelector<HTMLElement>('.compare-count-roll')!
  const prevBtn = stage.querySelector<HTMLButtonElement>('.compare-prev')!
  const nextBtn = stage.querySelector<HTMLButtonElement>('.compare-next')!
  const items = [
    ...Array.from(track.querySelectorAll<HTMLElement>('.compare-item')),
    ...Array.from(track.querySelectorAll<HTMLElement>('.compare-end')),
  ]
  const cards = items.map((it) => it.querySelector<HTMLElement>('.compare-card') ?? it)
  const ticks = Array.from(railInner.querySelectorAll<HTMLButtonElement>('.compare-tick'))
  const names = [...c.compare.adoption.map((r) => r.name), ...(c.compare.alternatives.length ? [c.compare.alternativesTitle] : [])]
  const nForms = c.compare.adoption.length
  if (!items.length) return

  const ctx = scope(el, () => {})
  let mode: Mode | null = null
  let pinCtx: gsap.Context | null = null
  let pinST: ScrollTrigger | null = null
  let current = -1
  let pending: number | null = null
  let pendingTimer = 0
  const geo: Geo = { W: 0, H: 0, y: 0, xa: 0, xb: 0, L1: 0, Lh: 0, L2: 0, a: 0, b: 0, D: 0, centers: [], p: [], step: 1, total: 0 }

  const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64

  /* ---------------- geometry */
  const measure = () => {
    const sr = stage.getBoundingClientRect()
    const rr = railInner.getBoundingClientRect()
    const W = stage.clientWidth
    const H = stage.offsetHeight
    const y = Math.round(rr.top + rr.height / 2 - sr.top)
    const centers = items.map((it) => it.offsetLeft + it.offsetWidth / 2)
    const last = centers.length - 1
    geo.W = W
    geo.H = H
    geo.y = y
    geo.centers = centers
    geo.step = centers.length > 1 ? (centers[last] - centers[0]) / last : 1
    if (mode === 'pin') {
      const g = W < 720 ? 7 : Math.max(18, (W - 1240) / 2 - 24)
      const vpLeft = viewport.getBoundingClientRect().left - sr.left
      const D = Math.max(0, track.offsetWidth - viewport.clientWidth)
      const xa = vpLeft + centers[0]
      const xb = Math.max(xa + 1, vpLeft + centers[last] - D)
      const r = Math.max(4, Math.min(28, (xa - g) / 2, (W - g - xb) / 2, (H - y) / 2))
      const q = quadLen(r)
      const d =
        `M ${g} 0 V ${y - r} Q ${g} ${y} ${g + r} ${y} H ${W - g - r} ` + `Q ${W - g} ${y} ${W - g} ${y + r} V ${H}`
      ghost.setAttribute('d', d)
      live.setAttribute('d', d)
      geo.xa = xa
      geo.xb = xb
      geo.D = D
      geo.L1 = y - r + q + (xa - g - r)
      geo.Lh = xb - xa
      geo.L2 = W - g - r - xb + q + (H - y - r)
      // scroll budget (px) for the descent into the corner and the final turn down
      geo.a = Math.max(90, geo.L1 - innerHeight * 0.62)
      geo.b = Math.max(90, geo.L2 * 0.75)
      const span = centers[last] - centers[0] || 1
      geo.p = centers.map((cx) => (cx - centers[0]) / span)
    } else {
      const xa = rr.left - sr.left
      const xb = rr.right - sr.left
      ghost.setAttribute('d', `M ${xa} ${y} H ${xb}`)
      live.setAttribute('d', `M ${xa} ${y} H ${xb}`)
      geo.xa = xa
      geo.xb = xb
      geo.D = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
      geo.L1 = 0
      geo.Lh = xb - xa
      geo.L2 = 0
      geo.a = geo.b = 0
      // same centre mapping as the pinned row: the focus point sweeps the viewport left → right
      const span = centers[last] - centers[0] || 1
      geo.p = centers.map((cx) => (cx - centers[0]) / span)
    }
    let total = 0
    try {
      total = live.getTotalLength()
    } catch {
      total = 0
    }
    geo.total = total
    live.style.strokeDasharray = `${total} ${total + 10}`
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    // ticks: in pin mode each sits where its card will be when the thread's tip reaches it
    const railLeft = rr.left - sr.left
    ticks.forEach((t, i) => {
      t.style.left = `${geo.xa + (geo.p[i] ?? 0) * (geo.xb - geo.xa) - railLeft}px`
    })
  }

  /* ---------------- paint */
  const setFill = (len: number) => {
    const total = geo.total
    const l = clamp(len, 0, total)
    live.style.strokeDashoffset = String(total - l)
    // once the stage's thread is complete the page thread carries the needle again
    const show = l > 0.5 && l < total - 0.5
    tip.style.opacity = halo.style.opacity = show ? '1' : '0'
    if (show && live.getAttribute('d')) {
      try {
        const pt = live.getPointAtLength(l)
        tip.setAttribute('cx', pt.x.toFixed(1))
        tip.setAttribute('cy', pt.y.toFixed(1))
        halo.setAttribute('cx', pt.x.toFixed(1))
        halo.setAttribute('cy', pt.y.toFixed(1))
      } catch {
        /* path not laid out yet (hidden or mid re-render) */
      }
    }
  }

  const setCurrent = (i: number) => {
    if (i === current) return
    const dir = i > current ? 1 : -1
    current = i
    items.forEach((it, k) => it.classList.toggle('is-current', k === i))
    ticks.forEach((t, k) => t.classList.toggle('is-current', k === i))
    prevBtn.setAttribute('aria-disabled', String(i <= 0))
    nextBtn.setAttribute('aria-disabled', String(i >= items.length - 1))
    // rolling counter
    const txt = pad2(Math.min(i, nForms - 1) + 1)
    const old = roll.lastElementChild as HTMLElement | null
    if (old?.textContent === txt) return
    const fresh = h('span', null, txt)
    roll.append(fresh)
    if (motion.reduced || !old) {
      old?.remove()
      return
    }
    ctx.add(() => {
      gsap.fromTo(fresh, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.6, ease: 'expo.out' })
      gsap.to(old, { yPercent: -100 * dir, duration: 0.6, ease: 'expo.out', onComplete: () => old.remove() })
    })
  }

  const nearest = (p: number) => {
    let best = 0
    let bd = Infinity
    geo.p.forEach((pi, k) => {
      const d = Math.abs(pi - p)
      if (d < bd - 1e-6) {
        bd = d
        best = k
      }
    })
    return best
  }

  const markTicks = (p: number) => {
    ticks.forEach((t, k) => t.classList.toggle('is-sewn', (geo.p[k] ?? 0) <= p + 0.002))
  }

  /** notches: between two ticks the row eases, so each card rests under the needle for a moment */
  const notch = (p: number) => {
    const ps = geo.p
    if (ps.length < 2) return p
    let k = 0
    while (k < ps.length - 2 && p > ps[k + 1]) k++
    const a = ps[k]
    const b = ps[k + 1]
    if (b <= a) return p
    const dwell = 0.34
    const u = clamp(((p - a) / (b - a) - dwell / 2) / (1 - dwell), 0, 1)
    return a + u * u * (3 - 2 * u) * (b - a)
  }

  const paintPin = () => {
    if (mode !== 'pin' || !pinST) return
    const vh = innerHeight
    const local = pinST.scroll() - pinST.start
    const pre = Math.min(vh * 0.62, geo.L1)
    let fill: number
    let p: number
    if (local <= 0) {
      fill = clamp(local + vh * 0.62, 0, pre)
      p = 0
    } else if (local < geo.a) {
      fill = pre + (geo.L1 - pre) * (local / geo.a)
      p = 0
    } else if (local < geo.a + geo.D) {
      p = notch(geo.D > 0 ? (local - geo.a) / geo.D : 1)
      fill = geo.L1 + p * geo.Lh
    } else {
      p = 1
      fill = geo.L1 + geo.Lh + geo.L2 * clamp((local - geo.a - geo.D) / geo.b, 0, 1)
    }
    track.style.transform = `translate3d(${(-p * geo.D).toFixed(2)}px,0,0)`
    setFill(fill)
    markTicks(p)
    // focus: the card under the thread's tip stands up, the others settle back
    const c0 = geo.centers[0]
    const span = geo.centers[geo.centers.length - 1] - c0
    cards.forEach((card, k) => {
      const d = Math.abs(geo.centers[k] - c0 - p * span) / (geo.step || 1)
      const f = 1 - Math.min(1, d)
      card.style.setProperty('--f', (f * f * (3 - 2 * f)).toFixed(3))
    })
    setCurrent(nearest(p))
  }

  const paintSwipe = () => {
    if (mode !== 'swipe') return
    const p = geo.D > 0 ? clamp(viewport.scrollLeft / geo.D, 0, 1) : 0
    setFill(p * geo.Lh)
    markTicks(p)
    setCurrent(nearest(p))
  }

  let raf = 0
  const onViewportScroll = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(paintSwipe)
  }
  viewport.addEventListener('scroll', onViewportScroll, { passive: true })
  onTeardown(() => {
    viewport.removeEventListener('scroll', onViewportScroll)
    cancelAnimationFrame(raf)
  })

  /* ---------------- modes */
  const clearPin = () => {
    pinCtx?.revert()
    pinCtx = null
    pinST = null
    track.style.transform = ''
    cards.forEach((card) => card.style.removeProperty('--f'))
  }

  const setClasses = (m: Mode) => {
    stage.classList.toggle('is-pin', m === 'pin')
    stage.classList.toggle('is-swipe', m === 'swipe')
    el.classList.toggle('compare-is-pinned', m === 'pin')
    hint.textContent = m === 'pin' ? ui.scrollHint : motion.finePointer ? ui.dragHint : ui.swipeHint
  }

  // density levels for the pinned card, tried in order until the stage fits the screen
  let level = -1
  const setLevel = (k: number) => {
    stage.classList.toggle('is-compact', k >= 1)
    stage.classList.toggle('is-dense', k >= 2)
  }
  const decide = (): { m: Mode; lv: number } => {
    if (motion.reduced || innerWidth < 1000) return { m: 'swipe', lv: 0 }
    setClasses('pin')
    for (let k = 0; k < 3; k++) {
      setLevel(k)
      const fits = inner.offsetHeight + headerH() + 8 <= innerHeight && track.offsetWidth - viewport.clientWidth > 80
      if (fits) return { m: 'pin', lv: k }
    }
    return { m: 'swipe', lv: 0 }
  }

  const apply = (force = false) => {
    const prevMode = mode
    const { m: next, lv } = decide()
    setClasses(next)
    setLevel(lv)
    const levelChanged = lv !== level
    level = lv
    if (next === prevMode && !force) {
      if (next === 'swipe') {
        measure()
        paintSwipe()
      } else if (levelChanged) ScrollTrigger.refresh()
      return
    }
    clearPin()
    mode = next
    current = -1
    if (next === 'pin') {
      pinCtx = gsap.context(() => {
        pinST = ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: () => {
            measure()
            return `+=${Math.round(geo.a + geo.D + geo.b)}`
          },
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        })
        ScrollTrigger.create({
          trigger: stage,
          start: 'top bottom',
          end: () => (pinST ? pinST.end + innerHeight : 'bottom top'),
          invalidateOnRefresh: true,
          onUpdate: paintPin,
          onRefresh: paintPin,
        })
      }, el)
    } else {
      viewport.scrollLeft = 0
      measure()
      paintSwipe()
    }
    if (prevMode !== null) ScrollTrigger.refresh()
  }

  apply(true)
  // first paint for the pinned mode happens on the next refresh; do a direct one now too
  if (mode === 'pin') {
    measure()
    paintPin()
  }

  let resizeTimer = 0
  let lastW = innerWidth
  let lastH = innerHeight
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 80 && mode === 'pin') return
      lastW = innerWidth
      lastH = innerHeight
      apply()
    }, 220)
  }
  window.addEventListener('resize', onResize)
  document.fonts?.ready.then(() => {
    if (el.isConnected) apply()
  })
  onTeardown(() => {
    window.removeEventListener('resize', onResize)
    window.clearTimeout(resizeTimer)
    window.clearTimeout(pendingTimer)
    clearPin()
  })

  /* ---------------- navigation */
  const announce = (i: number) => {
    const k = clamp(i, 0, items.length - 1)
    liveRegion.textContent =
      k < nForms ? `${ui.form} ${k + 1} ${ui.of} ${nForms}${ui.colon}${names[k]}` : names[k] ?? ''
  }

  const go = (i: number, opts: { announce?: boolean; quick?: boolean } = {}) => {
    const k = clamp(i, 0, items.length - 1)
    pending = k
    window.clearTimeout(pendingTimer)
    pendingTimer = window.setTimeout(() => (pending = null), 900)
    if (mode === 'pin' && pinST) {
      const y = pinST.start + geo.a + (geo.p[k] ?? 0) * geo.D + 1
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(y, { duration: opts.quick ? 0.6 : 1.1 })
      else window.scrollTo({ top: y, behavior: motion.reduced ? 'auto' : 'smooth' })
    } else {
      // phones snap each card to the start; wider rows glide to where the card is in focus
      const left =
        innerWidth < 720 ? Math.min(items[k].offsetLeft - items[0].offsetLeft, geo.D) : (geo.p[k] ?? 0) * geo.D
      viewport.scrollTo({ left, behavior: motion.reduced ? 'auto' : 'smooth' })
    }
    if (opts.announce !== false) announce(k)
  }
  const base = () => pending ?? Math.max(0, current)

  prevBtn.addEventListener('click', () => {
    if (prevBtn.getAttribute('aria-disabled') === 'true' && pending == null) return
    go(base() - 1)
  })
  nextBtn.addEventListener('click', () => {
    if (nextBtn.getAttribute('aria-disabled') === 'true' && pending == null) return
    go(base() + 1)
  })
  ticks.forEach((t, i) => t.addEventListener('click', () => go(i)))
  viewport.addEventListener('keydown', (e) => {
    if (e.target !== viewport) return
    const map: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 }
    if (e.key in map) {
      e.preventDefault()
      go(base() + map[e.key])
    } else if (e.key === 'Home') {
      e.preventDefault()
      go(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      go(items.length - 1)
    }
  })
  // keyboard users tabbing into an off-screen card bring it under the thread
  track.addEventListener('focusin', (e) => {
    if (mode !== 'pin') return
    const i = items.findIndex((it) => it.contains(e.target as Node))
    if (i >= 0 && i !== current) go(i, { announce: false, quick: true })
    viewport.scrollLeft = 0
  })

  /* ---------------- mouse: drag the row (swipe mode, fine pointers) */
  if (motion.finePointer) {
    let startX = 0
    let startLeft = 0
    let dragging = false
    let down = false
    const onDown = (e: PointerEvent) => {
      if (mode !== 'swipe' || e.pointerType !== 'mouse' || e.button !== 0) return
      if ((e.target as HTMLElement).closest('a, button')) return
      down = true
      dragging = false
      startX = e.clientX
      startLeft = viewport.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - startX
      if (!dragging && Math.abs(dx) > 5) {
        dragging = true
        viewport.setPointerCapture(e.pointerId)
        viewport.classList.add('is-dragging')
      }
      if (dragging) viewport.scrollLeft = startLeft - dx
    }
    const onUp = (e: PointerEvent) => {
      if (!down) return
      down = false
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId)
      viewport.classList.remove('is-dragging')
      // a drag is not a click on whatever was under the pointer
      if (dragging) window.setTimeout(() => (dragging = false), 0)
    }
    const onClick = (e: MouseEvent) => {
      if (dragging) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    viewport.addEventListener('pointerdown', onDown)
    viewport.addEventListener('pointermove', onMove)
    viewport.addEventListener('pointerup', onUp)
    viewport.addEventListener('pointercancel', onUp)
    viewport.addEventListener('click', onClick, true)
    onTeardown(() => {
      viewport.removeEventListener('pointerdown', onDown)
      viewport.removeEventListener('pointermove', onMove)
      viewport.removeEventListener('pointerup', onUp)
      viewport.removeEventListener('pointercancel', onUp)
      viewport.removeEventListener('click', onClick, true)
    })
  }

  stage.querySelectorAll<HTMLElement>('.compare-navbtn').forEach((b) => magnetic(b, 0.22))
}

export const compareSection: SectionDef = { id: 'compare', render, enhance }
