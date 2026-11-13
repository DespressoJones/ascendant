import type { Source } from '../types'

/**
 * Sources for the "De l'étranger / From abroad" and "Après l'adoption / After adoption" journeys
 * (content/{fr,en}/paths/abroad.ts and after.ts). Researched November 2026.
 */
export const pathsAbroadAfterShell: Source[] = [
  /* ------------------------------------------------------------------ international adoption */
  {
    id: 'paths-abroad-after-shell-qc-intl-hub',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Adoption internationale (avis de moratoire)', en: 'International adoption (moratorium notice)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-moratorium-news',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Pour l’intérêt supérieur de l’enfant – L’ouverture de nouveaux dossiers d’adoption internationale est suspendue (27 novembre 2024)',
      en: 'In the child’s best interests: the opening of new international adoption files is suspended (November 27, 2024, in French)',
    },
    url: 'https://www.quebec.ca/nouvelles/actualites/details/pour-linteret-superieur-de-lenfant-louverture-de-nouveaux-dossiers-dadoption-internationale-est-suspendue-59831',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-no-body',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Adoption internationale sans organisme agréé', en: 'International adoption without a certified body' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/a-propos-adoption-internationale/adoption-sans-organisme-agree',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-steps',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Étapes d’un projet d’adoption internationale', en: 'Steps in an international adoption project' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/demarches-adoption/demarches',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-legal',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Cadre légal de l’adoption internationale', en: 'Legal framework for international adoption' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/cadre-legal',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-assessment',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Évaluation psychosociale des personnes souhaitant entreprendre un projet d’adoption internationale',
      en: 'Psychosocial assessment of people planning an international adoption',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/criteres-de-selection-des-adoptants/evaluation-psychosociale',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-training',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Préparation à l’adoption internationale', en: 'Preparing for international adoption' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/avant-adoption/preparation',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-gazette-training',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Règlement sur la formation préparatoire à l’adoption d’un enfant domicilié hors du Québec (décret 1173-2023)',
      en: 'Regulation respecting preparatory training for the adoption of a child domiciled outside Québec (Order 1173-2023, in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2023F/80337.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-costs',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coûts de l’adoption internationale', en: 'Costs of international adoption' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/avant-adoption/couts-adoption',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-children',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Profil des enfants adoptés à l’étranger', en: 'Profile of children adopted abroad' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/avant-adoption/adoption-internationale-profil-enfants',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-kafala',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Les pays prohibant l’adoption – La kafala', en: 'Countries that prohibit adoption: kafala' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/demarches-adoption/pays-kafala',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-countries',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Conditions et procédures par pays', en: 'Conditions and procedures by country' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/demarches-adoption/conditions-procedures',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-sasie-contacts',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coordonnées des services d’adoption internationale (SASIE)', en: 'Contact information for international adoption services (SASIE)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/a-propos-adoption-internationale/coordonnees',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-mii-sponsor',
    publisher: 'Gouvernement du Québec (Immigration)',
    title: {
      fr: 'Vérifier votre admissibilité pour parrainer un enfant que vous souhaitez adopter',
      en: 'Check your eligibility to sponsor a child you wish to adopt',
    },
    url: 'https://www.quebec.ca/immigration/permanente/parrainer-membre-famille/parrainer-enfant-a-adopter/verifier-votre-admissibilite',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-mii-undertaking',
    publisher: 'Gouvernement du Québec (Immigration)',
    title: {
      fr: 'Présenter une demande d’engagement pour parrainer un enfant à adopter',
      en: 'Submit an undertaking application to sponsor a child to be adopted',
    },
    url: 'https://www.quebec.ca/immigration/permanente/parrainer-membre-famille/parrainer-enfant-a-adopter/demande-engagement',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-hcch-1993',
    publisher: 'Conférence de La Haye de droit international privé (HCCH)',
    title: {
      fr: 'Convention du 29 mai 1993 sur la protection des enfants et la coopération en matière d’adoption internationale',
      en: 'Convention of 29 May 1993 on Protection of Children and Co-operation in Respect of Intercountry Adoption',
    },
    url: 'https://www.hcch.net/fr/instruments/conventions/full-text/?cid=69',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-intl-reports',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Rédaction des rapports d’évolution', en: 'Writing progress reports' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/suivis-apres-ladoption/rapports-evolution',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-post-adoption',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Services post-adoption offerts par les établissements territoriaux',
      en: 'Post-adoption services offered by regional establishments',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/suivis-apres-ladoption/services-post-adoption',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-rqap-planning',
    publisher: 'Gouvernement du Québec (RQAP)',
    title: {
      fr: 'RQAP : planifier les semaines de prestations à l’arrivée d’un enfant en vue de son adoption',
      en: 'QPIP: planning benefit weeks when a child arrives for adoption',
    },
    url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/financial-support-pregnant-women-families/quebec-parental-insurance-plan/adoption-child/planning-benefit-weeks',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-msss-stats-2025',
    publisher: 'MSSS',
    title: {
      fr: 'Statistiques 2025 sur l’adoption internationale et la recherche des origines et retrouvailles internationales',
      en: '2025 statistics on international adoption and international origins searches and reunions (in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2026/26-116-05W.pdf',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ origins and contact after adoption */
  {
    id: 'paths-abroad-after-shell-qc-origins-services',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Services en matière de recherche d’antécédents sociobiologiques et de retrouvailles',
      en: 'Services relating to research into family and medical background and reunions',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/recherche-antecedents',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-origins-bill2',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Recherche des origines : les nouvelles dispositions du projet de loi no 2',
      en: 'Searching for origins: the new provisions of Bill 2',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/pl2',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-origins-contacts',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Coordonnées des services de recherche d’antécédents sociobiologiques et de retrouvailles',
      en: 'Contact information for origins and reunion services',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-msss-origins-national',
    publisher: 'MSSS',
    title: {
      fr: 'La recherche des origines des personnes nées au Québec et adoptées par des parents domiciliés au Québec – À l’intention des personnes adoptées',
      en: 'Searching for origins when you were born and adopted in Québec: a guide for adoptees (in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2024/24-116-03WF.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-msss-origins-intl',
    publisher: 'MSSS',
    title: {
      fr: 'La recherche des origines en adoption internationale et dans une autre province ou territoire canadien – À l’intention des personnes adoptées',
      en: 'Searching for origins after an international or interprovincial adoption: a guide for adoptees (in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2024/24-116-06WF.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-msss-origins-form',
    publisher: 'MSSS',
    title: {
      fr: 'Demande de recherche d’antécédents sociobiologiques et de retrouvailles (formulaire)',
      en: 'Application for research into family and medical background and reunions (form, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2026/26-116-03WF.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-dec-original-act',
    publisher: 'Directeur de l’état civil',
    title: {
      fr: 'Pour une personne adoptée : copie d’acte de naissance primitif',
      en: 'For an adopted person: copy of the original act of birth (in French)',
    },
    url: 'https://www.etatcivil.gouv.qc.ca/fr/Acte_primitif.html',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-educaloi-origins',
    publisher: 'Éducaloi',
    title: { fr: 'Retrouver vos parents biologiques après une adoption', en: 'Finding your biological parents after being adopted' },
    url: 'https://educaloi.qc.ca/capsules/retrouver-ses-parents-biologiques-apres-une-adoption/',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-contact-agreement',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Entente de communication avec la famille biologique d’un enfant adopté',
      en: 'Communication agreement with the birth family of an adopted child',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/entente-communication',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-qc-mediation',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Médiation familiale lors de l’adoption', en: 'Family mediation in adoption' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/mediation-familiale',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-bill2',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi portant sur la réforme du droit de la famille en matière de filiation (L.Q. 2022, c. 22)',
      en: 'An Act respecting family law reform with regard to filiation (S.Q. 2022, c. 22)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/en/2022/2022C22A.PDF',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-charter',
    publisher: 'LégisQuébec',
    title: {
      fr: 'Charte des droits et libertés de la personne (RLRQ, c. C-12)',
      en: 'Charter of human rights and freedoms (CQLR, c. C-12)',
    },
    url: 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/C-12',
    checked: '2026-11-13',
  },
  {
    id: 'paths-abroad-after-shell-info-social',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Obtenir des conseils pour un problème psychosocial non urgent (Info-Social 811)',
      en: 'How to get advice about a non-urgent psychosocial problem (Info-Social 811)',
    },
    url: 'https://www.quebec.ca/en/health/health-system-and-services/service-organization/primary-care-health-and-social-services/how-get-advice-about-non-urgent-psychosocial-problem',
    checked: '2026-11-13',
  },
]
