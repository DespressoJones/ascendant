// DRAFT — replaced by researched content
import type { Glossary } from '../types'

/*
 * Writing guide for this section (read by the "glossary" lexicon):
 *  - 30 to 50 items. The list is sorted and grouped by letter on the page (current language), so the order
 *    here does not matter. `id` must be the same in fr/ and en/; `fr` and `en` must also be identical in both files.
 *  - fr / en: the term itself, 2–45 characters. An acronym can carry its long form in parentheses:
 *    "DPJ (Directeur de la protection de la jeunesse)" (the part before " (" is used for the suggestion chips).
 *  - def: in the CURRENT language, 1–2 short sentences, 110–260 characters. **bold** at most one idea.
 *    Plain words; no legal citations here (they belong to the other sections).
 *  - countLabel must contain {n}. The page writes "1 terme" by itself when n = 1.
 */
export const glossary: Glossary = {
  eyebrow: 'Glossaire',
  title: 'Les mots du parcours, en clair.',
  lede:
    'DPJ, consentement général, ordonnance de placement… Les mots de la loi peuvent impressionner. Cherchez un terme en français ou en anglais : chaque définition tient en une ou deux phrases.',
  searchLabel: 'Chercher un mot',
  searchPlaceholder: 'Ex. : consentement, DPJ, foster…',
  emptyLabel: 'Aucun terme ne correspond. Essayez un mot plus court, ou cherchez en anglais.',
  countLabel: '{n} termes',
  items: [
    {
      id: 'acte-primitif',
      fr: 'Acte de naissance primitif',
      en: 'Original act of birth',
      def: "L'acte de naissance fait avant l'adoption. Après le jugement, il est **scellé** et remplacé par un nouvel acte. La personne adoptée peut en obtenir une copie, selon les règles sur la recherche des origines.",
    },
    {
      id: 'adoption',
      fr: 'Adoption',
      en: 'Adoption',
      def: "Un jugement qui fait d'un enfant l'enfant légal de ses parents adoptifs. Il a les mêmes droits que tout autre enfant et, en règle générale, son lien légal avec sa famille d'origine prend fin.",
    },
    {
      id: 'adoption-coutumiere',
      fr: 'Adoption coutumière autochtone',
      en: 'Indigenous customary adoption',
      def: "Une adoption faite selon la coutume d'une nation autochtone. Une autorité autochtone compétente la certifie, puis le Directeur de l'état civil l'inscrit au registre.",
    },
    {
      id: 'adoption-internationale',
      fr: 'Adoption internationale',
      en: 'International adoption',
      def: "L'adoption d'un enfant qui vit hors du Québec, encadrée par le SASIE. Depuis le 26 novembre 2024, **aucun nouveau dossier** ne peut être ouvert auprès des organismes agréés (moratoire).",
    },
    {
      id: 'adoption-reguliere',
      fr: 'Adoption régulière',
      en: 'Regular adoption',
      def: "L'adoption d'un enfant dont les parents (ou le tuteur) ont signé un consentement à l'adoption. C'est le cas, par exemple, d'un bébé confié à l'adoption à sa naissance.",
    },
    {
      id: 'antecedents',
      fr: 'Antécédents sociobiologiques',
      en: 'Socio-biological background',
      def: "Les renseignements sur la santé et l'histoire de la famille d'origine. Une personne adoptée peut en demander un **sommaire**, sans détail qui permettrait d'identifier quelqu'un.",
    },
    {
      id: 'autorite-parentale',
      fr: 'Autorité parentale',
      en: 'Parental authority',
      def: "Les droits et devoirs des parents envers leur enfant : le garder, le surveiller, l'éduquer, le nourrir et l'entretenir, **sans aucune violence**.",
    },
    {
      id: 'banque-mixte',
      fr: 'Banque mixte',
      en: 'Banque mixte (foster-to-adopt)',
      def: "Un programme où une famille accueille un jeune enfant dont l'avenir est incertain. Elle est d'abord **famille d'accueil**, et pourra l'adopter si le tribunal le déclare admissible à l'adoption.",
    },
    {
      id: 'ccq',
      fr: 'Code civil du Québec (C.c.Q.)',
      en: 'Civil Code of Québec (CCQ)',
      def: "La grande loi du droit de la famille au Québec. Elle encadre notamment la filiation, l'adoption, l'autorité parentale et la tutelle.",
    },
    {
      id: 'chambre-jeunesse',
      fr: 'Chambre de la jeunesse',
      en: 'Youth Division',
      def: "Le nom que l'on voit dans les documents plus anciens. Depuis le 30 juin 2025, les dossiers d'adoption et de protection de la jeunesse vont au **Tribunal unifié de la famille**.",
    },
    {
      id: 'cisss',
      fr: 'CISSS / CIUSSS',
      en: 'CISSS / CIUSSS',
      def: 'Les établissements publics régionaux de santé et de services sociaux, aujourd’hui désignés sous le nom de Santé Québec. La DPJ et les services d’adoption y travaillent.',
    },
    {
      id: 'commissaire',
      fr: 'Commissaire aux plaintes et à la qualité des services',
      en: 'Service quality and complaints commissioner',
      def: 'La personne indépendante, dans chaque établissement, qui reçoit les plaintes sur les services, y compris ceux de la protection de la jeunesse.',
    },
    {
      id: 'consentement-general',
      fr: 'Consentement général',
      en: 'General consent',
      def: "Un consentement à l'adoption donné **au DPJ**, sans nommer d'adoptant. C'est le DPJ qui choisira ensuite la famille adoptive.",
    },
    {
      id: 'consentement-special',
      fr: 'Consentement spécial',
      en: 'Special consent',
      def: "Un consentement à l'adoption **en faveur d'une personne précise** de la famille : un grand-parent, un oncle, une tante, un frère, une sœur ou le conjoint du parent, par exemple.",
    },
    {
      id: 'declaration-admissibilite',
      fr: "Déclaration d'admissibilité à l'adoption",
      en: 'Declaration of eligibility for adoption',
      def: "Un jugement qui permet l'adoption d'un enfant **sans le consentement** de ses parents, par exemple quand ils ne s'en occupent plus depuis au moins 6 mois et qu'un retour est peu probable.",
    },
    {
      id: 'decheance',
      fr: "Déchéance de l'autorité parentale",
      en: 'Deprivation of parental authority',
      def: "Un jugement qui retire l'autorité parentale à un parent, pour un motif grave et dans l'intérêt de l'enfant.",
    },
    {
      id: 'dpj',
      fr: 'DPJ (Directeur de la protection de la jeunesse)',
      en: 'DYP (Director of Youth Protection)',
      def: "Dans chaque région, la personne responsable de protéger les enfants dont la sécurité ou le développement est compromis. On dit souvent « la DPJ » pour parler de ses équipes.",
    },
    {
      id: 'durees-maximales',
      fr: 'Durées maximales de placement',
      en: 'Maximum placement periods',
      def: "Des délais fixés par la loi pour décider si un enfant placé peut retourner chez ses parents : **12 mois** avant 2 ans, **18 mois** de 2 à 5 ans, **24 mois** à 6 ans et plus.",
    },
    {
      id: 'entente-communication',
      fr: 'Entente de communication',
      en: 'Communication agreement',
      def: "Un accord écrit pour échanger des nouvelles ou garder contact entre l'enfant adopté et sa famille d'origine. Dès 10 ans, l'avis de l'enfant compte ; dès 14 ans, son accord est nécessaire.",
    },
    {
      id: 'mesures-volontaires',
      fr: 'Entente sur les mesures volontaires',
      en: 'Agreement on voluntary measures',
      def: "Une entente écrite entre le DPJ, les parents et l'enfant de 14 ans et plus, pour régler la situation **sans aller au tribunal**. Elle peut durer jusqu'à 12 mois.",
    },
    {
      id: 'evaluation-psychosociale',
      fr: 'Évaluation psychosociale',
      en: 'Psychosocial assessment',
      def: "Une évaluation de la personne ou du couple qui veut adopter : son histoire, ses motivations, sa capacité à répondre aux besoins d'un enfant. Elle est obligatoire pour adopter un mineur, sauf exceptions.",
    },
    {
      id: 'famille-accueil',
      fr: "Famille d'accueil",
      en: 'Foster family',
      def: "Une personne ou une famille qui accueille chez elle un enfant qui ne peut pas vivre avec ses parents, avec le suivi d'un établissement public. L'accueil n'est **pas une adoption**.",
    },
    {
      id: 'famille-accueil-proximite',
      fr: "Famille d'accueil de proximité",
      en: 'Kinship foster family',
      def: "Un proche de l'enfant (grand-parent, tante, ami de la famille…) qui est évalué, puis devient sa famille d'accueil.",
    },
    {
      id: 'filiation',
      fr: 'Filiation',
      en: 'Filiation (legal parent–child bond)',
      def: "Le lien juridique entre un enfant et ses parents. Tous les enfants dont la filiation est établie ont les mêmes droits, peu importe comment elle est née.",
    },
    {
      id: 'intervenant',
      fr: 'Intervenante ou intervenant',
      en: 'Caseworker',
      def: "La personne qui suit l'enfant et la famille pour la DPJ ou le service d'adoption. C'est votre premier contact : vous pouvez lui poser toutes vos questions.",
    },
    {
      id: 'jugement-adoption',
      fr: "Jugement d'adoption",
      en: 'Adoption judgment',
      def: "La décision finale du tribunal qui fait des adoptants les parents légaux de l'enfant. Elle vient en général après au moins 6 mois de vie commune depuis l'ordonnance de placement.",
    },
    {
      id: 'jumelage',
      fr: 'Jumelage',
      en: 'Matching',
      def: "Le choix, par le service d'adoption, de la famille qui répond le mieux aux besoins d'un enfant précis. On cherche une famille pour l'enfant, et non l'inverse.",
    },
    {
      id: 'lpj',
      fr: 'Loi sur la protection de la jeunesse (LPJ)',
      en: 'Youth Protection Act (YPA)',
      def: "La loi québécoise qui permet au DPJ d'intervenir quand la sécurité ou le développement d'un enfant est compromis. Elle donne aussi des droits aux enfants et aux parents.",
    },
    {
      id: 'mesures-immediates',
      fr: 'Mesures de protection immédiate',
      en: 'Immediate protective measures',
      def: "Des mesures d'urgence, comme retirer un enfant de son milieu quand il est en danger. Elles durent **48 heures au plus**, sauf entente ou décision du tribunal.",
    },
    {
      id: 'milieu-substitut',
      fr: 'Milieu de vie substitut',
      en: 'Alternative living environment',
      def: "Tout endroit autre que chez ses parents où un enfant est placé : chez un proche, en famille d'accueil ou en centre de réadaptation.",
    },
    {
      id: 'oa',
      fr: 'Organisme agréé',
      en: 'Accredited body',
      def: "Un organisme autorisé par le Québec à accompagner des adoptions internationales dans certains pays. Pendant le moratoire, il ne peut pas ouvrir de nouveaux dossiers.",
    },
    {
      id: 'ordonnance-placement',
      fr: 'Ordonnance de placement',
      en: 'Placement order',
      def: "La décision du tribunal qui confie l'enfant aux adoptants et leur donne l'autorité parentale. Elle ne peut pas être rendue avant **30 jours** après le consentement.",
    },
    {
      id: 'parent-origine',
      fr: "Parent d'origine",
      en: 'Birth parent',
      def: "Le parent de naissance d'une personne adoptée. C'est le terme qu'emploie le Code civil, plutôt que « parent biologique ».",
    },
    {
      id: 'personne-significative',
      fr: 'Personne significative',
      en: 'Significant person',
      def: "Quelqu'un qui a un vrai lien affectif avec l'enfant, souvent un membre de la famille élargie. L'enfant peut lui être confié.",
    },
    {
      id: 'placement',
      fr: 'Placement',
      en: 'Placement (out-of-home care)',
      def: "Quand un enfant suivi par la DPJ vit ailleurs que chez ses parents pour un temps. Le placement n'est **pas une adoption** : ses parents restent ses parents.",
    },
    {
      id: 'plan-intervention',
      fr: "Plan d'intervention",
      en: 'Intervention plan',
      def: "Le plan écrit, fait avec les parents et l'enfant, qui précise les besoins, les objectifs, les moyens et la durée des services.",
    },
    {
      id: 'projet-vie',
      fr: 'Projet de vie',
      en: 'Life plan',
      def: "Le plan à long terme qui donne de la stabilité à l'enfant. D'abord, rester ou retourner chez ses parents ; sinon, un autre projet : chez un proche, tutelle, adoption, famille d'accueil jusqu'à 18 ans…",
    },
    {
      id: 'recherche-origines',
      fr: 'Recherche des origines',
      en: 'Search for origins',
      def: "Le service qui aide une personne adoptée, ou un parent d'origine, à obtenir des renseignements sur ses origines et, si tous y consentent, à reprendre contact.",
    },
    {
      id: 'refus-contact',
      fr: 'Refus au contact',
      en: 'Contact veto',
      def: "Une personne adoptée ou un parent d'origine peut inscrire qu'il ne veut pas être contacté, ou poser des conditions. Ce refus peut être retiré à tout moment.",
    },
    {
      id: 'refus-identite',
      fr: "Refus à la communication de l'identité",
      en: 'Identity disclosure veto',
      def: "Un parent d'origine peut refuser que son nom soit transmis, s'il l'inscrit dans les **30 jours** suivant la naissance. Ce refus prend fin aux 18 ans de l'enfant.",
    },
    {
      id: 'restitution',
      fr: 'Demande de restitution',
      en: 'Application for the return of the child',
      def: "Après les 30 jours pour se rétracter, un parent peut encore demander au tribunal que l'enfant lui soit rendu, mais seulement **avant l'ordonnance de placement**.",
    },
    {
      id: 'retractation',
      fr: 'Rétractation du consentement',
      en: 'Withdrawal of consent',
      def: "Un parent qui a consenti à l'adoption peut changer d'idée dans les **30 jours**. L'enfant doit alors lui être rendu, sans formalité ni délai.",
    },
    {
      id: 'retrouvailles',
      fr: 'Retrouvailles',
      en: 'Reunion',
      def: "La reprise de contact entre une personne adoptée et un membre de sa famille d'origine, quand les deux le veulent. Le service régional des antécédents et retrouvailles peut l'accompagner.",
    },
    {
      id: 'rqap',
      fr: 'RQAP (Régime québécois d’assurance parentale)',
      en: 'QPIP (Québec Parental Insurance Plan)',
      def: "Le régime qui verse des prestations aux parents qui travaillent, y compris aux parents adoptifs, quand ils accueillent un enfant.",
    },
    {
      id: 'sasie',
      fr: 'SASIE (Secrétariat aux services internationaux à l’enfant)',
      en: 'SASIE (international adoption authority)',
      def: "L'autorité québécoise de l'adoption internationale. Il a remplacé le Secrétariat à l'adoption internationale (SAI).",
    },
    {
      id: 'securite-compromise',
      fr: 'Sécurité ou développement compromis',
      en: 'Compromised security or development',
      def: "Le critère de la loi : la DPJ intervient quand la sécurité ou le développement d'un enfant est menacé, par exemple par de la négligence ou des mauvais traitements.",
    },
    {
      id: 'signalement',
      fr: 'Signalement',
      en: 'Report (to the DPJ)',
      def: "Le fait d'informer la DPJ qu'on s'inquiète pour un enfant. Tout le monde peut faire un signalement, en tout temps, et **l'identité de la personne qui signale est confidentielle**.",
    },
    {
      id: 'tribunal',
      fr: 'Tribunal unifié de la famille',
      en: 'Unified Family Tribunal',
      def: "Depuis le 30 juin 2025, la partie de la Cour du Québec qui entend les dossiers d'adoption et de protection de la jeunesse.",
    },
    {
      id: 'tutelle',
      fr: 'Tutelle',
      en: 'Tutorship',
      def: "Le pouvoir de représenter un enfant mineur et de gérer ses biens. Les parents sont tuteurs de leur enfant ; un tribunal peut aussi nommer un tuteur, par exemple dans le cadre de la LPJ.",
    },
    {
      id: 'tutelle-suppletive',
      fr: 'Tutelle supplétive',
      en: 'Suppletive tutorship',
      def: "Un parent qui ne peut pas exercer pleinement son rôle peut, avec l'accord du tribunal, partager ou déléguer l'autorité parentale et la tutelle à un proche. Ce n'est **pas une adoption**.",
    },
  ],
}
