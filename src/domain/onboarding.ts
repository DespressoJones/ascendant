import type {
  ConstraintId,
  ContextId,
  EquipmentId,
  GoalId,
  Localized,
  SkillId,
} from './types'

/* The selectable options the first-run flow offers, with bilingual labels and the
   skills each goal emphasizes (used later to bias the generative quest engine). */

export interface GoalDef {
  id: GoalId
  label: Localized
  skills: SkillId[]
}

export const GOALS: GoalDef[] = [
  { id: 'strength', label: { en: 'Get stronger', fr: 'Devenir plus fort' }, skills: ['strength', 'mobility'] },
  { id: 'leanness', label: { en: 'Lean out', fr: "M'affûter" }, skills: ['endurance', 'nutrition'] },
  { id: 'focus', label: { en: 'Sharpen focus', fr: 'Aiguiser ma concentration' }, skills: ['focus', 'clarity'] },
  { id: 'sleep', label: { en: 'Sleep better', fr: 'Mieux dormir' }, skills: ['sleep'] },
  { id: 'calm', label: { en: 'Find calm', fr: 'Trouver le calme' }, skills: ['stillness', 'clarity'] },
  { id: 'energy', label: { en: 'More energy', fr: "Plus d'énergie" }, skills: ['endurance', 'sleep', 'nutrition'] },
]

export interface TimeDef {
  minutes: number
  label: Localized
}

export const TIME_OPTIONS: TimeDef[] = [
  { minutes: 10, label: { en: '10 min', fr: '10 min' } },
  { minutes: 20, label: { en: '20 min', fr: '20 min' } },
  { minutes: 30, label: { en: '30 min', fr: '30 min' } },
  { minutes: 45, label: { en: '45+ min', fr: '45+ min' } },
]

export const CONTEXTS: { id: ContextId; label: Localized }[] = [
  { id: 'home', label: { en: 'Home', fr: 'Maison' } },
  { id: 'gym', label: { en: 'Gym', fr: 'Gym' } },
  { id: 'outdoors', label: { en: 'Outdoors', fr: 'Plein air' } },
  { id: 'minimal', label: { en: 'Anywhere', fr: "N'importe où" } },
]

export const EQUIPMENT: { id: EquipmentId; label: Localized }[] = [
  { id: 'none', label: { en: 'Bodyweight', fr: 'Poids du corps' } },
  { id: 'basic', label: { en: 'Dumbbells & bands', fr: 'Haltères & élastiques' } },
  { id: 'full', label: { en: 'Full gym', fr: 'Gym complet' } },
]

export const CONSTRAINTS: { id: ConstraintId; label: Localized }[] = [
  { id: 'knees', label: { en: 'Knees', fr: 'Genoux' } },
  { id: 'back', label: { en: 'Back', fr: 'Dos' } },
  { id: 'shoulders', label: { en: 'Shoulders', fr: 'Épaules' } },
  { id: 'wrists', label: { en: 'Wrists', fr: 'Poignets' } },
]

export interface WorldSwatch {
  id: 'ink' | 'paper' | 'bronze' | 'atelier'
  name: Localized
  bg: string
  ink: string
  accent: string
}

export const WORLD_SWATCHES: WorldSwatch[] = [
  { id: 'ink', name: { en: 'Ink & Paper', fr: 'Encre & Papier' }, bg: '#0E0E0F', ink: '#ECE8DF', accent: '#C8442A' },
  { id: 'bronze', name: { en: 'Obsidian & Brass', fr: 'Obsidienne & Laiton' }, bg: '#0B0A09', ink: '#F4EFE6', accent: '#C8A35B' },
  { id: 'atelier', name: { en: 'Cold Atelier', fr: 'Atelier Froid' }, bg: '#0B0C0E', ink: '#ECECE4', accent: '#AECEDA' },
  { id: 'paper', name: { en: 'Daybook', fr: 'Cahier de Jour' }, bg: '#F4F1EA', ink: '#1A1714', accent: '#C8442A' },
]
