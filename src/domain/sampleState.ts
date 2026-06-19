import { SKILLS } from './skills'
import { generateSlate } from './quests'
import { xpForLevel, xpToReach } from './xp'
import type { PlayerProfile, SkillState } from './types'

/*
  The seed state for a returning player — their own local progression, not fabricated
  social proof. There is NO fake leaderboard or invented other-user data anywhere.
  Real actions (completing a quest) mutate it.
*/

const SEED: Record<string, [level: number, ratioIntoLevel: number]> = {
  strength: [14, 0.62],
  endurance: [11, 0.4],
  mobility: [9, 0.3],
  nutrition: [12, 0.5],
  sleep: [8, 0.22],
  focus: [17, 0.78],
  stillness: [10, 0.36],
  presence: [13, 0.54],
  clarity: [11, 0.44],
}

export const seedSkills: SkillState[] = SKILLS.map((s) => {
  const [level, ratio] = SEED[s.id]
  return { id: s.id, level, xp: xpToReach(level) + Math.round(ratio * xpForLevel(level)) }
})

export const seedProfile: PlayerProfile = {
  handle: 'you',
  goals: ['focus', 'strength'],
  minutesPerDay: 30,
  context: 'home',
  equipment: 'basic',
  constraints: [],
  tone: 0.5,
  world: 'ink',
  createdAt: '2026-06-18',
}

export const seedQuests = generateSlate(seedProfile, seedSkills)

export const seedStreakDays = 4
