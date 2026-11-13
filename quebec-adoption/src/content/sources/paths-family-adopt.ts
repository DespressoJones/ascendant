import type { Source } from '../types'

/**
 * Sources for the "Dans la famille / Within the family" and "Adopter un enfant d'ici / Adopting a child
 * from here" journeys (content/{fr,en}/paths/family.ts and adopt.ts). Researched November 2026.
 */
export const pathsFamilyAdopt: Source[] = [
  {
    id: 'paths-family-adopt-cpc',
    publisher: 'LégisQuébec',
    title: { fr: 'Code de procédure civile (RLRQ, c. C-25.01)', en: 'Code of Civil Procedure (CQLR, c. C-25.01)' },
    url: 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/C-25.01',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-suppletive',
    publisher: 'Gouvernement du Québec (Curateur public)',
    title: { fr: 'Tuteur supplétif', en: 'Suppletive tutor (in French)' },
    url: 'https://www.quebec.ca/justice-et-etat-civil/protection-legale/tutelle-biens-mineur/personnes-impliquees/tuteur-suppletif',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-educaloi-tutorship',
    publisher: 'Éducaloi',
    title: { fr: 'La tutelle au mineur', en: 'Tutorship for children under 18' },
    url: 'https://educaloi.qc.ca/capsules/la-tutelle-au-mineur/',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-educaloi-third-party',
    publisher: 'Éducaloi',
    title: { fr: 'Attribuer la garde d’un enfant à un tiers', en: 'Giving custody of a child to a third party (in French)' },
    url: 'https://educaloi.qc.ca/capsules/attribuer-la-garde-dun-enfant-a-un-tiers/',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-bill113-notes',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Projet de loi no 113 (L.Q. 2017, c. 12) sur l’adoption et la communication de renseignements : notes explicatives',
      en: 'Bill 113 (S.Q. 2017, c. 12) on adoption and the disclosure of information: explanatory notes (in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2017F/67055.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-reg-tutorship-aid',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Règlement sur l’aide financière pour favoriser la tutelle et la tutelle coutumière autochtone à un enfant (décret 1914-2023, en vigueur le 1er février 2024)',
      en: 'Regulation respecting financial assistance to promote tutorship and Indigenous customary tutorship (Order 1914-2023, in force February 1, 2024; in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82290.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-reg-adoption-aid',
    publisher: 'Gazette officielle du Québec',
    title: {
      fr: 'Règlement sur l’aide financière pour favoriser l’adoption et l’adoption coutumière autochtone d’un enfant (décret 1915-2023, en vigueur le 1er février 2024)',
      en: 'Regulation respecting financial assistance to promote adoption and Indigenous customary adoption (Order 1915-2023, in force February 1, 2024; in French)',
    },
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2024F/82291.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-dec-register',
    publisher: 'Directeur de l’état civil',
    title: {
      fr: 'Registre des autorités compétentes en matière d’adoption coutumière et de tutelle coutumière autochtones',
      en: 'Register of competent authorities for Indigenous customary adoption and customary tutorship',
    },
    url: 'https://www.etatcivil.gouv.qc.ca/fr/registre_autorites.html',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-adoption-overview',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'À propos de l’adoption (dont l’adoption coutumière autochtone)', en: 'About adoption (including Indigenous customary adoption)' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/a-propos',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-adoption-contacts',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Coordonnées des services d’adoption par région', en: 'Adoption services contact information by region' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-contact-agreement',
    publisher: 'Gouvernement du Québec',
    title: {
      fr: 'Entente de communication avec la famille biologique d’un enfant adopté',
      en: 'Communication agreement with the biological family of an adopted child',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/entente-communication',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-mediation',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Médiation familiale lors de l’adoption', en: 'Family mediation in adoption' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/mediation-familiale',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-post-adoption',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Services post-adoption offerts par les établissements territoriaux', en: 'Post-adoption services offered by regional establishments' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/suivis-apres-ladoption/services-post-adoption',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-foster-criteria',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Critères pour devenir une famille d’accueil', en: 'Criteria for becoming a foster family' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/devenir-une-famille-daccueil',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-foster-process',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Démarche pour devenir une famille d’accueil', en: 'Steps to become a foster family' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/demarche',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-qpip-adoption',
    publisher: 'Gouvernement du Québec (RQAP)',
    title: {
      fr: 'Planification des semaines de prestations d’assurance parentale lors de l’arrivée d’un enfant en vue de son adoption',
      en: 'Planning QPIP benefit weeks when a child arrives for adoption',
    },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/aide-financiere-prestations/regime-quebecois-assurance-parentale/adoption/planification-semaines-prestations',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-msss-ri-rtf',
    publisher: 'MSSS',
    title: {
      fr: 'Les ressources intermédiaires et les ressources de type familial : cadre de référence (édition 2026)',
      en: 'Intermediate resources and family-type resources: reference framework (2026 edition, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2026/26-801-02W.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-msss-dnpj-2025',
    publisher: 'MSSS',
    title: {
      fr: 'Rapport annuel de la directrice nationale de la protection de la jeunesse 2024-2025',
      en: 'Annual report of the National Director of Youth Protection 2024–2025 (in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2025/25-838-07W.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-cdpdj-mcq-2025',
    publisher: 'Commission des droits de la personne et des droits de la jeunesse',
    title: {
      fr: 'Enquête systémique en protection des droits de la jeunesse : Mauricie–Centre-du-Québec (avril 2025)',
      en: 'Systemic investigation on youth rights: Mauricie–Centre-du-Québec (April 2025, in French)',
    },
    url: 'https://www.cdpdj.qc.ca/storage/app/media/publications/RapportJeunesseMCQ_avril2025.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-msss-life-plan',
    publisher: 'MSSS',
    title: {
      fr: 'Un projet de vie, des racines pour la vie (brochure, 2016)',
      en: 'A life plan, roots for life (brochure, 2016, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2016/16-838-03F.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-msss-manual-2010',
    publisher: 'MSSS',
    title: {
      fr: 'Manuel de référence sur la protection de la jeunesse (2010)',
      en: 'Youth protection reference manual (2010, in French)',
    },
    url: 'https://publications.msss.gouv.qc.ca/msss/fichiers/2010/10-838-04.pdf',
    checked: '2026-11-13',
  },
  {
    id: 'paths-family-adopt-qc-filiation',
    publisher: 'Gouvernement du Québec',
    title: { fr: 'Établissement de la filiation', en: 'Establishing filiation' },
    url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/filiation/etablir',
    checked: '2026-11-13',
  },
]
