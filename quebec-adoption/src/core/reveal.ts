/**
 * REVEALS: declarative scroll entrances.
 *
 *   data-reveal="up"        rise + fade (default)
 *   data-reveal="fade"      fade only
 *   data-reveal="scale"     settle from 0.94 scale
 *   data-reveal="clip"      wipe in from the left with clip-path
 *   data-reveal-stagger     on a parent: its direct children reveal in sequence
 *   data-split="lines|words|chars"   on headings: masked line / word / char rise
 *   data-delay="0.2"        extra delay (s)
 *
 * Nothing is hidden by CSS. JS hides an element only right before it is scheduled to animate,
 * so with JS off, reduced motion, or a failed observer, the page is complete at rest.
 */
import { gsap, ScrollTrigger, SplitText, motion, ease, onTeardown } from './motion'
import { qsa } from './dom'

const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 42, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  scale: { scale: 0.94, autoAlpha: 0, transformOrigin: '50% 60%' },
  clip: { clipPath: 'inset(0 100% 0 0)' },
}
const TO: Record<string, gsap.TweenVars> = {
  up: { y: 0, autoAlpha: 1 },
  fade: { autoAlpha: 1 },
  scale: { scale: 1, autoAlpha: 1 },
  clip: { clipPath: 'inset(0 0% 0 0)' },
}

export function initReveals(root: ParentNode = document) {
  if (motion.reduced) return

  // headings split into masked lines/words/chars
  for (const el of qsa('[data-split]', root)) {
    if (el.dataset.splitDone) continue
    el.dataset.splitDone = '1'
    const mode = (el.dataset.split || 'words') as 'lines' | 'words' | 'chars'
    const split = SplitText.create(el, {
      type: mode === 'chars' ? 'lines,words,chars' : mode === 'words' ? 'lines,words' : 'lines',
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      mask: 'lines',
      aria: 'auto',
    })
    const targets = mode === 'chars' ? split.chars : mode === 'words' ? split.words : split.lines
    const delay = parseFloat(el.dataset.delay || '0')
    gsap.set(targets, { yPercent: 115, rotate: mode === 'chars' ? 6 : 2 })
    const tween = gsap.to(targets, {
      yPercent: 0,
      rotate: 0,
      duration: 1.1,
      ease: ease.out,
      stagger: mode === 'chars' ? 0.018 : mode === 'words' ? 0.045 : 0.1,
      delay,
      paused: true,
    })
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => tween.play() })
    onTeardown(() => split.revert())
  }

  // single elements
  for (const el of qsa('[data-reveal]', root)) {
    if (el.dataset.revealDone) continue
    el.dataset.revealDone = '1'
    const kind = el.dataset.reveal || 'up'
    const delay = parseFloat(el.dataset.delay || '0')
    gsap.set(el, FROM[kind] ?? FROM.up)
    const tween = gsap.to(el, { ...(TO[kind] ?? TO.up), duration: kind === 'clip' ? 1.2 : 1, ease: ease.out, delay, paused: true })
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => tween.play() })
  }

  // staggered children
  for (const parent of qsa('[data-reveal-stagger]', root)) {
    if (parent.dataset.staggerDone) continue
    parent.dataset.staggerDone = '1'
    const kids = Array.from(parent.children) as HTMLElement[]
    if (!kids.length) continue
    gsap.set(kids, { y: 36, autoAlpha: 0 })
    ScrollTrigger.batch(kids, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: ease.out, stagger: 0.08, overwrite: true }),
    })
  }
}

/** Count a number up when it scrolls into view. Element text must be the final formatted value. */
export function initCounters(root: ParentNode = document) {
  for (const el of qsa('[data-count]', root)) {
    if (el.dataset.countDone) continue
    el.dataset.countDone = '1'
    const target = parseFloat(el.dataset.count || '0')
    const decimals = (el.dataset.count || '').split('.')[1]?.length ?? 0
    const locale = document.documentElement.lang === 'fr' ? 'fr-CA' : 'en-CA'
    const fmt = (v: number) => v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    if (motion.reduced) {
      el.textContent = fmt(target)
      continue
    }
    const obj = { v: 0 }
    el.textContent = fmt(0)
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = fmt(obj.v)),
        }),
    })
  }
}
