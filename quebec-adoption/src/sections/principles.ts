/** PRINCIPLES: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('principles', { eyebrow: c.principles.eyebrow, title: c.principles.title })
  return section
}

export const principlesSection: SectionDef = { id: 'principles', render }
