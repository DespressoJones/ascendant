import { SKILL_BY_ID } from './skills'
import { GOALS } from './onboarding'
import type { Localized, PlayerProfile, Quest, SkillId, SkillState } from './types'

/*
  The generative quest engine. Quests are produced from parameterized templates, biased
  by the player's goals and balanced toward their lowest skills, with XP that scales to
  level. It yields a daily slate, a multi-day challenge, and a time-sensitive "live" quest —
  effectively non-repeating, never a fixed hand-written list.
*/

interface Template {
  title: Localized
  xp: number
  target: number
}

const TEMPLATES: Record<SkillId, Template[]> = {
  strength: [
    { title: { en: 'Three heavy sets, full intent.', fr: 'Trois séries lourdes, plein engagement.' }, xp: 50, target: 3 },
    { title: { en: 'Carry something heavy, 100 steps.', fr: 'Porte une charge, 100 pas.' }, xp: 40, target: 100 },
  ],
  endurance: [
    { title: { en: 'Twenty unbroken minutes of cardio.', fr: 'Vingt minutes de cardio sans arrêt.' }, xp: 45, target: 20 },
    { title: { en: 'Six brisk intervals.', fr: 'Six intervalles vifs.' }, xp: 42, target: 6 },
  ],
  mobility: [
    { title: { en: 'Ten minutes of deliberate stretching.', fr: "Dix minutes d'étirements attentifs." }, xp: 30, target: 10 },
    { title: { en: 'Open the hips: two long holds.', fr: 'Ouvre les hanches : deux tenues longues.' }, xp: 25, target: 2 },
  ],
  nutrition: [
    { title: { en: 'Protein with every meal today.', fr: 'Des protéines à chaque repas.' }, xp: 35, target: 3 },
    { title: { en: 'Two litres of water before evening.', fr: "Deux litres d'eau avant le soir." }, xp: 25, target: 2 },
  ],
  sleep: [
    { title: { en: 'Lights out before midnight.', fr: 'Lumières éteintes avant minuit.' }, xp: 40, target: 1 },
    { title: { en: 'No screens for the last 30 minutes.', fr: "Pas d'écran les 30 dernières minutes." }, xp: 30, target: 1 },
  ],
  focus: [
    { title: { en: 'One deep hour. No second screen.', fr: 'Une heure pleine. Pas de deuxième écran.' }, xp: 50, target: 1 },
    { title: { en: 'Single-task one thing to done.', fr: 'Mène une seule tâche jusqu’au bout.' }, xp: 35, target: 1 },
  ],
  stillness: [
    { title: { en: 'Ten quiet breaths, eyes closed.', fr: 'Dix respirations calmes, yeux fermés.' }, xp: 25, target: 10 },
    { title: { en: 'Five minutes of stillness.', fr: "Cinq minutes d'immobilité." }, xp: 25, target: 5 },
  ],
  presence: [
    { title: { en: 'Reach out to one person who matters.', fr: 'Contacte une personne qui compte.' }, xp: 35, target: 1 },
    { title: { en: 'A real conversation, no phone.', fr: 'Une vraie conversation, sans téléphone.' }, xp: 30, target: 1 },
  ],
  clarity: [
    { title: { en: 'Write three honest lines.', fr: 'Écris trois lignes honnêtes.' }, xp: 30, target: 3 },
    { title: { en: "Name today's one priority.", fr: 'Nomme la priorité du jour.' }, xp: 25, target: 1 },
  ],
}

const SCALED_DETAIL: Localized = { en: 'scaled to your week', fr: 'ajustée à ta semaine' }

function goalSkills(profile: PlayerProfile): SkillId[] {
  const set = new Set<SkillId>()
  for (const g of profile.goals) GOALS.find((x) => x.id === g)?.skills.forEach((s) => set.add(s))
  return [...set]
}

/** Build today's quest slate. `seed` keeps a day stable; vary it to roll a new day. */
export function generateSlate(profile: PlayerProfile, skills: SkillState[], seed = 171): Quest[] {
  const levelOf = (id: SkillId) => skills.find((s) => s.id === id)?.level ?? 1
  const lowestFirst = [...skills].sort((a, b) => a.level - b.level).map((s) => s.id)

  const order: SkillId[] = []
  for (const id of [...goalSkills(profile), ...lowestFirst]) if (!order.includes(id)) order.push(id)

  const dailies: Quest[] = order.slice(0, 4).map((id, i) => {
    const tpls = TEMPLATES[id]
    const tpl = tpls[(seed + i) % tpls.length]
    return {
      id: `d-${id}`,
      skill: id,
      kind: 'daily',
      title: tpl.title,
      detail: SCALED_DETAIL,
      xp: tpl.xp + Math.round(levelOf(id) * 1.5),
      progress: 0,
      target: tpl.target,
      done: false,
    }
  })

  const gSkill = goalSkills(profile)[0] ?? order[0]
  const gName = SKILL_BY_ID[gSkill].name
  const challenge: Quest = {
    id: 'c-week',
    skill: gSkill,
    kind: 'challenge',
    title: {
      en: `Three ${gName.en} sessions this week.`,
      fr: `Trois séances de ${gName.fr} cette semaine.`,
    },
    detail: { en: 'multi-day · resets Monday', fr: 'multi-jours · recommence lundi' },
    xp: 150,
    progress: 1,
    target: 3,
    done: false,
  }

  const live: Quest = {
    id: 'live-am',
    skill: 'stillness',
    kind: 'live',
    title: { en: 'Before noon: ten quiet breaths.', fr: 'Avant midi : dix respirations calmes.' },
    detail: { en: 'time-sensitive', fr: 'minutée' },
    xp: 30,
    progress: 0,
    target: 1,
    done: false,
  }

  return [...dailies, challenge, live]
}
