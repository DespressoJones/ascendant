/** COMPARE: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('compare', { eyebrow: c.compare.eyebrow, title: c.compare.title, lede: c.compare.lede })
  return section
}

export const compareSection: SectionDef = { id: 'compare', render }
