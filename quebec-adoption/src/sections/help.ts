/**
 * HELP: "Get help" / "Obtenir de l'aide". The last station: the page thread ties off here.
 *
 * 1) THE SOS BANNER. The emergency sentence set as a calm two-line poster ("Danger right now? / Call 911."),
 *    a phone disc with slow concentric rings (a resting heartbeat, only while on screen, never with reduced
 *    motion) and the emergency number as three round dial keys. On arrival the keys are "pressed" one by
 *    one, each press sending a ring out of the disc. The keys are one tel: link; the digits are real text.
 *
 * 2) THE CONTACT BOARD. Urgent lines first, in their own row, with an atoca seam; the others follow.
 *    Any count works (rows of 3, or 2; a lone card becomes a wide strip). Every phone number is LARGE,
 *    selectable mono text (one click/tap selects all of it) sitting on a dotted "ghost" seam, like the page
 *    thread before it is sewn. Calling is a bonus (tel: link); copying is the main action.
 *
 *    Signature: press Copy and the button's icon folds away into a drawn check, its label rolls to
 *    "Copied", and a needle runs under the number sewing a red running stitch, stitch by stitch (it dips
 *    under the fabric between stitches); the digits lift as the needle passes beneath them, and a tiny knot
 *    ties off the end. The stitch stays: numbers you copied remain sewn.
 *
 * 3) THE END OF THE THREAD. The page thread runs down the left past the banner (knot), crosses to the right
 *    for the board, then sweeps to the centre and ties its final knot above a closing line.
 */
import type { Content, HelpItem, Lang } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'
import { h, rich, s, clamp } from '../core/dom'
import { gsap, ScrollTrigger, SplitText, motion, ease, scope, onTeardown } from '../core/motion'
import { copyText, magnetic, toast } from '../core/interactions'
import { icon } from '../core/icons'

/* Small UI words this section needs that are not in the content contract (see the final report). */
const UI = {
  fr: {
    now: 'Besoin d’aide maintenant',
    later: 'S’informer, être accompagné',
    sos: 'Urgence',
    dial: 'Appeler le',
    dialNote: 'Gratuit · jour et nuit',
    call: 'Appeler',
    phone: 'Téléphone',
    hours: 'Heures',
    site: 'Site de',
    newTab: 's’ouvre dans un nouvel onglet',
    selected: 'Numéro sélectionné : copiez-le avec Ctrl+C (⌘+C sur Mac).',
    closing: ['Demander de l’aide,', 'c’est aussi avancer.'],
  },
  en: {
    now: 'Need help now',
    later: 'Learn more, get support',
    sos: 'Emergency',
    dial: 'Call',
    dialNote: 'Free · day and night',
    call: 'Call',
    phone: 'Phone',
    hours: 'Hours',
    site: 'Website of',
    newTab: 'opens in a new tab',
    selected: 'Number selected: copy it with Ctrl+C (⌘+C on a Mac).',
    closing: ['Asking for help', 'is a step forward too.'],
  },
} as const
type UIStrings = (typeof UI)[Lang]

const colon = (lang: Lang) => (lang === 'fr' ? ' : ' : ': ')
const pad2 = (n: number) => String(n).padStart(2, '0')

/* ------------------------------------------------------------------ phone helpers */
/** "811, option 2" → { main: "811", extra: "option 2" }; "514 989-1885 ext. 1142" → main + "ext. 1142" */
function splitPhone(p: string) {
  const m = p.match(/^(.*?\d)\s*(?:,\s*|\s+(?=(?:ext|poste|option|p\.)))(.+)$/i)
  return m ? { main: m[1].trim(), extra: m[2].trim() } : { main: p.trim(), extra: '' }
}

const KEYPAD = '22233344455566677778889999'
/** tel: href (letters → keypad digits; 10 digits → +1; extension dialled after a pause) */
function telHref(p: string) {
  const { main, extra } = splitPhone(p)
  let d = main.toUpperCase().replace(/[A-Z]/g, (ch) => KEYPAD[ch.charCodeAt(0) - 65]).replace(/\D/g, '')
  if (!d) return null
  if (d.length === 10) d = `+1${d}`
  else if (d.length === 11 && d[0] === '1') d = `+${d}`
  const x = extra.replace(/\D/g, '')
  return `tel:${d}${x ? `,${x}` : ''}`
}

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/**
 * Column spans on the 6-column desktop grid: rows of 3, then rows of 2 at the end when the count
 * does not divide (4 → 2+2, 5 → 3+2, 7 → 3+2+2); a lone card is a full-width strip.
 */
