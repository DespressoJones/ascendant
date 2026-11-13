/**
 * SECTION CONTRACT + shared building blocks.
 *
 * A section is a plain object:
 *   { id, render(content) → <section>, enhance?(sectionEl, content) }
 * render() must be pure DOM building (no timers, no listeners on window).
 * enhance() adds motion/interaction; wrap GSAP work in scope(el, () => …) and register any other
 * cleanup with onTeardown(), because the whole page is torn down and rebuilt on language change.
 *
 * Generic behaviour you get for free by adding attributes (see core/reveal.ts, core/thread.ts):
 *   data-reveal, data-reveal-stagger, data-split, data-count, data-thread, data-knot
 */
import type { Content, LegalRef, SourceId } from '../content/types'
import { h, rich } from '../core/dom'
import { sourceById } from '../content/sources'
import { icon } from '../core/icons'

export interface SectionDef {
  id: string
  render(c: Content): HTMLElement
  enhance?(el: HTMLElement, c: Content): void
}

/** Standard section frame with eyebrow, split-animated title, lede. Returns the parts. */
export function sectionShell(
  id: string,
  opts: { eyebrow?: string; title?: string; lede?: string; className?: string; thread?: string },
) {
  const head = h('header.section-head')
  if (opts.eyebrow) head.append(h('p.eyebrow', { 'data-thread': opts.thread ?? 'left', 'data-reveal': 'fade' }, opts.eyebrow))
  if (opts.title) {
    const t = h('h2.section-title', { 'data-split': 'words' })
    t.append(rich(opts.title))
    head.append(t)
  }
  if (opts.lede) {
    const l = h('p.lede', { 'data-reveal': 'up', 'data-delay': '0.15' })
    l.append(rich(opts.lede))
    head.append(l)
  }
  const body = h('div.section-body')
  const inner = h('div.wrap', null, head, body)
  const section = h('section.section', { id, class: opts.className ?? '', 'aria-labelledby': `${id}-title` }, inner)
  const titleEl = head.querySelector('h2')
  if (titleEl) titleEl.id = `${id}-title`
  else section.removeAttribute('aria-labelledby')
  return { section, inner, head, body }
}

/** Citation chips (+ links to sources). Returns null when there is nothing to cite. */
export function citations(refs?: LegalRef[], sourceIds?: SourceId[], lang: 'fr' | 'en' = 'fr') {
  const items: HTMLElement[] = []
  for (const r of refs ?? []) {
    items.push(
      r.url
        ? h('a.ref', { href: r.url, target: '_blank', rel: 'noopener' }, r.label)
        : h('span.ref', null, r.label),
    )
  }
  for (const id of sourceIds ?? []) {
    const src = sourceById(id)
    if (!src) continue
    items.push(
      h(
        'a.src-link',
        { href: src.url, target: '_blank', rel: 'noopener', title: src.title[lang] },
        `↗ ${src.publisher}`,
      ),
    )
  }
  return items.length ? h('div.refs', null, items) : null
}

/** Paragraph from rich text */
export function para(text: string, cls = '') {
  const el = h('p', cls ? { class: cls } : null)
  el.append(rich(text))
  return el
}

export function bullets(items: string[] | undefined, cls = 'bullets') {
  if (!items?.length) return null
  return h(
    'ul',
    { class: cls },
    items.map((t) => {
      const li = h('li')
      li.append(rich(t))
      return li
    }),
  )
}

export { icon }
