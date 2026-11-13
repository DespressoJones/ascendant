import type { Source } from '../types'

/**
 * Canonical sources shared by every section. Section-specific sources live in sibling files
 * (e.g. sources/paths-hospital.ts) and are merged by content/sources.ts. Ids must be unique.
 */
export const core: Source[] = [
  {
    id: 'ccq',
    publisher: 'LégisQuébec',
    title: { fr: 'Code civil du Québec (RLRQ, c. CCQ-1991)', en: 'Civil Code of Québec (CQLR, c. CCQ-1991)' },
    url: 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991',
    checked: '2026-11-13',
  },
  {
    id: 'ccq-book2',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Code civil du Québec, Livre deuxième : De la famille (codification administrative, à jour au 9 septembre 2026)',
      en: 'Civil Code of Québec, Book Two: The Family (administrative consolidation, current to September 9, 2026)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/CodificationsAdministratives/CCQ__LIVRE_II.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'ccq-book1',
    publisher: 'Publications du Québec',
    title: {
      fr: 'Code civil du Québec, Livre premier : Des personnes (codification administrative, à jour au 9 septembre 2026)',
      en: 'Civil Code of Québec, Book One: Persons (administrative consolidation, current to September 9, 2026)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/CodificationsAdministratives/CCQ_LIVRE__I.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'lpj',
    publisher: 'LégisQuébec',
    title: { fr: 'Loi sur la protection de la jeunesse (RLRQ, c. P-34.1)', en: 'Youth Protection Act (CQLR, c. P-34.1)' },
    url: 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-34.1',
    checked: '2026-11-13',
  },
  {
    id: 'qc-adoption-about',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'À propos de l’adoption au Québec', en: 'About adoption in Québec' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/a-propos-adoption-au-quebec',
    checked: '2026-11-13',
  },
  {
    id: 'qc-adoption-legal',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Cadre légal de l’adoption au Québec', en: 'Legal framework for adoption in Québec' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/adoption-quebec-cadre-legal',
    checked: '2026-11-13',
  },
  {
    id: 'educaloi-adopt',
    publisher: 'Éducaloi',
    title: { fr: 'Adopter un enfant au Québec', en: 'Adopting a child in Québec' },
    url: 'https://educaloi.qc.ca/capsules/adopter-un-enfant-au-quebec/',
    checked: '2026-11-13',
  },
  {
    id: 'qc-tuf',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Tribunal unifié de la famille (Cour du Québec)', en: 'Unified Family Tribunal (Court of Québec)' },
    url: 'https://www.quebec.ca/justice-et-etat-civil/systeme-judiciaire/tribunaux-du-quebec/cour-du-quebec/tribunal-unifie-famille',
    checked: '2026-11-13',
  },
  {
    id: 'qc-dpj-steps',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Intervention du DPJ à la suite d’un signalement', en: 'Steps taken by the DYP when a situation is reported' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/intervention-du-dpj-a-la-suite-d-un-signalement',
    checked: '2026-11-13',
  },
  {
    id: 'qc-origins',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Rechercher des informations sur sa famille d’origine ou sur un enfant confié à l’adoption',
      en: 'Searching for information about your family of origin or a child placed for adoption',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption',
    checked: '2026-11-13',
  },
  {
    id: 'msss-origins-guide',
    publisher: 'MSSS',
    title: {
      fr: 'Guide de pratique professionnelle en matière d’antécédents sociobiologiques et de retrouvailles (2024)',
      en: 'Professional practice guide on socio-biological history and reunions (2024, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2024/24-116-04W.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'csj',
    publisher: 'Commission des services juridiques',
    title: { fr: 'Aide juridique : services couverts', en: 'Legal aid: services covered' },
    url: 'https://www.csj.qc.ca/services-law/',
    checked: '2026-11-13',
  },
]
