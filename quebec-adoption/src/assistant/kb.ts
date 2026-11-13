/**
 * KNOWLEDGE BASE for the guide assistant.
 *
 * Turns the site's own verified content (one language at a time) into small "chunks": one per
 * journey step, myth, right, deadline, adoption form, actor, after-adoption topic, glossary term,
 * help contact… Each chunk knows where it lives on the page, so an answer can link straight to it.
 *
 * Pure data → no DOM access, so it also runs in Node (scripts/build-kb.ts) for the API proxy.
 */
import type { Content, LegalRef } from '../content/types'

export type ChunkKind =
  | 'path'
  | 'scenario'
  | 'principle'
  | 'deadline'
  | 'placement'
  | 'form'
  | 'alternative'
  | 'actor'
  | 'myth'
  | 'right'
  | 'after'
  | 'certificate'
  | 'term'
  | 'help'
  | 'emergency'

/** How the page reaches a chunk: an element id, plus what to do with it. */
export interface Target {
  /** element id to scroll to */
  id: string
  /** 'click' presses the element (tabs, accordions, myth cards); 'path' selects a journey step */
  action?: 'click' | 'path' | 'actor'
  /** fallback element id (e.g. the mobile accordion row for an actor) */
  alt?: string
}

export interface Chunk {
  /** stable, readable id the model cites: e.g. "path:hospital/considering/consent" */
  id: string
  kind: ChunkKind
  /** short human label, used for link chips */
  title: string
  /** full plain text the model reads */
  text: string
  target: Target
}

export interface KB {
  lang: Content['lang']
  chunks: Chunk[]
  byId: Map<string, Chunk>
}

/* same slug as core/dom.ts (kept here so this file has no DOM-module imports) */
const slug = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
const sid = (id: string) => slug(id) || 'x'

/** strip the tiny inline markup (**bold**, [label](url)) to plain text */
export const plain = (s: string) =>
  s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1 ($2)')
    .replace(/\s+/g, ' ')
    .trim()

const refs = (r?: LegalRef[]) => (r?.length ? r.map((x) => x.label).join('; ') : '')

const lines = (parts: (string | number | false | undefined | null)[]) => parts.filter((p) => typeof p === 'string' && p).join('\n')

