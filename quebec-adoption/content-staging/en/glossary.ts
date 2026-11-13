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
 *  - countLabel must contain {n}. The page writes "1 term" by itself when n = 1.
 *
 * Facts: research notes numbers-glossary-myths.md, legal-core.md, dpj-placement.md, after-adoption.md,
 * international.md, checked against the Civil Code consolidation (current to Sept. 9, 2026) and the
 * official pages listed in src/content/sources/glossary-help.ts and core.ts.
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
    /* ---------------------------------------------- marquee 1 (items 1–14) */
    {
      id: 'filiation',
      fr: 'Filiation',
      en: 'Filiation',
      def: 'The legal bond that makes someone a child’s parent. It can come from birth or from adoption, and every child whose filiation is established has **the same rights**.',
    },
    {
      id: 'consentement',
      fr: 'Consentement à l’adoption',
      en: 'Consent to adoption',
      def: 'The written agreement, signed in front of two witnesses, that allows a child to be adopted. As a rule, each legal parent must consent, and so must the child from **age 10**.',
    },
    {
      id: 'famille-accueil',
      fr: 'Famille d’accueil',
      en: 'Foster family',
      def: 'A person, couple or family who cares for a child in their own home when the child cannot live with their parents, with follow-up from a public establishment. It is **not adoption**: the parents remain the parents.',
    },
    {
      id: 'retrouvailles',
      fr: 'Retrouvailles',
      en: 'Reunion',
      def: 'Renewed contact between an adopted person and a member of their birth family, when both want it. After an origins search, a public service can act as a go-between and help you prepare.',
    },
    {
      id: 'tutelle',
      fr: 'Tutelle',
      en: 'Tutorship',
      def: 'The legal power to represent a minor and manage their property. Parents are their child’s tutors; a court can also appoint a tutor, for example at the DPJ’s request, **without ending filiation**.',
    },
    {
      id: 'parent-origine',
      fr: 'Parent d’origine',
      en: 'Birth parent',
      def: 'The parent by birth of an adopted person. Québec law says “parent of origin” rather than “biological parent”; people also speak of the birth family or family of origin.',
    },
    {
      id: 'projet-vie',
      fr: 'Projet de vie',
      en: 'Life plan (permanency plan)',
      def: 'The long-term plan that gives a child followed by the DPJ a stable home. The first choice is to stay with or return to their parents; if not, a relative, tutorship, adoption or a foster family until 18, for example.',
    },
    {
      id: 'adoption',
      fr: 'Adoption',
      en: 'Adoption',
      def: 'A judgment that makes a person the legal child of their adoptive parents, with the same rights as any other child. As a rule, their legal ties with their birth family end.',
    },
    {
      id: 'autorite-parentale',
      fr: 'Autorité parentale',
      en: 'Parental authority',
      def: 'Parents’ rights and duties toward their minor child: to have custody of, supervise and educate the child, and to feed and support them, **without any violence**.',
    },
    {
      id: 'signalement',
      fr: 'Signalement',
      en: 'Report (to the DPJ)',
      def: 'Telling the DPJ that you are worried about a child’s safety or development. **The identity of the person who reports stays confidential**, and an unborn baby cannot be reported.',
    },
    {
      id: 'jumelage',
      fr: 'Jumelage',
      en: 'Matching',
      def: 'The adoption service’s choice of the family that best meets a particular child’s needs. The search is for a family for the child, not a child for the family.',
    },
    {
      id: 'placement',
      fr: 'Placement',
      en: 'Placement (out-of-home care)',
      def: 'When a child followed by the DPJ lives somewhere other than with their parents for a time: with a relative, in a foster family or in a rehabilitation centre. Placement is **not adoption**.',
    },
    {
      id: 'entente-communication',
      fr: 'Entente de communication',
      en: 'Communication agreement',
      def: 'A written arrangement to share news or keep in touch between an adopted child and their birth family. From age 10 the child has a say; from 14, **their consent is required** and they can end it.',
    },
    {
      id: 'personne-significative',
      fr: 'Personne significative',
      en: 'Significant person',
      def: 'Someone with a real emotional bond with the child, often a grandparent or another relative. If the child must leave home, the DPJ looks to these people first.',
    },
    /* ---------------------------------------------- marquee 2 (items 15–28) */
    {
      id: 'banque-mixte',
      fr: 'Banque mixte',
      en: 'Banque mixte (foster-to-adopt)',
      def: 'A program where the DPJ places a child at high risk of not being able to go back to their parents with a foster family ready to adopt. Adoption is **not guaranteed**: the child must first become eligible.',
    },
    {
      id: 'antecedents',
      fr: 'Antécédents sociobiologiques',
      en: 'Family and medical background',
      def: 'Information about the health and history of an adopted person’s birth family. You can ask for a **summary** without names; learning the names takes a separate request.',
    },
    {
      id: 'tutelle-suppletive',
      fr: 'Tutelle supplétive',
      en: 'Suppletive tutorship',
      def: 'A parent who cannot fully care for their child can, with the court’s authorization, hand over or share their role with a relative, their spouse or the foster family. It is **not adoption**: filiation stays.',
    },
    {
      id: 'famille-accueil-proximite',
      fr: 'Famille d’accueil de proximité',
      en: 'Kinship foster family',
      def: 'Someone close to the child, such as a grandparent, who is assessed and then becomes the foster family for that particular child. The bond that already exists between them is taken into account.',
    },
    {
      id: 'retractation',
      fr: 'Rétractation du consentement',
      en: 'Withdrawal of consent',
      def: 'A parent who consented to adoption can change their mind, in writing, within **30 days** of signing. The child must then be returned to them without formality or delay.',
    },
    {
      id: 'acte-primitif',
      fr: 'Acte de naissance primitif',
      en: 'Original act of birth',
      def: 'The act of birth drawn up before the adoption, which a new act replaces after the judgment. An adopted person born in Québec can get a copy from the Directeur de l’état civil, once they have an attestation.',
    },
    {
      id: 'union-parentale',
      fr: 'Union parentale',
      en: 'Parental union',
      def: 'The legal framework that, since June 30, 2025, applies to unmarried (de facto) partners who become parents of the same child, by birth or adoption. Among other things, it protects the family residence.',
    },
    {
      id: 'adoption-internationale',
      fr: 'Adoption internationale',
      en: 'International adoption',
      def: 'Adopting a child who lives outside Québec, overseen by the SASIE. Since November 26, 2024, **no new files** can be opened with a certified body (moratorium).',
    },
    {
      id: 'evaluation-psychosociale',
      fr: 'Évaluation psychosociale',
      en: 'Psychosocial assessment',
      def: 'An assessment of the person or couple who wants to adopt: their history, their motivation and their ability to meet a child’s needs. It is required to adopt a minor, with some exceptions.',
    },
    {
      id: 'ordonnance-placement',
      fr: 'Ordonnance de placement',
      en: 'Placement order',
      def: 'The court decision that entrusts the child to the adopters and gives them parental authority. It comes **30 days** after consent at the earliest; after it, the child can no longer be returned to their parents.',
    },
    {
      id: 'jugement-adoption',
      fr: 'Jugement d’adoption',
      en: 'Adoption judgment',
      def: 'The final decision that makes the adopters the child’s legal parents. It usually comes after at least 6 months of living together since the placement order (sometimes 3).',
    },
    {
      id: 'consentement-general',
      fr: 'Consentement général',
      en: 'General consent',
      def: 'A consent to adoption given **to the DPJ**, without naming an adopter. The DPJ then chooses the adoptive family and is the child’s tutor until the placement order.',
    },
    {
      id: 'refus-contact',
      fr: 'Refus au contact',
      en: 'Contact veto',
      def: 'An adopted person or a birth parent can register, before their identity is disclosed, that they do not want contact or that they set conditions. This veto can be withdrawn at any time.',
    },
    {
      id: 'adoption-coutumiere',
      fr: 'Adoption coutumière autochtone',
      en: 'Indigenous customary adoption',
      def: 'An adoption made under the custom of an Indigenous nation or community. An authority designated by the community certifies it, then the Directeur de l’état civil records it in the register.',
    },
    /* ---------------------------------------------- the rest (A–Z on the page) */
    {
      id: 'consentement-special',
      fr: 'Consentement spécial',
      en: 'Special consent',
      def: 'A consent to adoption in favour of a specific relative: a grandparent, brother, sister, uncle, aunt, their spouse, or a parent’s spouse. Unmarried (de facto) spouses must have lived together for at least 3 years.',
    },
    {
      id: 'restitution',
      fr: 'Demande de restitution',
      en: 'Application for return of the child',
      def: 'After the 30 days to withdraw consent, a parent can still ask the court to return the child, but only **before the placement order**. The judge considers the child’s interest.',
    },
    {
      id: 'declaration-admissibilite',
      fr: 'Déclaration d’admissibilité à l’adoption',
      en: 'Declaration of eligibility for adoption',
      def: 'A judgment that allows a child to be adopted **without the parents’ consent**, for example if they have not cared for the child for at least 6 months and a return home is unlikely.',
    },
    {
      id: 'reconnaissance-lien',
      fr: 'Reconnaissance d’un lien préexistant',
      en: 'Recognition of a pre-existing bond',
      def: 'An adoption that keeps the birth parent’s name on the new act of birth, when that bond of filiation matters to the child’s identity. The rights and duties between them still end.',
    },
    {
      id: 'adoption-reguliere',
      fr: 'Adoption régulière',
      en: 'Regular adoption',
      def: 'The adoption of a child whose parents consented to adoption, for example a baby placed at birth. Because this is rare, the wait can last several years.',
    },
    {
      id: 'oa',
      fr: 'Organisme agréé',
      en: 'Certified body',
      def: 'An organization authorized by Québec to handle international adoptions in certain countries. Since the November 2024 moratorium, it cannot open new files.',
    },
    {
      id: 'sasie',
      fr: 'SASIE (adoption internationale)',
      en: 'SASIE (international adoption authority)',
      def: 'The Secrétariat aux services internationaux à l’enfant, Québec’s authority for international adoption. It also handles origins searches for adoptions outside Québec, and replaced the former SAI.',
    },
    {
      id: 'refus-identite',
      fr: 'Refus à la communication de l’identité',
      en: 'Identity disclosure veto',
      def: 'A birth parent can refuse to have their name disclosed to their child, if they register this within **30 days** after the birth. The veto ends when the child turns 18.',
    },
    {
      id: 'rqap',
      fr: 'RQAP (Régime québécois d’assurance parentale)',
      en: 'QPIP (Québec Parental Insurance Plan)',
      def: 'The plan that pays benefits to working parents when a child arrives, including through adoption. Adoptive parents are entitled to **welcome and support** weeks specific to adoption.',
    },
    {
      id: 'dpj',
      fr: 'DPJ (Directeur de la protection de la jeunesse)',
      en: 'DPJ (Director of Youth Protection)',
      def: 'In each region, the official responsible for protecting children whose safety or development is in danger (officially “DYP” in English). People often say “the DPJ” to mean its teams, who answer day and night.',
    },
    {
      id: 'lpj',
      fr: 'Loi sur la protection de la jeunesse (LPJ)',
      en: 'Youth Protection Act (YPA)',
      def: 'The Québec law that lets the DPJ step in when a child’s safety or development is in danger. It also gives children and parents rights, such as the right to be heard.',
    },
    {
      id: 'ccq',
      fr: 'Code civil du Québec (C.c.Q.)',
      en: 'Civil Code of Québec (C.C.Q.)',
      def: 'The foundation of Québec’s private law. It covers filiation, adoption, parental authority and tutorship, among other things; references such as “C.C.Q., art. …” in this guide point to its articles.',
    },
    {
      id: 'securite-compromise',
      fr: 'Sécurité ou développement compromis',
      en: 'Security or development in danger',
      def: 'The legal test: the DPJ steps in when a child’s safety or development is threatened, for example by neglect, abuse or exposure to domestic violence.',
    },
    {
      id: 'mesures-immediates',
      fr: 'Mesures de protection immédiate',
      en: 'Immediate protective measures',
      def: 'Emergency measures, such as removing a child from home when they are in danger. They last at most **48 hours**; after that, an agreement or a court decision is needed.',
    },
    {
      id: 'mesures-volontaires',
      fr: 'Entente sur les mesures volontaires',
      en: 'Agreement on voluntary measures',
      def: 'A written agreement between the DPJ, the parents and a child aged 14 or older, to deal with the situation **without going to court**. Each agreement lasts at most 1 year.',
    },
    {
      id: 'durees-maximales',
      fr: 'Durées maximales de placement',
      en: 'Maximum placement periods',
      def: 'The time limits set by law to decide on a stable future for a placed child: **12, 18 or 24 months** depending on age (under 2, 2 to 5, 6 and older). Also called maximum periods of out-of-home care.',
    },
    {
      id: 'plan-intervention',
      fr: 'Plan d’intervention',
      en: 'Intervention plan',
      def: 'The written plan, made with the parents and the child, that sets out needs, goals, means and how long services will last. Parents receive a copy.',
    },
    {
      id: 'intervenant',
      fr: 'Intervenante ou intervenant',
      en: 'Caseworker',
      def: 'The person who follows the child and family for the DPJ or the adoption service. They are your first contact: you can ask them all your questions, even more than once.',
    },
    {
      id: 'tribunal',
      fr: 'Tribunal unifié de la famille',
      en: 'Unified Family Tribunal',
      def: 'Since June 30, 2025, the part of the Court of Québec that hears adoption and youth protection cases. For these cases it replaces the Youth Division (Chambre de la jeunesse) named in older documents.',
    },
    {
      id: 'cisss',
      fr: 'CISSS / CIUSSS',
      en: 'CISSS / CIUSSS',
      def: 'The regional public health and social services establishments, whose names now begin with “Santé Québec”. The DPJ and the adoption and reunion services are part of them.',
    },
    {
      id: 'clsc',
      fr: 'CLSC',
      en: 'CLSC',
      def: 'The local community service centre (centre local de services communautaires): your CISSS or CIUSSS’s nearby entry point for psychosocial help, health care and support for new and expecting parents.',
    },
    {
      id: 'commissaire',
      fr: 'Commissaire aux plaintes',
      en: 'Complaints commissioner',
      def: 'The local service quality and complaints commissioner receives complaints about an establishment’s services, including the DPJ’s, in confidence. The commissioner is independent of the establishment.',
    },
  ],
}
