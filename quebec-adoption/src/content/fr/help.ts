// DRAFT — replaced by researched content
import type { Help } from '../types'

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
 *  - hours: ≤ 36 characters ("24/7", "Lun–ven, 8 h 30–12 h et 13 h–16 h 30"); longer text wraps (use \u00a0 inside "8 h 30" so times never split).
 *  - url: the official page. Its domain is shown as the link text. An item can have a phone, a url, or both.
 */
export const help: Help = {
  eyebrow: 'Obtenir de l’aide',
  title: 'À qui parler, maintenant ou plus tard.',
  lede:
    'Une question, une inquiétude, une décision difficile : la plupart de ces services sont **gratuits et confidentiels**, et plusieurs répondent jour et nuit. Les numéros peuvent changer; en cas de doute, vérifiez sur Québec.ca.',
  emergency: 'Danger immédiat ? Composez le 911.',
  copyLabel: 'Copier',
  copiedLabel: 'Numéro copié',
  items: [
    {
      id: 'dpj',
      name: 'DPJ de votre région',
      desc: 'Pour signaler une situation où un enfant pourrait être en danger, ou simplement demander conseil. Chaque région a son numéro, ouvert **jour et nuit**.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj',
      hours: '24/7',
      urgent: true,
    },
    {
      id: 'info-social',
      name: 'Info-Social 811',
      desc: 'Une intervenante ou un intervenant psychosocial vous écoute, vous conseille et vous oriente vers l’aide de votre région. Gratuit et confidentiel.',
      phone: '811, option 2',
      url: 'https://www.quebec.ca/sante/trouver-une-ressource/info-social-811',
      hours: '24/7',
      urgent: true,
    },
    {
      id: 'suicide',
      name: 'Prévention du suicide (1 866 APPELLE)',
      desc: 'Si vous pensez au suicide ou si vous êtes inquiet pour quelqu’un. Aussi par texto au 535353 et par clavardage sur suicide.ca.',
      phone: '1 866 277-3553',
      url: 'https://suicide.ca',
      hours: '24/7',
      urgent: true,
    },
    {
      id: 'adoption-services',
      name: 'Service d’adoption de votre région',
      desc: 'Pour adopter un enfant au Québec, ou pour parler du projet de confier un enfant à l’adoption. La liste des services, région par région, est sur Québec.ca.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    },
    {
      id: 'sos-grossesse',
      name: 'SOS Grossesse',
      desc: 'Écoute et information sans jugement pour une grossesse imprévue, y compris sur l’adoption. Répond aux appels de partout au Québec.',
      phone: '1 877 662-9666',
      url: 'https://www.sosgrossesse.ca',
    },
    {
      id: 'ligneparents',
      name: 'Tel-jeunes parents (LigneParents)',
      desc: 'Écoute et conseils pour les parents d’enfants de 0 à 20 ans, par téléphone ou par clavardage.',
      phone: '1 800 361-5085',
      hours: '6\u00a0h – minuit',
    },
    {
      id: 'teljeunes',
      name: 'Tel-jeunes',
      desc: 'Pour les jeunes de 12 à 17 ans qui traversent un moment difficile, y compris un placement. Aussi par texto au 514 600-1002.',
      phone: '1 800 263-2266',
      url: 'https://www.teljeunes.com',
      hours: '6\u00a0h – 2\u00a0h',
    },
    {
      id: 'aide-juridique',
      name: 'Aide juridique',
      desc: 'Un avocat gratuit ou à faible coût, par exemple devant le tribunal en protection de la jeunesse. **Les enfants y ont droit gratuitement.**',
      url: 'https://www.csj.qc.ca',
    },
    {
      id: 'cdpdj',
      name: 'Commission des droits de la personne et des droits de la jeunesse (CDPDJ)',
      desc: 'Si vous croyez que les droits d’un enfant suivi par la DPJ ne sont pas respectés, la Commission peut enquêter.',
      phone: '1 800 361-6477',
      url: 'https://www.cdpdj.qc.ca',
      hours: 'Lun–ven, 8\u00a0h\u00a030–12\u00a0h et 13\u00a0h–16\u00a0h\u00a030',
    },
    {
      id: 'origines',
      name: 'Recherche des origines et retrouvailles',
      desc: 'Pour les personnes adoptées et les parents d’origine qui veulent obtenir des renseignements ou se retrouver. Pour une adoption internationale, c’est le SASIE.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles',
    },
  ],
}
