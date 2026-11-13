// Researched content — verified 2026-11-13
import type { Help } from '../../src/content/types'

/*
 * Writing guide for this section (read by the "help" board):
 *  - emergency: ONE short sentence with the number in digits ("… Composez le 911."). A "?" splits it into
 *    two display lines (question / instruction). The first 2–4 digit number becomes the big dial keys.
 *  - copyLabel: the verb shown on the button, 1–2 words ("Copier"). copiedLabel: 1–3 words ("Numéro copié");
 *    the toast adds ": <numéro>".
 *  - items: 6–12. Put `urgent: true` on the 2–4 lines that answer right now (they are shown first, in their
 *    own row). The rest flow in rows of 3 (or 2) on desktop.
 *  - name: 2–6 words, ≤ 48 characters. Keep acronyms in parentheses at the end.
 *  - desc: 1–2 short sentences, 90–190 characters. Who it is for + what they do. **bold** one idea at most.
 *  - phone: digits only, as dialled, with spaces ("1 800 361-5085"). An extension or option goes after a
 *    comma ("811, option 2" / "1 800 567-8520, poste 3"): it is shown smaller and dialled after a pause.
 *  - hours: ≤ 36 characters ("24/7", "Lun–ven, 8 h 30–12 h et 13 h–16 h 30"); longer text wraps.
 *  - url: the official page. Its domain is shown as the link text. An item can have a phone, a url, or both.
 *
 * Every number and every hour below was read on the official page given in `url` (or on the Québec.ca page
 * cited in the comment) on November 13, 2026. Sources: src/content/sources/glossary-help.ts.
 * Regional numbers (DPJ, adoption, origins) are NOT hard-coded: they change, so the card links to the
 * official list instead.
 */
