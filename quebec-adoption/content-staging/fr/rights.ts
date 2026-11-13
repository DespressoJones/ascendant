// Researched content — verified 2026-11-13
import type { LegalRef, Rights } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const adoptionAid: LegalRef = {
  label: 'Décret 1915-2023',
  url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82291.pdf',
}
const legalAidMinors: LegalRef = {
  label: 'Loi sur l’aide juridique, art. 4.0.1',
  url: `${LQ}A-14${se('4.0.1')}`,
}
const legalAid: LegalRef = { label: 'Aide juridique', url: 'https://www.csj.qc.ca/admissibilite/' }
const rqap: LegalRef = {
  label: 'RQAP',
  url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/choix-regime',
}

/*
 * Writing guide for this section (read by the "rights" switcher):
 *  - 3 to 6 groups. `who` is the pill label, the panel title AND the giant outline word
 *    behind the list (desktop): keep it 6–30 characters, no final period.
 *  - 4 to 9 items per group (here 6). Each item states ONE right, as a verb phrase, 60–120 characters.
 *    **Bold** the core of the right (2–5 words). No links in item text: put them on the refs.
 *  - refs: 0–3 short chips per item.
 *  - Group ids are shared by FR and EN (deep link #rights-<id>).
 *
 * Checked against: C.c.Q. (consolidation à jour au 9 septembre 2026) arts. 33, 34, 199.1, 548–550, 555,
 * 557, 569, 579, 583, 583.4, 611 (art. 611 was rewritten in 2022: the old "motifs graves" rule is gone);
 * LPJ arts. 3, 4, 4.3, 6.1, 9.1, 11.4 (L.Q. 2022, c. 11), 7, 9, 81, 83 (L.Q. 2017, c. 18), 78 (2022, c. 11),
 * 5, 52, 54, 70.1, 71.3.6, 74.2, 91; décret 1915-2023 (aide financière à l’adoption: art. 1, 6 mois continus
 * avant l’ordonnance de placement; art. 3, demande dans les 60 jours); Loi sur l’aide juridique, art. 4.0.1
 * (L.Q. 2022, c. 22, a. 128: aide juridique gratuite pour tout enfant mineur).
 * Fact-check 2026-11-13: arts. 579 and 611 require the consent of a child of 10 to 13, but the court decides
 * if that child refuses or the adults disagree; only from 14 is the child’s consent always required.
 */
