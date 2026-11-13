// Researched content — verified 2026-11-13
import type { Journey, LegalRef } from '../../types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const charter = (a: string): LegalRef => ({ label: `Québec Charter, s. ${a}`, url: `${LQ}C-12${se(a)}` })

const S = 'paths-abroad-after-shell-'
const CONTACTS =
  'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles'

export const after: Journey = {
  id: 'after',
  icon: 'compass',
  label: 'After adoption',
  tagline: 'You were adopted, placed a child, or adopted one.',
  scenarios: [
    /* ------------------------------------------------------------ adoptee */
    {
      id: 'origins',
      label: 'I was adopted',
      forWho: 'For adoptees who want to know their story, learn their birth parents’ names, or find them.',
      steps: [
        {
          id: 'start',
          when: 'At your own pace',
          title: 'Decide what you are looking for',
          body: 'Your story, names, contact: you can ask for one, another or all of them. Take time to think about what you hope for, and surround yourself with people you trust.',
          details: [
            'From age 14, you can apply on your own. Under 14, you need the agreement of your adoptive parents or your tutor.',
            'These rights also apply to a person who was eligible for adoption but was never adopted.',
            'If an adoptee has died, their children aged 14 or older can obtain the same information and documents.',
            'Québec’s Charter of human rights and freedoms recognizes everyone’s right to know their origins, to the extent provided by law.',
          ],
          refs: [ccq('583'), ccq('583.0.1'), ccq('584.1'), charter('39.1')],
          sources: [`${S}qc-origins-services`, `${S}qc-origins-bill2`, `${S}charter`, 'ccq-book2'],
        },
        {
          id: 'where',
          when: 'To begin',
          title: 'Find the right service',
          body: 'You and your adoptive parents lived in Québec at the time of the adoption: contact the origins and reunion service (antécédents sociobiologiques et retrouvailles) in the region of the adoption. You or your adoptive parents lived outside Québec (abroad or in another province): contact the SASIE.',
          who: ['Origins and reunion service (CISSS/CIUSSS)', 'SASIE'],
          details: [
            `Find yours in the [list of services by region](${CONTACTS}) (in French).`,
            'Not sure which region? Contact the service in your own region: it will redirect you.',
            'On Québec.ca, these services are now listed as “Santé Québec” followed by the region’s name.',
            'SASIE (Québec’s international adoption authority), origins searches: 1 833 453-0521 (toll-free) or rasri@msss.gouv.qc.ca.',
            'The SASIE works with the authorities of other countries and provinces to find people.',
          ],
          sources: [`${S}qc-origins-contacts`, `${S}qc-origins-services`, `${S}msss-origins-intl`],
        },
        {
          id: 'apply',
          when: 'Your request',
          title: 'Send your request',
          body: 'Fill in the request form and attach photocopies of two official pieces of ID, at least one with a photo and signature. Send it all by email, by mail or in person.',
          who: ['You', 'Origins and reunion service'],
          details: [
            'Under 14: attach written permission from your adoptive parents or your tutor.',
            'Have you already received services since June 16, 2018? There is a simplified form.',
            'In practice, the service sends an acknowledgment within 10 days.',
            'Requests are handled in order of arrival, with priorities, for example: health reasons, age 70 or older, a wait of more than 12 months, a minor adoptee.',
            'No official waiting time is published: ask the service what to expect.',
            'Québec.ca mentions no fee for this service. Confirm with the service.',
          ],
          sources: [`${S}msss-origins-form`, 'msss-origins-guide', `${S}qc-origins-bill2`],
        },
        {
          id: 'summary',
          when: 'First answer',
          title: 'Receive the summary of your story',
          body: 'The service gives you a **summary of your family and medical background** (sommaire des antécédents sociobiologiques), taken from your adoption file. The full file itself stays confidential.',
          details: [
            'The date, time and place of your birth, and medical information about you at birth and about your birth parents.',
            'The circumstances of your adoption.',
            'A profile of your birth parents, for example: age, language, ethnic origin, education, occupation, lifestyle.',
            'Your original name, if it does not reveal the identity of a parent protected by a refusal.',
            'Sometimes, information about your birth siblings and grandparents.',
          ],
          refs: [ccq('582')],
          sources: [`${S}qc-origins-services`],
        },
        {
          id: 'names',
          milestone: true,
          when: 'Rules since June 2024',
          title: 'Learn your birth parents’ names',
          body: 'You have the right to know your birth parents’ names, even if one of them was not entered on your original act of birth. The main exception is a **refusal to disclose identity** (identity veto) that is still valid.',
          details: [
            'Since June 8, 2024, a birth parent can register this refusal only within 30 days after the birth.',
            'All such refusals, even those registered before June 8, 2024, end on your 18th birthday, or one year after the parent’s death.',
            'You can also learn the names of your adult birth siblings and of your birth grandparents, unless this would reveal a parent protected by a refusal.',
            'Adoption outside Québec: the law of the country of origin also counts. If it forbids revealing a name, the SASIE cannot give it.',
            'A parent who is not in the archives, or who was found only through a DNA test, cannot be searched for by the service.',
          ],
          rights: [
            'Obtain your birth parents’ names, unless a refusal is still valid.',
            'Obtain the information to reach them, if they agree to contact.',
          ],
          refs: [ccq('583'), ccq('583.4'), ccq('583.9'), ccq('583.10'), ccq('583.12')],
          sources: ['ccq-book2', `${S}qc-origins-services`, `${S}qc-origins-bill2`, `${S}bill2`],
        },
        {
          id: 'contact',
          when: 'Before anything is revealed',
          title: 'Contact: everyone chooses',
          body: 'Before revealing a person’s identity, the service tells them about your request. They can accept contact, accept it on their own conditions, or refuse it.',
          details: [
            'In practice, the person has about one month to think it over. If they do not answer, their silence is treated as a contact veto.',
            'If they cannot be found or cannot express their wishes, a contact veto applies automatically.',
            'A contact veto does not, on its own, stop you from learning a name: you are given it on condition that you respect the veto.',
            'You can also register a contact veto, at any time before your identity is revealed.',
            'Was your identity request made more than 12 months ago? You can ask, once a year, whether the person you are looking for has died.',
          ],
          watch:
            'If you are given a name on condition that you respect a contact veto, respect it. Otherwise, you are liable and could have to pay damages, including punitive damages.',
          refs: [ccq('583.2'), ccq('583.6'), ccq('583.7')],
          sources: [`${S}qc-origins-services`, 'msss-origins-guide', 'ccq-book2'],
        },
        {
          id: 'reunion',
          milestone: true,
          when: 'If everyone agrees',
          title: 'A supported reunion',
          body: 'A worker can act as a go-between, prepare the meeting with you and support you afterwards. Reunions can happen at a distance or in person.',
          who: ['Worker', 'You', 'The person you found'],
          details: [
            'The service also supports you if the person cannot be found or a reunion is not possible.',
            'Mouvement Retrouvailles offers volunteer support: 1 888 646-1060.',
            'Other organizations can help, such as RAIS-Ressource Adoption, or L’Hybridé for people adopted from abroad.',
          ],
          rights: ['Be supported before, during and after the reunion.', 'Be supported if the search does not succeed.'],
          sources: [`${S}qc-origins-services`, `${S}educaloi-origins`, `${S}msss-origins-national`],
        },
        {
          id: 'documents',
          when: 'If you need it',
          title: 'Get your original act of birth',
          body: 'You can get a copy of your original (“primitif”) act of birth and of the judgments about your adoption. First, ask the origins service or the SASIE for an attestation.',
          who: ['Origins service or SASIE', 'Directeur de l’état civil', 'Court office'],
          details: [
            'Born in Québec: mail the Directeur de l’état civil (Québec’s registrar of civil status) the form “Demande de copie d’acte de naissance primitif”, with a photocopy of the attestation.',
            'Cost: $64.25, payable in Canadian dollars.',
            'The judgments: ask the court office of the district that issued them.',
            'If a contact veto applies, any passages that would let you reach the person are removed or blacked out.',
            'This right has existed since June 8, 2024.',
          ],
          refs: [ccq('583'), ccq('149')],
          sources: [`${S}dec-original-act`, `${S}qc-origins-services`, 'ccq-book1'],
        },
        {
          id: 'health',
          when: 'If needed',
          title: 'Information for your health',
          body: 'If your health warrants it, your doctor can obtain the medical information needed about your birth parents. Their consent or the court’s authorization is required, and anonymity is preserved.',
          who: ['Your doctor', 'Origins and reunion service'],
          details: [
            'Your doctor sends a request, with a letter, to the origins service.',
            'This also applies to the health of a birth parent or of a genetically related relative.',
            'A health reason can make a request a priority.',
          ],
          refs: [ccq('584')],
          sources: ['msss-origins-guide', 'ccq-book2'],
        },
      ],
      outro:
        'Searching for your origins stirs up many emotions. You can pause, stop or start again whenever you want. Info-Social 811 (option 2) answers 24 hours a day.',
    },

    /* ------------------------------------------------------------ birth parent */
    {
      id: 'birth-parent',
      label: 'I placed a child for adoption',
      forWho:
        'For birth parents, however much time has passed. Your rights depend mostly on the date of the adoption and your child’s age.',
      steps: [
        {
          id: 'ask',
          when: 'At any time',
          title: 'What you can ask for now',
          body: 'You can ask the origins and reunion service for a summary about the person who adopted your child. The service also helps you register or withdraw a refusal.',
          who: ['Origins and reunion service (CISSS/CIUSSS)', 'SASIE'],
          details: [
            'Contact the service in the region where the adoption took place. If your child was adopted by parents who lived outside Québec, contact the SASIE (Québec’s international adoption authority).',
            `Find yours in the [list of services by region](${CONTACTS}) (in French).`,
            'Attach photocopies of two official pieces of ID to your form.',
            'Was your child declared eligible for adoption but never adopted? You can receive a summary of the information in their file.',
            'If your health warrants it, your doctor can ask for medical information, anonymously.',
          ],
          refs: [ccq('584'), ccq('584.1')],
          sources: [`${S}qc-origins-services`, `${S}qc-origins-contacts`, 'msss-origins-guide'],
        },
        {
          id: 'identity-veto',
          when: '≤ 30 days after the birth',
          title: 'The refusal to disclose your identity',
          body: 'This refusal (an identity veto) stops your name from being given to your child. Since June 8, 2024, it must be registered within 30 days after the birth, and it ends on your child’s 18th birthday.',
          details: [
            'After those 30 days, it is no longer possible to register one.',
            'Refusals registered before June 8, 2024 also end on your child’s 18th birthday.',
            'If you die before then, the refusal ends on the first anniversary of your death.',
            'You can withdraw your refusal at any time.',
            'At the first request about you, the service tells you, so that you can keep or withdraw your refusal.',
          ],
          watch:
            'This refusal protects only your identity, and only until your child turns 18. To decide whether there will be contact, the **contact veto** is what counts.',
          refs: [ccq('583.4'), ccq('583.9')],
          sources: [`${S}qc-origins-services`, `${S}bill2`, 'ccq-book2'],
        },
        {
          id: 'contact-veto',
          when: 'At any time',
          title: 'The contact veto',
          body: 'You can register a contact veto at any time before your identity is revealed. It can prevent all contact, or allow contact on conditions you set.',
          details: [
            'It can also cover your adopted child’s own children.',
            'The law sets no end date for it. You can withdraw it at any time.',
            'On its own, it does not stop your child from learning your name. But whoever gets your name must respect your veto.',
            'There is a form to register or withdraw it. The service can help you fill it in.',
          ],
          refs: [ccq('583.6'), ccq('583.2'), ccq('583.9')],
          sources: [`${S}qc-origins-services`, 'ccq-book2'],
        },
        {
          id: 'adult',
          milestone: true,
          when: 'When your child turns 18',
          title: 'When your child becomes an adult',
          body: 'You can then ask for the name your child was given and the information to reach them. Before anything is shared, the service tells your child and offers them the chance to register a contact veto.',
          details: [
            '**Adoption before June 16, 2018**: your child’s identity is protected by law, unless they agree to it being revealed to you. If they cannot be found, it stays protected.',
            '**Adoption since June 16, 2018**: you have the right to their name, but they can refuse contact or allow it on their own conditions.',
            'Your other children and your parents can also apply: they are given the name only if the adoptee consents.',
            'Adoption outside Québec: the person sought must agree, unless the law of their country of origin says otherwise.',
          ],
          refs: [ccq('583'), ccq('583.5'), ccq('583.7'), ccq('583.8'), ccq('583.10'), ccq('583.12')],
          sources: [`${S}qc-origins-services`, 'msss-origins-guide', 'ccq-book2'],
        },
        {
          id: 'contacted',
          when: 'If the service reaches you',
          title: 'If someone is looking for you',
          body: 'If your child makes a request about you, the service tells you before revealing your identity. You can accept contact, accept it on your own conditions, or refuse it.',
          who: ['Origins and reunion service', 'You'],
          details: [
            'In practice, you have about one month to think it over. If you do not answer, your silence is treated as a contact veto.',
            'You can change your mind later and withdraw that veto.',
            'If everyone agrees, a worker prepares and supports the reunion.',
          ],
          rights: [
            'Be told before your identity is revealed.',
            'Choose whether there will be contact, and on what conditions.',
            'Be supported before, during and after the reunion.',
          ],
          refs: [ccq('583.7')],
          sources: [`${S}qc-origins-services`, 'msss-origins-guide'],
        },
        {
          id: 'agreement',
          when: 'Before or after the adoption',
          title: 'Staying in touch: the communication agreement',
          body: 'With the adoptive parent, you can agree in writing to exchange news or keep in contact, if it is in the child’s interest. A photo once a year, a letter: there is no single formula.',
          who: ['You', 'Adoptive parents', 'DPJ or family mediation'],
          details: [
            'Before the placement order, ask the DPJ (Director of Youth Protection) for support. After it, family mediation is free: up to 5 hours to reach an agreement, and 2.5 hours to review it.',
            'From age 10, the child must consent. From age 14, they can end it without formalities.',
            'If there is disagreement, the court can set exchanges or contact with a birth parent or grandparent who matters to the child, if it is in the child’s interest.',
            'These agreements apply when a child domiciled in Québec is adopted by Québec parents.',
          ],
          refs: [ccq('579'), ypa('71.3.4')],
          sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, 'ccq-book2'],
        },
      ],
      outro:
        'There is no single right way to live with an adoption. If you need to talk, Info-Social 811 (option 2) answers 24 hours a day, and Mouvement Retrouvailles also welcomes birth parents.',
    },

    /* ------------------------------------------------------------ adoptive parents */
    {
      id: 'adoptive',
      label: 'We adopted',
      forWho:
        'For adoptive parents: finding support, telling the child their story and keeping a tie with their birth family.',
      steps: [
        {
          id: 'support',
          when: 'From the arrival',
          title: 'Support after the adoption',
          body: 'Like every family, yours has access to the services of your region’s CISSS or CIUSSS: child development, adjustment, physical and mental health. Follow-up can be for the family, the parents or one person.',
          who: ['Your region’s CISSS or CIUSSS', 'DPJ', 'Community organizations'],
          details: [
            'Adoption in Québec: from the placement, the DPJ (Director of Youth Protection) schedules follow-up meetings, based on the needs of the child and the family.',
            'Adoption abroad: a visit within 14 days of the arrival, and a consultation with a doctor who specializes in adoption is strongly recommended.',
            'Info-Social 811 (option 2): free advice, 24 hours a day.',
            'Organizations offer discussion groups, webinars and helplines, such as the Fédération des parents adoptants du Québec or RAIS-Ressource Adoption.',
          ],
          rights: ['Receive health and social services in your region, like any family.'],
          sources: [`${S}qc-post-adoption`, `${S}info-social`, `${S}msss-origins-national`],
        },
        {
          id: 'telling',
          when: 'Early, and often',
          title: 'Telling your child their story',
          body: 'The law gives you this task: telling your child they were adopted. You must also explain the rules about disclosing identity and about contact.',
          details: [
            'Use simple words that suit their age, and come back to it over the years.',
            'Keep the documents, photos and objects linked to their story.',
            'You can ask for a **summary of their background**: until age 14 for an adoption in Québec, with no age limit for an adoption abroad or from another province.',
          ],
          refs: [ccq('583.11')],
          sources: [`${S}qc-origins-services`, 'ccq-book2'],
        },
        {
          id: 'agreement',
          when: 'Before or after the judgment',
          title: 'The communication agreement',
          body: 'If it is in the child’s interest, you can agree in writing with members of their birth family to exchange news or keep in contact. A photo once a year, a letter, a call: any suitable means works, and no one has to meet in person.',
          who: ['You', 'Birth family', 'DPJ or family mediation'],
          details: [
            'You sign the agreement as the child’s tutor. From age 14, the child agrees to it themselves.',
            'It can include parents, grandparents, brothers and sisters or other members of the birth family.',
            'The court does not need to approve it.',
            'Before the placement order, the DPJ offers support. After it, family mediation is free: up to 5 hours to reach an agreement, and up to 2.5 hours to review it or settle a disagreement.',
            'If only exchanges of news are planned, the DPJ facilitates them on request, until the child turns 18.',
            'This rule covers the adoption of a child domiciled in Québec by Québec parents.',
          ],
          refs: [ccq('579'), ypa('71.3.4')],
          sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, 'educaloi-adopt', `${S}bill2`],
        },
        {
          id: 'child-voice',
          when: 'From 10, then 14',
          title: 'The child’s voice',
          body: 'From age 10, the child must consent to exchanges or contact, unless they cannot express their wishes. From 14, their agreement is always required, and they can end it without formalities, even if the court ordered it.',
          refs: [ccq('579')],
          sources: [`${S}qc-contact-agreement`, 'ccq-book2'],
        },
        {
          id: 'court',
          milestone: true,
          when: 'If there is disagreement',
          title: 'The court can decide',
          body: 'If a child aged 10 to 13 refuses, or if the adults cannot agree, the court can decide on exchanges or contact. It does so only with a birth parent or grandparent who matters to the child, and only if it is in the child’s interest.',
          details: ['Free family mediation can also help settle a disagreement.'],
          refs: [ccq('579')],
          sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, 'ccq-book2'],
        },
        {
          id: 'growing-up',
          when: 'From 14, then at 18',
          title: 'As your child grows up',
          body: 'From age 14, your child can ask for information about their origins on their own. Before 14, they can do so with your agreement.',
          details: [
            'They will be able to learn their birth parents’ names by age 18 at the latest: identity refusals end at that age.',
            'Adoption in Québec since June 16, 2018: their birth parents will be able to ask for their name once they turn 18. Your child will be told first and can refuse contact.',
            'Adoption before June 16, 2018: their identity stays protected, unless they agree to it being revealed.',
            'Adoption outside Québec: the law of the country of origin also counts. Their name is revealed only with their agreement, unless that law says otherwise.',
            'Their birth siblings and grandparents can get their name only with their agreement.',
          ],
          refs: [ccq('583'), ccq('583.4'), ccq('583.5'), ccq('583.10'), ccq('583.12')],
          sources: [`${S}qc-origins-services`, 'ccq-book2'],
        },
      ],
      outro:
        'A story told gently, and ties chosen with care, help a child build themselves. You do not have to know everything: you can ask for help.',
    },
  ],
}
