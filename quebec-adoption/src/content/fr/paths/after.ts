// Researched content — verified 2026-11-13
import type { Journey, LegalRef } from '../../types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const charte = (a: string): LegalRef => ({ label: `Charte québécoise, art. ${a}`, url: `${LQ}C-12${se(a)}` })

const S = 'paths-abroad-after-shell-'
const CONTACTS =
  'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/adoption/rechercher-informations-famille-origine-ou-enfant-confie-adoption/coordonnees-services-recherche-antecedents-sociobiologiques-et-retrouvailles'

export const after: Journey = {
  id: 'after',
  icon: 'compass',
  label: 'Après l’adoption',
  tagline: 'Vous êtes une personne adoptée, un parent d’origine ou un parent adoptif.',
  scenarios: [
    /* ------------------------------------------------------------ personne adoptée */
    {
      id: 'origins',
      label: 'Je suis une personne adoptée',
      forWho:
        'Pour les personnes adoptées qui veulent connaître leur histoire, le nom de leurs parents d’origine ou les retrouver.',
      steps: [
        {
          id: 'start',
          when: 'À votre rythme',
          title: 'Choisir ce que vous cherchez',
          body: 'Votre histoire, des noms, un contact : vous pouvez demander l’un, l’autre ou tout. Prenez le temps de vous demander ce que vous espérez, et entourez-vous de personnes de confiance.',
          details: [
            'Dès 14 ans, vous pouvez faire la demande seul. Avant 14 ans, il faut l’accord de vos parents adoptifs ou de votre tuteur.',
            'Ces droits valent aussi pour une personne qui a été admissible à l’adoption, mais n’a jamais été adoptée.',
            'Si une personne adoptée est décédée, ses enfants de 14 ans et plus peuvent obtenir les mêmes renseignements et documents.',
            'La Charte des droits et libertés de la personne reconnaît à chacun le droit de connaître ses origines, dans la mesure prévue par la loi.',
          ],
          refs: [ccq('583'), ccq('583.0.1'), ccq('584.1'), charte('39.1')],
          sources: [`${S}qc-origins-services`, `${S}qc-origins-bill2`, `${S}charter`, 'ccq-book2'],
        },
        {
          id: 'where',
          when: 'Pour commencer',
          title: 'Trouver le bon service',
          body: 'Vous et vos parents adoptifs viviez au Québec au moment de l’adoption : adressez-vous au service de recherche des antécédents sociobiologiques et de retrouvailles de la région de l’adoption. Vous ou vos parents adoptifs viviez hors du Québec (à l’étranger ou dans une autre province) : adressez-vous au SASIE.',
          who: ['Service antécédents et retrouvailles (CISSS/CIUSSS)', 'SASIE'],
          details: [
            `Trouvez le vôtre dans la [liste des services par région](${CONTACTS}).`,
            'Vous ne savez pas dans quelle région ? Contactez le service de votre région : il vous orientera.',
            'Sur Québec.ca, ces services sont maintenant inscrits sous le nom « Santé Québec » suivi de la région.',
            'SASIE, recherche des origines : 1 833 453-0521 (sans frais) ou rasri@msss.gouv.qc.ca.',
            'Le SASIE travaille avec les autorités des autres pays et provinces pour retrouver les personnes.',
          ],
          sources: [`${S}qc-origins-contacts`, `${S}qc-origins-services`, `${S}msss-origins-intl`],
        },
        {
          id: 'apply',
          when: 'La demande',
          title: 'Envoyer votre demande',
          body: 'Remplissez le formulaire de demande et joignez une photocopie de deux pièces d’identité officielles, dont au moins une avec photo et signature. Envoyez le tout par courriel, par la poste ou en personne.',
          who: ['Vous', 'Service antécédents et retrouvailles'],
          details: [
            'Moins de 14 ans : joignez l’autorisation écrite de vos parents adoptifs ou de votre tuteur.',
            'Vous avez déjà reçu des services depuis le 16 juin 2018 ? Un formulaire simplifié existe.',
            'En pratique, le service envoie un accusé de réception dans les 10 jours.',
            'Les demandes sont traitées par ordre d’arrivée, avec des priorités, par exemple : raison de santé, 70 ans ou plus, attente de plus de 12 mois, personne mineure.',
            'Aucun délai officiel n’est publié : demandez au service à quoi vous attendre.',
            'Québec.ca ne mentionne aucuns frais pour ce service. Confirmez-le auprès du service.',
          ],
          sources: [`${S}msss-origins-form`, 'msss-origins-guide', `${S}qc-origins-bill2`],
        },
        {
          id: 'summary',
          when: 'Première réponse',
          title: 'Recevoir le sommaire de votre histoire',
          body: 'Le service vous remet un **sommaire des antécédents sociobiologiques**, tiré de votre dossier d’adoption. Le dossier complet, lui, reste confidentiel.',
          details: [
            'La date, l’heure et le lieu de votre naissance, et des renseignements médicaux sur vous à la naissance et sur vos parents d’origine.',
            'Les circonstances de votre adoption.',
            'Le profil de vos parents d’origine, par exemple : âge, langue, origine ethnique, scolarité, métier, mode de vie.',
            'Votre nom d’origine, s’il ne révèle pas l’identité d’un parent protégé par un refus.',
            'Parfois, des renseignements sur vos frères, sœurs et grands-parents d’origine.',
          ],
          refs: [ccq('582')],
          sources: [`${S}qc-origins-services`],
        },
        {
          id: 'names',
          milestone: true,
          when: 'Règles depuis juin 2024',
          title: 'Connaître le nom de vos parents d’origine',
          body: 'Vous avez le droit de connaître le nom de vos parents d’origine, même si l’un d’eux n’était pas inscrit à votre acte de naissance d’origine. La principale exception : un **refus à la communication de l’identité** encore valide.',
          details: [
            'Depuis le 8 juin 2024, un parent d’origine ne peut inscrire ce refus que dans les 30 jours qui suivent la naissance.',
            'Tous ces refus, même inscrits avant le 8 juin 2024, prennent fin à vos 18 ans, ou un an après le décès du parent.',
            'Vous pouvez aussi connaître le nom de vos frères et sœurs d’origine majeurs et de vos grands-parents d’origine, sauf si cela révèle un parent protégé par un refus.',
            'Adoption hors du Québec : la loi du pays d’origine compte aussi. Si elle interdit de révéler un nom, le SASIE ne peut pas le donner.',
            'Un parent absent des archives, ou trouvé seulement par un test d’ADN, ne peut pas être recherché par le service.',
          ],
          rights: [
            'Obtenir le nom de vos parents d’origine, sauf refus encore valide.',
            'Obtenir les renseignements pour les joindre, s’ils acceptent le contact.',
          ],
          refs: [ccq('583'), ccq('583.4'), ccq('583.9'), ccq('583.10'), ccq('583.12')],
          sources: ['ccq-book2', `${S}qc-origins-services`, `${S}qc-origins-bill2`, `${S}bill2`],
        },
        {
          id: 'contact',
          when: 'Avant toute révélation',
          title: 'Le contact : chacun choisit',
          body: 'Avant de révéler l’identité d’une personne, le service l’informe de votre demande. Elle peut accepter le contact, l’accepter à ses conditions ou le refuser.',
          details: [
            'En pratique, la personne a environ un mois pour réfléchir. Sans réponse, son silence est traité comme un refus au contact.',
            'Si elle est introuvable ou incapable d’exprimer sa volonté, un refus au contact s’applique automatiquement.',
            'Un refus au contact n’empêche pas, à lui seul, de connaître un nom : on vous le donne, à condition de respecter ce refus.',
            'Vous aussi pouvez inscrire un refus au contact, en tout temps avant que votre identité soit révélée.',
            'Votre demande d’identité date de plus de 12 mois ? Vous pouvez demander, une fois par année, si la personne recherchée est décédée.',
          ],
          watch:
            'Si vous obtenez un nom à condition de respecter un refus au contact, respectez-le. Sinon, vous engagez votre responsabilité et pourriez devoir payer des dommages-intérêts, y compris punitifs.',
          refs: [ccq('583.2'), ccq('583.6'), ccq('583.7')],
          sources: [`${S}qc-origins-services`, 'msss-origins-guide', 'ccq-book2'],
        },
        {
          id: 'reunion',
          milestone: true,
          when: 'Si tout le monde est d’accord',
          title: 'Des retrouvailles accompagnées',
          body: 'Une intervenante ou un intervenant peut servir d’intermédiaire, préparer la rencontre avec vous et vous soutenir ensuite. Les retrouvailles peuvent se faire à distance ou en personne.',
          who: ['Intervenante ou intervenant', 'Vous', 'La personne retrouvée'],
          details: [
            'Le service vous soutient aussi si la personne est introuvable ou si les retrouvailles sont impossibles.',
            'Le Mouvement Retrouvailles offre un accompagnement bénévole : 1 888 646-1060.',
            'D’autres organismes peuvent aider, comme RAIS-Ressource Adoption, ou L’Hybridé pour les personnes adoptées à l’étranger.',
          ],
          rights: ['Être accompagné avant, pendant et après les retrouvailles.', 'Être soutenu si la recherche n’aboutit pas.'],
          sources: [`${S}qc-origins-services`, `${S}educaloi-origins`, `${S}msss-origins-national`],
        },
        {
          id: 'documents',
          when: 'Au besoin',
          title: 'Obtenir votre acte de naissance d’origine',
          body: 'Vous pouvez obtenir une copie de votre acte de naissance d’origine (dit « primitif ») et des jugements liés à votre adoption. Demandez d’abord une attestation au service des antécédents ou au SASIE.',
          who: ['Service antécédents et retrouvailles ou SASIE', 'Directeur de l’état civil', 'Greffe du tribunal'],
          details: [
            'Naissance au Québec : postez au Directeur de l’état civil le formulaire « Demande de copie d’acte de naissance primitif », avec une photocopie de l’attestation.',
            'Coût : 64,25 $, payable en dollars canadiens.',
            'Les jugements : demandez-les au greffe du tribunal du district qui les a rendus.',
            'Si un refus au contact s’applique, les passages qui permettraient de joindre la personne sont retirés ou caviardés.',
            'Ce droit existe depuis le 8 juin 2024.',
          ],
          refs: [ccq('583'), ccq('149')],
          sources: [`${S}dec-original-act`, `${S}qc-origins-services`, 'ccq-book1'],
        },
        {
          id: 'health',
          when: 'En cas de besoin',
          title: 'Des renseignements pour votre santé',
          body: 'Si votre santé le justifie, votre médecin peut obtenir les renseignements médicaux nécessaires sur vos parents d’origine. Il faut leur consentement ou l’autorisation du tribunal, et l’anonymat est préservé.',
          who: ['Votre médecin', 'Service antécédents et retrouvailles'],
          details: [
            'Votre médecin envoie sa demande, avec une lettre, au service des antécédents.',
            'Ce droit vaut aussi pour la santé d’un parent d’origine ou d’un proche lié génétiquement.',
            'Une raison de santé peut rendre une demande prioritaire.',
          ],
          refs: [ccq('584')],
          sources: ['msss-origins-guide', 'ccq-book2'],
        },
      ],
      outro:
        'Chercher ses origines remue beaucoup d’émotions. Vous pouvez faire une pause, arrêter ou recommencer quand vous le voulez. Info-Social 811 (option 2) répond 24 heures sur 24.',
    },

    /* ------------------------------------------------------------ parent d’origine */
    {
      id: 'birth-parent',
      label: 'J’ai confié un enfant à l’adoption',
      forWho:
        'Pour les parents d’origine, peu importe le temps écoulé. Vos droits dépendent surtout de la date de l’adoption et de l’âge de votre enfant.',
      steps: [
        {
          id: 'ask',
          when: 'En tout temps',
          title: 'Ce que vous pouvez demander dès maintenant',
          body: 'Vous pouvez demander au service des antécédents et retrouvailles un sommaire sur la personne qui a adopté votre enfant. Le service vous aide aussi à inscrire ou à retirer un refus.',
          who: ['Service antécédents et retrouvailles (CISSS/CIUSSS)', 'SASIE'],
          details: [
            'Adressez-vous au service de la région où l’adoption a eu lieu. Si votre enfant a été adopté par des parents qui vivaient hors du Québec, adressez-vous au SASIE.',
            `Trouvez le vôtre dans la [liste des services par région](${CONTACTS}).`,
            'Joignez une photocopie de deux pièces d’identité officielles à votre formulaire.',
            'Votre enfant a été déclaré admissible à l’adoption, mais n’a pas été adopté ? Vous pouvez recevoir un résumé des informations à son dossier.',
            'Si votre santé le justifie, votre médecin peut demander des renseignements médicaux, dans l’anonymat.',
          ],
          refs: [ccq('584'), ccq('584.1')],
          sources: [`${S}qc-origins-services`, `${S}qc-origins-contacts`, 'msss-origins-guide'],
        },
        {
          id: 'identity-veto',
          when: '≤ 30 jours après la naissance',
          title: 'Le refus à la communication de votre identité',
          body: 'Ce refus empêche que votre nom soit donné à votre enfant. Depuis le 8 juin 2024, il doit être inscrit dans les 30 jours qui suivent la naissance, et il prend fin aux 18 ans de votre enfant.',
          details: [
            'Après ces 30 jours, il n’est plus possible d’en inscrire un.',
            'Les refus inscrits avant le 8 juin 2024 prennent eux aussi fin aux 18 ans de votre enfant.',
            'Si vous décédez avant, le refus prend fin au premier anniversaire de votre décès.',
            'Vous pouvez retirer votre refus en tout temps.',
            'À la première demande à votre sujet, le service vous en informe, pour que vous puissiez maintenir ou retirer votre refus.',
          ],
          watch:
            'Ce refus protège seulement votre identité, et seulement jusqu’aux 18 ans de votre enfant. Pour décider s’il y aura un contact, c’est le **refus au contact** qui compte.',
          refs: [ccq('583.4'), ccq('583.9')],
          sources: [`${S}qc-origins-services`, `${S}bill2`, 'ccq-book2'],
        },
        {
          id: 'contact-veto',
          when: 'En tout temps',
          title: 'Le refus au contact',
          body: 'Vous pouvez inscrire un refus au contact en tout temps avant que votre identité soit révélée. Il peut empêcher tout contact, ou permettre un contact aux conditions que vous fixez.',
          details: [
            'Il peut aussi viser les enfants de votre enfant adopté.',
            'La loi ne lui fixe pas de date de fin. Vous pouvez le retirer en tout temps.',
            'À lui seul, il n’empêche pas votre enfant de connaître votre nom. La personne qui l’obtient doit toutefois respecter votre refus.',
            'Un formulaire existe pour l’inscrire ou le retirer. Le service peut vous aider à le remplir.',
          ],
          refs: [ccq('583.6'), ccq('583.2'), ccq('583.9')],
          sources: [`${S}qc-origins-services`, 'ccq-book2'],
        },
        {
          id: 'adult',
          milestone: true,
          when: 'Aux 18 ans de votre enfant',
          title: 'Quand votre enfant devient adulte',
          body: 'Vous pouvez alors demander le nom donné à votre enfant et les renseignements pour le joindre. Avant toute communication, le service l’informe et lui offre d’inscrire un refus au contact.',
          details: [
            '**Adoption avant le 16 juin 2018** : l’identité de votre enfant est protégée par la loi, sauf s’il accepte qu’elle vous soit révélée. S’il est introuvable, elle reste protégée.',
            '**Adoption depuis le 16 juin 2018** : vous avez droit à son nom, mais il peut refuser le contact ou le permettre à ses conditions.',
            'Vos autres enfants et vos parents peuvent aussi faire une demande : le nom leur est donné seulement si la personne adoptée y consent.',
            'Adoption hors du Québec : il faut l’accord de la personne recherchée, sauf si la loi de son pays d’origine prévoit autre chose.',
          ],
          refs: [ccq('583'), ccq('583.5'), ccq('583.7'), ccq('583.8'), ccq('583.10'), ccq('583.12')],
          sources: [`${S}qc-origins-services`, 'msss-origins-guide', 'ccq-book2'],
        },
        {
          id: 'contacted',
          when: 'Si le service vous joint',
          title: 'Si on vous cherche',
          body: 'Si votre enfant fait une demande à votre sujet, le service vous en informe avant de révéler votre identité. Vous pouvez accepter le contact, l’accepter à vos conditions ou le refuser.',
          who: ['Service antécédents et retrouvailles', 'Vous'],
          details: [
            'En pratique, vous avez environ un mois pour réfléchir. Sans réponse, votre silence est traité comme un refus au contact.',
            'Vous pourrez changer d’avis plus tard et retirer ce refus.',
            'Si tout le monde est d’accord, une intervenante ou un intervenant prépare et accompagne les retrouvailles.',
          ],
          rights: [
            'Être informé avant que votre identité soit révélée.',
            'Choisir s’il y aura un contact, et à quelles conditions.',
            'Être accompagné avant, pendant et après les retrouvailles.',
          ],
          refs: [ccq('583.7')],
          sources: [`${S}qc-origins-services`, 'msss-origins-guide'],
        },
        {
          id: 'agreement',
          when: 'Avant ou après l’adoption',
          title: 'Garder un lien : l’entente de communication',
          body: 'Avec l’adoptant, vous pouvez convenir par écrit d’échanger des nouvelles ou de garder des contacts, si c’est dans l’intérêt de l’enfant. Une photo par année, une lettre : il n’y a pas de formule unique.',
          who: ['Vous', 'Parents adoptifs', 'DPJ ou médiation familiale'],
          details: [
            'Avant l’ordonnance de placement, demandez du soutien à la DPJ. Après, la médiation familiale est gratuite : jusqu’à 5 heures pour conclure une entente, et 2 h 30 pour la revoir.',
            'Dès 10 ans, l’enfant doit y consentir. Dès 14 ans, il peut y mettre fin sans formalité.',
            'En cas de désaccord, le tribunal peut fixer des échanges ou des contacts avec un parent ou un grand-parent d’origine important pour l’enfant, si c’est dans son intérêt.',
            'Ces ententes visent l’adoption d’un enfant domicilié au Québec par des parents du Québec.',
          ],
          refs: [ccq('579'), lpj('71.3.4')],
          sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, 'ccq-book2'],
        },
      ],
      outro:
        'Il n’y a pas une seule bonne façon de vivre une adoption. Si vous avez besoin d’en parler, Info-Social 811 (option 2) répond 24 heures sur 24, et le Mouvement Retrouvailles accueille aussi les parents d’origine.',
    },

    /* ------------------------------------------------------------ parents adoptifs */
    {
      id: 'adoptive',
      label: 'Nous avons adopté',
      forWho:
        'Pour les parents adoptifs : trouver du soutien, raconter son histoire à l’enfant et garder un lien avec sa famille d’origine.',
      steps: [
        {
          id: 'support',
          when: 'Dès l’arrivée',
          title: 'Le soutien après l’adoption',
          body: 'Comme toutes les familles, la vôtre a accès aux services du CISSS ou du CIUSSS de votre région : développement de l’enfant, adaptation, santé physique et mentale. Le suivi peut être familial, parental ou individuel.',
          who: ['CISSS ou CIUSSS de votre région', 'DPJ', 'Organismes communautaires'],
          details: [
            'Adoption au Québec : dès le placement, la DPJ prévoit des rencontres de suivi, selon les besoins de l’enfant et de la famille.',
            'Adoption à l’étranger : une visite dans les 14 jours suivant l’arrivée, et une consultation fortement recommandée avec un médecin spécialisé en adoption.',
            'Info-Social 811 (option 2) : des conseils gratuits, 24 heures sur 24.',
            'Des organismes offrent groupes d’échange, webinaires et lignes d’écoute, comme la Fédération des parents adoptants du Québec ou RAIS-Ressource Adoption.',
          ],
          rights: ['Recevoir les services de santé et les services sociaux de votre région, comme toute famille.'],
          sources: [`${S}qc-post-adoption`, `${S}info-social`, `${S}msss-origins-national`],
        },
        {
          id: 'telling',
          when: 'Tôt, et souvent',
          title: 'Raconter son histoire à l’enfant',
          body: 'La loi vous confie cette tâche : dire à l’enfant qu’il a été adopté. Vous devez aussi lui expliquer les règles sur la communication de l’identité et sur les contacts.',
          details: [
            'Employez des mots simples, adaptés à son âge, et revenez-y au fil des ans.',
            'Gardez les documents, les photos et les objets liés à son histoire.',
            'Vous pouvez demander un **sommaire de ses antécédents** : jusqu’à ses 14 ans pour une adoption au Québec, sans limite d’âge pour une adoption à l’étranger ou dans une autre province.',
          ],
          refs: [ccq('583.11')],
          sources: [`${S}qc-origins-services`, 'ccq-book2'],
        },
        {
          id: 'agreement',
          when: 'Avant ou après le jugement',
          title: 'L’entente de communication',
          body: 'Si c’est dans l’intérêt de l’enfant, vous pouvez convenir par écrit, avec des membres de sa famille d’origine, d’échanger des nouvelles ou de garder des contacts. Une photo par année, une lettre, un appel : tout moyen adapté convient, sans obligation de se voir.',
          who: ['Vous', 'Famille d’origine', 'DPJ ou médiation familiale'],
          details: [
            'Vous signez l’entente comme tuteur de l’enfant. Dès 14 ans, c’est l’enfant lui-même qui en convient.',
            'Elle peut inclure des parents, des grands-parents, des frères et sœurs ou d’autres membres de la famille d’origine.',
            'L’approbation du tribunal n’est pas requise.',
            'Avant l’ordonnance de placement, la DPJ offre du soutien. Ensuite, la médiation familiale est gratuite : jusqu’à 5 heures pour conclure une entente, et jusqu’à 2 h 30 pour la revoir ou régler un différend.',
            'Si seuls des échanges de nouvelles sont prévus, la DPJ les facilite sur demande, jusqu’à la majorité de l’enfant.',
            'Cette règle vise l’adoption d’un enfant domicilié au Québec par des parents du Québec.',
          ],
          refs: [ccq('579'), lpj('71.3.4')],
          sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, 'educaloi-adopt', `${S}bill2`],
        },
        {
          id: 'child-voice',
          when: 'Dès 10 ans, puis 14 ans',
          title: 'La voix de l’enfant',
          body: 'Dès 10 ans, l’enfant doit consentir aux échanges ou aux contacts, sauf s’il ne peut pas exprimer sa volonté. Dès 14 ans, son accord est toujours requis, et il peut y mettre fin sans formalité, même si le tribunal les a fixés.',
          refs: [ccq('579')],
          sources: [`${S}qc-contact-agreement`, 'ccq-book2'],
        },
        {
          id: 'court',
          milestone: true,
          when: 'En cas de désaccord',
          title: 'Le tribunal peut trancher',
          body: 'Si un enfant de 10 à 13 ans refuse, ou si les adultes ne s’entendent pas, le tribunal peut décider des échanges ou des contacts. Il le fait seulement avec un parent ou un grand-parent d’origine important pour l’enfant, et si c’est dans son intérêt.',
          details: ['La médiation familiale gratuite peut aussi aider à régler un différend.'],
          refs: [ccq('579')],
          sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, 'ccq-book2'],
        },
        {
          id: 'growing-up',
          when: 'Dès 14 ans, puis à 18 ans',
          title: 'Quand votre enfant grandit',
          body: 'Dès 14 ans, votre enfant peut demander seul des renseignements sur ses origines. Avant 14 ans, il peut le faire avec votre accord.',
          details: [
            'Il pourra connaître le nom de ses parents d’origine au plus tard à 18 ans : les refus d’identité prennent fin à cet âge.',
            'Adoption au Québec depuis le 16 juin 2018 : ses parents d’origine pourront demander son nom à sa majorité. Il en sera informé avant et pourra refuser le contact.',
            'Adoption avant le 16 juin 2018 : son identité reste protégée, sauf s’il accepte qu’elle soit révélée.',
            'Adoption hors du Québec : la loi du pays d’origine compte aussi. Son nom n’est révélé qu’avec son accord, sauf si cette loi prévoit autre chose.',
            'Ses frères, sœurs et grands-parents d’origine ne peuvent obtenir son nom qu’avec son accord.',
          ],
          refs: [ccq('583'), ccq('583.4'), ccq('583.5'), ccq('583.10'), ccq('583.12')],
          sources: [`${S}qc-origins-services`, 'ccq-book2'],
        },
      ],
      outro:
        'Une histoire racontée avec douceur, et des liens choisis avec soin, aident l’enfant à se construire. Vous n’avez pas à tout savoir : vous pouvez demander de l’aide.',
    },
  ],
}
