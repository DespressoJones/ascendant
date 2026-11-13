/**
 * AFTER: "After the adoption" / "Après l'adoption".
 *
 * 1) THE ACT OF BIRTH (signature). A mock civil-status paper (guilloché frame drawn along its real
 *    perimeter, rosette watermark, mono field labels). On wide screens the block pins and the scroll
 *    scrubs a short, calm piece of theatre:
 *      01  the original act, as it was;
 *      02  its entries are veiled, it slides into an envelope, the flap folds, a wax seal presses
 *          down, and the sealed envelope is set aside: KEPT, never destroyed (C.c.Q. 132, 583);
 *      03  a fresh act rises in its place and its entries type themselves in, character by
 *          character. Entries the new act repeats unchanged get an "unchanged" tag.
 *    A stepper beside it follows the scrub (its rail fills like the page thread) and doubles as
 *    navigation. Narrow screens, short viewports and reduced motion get the same two documents
 *    side by side or stacked, fully legible, nothing pinned. Screen readers get a real table.
 *
 * 2) BLOCKS: a bento grid of practical cards (benefits, leave, taxes, contact, origins, support).
 *    Any count works: the first card becomes a tall feature, the rest flow in rows of 2–3, a lone
 *    leftover becomes a wide strip. Hover lifts the card, a red rim light follows the pointer and the
 *    icon re-draws itself.
 */
import type { AfterBlock, Content, Lang } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations, para, bullets } from './shared'
import { h, s, rich, clamp } from '../core/dom'
import { gsap, ScrollTrigger, motion, onTeardown, getLenis, refreshSoon } from '../core/motion'
import { icon } from '../core/icons'

/* ------------------------------------------------------------------ local UI strings
   (not in the content contract yet; see the note in the final report) */
const UI = {
  fr: {
    original: 'Acte original',
    fresh: 'Nouvel acte',
    entry: 'Mention',
    unchanged: 'inchangé',
    specimen: 'Spécimen',
    empty: '—',
    steps: 'Les trois temps de l’acte de naissance',
    hint: 'Faites défiler : l’original est scellé, puis un nouvel acte prend sa place.',
    caption: 'ce qui change d’un acte à l’autre',
  },
  en: {
    original: 'Original act',
    fresh: 'New act',
    entry: 'Entry',
    unchanged: 'unchanged',
    specimen: 'Specimen',
    empty: '—',
    steps: 'The three moments of the act of birth',
    hint: 'Scroll: the original is sealed, then a new act takes its place.',
    caption: 'what changes from one act to the other',
  },
} as const

/* Timeline map (the scrubbed timeline is exactly 1 unit long, so positions = progress). */
const T = {
  veil: 0.05,
  envBack: 0.18,
  insert: 0.2,
  flap: 0.345,
  seal: 0.405,
  sticker: 0.45,
  aside: 0.5,
  rise: 0.56,
  tag: 0.6,
  type: 0.69,
  typeSpan: 0.27,
}
/** progress at which each step becomes current, and where a click on it lands */
const STEP_AT = [0, 0.17, 0.55]
const STEP_GO = [0, 0.49, 1]

const pad2 = (n: number) => String(n).padStart(2, '0')
const norm = (v: string) => v.replace(/\s+/g, ' ').trim().toLowerCase()

/* ------------------------------------------------------------------ ornaments */
interface Ring {
  R: number
  A: number
  K: number
  n: number
}
const ROSETTE_BIG: Ring[] = [
  { R: 39, A: 7, K: 14, n: 7 },
  { R: 22, A: 5, K: 10, n: 5 },
  { R: 46.5, A: 1.6, K: 48, n: 2 },
]
const ROSETTE_SMALL: Ring[] = [
  { R: 36, A: 9, K: 9, n: 4 },
  { R: 18, A: 6, K: 6, n: 3 },
]

