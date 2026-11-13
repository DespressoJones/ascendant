/** CLOCK: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('clock', { eyebrow: c.clock.eyebrow, title: c.clock.title, lede: c.clock.lede })
  return section
}

export const clockSection: SectionDef = { id: 'clock', render }
