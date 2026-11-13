/**
 * "DEMANDEZ AU FIL / ASK THE GUIDE": the floating question-answering assistant.
 *
 * Lives outside #app (it survives the language re-render and keeps the conversation).
 * Answers stream in; links of the form [label](#go:ID) become buttons that open the exact place
 * in the guide. Falls back to a plain guide search when no AI engine is available.
 */
import type { Lang } from '../content/types'
import { h } from '../core/dom'
import { gsap, motion, stopScroll, startScroll } from '../core/motion'
import { ask, detectMode, knowledge, localAnswer, type Mode, type AskError } from './engine'
import type { Turn } from './prompt'
import { goTo, sectionTarget } from './navigate'
import { isCrisis, guessLang } from './search'

const T = {
  fr: {
    launcher: 'Une question ?',
    launcherAria: 'Poser une question au guide',
    title: 'Demandez au fil',
    modeAI: 'Réponses de Claude, tirées de ce guide',
    modeLocal: 'Recherche dans le guide (sans IA)',
    intro:
      'Bonjour. Posez votre question avec vos mots : je réponds à partir de ce guide vérifié, puis je vous montre où lire la suite.',
    privacy: "Ne donnez ni nom ni détail qui permettrait de vous reconnaître. Ce n'est pas un avis juridique.",
    consent: "La première fois, on vous demandera d'autoriser Claude à répondre avec votre compte.",
    emergency: 'Danger immédiat ? Composez le **911**.',
    suggestLabel: 'Pour commencer',
    suggestions: [
      "Je suis enceinte et je pense à l'adoption. Par où commencer ?",
      'La DPJ a placé mon enfant. Est-ce que je peux le voir ?',
      "J'ai signé un consentement. Puis-je changer d'avis ?",
      "Je suis grand-mère. Comment m'occuper de mon petit-fils ?",
      "Comment retrouver mes parents d'origine ?",
      "L'adoption internationale est-elle encore possible ?",
    ],
    placeholder: 'Écrivez votre question…',
    inputLabel: 'Votre question',
    send: 'Envoyer',
    stop: 'Arrêter',
    newChat: 'Nouvelle conversation',
    close: 'Fermer',
    you: 'Vous',
    bot: 'Le fil',
    thinking: ['Je cherche dans le guide…', 'Je relis les étapes…', 'Je vérifie les délais et les droits…'],
    goPrefix: 'Aller à',
    errors: {
      rate_limited: "Trop de questions d'un coup. Réessayez dans un moment.",
      refused: 'Je ne peux pas répondre à cette question telle quelle. Essayez de la formuler autrement, ou consultez la section Aide.',
      truncated: 'Réponse coupée : posez une question plus précise.',
      fallback: "L'assistant IA n'est pas disponible ici. Je passe à la recherche dans le guide.",
      upstream_error: 'La réponse a été interrompue. Vous pouvez réessayer.',
      empty_completion: "Je n'ai pas pu formuler de réponse. Essayez une question plus courte.",
      prompt_too_large: 'Cette conversation est devenue trop longue. Commencez une nouvelle conversation.',
    } as Record<string, string>,
  },
  en: {
    launcher: 'Ask a question',
    launcherAria: 'Ask the guide a question',
    title: 'Ask the guide',
    modeAI: 'Answers by Claude, drawn from this guide',
    modeLocal: 'Guide search (no AI)',
    intro: 'Hello. Ask your question in your own words: I answer from this fact-checked guide, then show you where to read more.',
    privacy: 'Please don’t share names or details that could identify you. This is not legal advice.',
    consent: 'The first time, you will be asked to allow Claude to answer using your account.',
    emergency: 'Danger right now? Call **911**.',
    suggestLabel: 'To get started',
    suggestions: [
      "I'm pregnant and thinking about adoption. Where do I start?",
      'The DPJ placed my child. Can I still see them?',
      'I signed a consent. Can I change my mind?',
      "I'm a grandmother. How can I care for my grandson?",
      'How do I find my birth parents?',
      'Is international adoption still possible?',
    ],
    placeholder: 'Type your question…',
    inputLabel: 'Your question',
    send: 'Send',
    stop: 'Stop',
    newChat: 'New conversation',
    close: 'Close',
    you: 'You',
    bot: 'Le fil',
    thinking: ['Looking through the guide…', 'Re-reading the steps…', 'Checking deadlines and rights…'],
    goPrefix: 'Go to',
    errors: {
      rate_limited: 'Too many questions at once. Please try again in a moment.',
      refused: 'I can’t answer that as it is. Try rephrasing it, or see the Help section.',
      truncated: 'The answer was cut short: try a more specific question.',
      fallback: 'The AI assistant isn’t available here. Switching to guide search.',
      upstream_error: 'The answer was interrupted. You can try again.',
      empty_completion: 'I couldn’t put an answer together. Try a shorter question.',
      prompt_too_large: 'This conversation got too long. Please start a new one.',
    } as Record<string, string>,
  },
}

