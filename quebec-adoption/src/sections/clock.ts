/**
 * CLOCK: the deadlines that matter.
 *
 * 1) DIALS: every delay is a small instrument. Its ring is calibrated to the unit's natural cycle
 *    (one turn = 24 hours, 30 days, 12 months or 18 years), so the arc is honest: 48 hours sweeps
 *    two full turns (the second lap spirals inward), 6 months sweeps half a turn. On entry the arc
 *    sweeps with expo easing, the counter runs in sync, then a maple deadline mark "clicks" into
 *    the bezel. Hover turns the bezel a little and scrambles the number back to itself.
 * 2) PLACEMENT INSTRUMENT: a native range input (custom skin, value bubble) picks the child's age.
 *    The track is cut into the legal age bands; the readout is a mechanical odometer and a month
 *    ruler whose atoca bar runs to the limit. On first view the instrument does one gentle
 *    "calibration sweep" (0 → 17 → 0), like a gauge powering on; any touch stops it.
 *
 * Content at rest is final: render() paints every arc, number and bar in its end state, and
 * enhance() only rewinds what it is about to animate.
 */
import type { Content, Delay, PlacementBand } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell, citations, para } from './shared'
import { h, s, clamp } from '../core/dom'
import { gsap, ScrollTrigger, motion, ease, scope, onTeardown } from '../core/motion'
import { scrambleTo } from '../core/interactions'
import { icon } from '../core/icons'

/* ================================================================== dial geometry */
const C = 100 // svg centre (viewBox 0 0 200 200)
const R_TICK = 97 // outer edge of the bezel ticks
const R_ARC = 80 // first lap radius
const LAP_GAP = 10 // each extra lap spirals inward by this much
const MAX_LAPS = 3

interface Scale {
  cycle: number // how many units one full turn represents
  ticks: number // bezel ticks per turn
  major: number // every n-th tick is long
}
/** Natural cycles per unit; the first one that keeps the dial at ≤ 3 laps wins. */
const SCALES: Record<Delay['unit'], Scale[]> = {
  hours: [
    { cycle: 24, ticks: 24, major: 6 },
    { cycle: 168, ticks: 28, major: 4 },
  ],
  days: [
    { cycle: 30, ticks: 30, major: 5 },
    { cycle: 365, ticks: 12, major: 3 },
  ],
  months: [
    { cycle: 12, ticks: 12, major: 3 },
    { cycle: 60, ticks: 20, major: 4 },
  ],
  years: [{ cycle: 18, ticks: 18, major: 6 }],
}

function scaleFor(d: Delay) {
  const list = SCALES[d.unit] ?? SCALES.months
  const sc = list.find((x) => d.value / x.cycle <= MAX_LAPS) ?? list[list.length - 1]
  return { ...sc, laps: clamp(d.value / sc.cycle, 0, MAX_LAPS) }
}

/** point on a circle; frac 0 = 12 o'clock, clockwise */
const polar = (r: number, frac: number) => {
  const a = frac * Math.PI * 2
  return { x: C + r * Math.sin(a), y: C - r * Math.cos(a) }
}

function dialSvg(sc: ReturnType<typeof scaleFor>) {
  const laps = Math.max(1, Math.ceil(sc.laps - 1e-6))
  const ticks = s('g', { class: 'clock-ticks' })
  for (let i = 0; i < sc.ticks; i++) {
    const major = i % sc.major === 0
    const a = polar(R_TICK, i / sc.ticks)
    const b = polar(R_TICK - (major ? 9 : 4.5), i / sc.ticks)
    ticks.append(
      s('line', {
        class: major ? 'clock-tick is-major' : 'clock-tick',
        x1: a.x.toFixed(2),
        y1: a.y.toFixed(2),
        x2: b.x.toFixed(2),
        y2: b.y.toFixed(2),
      }),
    )
  }
  const tracks = s('g', { class: 'clock-tracks' })
  const arcs = s('g', { class: 'clock-arcs' })
  for (let k = 0; k < laps; k++) {
    const r = R_ARC - k * LAP_GAP
    tracks.append(s('circle', { class: 'clock-track', cx: C, cy: C, r }))
    arcs.append(s('circle', { class: 'clock-arc', cx: C, cy: C, r, pathLength: 100, transform: `rotate(-90 ${C} ${C})` }))
  }
  const endFrac = sc.laps - Math.floor(sc.laps + 1e-6) || 1
  const mark = s(
    'g',
    { transform: `rotate(${(endFrac * 360).toFixed(2)} ${C} ${C})` },
    s('rect', { class: 'clock-mark', x: C - 1.75, y: C - R_TICK - 2.5, width: 3.5, height: 16, rx: 1.75 }),
  )
  const tip = s('circle', { class: 'clock-tip', cx: C, cy: C - R_ARC, r: 5.2 })
  return s('svg', { class: 'clock-ring', viewBox: '0 0 200 200', 'aria-hidden': 'true', focusable: 'false' }, ticks, tracks, arcs, mark, tip)
}

