// DRAFT — replaced by researched content
import type { Clock } from '../types'

export const clock: Clock = {
  eyebrow: 'Les délais',
  title: 'Les délais qui comptent',
  lede:
    "Certaines étapes ont une horloge. La connaître, c'est pouvoir agir à temps, demander de l'aide et poser les bonnes questions. Voici les délais prévus par la loi, en mots simples.",
  delays: [
    {
      id: 'urgence',
      value: 48,
      unit: 'hours',
      unitLabel: 'heures',
      title: "Les mesures d'urgence de la DPJ",
      body:
        "Si la sécurité d'un enfant est menacée, la DPJ peut agir tout de suite, par exemple en le confiant à quelqu'un d'autre. Ces mesures durent **au plus 48 heures**. Pour aller plus loin, la DPJ doit s'adresser au tribunal.",
      refs: [{ label: 'LPJ, art. 46' }],
    },
    {
      id: 'retractation',
      value: 30,
      unit: 'days',
      unitLabel: 'jours',
      title: "Changer d'avis après un consentement",
      body:
        "Un parent qui a consenti à l'adoption peut retirer son consentement dans les **30 jours**. L'enfant doit alors lui être rendu rapidement, sans formalités. Après ce délai, il est encore possible de demander au tribunal de le reprendre, tant qu'il n'a pas été placé en vue de l'adoption.",
      refs: [{ label: 'C.c.Q., art. 557' }, { label: 'C.c.Q., art. 558' }],
    },
    {
      id: 'admissibilite',
      value: 6,
      unit: 'months',
      unitLabel: 'mois',
      title: "Quand personne ne s'occupe de l'enfant",
      body:
        "Si les parents n'ont pas pris soin de l'enfant depuis **au moins 6 mois**, le tribunal peut le déclarer admissible à l'adoption, seulement s'il est peu probable qu'ils reprennent ce rôle. Les parents sont avisés et peuvent se faire entendre.",
      refs: [{ label: 'C.c.Q., art. 559' }, { label: 'C.c.Q., art. 561' }],
    },
    {
      id: 'vie-commune',
      value: 6,
      unit: 'months',
      unitLabel: 'mois',
      title: 'Vivre ensemble avant le jugement',
      body:
        "Après l'ordonnance de placement, l'enfant vit avec sa future famille. Le jugement d'adoption ne peut être rendu qu'après **au moins 6 mois** de vie commune. Le tribunal peut parfois réduire ce délai, par exemple si l'enfant vivait déjà avec cette famille.",
      refs: [{ label: 'C.c.Q., art. 566' }],
    },
  ],
  placement: {
    title: "Combien de temps un enfant peut-il rester en placement temporaire avant qu'on décide d'un projet de vie permanent ?",
    body:
      "Quand la DPJ ou le tribunal confie un enfant à un autre milieu (famille d'accueil, proches, ressource), la loi fixe une **durée maximale**. Plus l'enfant est jeune, plus elle est courte : à cet âge, le besoin de stabilité est urgent. Toutes les périodes de placement s'additionnent. Pendant ce temps, l'objectif premier reste le retour de l'enfant dans sa famille, avec du soutien.",
    sliderLabel: "Âge de l'enfant au moment du placement",
    yearsWord: 'ans',
    resultPrefix: 'Durée maximale avant une décision de permanence :',
    monthsWord: 'mois',
    bands: [
      { ageLabel: 'Moins de 2 ans', minAge: 0, maxAge: 2, months: 12 },
      { ageLabel: '2 à 5 ans', minAge: 2, maxAge: 6, months: 18 },
      { ageLabel: '6 ans et plus', minAge: 6, maxAge: 18, months: 24 },
    ],
    after:
      "**Quand le délai est atteint**, le tribunal doit rendre une décision qui assure à l'enfant des liens et un milieu de vie stables, de façon permanente : retour dans sa famille, tutelle, adoption ou placement jusqu'à sa majorité. Il peut dépasser le délai pour un motif sérieux, par exemple si un retour à la maison est prévu bientôt ou si les services promis aux parents n'ont pas été offerts.",
    refs: [{ label: 'LPJ, art. 91.1' }],
  },
}
