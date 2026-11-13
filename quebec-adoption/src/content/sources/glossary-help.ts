import type { Source } from '../types'

/**
 * Sources for the "Glossaire / Glossary" (content/{fr,en}/glossary.ts) and "Obtenir de l'aide / Get help"
 * (content/{fr,en}/help.ts) sections. Every phone number and opening hour in help.ts was read on these
 * pages on November 13, 2026. Pages marked "(in French)" have no English version, or none was confirmed.
 * Legal definitions also rely on the Civil Code and LPJ entries in core.ts (ccq, ccq-book1, ccq-book2, lpj),
 * qc-tuf, qc-origins and qc-adoption-about.
 */
export const glossaryHelp: Source[] = [
  /* ------------------------------------------------------------------ help: lines that answer now */
  {
    id: 'glossary-help-dpj-contacts',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coordonnées du DPJ', en: 'Contact information of the DYP' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-info-social',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Info-Social 811', en: 'Info-Social 811' },
    url: 'https://www.quebec.ca/sante/trouver-une-ressource/info-social-811',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-811-option-2',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Comment obtenir des conseils concernant un problème psychosocial non urgent',
      en: 'How to get advice about a non-urgent psychosocial problem',
    },
    url: 'https://www.quebec.ca/sante/systeme-et-services-de-sante/organisation-des-services/services-de-sante-et-services-sociaux-de-premiere-ligne/comment-obtenir-conseils-concernant-probleme-psychosocial-non-urgent',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-support-lines',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Ressources d’aide et de soutien en santé mentale par besoin (Tel-jeunes, Tel-jeunes parents, prévention du suicide)',
      en: 'Mental health help and support resources (Tel-jeunes, Tel-jeunes parents, suicide prevention)',
    },
    url: 'https://www.quebec.ca/sante/sante-mentale/trouver-aide-et-soutien-en-sante-mentale/trouver-ressource-aide-et-soutien-en-sante-mentale/ressources-aide-et-soutien-sante-mentale-par-besoin',
    checked: '2026-11-13',
  },
  /* ------------------------------------------------------------------ help: support and information */
  {
    id: 'glossary-help-pregnancy-decision',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Grossesse non planifiée : prise de décision (SOS Grossesse, Grossesse Secours)',
      en: 'Unplanned pregnancy: making a decision (SOS Grossesse, Grossesse Secours)',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/soutien-pendant-grossesse-naissance/grossesse/avortement-decision',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-adoption-services',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coordonnées des services d’adoption par région', en: 'Contact details for adoption services by region' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-csj-eligibility',
    publisher: 'Commission des services juridiques',
    title: { fr: 'Admissibilité à l’aide juridique', en: 'Legal aid eligibility' },
    url: 'https://www.csj.qc.ca/admissibilite/',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-csj-appointment',
    publisher: 'Commission des services juridiques',
    title: { fr: 'Aide juridique : prendre rendez-vous près de chez vous', en: 'Legal aid: book an appointment near you' },
    url: 'https://www.csj.qc.ca/prendre-rendez-vous/',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-cdpdj-contact',
    publisher: 'Commission des droits de la personne et des droits de la jeunesse',
    title: { fr: 'Nous joindre', en: 'Contact us' },
    url: 'https://www.cdpdj.qc.ca/fr/nous-joindre',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-origins-contacts',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Coordonnées des services de recherche d’antécédents sociobiologiques et de retrouvailles',
      en: 'Contact information for socio-biological research and reunion services',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-sasie-contacts',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Coordonnées des services d’adoption internationale (SASIE) et avis de moratoire',
      en: 'Contact information for international adoption services (SASIE) and moratorium notice',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/a-propos-adoption-internationale/coordonnees',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-educaloi-origins',
    publisher: 'Éducaloi',
    title: {
      fr: 'Retrouver ses parents biologiques après une adoption (Mouvement Retrouvailles)',
      en: 'Finding your biological parents after being adopted (Mouvement Retrouvailles)',
    },
    url: 'https://educaloi.qc.ca/capsules/retrouver-ses-parents-biologiques-apres-une-adoption/',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-msss-origins-brochure',
    publisher: 'MSSS',
    title: {
      fr: 'La recherche des origines des personnes nées au Québec et adoptées par des parents domiciliés au Québec (2024)',
      en: 'Searching for origins: people born in Québec and adopted by parents living in Québec (2024, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2024/24-116-03WF.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-educaloi',
    publisher: 'Éducaloi',
    title: { fr: 'Éducaloi : la loi expliquée en mots simples', en: 'Éducaloi: the law explained in plain language' },
    url: 'https://educaloi.qc.ca/',
    checked: '2026-11-13',
  },
  /* ------------------------------------------------------------------ glossary definitions */
  {
    id: 'glossary-help-dec-original-act',
    publisher: 'Directeur de l’état civil',
    title: {
      fr: 'Pour une personne adoptée : copie d’acte de naissance primitif',
      en: 'For an adopted person: copy of the original act of birth (in French)',
    },
    url: 'https://www.etatcivil.gouv.qc.ca/fr/Acte_primitif.html',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-foster-family',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Qu’est-ce qu’une famille d’accueil', en: 'What is a foster family' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/description-famille-accueil',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-complaints',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Régime d’examen des plaintes du réseau de la santé et des services sociaux',
      en: 'Complaint examination procedure in the health and social services network',
    },
    url: 'https://www.quebec.ca/sante/systeme-et-services-de-sante/droits-recours-et-plaintes/regime-d-examen-des-plaintes',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-rqap-adoption',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'RQAP : choix du régime et types de prestations lors de l’arrivée d’un enfant en vue de son adoption',
      en: 'QPIP: choice of plan and types of benefits when a child arrives for adoption',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/choix-regime',
    checked: '2026-11-13',
  },
  {
    id: 'glossary-help-no-prenatal-reports',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Fin de la pratique du signalement des naissances – plan de services préventifs et intensifs en période prénatale (14 avril 2023)',
      en: 'End of birth alerts: preventive and intensive prenatal services plan (April 14, 2023, in French)',
    },
    url: 'https://www.quebec.ca/nouvelles/actualites/details/fin-de-la-pratique-du-signalement-des-naissances-mise-en-place-dun-plan-de-services-preventifs-et-intensifs-en-periode-prenatale-47068',
    checked: '2026-11-13',
  },
]
