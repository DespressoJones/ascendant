/**
 * LOCAL SEARCH over the knowledge base (both languages at once: chunk ids are shared, so a
 * question in English finds French-site chunks and vice versa).
 *
 * BM25 on accent-folded, lightly stemmed tokens, a small lay-language → guide-vocabulary lexicon,
 * and title boosts. Used to pick the excerpts sent to Claude and as the no-AI fallback.
 */
import type { Chunk, KB } from './kb'

const STOP = new Set(
  (
    'a au aux avec ce ces cet cette dans de des du elle elles en est et etre eux il ils je la le les leur leurs lui ma mais me meme mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous y ' +
    'the a an and are as at be been but by can could do does for from had has have how i if in into is it its me my no not of on or our so that the their them then there these they this to was we were what when where which who why will with would you your am im ive dont '
  ).split(/\s+/),
)

/** lay words → guide words (all normalised, space separated) */
const LEXICON: [RegExp, string][] = [
  // origins first: "birth mother" is about origins, not about giving birth
  [/\b(birth (mother|father|parents?|family)|biological (mother|father|parents?|family)|(mere|pere|parents?|famille) (biologique\w*|d origine)|find (my|her|his)|retrouv\w*|origin\w*|antecedent\w*|who (is|was) my|qui (est|etait) ma|was adopted|ete adopte\w*)\b/, 'origines origins antecedents retrouvailles reunion identite identity refus refusal'],
  [/\b(bebe|baby|babies|newborn|nouveau ne|naissance|give birth|gave birth|giving birth|accoucher|accouche|accouchement|deliver\w*|hopital|hospital)\b/, 'naissance birth hopital hospital bebe baby consentement consent'],
  [/\b(enceinte|pregnan\w*|grossesse)\b/, 'grossesse pregnancy naissance birth hopital hospital'],
  [/\b(give up|giving up|abandon\w*|donner mon|place my|placing|confier|garder mon|keep my|pas capable|can t cope|not able)\b/, 'consentement consent adoption confier place options'],
  [/\b(grand ?m\w*|grand ?p\w*|grandparent\w*|grandmother|grandfather|grandma|grandpa|grandson|granddaughter|grandchild\w*|petit fils|petite fille|petits enfants|mamie|papi|tante|oncle|aunt|uncle|niece|nephew|neveu|cousin\w*|relative\w*|proche\w*|famille elargie|kin|kinship)\b/, 'famille family proche relative tutelle tutorship special grand parent kin proximite'],
  [/\b(chum|blonde|beau ?pere|belle ?mere|stepfather|stepmother|stepdad|stepmom|step ?parent|step ?(son|daughter|child)|conjoint\w*|spouse|partner|husband|wife|mari|femme|boyfriend|girlfriend)\b/, 'conjoint spouse special consent stepparent beau parent cohabitation'],
  [/\b(foster\w*|accueil)\b/, 'accueil foster famille family placement'],
  [/\b(dpj|dyp|youth protection|protection de la jeunesse|cps|social worker|intervenant\w*|travailleu\w*)\b/, 'dpj protection jeunesse youth signalement report'],
  [/\b(court|judge|juge|tribunal|hearing|audience)\b/, 'tribunal court juge judge'],
  [/\b(lawyer|avocat\w*|legal aid|aide juridique|attorney)\b/, 'avocat lawyer aide juridique legal aid'],
  [/\b(cost\w*|cout\w*|coute|price|prix|money|argent|frais|fee\w*|tax\w*|impot\w*|credit\w*|cher|expensive)\b/, 'cout cost frais credit impot tax'],
  [/\b(leave|conge\w*|work|travail|job|emploi|employer|rqap|qpip|benefit\w*|prestation\w*)\b/, 'conge leave rqap qpip prestations benefits travail work'],
  [/\b(abroad|international\w*|etranger|foreign|country|pays|china|chine|haiti|colombi\w*|vietnam|sasie|sai)\b/, 'international etranger abroad sasie moratoire'],
  [/\b(suicid\w*|mourir|die|dying|kill|tuer|danger\w*|hurt|blesse\w*|abus\w*|violen\w*|beat\w*|hit|hits|hitting|frapp\w*|battre|bat|emergency|urgence|unsafe|neglect\w*|neglig\w*)\b/, 'urgence emergency 911 danger signalement report aide help dpj'],
  [/\b(neighbou?r\w*|voisin\w*|report|signaler|signalement|worried about a child|inquiet)\b/, 'signalement report dpj signaler confidentiel'],
  [/\b(change my mind|changer d avis|regret\w*|withdraw|retirer|retract\w*|annuler|cancel|take back|reprendre|ravoir|get (them|him|her|my \w+) back|return)\b/, 'retirer withdraw consentement consent 30 jours days restitution retour'],
  [/\b(see my|voir mon|voir ma|voir mes|revoir|visit\w*|contact\w*|rencontr\w*|nouvelles|news|lettres?|letters?|photos?)\b/, 'contact contacts visites entente communication agreement'],
  [/\b(how long|combien de temps|delai\w*|deadline\w*|duree\w*|months?|mois|days?|jours?)\b/, 'delai deadline duree duration mois months jours days'],
  [/\b(single|seul\w*|celibataire|gay|lesbian|same sex|meme sexe|lgbt\w*|married|marie\w*|age|old|vieux|years old|ans)\b/, 'conditions adopter adopt celibataire single couple age difference'],
  [/\b(kids?|child\w*|enfant\w*|fils|fille|son|daughter)\b/, 'enfant child'],
  [/\b(teen\w*|ado\w*|minor|mineur\w*|14 ans|14 years|10 ans|10 years)\b/, 'mineur minor enfant child consentement consent 14 10'],
  [/\b(indigenous|autochtone\w*|first nation\w*|premieres nations|inuit|metis|coutum\w*|custom\w*)\b/, 'autochtone indigenous coutumiere customary'],
  [/\b(help|aide|call|appeler|phone|telephone|numero|number|talk|parler)\b/, 'aide help telephone phone 811'],
]

