// DRAFT — replaced by researched content
import type { Help } from '../types'

/*
 * Writing guide for this section (read by the "help" board):
 *  - emergency: ONE short sentence with the number in digits ("… Call 911."). A "?" splits it into two
 *    display lines (question / instruction). The first 2–4 digit number becomes the big dial keys.
 *  - copyLabel: the verb shown on the button, 1–2 words ("Copy"). copiedLabel: 1–3 words ("Number copied");
 *    the toast adds ": <number>".
 *  - items: 6–12. Put `urgent: true` on the 2–4 lines that answer right now (they are shown first, in their
 *    own row). The rest flow in rows of 3 (or 2) on desktop.
 *  - name: 2–6 words, ≤ 48 characters. Keep acronyms in parentheses at the end.
 *  - desc: 1–2 short sentences, 90–190 characters. Who it is for + what they do. **bold** one idea at most.
 *  - phone: digits only, as dialled, with spaces ("1 800 361-5085"). An extension or option goes after a
 *    comma ("811, option 2" / "1 800 567-8520, ext. 3"): it is shown smaller and dialled after a pause.
 *  - hours: ≤ 36 characters ("24/7", "Mon–Fri, 8:30–noon and 1–4:30 p.m."); longer text wraps.
 *  - url: the official page. Its domain is shown as the link text. An item can have a phone, a url, or both.
 */
export const help: Help = {
  eyebrow: 'Get help',
  title: 'Someone to talk to, now or later.',
  lede:
    'A question, a worry, a hard decision: most of these services are **free and confidential**, and several answer day and night. Numbers can change, so if in doubt, check Québec.ca.',
  emergency: 'Danger right now? Call 911.',
  copyLabel: 'Copy',
  copiedLabel: 'Number copied',
  items: [
    {
      id: 'dpj',
      name: 'Your region’s DPJ',
      desc: 'To report a situation where a child may be in danger, or just to ask for advice. Each region has its own number, answered **day and night**.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj',
      hours: '24/7',
      urgent: true,
    },
    {
      id: 'info-social',
      name: 'Info-Social 811',
      desc: 'A psychosocial worker listens, gives advice and points you to help near you. Free and confidential, in English too.',
      phone: '811, option 2',
      url: 'https://www.quebec.ca/en/health/health-system-and-services/service-organization/primary-care-health-and-social-services/how-get-advice-about-non-urgent-psychosocial-problem',
      hours: '24/7',
      urgent: true,
    },
    {
      id: 'suicide',
      name: 'Suicide prevention (1 866 APPELLE)',
      desc: 'If you are thinking about suicide, or worried about someone. You can also text 535353 or chat at suicide.ca.',
      phone: '1 866 277-3553',
      url: 'https://suicide.ca',
      hours: '24/7',
      urgent: true,
    },
    {
      id: 'adoption-services',
      name: 'Your region’s adoption service',
      desc: 'To adopt a child in Québec, or to talk about placing a child for adoption. The list of services, region by region, is on Québec.ca.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    },
    {
      id: 'sos-grossesse',
      name: 'SOS Grossesse',
      desc: 'Non-judgmental listening and information about an unplanned pregnancy, including adoption. Takes calls from anywhere in Québec.',
      phone: '1 877 662-9666',
      url: 'https://www.sosgrossesse.ca',
    },
    {
      id: 'ligneparents',
      name: 'Tel-jeunes parents (LigneParents)',
      desc: 'Listening and advice for parents of children aged 0 to 20, by phone or by chat.',
      phone: '1 800 361-5085',
      hours: '6 a.m. – midnight',
    },
    {
      id: 'teljeunes',
      name: 'Tel-jeunes',
      desc: 'For young people aged 12 to 17 going through a hard time, including a placement. You can also text 514 600-1002.',
      phone: '1 800 263-2266',
      url: 'https://www.teljeunes.com',
      hours: '6 a.m. – 2 a.m.',
    },
    {
      id: 'aide-juridique',
      name: 'Legal aid',
      desc: 'A free or low-cost lawyer, for example in a youth protection case before the court. **Children are entitled to it for free.**',
      url: 'https://www.csj.qc.ca',
    },
    {
      id: 'cdpdj',
      name: 'Human Rights and Youth Rights Commission (CDPDJ)',
      desc: 'If you believe the rights of a child followed by the DPJ are not being respected, the Commission can investigate.',
      phone: '1 800 361-6477',
      url: 'https://www.cdpdj.qc.ca/en',
      hours: 'Mon–Fri, 8:30–noon and 1–4:30 p.m.',
    },
    {
      id: 'origines',
      name: 'Origins searches and reunions',
      desc: 'For adoptees and birth parents who want information or to find each other. For an international adoption, contact the SASIE.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles',
    },
  ],
}
