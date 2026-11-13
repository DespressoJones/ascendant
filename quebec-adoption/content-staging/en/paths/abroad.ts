// Researched content — verified 2026-11-13
import type { Journey, LegalRef, Step } from '../../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const HCCH = 'https://www.hcch.net/en/instruments/conventions/full-text/?cid=69'
const hague = (a: string): LegalRef => ({ label: `Hague Convention (1993), art. ${a}`, url: HCCH })
const REG_NO_BODY: LegalRef = {
  label: 'CQLR, c. P-34.1, r. 2',
  url: 'https://www.legisquebec.gouv.qc.ca/en/document/cr/P-34.1,%20r.%202',
}

const S = 'paths-abroad-after-shell-'

/* Steps shared by both scenarios (same facts, whichever route brought the child) */

const immigrationDetails = [
  'There are two federal routes, through Immigration, Refugees and Citizenship Canada (IRCC): a direct grant of **citizenship**, if an adoptive parent is a Canadian citizen, or **permanent residence** through sponsorship.',
  'Citizenship route: Québec confirms to the federal government in writing that the adoption meets Québec law.',
  'Permanent-residence route: after the SASIE’s letter of no objection, Québec’s Ministère de l’Immigration et de l’Intégration (MII) invites you to file an undertaking application ($335 per child in 2026). If it accepts, it issues a Québec Selection Certificate (CSQ), then IRCC decides.',
  'Were you yourself born or adopted outside Canada? Special citizenship rules may apply: check with IRCC.',
]
const immigrationWatch =
  'A child who is in Québec can be adopted there only if the child is authorized to remain in Canada permanently. Bringing a child in as a visitor is not a route to adoption.'

const recognition: Step = {
  id: 'recognition',
  milestone: true,
  when: 'As soon as the child arrives',
  title: 'Make the adoption official in Québec',
  body: 'The law requires you to start this step as soon as the child arrives. The route depends on the country and on where the adoption was granted.',
  who: ['SASIE', 'Unified Family Tribunal', 'A lawyer'],
  details: [
    '**Adoption granted in a country that is party to the Hague Convention**: give the SASIE the certificate of conformity and the Directeur de l’état civil form. No court judgment is needed.',
    '**Adoption granted in a country where the Convention does not apply**: ask the court to recognize the foreign decision. Among other things, it checks the consents and that the child could be adopted. A lawyer is recommended.',
    '**Child entrusted to you to be adopted in Québec**: with your region’s DPJ (Director of Youth Protection), apply for a placement order, then for the adoption judgment.',
    'Since June 30, 2025, court applications go to the Unified Family Tribunal of the Court of Québec. Some Québec.ca pages still mention the “Youth Division” (Chambre de la jeunesse).',
    'In Québec, adoption replaces the original legal parent-child tie (filiation). Once recognized, it has the same effects as an adoption judgment granted here.',
  ],
  watch:
    'Skipping this step can have consequences for the child, even in adulthood. If nothing is done within a reasonable time, the DPJ can act in your place, at the minister’s request.',
  refs: [ccq('565'), ccq('565.1'), ccq('574'), ccq('581'), ypa('71.8.1')],
  sources: [`${S}qc-intl-steps`, `${S}qc-intl-no-body`, `${S}qc-intl-legal`, 'qc-tuf', 'ccq-book2'],
}

const birthAct: Step = {
  id: 'birth-act',
  when: 'After recognition',
  title: 'The new act of birth',
  body: 'The Directeur de l’état civil (Québec’s registrar of civil status) draws up a new Québec act of birth, with the child’s new names and the adoptive parents’ names. If the child arrived with permanent residence, then apply for Canadian citizenship.',
  who: ['Directeur de l’état civil', 'SASIE', 'IRCC (Canada)'],
  details: [
    'The Directeur de l’état civil acts on notice from the SASIE (Hague certificate) or from the court office (judgment).',
    'The project is complete when the adoption is recognized or granted, the new act is drawn up, the child is a Canadian citizen and the promised reports are sent.',
    'Keep every document safe. One day, your child may want to know their story.',
  ],
  refs: [ccq('132.1')],
  sources: [`${S}qc-intl-steps`, `${S}qc-intl-no-body`, 'ccq-book1'],
}

