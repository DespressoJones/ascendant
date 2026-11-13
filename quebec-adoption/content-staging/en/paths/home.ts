// Researched content — verified 2026-11-13
import type { Journey, LegalRef } from '../../../src/content/types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/CCQ-1991'
const YPA = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/P-34.1'
const anchor = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: CCQ + anchor(a) })
const ypa = (s: string): LegalRef => ({ label: `YPA, s. ${s}`, url: YPA + anchor(s) })

/* Québec.ca publishes the regional DPJ numbers in French only */
const DPJ_CONTACTS =
  'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj'

export const home: Journey = {
  id: 'home',
  icon: 'home',
  label: 'At home',
  tagline: 'The DPJ is concerned about a child in your family.',
  scenarios: [
    /* ---------------------------------------------------------------- parents */
    {
      id: 'report',
      label: 'A report to the DPJ',
      forWho:
        'For parents, and for family and friends who want to understand what happens after a report to the DPJ (Director of Youth Protection).',
      steps: [
        {
          id: 'report',
          when: 'Day 0',
          title: 'The report',
          body: 'Anyone can report a situation to the DPJ, 24 hours a day, 7 days a week. Some people must report as part of their work, for example teachers, daycare staff, health and social services staff, and police officers. The identity of the person who reports stays confidential.',
          who: ['Person who reports', 'DPJ'],
          details: [
            'If someone is in immediate danger, call 911.',
            `Each region has its own number: see the [regional DPJ numbers](${DPJ_CONTACTS}) on Québec.ca (in French).`,
            'Everyone must report sexual or physical abuse.',
            'A person who reports in good faith cannot be sued.',
            'The DPJ tells the person who reported whether the report was retained.',
          ],
          refs: [ypa('39'), ypa('43'), ypa('44')],
          sources: ['paths-hospital-home-report-duty', 'paths-hospital-home-report-privacy', 'paths-hospital-home-dpj-contacts'],
        },
        {
          id: 'screening',
          when: 'Depending on urgency',
          title: 'Is the report retained?',
          body: 'The DPJ does a first analysis and may check some facts with people around the child. It then decides whether to retain the report for an evaluation. If not, its intervention ends.',
          who: ['DPJ (intake and processing of reports)'],
          details: [
            'In 2025–2026, fewer than one in three reports (27.5%) were retained for an evaluation.',
            'Even if the report is not retained, the DPJ must tell you about help available and, if you wish, put you in touch with it.',
          ],
          refs: [ypa('45'), ypa('45.1')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-dpj-bilan-2026'],
        },
        {
          id: 'urgent',
          when: '≤ 48 hours',
          title: 'Only in an emergency',
          body: 'If the child needs urgent protection, the DPJ can take immediate measures: for example, entrusting the child to a relative or a foster family, or limiting some contact. These measures last 48 hours at most.',
          who: ['DPJ', 'A relative or a foster family'],
          rights: ['Give your opinion on the possible solutions: the DPJ must seek your participation.'],
          details: [
            'Parents cannot stop these measures during the 48 hours.',
            'The provisional agreement can be extended only once, for up to 30 days.',
            'If you object to extending them, the court can extend the emergency measures for up to 5 working days.',
          ],
          watch:
            'After 48 hours, a provisional agreement of up to 30 days is possible if you agree (and your child, if 14 or older). Otherwise, the DPJ must go to court.',
          refs: [ypa('46'), ypa('47'), ypa('47.1')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-educaloi-dpj', 'paths-hospital-home-bill99'],
        },
        {
          id: 'eval',
          when: 'After a report is retained',
          title: 'The evaluation',
          body: 'A worker meets with your child, with you and sometimes with the school or relatives. The DPJ then decides whether your child’s security or development is in danger.',
          who: ['DPJ worker', 'You', 'Your child'],
          rights: [
            'Get clear explanations about each step and the measures proposed.',
            'Have your point of view heard.',
            'Bring a person of your choice to meetings.',
            'Consult a lawyer.',
          ],
          details: [
            'The DPJ considers how serious and long-lasting the facts are, the child’s age, your ability and willingness to fix the situation, and the help around you.',
            'Prepare your questions and write down the dates and the names of the people you meet.',
            'Your child also has the right to be heard, with explanations suited to their age.',
            'If your child’s security is not in danger, the file is closed and the DPJ refers you to help.',
          ],
          refs: [ypa('38'), ypa('38.2'), ypa('6.1'), ypa('6.2')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill15'],
        },
        {
          id: 'orientation',
          milestone: true,
          when: 'If security is in danger',
          title: 'An agreement, or the court',
          body: 'The DPJ chooses between a **short-term intervention agreement** (60 days at most, with no placement), an **agreement on voluntary measures** (12 months at most) or the court. To sign an agreement, you must agree with the DPJ’s decision and with the proposed measures, and so must your child if 14 or older.',
          who: ['DPJ', 'You', 'Your child (if 14 or older)'],
          rights: ['Refuse an agreement: the court will then decide.', 'Get advice from a lawyer before you sign.'],
          watch:
            'An agreement on voluntary measures must be reached within 10 days after it is proposed; otherwise, the DPJ goes to court. Back-to-back agreements cannot exceed 3 years in total.',
          details: [
            'The agreement is in writing. It describes the situation, the measures and how long they last.',
            'If the agreement is respected, the court does not need to get involved.',
            'In some judicial districts of Capitale-Nationale, Chaudière-Appalaches, Montérégie, Estrie, Laurentides and Lanaudière, free youth protection mediation may be offered if everyone consents.',
          ],
          refs: [ypa('51.1'), ypa('51.3'), ypa('52'), ypa('53')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'paths-hospital-home-pj-mediation'],
        },
        {
          id: 'court',
          when: 'If there is disagreement',
          title: 'Before the Unified Family Tribunal',
          body: 'Since June 30, 2025, youth protection cases are heard by the Unified Family Tribunal of the Court of Québec. The judge hears the parties, including you and your child, then decides whether the child’s security is in danger, which measures apply and for how long.',
          who: ['Judge', 'DPJ', 'Your lawyer', 'Your child’s lawyer'],
          rights: [
            'Have a lawyer (legal aid depending on your financial situation).',
            'Have your child represented by their own lawyer; legal aid is free for minors.',
            'Receive the application at least 10 days before the hearing.',
            'Appeal to the Superior Court within 30 days of the written decision.',
          ],
          details: [
            'Some official pages still refer to the “Youth Division” (Chambre de la jeunesse): these cases now belong to the Unified Family Tribunal.',
            'An agreement can be presented to the judge at any point in the case.',
            'The person or foster family the child lives with can attend the hearing and testify.',
          ],
          refs: [ypa('76'), ypa('76.3'), ypa('78'), ypa('83'), ypa('91'), ypa('100'), ypa('103')],
          sources: ['qc-tuf', 'qc-dpj-steps', 'paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'paths-hospital-home-csj-eligibility'],
        },
        {
          id: 'measures',
          when: 'During follow-up',
          title: 'Help and the intervention plan',
          body: 'A worker meets with you regularly. Together with you and your child, they prepare an **intervention plan**: needs, goals, means and how long services will last. You get a copy.',
          who: ['DPJ worker', 'CLSC', 'Community organizations'],
          rights: [
            'Take an active part in decisions and in the choice of measures.',
            'Receive services suited to your needs, with the intensity required.',
            'See your child’s file, with some exceptions.',
          ],
          details: [
            'If other resources are helping you, an individualized service plan is added.',
            'You remain the people first responsible for your child: your opinion and your involvement matter.',
            'In the two years before the child turns 18, the DPJ prepares a plan with them for the transition to adulthood.',
          ],
          refs: [ypa('4.3'), ypa('8'), ypa('57.2.2')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill15'],
        },
        {
          id: 'placement',
          when: 'If the child cannot stay home',
          title: 'Where your child can live',
          body: 'First, staying home with help, if that is in the child’s interest. If not, the child is entrusted first to the people who matter most to them, such as grandparents. Failing that, the child goes to a foster family or, depending on their needs, another resource.',
          who: ['Relative or kinship foster family', 'Foster family', 'DPJ'],
          rights: [
            'Your child has the right to communicate with you, unless the court decides otherwise.',
            'Have your involvement as a parent encouraged, if that is in the child’s interest.',
          ],
          details: [
            'In 2025–2026, 52.1% of children taken in charge by the DPJ stayed in their family, and 18.3% were entrusted to significant people.',
            'Brothers and sisters live together when possible and in their interest.',
            'The setting chosen should be close by and take the child’s culture into account.',
            'Indigenous children have their own order of priority, which favours their extended family and their community.',
          ],
          refs: [ypa('4'), ypa('4.1'), ypa('4.2'), ypa('4.4'), ypa('9'), ypa('9.1'), ypa('131.5')],
          sources: ['paths-hospital-home-bill15', 'paths-hospital-home-bill99', 'qc-dpj-steps', 'paths-hospital-home-dpj-bilan-2026'],
        },
        {
          id: 'review',
          when: 'Regularly',
          title: 'Reviewing the situation',
          body: 'The DPJ regularly reviews the situation with you, whether or not the child is in care. It can then end its intervention, change the measures, propose a new agreement or go to court.',
          who: ['DPJ', 'You', 'Your child'],
          details: [
            'At each review, the DPJ must first check that everything is being done for the child to return home.',
            'The intervention ends when security is no longer in danger, when a tutor is appointed, when the child is adopted, or when the child turns 18.',
            'At the end, the DPJ can put you in touch with help resources, if you wish.',
          ],
          refs: [ypa('57')],
          sources: ['qc-dpj-steps'],
        },
        {
          id: 'clock',
          when: 'Max. 12 to 24 months by age',
          title: 'Maximum placement periods',
          body: 'The total time a child can spend outside the family is limited by age: **12 months** under 2, **18 months** from 2 to 5, and **24 months** from age 6. After that, if the child cannot come home safely, the court must ensure a permanent plan for the child.',
          watch:
            'The court can go beyond these periods if a return home is expected soon or for serious reasons, for example if services that were planned were not provided to you.',
          details: [
            'All placements linked to the same situation are added together, including time with a relative.',
            'For a court order, the child’s age on the day the order is made is what counts.',
            'For an Indigenous child, these periods do not apply if a family council has been formed.',
          ],
          refs: [ypa('53.0.1'), ypa('91.1'), ypa('131.12')],
          sources: ['paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'paths-hospital-home-cdpdj-stability'],
        },
        {
          id: 'permanency',
          milestone: true,
          when: 'When time is up',
          title: 'A permanent plan for life',
          body: 'The first plan is always a return home. If that is not possible, another stable solution is chosen: placement until age 18 with a relative or a foster family, tutorship, or adoption.',
          who: ['Unified Family Tribunal (Court of Québec)', 'DPJ', 'You'],
          details: [
            '**Tutorship**: at the DPJ’s request, the court appoints a person, often the one caring for the child, to exercise parental authority. You remain the child’s legal parents, and tutorship ends at 18.',
            'When the person the child lives with becomes the child’s tutor, the DPJ ends its intervention.',
            '**Adoption**: without your consent, it requires a judgment declaring the child eligible for adoption. You can contest that application in court.',
          ],
          refs: [ypa('70.1'), ypa('70.2'), ccq('207'), ccq('559')],
          sources: ['paths-hospital-home-cdpdj-stability', 'qc-dpj-steps', 'ccq-book1', 'ccq-book2'],
        },
      ],
      outro:
        'If something seems unfair, you can file a complaint with the service quality and complaints commissioner of your institution. If your child’s rights are not respected, you can also turn to the Commission des droits de la personne et des droits de la jeunesse (CDPDJ, Québec’s human rights and youth rights commission). You are not alone: see the Help section, further down.',
    },

    /* ---------------------------------------------------------------- relatives */
    {
      id: 'kin',
      label: 'I’m asked to take in the child',
      forWho:
        'For grandparents, aunts, uncles and other people close to a child whom the DPJ (Director of Youth Protection) may place with them.',
      steps: [
        {
          id: 'priority',
          when: 'From the start',
          title: 'The law looks to family first',
          body: 'When a child cannot stay with their parents, the law requires that they be entrusted first to the people who matter most to them, especially grandparents and extended family. You can tell the worker that you are available.',
          who: ['DPJ', 'You', 'The child’s parents'],
          details: [
            'A significant bond is a relationship that already has affection, stability and continuity: extended family, a godparent, a neighbour, a close family friend…',
            'Even in an emergency, in the first 48 hours, the DPJ can entrust the child to a significant person.',
            'Indigenous children have their own order of priority: extended family, then community, then nation.',
          ],
          refs: [ypa('4'), ypa('46'), ypa('131.5')],
          sources: ['paths-hospital-home-bill15', 'paths-hospital-home-msss-rtf', 'qc-dpj-steps'],
        },
        {
          id: 'evaluation',
          when: 'When the child is placed',
          title: 'Assessing your home',
          body: 'The DPJ assesses your willingness and ability to care for the child, taking into account the bond between you. If the assessment is positive, you generally become a **kinship foster family**.',
          who: ['DPJ worker', 'You'],
          details: [
            'Ask your questions openly: schedule, housing, support, contact with the parents.',
            'Think about your limits too: saying no, or not right now, is allowed.',
          ],
          sources: ['qc-dpj-steps', 'paths-hospital-home-msss-rtf'],
        },
        {
          id: 'agreement',
          when: 'For the length of the placement',
          title: 'An agreement for this child',
          body: 'As a kinship foster family, you sign an agreement with the Santé Québec institution in your region, for this specific child. Like other foster families, you receive a payment and support, as set out in that agreement.',
          who: ['You', 'Santé Québec institution (CISSS/CIUSSS)'],
          details: [
            'Foster families receive a monthly payment for each child. Some expenses can be reimbursed, with the institution’s approval.',
            'Foster families are represented by an association, which also offers peer support.',
            'If you take in the child without becoming a kinship foster family, ask the worker what support is available.',
          ],
          watch: 'The agreement ends when the child leaves your home for good. To take in other children, you would need a new assessment.',
          sources: ['paths-hospital-home-msss-rtf', 'paths-hospital-home-foster-steps', 'paths-hospital-home-msss-projet-de-vie'],
        },
        {
          id: 'daily',
          when: 'During the placement',
          title: 'Daily life, with the parents still in the picture',
          body: 'The child’s contact with their parents, brothers and sisters and the people who matter to them is encouraged, if it is in the child’s interest. Meanwhile, the DPJ works with the parents toward a return home, while preparing another long-term plan.',
          who: ['You', 'The child', 'The child’s parents', 'DPJ'],
          rights: [
            'Attend the hearings about the child you care for.',
            'Testify and make your observations to the court, with a lawyer if you wish.',
          ],
          details: [
            'The DPJ must tell you the date of the hearings.',
            'Before a child moves to a new home, the child must be prepared, and the current home must be consulted, unless that goes against the child’s interest.',
          ],
          refs: [ypa('9.1'), ypa('4.2'), ypa('83'), ypa('7')],
          sources: ['paths-hospital-home-bill15', 'paths-hospital-home-bill99'],
        },
        {
          id: 'clock',
          when: 'Max. 12 to 24 months by age',
          title: 'Time matters for the child',
          body: 'The maximum placement periods also apply when the child lives with you: 12 months under 2, 18 months from 2 to 5, 24 months from age 6. After that, if a return to the parents is not possible, the court must ensure a permanent plan for the child.',
          refs: [ypa('91.1')],
          sources: ['paths-hospital-home-bill99', 'paths-hospital-home-cdpdj-stability'],
        },
        {
          id: 'permanency',
          milestone: true,
          when: 'If a return is not possible',
          title: 'Staying for good: your options',
          body: 'The child can stay with you for good through placement until age 18, tutorship or adoption. Each option has different effects on the child’s ties with their parents.',
          who: ['Unified Family Tribunal (Court of Québec)', 'DPJ', 'You'],
          details: [
            '**Tutorship (YPA)**: the DPJ can ask the court to appoint you as tutor. You exercise parental authority, the parents remain the parents, and the DPJ ends its intervention.',
            '**Financial assistance**: if the child was entrusted to you for at least 6 months in a row before the tutorship judgment, you may qualify. Apply within 60 days after the judgment.',
            '**Suppletive tutorship**: a parent can also designate you, with the court’s authorization, to take on or share their role (grandparent, aunt, uncle, adult brother or sister, or a member of the foster family).',
            '**Adoption**: the parents can consent to your adopting the child if you are the child’s grandparent, brother, sister, aunt, uncle, or the spouse of one of these people (de facto spouses must have lived together for at least 3 years). Otherwise, in certain situations set out in the law, you can ask the court to declare the child eligible for adoption.',
          ],
          refs: [ypa('70.1'), ypa('70.2'), ccq('199.1'), ccq('555'), ccq('559'), ccq('560')],
          sources: ['paths-hospital-home-tutorship-aid', 'paths-hospital-home-cdpdj-stability', 'ccq-book1', 'ccq-book2'],
        },
      ],
      outro: 'The “Within the family” path compares suppletive tutorship and adoption by a relative in more detail.',
    },
  ],
}
