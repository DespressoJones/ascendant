/** AFTER: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('after', { eyebrow: c.after.eyebrow, title: c.after.title, lede: c.after.lede })
  return section
}

export const afterSection: SectionDef = { id: 'after', render }
