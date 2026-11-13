// Researched content — verified 2026-11-13
import type { Glossary } from '../../src/content/types'

/*
 * Writing guide for this section (read by the "glossary" lexicon):
 *  - 30 to 50 items. The list is sorted and grouped by letter on the page (current language), but the
 *    ORDER HERE MATTERS for the bilingual marquee: items 1–14 feed the first ribbon and 15–28 the second,
 *    so the most evocative everyday words come first. `id`, `fr` and `en` are identical in fr/ and en/.
 *  - fr / en: the term itself, 2–45 characters. An acronym can carry its long form in parentheses
 *    (the part before " (" is used for the suggestion chips).
 *  - def: in the CURRENT language, 1–2 short sentences, 110–260 characters. **bold** at most one idea.
 *    Plain words; no legal citations here (they belong to the other sections).
 *  - countLabel must contain {n}. The page writes "1 terme" by itself when n = 1.
 *
 * Facts: research notes numbers-glossary-myths.md, legal-core.md, dpj-placement.md, after-adoption.md,
 * international.md, checked against the Civil Code consolidation (current to Sept. 9, 2026) and the
 * official pages listed in src/content/sources/glossary-help.ts and core.ts.
 */
export const glossary: Glossary = {
  eyebrow: 'Glossaire',
  title: 'Les mots du parcours, en clair.',
  lede:
    'DPJ, consentement général, ordonnance de placement… Les mots de la loi peuvent impressionner. Cherchez un terme en français ou en anglais : chaque définition tient en une ou deux phrases.',
  searchLabel: 'Chercher un mot',
  searchPlaceholder: 'Ex. : consentement, DPJ, foster…',
  emptyLabel: 'Aucun terme ne correspond. Essayez un mot plus court, ou cherchez en anglais.',
  countLabel: '{n} termes',
  items: [
    /* ---------------------------------------------- marquee 1 (items 1–14) */
    {
      id: 'filiation',
      fr: 'Filiation',
      en: 'Filiation',
      def: 'Le lien juridique qui fait de quelqu’un le parent d’un enfant. Il peut venir de la naissance ou de l’adoption, et tous les enfants dont la filiation est établie ont **les mêmes droits**.',
    },
    {
      id: 'consentement',
      fr: 'Consentement à l’adoption',
      en: 'Consent to adoption',
      def: 'L’accord écrit, signé devant deux témoins, qui permet l’adoption d’un enfant. En règle générale, chaque parent légal doit consentir, et l’enfant aussi à partir de **10 ans**.',
    },
    {
      id: 'famille-accueil',
      fr: 'Famille d’accueil',
      en: 'Foster family',
      def: 'Une personne, un couple ou une famille qui accueille chez soi un enfant qui ne peut pas vivre avec ses parents, avec le suivi d’un établissement public. Ce n’est **pas une adoption** : les parents restent les parents.',
    },
    {
      id: 'retrouvailles',
      fr: 'Retrouvailles',
      en: 'Reunion',
      def: 'La reprise de contact entre une personne adoptée et un membre de sa famille d’origine, quand les deux le veulent. Après une recherche des origines, un service public peut servir d’intermédiaire et vous préparer.',
    },
    {
      id: 'tutelle',
      fr: 'Tutelle',
      en: 'Tutorship',
      def: 'Le pouvoir légal de représenter un enfant mineur et de gérer ses biens. Les parents sont les tuteurs de leur enfant ; un tribunal peut aussi nommer un tuteur, par exemple à la demande du DPJ, **sans rompre la filiation**.',
    },
    {
      id: 'parent-origine',
      fr: 'Parent d’origine',
      en: 'Birth parent',
      def: 'Le parent de naissance d’une personne adoptée. C’est le mot qu’emploie la loi québécoise, plutôt que « parent biologique » ; on parle aussi de famille d’origine.',
    },
    {
      id: 'projet-vie',
      fr: 'Projet de vie',
      en: 'Life plan (permanency plan)',
      def: 'Le plan à long terme qui assure un milieu stable à un enfant suivi par la DPJ. Le premier choix est de rester ou de retourner chez ses parents ; sinon : un proche, la tutelle, l’adoption ou une famille d’accueil jusqu’à 18 ans, par exemple.',
    },
    {
      id: 'adoption',
      fr: 'Adoption',
      en: 'Adoption',
      def: 'Un jugement qui fait d’une personne l’enfant légal de ses parents adoptifs, avec les mêmes droits que tout autre enfant. En règle générale, ses liens légaux avec sa famille d’origine prennent fin.',
    },
    {
      id: 'autorite-parentale',
      fr: 'Autorité parentale',
      en: 'Parental authority',
      def: 'Les droits et les devoirs des parents envers leur enfant mineur : le garder, le surveiller, l’éduquer, le nourrir et l’entretenir, **sans aucune violence**.',
    },
    {
      id: 'signalement',
      fr: 'Signalement',
      en: 'Report (to the DPJ)',
      def: 'Le fait d’informer la DPJ qu’on s’inquiète pour la sécurité ou le développement d’un enfant. **L’identité de la personne qui signale reste confidentielle**, et on ne peut pas signaler un bébé avant sa naissance.',
    },
    {
      id: 'jumelage',
      fr: 'Jumelage',
      en: 'Matching',
      def: 'Le choix, par le service d’adoption, de la famille qui répond le mieux aux besoins d’un enfant précis. On cherche une famille pour l’enfant, et non un enfant pour la famille.',
    },
    {
      id: 'placement',
      fr: 'Placement',
      en: 'Placement (out-of-home care)',
      def: 'Quand un enfant suivi par la DPJ vit pour un temps ailleurs que chez ses parents : chez un proche, en famille d’accueil ou en centre de réadaptation. Le placement n’est **pas une adoption**.',
    },
    {
      id: 'entente-communication',
      fr: 'Entente de communication',
      en: 'Communication agreement',
      def: 'Une entente écrite pour échanger des nouvelles ou garder des liens entre un enfant adopté et sa famille d’origine. Dès 10 ans, l’enfant a son mot à dire ; dès 14 ans, **son accord est obligatoire** et il peut y mettre fin.',
    },
    {
      id: 'personne-significative',
      fr: 'Personne significative',
      en: 'Significant person',
      def: 'Une personne qui a un vrai lien affectif avec l’enfant, souvent un grand-parent ou un autre membre de la famille. Si l’enfant doit quitter la maison, la DPJ pense d’abord à elle.',
    },
    /* ---------------------------------------------- marquee 2 (items 15–28) */
    {
      id: 'banque-mixte',
      fr: 'Banque mixte',
      en: 'Banque mixte (foster-to-adopt)',
      def: 'Un programme où le DPJ confie un enfant qui risque fortement de ne pas pouvoir retourner chez ses parents à une famille d’accueil prête à l’adopter. L’adoption n’est **pas garantie** : l’enfant doit d’abord devenir admissible.',
    },
    {
      id: 'antecedents',
      fr: 'Antécédents sociobiologiques',
      en: 'Family and medical background',
      def: 'Les renseignements sur la santé et l’histoire de la famille d’origine d’une personne adoptée. On peut en demander un **sommaire** sans noms ; pour connaître les noms, il faut faire une autre demande.',
    },
    {
      id: 'tutelle-suppletive',
      fr: 'Tutelle supplétive',
      en: 'Suppletive tutorship',
      def: 'Un parent qui ne peut pas pleinement s’occuper de son enfant peut, avec l’autorisation du tribunal, confier ou partager son rôle avec un proche, son conjoint ou la famille d’accueil. Ce n’est **pas une adoption** : la filiation reste.',
    },
    {
      id: 'famille-accueil-proximite',
      fr: 'Famille d’accueil de proximité',
      en: 'Kinship foster family',
      def: 'Un proche de l’enfant, par exemple un grand-parent, qui est évalué puis devient la famille d’accueil de cet enfant précis. Le lien qui existe déjà entre eux est pris en compte.',
    },
    {
      id: 'retractation',
      fr: 'Rétractation du consentement',
      en: 'Withdrawal of consent',
      def: 'Un parent qui a consenti à l’adoption peut changer d’idée, par écrit, dans les **30 jours** qui suivent sa signature. L’enfant doit alors lui être rendu sans formalité ni délai.',
    },
    {
      id: 'acte-primitif',
      fr: 'Acte de naissance primitif',
      en: 'Original act of birth',
      def: 'L’acte de naissance fait avant l’adoption, qu’un nouvel acte remplace après le jugement. Une personne adoptée née au Québec peut en obtenir une copie auprès du Directeur de l’état civil, après avoir reçu une attestation.',
    },
    {
      id: 'union-parentale',
      fr: 'Union parentale',
      en: 'Parental union',
      def: 'Le cadre légal qui s’applique, depuis le 30 juin 2025, aux conjoints de fait qui deviennent parents d’un même enfant, par la naissance ou l’adoption. Il protège notamment la résidence familiale.',
    },
    {
      id: 'adoption-internationale',
      fr: 'Adoption internationale',
      en: 'International adoption',
      def: 'L’adoption d’un enfant qui vit hors du Québec, encadrée par le SASIE. Depuis le 26 novembre 2024, **aucun nouveau dossier** ne peut être ouvert avec un organisme agréé (moratoire).',
    },
    {
      id: 'evaluation-psychosociale',
      fr: 'Évaluation psychosociale',
      en: 'Psychosocial assessment',
      def: 'Une évaluation de la personne ou du couple qui veut adopter : son histoire, ses motivations et sa capacité à répondre aux besoins d’un enfant. Elle est obligatoire pour adopter un mineur, sauf exceptions.',
    },
    {
      id: 'ordonnance-placement',
      fr: 'Ordonnance de placement',
      en: 'Placement order',
      def: 'La décision du tribunal qui confie l’enfant aux adoptants et leur donne l’autorité parentale. Elle vient au plus tôt **30 jours** après le consentement ; ensuite, l’enfant ne peut plus être rendu à ses parents.',
    },
    {
      id: 'jugement-adoption',
      fr: 'Jugement d’adoption',
      en: 'Adoption judgment',
      def: 'La décision finale qui fait des adoptants les parents légaux de l’enfant. Elle vient en général après au moins 6 mois de vie commune depuis l’ordonnance de placement (parfois 3).',
    },
    {
      id: 'consentement-general',
      fr: 'Consentement général',
      en: 'General consent',
      def: 'Un consentement à l’adoption donné **au DPJ**, sans nommer d’adoptant. C’est le DPJ qui choisit ensuite la famille adoptive et qui est le tuteur de l’enfant jusqu’à l’ordonnance de placement.',
    },
    {
      id: 'refus-contact',
      fr: 'Refus au contact',
      en: 'Contact veto',
      def: 'Une personne adoptée ou un parent d’origine peut inscrire, avant que son identité soit révélée, qu’il ne veut pas de contact ou qu’il pose des conditions. Ce refus peut être retiré en tout temps.',
    },
    {
      id: 'adoption-coutumiere',
      fr: 'Adoption coutumière autochtone',
      en: 'Indigenous customary adoption',
      def: 'Une adoption faite selon la coutume d’une nation ou d’une communauté autochtone. Une autorité désignée par la communauté la certifie, puis le Directeur de l’état civil l’inscrit au registre.',
    },
    /* ---------------------------------------------- the rest (A–Z on the page) */
    {
      id: 'consentement-special',
      fr: 'Consentement spécial',
      en: 'Special consent',
      def: 'Un consentement à l’adoption en faveur d’un proche précis : grand-parent, frère, sœur, oncle, tante, leur conjoint, ou le conjoint d’un parent. Des conjoints de fait doivent vivre ensemble depuis au moins 3 ans.',
    },
    {
      id: 'restitution',
      fr: 'Demande de restitution',
      en: 'Application for return of the child',
      def: 'Après les 30 jours pour se rétracter, un parent peut encore demander au tribunal que l’enfant lui soit rendu, mais seulement **avant l’ordonnance de placement**. Le juge tient compte de l’intérêt de l’enfant.',
    },
    {
      id: 'declaration-admissibilite',
      fr: 'Déclaration d’admissibilité à l’adoption',
      en: 'Declaration of eligibility for adoption',
      def: 'Un jugement qui permet l’adoption d’un enfant **sans le consentement** de ses parents, par exemple s’ils n’en prennent pas soin depuis au moins 6 mois et qu’un retour chez eux est improbable.',
    },
    {
      id: 'reconnaissance-lien',
      fr: 'Reconnaissance d’un lien préexistant',
      en: 'Recognition of a pre-existing bond',
      def: 'Une adoption qui garde le nom du parent d’origine sur le nouvel acte de naissance, quand ce lien de filiation compte pour l’identité de l’enfant. Les droits et devoirs entre eux prennent quand même fin.',
    },
    {
      id: 'adoption-reguliere',
      fr: 'Adoption régulière',
      en: 'Regular adoption',
      def: 'L’adoption d’un enfant dont les parents ont consenti à l’adoption, par exemple un bébé confié à sa naissance. Comme ces situations sont rares, l’attente peut durer plusieurs années.',
    },
    {
      id: 'oa',
      fr: 'Organisme agréé',
      en: 'Certified body',
      def: 'Un organisme autorisé par le Québec à accompagner les adoptions internationales dans certains pays. Depuis le moratoire de novembre 2024, il ne peut pas ouvrir de nouveaux dossiers.',
    },
    {
      id: 'sasie',
      fr: 'SASIE (adoption internationale)',
      en: 'SASIE (international adoption authority)',
      def: 'Le Secrétariat aux services internationaux à l’enfant, l’autorité québécoise de l’adoption internationale. Il traite aussi les recherches d’origines liées à une adoption hors Québec, et a remplacé l’ancien SAI.',
    },
    {
      id: 'refus-identite',
      fr: 'Refus à la communication de l’identité',
      en: 'Identity disclosure veto',
      def: 'Un parent d’origine peut refuser que son nom soit révélé à son enfant, s’il l’inscrit dans les **30 jours** suivant la naissance. Ce refus prend fin aux 18 ans de l’enfant.',
    },
    {
      id: 'rqap',
      fr: 'RQAP (Régime québécois d’assurance parentale)',
      en: 'QPIP (Québec Parental Insurance Plan)',
      def: 'Le régime qui verse des prestations aux parents qui travaillent quand un enfant arrive, y compris par adoption. Les parents adoptifs ont droit à des semaines d’**accueil et de soutien** propres à l’adoption.',
    },
    {
      id: 'dpj',
      fr: 'DPJ (Directeur de la protection de la jeunesse)',
      en: 'DPJ (Director of Youth Protection)',
      def: 'Dans chaque région, la personne responsable de protéger les enfants dont la sécurité ou le développement est compromis. On dit souvent « la DPJ » pour parler de ses équipes, qui répondent jour et nuit.',
    },
    {
      id: 'lpj',
      fr: 'Loi sur la protection de la jeunesse (LPJ)',
      en: 'Youth Protection Act (YPA)',
      def: 'La loi québécoise qui permet au DPJ d’intervenir quand la sécurité ou le développement d’un enfant est compromis. Elle donne aussi des droits aux enfants et aux parents, comme celui d’être entendu.',
    },
    {
      id: 'ccq',
      fr: 'Code civil du Québec (C.c.Q.)',
      en: 'Civil Code of Québec (C.C.Q.)',
      def: 'La loi de base du droit privé au Québec. Elle encadre notamment la filiation, l’adoption, l’autorité parentale et la tutelle ; les références « C.c.Q., art. … » de ce guide renvoient à ses articles.',
    },
    {
      id: 'securite-compromise',
      fr: 'Sécurité ou développement compromis',
      en: 'Security or development in danger',
      def: 'Le critère de la loi : la DPJ intervient quand la sécurité ou le développement d’un enfant est menacé, par exemple par de la négligence, des abus ou l’exposition à la violence conjugale.',
    },
    {
      id: 'mesures-immediates',
      fr: 'Mesures de protection immédiate',
      en: 'Immediate protective measures',
      def: 'Des mesures d’urgence, comme retirer un enfant de son milieu quand il est en danger. Elles durent au plus **48 heures** ; ensuite, il faut une entente ou une décision du tribunal.',
    },
    {
      id: 'mesures-volontaires',
      fr: 'Entente sur les mesures volontaires',
      en: 'Agreement on voluntary measures',
      def: 'Une entente écrite entre le DPJ, les parents et l’enfant de 14 ans et plus, pour régler la situation **sans aller au tribunal**. Chaque entente dure au plus 1 an.',
    },
    {
      id: 'durees-maximales',
      fr: 'Durées maximales de placement',
      en: 'Maximum placement periods',
      def: 'Les délais fixés par la loi pour décider d’un avenir stable pour un enfant placé : **12, 18 ou 24 mois** selon son âge (moins de 2 ans, 2 à 5 ans, 6 ans et plus). On dit aussi durées maximales d’hébergement.',
    },
    {
      id: 'plan-intervention',
      fr: 'Plan d’intervention',
      en: 'Intervention plan',
      def: 'Le plan écrit, fait avec les parents et l’enfant, qui précise les besoins, les objectifs, les moyens et la durée des services. Les parents en reçoivent une copie.',
    },
    {
      id: 'intervenant',
      fr: 'Intervenante ou intervenant',
      en: 'Caseworker',
      def: 'La personne qui suit l’enfant et la famille pour la DPJ ou le service d’adoption. C’est votre premier contact : vous pouvez lui poser toutes vos questions, même plusieurs fois.',
    },
    {
      id: 'tribunal',
      fr: 'Tribunal unifié de la famille',
      en: 'Unified Family Tribunal',
      def: 'Depuis le 30 juin 2025, la partie de la Cour du Québec qui entend les dossiers d’adoption et de protection de la jeunesse. Pour ces dossiers, il remplace la Chambre de la jeunesse, nommée dans d’anciens documents.',
    },
    {
      id: 'cisss',
      fr: 'CISSS / CIUSSS',
      en: 'CISSS / CIUSSS',
      def: 'Les établissements publics régionaux de santé et de services sociaux, dont le nom commence maintenant par « Santé Québec ». La DPJ et les services d’adoption et de retrouvailles en font partie.',
    },
    {
      id: 'clsc',
      fr: 'CLSC',
      en: 'CLSC',
      def: 'Le centre local de services communautaires : la porte d’entrée de proximité de votre CISSS ou CIUSSS pour l’aide psychosociale, la santé et le soutien aux futurs et nouveaux parents.',
    },
    {
      id: 'commissaire',
      fr: 'Commissaire aux plaintes',
      en: 'Complaints commissioner',
      def: 'Le commissaire local aux plaintes et à la qualité des services reçoit, en toute confidentialité, les plaintes sur les services d’un établissement, y compris ceux de la DPJ. Il est indépendant de l’établissement.',
    },
  ],
}