function spans(n: number): number[] {
  if (n <= 0) return []
  if (n <= 3) return Array.from({ length: n }, () => 6 / n)
  const rows = Math.ceil(n / 3)
  const twos = rows * 3 - n
  const out: number[] = []
  for (let r = 0; r < rows; r++) {
    const k = r >= rows - twos ? 2 : 3
    for (let i = 0; i < k; i++) out.push(6 / k)
  }
  return out
}

/* ------------------------------------------------------------------ render */
function sosBanner(c: Content, t: UIStrings) {
  const text = c.help.emergency.trim()
  const numMatch = text.match(/\+?\d[\d\s().-]*\d|\d/)
  const num = numMatch?.[0].trim() ?? ''
  const digits = num.replace(/\D/g, '')
  const keyable = digits.length >= 2 && digits.length <= 4

  // "Danger right now? / Call 911."  → two display lines; the number glows atoca in the second
  const qi = text.indexOf('?')
  const q = qi > 0 && qi < text.length - 1 ? text.slice(0, qi + 1) : ''
  const a = q ? text.slice(qi + 1).trim() : text
  const answer = h('span.help-sos-a')
  if (num && a.includes(num)) {
    const [before, ...rest] = a.split(num)
    answer.append(rich(before), h('span.help-sos-num', { translate: 'no' }, num), rich(rest.join(num)))
  } else answer.append(rich(a))

  const ring = h(
    'div.help-sos-ring',
    { 'aria-hidden': 'true' },
    h('span.help-sos-burst'),
    icon('phone', 'help-sos-phone'),
  )
  const textEl = h(
    'div.help-sos-text',
    null,
    h('span.badge.badge-watch.help-sos-label', null, h('span.help-sos-dot', { 'aria-hidden': 'true' }), t.sos),
    h('p.help-sos-line', { id: 'help-sos-line' }, q ? h('span.help-sos-q', null, q) : null, answer),
  )
  const dial =
    keyable && telHref(num)
      ? h(
          'a.help-sos-dial',
          { href: telHref(num)!, 'aria-label': `${t.dial} ${num}` },
          h(
            'span.help-sos-keys',
            { 'aria-hidden': 'true' },
            digits.split('').map((d, k) => h('span.help-sos-key', { style: `--k:${k}` }, d)),
          ),
          h('span.help-sos-note', { 'aria-hidden': 'true' }, icon('phone'), t.dialNote),
        )
      : null

  return h(
    'div.help-sos',
    {
      role: 'group',
      'aria-labelledby': 'help-sos-line',
      class: dial ? 'has-dial' : '',
      // the thread passes the banner in the left margin and ties a knot under it
      'data-thread': 'left',
      'data-thread-y': 'bottom',
      'data-knot': '',
    },
    ring,
    textEl,
    dial,
  )
}

function stitchSvg() {
  return s(
    'svg',
    { class: 'help-stitch', 'aria-hidden': 'true', focusable: 'false' },
    s('line', { class: 'help-stitch-ghost', x1: 1, y1: 7, x2: '100%', y2: 7 }),
    s('g', { class: 'help-stitch-live' }),
    s('circle', { class: 'help-stitch-knot', r: 3.2, cx: 0, cy: 7 }),
    s(
      'g',
      { class: 'help-stitch-needle' },
      s('circle', { class: 'help-stitch-halo', r: 7 }),
      s('circle', { class: 'help-stitch-eye', r: 3 }),
    ),
  )
}

