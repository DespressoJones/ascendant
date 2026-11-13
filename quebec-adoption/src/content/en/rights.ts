// Researched content — verified 2026-11-13
import type { LegalRef, Rights } from '../types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const adoptionAid: LegalRef = {
  label: 'O.C. 1915-2023',
  url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82291.pdf',
}
const legalAidMinors: LegalRef = {
  label: 'Legal Aid Act, s. 4.0.1',
  url: `${LQ}A-14${se('4.0.1')}`,
}
const legalAid: LegalRef = { label: 'Legal aid', url: 'https://www.csj.qc.ca/admissibilite/' }
const qpip: LegalRef = {
  label: 'QPIP',
  url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/choix-regime',
}

/*
 * Writing guide for this section (read by the "rights" switcher):
 *  - 3 to 6 groups. `who` is the pill label, the panel title AND the giant outline word
 *    behind the list (desktop): keep it 6–30 characters, no final period.
 *  - 4 to 9 items per group (here 6). Each item states ONE right, as a verb phrase, 60–120 characters.
 *    **Bold** the core of the right (2–5 words). No links in item text: put them on the refs.
 *  - refs: 0–3 short chips per item.
 *  - Group ids are shared by FR and EN (deep link #rights-<id>).
 *
 * Checked against: C.C.Q. (consolidation current to September 9, 2026) arts. 33, 34, 199.1, 548–550, 555,
 * 557, 569, 579, 583, 583.4, 611 (art. 611 was rewritten in 2022: the old "serious reasons" rule is gone);
 * YPA ss. 3, 4, 4.3, 6.1, 9.1, 11.4 (S.Q. 2022, c. 11), 7, 9, 81, 83 (S.Q. 2017, c. 18), 78 (2022, c. 11),
 * 5, 52, 54, 70.1, 71.3.6, 74.2, 91; O.C. 1915-2023 (adoption financial assistance: s. 1, 6 continuous months
 * before the placement order; s. 3, apply within 60 days); Legal Aid Act, s. 4.0.1 (S.Q. 2022, c. 22, s. 128:
 * free legal aid for every minor).
 * Fact-check 2026-11-13: arts. 579 and 611 require the consent of a child of 10 to 13, but the court decides
 * if that child refuses or the adults disagree; only from 14 is the child’s consent always required.
 */
export const rights: Rights = {
  eyebrow: 'Your rights',
  title: 'Your rights, whoever you are.',
  lede:
    'Parent, child, foster or adoptive family, grandparent or relative: the law protects you too. Choose your situation to see, in plain words, what you are entitled to and where it is written.',
  groups: [
    {
      id: 'parents',
      who: 'The child’s parents',
      icon: 'heart-hand',
      items: [
        {
          text: '**Get clear explanations** and give your point of view before decisions that affect you are made.',
          refs: [ypa('6.1'), ypa('4.3')],
        },
        {
          text: '**Consult a lawyer.** Legal aid can pay all or part of the cost, depending on your financial situation.',
          refs: [ypa('5'), legalAid],
        },
        {
          text: '**Refuse an agreement** proposed by the DPJ (Director of Youth Protection) or contest its decision: the court then decides.',
          refs: [ypa('52'), ypa('74.2')],
        },
        {
          text: '**Change your mind within 30 days** of signing a consent to adoption, without having to explain why.',
          refs: [ccq('557'), ccq('548')],
        },
        {
          text: '**Protect your identity** until the child turns 18, by registering a refusal within 30 days after the birth.',
          refs: [ccq('583.4')],
        },
        {
          text: '**Arrange news or contact** after the adoption, in writing, if it is in the child’s interest.',
          refs: [ccq('579')],
        },
      ],
    },
    {
      id: 'child',
      who: 'The child',
      icon: 'leaf',
      items: [
        {
          text: 'Have every decision made **in their interest** and with respect for their rights.',
          refs: [ccq('33'), ypa('3')],
        },
        {
          text: '**Be heard** by the court before it decides, if their age and maturity allow it.',
          refs: [ccq('34')],
        },
        {
          text: '**Have their own lawyer** in youth protection court, free of charge.',
          refs: [ypa('78'), legalAidMinors],
        },
        {
          text: 'If placed, **stay in touch** with their parents, brothers and sisters and the people who matter, with some exceptions.',
          refs: [ypa('9'), ypa('9.1')],
        },
        {
          text: 'From age 10, **agree or refuse** to be adopted. At 14 and over, their refusal stops the adoption.',
          refs: [ccq('549'), ccq('550')],
        },
        {
          text: 'Once adopted, **learn about their origins** under the rules of the law: birth parents’ names, original act of birth.',
          refs: [ccq('583')],
        },
      ],
    },
    {
      id: 'carers',
      who: 'Adoptive & foster parents',
      icon: 'home',
      items: [
        {
          text: '**Attend the hearings** about the child in your care and testify, with a lawyer if you wish.',
          refs: [ypa('83')],
        },
        {
          text: '**Be consulted** before the child in your care is transferred to another foster setting, with some exceptions.',
          refs: [ypa('7')],
        },
        {
          text: '**Exercise parental authority** from the placement order. The child can then no longer be returned to the parents.',
          refs: [ccq('569')],
        },
        {
          text: 'On request, receive **a summary of the child’s background** as soon as the placement order is made.',
          refs: [ypa('71.3.6')],
        },
        {
          text: '**Apply for financial assistance** within 60 days of the placement order, if the DPJ had entrusted the child to you for at least 6 months in a row.',
          refs: [adoptionAid],
        },
        {
          text: '**Receive QPIP adoption benefits**, including welcome and support weeks, if you are eligible.',
          refs: [qpip],
        },
      ],
    },
    {
      id: 'kin',
      who: 'Grandparents & relatives',
      icon: 'family',
      items: [
        {
          text: '**Be considered first** if the child cannot stay with their parents, before a foster family.',
          refs: [ypa('4')],
        },
        {
          text: '**Become a kinship foster family**, after an assessment, to take in the child with support.',
          refs: [ypa('54'), ypa('91')],
        },
        {
          text: '**Ask to testify** in court if you have useful information about the child, with a lawyer if you wish.',
          refs: [ypa('81')],
        },
        {
          text: '**Keep ties** with your grandchild if it is in their interest. If there is disagreement, the court decides. From age 14, the child must agree.',
          refs: [ccq('611')],
        },
        {
          text: '**Become the child’s tutor** by court decision, at the request of a parent or the DPJ, without cutting their bond with their parents.',
          refs: [ccq('199.1'), ypa('70.1')],
        },
        {
          text: '**Adopt the child** if the parents give you a special consent: grandparents, aunts, uncles, brothers and sisters.',
          refs: [ccq('555')],
        },
      ],
    },
  ],
}
