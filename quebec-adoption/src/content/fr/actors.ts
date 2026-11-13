// Researched content — verified 2026-11-13
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
 *
 * Facts and sources: research notes dpj-placement.md, legal-core.md, adopter-domestic.md,
 * international.md, after-adoption.md; sources in src/content/sources/actors-after.ts.
 */
export const actors: Actors = {
  eyebrow: 'Qui fait quoi',
  title: 'Beaucoup de monde, un seul centre : l’enfant.',
  lede:
    'DPJ, tribunal, service d’adoption, famille d’accueil… Les noms se bousculent pendant une adoption ou un placement. Voici qui fait quoi, et à quel moment vous les rencontrerez.',
  items: [
    {
      id: 'dpj',
      short: 'DPJ',
      name: 'Directeur de la protection de la jeunesse',
      role:
        'Reçoit les signalements et vérifie si la sécurité ou le développement d’un enfant est compromis. Son service d’adoption reçoit les consentements généraux et **choisit la famille adoptive**.',
      when: 'Après un signalement (pas avant la naissance du bébé), ou quand un parent pense confier son enfant à l’adoption.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/directeur-de-la-protection-de-la-jeunesse-dpj',
    },
    {
      id: 'cisss',
      short: 'CISSS / CIUSSS',
      name: 'Centre intégré (universitaire) de santé et de services sociaux',
      role:
        'L’établissement public de votre région, qui fait maintenant partie de Santé Québec. On y trouve la DPJ, le **service d’adoption**, le service de recherche des origines et les CLSC.',
      when: 'Dès vos premières questions sur l’adoption, pendant un placement, puis des années plus tard pour la recherche des origines.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/coordonnees-des-services-dadoption-par-region',
    },
    {
      id: 'tribunal',
      short: 'Tribunal',
      name: 'Tribunal unifié de la famille, à la Cour du Québec',
      role:
        'Un ou une juge tranche quand la DPJ et la famille ne s’entendent pas. Le tribunal décide aussi de l’admissibilité à l’adoption, du placement et du **jugement d’adoption**. Depuis le 30 juin 2025, c’est le Tribunal unifié de la famille.',
      when: 'Quand la DPJ et la famille ne s’entendent pas sur les mesures, et toujours avant qu’une adoption soit prononcée.',
      url: 'https://www.quebec.ca/justice-et-etat-civil/systeme-judiciaire/tribunaux-du-quebec/cour-du-quebec/tribunal-unifie-famille',
    },
    {
      id: 'avocat',
      short: 'Avocat',
      name: 'Avocat ou avocate, et aide juridique',
      role:
        'Vous explique vos droits et vous représente devant le tribunal. En protection de la jeunesse, l’enfant a **son propre avocat**. L’aide juridique est gratuite pour tout enfant, et offerte aux parents selon leurs revenus.',
      when: 'Dès que la DPJ s’adresse au tribunal, ou avant de signer un consentement ou une entente importante.',
      url: 'https://www.csj.qc.ca/',
    },
    {
      id: 'famille-accueil',
      short: 'Famille d’accueil',
      name: 'Famille d’accueil ou famille d’accueil de proximité',
      role:
        'Prend soin de l’enfant au quotidien quand il ne peut pas vivre chez ses parents. Une famille d’accueil de proximité, ce sont des proches **déjà importants pour l’enfant**, comme des grands-parents, évalués pour l’accueillir.',
      when: 'Pendant un placement décidé par entente avec la DPJ ou par le tribunal.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/famille-accueil/description-famille-accueil',
    },
    {
      id: 'banque-mixte',
      short: 'Banque mixte',
      name: 'Famille de la Banque mixte (accueil en vue d’adoption)',
      role:
        'Une famille d’accueil qui souhaite adopter. Elle accueille un enfant dont le retour chez ses parents semble peu probable, en acceptant qu’il **puisse y retourner**. L’adoption n’est possible que si l’enfant devient admissible.',
      when: 'Pendant un placement, quand la DPJ prépare l’adoption comme plan de rechange tout en travaillant au retour de l’enfant chez ses parents.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-au-quebec/a-propos-adoption-au-quebec',
    },
    {
      id: 'sasie',
      short: 'SASIE',
      name: 'Secrétariat aux services internationaux à l’enfant',
      role:
        'L’autorité québécoise de l’adoption internationale (autrefois le SAI). Il **autorise chaque projet** avant toute démarche, encadre les organismes agréés et s’occupe des recherches d’origines pour les adoptions hors Québec.',
      when: 'Avant toute démarche pour adopter hors du Québec, puis plus tard pour la recherche des origines.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale',
    },
    {
      id: 'organisme-agree',
      short: 'Organisme agréé',
      name: 'Organisme agréé en adoption internationale',
      role:
        'Organisme sans but lucratif agréé par Québec pour un ou plusieurs pays précis. Il accompagne les adoptants, de la préparation du dossier jusqu’à l’arrivée de l’enfant.',
      when: 'Pour les dossiers déjà ouverts seulement : depuis novembre 2024, un **moratoire** empêche d’en ouvrir de nouveaux.',
      url: 'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/adoption-internationale/adopter-etranger/organismes-agrees-adoption-internationale/liste-organismes-agrees',
    },
    {
      id: 'etat-civil',
      short: 'État civil',
      name: 'Directeur de l’état civil',
      role:
        'Dresse le **nouvel acte de naissance** de l’enfant après le jugement d’adoption. L’acte d’origine, dit « primitif », n’est pas détruit : il est conservé et reste confidentiel. La personne adoptée née au Québec peut en obtenir une copie.',
      when: 'Après le jugement d’adoption, puis plus tard si la personne adoptée demande une copie de son acte primitif.',
      url: 'https://www.etatcivil.gouv.qc.ca/fr/Acte_primitif.html',
    },
    {
      id: 'info-social',
      short: '811 / CLSC',
      name: 'Info-Social 811 et le CLSC de votre secteur',
      role:
        'Au 811 (option 2), une intervenante ou un intervenant psychosocial vous répond **gratuitement, 24 h sur 24**. Le CLSC, rattaché à votre CISSS ou CIUSSS, offre du soutien près de chez vous.',
      when: 'Quand vous avez besoin de parler, à toute étape : avant une décision, pendant un placement ou après une adoption.',
      url: 'https://www.quebec.ca/sante/trouver-une-ressource/info-social-811',
    },
    {
      id: 'cdpdj',
      short: 'CDPDJ',
      name: 'Commission des droits de la personne et des droits de la jeunesse',
      role:
        'Veille au respect des droits des enfants suivis par la DPJ. Elle peut **faire enquête** si les droits d’un enfant n’ont pas été respectés, sans révéler qui a fait la demande.',
      when: 'Si vous pensez qu’un enfant suivi par la DPJ n’a pas reçu les services ou le respect auxquels il a droit.',
      url: 'https://www.cdpdj.qc.ca/fr/porter-plainte/je-veux/demander-une-intervention-pour-un-enfant-ou-un-jeune-lesion-de-droit',
    },
  ],
}
