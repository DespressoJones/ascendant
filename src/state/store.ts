import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { levelForXp } from '@/domain/xp'
import { seedProfile, seedQuest, seedSkills, seedStreakDays } from '@/domain/sampleState'
import type { Locale, PlayerProfile, Quest, SkillState, WorldId } from '@/domain/types'

/*
  Local-first store. State persists to localStorage and would later sync when signed in.
  `onboarded` gates the first-run flow vs the app. completeQuest is a REAL mutation —
  it awards XP and can level the skill up, so the UI responds to action, not placeholders.
*/

const WORLDS: WorldId[] = ['ink', 'bronze', 'atelier', 'paper']

interface GameState {
  locale: Locale
  world: WorldId
  onboarded: boolean
  profile: PlayerProfile
  skills: SkillState[]
  quest: Quest
  streakDays: number

  toggleLocale: () => void
  setLocale: (l: Locale) => void
  setWorld: (w: WorldId) => void
  cycleWorld: () => void
  completeOnboarding: (p: PlayerProfile) => void
  completeQuest: () => void
}

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      locale: 'en',
      world: 'ink',
      onboarded: false,
      profile: seedProfile,
      skills: seedSkills,
      quest: seedQuest,
      streakDays: seedStreakDays,

      toggleLocale: () => set((s) => ({ locale: s.locale === 'en' ? 'fr' : 'en' })),
      setLocale: (locale) => set({ locale }),
      setWorld: (world) => set({ world }),
      cycleWorld: () => set((s) => ({ world: WORLDS[(WORLDS.indexOf(s.world) + 1) % WORLDS.length] })),

      completeOnboarding: (profile) => set({ profile, world: profile.world, onboarded: true }),

      completeQuest: () =>
        set((s) => {
          if (s.quest.done) return s
          const skills = s.skills.map((k) => {
            if (k.id !== s.quest.skill) return k
            const xp = k.xp + s.quest.xp
            return { ...k, xp, level: levelForXp(xp) }
          })
          return { skills, quest: { ...s.quest, done: true, progress: s.quest.target ?? 1 } }
        }),
    }),
    { name: 'ascendant.v2', version: 2 },
  ),
)
