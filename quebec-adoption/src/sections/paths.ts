/**
 * PATHS: the core of the guide. "Where are you starting from?"
 *
 * 1. Picker: one tile per situation, in a tablist. A dark plate glides from tile to tile (Flip) and
 *    carries the knot that marks "you are here". On a fine pointer, a tile tilts, its icon's strokes
 *    redraw and an atoca underline grows under its label.
 * 2. Journey: a side rail (sticky on wide screens) with the scenario switch, who it is for, a large
 *    step counter and a step index. On smaller screens a sticky progress pill takes over.
 * 3. Timeline (the signature): the thread is drawn down the axis as you scroll. Beads fill when it
 *    reaches them; at legal milestones it ties a knot that tightens on arrival. The page-wide red
 *    thread is anchored to the axis (data-thread="self"), so on wide screens the site's own thread
 *    leaves the margin, runs through the reader's journey, and leaves again at its end.
 *
 * Deep links: #path-<journey>, #path-<journey>--<scenario>, #path-<journey>--<scenario>--<step>.
 * The selection is written back to the hash, which also keeps it across a language switch.
 */
import type { Content, Journey, Scenario, Step } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations, para, bullets } from './shared'
import { h, s, rich, qsa, slug } from '../core/dom'
import { gsap, ScrollTrigger, Flip, motion, ease, scope, onTeardown, scrollToTarget, refreshSoon } from '../core/motion'
import { tilt } from '../core/interactions'
import { icon, brandMark } from '../core/icons'

/** Words the content contract does not carry yet (see report: suggested `Paths.milestoneLabel`). */
const EXTRA = {
  fr: { milestone: 'Moment décisif' },
  en: { milestone: 'Decisive moment' },
}

const pad = (n: number) => String(n).padStart(2, '0')
const sid = (id: string) => slug(id) || 'x'

const ids = {
  tab: (j: string) => `paths-tab-${j}`,
  panel: (j: string) => `path-${j}`,
  title: (j: string) => `path-${j}-title`,
  scTab: (j: string, sc: string) => `path-${j}-tab-${sc}`,
  scPanel: (j: string, sc: string) => `path-${j}--${sc}`,
}

/** "#path-hospital", "#path-hospital--dpj" or "#path-hospital--dpj--court" → { j, sc } */
function parseHash(hash: string, journeys: Journey[]) {
  if (!hash.startsWith('#path-')) return null
  let raw = hash.slice(6)
  try {
    raw = decodeURIComponent(raw)
  } catch {
    /* keep raw */
  }
  const [j, sc] = raw.split('--')
  const journey = journeys.find((x) => x.id === j)
  if (!journey) return null
  const scenario = sc ? journey.scenarios.find((x) => sid(x.id) === sc) : undefined
  return { j: journey.id as string, sc: scenario ? sid(scenario.id) : null }
}

