// Researched content — verified 2026-11-13
import type { Journey, LegalRef } from '../../types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991'
const LPJ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-34.1'
const anchor = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: CCQ + anchor(a) })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: LPJ + anchor(a) })

const DPJ_CONTACTS =
  'https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/protection-de-la-jeunesse/faire-un-signalement-au-dpj/coordonnees-du-dpj'

export const home: Journey = {
  id: 'home',
  icon: 'home',
  label: 'À la maison',
  tagline: 'La DPJ s’inquiète pour un enfant de votre famille.',
  scenarios: [
    /* ---------------------------------------------------------------- parents */
    {
      id: 'report',
      label: 'Un signalement à la DPJ',
      forWho:
        'Pour les parents, et pour l’entourage qui veut comprendre ce qui se passe après un signalement au directeur de la protection de la jeunesse (DPJ).',
      steps: [
        {
          id: 'report',
          when: 'Jour 0',
          title: 'Le signalement',
          body: 'Toute personne peut signaler une situation à la DPJ, 24 heures sur 24, 7 jours sur 7. Certaines personnes y sont obligées dans leur travail, par exemple le personnel enseignant, des services de garde et du réseau de la santé et des services sociaux, et les policiers. L’identité de la personne qui signale reste confidentielle.',
          who: ['Personne qui signale', 'DPJ'],
          details: [
            'En cas de danger immédiat, composez le 911.',
            `Chaque région a son propre numéro : voyez les [coordonnées du DPJ](${DPJ_CONTACTS}).`,
            'Tout le monde doit signaler une situation d’abus sexuel ou physique.',
            'Une personne qui signale de bonne foi ne peut pas être poursuivie en justice.',
            'La DPJ informe la personne qui a signalé de sa décision de retenir ou non le signalement.',
          ],
          refs: [lpj('39'), lpj('43'), lpj('44')],
          sources: ['paths-hospital-home-report-duty', 'paths-hospital-home-report-privacy', 'paths-hospital-home-dpj-contacts'],
        },
        {
          id: 'screening',
          when: 'Selon l’urgence',
          title: 'Le signalement est-il retenu ?',
          body: 'La DPJ fait une première analyse et peut vérifier certains faits auprès de l’entourage de l’enfant. Elle décide ensuite si elle retient le signalement pour une évaluation. Sinon, son intervention prend fin.',
          who: ['DPJ (réception et traitement des signalements)'],
          details: [
            'En 2025-2026, moins du tiers des signalements (27,5 %) ont été retenus pour une évaluation.',
            'Même si le signalement n’est pas retenu, la DPJ doit vous informer des ressources d’aide et, si vous le voulez, vous mettre en contact avec elles.',
          ],
          refs: [lpj('45'), lpj('45.1')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-dpj-bilan-2026'],
        },
        {
          id: 'urgent',
          when: '≤ 48 heures',
          title: 'En cas d’urgence seulement',
          body: 'Si l’enfant a besoin d’une protection urgente, la DPJ peut prendre des mesures immédiates : par exemple, le confier à un proche ou à une famille d’accueil, ou limiter certains contacts. Ces mesures durent au plus 48 heures.',
          who: ['DPJ', 'Un proche ou une famille d’accueil'],
          rights: ['Donner votre avis sur les solutions possibles : la DPJ doit chercher votre participation.'],
          details: [
            'Les parents ne peuvent pas empêcher ces mesures pendant les 48 heures.',
            'L’entente provisoire peut être prolongée une seule fois, d’au plus 30 jours.',
            'Si vous vous opposez à leur prolongation, le tribunal peut prolonger les mesures d’urgence d’au plus 5 jours ouvrables.',
          ],
          watch:
            'Après 48 heures, une entente provisoire d’au plus 30 jours est possible si vous êtes d’accord (et votre enfant, s’il a 14 ans ou plus). Sinon, la DPJ doit s’adresser au tribunal.',
          refs: [lpj('46'), lpj('47'), lpj('47.1')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-educaloi-dpj', 'paths-hospital-home-bill99'],
        },
        {
          id: 'eval',
          when: 'Après un signalement retenu',
          title: 'L’évaluation',
          body: 'Une intervenante ou un intervenant rencontre votre enfant, vous et parfois l’école ou des proches. La DPJ décide ensuite si la sécurité ou le développement de votre enfant est compromis.',
          who: ['Intervenante ou intervenant de la DPJ', 'Vous', 'Votre enfant'],
          rights: [
            'Recevoir des explications claires sur chaque étape et sur les mesures proposées.',
            'Faire entendre votre point de vue.',
            'Venir avec la personne de votre choix aux rencontres.',
            'Consulter une avocate ou un avocat.',
          ],
          details: [
            'La DPJ tient compte de la gravité et de la durée des faits, de l’âge de l’enfant, de votre capacité et de votre volonté de corriger la situation, et de l’aide autour de vous.',
            'Préparez vos questions et notez les dates et les noms des personnes rencontrées.',
            'Votre enfant a aussi le droit d’être entendu, avec des explications adaptées à son âge.',
            'Si sa sécurité n’est pas compromise, le dossier est fermé et la DPJ vous oriente vers de l’aide.',
          ],
          refs: [lpj('38'), lpj('38.2'), lpj('6.1'), lpj('6.2')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill15'],
        },
        {
          id: 'orientation',
          milestone: true,
          when: 'Si la sécurité est compromise',
          title: 'Une entente, ou le tribunal',
          body: 'La DPJ choisit entre une **entente d’intervention de courte durée** (au plus 60 jours, sans placement), une **entente sur des mesures volontaires** (au plus 12 mois) ou le tribunal. Pour signer une entente, vous devez être d’accord avec la décision de la DPJ et avec les mesures proposées, tout comme votre enfant s’il a 14 ans ou plus.',
          who: ['DPJ', 'Vous', 'Votre enfant (s’il a 14 ans ou plus)'],
          rights: ['Refuser une entente : le tribunal décidera alors.', 'Demander conseil à une avocate ou un avocat avant de signer.'],
          watch:
            'Une entente sur des mesures volontaires doit être conclue dans les 10 jours suivant sa proposition ; sinon, la DPJ s’adresse au tribunal. Les ententes qui se suivent ne peuvent pas dépasser 3 ans au total.',
          details: [
            'L’entente est écrite. Elle décrit la situation, les mesures et leur durée.',
            'Si l’entente est respectée, le tribunal n’a pas à intervenir.',
            'Dans certains districts de la Capitale-Nationale, de Chaudière-Appalaches, de la Montérégie, de l’Estrie, des Laurentides et de Lanaudière, une médiation gratuite en protection de la jeunesse peut être offerte si tout le monde y consent.',
          ],
          refs: [lpj('51.1'), lpj('51.3'), lpj('52'), lpj('53')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'paths-hospital-home-pj-mediation'],
        },
        {
          id: 'court',
          when: 'En cas de désaccord',
          title: 'Devant le Tribunal unifié de la famille',
          body: 'Depuis le 30 juin 2025, les dossiers de protection de la jeunesse sont entendus par le Tribunal unifié de la famille de la Cour du Québec. Le juge entend les parties, dont vous et votre enfant, puis décide si la sécurité de l’enfant est compromise, quelles mesures s’appliquent et pour combien de temps.',
          who: ['Juge', 'DPJ', 'Votre avocate ou avocat', 'L’avocat de votre enfant'],
          rights: [
            'Avoir une avocate ou un avocat (aide juridique selon votre situation financière).',
            'Que votre enfant ait son propre avocat ; l’aide juridique est gratuite pour les mineurs.',
            'Recevoir la demande au moins 10 jours avant l’audience.',
            'Faire appel à la Cour supérieure dans les 30 jours de la décision écrite.',
          ],
          details: [
            'Certaines pages officielles parlent encore de la « Chambre de la jeunesse » : ces dossiers relèvent maintenant du Tribunal unifié de la famille.',
            'Une entente peut être présentée au juge à tout moment du dossier.',
            'La personne ou la famille d’accueil à qui l’enfant est confié peut assister à l’audience et témoigner.',
          ],
          refs: [lpj('76'), lpj('76.3'), lpj('78'), lpj('83'), lpj('91'), lpj('100'), lpj('103')],
          sources: ['qc-tuf', 'qc-dpj-steps', 'paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'paths-hospital-home-csj-eligibility'],
        },
        {
          id: 'measures',
          when: 'Pendant le suivi',
          title: 'L’aide et le plan d’intervention',
          body: 'Une intervenante ou un intervenant vous rencontre régulièrement. Avec vous et votre enfant, elle ou il prépare un **plan d’intervention** : besoins, objectifs, moyens et durée des services. Vous en recevez une copie.',
          who: ['Intervenante ou intervenant de la DPJ', 'CLSC', 'Organismes communautaires'],
          rights: [
            'Participer activement aux décisions et au choix des mesures.',
            'Recevoir des services adaptés, avec l’intensité nécessaire.',
            'Consulter le dossier de votre enfant, sauf exceptions.',
          ],
          details: [
            'Si d’autres ressources vous aident, un plan de services individualisé s’ajoute.',
            'Vous restez les premiers responsables de votre enfant : votre avis et votre implication comptent.',
            'Dans les deux ans avant les 18 ans de l’enfant, la DPJ prépare avec lui un plan de passage à la vie adulte.',
          ],
          refs: [lpj('4.3'), lpj('8'), lpj('57.2.2')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill15'],
        },
        {
          id: 'placement',
          when: 'Si l’enfant ne peut pas rester à la maison',
          title: 'Où votre enfant peut vivre',
          body: 'D’abord, rester à la maison avec de l’aide, si c’est dans son intérêt. Sinon, l’enfant est confié en priorité aux personnes les plus significatives pour lui, comme ses grands-parents. À défaut, il va dans une famille d’accueil ou, selon ses besoins, dans une autre ressource.',
          who: ['Proche ou famille d’accueil de proximité', 'Famille d’accueil', 'DPJ'],
          rights: [
            'Votre enfant a le droit de communiquer avec vous, sauf si le tribunal en décide autrement.',
            'Que votre implication de parent soit favorisée, si c’est dans l’intérêt de l’enfant.',
          ],
          details: [
            'En 2025-2026, 52,1 % des enfants pris en charge par la DPJ sont restés dans leur milieu familial, et 18,3 % ont été confiés à des personnes significatives.',
            'Les frères et sœurs vivent ensemble quand c’est possible et dans leur intérêt.',
            'Le milieu choisi devrait être proche et tenir compte de la culture de l’enfant.',
            'Les enfants autochtones ont leur propre ordre de priorité, qui favorise leur famille élargie et leur communauté.',
          ],
          refs: [lpj('4'), lpj('4.1'), lpj('4.2'), lpj('4.4'), lpj('9'), lpj('9.1'), lpj('131.5')],
          sources: ['paths-hospital-home-bill15', 'paths-hospital-home-bill99', 'qc-dpj-steps', 'paths-hospital-home-dpj-bilan-2026'],
        },
        {
          id: 'review',
          when: 'Régulièrement',
          title: 'La révision de la situation',
          body: 'La DPJ révise régulièrement la situation avec vous, que l’enfant soit placé ou non. Elle peut alors mettre fin à son intervention, revoir les mesures, proposer une nouvelle entente ou s’adresser au tribunal.',
          who: ['DPJ', 'Vous', 'Votre enfant'],
          details: [
            'À chaque révision, la DPJ doit d’abord vérifier si tout est fait pour que l’enfant retourne chez vous.',
            'L’intervention prend fin quand la sécurité n’est plus compromise, quand un tuteur est nommé, quand l’enfant est adopté ou à ses 18 ans.',
            'À la fin, la DPJ peut vous mettre en contact avec des ressources d’aide, si vous le voulez.',
          ],
          refs: [lpj('57')],
          sources: ['qc-dpj-steps'],
        },
        {
          id: 'clock',
          when: 'Max. 12 à 24 mois selon l’âge',
          title: 'Les durées maximales de placement',
          body: 'Le temps total qu’un enfant peut passer hors de sa famille est limité selon son âge : **12 mois** avant 2 ans, **18 mois** de 2 à 5 ans et **24 mois** à partir de 6 ans. Ensuite, si l’enfant ne peut pas revenir chez vous en sécurité, le tribunal doit lui assurer un projet de vie permanent.',
          watch:
            'Le tribunal peut dépasser ces durées si un retour est prévu à court terme ou pour des motifs sérieux, par exemple si des services prévus ne vous ont pas été rendus.',
          details: [
            'Tous les placements liés à la même situation sont additionnés, y compris chez un proche.',
            'Pour une ordonnance, c’est l’âge de l’enfant au moment où elle est rendue qui compte.',
            'Pour un enfant autochtone, ces durées ne s’appliquent pas si un conseil de famille a été formé.',
          ],
          refs: [lpj('53.0.1'), lpj('91.1'), lpj('131.12')],
          sources: ['paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'paths-hospital-home-cdpdj-stability'],
        },
        {
          id: 'permanency',
          milestone: true,
          when: 'À la fin du délai',
          title: 'Un projet de vie permanent',
          body: 'Le premier projet de vie est toujours le retour chez vous. Si ce n’est pas possible, une autre solution stable est choisie : placement jusqu’à 18 ans auprès d’un proche ou d’une famille d’accueil, tutelle ou adoption.',
          who: ['Tribunal unifié de la famille (Cour du Québec)', 'DPJ', 'Vous'],
          details: [
            '**Tutelle** : à la demande de la DPJ, le tribunal nomme une personne, souvent celle qui accueille l’enfant, pour exercer l’autorité parentale. Vous restez légalement ses parents, et la tutelle prend fin à 18 ans.',
            'Quand la personne à qui l’enfant est confié en devient tutrice ou tuteur, la DPJ met fin à son intervention.',
            '**Adoption** : sans votre consentement, elle exige un jugement qui déclare l’enfant admissible à l’adoption. Vous pouvez contester cette demande devant le tribunal.',
          ],
          refs: [lpj('70.1'), lpj('70.2'), ccq('207'), ccq('559')],
          sources: ['paths-hospital-home-cdpdj-stability', 'qc-dpj-steps', 'ccq-book1', 'ccq-book2'],
        },
      ],
      outro:
        'Si quelque chose vous semble injuste, vous pouvez porter plainte auprès du commissaire aux plaintes et à la qualité des services de votre établissement. Si les droits de votre enfant ne sont pas respectés, vous pouvez aussi vous adresser à la Commission des droits de la personne et des droits de la jeunesse (CDPDJ). Vous n’êtes pas seuls : voyez la section Aide, plus bas.',
    },

    /* ---------------------------------------------------------------- proches */
    {
      id: 'kin',
      label: 'On me demande d’accueillir l’enfant',
      forWho:
        'Pour les grands-parents, tantes, oncles et autres proches à qui le directeur de la protection de la jeunesse (DPJ) pourrait confier un enfant.',
      steps: [
        {
          id: 'priority',
          when: 'Dès le début',
          title: 'La loi pense d’abord aux proches',
          body: 'Quand un enfant ne peut pas rester avec ses parents, la loi demande de le confier en priorité aux personnes les plus significatives pour lui, notamment ses grands-parents et sa famille élargie. Vous pouvez dire à l’intervenante ou à l’intervenant que vous êtes disponible.',
          who: ['DPJ', 'Vous', 'Les parents de l’enfant'],
          details: [
            'Un lien significatif, c’est une relation déjà faite d’affection, de stabilité et de continuité : famille élargie, parrain ou marraine, voisin, ami proche de la famille…',
            'Même en urgence, dans les 48 premières heures, la DPJ peut confier l’enfant à une personne significative.',
            'Les enfants autochtones ont leur propre ordre de priorité : famille élargie, puis communauté, puis nation.',
          ],
          refs: [lpj('4'), lpj('46'), lpj('131.5')],
          sources: ['paths-hospital-home-bill15', 'paths-hospital-home-msss-rtf', 'qc-dpj-steps'],
        },
        {
          id: 'evaluation',
          when: 'Au moment du placement',
          title: 'L’évaluation de votre milieu',
          body: 'La DPJ évalue votre volonté et votre capacité de prendre soin de l’enfant, en tenant compte du lien qui vous unit. Si c’est concluant, vous devenez généralement une **famille d’accueil de proximité**.',
          who: ['Intervenante ou intervenant de la DPJ', 'Vous'],
          details: [
            'Posez vos questions franchement : horaire, logement, soutien, contacts avec les parents.',
            'Pensez aussi à vos limites : dire non, ou pas tout de suite, est permis.',
          ],
          sources: ['qc-dpj-steps', 'paths-hospital-home-msss-rtf'],
        },
        {
          id: 'agreement',
          when: 'Pour la durée du placement',
          title: 'Une entente pour cet enfant',
          body: 'Comme famille d’accueil de proximité, vous signez une entente avec l’établissement de Santé Québec de votre région, pour cet enfant précis. Comme les autres familles d’accueil, vous recevez une rétribution et du soutien, selon cette entente.',
          who: ['Vous', 'Établissement de Santé Québec (CISSS/CIUSSS)'],
          details: [
            'Les familles d’accueil reçoivent une rétribution mensuelle pour chaque enfant. Certaines dépenses peuvent être remboursées, avec l’autorisation de l’établissement.',
            'Les familles d’accueil sont représentées par une association, qui offre aussi de l’entraide.',
            'Si vous accueillez l’enfant sans devenir famille d’accueil de proximité, demandez à l’intervenante ou à l’intervenant quel soutien est possible.',
          ],
          watch: 'L’entente prend fin quand l’enfant quitte définitivement votre foyer. Pour accueillir d’autres enfants, une nouvelle évaluation serait nécessaire.',
          sources: ['paths-hospital-home-msss-rtf', 'paths-hospital-home-foster-steps', 'paths-hospital-home-msss-projet-de-vie'],
        },
        {
          id: 'daily',
          when: 'Pendant le placement',
          title: 'Le quotidien, avec les parents dans le portrait',
          body: 'Les contacts de l’enfant avec ses parents, ses frères et sœurs et les personnes importantes pour lui sont encouragés, s’ils sont dans son intérêt. Pendant ce temps, la DPJ travaille avec les parents à un retour à la maison, tout en préparant un autre projet de vie.',
          who: ['Vous', 'L’enfant', 'Ses parents', 'DPJ'],
          rights: [
            'Assister aux audiences qui concernent l’enfant que vous accueillez.',
            'Témoigner et présenter vos observations au tribunal, avec l’aide d’un avocat si vous le voulez.',
          ],
          details: [
            'La DPJ doit vous informer de la date des audiences.',
            'Avant qu’un enfant change de milieu de vie, il doit y être préparé, et le milieu actuel doit être consulté, sauf si c’est contraire à l’intérêt de l’enfant.',
          ],
          refs: [lpj('9.1'), lpj('4.2'), lpj('83'), lpj('7')],
          sources: ['paths-hospital-home-bill15', 'paths-hospital-home-bill99'],
        },
        {
          id: 'clock',
          when: 'Max. 12 à 24 mois selon l’âge',
          title: 'Le temps compte pour l’enfant',
          body: 'Les durées maximales de placement s’appliquent aussi quand l’enfant vit chez vous : 12 mois avant 2 ans, 18 mois de 2 à 5 ans, 24 mois à partir de 6 ans. Ensuite, si le retour chez ses parents n’est pas possible, le tribunal doit lui assurer un projet de vie permanent.',
          refs: [lpj('91.1')],
          sources: ['paths-hospital-home-bill99', 'paths-hospital-home-cdpdj-stability'],
        },
        {
          id: 'permanency',
          milestone: true,
          when: 'Si le retour est impossible',
          title: 'Rester pour de bon : vos options',
          body: 'L’enfant peut rester avec vous de façon stable grâce à un placement jusqu’à ses 18 ans, une tutelle ou une adoption. Chaque option a des effets différents sur ses liens avec ses parents.',
          who: ['Tribunal unifié de la famille (Cour du Québec)', 'DPJ', 'Vous'],
          details: [
            '**Tutelle (LPJ)** : la DPJ peut demander au tribunal de vous nommer tuteur. Vous exercez l’autorité parentale, les parents restent ses parents, et la DPJ met fin à son intervention.',
            '**Aide financière** : si l’enfant vous a été confié pendant au moins 6 mois de suite avant le jugement de tutelle, vous pourriez y avoir droit. Faites la demande dans les 60 jours suivant le jugement.',
            '**Tutelle supplétive** : un parent peut aussi vous désigner, avec l’autorisation du tribunal, pour exercer ou partager son rôle (grand-parent, tante, oncle, frère ou sœur adulte, ou membre de la famille d’accueil).',
            '**Adoption** : les parents peuvent consentir à ce que vous adoptiez l’enfant si vous êtes son grand-parent, son frère, sa sœur, sa tante, son oncle, ou le conjoint d’une de ces personnes (les conjoints de fait doivent vivre ensemble depuis au moins 3 ans). Sinon, dans certaines situations prévues par la loi, vous pouvez demander au tribunal de le déclarer admissible à l’adoption.',
          ],
          refs: [lpj('70.1'), lpj('70.2'), ccq('199.1'), ccq('555'), ccq('559'), ccq('560')],
          sources: ['paths-hospital-home-tutorship-aid', 'paths-hospital-home-cdpdj-stability', 'ccq-book1', 'ccq-book2'],
        },
      ],
      outro: 'Le parcours « Dans la famille » compare plus en détail la tutelle supplétive et l’adoption par un proche.',
    },
  ],
}