interface DialRefs {
  arcs: SVGCircleElement[]
  ticks: SVGLineElement[]
  tip: SVGCircleElement
}
const dialRefs = (root: Element): DialRefs => ({
  arcs: Array.from(root.querySelectorAll<SVGCircleElement>('.clock-arc')),
  ticks: Array.from(root.querySelectorAll<SVGLineElement>('.clock-tick')),
  tip: root.querySelector<SVGCircleElement>('.clock-tip')!,
})

/** Paint a dial at progress p (in laps). */
function paintDial(r: DialRefs, p: number) {
  r.arcs.forEach((a, k) => {
    const f = clamp(p - k, 0, 1)
    a.style.strokeDashoffset = (100 * (1 - f)).toFixed(3)
    a.style.opacity = f > 0.002 ? '1' : '0'
  })
  const k = clamp(Math.ceil(p - 1e-6) - 1, 0, r.arcs.length - 1)
  const pt = polar(R_ARC - k * LAP_GAP, clamp(p - k, 0, 1))
  r.tip.setAttribute('cx', pt.x.toFixed(2))
  r.tip.setAttribute('cy', pt.y.toFixed(2))
  r.tip.style.opacity = p > 0.002 ? '1' : '0'
  const lit = Math.min(1, p)
  const n = r.ticks.length
  r.ticks.forEach((t, i) => t.classList.toggle('is-lit', p > 0.002 && i / n <= lit + 1e-6))
}

function dial(d: Delay, i: number, n: number, locale: string) {
  const sc = scaleFor(d)
  const shown = d.value.toLocaleString(locale)
  const digits = shown.replace(/\D/g, '').length
  const numSize = digits <= 2 ? 31 : digits === 3 ? 25 : 20
  const titleId = `clock-dial-${d.id}`
  const svg = dialSvg(sc)
  paintDial(dialRefs(svg), sc.laps)

  return h(
    'li.clock-dial.card',
    { 'data-laps': sc.laps.toFixed(4), 'aria-labelledby': titleId },
    h('h3.clock-dial-title', { id: titleId }, d.title),
    h(
      'div.clock-dial-face',
      { style: `--num:${numSize}cqi` },
      svg,
      h(
        'p.clock-dial-read',
        null,
        h('span.clock-dial-num', { 'aria-hidden': 'true', 'data-count': String(d.value) }, shown),
        h('span.clock-dial-unit', { 'aria-hidden': 'true' }, d.unitLabel),
        h('span.sr-only', null, `${shown} ${d.unitLabel}`),
      ),
    ),
    h(
      'span.clock-dial-idx',
      { 'aria-hidden': 'true' },
      String(i + 1).padStart(2, '0'),
      h('span', null, ` / ${String(n).padStart(2, '0')}`),
    ),
    para(d.body, 'clock-dial-body'),
    citations(d.refs, d.sources),
  )
}

/* ================================================================== placement instrument */
const HIT = 44 // native thumb size = touch target; the rail is inset by half of it

interface Model {
  bands: PlacementBand[]
  min: number
  max: number
  span: number
  rulerMax: number
  initial: number
}

function model(bands: PlacementBand[]): Model {
  const sorted = [...bands].sort((a, b) => a.minAge - b.minAge)
  const min = Math.max(0, Math.min(...sorted.map((b) => b.minAge)))
  const max = clamp(Math.max(...sorted.map((b) => b.maxAge)) - 1, min + 1, 17)
  const maxMonths = Math.max(...sorted.map((b) => b.months))
  return {
    bands: sorted,
    min,
    max,
    span: Math.max(1, max - min),
    rulerMax: Math.max(12, Math.ceil(maxMonths / 3) * 3),
    initial: clamp(sorted[0].minAge, min, max),
  }
}

