// DRAFT — replaced by researched content
import type { Myths } from '../types'

/*
 * Writing guide for this section (read by the "myths" board):
 *  - 8 to 15 items; 10 is the sweet spot (desktop rows of 2 and 3 cards).
 *  - myth: ONE sentence, as people say it, 45–95 characters. No quotation marks (added by the page).
 *  - fact: 1–3 short sentences, 150–300 characters. Start with the verdict ("No.", "False.", "Not necessarily.").
 *    **bold** the single idea a stressed reader must retain.
 *  - refs: 0–3 short chips ("C.C.Q., art. 557"). Longer facts + 3 refs make every card in that row taller.
 */
export const myths: Myths = {
  eyebrow: 'Myths & facts',
  title: 'Untangling fact from fiction.',
  lede:
    'Some beliefs about adoption and the DPJ frighten people for no reason. Others give false hope. Tap a myth: it fades away and the fact takes its place, with its source.',
  hint: 'Tap a myth to make it disappear',
  mythLabel: 'Myth',
  factLabel: 'Fact',
  resetLabel: 'Show the myths again',
  items: [
    {
      id: 'dpj-removal',
      myth: 'If the DPJ gets involved, my children will automatically be taken away.',
      fact: 'No. The law requires every decision to aim first at **keeping the child in their family**, with support if needed. Placement is a last resort, used when the child’s safety or development cannot be ensured any other way.',
      refs: [{ label: 'YPA, s. 4' }],
    },
    {
      id: 'withdrawal',
      myth: 'Once you sign consent to adoption, you can never change your mind.',
      fact: 'False. A parent who consented can **withdraw it within 30 days**: the child must then be returned to them, without formality. After that, they can still ask the court to return the child, as long as no placement order has been made.',
      refs: [{ label: 'C.C.Q., art. 557' }, { label: 'C.C.Q., art. 558' }],
    },
    {
      id: 'who-can-adopt',
      myth: 'You have to be a married couple to adopt.',
      fact: 'No. **Any adult** can adopt, alone or with another person, whatever their marital status or sexual orientation. What matters is the child’s interest and the assessment of your plan.',
      refs: [{ label: 'C.C.Q., art. 546' }],
    },
    {
      id: 'origins',
      myth: 'An adopted person will never be able to find out where they come from.',
      fact: 'False. An adopted person has the right to obtain **their original name and the names of their birth parents**, and information to reach them. Under 14, they need their parents’ agreement. A birth parent may, however, have registered a refusal.',
      refs: [{ label: 'C.C.Q., art. 583' }],
    },
    {
      id: 'banque-mixte',
      myth: 'In the Banque-mixte program, the foster family is sure to adopt the child.',
      fact: 'Not necessarily. The family welcomes the child **with a view to a possible adoption**. Adoption only happens if the child becomes legally adoptable. Until then, the child often keeps in touch with their parents, and may go back to live with them.',
    },
    {
      id: 'only-option',
      myth: 'When a child can’t live with their parents, adoption is the only solution.',
      fact: 'No. The law provides several **life plans**: returning to the family, placement with a relative, tutorship, adoption or a long-term placement. The one chosen is the one that best meets the child’s needs.',
      refs: [{ label: 'YPA, s. 4' }],
    },
    {
      id: 'birth-parents',
      myth: 'Parents who place their child for adoption don’t care about them.',
      fact: 'That is rarely true. Placing a child for adoption is often **an act of protection**, made through pain. These parents have rights: to be informed, to be supported and to take the time to decide.',
      refs: [{ label: 'C.C.Q., art. 557' }],
    },
    {
      id: 'grandparents',
      myth: 'Grandparents have no say when the DPJ is involved.',
      fact: 'They can play a big part. If the child cannot stay with their parents, the law looks first to **the extended family** and the people who matter to the child. Ties with grandparents can be kept up when it is in the child’s interest.',
      refs: [{ label: 'YPA, s. 4' }, { label: 'C.C.Q., art. 611' }],
    },
    {
      id: 'child-voice',
      myth: 'The child has no say in their own adoption.',
      fact: 'Quite the opposite. From **age 10**, the child must consent to their adoption, unless they are unable to express their wishes. At **14 and over**, their refusal prevents the adoption.',
      refs: [{ label: 'C.C.Q., art. 549' }, { label: 'C.C.Q., art. 550' }],
    },
    {
      id: 'cost',
      myth: 'Adopting a child from here costs tens of thousands of dollars.',
      fact: 'Adopting a child from Québec through the DPJ and your regional CISSS or CIUSSS is **generally free**. It is international adoption that involves significant costs: accredited body, documents, travel.',
    },
  ],
}
