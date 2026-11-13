/**
 * PRINCIPLES: "Three things to know first".
 *
 * An editorial two-column spread. The left column is sticky: eyebrow, title and a mini-thread index
 * (one bead per principle, each bead carrying the principle's icon). The right column is a tall list of
 * statements: a huge condensed keyword phrase, a plain-language body and citation chips.
 *
 * Signature: "a knot as you read". On wide screens the page-wide red thread is re-routed down the spine
 * of the statements (data-thread="self" on each knot). As a statement crosses the reading line it
 * becomes active: full ink while the others dim, its knot ties itself on the passing thread (stroke-draw,
 * halo, spring tighten), a running stitch is sewn under its key words (the **bold** part of the title),
 * and in the sticky index an atoca bead slides along the mini-thread to its icon (squash and stretch).
 * Principles are not a sequence, so there are no numbers and only the active knot stays tied.
 *
 * Narrow screens and reduced motion: one column, no sticky, every statement in full ink, index hidden.
 * Below the wide breakpoint the anchors switch to data-thread="left" + data-knot, so the page thread runs
 * down the gutter (never through the text) and ties its own knot beside each statement; on the spine our
 * glyph is the knot, so data-knot is dropped there and knots are never drawn twice.
 */
import type { Content, IconName } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations, para } from './shared'
import { h, rich, s } from '../core/dom'
import { gsap, ScrollTrigger, motion, ease, scope, onTeardown, scrollToTarget } from '../core/motion'
import { icon } from '../core/icons'

/* Small UI words this section needs that are not in the content contract (see the final report). */
const UI = {
  fr: { index: 'Les repères de cette section' },
  en: { index: 'In this section' },
} as const

/** Wide layout: sticky column + spine. Keep in sync with principles.css. */
const WIDE = '(min-width: 1000px)'

/**
 * The content contract has no icon per principle, so the id picks one (ids are English slugs shared
 * by FR and EN). Unmatched ids take the first unused fallback, so a section never repeats an icon.
 */
const ICONS: [RegExp, IconName][] = [
  [/interest|best|child|enfant|interet/, 'heart-hand'],
  [/famil|kin|relative|proche/, 'family'],
  [/adopt|perman|filiation|for-life/, 'key'],
  [/right|droit|heard|voice|lawyer|avocat/, 'shield'],
  [/time|delay|delai|clock|deadline/, 'clock'],
  [/court|tribunal|judge|law/, 'scale'],
  [/origin|identity|search/, 'search'],
  [/help|support|aide|ask/, 'people'],
]
const FALLBACK: IconName[] = ['compass', 'leaf', 'doc', 'home', 'globe']

function pickIcons(ids: string[]): IconName[] {
  const used = new Set<IconName>()
  return ids.map((id) => {
    const hit = ICONS.find(([re, name]) => re.test(id.toLowerCase()) && !used.has(name))?.[1]
    const name = hit ?? FALLBACK.find((f) => !used.has(f)) ?? 'compass'
    used.add(name)
    return name
  })
}

/** content markup → plain text (index labels) */
const plain = (t: string) =>
  t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')

/* The knot the thread ties: the site's brand knot turned to run down the spine, its strands extended to
   meet the thread above and below. The strands sit on the glyph's centre line, where the page thread runs. */
const KNOT_D =
  'M16 -6 L16 2 c0 5 2 7 6.5 9.5 S32 16 31.5 20.5 s-6.3 3.6 -8.2 -0.6 s-0.3 -8.4 3.6 -8.1 s4.8 4.6 2.1 8.4 S16 25.8 16 30 L16 38'
/* the same knot without its straight strands: the "untied" ghost must not paint over the red thread */
const KNOT_LOOP_D = 'M16 2 c0 5 2 7 6.5 9.5 S32 16 31.5 20.5 s-6.3 3.6 -8.2 -0.6 s-0.3 -8.4 3.6 -8.1 s4.8 4.6 2.1 8.4 S16 25.8 16 30'

const knotGlyph = () =>
  s(
    'svg',
    { class: 'principles-knot-svg', viewBox: '3.5 -4 25 40', 'aria-hidden': 'true', focusable: 'false' },
    s('circle', { class: 'principles-knot-halo', cx: 26, cy: 15, r: 10.5 }),
    s('path', { class: 'principles-knot-ghost', d: KNOT_LOOP_D }),
    s('path', { class: 'principles-knot-live', d: KNOT_D, pathLength: 1 }),
  )

/**
 * Wide: the thread runs down the spine, through each knot glyph (x = the glyph's centre), and the glyph
 * itself is the knot. Otherwise: the thread keeps to the left gutter and ties its own knot there.
 */
function threadAttrs(wide: boolean, knot: boolean) {
  return { 'data-thread': wide ? 'self' : 'left', 'data-knot': !wide && knot ? '' : null }
}

