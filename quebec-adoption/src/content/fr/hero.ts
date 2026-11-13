// Researched content — verified 2026-11-13
import type { Hero } from '../types'

/*
 * Stats: only figures published by an official source, with the year in the label.
 *  - 107 273 enfants signalés et 34 324 enfants dont le signalement a été retenu : bilan des DPJ 2025-2026
 *    (communiqué de Santé Québec, 11 juin 2026).
 *  - 17 enfants arrivés par l’adoption internationale en 2025 : statistiques 2025 du SASIE (MSSS).
 * Values are whole numbers on purpose: the hero counter re-formats the number and drops any suffix
 * such as "%". The number of domestic adoptions per year was NOT published in a source we could read,
 * so it is left out.
 *
 * Dossier: the decisive legal moments of a domestic adoption, in real order:
 * the child becomes adoptable (C.c.Q. 544: consent of the parents or tutor, or a court declaration),
 * placement order (566, 567, 569), adoption judgment (566, 573, 577), new act of birth (129, 132; 583).
 * Each tag names the articles that state the note (fact-check 2026-11-13: 30 days = 567, no return = 569,
 * 6 months reducible by up to 3 = 566, new filiation = 577, original act = 583).
 */
export const hero: Hero = {
  eyebrow: 'Guide indépendant · Québec',
  titleLines: ['L’adoption', 'au Québec,', 'sans le flou.'],
  swap: { from: 'sans le flou.', to: 'étape par étape.' },
  lede:
    'Que ce soit à l’hôpital, à la maison, dans la famille ou pour une adoption à l’étranger : voici, en mots simples, ce qui se passe quand un enfant a besoin d’un placement ou d’une adoption, qui décide, et quels sont vos droits.',
  ctaPrimary: 'Trouver ma situation',
  ctaSecondary: 'Démêler les mythes',
  scrollHint: 'Suivez le fil',
  pluckHint: 'Pincez le fil',
  stats: [
    {
      value: '107 273',
      label: 'enfants signalés à la DPJ en 2025-2026',
      source: 'hero-principles-myths-rights-dpj-bilan-2026',
    },
    {
      value: '34 324',
      label: 'enfants dont le signalement a été retenu pour évaluation en 2025-2026',
      source: 'hero-principles-myths-rights-dpj-bilan-2026',
    },
    {
      value: '17',
      label: 'enfants arrivés au Québec par l’adoption internationale en 2025',
      source: 'hero-principles-myths-rights-sasie-stats-2025',
    },
  ],
  dossier: [
    {
      tag: 'C.c.Q. 544',
      title: 'Consentement ou admissibilité',
      note: 'Les parents consentent par écrit, ou le tribunal déclare l’enfant admissible à l’adoption.',
    },
    {
      tag: 'C.c.Q. 567–569',
      title: 'Ordonnance de placement',
      note: 'Au plus tôt 30 jours après un consentement. Ensuite, l’enfant ne peut plus être rendu à ses parents.',
    },
    {
      tag: 'C.c.Q. 566, 577',
      title: 'Jugement d’adoption',
      note: 'Après au moins 6 mois avec la famille depuis l’ordonnance (parfois 3). Les adoptants deviennent légalement ses parents.',
    },
    {
      tag: 'C.c.Q. 132, 583',
      title: 'Nouvel acte de naissance',
      note: 'Le Directeur de l’état civil le dresse. Plus tard, l’adopté pourra obtenir l’acte primitif.',
    },
  ],
}
