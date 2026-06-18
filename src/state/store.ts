import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { levelForXp } from '@/domain/xp'
import { seedProfile, seedQuest, seedSkills, seedStreakDays } from '@/domain/sampleState'
import type { Locale, PlayerProfile, Quest, SkillState, WorldId } from '@/domain/types'

/*
  Local-first store. State persists to localStorage and would later sync when signed in.
  completeQuest is a REAL mutation — it awards XP and can level the skill up, so the
  familiar and ledger respond to action rather than showing static placeholder numbers.
*/

const WORLDS: WorldId[] = ['ink', 'bronze', 'atelier', 'paper']

interface GameState {
  locale: Locale
  world: WorldId
  profile: PlayerProfile
  skills: SkillState[]
  quest: Quest
  streakDays: number

  toggleLocale: () => void
  setWorld: (w: WorldId) => void
  cycleWorld: () => void
  completeQuest: () => void
}

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      locale: 'en',
      world: 'ink',
      profile: seedProfile,
      skills: seedSkills,
      quest: seedQuest,
      streakDays: seedStreakDays,

      toggleLocale: () => set((s) => ({ locale: s.locale === 'en' ? 'fr' : 'en' })),
      setWorld: (world) => set({ world }),
      cycleWorld: () =>
        set((s) => ({ world: WORLDS[(WORLDS.indexOf(s.world) + 1) % WORLDS.length] })),

      completeQuest: () =>
        set((s) => {
          if (s.quest.done) return s
          const skills = s.skills.map((k) => {
            if (k.id !== s.quest.skill) return k
            const xp = k.xp + s.quest.xp
            return { ...k, xp, level: levelForXp(xp) }
          })
          return {
            skills,
            quest: { ...s.quest, done: true, progress: s.quest.target ?? 1 },
          }
        }),
    }),
    { name: 'ascendant', version: 1 },
  ),
)
