// Researched content — verified 2026-11-13
import type { Hero } from '../types'

/*
 * Stats: only figures published by an official source, with the year in the label.
 *  - 107,273 children reported and 34,324 children whose report was retained: DPJ annual report 2025–2026
 *    (Santé Québec news release, June 11, 2026).
 *  - 17 children who arrived through international adoption in 2025: SASIE 2025 statistics (MSSS).
 * Values are written with a space as the thousands separator on purpose: the hero counter strips
 * separators, treats a comma as a decimal point and re-formats the number for the page language
 * (en-CA shows "107,273"). The number of domestic adoptions per year was NOT published in a source we
 * could read, so it is left out.
 *
 * Dossier: the decisive legal moments of a domestic adoption, in real order:
 * the child becomes adoptable (C.C.Q. 544: consent of the parents or tutor, or a court declaration),
 * placement order (566, 567, 569), adoption judgment (566, 573, 577), new act of birth (129, 132; 583).
 * Each tag names the articles that state the note (fact-check 2026-11-13: 30 days = 567, no return = 569,
 * 6 months reducible by up to 3 = 566, new filiation = 577, original act = 583).
 */
export const hero: Hero = {
  eyebrow: 'Independent guide · Québec',
  titleLines: ['Adoption', 'in Québec,', 'minus the fog.'],
  swap: { from: 'minus the fog.', to: 'step by step.' },
  lede:
    'At the hospital, at home, within the family or for an adoption from abroad: here is, in plain words, what happens when a child needs placement or adoption, who decides, and what your rights are.',
  ctaPrimary: 'Find my situation',
  ctaSecondary: 'Untangle the myths',
  scrollHint: 'Follow the thread',
  pluckHint: 'Pluck the thread',
  stats: [
    {
      value: '107 273',
      label: 'children reported to the DPJ (Director of Youth Protection) in 2025–2026',
      source: 'hero-principles-myths-rights-dpj-bilan-2026',
    },
    {
      value: '34 324',
      label: 'children whose report was retained for evaluation in 2025–2026',
      source: 'hero-principles-myths-rights-dpj-bilan-2026',
    },
    {
      value: '17',
      label: 'children who arrived in Québec through international adoption in 2025',
      source: 'hero-principles-myths-rights-sasie-stats-2025',
    },
  ],
  dossier: [
    {
      tag: 'C.C.Q. 544',
      title: 'Consent or eligibility',
      note: 'The parents consent in writing, or the court declares the child eligible for adoption.',
    },
    {
      tag: 'C.C.Q. 567–569',
      title: 'Placement order',
      note: 'At the earliest 30 days after a consent. From then on, the child can no longer be returned to the parents.',
    },
    {
      tag: 'C.C.Q. 566, 577',
      title: 'Adoption judgment',
      note: 'After at least 6 months with the family since the order (sometimes 3). The adopters become the child’s legal parents.',
    },
    {
      tag: 'C.C.Q. 132, 583',
      title: 'New act of birth',
      note: 'The Directeur de l’état civil draws it up. Later, the adoptee can get the original act.',
    },
  ],
}
