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

/* First-run flow copy — characterful, never a sterile form. */
export const onboarding = {
  begin: { en: 'Begin', fr: 'Commencer' },
  continue: { en: 'Continue', fr: 'Continuer' },
  back: { en: 'Back', fr: 'Retour' },
  enter: { en: 'Enter', fr: 'Entrer' },
  skip: { en: 'Skip', fr: 'Passer' },
  of: { en: 'of', fr: 'de' },

  introLead: { en: 'Most apps ask', fr: 'La plupart des apps demandent' },
  introLeadItalic: { en: 'who you want to be.', fr: 'qui tu veux être.' },
  introBody: {
    en: "I'll ask what you actually did — then we build from there, one honest line at a time.",
    fr: "Moi, je demande ce que t'as vraiment fait — pis on bâtit à partir de là, une ligne honnête à la fois.",
  },

  goalsTitle: { en: 'What are you here to grow?', fr: 'Tu viens faire grandir quoi?' },
  goalsHint: { en: 'Pick up to three. Nothing is locked.', fr: "Choisis-en jusqu'à trois. Rien n'est figé." },

  timeTitle: { en: 'How much time, most days?', fr: 'Combien de temps, la plupart des jours?' },
  timeHint: { en: "Be honest, not aspirational — I'll size the work to fit.", fr: "Sois honnête, pas idéaliste — j'ajuste la charge." },

  placeTitle: { en: 'Where do you train,', fr: "Où t'entraînes-tu," },
  placeTitleItalic: { en: 'and with what?', fr: 'et avec quoi?' },

  constraintsTitle: { en: 'Anything I should work around?', fr: 'Y a-t-il quelque chose à ménager?' },
  constraintsHint: { en: "I won't program toward pain.", fr: 'Je programmerai jamais vers la douleur.' },
  none: { en: 'Nothing right now', fr: 'Rien pour le moment' },

  toneTitle: { en: 'How should I talk to you?', fr: 'Comment je te parle?' },
  toneGentle: { en: 'Gentle', fr: 'Doux' },
  toneTough: { en: 'Tough', fr: 'Direct' },

  worldTitle: { en: 'Choose your world.', fr: 'Choisis ton monde.' },
  worldHint: { en: 'The look is yours — change it anytime.', fr: "L'allure t'appartient — change-la quand tu veux." },

  revealEyebrow: { en: 'Your profile is set', fr: 'Ton profil est prêt' },
  revealTitle: { en: 'Let’s begin', fr: 'On commence' },
  revealTitleItalic: { en: 'the work.', fr: 'le travail.' },
} satisfies Record<string, Localized>

/* The tone slider previews the voice live as you drag it. */
export const toneSample: Record<'gentle' | 'mid' | 'tough', Localized> = {
  gentle: {
    en: '“Rough day? Then today we just keep the thread from breaking. That counts.”',
    fr: '« Journée dure? Alors aujourd’hui, on garde juste le fil intact. Ça compte. »',
  },
  mid: {
    en: '“No drama. Pick one thing, do it well, log it. We compound from there.”',
    fr: '« Pas de drame. Choisis une affaire, fais-la bien, note-la. On accumule. »',
  },
  tough: {
    en: '“You’ve got twenty minutes and no excuse worth keeping. Let’s go.”',
    fr: '« T’as vingt minutes pis aucune excuse qui vaut la peine. On y va. »',
  },
}