/* ================================================================== render */
function render(c: Content) {
  const P = c.principles
  const t = UI[c.lang]
  const { section, head, body } = sectionShell('principles', {
    eyebrow: P.eyebrow,
    title: P.title,
    className: 'principles',
  })
  // The head moves into a sticky column, and an anchor inside a sticky box would move with the scroll:
  // the page thread is pinned to the static knots and tail instead.
  head.querySelector('.eyebrow')?.removeAttribute('data-thread')
  head.classList.add('principles-head')

  const items = P.items
  const n = items.length
  if (!n) {
    body.append(head)
    return section
  }
  const icons = pickIcons(items.map((it) => it.id))
  const wide = window.matchMedia(WIDE).matches

  /* ---------- sticky index: a mini-thread with one bead per principle */
  const index = h(
    'nav.principles-index',
    { 'aria-label': t.index },
    h(
      'div.principles-index-track',
      null,
      h('span.principles-slider', { 'aria-hidden': 'true' }),
      h(
        'ul.principles-index-list',
        { role: 'list' },
        items.map((it, i) =>
          h(
            'li.principles-index-item',
            null,
            h(
              'a.principles-index-link',
              { href: `#principles-${it.id}`, 'aria-current': i === 0 ? 'true' : null },
              h('span.principles-bead', { 'aria-hidden': 'true' }, icon(icons[i])),
              h('span.principles-index-label', null, plain(it.title)),
            ),
          ),
        ),
      ),
    ),
  )

  const aside = h('div.principles-aside', null, h('div.principles-sticky', null, head, index))

  /* ---------- statements */
  const list = h(
    'ul.principles-list',
    { role: 'list' },
    items.map((it, i) => {
      const title = h('h3.principles-title', { id: `principles-${it.id}-title` })
      title.append(rich(it.title))
      return h(
        'li.principles-item',
        {
          id: `principles-${it.id}`,
          tabindex: '-1',
          'aria-labelledby': `principles-${it.id}-title`,
          class: i === 0 ? 'is-active' : '',
        },
        // the page thread passes through this knot (spine on wide screens, gutter on narrow ones)
        h('span.principles-knot', { 'aria-hidden': 'true', ...threadAttrs(wide, true) }, knotGlyph()),
        h(
          'div.principles-copy',
          null,
          h('span.principles-icon', { 'aria-hidden': 'true' }, icon(icons[i])),
          title,
          para(it.body, 'principles-body'),
          citations(it.refs, undefined, c.lang),
        ),
      )
    }),
  )
  // where the thread leaves the spine, below the last statement, before it sweeps on to the next section
  const tail = h('div.principles-tail', { 'aria-hidden': 'true', 'data-thread-y': 'bottom', ...threadAttrs(wide, false) })

  body.append(h('div.principles-grid', null, aside, h('div.principles-main', null, list, tail)))
  return section
}

