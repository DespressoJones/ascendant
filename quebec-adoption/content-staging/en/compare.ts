// Researched content — verified 2026-11-13
import type { Compare, LegalRef } from '../../src/content/types'

/*
 * Writing note: every `keepsTie` starts with a short verdict, then " — " and an explanation.
 * The renderer turns the verdict into the card's chip: "Yes" (tie kept), "No" (tie replaced),
 * "Partly" or "Depends…" (dashed). Keep the verdict short (under 34 characters) and free of ":".
 */

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const ccp = (a: string): LegalRef => ({ label: `C.C.P., art. ${a}`, url: `${LQ}C-25.01${se(a)}` })

export const compare: Compare = {
  eyebrow: 'Kinds of adoption',
  title: 'Not every adoption looks the same',
  lede:
    'In Québec, an adoption can begin with the birth parents’ consent, with a court decision or with a process abroad. It creates a new filiation that replaces the original one, in whole or in part. The original tie can sometimes be “recognized”: the birth parent’s name then stays on the new act of birth, but with no rights or duties. Further down: options that protect a child **without** changing who their legal parents are.',
  columns: {
    forWho: 'For whom',
    whoDecides: 'Who decides',
    cost: 'Cost',
    time: 'Timeline',
    keepsTie: 'Legal tie to the birth family',
    start: 'How it starts',
  },
  adoption: [
    {
      id: 'consentement-general',
      name: 'Adoption with general consent',
      forWho:
        'A baby or child whose birth parents (or tutor) decide to place them for adoption, without choosing the family themselves.',
      whoDecides:
        'The birth parents consent. The DPJ (Director of Youth Protection) chooses the adoptive family. The court orders the placement, then grants the adoption.',
      cost: 'Québec.ca lists no fees for DPJ adoption services. Check with the adoption service in your region.',
      time: '30 days to change their mind, then usually at least 6 months of placement before the judgment. Adoptive parents may wait for years.',
      keepsTie:
        'No — the adoptive filiation replaces the original one. The original tie can sometimes be “recognized”, with no rights or duties, and exchanges or contact can be arranged.',
      start: 'Each legal parent signs a general consent, in writing, before two witnesses. The DPJ is the one who receives it.',
      refs: [ccq('548'), ccq('551'), ccq('555'), ccq('557'), ccq('566'), ccq('577')],
      sources: ['ccq-book2', 'qc-adoption-about', 'qc-adoption-legal', 'educaloi-adopt'],
    },
    {
      id: 'banque-mixte',
      name: 'Banque mixte (foster-to-adopt)',
      forWho:
        'A child followed by the DPJ who is at high risk of not being able to go back to their family. The child is placed with a foster family ready to adopt.',
      whoDecides:
        'The DPJ chooses the family. Without the parents’ consent, the court decides whether the child becomes eligible for adoption, then grants the adoption.',
      cost: 'During fostering, the family is paid as a foster family. Adoption financial assistance may follow, for up to 3 years.',
      time: 'No official average length. The maximum placement times also apply. The child may return to their parents: adoption is never guaranteed.',
      keepsTie:
        'Depends on the outcome — while in foster care, the child keeps their filiation. If the adoption is granted, the new filiation replaces the original one.',
      start:
        'An assessed family, recognized as a foster family, takes the child in knowing the child could go back to their parents.',
      refs: [ccq('559'), ccq('561'), ypa('4.2'), ypa('91.1')],
      sources: [
        'qc-adoption-about',
        'educaloi-adopt',
        'clock-compare-msss-ri-rtf',
        'clock-compare-qc-foster-process',
        'clock-compare-reg-adoption-aid',
      ],
    },
    {
      id: 'admissibilite',
      name: 'Adoption after a declaration of eligibility',
      forWho:
        'A child whose parents have not, in fact, provided care, support or upbringing for at least 6 months. There are other cases, such as an orphan with no tutor.',
      whoDecides:
        'The court, at the request of the DPJ, a close relative (grandparent, uncle, aunt…) or the child if 14 or older. The parents can oppose it.',
      cost: 'Parents may qualify for legal aid, depending on their income. It is free for every minor child.',
      time: 'At least 6 months without parental care, then the court proceedings, usually 6 months of placement, then the judgment.',
      keepsTie:
        'No — if the adoption is granted, the new filiation replaces the original one. The declaration alone does not change it yet.',
      start: 'The DPJ, or an eligible relative, asks the court to declare the child eligible for adoption.',
      refs: [ccq('559'), ccq('560'), ccq('561'), ccq('562')],
      sources: ['ccq-book2', 'educaloi-adopt', 'csj', 'clock-compare-bill2'],
    },
    {
      id: 'proche',
      name: 'Adoption by a relative (special consent)',
      forWho:
        'A close relative of the child: for example a grandparent, brother, sister, aunt, uncle, or their spouse. They must be 18 years older than the child, unless the court waives this. Compare with suppletive tutorship, further down.',
      whoDecides:
        'The parents choose the person and consent in their favour. A child 10 or older must also consent. The court checks the child’s interest and may require a psychosocial assessment.',
      cost: 'Mostly lawyer or notary fees. Ask legal aid whether you qualify.',
      time: 'At least 30 days between the consents and the placement order, then at least 6 months before the judgment (can be cut by up to 3 months).',
      keepsTie: 'No — the filiation with the birth parents is replaced. Exchanges or contact can be arranged in writing.',
      start: 'The parents sign a special consent naming the person, in writing, before two witnesses.',
      refs: [ccq('555'), ccq('547'), ccq('547.1'), ccq('566'), ccq('577')],
      sources: ['ccq-book2', 'educaloi-adopt', 'csj'],
    },
    {
      id: 'conjoint',
      name: 'Adopting your spouse’s child',
      forWho:
        'The spouse of a parent. If you are de facto spouses, you must have lived together for at least 3 years. The 18-year age gap does not apply.',
      whoDecides:
        'The parent who is your spouse and, if there is one, the other legal parent consent, as does a child 10 or older. The court grants the adoption.',
      cost: 'Mostly lawyer or notary fees. The DPJ is notified of the application only if the child has been reported to it.',
      time: 'At least 30 days between the consents and the placement order, then at least 6 months living together; the court can cut this by up to 3 months.',
      keepsTie:
        'Partly — the child keeps their parent, the adopter’s spouse. Only the tie with the other parent, if there is one, is replaced.',
      start:
        'The parent signs a special consent in favour of their spouse. The other legal parent must also consent, with some exceptions.',
      refs: [ccq('555'), ccq('547'), ccq('551'), ccq('552'), ccq('577'), ccp('432')],
      sources: ['ccq-book2', 'educaloi-adopt'],
    },
    {
      id: 'internationale',
      name: 'International adoption',
      forWho:
        'A person domiciled in Québec who wants to adopt a child domiciled outside Québec, including in another province.',
      whoDecides:
        'The authorities of the child’s country and Québec’s Secrétariat aux services internationaux à l’enfant (SASIE), which must authorize every project. The judgment is made here or abroad.',
      cost: 'High and variable: assessment, file, translations, fees abroad, travel. Québec publishes no overall amount. Tax credits exist.',
      time: 'Often several years before a child is proposed.',
      keepsTie: 'No — an adoption granted or recognized in Québec ends the original filiation (a “full” adoption).',
      start:
        'Since November 2024, new files with a certified body are on hold. A few cases set by regulation, such as adoption within the family, start with a request to the SASIE.',
      refs: [ccq('563'), ccq('564'), ccq('565'), ccq('565.1'), { label: 'Hague Convention (1993)' }],
      sources: [
        'clock-compare-qc-intl',
        'clock-compare-qc-intl-moratorium',
        'clock-compare-qc-intl-no-body',
        'clock-compare-qc-intl-steps',
        'clock-compare-qc-intl-costs',
      ],
    },
    {
      id: 'coutumiere',
      name: 'Indigenous customary adoption',
      forWho: 'First Nations or Inuit families who adopt according to a custom of their community or nation.',
      whoDecides:
        'The adoption follows the custom. The competent authority designated by the community or nation attests it: it checks the custom, the consents and the child’s interest, then issues a certificate.',
      cost: 'Ask the competent authority. Financial assistance exists in some cases where the DPJ had entrusted the child to you.',
      time: 'According to custom. The authority sends the certificate to the Directeur de l’état civil within 30 days, then a new act of birth is drawn up.',
      keepsTie:
        'Depends on the certificate — the original filiation ends, except for rights and duties that the custom keeps and the certificate states.',
      start:
        'Contact the competent authority listed in the Directeur de l’état civil’s register. If the DPJ is involved with the child, it must first give a written opinion.',
      refs: [ccq('543.1'), ccq('577.1'), ccq('129'), ypa('131.18')],
      sources: [
        'ccq-book2',
        'ccq-book1',
        'clock-compare-qc-adoption-overview',
        'clock-compare-dec-register',
        'clock-compare-reg-adoption-aid',
      ],
    },
    {
      id: 'majeur',
      name: 'Adoption of an adult',
      forWho:
        'An adult who was raised, as a minor, by the person who wants to adopt them: a stepparent, a relative, a former foster family. The court can make an exception to this condition.',
      whoDecides: 'The court, based on the adult’s consent and the application.',
      cost: 'Mostly lawyer or notary fees, if you consult one.',
      time: 'The law sets no specific timeline. The 6-month placement period is for minors.',
      keepsTie:
        'No — the new filiation replaces the original one. If the adopter is a parent’s spouse, only the tie with the other parent changes.',
      start:
        'An adoption application to the court, with the adult’s written consent. Their married or civil-union spouse, their children 14 or older, and their parents and grandparents are notified.',
      refs: [ccq('545'), ccq('573'), ccq('577'), ccp('441')],
      sources: ['ccq-book2'],
    },
  ],
  alternativesTitle: 'What isn’t adoption',
  alternatives: [
    {
      id: 'tutelle-suppletive',
      name: 'Suppletive tutorship',
      forWho:
        'A parent who can’t fully play their role, or has disengaged, and a close person ready to step in (the parent’s spouse, a grandparent, aunt, uncle, a member of the foster family…).',
      whoDecides:
        'The parent chooses the person and the court must authorize it. The court can do so even without a parent’s agreement, for example if their refusal isn’t justified by the child’s interest.',
      cost: 'Some document fees (police certificate, sworn statement), plus a lawyer or notary if needed. The parents pay for the child’s basic needs.',
      time: 'The tutor starts as soon as the court names them. The tutorship ends when the child turns 18, or earlier if a parent is reinstated.',
      keepsTie:
        'Yes — the parents remain the parents. Depending on the case, they share their role with the tutor or their role is suspended.',
      start:
        'The parent files an application in the court of the district where the child lives. From 10, the child must consent; from 14, their refusal stops it.',
      refs: [ccq('199.1'), ccq('199.3'), ccq('199.4'), ccq('199.6'), ccq('199.8')],
      sources: ['ccq-book1', 'clock-compare-qc-suppletive'],
    },
    {
      id: 'tutelle-lpj',
      name: 'Tutorship requested by the DPJ',
      forWho:
        'A child followed by the DPJ who can’t go back home, and the person caring for them (a relative or the foster family), ready to commit until the child turns 18.',
      whoDecides: 'The court, at the request of the DPJ or of the person it recommends as tutor.',
      cost: 'The tutor can receive monthly financial assistance if the child had been entrusted to them for at least 6 months in a row. Apply within 60 days of the judgment.',
      time: 'Until the child turns 18. Assistance can last until 21 if the young person is in certain studies and the tutor still supports them.',
      keepsTie:
        'Yes — the child keeps their filiation and their name. The tutor exercises parental authority, and the court can set contact with the family.',
      start: 'The DPJ proposes tutorship as the child’s life plan. Once the tutor is named, the DPJ closes its file.',
      refs: [ypa('70.1'), ypa('70.2'), ypa('70.3'), ypa('70.6'), ccq('207')],
      sources: ['lpj', 'ccq-book1', 'clock-compare-reg-tutorship-aid', 'clock-compare-msss-life-plan'],
    },
    {
      id: 'placement-majorite',
      name: 'Placement until adulthood',
      forWho: 'A child followed by the DPJ who can’t safely go back home, when tutorship or adoption isn’t right.',
      whoDecides: 'The court, on the DPJ’s recommendation, for example when the maximum placement time has been reached.',
      cost: 'The foster family is paid for the child. A relative can be recognized as a kinship foster family.',
      time: 'Until 18. A transition plan is prepared in the 2 years before, and the young person can sometimes stay in their placement after that.',
      keepsTie:
        'Yes — filiation stays. Parents keep the rights the court doesn’t take away, and contact can be planned.',
      start: 'The DPJ recommends this life plan and the court orders it when a return home isn’t possible.',
      refs: [ypa('91'), ypa('91.1'), ypa('57.2.2'), ypa('64.1')],
      sources: [
        'lpj',
        'clock-compare-msss-life-plan',
        'clock-compare-cdpdj-stability',
        'clock-compare-bill15',
        'clock-compare-qc-foster-process',
      ],
    },
    {
      id: 'placement-proche',
      name: 'Placement with someone close',
      forWho:
        'A child followed by the DPJ who must leave home for a while and can live with a grandparent or another person who matters to them.',
      whoDecides: 'The DPJ, with the agreement of the parents and of a child 14 or older, or the court.',
      cost: 'The relative can be recognized as a kinship foster family and then be paid.',
      time: 'Temporary. It counts toward the maximum placement time: 12, 18 or 24 months depending on the child’s age.',
      keepsTie:
        'Yes — the child is still their parents’ child. Parents keep their rights and duties, unless the court takes some of them away.',
      start:
        'The law gives priority to grandparents and other close people before a foster family. The DPJ assesses the proposed person.',
      refs: [ypa('4'), ypa('54'), ypa('91'), ypa('11.4')],
      sources: ['lpj', 'qc-dpj-steps', 'clock-compare-msss-ri-rtf', 'clock-compare-bill15'],
    },
    {
      id: 'garde-tiers',
      name: 'Delegation or custody given to someone close',
      forWho:
        'Parents who entrust day-to-day care to someone close, or a close person who asks the court for custody, in the child’s interest.',
      whoDecides: 'The parents, for a delegation. The court, if someone close asks for custody: the law gives parents priority.',
      cost: 'A delegation is done without going to court. A custody application mostly means lawyer’s fees; ask about legal aid.',
      time: 'The law sets no length: it depends on the arrangement or on the court’s decision.',
      keepsTie:
        'Yes — the parents remain the parents. They take part in major decisions and must contribute to the child’s needs according to their means.',
      start:
        'The parents delegate custody, supervision or education of the child; or the close person files a custody application in court.',
      refs: [ccq('601'), ccq('605')],
      sources: ['ccq-book2', 'clock-compare-educaloi-third-party', 'csj'],
    },
  ],
}
