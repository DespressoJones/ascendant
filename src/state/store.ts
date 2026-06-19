import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { levelForXp } from '@/domain/xp'
import { seedProfile, seedQuests, seedSkills, seedStreakDays } from '@/domain/sampleState'
import type { Locale, PlayerProfile, Quest, SkillState, WorldId } from '@/domain/types'

/*
  Local-first store. State persists to localStorage and would later sync when signed in.
  `onboarded` gates first-run vs the app. completeQuest is a REAL mutation — it awards XP
  and can level the skill up, so the UI responds to action, not placeholders.
*/

const WORLDS: WorldId[] = ['ink', 'bronze', 'atelier', 'paper']

interface GameState {
  locale: Locale
  world: WorldId
  onboarded: boolean
  profile: PlayerProfile
  skills: SkillState[]
  quests: Quest[]
  streakDays: number

  toggleLocale: () => void
  setLocale: (l: Locale) => void
  setWorld: (w: WorldId) => void
  cycleWorld: () => void
  completeOnboarding: (p: PlayerProfile) => void
  completeQuest: (id: string) => void
}

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      locale: 'en',
      world: 'ink',
      onboarded: false,
      profile: seedProfile,
      skills: seedSkills,
      quests: seedQuests,
      streakDays: seedStreakDays,

      toggleLocale: () => set((s) => ({ locale: s.locale === 'en' ? 'fr' : 'en' })),
      setLocale: (locale) => set({ locale }),
      setWorld: (world) => set({ world }),
      cycleWorld: () => set((s) => ({ world: WORLDS[(WORLDS.indexOf(s.world) + 1) % WORLDS.length] })),

      completeOnboarding: (profile) => set({ profile, world: profile.world, onboarded: true }),

      completeQuest: (id) =>
        set((s) => {
          const q = s.quests.find((x) => x.id === id)
          if (!q || q.done) return s
          const skills = s.skills.map((k) => {
            if (k.id !== q.skill) return k
            const xp = k.xp + q.xp
            return { ...k, xp, level: levelForXp(xp) }
          })
          const quests = s.quests.map((x) => (x.id === id ? { ...x, done: true, progress: x.target ?? 1 } : x))
          return { skills, quests }
        }),
    }),
    { name: 'ascendant.v2', version: 2 },
  ),
)

/** The day's headline quest — first unfinished daily, else the first quest. */
export function primaryQuest(quests: Quest[]): Quest {
  return quests.find((q) => q.kind === 'daily' && !q.done) ?? quests.find((q) => !q.done) ?? quests[0]
}
