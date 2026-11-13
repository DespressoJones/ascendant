// Researched content — verified 2026-11-13
import type { Actors } from '../../src/content/types'

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
 *
 * Facts and sources: research notes dpj-placement.md, legal-core.md, adopter-domestic.md,
 * international.md, after-adoption.md; sources in src/content/sources/actors-after.ts.
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
      name: 'Director of Youth Protection (officially “DYP” in English)',
      role:
        'Receives reports and checks whether a child’s safety or development is in danger. The DPJ’s adoption service receives general consents and **chooses the adoptive family**.',
      when: 'After a report (never before the baby is born), or when a parent is thinking about placing their child for adoption.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/childhood/youth-protection/director-of-youth-protection-dyp',
    },
    {
      id: 'cisss',
      short: 'CISSS / CIUSSS',
      name: 'Integrated (university) health and social services centre',
      role:
        'The public body for your region, now part of Santé Québec. It is home to the DPJ, the **adoption service**, the service that handles searches for origins, and the CLSCs.',
      when: 'From your first questions about adoption, during a placement, and years later for searches for origins.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/adoption-in-quebec/contact-details-for-adoption-services-by-region',
    },
    {
      id: 'tribunal',
      short: 'Court',
      name: 'Unified Family Tribunal, Court of Québec',
      role:
        'A judge decides when there is no agreement: protection measures, eligibility for adoption, placement, then the **adoption judgment**. Since June 30, 2025, these cases go to the Unified Family Tribunal.',
      when: 'When the DPJ and the family disagree on measures, and always before an adoption is granted.',
      url: 'https://www.quebec.ca/en/justice-and-civil-status/judicial-system/courts-tribunals-quebec/court-of-quebec/unified-family-tribunal',
    },
    {
      id: 'avocat',
      short: 'Lawyer',
      name: 'Your lawyer, and legal aid',
      role:
        'Explains your rights and represents you in court. In youth protection cases, the child has **their own lawyer**. Legal aid is free for every child, and available to parents based on their income.',
      when: 'As soon as the DPJ goes to court, or before you sign a consent or an important agreement.',
      url: 'https://www.csj.qc.ca/home/',
    },
    {
      id: 'famille-accueil',
      short: 'Foster family',
      name: 'Foster family or kinship foster family',
      role:
        'Cares for the child day to day when they cannot live with their parents. A kinship foster family is made up of people **already important to the child**, such as grandparents, assessed to take the child in.',
      when: 'During a placement agreed on with the DPJ or ordered by the court.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/childhood/foster-family/description-foster-family',
    },
    {
      id: 'banque-mixte',
      short: 'Banque mixte',
      name: 'Banque mixte family (fostering with a view to adoption)',
      role:
        'A foster family that hopes to adopt. They take in a child who seems unlikely to return home, accepting that the child **could still go back**. Adoption is only possible if the child becomes eligible.',
      when: 'Often in the child’s first months, while the DPJ is still working toward the child’s return home.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/adoption-in-quebec/about-adoption-in-quebec',
    },
    {
      id: 'sasie',
      short: 'SASIE',
      name: 'Secrétariat aux services internationaux à l’enfant',
      role:
        'Québec’s international adoption authority (formerly the SAI). It **authorizes every plan** before any step is taken, oversees certified bodies and handles searches for origins for adoptions outside Québec.',
      when: 'Before any step toward adopting outside Québec, and later for searches for origins.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/international-adoption',
    },
    {
      id: 'organisme-agree',
      short: 'Certified body',
      name: 'Certified body for international adoption (organisme agréé)',
      role:
        'A non-profit organization authorized by Québec for one specific country. It guides adopters from preparing the file to the child’s arrival.',
      when: 'Only for files already open: since November 2024, a **moratorium** prevents new ones from being opened.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/international-adoption/certified-bodies-international-adoption/list-approved-organizations',
    },
    {
      id: 'etat-civil',
      short: 'Registrar',
      name: 'Registrar of civil status (Directeur de l’état civil)',
      role:
        'Draws up the child’s **new act of birth** after the adoption judgment. The original act of birth is not destroyed: it is kept and stays confidential. An adopted person born in Québec can get a copy of it.',
      when: 'After the adoption judgment, and later if the adopted person asks for a copy of their original act of birth.',
      url: 'https://www.etatcivil.gouv.qc.ca/en/Copy_original_act_birth.html',
    },
    {
      id: 'info-social',
      short: '811 / CLSC',
      name: 'Info-Social 811 and your local CLSC',
      role:
        'At 811 (option 2), a psychosocial worker answers **free of charge, 24 hours a day**. Your CLSC, part of your CISSS or CIUSSS, offers support close to home.',
      when: 'Whenever you need to talk, at any stage: before a decision, during a placement or after an adoption.',
      url: 'https://www.quebec.ca/en/health/finding-a-resource/info-social-811',
    },
    {
      id: 'cdpdj',
      short: 'CDPDJ',
      name: 'Québec Human Rights and Youth Rights Commission',
      role:
        'Makes sure the rights of children followed by the DPJ are respected. It can **investigate** if a child’s rights were not respected, without revealing who made the request.',
      when: 'If you think a child followed by the DPJ did not receive the services or the respect they are entitled to.',
      url: 'https://www.cdpdj.qc.ca/en/file-a-complaint/i-want-to/requesting-intervention-young-person',
    },
  ],
}
