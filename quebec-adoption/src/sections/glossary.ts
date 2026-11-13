/** GLOSSARY: stub. Replace with the real section (see sections/shared.ts for the contract). */
import type { Content } from '../content/types'
import type { SectionDef } from './shared'
import { sectionShell } from './shared'

function render(c: Content) {
  const { section } = sectionShell('glossary', { eyebrow: c.glossary.eyebrow, title: c.glossary.title, lede: c.glossary.lede })
  return section
}

export const glossarySection: SectionDef = { id: 'glossary', render }
