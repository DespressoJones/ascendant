/**
 * GLOSSARY: the lexicon on a thread.
 *
 * One framed dictionary: a big search field over a split view (A–Z rail | list that scrolls inside the panel).
 *
 *  - Search is instant and accent-insensitive (é = e, œ = oe, ’ = ', dashes = spaces). It looks at the term in
 *    both languages and at the definition. Several words narrow the search (every word must match). A single
 *    letter only matches word starts in the terms, so "d" lists the D words rather than every "d" on the page.
 *    Matches are wrapped in <mark>, and the list reflows with Flip.
 *  - SIGNATURE: the search field's underline is a real thread. Each keystroke plucks it under the caret (a damped
 *    1-D wave travels out and reflects off the pins). When nothing matches, the thread comes untied: its right end
 *    slips its pin and droops, and the empty state shows an untied thread. When results come back it snaps taut.
 *  - The A–Z rail is a thread with one bead per letter. A bead slides to the letter you are reading, and the thread
 *    above it is "sewn" in atoca. Empty letters are greyed and disabled; the rail follows the filter.
 *    Fine pointer ≥ 960px: vertical, with a dock-like magnification on hover. Elsewhere: a horizontal scroll row.
 *    Roving tabindex with arrow keys / Home / End (role="toolbar").
 *  - The list scrolls inside the panel (data-lenis-prevent), so the page stays short and the search and rail stay
 *    in view. At either end the scroll chains back to the page.
 *
 * Reduced motion: no Flip, no wave, no magnification, instant jumps. Everything is readable at rest.
 */
import type { Content, GlossaryTerm, Lang } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, para } from './shared'
import { h, rich, s, clamp } from '../core/dom'
import { gsap, Flip, ScrollTrigger, motion, ease, scope, onTeardown, getLenis } from '../core/motion'
import { icon } from '../core/icons'

/* Small UI words this section needs that are not in the content contract (see the final report). */
const UI = {
  fr: {
    clear: 'Effacer la recherche',
    rail: 'Aller à une lettre',
    list: 'Termes du glossaire',
    inOther: 'En anglais\u00a0: ',
    of: 'sur',
    end: 'Fin du glossaire',
    tryLabel: 'Essayez\u00a0:',
  },
  en: {
    clear: 'Clear search',
    rail: 'Jump to a letter',
    list: 'Glossary terms',
    inOther: 'In French: ',
    of: 'of',
    end: 'End of the glossary',
    tryLabel: 'Try:',
  },
} as const
type UIWords = (typeof UI)[Lang]

/** The rail is vertical only where there is room and a precise pointer (24–30px letters are too small to tap). */
const VERTICAL_RAIL = '(min-width: 960px) and (pointer: fine)'
/** Preferred suggestion chips in the empty state (ids that are missing are skipped). */
const SUGGEST = ['dpj', 'banque-mixte', 'consentement-general', 'placement', 'famille-accueil', 'adoption']
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/* ------------------------------------------------------------------ text folding */
const COMBINING = /[\u0300-\u036f]/g
const IS_COMBINING = /[\u0300-\u036f]/
const ALNUM = /[a-z0-9]/

