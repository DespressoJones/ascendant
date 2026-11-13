// Researched content — verified 2026-11-13
import type { Journey, LegalRef } from '../../types'

const CCQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991'
const LPJ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-34.1'
const anchor = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: CCQ + anchor(a) })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: LPJ + anchor(a) })

export const hospital: Journey = {
  id: 'hospital',
  icon: 'hospital',
  label: 'À l’hôpital',
  tagline: 'Vous attendez un bébé ou venez d’accoucher, et vous vous questionnez.',
  scenarios: [
    /* ---------------------------------------------------------------- consentement volontaire */
    {
      id: 'considering',
      label: 'J’envisage l’adoption',
      forWho:
        'Pour la personne enceinte, ou le parent qui vient d’accoucher, qui pense peut-être confier son bébé à l’adoption.',
      steps: [
        {
          id: 'talk',
          when: 'Pendant la grossesse ou après',
          title: 'En parler, sans engagement',
          body: 'Vous pouvez demander de l’information au service d’adoption de votre région (CISSS ou CIUSSS). Une intervenante ou un intervenant peut vous accompagner dans votre réflexion. **Poser des questions ne vous engage à rien.**',
          who: ['Service d’adoption (CISSS/CIUSSS)', 'Info-Social 811', 'CLSC'],
          details: [
            'Info-Social 811, option 2 : une ou un professionnel vous répond gratuitement et en toute confidentialité, 24 heures sur 24, 365 jours par année (sauf au Nunavik et dans les Terres-Cries-de-la-Baie-James).',
            'Au Québec, l’adoption d’un enfant qui vit au Québec est sous la responsabilité du directeur de la protection de la jeunesse (DPJ). C’est son service d’adoption qui vous renseigne.',
            'En pratique, le consentement à l’adoption se signe après la naissance. D’ici là, rien n’est décidé.',
            'Vous pouvez demander qu’une personne de confiance vous accompagne aux rencontres.',
          ],
          sources: ['qc-adoption-about', 'paths-hospital-home-info-social', 'paths-hospital-home-info-social-psy'],
        },
        {
          id: 'options',
          when: 'Avant de décider',
          title: 'Explorer toutes vos options',
          body: 'Garder votre bébé avec du soutien, le confier à un proche ou consentir à son adoption : chaque option a des effets différents. Prenez le temps de les comparer.',
          who: ['Intervenante ou intervenant psychosocial', 'Vos proches'],
          details: [
            'Le programme **SIPPE** de votre CLSC aide les futurs et nouveaux parents qui vivent des difficultés financières et qui n’ont pas de diplôme d’études secondaires ou professionnelles, ou qui se sentent isolés ou seuls. Il commence par une visite à domicile.',
            '**Tutelle supplétive** : si vous ne pouvez pas exercer pleinement votre rôle, le tribunal peut vous permettre de le confier à certains proches (grand-parent, tante, oncle, frère ou sœur adulte…) ou de le partager avec eux. Vous restez le parent de l’enfant.',
            '**Consentement spécial** : vous pouvez consentir à l’adoption de votre enfant par un grand-parent, un frère, une sœur, une tante, un oncle, le conjoint d’une de ces personnes, ou le conjoint de l’un des parents (les conjoints de fait doivent vivre ensemble depuis au moins 3 ans).',
            '**Consentement général** : vous confiez votre enfant à la DPJ, qui choisit une famille parmi celles qu’elle a déjà évaluées.',
          ],
          refs: [ccq('199.1'), ccq('555')],
          sources: ['paths-hospital-home-sippe', 'qc-adoption-about', 'ccq-book1', 'ccq-book2'],
        },
        {
          id: 'birth',
          when: 'Jour 0',
          title: 'La naissance et sa déclaration',
          body: 'Le médecin ou la sage-femme remplit le **constat de naissance**, qui indique le nom de la personne qui a accouché. La naissance doit ensuite être déclarée au Directeur de l’état civil **dans les 30 jours**.',
          details: [
            'Depuis juin 2023, la personne qui a accouché doit déclarer la filiation de l’enfant à son égard.',
            'Si vous êtes en couple (mariage, union civile ou union de fait), votre conjoint est présumé être l’autre parent de l’enfant.',
            'Une déclaration en retard reste possible, mais le Directeur de l’état civil doit alors faire une enquête sommaire.',
          ],
          watch:
            'Au Québec, on ne peut pas accoucher de façon anonyme : votre nom figure sur le constat de naissance. Aucune loi québécoise ne prévoit non plus de « boîte à bébé ». Si vous vous sentez en détresse, appelez Info-Social 811 (gratuit et confidentiel) ou parlez-en à l’équipe de l’hôpital : on peut vous aider. En cas de danger, composez le 911.',
          refs: [ccq('111'), ccq('113'), ccq('113.1'), ccq('130'), ccq('525')],
          sources: ['paths-hospital-home-declare-birth', 'ccq-book1', 'ccq-book2'],
        },
        {
          id: 'privacy',
          when: '≤ 30 jours après la naissance',
          title: 'Protéger votre identité, si vous le souhaitez',
          body: 'Si vous ne voulez pas que votre enfant puisse connaître votre identité avant ses 18 ans, inscrivez un **refus à la communication de votre identité** dans les 30 jours qui suivent la naissance. Le service d’adoption vous explique comment faire.',
          watch:
            'Ce délai compte à partir de la **naissance**, pas de la signature du consentement. Après 30 jours, il est trop tard. Dans tous les cas, ce refus prend fin aux 18 ans de votre enfant.',
          details: [
            'Sans ce refus, votre enfant pourra demander votre nom à tout âge : seul dès 14 ans, ou plus jeune avec l’accord de ses parents adoptifs.',
            'Vous pouvez aussi inscrire un **refus au contact**, ou permettre un contact à vos conditions, en tout temps avant que votre identité soit communiquée. On doit d’ailleurs vous prévenir avant de la communiquer.',
            'Vous pouvez retirer un refus en tout temps.',
            'Exemple : si vous signez le consentement au 5e jour, vous avez jusqu’au 35e jour pour changer d’avis, mais seulement jusqu’au 30e jour pour refuser la communication de votre identité.',
            'Ces règles sont en vigueur depuis le 8 juin 2024.',
          ],
          refs: [ccq('583'), ccq('583.4'), ccq('583.6'), ccq('583.7'), ccq('583.9'), lpj('71.3.15')],
          sources: ['msss-origins-guide', 'paths-hospital-home-msss-pl2', 'qc-origins'],
        },
        {
          id: 'consent',
          milestone: true,
          when: 'Après la naissance',
          title: 'Signer le consentement à l’adoption',
          body: 'Le consentement se donne par écrit, devant deux témoins. Avec un **consentement général**, c’est la DPJ qui le reçoit et qui choisit la famille adoptive. Le Code civil ne fixe aucun délai minimal après la naissance : **rien ne vous oblige à signer à l’hôpital.**',
          who: ['Vous', 'L’autre parent légal, s’il y a lieu', 'Deux témoins', 'Intervenante ou intervenant de la DPJ'],
          rights: [
            'Recevoir une information claire avant de signer.',
            'Donner un consentement libre et éclairé, sans pression.',
            'Signer vous-même, même si vous avez moins de 18 ans.',
          ],
          details: [
            'Si la filiation de votre bébé est établie avec deux parents, les deux doivent consentir. Si elle n’est établie qu’avec vous, votre consentement suffit.',
            'Vous indiquez si vous consentez à une adoption **avec** ou **sans** reconnaissance de votre lien de filiation, ou à l’une ou l’autre. La reconnaissance inscrit votre nom sur le nouvel acte de naissance (jamais sur le certificat de naissance), mais ne vous laisse aucun droit envers l’enfant.',
            'Pour un bébé qui n’a pas vécu avec vous, la DPJ juge rarement cette reconnaissance dans son intérêt. Si vous n’êtes pas d’accord avec son avis, elle ne peut pas recevoir votre consentement : parlez-en avant de signer.',
            'Signer ne fait pas encore de votre enfant un enfant adopté : il faudra une ordonnance de placement, puis un jugement.',
            'Demandez une copie de ce que vous signez.',
          ],
          refs: [ccq('548'), ccq('551'), ccq('554'), ccq('555'), ccq('544.1'), ccq('568.1')],
          sources: ['qc-adoption-legal', 'educaloi-adopt', 'paths-hospital-home-msss-recognition'],
        },
        {
          id: 'meanwhile',
          when: 'Après la signature',
          title: 'Qui prend soin de votre bébé ?',
          body: 'Avec un consentement général, la DPJ devient légalement tutrice de votre bébé jusqu’à l’ordonnance de placement, et la personne à qui il est confié exerce l’autorité parentale. Où vit votre bébé pendant ce temps dépend de sa situation et de la région : le service d’adoption vous explique ce qui est prévu.',
          details: [
            'Demandez où sera votre bébé, qui en prendra soin et comment on vous tiendra au courant de la suite.',
          ],
          refs: [ccq('199'), ccq('556')],
          sources: ['ccq-book1', 'ccq-book2'],
        },
        {
          id: 'withdraw',
          when: '≤ 30 jours après la signature',
          title: 'Changer d’avis : vous avez 30 jours',
          body: 'Pendant les 30 jours qui suivent la signature, vous pouvez retirer votre consentement **sans donner de raison**. Votre enfant doit alors vous être rendu sans formalité ni délai.',
          rights: ['Retirer votre consentement sans vous justifier.', 'Retrouver votre enfant sans formalité ni délai.'],
          watch:
            'Le retrait se fait par écrit et se signe devant deux témoins, comme le consentement. Agissez avant la fin du 30e jour et prévenez tout de suite le service d’adoption.',
          refs: [ccq('557'), ccq('548')],
          sources: ['educaloi-adopt', 'ccq-book2'],
        },
        {
          id: 'restitution',
          when: 'Après 30 jours, avant le placement',
          title: 'Demander au tribunal de vous rendre l’enfant',
          body: 'Après ces 30 jours, vous pouvez encore, jusqu’à l’ordonnance de placement, demander au tribunal que votre enfant vous soit rendu. Le juge vérifie si votre consentement était valide, puis si ce retour est dans l’intérêt de l’enfant.',
          who: ['Vous', 'Votre avocate ou avocat', 'Tribunal unifié de la famille (Cour du Québec)'],
          rights: [
            'Avoir une avocate ou un avocat pour vous représenter.',
            'Vérifier si vous avez droit à l’aide juridique (gratuite si vous avez moins de 18 ans).',
          ],
          watch: 'Faites vite : une fois l’ordonnance de placement rendue, il n’est plus possible de demander le retour de l’enfant.',
          refs: [ccq('558'), ccq('569')],
          sources: ['educaloi-adopt', 'qc-tuf', 'paths-hospital-home-csj-eligibility'],
        },
        {
          id: 'contact',
          when: 'Avant l’ordonnance de placement',
          title: 'Garder un lien, si vous le souhaitez',
          body: 'Vous et la famille adoptive pouvez convenir par écrit d’échanger des nouvelles, par exemple une photo par année, ou de garder des contacts, si c’est dans l’intérêt de l’enfant. Jusqu’à l’ordonnance de placement, la DPJ accompagne les personnes qui souhaitent une telle entente.',
          details: [
            'Avant de demander l’ordonnance de placement, la DPJ doit vous expliquer cette possibilité, ainsi que les règles sur la recherche des origines et les retrouvailles.',
            'Dès 10 ans, l’enfant doit être d’accord. Dès 14 ans, il peut mettre fin à l’entente sans formalité.',
            'En cas de désaccord, le tribunal peut trancher, mais seulement pour les parents ou les grands-parents d’origine qui sont significatifs pour l’enfant.',
            'Si l’entente ne prévoit que des échanges de nouvelles, la DPJ les facilite, à votre demande, jusqu’à la majorité de l’enfant.',
            'Une entente est possible en tout temps. Après l’ordonnance de placement, le Programme de médiation familiale peut aider.',
          ],
          refs: [ccq('579'), lpj('71.3.4')],
          sources: ['paths-hospital-home-communication', 'qc-adoption-about'],
        },
        {
          id: 'placement',
          milestone: true,
          when: 'Au moins 30 jours après le consentement',
          title: 'L’ordonnance de placement',
          body: 'Le tribunal confie l’enfant à la famille qui va l’adopter. Les parents adoptifs exercent alors l’autorité parentale, et l’enfant peut porter son nouveau nom.',
          who: ['Tribunal unifié de la famille (Cour du Québec)', 'DPJ', 'Famille adoptive'],
          details: [
            'Avant de rendre l’ordonnance, le tribunal vérifie que les conditions de l’adoption sont remplies et que personne n’a demandé le retour de l’enfant.',
            'Dès l’ordonnance, les parents adoptifs peuvent obtenir de la DPJ un résumé des antécédents de santé et sociaux de l’enfant, sans votre identité. Vous pouvez, vous aussi, demander un résumé des antécédents de la famille adoptive.',
          ],
          watch: 'Une fois cette ordonnance rendue, l’enfant ne peut plus vous être rendu.',
          refs: [ccq('567'), ccq('569'), lpj('71.3.6')],
          sources: ['qc-adoption-legal', 'educaloi-adopt', 'qc-tuf'],
        },
        {
          id: 'judgment',
          milestone: true,
          when: 'Généralement 6 mois plus tard',
          title: 'Le jugement d’adoption',
          body: 'Quand l’enfant a vécu au moins 6 mois avec la famille adoptive depuis l’ordonnance de placement, le tribunal prononce l’adoption. Ce délai peut être réduit de 3 mois au plus. Les parents adoptifs deviennent les parents légaux de l’enfant, et vos droits et obligations envers lui prennent fin.',
          who: ['Tribunal unifié de la famille (Cour du Québec)', 'Directeur de l’état civil'],
          details: [
            'Le Directeur de l’état civil dresse un nouvel acte de naissance, qui remplace l’acte d’origine. Le remplacement est noté sur l’acte d’origine.',
            'Depuis le 8 juin 2024, la personne adoptée peut obtenir une copie de son acte de naissance d’origine et des jugements d’adoption.',
          ],
          refs: [ccq('566'), ccq('577.1'), ccq('132'), ccq('583')],
          sources: ['qc-adoption-about', 'ccq-book1', 'ccq-book2'],
        },
      ],
      outro:
        'Plus tard, votre enfant pourra rechercher ses origines. Et une fois votre enfant majeur, vous pourrez demander son nom et ses coordonnées, en respectant ses propres choix. Prenez soin de vous : Info-Social 811 et votre CLSC restent là, aussi après l’adoption.',
    },

    /* ---------------------------------------------------------------- DPJ à la naissance */
    {
      id: 'dpj',
      label: 'La DPJ intervient à la naissance',
      forWho:
        'Pour les parents dont le nouveau-né fait l’objet d’un signalement au directeur de la protection de la jeunesse (DPJ).',
      steps: [
        {
          id: 'prenatal',
          when: 'Pendant la grossesse',
          title: 'Pas de signalement avant la naissance',
          body: 'Depuis 2023, la DPJ ne peut plus recevoir de signalement au sujet d’un bébé à naître. À la place, les futurs parents en difficulté peuvent recevoir, dès la grossesse, des services préventifs et intensifs.',
          who: ['CLSC', 'Organismes communautaires', 'Info-Social 811'],
          details: [
            'Ces services viennent du réseau de la santé et des organismes de votre communauté. Votre CLSC peut vous y orienter.',
            'Le programme SIPPE du CLSC soutient certains futurs parents dès la grossesse, en commençant par une visite à domicile.',
            'Info-Social 811 (option 2) peut vous conseiller et vous orienter, 24 heures sur 24.',
          ],
          sources: ['paths-hospital-home-birth-alerts', 'paths-hospital-home-sippe', 'paths-hospital-home-info-social-psy'],
        },
        {
          id: 'report',
          when: 'Dès la naissance',
          title: 'Un signalement peut être fait',
          body: 'Dès la naissance, le personnel de l’hôpital doit signaler la situation à la DPJ s’il a des motifs raisonnables de croire que la sécurité ou le développement du bébé est compromis. **Un signalement n’est pas une décision :** la DPJ doit d’abord analyser la situation.',
          who: ['Équipe de l’hôpital', 'DPJ'],
          rights: [
            'Recevoir des explications claires, dans des mots que vous comprenez, sur ce qui se passe et sur les mesures proposées.',
            'Venir avec la personne de votre choix aux rencontres avec la DPJ.',
            'Être traité avec courtoisie, équité et respect.',
          ],
          details: [
            'La DPJ décide d’abord si elle retient le signalement. Si elle ne le retient pas, elle doit vous informer des ressources d’aide et, si vous le voulez, vous mettre en contact avec elles.',
          ],
          refs: [lpj('38'), lpj('39'), lpj('4.4'), lpj('6.1'), lpj('6.2')],
          sources: ['paths-hospital-home-birth-alerts', 'paths-hospital-home-report-duty', 'qc-dpj-steps'],
        },
        {
          id: 'urgent',
          when: '≤ 48 heures',
          title: 'Des mesures de protection immédiate',
          body: 'Si votre bébé a besoin d’une protection urgente, la DPJ peut agir tout de suite, même avant la fin de son évaluation : par exemple, le confier à un proche ou à une famille d’accueil, ou limiter les contacts. Ces mesures durent au plus 48 heures.',
          who: ['DPJ', 'Un proche ou une famille d’accueil'],
          rights: ['Donner votre avis sur les solutions possibles : la DPJ doit chercher votre participation.'],
          details: ['Dites tout de suite à l’intervenante ou à l’intervenant quels proches pourraient accueillir votre bébé.'],
          watch:
            'Vous ne pouvez pas empêcher ces mesures pendant les 48 heures. Communiquez dès maintenant avec l’aide juridique ou une avocate ou un avocat : les décisions des prochains jours comptent.',
          refs: [lpj('46')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-educaloi-dpj'],
        },
        {
          id: 'next',
          milestone: true,
          when: 'Après 48 heures',
          title: 'Une entente provisoire, ou le tribunal',
          body: 'Si des mesures sont encore nécessaires et que vous êtes d’accord, la DPJ peut vous proposer une **entente provisoire** d’au plus 30 jours. Si vous n’êtes pas d’accord, la DPJ doit s’adresser au tribunal, qui décide.',
          who: ['DPJ', 'Votre avocate ou avocat', 'Tribunal unifié de la famille (Cour du Québec)'],
          rights: [
            'Refuser l’entente provisoire : un juge décidera alors.',
            'Recevoir un avis au moins un jour avant l’audience sur des mesures provisoires, avec les faits et ce que la DPJ demande.',
          ],
          details: [
            'L’entente provisoire peut être prolongée une seule fois, d’au plus 30 jours.',
            'Si vous vous opposez à leur prolongation, le tribunal peut prolonger les mesures d’urgence d’au plus 5 jours ouvrables.',
            'Le tribunal peut raccourcir le délai d’avis d’un jour quand la demande vise à changer le milieu de vie de votre bébé.',
            'Depuis le 30 juin 2025, ces dossiers sont entendus par le Tribunal unifié de la famille de la Cour du Québec. Certaines pages parlent encore de la « Chambre de la jeunesse ».',
          ],
          refs: [lpj('47'), lpj('47.1'), lpj('76.1'), lpj('76.2')],
          sources: ['qc-dpj-steps', 'paths-hospital-home-bill99', 'paths-hospital-home-bill15', 'qc-tuf'],
        },
        {
          id: 'lawyer',
          when: 'Avant la première audience',
          title: 'Un avocat pour vous, un autre pour votre bébé',
          body: 'Vous avez droit aux services d’une avocate ou d’un avocat. Le tribunal doit aussi s’assurer que votre bébé a son propre avocat, chargé de représenter uniquement votre bébé.',
          who: ['Votre avocate ou avocat', 'L’avocat de votre bébé', 'Bureau d’aide juridique'],
          rights: [
            'Avoir une avocate ou un avocat, de l’aide juridique ou de pratique privée.',
            'Faire entendre votre point de vue par le juge.',
            'Faire appel à la Cour supérieure dans les 30 jours de la décision écrite.',
          ],
          details: [
            'Selon votre situation financière, l’aide juridique est gratuite ou demande une contribution de 100 $ à 800 $. Les personnes qui reçoivent de l’aide sociale ou de solidarité sociale y sont automatiquement admissibles sur le plan financier.',
            'Si vous avez moins de 18 ans, l’aide juridique est gratuite pour vous.',
            'Prenez rendez-vous au bureau d’aide juridique de votre région le plus tôt possible.',
          ],
          refs: [lpj('78'), lpj('100'), lpj('103')],
          sources: ['csj', 'paths-hospital-home-csj-eligibility', 'paths-hospital-home-bill15', 'paths-hospital-home-bill99'],
        },
        {
          id: 'eval',
          when: 'Après un signalement retenu',
          title: 'L’évaluation de la situation',
          body: 'Une intervenante ou un intervenant de la DPJ vous rencontre, ainsi que vos proches, pour décider si la sécurité ou le développement de votre bébé est compromis. La DPJ tient compte notamment de votre capacité et de votre volonté de corriger la situation, et de l’aide disponible autour de vous.',
          who: ['Intervenante ou intervenant de la DPJ', 'Vous', 'Vos proches'],
          details: [
            'Dites ce dont vous avez besoin : logement, soutien, soins, aide financière.',
            'Nommez les personnes qui peuvent vous soutenir : famille, amis, organismes.',
            'Si la sécurité de votre bébé n’est pas compromise, le dossier est fermé et la DPJ vous oriente vers de l’aide.',
            'Si elle l’est, la DPJ peut vous proposer une entente, par exemple sur des mesures volontaires (au plus 12 mois). Sinon, ou si vous n’êtes pas d’accord, elle s’adresse au tribunal.',
          ],
          refs: [lpj('38.2'), lpj('52'), lpj('53')],
          sources: ['qc-dpj-steps'],
        },
        {
          id: 'family',
          when: 'S’il ne peut pas rester avec vous',
          title: 'La famille élargie d’abord',
          body: 'La loi privilégie le maintien de votre bébé auprès de vous, si c’est dans son intérêt. Sinon, il doit être confié en priorité aux personnes les plus significatives pour lui, comme ses grands-parents ou d’autres membres de la famille. À défaut, il va dans le milieu qui ressemble le plus à une famille, comme une famille d’accueil.',
          who: ['DPJ', 'Grands-parents ou autres proches', 'Famille d’accueil'],
          rights: [
            'Que vos contacts avec votre bébé soient favorisés, s’ils sont dans son intérêt.',
            'Participer aux décisions et au choix des mesures qui vous concernent.',
          ],
          details: [
            'La DPJ évalue la volonté et la capacité de vos proches. Ils deviennent généralement une **famille d’accueil de proximité**.',
            'Demandez un plan de visites écrit, qui précise aussi l’alimentation de votre bébé (par exemple, l’allaitement ou le lait maternel).',
            'Si votre bébé a des frères ou des sœurs placés, la loi favorise qu’ils vivent ensemble, si c’est dans leur intérêt.',
            'Certains bébés sont confiés à une famille d’accueil de la **Banque mixte**, prête à l’adopter si un retour chez vous devient impossible. L’adoption n’est possible que si vous y consentez ou si le tribunal déclare l’enfant admissible à l’adoption.',
          ],
          refs: [lpj('4'), lpj('4.1'), lpj('4.3'), lpj('9.1')],
          sources: ['paths-hospital-home-bill15', 'qc-dpj-steps', 'qc-adoption-about'],
        },
        {
          id: 'plan',
          when: 'Pendant le suivi',
          title: 'Deux plans en même temps',
          body: 'Quand un bébé est retiré de son milieu familial, la DPJ doit planifier son retour auprès de vous et, en même temps, préparer un autre projet de vie stable, au cas où ce retour ne serait pas dans son intérêt. **Le retour chez vous est toujours examiné en premier.**',
          who: ['Intervenante ou intervenant de la DPJ', 'Vous', 'CLSC et organismes'],
          rights: [
            'Participer au plan d’intervention et en recevoir une copie.',
            'Recevoir des services adaptés, avec l’intensité nécessaire.',
          ],
          details: [
            'Le plan d’intervention précise vos besoins et ceux de votre bébé, les objectifs, les moyens et la durée des services.',
            'La DPJ révise la situation régulièrement avec vous.',
            'Si des services promis ne vous sont pas offerts, notez-le et parlez-en à votre avocate ou avocat.',
          ],
          refs: [lpj('4.2'), lpj('4.3'), lpj('8')],
          sources: ['paths-hospital-home-bill15', 'qc-dpj-steps'],
        },
        {
          id: 'permanency',
          milestone: true,
          when: 'Max. 12 mois de placement (moins de 2 ans)',
          title: 'Un projet de vie stable',
          body: 'Pour un enfant de moins de 2 ans, la durée totale d’un placement hors de sa famille ne peut pas dépasser 12 mois. Si votre bébé ne peut toujours pas revenir chez vous en sécurité, le tribunal doit alors rendre une décision qui lui assure, de façon permanente, des soins et des liens stables.',
          watch:
            'Le tribunal peut dépasser ce délai, dans l’intérêt de l’enfant, si un retour est prévu à court terme ou pour des motifs sérieux. Le fait que des services prévus ne vous aient pas été rendus est un motif sérieux.',
          details: [
            'Tous les placements liés à la même situation sont additionnés.',
            'Les projets de vie possibles : retour chez vous, placement jusqu’à 18 ans auprès d’un proche ou d’une famille d’accueil, tutelle ou adoption.',
            'Sans votre consentement, une adoption exige que le tribunal déclare l’enfant admissible à l’adoption. Vous pouvez contester cette demande, avec votre avocate ou avocat.',
          ],
          refs: [lpj('91.1'), lpj('53.0.1'), ccq('559')],
          sources: ['paths-hospital-home-cdpdj-stability', 'paths-hospital-home-bill15', 'paths-hospital-home-bill99'],
        },
      ],
      outro:
        'Le parcours « À la maison » détaille la suite d’une intervention de la DPJ : révisions, durées maximales et fin du dossier. Vous n’êtes pas seuls : la section Aide, plus bas, réunit des ressources.',
    },
  ],
}
