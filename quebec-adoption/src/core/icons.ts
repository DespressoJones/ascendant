/** Line icons drawn on a 24-unit grid, 1.6 stroke, round caps. Styled by .icon in components.css. */
import type { IconName } from '../content/types'

const PATHS: Record<IconName | 'arrow' | 'arrow-down' | 'copy' | 'check' | 'external' | 'close' | 'plus' | 'knot', string> = {
  hospital:
    '<path d="M4 21V7.5L12 3l8 4.5V21"/><path d="M2.5 21h19"/><path d="M12 8v6M9 11h6"/><path d="M9.5 21v-3.5h5V21"/>',
  home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  family:
    '<circle cx="8" cy="7" r="2.6"/><circle cx="16.5" cy="8.5" r="2.1"/><circle cx="12.5" cy="14" r="1.7"/><path d="M3.5 20c0-3.4 2-5.6 4.5-5.6 1.1 0 2 .3 2.8 1"/><path d="M20.5 20c0-2.9-1.6-4.8-4-4.8-.9 0-1.7.3-2.3.7"/><path d="M10 20.5c0-1.8 1.1-3 2.5-3s2.5 1.2 2.5 3"/>',
  'heart-hand':
    '<path d="M12 10.5c-1.6-2.6-5.5-2-5.5 1 0 2.4 3.3 4.4 5.5 6 2.2-1.6 5.5-3.6 5.5-6 0-3-3.9-3.6-5.5-1Z"/><path d="M2.5 15.5 6 19c.8.8 1.9 1.3 3.1 1.3H15"/><path d="M21.5 15.5 18 19"/>',
  globe:
    '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/>',
  scale:
    '<path d="M12 4v16M7 20h10"/><path d="M5 7h14"/><path d="m5 7-2.5 6a2.8 2.8 0 0 0 5 0L5 7Z"/><path d="m19 7-2.5 6a2.8 2.8 0 0 0 5 0L19 7Z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  doc: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 15.5h6M9 8.5h2.5"/>',
  phone:
    '<path d="M5 4h3.5l1.5 4.2-2.1 1.3a11 11 0 0 0 6.6 6.6l1.3-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.9 20 4 13.1 3.5 5.6A1.5 1.5 0 0 1 5 4Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
  people:
    '<circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3.6 2.4-6 5.5-6s5.5 2.4 5.5 6"/><circle cx="17" cy="9" r="2.3"/><path d="M16.5 14.2c2.4.2 4 2.3 4 5.3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l1.5 1.5"/>',
  leaf: '<path d="M5 19c0-8 5-13.5 14-14-.5 9-6 14-14 14Z"/><path d="M5 19 13 11"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  'arrow-down': '<path d="M12 4v15M6 13l6 6 6-6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  check: '<path d="m4.5 12.5 4.5 4.5L19.5 7"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  knot: '<path d="M2 15c4 0 5-1 7-4s4-6 7-5 2 5-1 6-6 0-6-3 3-4 6-2 4 4 8 4"/>',
}

export type AnyIcon = keyof typeof PATHS

export function icon(name: AnyIcon, cls = ''): SVGSVGElement {
  const t = document.createElement('template')
  t.innerHTML = `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${PATHS[name] ?? ''}</svg>`
  return t.content.firstElementChild as SVGSVGElement
}

/** The brand mark: a knotted thread. */
export function brandMark(): SVGSVGElement {
  const t = document.createElement('template')
  t.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" class="brand-knot"><path d="M2 22c5 0 7-2 9.5-6.5S16 6 20.5 6.5s3.6 6.3-.6 8.2-8.4.3-8.1-3.6 4.6-4.8 8.4-2.1S25.8 22 30 22" fill="none" stroke-width="2.4" stroke-linecap="round"/></svg>`
  return t.content.firstElementChild as SVGSVGElement
}
