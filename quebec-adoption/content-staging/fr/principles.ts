// Researched content — verified 2026-11-13
import type { LegalRef, Principles } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })

/*
 * Writing guide for this section (renderer: sections/principles.ts)
 *  - 3 items read best (4 also fit). The title says how many: keep it in sync.
 *  - title: a 4–7 word statement, about 25–45 characters. Wrap the key words in **bold**.
 *  - body: 2–3 plain sentences, about 220–380 characters.
 *  - refs: 1–4 chips.
 *  - id: an English slug, the same in FR and EN. It picks the icon (see ICONS in the renderer).
 *
 * Checked against: C.c.Q. arts. 33, 34, 543, 577 (consolidation à jour au 9 septembre 2026);
 * LPJ arts. 3, 4, 4.1, 4.4, 5, 6.1, 6.2, 11.4 (L.Q. 2022, c. 11) and 53.0.1, 91.1 (L.Q. 2017, c. 18; 2022, c. 11).
 */
export const principles: Principles = {
  eyebrow: 'L’essentiel',
  title: 'Quatre choses à savoir d’abord',
  items: [
    {
      id: 'child-interest',
      title: 'L’**intérêt de l’enfant** passe en premier.',
      body:
        'Toute décision qui concerne un enfant doit être prise dans son intérêt et dans le respect de ses droits. On tient compte de ses besoins, de son âge, de sa santé et de son milieu familial. Une adoption n’est possible que si elle sert cet intérêt, et devant le tribunal, l’enfant a le droit d’être entendu si son âge et sa maturité le permettent.',
      refs: [ccq('33'), ccq('34'), ccq('543'), lpj('3')],
    },
    {
      id: 'family-first',
      title: 'La **famille** d’abord, quand c’est sécuritaire.',
      body:
        'La loi demande d’abord de garder l’enfant avec ses parents, avec de l’aide, si c’est dans son intérêt. Sinon, il est confié en priorité aux personnes qui comptent le plus pour lui, comme ses grands-parents ou d’autres proches, puis à un milieu qui ressemble le plus possible à une famille. Les frères et sœurs restent ensemble quand c’est possible.',
      refs: [lpj('4'), lpj('4.1')],
    },
    {
      id: 'time-stability',
      title: 'Pour un enfant, le **temps** compte.',
      body:
        'Un enfant ne vit pas le temps comme un adulte. S’il vit hors de chez lui, la loi fixe une durée maximale de 12, 18 ou 24 mois selon son âge. Ensuite, si le retour n’est pas possible, le tribunal doit, sauf exception, lui assurer une stabilité durable : chez un proche, en tutelle, en famille d’accueil jusqu’à 18 ans ou par l’adoption.',
      refs: [lpj('4.4'), lpj('53.0.1'), lpj('91.1')],
    },
    {
      id: 'parents-rights',
      title: 'Les **parents ont des droits**, eux aussi.',
      body:
        'Une intervention de la DPJ ne retire pas aux parents leurs droits et devoirs, sauf exception prévue par la loi. Vous avez le droit de recevoir des explications claires, d’être écouté, d’être accompagné par une personne de votre choix et de consulter une avocate ou un avocat. Si vous n’êtes pas d’accord, c’est le tribunal qui décide.',
      refs: [lpj('11.4'), lpj('6.1'), lpj('6.2'), lpj('5')],
    },
  ],
}
