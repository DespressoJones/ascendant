import type { Hero } from '../types'
export const hero: Hero = {
  eyebrow: 'Independent guide · Québec',
  titleLines: ['Adoption', 'in Québec,', 'minus the fog.'],
  swap: { from: 'minus the fog.', to: 'step by step.' },
  lede:
    'At the hospital, at home, within the family or from abroad: here is, in plain words, what happens when a child needs placement or adoption, who decides, and what your rights are.',
  ctaPrimary: 'Find my situation',
  ctaSecondary: 'Untangle the myths',
  scrollHint: 'Follow the thread',
  pluckHint: 'Pluck the thread',
  stats: [],
  dossier: [
    { tag: 'Step 1', title: 'Consent or eligibility', note: "The child becomes adoptable: through the parents' consent or a court decision." },
    { tag: 'Step 2', title: 'Placement order', note: 'The court entrusts the child to their future family, with a view to adoption.' },
    { tag: 'Step 3', title: 'Adoption judgment', note: 'A new legal parent–child bond is created. It is permanent.' },
    { tag: 'Step 4', title: 'New act of birth', note: "Québec's registrar of civil status records the new filiation." },
  ],
}
