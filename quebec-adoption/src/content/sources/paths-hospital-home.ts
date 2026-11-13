import type { Source } from '../types'

/**
 * Sources cited by the "hospital" and "home" journeys (content-staging/{fr,en}/paths/hospital.ts, home.ts).
 * Ids are prefixed "paths-hospital-home-". Shared sources (ccq, lpj, qc-dpj-steps…) live in core.ts.
 */
export const pathsHospitalHome: Source[] = [
  {
    id: 'paths-hospital-home-info-social',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Info-Social 811', en: 'Info-Social 811 (in French)' },
    url: 'https://www.quebec.ca/sante/trouver-une-ressource/info-social-811',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-info-social-psy',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Obtenir des conseils pour un problème psychosocial non urgent (811, option 2)',
      en: 'How to get advice about a non-urgent psychosocial problem (811, option 2)',
    },
    url: 'https://www.quebec.ca/en/health/health-system-and-services/service-organization/primary-care-health-and-social-services/how-get-advice-about-non-urgent-psychosocial-problem',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-sippe',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'À propos des services intégrés en périnatalité et pour la petite enfance (SIPPE)',
      en: 'About integrated perinatal and early childhood services (SIPPE, in French)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/soutien-pendant-grossesse-naissance/grossesse/services-integres-perinatalite-petite-enfance/a-propos',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-declare-birth',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Déclarer une naissance', en: 'Declaring a birth (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/demarches-nouveaux-parents/declarer-naissance',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-communication',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Entente de communication avec la famille biologique d’un enfant adopté',
      en: 'Communication agreement with the birth family of an adopted child (in French)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/entente-communication',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-msss-pl2',
    publisher: 'MSSS',
    title: {
      fr: 'Réforme du droit de la famille (projet de loi no 2) : modifications en matière d’antécédents sociobiologiques et de retrouvailles (2023)',
      en: 'Family law reform (Bill 2): changes to socio-biological history and reunions (2023, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2023/23-116-07WF.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-msss-recognition',
    publisher: 'MSSS',
    title: {
      fr: 'Fiche synthèse : reconnaissance d’un lien préexistant de filiation, balises d’application (2023)',
      en: 'Summary sheet: recognition of a pre-existing bond of filiation, guidelines (2023, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2023/23-116-01W.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-birth-alerts',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Fin de la pratique du signalement des naissances : plan de services préventifs et intensifs en période prénatale (14 avril 2023)',
      en: 'End of birth alerts: preventive and intensive prenatal services plan (April 14, 2023, in French)',
    },
    url: 'https://www.quebec.ca/nouvelles/actualites/details/fin-de-la-pratique-du-signalement-des-naissances-mise-en-place-dun-plan-de-services-preventifs-et-intensifs-en-periode-prenatale-47068',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-report-duty',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Obligation de signaler une situation au DPJ', en: 'Duty to report a situation to the DPJ (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/obligation-de-signaler',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-report-privacy',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Confidentialité de la démarche lors d’un signalement au DPJ',
      en: 'Confidentiality when you report a situation to the DPJ (in French)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/confidentialite-de-la-demarche',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-dpj-contacts',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coordonnées du DPJ (par région)', en: 'DPJ contact information by region (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-educaloi-dpj',
    publisher: 'Éducaloi',
    title: { fr: 'Le rôle du Directeur de la protection de la jeunesse (DPJ)', en: 'The role of the Director of Youth Protection (in French)' },
    url: 'https://educaloi.qc.ca/capsules/role-directeur-protection-de-la-jeunesse/',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-csj-eligibility',
    publisher: 'Commission des services juridiques',
    title: { fr: 'Aide juridique : admissibilité', en: 'Legal aid: eligibility (in French)' },
    url: 'https://www.csj.qc.ca/admissibilite/',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-pj-mediation',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Médiation en protection de la jeunesse', en: 'Youth protection mediation (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/programmes-protection-jeunesse/mediation-protection-jeunesse',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-dpj-bilan-2026',
    publisher: 'Santé Québec',
    title: {
      fr: 'Bilan annuel 2025-2026 des directrices et directeurs de la protection de la jeunesse (11 juin 2026)',
      en: 'Annual report 2025–2026 of the directors of youth protection (June 11, 2026, in French)',
    },
    url: 'https://www.quebec.ca/nouvelles/actualites/details/bilan-annuel-des-directrices-et-directeurs-de-la-protection-de-la-jeunesse-et-des-directrices-et-directeurs-provinciaux-les-enfants-sont-ils-toujours-une-priorite-71058',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-bill15',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi modifiant la Loi sur la protection de la jeunesse et d’autres dispositions législatives (L.Q. 2022, c. 11)',
      en: 'Act to amend the Youth Protection Act and other legislative provisions (S.Q. 2022, c. 11, in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2022/2022C11F.PDF',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-bill99',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi modifiant la Loi sur la protection de la jeunesse et d’autres dispositions (L.Q. 2017, c. 18)',
      en: 'Act to amend the Youth Protection Act and other provisions (S.Q. 2017, c. 18, in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2017/2017C18F.PDF',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-cdpdj-stability',
    publisher: 'CDPDJ',
    title: {
      fr: 'Évaluation de la mise en œuvre des dispositions de la LPJ relatives à la stabilité des liens (art. 156 LPJ, juin 2025)',
      en: 'Evaluation of the Youth Protection Act provisions on stability of relationships (s. 156, June 2025, in French)',
    },
    url: 'https://www.cdpdj.qc.ca/storage/app/media/publications/Loi_protection_jeunesse_2025_article_156.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-msss-rtf',
    publisher: 'MSSS',
    title: {
      fr: 'Les ressources intermédiaires et les ressources de type familial : cadre de référence (2026)',
      en: 'Intermediate and family-type resources: reference framework (2026, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2026/26-801-02W.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-msss-projet-de-vie',
    publisher: 'MSSS',
    title: {
      fr: 'Un projet de vie, des racines pour la vie (brochure, 2016)',
      en: 'A life plan, roots for life (brochure, 2016, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2016/16-838-03F.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-foster-steps',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Démarche pour devenir une famille d’accueil', en: 'Becoming a foster family (in French)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/demarche',
    checked: '2026-11-13',
  },
  {
    id: 'paths-hospital-home-tutorship-aid',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Règlement sur l’aide financière pour favoriser la tutelle et la tutelle coutumière autochtone à un enfant (décret 1914-2023)',
      en: 'Regulation respecting financial assistance to promote tutorship and Indigenous customary tutorship of a child (Order 1914-2023, in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82290.pdf',
    checked: '2026-11-13',
  },
]
