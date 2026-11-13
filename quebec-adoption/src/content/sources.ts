import type { Source } from './types'

/** Every source cited anywhere on the site. Ids are referenced from content `sources: [...]`. */
export const sources: Source[] = []

export const sourceById = (id: string) => sources.find((s) => s.id === id)