/* ---------------------------------------------------------------- answer rendering (safe, no innerHTML) */
function inline(text: string, lang: Lang, onGo: (id: string) => void): Node[] {
  const out: Node[] = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((#go:[^)\s]+|https?:\/\/[^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(document.createTextNode(text.slice(last, m.index)))
    if (m[1] != null) {
      out.push(h('strong', null, m[1]))
    } else {
      const label = m[2]
      const href = m[3]
      if (href.startsWith('#go:')) {
        const id = href.slice(4)
        if (resolves(id, lang)) {
          out.push(
            h(
              'button.ask-go-inline',
              { type: 'button', onclick: () => onGo(id), title: `${T[lang].goPrefix} : ${label}` },
              label,
            ),
          )
        } else out.push(document.createTextNode(label))
      } else {
        out.push(h('a', { href, target: '_blank', rel: 'noopener' }, label))
      }
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(document.createTextNode(text.slice(last)))
  return out
}

function resolves(id: string, lang: Lang) {
  if (id.startsWith('section:')) return true
  return knowledge().kb[lang].byId.has(id) || knowledge().kb[lang === 'fr' ? 'en' : 'fr'].byId.has(id)
}

function renderAnswer(text: string, lang: Lang, onGo: (id: string) => void): HTMLElement {
  const box = h('div.ask-md')
  const goLine = /^\s*→\s*\[([^\]]+)\]\(#go:([^)\s]+)\)\s*$/
  const chips: HTMLElement[] = []
  let list: HTMLElement | null = null
  let para: string[] = []
  const flushPara = () => {
    if (para.length) box.append(h('p', null, inline(para.join(' '), lang, onGo)))
    para = []
  }
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const go = line.match(goLine)
    if (go) {
      flushPara()
      list = null
      if (resolves(go[2], lang)) {
        const id = go[2]
        chips.push(h('button.ask-go', { type: 'button', onclick: () => onGo(id) }, h('span', { 'aria-hidden': 'true' }, '→'), go[1]))
      }
      continue
    }
    if (/^\s*[-•*]\s+/.test(line)) {
      flushPara()
      if (!list) {
        list = h('ul')
        box.append(list)
      }
      list.append(h('li', null, inline(line.replace(/^\s*[-•*]\s+/, ''), lang, onGo)))
      continue
    }
    if (!line.trim()) {
      flushPara()
      list = null
      continue
    }
    list = null
    para.push(line.replace(/^#+\s*/, ''))
  }
  flushPara()
  if (chips.length) box.append(h('div.ask-gos', null, chips))
  return box
}

/* ---------------------------------------------------------------- the widget */
interface Msg {
  role: 'user' | 'assistant'
  text: string
  lang: Lang
  note?: string
}

export function mountAssistant(getLang: () => Lang) {
  let lang = getLang()
  let mode: Mode = 'local'
  let open = false
  let busy: AbortController | null = null
  const msgs: Msg[] = []

  const launcher = h('button.ask-launcher', { type: 'button', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-controls': 'ask-panel' })
  const panel = h('div.ask-panel#ask-panel', { role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'ask-title', hidden: true })
  document.body.append(launcher, panel)

  const knot = () => {
    const t = document.createElement('template')
    t.innerHTML =
      '<svg class="ask-knot" viewBox="0 0 32 32" aria-hidden="true"><path d="M2 22c5 0 7-2 9.5-6.5S16 6 20.5 6.5s3.6 6.3-.6 8.2-8.4.3-8.1-3.6 4.6-4.8 8.4-2.1S25.8 22 30 22" fill="none" stroke-width="2.4" stroke-linecap="round"/></svg>'
    return t.content.firstElementChild as SVGSVGElement
  }

  let log: HTMLElement
  let input: HTMLTextAreaElement
  let sendBtn: HTMLButtonElement
  let modeLine: HTMLElement
  let live: HTMLElement

  const onGo = (id: string) => {
    const k = knowledge()
    const target = id.startsWith('section:') ? sectionTarget(id.slice(8)) : (k.kb[lang].byId.get(id) ?? k.kb[lang === 'fr' ? 'en' : 'fr'].byId.get(id))?.target
    if (!target) return
    if (window.matchMedia('(max-width: 640px)').matches) setOpen(false)
    goTo(target)
  }

  function build() {
    const t = T[lang]
    launcher.replaceChildren(knot(), h('span.ask-launcher-label', null, t.launcher))
    launcher.setAttribute('aria-label', t.launcherAria)

    modeLine = h('p.ask-mode', null, mode === 'local' ? t.modeLocal : t.modeAI)
    const head = h(
      'header.ask-head',
      null,
      h('div.ask-head-id', null, knot(), h('div', null, h('h2.ask-title#ask-title', null, t.title), modeLine)),
      h(
        'div.ask-head-actions',
        null,
        h('button.ask-icon-btn', { type: 'button', 'aria-label': t.newChat, title: t.newChat, onclick: reset }, iconSvg('M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4')),
        h('button.ask-icon-btn', { type: 'button', 'aria-label': t.close, title: t.close, onclick: () => setOpen(false) }, iconSvg('M6 6l12 12M18 6 6 18')),
      ),
    )
    log = h('div.ask-log', { 'data-lenis-prevent': '', tabindex: '0', 'aria-label': t.title })
    live = h('div.sr-only', { 'aria-live': 'polite' })
    input = h('textarea.ask-input#ask-input', { rows: 1, maxlength: 600, placeholder: t.placeholder, 'aria-label': t.inputLabel }) as HTMLTextAreaElement
    sendBtn = h('button.ask-send', { type: 'submit', 'aria-label': t.send }, iconSvg('M4 12h15M13 6l6 6-6 6')) as HTMLButtonElement
    const form = h('form.ask-form', null, input, sendBtn)
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (busy) {
        busy.abort()
        return
      }
      submit(input.value)
    })
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
        e.preventDefault()
        form.requestSubmit()
      }
    })
    input.addEventListener('input', autosize)
    panel.replaceChildren(head, log, live, form)
    renderLog()
  }

  function iconSvg(d: string) {
    const t = document.createElement('template')
    t.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`
    return t.content.firstElementChild as SVGSVGElement
  }

  function autosize() {
    input.style.height = 'auto'
    input.style.height = `${Math.min(140, input.scrollHeight)}px`
  }

  function welcome() {
    const t = T[lang]
    const intro = h(
      'div.ask-welcome',
      null,
      h('p.ask-intro', null, t.intro),
      h('p.ask-emergency', null, inline(t.emergency, lang, onGo)),
      h('p.ask-fine', null, t.privacy, mode === 'claude' ? ` ${t.consent}` : ''),
      h('p.ask-suggest-label', null, t.suggestLabel),
      h(
        'div.ask-suggest',
        null,
        t.suggestions.map((q) => h('button.ask-chip', { type: 'button', onclick: () => submit(q) }, q)),
      ),
    )
    return intro
  }

  function bubble(m: Msg) {
    const t = T[lang]
    if (m.role === 'user') return h('div.ask-msg.ask-user', null, h('p.sr-only', null, `${t.you} :`), h('p', null, m.text))
    const el = h('div.ask-msg.ask-bot', null, h('p.sr-only', null, `${t.bot} :`), renderAnswer(m.text, m.lang, onGo))
    if (m.note) el.append(h('p.ask-note', null, m.note))
    return el
  }

  function renderLog() {
    log.replaceChildren(welcome(), ...msgs.map(bubble))
  }

  function scrollLog() {
    log.scrollTop = log.scrollHeight
  }

  function setBusy(on: boolean) {
    const t = T[lang]
    sendBtn.classList.toggle('is-stop', on)
    sendBtn.setAttribute('aria-label', on ? t.stop : t.send)
    sendBtn.replaceChildren(on ? iconSvg('M7 7h10v10H7z') : iconSvg('M4 12h15M13 6l6 6-6 6'))
    panel.classList.toggle('is-busy', on)
  }

  async function submit(raw: string) {
    const question = raw.trim().slice(0, 600)
    if (!question || busy) return
    input.value = ''
    autosize()
    const history: Turn[] = msgs.map((m) => ({ role: m.role, content: m.text }))
    msgs.push({ role: 'user', text: question, lang })
    log.append(bubble(msgs[msgs.length - 1]))

    // a thinking placeholder with a little knot being tied
    const t = T[lang]
    const thinking = h('div.ask-msg.ask-bot.ask-thinking', null, knot(), h('span.ask-thinking-text', null, t.thinking[0]))
    log.append(thinking)
    scrollLog()
    let tick = 0
    const timer = window.setInterval(() => {
      tick = (tick + 1) % t.thinking.length
      const s = thinking.querySelector('.ask-thinking-text')
      if (s) s.textContent = t.thinking[tick]
    }, 2600)

    // crisis words: show the emergency line immediately, before any AI answer arrives
    if (isCrisis(question)) {
      thinking.before(h('div.ask-msg.ask-bot.ask-urgent', null, h('p', null, inline(t.emergency, lang, onGo))))
    }

    const ctl = new AbortController()
    busy = ctl
    setBusy(true)
    let stream: HTMLElement | null = null
    let pending = ''
    let raf = 0
    const paint = () => {
      raf = 0
      if (!stream) {
        stream = h('div.ask-msg.ask-bot')
        thinking.replaceWith(stream)
        window.clearInterval(timer)
      }
      stream.replaceChildren(renderAnswer(pending, lang, onGo))
      const nearBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 120
      if (nearBottom) scrollLog()
    }
    try {
      const res = await ask({
        mode,
        question,
        history,
        siteLang: lang,
        signal: ctl.signal,
        onText: (text) => {
          pending = text
          if (!raf) raf = requestAnimationFrame(paint)
        },
      })
      cancelAnimationFrame(raf)
      const m: Msg = { role: 'assistant', text: res.text, lang: res.lang, note: res.truncated ? T[lang].errors.truncated : undefined }
      msgs.push(m)
      ;(stream ?? thinking).replaceWith(bubble(m))
      announce(res.text)
    } catch (e) {
      cancelAnimationFrame(raf)
      const err = e as AskError
      const keep = err.text?.trim()
      let note = err.code === 'cancelled' ? '' : (T[lang].errors[err.code] ?? T[lang].errors.upstream_error)
      if (err.fatal && mode !== 'local') {
        mode = 'local'
        modeLine.textContent = T[lang].modeLocal
        note = T[lang].errors.fallback
      }
      if (keep) {
        const m: Msg = { role: 'assistant', text: keep, lang, note: note || undefined }
        msgs.push(m)
        ;(stream ?? thinking).replaceWith(bubble(m))
      } else if (err.fatal) {
        // the AI can't be used in this view: answer right away with the guide search instead
        const qLang = guessLang(question, lang)
        const m: Msg = { role: 'assistant', text: localAnswer(question, qLang), lang: qLang, note }
        msgs.push(m)
        ;(stream ?? thinking).replaceWith(bubble(m))
      } else {
        // nothing usable came back: drop the question from the history (so a retry is clean)
        msgs.pop()
        ;(stream ?? thinking).replaceWith(h('div.ask-msg.ask-bot.ask-error', null, h('p', null, note || '…')))
        input.value = question
        autosize()
      }
    } finally {
      window.clearInterval(timer)
      if (busy === ctl) {
        busy = null
        setBusy(false)
      }
      scrollLog()
    }
  }

  function announce(text: string) {
    live.textContent = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '')
  }

  function reset() {
    busy?.abort()
    msgs.length = 0
    renderLog()
    input.focus()
  }

  const small = () => window.matchMedia('(max-width: 640px)').matches

  function setOpen(next: boolean) {
    if (next === open) return
    open = next
    launcher.setAttribute('aria-expanded', String(open))
    document.documentElement.classList.toggle('ask-open', open)
    if (open) {
      panel.hidden = false
      if (small()) stopScroll()
      if (!motion.reduced) {
        gsap.fromTo(
          panel,
          { clipPath: 'inset(92% 0% 0% 70% round 28px)', opacity: 0.4 },
          { clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1, duration: 0.6, ease: 'expo.out' },
        )
        gsap.fromTo(panel.querySelectorAll('.ask-welcome > *'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out', delay: 0.15 })
      }
      requestAnimationFrame(() => input.focus())
      scrollLog()
    } else {
      startScroll()
      const done = () => {
        panel.hidden = true
      }
      if (motion.reduced) done()
      else gsap.to(panel, { clipPath: 'inset(92% 0% 0% 70% round 28px)', opacity: 0, duration: 0.35, ease: 'power3.in', onComplete: done })
      launcher.focus()
    }
  }

  launcher.addEventListener('click', () => setOpen(!open))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false)
  })

  build()
  // light up the AI once the engine answers (never blocks first paint)
  detectMode().then((m) => {
    mode = m
    document.documentElement.dataset.ask = m
    build()
  })

  return {
    /** call after a language switch */
    setLang(next: Lang) {
      if (next === lang) return
      lang = next
      build()
    },
    open: () => setOpen(true),
  }
}
