// DRAFT — replaced by researched content
import type { Actors } from '../types'

/*
 * Writing guide for this section (read by the "actors" constellation):
 *  - 7 to 12 items; 9 or 10 is the sweet spot. Items are placed clockwise around the child, starting
 *    just right of the top. The FIRST item is the one selected when the page loads (keep the DPJ first).
 *  - short: what is printed on the node. An acronym or one or two words. Ideal ≤ 10 characters;
 *    up to ~18 is fine (it wraps to two lines, e.g. "Famille d’accueil").
 *  - name: the full name, 25–70 characters. It must not just repeat `short`.
 *  - role: 1–2 short sentences, 120–240 characters. **bold** the one idea to retain.
 *  - when: one sentence, 60–140 characters, starting with the moment ("Après…", "Dès…", "Si…").
 *  - url: an official page (opens in a new tab); optional. The host name is shown on the button.
 */
export const actors: Actors = {
  eyebrow: 'Qui fait quoi',
  title: 'Beaucoup de monde, un seul centre : l’enfant.',
  lede:
    'DPJ, tribunal, service d’adoption, famille d’accueil… Les noms se bousculent pendant une adoption ou un placement. Voici qui fait quoi, et à quel moment vous les rencontrerez.',
  items: [
    {
      id: 'dpj',
      short: 'DPJ',
      name: 'Directeur de la protection de la jeunesse',
      role:
        'Reçoit les signalements et vérifie si la sécurité ou le développement d’un enfant est compromis. En adoption, il reçoit les consentements généraux et **choisit la famille adoptive**.',
      when: 'Après un signalement, ou quand un parent envisage de confier son enfant à l’adoption.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/directeur-de-la-protection-de-la-jeunesse-dpj',
    },
    {
      id: 'service-adoption',
      short: 'CI(U)SSS',
      name: 'Service d’adoption de votre CISSS ou CIUSSS',
      role:
        'Renseigne les personnes qui veulent adopter, évalue leur projet et les accompagne jusqu’au jugement. Il aide aussi les personnes adoptées et les parents d’origine dans la **recherche des origines**.',
      when: 'Dès vos premières questions sur l’adoption, puis des années plus tard pour les antécédents et les retrouvailles.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    },
    {
      id: 'tribunal',
      short: 'Tribunal',
      name: 'Cour du Québec, Tribunal unifié de la famille',
      role:
        'Un ou une juge tranche ce qui ne se règle pas par entente : mesures de protection, admissibilité à l’adoption, placement, puis **jugement d’adoption**. Depuis le 30 juin 2025, ces dossiers relèvent du Tribunal unifié de la famille.',
      when: 'Quand la DPJ demande des mesures sans entente, et toujours avant qu’une adoption soit prononcée.',
      url: 'https://www.quebec.ca/justice-et-etat-civil/systeme-judiciaire/tribunaux-du-quebec/cour-du-quebec/tribunal-unifie-famille',
    },
    {
      id: 'avocat',
      short: 'Avocat',
      name: 'Avocat ou avocate, et aide juridique',
      role:
        'Vous explique vos droits et vous représente devant le tribunal. L’enfant peut avoir son propre avocat. L’aide juridique est **gratuite pour tout enfant**, et pour les parents admissibles selon leurs revenus.',
      when: 'Dès que la DPJ s’adresse au tribunal, ou avant de signer un document important.',
      url: 'https://www.csj.qc.ca/',
    },
    {
      id: 'famille-accueil',
      short: 'Famille d’accueil',
      name: 'Famille d’accueil ou de proximité',
      role:
        'Prend soin de l’enfant au quotidien quand il ne peut pas vivre avec ses parents. Une famille d’accueil de proximité est une **personne déjà proche de l’enfant**, comme un grand-parent.',
      when: 'Pendant un placement décidé par entente avec la DPJ ou par le tribunal.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/description-famille-accueil',
    },
    {
      id: 'banque-mixte',
      short: 'Banque mixte',
      name: 'Famille de la Banque mixte',
      role:
        'Famille d’accueil qui souhaite adopter. Elle accueille un jeune enfant dont le retour chez ses parents semble peu probable, en sachant qu’il **pourrait y retourner**. L’adoption n’est possible que si l’enfant devient adoptable.',
      when: 'Souvent dès les premiers mois de l’enfant, pendant que la DPJ travaille encore avec ses parents.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/a-propos-adoption-au-quebec',
    },
    {
      id: 'sasie',
      short: 'SASIE',
      name: 'Secrétariat aux services internationaux à l’enfant',
      role:
        'L’autorité québécoise de l’adoption internationale (l’ancien SAI). Il **autorise chaque projet d’adoption à l’étranger**, encadre les organismes agréés et traite les recherches d’origines à l’international.',
      when: 'Avant toute démarche d’adoption hors du Québec, et après, pour la recherche des origines.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/adoption',
    },
    {
      id: 'organisme-agree',
      short: 'OA',
      name: 'Organisme agréé en adoption internationale',
      role:
        'Organisme sans but lucratif reconnu par Québec qui accompagne les adoptants dans un pays précis, de la préparation du dossier jusqu’à l’arrivée de l’enfant.',
      when: 'Pour les dossiers déjà ouverts seulement : depuis novembre 2024, un **moratoire** empêche d’en ouvrir de nouveaux.',
    },
    {
      id: 'etat-civil',
      short: 'État civil',
      name: 'Directeur de l’état civil',
      role:
        'Établit le nouvel acte de naissance de l’enfant une fois le jugement d’adoption définitif. L’acte d’origine est conservé à part, de **façon confidentielle**.',
      when: 'Après le jugement d’adoption, et plus tard si la personne adoptée demande son acte de naissance d’origine.',
      url: 'https://www.etatcivil.gouv.qc.ca/fr/Acte_primitif.html',
    },
    {
      id: 'cdpdj',
      short: 'CDPDJ',
      name: 'Commission des droits de la personne et des droits de la jeunesse',
      role:
        'Veille au respect des droits des enfants suivis par la DPJ. Elle peut **faire enquête, gratuitement**, si vous croyez que les droits d’un enfant n’ont pas été respectés.',
      when: 'Si vous pensez qu’un enfant n’a pas reçu les services ou le respect auxquels il a droit.',
      url: 'https://www.cdpdj.qc.ca/fr/nous-joindre',
    },
  ],
}