function card(it: HelpItem, i: number, span: number, tspan: number, c: Content, t: UIStrings, nameTag: 'h3' | 'h4') {
  const lang = c.lang
  const top = h(
    'div.help-card-top',
    null,
    it.hours
      ? h('span.badge.badge-calm.help-hours', null, icon('clock'), h('span.sr-only', null, `${t.hours}${colon(lang)}`), h('span.help-hours-t', null, it.hours))
      : h('span.help-hours-none'),
    h('span.help-card-num', { 'aria-hidden': 'true' }, pad2(i + 1)),
  )
  const name = h(`${nameTag}.help-card-name`, { id: `help-${it.id}-name` }, it.name)
  const desc = h('p.help-card-desc')
  desc.append(rich(it.desc))

  const reach = h('div.help-reach')
  const actions = h('div.help-actions')
  const siteLink = it.url
    ? h(
        'a.help-site',
        {
          href: it.url,
          target: '_blank',
          rel: 'noopener',
          'aria-label': `${t.site} ${it.name}${colon(lang)}${hostOf(it.url)} (${t.newTab})`,
        },
        h('span.help-site-host', { translate: 'no' }, hostOf(it.url)),
        icon('external'),
      )
    : null

  if (it.phone) {
    const { main, extra } = splitPhone(it.phone)
    const tel = telHref(it.phone)
    reach.append(
      h(
        'p.help-num',
        null,
        h('span.sr-only', null, `${t.phone}${colon(lang)}`),
        h(
          'span.help-num-main',
          { class: main.length > 16 ? 'is-long' : '' },
          h('span.help-num-digits', { translate: 'no' }, main),
          stitchSvg(),
        ),
        extra ? h('span.help-num-extra', { translate: 'no' }, extra) : null,
      ),
    )
    const check = icon('check', 'help-copy-check')
    check.querySelector('path')?.setAttribute('pathLength', '1')
    actions.append(
      h(
        'button.btn.btn-small.help-copy',
        { type: 'button', 'data-phone': it.phone, 'aria-label': `${c.help.copyLabel} (${it.name}${colon(lang)}${it.phone})` },
        h('span.help-copy-ico', { 'aria-hidden': 'true' }, icon('copy', 'help-copy-glyph'), check),
        h(
          'span.help-copy-label',
          { 'aria-hidden': 'true' },
          h('span.help-copy-l1', null, c.help.copyLabel),
          h('span.help-copy-l2', null, c.help.copiedLabel),
        ),
      ),
    )
    if (tel)
      actions.append(
        h(
          'a.btn.btn-ghost.btn-small.help-call',
          { href: tel, 'aria-label': `${t.call} ${it.name}${colon(lang)}${it.phone}` },
          icon('phone'),
          h('span.btn-label', null, t.call),
        ),
      )
    if (siteLink) {
      siteLink.classList.add('help-site--inline')
      actions.append(siteLink)
    }
    reach.append(actions)
  } else if (siteLink) {
    // no phone: the website is the way in, set where the number would be
    siteLink.classList.add('help-site--big')
    reach.classList.add('is-web')
    reach.append(siteLink)
  }

  return h(
    'li.help-card',
    {
      class: [it.urgent ? 'is-urgent' : '', it.phone ? 'has-phone' : '', span === 6 ? 'is-wide' : ''].join(' '),
      style: `--cs:${span};--ts:${tspan}`,
      'aria-labelledby': `help-${it.id}-name`,
    },
    h('div.help-card-in', null, top, h('div.help-card-main', null, name, desc), reach.childNodes.length ? reach : null),
  )
}

function render(c: Content) {
  const help = c.help
  const t = UI[c.lang]
  const { section, body } = sectionShell('help', { eyebrow: help.eyebrow, title: help.title, lede: help.lede })
  section.classList.add('help')

  body.append(sosBanner(c, t))

  const urgent = help.items.filter((it) => it.urgent)
  const others = help.items.filter((it) => !it.urgent)
  const tiers = [
    { key: 'now', title: t.now, items: urgent },
    { key: 'later', title: t.later, items: others },
  ].filter((tr) => tr.items.length)
  const titled = tiers.length > 1
  let n = 0
  tiers.forEach((tr, ti) => {
    const sp = spans(tr.items.length)
    const odd = tr.items.length % 2 === 1
    const list = h(
      'ul.help-grid',
      { role: 'list', 'data-reveal-stagger': '' },
      tr.items.map((it, i) =>
        card(it, n++, sp[i], odd && i === tr.items.length - 1 ? 2 : 1, c, t, titled ? 'h4' : 'h3'),
      ),
    )
    const titleId = `help-tier-${tr.key}`
    body.append(
      h(
        'div.help-tier',
        {
          class: `help-tier--${tr.key}`,
          // the thread crosses to the right margin above the board, then runs beside it
          'data-thread': ti === 0 ? 'right' : null,
          'data-thread-y': ti === 0 ? 'top' : null,
        },
        titled
          ? h(
              'h3.help-tier-title',
              { id: titleId, 'data-reveal': 'fade' },
              h('span.help-tier-mark', { 'aria-hidden': 'true' }),
              h('span', null, tr.title),
              h('span.help-tier-count', { 'aria-hidden': 'true' }, pad2(tr.items.length)),
              h('span.help-tier-rule', { 'aria-hidden': 'true' }),
            )
          : null,
        list,
      ),
    )
  })

  // the end of the thread: down the right margin, then a sweep to the centre and the final knot
  body.append(
    h(
      'div.help-end',
      null,
      h('span.help-tail', { 'aria-hidden': 'true', 'data-thread': 'right', 'data-thread-y': 'top' }),
      h('span.help-knot', { 'aria-hidden': 'true', 'data-thread': 'center', 'data-knot': '' }),
      h('p.help-closing', null, h('span', null, t.closing[0]), ' ', h('span.help-closing-b', null, t.closing[1])),
    ),
  )
  return section
}

