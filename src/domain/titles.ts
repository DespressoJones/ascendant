import type { Localized } from './types'

/* Earned titles, derived from overall level — a tangible unlock as you rise. */
const TITLES: { min: number; label: Localized }[] = [
  { min: 1, label: { en: 'Initiate', fr: 'Initié' } },
  { min: 5, label: { en: 'Apprentice', fr: 'Apprenti' } },
  { min: 9, label: { en: 'Adept', fr: 'Adepte' } },
  { min: 13, label: { en: 'Artisan', fr: 'Artisan' } },
  { min: 17, label: { en: 'Master', fr: 'Maître' } },
  { min: 22, label: { en: 'Ascendant', fr: 'Ascendant' } },
]

export function titleFor(level: number): Localized {
  let found = TITLES[0]
  for (const t of TITLES) if (level >= t.min) found = t
  return found.label
}