/* ================================================================== behaviour */
function enhance(el: HTMLElement) {
  const items = Array.from(el.querySelectorAll<HTMLElement>('.principles-item'))
  const n = items.length
  if (!n) return
  const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.principles-index-link'))
  const slider = el.querySelector<HTMLElement>('.principles-slider')!
  const track = el.querySelector<HTMLElement>('.principles-index-track')!
  const knots = items.map((it) => it.querySelector<HTMLElement>('.principles-knot')!)
  const tail = el.querySelector<HTMLElement>('.principles-tail')
  const mq = window.matchMedia(WIDE)
  const animate = !motion.reduced
  if (animate) el.classList.add('is-live')

  /* ---------- thread anchors follow the layout (the thread rebuilds itself on resize, after this runs) */
  const syncThread = () => {
    const set = (node: HTMLElement | null, knot: boolean) => {
      if (!node) return
      const a = threadAttrs(mq.matches, knot)
      node.dataset.thread = a['data-thread']
      node.toggleAttribute('data-knot', a['data-knot'] !== null)
    }
    knots.forEach((k) => set(k, true))
    set(tail, false)
  }
  syncThread()
  mq.addEventListener('change', syncThread)
  onTeardown(() => mq.removeEventListener('change', syncThread))

  /* ---------- the bead that slides along the mini-thread */
  const beadTarget = (i: number) => {
    const bead = links[i]?.querySelector<HTMLElement>('.principles-bead')
    if (!bead) return 0
    // offsets relative to the track (the slider's containing block)
    return bead.getBoundingClientRect().top - track.getBoundingClientRect().top
  }
  let active = -1
  const setActive = (i: number, instant = false) => {
    if (i === active || i < 0 || i >= n) return
    const prev = active
    active = i
    items.forEach((it, j) => it.classList.toggle('is-active', j === i))
    links.forEach((a, j) => (j === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')))
    const y = beadTarget(i)
    if (instant || !animate || prev < 0 || !mq.matches) {
      gsap.set(slider, { y, scaleX: 1, scaleY: 1 })
    } else {
      const dist = Math.abs(i - prev)
      gsap.to(slider, { y, duration: 0.55 + dist * 0.12, ease: 'back.out(1.25)', overwrite: 'auto' })
      // squash and stretch, so the bead reads as a soft thing pulled along a thread
      gsap.fromTo(
        slider,
        { scaleY: 1 + 0.18 * Math.min(dist, 2), scaleX: 1 - 0.1 * Math.min(dist, 2) },
        { scaleY: 1, scaleX: 1, duration: 0.9, ease: 'elastic.out(1, 0.42)', overwrite: false },
      )
    }
  }

  // the slider and the mini-thread follow layout changes (fonts, resize, label wrapping)
  const place = () => {
    if (!track.offsetParent) return
    const r = slider.offsetHeight / 2
    track.style.setProperty('--t0', `${(beadTarget(0) + r).toFixed(1)}px`)
    track.style.setProperty('--t1', `${(beadTarget(n - 1) + r).toFixed(1)}px`)
    if (active >= 0) gsap.set(slider, { y: beadTarget(active) })
  }
  const ro = new ResizeObserver(place)
  ro.observe(track)
  onTeardown(() => ro.disconnect())
  place()

  /* ---------- index links: glide to the statement (the reading line then activates it), move focus to it */
  links.forEach((a, i) =>
    a.addEventListener('click', (e) => {
      e.preventDefault()
      const target = items[i]
      // land the statement just above the reading line, so it becomes the active one
      scrollToTarget(target, -Math.round(window.innerHeight * 0.18))
      target.focus({ preventScroll: true })
    }),
  )

  scope(el, () => {
    /* reading line: each statement owns the band between its top and bottom edges as they cross it.
       The statements touch each other, so exactly one is active while the list is on screen; above and
       below the list the nearest one stays active. */
    items.forEach((it, i) => {
      ScrollTrigger.create({
        trigger: it,
        start: 'top 58%',
        end: 'bottom 58%',
        onToggle: (self) => {
          if (self.isActive) setActive(i)
        },
      })
    })
    // the initial state (also after a language switch that lands mid-section)
    const mid = window.innerHeight * 0.58
    let first = 0
    items.forEach((it, i) => {
      if (it.getBoundingClientRect().top <= mid) first = i
    })
    setActive(first, true)

    if (!animate) return

    /* entrances: the icon pops, the keyword phrase is drawn in from the left like thread pulled through
       cloth, then the body and chips rise. (No word splitting: it would let "**permanent**." break before
       the full stop, and it would cut the stitch into pieces.) */
    items.forEach((it) => {
      const mark = it.querySelector<HTMLElement>('.principles-icon')
      const title = it.querySelector<HTMLElement>('.principles-title')!
      const rest = Array.from(it.querySelectorAll<HTMLElement>('.principles-body, .refs'))
      if (mark) gsap.set(mark, { scale: 0.5, autoAlpha: 0 })
      gsap.set(title, { x: -18, autoAlpha: 0, clipPath: 'inset(-20% 100% -30% -6%)' })
      gsap.set(rest, { y: 24, autoAlpha: 0 })
      const tl = gsap.timeline({ paused: true, defaults: { ease: ease.out } })
      if (mark) tl.to(mark, { scale: 1, autoAlpha: 1, duration: 0.8, ease: ease.spring }, 0)
      tl.to(
        title,
        { x: 0, autoAlpha: 1, clipPath: 'inset(-20% -6% -30% -6%)', duration: 1.3, ease: 'power3.inOut', clearProps: 'clipPath' },
        0.05,
      )
        .to(rest, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0.45)
        // once the phrase is in, the knot and the stitch may tie (if this is the statement being read)
        .add(() => it.classList.add('is-in'), 0.6)
      ScrollTrigger.create({ trigger: it, start: 'top 86%', once: true, onEnter: () => tl.play() })
    })

    /* the index draws its mini-thread the first time the column comes into view */
    const indexEl = el.querySelector<HTMLElement>('.principles-index')
    if (indexEl && mq.matches) {
      const rows = Array.from(indexEl.querySelectorAll<HTMLElement>('.principles-index-item'))
      gsap.set(rows, { autoAlpha: 0, x: -14 })
      gsap.set(slider, { autoAlpha: 0, scale: 0.4 })
      ScrollTrigger.create({
        trigger: el.querySelector('.principles-grid'),
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap
            .timeline({ defaults: { ease: ease.out } })
            // clearProps: a leftover transform would make each row a stacking context and bury its icon under the bead
            .to(rows, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.09, clearProps: 'transform,opacity,visibility' }, 0.2)
            .to(slider, { autoAlpha: 1, scale: 1, duration: 0.8, ease: ease.spring }, 0.5)
        },
      })
    }
  })
}

export const principlesSection: SectionDef = { id: 'principles', render, enhance }
