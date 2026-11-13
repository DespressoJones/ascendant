// Researched content — verified 2026-11-13
import type { Journey, LegalRef } from '../../../src/content/types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/CCQ-1991'
const YPA = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/P-34.1'
const anchor = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: CCQ + anchor(a) })
const ypa = (s: string): LegalRef => ({ label: `YPA, s. ${s}`, url: YPA + anchor(s) })

export const hospital: Journey = {
  id: 'hospital',
  icon: 'hospital',
  label: 'At the hospital',
  tagline: 'You are expecting a baby or just gave birth, and have questions.',
  scenarios: [
    /* ---------------------------------------------------------------- voluntary consent */
    {
      id: 'considering',
      label: 'I’m considering adoption',
      forWho:
        'For the pregnant person, or the parent who just gave birth, who is thinking about placing their baby for adoption.',
      steps: [
        {
          id: 'talk',
          when: 'During pregnancy or after',
          title: 'Talk it over, with no commitment',
          body: 'You can ask for information from the adoption service in your region (CISSS or CIUSSS). A worker can support you as you think things through. **Asking questions commits you to nothing.**',
          who: ['Adoption service (CISSS/CIUSSS)', 'Info-Social 811', 'CLSC'],
          details: [
            'Info-Social 811, option 2: a professional answers for free and in confidence, 24 hours a day, 365 days a year (except in Nunavik and the Terres-Cries-de-la-Baie-James region).',
            'In Québec, the adoption of a child who lives in Québec is the responsibility of the DPJ (Director of Youth Protection). Its adoption service is the one that gives you information.',
            'In practice, consent to adoption is signed after the birth. Until then, nothing is decided.',
            'You can ask for a person you trust to come with you to your meetings.',
          ],
          sources: ['qc-adoption-about', 'paths-hospital-home-info-social', 'paths-hospital-home-info-social-psy'],
        },
        {
          id: 'options',
          when: 'Before you decide',
          title: 'Explore all your options',
          body: 'Keeping your baby with support, entrusting them to a relative, or consenting to adoption: each option has different effects. Take the time to compare them.',
          who: ['Psychosocial worker', 'The people close to you'],
          details: [
            'The **SIPPE** program at your CLSC helps future and new parents who have financial difficulties and who have no high school or vocational diploma, or who feel isolated or alone. It starts with a home visit.',
            '**Suppletive tutorship**: if you cannot fully carry out your role, the court can let you hand it over to certain relatives (grandparent, aunt, uncle, adult brother or sister…) or share it with them. You remain the child’s parent.',
            '**Special consent**: you can consent to your child’s adoption by a grandparent, a brother, a sister, an aunt, an uncle, the spouse of one of these people, or the spouse of one of the parents (de facto spouses must have lived together for at least 3 years).',
            '**General consent**: you entrust your child to the DPJ, which chooses a family among those it has already assessed.',
          ],
          refs: [ccq('199.1'), ccq('555')],
          sources: ['paths-hospital-home-sippe', 'qc-adoption-about', 'ccq-book1', 'ccq-book2'],
        },
        {
          id: 'birth',
          when: 'Day 0',
          title: 'The birth and the birth declaration',
          body: 'The doctor or midwife fills in the **attestation of birth**, which shows the name of the person who gave birth. The birth must then be declared to the Directeur de l’état civil (Québec’s registrar of civil status) **within 30 days**.',
          details: [
            'Since June 2023, the person who gave birth must declare the child’s filiation (legal parentage) with respect to themselves.',
            'If you are in a couple (married, civil union or de facto union), your spouse is presumed to be the child’s other parent.',
            'A late declaration is still possible, but the Directeur de l’état civil must then carry out a summary investigation.',
          ],
          watch:
            'In Québec, you cannot give birth anonymously: your name goes on the attestation of birth. No Québec law provides for “baby boxes” either. If you are in distress, call Info-Social 811 (free and confidential) or talk to the hospital team: you can get help. If anyone is in danger, call 911.',
          refs: [ccq('111'), ccq('113'), ccq('113.1'), ccq('130'), ccq('525')],
          sources: ['paths-hospital-home-declare-birth', 'ccq-book1', 'ccq-book2'],
        },
        {
          id: 'privacy',
          when: '≤ 30 days after the birth',
          title: 'Protect your identity, if you wish',
          body: 'If you do not want your child to be able to learn who you are before they turn 18, register a **refusal to disclose your identity** within 30 days after the birth. The adoption service explains how.',
          watch:
            'This deadline counts from the **birth**, not from the day you sign the consent. After 30 days, it is too late. In every case, the refusal ends on your child’s 18th birthday.',
          details: [
            'Without this refusal, your child can ask for your name at any age: on their own from age 14, or younger with their adoptive parents’ agreement.',
            'You can also register a **contact veto**, or allow contact on your own conditions, at any time before your identity is disclosed. You must be told before it is disclosed.',
            'You can withdraw a refusal at any time.',
            'Example: if you sign the consent on day 5, you have until day 35 to change your mind, but only until day 30 to refuse disclosure of your identity.',
            'These rules have been in force since June 8, 2024.',
          ],
          refs: [ccq('583'), ccq('583.4'), ccq('583.6'), ccq('583.7'), ccq('583.9'), ypa('71.3.15')],
          sources: ['msss-origins-guide', 'paths-hospital-home-msss-pl2', 'qc-origins'],
        },
        {
          id: 'consent',
          milestone: true,
          when: 'After the birth',
          title: 'Signing the consent to adoption',
          body: 'Consent is given in writing, in front of two witnesses. With a **general consent**, the DPJ receives it and chooses the adoptive family. The Civil Code sets no minimum waiting period after the birth: **nothing requires you to sign at the hospital.**',
          who: ['You', 'The other legal parent, if any', 'Two witnesses', 'DPJ worker'],
          rights: [
            'Get clear information before you sign.',
            'Give free and informed consent, without pressure.',
            'Sign on your own, even if you are under 18.',
          ],
          details: [
            'If your baby’s filiation is established with two parents, both must consent. If it is established only with you, your consent is enough.',
            'You say whether you consent to an adoption **with** or **without** recognition of your bond of filiation, or to either. Recognition puts your name on the new act of birth (never on the birth certificate), but leaves you no rights toward the child.',
            'For a baby who has not lived with you, the DPJ rarely finds recognition to be in the baby’s interest. If you disagree with its view, it cannot accept your consent: talk it over before you sign.',
            'Signing does not make your child adopted yet: a placement order and then a judgment are still needed.',
            'Ask for a copy of what you sign.',
          ],
          refs: [ccq('548'), ccq('551'), ccq('554'), ccq('555'), ccq('544.1'), ccq('568.1')],
          sources: ['qc-adoption-legal', 'educaloi-adopt', 'paths-hospital-home-msss-recognition'],
        },
        {
          id: 'meanwhile',
          when: 'After signing',
          title: 'Who looks after your baby?',
          body: 'With a general consent, the DPJ becomes your baby’s legal tutor until the placement order, and the person your baby is handed over to exercises parental authority. Where your baby lives during this time depends on their situation and the region: the adoption service explains what is planned.',
          details: ['Ask where your baby will be, who will care for them, and how you will be kept informed.'],
          refs: [ccq('199'), ccq('556')],
          sources: ['ccq-book1', 'ccq-book2'],
        },
        {
          id: 'withdraw',
          when: '≤ 30 days after signing',
          title: 'Changing your mind: you have 30 days',
          body: 'For 30 days after you sign, you can withdraw your consent **without giving a reason**. Your child must then be returned to you without formality or delay.',
          rights: ['Withdraw your consent without explaining why.', 'Get your child back without formality or delay.'],
          watch:
            'The withdrawal must be in writing and signed in front of two witnesses, just like the consent. Act before the end of day 30 and tell the adoption service right away.',
          refs: [ccq('557'), ccq('548')],
          sources: ['educaloi-adopt', 'ccq-book2'],
        },
        {
          id: 'restitution',
          when: 'After 30 days, before placement',
          title: 'Asking the court to return your child',
          body: 'After those 30 days, and until the placement order, you can still ask the court to return your child to you. The judge checks whether your consent was valid, and then whether a return is in the child’s interest.',
          who: ['You', 'Your lawyer', 'Unified Family Tribunal (Court of Québec)'],
          rights: [
            'Have a lawyer represent you.',
            'Check whether you qualify for legal aid (free if you are under 18).',
          ],
          watch: 'Act quickly: once the placement order is made, you can no longer ask for your child to be returned.',
          refs: [ccq('558'), ccq('569')],
          sources: ['educaloi-adopt', 'qc-tuf', 'paths-hospital-home-csj-eligibility'],
        },
        {
          id: 'contact',
          when: 'Before the placement order',
          title: 'Keeping a connection, if you wish',
          body: 'You and the adoptive family can agree in writing to share news, such as one photo a year, or to keep in touch, if it is in the child’s interest. Until the placement order, the DPJ supports people who want this kind of agreement.',
          details: [
            'Before it applies for the placement order, the DPJ must explain this option to you, along with the rules on searching for origins and reunions.',
            'From age 10, the child must agree. From age 14, they can end the agreement without any formality.',
            'If people disagree, the court can decide, but only for parents or grandparents of origin who matter to the child.',
            'If the agreement covers only sharing news, the DPJ helps pass it along, at your request, until the child turns 18.',
            'An agreement is possible at any time. After the placement order, the Family Mediation Program can help.',
          ],
          refs: [ccq('579'), ypa('71.3.4')],
          sources: ['paths-hospital-home-communication', 'qc-adoption-about'],
        },
        {
          id: 'placement',
          milestone: true,
          when: 'At least 30 days after consent',
          title: 'The placement order',
          body: 'The court entrusts the child to the family who will adopt them. The adoptive parents then exercise parental authority, and the child can use their new name.',
          who: ['Unified Family Tribunal (Court of Québec)', 'DPJ', 'Adoptive family'],
          details: [
            'Before making the order, the court checks that the conditions for adoption are met and that no one has asked for the child’s return.',
            'From the order on, the adoptive parents can get from the DPJ a summary of the child’s health and social history, without your identity. You can also ask for a summary of the adoptive family’s background.',
          ],
          watch: 'Once this order is made, the child can no longer be returned to you.',
          refs: [ccq('567'), ccq('569'), ypa('71.3.6')],
          sources: ['qc-adoption-legal', 'educaloi-adopt', 'qc-tuf'],
        },
        {
          id: 'judgment',
          milestone: true,
          when: 'Usually 6 months later',
          title: 'The adoption judgment',
          body: 'Once the child has lived with the adoptive family for at least 6 months since the placement order, the court grants the adoption. This period can be shortened by up to 3 months. The adoptive parents become the child’s legal parents, and your rights and obligations toward the child end.',
          who: ['Unified Family Tribunal (Court of Québec)', 'Directeur de l’état civil'],
          details: [
            'The Directeur de l’état civil draws up a new act of birth, which replaces the original one. The replacement is noted on the original act.',
            'Since June 8, 2024, an adopted person can get a copy of their original act of birth and of the adoption judgments.',
          ],
          refs: [ccq('566'), ccq('577.1'), ccq('132'), ccq('583')],
          sources: ['qc-adoption-about', 'ccq-book1', 'ccq-book2'],
        },
      ],
      outro:
        'Later on, your child will be able to search for their origins. And once your child is an adult, you will be able to ask for their name and contact information, while respecting their own choices. Take care of yourself: Info-Social 811 and your CLSC are still there after the adoption.',
    },

    /* ---------------------------------------------------------------- DPJ at birth */
    {
      id: 'dpj',
      label: 'The DPJ is involved at birth',
      forWho: 'For parents whose newborn has been reported to the DPJ (Director of Youth Protection).',
      steps: [
        {
          id: 'prenatal',
          when: 'During pregnancy',
          title: 'No reports before birth',
          body: 'Since 2023, the DPJ can no longer receive reports about an unborn baby. Instead, future parents who are struggling can get preventive, intensive services starting in pregnancy.',
          who: ['CLSC', 'Community organizations', 'Info-Social 811'],
          details: [
            'These services come from the health network and community organizations. Your CLSC can refer you.',
            'The SIPPE program at your CLSC supports some future parents from pregnancy on, starting with a home visit.',
            'Info-Social 811 (option 2) can give you advice and refer you, 24 hours a day.',
          ],
          sources: ['paths-hospital-home-birth-alerts', 'paths-hospital-home-sippe', 'paths-hospital-home-info-social-psy'],
        },
        {
          id: 'report',
          when: 'From birth',
          title: 'A report may be made',
          body: 'From the birth on, hospital staff must report the situation to the DPJ if they have reasonable grounds to believe the baby’s security or development is in danger. **A report is not a decision:** the DPJ must first analyze the situation.',
          who: ['Hospital team', 'DPJ'],
          rights: [
            'Get clear explanations, in words you understand, about what is happening and the measures proposed.',
            'Bring a person of your choice to meetings with the DPJ.',
            'Be treated with courtesy, fairness and respect.',
          ],
          details: [
            'The DPJ first decides whether to retain the report. If it does not, it must tell you about help available and, if you wish, put you in touch with it.',
          ],
          refs: [ypa('38'), ypa('39'), ypa('4.4'), ypa('6.1'), ypa('6.2')],
          sources: ['paths-hospital-home-birth-alerts', 'paths-hospital-home-report-duty', 'qc-dpj-steps'],
        },
        {
          id: 'urgent',
          when: '≤ 48 hours',
          title: 'Immediate protective measures',
          body: 'If your baby needs urgent protection, the DPJ can act right away, even before its evaluation is done: for example, by entrusting your baby to a relative or a foster family, or by limiting contact. These measures last 48 hours at most.',
          who: ['DPJ', 'A relative or a foster family'],
          rights: ['Give your opinion on the possible solutions: the DPJ must seek your participation.'],
          details: ['Tell the worker right away which relatives could take care of your baby.'],
          watch:
            'You cannot stop these measures during the 48 hours. Contact legal aid or a lawyer now: the decisions of the next few days matter.',
          refs: [ypa('46')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-educaloi-dpj'],
        },
        {
          id: 'next',
          milestone: true,
          when: 'After 48 hours',
          title: 'A provisional agreement, or the court',
          body: 'If measures are still needed and you agree, the DPJ can offer you a **provisional agreement** of up to 30 days. If you do not agree, the DPJ must go to court, and the court decides.',
          who: ['DPJ', 'Your lawyer', 'Unified Family Tribunal (Court of Québec)'],
          rights: [
            'Refuse the provisional agreement: a judge will then decide.',
            'Get notice at least one day before a hearing on provisional measures, with the facts and what the DPJ is asking for.',
          ],
          details: [
            'The provisional agreement can be extended only once, for up to 30 days.',
            'If you object to extending them, the court can extend the emergency measures for up to 5 working days.',
            'The court can shorten the one-day notice when the request is about changing where your baby lives.',
            'Since June 30, 2025, these cases are heard by the Unified Family Tribunal of the Court of Québec. Some pages still refer to the “Youth Division” (Chambre de la jeunesse).',
          ],
          refs: [ypa('47'), ypa('47.1'), ypa('76.1'), ypa('76.2')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'qc-tuf'],
        },
        {
          id: 'lawyer',
          when: 'Before the first hearing',
          title: 'A lawyer for you, another for your baby',
          body: 'You have the right to a lawyer. The court must also make sure your baby has their own lawyer, whose only job is to represent your baby.',
          who: ['Your lawyer', 'Your baby’s lawyer', 'Legal aid office'],
          rights: [
            'Have a lawyer, from legal aid or in private practice.',
            'Have your point of view heard by the judge.',
            'Appeal to the Superior Court within 30 days of the written decision.',
          ],
          details: [
            'Depending on your financial situation, legal aid is free or costs a contribution of $100 to $800. People on social assistance or social solidarity benefits automatically qualify financially.',
            'If you are under 18, legal aid is free for you.',
            'Book an appointment with the legal aid office in your region as soon as possible.',
          ],
          refs: [ypa('78'), ypa('100'), ypa('103')],
          sources: ['csj', 'paths-hospital-home-csj-eligibility', 'paths-hospital-home-bill15', 'paths-hospital-home-bill99'],
        },
        {
          id: 'eval',
          when: 'After a report is retained',
          title: 'Evaluating the situation',
          body: 'A DPJ worker meets with you and the people close to you to decide whether your baby’s security or development is in danger. The DPJ looks in particular at your ability and willingness to fix the situation, and at the help available around you.',
          who: ['DPJ worker', 'You', 'The people close to you'],
          details: [
            'Say what you need: housing, support, care, financial help.',
            'Name the people who can support you: family, friends, organizations.',
            'If your baby’s security is not in danger, the file is closed and the DPJ refers you to help.',
            'If it is, the DPJ can offer you an agreement, for example on voluntary measures (12 months at most). Otherwise, or if you do not agree, it goes to court.',
          ],
          refs: [ypa('38.2'), ypa('52'), ypa('53')],
          sources: ['qc-dpj-steps'],
        },
        {
          id: 'family',
          when: 'If your baby cannot stay with you',
          title: 'Extended family first',
          body: 'The law favours keeping your baby with you, if that is in your baby’s interest. If not, your baby must be entrusted first to the people who matter most to them, such as grandparents or other family members. Failing that, your baby goes to the setting closest to a family, such as a foster family.',
          who: ['DPJ', 'Grandparents or other relatives', 'Foster family'],
          rights: [
            'Have your contact with your baby encouraged, if it is in your baby’s interest.',
            'Take part in the decisions and the choice of measures that concern you.',
          ],
          details: [
            'The DPJ assesses your relatives’ willingness and ability. They generally become a **kinship foster family**.',
            'Ask for a written visit plan that also covers how your baby is fed (for example, breastfeeding or breast milk).',
            'If your baby has brothers or sisters in care, the law favours keeping them together, if that is in their interest.',
            'Some babies are placed with a **Banque mixte** foster family that is ready to adopt if a return home becomes impossible. Adoption is only possible if you consent or if the court declares the child eligible for adoption.',
          ],
          refs: [ypa('4'), ypa('4.1'), ypa('4.3'), ypa('9.1')],
          sources: ['paths-hospital-home-bill15', 'qc-dpj-steps', 'qc-adoption-about'],
        },
        {
          id: 'plan',
          when: 'During follow-up',
          title: 'Two plans at the same time',
          body: 'When a baby is removed from the family, the DPJ must plan for the return home and, at the same time, prepare another stable, long-term plan in case a return is not in the baby’s interest. **A return home is always looked at first.**',
          who: ['DPJ worker', 'You', 'CLSC and community organizations'],
          rights: [
            'Take part in the intervention plan and get a copy of it.',
            'Receive services suited to your needs, with the intensity required.',
          ],
          details: [
            'The intervention plan sets out your needs and your baby’s, the goals, the means, and how long services will last.',
            'The DPJ reviews the situation with you regularly.',
            'If promised services are not provided, write it down and tell your lawyer.',
          ],
          refs: [ypa('4.2'), ypa('4.3'), ypa('8')],
          sources: ['paths-hospital-home-bill15', 'qc-dpj-steps'],
        },
        {
          id: 'permanency',
          milestone: true,
          when: 'Max. 12 months in care (under age 2)',
          title: 'A stable plan for life',
          body: 'For a child under 2, the total time in care outside the family cannot exceed 12 months. If your baby still cannot come home safely, the court must then make a decision that ensures stable care and relationships on a permanent basis.',
          watch:
            'In the child’s interest, the court can go beyond this limit if a return home is expected soon or for serious reasons. Services that were planned but not provided to you count as a serious reason.',
          details: [
            'All placements linked to the same situation are added together.',
            'Possible long-term plans: return home, placement until age 18 with a relative or a foster family, tutorship, or adoption.',
            'Without your consent, adoption requires the court to declare the child eligible for adoption. You can contest that application, with your lawyer.',
          ],
          refs: [ypa('91.1'), ypa('53.0.1'), ccq('559')],
          sources: ['paths-hospital-home-cdpdj-stability', 'paths-hospital-home-bill15', 'paths-hospital-home-bill99'],
        },
      ],
      outro:
        'The “At home” path explains what comes next in a DPJ intervention: reviews, maximum placement periods and how a file ends. You are not alone: the Help section, further down, lists resources.',
    },
  ],
}