function foldChar(ch: string): string {
  const f = ch.normalize('NFD').replace(COMBINING, '').toLowerCase()
  if (f === 'œ') return 'oe'
  if (f === 'æ') return 'ae'
  if (f === 'ß') return 'ss'
  if (/[\u2018\u2019\u201b`\u00b4\u02bc]/.test(f)) return "'"
  if (/[-\u2010-\u2015\u2212\s\u00a0\u202f]/.test(f)) return ' '
  return f
}

/** Accent/case-folded copy of `src`, plus a map from each folded index back to its index in `src`. */
function fold(src: string) {
  let text = ''
  const map: number[] = []
  for (let i = 0; i < src.length; i++) {
    const f = foldChar(src[i])
    for (let k = 0; k < f.length; k++) {
      text += f[k]
      map.push(i)
    }
  }
  return { text, map }
}
const foldText = (str: string) => fold(str).text

/** content markup → plain text */
const plain = (str: string) =>
  str.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')

function tokenize(q: string) {
  return foldText(q)
    .replace(/[«»"“”()[\]{}.,;:!?¿¡/\\*+]/g, ' ')
    .split(' ')
    .filter(Boolean)
}

/** One-letter tokens only count at the start of a word. */
function hit(text: string, tok: string) {
  if (tok.length > 1) return text.includes(tok)
  for (let i = text.indexOf(tok); i !== -1; i = text.indexOf(tok, i + 1)) {
    if (i === 0 || !ALNUM.test(text[i - 1])) return true
  }
  return false
}

/** Ranges [start, end) of `src` (original indices) that match a token, merged. */
type Folded = { text: string; map: number[] }
function ranges(src: string, tokens: string[], short: boolean, folded: Folded = fold(src)): [number, number][] {
  if (!tokens.length) return []
  const { text, map } = folded
  const out: [number, number][] = []
  for (const tok of tokens) {
    if (tok.length < 2 && !short) continue
    for (let i = text.indexOf(tok); i !== -1; i = text.indexOf(tok, i + 1)) {
      if (tok.length === 1 && i > 0 && ALNUM.test(text[i - 1])) continue
      let end = map[i + tok.length - 1] + 1
      while (end < src.length && IS_COMBINING.test(src[end])) end++
      out.push([map[i], end])
    }
  }
  out.sort((a, b) => a[0] - b[0] || b[1] - a[1])
  const merged: [number, number][] = []
  for (const r of out) {
    const last = merged[merged.length - 1]
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1])
    else merged.push([r[0], r[1]])
  }
  return merged
}

function marked(src: string, rs: [number, number][]) {
  const frag = document.createDocumentFragment()
  let at = 0
  for (const [a, b] of rs) {
    if (a > at) frag.append(src.slice(at, a))
    frag.append(h('mark.glossary-mark', null, src.slice(a, b)))
    at = b
  }
  if (at < src.length) frag.append(src.slice(at))
  return frag
}

/* ------------------------------------------------------------------ helpers */
interface Row {
  item: GlossaryTerm
  term: string
  alt: string
  letter: string
}

function letterOf(term: string) {
  const ch = foldText(term).replace(/^[^a-z0-9]+/, '').charAt(0).toUpperCase()
  return /[A-Z]/.test(ch) ? ch : '#'
}

function rowsFor(items: GlossaryTerm[], lang: Lang): Row[] {
  const other: Lang = lang === 'fr' ? 'en' : 'fr'
  const coll = new Intl.Collator(lang === 'fr' ? 'fr-CA' : 'en-CA', { sensitivity: 'base', numeric: true })
  const key = (t: string) => t.replace(/^[^\p{L}\p{N}]+/u, '')
  return items
    .map((item) => ({ item, term: item[lang], alt: item[other], letter: letterOf(item[lang]) }))
    .sort((a, b) => coll.compare(key(a.term), key(b.term)))
}

const singular = (str: string) => str.replace(/\b(termes|terms|résultats|results|mots|words)\b/gi, (w) => w.slice(0, -1))

/** "{n} termes" → the parts around the number (singular when n = 1). */
function countParts(label: string, n: number) {
  const i = label.indexOf('{n}')
  let pre = i < 0 ? '' : label.slice(0, i)
  let post = i < 0 ? ` ${label}` : label.slice(i + 3)
  if (n === 1) {
    pre = singular(pre)
    post = singular(post)
  }
  return { pre, post }
}
const countText = (label: string, n: number) => {
  const { pre, post } = countParts(label, n)
  return `${pre}${n}${post}`.trim()
}

/** Short chip label: "DPJ (Directeur de la protection…)" → "DPJ" */
const shortTerm = (term: string) => term.split(' (')[0].trim()

/* ------------------------------------------------------------------ drawings */
const UNTIED =
  'M 8 64 C 34 64, 62 62, 86 55 C 112 47, 132 22, 152 28 C 172 34, 168 62, 146 66 C 126 69, 116 50, 130 41 C 146 31, 168 54, 174 74 C 178 88, 184 96, 194 98'

function untiedThread() {
  return s(
    'svg',
    { class: 'glossary-untied', viewBox: '0 0 240 120', 'aria-hidden': 'true', focusable: 'false' },
    s('path', { class: 'glossary-untied-gap', d: 'M 204 98 C 220 96, 230 80, 234 62' }),
    s('circle', { class: 'glossary-untied-pin', cx: 234, cy: 58, r: 3.5 }),
    s('path', { class: 'glossary-untied-main', d: UNTIED, pathLength: 1 }),
    s(
      'g',
      { class: 'glossary-untied-fray' },
      s('path', { d: 'M 186.5 96.6 c 3 -1 6 -4.5 6 -9' }),
      s('path', { d: 'M 190.5 97.6 c 4 0.2 8.5 -1.2 11 -4.6' }),
      s('path', { d: 'M 193.5 98 c 3.5 1.2 6.5 4 7 8.5' }),
    ),
    s('circle', { class: 'glossary-untied-bead', cx: 8, cy: 64, r: 4 }),
  )
}

/* ------------------------------------------------------------------ render */
function entry(r: Row, other: Lang, t: UIWords) {
  const def = h('dd.glossary-def')
  def.append(rich(r.item.def))
  return h(
    'dl.glossary-entry',
    { id: `glossary-t-${r.item.id}`, 'data-id': r.item.id, 'data-letter': r.letter },
    h(
      'dt.glossary-dt',
      null,
      h('dfn.glossary-term', null, r.term),
      h(
        'span.glossary-alt',
        null,
        h('span.glossary-alt-tag', { 'aria-hidden': 'true' }, other.toUpperCase()),
        h('span.sr-only', null, t.inOther),
        h('i.glossary-alt-term', { lang: other }, r.alt),
      ),
    ),
    def,
  )
}

function render(c: Content) {
  const G = c.glossary
  const t = UI[c.lang]
  const other: Lang = c.lang === 'fr' ? 'en' : 'fr'
  const { section, head, body } = sectionShell('glossary', {
    eyebrow: G.eyebrow,
    title: G.title,
    lede: G.lede,
    className: 'glossary',
  })
  // the page thread drops down the left margin past the lede, then crosses in the gap above the panel
  const lede = head.querySelector<HTMLElement>('.lede')
  if (lede) {
    lede.dataset.thread = 'left'
    lede.dataset.threadY = 'bottom'
  }

  const rows = rowsFor(G.items, c.lang)
  const total = rows.length
  if (!total) return section

  const groups = new Map<string, Row[]>()
  for (const r of rows) {
    if (!groups.has(r.letter)) groups.set(r.letter, [])
    groups.get(r.letter)!.push(r)
  }
  const letters = groups.has('#') ? ['#', ...LETTERS] : LETTERS
  const first = rows[0].letter

  /* ---- search bar */
  const { pre, post } = countParts(G.countLabel, total)
  const count = h(
    'p.glossary-count#glossary-count',
    null,
    pre ? h('span.glossary-count-word', null, pre) : null,
    h('span.glossary-count-mask', null, h('span.glossary-count-n', null, String(total))),
    h(
      'span.glossary-count-total',
      { hidden: true },
      h('span', { 'aria-hidden': 'true' }, `/${total}`),
      h('span.sr-only', null, ` ${t.of} ${total}`),
    ),
    h('span.glossary-count-word', null, post),
  )
  const input = h('input.glossary-input#glossary-q', {
    type: 'search',
    autocomplete: 'off',
    autocapitalize: 'none',
    autocorrect: 'off',
    spellcheck: 'false',
    enterkeyhint: 'search',
    placeholder: G.searchPlaceholder,
    'aria-controls': 'glossary-list',
    'aria-describedby': 'glossary-count',
  })
  const clear = h(
    'button.glossary-clear',
    { type: 'button', 'aria-label': t.clear, title: t.clear, 'aria-controls': 'glossary-q', hidden: true },
    icon('close'),
  )
  const thread = s(
    'svg',
    { class: 'glossary-thread', 'aria-hidden': 'true', focusable: 'false' },
    s('path', { class: 'glossary-thread-path', d: 'M 3 8 H 4000' }),
    s('circle', { class: 'glossary-thread-pin', cx: 3, cy: 8, r: 3 }),
    s('circle', { class: 'glossary-thread-pin glossary-thread-pin-end', cx: -10, cy: 8, r: 3 }),
  )
  const bar = h(
    'div.glossary-bar',
    { role: 'search' },
    h('div.glossary-bar-top', null, h('label.glossary-label', { for: 'glossary-q' }, G.searchLabel), count),
    h('div.glossary-field', null, h('span.glossary-field-icon', { 'aria-hidden': 'true' }, icon('search')), input, clear, thread),
  )

  /* ---- A–Z rail */
  const railBtns = letters.map((L) => {
    const n = groups.get(L)?.length ?? 0
    return h(
      'button.glossary-rail-btn',
      {
        type: 'button',
        'data-letter': L,
        disabled: n === 0,
        tabindex: L === first ? '0' : '-1',
        'aria-label': `${L}, ${countText(G.countLabel, n)}`,
        'aria-current': L === first ? 'true' : null,
      },
      h('span.glossary-rail-tick', { 'aria-hidden': 'true' }),
      h('span.glossary-rail-char', { 'aria-hidden': 'true' }, L),
    )
  })
  const rail = h(
    'div.glossary-rail',
    { role: 'toolbar', 'aria-label': t.rail, 'aria-controls': 'glossary-list', 'data-lenis-prevent-horizontal': '' },
    h(
      'div.glossary-rail-track',
      null,
      h('span.glossary-rail-line', { 'aria-hidden': 'true' }),
      h('span.glossary-rail-fill', { 'aria-hidden': 'true' }),
      h('span.glossary-rail-bead', { 'aria-hidden': 'true' }),
      railBtns,
    ),
  )

  /* ---- the list */
  const kids: HTMLElement[] = []
  for (const L of letters) {
    const g = groups.get(L)
    if (!g) continue
    kids.push(
      h(
        'h3.glossary-letter',
        { id: `glossary-l-${L === '#' ? 'num' : L.toLowerCase()}`, 'data-letter': L, tabindex: '-1' },
        h('span.glossary-letter-char', null, L),
        h('span.glossary-letter-rule', { 'aria-hidden': 'true' }),
        h('span.glossary-letter-count', { 'aria-hidden': 'true' }, String(g.length).padStart(2, '0')),
      ),
    )
    g.forEach((r, i) => {
      const e = entry(r, other, t)
      if (i === 0) e.classList.add('is-first')
      kids.push(e)
    })
  }

  const picks = [
    ...SUGGEST.map((id) => rows.find((r) => r.item.id === id)).filter((r): r is Row => !!r),
    ...rows,
  ]
  const chips = Array.from(new Set(picks.map((r) => shortTerm(r.term)))).slice(0, 3)
  const empty = h(
    'div.glossary-empty',
    { style: 'display:none' },
    untiedThread(),
    para(G.emptyLabel, 'glossary-empty-text'),
    chips.length
      ? h(
          'div.glossary-try',
          null,
          h('span.glossary-try-label', null, t.tryLabel),
          chips.map((label) => h('button.glossary-chip', { type: 'button', 'data-q': label }, label)),
        )
      : null,
  )
  const end = h('p.glossary-end', null, icon('knot'), h('span', null, t.end))
  const pane = h(
    'div.glossary-pane#glossary-list',
    { role: 'region', 'aria-label': t.list, tabindex: '0', 'data-lenis-prevent': '' },
    kids,
    empty,
    end,
  )

  const panel = h(
    'div.glossary-panel',
    { 'data-thread': 'right', 'data-thread-y': 'bottom', 'data-knot': '' },
    bar,
    h('div.glossary-body', null, rail, pane),
  )
  const live = h('p.sr-only.glossary-live', { 'aria-live': 'polite', 'aria-atomic': 'true' })
  const weave = h('div.glossary-weave', { 'aria-hidden': 'true', 'data-thread': 'right', 'data-thread-y': 'top' })
  body.append(weave, panel, live)
  return section
}

/* ------------------------------------------------------------------ the search thread (signature) */
/**
 * A 1-D damped string under the field. pluck(x, amp) kicks it at x; slack(on) unpins its right end, which slips
 * back and droops like a thread that came untied, then snaps taut again with an elastic ease.
 * The ticker only runs while something moves.
 */
function searchThread(svg: SVGSVGElement, path: SVGPathElement) {
  const [pinA, pinB] = Array.from(svg.querySelectorAll<SVGCircleElement>('.glossary-thread-pin'))
  const N = 72
  const u = new Float32Array(N)
  const v = new Float32Array(N)
  const st = { slack: 0 }
  let W = 0
  let Y = 8
  let running = false
  let tweening = false

  const draw = () => {
    if (W < 4) return
    const sl = st.slack
    const x0 = 3
    const span = W - 6
    let d = ''
    for (let i = 0; i < N; i++) {
      const f = i / (N - 1)
      let x = x0 + f * span
      // the whole thread goes slack: a soft sag with a little irregular looseness
      let y = Y + u[i] + sl * (6 * Math.sin(Math.PI * Math.min(1, f / 0.9)) + 1.6 * Math.sin(f * 23) * f)
      if (f > 0.58) {
        // the loose end: slips back off its pin and droops, with a last little curl
        const g = (f - 0.58) / 0.42
        x -= sl * span * (0.085 * g * g + 0.012 * Math.sin(g * Math.PI))
        y += sl * (25 * Math.pow(g, 2.3) + 4 * Math.sin(g * Math.PI * 2) * g)
      }
      d += `${i ? ' L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`
    }
    path.setAttribute('d', d)
    pinA?.setAttribute('cx', String(x0))
    pinA?.setAttribute('cy', Y.toFixed(1))
    pinB?.setAttribute('cx', (x0 + span).toFixed(1))
    pinB?.setAttribute('cy', Y.toFixed(1))
  }

  const step = () => {
    let energy = 0
    const free = st.slack > 0.02
    for (let k = 0; k < 2; k++) {
      for (let i = 1; i < N - 1; i++) {
        v[i] += (u[i - 1] - 2 * u[i] + u[i + 1]) * 0.46 - v[i] * 0.05 - u[i] * 0.003
      }
      if (free) v[N - 1] += (u[N - 2] - u[N - 1]) * 0.46 - v[N - 1] * 0.08
      for (let i = 1; i < N; i++) {
        if (i === N - 1 && !free) continue
        u[i] += v[i] * 0.5
      }
    }
    if (!free) u[N - 1] = v[N - 1] = 0
    for (let i = 0; i < N; i++) energy = Math.max(energy, Math.abs(u[i]) + Math.abs(v[i]))
    return energy
  }

  const tick = () => {
    const e = step()
    draw()
    if (e < 0.02 && !tweening) {
      u.fill(0)
      v.fill(0)
      draw()
      gsap.ticker.remove(tick)
      running = false
    }
  }
  const start = () => {
    if (running || motion.reduced) return
    running = true
    gsap.ticker.add(tick)
  }

  const resize = () => {
    const r = svg.getBoundingClientRect()
    W = r.width
    Y = Math.min(8, r.height / 2)
    svg.setAttribute('viewBox', `0 0 ${W.toFixed(1)} ${r.height.toFixed(1)}`)
    draw()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(svg)
  resize()

  onTeardown(() => {
    ro.disconnect()
    gsap.ticker.remove(tick)
    gsap.killTweensOf(st)
  })

  return {
    pluck(x: number, amp: number) {
      if (motion.reduced || W < 4) return
      const idx = clamp(Math.round(((x - 3) / (W - 6)) * (N - 1)), 2, N - 3)
      for (let i = 1; i < N - 1; i++) {
        const dd = (i - idx) / 2.4
        v[i] += amp * Math.exp(-dd * dd)
      }
      start()
    },
    slack(on: boolean) {
      const to = on ? 1 : 0
      if (st.slack === to && !gsap.isTweening(st)) return
      gsap.killTweensOf(st)
      if (motion.reduced) {
        st.slack = to
        draw()
        return
      }
      tweening = true
      start()
      gsap.to(st, {
        slack: to,
        duration: on ? 1.1 : 0.9,
        ease: on ? 'power3.out' : 'elastic.out(1, 0.42)',
        onUpdate: draw,
        onComplete: () => {
          tweening = false
          // the snap back sends a small ripple along the thread
          if (!on) for (let i = 1; i < N - 1; i++) v[i] += 0.6 * Math.sin((i / (N - 1)) * Math.PI)
        },
      })
    },
    redraw: draw,
  }
}

/* ------------------------------------------------------------------ behaviour */
interface Rec {
  el: HTMLElement
  letter: string
  termEl: HTMLElement
  altEl: HTMLElement
  defEl: HTMLElement
  term: string
  alt: string
  base: DocumentFragment
  /** folded copies, cached: term, alt, the whole definition, and each text node of the definition */
  kTerm: Folded
  kAlt: Folded
  kDefNodes: Folded[]
  fTerm: string
  fAlt: string
  fDef: string
  vis: boolean
  next: boolean
  painted: string
}

function enhance(el: HTMLElement, c: Content) {
  const G = c.glossary
  const t = UI[c.lang]
  const panel = el.querySelector<HTMLElement>('.glossary-panel')
  if (!panel) return
  const input = panel.querySelector<HTMLInputElement>('.glossary-input')!
  const clearBtn = panel.querySelector<HTMLButtonElement>('.glossary-clear')!
  const field = panel.querySelector<HTMLElement>('.glossary-field')!
  const svg = panel.querySelector<SVGSVGElement>('.glossary-thread')!
  const threadPath = svg.querySelector<SVGPathElement>('path')!
  const pane = panel.querySelector<HTMLElement>('.glossary-pane')!
  const rail = panel.querySelector<HTMLElement>('.glossary-rail')!
  const track = rail.querySelector<HTMLElement>('.glossary-rail-track')!
  const bead = rail.querySelector<HTMLElement>('.glossary-rail-bead')!
  const fill = rail.querySelector<HTMLElement>('.glossary-rail-fill')!
  const btns = Array.from(rail.querySelectorAll<HTMLButtonElement>('.glossary-rail-btn'))
  const chars = btns.map((b) => b.querySelector<HTMLElement>('.glossary-rail-char')!)
  const countN = panel.querySelector<HTMLElement>('.glossary-count-n')!
  const countTotal = panel.querySelector<HTMLElement>('.glossary-count-total')!
  const countWords = Array.from(panel.querySelectorAll<HTMLElement>('.glossary-count-word'))
  const emptyEl = pane.querySelector<HTMLElement>('.glossary-empty')!
  const endEl = pane.querySelector<HTMLElement>('.glossary-end')!
  const live = el.querySelector<HTMLElement>('.glossary-live')!
  const headers = new Map<string, HTMLElement>()
  pane.querySelectorAll<HTMLElement>('.glossary-letter').forEach((hd) => headers.set(hd.dataset.letter!, hd))
  const headerEls = Array.from(headers.values())

  const byId = new Map(G.items.map((it) => [it.id, it]))
  const recs: Rec[] = Array.from(pane.querySelectorAll<HTMLElement>('.glossary-entry')).map((node) => {
    const item = byId.get(node.dataset.id!)!
    const termEl = node.querySelector<HTMLElement>('.glossary-term')!
    const altEl = node.querySelector<HTMLElement>('.glossary-alt-term')!
    const term = termEl.textContent ?? ''
    const alt = altEl.textContent ?? ''
    const base = rich(item.def)
    const kDefNodes: Folded[] = []
    const walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) kDefNodes.push(fold((walker.currentNode as Text).data))
    const kTerm = fold(term)
    const kAlt = fold(alt)
    return {
      el: node,
      letter: node.dataset.letter!,
      termEl,
      altEl,
      defEl: node.querySelector<HTMLElement>('.glossary-def')!,
      term,
      alt,
      base,
      kTerm,
      kAlt,
      kDefNodes,
      fTerm: kTerm.text,
      fAlt: kAlt.text,
      fDef: foldText(plain(item.def)),
      vis: true,
      next: true,
      painted: '',
    }
  })
  const total = recs.length
  if (!total) return

  const timers: number[] = []
  onTeardown(() => timers.forEach((id) => clearTimeout(id)))
  const ctx = scope(el, () => {})
  const isVertical = () => window.matchMedia(VERTICAL_RAIL).matches
  const thread = searchThread(svg, threadPath)

  /* ---------------------------------------------------------------- the pane: fades + current letter */
  const padTop = () => parseFloat(getComputedStyle(pane).paddingTop) || 0
  let active = ''
  let lockActive = false

  const line = rail.querySelector<HTMLElement>('.glossary-rail-line')!
  const centerOf = (b: HTMLElement, vertical: boolean) =>
    vertical ? b.offsetTop + b.offsetHeight / 2 : b.offsetLeft + b.offsetWidth / 2
  const placeBead = (animate: boolean) => {
    const idx = btns.findIndex((b) => b.dataset.letter === active)
    if (idx < 0) return
    btns.forEach((b, i) => b.classList.toggle('is-sewn', i < idx))
    const v = isVertical()
    const a = centerOf(btns[0], v)
    const p = centerOf(btns[idx], v)
    const beadVars = v ? { x: 0, y: p } : { x: p, y: 0 }
    const fillVars = v ? { x: 0, y: a, height: p - a } : { x: a, y: 0, width: p - a }
    if (!animate || motion.reduced) {
      gsap.set(bead, beadVars)
      gsap.set(fill, fillVars)
      return
    }
    ctx.add(() => {
      gsap.to(bead, { ...beadVars, duration: 0.6, ease: ease.out, overwrite: 'auto' })
      gsap.to(fill, { ...fillVars, duration: 0.6, ease: ease.out, overwrite: 'auto' })
    })
  }
  const layoutRail = () => {
    const v = isVertical()
    const a = centerOf(btns[0], v)
    const z = centerOf(btns[btns.length - 1], v)
    gsap.set([line, fill, bead], { clearProps: 'all' })
    gsap.set(line, v ? { y: a, height: z - a } : { x: a, width: z - a })
    placeBead(false)
  }

  /** keep the current letter in view in the horizontal rail (never scrolls the page) */
  const revealInRail = (btn: HTMLElement, animate: boolean) => {
    if (isVertical()) return
    const max = rail.scrollWidth - rail.clientWidth
    if (max <= 0) return
    const target = clamp(btn.offsetLeft + btn.offsetWidth / 2 - rail.clientWidth / 2, 0, max)
    if (Math.abs(target - rail.scrollLeft) < 2) return
    if (!animate || motion.reduced) rail.scrollLeft = target
    else {
      const o = { x: rail.scrollLeft }
      ctx.add(() =>
        gsap.to(o, { x: target, duration: 0.6, ease: ease.out, overwrite: 'auto', onUpdate: () => (rail.scrollLeft = o.x) }),
      )
    }
  }

  const setActive = (L: string, animate = true) => {
    if (!L || L === active) return
    active = L
    for (const b of btns) {
      const on = b.dataset.letter === L
      if (on) b.setAttribute('aria-current', 'true')
      else b.removeAttribute('aria-current')
    }
    // the roving tab stop follows the current letter unless focus is inside the rail
    if (!rail.contains(document.activeElement)) {
      const btn = btns.find((b) => b.dataset.letter === L)
      if (btn && !btn.disabled) btns.forEach((b) => (b.tabIndex = b === btn ? 0 : -1))
    }
    placeBead(animate)
    const btn = btns.find((b) => b.dataset.letter === L)
    if (btn) revealInRail(btn, animate)
  }

  /** letters that currently have results (state, not style: Flip briefly re-shows leaving rows) */
  const shownLetters = new Set(headerEls.map((hd) => hd.dataset.letter!))
  const visibleHeaders = () => headerEls.filter((hd) => shownLetters.has(hd.dataset.letter!))

  const syncPane = () => {
    const top = pane.scrollTop
    const atEnd = top + pane.clientHeight >= pane.scrollHeight - 2
    pane.classList.toggle('is-scrolled', top > 2)
    pane.classList.toggle('is-end', atEnd)
    if (lockActive) return
    const hs = visibleHeaders()
    if (!hs.length) return
    const y = top + padTop() + 6
    let cur = hs[0].dataset.letter!
    for (const hd of hs) {
      if (hd.offsetTop <= y) cur = hd.dataset.letter!
      else break
    }
    // at the very bottom, short last letters can never reach the top: pick the last one in view
    if (atEnd && top > 0) {
      for (const hd of hs) if (hd.offsetTop < top + pane.clientHeight * 0.5) cur = hd.dataset.letter!
    }
    setActive(cur)
  }
  let raf = 0
  const onPaneScroll = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(syncPane)
  }
  pane.addEventListener('scroll', onPaneScroll, { passive: true })

  /* the pane's own smooth scroll (the user can always interrupt it) */
  const scrollState = { y: 0 }
  let scrollTween: gsap.core.Tween | null = null
  const stopPaneTween = () => {
    if (scrollTween) {
      scrollTween.kill()
      scrollTween = null
    }
    lockActive = false
  }
  const scrollPaneTo = (y: number, done?: () => void) => {
    stopPaneTween()
    const target = clamp(y, 0, pane.scrollHeight - pane.clientHeight)
    if (motion.reduced || Math.abs(target - pane.scrollTop) < 2) {
      pane.scrollTop = target
      done?.()
      return
    }
    lockActive = true
    scrollState.y = pane.scrollTop
    ctx.add(() => {
      scrollTween = gsap.to(scrollState, {
        y: target,
        duration: clamp(Math.abs(target - pane.scrollTop) / 2600, 0.55, 1.1),
        ease: 'power3.inOut',
        onUpdate: () => (pane.scrollTop = scrollState.y),
        onComplete: () => {
          scrollTween = null
          lockActive = false
          syncPane()
          done?.()
        },
      })
    })
  }
  for (const ev of ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const) {
    pane.addEventListener(ev, stopPaneTween, { passive: true })
  }

  /*
   * Wheel intent. With smooth scrolling on, the list only takes the wheel for a gesture that STARTS over it while
   * it is mostly on screen, and gives it back at either end. So a reader who scrolls through the page glides
   * past the glossary, and one who stops on it can scroll the list. (Touch scrolling is always native.)
   */
  let lastWheel = 0
  let gestureOwned = false
  const mostlyInView = () => {
    const r = pane.getBoundingClientRect()
    const seen = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)
    return r.height > 0 && seen / r.height >= 0.6
  }
  const onWheel = (e: WheelEvent) => {
    const now = performance.now()
    const over = pane.contains(e.target as Node)
    if (now - lastWheel > 280) gestureOwned = over && mostlyInView()
    lastWheel = now
    if (!over) return
    const atTop = pane.scrollTop <= 0
    const atEnd = pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 1
    const take = gestureOwned && !(e.deltaY < 0 && atTop) && !(e.deltaY > 0 && atEnd)
    pane.toggleAttribute('data-lenis-prevent', take)
  }
  window.addEventListener('wheel', onWheel, { passive: true, capture: true })
  onTeardown(() => window.removeEventListener('wheel', onWheel, { capture: true }))

  /* ---------------------------------------------------------------- rail: jump, roving focus, magnifier */
  const jump = (L: string, focusHeading: boolean) => {
    const hd = headers.get(L)
    if (!hd || !shownLetters.has(L)) return
    setActive(L)
    scrollPaneTo(hd.offsetTop - padTop())
    if (focusHeading) hd.focus({ preventScroll: true })
  }
  rail.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.glossary-rail-btn')
    if (!btn || btn.disabled) return
    btns.forEach((b) => (b.tabIndex = b === btn ? 0 : -1))
    // keyboard activation (detail 0) moves focus to the letter, like an in-page link
    jump(btn.dataset.letter!, (e as MouseEvent).detail === 0)
  })
  rail.addEventListener('keydown', (e) => {
    const cur = (e.target as HTMLElement).closest<HTMLButtonElement>('.glossary-rail-btn')
    if (!cur) return
    const enabled = btns.filter((b) => !b.disabled)
    const i = enabled.indexOf(cur)
    let next: HTMLButtonElement | undefined
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = enabled[(i + 1) % enabled.length]
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = enabled[(i - 1 + enabled.length) % enabled.length]
    else if (e.key === 'Home') next = enabled[0]
    else if (e.key === 'End') next = enabled[enabled.length - 1]
    if (!next) return
    e.preventDefault()
    btns.forEach((b) => (b.tabIndex = b === next ? 0 : -1))
    next.focus({ preventScroll: true })
    revealInRail(next, true)
  })

  // dock-like magnification on the vertical rail (fine pointers)
  if (motion.finePointer && !motion.reduced) {
    const setters = chars.map((ch) => {
      const sx = gsap.quickTo(ch, 'scaleX', { duration: 0.35, ease: 'power3.out' })
      const sy = gsap.quickTo(ch, 'scaleY', { duration: 0.35, ease: 'power3.out' })
      return {
        s: (v: number) => {
          sx(v)
          sy(v)
        },
        x: gsap.quickTo(ch, 'x', { duration: 0.35, ease: 'power3.out' }),
      }
    })
    const centers: number[] = []
    const onMove = (e: PointerEvent) => {
      if (!isVertical()) return
      if (!centers.length) btns.forEach((b) => centers.push(b.getBoundingClientRect().top + b.offsetHeight / 2))
      const pitch = btns[1] ? btns[1].offsetTop - btns[0].offsetTop : 24
      btns.forEach((b, i) => {
        const d = Math.abs(e.clientY - centers[i]) / (pitch * 2.6)
        const k = d < 1 ? Math.cos((d * Math.PI) / 2) ** 2 : 0
        const amt = b.disabled ? k * 0.35 : k
        setters[i].s(1 + amt * 0.6)
        setters[i].x(amt * 12)
      })
    }
    const onLeave = () => {
      centers.length = 0
      setters.forEach((st) => {
        st.s(1)
        st.x(0)
      })
    }
    const onEnter = () => (centers.length = 0)
    rail.addEventListener('pointerenter', onEnter)
    rail.addEventListener('pointermove', onMove)
    rail.addEventListener('pointerleave', onLeave)
  }

  /* ---------------------------------------------------------------- search */
  let key = ''
  let flipTl: gsap.core.Timeline | null = null
  let leaving: HTMLElement[] = []
  let shown = total
  let liveTimer = 0
  const recByEl = new Map(recs.map((r) => [r.el, r]))
  /** row heights (cached; cleared on resize) → the rows that fill the pane from the top */
  const heights = new Map<HTMLElement, number>()
  const fitting = (list: HTMLElement[], measure: boolean) => {
    const out: HTMLElement[] = []
    const limit = pane.clientHeight + 48
    let acc = 0
    for (const n of list) {
      out.push(n)
      if (measure || !heights.has(n)) {
        const hgt = n.style.display === 'none' ? 0 : n.offsetHeight
        if (hgt) heights.set(n, hgt)
      }
      acc += heights.get(n) ?? 96
      if (acc > limit) break
    }
    return out
  }
  /** headers + entries in page order */
  const flow = Array.from(pane.children).filter((n): n is HTMLElement => recByEl.has(n as HTMLElement) || headerEls.includes(n as HTMLElement))

  const paint = (r: Rec, tokens: string[], k: string) => {
    if (r.painted === k) return
    r.painted = k
    const rt = ranges(r.term, tokens, true, r.kTerm)
    if (rt.length || r.termEl.firstElementChild) r.termEl.replaceChildren(marked(r.term, rt))
    const ra = ranges(r.alt, tokens, true, r.kAlt)
    if (ra.length || r.altEl.firstElementChild) r.altEl.replaceChildren(marked(r.alt, ra))
    const long = tokens.filter((tok) => tok.length > 1)
    if (!long.length && !r.defEl.querySelector('mark')) return
    const frag = r.base.cloneNode(true) as DocumentFragment
    if (long.length) {
      const walker = document.createTreeWalker(frag, NodeFilter.SHOW_TEXT)
      const nodes: Text[] = []
      while (walker.nextNode()) nodes.push(walker.currentNode as Text)
      nodes.forEach((node, i) => {
        const k = r.kDefNodes[i]
        if (!k || !long.some((tok) => k.text.includes(tok))) return
        const rs = ranges(node.data, long, false, k)
        if (rs.length) node.replaceWith(marked(node.data, rs))
      })
    }
    r.defEl.replaceChildren(frag)
  }

  const setCount = (n: number, animate: boolean) => {
    countTotal.hidden = key === ''
    const { pre, post } = countParts(G.countLabel, n)
    if (countWords.length === 2) {
      countWords[0].textContent = pre
      countWords[1].textContent = post
    } else if (countWords[0]) countWords[0].textContent = post
    if (n === shown) return
    const up = n > shown
    shown = n
    countN.textContent = String(n)
    if (animate && !motion.reduced) {
      ctx.add(() =>
        gsap.fromTo(countN, { yPercent: up ? -90 : 90 }, { yPercent: 0, duration: 0.5, ease: ease.out, overwrite: true }),
      )
    }
  }

  const announce = (n: number) => {
    clearTimeout(liveTimer)
    liveTimer = window.setTimeout(() => {
      const msg = n === 0 ? plain(G.emptyLabel) : n === total ? countText(G.countLabel, n) : `${countText(G.countLabel, n)} (${t.of} ${total})`
      live.textContent = msg
    }, 500)
    timers.push(liveTimer)
  }

  const finishFlip = () => {
    const tl = flipTl
    if (!tl) return
    flipTl = null
    tl.progress(1) // runs its onComplete (clears the leavers' inline styles)
    tl.kill()
  }

  let intro: gsap.core.Timeline | null = null

  const run = (raw: string, animate: boolean) => {
    const tokens = tokenize(raw)
    const k = tokens.join(' ')
    clearBtn.hidden = raw.length === 0
    if (k === key) return
    key = k
    intro?.progress(1)

    for (const r of recs) {
      r.next = tokens.every((tok) => hit(r.fTerm, tok) || hit(r.fAlt, tok) || (tok.length > 1 && r.fDef.includes(tok)))
    }
    for (const r of recs) if (r.next) paint(r, tokens, k)
    const n = recs.filter((r) => r.next).length
    const changed = recs.some((r) => r.next !== r.vis)

    // per-letter counts, header visibility and the rail
    const perLetter = new Map<string, number>()
    for (const r of recs) if (r.next) perLetter.set(r.letter, (perLetter.get(r.letter) ?? 0) + 1)
    for (const b of btns) {
      const L = b.dataset.letter!
      const m = perLetter.get(L) ?? 0
      b.disabled = m === 0
      b.setAttribute('aria-label', `${L}, ${countText(G.countLabel, m)}`)
    }
    if (!btns.some((b) => b.tabIndex === 0 && !b.disabled)) {
      const firstOn = btns.find((b) => !b.disabled)
      btns.forEach((b) => (b.tabIndex = b === firstOn ? 0 : -1))
    }

    if (changed) {
      finishFlip()
      stopPaneTween()
      pane.scrollTop = 0
      const doFlip = animate && !motion.reduced
      // Only what is on screen before or after the change takes part in the Flip (the pane shows ~8–15 rows);
      // everything further down just switches. This keeps a keystroke cheap with 50 terms.
      let targets: HTMLElement[] = []
      let state: Flip.FlipState | null = null
      if (doFlip) {
        const willShow = (n: HTMLElement) => {
          const r = recByEl.get(n)
          return r ? r.next : (perLetter.get(n.dataset.letter!) ?? 0) > 0
        }
        const before = fitting(flow.filter((n) => n.style.display !== 'none'), true)
        const after = fitting(flow.filter(willShow), false)
        targets = Array.from(new Set([...before, ...after, emptyEl, endEl]))
        state = Flip.getState(targets, { simple: true }) // no rotation/scale here: skip the matrix maths
      }
      const wasEmpty = emptyEl.style.display !== 'none'
      panel.classList.toggle('is-filtering', tokens.length > 0)
      panel.classList.toggle('is-empty', n === 0)
      leaving = []
      for (const r of recs) {
        if (r.vis && !r.next) leaving.push(r.el)
        r.vis = r.next
        r.el.style.display = r.vis ? '' : 'none'
      }
      shownLetters.clear()
      for (const hd of headerEls) {
        const m = perLetter.get(hd.dataset.letter!) ?? 0
        if (m) shownLetters.add(hd.dataset.letter!)
        if (hd.style.display !== 'none' && !m) leaving.push(hd)
        hd.style.display = m ? '' : 'none'
        const cnt = hd.querySelector('.glossary-letter-count')
        if (cnt && m) cnt.textContent = String(m).padStart(2, '0')
      }
      emptyEl.style.display = n ? 'none' : ''
      endEl.style.display = n ? '' : 'none'
      // the first visible row under each letter has no top rule
      let prevHeader = false
      for (const node of flow) {
        if (node.style.display === 'none') continue
        const isHeader = !recByEl.has(node)
        if (!isHeader) node.classList.toggle('is-first', prevHeader)
        prevHeader = isHeader
      }
      if (state) {
        const gone = leaving
        flipTl = Flip.from(state, {
          targets,
          simple: true,
          duration: 0.6,
          ease: 'power3.inOut',
          absoluteOnLeave: true,
          prune: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.12, stagger: 0.025 },
            ),
          onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.22, ease: 'power1.in' }),
          onComplete: () => {
            gsap.set(gone, { clearProps: 'opacity,visibility' })
            if (flipTl === tl) {
              flipTl = null
              syncPane()
            }
          },
        })
        const tl = flipTl
        // the untied thread is drawn when the empty state arrives
        if (!n && !wasEmpty) drawUntied()
      }
      active = ''
      if (!n) btns.forEach((b) => b.removeAttribute('aria-current'))
      syncPane()
    }

    if (!changed) {
      panel.classList.toggle('is-filtering', tokens.length > 0)
      panel.classList.toggle('is-empty', n === 0)
    }
    setCount(n, animate)
    thread.slack(n === 0 && tokens.length > 0)
    announce(n)
  }

  const drawUntied = () => {
    if (motion.reduced) return
    const main = emptyEl.querySelector<SVGPathElement>('.glossary-untied-main')
    const fray = emptyEl.querySelectorAll('.glossary-untied-fray path, .glossary-untied-gap, .glossary-untied-pin')
    if (!main) return
    ctx.add(() => {
      gsap.fromTo(main, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', delay: 0.15 })
      gsap.fromTo(fray, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.06, delay: 1.1 })
    })
  }

  /* caret position, for the pluck */
  const measure = document.createElement('canvas').getContext('2d')
  const caretX = () => {
    const cs = getComputedStyle(input)
    const ir = input.getBoundingClientRect()
    const sr = svg.getBoundingClientRect()
    let w = 0
    if (measure) {
      measure.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      w = measure.measureText(input.value.slice(0, input.selectionStart ?? input.value.length)).width
    }
    return clamp(ir.left - sr.left + parseFloat(cs.paddingLeft) + w - input.scrollLeft, 0, sr.width)
  }

  /* when typing starts and the panel is not fully on screen, bring it into view so results are visible */
  let assisted = false
  const assist = () => {
    if (assisted) return
    assisted = true
    const r = panel.getBoundingClientRect()
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64
    if (r.top >= headerH - 4 && r.bottom <= innerHeight + 4) return
    // exact target (panel just under the header): scrollToTarget(el) also adds the page's scroll-padding
    const y = Math.max(0, r.top + window.scrollY - headerH - 12)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { duration: 0.9 })
    else window.scrollTo({ top: y, behavior: motion.reduced ? 'auto' : 'smooth' })
  }

  let lastLen = 0
  let lastInput = 0
  input.addEventListener('input', () => {
    const len = input.value.length
    const grew = len > lastLen
    lastLen = len
    // a quick burst of typing filters instantly; a deliberate keystroke (or a pause) gets the Flip reflow
    const now = performance.now()
    const quick = now - lastInput < 130
    lastInput = now
    run(input.value, !quick)
    thread.pluck(caretX(), grew ? 2.6 : -2)
    if (len) assist()
  })
  input.addEventListener('focus', () => {
    field.classList.add('is-focus')
    thread.pluck(caretX(), 1.4)
  })
  input.addEventListener('blur', () => {
    field.classList.remove('is-focus')
    assisted = false
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) {
      e.preventDefault()
      setQuery('')
    } else if (e.key === 'Enter') {
      e.preventDefault()
      clearTimeout(liveTimer)
      live.textContent = ''
      timers.push(window.setTimeout(() => announce(shown), 30))
      if (!motion.finePointer) input.blur() // hides the on-screen keyboard so the results can be read
    }
  })

  const setQuery = (q: string, focus = true) => {
    input.value = q
    lastLen = q.length
    run(q, true)
    thread.pluck(caretX(), q ? 2.6 : -2.2)
    if (focus) input.focus({ preventScroll: true })
  }
  clearBtn.addEventListener('click', () => setQuery(''))
  emptyEl.addEventListener('click', (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLButtonElement>('.glossary-chip')
    if (chip) setQuery(chip.dataset.q ?? '')
  })

  /* ---------------------------------------------------------------- layout changes */
  let lastW = 0
  let roRaf = 0
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(roRaf)
    roRaf = requestAnimationFrame(() => {
      if (pane.clientWidth !== lastW) {
        lastW = pane.clientWidth
        heights.clear()
      }
      layoutRail()
      syncPane()
    })
  })
  ro.observe(track)
  ro.observe(pane)
  const mq = window.matchMedia(VERTICAL_RAIL)
  const onMq = () => {
    gsap.set(chars, { clearProps: 'transform' })
    layoutRail()
  }
  mq.addEventListener?.('change', onMq)
  onTeardown(() => {
    ro.disconnect()
    mq.removeEventListener?.('change', onMq)
    cancelAnimationFrame(raf)
    cancelAnimationFrame(roRaf)
    clearTimeout(liveTimer)
    stopPaneTween()
    finishFlip()
  })

  setActive(recs[0].letter, false)
  layoutRail()
  syncPane()

  /* ---------------------------------------------------------------- entrance */
  // Only when the panel is still below the fold (a reload mid-page shows it as is). Like core/reveal,
  // it is hidden right before it is scheduled to animate.
  if (motion.reduced || panel.getBoundingClientRect().top < innerHeight * 0.9) return
  ctx.add(() => {
    gsap.set(panel, { y: 56, autoAlpha: 0 })
    ScrollTrigger.create({
      trigger: panel,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const paneTop = pane.getBoundingClientRect().top
        const inView = [...headerEls, ...recs.map((r) => r.el)]
          .filter((n) => n.style.display !== 'none')
          .filter((n) => n.getBoundingClientRect().top < paneTop + pane.clientHeight)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
        let len = 0
        try {
          len = threadPath.getTotalLength()
        } catch {
          len = 0
        }
        intro = gsap.timeline({
          defaults: { ease: ease.out },
          onComplete: () => {
            gsap.set(threadPath, { clearProps: 'strokeDasharray,strokeDashoffset' })
            intro = null
          },
        })
        intro
          .to(panel, { y: 0, autoAlpha: 1, duration: 1.1, clearProps: 'transform,opacity,visibility' })
          .fromTo(
            threadPath,
            { strokeDasharray: `${len} ${len}`, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 1.3, ease: 'power3.inOut' },
            0.25,
          )
          .add(() => thread.pluck((svg.getBoundingClientRect().width || 600) * 0.72, 3.2), 1.3)
          .from(chars, { autoAlpha: 0, scale: 0.4, duration: 0.6, stagger: 0.018, ease: ease.spring, clearProps: 'opacity,visibility' }, 0.35)
          .from(bead, { scale: 0, duration: 0.6, ease: ease.spring }, 0.9)
          .from(inView, { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.06, clearProps: 'opacity,visibility,transform' }, 0.4)
      },
    })
  })
}

export const glossarySection: SectionDef = { id: 'glossary', render, enhance }
