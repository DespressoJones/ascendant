/* The typed domain model — the single source of truth the UI binds to. */

export type Locale = 'en' | 'fr'
export type WorldId = 'ink' | 'paper' | 'bronze' | 'atelier'

export type SkillId =
  | 'strength'
  | 'endurance'
  | 'mobility'
  | 'nutrition'
  | 'sleep'
  | 'focus'
  | 'stillness'
  | 'presence'
  | 'clarity'

export type SkillGroup = 'body' | 'fuel' | 'mind' | 'spirit'

export interface Localized {
  en: string
  fr: string
}

export interface SkillDef {
  id: SkillId
  name: Localized
  group: SkillGroup
  /** which part of the familiar this skill brightens — every quest names its payoff */
  familiarPart: Localized
}

export interface SkillState {
  id: SkillId
  level: number
  /** total XP accrued in this skill */
  xp: number
}

export type QuestKind = 'daily' | 'challenge' | 'live'

export interface Quest {
  id: string
  skill: SkillId
  kind: QuestKind
  title: Localized
  /** short trailing meta, e.g. how it scaled */
  detail: Localized
  xp: number
  progress?: number
  target?: number
  done: boolean
}

export interface PlayerProfile {
  handle: string
  /** coaching tone, 0 = gentle … 1 = tough */
  tone: number
  createdAt: string
}

/** the familiar's five evolution stages */
export type TierStage = 1 | 2 | 3 | 4 | 5