/** Guilloché rosette: rotated lobed rings laid over each other (pure maths, no assets). */
function rosette(cls: string, rings: Ring[]) {
  let d = ''
  for (const { R, A, K, n } of rings) {
    for (let j = 0; j < n; j++) {
      const ph = ((j / n) * Math.PI * 2) / K
      const N = 160
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * Math.PI * 2
        const r = R + A * Math.sin(K * (t + ph))
        d += `${i ? 'L' : 'M'}${(50 + r * Math.cos(t)).toFixed(2)} ${(50 + r * Math.sin(t)).toFixed(2)}`
      }
    }
  }
  return s('svg', { class: cls, viewBox: '0 0 100 100', 'aria-hidden': 'true', focusable: 'false' }, s('path', { d }))
}

const KNOT = 'M2 22c5 0 7-2 9.5-6.5S16 6 20.5 6.5s3.6 6.3-.6 8.2-8.4.3-8.1-3.6 4.6-4.8 8.4-2.1S25.8 22 30 22'

/** Wax seal: an irregular blob with a pressed rim and the site's knot as its emblem. */
function waxSeal() {
  let d = ''
  const N = 72
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2
    const r = 44 + 2.6 * Math.sin(a * 5 + 0.6) + 1.5 * Math.sin(a * 11 + 2.1) + 1 * Math.sin(a * 19)
    d += `${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`
  }
  d += 'Z'
  return h(
    'div.after-seal',
    null,
    h('span.after-seal-ring'),
    s(
      'svg',
      { class: 'after-seal-svg', viewBox: '0 0 100 100', 'aria-hidden': 'true', focusable: 'false' },
      s('path', { class: 'after-seal-blob', d }),
      s('circle', { class: 'after-seal-rim', cx: 50, cy: 50, r: 33 }),
      s('path', { class: 'after-seal-knot', d: KNOT, transform: 'translate(26 26) scale(1.5)' }),
    ),
  )
}

/**
 * Guilloché frame: three phase-shifted sine waves running along the paper's real (rounded)
 * perimeter, between two hairline rules. Redrawn whenever the paper changes size.
 */
function drawGuilloche(svg: SVGSVGElement) {
  const W = svg.clientWidth
  const H = svg.clientHeight
  if (W < 60 || H < 60) return
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
  const m = 10 // band centre line, from the paper edge
  const A = 3 // wave amplitude
  const r = 7 // corner radius of the centre line
  const [outer, inner] = Array.from(svg.querySelectorAll('rect'))
  const setRect = (el: SVGRectElement | undefined, o: number) => {
    if (!el) return
    el.setAttribute('x', String(m - o))
    el.setAttribute('y', String(m - o))
    el.setAttribute('width', String(W - 2 * (m - o)))
    el.setAttribute('height', String(H - 2 * (m - o)))
    el.setAttribute('rx', String(Math.max(0, r + o)))
  }
  setRect(outer, A + 1.8)
  setRect(inner, -(A + 1.8))

  const x0 = m
  const y0 = m
  const x1 = W - m
  const y1 = H - m
  const lh = x1 - x0 - 2 * r
  const lv = y1 - y0 - 2 * r
  const la = (Math.PI * r) / 2
  const L = 2 * lh + 2 * lv + 4 * la
  // point + outward normal at arc-length s (clockwise from the top-left, after the corner)
  const at = (sv: number): [number, number, number, number] => {
    let u = sv
    const arc = (cx: number, cy: number, a0: number): [number, number, number, number] => {
      const a = a0 + (u / la) * (Math.PI / 2)
      const nx = Math.cos(a)
      const ny = Math.sin(a)
      return [cx + r * nx, cy + r * ny, nx, ny]
    }
    if (u < lh) return [x0 + r + u, y0, 0, -1]
    u -= lh
    if (u < la) return arc(x1 - r, y0 + r, -Math.PI / 2)
    u -= la
    if (u < lv) return [x1, y0 + r + u, 1, 0]
    u -= lv
    if (u < la) return arc(x1 - r, y1 - r, 0)
    u -= la
    if (u < lh) return [x1 - r - u, y1, 0, 1]
    u -= lh
    if (u < la) return arc(x0 + r, y1 - r, Math.PI / 2)
    u -= la
    if (u < lv) return [x0, y1 - r - u, -1, 0]
    u -= lv
    return arc(x0 + r, y0 + r, Math.PI)
  }
  const cycles = Math.max(8, Math.round(L / 7.2))
  const M = Math.ceil(L / 1.5)
  let d = ''
  for (let k = 0; k < 3; k++) {
    const ph = (k * Math.PI * 2) / 3
    for (let i = 0; i <= M; i++) {
      const sv = ((i % M) / M) * L
      const [x, y, nx, ny] = at(sv)
      const o = A * Math.sin((Math.PI * 2 * cycles * sv) / L + ph)
      d += `${i ? 'L' : 'M'}${(x + nx * o).toFixed(1)} ${(y + ny * o).toFixed(1)}`
    }
  }
  svg.querySelector('path')?.setAttribute('d', d)
}

