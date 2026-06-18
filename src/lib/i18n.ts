import type { Locale, Localized } from '@/domain/types'

/** Pick the active-locale string from a Localized pair. */
export function L(v: Localized, locale: Locale): string {
  return v[locale]
}

/* UI chrome strings. English is the default; French is authored in parallel. */
export const ui = {
  mastheadLead: { en: 'Today', fr: "Aujourd'hui" },
  mastheadTrail: { en: 'the work', fr: 'le travail' },
  tier: { en: 'Tier', fr: 'Palier' },
  questEyebrow: { en: "Today's quest", fr: 'Quête du jour' },
  reinks: { en: 're-inks', fr: 'ré-encre' },
  begin: { en: 'Begin', fr: 'Commencer' },
  done: { en: 'Done', fr: 'Fait' },
  nineSkills: { en: 'Nine skills', fr: 'Neuf compétences' },
  tended: { en: 'days tended', fr: 'jours entretenus' },
} satisfies Record<string, Localized>

/*
  The guide's voice: a social worker's eye + a systems-thinker's read. Dry, honest before
  reassuring, never shaming. The morning line greets the blank page; finishing the quest
  reframes the reward as accrual, not a prize.
*/
export const coach = {
  morning: {
    en: "The page is blank — the most honest thing it'll be all day. Pick one line to write.",
    fr: "La page est blanche — c'est ce qu'elle a de plus honnête de la journée. Choisis une ligne à écrire.",
  },
  questDone: {
    en: "Done. The brush got a little surer — that's not a reward, it's the part of you that hour added.",
    fr: "C'est fait. Le pinceau est devenu un peu plus sûr — c'est pas une récompense, c'est la part de toi que cette heure a ajoutée.",
  },
} satisfies Record<string, Localized>
