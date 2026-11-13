/**
 * CONTENT CONTRACT
 * ----------------
 * Every word on the site lives in src/content/{fr,en}/*.ts and must satisfy these types.
 * The two languages share one shape, so sections render identically in FR and EN.
 *
 * Writing rules (both languages):
 *  - Plain language first (aim for a grade-8 reading level). Legal precision second, in `refs`.
 *  - Trauma-informed vocabulary: "parent d'origine / birth parent", "confier un enfant à l'adoption /
 *    place a child for adoption" — never "abandonner / give up" unless quoting the law.
 *  - Every factual claim that a reader could act on carries a `refs` entry and/or `sources` ids
 *    that exist in content/sources.ts.
 *  - Strings may contain a tiny inline markup: **bold** and [link text](https://…). Nothing else.
 */

export type Lang = 'fr' | 'en'

/** A legal or official reference, shown as a mono "citation chip". e.g. { label: 'C.c.Q., art. 557' } */
export interface LegalRef {
  label: string
  url?: string
}

/** Ids of entries in content/sources.ts */
export type SourceId = string

export interface Source {
  id: SourceId
  publisher: string // e.g. "Gouvernement du Québec", "Éducaloi"
  title: { fr: string; en: string }
  url: string
  /** ISO date the page was read by our research team */
  checked: string
}

export type IconName =
  | 'hospital'
  | 'home'
  | 'family'
  | 'heart-hand'
  | 'globe'
  | 'compass'
  | 'scale'
  | 'clock'
  | 'shield'
  | 'doc'
  | 'phone'
  | 'search'
  | 'people'
  | 'key'
  | 'leaf'

/** One step on a journey. Steps are rendered along the red thread; `milestone` ties a knot. */
export interface Step {
  id: string
  /** Short, scannable timing badge: "Jour 0", "≤ 48 h", "After 30 days", "6 months minimum" */
  when?: string
  title: string
  /** 1–3 short sentences. What happens, in plain words. */
  body: string
  /** Optional bullets: concrete details, documents, what to ask. */
  details?: string[]
  /** Who is involved at this step (names of actors, plain words) */
  who?: string[]
  /** "You have the right to…" items, phrased for the reader of this journey */
  rights?: string[]
  /** An important caution (deadlines, irreversibility) */
  watch?: string
  refs?: LegalRef[]
  sources?: SourceId[]
  /** true for legally decisive moments (consent, placement order, judgment…) */
  milestone?: boolean
}

/** A scenario inside a journey, e.g. at the hospital: "I'm considering adoption" vs "The DPJ is involved" */
export interface Scenario {
  id: string
  label: string
  /** One line describing who this scenario is for */
  forWho: string
  steps: Step[]
  /** Closing note shown after the last step (where it can lead next) */
  outro?: string
}

export type JourneyId = 'hospital' | 'home' | 'family' | 'adopt' | 'abroad' | 'after'

export interface Journey {
  id: JourneyId
  icon: IconName
  /** The situation as the reader would say it: "À l'hôpital", "At home" */
  label: string
  /** 6–12 words */
  tagline: string
  scenarios: Scenario[]
}

export interface Paths {
  eyebrow: string
  title: string
  lede: string
  /** Label for the picker, e.g. "Où en êtes-vous ?" */
  pickerLabel: string
  stepWord: string // "Étape" / "Step"
  ofWord: string // "sur" / "of"
  whoLabel: string // "Qui est impliqué" / "Who's involved"
  rightsLabel: string // "Vos droits" / "Your rights"
  watchLabel: string // "Attention" / "Watch out"
  detailsLabel: string
  backToPicker: string
  journeys: Journey[]
}

/** Deadlines & durations visualised as clocks/rulers */
export interface Delay {
  id: string
  /** Numeric value used for the animated counter */
  value: number
  unit: 'hours' | 'days' | 'months' | 'years'
  /** Formatted unit word in the current language: "jours", "days" */
  unitLabel: string
  title: string
  body: string
  refs?: LegalRef[]
  sources?: SourceId[]
}

export interface PlacementBand {
  /** inclusive age range label, e.g. "0–1 an", "Under 2" */
  ageLabel: string
  /** max lower/upper age in years for the slider mapping: [min, max) */
  minAge: number
  maxAge: number
  months: number
}

export interface Clock {
  eyebrow: string
  title: string
  lede: string
  delays: Delay[]
  placement: {
    title: string
    body: string
    sliderLabel: string // "Âge de l'enfant au moment du placement"
    yearsWord: string // "ans" / "years old"
    resultPrefix: string // "Durée maximale avant une décision de permanence :"
    monthsWord: string
    bands: PlacementBand[]
    after: string // what happens when the time is up
    refs?: LegalRef[]
    sources?: SourceId[]
  }
}

export interface CompareRow {
  id: string
  name: string
  /** Who it's for, in a short phrase */
  forWho: string
  whoDecides: string
  cost: string
  time: string
  /** Does the child keep a legal tie with the family of origin? */
  keepsTie: string
  /** One line: how it starts */
  start: string
  refs?: LegalRef[]
  sources?: SourceId[]
}

