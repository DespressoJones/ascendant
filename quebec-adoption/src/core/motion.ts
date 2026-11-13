/**
 * MOTION CORE
 * One place that owns GSAP, ScrollTrigger and Lenis smooth scrolling.
 *
 * Motion language (use these, don't invent new curves per section):
 *   ease.out    'expo.out'      entrances, reveals
 *   ease.inOut  'power3.inOut'  morphs, curtains
 *   ease.spring 'back.out(1.6)' small pops (badges, knots)
 *   dur.s 0.35 / dur.m 0.8 / dur.l 1.4
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

export { gsap, ScrollTrigger, SplitText, Flip }

export const ease = { out: 'expo.out', inOut: 'power3.inOut', spring: 'back.out(1.6)', soft: 'power2.out' }
export const dur = { s: 0.35, m: 0.8, l: 1.4 }

const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
export const motion = {
  reduced: mq.matches,
  finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
}
mq.addEventListener?.('change', () => {
  motion.reduced = mq.matches
})

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export function initSmoothScroll() {
  if (motion.reduced || lenis) return lenis
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

/** Scroll to an element or y position, smoothly when allowed. */
export function scrollToTarget(target: string | HTMLElement | number, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (el == null) return
  const headerOffset = -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64) - 12
  if (lenis) {
    lenis.scrollTo(el as HTMLElement | number, { offset: offset + headerOffset, duration: 1.4 })
  } else if (typeof el === 'number') {
    window.scrollTo({ top: el, behavior: motion.reduced ? 'auto' : 'smooth' })
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset + headerOffset
    window.scrollTo({ top: y, behavior: motion.reduced ? 'auto' : 'smooth' })
  }
}

export function stopScroll() {
  lenis?.stop()
}
export function startScroll() {
  lenis?.start()
}

/* ------------------------------------------------------------------ cleanup registry */
type Cleanup = () => void
const cleanups: Cleanup[] = []

/** Register something to undo when the page re-renders (language switch). */
export function onTeardown(fn: Cleanup) {
  cleanups.push(fn)
}

/** Kill every ScrollTrigger / tween created since the last render and run registered cleanups. */
export function teardownAll() {
  while (cleanups.length) {
    try {
      cleanups.pop()!()
    } catch (e) {
      console.warn(e)
    }
  }
  ScrollTrigger.getAll().forEach((t) => t.kill())
}

/** A gsap.context bound to an element, auto-reverted on teardown. */
export function scope(el: Element, fn: (ctx: gsap.Context) => void) {
  const ctx = gsap.context(fn, el)
  onTeardown(() => ctx.revert())
  return ctx
}

/** Refresh ScrollTrigger after layout changes (fonts loaded, content expanded). Debounced. */
let refreshTimer = 0
export function refreshSoon(delay = 120) {
  window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay)
}
