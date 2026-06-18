import type { SkillDef, SkillId } from './types'

/*
  The nine skills. Each is leveled independently by its real-life activities, and each
  maps to a part of the familiar it brightens — so every action's payoff is legible and
  permanent ("this re-inks the neck line"). Discipline is a streak multiplier, not a 10th skill.
*/

export const SKILLS: SkillDef[] = [
  { id: 'strength', group: 'body', name: { en: 'Strength', fr: 'Force' }, familiarPart: { en: 'the body stroke', fr: 'le trait du corps' } },
  { id: 'endurance', group: 'body', name: { en: 'Endurance', fr: 'Endurance' }, familiarPart: { en: 'the wing sweep', fr: "le balayage de l'aile" } },
  { id: 'mobility', group: 'body', name: { en: 'Mobility', fr: 'Mobilité' }, familiarPart: { en: 'the wing arc', fr: "l'arc de l'aile" } },
  { id: 'nutrition', group: 'fuel', name: { en: 'Nutrition', fr: 'Nutrition' }, familiarPart: { en: 'the breast', fr: 'le poitrail' } },
  { id: 'sleep', group: 'fuel', name: { en: 'Sleep', fr: 'Sommeil' }, familiarPart: { en: 'the resting plume', fr: 'la plume au repos' } },
  { id: 'focus', group: 'mind', name: { en: 'Focus', fr: 'Concentration' }, familiarPart: { en: 'the neck line', fr: 'la ligne du cou' } },
  { id: 'stillness', group: 'mind', name: { en: 'Stillness', fr: 'Quiétude' }, familiarPart: { en: 'the aura', fr: "l'aura" } },
  { id: 'presence', group: 'spirit', name: { en: 'Presence', fr: 'Présence' }, familiarPart: { en: 'the crest', fr: 'la crête' } },
  { id: 'clarity', group: 'spirit', name: { en: 'Clarity', fr: 'Clarté' }, familiarPart: { en: 'the eye', fr: "l'œil" } },
]

export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s])) as Record<SkillId, SkillDef>
