/** ACTORS: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('actors', { eyebrow: c.actors.eyebrow, title: c.actors.title, lede: c.actors.lede })
  return section
}

export const actorsSection: SectionDef = { id: 'actors', render }