const bandIndex = (m: Model, age: number) => {
  const i = m.bands.findIndex((b) => age >= b.minAge && age < b.maxAge)
  if (i >= 0) return i
  return age < m.bands[0].minAge ? 0 : m.bands.length - 1
}

/**
 * "1 ans" → "1 an", "1 years old" → "1 year old" where the language's plural rules say "one";
 * age 0 reads "< 1 an" / "< 1 year old" (a baby placed before their first birthday).
 */
function yearsLabel(age: number, word: string, locale: string) {
  const singular = word.replace(/^(\S+?)s\b/, '$1')
  if (age === 0) return `< 1 ${singular}`
  let one = age === 1
  try {
    one = new Intl.PluralRules(locale).select(age) === 'one'
  } catch {
    /* keep the simple rule */
  }
  return `${age} ${one ? singular : word}`
}

function odometer(cols: number) {
  return h(
    'span.clock-odo',
    { 'aria-hidden': 'true' },
    Array.from({ length: cols }, () =>
      h('span.clock-odo-col', null, h('span.clock-odo-strip', null, '0123456789'.split('').map((d) => h('span', null, d)))),
    ),
  )
}

function placement(c: Content) {
  const p = c.clock.placement
  const locale = c.lang === 'fr' ? 'fr-CA' : 'en-CA'
  const head = h('h3.clock-panel-title', { id: 'clock-placement-title' }, p.title)

  const foot = h(
    'div.clock-panel-foot',
    null,
    h('div.clock-panel-body', null, para(p.body, 'clock-panel-text'), citations(p.refs, p.sources)),
    p.after ? h('div.clock-after', null, icon('scale', 'clock-after-icon'), para(p.after)) : null,
  )

  if (!p.bands.length) {
    return h('div.clock-panel.card', { 'aria-labelledby': 'clock-placement-title', role: 'group' }, head, foot)
  }

  const m = model(p.bands)
  const pos = (age: number) => clamp((age - m.min) / m.span, 0, 1)

  // the slider rail: legal bands as segments, one tick per year, labels at band boundaries
  const segs = m.bands.map((b) => {
    const a = pos(b.minAge - 0.5)
    const z = pos(b.maxAge - 0.5)
    return h('span.clock-seg', { style: `--a:${a.toFixed(4)};--z:${z.toFixed(4)}` })
  })
  const labelAges = new Set([m.min, ...m.bands.map((b) => clamp(b.minAge, m.min, m.max)), m.max])
  const years = Array.from({ length: m.max - m.min + 1 }, (_, k) => {
    const age = m.min + k
    return h(
      'span.clock-year',
      { class: labelAges.has(age) ? 'is-label' : '', style: `--t:${pos(age).toFixed(4)}` },
      labelAges.has(age) ? h('span', null, String(age)) : null,
    )
  })

  const input = h('input.clock-range#clock-age', {
    type: 'range',
    min: m.min,
    max: m.max,
    step: 1,
    value: m.initial,
    'aria-describedby': 'clock-age-hint',
  })
  const slider = h(
    'div.clock-slider',
    { style: `--f:${pos(m.initial)};--hit:${HIT}px` },
    h('div.clock-rail', { 'aria-hidden': 'true' }, h('div.clock-segs', null, segs), h('div.clock-years', null, years)),
    input,
    h('div.clock-rail.clock-rail-top', { 'aria-hidden': 'true' }, h('span.clock-thumb'), h('span.clock-bubble', null, h('span.clock-bubble-text'))),
  )

  const legend = h(
    'ul.clock-bands',
    { role: 'list', id: 'clock-age-hint' },
    m.bands.map((b, i) =>
      h(
        'li',
        null,
        h(
          'button.clock-band',
          { type: 'button', 'data-band': i, 'aria-controls': 'clock-age clock-result' },
          h('span.clock-band-age', null, b.ageLabel),
          h('span.clock-band-months', null, `${b.months} ${p.monthsWord}`),
        ),
      ),
    ),
  )

  const cols = String(Math.max(...m.bands.map((b) => b.months))).length
  const readout = h(
    'output.clock-readout#clock-result',
    { for: 'clock-age', 'aria-live': 'polite', 'aria-atomic': 'true' },
    h('span.clock-result-prefix', null, p.resultPrefix),
    h(
      'span.clock-result',
      null,
      odometer(cols),
      h('span.sr-only.clock-result-sr', null, ''),
      h('span.clock-result-unit', null, ` ${p.monthsWord}`),
    ),
  )

  const step = m.rulerMax <= 36 ? 3 : 6
  const ruler = h(
    'div.clock-ruler',
    { 'aria-hidden': 'true', 'data-thread': 'right', 'data-knot': '' },
    h('span.clock-ruler-axis', null, p.monthsWord),
    h(
      'div.clock-ruler-track',
      null,
      h('span.clock-ruler-base'),
      h('span.clock-ruler-bar'),
      m.bands.map((b, i) => h('span.clock-ruler-notch', { 'data-band': i, style: `--t:${(b.months / m.rulerMax).toFixed(4)}` })),
      h('span.clock-ruler-cap'),
      Array.from({ length: m.rulerMax + 1 }, (_, k) =>
        h(
          'span.clock-ruler-tick',
          { class: k % step === 0 ? 'is-major' : '', style: `--t:${(k / m.rulerMax).toFixed(4)}` },
          k % step === 0 ? h('span', null, String(k)) : null,
        ),
      ),
    ),
  )

  const panel = h(
    'div.clock-panel.card',
    { role: 'group', 'aria-labelledby': 'clock-placement-title', 'data-thread': 'right', 'data-thread-y': 'top' },
    head,
    h(
      'div.clock-instrument',
      null,
      h('div.clock-control', null, h('label.clock-slider-label', { for: 'clock-age' }, p.sliderLabel), slider, legend),
      readout,
    ),
    ruler,
    foot,
  )

  // paint the resting state (no motion needed to read it)
  const ctl = controller(panel, c, m, locale)
  ctl.setAge(m.initial, 'init')
  return panel
}

