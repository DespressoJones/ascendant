// Researched content — verified 2026-11-13
import type { After, LegalRef } from '../types'

/*
 * Facts: research notes after-adoption.md (§1–§8), legal-core.md (§8), international.md (§8, §12, §14);
 * Civil Code text checked in the Publications du Québec consolidation current to September 9, 2026.
 * QPIP figures re-read on Québec.ca (choice of plan, updated February 26, 2026).
 * Tax figures: Revenu Québec line 462 point 6 (2025 return) and CRA line 31300 (2025), read through
 * search-engine extracts of the official pages (both sites block automated reads). 2026 figures not
 * published yet, so none are given. Sources: src/content/sources/actors-after.ts.
 */

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const als = (a: string): LegalRef => ({ label: `ALS, s. ${a}`, url: `${LQ}N-1.1${se(a)}` })

const S = 'actors-after-'

export const after: After = {
  eyebrow: 'After the adoption',
  title: 'After the judgment: what changes, what stays',
  lede:
    'The adoption judgment turns a page without erasing the story. Here is what happens to the act of birth, to ties with the family of origin, and the help families can get.',
  certificate: {
    title: 'A new act of birth',
    body:
      'Once the adoption judgment is final, the court sends it to the Registrar of civil status (Directeur de l’état civil). A **new act of birth** is then drawn up. It replaces the original act: it repeats everything that does not change, like the date and place of birth, and names the adoptive parents. If the court recognized a bond of filiation with a birth parent, the new act mentions it too.\n\nThe original act is **not destroyed**. It is kept, with a note that it was replaced, and it stays confidential: only the people the law allows can access it. An adopted person born in Québec can get a copy, with an attestation from the service that handles searches for origins.',
    docTitle: 'Act of birth',
    fields: [
      { label: 'Surname', before: 'Lavoie', after: 'Tremblay-Diallo' },
      { label: 'Given name', before: 'Léa', after: 'Léa' },
      { label: 'Date of birth', before: 'March 14, 2025', after: 'March 14, 2025' },
      { label: 'Place of birth', before: 'Sherbrooke, Québec', after: 'Sherbrooke, Québec' },
      { label: 'Parent', before: 'Julie Lavoie', after: 'Marc Tremblay' },
      { label: 'Parent', before: 'Not declared', after: 'Awa Diallo' },
    ],
    sealedLabel: 'Original act, confidential',
    note: 'Illustration only: this is not an official document. The names are fictitious.',
    refs: [ccq('129'), ccq('132'), ccq('149'), ccq('583')],
  },
  blocks: [
    {
      id: 'origins',
      icon: 'search',
      title: 'Searching for origins and reunions',
      body:
        'An adopted person can ask for a summary of their story (their **family and medical background**), the names of their birth parents and a copy of their original act of birth. The rules changed on June 8, 2024, giving adopted people more rights. Contact, though, only happens if the other person does not refuse it.',
      figures: [
        { value: 'Age 14', label: 'to apply without your parents’ approval' },
        { value: '30 days', label: 'after the birth: the deadline for a birth parent to refuse to have their name disclosed' },
        { value: 'Age 18', label: 'when that refusal ends, even if it dates from before 2024' },
      ],
      points: [
        'The adopted person and the birth parent can also **refuse contact**, or allow it on their own conditions. Not respecting that refusal can lead to paying damages.',
        'Unless a birth parent’s refusal is still in effect, the adopted person can also get the names of their adult birth siblings and of their birth grandparents. Their contact details: only if they agree.',
        'Birth parent: once your child is an adult, you can ask for their name and contact details. They are told first and can refuse contact. If they were adopted before June 16, 2018, their identity stays protected unless they agree.',
        'Copy of the original act (if born in Québec): first get an attestation from the origins service, then apply by mail to the Directeur de l’état civil ($64.25).',
        'Adopted within Québec: contact the origins service in the region where the adoption took place. Adopted from outside Québec: contact the SASIE.',
      ],
      refs: [ccq('583'), ccq('583.2'), ccq('583.4'), ccq('583.5'), ccq('583.6'), ccq('583.10')],
      sources: [`${S}qc-origins-bill2`, `${S}qc-origins-services`, `${S}qc-origins-contacts`, `${S}dec-original-act`, `${S}bill2`, 'msss-origins-guide', 'ccq-book2'],
    },
    {
      id: 'contact',
      icon: 'heart-hand',
      title: 'Staying in touch: communication agreements',
      body:
        'In an adoption within Québec, the adoptive parents and members of the family of origin can agree **in writing** to share news or to meet, if it is in the child’s interest.',
      figures: [
        { value: 'Age 10', label: 'the child must agree' },
        { value: 'Age 14', label: 'their consent is always needed, and they can end it whenever they want' },
      ],
      points: [
        'One photo a year, letters, calls or visits: any suitable means. Meeting in person is not required.',
        'If a child aged 10 to 13 refuses, or if the adults disagree, the court can decide, but only for a birth parent or birth grandparent who matters to the child.',
        'Before the placement order, the DPJ helps you prepare the agreement. After it, family mediation is free with an accredited mediator: up to 5 hours to reach an agreement, and up to 2.5 hours to review it or settle a disagreement.',
        'If you plan only to share news, the DPJ helps with these exchanges if you ask, until the child turns 18. It stops if either side asks.',
      ],
      refs: [ccq('579'), ypa('71.3.4')],
      sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, `${S}bill2`, 'ccq-book2'],
    },
    {
      id: 'support',
      icon: 'shield',
      title: 'Support, long after',
      body:
        'Adopting, being adopted or having placed your child for adoption raises questions that come back over the years. You do not have to face them without help.',
      points: [
        'Your CISSS or CIUSSS offers adoptive families the same services as everyone: family, parenting or individual follow-up, child development, physical and mental health.',
        'Adoption within Québec: from the placement, the DPJ plans meetings to support the child’s integration. International adoption: a worker visits you within 14 days of the child’s arrival.',
        'During a search for origins, the service supports you: thinking it through, preparing a reunion, acting as a go-between, and helping you if the search does not succeed.',
        'Info-Social 811 (option 2): free, confidential advice, 24 hours a day.',
        'Community adoption groups offer peer support groups, webinars and listening lines.',
        'The law makes adoptive parents responsible for telling the child they were adopted, and for explaining the rules on identity and contact. Talk about it early, in simple words.',
      ],
      refs: [ccq('583.11')],
      sources: [`${S}qc-post-adoption`, `${S}qc-origins-services`, `${S}qc-811`],
    },
    {
      id: 'rqap',
      icon: 'family',
      title: 'Parental insurance (QPIP)',
      body:
        'If you work, the Québec Parental Insurance Plan (QPIP, “RQAP” in French) can pay you benefits when the child arrives in your home. You choose the **basic plan** (more weeks) or the **special plan** (fewer weeks, paid at a higher rate). Below: the basic plan.',
      figures: [
        { value: '5', label: 'weeks for each parent, at 70% of earnings' },
        { value: '13', label: 'weeks of welcome and support benefits to share, at 70%' },
        { value: '32', label: 'weeks of adoption benefits to share: 7 at 70%, then 25 at 55%' },
      ],
      points: [
        'Special plan: 3 weeks per parent, then 12 and 25 weeks to share, all at 75% of earnings.',
        'Bonus: 4 more weeks to share if each parent has received at least 8 shareable adoption weeks (special plan: 3 weeks, after 6). Single parent: 5 more weeks (3 with the special plan).',
        'Benefits start no earlier than the week the child arrives, or 5 weeks before for an adoption outside Québec. Unless an exception applies, they end no later than 78 weeks after the arrival.',
        '“Arrival”: usually the day the child is placed in your home, including Banque mixte. Adoption within the family, or a child already living in your foster family: the day the application for a placement order is filed in court.',
        'You need, among other things, at least $2,000 in insurable earnings. Both parents have the same plan: the first to apply chooses for both, and that choice cannot be changed except in exceptional circumstances.',
        'Adopting your spouse’s child? Check your eligibility with the QPIP first.',
      ],
      refs: [{ label: 'Act respecting parental insurance', url: `${LQ}A-29.011` }],
      sources: [`${S}rqap-plans`, `${S}rqap-eligibility`, `${S}rqap-planning`, `${S}rqap-apply`],
    },
    {
      id: 'leave',
      icon: 'clock',
      title: 'Leave from work',
      body:
        'The Act respecting labour standards protects your job when you adopt. These leaves are **unpaid**, except for the first 2 days. During your leave, the QPIP can replace part of your income.',
      figures: [
        { value: '5', label: 'days off, the first 2 of them paid' },
        { value: '5', label: 'weeks of paternity leave, also open to adoptive parents' },
        { value: '65', label: 'weeks of parental leave' },
      ],
      points: [
        'Take the 5 days within 15 days of the child’s arrival in your home. Tell your employer as soon as possible.',
        'Each employee who adopts is entitled to both leaves, and parental leave can follow paternity leave. Adopting your spouse’s child? Check your rights with the CNESST.',
        'Adoption outside Québec: both leaves can start the week you leave to bring the child home.',
        'Paternity leave ends no later than 78 weeks after the child’s arrival; parental leave, generally, 85 weeks after.',
        'Give your employer written notice at least 3 weeks before your leave starts.',
        'Federally regulated employer (bank, airline…)? Other rules apply. Your collective agreement may also offer more.',
      ],
      refs: [als('81.1'), als('81.2'), als('81.10'), als('81.11'), als('81.12')],
      sources: [`${S}educaloi-leave`, `${S}bill12`],
    },
    {
      id: 'tax',
      icon: 'doc',
      title: 'Tax credits for adoption expenses',
      body:
        'Part of your adoption expenses can come back to you: a **refundable** credit from Québec and a **non-refundable** federal credit. Keep every receipt.',
      figures: [
        { value: '50%', label: 'of eligible expenses, Québec credit (2025 tax year)' },
        { value: '$10,000', label: 'maximum Québec credit per child ($20,000 of expenses)' },
      ],
      points: [
        '“Refundable” means you get the amount even if you have no tax to pay.',
        'Québec: claim it for the year the adoption is granted or recognized in Québec (line 462 of your return).',
        'Federal: for 2025, up to $19,580 of expenses per child (line 31300). This credit lowers your tax, with no refund beyond that.',
        'Which expenses count? Check the lists from Revenu Québec and the Canada Revenue Agency before you file.',
      ],
      sources: [`${S}rq-adoption-credit`, `${S}cra-adoption-expenses`],
    },
  ],
}
