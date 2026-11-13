// DRAFT — replaced by researched content
import type { Rights } from '../types'

/*
 * Writing guide for this section (read by the "rights" switcher):
 *  - 3 to 6 groups; 5 is ideal. `who` is the pill label, the panel title AND the giant outline word
 *    behind the list (desktop): keep it 6–30 characters, no final period.
 *  - 4 to 9 items per group; 5–7 reads best. Each item states ONE right, as a verb phrase
 *    ("Être entendu…", "Retirer…"), 60–120 characters. **Bold** the core of the right (2–5 words).
 *    No links in item text: put them on the refs.
 *  - refs: 0–3 short chips per item ("C.c.Q., art. 557", "LPJ, art. 9").
 */
export const rights: Rights = {
  eyebrow: 'Vos droits',
  title: 'Vos droits, qui que vous soyez.',
  lede:
    'Parent, enfant, famille d’accueil, grand-parent ou personne adoptée : la loi vous protège aussi. Choisissez votre situation pour voir, en mots simples, ce à quoi vous avez droit et où c’est écrit.',
  groups: [
    {
      id: 'parents',
      who: 'Les parents',
      icon: 'heart-hand',
      items: [
        {
          text: '**Être informé, consulté et entendu** avant toute décision qui touche votre enfant.',
          refs: [{ label: 'LPJ, art. 6.1' }],
        },
        {
          text: '**Être accompagné** par une personne de votre choix lors des rencontres avec la DPJ.',
          refs: [{ label: 'LPJ, art. 6.2' }],
        },
        {
          text: '**Avoir un avocat** devant le tribunal. L’aide juridique peut être gratuite selon vos revenus.',
        },
        {
          text: '**Refuser une mesure** proposée par la DPJ : c’est alors le tribunal qui décide.',
        },
        {
          text: '**Retirer votre consentement** à l’adoption dans les 30 jours, sans avoir à vous justifier.',
          refs: [{ label: 'C.c.Q., art. 557' }],
        },
        {
          text: '**Garder vos droits et devoirs de parent**, sauf si la loi ou le tribunal en décide autrement.',
          refs: [{ label: 'LPJ, art. 11.4' }],
        },
        {
          text: '**Porter plainte** si les services reçus ne respectent pas vos droits.',
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
          refs: [{ label: 'C.c.Q., art. 33' }, { label: 'LPJ, art. 3' }],
        },
        {
          text: '**Être entendu** et que son avis compte, selon son âge et sa maturité.',
          refs: [{ label: 'C.c.Q., art. 34' }],
        },
        {
          text: '**Avoir son propre avocat** devant le tribunal, gratuitement.',
          refs: [{ label: 'LPJ, art. 78' }],
        },
        {
          text: '**Garder contact** avec ses parents, ses frères et sœurs et les personnes importantes, sauf décision contraire du tribunal.',
          refs: [{ label: 'LPJ, art. 9' }],
        },
        {
          text: '**Être préparé** avant de changer de milieu de vie.',
          refs: [{ label: 'LPJ, art. 7' }],
        },
        {
          text: 'Dès 10 ans, **donner son accord** à son adoption. À 14 ans, son refus l’empêche.',
          refs: [{ label: 'C.c.Q., art. 549' }, { label: 'C.c.Q., art. 550' }],
        },
      ],
    },
    {
      id: 'carers',
      who: 'Familles d’accueil et adoptives',
      icon: 'home',
      items: [
        {
          text: '**Être admis aux audiences** sur l’enfant que vous accueillez et y témoigner, avec un avocat.',
          refs: [{ label: 'LPJ, art. 83' }],
        },
        {
          text: 'Recevoir, sur demande, **un sommaire des antécédents** de l’enfant dès l’ordonnance de placement en vue de l’adoption.',
          refs: [{ label: 'LPJ, art. 71.3.6' }],
        },
        {
          text: '**Être soutenu** par l’établissement : suivi, formation et rétribution pour la famille d’accueil.',
        },
        {
          text: 'Des **prestations d’adoption** du RQAP pour vivre l’arrivée de l’enfant.',
        },
        {
          text: '**Être informé clairement** qu’en Banque-mixte, l’enfant peut retourner dans sa famille tant que l’adoption n’est pas possible.',
        },
      ],
    },
    {
      id: 'kin',
      who: 'Grands-parents et proches',
      icon: 'family',
      items: [
        {
          text: '**Garder des liens** avec votre petit-enfant : ses parents ne peuvent s’y opposer sans motifs graves.',
          refs: [{ label: 'C.c.Q., art. 611' }],
        },
        {
          text: '**Être considéré en priorité** si l’enfant doit vivre ailleurs que chez ses parents.',
          refs: [{ label: 'LPJ, art. 4' }],
        },
        {
          text: '**Demander à être entendu** par le tribunal quand la DPJ est en cause.',
          refs: [{ label: 'LPJ, art. 81' }],
        },
        {
          text: '**Devenir famille d’accueil de proximité** et recevoir du soutien pour accueillir l’enfant.',
        },
        {
          text: '**Demander la tutelle** de l’enfant, une option qui ne coupe pas son lien avec ses parents.',
          refs: [{ label: 'C.c.Q., art. 199.1' }],
        },
        {
          text: '**Adopter l’enfant** par consentement spécial, si c’est dans son intérêt.',
          refs: [{ label: 'C.c.Q., art. 555' }],
        },
      ],
    },
    {
      id: 'adoptees',
      who: 'Personnes adoptées',
      icon: 'key',
      items: [
        {
          text: '**Connaître vos origines**, dans la mesure prévue par la loi.',
          refs: [{ label: 'Charte, art. 39.1' }],
        },
        {
          text: 'Obtenir **le sommaire de vos antécédents** : santé, histoire familiale, contexte de l’adoption.',
          refs: [{ label: 'C.c.Q., art. 583' }],
        },
        {
          text: '**Connaître le nom** de vos parents d’origine, sauf si un refus est encore valide.',
          refs: [{ label: 'C.c.Q., art. 583' }, { label: 'C.c.Q., art. 583.4' }],
        },
        {
          text: 'Obtenir **une copie de votre acte de naissance d’origine**.',
          refs: [{ label: 'C.c.Q., art. 583' }],
        },
        {
          text: '**Refuser tout contact**, ou le permettre à vos conditions, en tout temps.',
          refs: [{ label: 'C.c.Q., art. 583.6' }],
        },
      ],
    },
  ],
}
