/** HELP: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('help', { eyebrow: c.help.eyebrow, title: c.help.title, lede: c.help.lede })
  return section
}

export const helpSection: SectionDef = { id: 'help', render }
