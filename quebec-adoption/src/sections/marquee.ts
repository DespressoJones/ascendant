/**
 * MARQUEE: a bilingual ribbon of key terms between chapters.
 * Drifts on its own, speeds up with scroll velocity and follows the scroll direction.
 */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { h } from '../core/dom'
import { gsap, ScrollTrigger, motion, onTeardown } from '../core/motion'

export function marquee(id: string, dir: 1 | -1, offset = 0): SectionDef {
  return {
    id,
    render(c: Content) {
      const terms = c.glossary.items.length
        ? c.glossary.items.slice(offset, offset + 14)
        : [
            { fr: 'filiation', en: 'filiation' },
            { fr: 'consentement', en: 'consent' },
            { fr: 'tutelle', en: 'tutorship' },
            { fr: 'retrouvailles', en: 'reunion' },
            { fr: 'famille d’accueil', en: 'foster family' },
            { fr: 'projet de vie', en: 'permanency plan' },
          ]
      const items = terms.map((t) =>
        h('span.marquee-item', null, c.lang === 'fr' ? t.fr : t.en, h('span.alt', { lang: c.lang === 'fr' ? 'en' : 'fr' }, c.lang === 'fr' ? t.en : t.fr)),
      )
      const track = h('div.marquee-track', null, items, items.map((i) => i.cloneNode(true) as HTMLElement))
      return h('div.marquee', { id, 'aria-hidden': 'true' }, track)
    },
    enhance(el) {
      if (motion.reduced) return
      const track = el.querySelector<HTMLElement>('.marquee-track')!
      let x = 0
      let boost = 0
      let direction = dir
      const half = () => track.scrollWidth / 2
      const tick = (_t: number, dt: number) => {
        const w = half()
        if (!w) return
        x -= direction * (0.045 + boost) * dt
        boost *= 0.92
        if (x <= -w) x += w
        if (x > 0) x -= w
        track.style.transform = `translate3d(${x}px,0,0)`
      }
      gsap.ticker.add(tick)
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          boost = Math.min(1.2, Math.abs(self.getVelocity()) / 3000)
          direction = (self.direction === 1 ? dir : -dir) as 1 | -1
        },
      })
      onTeardown(() => {
        gsap.ticker.remove(tick)
        st.kill()
      })
    },
  }
}
