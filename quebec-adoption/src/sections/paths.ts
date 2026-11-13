/** PATHS: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('paths', { eyebrow: c.paths.eyebrow, title: c.paths.title, lede: c.paths.lede })
  return section
}

export const pathsSection: SectionDef = { id: 'paths', render }
