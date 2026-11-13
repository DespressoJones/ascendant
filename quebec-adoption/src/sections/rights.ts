/**
 * RIGHTS: "Your rights, whoever you are."
 *
 * 1. Switcher: one pill per group (icon + who + count) in a segmented tablist. A dark indicator glides
 *    from pill to pill (Flip). On narrow screens, or whenever the pills do not fit, the row scrolls
 *    sideways with soft edge fades, and the active pill is brought to the centre.
 * 2. Panel (calm ice slab): a side column (sticky on wide screens) with the group's icon, title, count,
 *    "copy this list" and a "next group" card; the rights themselves are set as big, confident lines.
 * 3. Signature, "the thread vouches for each right": every right is marked by a shield, and a running
 *    stitch (the red thread) is sewn down through the shields. When a group arrives, its lines wipe in
 *    one after another; each shield pops, its check stroke draws itself, and the stitch runs on to the
 *    next one. Leaving, the lines wipe out the same way and the stitches are pulled back.
 *    Behind the list (wide screens) the group's name is set as a huge outline word that drifts on scroll.
 *
 * Deep link: #rights-<groupId> selects a group (on load and on hash change).
 * Reduced motion: no wipes, no parallax; the panel swaps instantly and every check is already drawn.
 */
import type { Content, RightsGroup } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations } from './shared'
import { h, s, rich, qsa } from '../core/dom'
import { gsap, Flip, ScrollTrigger, motion, ease, scope, onTeardown, scrollToTarget, refreshSoon } from '../core/motion'
import { copyText, toast, magnetic } from '../core/interactions'
import { icon } from '../core/icons'

/* Small UI words this section needs that are not in the content contract (see the final report). */
const UI = {
  fr: {
    picker: 'Vous êtes…',
    one: 'droit',
    many: 'droits',
    legend: 'Article de loi où le droit est écrit.',
    copy: 'Copier la liste',
    copied: 'Copiée',
    copiedToast: 'Liste copiée. Collez-la dans vos notes ou un courriel.',
    copyFail: 'Copie impossible : la liste est sélectionnée.',
    next: 'Groupe suivant',
    nextLabel: (who: string) => `Groupe suivant : ${who}`,
    of: 'sur',
  },
  en: {
    picker: 'You are…',
    one: 'right',
    many: 'rights',
    legend: 'The section of the law where the right is written.',
    copy: 'Copy this list',
    copied: 'Copied',
    copiedToast: 'List copied. Paste it into your notes or an email.',
    copyFail: 'Could not copy: the list is selected instead.',
    next: 'Next group',
    nextLabel: (who: string) => `Next group: ${who}`,
    of: 'of',
  },
} as const

/** The group picked last. Module state survives the teardown/re-render of a language switch. */
let remembered: string | null = null

const pad = (n: number) => String(n).padStart(2, '0')
/** content markup → plain text (for the copied list) */
const plain = (t: string) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1 ($2)')

const ids = {
  tab: (g: string) => `rights-tab-${g}`,
  panel: (g: string) => `rights-${g}`,
  who: (g: string) => `rights-${g}-title`,
  list: (g: string) => `rights-${g}-list`,
}

/** Every stroke of an icon normalised to length 1, so it can be redrawn with stroke-dashoffset. */
function drawable<T extends SVGElement>(svg: T) {
  svg.querySelectorAll('path, circle, rect, line, polyline, ellipse').forEach((n) => n.setAttribute('pathLength', '1'))
  return svg
}

