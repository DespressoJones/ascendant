import type { Source } from '../types'

/**
 * Sources for the "clock" (deadlines) and "compare" (forms of adoption and alternatives) sections.
 * Ids are prefixed "clock-compare-". Shared sources (ccq-book1, ccq-book2, lpj, qc-*, educaloi-adopt,
 * msss-origins-guide, csj) live in core.ts.
 */
export const clockCompare: Source[] = [
  /* ---------------------------------------------------------------- statutes and regulations */
  {
    id: 'clock-compare-bill99',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi modifiant la Loi sur la protection de la jeunesse et d’autres dispositions (L.Q. 2017, c. 18) : mesures d’urgence, entente provisoire, durées maximales de placement',
      en: 'Act to amend the Youth Protection Act and other provisions (S.Q. 2017, c. 18): emergency measures, provisional agreement, maximum placement periods (in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2017/2017C18F.PDF',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-bill15',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi modifiant la Loi sur la protection de la jeunesse et d’autres dispositions législatives (L.Q. 2022, c. 11)',
      en: 'Act to amend the Youth Protection Act and other legislative provisions (S.Q. 2022, c. 11) (in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2022/2022C11F.PDF',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-bill2',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi portant sur la réforme du droit de la famille en matière de filiation et modifiant le Code civil en matière de droits de la personnalité et d’état civil (L.Q. 2022, c. 22) : aide juridique gratuite pour les mineurs, refus de divulgation dans les 30 jours',
      en: 'An Act to reform family law with regard to filiation and to amend the Civil Code in relation to personality rights and civil status (S.Q. 2022, c. 22): free legal aid for minors, 30-day identity disclosure refusal (in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2022/2022C22F.PDF',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-reg-tutorship-aid',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Règlement sur l’aide financière pour favoriser la tutelle et la tutelle coutumière autochtone à un enfant (décret 1914-2023, en vigueur le 1er février 2024)',
      en: 'Regulation respecting financial assistance to promote tutorship and Indigenous customary tutorship of a child (O.C. 1914-2023, in force February 1, 2024) (in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82290.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-reg-adoption-aid',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Règlement sur l’aide financière pour favoriser l’adoption et l’adoption coutumière autochtone d’un enfant (décret 1915-2023, en vigueur le 1er février 2024)',
      en: 'Regulation respecting financial assistance to promote adoption and Indigenous customary adoption of a child (O.C. 1915-2023, in force February 1, 2024) (in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82291.pdf',
    checked: '2026-11-13',
  },

  /* ---------------------------------------------------------------- government pages */
  {
    id: 'clock-compare-qc-origins-pl2',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Recherche des origines : les nouvelles dispositions du projet de loi no 2',
      en: 'Searching for origins: the new provisions of Bill 2 (in French)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/pl2',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-suppletive',
    publisher: 'Gouvernement du Québec (Curateur public)',
    title: { fr: 'Tuteur supplétif', en: 'Suppletive tutor (in French)' },
    url: 'https://www.quebec.ca/justice-et-etat-civil/protection-legale/tutelle-biens-mineur/personnes-impliquees/tuteur-suppletif',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-adoption-overview',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'À propos de l’adoption (dont l’adoption coutumière autochtone)',
      en: 'About adoption (including Indigenous customary adoption)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/a-propos',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-foster-process',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Démarche pour devenir une famille d’accueil', en: 'Steps to become a foster family' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/demarche',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-intl',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Adoption internationale (avis de moratoire et autorisation du SASIE)',
      en: 'International adoption (moratorium notice and SASIE authorization)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-intl-moratorium',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Pour l’intérêt supérieur de l’enfant : l’ouverture de nouveaux dossiers d’adoption internationale est suspendue (27 novembre 2024)',
      en: 'In the child’s best interests: opening new international adoption files is suspended (November 27, 2024) (in French)',
    },
    url: 'https://www.quebec.ca/nouvelles/actualites/details/pour-linteret-superieur-de-lenfant-louverture-de-nouveaux-dossiers-dadoption-internationale-est-suspendue-59831',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-intl-no-body',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Adoption internationale sans organisme agréé', en: 'International adoption without a certified body (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/a-propos-adoption-internationale/adoption-sans-organisme-agree',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-intl-steps',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Étapes d’un projet d’adoption internationale', en: 'Steps in an international adoption project' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/demarches-adoption/demarches',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-qc-intl-costs',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coûts de l’adoption internationale', en: 'Costs of international adoption (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/avant-adoption/couts-adoption',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-dec-register',
    publisher: 'Directeur de l’état civil',
    title: {
      fr: 'Registre des autorités compétentes en matière d’adoption coutumière autochtone',
      en: 'Register of competent authorities in matters of Indigenous customary adoption',
    },
    url: 'https://www.etatcivil.gouv.qc.ca/fr/registre_autorites.html',
    checked: '2026-11-13',
  },

  /* ---------------------------------------------------------------- reports and guides */
  {
    id: 'clock-compare-msss-life-plan',
    publisher: 'MSSS',
    title: {
      fr: 'Un projet de vie, des racines pour la vie (brochure sur les projets de vie en protection de la jeunesse, 2016)',
      en: 'Un projet de vie, des racines pour la vie (brochure on permanency plans in youth protection, 2016, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2016/16-838-03F.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-msss-ri-rtf',
    publisher: 'MSSS',
    title: {
      fr: 'Les ressources intermédiaires et les ressources de type familial : cadre de référence (2026)',
      en: 'Intermediate resources and family-type resources: reference framework (2026, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2026/26-801-02W.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-cdpdj-stability',
    publisher: 'Commission des droits de la personne et des droits de la jeunesse',
    title: {
      fr: 'Évaluation de la mise en œuvre des dispositions de la LPJ sur la stabilité des enfants confiés jusqu’à la majorité (2025)',
      en: 'Evaluation of Youth Protection Act provisions on stability for children placed until adulthood (2025, in French)',
    },
    url: 'https://www.cdpdj.qc.ca/storage/app/media/publications/Loi_protection_jeunesse_2025_article_156.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'clock-compare-educaloi-third-party',
    publisher: 'Éducaloi',
    title: { fr: 'Attribuer la garde d’un enfant à un tiers', en: 'Giving custody of a child to a third party (in French)' },
    url: 'https://educaloi.qc.ca/capsules/attribuer-la-garde-dun-enfant-a-un-tiers/',
    checked: '2026-11-13',
  },
]
