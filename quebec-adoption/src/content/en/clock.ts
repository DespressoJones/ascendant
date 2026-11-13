// DRAFT — replaced by researched content
import type { Clock } from '../types'

export const clock: Clock = {
  eyebrow: 'Time limits',
  title: 'The deadlines that matter',
  lede:
    'Some steps come with a clock. Knowing it means you can act in time, ask for help and ask the right questions. Here are the time limits set by law, in plain words.',
  delays: [
    {
      id: 'urgent',
      value: 48,
      unit: 'hours',
      unitLabel: 'hours',
      title: 'DPJ emergency measures',
      body:
        "If a child's safety is at risk, the DPJ can act right away, for example by placing the child with someone else. These measures last **48 hours at most**. To go further, the DPJ must go to court.",
      refs: [{ label: 'YPA, s. 46' }],
    },
    {
      id: 'withdrawal',
      value: 30,
      unit: 'days',
      unitLabel: 'days',
      title: 'Changing your mind after consenting',
      body:
        "A parent who consented to adoption can withdraw that consent within **30 days**. The child must then be returned to them promptly, without formalities. After that, you can still ask the court to get the child back, as long as the child hasn't been placed for adoption.",
      refs: [{ label: 'C.C.Q., art. 557' }, { label: 'C.C.Q., art. 558' }],
    },
    {
      id: 'eligibility',
      value: 6,
      unit: 'months',
      unitLabel: 'months',
      title: 'When no one is caring for the child',
      body:
        "If the parents haven't cared for the child for **at least 6 months**, the court can declare the child eligible for adoption, but only if it's unlikely they will take that role back. Parents are notified and can be heard.",
      refs: [{ label: 'C.C.Q., art. 559' }, { label: 'C.C.Q., art. 561' }],
    },
    {
      id: 'living-together',
      value: 6,
      unit: 'months',
      unitLabel: 'months',
      title: 'Living together before the judgment',
      body:
        'After the placement order, the child lives with their future family. The adoption judgment can only be granted after **at least 6 months** together. The court can sometimes shorten this, for example if the child already lived with that family.',
      refs: [{ label: 'C.C.Q., art. 566' }],
    },
  ],
  placement: {
    title: 'How long can a child stay in temporary placement before a permanent plan must be decided?',
    body:
      'When the DPJ or the court places a child in another home (a foster family, relatives, a group resource), the law sets a **maximum length of time**. The younger the child, the shorter it is: at that age, the need for stability is urgent. All placement periods add up. Meanwhile, the first goal is still for the child to return home, with support.',
    sliderLabel: "Child's age when placed",
    yearsWord: 'years old',
    resultPrefix: 'Maximum time before a permanency decision:',
    monthsWord: 'months',
    bands: [
      { ageLabel: 'Under 2', minAge: 0, maxAge: 2, months: 12 },
      { ageLabel: '2 to 5', minAge: 2, maxAge: 6, months: 18 },
      { ageLabel: '6 and older', minAge: 6, maxAge: 18, months: 24 },
    ],
    after:
      "**When the time is up**, the court must make a decision that gives the child stable bonds and a stable home, for good: returning to their family, tutorship, adoption, or a placement until adulthood. It can go past the limit for a serious reason, for example if a return home is planned soon or if the services promised to the parents weren't provided.",
    refs: [{ label: 'YPA, s. 91.1' }],
  },
}
