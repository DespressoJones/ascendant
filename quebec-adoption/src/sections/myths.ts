/** MYTHS: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('myths', { eyebrow: c.myths.eyebrow, title: c.myths.title, lede: c.myths.lede })
  return section
}

export const mythsSection: SectionDef = { id: 'myths', render }
