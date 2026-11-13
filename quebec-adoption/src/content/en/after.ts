// DRAFT — replaced by researched content
import type { After } from '../types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/CCQ-1991'

export const after: After = {
  eyebrow: 'After the adoption',
  title: 'After the judgment: what changes, what stays',
  lede:
    'The adoption judgment turns a page without erasing the story. Here is what happens to the paperwork, to ties with the family of origin, and to the help families can get.',
  certificate: {
    title: 'A new act of birth',
    body:
      'Once the adoption judgment is final, the Registrar of Civil Status (Directeur de l’état civil) draws up a **new act of birth** that replaces the original. It repeats everything that does not change, like the date and place of birth, and names the adoptive parents.\n\nThe original act is **not destroyed**: it is kept sealed and confidential. The adopted person can obtain a copy of it under the rules on searching for origins.',
    docTitle: 'Act of birth',
    fields: [
      { label: 'Surname', before: 'Lavoie', after: 'Tremblay-Diallo' },
      { label: 'Given name', before: 'Léa', after: 'Léa' },
      { label: 'Date of birth', before: 'March 14, 2025', after: 'March 14, 2025' },
      { label: 'Place of birth', before: 'Sherbrooke, Québec', after: 'Sherbrooke, Québec' },
      { label: 'Parent', before: 'Julie Lavoie', after: 'Marc Tremblay' },
      { label: 'Parent', before: 'Not declared', after: 'Awa Diallo' },
    ],
    sealedLabel: 'Original act, sealed',
    note: 'Illustration only: this is not an official document. Names are fictitious.',
    refs: [
      { label: 'C.C.Q., art. 129', url: `${CCQ}#se:129` },
      { label: 'C.C.Q., art. 132', url: `${CCQ}#se:132` },
      { label: 'C.C.Q., art. 583', url: `${CCQ}#se:583` },
    ],
  },
  blocks: [
    {
      id: 'rqap',
      icon: 'family',
      title: 'Parental insurance (QPIP)',
      body:
        'If you work, the Québec Parental Insurance Plan pays benefits while you welcome your child. The weeks below are for the **basic plan**; the special plan offers fewer weeks at a higher rate.',
      figures: [
        { value: '13', label: 'weeks of welcome and support, to share' },
        { value: '32', label: 'weeks of adoption benefits, to share' },
        { value: '5', label: 'weeks reserved for each parent' },
      ],
      points: [
        'Benefits start when the child arrives in your care.',
        'Adoption outside Québec: they can start up to 5 weeks before the arrival.',
        'Four extra weeks if each parent takes at least 8 shareable weeks.',
        'Apply online as soon as you know the arrival date.',
      ],
      refs: [{ label: 'Act respecting parental insurance, ss. 11 & 12.1' }],
    },
    {
      id: 'leave',
      icon: 'clock',
      title: 'Leave from work',
      body: 'The Act respecting labour standards protects your job when you adopt, whether or not you receive benefits.',
      figures: [
        { value: '5', label: 'days off, 2 of them paid' },
        { value: '65', label: 'weeks of unpaid parental leave' },
      ],
      points: [
        'Give your employer written notice at least 3 weeks before parental leave.',
        'Your collective agreement may offer more.',
      ],
      refs: [{ label: 'A.L.S., ss. 81.1 & 81.10' }],
    },
    {
      id: 'tax',
      icon: 'doc',
      title: 'Tax credits for adoption expenses',
      body:
        'Part of what you paid to adopt can come back to you, from Québec and from Ottawa. Keep every receipt.',
      figures: [{ value: '50%', label: 'of eligible expenses, Québec refundable credit' }],
      points: [
        'Eligible: lawyer or notary, psychosocial assessment, travel, translations…',
        'The federal credit is non-refundable.',
      ],
      refs: [
        {
          label: 'Revenu Québec',
          url: 'https://www.revenuquebec.ca/en/citizens/tax-credits/tax-credit-for-adoption-expenses/',
        },
      ],
    },
    {
      id: 'contact',
      icon: 'heart-hand',
      title: 'Staying in touch: communication agreements',
      body:
        'Adoptive parents and the family of origin can agree **in writing** to share news or to meet, when it is in the child’s interest.',
      figures: [
        { value: '10', label: 'years old: the child must consent' },
        { value: '14', label: 'years old: they can end it' },
      ],
      points: [
        'Letters, photos, calls or visits: any suitable means.',
        'If you disagree, free family mediation can help.',
      ],
      refs: [{ label: 'C.C.Q., art. 579', url: `${CCQ}#se:579` }],
    },
    {
      id: 'origins',
      icon: 'search',
      title: 'Searching for origins and reunions',
      body:
        'An adopted person can ask for a summary of their story (their **socio-biological background**), then for the names of their parents of origin and a copy of their original act.',
      figures: [{ value: '14', label: 'years old: age to apply on your own' }],
      points: [
        'Under 14, with your parents’ approval.',
        'Someone may refuse contact; that refusal is respected.',
        'The DPJ’s service (CISSS or CIUSSS) walks you through it.',
      ],
      refs: [{ label: 'C.C.Q., arts. 583–584', url: `${CCQ}#se:583` }],
    },
    {
      id: 'support',
      icon: 'shield',
      title: 'Support, long after',
      body:
        'Adopting, being adopted or placing your child leaves questions that come back over the years. You do not have to carry them alone.',
      points: [
        'Your CISSS or CIUSSS offers psychosocial services after adoption.',
        'Info-Social 811 answers day and night.',
        'Community groups bring adoptive families and adoptees together.',
        'Talk to your child about adoption early, in simple words.',
      ],
      refs: [{ label: 'C.C.Q., art. 583.11', url: `${CCQ}#se:583.11` }],
    },
  ],
}