/* The mark beside each right: a shield whose check is drawn in. */
const SHIELD_D = 'M12 2.6 4.4 5.8v5.7c0 4.7 3.2 8.3 7.6 10.1 4.4-1.8 7.6-5.4 7.6-10.1V5.8L12 2.6Z'
const CHECK_D = 'm8.4 12.3 2.6 2.6 4.8-5'
const shield = () =>
  s(
    'svg',
    { class: 'rights-shield', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' },
    s('path', { class: 'rights-shield-body', d: SHIELD_D }),
    s('path', { class: 'rights-shield-check', d: CHECK_D, pathLength: 1 }),
  )

/* ================================================================== render */
function tab(g: RightsGroup, selected: boolean) {
  return h(
    'button.rights-tab',
    {
      type: 'button',
      role: 'tab',
      id: ids.tab(g.id),
      'aria-selected': String(selected),
      'aria-controls': ids.panel(g.id),
      tabindex: selected ? '0' : '-1',
      'data-group': g.id,
    },
    selected ? h('span.rights-ind', { 'aria-hidden': 'true' }) : null,
    h('span.rights-tab-icon', null, drawable(icon(g.icon))),
    h('span.rights-tab-label', null, g.who),
    g.items.length ? h('span.rights-tab-count', { 'aria-hidden': 'true' }, String(g.items.length)) : null,
  )
}

function item(it: RightsGroup['items'][number], i: number, lang: Content['lang']) {
  const text = h('p.rights-text')
  text.append(rich(it.text))
  return h(
    'li.rights-item',
    { style: `--i:${i}` },
    h('span.rights-mark', { 'aria-hidden': 'true' }, h('span.rights-seam'), shield()),
    h('div.rights-body', null, text, citations(it.refs, undefined, lang)),
  )
}

function panel(c: Content, g: RightsGroup, i: number, groups: RightsGroup[], active: boolean, multi: boolean) {
  const t = UI[c.lang]
  const n = g.items.length
  const next = groups[(i + 1) % groups.length]

  const side = h(
    'div.rights-side',
    null,
    h(
      'div.rights-meta',
      null,
      h(
        'div.rights-meta-top',
        null,
        h('span.rights-meta-icon', { 'aria-hidden': 'true' }, drawable(icon(g.icon))),
        multi ? h('span.rights-meta-index', { 'aria-hidden': 'true' }, `${pad(i + 1)} / ${pad(groups.length)}`) : null,
      ),
      h('h3.rights-who', { id: ids.who(g.id) }, g.who),
      n
        ? h(
            'p.rights-count',
            null,
            h('b', { 'aria-hidden': 'true' }, pad(n)),
            h('span.sr-only', null, String(n)),
            ` ${n > 1 ? t.many : t.one}`,
          )
        : null,
    ),
    h(
      'div.rights-actions',
      null,
      n
        ? h(
            'button.rights-copy',
            { type: 'button', 'data-copy': g.id, 'aria-describedby': ids.who(g.id) },
            h('span.rights-copy-icon', { 'aria-hidden': 'true' }, icon('copy'), icon('check')),
            h('span.rights-copy-label', null, t.copy),
          )
        : null,
      multi
        ? h(
            'button.rights-next',
            { type: 'button', 'data-next': next.id, 'aria-label': t.nextLabel(next.who) },
            h('span.rights-next-kicker', { 'aria-hidden': 'true' }, t.next),
            h('span.rights-next-who', { 'aria-hidden': 'true' }, next.who),
            h('span.rights-next-arrow', { 'aria-hidden': 'true' }, icon('arrow')),
          )
        : null,
    ),
  )

  const list = n
    ? h('ol.rights-list', { id: ids.list(g.id), 'aria-labelledby': ids.who(g.id) }, g.items.map((it, k) => item(it, k, c.lang)))
    : null

  return h(
    'div.rights-panel',
    {
      id: ids.panel(g.id),
      role: multi ? 'tabpanel' : null,
      'aria-labelledby': multi ? ids.tab(g.id) : ids.who(g.id),
      hidden: !active,
      'data-group': g.id,
    },
    side,
    list,
  )
}

function render(c: Content) {
  const R = c.rights
  const t = UI[c.lang]
  const { section, head, body } = sectionShell('rights', {
    eyebrow: R.eyebrow,
    title: R.title,
    lede: R.lede,
    className: 'rights',
  })
  const groups = R.groups.filter((g) => g && g.id)
  if (!groups.length) return section
  const multi = groups.length > 1

  // the page thread runs down the left margin past the heading, then crosses to the right in the gap
  // under it (never across the text), runs beside the panel and ties a knot at its foot
  const lede = head.querySelector<HTMLElement>('.lede')
  if (lede) {
    lede.dataset.thread = 'left'
    lede.dataset.threadY = 'bottom'
  }

  const picker = multi
    ? h(
        'div.rights-picker',
        null,
        h('p.rights-picker-label', { id: 'rights-picker-label', 'data-thread': 'right', 'data-reveal': 'fade' }, t.picker),
        h(
          'div.rights-scroller',
          { 'data-reveal': 'up', 'data-delay': '0.08' },
          h(
            'div.rights-tabs',
            { role: 'tablist', 'aria-labelledby': 'rights-picker-label' },
            groups.map((g, i) => tab(g, i === 0)),
          ),
        ),
      )
    : null

  const ghost = h(
    'div.rights-ghost',
    { 'aria-hidden': 'true' },
    groups.map((g, i) => h('span.rights-ghost-word', { 'data-group': g.id, hidden: i !== 0 }, g.who)),
  )

  const stage = h(
    'div.rights-stage',
    null,
    ghost,
    groups.map((g, i) => panel(c, g, i, groups, i === 0, multi)),
  )

  const hasRefs = groups.some((g) => g.items.some((it) => it.refs?.length))
  const foot = hasRefs ? h('p.rights-foot', null, h('span.ref.rights-foot-chip', { 'aria-hidden': 'true' }), t.legend) : null
  // an empty row of its own, so the knot the thread ties here never lands on the legend (phones: left gutter)
  const tie = h('div.rights-tie', { 'aria-hidden': 'true', 'data-thread': 'right', 'data-thread-y': 'center', 'data-knot': '' })

  body.append(h('div.rights-wrap', null, picker, stage, foot, tie))
  return section
}

/* ================================================================== enhance */
function enhance(el: HTMLElement, c: Content) {
  const t = UI[c.lang]
  const groups = c.rights.groups.filter((g) => g && g.id)
  const stage = el.querySelector<HTMLElement>('.rights-stage')
  if (!stage || !groups.length) return
  const reduced = motion.reduced

  const tablist = el.querySelector<HTMLElement>('.rights-tabs')
  const scroller = el.querySelector<HTMLElement>('.rights-scroller')
  const tabs = qsa<HTMLButtonElement>('.rights-tab', el)
  const panels = qsa<HTMLElement>('.rights-panel', stage)
  const ghost = stage.querySelector<HTMLElement>('.rights-ghost')!
  const words = qsa<HTMLElement>('.rights-ghost-word', ghost)
  const ind = el.querySelector<HTMLElement>('.rights-ind')
  const panelOf = (id: string) => panels.find((p) => p.dataset.group === id)!
  const wordOf = (id: string) => words.find((w) => w.dataset.group === id)
  const has = (id: string) => groups.some((g) => g.id === id)

  let current = groups[0].id
  let tl: gsap.core.Timeline | null = null
  let heightTween: gsap.core.Tween | null = null
  let revealed = reduced
  let revealST: ScrollTrigger | null = null
  let intro: gsap.core.Timeline | null = null

  const ctx = scope(el, () => {})

  /* ---------------------------------------------------------------- pieces of a panel */
  const parts = (p: HTMLElement) => ({
    meta: qsa<HTMLElement>('.rights-meta > *, .rights-actions > *', p),
    metaIcon: qsa<SVGElement>('.rights-meta-icon .icon > *', p),
    marks: qsa<HTMLElement>('.rights-shield', p),
    checks: qsa<SVGPathElement>('.rights-shield-check', p),
    seams: qsa<HTMLElement>('.rights-item:not(:last-child) .rights-seam', p),
    bodies: qsa<HTMLElement>('.rights-body', p),
  })

  /** Put every animated element back to its CSS state and show only the current group. */
  const resetAll = () => {
    heightTween?.kill()
    heightTween = null
    gsap.set(stage, { clearProps: 'height,clipPath' })
    for (const p of panels) {
      const q = parts(p)
      const boxes = [...q.meta, ...q.marks, ...q.seams, ...q.bodies]
      const strokes = [...q.checks, ...q.metaIcon]
      if (boxes.length) gsap.set(boxes, { clearProps: 'all' })
      if (strokes.length) gsap.set(strokes, { clearProps: 'strokeDashoffset' })
    }
    if (words.length) gsap.set(words, { clearProps: 'all' })
    show(current)
  }

  const show = (id: string) => {
    for (const p of panels) p.hidden = p.dataset.group !== id
    for (const w of words) w.hidden = w.dataset.group !== id
  }

  /** Swap panels, letting the slab ease to its new height instead of jumping. */
  const swap = (id: string) => {
    const h0 = stage.offsetHeight
    show(id)
    if (reduced) return refreshSoon()
    const h1 = stage.offsetHeight
    heightTween?.kill()
    if (Math.abs(h1 - h0) < 2) return refreshSoon()
    ctx.add(() => {
      heightTween = gsap.fromTo(
        stage,
        { height: h0 },
        { height: h1, duration: 0.75, ease: ease.inOut, clearProps: 'height', onComplete: () => refreshSoon() },
      )
    })
  }

  /** A group arrives: lines wipe in one by one; each shield pops, its check draws, the stitch runs on. */
  const enterTl = (p: HTMLElement, first = false) => {
    const q = parts(p)
    const word = wordOf(p.dataset.group!)
    const n = q.bodies.length
    const step = n > 7 ? 0.075 : 0.1
    const x = gsap.timeline({ defaults: { ease: ease.out } })
    x.fromTo(q.meta, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0)
    if (q.metaIcon.length) x.fromTo(q.metaIcon, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', clearProps: 'strokeDashoffset' }, 0.1)
    if (word) x.fromTo(word, { yPercent: 22, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: first ? 1.8 : 1.4, clearProps: 'transform,opacity,visibility' }, 0)
    q.bodies.forEach((b, i) => {
      const at = 0.08 + i * step
      x.fromTo(
        b,
        { clipPath: 'inset(-12% 100% -12% 0%)', x: -16 },
        { clipPath: 'inset(-12% 0% -12% 0%)', x: 0, duration: 1, ease: 'power3.out', clearProps: 'clipPath,transform' },
        at,
      )
      x.fromTo(q.marks[i], { scale: 0.4, rotate: -16, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.8, ease: ease.spring, clearProps: 'transform,opacity,visibility' }, at + 0.06)
      x.fromTo(q.checks[i], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out', clearProps: 'strokeDashoffset' }, at + 0.3)
      const seam = q.seams[i]
      if (seam) x.fromTo(seam, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power1.inOut', clearProps: 'clipPath' }, at + 0.4)
    })
    return x
  }

  /** A group leaves: lines wipe out to the right, stitches are pulled back up, shields fold away. */
  const exitTl = (p: HTMLElement) => {
    const q = parts(p)
    const word = wordOf(p.dataset.group!)
    const amount = Math.min(0.16, q.bodies.length * 0.03)
    const x = gsap.timeline({ defaults: { ease: 'power2.in' } })
    x.to(q.meta, { y: -10, autoAlpha: 0, duration: 0.3, stagger: 0.025 }, 0)
    if (word) x.to(word, { yPercent: -10, autoAlpha: 0, duration: 0.4 }, 0)
    if (q.seams.length) x.to(q.seams, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.3, stagger: { amount, from: 'end' } }, 0)
    if (q.bodies.length) {
      x.to(q.bodies, { clipPath: 'inset(-12% 0% -12% 100%)', x: 16, duration: 0.36, stagger: { amount } }, 0)
      x.to(q.marks, { scale: 0.5, autoAlpha: 0, duration: 0.3, stagger: { amount } }, 0.05)
    }
    return x
  }

  /* ---------------------------------------------------------------- the switcher */
  const glide = (to: HTMLElement) => {
    if (!ind || ind.parentElement === to) return
    if (reduced) {
      to.prepend(ind)
      return
    }
    const st = Flip.getState(ind)
    to.prepend(ind)
    tabs.forEach((b) => b.classList.toggle('is-target', b === to))
    ctx.add(() => {
      Flip.from(st, {
        duration: 0.75,
        ease: ease.out,
        onComplete: () => to.classList.remove('is-target'),
      })
    })
  }

  const drawIcon = (b: HTMLElement) => {
    if (reduced) return
    b.classList.remove('is-drawn')
    void b.offsetWidth
    b.classList.add('is-drawn')
  }

  /** Centre the active pill in the scroll row when the row overflows. */
  const centre = (b: HTMLElement) => {
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth + 1) return
    const r = b.getBoundingClientRect()
    const sr = scroller.getBoundingClientRect()
    const dx = r.left + r.width / 2 - (sr.left + sr.width / 2)
    scroller.scrollTo({ left: scroller.scrollLeft + dx, behavior: reduced ? 'auto' : 'smooth' })
  }

  const select = (id: string, opts: { instant?: boolean; focus?: boolean } = {}) => {
    if (!has(id) || id === current) return
    const from = current
    current = id
    remembered = id
    // keep our own deep link in step (never touch another section's hash)
    if (/^#rights-/.test(location.hash) && location.hash !== `#${ids.panel(id)}`) {
      history.replaceState(history.state, '', `#${ids.panel(id)}`)
    }
    const b = tabs.find((x) => x.dataset.group === id)
    tabs.forEach((x) => {
      const on = x === b
      x.setAttribute('aria-selected', String(on))
      x.tabIndex = on ? 0 : -1
    })
    if (b) {
      if (opts.instant) {
        if (ind) b.prepend(ind)
      } else glide(b)
      drawIcon(b)
      centre(b)
      if (opts.focus) b.focus({ preventScroll: true })
    }

    if (reduced || opts.instant) {
      tl?.kill()
      tl = null
      resetAll()
      refreshSoon()
      return
    }

    // interrupted mid-switch, or picked before the slab scrolled in: settle everything, then enter only
    let busy = !!tl
    if (!revealed) {
      revealed = true
      revealST?.kill()
      revealST = null
      intro?.kill()
      intro = null
      busy = true
    }
    tl?.kill()
    tl = null
    if (busy) resetAll()

    ctx.add(() => {
      const x = gsap.timeline({
        onComplete: () => {
          if (tl === x) tl = null
          refreshSoon()
        },
      })
      if (!busy) x.add(exitTl(panelOf(from)))
      x.add(() => swap(id))
      x.add(enterTl(panelOf(id)), busy ? 0 : '>-0.02')
      tl = x
    })
  }

  /* ---------------------------------------------------------------- input */
  el.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const b = target.closest<HTMLButtonElement>('.rights-tab')
    if (b) return select(b.dataset.group!)
    const nx = target.closest<HTMLButtonElement>('.rights-next')
    if (nx) {
      const id = nx.dataset.next!
      // back up to the switcher if it is out of sight, so the new group is read from its top
      const top = (el.querySelector('.rights-picker') ?? stage).getBoundingClientRect().top
      if (top < 0 || top > innerHeight * 0.6) scrollToTarget(el.querySelector<HTMLElement>('.rights-picker') ?? stage)
      return select(id, { focus: true })
    }
    const cp = target.closest<HTMLButtonElement>('.rights-copy')
    if (cp) void copyGroup(cp)
  })

  tablist?.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    const last = tabs.length - 1
    let n = -1
    if (e.key === 'ArrowRight') n = i === last ? 0 : i + 1
    else if (e.key === 'ArrowLeft') n = i === 0 ? last : i - 1
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = last
    if (n < 0) return
    e.preventDefault()
    tabs[n].focus({ preventScroll: true })
    select(tabs[n].dataset.group!)
  })

  /* copy the group's rights as plain text (to keep, or to bring to a lawyer) */
  const copyTimers = new Map<HTMLElement, number>()
  const copyGroup = async (btn: HTMLButtonElement) => {
    const g = groups.find((x) => x.id === btn.dataset.copy)
    if (!g) return
    const fr = c.lang === 'fr'
    const colon = fr ? '\u00a0: ' : ': '
    const lines = [
      `${g.who}${colon}${c.rights.eyebrow}`.toUpperCase(),
      '',
      ...g.items.map((it) => {
        const refs = it.refs?.length ? ` (${it.refs.map((r) => r.label).join(fr ? '\u00a0; ' : '; ')})` : ''
        return `• ${plain(it.text)}${refs}`
      }),
      '',
      `${c.ui.siteName}${colon}${location.origin}${location.pathname}#${ids.panel(g.id)}`,
    ]
    const list = document.getElementById(ids.list(g.id)) ?? undefined
    const ok = await copyText(lines.join('\n'), list)
    toast(ok ? t.copiedToast : t.copyFail)
    if (!ok) return
    const label = btn.querySelector<HTMLElement>('.rights-copy-label')!
    btn.classList.add('is-done')
    label.textContent = t.copied
    window.clearTimeout(copyTimers.get(btn))
    copyTimers.set(
      btn,
      window.setTimeout(() => {
        btn.classList.remove('is-done')
        label.textContent = t.copy
      }, 2200),
    )
  }
  onTeardown(() => copyTimers.forEach((id) => window.clearTimeout(id)))

  el.querySelectorAll<HTMLElement>('.rights-next').forEach((b) => magnetic(b, 0.18))
  el.addEventListener('animationend', (e) => {
    const b = (e.target as Element).closest?.('.rights-tab')
    if (b && (e as AnimationEvent).animationName === 'rights-draw-sel') b.classList.remove('is-drawn')
  })

  /* ---------------------------------------------------------------- scroll row edge fades */
  if (scroller) {
    const edges = () => {
      const max = scroller.scrollWidth - scroller.clientWidth
      scroller.dataset.start = String(scroller.scrollLeft <= 2)
      scroller.dataset.end = String(scroller.scrollLeft >= max - 2)
      scroller.classList.toggle('is-overflowing', max > 1)
    }
    scroller.addEventListener('scroll', edges, { passive: true })
    const ro = new ResizeObserver(edges)
    ro.observe(scroller)
    edges()
    onTeardown(() => ro.disconnect())
  }

  /* ---------------------------------------------------------------- deep links */
  const fromHash = (instant: boolean) => {
    const m = location.hash.match(/^#rights-(.+)$/)
    if (!m) {
      if (instant && remembered && has(remembered)) select(remembered, { instant })
      return
    }
    let id = m[1]
    try {
      id = decodeURIComponent(id)
    } catch {
      /* keep raw */
    }
    if (has(id)) select(id, { instant })
  }
  const onHash = () => fromHash(false)
  addEventListener('hashchange', onHash)
  onTeardown(() => removeEventListener('hashchange', onHash))
  fromHash(true)

  onTeardown(() => {
    tl?.kill()
    heightTween?.kill()
  })

  if (reduced) return

  /* ---------------------------------------------------------------- first reveal + parallax */
  ctx.add(() => {
    const p = panelOf(current)
    const radius = getComputedStyle(stage).borderTopLeftRadius || '0px'
    // fromTo renders its start state at once: content is hidden only now, as the reveal is scheduled
    intro = gsap.timeline({ paused: true, onComplete: () => (intro = null) })
    intro.fromTo(
      stage,
      { clipPath: `inset(0% 0% 100% 0% round ${radius})` },
      { clipPath: `inset(0% 0% 0% 0% round ${radius})`, duration: 1.3, ease: ease.inOut, clearProps: 'clipPath' },
      0,
    )
    intro.add(enterTl(p, true), 0.25)
    const go = () => {
      if (revealed) return
      revealed = true
      revealST = null
      intro?.play()
    }
    // onLeave too: a jump straight past the slab (anchor link, restored scroll) must still reveal it
    revealST = ScrollTrigger.create({ trigger: stage, start: 'top 82%', once: true, onEnter: go, onLeave: go, onEnterBack: go })

    // wide screens: the outline word drifts against the scroll, behind the list
    const mm = gsap.matchMedia()
    mm.add('(min-width: 960px)', () => {
      gsap.fromTo(
        ghost,
        { y: 70 },
        { y: -50, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
      )
    })
    onTeardown(() => mm.revert())
  })
}

export const rightsSection: SectionDef = { id: 'rights', render, enhance }