/* ------------------------------------------------------------------ instrument controller */
type Source = 'init' | 'input' | 'band' | 'sweep'

function controller(panel: HTMLElement, c: Content, m: Model, locale: string) {
  const p = c.clock.placement
  const q = <T extends Element = HTMLElement>(sel: string) => panel.querySelector<T>(sel)!
  const qa = <T extends Element = HTMLElement>(sel: string) => Array.from(panel.querySelectorAll<T>(sel))
  const input = q<HTMLInputElement>('.clock-range')
  const slider = q('.clock-slider')
  const bubble = q('.clock-bubble')
  const bubbleText = q('.clock-bubble-text')
  const segs = qa('.clock-seg')
  const btns = qa<HTMLButtonElement>('.clock-band')
  const odoStrips = qa('.clock-odo-strip')
  const odoCols = qa('.clock-odo-col')
  const sr = q('.clock-result-sr')
  const ruler = q('.clock-ruler')
  const rTicks = qa('.clock-ruler-tick')
  const notches = qa('.clock-ruler-notch')

  // two separate tween targets: the ruler tween overwrites itself, never the thumb's quickTo
  const sf = { f: (m.initial - m.min) / m.span }
  const sm = { m: 0 }
  let age = -1
  let band = -1
  let railW = 0
  let animate = false
  let fTo: ((v: number) => void) | null = null

  const paintBubble = () => {
    const W = railW || slider.clientWidth - HIT
    if (W <= 0) return
    const bw = bubble.offsetWidth
    const x = sf.f * W
    const lo = -HIT / 2 - (x - bw / 2)
    const hi = W + HIT / 2 - (x + bw / 2)
    bubble.style.setProperty('--bx', `${clamp(0, lo, Math.max(lo, hi)).toFixed(1)}px`)
  }
  const paintF = () => {
    slider.style.setProperty('--f', sf.f.toFixed(4))
    paintBubble()
  }
  const paintRuler = () => {
    ruler.style.setProperty('--m', sm.m.toFixed(4))
    const cur = sm.m * m.rulerMax + 0.01
    rTicks.forEach((t, k) => t.classList.toggle('is-lit', k <= cur))
  }

  const setOdo = (value: number) => {
    const str = String(Math.round(value)).padStart(odoCols.length, '0').slice(-odoCols.length)
    let leading = true
    odoCols.forEach((col, i) => {
      const d = Number(str[i])
      const lead = leading && d === 0 && i < odoCols.length - 1
      if (!lead) leading = false
      col.classList.toggle('is-lead', lead)
      const strip = odoStrips[i]
      if (animate) {
        gsap.to(strip, { '--d': d, duration: 0.95, ease: 'back.out(1.25)', delay: (odoCols.length - 1 - i) * 0.07, overwrite: true })
      } else {
        gsap.killTweensOf(strip)
        strip.style.setProperty('--d', String(d))
      }
    })
    sr.textContent = String(Math.round(value))
  }

  const applyBand = (i: number) => {
    const b = m.bands[i]
    segs.forEach((el, k) => el.classList.toggle('is-active', k === i))
    notches.forEach((el, k) => el.classList.toggle('is-active', k === i))
    btns.forEach((el, k) => {
      el.classList.toggle('is-active', k === i)
      if (k === i) el.setAttribute('aria-current', 'true')
      else el.removeAttribute('aria-current')
    })
    setOdo(b.months)
    const target = b.months / m.rulerMax
    if (animate) {
      gsap.to(sm, { m: target, duration: 1.15, ease: ease.out, overwrite: true, onUpdate: paintRuler })
      gsap.fromTo(ruler.querySelector('.clock-ruler-cap'), { scale: 0.7 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)', delay: 0.35 })
    } else {
      sm.m = target
      paintRuler()
    }
  }

  const setAge = (v: number, source: Source) => {
    const fv = clamp(v, m.min, m.max)
    const a = Math.round(fv)
    if (source !== 'input') input.value = String(a)
    const f = (fv - m.min) / m.span
    if (a !== age) {
      age = a
      const label = yearsLabel(a, p.yearsWord, locale)
      bubbleText.textContent = label
      input.setAttribute('aria-valuetext', label)
    }
    if (source === 'sweep' || source === 'init' || !fTo) {
      sf.f = f
      paintF()
    } else {
      paintBubble()
      fTo(f)
    }
    const bi = bandIndex(m, a)
    if (bi !== band) {
      band = bi
      applyBand(bi)
    }
  }

  /** enhance(): wire input, buttons, resize; enable animation. */
  const wire = () => {
    animate = !motion.reduced
    if (animate) fTo = gsap.quickTo(sf, 'f', { duration: 0.42, ease: 'power3.out', onUpdate: paintF })
    const ro = new ResizeObserver(() => {
      railW = slider.clientWidth - HIT
      paintBubble()
    })
    ro.observe(slider)
    let touched = false
    let sweep: gsap.core.Timeline | null = null
    const live = q('.clock-readout')
    const stopSweep = () => {
      touched = true
      if (sweep) {
        sweep.kill()
        sweep = null
        live.setAttribute('aria-live', 'polite')
      }
    }
    const onInput = () => {
      stopSweep()
      setAge(Number(input.value), 'input')
    }
    const onBand = (e: Event) => {
      stopSweep()
      const i = Number((e.currentTarget as HTMLElement).dataset.band)
      const b = m.bands[i]
      if (b) setAge(clamp(b.minAge, m.min, m.max), 'band')
    }
    input.addEventListener('input', onInput)
    input.addEventListener('pointerdown', stopSweep)
    input.addEventListener('keydown', stopSweep)
    btns.forEach((b) => b.addEventListener('click', onBand))
    onTeardown(() => {
      ro.disconnect()
      input.removeEventListener('input', onInput)
      input.removeEventListener('pointerdown', stopSweep)
      input.removeEventListener('keydown', stopSweep)
      btns.forEach((b) => b.removeEventListener('click', onBand))
      sweep?.kill()
      gsap.killTweensOf([sf, sm, ...odoStrips])
    })

    /** one gentle calibration sweep the first time the instrument is seen */
    const calibrate = () => {
      if (motion.reduced) return
      ScrollTrigger.create({
        trigger: slider,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          if (touched) return
          const proxy = { v: m.initial }
          live.setAttribute('aria-live', 'off')
          slider.classList.add('is-sweeping')
          sweep = gsap
            .timeline({
              delay: 0.35,
              onComplete: () => {
                sweep = null
                slider.classList.remove('is-sweeping')
                live.setAttribute('aria-live', 'polite')
              },
            })
            .to(proxy, { v: m.max, duration: 1.7, ease: 'power2.inOut', onUpdate: () => setAge(proxy.v, 'sweep') })
            .to(proxy, { v: m.initial, duration: 1.25, ease: 'power3.inOut', onUpdate: () => setAge(proxy.v, 'sweep') }, '+=0.4')
        },
      })
    }
    return { calibrate }
  }

  return { setAge, wire }
}

