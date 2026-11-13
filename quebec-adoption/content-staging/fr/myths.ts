// Researched content — verified 2026-11-13
import type { LegalRef, Myths } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })

/*
 * Writing guide for this section (read by the "myths" board):
 *  - 8 to 15 items; 10 is the sweet spot (desktop rows of 2 and 3 cards).
 *  - myth: ONE sentence, as people say it, 45–95 characters. No quotation marks (added by the page).
 *  - fact: 1–3 short sentences, 150–300 characters. Start with the verdict ("Non.", "Faux.", "Pas forcément.").
 *    **bold** the single idea a stressed reader must retain.
 *  - refs: 0–3 short chips. Ids are English slugs shared by FR and EN.
 *
 * Not stated on purpose (could not be confirmed): any fee amount for a domestic adoption, any upper age
 * limit used in practice by a regional adoption service, the number of domestic adoptions per year.
 */
const S = 'hero-principles-myths-rights-'

export const myths: Myths = {
  eyebrow: 'Mythes et réalités',
  title: 'Démêler le vrai du faux.',
  lede:
    'Certaines idées reçues sur l’adoption et la DPJ font peur pour rien. D’autres donnent de faux espoirs. Touchez un mythe : il s’efface, et la réalité prend sa place, avec sa source.',
  hint: 'Touchez un mythe pour le faire disparaître',
  mythLabel: 'Mythe',
  factLabel: 'Réalité',
  resetLabel: 'Tout réafficher',
  items: [
    {
      id: 'dpj-removal',
      myth: 'Si la DPJ s’en mêle, on va forcément me retirer mes enfants.',
      fact: 'Non. La loi demande d’abord de **garder l’enfant dans sa famille**, avec de l’aide, si c’est dans son intérêt. En 2025-2026, 52,1 % des enfants pris en charge par la DPJ sont restés chez eux, et 18,3 % ont été confiés à une personne qui compte pour eux.',
      refs: [lpj('4')],
      sources: ['lpj', `${S}bill15`, `${S}dpj-bilan-2026`],
    },
    {
      id: 'prenatal-alert',
      myth: 'Si la DPJ me connaît, elle sera avertie avant la naissance de mon bébé.',
      fact: 'Non. Depuis avril 2023, la DPJ **ne reçoit plus de signalement avant la naissance**. Des services préventifs pendant la grossesse sont offerts à la place. L’obligation de signaler une situation s’applique à partir de la naissance.',
      sources: [`${S}birth-alerts`],
    },
    {
      id: 'placement-adoption',
      myth: 'Après 12 mois de placement, mon bébé sera automatiquement adopté.',
      fact: 'Non. Quand la durée maximale est atteinte, le tribunal doit, sauf exception, choisir **un projet de vie stable**. L’adoption n’est qu’une option. Elle exige le consentement des parents ou un jugement qui déclare l’enfant admissible à l’adoption, que les parents peuvent contester.',
      refs: [lpj('91.1'), ccq('544'), ccq('559')],
      sources: ['lpj', 'ccq-book2', `${S}msss-life-plan`],
    },
    {
      id: 'consent-withdrawal',
      myth: 'Une fois le consentement à l’adoption signé, on ne peut plus changer d’idée.',
      fact: 'Faux. Vous avez **30 jours après la signature** pour retirer votre consentement, par écrit devant deux témoins, et l’enfant doit vous être rendu. Ensuite, seul le tribunal peut ordonner son retour, et seulement avant l’ordonnance de placement.',
      refs: [ccq('557'), ccq('558'), ccq('569')],
      sources: ['ccq-book2', 'educaloi-adopt'],
    },
    {
      id: 'birth-parents',
      myth: 'Un parent qui confie son enfant à l’adoption ne l’aime pas.',
      fact: 'Faux. Ce choix se fait souvent dans la douleur, et il peut laisser **une peine qui dure**. La loi le respecte : vous pouvez vous informer sans vous engager, prendre le temps de décider, puis changer d’avis dans les 30 jours après la signature.',
      refs: [ccq('548'), ccq('557')],
      sources: ['qc-adoption-about', 'msss-origins-guide'],
    },
    {
      id: 'origins',
      myth: 'Une personne adoptée ne pourra jamais savoir d’où elle vient.',
      fact: 'Faux. Elle a le droit d’obtenir **le nom de ses parents d’origine** et une copie de son acte de naissance primitif (avant 14 ans, avec l’accord de ses parents). Un refus de révéler l’identité prend fin à ses 18 ans. Chacun peut toutefois refuser le contact.',
      refs: [ccq('583'), ccq('583.4'), ccq('583.6')],
      sources: ['ccq-book2', `${S}qc-origins-pl2`, 'qc-origins'],
    },
    {
      id: 'open-adoption',
      myth: 'Au Québec, l’adoption coupe forcément tout contact avec la famille d’origine.',
      fact: 'Pas forcément. La famille adoptive et la famille d’origine peuvent **s’entendre par écrit** pour échanger des nouvelles ou garder contact, si c’est dans l’intérêt de l’enfant. Dès 10 ans, l’enfant doit être d’accord. À 14 ans, il peut y mettre fin.',
      refs: [ccq('579')],
      sources: ['ccq-book2', `${S}qc-contact-agreement`],
    },
    {
      id: 'child-voice',
      myth: 'L’enfant n’a pas son mot à dire sur son adoption.',
      fact: 'Faux. Dès **10 ans**, l’enfant doit consentir à son adoption, sauf s’il ne peut pas exprimer sa volonté. S’il refuse avant 14 ans, le tribunal peut attendre ou passer outre. À **14 ans et plus**, son refus empêche l’adoption.',
      refs: [ccq('549'), ccq('550')],
      sources: ['ccq-book2'],
    },
    {
      id: 'grandparents',
      myth: 'Les grands-parents ne peuvent rien faire si l’enfant ne peut pas rester chez ses parents.',
      fact: 'Faux. La loi leur donne **la priorité** : si c’est dans l’intérêt de l’enfant, il est d’abord confié aux proches qui comptent le plus pour lui. Un grand-parent peut aussi devenir tuteur, sans couper le lien avec les parents, ou adopter avec un consentement spécial.',
      refs: [lpj('4'), ccq('199.1'), ccq('555')],
      sources: ['lpj', 'ccq-book1', 'ccq-book2', `${S}qc-suppletive`],
    },
    {
      id: 'who-can-adopt',
      myth: 'Il faut être un couple marié, homme et femme, pour adopter.',
      fact: 'Non. **Toute personne majeure** peut adopter, seule ou à deux. Les conditions sont les mêmes pour les célibataires et pour les couples mariés, en union civile, en union parentale ou en union de fait, de même sexe ou non. Un enfant peut avoir deux mères ou deux pères.',
      refs: [ccq('546')],
      sources: ['ccq-book2', 'educaloi-adopt', `${S}qc-filiation`],
    },
    {
      id: 'age-limit',
      myth: 'Passé un certain âge, la loi interdit d’adopter.',
      fact: 'Non. La loi ne fixe **aucun âge maximum**. Il faut être majeur et, en général, avoir au moins 18 ans de plus que l’enfant. Pour s’inscrire à la DPJ, on demande surtout une bonne santé et une vie de couple, ou de célibataire, stable depuis au moins deux ans.',
      refs: [ccq('546'), ccq('547')],
      sources: ['ccq-book2', 'qc-adoption-legal'],
    },
    {
      id: 'cost',
      myth: 'Adopter un enfant d’ici coûte des dizaines de milliers de dollars.',
      fact: 'Non. L’adoption d’un enfant du Québec passe par le **service d’adoption public** de votre région, pas par une agence. Une aide financière existe même dans certains cas. Les frais élevés concernent surtout l’adoption internationale. Pour d’autres frais possibles, renseignez-vous auprès du service.',
      sources: ['qc-adoption-legal', `${S}reg-adoption-aid`, `${S}qc-intl-costs`],
    },
    {
      id: 'banque-mixte',
      myth: 'En Banque mixte, la famille d’accueil est certaine d’adopter l’enfant.',
      fact: 'Non. L’enfant risque fortement d’être abandonné, mais **son retour chez ses parents reste possible** : la DPJ doit planifier ce retour, tout en préparant un autre projet au cas où. L’adoption exige le consentement des parents ou un jugement qui déclare l’enfant admissible.',
      refs: [lpj('4.2'), ccq('544'), ccq('559')],
      sources: ['qc-adoption-about', 'educaloi-adopt'],
    },
    {
      id: 'international',
      myth: 'Adopter à l’étranger, c’est plus simple et plus rapide qu’ici.',
      fact: 'Plus maintenant. Depuis le 26 novembre 2024, **aucun nouveau dossier** ne peut être ouvert avec un organisme agréé, pour une durée indéterminée. En 2025, seulement 17 enfants sont arrivés au Québec par l’adoption internationale, contre 35 en 2024.',
      sources: [`${S}sasie-stats-2025`],
    },
  ],
}
