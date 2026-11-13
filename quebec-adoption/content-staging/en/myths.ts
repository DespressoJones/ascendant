// Researched content — verified 2026-11-13
import type { LegalRef, Myths } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.C.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const ypa = (a: string): LegalRef => ({ label: `YPA, s. ${a}`, url: `${LQ}P-34.1${se(a)}` })

/*
 * Writing guide for this section (read by the "myths" board):
 *  - 8 to 15 items; 10 is the sweet spot (desktop rows of 2 and 3 cards).
 *  - myth: ONE sentence, as people say it, 45–95 characters. No quotation marks (added by the page).
 *  - fact: 1–3 short sentences, 150–300 characters. Start with the verdict ("No.", "False.", "Not necessarily.").
 *    **bold** the single idea a stressed reader must retain.
 *  - refs: 0–3 short chips. Ids are English slugs shared by FR and EN.
 *
 * Not stated on purpose (could not be confirmed): any fee amount for a domestic adoption, any upper age
 * limit used in practice by a regional adoption service, the number of domestic adoptions per year.
 * Fact-check 2026-11-13: "free" domestic adoption is UNVERIFIED (Québec.ca simply lists no fee), so the cost
 * myth is scoped to DPJ adoptions and answered with what official sources say. Art. 579: a child of 10 to 13
 * who refuses can be overridden by the court; from 14 the child's consent is always required.
 */
const S = 'hero-principles-myths-rights-'

