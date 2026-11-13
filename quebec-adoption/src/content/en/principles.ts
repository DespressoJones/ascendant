// DRAFT — replaced by researched content
import type { Principles } from '../types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/CCQ-1991'
const YPA = 'https://www.legisquebec.gouv.qc.ca/en/document/cs/P-34.1'

/*
 * Writing guide for this section (renderer: sections/principles.ts)
 *  - 3 items read best (4 also fit). The title says how many: keep it in sync.
 *  - title: a 4–7 word statement, about 25–45 characters. Wrap the key words in **bold**:
 *    they get a red running stitch when the statement is being read.
 *  - body: 2–3 plain sentences, about 220–380 characters.
 *  - refs: 1–4 chips.
 *  - id: an English slug, the same in FR and EN. It picks the icon (see ICONS in the renderer).
 */
export const principles: Principles = {
  eyebrow: 'The essentials',
  title: 'Three things to know first',
  items: [
    {
      id: 'child-interest',
      title: 'The **child’s interest** comes first.',
      body:
        'Every decision about a child, whether it comes from the DPJ, an adoption service or a judge, must be made in the child’s interest and with respect for their rights. Their needs, age, health and family environment are all taken into account. In court, the child has the right to be heard if their age and understanding allow it.',
      refs: [
        { label: 'C.C.Q., art. 33', url: `${CCQ}#se:33` },
        { label: 'C.C.Q., art. 34', url: `${CCQ}#se:34` },
        { label: 'YPA, s. 3', url: `${YPA}#se:3` },
      ],
    },
    {
      id: 'family-first',
      title: '**Family** first, whenever it’s safe.',
      body:
        'Youth protection first tries to keep the child with their parents, with support. If that isn’t possible, priority goes to the people who matter most to the child, such as grandparents or other relatives, and then to a foster family. Brothers and sisters stay together whenever possible.',
      refs: [
        { label: 'YPA, s. 4', url: `${YPA}#se:4` },
        { label: 'YPA, s. 4.1', url: `${YPA}#se:4_1` },
      ],
    },
    {
      id: 'adoption-permanent',
      title: 'Adoption is **permanent**. Other options exist.',
      body:
        'An adoption judgment creates a new parent–child bond for life and ends the legal ties with the family of origin. That is why it is only possible when it serves the child’s interest, and why other solutions exist, such as suppletive tutorship. A parent who signed a consent has **30 days** to change their mind.',
      refs: [
        { label: 'C.C.Q., art. 543', url: `${CCQ}#se:543` },
        { label: 'C.C.Q., art. 577', url: `${CCQ}#se:577` },
        { label: 'C.C.Q., art. 557', url: `${CCQ}#se:557` },
        { label: 'C.C.Q., art. 199.1', url: `${CCQ}#se:199_1` },
      ],
    },
  ],
}