/* ------------------------------------------------------------------ render: the act of birth */
function doc(c: Content, which: 'before' | 'after') {
  const cert = c.after.certificate
  const ui = UI[c.lang]
  const rows = cert.fields.map((f) => {
    const before = f.before.trim() || ui.empty
    const after = f.after.trim() || ui.empty
    const same = norm(before) === norm(after)
    const value = which === 'before' ? before : after
    return h(
      'div.after-row',
      { class: same ? 'is-same' : 'is-changed' },
      h('span.after-row-label', null, f.label),
      which === 'after' && same ? h('span.after-row-same', null, ui.unchanged) : null,
      h(
        'span.after-row-value',
        null,
        which === 'after'
          ? h('span.after-type', null, Array.from(value).map((ch) => h('span.c', null, ch)))
          : h('span.after-row-text', null, value),
        which === 'before' ? h('span.after-veil') : null,
      ),
    )
  })
  return h(
    `div.after-doc.after-doc--${which}`,
    null,
    s(
      'svg',
      { class: 'after-guilloche', 'aria-hidden': 'true', focusable: 'false' },
      s('rect', { class: 'after-g-rule' }),
      s('rect', { class: 'after-g-rule' }),
      s('path', { class: 'after-g-wave' }),
    ),
    rosette('after-doc-rosette', ROSETTE_BIG),
    h(
      'div.after-doc-head',
      null,
      rosette('after-doc-mark', ROSETTE_SMALL),
      h('p.after-doc-title', null, cert.docTitle),
      h('p.after-doc-spec', null, ui.specimen),
    ),
    h('div.after-doc-rows', null, rows),
  )
}

