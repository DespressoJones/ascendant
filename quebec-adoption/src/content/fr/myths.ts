// DRAFT — replaced by researched content
import type { Myths } from '../types'

/*
 * Writing guide for this section (read by the "myths" board):
 *  - 8 to 15 items; 10 is the sweet spot (desktop rows of 2 and 3 cards).
 *  - myth: ONE sentence, as people say it, 45–95 characters. No quotation marks (added by the page).
 *  - fact: 1–3 short sentences, 150–300 characters. Start with the verdict ("Non.", "Faux.", "Pas forcément.").
 *    **bold** the single idea a stressed reader must retain.
 *  - refs: 0–3 short chips ("C.c.Q., art. 557"). Longer facts + 3 refs make every card in that row taller.
 */
export const myths: Myths = {
  eyebrow: 'Mythes et réalités',
  title: 'Démêler le vrai du faux.',
  lede:
    "Certaines idées reçues sur l'adoption et la DPJ font peur pour rien. D'autres donnent de faux espoirs. Touchez un mythe : il s'efface, et la réalité prend sa place, avec sa source.",
  hint: 'Touchez un mythe pour le faire disparaître',
  mythLabel: 'Mythe',
  factLabel: 'Réalité',
  resetLabel: 'Tout réafficher',
  items: [
    {
      id: 'dpj-retrait',
      myth: 'Si la DPJ s’en mêle, on va forcément me retirer mes enfants.',
      fact: "Non. La loi demande que chaque décision vise d'abord à **garder l'enfant dans sa famille**, avec de l'aide au besoin. Le placement est un dernier recours, quand la sécurité ou le développement de l'enfant ne peut pas être assuré autrement.",
      refs: [{ label: 'LPJ, art. 4' }],
    },
    {
      id: 'retractation',
      myth: 'Une fois le consentement à l’adoption signé, impossible de changer d’idée.',
      fact: "Faux. Le parent qui a consenti peut **se rétracter dans les 30 jours** : l'enfant doit alors lui être rendu, sans formalité. Après ce délai, il peut encore demander au tribunal de le lui rendre, tant que l'ordonnance de placement n'a pas été prononcée.",
      refs: [{ label: 'C.c.Q., art. 557' }, { label: 'C.c.Q., art. 558' }],
    },
    {
      id: 'qui-peut-adopter',
      myth: 'Il faut être un couple marié pour pouvoir adopter.',
      fact: "Non. **Toute personne majeure** peut adopter, seule ou avec une autre personne, peu importe son état civil ou son orientation sexuelle. Ce qui compte, c'est l'intérêt de l'enfant et l'évaluation de votre projet.",
      refs: [{ label: 'C.c.Q., art. 546' }],
    },
    {
      id: 'origines',
      myth: 'Une personne adoptée ne pourra jamais savoir d’où elle vient.',
      fact: "Faux. Une personne adoptée a le droit d'obtenir **son nom d'origine et le nom de ses parents d'origine**, et des renseignements pour les joindre. Avant 14 ans, il faut l'accord de ses parents. Un parent d'origine peut toutefois avoir inscrit un refus.",
      refs: [{ label: 'C.c.Q., art. 583' }],
    },
    {
      id: 'banque-mixte',
      myth: 'En Banque-mixte, la famille d’accueil est certaine d’adopter l’enfant.',
      fact: "Pas forcément. La famille accueille l'enfant **en vue d'une adoption possible**. L'adoption n'a lieu que si l'enfant devient légalement adoptable. D'ici là, il garde souvent des contacts avec ses parents, et il peut retourner vivre avec eux.",
    },
    {
      id: 'seule-option',
      myth: 'Quand un enfant ne peut pas vivre avec ses parents, l’adoption est la seule solution.',
      fact: "Non. La loi prévoit plusieurs **projets de vie** : le retour dans la famille, le placement chez un proche, la tutelle, l'adoption ou un placement à long terme. On choisit celui qui répond le mieux aux besoins de l'enfant.",
      refs: [{ label: 'LPJ, art. 4' }],
    },
    {
      id: 'parents-origine',
      myth: 'Les parents qui confient leur enfant à l’adoption ne s’en soucient pas.',
      fact: "C'est rarement le cas. Confier son enfant à l'adoption est souvent **un geste de protection**, fait dans la douleur. Ces parents ont des droits : être informés, être accompagnés et prendre le temps de décider.",
      refs: [{ label: 'C.c.Q., art. 557' }],
    },
    {
      id: 'grands-parents',
      myth: 'Les grands-parents n’ont rien à dire quand la DPJ est impliquée.',
      fact: "Ils peuvent jouer un grand rôle. Si l'enfant ne peut pas rester chez ses parents, la loi privilégie d'abord **la famille élargie** et les personnes importantes pour lui. Les liens avec ses grands-parents peuvent être maintenus si c'est dans son intérêt.",
      refs: [{ label: 'LPJ, art. 4' }, { label: 'C.c.Q., art. 611' }],
    },
    {
      id: 'voix-enfant',
      myth: 'L’enfant n’a pas son mot à dire sur son adoption.',
      fact: "Au contraire. À partir de **10 ans**, l'enfant doit consentir à son adoption, sauf s'il ne peut pas exprimer sa volonté. À **14 ans et plus**, son refus empêche l'adoption.",
      refs: [{ label: 'C.c.Q., art. 549' }, { label: 'C.c.Q., art. 550' }],
    },
    {
      id: 'cout',
      myth: 'Adopter un enfant d’ici coûte des dizaines de milliers de dollars.',
      fact: "Adopter un enfant du Québec par l'entremise de la DPJ et du CISSS ou du CIUSSS est **généralement gratuit**. C'est l'adoption internationale qui entraîne des frais importants : organisme agréé, documents, voyage.",
    },
  ],
}
