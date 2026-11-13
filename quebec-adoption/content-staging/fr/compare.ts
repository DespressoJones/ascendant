// Researched content — verified 2026-11-13
import type { Compare, LegalRef } from '../../src/content/types'

/*
 * Écriture : chaque `keepsTie` commence par un verdict court suivi de « — » puis d'une explication.
 * Le rendu transforme le verdict en pastille : « Oui » (lien maintenu), « Non » (lien remplacé),
 * « En partie » ou « Selon… » (pointillé). Garder le verdict court (moins de 34 caractères) et sans « : ».
 */

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const cpc = (a: string): LegalRef => ({ label: `C.p.c., art. ${a}`, url: `${LQ}C-25.01${se(a)}` })

export const compare: Compare = {
  eyebrow: 'Formes d’adoption',
  title: 'Toutes les adoptions ne se ressemblent pas',
  lede:
    'Au Québec, une adoption peut commencer par le consentement des parents d’origine, par une décision du tribunal ou par une démarche à l’étranger. Elle crée une nouvelle filiation qui remplace celle d’origine, en tout ou en partie. Le lien d’origine peut parfois être « reconnu » : le nom du parent d’origine reste alors sur le nouvel acte de naissance, mais sans droits ni devoirs. Plus bas, les solutions qui protègent l’enfant **sans** changer sa filiation.',
  columns: {
    forWho: 'Pour qui',
    whoDecides: 'Qui décide',
    cost: 'Coût',
    time: 'Délais',
    keepsTie: 'Lien légal avec la famille d’origine',
    start: 'Comment ça commence',
  },
  adoption: [
    {
      id: 'consentement-general',
      name: 'Adoption avec consentement général',
      forWho:
        'Un bébé ou un enfant dont les parents d’origine (ou le tuteur) décident de le confier à l’adoption, sans choisir eux-mêmes la famille.',
      whoDecides:
        'Les parents d’origine consentent. La DPJ choisit la famille adoptive. Le tribunal ordonne le placement, puis prononce l’adoption.',
      cost: 'Québec.ca ne mentionne pas de frais pour les services d’adoption de la DPJ. Confirmez-le auprès du service de votre région.',
      time: '30 jours pour changer d’avis, puis, en général, au moins 6 mois de placement avant le jugement. L’attente des adoptants peut durer des années.',
      keepsTie:
        'Non — la filiation adoptive remplace celle d’origine. Le lien d’origine peut parfois être « reconnu », sans droits ni devoirs, et des échanges ou des contacts peuvent être prévus.',
      start: 'Chaque parent légal signe un consentement général, par écrit, devant deux témoins. C’est la DPJ qui le reçoit.',
      refs: [ccq('548'), ccq('551'), ccq('555'), ccq('557'), ccq('566'), ccq('577')],
      sources: ['ccq-book2', 'qc-adoption-about', 'qc-adoption-legal', 'educaloi-adopt'],
    },
    {
      id: 'banque-mixte',
      name: 'Banque mixte',
      forWho:
        'Un enfant suivi par la DPJ qui risque fortement de ne pas pouvoir retourner dans sa famille. Il est confié à une famille d’accueil prête à l’adopter.',
      whoDecides:
        'La DPJ choisit la famille. Sans consentement des parents, le tribunal décide si l’enfant devient admissible à l’adoption, puis prononce l’adoption.',
      cost: 'Pendant l’accueil, la famille est rémunérée comme famille d’accueil. Une aide financière à l’adoption peut suivre, pendant 3 ans au plus.',
      time: 'Aucune durée moyenne officielle. Les durées maximales de placement s’appliquent aussi. L’enfant peut retourner chez ses parents : l’adoption n’est jamais garantie.',
      keepsTie:
        'Selon l’issue — pendant l’accueil, l’enfant garde sa filiation. Si l’adoption est prononcée, la nouvelle filiation remplace celle d’origine.',
      start:
        'Une famille évaluée, reconnue comme famille d’accueil, accueille l’enfant en sachant qu’il pourrait retourner chez ses parents.',
      refs: [ccq('559'), ccq('561'), lpj('4.2'), lpj('91.1')],
      sources: [
        'qc-adoption-about',
        'educaloi-adopt',
        'clock-compare-msss-ri-rtf',
        'clock-compare-qc-foster-process',
        'clock-compare-reg-adoption-aid',
      ],
    },
    {
      id: 'admissibilite',
      name: 'Adoption après une déclaration d’admissibilité',
      forWho:
        'Un enfant dont les parents n’assument pas, dans les faits, le soin, l’entretien ou l’éducation depuis au moins 6 mois. D’autres cas existent, comme un enfant orphelin sans tuteur.',
      whoDecides:
        'Le tribunal, à la demande de la DPJ, d’un proche parent (grand-parent, oncle, tante…) ou de l’enfant de 14 ans et plus. Les parents peuvent s’y opposer.',
      cost: 'Les parents peuvent avoir droit à l’aide juridique selon leur revenu. Elle est gratuite pour tout enfant mineur.',
      time: 'Au moins 6 mois sans soins des parents, puis la procédure au tribunal, en général 6 mois de placement, puis le jugement.',
      keepsTie:
        'Non — si l’adoption est prononcée, la nouvelle filiation remplace celle d’origine. La déclaration seule ne la change pas encore.',
      start: 'La DPJ, ou un proche admissible, demande au tribunal de déclarer l’enfant admissible à l’adoption.',
      refs: [ccq('559'), ccq('560'), ccq('561'), ccq('562')],
      sources: ['ccq-book2', 'educaloi-adopt', 'csj', 'clock-compare-bill2'],
    },
    {
      id: 'proche',
      name: 'Adoption par un proche (consentement spécial)',
      forWho:
        'Un proche parent de l’enfant : par exemple un grand-parent, un frère, une sœur, une tante, un oncle, ou leur conjoint. Il doit avoir 18 ans de plus que l’enfant, sauf si le tribunal l’en dispense. À comparer avec la tutelle supplétive, plus bas.',
      whoDecides:
        'Les parents choisissent la personne et consentent en sa faveur. L’enfant de 10 ans et plus doit aussi consentir. Le tribunal vérifie l’intérêt de l’enfant et peut exiger une évaluation psychosociale.',
      cost: 'Surtout des honoraires d’avocat ou de notaire. Demandez à l’aide juridique si vous y avez droit.',
      time: 'Au moins 30 jours entre les consentements et l’ordonnance de placement, puis au moins 6 mois avant le jugement (réductible de 3 mois au plus).',
      keepsTie:
        'Non — la filiation avec les parents d’origine est remplacée. Des échanges ou des contacts peuvent être prévus par écrit.',
      start: 'Les parents signent un consentement spécial qui nomme la personne, par écrit, devant deux témoins.',
      refs: [ccq('555'), ccq('547'), ccq('547.1'), ccq('566'), ccq('577')],
      sources: ['ccq-book2', 'educaloi-adopt', 'csj'],
    },
    {
      id: 'conjoint',
      name: 'Adoption de l’enfant du conjoint',
      forWho:
        'Le conjoint ou la conjointe d’un parent. Si vous êtes conjoints de fait, vous devez vivre ensemble depuis au moins 3 ans. L’écart d’âge de 18 ans ne s’applique pas.',
      whoDecides:
        'Le parent qui est votre conjoint et, s’il existe, l’autre parent légal consentent, ainsi que l’enfant de 10 ans et plus. Le tribunal prononce l’adoption.',
      cost: 'Surtout des honoraires d’avocat ou de notaire. La DPJ n’est avisée de la demande que si l’enfant fait l’objet d’un signalement.',
      time: 'Au moins 30 jours entre les consentements et l’ordonnance de placement, puis au moins 6 mois de vie commune ; le tribunal peut réduire ce délai de 3 mois au plus.',
      keepsTie:
        'En partie — l’enfant garde son parent, le conjoint de l’adoptant. Seul le lien avec l’autre parent, s’il y en a un, est remplacé.',
      start:
        'Le parent signe un consentement spécial en faveur de son conjoint. L’autre parent légal doit aussi consentir, sauf exceptions.',
      refs: [ccq('555'), ccq('547'), ccq('551'), ccq('552'), ccq('577'), cpc('432')],
      sources: ['ccq-book2', 'educaloi-adopt'],
    },
    {
      id: 'internationale',
      name: 'Adoption internationale',
      forWho:
        'Une personne domiciliée au Québec qui veut adopter un enfant domicilié hors du Québec, y compris dans une autre province.',
      whoDecides:
        'Les autorités du pays de l’enfant et le Secrétariat aux services internationaux à l’enfant (SASIE), qui doit autoriser chaque projet. Le jugement est rendu ici ou à l’étranger.',
      cost: 'Élevé et variable : évaluation, dossier, traductions, frais à l’étranger, voyages. Le Québec ne publie pas de montant global. Des crédits d’impôt existent.',
      time: 'Souvent plusieurs années avant qu’un enfant soit proposé.',
      keepsTie: 'Non — une adoption prononcée ou reconnue au Québec rompt la filiation d’origine (adoption « plénière »).',
      start:
        'Depuis novembre 2024, les nouveaux dossiers avec un organisme agréé sont suspendus. Quelques cas prévus par règlement, comme l’adoption dans la famille, commencent par une demande au SASIE.',
      refs: [ccq('563'), ccq('564'), ccq('565'), ccq('565.1'), { label: 'Convention de La Haye (1993)' }],
      sources: [
        'clock-compare-qc-intl',
        'clock-compare-qc-intl-moratorium',
        'clock-compare-qc-intl-no-body',
        'clock-compare-qc-intl-steps',
        'clock-compare-qc-intl-costs',
      ],
    },
    {
      id: 'coutumiere',
      name: 'Adoption coutumière autochtone',
      forWho: 'Des familles des Premières Nations ou inuites qui adoptent selon une coutume de leur communauté ou de leur nation.',
      whoDecides:
        'L’adoption se fait selon la coutume. L’autorité compétente désignée par la communauté ou la nation l’atteste : elle vérifie la coutume, les consentements et l’intérêt de l’enfant, puis délivre un certificat.',
      cost: 'Renseignez-vous auprès de l’autorité compétente. Une aide financière existe dans certains cas où la DPJ vous avait confié l’enfant.',
      time: 'Selon la coutume. L’autorité transmet le certificat au Directeur de l’état civil dans les 30 jours, puis un nouvel acte de naissance est dressé.',
      keepsTie:
        'Selon le certificat — la filiation d’origine prend fin, sauf les droits et devoirs que la coutume maintient et que le certificat mentionne.',
      start:
        'On s’adresse à l’autorité compétente inscrite au registre du Directeur de l’état civil. Si la DPJ suit l’enfant, elle doit d’abord donner son avis écrit.',
      refs: [ccq('543.1'), ccq('577.1'), ccq('129'), lpj('131.18')],
      sources: [
        'ccq-book2',
        'ccq-book1',
        'clock-compare-qc-adoption-overview',
        'clock-compare-dec-register',
        'clock-compare-reg-adoption-aid',
      ],
    },
    {
      id: 'majeur',
      name: 'Adoption d’une personne majeure',
      forWho:
        'Un adulte élevé, quand il était mineur, par la personne qui veut l’adopter : un beau-parent, un proche, une ancienne famille d’accueil. Le tribunal peut faire exception à cette condition.',
      whoDecides: 'Le tribunal, à partir du consentement de l’adulte et de la demande faite.',
      cost: 'Surtout des honoraires d’avocat ou de notaire, si vous en consultez un.',
      time: 'La loi ne fixe pas de délai précis. La période de placement de 6 mois est prévue pour les mineurs.',
      keepsTie:
        'Non — la nouvelle filiation remplace celle d’origine. Si l’adoptant est le conjoint d’un parent, seul le lien avec l’autre parent change.',
      start:
        'Une demande d’adoption au tribunal, avec le consentement écrit de l’adulte. Son conjoint marié ou uni civilement, ses enfants de 14 ans et plus, ses parents et ses grands-parents en sont avisés.',
      refs: [ccq('545'), ccq('573'), ccq('577'), cpc('441')],
      sources: ['ccq-book2'],
    },
  ],
  alternativesTitle: 'Ce qui n’est pas une adoption',
  alternatives: [
    {
      id: 'tutelle-suppletive',
      name: 'Tutelle supplétive',
      forWho:
        'Un parent qui ne peut pas jouer pleinement son rôle, ou qui s’est désengagé, et un proche prêt à prendre le relais (conjoint du parent, grand-parent, tante, oncle, membre de la famille d’accueil…).',
      whoDecides:
        'Le parent désigne la personne et le tribunal doit l’autoriser. Le tribunal peut le faire même sans l’accord d’un parent, par exemple si son refus n’est pas justifié par l’intérêt de l’enfant.',
      cost: 'Quelques frais de documents (certificat de police, déclaration sous serment), plus un avocat ou un notaire au besoin. Les parents paient les besoins de base de l’enfant.',
      time: 'Le tuteur entre en fonction dès que le tribunal le nomme. La tutelle prend fin aux 18 ans de l’enfant, ou plus tôt si un parent est rétabli.',
      keepsTie:
        'Oui — les parents restent les parents. Selon le cas, ils partagent leur rôle avec le tuteur ou leur rôle est suspendu.',
      start:
        'Le parent dépose une demande au tribunal du district où vit l’enfant. Dès 10 ans, l’enfant doit consentir ; dès 14 ans, son refus bloque la tutelle.',
      refs: [ccq('199.1'), ccq('199.3'), ccq('199.4'), ccq('199.6'), ccq('199.8')],
      sources: ['ccq-book1', 'clock-compare-qc-suppletive'],
    },
    {
      id: 'tutelle-lpj',
      name: 'Tutelle demandée par la DPJ',
      forWho:
        'Un enfant suivi par la DPJ qui ne peut pas retourner chez lui, et la personne qui en prend soin (un proche ou la famille d’accueil), prête à s’engager jusqu’à ses 18 ans.',
      whoDecides: 'Le tribunal, à la demande de la DPJ ou de la personne qu’elle recommande comme tuteur.',
      cost: 'Le tuteur peut recevoir une aide financière mensuelle si l’enfant lui était confié depuis au moins 6 mois de suite. Demande dans les 60 jours du jugement.',
      time: 'Jusqu’aux 18 ans de l’enfant. L’aide peut durer jusqu’à 21 ans si le jeune poursuit certaines études et que le tuteur subvient encore à ses besoins.',
      keepsTie:
        'Oui — l’enfant garde sa filiation et son nom. Le tuteur exerce l’autorité parentale, et le tribunal peut prévoir des contacts avec la famille.',
      start: 'La DPJ propose la tutelle comme projet de vie. Une fois le tuteur nommé, la DPJ ferme son dossier.',
      refs: [lpj('70.1'), lpj('70.2'), lpj('70.3'), lpj('70.6'), ccq('207')],
      sources: ['lpj', 'ccq-book1', 'clock-compare-reg-tutorship-aid', 'clock-compare-msss-life-plan'],
    },
    {
      id: 'placement-majorite',
      name: 'Placement jusqu’à la majorité',
      forWho:
        'Un enfant suivi par la DPJ qui ne peut pas retourner chez lui en sécurité, quand la tutelle ou l’adoption ne conviennent pas.',
      whoDecides: 'Le tribunal, sur recommandation de la DPJ, par exemple quand la durée maximale de placement est atteinte.',
      cost: 'La famille d’accueil reçoit une rétribution pour l’enfant. Un proche peut être reconnu comme famille d’accueil de proximité.',
      time: 'Jusqu’aux 18 ans. Un plan de transition se prépare dans les 2 années avant, et le jeune peut parfois rester dans son milieu ensuite.',
      keepsTie:
        'Oui — la filiation demeure. Les parents gardent les droits que le tribunal ne leur retire pas, et des contacts peuvent être prévus.',
      start: 'La DPJ recommande ce projet de vie et le tribunal l’ordonne quand un retour à la maison n’est pas possible.',
      refs: [lpj('91'), lpj('91.1'), lpj('57.2.2'), lpj('64.1')],
      sources: [
        'lpj',
        'clock-compare-msss-life-plan',
        'clock-compare-cdpdj-stability',
        'clock-compare-bill15',
        'clock-compare-qc-foster-process',
      ],
    },
    {
      id: 'placement-proche',
      name: 'Placement chez un proche',
      forWho:
        'Un enfant suivi par la DPJ qui doit quitter la maison un temps et peut vivre chez un grand-parent ou une autre personne importante pour lui.',
      whoDecides: 'La DPJ, avec l’accord des parents et de l’enfant de 14 ans et plus, ou le tribunal.',
      cost: 'Le proche peut être reconnu comme famille d’accueil de proximité et recevoir alors une rétribution.',
      time: 'Temporaire. Il compte dans la durée maximale de placement : 12, 18 ou 24 mois selon l’âge de l’enfant.',
      keepsTie:
        'Oui — l’enfant reste l’enfant de ses parents. Ils gardent leurs droits et leurs devoirs, sauf si le tribunal leur en retire une partie.',
      start:
        'La loi donne la priorité aux grands-parents et aux autres proches avant une famille d’accueil. La DPJ évalue la personne proposée.',
      refs: [lpj('4'), lpj('54'), lpj('91'), lpj('11.4')],
      sources: ['lpj', 'qc-dpj-steps', 'clock-compare-msss-ri-rtf', 'clock-compare-bill15'],
    },
    {
      id: 'garde-tiers',
      name: 'Délégation ou garde confiée à un proche',
      forWho:
        'Des parents qui confient à un proche les soins de tous les jours, ou un proche qui demande au tribunal la garde de l’enfant, dans son intérêt.',
      whoDecides: 'Les parents, pour une délégation. Le tribunal, si un proche demande la garde : la loi donne la priorité aux parents.',
      cost: 'Une délégation se fait sans tribunal. Une demande de garde entraîne surtout des honoraires d’avocat ; renseignez-vous sur l’aide juridique.',
      time: 'La loi ne fixe pas de durée : elle dépend de l’entente ou de la décision du tribunal.',
      keepsTie:
        'Oui — les parents restent les parents. Ils participent aux grandes décisions et doivent contribuer aux besoins de l’enfant selon leurs moyens.',
      start:
        'Les parents délèguent la garde, la surveillance ou l’éducation de l’enfant ; ou le proche dépose une demande de garde au tribunal.',
      refs: [ccq('601'), ccq('605')],
      sources: ['ccq-book2', 'clock-compare-educaloi-third-party', 'csj'],
    },
  ],
}