/* ------------------------------------------------------------------ the stitch */
const P = 13 // stitch period (px)
const D = 7.5 // visible part of a stitch (px)
const UP = 0.6 // share of the period the needle spends above the fabric

interface Sewing {
  play(): void
}

function sewer(cardEl: HTMLElement, ctx: gsap.Context): Sewing | null {
  const svg = cardEl.querySelector<SVGSVGElement>('.help-stitch')
  const digits = cardEl.querySelector<HTMLElement>('.help-num-digits')
  if (!svg || !digits) return null
  const live = svg.querySelector<SVGGElement>('.help-stitch-live')!
  const knot = svg.querySelector<SVGCircleElement>('.help-stitch-knot')!
  const needle = svg.querySelector<SVGGElement>('.help-stitch-needle')!
  let tween: gsap.core.Tween | null = null
  let split: SplitText | null = null

  const build = () => {
    const W = Math.max(40, svg.getBoundingClientRect().width)
    svg.setAttribute('viewBox', `0 0 ${W.toFixed(1)} 14`)
    const N = Math.max(3, Math.floor((W - 6) / P))
    const lines: SVGLineElement[] = []
    live.replaceChildren()
    for (let k = 0; k < N; k++) {
      const x0 = 2 + k * P
      // hand-sewn: each stitch tilts a hair, alternately
      const tilt = k % 2 ? 0.55 : -0.55
      const ln = s('line', { x1: x0, y1: 7 + tilt, x2: x0 + D, y2: 7 - tilt, pathLength: 1 }) as SVGLineElement
      live.append(ln)
      lines.push(ln)
    }
    const endX = 2 + (N - 1) * P + D + 4.5
    knot.setAttribute('cx', endX.toFixed(1))
    return { N, lines, endX }
  }

  const finish = () => {
    split?.revert()
    split = null
  }

  const play = () => {
    tween?.kill()
    finish()
    const { N, lines, endX } = build()
    cardEl.classList.add('is-sewn')
    if (motion.reduced) {
      lines.forEach((l) => (l.style.strokeDashoffset = '0'))
      gsap.set(knot, { scale: 1, autoAlpha: 1, transformOrigin: '50% 50%' })
      return
    }
    ctx.add(() => {
      lines.forEach((l) => (l.style.strokeDashoffset = '1'))
      gsap.set(knot, { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%' })
      gsap.set(needle, { autoAlpha: 1 })
      // the digits lift as the needle passes beneath them
      split = SplitText.create(digits, { type: 'chars', charsClass: 'help-ch' })
      const base = svg.getBoundingClientRect().left
      const chars = split.chars as HTMLElement[]
      const cx = chars.map((ch) => {
        const r = ch.getBoundingClientRect()
        return r.left + r.width / 2 - base
      })
      const st = { p: 0 }
      tween = gsap.to(st, {
        p: 1,
        duration: clamp(N * 0.05, 0.7, 1.25),
        ease: 'none',
        onUpdate: () => {
          const f = st.p * N
          const k = Math.min(N - 1, Math.floor(f))
          const local = st.p >= 1 ? 1 : f - k
          const above = local < UP
          const draw = above ? local / UP : 1
          for (let i = 0; i < N; i++) lines[i].style.strokeDashoffset = i < k ? '0' : i === k ? String(1 - draw) : '1'
          const x0 = 2 + k * P
          const x = above ? x0 + draw * D : x0 + D + ((local - UP) / (1 - UP)) * (P - D)
          // above the fabric the needle rises a little; between stitches it dips under and dims
          const y = above ? 7 - Math.sin(draw * Math.PI) * 1.6 : 7 + Math.sin(((local - UP) / (1 - UP)) * Math.PI) * 3
          needle.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
          needle.style.opacity = above ? '1' : '0.45'
          for (let i = 0; i < chars.length; i++) {
            const d = (x - cx[i]) / 11
            gsap.set(chars[i], { y: -4 * Math.exp(-d * d) })
          }
        },
        onComplete: () => {
          lines.forEach((l) => (l.style.strokeDashoffset = '0'))
          needle.setAttribute('transform', `translate(${endX.toFixed(1)} 7)`)
          gsap.to(needle, { autoAlpha: 0, duration: 0.35 })
          gsap.to(knot, { scale: 1, autoAlpha: 1, duration: 0.6, ease: ease.spring })
          gsap.to(chars, { y: 0, duration: 0.4, ease: ease.soft, onComplete: finish })
        },
      })
    })
  }
  onTeardown(() => {
    tween?.kill()
    finish()
  })
  return { play }
}

/* ------------------------------------------------------------------ enhance */
function enhance(el: HTMLElement, c: Content) {
  const t = UI[c.lang]
  const ctx = scope(el, () => {})

  /* copy buttons */
  el.querySelectorAll<HTMLButtonElement>('.help-copy').forEach((btn) => {
    const cardEl = btn.closest<HTMLElement>('.help-card')!
    const phone = btn.dataset.phone ?? ''
    const digits = cardEl.querySelector<HTMLElement>('.help-num-digits') ?? undefined
    const sewing = sewer(cardEl, ctx)
    const label = btn.querySelector<HTMLElement>('.help-copy-label')
    const l1 = btn.querySelector<HTMLElement>('.help-copy-l1')
    const l2 = btn.querySelector<HTMLElement>('.help-copy-l2')
    // the pill grows to fit "Copied" and shrinks back (l2 is out of flow, so at rest it hugs "Copy")
    const fit = (to: HTMLElement | null) => {
      if (!label || !l1 || !to) return
      label.style.width = `${label.offsetWidth}px`
      void label.offsetWidth
      label.style.width = `${to.scrollWidth}px`
    }
    let timer = 0
    const onClick = async () => {
      const ok = await copyText(phone, digits)
      if (!ok) {
        toast(t.selected)
        return
      }
      toast(`${c.help.copiedLabel}${colon(c.lang)}${phone}`)
      btn.classList.remove('is-done', 'is-burst')
      void btn.offsetWidth // restart the burst
      btn.classList.add('is-done', 'is-burst')
      fit(l2)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        btn.classList.remove('is-done', 'is-burst')
        fit(l1)
      }, 2600)
      sewing?.play()
    }
    btn.addEventListener('click', onClick)
    onTeardown(() => {
      btn.removeEventListener('click', onClick)
      window.clearTimeout(timer)
    })
  })

  /* rim light that follows the pointer on cards (fine pointers) */
  if (motion.finePointer && !motion.reduced) {
    el.querySelectorAll<HTMLElement>('.help-card').forEach((cd) => {
      const move = (e: PointerEvent) => {
        const r = cd.getBoundingClientRect()
        cd.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
        cd.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
      }
      cd.addEventListener('pointermove', move)
      onTeardown(() => cd.removeEventListener('pointermove', move))
    })
    el.querySelectorAll<HTMLElement>('.help-sos-dial').forEach((d) => magnetic(d, 0.18))
  }

  /* SOS banner: arrival (keys pressed one by one, each sending a ring), then a slow resting pulse */
  const sos = el.querySelector<HTMLElement>('.help-sos')
  if (!sos || motion.reduced) return
  ctx.add(() => {
    const keys = Array.from(sos.querySelectorAll<HTMLElement>('.help-sos-key'))
    const burst = sos.querySelector<HTMLElement>('.help-sos-burst')
    const phoneIco = sos.querySelector<SVGElement>('.help-sos-phone')
    const tl = gsap.timeline({ paused: true, defaults: { ease: ease.out } })
    tl.from(sos, { clipPath: 'inset(0% 100% 0% 0% round 28px)', duration: 1.2, ease: ease.inOut, clearProps: 'clipPath' })
      .from('.help-sos-ring', { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: ease.spring }, 0.35)
      .from('.help-sos-text > *', { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.4)
      .from('.help-sos-note', { autoAlpha: 0, x: -10, duration: 0.8 }, 0.7)
    keys.forEach((k, i) => {
      const at = 0.75 + i * 0.26
      tl.from(k, { scale: 0.4, autoAlpha: 0, duration: 0.5, ease: ease.spring }, at)
        .to(k, { scale: 0.9, duration: 0.08, ease: 'power2.in' }, at + 0.32)
        .to(k, { scale: 1, duration: 0.45, ease: 'back.out(3)' }, at + 0.4)
      if (burst) tl.fromTo(burst, { scale: 1, autoAlpha: 0.65 }, { scale: 2.1, autoAlpha: 0, duration: 1, ease: 'power2.out' }, at + 0.32)
      if (phoneIco) tl.fromTo(phoneIco, { rotate: -10 }, { rotate: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.35)' }, at + 0.32)
    })
    tl.add(() => sos.classList.add('is-live'))
    ScrollTrigger.create({ trigger: sos, start: 'top 82%', once: true, onEnter: () => tl.play() })
    // the resting pulse only runs while the banner is on screen
    ScrollTrigger.create({
      trigger: sos,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => sos.classList.toggle('is-away', !self.isActive),
    })
  })
}

export const helpSection: SectionDef = { id: 'help', render, enhance }