/** A "when" badge turns maple when it reads as a deadline (≤ …, max., within…). Content may force it. */
const DEADLINE = /^\s*(≤|<)|\b(max\.?|maximum|au plus tard|d['’]ici|within|at the latest|deadline|no later)\b/i
function isDeadline(st: Step) {
  const flag = (st as Step & { deadline?: boolean }).deadline
  if (typeof flag === 'boolean') return flag
  return !!st.when && DEADLINE.test(st.when)
}

/** Normalise every stroke of an icon to length 1, so CSS can redraw it with stroke-dashoffset. */
function drawable<T extends SVGElement>(svg: T) {
  svg.querySelectorAll('path, circle, rect, line, polyline, ellipse').forEach((n) => n.setAttribute('pathLength', '1'))
  return svg
}

/* The knot the thread ties at a milestone: the site's brand knot (core/icons brandMark), turned to run
   down the axis, with its strands extended to meet the track above and below. */
const KNOT_D = 'M16 -6 L16 2 c0 5 2 7 6.5 9.5 S32 16 31.5 20.5 s-6.3 3.6 -8.2 -0.6 s-0.3 -8.4 3.6 -8.1 s4.8 4.6 2.1 8.4 S16 25.8 16 30 L16 38'
const knotNode = () =>
  s(
    'svg',
    { class: 'paths-knot', viewBox: '3.5 -4 25 40', 'aria-hidden': 'true', focusable: 'false' },
    s('circle', { class: 'paths-knot-halo', cx: 26, cy: 15, r: 10.5 }),
    s('path', { class: 'paths-knot-ghost', d: KNOT_D }),
    s('path', { class: 'paths-knot-live', d: KNOT_D, pathLength: 1 }),
  )
const endNode = () =>
  s(
    'svg',
    { class: 'paths-end-svg', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' },
    s('circle', { class: 'paths-end-ring', cx: 12, cy: 12, r: 8 }),
    s('circle', { class: 'paths-end-dot', cx: 12, cy: 12, r: 3.5 }),
  )

/* ================================================================== render */
function plate() {
  const mark = brandMark()
  mark.classList.add('paths-plate-knot')
  mark.querySelector('path')?.setAttribute('pathLength', '1')
  return h('span.paths-tile-plate', { 'aria-hidden': 'true' }, mark)
}

function tile(j: Journey, i: number, selected: boolean) {
  return h(
    'button.paths-tile',
    {
      type: 'button',
      role: 'tab',
      id: ids.tab(j.id),
      'aria-selected': String(selected),
      'aria-controls': ids.panel(j.id),
      tabindex: selected ? '0' : '-1',
      'data-journey': j.id,
    },
    selected ? plate() : null,
    h(
      'span.paths-tile-top',
      null,
      h('span.paths-tile-icon', null, drawable(icon(j.icon))),
      h('span.paths-tile-num', { 'aria-hidden': 'true' }, pad(i + 1)),
    ),
    h('span.paths-tile-label', null, j.label),
    h('span.paths-tile-tagline', null, j.tagline),
  )
}

function pill(c: Content, j: Journey, n: number) {
  const P = c.paths
  return h(
    'div.paths-pill',
    null,
    h('span.paths-pill-icon', { 'aria-hidden': 'true' }, icon(j.icon)),
    h(
      'span.paths-pill-text',
      { 'aria-hidden': 'true' },
      h('span.paths-pill-label', null, j.label),
      h('span.paths-pill-count', null, `${P.stepWord} 1 ${P.ofWord} ${n}`),
    ),
    h('button.paths-pill-back', { type: 'button', 'aria-label': P.backToPicker, title: P.backToPicker, 'data-back': '' }, icon('arrow', 'flip-up')),
    h('span.paths-pill-bar', { 'aria-hidden': 'true' }, h('span')),
  )
}

function stepIndex(j: Journey, sc: Scenario) {
  const base = ids.scPanel(j.id, sid(sc.id))
  return h(
    'nav.paths-index',
    { 'aria-label': sc.label },
    h(
      'ol',
      null,
      sc.steps.map((st, i) =>
        h(
          'li',
          { class: st.milestone ? 'is-milestone' : '' },
          h(
            'a',
            { href: `#${base}--${sid(st.id)}`, 'aria-current': i === 0 ? 'step' : null },
            h('span.paths-index-num', null, pad(i + 1)),
            h('span.paths-index-title', null, st.title),
            st.milestone ? icon('knot', 'paths-index-knot') : null,
          ),
        ),
      ),
    ),
  )
}

function stepItem(c: Content, base: string, st: Step, i: number) {
  const P = c.paths
  const id = `${base}--${sid(st.id)}`
  const deadline = isDeadline(st)

  const who = st.who?.length
    ? h(
        'div.paths-who',
        null,
        h('p.paths-mini', null, icon('people'), P.whoLabel),
        h('ul.paths-chips', null, st.who.map((w) => h('li', null, w))),
      )
    : null
  const rights = st.rights?.length
    ? h('div.paths-rights', null, h('p.paths-mini', null, icon('shield'), P.rightsLabel), bullets(st.rights))
    : null
  const watch = st.watch
    ? h(
        'div.paths-watch',
        { role: 'note' },
        icon('clock'),
        h('p', null, h('strong.paths-watch-label', null, P.watchLabel), ' ', rich(st.watch)),
      )
    : null
  const details = st.details?.length
    ? h(
        'div.paths-details',
        null,
        h(
          'button.paths-more',
          { type: 'button', 'aria-expanded': 'false', 'aria-controls': `${id}-more` },
          h('span.paths-more-plus', { 'aria-hidden': 'true' }),
          h('span', null, P.detailsLabel),
        ),
        h('div.paths-more-body', { id: `${id}-more`, hidden: true }, bullets(st.details)),
      )
    : null

  const card = h(
    'article.paths-card',
    { 'aria-labelledby': `${id}-t` },
    st.milestone ? h('p.paths-tag', null, icon('knot'), EXTRA[c.lang].milestone) : null,
    h('h4.paths-step-title', { id: `${id}-t` }, st.title),
    para(st.body, 'paths-step-body'),
    who,
    rights,
    watch,
    details,
    citations(st.refs, st.sources, c.lang),
  )

  return h(
    'li.paths-step',
    { id, class: st.milestone ? 'is-milestone' : '' },
    h(
      'div.paths-stamp',
      null,
      h('span.paths-stepno', null, `${P.stepWord} `, h('b', null, pad(i + 1))),
      st.when
        ? h('span', { class: `badge paths-when${deadline ? ' badge-watch' : ''}` }, deadline ? icon('clock') : null, st.when)
        : null,
    ),
    // the first node anchors the page-wide thread: it dives into the timeline here
    h('span.paths-node', { 'aria-hidden': 'true', 'data-thread': i === 0 ? 'self' : null }, st.milestone ? knotNode() : h('span.paths-bead')),
    card,
  )
}

function scenarioPanel(c: Content, j: Journey, sc: Scenario, active: boolean, multi: boolean) {
  const scId = sid(sc.id)
  const base = ids.scPanel(j.id, scId)
  return h(
    'div.paths-scenario',
    {
      id: base,
      role: multi ? 'tabpanel' : null,
      'aria-labelledby': multi ? ids.scTab(j.id, scId) : null,
      hidden: !active,
      'data-scenario': scId,
    },
    // narrow screens: the page thread lives in the gutter. The veil hides it along the journey and the
    // hand-off curves carry it into the axis and back out, so it still reads as a single thread.
    h('div.paths-veil', { 'aria-hidden': 'true' }),
    s(
      'svg',
      { class: 'paths-handoff', 'aria-hidden': 'true', focusable: 'false' },
      s('path', { class: 'paths-handoff-ghost' }),
      s('path', { class: 'paths-handoff-ghost' }),
      s('path', { class: 'paths-handoff-in', pathLength: 1 }),
      s('path', { class: 'paths-handoff-out', pathLength: 1 }),
    ),
    h('div.paths-track', { 'aria-hidden': 'true' }, h('span.paths-track-live'), h('span.paths-needle')),
    h('ol.paths-steps', null, sc.steps.map((st, i) => stepItem(c, base, st, i))),
    h(
      'div.paths-end',
      null,
      // …and leaves it again at the end of the journey
      h('span.paths-node.paths-end-mark', { 'aria-hidden': 'true', 'data-thread': 'self' }, endNode()),
      h(
        'div.paths-end-body',
        null,
        sc.outro ? para(sc.outro, 'paths-outro') : null,
        h(
          'button.btn.btn-ghost.btn-small.paths-back',
          { type: 'button', 'data-back': '' },
          icon('arrow', 'flip-up'),
          h('span.btn-label', null, c.paths.backToPicker),
        ),
      ),
    ),
  )
}

function journeyPanel(c: Content, j: Journey, scInit: string | null, active: boolean) {
  const P = c.paths
  const multi = j.scenarios.length > 1
  const k0 = Math.max(0, scInit ? j.scenarios.findIndex((x) => sid(x.id) === scInit) : 0)
  const sc0 = j.scenarios[k0]

  const seg = multi
    ? h(
        'div.paths-seg',
        { role: 'tablist', 'aria-labelledby': ids.title(j.id) },
        j.scenarios.map((sc, k) =>
          h(
            'button.paths-seg-btn',
            {
              type: 'button',
              role: 'tab',
              id: ids.scTab(j.id, sid(sc.id)),
              'aria-selected': String(k === k0),
              'aria-controls': ids.scPanel(j.id, sid(sc.id)),
              tabindex: k === k0 ? '0' : '-1',
              'data-scenario': sid(sc.id),
            },
            k === k0 ? h('span.paths-seg-ind', { 'aria-hidden': 'true' }) : null,
            h('span.paths-seg-label', null, sc.label),
          ),
        ),
      )
    : sc0
      ? h('p.paths-seg-static', null, sc0.label)
      : null

  const infos = j.scenarios.map((sc, k) =>
    h('div.paths-info', { 'data-scenario': sid(sc.id), hidden: k !== k0 }, para(sc.forWho, 'paths-forwho'), stepIndex(j, sc)),
  )

  const counter = h(
    'div.paths-counter',
    { 'aria-hidden': 'true' },
    h('span.paths-counter-word', null, P.stepWord),
    h(
      'span.paths-counter-nums',
      null,
      h('span.paths-counter-now', null, h('span', null, '01')),
      h('span.paths-counter-of', null, `${P.ofWord} ${pad(sc0?.steps.length ?? 0)}`),
    ),
    h('span.paths-counter-bar', null, h('span')),
  )

  const aside = h(
    'div.paths-aside',
    null,
    h(
      'div.paths-aside-head',
      null,
      h('span.paths-aside-icon', { 'aria-hidden': 'true' }, icon(j.icon)),
      h('h3.paths-journey-title', { id: ids.title(j.id) }, j.label),
    ),
    h('p.paths-journey-tagline', null, j.tagline),
    seg,
    infos,
    counter,
    h(
      'button.btn.btn-ghost.btn-small.paths-back.paths-back-aside',
      { type: 'button', 'data-back': '' },
      icon('arrow', 'flip-up'),
      h('span.btn-label', null, P.backToPicker),
    ),
  )

  return h(
    'div.paths-journey',
    { role: 'tabpanel', id: ids.panel(j.id), 'aria-labelledby': ids.tab(j.id), hidden: !active, 'data-journey': j.id },
    h(
      'div.paths-journey-grid',
      null,
      aside,
      h(
        'div.paths-scenarios',
        null,
        j.scenarios.map((sc, k) => scenarioPanel(c, j, sc, k === k0, multi)),
      ),
    ),
  )
}

function render(c: Content) {
  const P = c.paths
  const { section, body } = sectionShell('paths', { eyebrow: P.eyebrow, title: P.title, lede: P.lede, className: 'paths' })
  if (!P.journeys.length) return section

  const init = parseHash(location.hash, P.journeys) ?? { j: P.journeys[0].id as string, sc: null }
  const active = P.journeys.find((j) => j.id === init.j) ?? P.journeys[0]
  const activeSc = active.scenarios.find((x) => sid(x.id) === init.sc) ?? active.scenarios[0]

  const picker = h(
    'div.paths-picker',
    null,
    h('p.paths-picker-label#paths-picker-label', null, P.pickerLabel),
    h(
      'div.paths-tiles',
      {
        role: 'tablist',
        'aria-labelledby': 'paths-picker-label',
        'data-reveal-stagger': '',
        // the page thread runs down the margin past the picker and ties a knot: "you choose here"
        'data-thread': 'left',
        'data-thread-y': 'bottom',
        'data-knot': '',
      },
      P.journeys.map((j, i) => tile(j, i, j.id === active.id)),
    ),
  )

  const stage = h(
    'div.paths-stage',
    null,
    pill(c, active, activeSc?.steps.length ?? 0),
    P.journeys.map((j) => journeyPanel(c, j, j.id === active.id ? init.sc : null, j.id === active.id)),
  )

  body.append(picker, stage)
  return section
}

/* ================================================================== behaviour */
function enhance(el: HTMLElement, c: Content) {
  const P = c.paths
  if (!P.journeys.length) return
  const reduced = motion.reduced
  const journeys = new Map(P.journeys.map((j) => [j.id as string, j]))

  const picker = el.querySelector<HTMLElement>('.paths-picker')!
  const tilesWrap = el.querySelector<HTMLElement>('.paths-tiles')!
  const tiles = qsa<HTMLButtonElement>('.paths-tile', el)
  const stage = el.querySelector<HTMLElement>('.paths-stage')!
  const plateEl = el.querySelector<HTMLElement>('.paths-tile-plate')
  const pillEl = el.querySelector<HTMLElement>('.paths-pill')
  const pillIcon = pillEl?.querySelector<HTMLElement>('.paths-pill-icon')
  const pillLabel = pillEl?.querySelector<HTMLElement>('.paths-pill-label')
  const pillCount = pillEl?.querySelector<HTMLElement>('.paths-pill-count')
  const pillBar = pillEl?.querySelector<HTMLElement>('.paths-pill-bar > span')
  const header = document.querySelector<HTMLElement>('.site-header')
  const panelOf = (j: string) => el.querySelector<HTMLElement>(`.paths-journey[data-journey="${j}"]`)!

  const state = {
    j: tiles.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.journey ?? P.journeys[0].id,
    sc: {} as Record<string, string>,
  }
  for (const p of qsa<HTMLElement>('.paths-journey', el)) {
    state.sc[p.dataset.journey!] = p.querySelector<HTMLElement>('.paths-scenario:not([hidden])')?.dataset.scenario ?? ''
  }

  const ctx = scope(el, () => {
    tiles.forEach((t) => tilt(t, 4))
  })

  const applyVisibility = () => {
    for (const p of qsa<HTMLElement>('.paths-journey', el)) {
      const jid = p.dataset.journey!
      p.hidden = jid !== state.j
      for (const x of qsa<HTMLElement>('.paths-scenario, .paths-info', p)) x.hidden = x.dataset.scenario !== state.sc[jid]
    }
  }
  const activeScenario = () =>
    panelOf(state.j).querySelector<HTMLElement>(`.paths-scenario[data-scenario="${state.sc[state.j]}"]`)

  const writeHash = () => {
    const j = journeys.get(state.j)
    if (!j) return
    const first = j.scenarios[0] ? sid(j.scenarios[0].id) : ''
    const sc = state.sc[state.j]
    const hash = `#${ids.panel(state.j)}${sc && sc !== first ? `--${sc}` : ''}`
    if (location.hash === hash) return
    try {
      history.replaceState(history.state, '', hash)
    } catch {
      /* sandboxed frames can refuse */
    }
  }

  /* ---------------------------------------------------------------- timeline (scrubbed thread) */
  const buildTimeline = (scn: HTMLElement, jp: HTMLElement) => {
    const track = scn.querySelector<HTMLElement>('.paths-track')!
    const live = track.querySelector<HTMLElement>('.paths-track-live')!
    const needle = track.querySelector<HTMLElement>('.paths-needle')!
    const items = qsa<HTMLElement>('.paths-step', scn)
    const nodes = items.map((li) => li.querySelector<HTMLElement>('.paths-node')!)
    const end = scn.querySelector<HTMLElement>('.paths-end-mark')
    const info = jp.querySelector<HTMLElement>(`.paths-info[data-scenario="${scn.dataset.scenario}"]`)
    const links = info ? qsa<HTMLAnchorElement>('.paths-index a', info) : []
    const counterNow = jp.querySelector<HTMLElement>('.paths-counter-now > span')
    const counterOf = jp.querySelector<HTMLElement>('.paths-counter-of')
    const counterBar = jp.querySelector<HTMLElement>('.paths-counter-bar > span')
    const N = items.length
    const j = journeys.get(state.j)!
    if (counterOf) counterOf.textContent = `${P.ofWord} ${pad(N)}`
    if (pillLabel) pillLabel.textContent = j.label
    if (pillIcon) pillIcon.replaceChildren(icon(j.icon))
    if (!N) return null

    // geometry, relative to the scenario panel (offsetTop ignores the enter transforms)
    const yIn = (node: HTMLElement) => {
      let y = node.offsetHeight / 2
      let e: HTMLElement | null = node
      while (e && e !== scn) {
        y += e.offsetTop
        e = e.offsetParent as HTMLElement | null
      }
      return y
    }
    const main = el.closest('main') ?? document.body
    const veil = scn.querySelector<HTMLElement>('.paths-veil')
    const handoff = scn.querySelector<SVGSVGElement>('.paths-handoff')
    const handIn = handoff?.querySelector<SVGPathElement>('.paths-handoff-in')
    const handOut = handoff?.querySelector<SVGPathElement>('.paths-handoff-out')
    let len = 1
    let marks: number[] = []
    const measure = () => {
      if (scn.hidden) return
      const top = yIn(nodes[0])
      const bottom = end ? yIn(end) : yIn(nodes[N - 1])
      len = Math.max(1, bottom - top)
      track.style.top = `${top}px`
      track.style.height = `${len}px`
      marks = nodes.map((n) => yIn(n) - top)

      // narrow screens (same rule as core/thread.ts): bend the gutter thread into the axis and back
      const narrow = main.clientWidth < 720
      scn.classList.toggle('is-narrow', narrow)
      if (!narrow || !veil || !handoff || !handIn || !handOut) return
      const m = main.getBoundingClientRect()
      const sr = scn.getBoundingClientRect()
      const nr = nodes[0].getBoundingClientRect()
      const dx = sr.left - m.left // panel → main's left edge
      const gx = 7 // page thread gutter, see core/thread.ts
      const ax = nr.left + nr.width / 2 - m.left
      const reach = 34
      veil.style.cssText = `left:${-dx}px;width:${Math.max(0, dx + 4)}px;top:${top - reach}px;height:${len + reach * 2}px`
      const w = Math.ceil(ax + 4)
      handoff.style.cssText = `left:${-dx}px;width:${w}px;height:${scn.offsetHeight}px`
      handoff.setAttribute('viewBox', `0 0 ${w} ${scn.offsetHeight}`)
      const dIn = `M ${gx} ${top - reach} C ${gx} ${top - 10}, ${ax} ${top - 22}, ${ax} ${top}`
      const dOut = `M ${ax} ${bottom} C ${ax} ${bottom + 22}, ${gx} ${bottom + 10}, ${gx} ${bottom + reach}`
      handIn.setAttribute('d', dIn)
      handOut.setAttribute('d', dOut)
      const ghosts = handoff.querySelectorAll('.paths-handoff-ghost')
      ghosts[0]?.setAttribute('d', dIn)
      ghosts[1]?.setAttribute('d', dOut)
    }
    measure()

    let current = 0
    const setCurrent = (n: number) => {
      if (n === current) return
      const dir = n > current ? 1 : -1
      current = n
      items.forEach((li, i) => li.classList.toggle('is-current', i === n - 1))
      links.forEach((a, i) => {
        if (i === n - 1) a.setAttribute('aria-current', 'step')
        else a.removeAttribute('aria-current')
        a.parentElement?.classList.toggle('is-done', i < n - 1)
      })
      if (counterNow) {
        counterNow.textContent = pad(n)
        if (!reduced) gsap.fromTo(counterNow, { yPercent: 80 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: ease.out, overwrite: true })
      }
      if (counterBar) counterBar.style.transform = `scaleX(${n / N})`
      if (pillCount) pillCount.textContent = `${P.stepWord} ${n} ${P.ofWord} ${N}`
      if (pillBar) pillBar.style.transform = `scaleX(${n / N})`
    }
    const reachedAt = (tip: number) => {
      let r = 0
      for (let i = 0; i < N; i++) if (tip >= marks[i] - 1) r = i + 1
      return r
    }

    const prog = { p: 0 }
    const paint = () => {
      const tip = prog.p * len
      const started = prog.p > 0.001
      live.style.transform = `scaleY(${prog.p})`
      needle.style.transform = `translate3d(0, ${tip.toFixed(1)}px, 0)`
      needle.classList.toggle('is-on', started && prog.p < 0.999)
      const r = started ? reachedAt(tip) : 0
      const done = started && tip >= len - 1
      items.forEach((li, i) => li.classList.toggle('is-reached', i < r))
      end?.classList.toggle('is-reached', done)
      handoff?.classList.toggle('is-in', started)
      handoff?.classList.toggle('is-out', done)
      setCurrent(Math.max(1, r))
    }

    const triggers: ScrollTrigger[] = []
    let tween: gsap.core.Tween | null = null
    if (reduced) {
      // a static, fully drawn thread; the counter still follows the reading position
      live.style.transform = 'scaleY(1)'
      items.forEach((li) => li.classList.add('is-reached'))
      end?.classList.add('is-reached')
      handoff?.classList.add('is-in', 'is-out')
      setCurrent(1)
      triggers.push(
        ScrollTrigger.create({
          trigger: track,
          start: 'top 62%',
          end: 'bottom 62%',
          onUpdate: (self) => setCurrent(Math.max(1, reachedAt(self.progress * len))),
        }),
      )
    } else {
      // same tip height as the page thread (62% of the viewport) so both threads stay as one
      tween = gsap.to(prog, {
        p: 1,
        ease: 'none',
        onUpdate: paint,
        scrollTrigger: { trigger: track, start: 'top 62%', end: 'bottom 62%', scrub: 0.8 },
      })
      paint()
      if (pillEl) {
        // the pill shows while the steps are being read AND it is actually stuck under the header
        // (never over the journey title); read from geometry so it can't go stale after a refresh
        const list = scn.querySelector<HTMLElement>('.paths-steps')!
        const syncPill = () => {
          if (!pillEl.offsetParent) return
          const vh = innerHeight
          const lr = list.getBoundingClientRect()
          const stuck = stage.getBoundingClientRect().top < (header?.offsetHeight ?? 64) + 12
          pillEl.classList.toggle('is-on', stuck && lr.top < vh * 0.4 && lr.bottom > vh * 0.4)
          pillEl.classList.toggle('is-high', !!header?.classList.contains('is-hidden'))
        }
        triggers.push(ScrollTrigger.create({ start: 0, end: 'max', onUpdate: syncPill, onRefresh: syncPill }))
        syncPill()
      }
    }
    ScrollTrigger.addEventListener('refreshInit', measure)

    return {
      kill() {
        ScrollTrigger.removeEventListener('refreshInit', measure)
        tween?.scrollTrigger?.kill()
        tween?.kill()
        triggers.forEach((t) => t.kill())
        pillEl?.classList.remove('is-on')
      },
    }
  }

  let timeline: { kill(): void } | null = null
  const mountTimeline = () => {
    timeline?.kill()
    const scn = activeScenario()
    timeline = scn ? buildTimeline(scn, panelOf(state.j)) : null
  }

  /* ---------------------------------------------------------------- transitions */
  let swapOut: gsap.core.Tween | null = null
  let swapIn: gsap.core.Tween | null = null
  let swapTargets: Element[] = []
  const settle = () => {
    swapOut?.kill()
    swapIn?.kill()
    swapOut = swapIn = null
    if (swapTargets.length) gsap.set(swapTargets, { clearProps: 'opacity,visibility,transform' })
    swapTargets = []
  }

  /** Fade the outgoing block, swap the DOM, stagger the incoming one in. Safe to interrupt. */
  const transition = (outEls: HTMLElement[], enter: () => Element[], instant = false) => {
    settle()
    const show = () => {
      applyVisibility()
      mountTimeline()
      refreshSoon(60)
      if (reduced) return
      const targets = enter()
      swapTargets = targets
      swapIn = gsap.from(targets, {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: ease.out,
        stagger: 0.06,
        clearProps: 'opacity,visibility,transform',
        onComplete: () => {
          swapIn = null
          swapTargets = []
          refreshSoon(40)
        },
      })
    }
    if (reduced || instant || !outEls.length) return show()
    swapTargets = outEls
    swapOut = gsap.to(outEls, {
      autoAlpha: 0,
      y: -14,
      duration: 0.24,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(outEls, { clearProps: 'opacity,visibility,transform' })
        swapOut = null
        show()
      },
    })
  }

  const visible = (x: Element) => !(x as HTMLElement).hidden && getComputedStyle(x).display !== 'none'
  const enterSteps = (scn: HTMLElement | null) =>
    scn ? [scn.querySelector('.paths-track')!, ...qsa('.paths-step', scn), scn.querySelector('.paths-end')!].filter(Boolean) : []
  const enterJourney = () => {
    const jp = panelOf(state.j)
    const aside = jp.querySelector('.paths-aside')
    return [...(aside ? Array.from(aside.children).filter(visible) : []), ...enterSteps(activeScenario())]
  }
  const enterScenario = () => {
    const jp = panelOf(state.j)
    const info = jp.querySelector<HTMLElement>('.paths-info:not([hidden])')
    return [...(info ? Array.from(info.children).filter(visible) : []), ...enterSteps(activeScenario())]
  }

  /** Move a selection plate into a new parent with Flip (it glides there instead of jumping). */
  const glide = (plateNode: HTMLElement, to: HTMLElement, lift: HTMLElement[], onDone?: () => void) => {
    if (plateNode.parentElement === to) return
    if (reduced) {
      to.prepend(plateNode)
      return
    }
    const st = Flip.getState(plateNode)
    to.prepend(plateNode)
    lift.forEach((t) => t.classList.toggle('is-target', t === to))
    ctx.add(() => {
      Flip.from(st, {
        duration: 0.8,
        ease: ease.out,
        scale: false,
        onComplete: () => {
          to.classList.remove('is-target')
          onDone?.()
        },
      })
    })
  }

  const drawIcon = (t: HTMLElement) => {
    if (reduced) return
    t.classList.remove('is-drawn')
    void t.offsetWidth
    t.classList.add('is-drawn')
  }
  el.addEventListener('animationend', (e) => {
    const t = (e.target as Element).closest?.('.paths-tile')
    if (t && (e as AnimationEvent).animationName === 'paths-draw-sel') t.classList.remove('is-drawn')
  })

  const tieKnot = () => {
    if (reduced || !plateEl) return
    const mark = plateEl.querySelector<SVGSVGElement>('.paths-plate-knot')
    const path = mark?.querySelector('path')
    if (!mark || !path) return
    ctx.add(() => {
      gsap.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, delay: 0.2, ease: 'power2.inOut', overwrite: true })
      gsap.fromTo(mark, { rotate: -30, scale: 0.55 }, { rotate: 0, scale: 1, duration: 1.1, delay: 0.2, ease: ease.spring, overwrite: true })
    })
  }

  /** Bring the journey into view if it is off-screen (below the fold, or scrolled past). */
  const revealStage = () => {
    const r = stage.getBoundingClientRect()
    if (r.top > innerHeight * 0.7 || r.bottom < innerHeight * 0.3) scrollToTarget(stage)
  }

  const selectJourney = (jid: string, opts: { scroll?: boolean; instant?: boolean; write?: boolean } = {}) => {
    if (!journeys.has(jid)) return
    if (jid === state.j) {
      if (opts.scroll) revealStage()
      return
    }
    const tile = tiles.find((t) => t.dataset.journey === jid)!
    const out = qsa<HTMLElement>('.paths-journey', el).filter((p) => !p.hidden)
    state.j = jid
    tiles.forEach((t) => {
      const on = t === tile
      t.setAttribute('aria-selected', String(on))
      t.tabIndex = on ? 0 : -1
    })
    if (plateEl) glide(plateEl, tile, tiles)
    tieKnot()
    drawIcon(tile)
    if (opts.write !== false) writeHash()
    transition(out, enterJourney, opts.instant)
    if (opts.scroll) revealStage()
  }

  const selectScenario = (jid: string, scId: string, opts: { instant?: boolean; write?: boolean } = {}) => {
    const jp = panelOf(jid)
    if (!jp || state.sc[jid] === scId) return
    const btns = qsa<HTMLButtonElement>('.paths-seg-btn', jp)
    const btn = btns.find((b) => b.dataset.scenario === scId)
    if (!btn) return
    const out = qsa<HTMLElement>('.paths-scenario, .paths-info', jp).filter((x) => !x.hidden)
    state.sc[jid] = scId
    btns.forEach((b) => {
      const on = b === btn
      b.setAttribute('aria-selected', String(on))
      b.tabIndex = on ? 0 : -1
    })
    const ind = jp.querySelector<HTMLElement>('.paths-seg-ind')
    if (ind) glide(ind, btn, btns)
    if (jid !== state.j) {
      applyVisibility()
      return
    }
    if (opts.write !== false) writeHash()
    transition(out, enterScenario, opts.instant)
    // switched while deep in the old timeline: go back to the top of the new one
    if (jp.getBoundingClientRect().top < 0 && !opts.instant) scrollToTarget(jp)
  }

  const backToPicker = () => {
    scrollToTarget(picker)
    tiles.find((t) => t.dataset.journey === state.j)?.focus({ preventScroll: true })
  }

  const toggleMore = (btn: HTMLButtonElement) => {
    const body = document.getElementById(btn.getAttribute('aria-controls') || '')
    if (!body) return
    const open = btn.getAttribute('aria-expanded') !== 'true'
    btn.setAttribute('aria-expanded', String(open))
    gsap.killTweensOf(body)
    if (reduced) {
      body.hidden = !open
      refreshSoon()
      return
    }
    if (open) {
      body.hidden = false
      gsap.fromTo(
        body,
        { height: 0, autoAlpha: 0, overflow: 'hidden' },
        { height: 'auto', autoAlpha: 1, duration: 0.6, ease: ease.out, clearProps: 'height,opacity,visibility,overflow', onComplete: () => refreshSoon() },
      )
      gsap.from(body.querySelectorAll('li'), { y: 12, autoAlpha: 0, duration: 0.55, delay: 0.08, stagger: 0.05, ease: ease.out, clearProps: 'opacity,visibility,transform' })
    } else {
      gsap.to(body, {
        height: 0,
        autoAlpha: 0,
        overflow: 'hidden',
        duration: 0.38,
        ease: 'power2.inOut',
        onComplete: () => {
          body.hidden = true
          gsap.set(body, { clearProps: 'height,opacity,visibility,overflow' })
          refreshSoon()
        },
      })
    }
  }

  /* ---------------------------------------------------------------- input */
  el.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    const tileBtn = t.closest<HTMLElement>('.paths-tile')
    if (tileBtn) return selectJourney(tileBtn.dataset.journey!, { scroll: true })
    const seg = t.closest<HTMLElement>('.paths-seg-btn')
    if (seg) return selectScenario(seg.closest<HTMLElement>('.paths-journey')!.dataset.journey!, seg.dataset.scenario!)
    const more = t.closest<HTMLButtonElement>('.paths-more')
    if (more) return toggleMore(more)
    if (t.closest('[data-back]')) backToPicker()
  })

  /** Roving focus for a tablist; `cols` lets ↑/↓ move by rows in a grid of tabs. */
  const roving = (list: HTMLElement[], e: KeyboardEvent, cols: number, pick: (b: HTMLElement) => void) => {
    const i = list.indexOf(document.activeElement as HTMLElement)
    if (i < 0) return
    const last = list.length - 1
    let n = -1
    if (e.key === 'ArrowRight') n = i === last ? 0 : i + 1
    else if (e.key === 'ArrowLeft') n = i === 0 ? last : i - 1
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = last
    else if (e.key === 'ArrowDown' && i + cols <= last) n = i + cols
    else if (e.key === 'ArrowUp' && i - cols >= 0) n = i - cols
    if (n < 0) return
    e.preventDefault()
    list[n].focus()
    pick(list[n])
  }
  const gridCols = () => getComputedStyle(tilesWrap).gridTemplateColumns.split(' ').filter(Boolean).length || 1
  tilesWrap.addEventListener('keydown', (e) => roving(tiles, e, gridCols(), (t) => selectJourney(t.dataset.journey!)))
  for (const seg of qsa<HTMLElement>('.paths-seg', el)) {
    const btns = qsa<HTMLElement>('.paths-seg-btn', seg)
    const jid = seg.closest<HTMLElement>('.paths-journey')!.dataset.journey!
    seg.addEventListener('keydown', (e) => roving(btns, e, 1, (b) => selectScenario(jid, b.dataset.scenario!)))
  }

  /* ---------------------------------------------------------------- deep links */
  const fromHash = (hash: string, instant: boolean, write: boolean) => {
    const sel = parseHash(hash, P.journeys)
    if (!sel) return
    if (sel.sc) selectScenario(sel.j, sel.sc, { instant, write })
    selectJourney(sel.j, { instant, write })
  }
  const onHashChange = () => fromHash(location.hash, false, false)
  // links elsewhere on the page (e.g. "#path-adopt"): select first, so the app's scroll finds a visible target
  const onDocClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.('a[href^="#path-"]')
    if (!a || el.contains(a)) return
    fromHash(a.getAttribute('href')!, true, true)
  }
  addEventListener('hashchange', onHashChange)
  document.addEventListener('click', onDocClick, true)

  /* ---------------------------------------------------------------- boot */
  mountTimeline()
  // content height changes (accordions, swaps, fonts) move every trigger below: re-measure
  const ro = new ResizeObserver(() => refreshSoon())
  ro.observe(stage)

  onTeardown(() => {
    removeEventListener('hashchange', onHashChange)
    document.removeEventListener('click', onDocClick, true)
    ro.disconnect()
    settle()
    timeline?.kill()
  })
}

export const pathsSection: SectionDef = { id: 'paths', render, enhance }