export interface Compare {
  eyebrow: string
  title: string
  lede: string
  columns: {
    forWho: string
    whoDecides: string
    cost: string
    time: string
    keepsTie: string
    start: string
  }
  /** Adoption forms */
  adoption: CompareRow[]
  /** Alternatives that are NOT adoption (tutorship, supplementary tutorship, long-term placement…) */
  alternativesTitle: string
  alternatives: CompareRow[]
}

export interface Actor {
  id: string
  /** Acronym or short name: "DPJ" */
  short: string
  name: string
  /** What they do for you, plain words, 1–2 sentences */
  role: string
  /** Where you meet them in the process */
  when: string
  url?: string
}

export interface Actors {
  eyebrow: string
  title: string
  lede: string
  items: Actor[]
}

export interface Myth {
  id: string
  myth: string
  fact: string
  refs?: LegalRef[]
  sources?: SourceId[]
}

export interface Myths {
  eyebrow: string
  title: string
  lede: string
  /** Instruction: "Touchez un mythe pour le faire disparaître" */
  hint: string
  mythLabel: string // "Mythe"
  factLabel: string // "Réalité"
  resetLabel: string // "Tout réafficher"
  items: Myth[]
}

export interface RightsGroup {
  id: string
  who: string // "Les parents d'origine"
  icon: IconName
  items: { text: string; refs?: LegalRef[] }[]
}

export interface Rights {
  eyebrow: string
  title: string
  lede: string
  groups: RightsGroup[]
}

export interface AfterBlock {
  id: string
  icon: IconName
  title: string
  body: string
  points?: string[]
  /** Optional figures shown as large numbers, e.g. RQAP weeks */
  figures?: { value: string; label: string }[]
  refs?: LegalRef[]
  sources?: SourceId[]
}

export interface After {
  eyebrow: string
  title: string
  lede: string
  /** The animated "act of birth" explainer */
  certificate: {
    title: string
    body: string
    /** Labels on the mock document (NOT an official form) */
    docTitle: string
    fields: { label: string; before: string; after: string }[]
    sealedLabel: string // "Acte original scellé"
    note: string
    refs?: LegalRef[]
  }
  blocks: AfterBlock[]
}

export interface GlossaryTerm {
  id: string
  fr: string
  en: string
  /** Definition in the CURRENT language */
  def: string
}

export interface Glossary {
  eyebrow: string
  title: string
  lede: string
  searchLabel: string
  searchPlaceholder: string
  emptyLabel: string
  countLabel: string // "{n} termes" — {n} is replaced
  items: GlossaryTerm[]
}

export interface HelpItem {
  id: string
  name: string
  desc: string
  phone?: string
  url?: string
  /** "24/7", "Lun–ven 9 h–17 h" */
  hours?: string
  urgent?: boolean
}

export interface Help {
  eyebrow: string
  title: string
  lede: string
  emergency: string // "Danger immédiat ? Composez le 911."
  copyLabel: string
  copiedLabel: string
  items: HelpItem[]
}

export interface Principles {
  eyebrow: string
  title: string
  items: { id: string; title: string; body: string; refs?: LegalRef[] }[]
}

export interface Hero {
  eyebrow: string
  /** Display lines; each line animates separately */
  titleLines: string[]
  /**
   * After the intro, the word `from` (which must appear in the LAST title line) turns to dust
   * and `to` assembles in its place. e.g. { from: 'sans le flou.', to: 'étape par étape.' }
   */
  swap?: { from: string; to: string }
  lede: string
  /** Hint under the pluckable thread, e.g. "Pincez le fil" / "Pluck the thread" */
  pluckHint: string
  ctaPrimary: string
  ctaSecondary: string
  scrollHint: string
  /** Up to 3 figures from published statistics */
  stats: { value: string; label: string; source?: SourceId }[]
  /**
   * The hero "dossier": 3–4 paper cards laced on the red thread, one per decisive legal moment,
   * in real chronological order. tag = short mono label (e.g. "C.c.Q. 557"), title = the moment,
   * note = one short plain-language line.
   */
  dossier: { tag: string; title: string; note: string }[]
}

export interface Footer {
  disclaimerTitle: string
  disclaimer: string
  sourcesTitle: string
  sourcesLede: string
  lastChecked: string // "Contenu vérifié en novembre 2026"
  credits: string
  backToTop: string
}

export interface UI {
  siteName: string // "Le fil rouge"
  siteTagline: string
  metaTitle: string
  metaDescription: string
  skipToContent: string
  langToggleLabel: string // "Switch to English"
  otherLangShort: string // "EN"
  menu: string
  close: string
  nav: { id: string; label: string }[]
  refsLabel: string // "Références"
  sourcesLabel: string
  openSource: string
}

export interface Content {
  lang: Lang
  ui: UI
  hero: Hero
  principles: Principles
  paths: Paths
  clock: Clock
  compare: Compare
  actors: Actors
  myths: Myths
  rights: Rights
  after: After
  glossary: Glossary
  help: Help
  footer: Footer
}