export const abroad: Journey = {
  id: 'abroad',
  icon: 'globe',
  label: 'From abroad',
  tagline: 'You hope to adopt a child who lives outside Québec.',
  scenarios: [
    /* ------------------------------------------------------------ new project: a relative */
    {
      id: 'relative',
      label: 'Adopting a relative',
      forWho:
        'For a new project in 2026: mainly adopting a child in your family who lives outside Québec. The other exceptions follow similar steps: the SASIE will tell you which ones apply to you.',
      steps: [
        {
          id: 'now',
          when: 'Since November 2024',
          title: 'What is still possible today',
          body: 'Québec has stopped opening **new** international adoption files through certified bodies (accredited adoption agencies). A new project is still possible without an agency, but only in the cases set out by regulation.',
          who: ['SASIE'],
          details: [
            'The main cases are: adopting a child in your family; adopting in a country that allows adoption only by its own nationals, if you hold its nationality; adopting a child in the care of a public child-protection or adoption authority in another Canadian province or territory.',
            'Was your file already open with a certified body? It continues: choose “My file is already open”.',
            'In 2024, Québec explained that the current system could not provide every guarantee of the Hague Convention against the abduction, sale or trafficking of children. No end date has been announced.',
            'In 2025, 17 children adopted abroad arrived in Québec, compared with 35 in 2024.',
            'Your situation fits none of the exceptions? Your project has to wait. Adopting a child who lives in Québec is still possible.',
          ],
          watch:
            'Before you do anything, you need the authorization of the **SASIE** (Secrétariat aux services internationaux à l’enfant, Québec’s international adoption authority). Without it, the adoption may not be recognized in Québec, and the child may not get the right to live permanently in Canada.',
          refs: [ccq('562.1'), ccq('564'), REG_NO_BODY],
          sources: [`${S}qc-intl-hub`, `${S}qc-intl-no-body`, `${S}moratorium-news`, `${S}msss-stats-2025`],
        },
        {
          id: 'admissible',
          when: 'First of all',
          title: 'Have the SASIE check your project',
          body: 'You submit your project to the SASIE using its form. It checks whether the project complies with the regulation, with Québec law and with the law of the child’s country, then tells you its decision.',
          who: ['SASIE', 'You'],
          details: [
            'SASIE: 1 800 561-0246 (toll-free) or adoption.quebec@msss.gouv.qc.ca. Visits by appointment only.',
            'The SASIE used to be called the Secrétariat à l’adoption internationale (SAI).',
            'The child’s country has its own conditions, which apply on top of Québec’s.',
            'Fees are charged at several stages. Québec.ca does not publish the amounts: ask the SASIE.',
            'Keep your receipts: adoption expenses may qualify for a Québec tax credit and a federal amount.',
          ],
          watch:
            '**Kafala** is not adoption: it creates no legal parent-child tie. A child from a country that prohibits adoption cannot be adopted in Québec, with or without kafala, and cannot immigrate to Canada on that basis.',
          refs: [ccq('564'), REG_NO_BODY, hague('2')],
          sources: [`${S}qc-intl-no-body`, `${S}qc-sasie-contacts`, `${S}qc-intl-costs`, `${S}qc-kafala`],
        },
        {
          id: 'training',
          when: 'Online, at your own pace',
          title: 'Take the preparatory training',
          body: 'This online training is free and mandatory. It has nine modules. At the end, you receive a certificate to attach to your request for an assessment.',
          details: [
            'The certificate is valid for 3 years.',
            'Have you already adopted a child from outside Québec? You do not need the certificate if the new project is authorized within 5 years of that child’s arrival.',
          ],
          sources: [`${S}qc-intl-training`, `${S}gazette-training`, `${S}qc-intl-no-body`],
        },
        {
          id: 'assessment',
          when: 'Once the SASIE agrees',
          title: 'The psychosocial assessment',
          body: 'With the SASIE’s letter, you contact the DPJ (Director of Youth Protection) in your region. It assesses your ability to meet the child’s needs, even if the child is part of your family. Only a positive recommendation lets you continue.',
          who: ['Your region’s DPJ', 'SASIE', 'You'],
          details: [
            'First, you ask the SASIE for permission to be assessed, using its form and your training certificate.',
            'Some countries also require a psychological assessment.',
            'The report is filed no later than 2 months after the first meeting. It is valid for 2 years.',
            'You must wait 12 months after a child arrives in your family (birth, adoption or foster care) before the assessment.',
            'A major change (separation, pregnancy, move, illness, death) may require an update.',
          ],
          refs: [ccq('563'), ypa('71.7')],
          sources: [`${S}qc-intl-assessment`, `${S}qc-intl-no-body`],
        },
        {
          id: 'authorization',
          milestone: true,
          when: 'After a positive assessment',
          title: 'Permission to begin the adoption steps',
          body: 'The SASIE can then authorize you to begin your adoption steps, and it tells you the conditions to follow. You put together the file sent to the child’s country yourself.',
          who: ['SASIE', 'You'],
          details: [
            'Each country requires its own official documents. Plan for translations and legalizations.',
            'Follow every condition the SASIE sets, so that your steps comply with the rules.',
            'No one may make an improper financial gain from an international adoption. Only reasonable costs and professional fees are allowed.',
          ],
          watch: 'Do not contact the authorities of the child’s country before you have this authorization. Otherwise, your steps will not be valid.',
          refs: [REG_NO_BODY, hague('32')],
          sources: [`${S}qc-intl-no-body`, `${S}hcch-1993`],
        },
        {
          id: 'proposal',
          milestone: true,
          when: 'Depends on the country',
          title: 'The country’s agreement and Québec’s go-ahead',
          body: 'The authorities of the child’s country decide whether the child can be adopted, then send a proposal to the SASIE. The SASIE checks that the child’s needs match your assessment. If you accept, it authorizes the rest of the procedure in writing.',
          who: ['Authorities of the child’s country', 'SASIE', 'You'],
          details: [
            'In a country that is party to the Hague Convention, this authorization is the agreement provided for in its article 17.',
            'If the child’s needs do not match your assessment (for example, on health), the SASIE cannot authorize the rest of the procedure.',
            'In Québec, adoption replaces the original legal parent-child tie. The consents to the adoption must have been given for an adoption with that effect.',
          ],
          refs: [ypa('71.8'), hague('17'), ccq('565.1')],
          sources: [`${S}qc-intl-steps`, `${S}hcch-1993`, 'lpj'],
        },
        {
          id: 'judgment',
          when: 'Depends on the country',
          title: 'The judgment there, and entry into Canada',
          body: 'Depending on the country, the adoption is granted there, or the child is entrusted to you to be adopted in Québec. You then give the documents to the SASIE, which checks the steps before issuing the document immigration requires.',
          who: ['Authorities of the child’s country', 'SASIE', 'IRCC (Canada)', 'Québec immigration ministry (MII)'],
          details: [
            ...immigrationDetails,
            'All official documents go to the SASIE, with an official French translation if they are in neither French nor English.',
          ],
          watch: immigrationWatch,
          refs: [ccq('565'), ccq('562.2'), ypa('71.8')],
          sources: [`${S}qc-intl-no-body`, `${S}qc-intl-steps`, `${S}mii-sponsor`, `${S}mii-undertaking`],
        },
        {
          id: 'arrival',
          when: 'On arrival',
          title: 'The child arrives in Québec',
          body: 'Confirm to the SASIE the date the child arrived and the date the child was entrusted to you. A worker from your region’s CISSS or CIUSSS visits you within 14 days of the arrival.',
          who: ['SASIE', 'Your region’s CISSS or CIUSSS'],
          details: [
            'A consultation with a doctor who specializes in adoption is strongly recommended in the first weeks: vaccines, health check, follow-up.',
            'Your child has no family doctor? Register them with the Guichet d’accès à un médecin de famille (family doctor waiting list).',
            'Québec Parental Insurance Plan (QPIP, or RQAP in French): for an adoption outside Québec, your benefits can start up to 5 weeks before the child arrives.',
            'Every adopted child is grieving: they have lost people and familiar landmarks. Give them time.',
          ],
          rights: [
            'Receive the health and social services offered to every family.',
            'Receive a support visit within 14 days of the arrival.',
          ],
          sources: [`${S}qc-post-adoption`, `${S}qc-rqap-planning`, `${S}qc-intl-children`],
        },
        recognition,
        birthAct,
        {
          id: 'reports',
          when: 'For years, depending on the country',
          title: 'Progress reports',
          body: 'You send the child’s country the reports you promised on the child’s development and integration. Their number, frequency and duration vary by country. They are also a legal duty.',
          who: ['You', 'Authorities of the child’s country'],
          details: [
            'Depending on the country, you write them yourself, or a professional mandated by the DPJ does.',
            'They sometimes have to be translated, certified and legalized.',
          ],
          refs: [ypa('71.8.1')],
          sources: [`${S}qc-intl-reports`, `${S}qc-intl-steps`],
        },
      ],
      outro:
        'Later, your child will be able to ask the SASIE for their adoption story (on their own from age 14) and, depending on the rules of their country of origin, the names of their birth parents.',
    },

    /* ------------------------------------------------------------ file already open */
    {
      id: 'open-file',
      label: 'My file is already open',
      forWho: 'For people whose file with a certified body was opened before the November 2024 moratorium.',
      steps: [
        {
          id: 'status',
          when: 'Since November 2024',
          title: 'Your file continues',
          body: 'The moratorium does not cover files already open with a certified body: they are still being processed. But there are fewer adoptions, and the wait can be long.',
          who: ['Your certified body', 'SASIE'],
          details: [
            'In 2025, 17 children adopted abroad arrived in Québec, compared with 35 in 2024. All of them came through a certified body.',
            'Some countries are closed or suspended: China closed international adoption in 2024; Haiti (files not yet matched with a child) and Ukraine are suspended.',
            'Situations change quickly. Check with your certified body or the SASIE where things stand for your country.',
            'No end date for the moratorium has been announced.',
          ],
          sources: [`${S}qc-intl-hub`, `${S}moratorium-news`, `${S}msss-stats-2025`, `${S}qc-intl-countries`],
        },
        {
          id: 'waiting',
          when: 'Often several years',
          title: 'While you wait, keep your file up to date',
          body: 'Several years may pass before a child is proposed. Tell your certified body about any major change in your life.',
          who: ['You', 'Your certified body'],
          details: [
            'For example: pregnancy, job loss, separation, a death, a new partner moving in, illness. A new assessment may then be required.',
            'Your psychosocial assessment is valid for 2 years. After that, it must be updated.',
            'Most children waiting for a family abroad are over 4, are part of a sibling group, or have a physical or psychological health problem.',
          ],
          sources: [`${S}qc-intl-steps`, `${S}qc-intl-assessment`, `${S}qc-intl-children`],
        },
        {
          id: 'proposal',
          milestone: true,
          when: 'Depends on the country',
          title: 'A child is proposed',
          body: 'The country’s authorities decide whether a child can be adopted and propose the child. The SASIE first checks that the child’s needs match your assessment. Your certified body then presents the proposal, and you give it your answer.',
          who: ['Authorities of the child’s country', 'SASIE', 'Your certified body'],
          details: [
            'The file may include the child’s name, family situation, medical record, special needs and sometimes photos.',
            'If the child’s needs do not match your assessment (for example, on health or life history), the SASIE cannot authorize the proposal. The child’s identity then stays confidential.',
          ],
          sources: [`${S}qc-intl-steps`],
        },
        {
          id: 'go-ahead',
          milestone: true,
          when: 'Once you accept',
          title: 'Québec’s go-ahead',
          body: 'If you accept, the SASIE authorizes the rest of the procedure in writing. It also issues a letter of no objection: it does not object to the child entering Canada.',
          who: ['SASIE', 'Your certified body'],
          details: [
            'In a country that is party to the Hague Convention, this authorization is the agreement provided for in its article 17.',
            'Your certified body asks for the letter of no objection, and you receive a copy. It goes to Québec’s Ministère de l’Immigration et de l’Intégration (MII), then to the Canadian visa office abroad.',
          ],
          refs: [ypa('71.8'), hague('17')],
          sources: [`${S}qc-intl-steps`, `${S}hcch-1993`, 'lpj'],
        },
        {
          id: 'immigration',
          when: 'At the same time',
          title: 'The child’s status in Canada',
          body: 'The child must get the right to live in Canada permanently. The Government of Canada (IRCC) decides, and Québec plays a part.',
          who: ['IRCC (Canada)', 'Québec immigration ministry (MII)', 'SASIE'],
          details: immigrationDetails,
          watch: immigrationWatch,
          refs: [ccq('562.2'), ypa('71.8')],
          sources: [`${S}mii-sponsor`, `${S}mii-undertaking`, `${S}qc-intl-steps`],
        },
        {
          id: 'travel',
          when: 'Depends on the country',
          title: 'Travel and the adoption abroad',
          body: 'Depending on the country, you travel once or several times for administrative or court steps. The adoption is granted there, or the child is entrusted to you to be adopted in Québec.',
          who: ['You', 'Your certified body’s representative', 'Authorities of the child’s country'],
          details: [
            'All official documents go to the SASIE, with an official French translation if they are in neither French nor English.',
            'A medical exam of the child by an embassy-designated doctor is mandatory on the permanent-residence route. It is strongly recommended on the citizenship route.',
            'Québec Parental Insurance Plan (QPIP, or RQAP in French): for an adoption outside Québec, your benefits can start up to 5 weeks before the child arrives.',
          ],
          refs: [ccq('565')],
          sources: [`${S}qc-intl-steps`, `${S}qc-rqap-planning`],
        },
        {
          id: 'arrival',
          when: 'On arrival',
          title: 'The child arrives in Québec',
          body: 'Confirm to your certified body the date the child arrived and the date the child was entrusted to you: it informs the SASIE. A worker from your region’s CISSS or CIUSSS then visits you within 14 days of the arrival.',
          who: ['Your certified body', 'SASIE', 'Your region’s CISSS or CIUSSS'],
          details: [
            'A consultation with a doctor who specializes in adoption is strongly recommended in the first weeks: vaccines, health check, follow-up.',
            'Your child has no family doctor? Register them with the Guichet d’accès à un médecin de famille (family doctor waiting list).',
            'Every adopted child is grieving: they have lost people and familiar landmarks. Give them time.',
          ],
          rights: [
            'Receive the health and social services offered to every family.',
            'Receive a support visit within 14 days of the arrival.',
          ],
          sources: [`${S}qc-post-adoption`, `${S}qc-intl-children`],
        },
        recognition,
        birthAct,
        {
          id: 'reports',
          when: 'For years, depending on the country',
          title: 'Progress reports',
          body: 'At the start, you promised to send the child’s country reports on the child’s development and integration. Their number, frequency and duration vary by country. They are also a legal duty.',
          who: ['You', 'Your certified body'],
          details: [
            'Depending on the country, you write them yourself, or a professional mandated by the DPJ does.',
            'They sometimes have to be translated, certified and legalized. Your certified body sends them and follows up.',
          ],
          refs: [ypa('71.8.1')],
          sources: [`${S}qc-intl-reports`, `${S}qc-intl-steps`],
        },
      ],
      outro:
        'Later, your child will be able to ask the SASIE for their adoption story (on their own from age 14) and, depending on the rules of their country of origin, the names of their birth parents.',
    },
  ],
}
