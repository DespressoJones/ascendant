// Researched content — verified 2026-11-13
import type { LegalRef, Principles } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })

/*
 * Writing guide for this section (renderer: sections/principles.ts)
 *  - 3 items read best (4 also fit). The title says how many: keep it in sync.
 *  - title: a 4–7 word statement, about 25–45 characters. Wrap the key words in **bold**.
 *  - body: 2–3 plain sentences, about 220–380 characters.
 *  - refs: 1–4 chips.
 *  - id: an English slug, the same in FR and EN. It picks the icon (see ICONS in the renderer).
 *
 * Checked against: C.C.Q. arts. 33, 34, 543, 577 (consolidation current to September 9, 2026);
 * YPA ss. 3, 4, 4.1, 4.4, 5, 6.1, 6.2, 11.4 (S.Q. 2022, c. 11) and 53.0.1, 91.1 (S.Q. 2017, c. 18; 2022, c. 11).
 */
export const principles: Principles = {
  eyebrow: 'The essentials',
  title: 'Four things to know first',
  items: [
    {
      id: 'child-interest',
      title: 'The **child’s interest** comes first.',
      body:
        'Every decision about a child must be made in the child’s interest and with respect for their rights. Their needs, age, health and family environment are taken into account. An adoption is only possible if it serves that interest, and in court, the child has the right to be heard if their age and maturity allow it.',
      refs: [ccq('33'), ccq('34'), ccq('543'), ypa('3')],
    },
    {
      id: 'family-first',
      title: '**Family** first, when it’s safe.',
      body:
        'The law first asks that the child stay with their parents, with support, if that is in the child’s interest. If not, the child goes first to the people who matter most to them, such as grandparents or other relatives, and then to a setting as close as possible to a family. Brothers and sisters stay together whenever possible.',
      refs: [ypa('4'), ypa('4.1')],
    },
    {
      id: 'time-stability',
      title: 'For a child, **time** matters.',
      body:
        'Children do not experience time the way adults do. When a child lives away from home, the law sets a time limit of 12, 18 or 24 months, depending on their age. After that, if going home is not possible, the court must, with some exceptions, give the child lasting stability: with a relative, through tutorship, in foster care until 18, or through adoption.',
      refs: [ypa('4.4'), ypa('53.0.1'), ypa('91.1')],
    },
    {
      id: 'parents-rights',
      title: '**Parents have rights**, too.',
      body:
        'When the DPJ (Director of Youth Protection) steps in, parents keep their rights and duties, except where the law says otherwise. You have the right to clear explanations, to be listened to, to be accompanied by a person of your choice, and to consult a lawyer. If you disagree, the court decides.',
      refs: [ypa('11.4'), ypa('6.1'), ypa('6.2'), ypa('5')],
    },
  ],
}
