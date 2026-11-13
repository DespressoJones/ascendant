/**
 * Go-links: take the reader from an answer to the exact place in the guide, opening whatever
 * needs opening on the way (journey + scenario tabs, a myth card, a rights tab, an actor…).
 */
import type { Target } from './kb'
import { scrollToTarget, motion } from '../core/motion'

const visible = (el: HTMLElement | null) => !!el && el.getClientRects().length > 0

function ping(el: HTMLElement) {
  const box = el.closest<HTMLElement>('li, article, .card, [role="tabpanel"], section') ?? el
  box.classList.remove('is-pinged')
  void box.offsetWidth
  box.classList.add('is-pinged')
  window.setTimeout(() => box.classList.remove('is-pinged'), 2600)
}

function land(el: HTMLElement) {
  scrollToTarget(el)
  window.setTimeout(() => ping(el), motion.reduced ? 0 : 700)
}

export function goTo(target: Target) {
  switch (target.action) {
    case 'path': {
      // the paths section selects journey + scenario for any "#path-…" link clicked outside it
      const a = document.createElement('a')
      a.href = `#${target.id}`
      a.hidden = true
      document.body.append(a)
      a.click()
      a.remove()
      requestAnimationFrame(() => {
        const el = document.getElementById(target.id)
        if (el) land(el)
      })
      return
    }
    case 'actor': {
      const tab = document.getElementById(target.id)
      if (tab && visible(tab)) {
        tab.click()
        land(tab.closest<HTMLElement>('.actors-desk') ?? tab)
        return
      }
      const row = target.alt ? document.getElementById(target.alt) : null
      if (row) {
        if (row.getAttribute('aria-expanded') === 'false') row.click()
        land(row)
      }
      return
    }
    case 'click': {
      const el = document.getElementById(target.id)
      if (!el) return
      // myth cards: only turn them if they still show the myth; tabs: select
      if (el.getAttribute('aria-expanded') !== 'true' && el.getAttribute('aria-selected') !== 'true') el.click()
      land(el.closest<HTMLElement>('section') && el.getAttribute('role') === 'tab' ? (document.getElementById(target.id.replace('-tab', '')) ?? el) : el)
      return
    }
    default: {
      let el = document.getElementById(target.id)
      // a glossary term hidden by an active filter: clear the filter first
      if (el && !visible(el) && el.id.startsWith('glossary-t-')) {
        const input = document.querySelector<HTMLInputElement>('#glossary input[type="search"], #glossary input')
        if (input && input.value) {
          input.value = ''
          input.dispatchEvent(new Event('input', { bubbles: true }))
        }
        el = document.getElementById(target.id)
      }
      if (el) land(el)
    }
  }
}

/** "section:<id>" → the section itself */
export function sectionTarget(id: string): Target | null {
  return document.getElementById(id) ? { id } : null
}
