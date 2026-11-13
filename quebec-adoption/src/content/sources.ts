import type { Source } from './types'

/**
 * Every source cited anywhere on the site, merged from content/sources/*.ts.
 * Each of those files exports one or more Source[] arrays. Duplicate ids keep the first entry.
 */
const modules = import.meta.glob<Record<string, Source[]>>('./sources/*.ts', { eager: true })

const merged = new Map<string, Source>()
for (const path of Object.keys(modules).sort((a, b) => (a.endsWith('/core.ts') ? -1 : b.endsWith('/core.ts') ? 1 : a.localeCompare(b)))) {
  for (const list of Object.values(modules[path])) {
    if (!Array.isArray(list)) continue
    for (const s of list) if (!merged.has(s.id)) merged.set(s.id, s)
  }
}

export const sources: Source[] = [...merged.values()]

export const sourceById = (id: string) => merged.get(id)
