/**
 * APP SHELL: header, mobile menu, footer, section mounting, language switching.
 */
import type { Content, Lang } from './content/types'
import { h, qsa, rich } from './core/dom'
import { content, saveLang } from './core/i18n'
import { gsap, ScrollTrigger, motion, initSmoothScroll, scrollToTarget, teardownAll, onTeardown, refreshSoon, stopScroll, startScroll } from './core/motion'
import { initReveals, initCounters } from './core/reveal'
import { initThread } from './core/thread'
import { initCursor, magnetic } from './core/interactions'
import { brandMark, icon } from './core/icons'
import { sections } from './sections/registry'
import { sources } from './content/sources'
import { mountAssistant } from './assistant/ui'

let current: Lang = 'fr'
const root = document.getElementById('app')!
let assistant: ReturnType<typeof mountAssistant> | null = null

/* ------------------------------------------------------------------ header */
function header(c: Content) {
  const nav = h(
    'nav.site-nav',
    { 'aria-label': c.ui.menu },
    c.ui.nav.map((n) => h('a', { href: `#${n.id}`, 'data-nav': n.id }, n.label)),
  )
  const lang = h(
    'button.lang-toggle',
    { type: 'button', 'aria-label': c.ui.langToggleLabel, title: c.ui.langToggleLabel, lang: c.lang === 'fr' ? 'en' : 'fr' },
    c.ui.otherLangShort,
  )
  lang.addEventListener('click', () => switchLang(current === 'fr' ? 'en' : 'fr'))
  const menuBtn = h(
    'button.menu-toggle',
    { type: 'button', 'aria-expanded': 'false', 'aria-controls': 'menu-panel', 'aria-label': c.ui.menu },
    h('span'),
  )
  return h(
    'header.site-header',
    null,
    h(
      'div.wrap',
      null,
      h('a.brand', { href: '#top', 'aria-label': c.ui.siteName }, brandMark(), h('span', null, c.ui.siteName)),
      nav,
      h('div.header-actions', null, lang, menuBtn),
    ),
  )
}

function menuPanel(c: Content) {
  return h(
    'div.menu-panel#menu-panel',
    { 'aria-hidden': 'true' },
    h(
      'div.wrap',
      null,
      h(
        'ol',
        null,
        c.ui.nav.map((n) => h('li', null, h('a', { href: `#${n.id}` }, n.label))),
      ),
    ),
  )
}

/* ------------------------------------------------------------------ footer */
function footer(c: Content) {
  const f = c.footer
  const disclaimer = h('p.footer-disclaimer')
  disclaimer.append(rich(f.disclaimer))
  const srcList = sources.length
    ? h(
        'ol.sources-list',
        null,
        sources.map((s) =>
          h(
            'li',
            { id: `src-${s.id}` },
            h('a', { href: s.url, target: '_blank', rel: 'noopener' }, s.title[c.lang]),
            h('span.muted', null, ` · ${s.publisher}`),
          ),
        ),
      )
    : null
  return h(
    'footer.site-footer',
    { id: 'sources' },
    h(
      'div.wrap',
      null,
      h(
        'div.footer-grid',
        null,
        h('div.footer-note', { 'data-thread': 'left' }, h('h2.footer-h', null, f.disclaimerTitle), disclaimer, h('p.badge.badge-calm', null, f.lastChecked)),
        h('div.footer-sources', null, h('h2.footer-h', null, f.sourcesTitle), h('p.muted', null, f.sourcesLede), srcList),
      ),
      h(
        'div.footer-bottom',
        null,
        h('a.brand.footer-brand', { href: '#top' }, brandMark(), h('span', null, c.ui.siteName)),
        h('p.muted', null, f.credits),
        h('a.btn.btn-ghost.btn-small', { href: '#top' }, icon('arrow', 'flip-up'), h('span.btn-label', null, f.backToTop)),
      ),
    ),
  )
}

/* ------------------------------------------------------------------ render */
function render(lang: Lang) {
  const c = content(lang)
  current = lang
  document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA'
  document.title = c.ui.metaTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', c.ui.metaDescription)

  const main = h('main#main', { tabindex: '-1' })
  for (const def of sections) {
    try {
      const el = def.render(c)
      el.dataset.section = def.id
      main.append(el)
    } catch (e) {
      console.error(`section ${def.id} failed to render`, e)
    }
  }

  root.replaceChildren(
    h('a.skip-link', { href: '#main' }, c.ui.skipToContent),
    h('div.progress-thread', { 'aria-hidden': 'true' }),
    header(c),
    menuPanel(c),
    main,
    footer(c),
  )
  return { c, main }
}

