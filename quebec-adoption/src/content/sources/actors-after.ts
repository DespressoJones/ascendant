import type { Source } from '../types'

/**
 * Sources for the "Qui fait quoi / Who's who" (content/{fr,en}/actors.ts) and
 * "Après l'adoption / After the adoption" (content/{fr,en}/after.ts) sections. Researched November 2026.
 * Pages marked "(in French)" have no English version, or the English version could not be confirmed.
 */
export const actorsAfter: Source[] = [
  /* ------------------------------------------------------------------ actors */
  {
    id: 'actors-after-qc-dpj',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Directeur de la protection de la jeunesse (DPJ)', en: 'Director of Youth Protection (DYP)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/directeur-de-la-protection-de-la-jeunesse-dpj',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-adoption-services',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coordonnées des services d’adoption par région', en: 'Contact details for adoption services by region' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-foster',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Qu’est-ce qu’une famille d’accueil', en: 'What is a foster family' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/description-famille-accueil',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-intl',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Adoption internationale (avis de moratoire)', en: 'International adoption (moratorium notice)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-certified-bodies',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Liste des organismes agréés en adoption internationale (mise à jour le 2 novembre 2026)',
      en: 'List of certified bodies for international adoption (updated November 2, 2026)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/organismes-agrees-adoption-internationale/liste-organismes-agrees',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-811',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Info-Social 811', en: 'Info-Social 811' },
    url: 'https://www.quebec.ca/sante/trouver-une-ressource/info-social-811',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-cdpdj-youth',
    publisher: 'CDPDJ',
    title: {
      fr: 'Demander une enquête pour un enfant ou un jeune (lésion de droits)',
      en: 'Requesting an intervention for a child or young person (infringement of rights)',
    },
    url: 'https://www.cdpdj.qc.ca/fr/porter-plainte/je-veux/demander-une-intervention-pour-un-enfant-ou-un-jeune-lesion-de-droit',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-csj',
    publisher: 'Commission des services juridiques',
    title: { fr: 'Aide juridique : avocat gratuit ou avec contribution', en: 'Legal aid: free or low-cost lawyers' },
    url: 'https://www.csj.qc.ca/',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-bill2',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Loi portant sur la réforme du droit de la famille en matière de filiation… (L.Q. 2022, c. 22), notamment art. 183 (LPJ, art. 71.3.4) et 296 (refus d’avant 2024)',
      en: 'An Act to reform family law with regard to filiation… (S.Q. 2022, c. 22), incl. s. 183 (YPA, s. 71.3.4) and s. 296 (pre-2024 vetoes)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2022/2022C22F.PDF',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ act of birth, origins */
  {
    id: 'actors-after-dec-original-act',
    publisher: 'Directeur de l’état civil',
    title: {
      fr: 'Pour une personne adoptée : copie d’acte de naissance primitif (révisé le 21 janvier 2026)',
      en: 'For the adopted person: copy of the original act of birth (reviewed January 21, 2026)',
    },
    url: 'https://www.etatcivil.gouv.qc.ca/fr/Acte_primitif.html',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-origins-bill2',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Recherche des origines : les nouvelles dispositions du projet de loi no 2',
      en: 'Searching for origins: the new provisions of Bill 2',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/pl2',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-origins-services',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Services en matière de recherche d’antécédents sociobiologiques et de retrouvailles',
      en: 'Services for searching socio-biological history and reunions',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/recherche-antecedents',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-origins-contacts',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Coordonnées des services de recherche d’antécédents sociobiologiques et de retrouvailles',
      en: 'Contact details for socio-biological history and reunion services',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ contact after adoption */
  {
    id: 'actors-after-qc-contact-agreement',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Entente de communication avec la famille biologique d’un enfant adopté',
      en: 'Communication agreement with the biological family of an adopted child',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/entente-communication',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-qc-mediation',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Médiation familiale lors de l’adoption', en: 'Family mediation in adoption' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/mediation-familiale',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ RQAP / QPIP */
  {
    id: 'actors-after-rqap-plans',
    publisher: 'Gouvernement du Québec (RQAP)',
    title: {
      fr: 'Choix du régime et types de prestations lors de l’arrivée d’un enfant en vue de son adoption (mise à jour le 26 février 2026)',
      en: 'Choice of plan and types of benefits when a child arrives for adoption (updated February 26, 2026)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/choix-regime',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-rqap-eligibility',
    publisher: 'Gouvernement du Québec (RQAP)',
    title: {
      fr: 'Conditions d’admissibilité au RQAP lors de l’arrivée d’un enfant en vue de son adoption',
      en: 'QPIP eligibility conditions when a child arrives for adoption',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/conditions-admissibilite',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-rqap-planning',
    publisher: 'Gouvernement du Québec (RQAP)',
    title: {
      fr: 'Planification des semaines de prestations lors de l’arrivée d’un enfant en vue de son adoption',
      en: 'Planning QPIP benefit weeks when a child arrives for adoption',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/planification-semaines-prestations',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-rqap-apply',
    publisher: 'Gouvernement du Québec (RQAP)',
    title: { fr: 'Faire une demande de prestations d’assurance parentale', en: 'Applying for parental insurance benefits' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/faire-demande',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ labour standards */
  {
    id: 'actors-after-educaloi-leave',
    publisher: 'Éducaloi',
    title: {
      fr: 'L’arrivée d’un enfant : quels congés pouvez-vous prendre? (modifié en novembre 2026)',
      en: 'Welcoming a child: how much leave can you take? (updated November 2026)',
    },
    url: 'https://educaloi.qc.ca/capsules/arrivee-dun-enfant-quels-conges-pouvez-vous-prendre/',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-bill12',
    publisher: 'Publications du Québec',
    title: {
      fr: 'L.Q. 2023, c. 13, art. 56 à 61 : art. 81.1, 81.2 et 81.11 de la Loi sur les normes du travail, remplacés (en vigueur le 6 juin 2023)',
      en: 'S.Q. 2023, c. 13, ss. 56 to 61: ss. 81.1, 81.2 and 81.11 of the Act respecting labour standards, as replaced (in force June 6, 2023)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2023/2023C13F.PDF',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ tax credits */
  {
    id: 'actors-after-rq-adoption-credit',
    publisher: 'Revenu Québec',
    title: {
      fr: 'Ligne 462, point 6 : crédit d’impôt pour frais d’adoption (déclaration 2025)',
      en: 'Line 462, point 6: tax credit for adoption expenses (2025 return)',
    },
    url: 'https://www.revenuquebec.ca/fr/citoyens/declaration-de-revenus/produire-votre-declaration-de-revenus/comment-remplir-votre-declaration-de-revenus/aide-par-ligne/451-a-480-remboursement-ou-solde-a-payer/ligne-462/point-6/',
    checked: '2026-11-13',
  },
  {
    id: 'actors-after-cra-adoption-expenses',
    publisher: 'Canada.ca (ARC / CRA)',
    title: { fr: 'Ligne 31300 : frais d’adoption', en: 'Line 31300: Adoption expenses' },
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-31300-adoption-expenses.html',
    checked: '2026-11-13',
  },

  /* ------------------------------------------------------------------ support */
  {
    id: 'actors-after-qc-post-adoption',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Services post-adoption offerts par les établissements territoriaux (mise à jour le 16 juillet 2026)',
      en: 'Post-adoption services offered by regional establishments (updated July 16, 2026, in French)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/suivis-apres-ladoption/services-post-adoption',
    checked: '2026-11-13',
  },
]
