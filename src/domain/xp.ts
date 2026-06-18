import type { SkillState, TierStage } from './types'

/*
  XP & progression math. A gentle exponential curve: early levels come quickly to
  build momentum; later levels ask for more. Overall tier is DERIVED from the skills,
  never set directly — you rise by training, not by a global meter.
*/

/** XP required to advance FROM `level` to the next. */
export function xpForLevel(level: number): number {
  return Math.round(80 * Math.pow(level, 1.45)) + 40
}

/** Total XP needed to reach `level` from zero. */
export function xpToReach(level: number): number {
  let total = 0
  for (let l = 1; l < level; l++) total += xpForLevel(l)
  return total
}

/** The level a given total XP buys. */
export function levelForXp(xp: number): number {
  let level = 1
  while (xp >= xpToReach(level + 1)) level++
  return level
}

/** Progress within the current level: raw XP into it, the span, and a 0–1 ratio. */
export function levelProgress(skill: SkillState) {
  const floor = xpToReach(skill.level)
  const span = xpForLevel(skill.level)
  const into = Math.max(0, skill.xp - floor)
  return { into, span, ratio: Math.min(1, into / span) }
}

/** Overall level = the mean of the nine skills. */
export function overallLevel(skills: SkillState[]): number {
  if (!skills.length) return 1
  const mean = skills.reduce((s, k) => s + k.level, 0) / skills.length
  return Math.round(mean)
}

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
export function roman(n: number): string {
  return ROMAN[n] ?? String(n)
}

/** Map an overall level to the familiar's evolution stage (I–V). */
export function tierStage(overall: number): TierStage {
  if (overall <= 3) return 1
  if (overall <= 7) return 2
  if (overall <= 11) return 3
  if (overall <= 16) return 4
  return 5
}