/* ------------------------------------------------------------------ behaviour */
function enhance(c: Content, main: HTMLElement) {
  const headerEl = root.querySelector<HTMLElement>('.site-header')!
  const menu = root.querySelector<HTMLElement>('.menu-panel')!
  const menuBtn = root.querySelector<HTMLButtonElement>('.menu-toggle')!

  // anchor links → smooth scroll
  root.addEventListener('click', onAnchorClick)
  onTeardown(() => root.removeEventListener('click', onAnchorClick))

  // mobile menu
  const setMenu = (open: boolean) => {
    menu.classList.toggle('is-open', open)
    menu.setAttribute('aria-hidden', String(!open))
    menuBtn.setAttribute('aria-expanded', String(open))
    menuBtn.setAttribute('aria-label', open ? c.ui.close : c.ui.menu)
    if (open) stopScroll()
    else startScroll()
    if (open && !motion.reduced) {
      gsap.fromTo(menu.querySelectorAll('li'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.8, ease: 'expo.out', delay: 0.15 })
    }
  }
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')))
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setMenu(false)
  })
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false)
  }
  document.addEventListener('keydown', onKey)
  onTeardown(() => document.removeEventListener('keydown', onKey))

  // header: solid after scrolling, hides on the way down, returns on the way up
  const progress = root.querySelector<HTMLElement>('.progress-thread')!
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      headerEl.classList.toggle('is-scrolled', self.scroll() > 24)
      headerEl.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 600 && !menu.classList.contains('is-open'))
      progress.style.transform = `scaleX(${self.progress})`
    },
  })

  // active nav item
  const links = qsa<HTMLAnchorElement>('.site-nav a', headerEl)
  for (const n of c.ui.nav) {
    const target = document.getElementById(n.id)
    if (!target) continue
    ScrollTrigger.create({
      trigger: target,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.nav === n.id)))
      },
    })
  }

  for (const def of sections) {
    const el = main.querySelector<HTMLElement>(`[data-section="${def.id}"]`)
    if (!el || !def.enhance) continue
    try {
      def.enhance(el, c)
    } catch (e) {
      console.error(`section ${def.id} failed to enhance`, e)
    }
  }

  initReveals(root)
  initCounters(root)
  initThread(main)
  root.querySelectorAll<HTMLElement>('.footer-bottom .btn').forEach((b) => magnetic(b))
  document.fonts?.ready.then(() => refreshSoon(50))
  refreshSoon(300)
}

function onAnchorClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
  if (!a || e.defaultPrevented) return
  const id = a.getAttribute('href')!
  if (id.length < 2) return
  const target = document.querySelector<HTMLElement>(id)
  if (!target) return
  e.preventDefault()
  scrollToTarget(target)
  if (id === '#main' || id === '#top') (document.getElementById('main') as HTMLElement | null)?.focus({ preventScroll: true })
}

/* ------------------------------------------------------------------ language switching */
let switching = false
async function switchLang(next: Lang) {
  if (switching || next === current) return
  switching = true
  saveLang(next)

  // remember which section the reader is in, to land them back there
  const mid = window.innerHeight * 0.4
  const inView = qsa<HTMLElement>('main > [data-section]').find((s) => {
    const r = s.getBoundingClientRect()
    return r.top <= mid && r.bottom >= mid
  })
  const anchorId = inView?.id
  const offsetInSection = inView ? mid - inView.getBoundingClientRect().top : 0

  const curtain = h('div.lang-curtain', { 'aria-hidden': 'true' }, h('span', null, next === 'fr' ? 'Français' : 'English'))
  document.body.append(curtain)
  if (!motion.reduced) {
    await gsap.fromTo(curtain, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power3.inOut' })
  }
  teardownAll()
  const { c, main } = render(next)
  const target = anchorId ? document.getElementById(anchorId) : null
  if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - mid + offsetInSection)
  enhance(c, main)
  assistant?.setLang(next)
  ScrollTrigger.refresh()
  if (!motion.reduced) {
    await gsap.to(curtain, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power3.inOut', delay: 0.15 })
  }
  curtain.remove()
  switching = false
}

/* ------------------------------------------------------------------ boot */
export function boot(lang: Lang) {
  const { c, main } = render(lang)
  initSmoothScroll()
  initCursor()
  enhance(c, main)
  assistant = mountAssistant(() => current)
  if (location.hash.length > 1 && !/^#(fr|en)$/.test(location.hash)) {
    const t = document.querySelector<HTMLElement>(location.hash)
    if (t) setTimeout(() => scrollToTarget(t), 400)
  }
}