export const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const stem = (t: string) => (t.length > 5 ? t.slice(0, 5) : t)

export function tokens(s: string): string[] {
  return norm(s)
    .split(' ')
    .filter((t) => t && !STOP.has(t) && (t.length > 1 || /\d/.test(t)))
    .map(stem)
}

function expand(query: string): string {
  const n = ` ${norm(query)} `
  let extra = ''
  for (const [re, add] of LEXICON) if (re.test(n)) extra += ` ${add}`
  return `${query} ${extra}`
}

interface Doc {
  id: string
  tf: Map<string, number>
  title: Set<string>
  len: number
}

export interface Index {
  docs: Doc[]
  df: Map<string, number>
  avg: number
}

export function indexKB(kbs: KB[]): Index {
  const byId = new Map<string, Doc>()
  for (const kb of kbs) {
    for (const ch of kb.chunks) {
      let d = byId.get(ch.id)
      if (!d) {
        d = { id: ch.id, tf: new Map(), title: new Set(), len: 0 }
        byId.set(ch.id, d)
      }
      const toks = tokens(`${ch.text} ${ch.id.replace(/[:/_-]/g, ' ')}`)
      for (const t of toks) d.tf.set(t, (d.tf.get(t) ?? 0) + 1)
      for (const t of tokens(ch.title)) d.title.add(t)
      d.len += toks.length
    }
  }
  const docs = [...byId.values()]
  const df = new Map<string, number>()
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1)
  const avg = docs.reduce((s, d) => s + d.len, 0) / Math.max(1, docs.length)
  return { docs, df, avg }
}

export interface Hit {
  id: string
  score: number
}

export function search(index: Index, query: string, limit = 20): Hit[] {
  const q = tokens(expand(query))
  if (!q.length) return []
  const qset = [...new Set(q)]
  const N = index.docs.length
  const k1 = 1.2
  const b = 0.75
  const hits: Hit[] = []
  for (const d of index.docs) {
    let s = 0
    for (const t of qset) {
      const f = d.tf.get(t)
      if (!f) continue
      const df = index.df.get(t) ?? 0
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5))
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / index.avg)))
      if (d.title.has(t)) s += idf * 0.9
    }
    // glossary entries are short and win too easily on single words: damp them
    if (d.id.startsWith('term:')) s *= 0.7
    if (s > 0) hits.push({ id: d.id, score: s })
  }
  hits.sort((a, b) => b.score - a.score)
  return hits.slice(0, limit)
}

const CRISIS = /\b(suicid\w*|me tuer|veux mourir|envie de mourir|plus envie de vivre|want to die|wanna die|kill (myself|me)|end my life|en finir|danger immediat|immediate danger|in danger|en danger|frapp\w*|hits?|hitting|beat\w*|abus\w*|agress\w*|violen\w*|hurt(s|ing)? (me|my|him|her|them|his|the)|blesse\w*|maltrait\w*)\b/

/** true when the message suggests someone may be in danger right now */
export const isCrisis = (s: string) => CRISIS.test(` ${norm(s)} `)

/** Guess the language of a message (falls back to the site language). */
export function guessLang(s: string, fallback: 'fr' | 'en'): 'fr' | 'en' {
  const n = ` ${norm(s)} `
  const frW = (n.match(/ (je|j|est|les|des|une|pour|avec|mon|ma|mes|que|qui|pas|enfant|vous|suis|peut|comment|quoi|dois)(?= )/g) ?? []).length
  const enW = (n.match(/ (i|is|the|and|my|for|with|what|how|can|do|does|child|you|am|should|will|who|when)(?= )/g) ?? []).length
  const accents = /[éèêàçùôîâ]/i.test(s) ? 2 : 0
  if (frW + accents > enW) return 'fr'
  if (enW > frW + accents) return 'en'
  return fallback
}

/** Pick chunks to show for a set of hits, in the requested language. */
export function chunksFor(hits: Hit[], kb: KB): Chunk[] {
  return hits.map((h) => kb.byId.get(h.id)).filter((c): c is Chunk => !!c)
}
