import type { Hero } from '../types'
export const hero: Hero = {
  eyebrow: 'Guide indépendant · Québec',
  titleLines: ['L’adoption', 'au Québec,', 'sans le flou.'],
  swap: { from: 'sans le flou.', to: 'étape par étape.' },
  lede:
    "Que vous soyez à l'hôpital, à la maison, dans la famille ou à l'étranger : voici, en mots simples, ce qui se passe quand un enfant a besoin d'un placement ou d'une adoption, qui décide, et quels sont vos droits.",
  ctaPrimary: 'Trouver ma situation',
  ctaSecondary: 'Démêler les mythes',
  scrollHint: 'Suivez le fil',
  pluckHint: 'Pincez le fil',
  stats: [],
  dossier: [
    { tag: 'Étape 1', title: 'Consentement ou admissibilité', note: "L'enfant devient adoptable : par le consentement des parents ou par une décision du tribunal." },
    { tag: 'Étape 2', title: 'Ordonnance de placement', note: "Le tribunal confie l'enfant à sa future famille, en vue de l'adoption." },
    { tag: 'Étape 3', title: "Jugement d'adoption", note: 'Une nouvelle filiation est créée. Elle est permanente.' },
    { tag: 'Étape 4', title: 'Nouvel acte de naissance', note: "Le Directeur de l'état civil inscrit la nouvelle filiation." },
  ],
}
