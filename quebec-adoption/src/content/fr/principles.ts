// DRAFT — replaced by researched content
import type { Principles } from '../types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991'
const LPJ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-34.1'

/*
 * Writing guide for this section (renderer: sections/principles.ts)
 *  - 3 items read best (4 also fit). The title says how many: keep it in sync.
 *  - title: a 4–7 word statement, about 25–45 characters. Wrap the key words in **bold**:
 *    they get a red running stitch when the statement is being read.
 *  - body: 2–3 plain sentences, about 220–380 characters.
 *  - refs: 1–4 chips.
 *  - id: an English slug, the same in FR and EN. It picks the icon (see ICONS in the renderer).
 */
export const principles: Principles = {
  eyebrow: 'L’essentiel',
  title: 'Trois choses à savoir d’abord',
  items: [
    {
      id: 'child-interest',
      title: 'L’**intérêt de l’enfant** passe en premier.',
      body:
        'Toute décision qui concerne un enfant, qu’elle vienne de la DPJ, d’un service d’adoption ou d’un juge, doit être prise dans son intérêt et dans le respect de ses droits. On tient compte de ses besoins, de son âge, de sa santé et de son milieu familial. Devant le tribunal, l’enfant a le droit d’être entendu si son âge et son discernement le permettent.',
      refs: [
        { label: 'C.c.Q., art. 33', url: `${CCQ}#se:33` },
        { label: 'C.c.Q., art. 34', url: `${CCQ}#se:34` },
        { label: 'LPJ, art. 3', url: `${LPJ}#se:3` },
      ],
    },
    {
      id: 'family-first',
      title: 'La **famille** d’abord, quand c’est sécuritaire.',
      body:
        'La protection de la jeunesse cherche d’abord à garder l’enfant avec ses parents, avec du soutien. Si ce n’est pas possible, la priorité va aux personnes les plus importantes pour lui, comme ses grands-parents ou d’autres proches, puis à une famille d’accueil. Les frères et sœurs restent ensemble autant que possible.',
      refs: [
        { label: 'LPJ, art. 4', url: `${LPJ}#se:4` },
        { label: 'LPJ, art. 4.1', url: `${LPJ}#se:4_1` },
      ],
    },
    {
      id: 'adoption-permanent',
      title: 'L’adoption est **permanente**. D’autres options existent.',
      body:
        'Le jugement d’adoption crée un nouveau lien de filiation, pour la vie, et met fin aux liens juridiques avec la famille d’origine. C’est pourquoi elle n’est possible que si elle sert l’intérêt de l’enfant, et que d’autres solutions existent, comme la tutelle supplétive. Un parent qui a signé un consentement a **30 jours** pour changer d’avis.',
      refs: [
        { label: 'C.c.Q., art. 543', url: `${CCQ}#se:543` },
        { label: 'C.c.Q., art. 577', url: `${CCQ}#se:577` },
        { label: 'C.c.Q., art. 557', url: `${CCQ}#se:557` },
        { label: 'C.c.Q., art. 199.1', url: `${CCQ}#se:199_1` },
      ],
    },
  ],
}
