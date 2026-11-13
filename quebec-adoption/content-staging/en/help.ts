// Researched content — verified 2026-11-13
import type { Help } from '../../src/content/types'

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
 *
 * Every number and every hour below was read on the official page given in `url` (or on the Québec.ca page
 * cited in the comment) on November 13, 2026. Sources: src/content/sources/glossary-help.ts.
 * Regional numbers (DPJ, adoption, origins) are NOT hard-coded: they change, so the card links to the
 * official list instead.
 */
export const help: Help = {
  eyebrow: 'Get help',
  title: 'Someone to talk to, now or later.',
  lede:
    'A question, a worry, a hard decision: several of these services are **free and confidential**, and some answer day and night. Numbers can change, so if in doubt, check Québec.ca. To understand your rights in plain language, there is also [Éducaloi](https://educaloi.qc.ca/en/).',
  emergency: 'Danger right now? Call 911.',
  copyLabel: 'Copy',
  copiedLabel: 'Number copied',
  items: [
    /* ------------------------------------------------ urgent: answer right now */
    {
      // Québec.ca, Contact informations of the DYP (updated Oct. 7, 2026): reports 24/7, one number per region.
      id: 'dpj',
      name: 'Your region’s DPJ',
      desc: 'To report a situation where a child may be in danger, or to ask for advice. Each region has its own number, answered **day and night**.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/childhood/youth-protection/reporting-a-situation-to-the-director-of-youth-protection/contact-informations-of-the-dyp',
      hours: '24/7',
      urgent: true,
    },
    {
      // Québec.ca: 811, option 2; 24 h a day, 365 days; English answers; not in Nunavik or the Cree Territory of James Bay.
      id: 'info-social',
      name: 'Info-Social 811',
      desc: 'A psychosocial worker listens, advises you and points you to help. Free, confidential, in English too; not offered in Nunavik or the Cree Territory of James Bay.',
      phone: '811, option 2',
      url: 'https://www.quebec.ca/en/health/health-system-and-services/service-organization/primary-care-health-and-social-services/how-get-advice-about-non-urgent-psychosocial-problem',
      hours: '24/7',
      urgent: true,
    },
    {
      // Québec.ca, Mental health help and support resources (updated Oct. 28, 2026): "at any time".
      id: 'suicide',
      name: 'Suicide prevention (1 866 APPELLE)',
      desc: 'If you are thinking about suicide, or if you are worried about someone close to you. You can also text 535353 or chat at suicide.ca.',
      phone: '1 866 277-3553',
      url: 'https://suicide.ca/',
      hours: '24/7',
      urgent: true,
    },
    /* ------------------------------------------------ learn more, get support */
    {
      // Québec.ca, Unplanned pregnancy: making a decision (both lines listed as "in French only").
      id: 'grossesse',
      name: 'SOS Grossesse and Grossesse Secours',
      desc: 'Talk through an unplanned pregnancy, including adoption, with a neutral, non-judgmental worker, from anywhere in Québec (in French). Also: Grossesse Secours, 514 271-0554.',
      phone: '1 877 662-9666',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/support-during-pregnancy-birth/pregnancy/abortion-decision',
    },
    {
      // Québec.ca, Contact details for adoption services by region (updated June 29, 2026).
      id: 'adoption-services',
      name: 'Your region’s adoption service',
      desc: 'To talk about placing a child for adoption, or to adopt a child in Québec. **Talking to them does not commit you to anything.** Contact details are listed region by region.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/adoption-in-quebec/contact-details-for-adoption-services-by-region',
    },
    {
      // CSJ, Eligibility and Book an appointment: minors free; contribution $100–$800; apply at the regional office.
      id: 'aide-juridique',
      name: 'Legal aid',
      desc: 'A free or low-cost lawyer, depending on your income, for example when the DPJ goes to court. **Minors are entitled to it for free.** Book an appointment in your region.',
      url: 'https://www.csj.qc.ca/book-appointment/',
    },
    {
      // Québec.ca mental-health resources page: 1-800-263-2266 (6 a.m.–2 a.m.); text or chat 514-600-1002 (8 a.m.–10:30 p.m.); 12–17.
      id: 'teljeunes',
      name: 'Tel-jeunes',
      desc: 'For young people aged 12 to 17 going through a hard time. Free and confidential. You can also text or chat at 514 600-1002, from 8 a.m. to 10:30 p.m.',
      phone: '1 800 263-2266',
      url: 'https://www.teljeunes.com/en',
      hours: '6 a.m.–2 a.m.',
    },
    {
      // Same page: Tel-jeunes parents / LigneParents, 1-800-361-5085 (6 a.m.–midnight), parents of children 0–20.
      id: 'ligneparents',
      name: 'Tel-jeunes parents (LigneParents)',
      desc: 'For parents of children aged 0 to 20: professional counsellors listen and give advice, by phone or by chat. Free and confidential.',
      phone: '1 800 361-5085',
      url: 'https://www.teljeunes.com/en/parents',
      hours: '6 a.m.–midnight',
    },
    {
      // CDPDJ, Contact us: toll-free 1 800 361-6477; Monday to Friday, 8:30 a.m. to noon and 1 p.m. to 4:30 p.m.
      id: 'cdpdj',
      name: 'Rights commission (CDPDJ)',
      desc: 'The Commission des droits de la personne et des droits de la jeunesse can investigate if the rights of a child followed by the DPJ are not respected.',
      phone: '1 800 361-6477',
      url: 'https://www.cdpdj.qc.ca/en/contact-us',
      hours: 'Mon–Fri, 8:30–noon and 1–4:30 p.m.',
    },
    {
      // Québec.ca, Contact information for socio-biological research and reunion services (Nov. 9, 2026).
      id: 'origines',
      name: 'Origins searches and reunions',
      desc: 'For adopted people and birth parents looking for information or a reunion. Contact the service in the region where the adoption took place.',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/search-information-family-origin-or-child-adoption/contact-information-socio-biological-research-and-reunion-services',
    },
    {
      // Québec.ca, Contact information for international adoption services: 514-873-5226 / 1-800-561-0246;
      // international origins (same SASIE, other branch): 514-492-0467 / 1-833-453-0521.
      id: 'sasie',
      name: 'SASIE (international adoption)',
      desc: 'For adopting a child from outside Québec (a moratorium blocks new files with a certified body). International origins searches and reunions: 1 833 453-0521.',
      phone: '1 800 561-0246',
      url: 'https://www.quebec.ca/en/family-and-support-for-individuals/pregnancy-parenthood/adoption/international-adoption/about/contact-information-international-adoption-services',
    },
    {
      // Éducaloi (modified July 25, 2025) and MSSS brochure 24-116-03WF: head office 1-888-646-1060.
      // The organization's own website could not be checked, so no url is given.
      id: 'mouvement-retrouvailles',
      name: 'Mouvement Retrouvailles',
      desc: 'Volunteer peer support for adopted people and birth parents, at every step of a reunion. The head office will refer you to the office nearest you.',
      phone: '1 888 646-1060',
    },
  ],
}
