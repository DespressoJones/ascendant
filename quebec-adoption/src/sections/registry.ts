/** Page order. Each section file exports one SectionDef; each has its own stylesheet in styles/sections/. */
import type { SectionDef } from './shared'
import { heroSection } from './hero'
import { principlesSection } from './principles'
import { marquee } from './marquee'
import { pathsSection } from './paths'
import { clockSection } from './clock'
import { compareSection } from './compare'
import { actorsSection } from './actors'
import { mythsSection } from './myths'
import { rightsSection } from './rights'
import { afterSection } from './after'
import { glossarySection } from './glossary'
import { helpSection } from './help'

export const sections: SectionDef[] = [
  heroSection,
  principlesSection,
  marquee('marquee-1', 1),
  pathsSection,
  clockSection,
  compareSection,
  actorsSection,
  marquee('marquee-2', -1),
  mythsSection,
  rightsSection,
  afterSection,
  glossarySection,
  helpSection,
]
