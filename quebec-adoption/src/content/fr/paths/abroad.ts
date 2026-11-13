// Researched content — verified 2026-11-13
import type { Journey, LegalRef, Step } from '../../types'

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const HCCH = 'https://www.hcch.net/fr/instruments/conventions/full-text/?cid=69'
const hague = (a: string): LegalRef => ({ label: `Convention de La Haye (1993), art. ${a}`, url: HCCH })
const REG_NO_BODY: LegalRef = {
  label: 'RLRQ, c. P-34.1, r. 2',
  url: 'https://www.legisquebec.gouv.qc.ca/fr/document/rc/P-34.1,%20r.%202',
}

const S = 'paths-abroad-after-shell-'

/* Steps shared by both scenarios (same facts, whichever route brought the child) */

const immigrationDetails = [
  'Deux voies fédérales existent, auprès d’Immigration, Réfugiés et Citoyenneté Canada (IRCC) : la **citoyenneté** directe, si un parent adoptif est citoyen canadien, ou la **résidence permanente** par parrainage.',
  'Voie de la citoyenneté : le Québec confirme par écrit au gouvernement fédéral que l’adoption respecte sa loi.',
  'Voie de la résidence permanente : après la lettre de non-opposition du SASIE, le ministère de l’Immigration et de l’Intégration (MII) vous invite à déposer une demande d’engagement (335 $ par enfant en 2026). S’il l’accepte, il délivre un Certificat de sélection du Québec (CSQ), puis IRCC décide.',
  'Votre propre naissance ou adoption a eu lieu hors du Canada ? Des règles particulières de citoyenneté peuvent s’appliquer : vérifiez auprès d’IRCC.',
]
const immigrationWatch =
  'Un enfant qui se trouve au Québec ne peut y être adopté que s’il est autorisé à demeurer au Canada de façon permanente. Le faire venir comme visiteur n’est pas une voie vers l’adoption.'

const recognition: Step = {
  id: 'recognition',
  milestone: true,
  when: 'Dès l’arrivée',
  title: 'Rendre l’adoption officielle au Québec',
  body: 'La loi vous oblige à entreprendre cette étape dès l’arrivée de l’enfant. Le chemin dépend du pays et de l’endroit où l’adoption a été prononcée.',
  who: ['SASIE', 'Tribunal unifié de la famille', 'Avocate ou avocat'],
  details: [
    '**Adoption prononcée dans un pays membre de la Convention de La Haye** : remettez au SASIE le certificat de conformité et le formulaire du Directeur de l’état civil. Aucun jugement n’est nécessaire.',
    '**Adoption prononcée dans un pays où la Convention ne s’applique pas** : demandez au tribunal de reconnaître la décision étrangère. Il vérifie notamment les consentements et l’adoptabilité de l’enfant. L’aide d’une avocate ou d’un avocat est recommandée.',
    '**Enfant confié pour être adopté au Québec** : avec la DPJ de votre région, demandez une ordonnance de placement, puis le jugement d’adoption.',
    'Depuis le 30 juin 2025, les demandes au tribunal vont au Tribunal unifié de la famille de la Cour du Québec. Certaines pages de Québec.ca parlent encore de la « Chambre de la jeunesse ».',
    'Au Québec, l’adoption remplace le lien de filiation d’origine. Reconnue, elle a les mêmes effets qu’un jugement d’adoption rendu ici.',
  ],
  watch:
    'Sauter cette étape peut avoir des conséquences pour l’enfant, même à l’âge adulte. Si rien n’est fait dans un délai raisonnable, la DPJ peut agir à votre place, à la demande du ministre.',
  refs: [ccq('565'), ccq('565.1'), ccq('574'), ccq('581'), lpj('71.8.1')],
  sources: [`${S}qc-intl-steps`, `${S}qc-intl-no-body`, `${S}qc-intl-legal`, 'qc-tuf', 'ccq-book2'],
}

