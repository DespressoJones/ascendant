// DRAFT — replaced by researched content
import type { Actors } from '../types'

/*
 * Writing guide for this section (read by the "actors" constellation):
 *  - 7 to 12 items; 9 or 10 is the sweet spot. Items are placed clockwise around the child, starting
 *    just right of the top. The FIRST item is the one selected when the page loads (keep the DPJ first).
 *  - short: what is printed on the node. An acronym or one or two words. Ideal ≤ 10 characters;
 *    up to ~18 is fine (it wraps to two lines, e.g. "Foster family").
 *  - name: the full name, 25–70 characters. It must not just repeat `short`.
 *  - role: 1–2 short sentences, 120–240 characters. **bold** the one idea to retain.
 *  - when: one sentence, 60–140 characters, starting with the moment ("After…", "From…", "If…").
 *  - url: an official page (opens in a new tab); optional. The host name is shown on the button.
 */
export const actors: Actors = {
  eyebrow: 'Who’s who',
  title: 'Many people, one centre: the child.',
  lede:
    'DPJ, court, adoption service, foster family… So many names come up during an adoption or a placement. Here is who does what, and when you are likely to meet them.',
  items: [
    {
      id: 'dpj',
      short: 'DPJ',
      name: 'Director of Youth Protection (DYP)',
      role:
        'Receives reports and checks whether a child’s safety or development is in danger. In adoption, the DPJ receives general consents and **chooses the adoptive family**.',
      when: 'After a report, or when a parent is thinking about placing their child for adoption.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/childhood/youth-protection/steps-taken-by-the-dyp-when-a-situation-is-reported',
    },
    {
      id: 'service-adoption',
      short: 'CI(U)SSS',
      name: 'Adoption service of your CISSS or CIUSSS',
      role:
        'Informs people who want to adopt, assesses their plans and supports them through to the judgment. It also helps adoptees and birth parents with **searches for origins**.',
      when: 'From your very first questions about adoption, and years later for background information and reunions.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/adoption-in-quebec/about-adoption-in-quebec',
    },
    {
      id: 'tribunal',
      short: 'Court',
      name: 'Court of Québec, Unified Family Tribunal',
      role:
        'A judge decides what cannot be settled by agreement: protection measures, eligibility for adoption, placement, then the **adoption judgment**. Since June 30, 2025, these cases are heard by the Unified Family Tribunal.',
      when: 'When the DPJ asks for measures without an agreement, and always before an adoption is granted.',
      url: 'https://www.quebec.ca/en/justice-and-civil-status/judicial-system/courts-tribunals-quebec/court-of-quebec/unified-family-tribunal',
    },
    {
      id: 'avocat',
      short: 'Lawyer',
      name: 'Your lawyer, and legal aid',
      role:
        'Explains your rights and represents you in court. A child can have their own lawyer. Legal aid is **free for every child**, and for parents who qualify based on their income.',
      when: 'As soon as the DPJ goes to court, or before you sign an important document.',
      url: 'https://www.csj.qc.ca/',
    },
    {
      id: 'famille-accueil',
      short: 'Foster family',
      name: 'Foster family or kinship foster family',
      role:
        'Cares for the child day to day when they cannot live with their parents. A kinship foster family is **someone the child already knows**, such as a grandparent.',
      when: 'During a placement agreed on with the DPJ or ordered by the court.',
    },
    {
      id: 'banque-mixte',
      short: 'Banque mixte',
      name: 'Banque-mixte family (foster-to-adopt)',
      role:
        'A foster family that hopes to adopt. They welcome a young child who is unlikely to return home, knowing the child **could still go back**. Adoption is only possible if the child becomes eligible.',
      when: 'Often in the child’s first months, while the DPJ is still working with the parents.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/adoption-in-quebec/about-adoption-in-quebec',
    },
    {
      id: 'sasie',
      short: 'SASIE',
      name: 'Québec’s international adoption authority',
      role:
        'The Secrétariat aux services internationaux à l’enfant (formerly the SAI). It **authorizes every plan to adopt abroad**, oversees certified bodies and handles international searches for origins.',
      when: 'Before any step toward adopting outside Québec, and afterwards for searches for origins.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/international-adoption',
    },
    {
      id: 'organisme-agree',
      short: 'OA',
      name: 'Certified body (organisme agréé)',
      role:
        'A non-profit organization recognized by Québec that guides adopters through one specific country, from preparing the file to the child’s arrival.',
      when: 'Only for files already open: since November 2024, a **moratorium** prevents new ones from being opened.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/international-adoption/adoption-procedures/procedures',
    },
    {
      id: 'etat-civil',
      short: 'Registrar',
      name: 'Registrar of civil status (Directeur de l’état civil)',
      role:
        'Draws up the child’s new act of birth once the adoption judgment is final. The original act is kept separately and **confidentially**.',
      when: 'After the adoption judgment, and later if the adopted person asks for their original act of birth.',
      url: 'https://www.etatcivil.gouv.qc.ca/',
    },
    {
      id: 'cdpdj',
      short: 'CDPDJ',
      name: 'Human Rights and Youth Rights Commission',
      role:
        'Makes sure the rights of children followed by the DPJ are respected. It can **investigate, free of charge**, if you believe a child’s rights were not respected.',
      when: 'If you think a child did not receive the services or the respect they are entitled to.',
      url: 'https://www.cdpdj.qc.ca/en',
    },
  ],
}
