// Researched content — verified 2026-11-13
import type { Clock, LegalRef } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const GAZ = 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/'

export const clock: Clock = {
  eyebrow: 'Time limits',
  title: 'The deadlines that matter',
  lede:
    'Some steps come with a clock. Knowing it means you can act in time, ask for help and ask the right questions. Here are six time limits set by law or regulation, in plain words. Worried about a deadline? Talk to your caseworker or to a lawyer.',
  delays: [
    {
      id: 'urgence',
      value: 48,
      unit: 'hours',
      unitLabel: 'hours',
      title: 'DPJ emergency measures',
      body:
        'If a child’s safety is at risk, the DPJ (Director of Youth Protection) can act right away, for example by placing the child with a relative or a foster family. These measures last **48 hours at most**. To go further, it needs either the agreement of the parents and of a child aged 14 or older (a provisional agreement of up to 30 days, renewable once), or a court decision.',
      refs: [ypa('46'), ypa('47'), ypa('47.1')],
      sources: ['lpj', 'qc-dpj-steps', 'clock-compare-bill99'],
    },
    {
      id: 'refus-identite',
      value: 30,
      unit: 'days',
      unitLabel: 'days',
      title: 'Keeping your identity confidential',
      body:
        'Are you a birth parent who doesn’t want the child to learn your identity before they turn 18? Register a **refusal to disclose your identity** within **30 days after the birth**. This deadline counts from the birth, not from the day you sign the consent. After that, you can still register a refusal of contact, as long as your identity has not been disclosed.',
      refs: [ccq('583.4'), ccq('583.6')],
      sources: ['ccq-book2', 'clock-compare-qc-origins-pl2', 'msss-origins-guide'],
    },
    {
      id: 'retractation',
      value: 30,
      unit: 'days',
      unitLabel: 'days',
      title: 'Changing your mind after consenting',
      body:
        'A parent who consented to adoption can withdraw that consent within **30 days after signing**, in writing, before two witnesses. The child must then be returned to them without formality or delay. No placement order can be made before those 30 days are over; after that, and until that order, the parent can still ask the court to return the child.',
      refs: [ccq('557'), ccq('548'), ccq('567'), ccq('558')],
      sources: ['ccq-book2', 'educaloi-adopt'],
    },
    {
      id: 'admissibilite',
      value: 6,
      unit: 'months',
      unitLabel: 'months',
      title: 'When parents are not filling their role',
      body:
        'If the parents have not, in fact, cared for, supported or raised the child for **at least 6 months**, the court can declare the child eligible for adoption. The law then presumes that a return to them is unlikely. The parents can oppose this in court and show otherwise, with a lawyer.',
      refs: [ccq('559'), ccq('560'), ccq('561')],
      sources: ['ccq-book2', 'educaloi-adopt', 'csj'],
    },
    {
      id: 'vie-commune',
      value: 6,
      unit: 'months',
      unitLabel: 'months',
      title: 'Living together before the judgment',
      body:
        'After the placement order, the child lives with their future family. The adoption can only be granted after **at least 6 months** of living together since that order. The court can shorten this by up to 3 months, for example if the child already lived with that family.',
      refs: [ccq('566')],
      sources: ['ccq-book2', 'qc-adoption-about'],
    },
    {
      id: 'aide-financiere',
      value: 60,
      unit: 'days',
      unitLabel: 'days',
      title: 'Applying for financial assistance',
      body:
        'Has the DPJ entrusted a child to you for **at least 6 months in a row**, and is the court naming you tutor or placing the child with you for adoption? You may receive financial assistance. Apply within **60 days** of the tutorship judgment or the placement order, at your region’s child and youth protection centre. A late application can still be accepted if you have a good reason.',
      refs: [ypa('70.3'), ypa('71.3'), { label: 'Reg. (O.C. 1914-2023), ss. 1 and 3', url: GAZ + '82290.pdf' }, { label: 'Reg. (O.C. 1915-2023), ss. 1 and 3', url: GAZ + '82291.pdf' }],
      sources: ['clock-compare-reg-tutorship-aid', 'clock-compare-reg-adoption-aid'],
    },
  ],
  placement: {
    title: 'How long can a child live away from home before their future is decided?',
    body:
      'When the DPJ or the court entrusts a child to another setting (grandparents, another person close to them, a foster family, a rehabilitation centre), the law sets a **maximum total length of time**. It depends on the child’s age at the time of the agreement or court order that places them. Periods linked to the same situation add up. Meanwhile, if it is in the child’s interest, the first goal is still a return home, with support.',
    sliderLabel: 'Child’s age when placed',
    yearsWord: 'years old',
    resultPrefix: 'Maximum time before a permanent decision:',
    monthsWord: 'months',
    bands: [
      { ageLabel: 'Under 2', minAge: 0, maxAge: 2, months: 12 },
      { ageLabel: '2 to 5', minAge: 2, maxAge: 6, months: 18 },
      { ageLabel: '6 and older', minAge: 6, maxAge: 18, months: 24 },
    ],
    after:
      '**When the time is up** and the child still cannot safely go back home, the case goes to court. The court must then give the child continuous care and stable bonds, on a permanent basis, for example through a placement until age 18; tutorship and adoption require a separate application. If the child’s interest requires it, the court can go past the limit: when a return home is expected soon, or for a serious reason, for example if planned services were not provided. For an Indigenous child, these limits do not apply if a family council has been formed.',
    refs: [ypa('53.0.1'), ypa('91.1'), ypa('131.12')],
    sources: ['lpj', 'clock-compare-bill99', 'clock-compare-bill15', 'qc-dpj-steps'],
  },
}