function envelopeParts(sealedLabel: string) {
  return {
    back: h('div.after-env-back'),
    front: h(
      'div.after-env-front',
      null,
      s(
        'svg',
        { class: 'after-env-seams', viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' },
        s('path', { d: 'M0 100 L50 57 L100 100 M0 0 L42 50 M100 0 L58 50', 'vector-effect': 'non-scaling-stroke' }),
      ),
      h('span.after-env-sticker', null, icon('key'), h('span', null, sealedLabel)),
    ),
    flap: h(
      'div.after-env-flap',
      null,
      s(
        'svg',
        { viewBox: '0 0 100 36', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' },
        s('path', { d: 'M0 0 H100 L54.5 33.4 Q50 36.6 45.5 33.4 Z', 'vector-effect': 'non-scaling-stroke' }),
      ),
    ),
  }
}

function certificate(c: Content) {
  const cert = c.after.certificate
  const ui = UI[c.lang]
  const steps = [ui.original, cert.sealedLabel, ui.fresh]

  const title = h('h3.after-cert-title', { 'data-reveal': 'up' })
  title.append(rich(cert.title))
  const paras = cert.body
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => para(t))
  const body = h('div.after-cert-body', { 'data-reveal': 'up', 'data-delay': '0.08' }, paras)

  const stepper = h(
    'div.after-steps',
    null,
    h('span.after-steps-rail', { 'aria-hidden': 'true' }, h('span.after-steps-fill')),
    h(
      'ol',
      { 'aria-label': ui.steps },
      steps.map((label, i) =>
        h(
          'li',
          null,
          h(
            'button.after-step',
            { type: 'button', 'data-step': String(i) },
            h('span.after-step-dot', { 'aria-hidden': 'true' }),
            h('span.after-step-num', { 'aria-hidden': 'true' }, pad2(i + 1)),
            h('span.after-step-label', null, label),
          ),
        ),
      ),
    ),
  )
  const refs = citations(cert.refs, undefined, c.lang)
  refs?.classList.add('after-cert-refs')
  const text = h('div.after-cert-text', null, title, body, stepper, h('p.after-hint', null, ui.hint), refs)

  const env = envelopeParts(cert.sealedLabel)
  const before = h(
    'div.after-slot.after-slot--before',
    null,
    h('p.after-slot-label', null, h('span.after-slot-num', null, '01'), ui.original),
    h('div.after-env', null, env.back, doc(c, 'before'), env.front, env.flap, waxSeal()),
    h('p.after-sealed-chip', null, h('span.after-slot-num', null, '02'), cert.sealedLabel),
  )
  const afterSlot = h(
    'div.after-slot.after-slot--after',
    null,
    h('p.after-slot-label', null, h('span.after-slot-num', null, '03'), ui.fresh),
    doc(c, 'after'),
  )
  const desk = h(
    'div.after-desk',
    { 'aria-hidden': 'true' },
    h(
      'div.after-desk-inner',
      null,
      before,
      h('span.after-arrow', null, icon('arrow')),
      afterSlot,
      h('p.after-archive-tag', null, h('span.after-slot-num', null, '02'), cert.sealedLabel),
    ),
  )

  // the same information, for screen readers
  const table = h(
    'div.sr-only',
    null,
    h(
    'table',
    null,
    h('caption', null, `${cert.docTitle} : ${ui.caption}`),
    h(
      'thead',
      null,
      h('tr', null, h('th', { scope: 'col' }, ui.entry), h('th', { scope: 'col' }, cert.sealedLabel), h('th', { scope: 'col' }, ui.fresh)),
    ),
    h(
      'tbody',
      null,
      cert.fields.map((f) =>
        h('tr', null, h('th', { scope: 'row' }, f.label), h('td', null, f.before.trim() || ui.empty), h('td', null, f.after.trim() || ui.empty)),
      ),
    ),
  ),
  )

  const figure = h(
    'figure.after-figure',
    null,
    desk,
    table,
    h('figcaption.after-note', null, h('span.after-note-mark', { 'aria-hidden': 'true' }, 'i'), h('span', null, cert.note)),
  )
  return h('div.after-cert', null, text, figure)
}

/* ------------------------------------------------------------------ render: the bento */
interface Span {
  c: number // columns of 12 (desktop)
  r: number // rows (desktop)
  t: number // columns of 2 (tablet)
  kind: 'feature' | 'std' | 'wide'
}

function bentoSpans(n: number): Span[] {
  const std = (c: number): Span => ({ c, r: 1, t: 1, kind: 'std' })
  const wide: Span = { c: 12, r: 1, t: 2, kind: 'wide' }
  if (n <= 0) return []
  if (n === 1) return [wide]
  if (n === 2) return [std(7), std(5)]
  const out: Span[] = [{ c: 7, r: 2, t: 2, kind: 'feature' }, std(5), std(5)]
  let rest = n - 3
  while (rest > 0) {
    if (rest === 1) {
      out.push({ ...wide })
      rest = 0
    } else if (rest === 2 || rest === 4) {
      out.push(std(6), std(6))
      rest -= 2
    } else {
      out.push(std(4), std(4), std(4))
      rest -= 3
    }
  }
  // tablet (2 columns): a run of single cards with an odd length ends on a full-width card
  let run: Span[] = []
  const close = () => {
    if (run.length % 2 === 1) run[run.length - 1].t = 2
    run = []
  }
  for (const sp of out) {
    if (sp.t === 2) close()
    else run.push(sp)
  }
  close()
  return out
}

function figure(f: { value: string; label: string }, lang: Lang) {
  const label = h('dt.after-fig-label', null, f.label)
  const m = f.value.trim().match(/^(\D*?)(\d(?:[\d\s  .,]*\d)?)(\D*)$/)
  if (m) {
    const raw = m[2]
    const clean = lang === 'fr' ? raw.replace(/[\s  ]/g, '').replace(',', '.') : raw.replace(/[\s,]/g, '')
    if (clean && Number.isFinite(Number(clean))) {
      return h(
        'div.after-fig',
        null,
        label,
        h(
          'dd.after-fig-value',
          null,
          m[1].trim() ? h('span.after-fig-affix', null, m[1].trim()) : null,
          h('span.after-fig-num', { 'data-count': clean }, raw),
          m[3].trim() ? h('span.after-fig-affix', null, m[3].trim()) : null,
        ),
      )
    }
  }
  return h('div.after-fig', null, label, h('dd.after-fig-value.is-text', null, f.value))
}

function card(b: AfterBlock, i: number, sp: Span, lang: Lang) {
  const ic = icon(b.icon, 'after-card-ico')
  ic.querySelectorAll('path, circle, rect, line, polyline, ellipse').forEach((p) => p.setAttribute('pathLength', '1'))
  const id = `after-card-${b.id}`
  const figs = b.figures?.length
    ? h('dl.after-figs', { style: `--n:${b.figures.length}` }, b.figures.map((f) => figure(f, lang)))
    : null
  const refs = citations(b.refs, b.sources, lang)
  refs?.classList.add('after-card-refs')
  return h(
    'article.after-card',
    {
      class: `after-card--${sp.kind}${figs ? ' has-figs' : ''}${b.points?.length ? ' has-points' : ''}`,
      style: `--cs:${sp.c};--rs:${sp.r};--ts:${sp.t}`,
      'aria-labelledby': id,
    },
    h('span.after-card-rim', { 'aria-hidden': 'true' }),
    h('div.after-card-top', null, h('span.after-card-icon', null, ic), h('span.after-card-num', { 'aria-hidden': 'true' }, pad2(i + 1))),
    h('div.after-card-main', null, h('h3.after-card-title', { id }, b.title), para(b.body, 'after-card-body')),
    figs,
    bullets(b.points, 'bullets after-card-points'),
    refs,
  )
}

function render(c: Content) {
  const a = c.after
  const { section, body } = sectionShell('after', { eyebrow: a.eyebrow, title: a.title, lede: a.lede, className: 'after' })
  const spans = bentoSpans(a.blocks.length)
  body.append(certificate(c))
  // the page thread ties a knot just after the new act is drawn up, then crosses to the far margin
  body.append(h('div.after-tie', { 'data-thread': 'left', 'data-knot': '', 'aria-hidden': 'true' }))
  if (a.blocks.length) {
    body.append(
      h(
        'div.after-bento',
        { 'data-reveal-stagger': '', 'data-thread': 'right', 'data-thread-y': 'top' },
        a.blocks.map((b, i) => card(b, i, spans[i], c.lang)),
      ),
    )
  }
  body.append(h('div.after-end', { 'data-thread': 'right', 'aria-hidden': 'true' }))
  return section
}

/* ------------------------------------------------------------------ behaviour: the act of birth */
type Mode = 'pin' | 'static'

function certificateMotion(el: HTMLElement, cert: HTMLElement) {
  const q = <T extends Element = HTMLElement>(sel: string) => cert.querySelector<T>(sel)!
  const text = q('.after-cert-text')
  const desk = q('.after-desk')
  const inner = q('.after-desk-inner')
  const note = q('.after-note')
  const env = q('.after-env')
  const envBack = q('.after-env-back')
  const envFront = q('.after-env-front')
  const sticker = q('.after-env-sticker')
  const flap = q('.after-env-flap')
  const seal = q('.after-seal')
  const ring = q('.after-seal-ring')
  const docBefore = q('.after-doc--before')
  const slotAfter = q('.after-slot--after')
  const docAfter = q('.after-doc--after')
  const archiveTag = q('.after-archive-tag')
  const fill = q('.after-steps-fill')
  const veils = Array.from(cert.querySelectorAll<HTMLElement>('.after-veil'))
  const changed = Array.from(docAfter.querySelectorAll<HTMLElement>('.is-changed .after-type'))
  const stepBtns = Array.from(cert.querySelectorAll<HTMLButtonElement>('.after-step'))
  const typers = Array.from(docAfter.querySelectorAll<HTMLElement>('.after-type')).map((t) => ({
    row: t.closest<HTMLElement>('.after-row')!,
    chars: Array.from(t.querySelectorAll<HTMLElement>('.c')),
    n: -1,
  }))

  /* guilloché frames follow the paper's size */
  const frames = Array.from(cert.querySelectorAll<SVGSVGElement>('.after-guilloche'))
  frames.forEach(drawGuilloche)
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const f = e.target.querySelector<SVGSVGElement>(':scope > .after-guilloche')
      if (f) drawGuilloche(f)
    }
  })
  frames.forEach((f) => ro.observe(f.parentElement!))
  onTeardown(() => ro.disconnect())

  let mode: Mode | null = null
  let modeCtx: gsap.Context | null = null
  let st: ScrollTrigger | null = null
  let current = -1
  const geo = { IW: 0, IH: 0, envW: 0, envH: 0, es: 0.52, ex: 0, ey: 0, shift: 0 }

  const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64

  /* typing: only touch the characters that changed state */
  const setTyped = (k: number, n: number) => {
    const t = typers[k]
    const len = t.chars.length
    n = clamp(n, 0, len)
    if (n === t.n) return
    const lo = Math.min(n, Math.max(0, t.n))
    const hi = Math.max(n, Math.max(0, t.n))
    for (let i = t.n < 0 ? 0 : lo; i < (t.n < 0 ? len : hi); i++) t.chars[i].classList.toggle('on', i < n)
    t.chars.forEach((ch, i) => ch.classList.toggle('cur', i === n - 1 && n < len))
    t.row.classList.toggle('is-typing', n > 0 && n < len)
    t.row.classList.toggle('is-typed', n >= len)
    t.n = n
  }
  const resetTyping = () =>
    typers.forEach((t) => {
      t.chars.forEach((ch) => ch.classList.remove('on', 'cur'))
      t.row.classList.remove('is-typing', 'is-typed')
      t.n = -1
    })

  const setStep = (i: number) => {
    if (i === current) return
    current = i
    stepBtns.forEach((b, k) => {
      b.classList.toggle('is-done', k < i)
      if (k === i) b.setAttribute('aria-current', 'step')
      else b.removeAttribute('aria-current')
    })
  }
  const paint = (p: number) => {
    fill.style.transform = `scaleY(${p.toFixed(4)})`
    setStep(p < STEP_AT[1] ? 0 : p < STEP_AT[2] ? 1 : 2)
  }

  const clearInline = () => {
    inner.style.removeProperty('width')
    inner.style.removeProperty('height')
    inner.style.removeProperty('transform')
    desk.style.removeProperty('height')
    archiveTag.style.removeProperty('top')
    archiveTag.style.removeProperty('max-width')
  }

  /** Measure the pinned composition; returns false when it cannot fit the viewport. */
  const layout = () => {
    clearInline()
    const docW = docBefore.offsetWidth
    const envW = env.offsetWidth
    const envH = env.offsetHeight
    const IH = Math.max(envH, slotAfter.offsetHeight) + 36
    const avail = innerHeight - headerH() - 12 - 28 - note.offsetHeight - 16
    const sc = Math.min(1, avail / IH)
    const D = desk.clientWidth
    if (!D || !docW) return false
    const IW = D / sc
    const es = 0.52
    const half = (IW - docW) / 2
    geo.IW = IW
    geo.IH = IH
    geo.envW = envW
    geo.envH = envH
    geo.es = es
    // the new act shifts right just enough for the archived envelope to stay in view
    geo.shift = clamp(envW * es - half + 28, 0, Math.max(0, half))
    const tagRoom = 40
    const cx = (envW * es) / 2 + 8
    const cy = IH - (envH * es) / 2 - tagRoom
    geo.ex = cx - IW / 2
    geo.ey = cy - IH / 2
    inner.style.width = `${IW}px`
    inner.style.height = `${IH}px`
    inner.style.transform = `scale(${sc})`
    desk.style.height = `${Math.round(IH * sc)}px`
    archiveTag.style.top = `${Math.round(cy + (envH * es) / 2 + 16)}px`
    archiveTag.style.maxWidth = `${Math.round(Math.max(envW * es + 40, 180))}px`
    return sc >= 0.7 && text.offsetHeight <= avail + note.offsetHeight + 16
  }

  const setClasses = (m: Mode) => {
    cert.classList.toggle('is-pin', m === 'pin')
    cert.classList.toggle('is-static', m === 'static')
  }

  const clearMode = () => {
    ring.style.removeProperty('opacity')
    ring.style.removeProperty('transform')
    modeCtx?.revert()
    modeCtx = null
    st = null
    clearInline()
    resetTyping()
    fill.style.removeProperty('transform')
    current = -1
    stepBtns.forEach((b) => {
      b.classList.remove('is-done')
      b.removeAttribute('aria-current')
    })
  }

  const decide = (): Mode => {
    if (motion.reduced || innerWidth < 1000) return 'static'
    setClasses('pin')
    return layout() ? 'pin' : 'static'
  }

  const buildPin = () => {
    resetTyping()
    typers.forEach((_, k) => setTyped(k, 0))
    modeCtx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: () => paint(tl.progress()),
        scrollTrigger: {
          trigger: cert,
          start: 'top top',
          end: () => `+=${Math.round(innerHeight * 2.4)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      st = tl.scrollTrigger ?? null

      // 01 → 02: the entries are veiled (covered, not erased)
      if (veils.length) tl.fromTo(veils, { scaleX: 0 }, { scaleX: 1, duration: 0.1, stagger: { amount: 0.04 }, ease: 'power2.inOut' }, T.veil)
      // the envelope gathers around the paper; the paper sinks into the pocket
      tl.fromTo(envBack, { autoAlpha: 0, y: 26, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.07, ease: 'power2.out' }, T.envBack)
      tl.fromTo(docBefore, { y: 0, scale: 1 }, { y: () => geo.envH * 0.05, scale: 0.985, duration: 0.15, ease: 'power2.inOut' }, T.insert)
      tl.fromTo(envFront, { yPercent: 104 }, { yPercent: 0, duration: 0.15, ease: 'power2.out' }, T.insert)
      tl.fromTo(envFront, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, T.insert)
      // the flap folds down, the wax presses
      tl.fromTo(
        flap,
        { rotationX: -88, autoAlpha: 0, transformPerspective: 700, transformOrigin: '50% 0%' },
        { rotationX: 0, autoAlpha: 1, duration: 0.055, ease: 'power2.in' },
        T.flap,
      )
      tl.fromTo(seal, { scale: 1.9, rotate: -34, autoAlpha: 0 }, { scale: 1, rotate: -8, autoAlpha: 1, duration: 0.045, ease: 'power3.in' }, T.seal)
      // the wax "breathes" out as it lands: a ring that swells and fades (deterministic both ways)
      const press = { p: 0 }
      tl.fromTo(
        press,
        { p: 0 },
        {
          p: 1,
          duration: 0.06,
          onUpdate: () => {
            ring.style.opacity = (Math.sin(press.p * Math.PI) * 0.7).toFixed(3)
            ring.style.transform = `scale(${(0.85 + press.p * 1.05).toFixed(3)})`
          },
        },
        T.seal + 0.042,
      )
      tl.fromTo(sticker, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.04, ease: 'power2.out' }, T.sticker)
      // 02 → 03: the sealed original is set aside (kept), a fresh act rises in its place
      tl.fromTo(
        env,
        { x: 0, y: 0, scale: 1, rotate: 0 },
        { x: () => geo.ex, y: () => geo.ey, scale: () => geo.es, rotate: -5, duration: 0.12, ease: 'power2.inOut' },
        T.aside,
      )
      tl.fromTo(archiveTag, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, T.tag)
      tl.fromTo(
        slotAfter,
        { x: () => geo.shift, y: () => geo.IH * 0.75, rotate: 3, autoAlpha: 0 },
        { x: () => geo.shift, y: 0, rotate: 0, autoAlpha: 1, duration: 0.12, ease: 'power3.out' },
        T.rise,
      )
      // the entries type themselves in, scrubbed character by character
      const weight = (n: number) => Math.max(5, n)
      const total = typers.reduce((acc, t) => acc + weight(t.chars.length), 0) || 1
      const gap = typers.length > 1 ? (T.typeSpan * 0.14) / (typers.length - 1) : 0
      let at = T.type
      typers.forEach((t, k) => {
        const d = (weight(t.chars.length) / total) * T.typeSpan * 0.86
        const proxy = { n: 0 }
        tl.fromTo(proxy, { n: 0 }, { n: t.chars.length, duration: d, onUpdate: () => setTyped(k, Math.round(proxy.n)) }, at)
        at += d + gap
      })
      if (changed.length)
        tl.fromTo(changed, { backgroundSize: '0% 1.5px' }, { backgroundSize: '100% 1.5px', duration: 0.05, stagger: 0.01 }, T.type + T.typeSpan - 0.02)
      // pad to exactly 1 unit so positions read as progress
      tl.set({}, {}, 1)
    }, el)
    paint(0)
  }

  /** Static layout: nothing pinned; a small decorative stamp when the paper arrives. */
  const buildStatic = () => {
    if (motion.reduced) return
    modeCtx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      if (veils.length) tl.fromTo(veils, { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.06, ease: 'power3.inOut' })
      tl.fromTo(seal, { scale: 1.7, rotate: -30, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.45, ease: 'power4.in' }, 0.35)
      tl.fromTo(ring, { scale: 0.85, opacity: 0.7 }, { scale: 1.9, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, 0.8)
      ScrollTrigger.create({ trigger: docBefore, start: 'top 75%', once: true, onEnter: () => tl.play() })
      if (changed.length) {
        const tl2 = gsap.timeline({ paused: true })
        tl2.fromTo(changed, { backgroundSize: '0% 1.5px' }, { backgroundSize: '100% 1.5px', duration: 0.9, stagger: 0.12, ease: 'power3.inOut' })
        ScrollTrigger.create({ trigger: docAfter, start: 'top 75%', once: true, onEnter: () => tl2.play() })
      }
    }, el)
  }

  const apply = (force = false) => {
    const prev = mode
    const next = decide()
    if (next === prev && !force) {
      if (next === 'pin') {
        layout()
        ScrollTrigger.refresh()
      }
      return
    }
    clearMode()
    setClasses(next)
    mode = next
    if (next === 'pin') {
      layout()
      buildPin()
    } else buildStatic()
    if (prev !== null) ScrollTrigger.refresh()
    else refreshSoon()
  }

  apply(true)

  /* the stepper is also navigation: each step scrolls to its moment in the scrub */
  stepBtns.forEach((b, i) =>
    b.addEventListener('click', () => {
      if (mode !== 'pin' || !st) return
      const y = Math.round(st.start + STEP_GO[i] * (st.end - st.start)) + (i === 0 ? 1 : 0)
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(y, { duration: 1.4 })
      else window.scrollTo({ top: y, behavior: 'smooth' })
    }),
  )

  let timer = 0
  let lastW = innerWidth
  let lastH = innerHeight
  const onResize = () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 80) return
      lastW = innerWidth
      lastH = innerHeight
      apply()
    }, 220)
  }
  window.addEventListener('resize', onResize)
  document.fonts?.ready.then(() => {
    if (cert.isConnected) {
      frames.forEach(drawGuilloche)
      apply()
    }
  })
  onTeardown(() => {
    window.removeEventListener('resize', onResize)
    window.clearTimeout(timer)
    clearMode()
  })
}

/* ------------------------------------------------------------------ behaviour: cards */
function cardsMotion(el: HTMLElement) {
  if (!motion.finePointer || motion.reduced) return
  el.querySelectorAll<HTMLElement>('.after-card').forEach((cardEl) => {
    const move = (e: PointerEvent) => {
      const r = cardEl.getBoundingClientRect()
      cardEl.style.setProperty('--mx', `${(e.clientX - r.left).toFixed(0)}px`)
      cardEl.style.setProperty('--my', `${(e.clientY - r.top).toFixed(0)}px`)
    }
    cardEl.addEventListener('pointermove', move, { passive: true })
    onTeardown(() => cardEl.removeEventListener('pointermove', move))
  })
}

function enhance(el: HTMLElement) {
  const cert = el.querySelector<HTMLElement>('.after-cert')
  if (cert) certificateMotion(el, cert)
  cardsMotion(el)
}

export const afterSection: SectionDef = { id: 'after', render, enhance }
