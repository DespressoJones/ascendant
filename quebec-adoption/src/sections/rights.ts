/** RIGHTS: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('rights', { eyebrow: c.rights.eyebrow, title: c.rights.title, lede: c.rights.lede })
  return section
}

export const rightsSection: SectionDef = { id: 'rights', render }
