import type { Content, Lang } from '../content/types'
import { fr } from '../content/fr'
import { en } from '../content/en'

const KEY = 'fil-rouge-lang'
const all: Record<Lang, Content> = { fr, en }

export function content(lang: Lang): Content {
  return all[lang]
}

export function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    /* storage can be unavailable */
  }
  const fromHash = location.hash.match(/^#(fr|en)$/)
  if (fromHash) return fromHash[1] as Lang
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const l of langs) {
    const code = (l || '').slice(0, 2).toLowerCase()
    if (code === 'fr') return 'fr'
    if (code === 'en') return 'en'
  }
  return 'fr'
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* ignore */
  }
}

/** Replace {n}-style placeholders */
export function fmt(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
}