const birthAct: Step = {
  id: 'birth-act',
  when: 'Après la reconnaissance',
  title: 'Le nouvel acte de naissance',
  body: 'Le Directeur de l’état civil établit un nouvel acte de naissance québécois, avec les nouveaux noms de l’enfant et ceux de ses parents adoptifs. Si l’enfant est arrivé avec la résidence permanente, demandez ensuite sa citoyenneté canadienne.',
  who: ['Directeur de l’état civil', 'SASIE', 'IRCC (Canada)'],
  details: [
    'Le Directeur de l’état civil agit sur avis du SASIE (certificat de La Haye) ou du greffe du tribunal (jugement).',
    'Le projet est terminé quand l’adoption est reconnue ou prononcée, le nouvel acte établi, l’enfant citoyen canadien et les rapports promis envoyés.',
    'Gardez précieusement tous les documents. Un jour, votre enfant voudra peut-être connaître son histoire.',
  ],
  refs: [ccq('132.1')],
  sources: [`${S}qc-intl-steps`, `${S}qc-intl-no-body`, 'ccq-book1'],
}

export const abroad: Journey = {
  id: 'abroad',
  icon: 'globe',
  label: 'De l’étranger',
  tagline: 'Vous souhaitez adopter un enfant qui vit hors du Québec.',
  scenarios: [
    /* ------------------------------------------------------------ nouveau projet : un proche */
    {
      id: 'relative',
      label: 'Adopter un proche',
      forWho:
        'Pour un nouveau projet en 2026 : surtout l’adoption d’un enfant de votre famille qui vit hors du Québec. Les autres cas d’exception suivent des étapes semblables : le SASIE vous dira lesquelles s’appliquent à vous.',
      steps: [
        {
          id: 'now',
          when: 'Depuis novembre 2024',
          title: 'Ce qui reste possible aujourd’hui',
          body: 'Québec a suspendu l’ouverture de **nouveaux** dossiers d’adoption internationale avec un organisme agréé. Un nouveau projet reste possible sans organisme, mais seulement dans les cas prévus par règlement.',
          who: ['SASIE'],
          details: [
            'Les cas prévus sont principalement : adopter un enfant de votre famille ; adopter dans un pays qui réserve l’adoption à ses ressortissants, si vous avez sa nationalité ; adopter un enfant confié à une autorité publique de protection de l’enfance ou d’adoption d’une autre province ou d’un territoire canadien.',
            'Votre dossier était déjà ouvert avec un organisme agréé ? Il se poursuit : choisissez « Mon dossier est déjà ouvert ».',
            'En 2024, Québec a expliqué que le système actuel ne pouvait pas offrir toutes les garanties de la Convention de La Haye contre l’enlèvement, la vente ou la traite d’enfants. Aucune date de fin n’a été annoncée.',
            'En 2025, 17 enfants adoptés à l’étranger sont arrivés au Québec, contre 35 en 2024.',
            'Votre situation n’entre dans aucune exception ? Votre projet doit attendre. L’adoption d’un enfant qui vit au Québec reste possible.',
          ],
          watch:
            'Avant toute démarche, il faut l’autorisation du **SASIE** (Secrétariat aux services internationaux à l’enfant). Sans elle, l’adoption peut ne pas être reconnue au Québec, et l’enfant risque de ne pas obtenir le droit de vivre de façon permanente au Canada.',
          refs: [ccq('562.1'), ccq('564'), REG_NO_BODY],
          sources: [`${S}qc-intl-hub`, `${S}qc-intl-no-body`, `${S}moratorium-news`, `${S}msss-stats-2025`],
        },
        {
          id: 'admissible',
          when: 'Avant tout',
          title: 'Faire vérifier votre projet par le SASIE',
          body: 'Vous soumettez votre projet au SASIE avec son formulaire. Il vérifie s’il respecte le règlement, la loi du Québec et celle du pays de l’enfant, puis vous informe de sa décision.',
          who: ['SASIE', 'Vous'],
          details: [
            'SASIE : 1 800 561-0246 (sans frais) ou adoption.quebec@msss.gouv.qc.ca. Visites sur rendez-vous seulement.',
            'Le SASIE s’appelait autrefois le Secrétariat à l’adoption internationale (SAI).',
            'Le pays de l’enfant a ses propres conditions, qui s’ajoutent à celles du Québec.',
            'Des frais sont exigés à plusieurs étapes. Québec.ca n’en publie pas les montants : demandez-les au SASIE.',
            'Gardez vos reçus : les frais d’adoption peuvent donner droit à un crédit d’impôt du Québec et à un montant fédéral.',
          ],
          watch:
            'La **kafala** n’est pas une adoption : elle ne crée pas de lien de filiation. Un enfant d’un pays qui interdit l’adoption ne peut pas être adopté au Québec, avec ou sans kafala, ni immigrer au Canada sur cette base.',
          refs: [ccq('564'), REG_NO_BODY, hague('2')],
          sources: [`${S}qc-intl-no-body`, `${S}qc-sasie-contacts`, `${S}qc-intl-costs`, `${S}qc-kafala`],
        },
        {
          id: 'training',
          when: 'En ligne, à votre rythme',
          title: 'Suivre la formation préparatoire',
          body: 'Cette formation en ligne est gratuite et obligatoire. Elle compte neuf modules. À la fin, vous recevez une attestation, à joindre à votre demande d’évaluation.',
          details: [
            'L’attestation est valide 3 ans.',
            'Vous avez déjà adopté un enfant venu de l’extérieur du Québec ? L’attestation n’est pas exigée si le nouveau projet est autorisé dans les 5 ans suivant son arrivée.',
          ],
          sources: [`${S}qc-intl-training`, `${S}gazette-training`, `${S}qc-intl-no-body`],
        },
        {
          id: 'assessment',
          when: 'Après l’accord du SASIE',
          title: 'L’évaluation psychosociale',
          body: 'Avec la lettre du SASIE, vous contactez la DPJ de votre région. Elle évalue votre capacité à répondre aux besoins de l’enfant, même s’il fait partie de votre famille. Seule une recommandation positive permet de continuer.',
          who: ['DPJ de votre région', 'SASIE', 'Vous'],
          details: [
            'Vous demandez d’abord au SASIE l’autorisation de faire l’objet d’une évaluation, avec son formulaire et votre attestation de formation.',
            'Certains pays exigent aussi une évaluation psychologique.',
            'Le rapport est remis au plus tard 2 mois après la première rencontre. Il est valide 2 ans.',
            'Il faut attendre 12 mois après l’arrivée d’un enfant dans votre famille (naissance, adoption ou accueil) avant l’évaluation.',
            'Un changement important (séparation, grossesse, déménagement, maladie, décès) peut exiger une mise à jour.',
          ],
          refs: [ccq('563'), lpj('71.7')],
          sources: [`${S}qc-intl-assessment`, `${S}qc-intl-no-body`],
        },
        {
          id: 'authorization',
          milestone: true,
          when: 'Après une évaluation positive',
          title: 'L’autorisation d’entreprendre les démarches',
          body: 'Le SASIE peut alors vous autoriser à entreprendre vos démarches, et il vous indique les conditions à suivre. Vous montez vous-même le dossier envoyé au pays de l’enfant.',
          who: ['SASIE', 'Vous'],
          details: [
            'Chaque pays exige ses propres documents officiels. Prévoyez des traductions et des légalisations.',
            'Respectez chaque condition fixée par le SASIE, pour que vos démarches soient conformes.',
            'Personne ne peut tirer un gain indu d’une adoption internationale. Seuls les frais et honoraires raisonnables sont permis.',
          ],
          watch:
            'Ne vous adressez pas au pays de l’enfant avant d’avoir cette autorisation. Sinon, vos démarches ne seront pas valides.',
          refs: [REG_NO_BODY, hague('32')],
          sources: [`${S}qc-intl-no-body`, `${S}hcch-1993`],
        },
        {
          id: 'proposal',
          milestone: true,
          when: 'Selon le pays',
          title: 'L’accord du pays et le feu vert du Québec',
          body: 'Les autorités du pays de l’enfant décident s’il peut être adopté, puis envoient une proposition au SASIE. Le SASIE vérifie que les besoins de l’enfant correspondent à votre évaluation. Si vous acceptez, il autorise par écrit la suite de la procédure.',
          who: ['Autorités du pays de l’enfant', 'SASIE', 'Vous'],
          details: [
            'Dans un pays membre de la Convention de La Haye, cette autorisation est l’accord prévu à son article 17.',
            'Si les besoins de l’enfant ne correspondent pas à votre évaluation (par exemple sur la santé), le SASIE ne peut pas autoriser la suite.',
            'Au Québec, l’adoption remplace le lien de filiation d’origine. Les consentements à l’adoption doivent avoir été donnés pour une adoption qui a cet effet.',
          ],
          refs: [lpj('71.8'), hague('17'), ccq('565.1')],
          sources: [`${S}qc-intl-steps`, `${S}hcch-1993`, 'lpj'],
        },
        {
          id: 'judgment',
          when: 'Selon le pays',
          title: 'Le jugement là-bas et l’entrée au Canada',
          body: 'Selon le pays, l’adoption est prononcée là-bas, ou l’enfant vous est confié pour être adopté au Québec. Vous remettez ensuite les documents au SASIE, qui vérifie les démarches avant de délivrer le document exigé par l’immigration.',
          who: ['Autorités du pays de l’enfant', 'SASIE', 'IRCC (Canada)', 'Ministère de l’Immigration et de l’Intégration (MII)'],
          details: [
            ...immigrationDetails,
            'Tous les documents officiels vont au SASIE, avec une traduction officielle en français s’ils ne sont ni en français ni en anglais.',
          ],
          watch: immigrationWatch,
          refs: [ccq('565'), ccq('562.2'), lpj('71.8')],
          sources: [`${S}qc-intl-no-body`, `${S}qc-intl-steps`, `${S}mii-sponsor`, `${S}mii-undertaking`],
        },
        {
          id: 'arrival',
          when: 'À l’arrivée',
          title: 'L’arrivée de l’enfant au Québec',
          body: 'Confirmez au SASIE la date d’arrivée de l’enfant et la date où il vous a été confié. Une intervenante ou un intervenant du CISSS ou du CIUSSS de votre région vous visite dans les 14 jours suivant l’arrivée.',
          who: ['SASIE', 'CISSS ou CIUSSS de votre région'],
          details: [
            'Une consultation avec un médecin spécialisé en adoption est fortement recommandée dans les premières semaines : vaccins, bilan de santé, suivi.',
            'Votre enfant n’a pas de médecin de famille ? Inscrivez-le au Guichet d’accès à un médecin de famille.',
            'Régime québécois d’assurance parentale (RQAP) : pour une adoption hors du Québec, vos prestations peuvent commencer jusqu’à 5 semaines avant l’arrivée de l’enfant.',
            'Tout enfant adopté vit un deuil : il a perdu des personnes et des repères. Donnez-lui du temps.',
          ],
          rights: [
            'Recevoir les services de santé et les services sociaux offerts à toutes les familles.',
            'Recevoir une visite de soutien dans les 14 jours suivant l’arrivée.',
          ],
          sources: [`${S}qc-post-adoption`, `${S}qc-rqap-planning`, `${S}qc-intl-children`],
        },
        recognition,
        birthAct,
        {
          id: 'reports',
          when: 'Pendant des années, selon le pays',
          title: 'Les rapports d’évolution',
          body: 'Vous envoyez au pays de l’enfant les rapports promis sur son développement et son intégration. Leur nombre, leur fréquence et leur durée varient selon le pays. C’est aussi une obligation prévue par la loi.',
          who: ['Vous', 'Autorités du pays de l’enfant'],
          details: [
            'Selon le pays, vous les rédigez vous-même, ou un professionnel mandaté par la DPJ s’en charge.',
            'Ils doivent parfois être traduits, certifiés et légalisés.',
          ],
          refs: [lpj('71.8.1')],
          sources: [`${S}qc-intl-reports`, `${S}qc-intl-steps`],
        },
      ],
      outro:
        'Plus tard, votre enfant pourra demander au SASIE l’histoire de son adoption (seul, dès 14 ans) et, selon les règles de son pays d’origine, le nom de ses parents d’origine.',
    },

    /* ------------------------------------------------------------ dossier déjà ouvert */
    {
      id: 'open-file',
      label: 'Mon dossier est déjà ouvert',
      forWho: 'Pour les personnes dont le dossier avec un organisme agréé était ouvert avant le moratoire de novembre 2024.',
      steps: [
        {
          id: 'status',
          when: 'Depuis novembre 2024',
          title: 'Votre dossier se poursuit',
          body: 'Le moratoire ne vise pas les dossiers déjà ouverts avec un organisme agréé : leur traitement continue. Mais les adoptions sont moins nombreuses, et l’attente peut être longue.',
          who: ['Votre organisme agréé', 'SASIE'],
          details: [
            'En 2025, 17 enfants adoptés à l’étranger sont arrivés au Québec, contre 35 en 2024. Tous sont venus avec un organisme agréé.',
            'Certains pays sont fermés ou suspendus : la Chine a fermé l’adoption internationale en 2024 ; Haïti (dossiers sans enfant proposé) et l’Ukraine sont suspendus.',
            'Les situations changent vite. Vérifiez auprès de votre organisme ou du SASIE où en est votre pays.',
            'Aucune date de fin du moratoire n’a été annoncée.',
          ],
          sources: [`${S}qc-intl-hub`, `${S}moratorium-news`, `${S}msss-stats-2025`, `${S}qc-intl-countries`],
        },
        {
          id: 'waiting',
          when: 'Souvent plusieurs années',
          title: 'Pendant l’attente, garder votre dossier à jour',
          body: 'Plusieurs années peuvent passer avant une proposition d’enfant. Signalez à votre organisme tout changement important dans votre vie.',
          who: ['Vous', 'Votre organisme agréé'],
          details: [
            'Exemples : grossesse, perte d’emploi, séparation, décès, nouvelle vie commune, maladie. Une nouvelle évaluation peut alors être demandée.',
            'Votre évaluation psychosociale est valide 2 ans. Ensuite, une mise à jour est nécessaire.',
            'La plupart des enfants qui attendent une famille à l’étranger ont plus de 4 ans, font partie d’une fratrie ou ont un problème de santé physique ou psychologique.',
          ],
          sources: [`${S}qc-intl-steps`, `${S}qc-intl-assessment`, `${S}qc-intl-children`],
        },
        {
          id: 'proposal',
          milestone: true,
          when: 'Selon le pays',
          title: 'La proposition d’un enfant',
          body: 'Les autorités du pays décident si un enfant peut être adopté et le proposent. Le SASIE vérifie d’abord que ses besoins correspondent à votre évaluation. Votre organisme vous présente ensuite la proposition, et vous lui donnez votre réponse.',
          who: ['Autorités du pays de l’enfant', 'SASIE', 'Votre organisme agréé'],
          details: [
            'Le dossier peut contenir le nom de l’enfant, sa situation familiale, son dossier médical, ses besoins particuliers et parfois des photos.',
            'Si les besoins de l’enfant ne correspondent pas à votre évaluation (par exemple sur la santé ou l’histoire de vie), le SASIE ne peut pas autoriser la proposition. L’identité de l’enfant reste alors confidentielle.',
          ],
          sources: [`${S}qc-intl-steps`],
        },
        {
          id: 'go-ahead',
          milestone: true,
          when: 'Après votre acceptation',
          title: 'Le feu vert du Québec',
          body: 'Si vous acceptez, le SASIE autorise par écrit la poursuite de la procédure. Il délivre aussi une lettre de non-opposition : il ne s’oppose pas à l’entrée de l’enfant au Canada.',
          who: ['SASIE', 'Votre organisme agréé'],
          details: [
            'Dans un pays membre de la Convention de La Haye, cette autorisation est l’accord prévu à son article 17.',
            'Votre organisme demande la lettre de non-opposition, et vous en recevez une copie. Elle est transmise au ministère de l’Immigration et de l’Intégration (MII), puis au bureau canadien des visas à l’étranger.',
          ],
          refs: [lpj('71.8'), hague('17')],
          sources: [`${S}qc-intl-steps`, `${S}hcch-1993`, 'lpj'],
        },
        {
          id: 'immigration',
          when: 'En parallèle',
          title: 'Le statut de l’enfant au Canada',
          body: 'L’enfant doit obtenir le droit de vivre au Canada de façon permanente. Le gouvernement du Canada (IRCC) décide, et le Québec y joue un rôle.',
          who: ['IRCC (Canada)', 'Ministère de l’Immigration et de l’Intégration (MII)', 'SASIE'],
          details: immigrationDetails,
          watch: immigrationWatch,
          refs: [ccq('562.2'), lpj('71.8')],
          sources: [`${S}mii-sponsor`, `${S}mii-undertaking`, `${S}qc-intl-steps`],
        },
        {
          id: 'travel',
          when: 'Selon le pays',
          title: 'Le voyage et l’adoption à l’étranger',
          body: 'Selon le pays, vous voyagez une ou plusieurs fois pour les démarches administratives ou judiciaires. L’adoption est prononcée là-bas, ou l’enfant vous est confié pour être adopté au Québec.',
          who: ['Vous', 'Représentant de votre organisme', 'Autorités du pays de l’enfant'],
          details: [
            'Tous les documents officiels vont au SASIE, avec une traduction officielle en français s’ils ne sont ni en français ni en anglais.',
            'L’examen médical de l’enfant par un médecin désigné par l’ambassade est obligatoire pour la résidence permanente. Il est fortement recommandé pour la citoyenneté.',
            'Régime québécois d’assurance parentale (RQAP) : pour une adoption hors du Québec, vos prestations peuvent commencer jusqu’à 5 semaines avant l’arrivée de l’enfant.',
          ],
          refs: [ccq('565')],
          sources: [`${S}qc-intl-steps`, `${S}qc-rqap-planning`],
        },
        {
          id: 'arrival',
          when: 'À l’arrivée',
          title: 'L’arrivée de l’enfant au Québec',
          body: 'Confirmez à votre organisme la date d’arrivée de l’enfant et la date où il vous a été confié : l’organisme en informe le SASIE. Une intervenante ou un intervenant du CISSS ou du CIUSSS de votre région vous visite ensuite dans les 14 jours suivant l’arrivée.',
          who: ['Votre organisme agréé', 'SASIE', 'CISSS ou CIUSSS de votre région'],
          details: [
            'Une consultation avec un médecin spécialisé en adoption est fortement recommandée dans les premières semaines : vaccins, bilan de santé, suivi.',
            'Votre enfant n’a pas de médecin de famille ? Inscrivez-le au Guichet d’accès à un médecin de famille.',
            'Tout enfant adopté vit un deuil : il a perdu des personnes et des repères. Donnez-lui du temps.',
          ],
          rights: [
            'Recevoir les services de santé et les services sociaux offerts à toutes les familles.',
            'Recevoir une visite de soutien dans les 14 jours suivant l’arrivée.',
          ],
          sources: [`${S}qc-post-adoption`, `${S}qc-intl-children`],
        },
        recognition,
        birthAct,
        {
          id: 'reports',
          when: 'Pendant des années, selon le pays',
          title: 'Les rapports d’évolution',
          body: 'Au départ, vous avez promis d’envoyer au pays de l’enfant des rapports sur son développement et son intégration. Leur nombre, leur fréquence et leur durée varient selon le pays. C’est aussi une obligation prévue par la loi.',
          who: ['Vous', 'Votre organisme agréé'],
          details: [
            'Selon le pays, vous les rédigez vous-même, ou un professionnel mandaté par la DPJ s’en charge.',
            'Ils doivent parfois être traduits, certifiés et légalisés. Votre organisme les transmet et en assure le suivi.',
          ],
          refs: [lpj('71.8.1')],
          sources: [`${S}qc-intl-reports`, `${S}qc-intl-steps`],
        },
      ],
      outro:
        'Plus tard, votre enfant pourra demander au SASIE l’histoire de son adoption (seul, dès 14 ans) et, selon les règles de son pays d’origine, le nom de ses parents d’origine.',
    },
  ],
}