export function buildKB(c: Content): KB {
  const fr = c.lang === 'fr'
  const L = {
    details: fr ? 'Détails' : 'Details',
    who: fr ? 'Qui' : 'Who',
    rights: fr ? 'Vos droits' : 'Your rights',
    watch: fr ? 'Attention' : 'Watch out',
    refs: fr ? 'Références' : 'References',
    forWho: c.compare.columns.forWho,
    whoDecides: c.compare.columns.whoDecides,
    cost: c.compare.columns.cost,
    time: c.compare.columns.time,
    keepsTie: c.compare.columns.keepsTie,
    start: c.compare.columns.start,
    myth: c.myths.mythLabel,
    fact: c.myths.factLabel,
    phone: fr ? 'Téléphone' : 'Phone',
    hours: fr ? 'Heures' : 'Hours',
    site: fr ? 'Site' : 'Website',
    when: fr ? 'Quand' : 'When',
    role: fr ? 'Rôle' : 'Role',
    step: c.paths.stepWord,
  }
  const chunks: Chunk[] = []
  const add = (ch: Chunk) => chunks.push(ch)

  /* ---------------------------------------------------------------- journeys */
  for (const j of c.paths.journeys) {
    for (const sc of j.scenarios) {
      const base = `path-${j.id}--${sid(sc.id)}`
      add({
        id: `scenario:${j.id}/${sid(sc.id)}`,
        kind: 'scenario',
        title: `${j.label} › ${sc.label}`,
        text: lines([
          `${j.label} › ${sc.label}`,
          plain(j.tagline),
          plain(sc.forWho),
          `${fr ? 'Étapes' : 'Steps'}: ${sc.steps.map((s, i) => `${i + 1}. ${plain(s.title)}`).join(' / ')}`,
          sc.outro && plain(sc.outro),
        ]),
        target: { id: base, action: 'path' },
      })
      sc.steps.forEach((st, i) => {
        add({
          id: `path:${j.id}/${sid(sc.id)}/${sid(st.id)}`,
          kind: 'path',
          title: `${j.label} · ${L.step} ${i + 1} : ${plain(st.title)}`,
          text: lines([
            `${j.label} › ${sc.label} › ${L.step} ${i + 1}/${sc.steps.length}: ${plain(st.title)}${st.when ? ` (${plain(st.when)})` : ''}`,
            plain(st.body),
            st.details?.length && `${L.details}: ${st.details.map(plain).join(' | ')}`,
            st.who?.length && `${L.who}: ${st.who.map(plain).join(', ')}`,
            st.rights?.length && `${L.rights}: ${st.rights.map(plain).join(' | ')}`,
            st.watch && `${L.watch}: ${plain(st.watch)}`,
            st.refs?.length && `${L.refs}: ${refs(st.refs)}`,
          ]),
          target: { id: `${base}--${sid(st.id)}`, action: 'path' },
        })
      })
    }
  }

  /* ---------------------------------------------------------------- principles */
  for (const p of c.principles.items) {
    add({
      id: `principle:${p.id}`,
      kind: 'principle',
      title: plain(p.title),
      text: lines([plain(p.title), plain(p.body), p.refs?.length && `${L.refs}: ${refs(p.refs)}`]),
      target: { id: `principles-${p.id}` },
    })
  }

  /* ---------------------------------------------------------------- deadlines */
  for (const d of c.clock.delays) {
    add({
      id: `deadline:${d.id}`,
      kind: 'deadline',
      title: `${d.value} ${d.unitLabel} · ${plain(d.title)}`,
      text: lines([
        `${d.value} ${d.unitLabel}: ${plain(d.title)}`,
        plain(d.body),
        d.refs?.length && `${L.refs}: ${refs(d.refs)}`,
      ]),
      target: { id: `clock-dial-${d.id}` },
    })
  }
  const pl = c.clock.placement
  if (pl.bands.length) {
    add({
      id: 'placement:max-durations',
      kind: 'placement',
      title: plain(pl.title),
      text: lines([
        plain(pl.title),
        plain(pl.body),
        pl.bands.map((b) => `${b.ageLabel}: ${b.months} ${pl.monthsWord}`).join(' | '),
        plain(pl.after),
        pl.refs?.length && `${L.refs}: ${refs(pl.refs)}`,
      ]),
      target: { id: 'clock-placement-title' },
    })
  }

  /* ---------------------------------------------------------------- forms of adoption + alternatives */
  const row = (r: (typeof c.compare.adoption)[number]) =>
    lines([
      plain(r.name),
      `${L.forWho}: ${plain(r.forWho)}`,
      `${L.whoDecides}: ${plain(r.whoDecides)}`,
      `${L.start}: ${plain(r.start)}`,
      `${L.time}: ${plain(r.time)}`,
      `${L.cost}: ${plain(r.cost)}`,
      `${L.keepsTie}: ${plain(r.keepsTie)}`,
      r.refs?.length && `${L.refs}: ${refs(r.refs)}`,
    ])
  for (const r of c.compare.adoption) {
    add({ id: `form:${r.id}`, kind: 'form', title: plain(r.name), text: row(r), target: { id: `compare-form-${r.id}-name` } })
  }
  for (const r of c.compare.alternatives) {
    add({
      id: `alternative:${r.id}`,
      kind: 'alternative',
      title: plain(r.name),
      text: `${plain(c.compare.alternativesTitle)} — ${row(r)}`,
      target: { id: `compare-alt-${r.id}-name` },
    })
  }

  /* ---------------------------------------------------------------- actors */
  for (const a of c.actors.items) {
    add({
      id: `actor:${sid(a.id)}`,
      kind: 'actor',
      title: `${a.short} · ${plain(a.name)}`,
      text: lines([
        `${a.short} — ${plain(a.name)}`,
        `${L.role}: ${plain(a.role)}`,
        `${L.when}: ${plain(a.when)}`,
        a.url && `${L.site}: ${a.url}`,
      ]),
      target: { id: `actors-tab-${sid(a.id)}`, alt: `actors-acc-${sid(a.id)}`, action: 'actor' },
    })
  }

  /* ---------------------------------------------------------------- myths */
  for (const m of c.myths.items) {
    add({
      id: `myth:${m.id}`,
      kind: 'myth',
      title: plain(m.myth),
      text: lines([`${L.myth}: ${plain(m.myth)}`, `${L.fact}: ${plain(m.fact)}`, m.refs?.length && `${L.refs}: ${refs(m.refs)}`]),
      target: { id: `myths-m-${m.id}`, action: 'click' },
    })
  }

  /* ---------------------------------------------------------------- rights */
  for (const g of c.rights.groups) {
    add({
      id: `rights:${g.id}`,
      kind: 'right',
      title: `${c.rights.eyebrow} · ${plain(g.who)}`,
      text: lines([
        `${c.rights.eyebrow} — ${plain(g.who)}`,
        ...g.items.map((it) => `- ${plain(it.text)}${it.refs?.length ? ` (${refs(it.refs)})` : ''}`),
      ]),
      target: { id: `rights-tab-${g.id}`, action: 'click' },
    })
  }

  /* ---------------------------------------------------------------- after the adoption */
  const cert = c.after.certificate
  if (cert.title) {
    add({
      id: 'after:act-of-birth',
      kind: 'certificate',
      title: plain(cert.title),
      text: lines([plain(cert.title), plain(cert.body), plain(cert.note), cert.refs?.length && `${L.refs}: ${refs(cert.refs)}`]),
      target: { id: 'after' },
    })
  }
  for (const b of c.after.blocks) {
    add({
      id: `after:${b.id}`,
      kind: 'after',
      title: plain(b.title),
      text: lines([
        plain(b.title),
        plain(b.body),
        b.points?.length && b.points.map((p) => `- ${plain(p)}`).join('\n'),
        b.figures?.length && b.figures.map((f) => `${f.value}: ${plain(f.label)}`).join(' | '),
        b.refs?.length && `${L.refs}: ${refs(b.refs)}`,
      ]),
      target: { id: `after-card-${b.id}` },
    })
  }

  /* ---------------------------------------------------------------- glossary */
  for (const t of c.glossary.items) {
    const term = fr ? t.fr : t.en
    const other = fr ? t.en : t.fr
    add({
      id: `term:${t.id}`,
      kind: 'term',
      title: term,
      text: `${term} (${fr ? 'en anglais' : 'in French'}: ${other}): ${plain(t.def)}`,
      target: { id: `glossary-t-${t.id}` },
    })
  }

  /* ---------------------------------------------------------------- help */
  add({
    id: 'help:emergency',
    kind: 'emergency',
    title: plain(c.help.emergency),
    text: plain(c.help.emergency),
    target: { id: 'help' },
  })
  for (const it of c.help.items) {
    add({
      id: `help:${it.id}`,
      kind: 'help',
      title: plain(it.name),
      text: lines([
        `${plain(it.name)}${it.urgent ? (fr ? ' (urgent)' : ' (urgent)') : ''}: ${plain(it.desc)}`,
        it.phone && `${L.phone}: ${it.phone}`,
        it.hours && `${L.hours}: ${it.hours}`,
        it.url && `${L.site}: ${it.url}`,
      ]),
      target: { id: `help-${it.id}-name` },
    })
  }

  return { lang: c.lang, chunks, byId: new Map(chunks.map((ch) => [ch.id, ch])) }
}

/** One line per chunk: the map of everything the assistant can point to. */
export function tocOf(kb: KB) {
  return kb.chunks
    .filter((c) => c.kind !== 'term')
    .map((c) => `${c.id} — ${c.title}`)
    .join('\n')
}

/** The whole guide as text (used by the server proxy, which can cache it). */
export function fullText(kb: KB) {
  return kb.chunks.map((c) => `### [${c.id}]\n${c.text}`).join('\n\n')
}