/* ================================================================== render */
function render(c: Content) {
  const k = c.clock
  const locale = c.lang === 'fr' ? 'fr-CA' : 'en-CA'
  const { section, body } = sectionShell('clock', { eyebrow: k.eyebrow, title: k.title, lede: k.lede, className: 'clock' })

  if (k.delays.length) {
    body.append(
      h(
        'ol.clock-dials',
        { role: 'list', 'data-n': k.delays.length, 'data-thread': 'left', 'data-thread-y': 'top' },
        k.delays.map((d, i) => dial(d, i, k.delays.length, locale)),
      ),
    )
  }
  body.append(placement(c))
  return section
}

/* ================================================================== enhance */
function dialMotion(card: HTMLElement, i: number, locale: string) {
  const laps = parseFloat(card.dataset.laps || '0')
  const num = card.querySelector<HTMLElement>('.clock-dial-num')
  const face = card.querySelector<HTMLElement>('.clock-dial-face')
  const ring = card.querySelector<SVGSVGElement>('.clock-ring')
  const mark = card.querySelector<SVGRectElement>('.clock-mark')
  if (!num || !face || !ring || !mark || !(laps > 0)) return
  // we drive this counter ourselves, in sync with the arc (core/reveal skips it)
  num.dataset.countDone = '1'
  const value = parseFloat(num.dataset.count || '0')
  const final = num.textContent || ''
  const fmt = (v: number) => Math.round(v).toLocaleString(locale)
  const refs = dialRefs(ring)
  const st = { p: 0 }

  paintDial(refs, 0)
  num.textContent = fmt(0)
  gsap.set(mark, { scale: 0, transformOrigin: '50% 0%' })

  const dur = 1.5 + 0.45 * Math.min(laps, 2)
  const clickAt = dur * 0.56 // expo.out is ~98% there: the moment the needle visibly lands
  ScrollTrigger.create({
    trigger: card,
    start: 'top 86%',
    once: true,
    onEnter: () => {
      gsap
        .timeline({ delay: (i % 4) * 0.12 })
        .to(
          st,
          {
            p: laps,
            duration: dur,
            ease: ease.out,
            onUpdate: () => {
              paintDial(refs, st.p)
              if (!card.classList.contains('is-set')) num.textContent = fmt((value * st.p) / laps)
            },
          },
          0,
        )
        .add(() => {
          num.textContent = final
          card.classList.add('is-set')
        }, clickAt)
        .to(mark, { scale: 1, duration: 0.6, ease: 'back.out(3.2)' }, clickAt - 0.04)
        .to(face, { scale: 1.035, duration: 0.07, ease: 'power2.out' }, clickAt)
        .to(face, { scale: 1, duration: 0.7, ease: 'elastic.out(1.1, 0.38)' }, clickAt + 0.07)
        .fromTo(refs.tip, { scale: 1 }, { scale: 1.65, duration: 0.09, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: '50% 50%' }, clickAt)
    },
  })

  if (!motion.finePointer) return
  const turn = gsap.quickTo(ring, 'rotation', { duration: 1.1, ease: 'elastic.out(1, 0.45)' })
  let busy = false
  const enter = () => {
    if (busy || !card.classList.contains('is-set')) return
    busy = true
    scrambleTo(num, final, 0.55).then(() => (busy = false))
  }
  const move = (e: PointerEvent) => {
    const r = card.getBoundingClientRect()
    turn(((e.clientX - r.left) / r.width - 0.5) * 26)
  }
  const leave = () => turn(0)
  card.addEventListener('pointerenter', enter)
  card.addEventListener('pointermove', move)
  card.addEventListener('pointerleave', leave)
  onTeardown(() => {
    card.removeEventListener('pointerenter', enter)
    card.removeEventListener('pointermove', move)
    card.removeEventListener('pointerleave', leave)
  })
}

function enhance(el: HTMLElement, c: Content) {
  const locale = c.lang === 'fr' ? 'fr-CA' : 'en-CA'
  const panel = el.querySelector<HTMLElement>('.clock-panel')
  const hasInstrument = !!panel?.querySelector('.clock-range')

  scope(el, () => {
    const inst = panel && hasInstrument ? controller(panel, c, model(c.clock.placement.bands), locale) : null
    if (inst) {
      // re-sync the controller with what render() painted, then wire it
      const input = panel!.querySelector<HTMLInputElement>('.clock-range')!
      inst.setAge(Number(input.value), 'init')
      const { calibrate } = inst.wire()
      calibrate()
    }
    if (motion.reduced) return
    el.querySelectorAll<HTMLElement>('.clock-dial').forEach((d, i) => dialMotion(d, i, locale))
  })
}

export const clockSection: SectionDef = { id: 'clock', render, enhance }