export const rights: Rights = {
  eyebrow: 'Vos droits',
  title: 'Vos droits, qui que vous soyez.',
  lede:
    'Parent, enfant, famille d’accueil ou adoptive, grand-parent ou proche : la loi vous protège aussi. Choisissez votre situation pour voir, en mots simples, ce à quoi vous avez droit et où c’est écrit.',
  groups: [
    {
      id: 'parents',
      who: 'Parents de l’enfant',
      icon: 'heart-hand',
      items: [
        {
          text: '**Recevoir des explications claires** et donner votre point de vue avant les décisions qui vous concernent.',
          refs: [lpj('6.1'), lpj('4.3')],
        },
        {
          text: '**Consulter une avocate ou un avocat.** L’aide juridique peut payer tout ou une partie des frais, selon votre situation financière.',
          refs: [lpj('5'), legalAid],
        },
        {
          text: '**Refuser une entente** proposée par la DPJ ou contester sa décision : c’est alors le tribunal qui tranche.',
          refs: [lpj('52'), lpj('74.2')],
        },
        {
          text: '**Changer d’avis dans les 30 jours** après avoir signé un consentement à l’adoption, sans vous justifier.',
          refs: [ccq('557'), ccq('548')],
        },
        {
          text: '**Protéger votre identité** jusqu’aux 18 ans de l’enfant, avec un refus inscrit dans les 30 jours après la naissance.',
          refs: [ccq('583.4')],
        },
        {
          text: '**Prévoir des nouvelles ou des contacts** après l’adoption, par écrit, si c’est dans l’intérêt de l’enfant.',
          refs: [ccq('579')],
        },
      ],
    },
    {
      id: 'child',
      who: 'L’enfant',
      icon: 'leaf',
      items: [
        {
          text: 'Que chaque décision soit prise **dans son intérêt** et dans le respect de ses droits.',
          refs: [ccq('33'), lpj('3')],
        },
        {
          text: '**Être entendu** par le tribunal avant qu’il décide, si son âge et sa maturité le permettent.',
          refs: [ccq('34')],
        },
        {
          text: '**Avoir sa propre avocate ou son propre avocat** devant le tribunal en protection de la jeunesse, sans frais.',
          refs: [lpj('78'), legalAidMinors],
        },
        {
          text: 'S’il est placé, **garder contact** avec ses parents, ses frères et sœurs et les personnes importantes, sauf exception.',
          refs: [lpj('9'), lpj('9.1')],
        },
        {
          text: 'Dès 10 ans, **donner ou refuser son accord** à son adoption. À 14 ans et plus, son refus empêche l’adoption.',
          refs: [ccq('549'), ccq('550')],
        },
        {
          text: 'Une fois adopté, **connaître ses origines** selon les règles prévues : nom de ses parents d’origine, acte de naissance primitif.',
          refs: [ccq('583')],
        },
      ],
    },
    {
      id: 'carers',
      who: 'Parents adoptifs et d’accueil',
      icon: 'home',
      items: [
        {
          text: '**Être admis aux audiences** sur l’enfant qui vous est confié et y témoigner, avec une avocate ou un avocat si vous le voulez.',
          refs: [lpj('83')],
        },
        {
          text: '**Être consulté** avant que l’enfant qui vous est confié soit transféré vers un autre milieu d’accueil, sauf exception.',
          refs: [lpj('7')],
        },
        {
          text: '**Exercer l’autorité parentale** dès l’ordonnance de placement. L’enfant ne peut plus alors être rendu à ses parents.',
          refs: [ccq('569')],
        },
        {
          text: 'Recevoir, sur demande, **un sommaire des antécédents** de l’enfant dès l’ordonnance de placement.',
          refs: [lpj('71.3.6')],
        },
        {
          text: '**Demander une aide financière** dans les 60 jours de l’ordonnance de placement, si l’enfant vous était confié par la DPJ depuis au moins 6 mois.',
          refs: [adoptionAid],
        },
        {
          text: '**Recevoir des prestations d’adoption** du RQAP, dont des semaines d’accueil et de soutien, si vous y êtes admissible.',
          refs: [rqap],
        },
      ],
    },
    {
      id: 'kin',
      who: 'Grands-parents et proches',
      icon: 'family',
      items: [
        {
          text: '**Être considéré en priorité** si l’enfant ne peut pas rester chez ses parents, avant une famille d’accueil.',
          refs: [lpj('4')],
        },
        {
          text: '**Devenir famille d’accueil de proximité**, après une évaluation, pour accueillir l’enfant avec du soutien.',
          refs: [lpj('54'), lpj('91')],
        },
        {
          text: '**Demander à témoigner** si vous avez des informations utiles sur l’enfant, avec une avocate ou un avocat si vous le voulez.',
          refs: [lpj('81')],
        },
        {
          text: '**Garder des liens** avec votre petit-enfant, si c’est dans son intérêt. En cas de désaccord, le tribunal tranche. Dès 14 ans, il doit être d’accord.',
          refs: [ccq('611')],
        },
        {
          text: '**Devenir tuteur de l’enfant** par décision du tribunal, à la demande d’un parent ou de la DPJ, sans couper son lien avec ses parents.',
          refs: [ccq('199.1'), lpj('70.1')],
        },
        {
          text: '**Adopter l’enfant** si ses parents vous donnent un consentement spécial : grands-parents, tantes, oncles, frères et sœurs.',
          refs: [ccq('555')],
        },
      ],
    },
  ],
}
