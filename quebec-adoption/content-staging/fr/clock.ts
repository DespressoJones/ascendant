// Researched content — verified 2026-11-13
import type { Clock, LegalRef } from '../../src/content/types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const GAZ = 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/'

export const clock: Clock = {
  eyebrow: 'Les délais',
  title: 'Les délais qui comptent',
  lede:
    'Certaines étapes ont une horloge. La connaître, c’est pouvoir agir à temps, demander de l’aide et poser les bonnes questions. Voici six délais prévus par la loi ou par règlement, en mots simples. Un délai vous inquiète ? Parlez-en à votre intervenante ou intervenant, ou à une avocate ou un avocat.',
  delays: [
    {
      id: 'urgence',
      value: 48,
      unit: 'hours',
      unitLabel: 'heures',
      title: 'Les mesures d’urgence de la DPJ',
      body:
        'Si la sécurité d’un enfant est menacée, la DPJ peut agir tout de suite, par exemple en le confiant à un proche ou à une famille d’accueil. Ces mesures durent **au plus 48 heures**. Pour aller plus loin, il faut soit l’accord des parents et de l’enfant de 14 ans et plus (une entente provisoire d’au plus 30 jours, renouvelable une fois), soit une décision du tribunal.',
      refs: [lpj('46'), lpj('47'), lpj('47.1')],
      sources: ['lpj', 'qc-dpj-steps', 'clock-compare-bill99'],
    },
    {
      id: 'refus-identite',
      value: 30,
      unit: 'days',
      unitLabel: 'jours',
      title: 'Garder votre identité confidentielle',
      body:
        'Vous êtes parent d’origine et ne voulez pas que l’enfant connaisse votre identité avant ses 18 ans ? Inscrivez un **refus à la communication de votre identité** dans les **30 jours qui suivent la naissance**. Ce délai compte à partir de la naissance, pas de la signature du consentement. Passé ce délai, vous pouvez encore inscrire un refus au contact, tant que votre identité n’a pas été communiquée.',
      refs: [ccq('583.4'), ccq('583.6')],
      sources: ['ccq-book2', 'clock-compare-qc-origins-pl2', 'msss-origins-guide'],
    },
    {
      id: 'retractation',
      value: 30,
      unit: 'days',
      unitLabel: 'jours',
      title: 'Changer d’avis après avoir consenti',
      body:
        'Un parent qui a consenti à l’adoption peut retirer son consentement dans les **30 jours suivant la signature**, par écrit devant deux témoins. L’enfant doit alors lui être rendu sans formalité ni délai. Aucune ordonnance de placement n’est possible avant la fin de ces 30 jours ; ensuite, et jusqu’à cette ordonnance, le parent peut encore demander au tribunal de lui rendre l’enfant.',
      refs: [ccq('557'), ccq('548'), ccq('567'), ccq('558')],
      sources: ['ccq-book2', 'educaloi-adopt'],
    },
    {
      id: 'admissibilite',
      value: 6,
      unit: 'months',
      unitLabel: 'mois',
      title: 'Quand les parents n’assument plus leur rôle',
      body:
        'Si les parents n’ont pas, dans les faits, pris soin de l’enfant, ni assuré son entretien ou son éducation depuis **au moins 6 mois**, le tribunal peut le déclarer admissible à l’adoption. La loi présume alors qu’un retour auprès d’eux est peu probable. Les parents peuvent s’y opposer devant le tribunal et montrer le contraire, avec une avocate ou un avocat.',
      refs: [ccq('559'), ccq('560'), ccq('561')],
      sources: ['ccq-book2', 'educaloi-adopt', 'csj'],
    },
    {
      id: 'vie-commune',
      value: 6,
      unit: 'months',
      unitLabel: 'mois',
      title: 'Vivre ensemble avant le jugement',
      body:
        'Après l’ordonnance de placement, l’enfant vit avec sa future famille. L’adoption ne peut être prononcée qu’après **au moins 6 mois** de vie commune depuis cette ordonnance. Le tribunal peut réduire ce délai de 3 mois au plus, par exemple si l’enfant vivait déjà avec cette famille.',
      refs: [ccq('566')],
      sources: ['ccq-book2', 'qc-adoption-about'],
    },
    {
      id: 'aide-financiere',
      value: 60,
      unit: 'days',
      unitLabel: 'jours',
      title: 'Demander l’aide financière',
      body:
        'La DPJ vous a confié un enfant pendant **au moins 6 mois de suite**, et le tribunal vous nomme tuteur ou ordonne son placement chez vous en vue de l’adoption ? Une aide financière peut vous être versée. Demandez-la dans les **60 jours** du jugement de tutelle ou de l’ordonnance de placement, au centre de protection de l’enfance et de la jeunesse de votre région. Une demande en retard peut encore être acceptée si vous avez une bonne raison.',
      refs: [lpj('70.3'), lpj('71.3'), { label: 'Règl. (D. 1914-2023), art. 1 et 3', url: GAZ + '82290.pdf' }, { label: 'Règl. (D. 1915-2023), art. 1 et 3', url: GAZ + '82291.pdf' }],
      sources: ['clock-compare-reg-tutorship-aid', 'clock-compare-reg-adoption-aid'],
    },
  ],
  placement: {
    title: 'Combien de temps un enfant peut-il vivre hors de chez lui avant qu’on décide de son avenir ?',
    body:
      'Quand la DPJ ou le tribunal confie un enfant à un autre milieu (grands-parents, autre proche, famille d’accueil, centre de réadaptation), la loi fixe une **durée totale maximale**. Elle dépend de l’âge de l’enfant au moment de l’entente ou de l’ordonnance qui le confie ailleurs. Les périodes liées à la même situation s’additionnent. Pendant ce temps, si c’est dans l’intérêt de l’enfant, le but premier reste le retour à la maison, avec de l’aide.',
    sliderLabel: 'Âge de l’enfant au moment du placement',
    yearsWord: 'ans',
    resultPrefix: 'Durée maximale avant une décision permanente :',
    monthsWord: 'mois',
    bands: [
      { ageLabel: 'Moins de 2 ans', minAge: 0, maxAge: 2, months: 12 },
      { ageLabel: '2 à 5 ans', minAge: 2, maxAge: 6, months: 18 },
      { ageLabel: '6 ans et plus', minAge: 6, maxAge: 18, months: 24 },
    ],
    after:
      '**Quand le délai est atteint** et que l’enfant ne peut toujours pas rentrer chez lui en sécurité, l’affaire va devant le tribunal. Celui-ci doit assurer à l’enfant, de façon permanente, des soins continus et des liens stables, par exemple par un placement jusqu’à 18 ans ; la tutelle et l’adoption passent par une demande distincte. Si l’intérêt de l’enfant l’exige, le tribunal peut dépasser le délai : quand un retour à la maison est prévu à court terme, ou pour un motif sérieux, par exemple si des services prévus n’ont pas été rendus. Pour un enfant autochtone, ces durées ne s’appliquent pas si un conseil de famille a été formé.',
    refs: [lpj('53.0.1'), lpj('91.1'), lpj('131.12')],
    sources: ['lpj', 'clock-compare-bill99', 'clock-compare-bill15', 'qc-dpj-steps'],
  },
}
