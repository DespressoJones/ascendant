// DRAFT — replaced by researched content
import type { Rights } from '../types'

/*
 * Writing guide for this section (read by the "rights" switcher):
 *  - 3 to 6 groups; 5 is ideal. `who` is the pill label, the panel title AND the giant outline word
 *    behind the list (desktop): keep it 6–30 characters, no final period.
 *  - 4 to 9 items per group; 5–7 reads best. Each item states ONE right, as a verb phrase
 *    ("Be heard…", "Withdraw…"), 60–120 characters. **Bold** the core of the right (2–5 words).
 *    No links in item text: put them on the refs.
 *  - refs: 0–3 short chips per item ("C.C.Q., art. 557", "YPA, s. 9").
 */
export const rights: Rights = {
  eyebrow: 'Your rights',
  title: 'Your rights, whoever you are.',
  lede:
    'Parent, child, foster family, grandparent or adopted person: the law protects you too. Choose your situation to see, in plain words, what you are entitled to and where it is written.',
  groups: [
    {
      id: 'parents',
      who: 'Parents',
      icon: 'heart-hand',
      items: [
        {
          text: '**Be informed, consulted and heard** before any decision about your child.',
          refs: [{ label: 'YPA, s. 6.1' }],
        },
        {
          text: '**Bring a person of your choice** with you to meetings with youth protection (DPJ).',
          refs: [{ label: 'YPA, s. 6.2' }],
        },
        {
          text: '**Have a lawyer** in court. Legal aid may be free, depending on your income.',
        },
        {
          text: '**Refuse a measure** the DPJ proposes: the court then makes the decision.',
        },
        {
          text: '**Withdraw your consent** to adoption within 30 days, without having to give a reason.',
          refs: [{ label: 'C.C.Q., art. 557' }],
        },
        {
          text: '**Keep your rights and duties as a parent**, unless the law or the court decides otherwise.',
          refs: [{ label: 'YPA, s. 11.4' }],
        },
        {
          text: '**Make a complaint** if the services you receive do not respect your rights.',
        },
      ],
    },
    {
      id: 'child',
      who: 'The child',
      icon: 'leaf',
      items: [
        {
          text: 'Every decision is made **in their interest** and with respect for their rights.',
          refs: [{ label: 'C.C.Q., art. 33' }, { label: 'YPA, s. 3' }],
        },
        {
          text: '**Be heard**, and have their opinion count, according to their age and maturity.',
          refs: [{ label: 'C.C.Q., art. 34' }],
        },
        {
          text: '**Have their own lawyer** in court, free of charge.',
          refs: [{ label: 'YPA, s. 78' }],
        },
        {
          text: '**Stay in touch** with their parents, brothers and sisters and the people who matter, unless the court decides otherwise.',
          refs: [{ label: 'YPA, s. 9' }],
        },
        {
          text: '**Be prepared** before moving to a new home.',
          refs: [{ label: 'YPA, s. 7' }],
        },
        {
          text: 'From age 10, **agree to their own adoption**. From 14, their refusal stops it.',
          refs: [{ label: 'C.C.Q., art. 549' }, { label: 'C.C.Q., art. 550' }],
        },
      ],
    },
    {
      id: 'carers',
      who: 'Foster & adoptive families',
      icon: 'home',
      items: [
        {
          text: '**Attend the hearings** about the child in your care and testify, with a lawyer.',
          refs: [{ label: 'YPA, s. 83' }],
        },
        {
          text: 'On request, receive **a summary of the child’s history** once the adoption placement order is made.',
          refs: [{ label: 'YPA, s. 71.3.6' }],
        },
        {
          text: '**Get support** from the health establishment: follow-up, training and payment for foster families.',
        },
        {
          text: '**Adoption benefits** from the QPIP, to welcome the child home.',
        },
        {
          text: '**Be told clearly** that in the Banque-mixte program, the child may go back to their family until adoption becomes possible.',
        },
      ],
    },
    {
      id: 'kin',
      who: 'Grandparents & kin',
      icon: 'family',
      items: [
        {
          text: '**Keep a relationship** with your grandchild: the parents cannot block it without serious reasons.',
          refs: [{ label: 'C.C.Q., art. 611' }],
        },
        {
          text: '**Be considered first** if the child has to live away from their parents.',
          refs: [{ label: 'YPA, s. 4' }],
        },
        {
          text: '**Ask to be heard** by the court when youth protection is involved.',
          refs: [{ label: 'YPA, s. 81' }],
        },
        {
          text: '**Become a kinship foster family** and get support to care for the child.',
        },
        {
          text: '**Apply for tutorship** of the child, an option that keeps their legal tie with their parents.',
          refs: [{ label: 'C.C.Q., art. 199.1' }],
        },
        {
          text: '**Adopt the child** through special consent, if it is in their interest.',
          refs: [{ label: 'C.C.Q., art. 555' }],
        },
      ],
    },
    {
      id: 'adoptees',
      who: 'Adopted people',
      icon: 'key',
      items: [
        {
          text: '**Know your origins**, to the extent provided by law.',
          refs: [{ label: 'Charter, s. 39.1' }],
        },
        {
          text: 'Get **a summary of your background**: health, family history, the context of your adoption.',
          refs: [{ label: 'C.C.Q., art. 583' }],
        },
        {
          text: '**Learn the names** of your birth parents, unless a refusal is still in effect.',
          refs: [{ label: 'C.C.Q., art. 583' }, { label: 'C.C.Q., art. 583.4' }],
        },
        {
          text: 'Get **a copy of your original act of birth**.',
          refs: [{ label: 'C.C.Q., art. 583' }],
        },
        {
          text: '**Refuse all contact**, or allow it on your own terms, at any time.',
          refs: [{ label: 'C.C.Q., art. 583.6' }],
        },
      ],
    },
  ],
}
