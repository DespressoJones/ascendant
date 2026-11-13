/** Tiny DOM toolkit. No framework: sections build real elements and return them. */

type Child = Node | string | number | false | null | undefined | Child[]
type Attrs = Record<string, string | number | boolean | null | undefined | EventListener>

/**
 * h('div.card#id', { 'aria-label': 'x', onclick: fn }, child, 'text', [more])
 * Tag may carry .classes and #id. Attributes starting with "on" become listeners.
 */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K | `${K}.${string}` | `${K}#${string}`,
  attrs?: Attrs | null,
  ...children: Child[]
): HTMLElementTagNameMap[K]
export function h(tag: string, attrs?: Attrs | null, ...children: Child[]): HTMLElement
export function h(tag: string, attrs?: Attrs | null, ...children: Child[]): HTMLElement {
  const m = tag.match(/^([a-z0-9-]+)((?:[.#][^.#]+)*)$/i)
  const name = m ? m[1] : 'div'
  const el = document.createElement(name)
  if (m && m[2]) {
    for (const part of m[2].match(/[.#][^.#]+/g) ?? []) {
      if (part[0] === '.') el.classList.add(part.slice(1))
      else el.id = part.slice(1)
    }
  }
  if (attrs) setAttrs(el, attrs)
  append(el, children)
  return el
}

export function setAttrs(el: Element, attrs: Attrs) {
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue
    if (k.startsWith('on') && typeof v === 'function') {
      el.addEventListener(k.slice(2).toLowerCase(), v as EventListener)
    } else if (k === 'class') {
      el.classList.add(...String(v).split(/\s+/).filter(Boolean))
    } else if (k === 'html') {
      el.innerHTML = String(v)
    } else {
      el.setAttribute(k, v === true ? '' : String(v))
    }
  }
}

export function append(el: Node, children: Child[]) {
  for (const c of children) {
    if (c == null || c === false) continue
    if (Array.isArray(c)) append(el, c)
    else if (c instanceof Node) el.appendChild(c)
    else el.appendChild(document.createTextNode(String(c)))
  }
}

/** SVG element helper */
export function s(tag: string, attrs?: Record<string, string | number> | null, ...children: (SVGElement | null | false)[]) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
  if (attrs) for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v))
  for (const c of children) if (c) el.appendChild(c)
  return el
}

export const qs = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel)
export const qsa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel))

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/**
 * Render the tiny inline markup allowed in content strings:
 *   **bold**  and  [label](https://url)
 * Everything else is escaped. Returns a DocumentFragment.
 */
export function rich(text: string): DocumentFragment {
  const html = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  const t = document.createElement('template')
  t.innerHTML = html
  return t.content
}

/** <p> with rich text */
export const p = (text: string, cls = '') => {
  const el = document.createElement('p')
  if (cls) el.className = cls
  el.appendChild(rich(text))
  return el
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Stable id-safe slug */
export const slug = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