export const help: Help = {
  eyebrow: 'Obtenir de l’aide',
  title: 'À qui parler, maintenant ou plus tard.',
  lede:
    'Une question, une inquiétude, une décision difficile : plusieurs de ces services sont **gratuits et confidentiels**, et certains répondent jour et nuit. Les numéros peuvent changer ; en cas de doute, vérifiez sur Québec.ca. Pour comprendre vos droits en mots simples, il y a aussi [Éducaloi](https://educaloi.qc.ca/).',
  emergency: 'Danger immédiat ? Composez le 911.',
  copyLabel: 'Copier',
  copiedLabel: 'Numéro copié',
  items: [
    /* ------------------------------------------------ urgent: answer right now */
    {
      // Québec.ca, Coordonnées du DPJ (updated Oct. 7, 2026): reports 24/7, one number per region.
      id: 'dpj',
      name: 'DPJ de votre région',
      desc: 'Pour signaler une situation où un enfant pourrait être en danger, ou pour demander conseil. Chaque région a son propre numéro, qui répond **jour et nuit**.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj',
      hours: '24/7',
      urgent: true,
    },
    {
      // Québec.ca: 811, option 2; 24 h a day, 365 days; English answers; not in Nunavik or Terres-Cries-de-la-Baie-James.
      id: 'info-social',
      name: 'Info-Social 811',
      desc: 'Une intervenante ou un intervenant vous écoute, vous conseille et vous oriente. Gratuit, confidentiel, aussi en anglais ; non offert au Nunavik ni aux Terres-Cries-de-la-Baie-James.',
      phone: '811, option 2',
      url: 'https://www.quebec.ca/sante/systeme-et-services-de-sante/organisation-des-services/services-de-sante-et-services-sociaux-de-premiere-ligne/comment-obtenir-conseils-concernant-probleme-psychosocial-non-urgent',
      hours: '24/7',
      urgent: true,
    },
    {
      // Québec.ca, Ressources d'aide et de soutien en santé mentale (updated Oct. 28, 2026): "en tout temps".
      id: 'suicide',
      name: 'Prévention du suicide (1 866 APPELLE)',
      desc: 'Si vous pensez au suicide, ou si vous êtes inquiet pour un proche. Aussi par texto au 535353 et par clavardage sur suicide.ca.',
      phone: '1 866 277-3553',
      url: 'https://suicide.ca/',
      hours: '24/7',
      urgent: true,
    },
    /* ------------------------------------------------ learn more, get support */
    {
      // Québec.ca, Grossesse non planifiée : prise de décision (updated Nov. 8, 2024).
      id: 'grossesse',
      name: 'SOS Grossesse et Grossesse Secours',
      desc: 'Pour réfléchir à une grossesse imprévue, y compris à l’adoption, avec une intervenante neutre et sans jugement, de partout au Québec. Aussi : Grossesse Secours, 514 271-0554.',
      phone: '1 877 662-9666',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/soutien-pendant-grossesse-naissance/grossesse/avortement-decision',
    },
    {
      // Québec.ca, Coordonnées des services d'adoption par région (updated June 29, 2026).
      id: 'adoption-services',
      name: 'Service d’adoption de votre région',
      desc: 'Pour parler du projet de confier un enfant à l’adoption, ou pour adopter un enfant au Québec. **En parler ne vous engage à rien.** Les coordonnées sont listées région par région.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    },
    {
      // CSJ, Admissibilité and Prendre rendez-vous: minors free; contribution $100–$800; apply at the regional office.
      id: 'aide-juridique',
      name: 'Aide juridique',
      desc: 'Un avocat gratuit ou à coût réduit selon vos revenus, par exemple quand la DPJ va au tribunal. **Les enfants mineurs y ont droit gratuitement.** Prenez rendez-vous dans votre région.',
      url: 'https://www.csj.qc.ca/prendre-rendez-vous/',
    },
    {
      // Québec.ca mental-health resources page: 1 800 263-2266 (6 h–2 h); text or chat 514 600-1002 (8 h–22 h 30); 12–17.
      id: 'teljeunes',
      name: 'Tel-jeunes',
      desc: 'Pour les jeunes de 12 à 17 ans qui vivent un moment difficile. Gratuit et confidentiel. Aussi par texto ou clavardage au 514 600-1002, de 8 h à 22 h 30.',
      phone: '1 800 263-2266',
      url: 'https://www.teljeunes.com/accueil',
      hours: '6 h–2 h',
    },
    {
      // Same page: Tel-jeunes parents / LigneParents, 1 800 361-5085 (6 h–minuit), parents of children 0–20.
      id: 'ligneparents',
      name: 'Tel-jeunes parents (LigneParents)',
      desc: 'Pour les parents d’enfants de 0 à 20 ans : des intervenants professionnels vous écoutent et vous conseillent, au téléphone ou par clavardage. Gratuit et confidentiel.',
      phone: '1 800 361-5085',
      url: 'https://www.teljeunes.com/fr/parents',
      hours: '6 h–minuit',
    },
    {
      // CDPDJ, Nous joindre: toll-free 1 800 361-6477; Mon–Fri 8:30–12:00 and 13:00–16:30.
      id: 'cdpdj',
      name: 'Commission des droits (CDPDJ)',
      desc: 'La Commission des droits de la personne et des droits de la jeunesse peut enquêter si les droits d’un enfant suivi par la DPJ ne sont pas respectés.',
      phone: '1 800 361-6477',
      url: 'https://www.cdpdj.qc.ca/fr/nous-joindre',
      hours: 'Lun–ven, 8 h 30–12 h et 13 h–16 h 30',
    },
    {
      // Québec.ca, Coordonnées des services de recherche d'antécédents sociobiologiques et de retrouvailles (Nov. 9, 2026).
      id: 'origines',
      name: 'Recherche des origines et retrouvailles',
      desc: 'Pour les personnes adoptées et les parents d’origine qui cherchent des renseignements ou des retrouvailles. Adressez-vous au service de la région où l’adoption a eu lieu.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles',
    },
    {
      // Québec.ca, Coordonnées des services d'adoption internationale: 514 873-5226 / 1 800 561-0246;
      // international origins (same SASIE, other direction): 514 492-0467 / 1 833 453-0521.
      id: 'sasie',
      name: 'SASIE (adoption internationale)',
      desc: 'Pour l’adoption d’un enfant hors du Québec (un moratoire bloque les nouveaux dossiers avec un organisme agréé). Origines et retrouvailles internationales : 1 833 453-0521.',
      phone: '1 800 561-0246',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/a-propos-adoption-internationale/coordonnees',
    },
    {
      // Éducaloi (modified July 25, 2025) and MSSS brochure 24-116-03WF: head office 1 888 646-1060.
      // The organization's own website could not be checked, so no url is given.
      id: 'mouvement-retrouvailles',
      name: 'Mouvement Retrouvailles',
      desc: 'Un accompagnement bénévole, entre pairs, pour les personnes adoptées et les parents d’origine, à chaque étape des retrouvailles. Le siège social vous dirige vers le bureau le plus proche.',
      phone: '1 888 646-1060',
    },
  ],
}