export const myths: Myths = {
  eyebrow: 'Myths & facts',
  title: 'Untangling fact from fiction.',
  lede:
    'Some beliefs about adoption and the DPJ (Director of Youth Protection) frighten people for no reason. Others give false hope. Tap a myth: it fades away and the fact takes its place, with its source.',
  hint: 'Tap a myth to make it disappear',
  mythLabel: 'Myth',
  factLabel: 'Fact',
  resetLabel: 'Show the myths again',
  items: [
    {
      id: 'dpj-removal',
      myth: 'If the DPJ gets involved, my children will automatically be taken away.',
      fact: 'No. The law first asks that **the child stay with their family**, if that is in the child’s interest. In 2025–2026, 52.1% of the children the DPJ took charge of stayed with their family, and 18.3% were entrusted to a person who matters to them.',
      refs: [ypa('4')],
      sources: ['lpj', `${S}bill15`, `${S}dpj-bilan-2026`],
    },
    {
      id: 'prenatal-alert',
      myth: 'If the DPJ knows me, they will be alerted before my baby is born.',
      fact: 'No. Since April 2023, the DPJ **no longer receives reports before a baby is born**. Preventive services during pregnancy are offered instead. The duty to report a situation applies from the birth.',
      sources: [`${S}birth-alerts`],
    },
    {
      id: 'placement-adoption',
      myth: 'After 12 months in foster care, my baby will automatically be adopted.',
      fact: 'No. When the maximum period is reached, the court must, with some exceptions, choose **a stable life plan**. Adoption is only one option. It requires the parents’ consent or a judgment declaring the child eligible for adoption, which the parents can contest.',
      refs: [ypa('91.1'), ccq('544'), ccq('559')],
      sources: ['lpj', 'ccq-book2', `${S}msss-life-plan`],
    },
    {
      id: 'consent-withdrawal',
      myth: 'Once you sign consent to adoption, you can never change your mind.',
      fact: 'False. You have **30 days after signing** to withdraw your consent, in writing before two witnesses, and the child must be returned to you. After that, only the court can order the child’s return, and only before the placement order.',
      refs: [ccq('557'), ccq('548'), ccq('558')],
      sources: ['ccq-book2', 'educaloi-adopt'],
    },
    {
      id: 'birth-parents',
      myth: 'A parent who places their child for adoption doesn’t love them.',
      fact: 'False. This choice is often made through pain, and it can leave **a lasting grief**. The adoption service can inform you and support you while you think it over, with no commitment. After signing, you still have 30 days to change your mind.',
      refs: [ccq('548'), ccq('557')],
      sources: ['qc-adoption-about', 'msss-origins-guide'],
    },
    {
      id: 'origins',
      myth: 'An adopted person will never be able to find out where they come from.',
      fact: 'False. They have the right to obtain **the names of their birth parents** and a copy of their original act of birth (under 14, with their parents’ agreement). A refusal to disclose identity ends when they turn 18. Either side can still refuse contact.',
      refs: [ccq('583'), ccq('583.4'), ccq('583.6')],
      sources: ['ccq-book2', `${S}qc-origins-pl2`, 'qc-origins'],
    },
    {
      id: 'open-adoption',
      myth: 'In Québec, adoption always cuts off all contact with the birth family.',
      fact: 'Not necessarily. If it is in the child’s interest, the adoptive family and the birth family can **agree in writing** to share news or keep in touch. If they disagree, the court can decide. From age 14, the child must agree and can end it.',
      refs: [ccq('579')],
      sources: ['ccq-book2', `${S}qc-contact-agreement`],
    },
    {
      id: 'child-voice',
      myth: 'The child has no say at all in their own adoption.',
      fact: 'False. From **age 10**, the child must consent to their adoption, unless they are unable to express their wishes. If a child under 14 refuses, the court can wait or go ahead anyway. At **14 and over**, their refusal stops the adoption.',
      refs: [ccq('549'), ccq('550')],
      sources: ['ccq-book2'],
    },
    {
      id: 'grandparents',
      myth: 'Grandparents can do nothing if the child can’t stay with their parents.',
      fact: 'False. If it is in the child’s interest, the law says the child goes **first** to the people who matter most to them, including grandparents. A grandparent can also become the child’s tutor, without cutting ties with the parents, or adopt with a special consent.',
      refs: [ypa('4'), ccq('199.1'), ccq('555')],
      sources: ['lpj', 'ccq-book1', 'ccq-book2', `${S}qc-suppletive`],
    },
    {
      id: 'who-can-adopt',
      myth: 'You have to be a married man and woman to adopt.',
      fact: 'No. **Any adult** can adopt, alone or with another person. The conditions are the same for single people and for couples who are married, in a civil union, in a parental union or common-law, same-sex or not. A child can have two mothers or two fathers.',
      refs: [ccq('546')],
      sources: ['ccq-book2', 'educaloi-adopt', `${S}qc-filiation`],
    },
    {
      id: 'age-limit',
      myth: 'Past a certain age, the law won’t let you adopt.',
      fact: 'No. The law sets **no maximum age**. You must be an adult and, in general, at least 18 years older than the child. The published criteria for registering with an adoption service set no maximum either, but ask for good physical and mental health, among other things.',
      refs: [ccq('546'), ccq('547')],
      sources: ['ccq-book2', 'qc-adoption-legal'],
    },
    {
      id: 'cost',
      myth: 'Adopting a child through the DPJ costs tens of thousands of dollars.',
      fact: 'Not according to official sources. These adoptions go through your region’s **public adoption service**, and Québec.ca mentions no fees for it. Financial assistance even exists in some cases. High costs mostly come with international adoption. If in doubt, ask the adoption service.',
      sources: ['qc-adoption-legal', 'qc-adoption-about', `${S}reg-adoption-aid`, `${S}qc-intl-costs`],
    },
    {
      id: 'banque-mixte',
      myth: 'In the Banque mixte program, the foster family is sure to adopt the child.',
      fact: 'No. The parents are at high risk of not being able to care for the child, but **going back to them is still possible**: the DPJ must plan for that return while preparing another plan just in case. Adoption requires the parents’ consent or a judgment declaring the child eligible.',
      refs: [ypa('4.2'), ccq('544'), ccq('559')],
      sources: ['lpj', 'qc-adoption-about', 'educaloi-adopt'],
    },
    {
      id: 'international',
      myth: 'Adopting from abroad is simpler and faster than adopting here.',
      fact: 'Not right now. Since November 26, 2024, **no new file** can be opened with a certified body, for an indefinite period. In 2025, only 17 children arrived in Québec through international adoption, compared with 35 in 2024.',
      sources: [`${S}sasie-stats-2025`],
    },
  ],
}
