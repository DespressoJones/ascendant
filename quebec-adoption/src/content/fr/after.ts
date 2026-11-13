// DRAFT — replaced by researched content
import type { After } from '../types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991'

export const after: After = {
  eyebrow: 'Après l’adoption',
  title: 'Après le jugement : ce qui change, ce qui reste',
  lede:
    'Le jugement d’adoption tourne une page sans effacer l’histoire. Voici ce qui arrive aux papiers, aux liens avec la famille d’origine et à l’aide offerte aux familles.',
  certificate: {
    title: 'Un nouvel acte de naissance',
    body:
      'Quand le jugement d’adoption devient définitif, le Directeur de l’état civil dresse un **nouvel acte de naissance** qui remplace l’acte original. Il reprend tout ce qui ne change pas, comme la date et le lieu de naissance, et nomme les parents adoptifs.\n\nL’acte original n’est **pas détruit** : il est conservé sous scellé, de façon confidentielle. La personne adoptée peut en obtenir une copie, selon les règles sur la recherche des origines.',
    docTitle: 'Acte de naissance',
    fields: [
      { label: 'Nom de famille', before: 'Lavoie', after: 'Tremblay-Diallo' },
      { label: 'Prénom', before: 'Léa', after: 'Léa' },
      { label: 'Date de naissance', before: '14 mars 2025', after: '14 mars 2025' },
      { label: 'Lieu de naissance', before: 'Sherbrooke (Québec)', after: 'Sherbrooke (Québec)' },
      { label: 'Parent', before: 'Julie Lavoie', after: 'Marc Tremblay' },
      { label: 'Parent', before: 'Non déclaré', after: 'Awa Diallo' },
    ],
    sealedLabel: 'Acte original scellé',
    note: 'Illustration seulement : ce n’est pas un document officiel. Les noms sont fictifs.',
    refs: [
      { label: 'C.c.Q., art. 129', url: `${CCQ}#se:129` },
      { label: 'C.c.Q., art. 132', url: `${CCQ}#se:132` },
      { label: 'C.c.Q., art. 583', url: `${CCQ}#se:583` },
    ],
  },
  blocks: [
    {
      id: 'rqap',
      icon: 'family',
      title: 'Assurance parentale (RQAP)',
      body:
        'Si vous travaillez, le Régime québécois d’assurance parentale verse des prestations pendant que vous accueillez l’enfant. Les semaines ci-dessous sont celles du **régime de base**; le régime particulier offre moins de semaines, mieux payées.',
      figures: [
        { value: '13', label: 'semaines d’accueil et de soutien, à partager' },
        { value: '32', label: 'semaines d’adoption, à partager' },
        { value: '5', label: 'semaines réservées à chaque parent' },
      ],
      points: [
        'Les prestations commencent à l’arrivée de l’enfant auprès de vous.',
        'Adoption hors Québec : elles peuvent débuter jusqu’à 5 semaines avant l’arrivée.',
        'Quatre semaines de plus si chaque parent prend au moins 8 semaines partageables.',
        'Faites votre demande en ligne dès que la date d’arrivée est connue.',
      ],
      refs: [{ label: 'Loi sur l’assurance parentale, art. 11 et 12.1' }],
    },
    {
      id: 'leave',
      icon: 'clock',
      title: 'Congés au travail',
      body:
        'La Loi sur les normes du travail protège votre emploi quand vous adoptez, que vous receviez ou non des prestations.',
      figures: [
        { value: '5', label: 'jours d’absence, dont 2 payés' },
        { value: '65', label: 'semaines de congé parental, sans salaire' },
      ],
      points: [
        'Avisez votre employeur par écrit au moins 3 semaines avant le congé parental.',
        'Votre convention collective peut offrir davantage.',
      ],
      refs: [{ label: 'L.N.T., art. 81.1 et 81.10' }],
    },
    {
      id: 'tax',
      icon: 'doc',
      title: 'Crédits d’impôt pour frais d’adoption',
      body:
        'Une partie des frais payés pour adopter peut vous être remboursée, au Québec et au fédéral. Gardez toutes vos factures.',
      figures: [{ value: '50 %', label: 'des frais admissibles, crédit remboursable du Québec' }],
      points: [
        'Frais admissibles : avocat ou notaire, évaluation psychosociale, voyages, traductions…',
        'Le crédit fédéral, lui, est non remboursable.',
      ],
      refs: [
        {
          label: 'Revenu Québec',
          url: 'https://www.revenuquebec.ca/fr/citoyens/credits-dimpot/credit-dimpot-pour-frais-dadoption/',
        },
      ],
    },
    {
      id: 'contact',
      icon: 'heart-hand',
      title: 'Garder contact : l’entente de communication',
      body:
        'Parents adoptifs et famille d’origine peuvent s’entendre **par écrit** pour échanger des nouvelles ou se voir, si c’est dans l’intérêt de l’enfant.',
      figures: [
        { value: '10', label: 'ans : l’enfant doit consentir' },
        { value: '14', label: 'ans : il peut y mettre fin' },
      ],
      points: [
        'Lettres, photos, appels ou rencontres : tout moyen convenable.',
        'En cas de désaccord, la médiation familiale gratuite peut aider.',
      ],
      refs: [{ label: 'C.c.Q., art. 579', url: `${CCQ}#se:579` }],
    },
    {
      id: 'origins',
      icon: 'search',
      title: 'Recherche des origines et retrouvailles',
      body:
        'Une personne adoptée peut demander le résumé de son histoire (ses **antécédents sociobiologiques**), puis le nom de ses parents d’origine et une copie de son acte original.',
      figures: [{ value: '14', label: 'ans : âge pour faire la demande seul' }],
      points: [
        'Avant 14 ans, avec l’accord de vos parents.',
        'Une personne peut refuser le contact; on respecte ce refus.',
        'Le service de la DPJ (CISSS ou CIUSSS) vous accompagne.',
      ],
      refs: [{ label: 'C.c.Q., art. 583 à 584', url: `${CCQ}#se:583` }],
    },
    {
      id: 'support',
      icon: 'shield',
      title: 'Du soutien, longtemps après',
      body:
        'Adopter, être adopté ou confier son enfant laisse des questions qui reviennent avec les années. Vous n’avez pas à les porter seul.',
      points: [
        'Votre CISSS ou CIUSSS offre des services psychosociaux après l’adoption.',
        'Info-Social 811 répond jour et nuit.',
        'Des organismes communautaires réunissent familles adoptives et personnes adoptées.',
        'Parlez de l’adoption à l’enfant tôt, avec des mots simples.',
      ],
      refs: [{ label: 'C.c.Q., art. 583.11', url: `${CCQ}#se:583.11` }],
    },
  ],
}
