// DRAFT — replaced by researched content
import type { Glossary } from '../types'

/*
 * Writing guide for this section (read by the "glossary" lexicon):
 *  - 30 to 50 items. The list is sorted and grouped by letter on the page (current language), so the order
 *    here does not matter. `id` must be the same in fr/ and en/; `fr` and `en` must also be identical in both files.
 *  - fr / en: the term itself, 2–45 characters. An acronym can carry its long form in parentheses:
 *    "DYP (Director of Youth Protection)" (the part before " (" is used for the suggestion chips).
 *  - def: in the CURRENT language, 1–2 short sentences, 110–260 characters. **bold** at most one idea.
 *    Plain words; no legal citations here (they belong to the other sections).
 *  - countLabel must contain {n}. The page writes "1 term" by itself when n = 1.
 */
export const glossary: Glossary = {
  eyebrow: 'Glossary',
  title: 'The words of the journey, made plain.',
  lede:
    'DPJ, general consent, placement order… Legal words can feel intimidating. Search for a term in English or in French: each definition fits in one or two sentences.',
  searchLabel: 'Search for a word',
  searchPlaceholder: 'e.g. consent, DPJ, famille d’accueil…',
  emptyLabel: 'No term matches. Try a shorter word, or search in French.',
  countLabel: '{n} terms',
  items: [
    {
      id: 'acte-primitif',
      fr: 'Acte de naissance primitif',
      en: 'Original act of birth',
      def: 'The birth record made before the adoption. After the judgment, it is **sealed** and replaced by a new act. The adopted person can get a copy, under the rules on searching for origins.',
    },
    {
      id: 'adoption',
      fr: 'Adoption',
      en: 'Adoption',
      def: 'A court judgment that makes a child the legal child of the adoptive parents. The child has the same rights as any other child and, as a rule, the legal bond with the birth family ends.',
    },
    {
      id: 'adoption-coutumiere',
      fr: 'Adoption coutumière autochtone',
      en: 'Indigenous customary adoption',
      def: 'An adoption made according to the custom of an Indigenous nation. A competent Indigenous authority certifies it, then the Registrar of Civil Status records it.',
    },
    {
      id: 'adoption-internationale',
      fr: 'Adoption internationale',
      en: 'International adoption',
      def: 'Adopting a child who lives outside Québec, overseen by the SASIE. Since November 26, 2024, **no new files** can be opened with accredited bodies (moratorium).',
    },
    {
      id: 'adoption-reguliere',
      fr: 'Adoption régulière',
      en: 'Regular adoption',
      def: 'The adoption of a child whose parents (or tutor) signed a consent to adoption, for example a baby placed for adoption at birth.',
    },
    {
      id: 'antecedents',
      fr: 'Antécédents sociobiologiques',
      en: 'Socio-biological background',
      def: 'Information about the health and history of the birth family. An adopted person can ask for a **summary**, without details that would identify anyone.',
    },
    {
      id: 'autorite-parentale',
      fr: 'Autorité parentale',
      en: 'Parental authority',
      def: 'Parents’ rights and duties toward their child: custody, supervision, education, food and support, **without any violence**.',
    },
    {
      id: 'banque-mixte',
      fr: 'Banque mixte',
      en: 'Banque mixte (foster-to-adopt)',
      def: 'A program where a family takes in a young child whose future is uncertain. The family is a **foster family** first, and may adopt the child if the court declares the child eligible for adoption.',
    },
    {
      id: 'ccq',
      fr: 'Code civil du Québec (C.c.Q.)',
      en: 'Civil Code of Québec (CCQ)',
      def: 'Québec’s main family law. Among other things, it covers filiation, adoption, parental authority and tutorship.',
    },
    {
      id: 'chambre-jeunesse',
      fr: 'Chambre de la jeunesse',
      en: 'Youth Division',
      def: 'A name you will see in older documents. Since June 30, 2025, adoption and youth protection cases go to the **Unified Family Tribunal**.',
    },
    {
      id: 'cisss',
      fr: 'CISSS / CIUSSS',
      en: 'CISSS / CIUSSS',
      def: 'The regional public health and social services establishments, now listed under the Santé Québec name. The DPJ and adoption services work there.',
    },
    {
      id: 'commissaire',
      fr: 'Commissaire aux plaintes et à la qualité des services',
      en: 'Service quality and complaints commissioner',
      def: 'The independent person in each establishment who handles complaints about services, including youth protection services.',
    },
    {
      id: 'consentement-general',
      fr: 'Consentement général',
      en: 'General consent',
      def: 'Consent to adoption given **to the DPJ**, without naming an adopter. The DPJ then chooses the adoptive family.',
    },
    {
      id: 'consentement-special',
      fr: 'Consentement spécial',
      en: 'Special consent',
      def: 'Consent to adoption **in favour of a named person** in the family: a grandparent, aunt, uncle, brother, sister or the parent’s spouse, for example.',
    },
    {
      id: 'declaration-admissibilite',
      fr: "Déclaration d'admissibilité à l'adoption",
      en: 'Declaration of eligibility for adoption',
      def: 'A judgment that allows a child to be adopted **without the parents’ consent**, for example when they have not cared for the child for at least 6 months and are unlikely to resume.',
    },
    {
      id: 'decheance',
      fr: "Déchéance de l'autorité parentale",
      en: 'Deprivation of parental authority',
      def: 'A judgment that takes parental authority away from a parent, for a serious reason and in the child’s interest.',
    },
    {
      id: 'dpj',
      fr: 'DPJ (Directeur de la protection de la jeunesse)',
      en: 'DYP (Director of Youth Protection)',
      def: 'In each region, the official responsible for protecting children whose security or development is in danger. Most people say “the DPJ” to mean the whole team.',
    },
    {
      id: 'durees-maximales',
      fr: 'Durées maximales de placement',
      en: 'Maximum placement periods',
      def: 'Time limits set by law to decide whether a placed child can go home: **12 months** under age 2, **18 months** from 2 to 5, **24 months** from age 6.',
    },
    {
      id: 'entente-communication',
      fr: 'Entente de communication',
      en: 'Communication agreement',
      def: 'A written arrangement to share news or stay in touch between an adopted child and the birth family. From age 10 the child has a say; from 14, their consent is needed.',
    },
    {
      id: 'mesures-volontaires',
      fr: 'Entente sur les mesures volontaires',
      en: 'Agreement on voluntary measures',
      def: 'A written agreement between the DPJ, the parents and a child aged 14 or older, to fix the situation **without going to court**. It can last up to 12 months.',
    },
    {
      id: 'evaluation-psychosociale',
      fr: 'Évaluation psychosociale',
      en: 'Psychosocial assessment',
      def: 'An assessment of the person or couple who wants to adopt: their story, motivation and ability to meet a child’s needs. It is required to adopt a minor, with some exceptions.',
    },
    {
      id: 'famille-accueil',
      fr: "Famille d'accueil",
      en: 'Foster family',
      def: 'A person or family who cares for a child who cannot live with their parents, in their own home, with follow-up from a public establishment. Fostering is **not adoption**.',
    },
    {
      id: 'famille-accueil-proximite',
      fr: "Famille d'accueil de proximité",
      en: 'Kinship foster family',
      def: 'Someone close to the child (a grandparent, aunt, family friend…) who is assessed, then becomes the child’s foster family.',
    },
    {
      id: 'filiation',
      fr: 'Filiation',
      en: 'Filiation (legal parent–child bond)',
      def: 'The legal bond between a child and their parents. All children whose filiation is established have the same rights, however it came about.',
    },
    {
      id: 'intervenant',
      fr: 'Intervenante ou intervenant',
      en: 'Caseworker',
      def: 'The person who follows the child and family for the DPJ or the adoption service. They are your first contact: you can ask them all your questions.',
    },
    {
      id: 'jugement-adoption',
      fr: "Jugement d'adoption",
      en: 'Adoption judgment',
      def: 'The court’s final decision that makes the adopters the child’s legal parents. It usually comes after at least 6 months of living together since the placement order.',
    },
    {
      id: 'jumelage',
      fr: 'Jumelage',
      en: 'Matching',
      def: 'The adoption service’s choice of the family that best meets a specific child’s needs. The service looks for a family for the child, not the other way around.',
    },
    {
      id: 'lpj',
      fr: 'Loi sur la protection de la jeunesse (LPJ)',
      en: 'Youth Protection Act (YPA)',
      def: 'The Québec law that lets the DPJ step in when a child’s security or development is in danger. It also gives rights to children and parents.',
    },
    {
      id: 'mesures-immediates',
      fr: 'Mesures de protection immédiate',
      en: 'Immediate protective measures',
      def: 'Emergency steps, such as removing a child from home when the child is in danger. They last **48 hours at most**, unless there is an agreement or a court decision.',
    },
    {
      id: 'milieu-substitut',
      fr: 'Milieu de vie substitut',
      en: 'Alternative living environment',
      def: 'Any place other than the parents’ home where a child is placed: with a relative, in a foster family or in a rehabilitation centre.',
    },
    {
      id: 'oa',
      fr: 'Organisme agréé',
      en: 'Accredited body',
      def: 'An organization authorized by Québec to handle international adoptions in certain countries. During the moratorium, it cannot open new files.',
    },
    {
      id: 'ordonnance-placement',
      fr: 'Ordonnance de placement',
      en: 'Placement order',
      def: 'The court decision that entrusts the child to the adopters and gives them parental authority. It cannot be made until **30 days** after consent.',
    },
    {
      id: 'parent-origine',
      fr: "Parent d'origine",
      en: 'Birth parent',
      def: 'The parent by birth of an adopted person. The Civil Code calls them a “parent of origin”.',
    },
    {
      id: 'personne-significative',
      fr: 'Personne significative',
      en: 'Significant person',
      def: 'Someone with a real emotional bond with the child, often a relative. The child can be entrusted to them.',
    },
    {
      id: 'placement',
      fr: 'Placement',
      en: 'Placement (out-of-home care)',
      def: 'When a child followed by the DPJ lives somewhere other than with their parents for a time. Placement is **not adoption**: the parents remain the parents.',
    },
    {
      id: 'plan-intervention',
      fr: "Plan d'intervention",
      en: 'Intervention plan',
      def: 'The written plan, made with the parents and the child, that sets out needs, goals, means and how long services will last.',
    },
    {
      id: 'projet-vie',
      fr: 'Projet de vie',
      en: 'Life plan',
      def: 'The long-term plan that gives the child stability. First choice: staying with or going back to the parents; otherwise another plan, such as a relative, tutorship, adoption or foster care until 18.',
    },
    {
      id: 'recherche-origines',
      fr: 'Recherche des origines',
      en: 'Search for origins',
      def: 'The service that helps an adopted person, or a birth parent, get information about their origins and, if everyone agrees, make contact.',
    },
    {
      id: 'refus-contact',
      fr: 'Refus au contact',
      en: 'Contact veto',
      def: 'An adopted person or a birth parent can register that they do not want to be contacted, or set conditions. The veto can be withdrawn at any time.',
    },
    {
      id: 'refus-identite',
      fr: "Refus à la communication de l'identité",
      en: 'Identity disclosure veto',
      def: 'A birth parent can refuse to have their name shared, if they register it within **30 days** after the birth. The veto ends on the child’s 18th birthday.',
    },
    {
      id: 'restitution',
      fr: 'Demande de restitution',
      en: 'Application for the return of the child',
      def: 'After the 30 days to withdraw consent, a parent can still ask the court to have the child returned, but only **before the placement order**.',
    },
    {
      id: 'retractation',
      fr: 'Rétractation du consentement',
      en: 'Withdrawal of consent',
      def: 'A parent who consented to adoption can change their mind within **30 days**. The child must then be returned, without formality or delay.',
    },
    {
      id: 'retrouvailles',
      fr: 'Retrouvailles',
      en: 'Reunion',
      def: 'Renewed contact between an adopted person and a member of their birth family, when both want it. The regional background and reunion service can guide it.',
    },
    {
      id: 'rqap',
      fr: 'RQAP (Régime québécois d’assurance parentale)',
      en: 'QPIP (Québec Parental Insurance Plan)',
      def: 'The plan that pays benefits to working parents, including adoptive parents, when they welcome a child.',
    },
    {
      id: 'sasie',
      fr: 'SASIE (Secrétariat aux services internationaux à l’enfant)',
      en: 'SASIE (international adoption authority)',
      def: 'Québec’s authority for international adoption. It replaced the former Secrétariat à l’adoption internationale (SAI).',
    },
    {
      id: 'securite-compromise',
      fr: 'Sécurité ou développement compromis',
      en: 'Compromised security or development',
      def: 'The legal test: the DPJ steps in when a child’s security or development is threatened, for example by neglect or abuse.',
    },
    {
      id: 'signalement',
      fr: 'Signalement',
      en: 'Report (to the DPJ)',
      def: 'Telling the DPJ you are worried about a child. Anyone can make a report, at any time, and **the identity of the person who reports is kept confidential**.',
    },
    {
      id: 'tribunal',
      fr: 'Tribunal unifié de la famille',
      en: 'Unified Family Tribunal',
      def: 'Since June 30, 2025, the part of the Court of Québec that hears adoption and youth protection cases.',
    },
    {
      id: 'tutelle',
      fr: 'Tutelle',
      en: 'Tutorship',
      def: 'The power to represent a minor child and manage their property. Parents are their child’s tutors; a court can also appoint a tutor, for example under the Youth Protection Act.',
    },
    {
      id: 'tutelle-suppletive',
      fr: 'Tutelle supplétive',
      en: 'Suppletive tutorship',
      def: 'A parent who cannot fully play their role can, with the court’s approval, share or delegate parental authority and tutorship to someone close. It is **not adoption**.',
    },
  ],
}
