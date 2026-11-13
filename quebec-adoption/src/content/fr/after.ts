// Researched content — verified 2026-11-13
import type { After, LegalRef } from '../types'

/*
 * Facts: research notes after-adoption.md (§1–§8), legal-core.md (§8), international.md (§8, §12, §14);
 * Civil Code text checked in the Publications du Québec consolidation current to September 9, 2026.
 * RQAP figures re-read on Québec.ca (choix du régime, updated February 26, 2026).
 * Tax figures: Revenu Québec line 462 point 6 (2025 return) and CRA line 31300 (2025), read through
 * search-engine extracts of the official pages (both sites block automated reads). 2026 figures not
 * published yet, so none are given. Sources: src/content/sources/actors-after.ts.
 */

const LQ = 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/'
const se = (a: string) => `#se:${a.replace(/\./g, '_')}`
const ccq = (a: string): LegalRef => ({ label: `C.c.Q., art. ${a}`, url: `${LQ}CCQ-1991${se(a)}` })
const lpj = (a: string): LegalRef => ({ label: `LPJ, art. ${a}`, url: `${LQ}P-34.1${se(a)}` })
const lnt = (a: string): LegalRef => ({ label: `LNT, art. ${a}`, url: `${LQ}N-1.1${se(a)}` })

const S = 'actors-after-'

export const after: After = {
  eyebrow: 'Après l’adoption',
  title: 'Après le jugement : ce qui change, ce qui reste',
  lede:
    'Le jugement d’adoption tourne une page sans effacer l’histoire. Voici ce qui arrive à l’acte de naissance, aux liens avec la famille d’origine, et l’aide offerte aux familles.',
  certificate: {
    title: 'Un nouvel acte de naissance',
    body:
      'Quand le jugement d’adoption devient définitif, le tribunal l’envoie au Directeur de l’état civil. Un **nouvel acte de naissance** est alors dressé. Il remplace l’acte d’origine, appelé « acte primitif » : il reprend tout ce qui ne change pas, comme la date et le lieu de naissance, et nomme les parents adoptifs. Si le tribunal a reconnu un lien de filiation d’origine, le nouvel acte le mentionne aussi.\n\nL’acte primitif n’est **pas détruit**. Il est conservé, avec une mention du remplacement, et il reste confidentiel : seules les personnes prévues par la loi y ont accès. Une personne adoptée née au Québec peut en obtenir une copie, avec une attestation du service de recherche des origines.',
    docTitle: 'Acte de naissance',
    fields: [
      { label: 'Nom de famille', before: 'Lavoie', after: 'Tremblay-Diallo' },
      { label: 'Prénom', before: 'Léa', after: 'Léa' },
      { label: 'Date de naissance', before: '14 mars 2025', after: '14 mars 2025' },
      { label: 'Lieu de naissance', before: 'Sherbrooke (Québec)', after: 'Sherbrooke (Québec)' },
      { label: 'Parent', before: 'Julie Lavoie', after: 'Marc Tremblay' },
      { label: 'Parent', before: 'Non déclaré', after: 'Awa Diallo' },
    ],
    sealedLabel: 'Acte primitif, confidentiel',
    note: 'Illustration seulement : ce n’est pas un document officiel. Les noms sont fictifs.',
    refs: [ccq('129'), ccq('132'), ccq('149'), ccq('583')],
  },
  blocks: [
    {
      id: 'origins',
      icon: 'search',
      title: 'Connaître ses origines, se retrouver',
      body:
        'Une personne adoptée peut demander le résumé de son histoire (ses **antécédents sociobiologiques**), le nom de ses parents d’origine et une copie de son acte primitif. Les règles ont changé le 8 juin 2024, en faveur des personnes adoptées. Le contact, lui, n’a lieu que si l’autre personne ne le refuse pas.',
      figures: [
        { value: '14 ans', label: 'pour faire la demande sans l’accord de ses parents' },
        { value: '30 jours', label: 'après la naissance : délai maximal pour qu’un parent d’origine refuse que son nom soit révélé' },
        { value: '18 ans', label: 'âge où ce refus prend fin, même s’il date d’avant 2024' },
      ],
      points: [
        'La personne adoptée et le parent d’origine peuvent aussi **refuser le contact**, ou le permettre à leurs conditions. Ne pas respecter ce refus peut coûter des dommages-intérêts.',
        'Sauf si le refus d’un parent d’origine est encore en vigueur, la personne adoptée peut aussi obtenir le nom de ses frères et sœurs d’origine majeurs et de ses grands-parents d’origine. Leurs coordonnées : seulement s’ils sont d’accord.',
        'Parent d’origine : une fois l’enfant majeur, vous pouvez demander son nom et ses coordonnées. Il est d’abord prévenu et peut refuser le contact. S’il a été adopté avant le 16 juin 2018, son identité reste protégée, sauf s’il accepte.',
        'Copie de l’acte primitif (personne née au Québec) : obtenez d’abord une attestation du service des origines, puis faites la demande par la poste au Directeur de l’état civil (64,25 $).',
        'Adoption au Québec : adressez-vous au service des origines de la région de l’adoption. Adoption hors Québec : au SASIE.',
      ],
      refs: [ccq('583'), ccq('583.2'), ccq('583.4'), ccq('583.5'), ccq('583.6'), ccq('583.10')],
      sources: [`${S}qc-origins-bill2`, `${S}qc-origins-services`, `${S}qc-origins-contacts`, `${S}dec-original-act`, `${S}bill2`, 'msss-origins-guide', 'ccq-book2'],
    },
    {
      id: 'contact',
      icon: 'heart-hand',
      title: 'Garder le lien : l’entente de communication',
      body:
        'Lors d’une adoption au Québec, les parents adoptifs et des membres de la famille d’origine peuvent prévoir **par écrit** des échanges de nouvelles ou des rencontres, si c’est dans l’intérêt de l’enfant.',
      figures: [
        { value: '10 ans', label: 'l’enfant doit être d’accord' },
        { value: '14 ans', label: 'son accord est toujours requis, et il peut y mettre fin quand il veut' },
      ],
      points: [
        'Une photo par année, des lettres, des appels ou des visites : tout moyen qui convient. Se voir en personne n’est pas obligatoire.',
        'Si l’enfant de 10 à 13 ans refuse, ou si les adultes ne s’entendent pas, le tribunal peut décider, mais seulement pour un parent ou un grand-parent d’origine important pour l’enfant.',
        'Avant l’ordonnance de placement, la DPJ vous aide à préparer l’entente. Après, la médiation familiale est gratuite avec un médiateur accrédité : jusqu’à 5 heures pour conclure une entente, et jusqu’à 2 h 30 pour la revoir ou régler un désaccord.',
        'Si vous prévoyez seulement des échanges de nouvelles, la DPJ les facilite si vous le demandez, jusqu’aux 18 ans de l’enfant. Elle arrête si l’une des personnes le demande.',
      ],
      refs: [ccq('579'), lpj('71.3.4')],
      sources: [`${S}qc-contact-agreement`, `${S}qc-mediation`, `${S}bill2`, 'ccq-book2'],
    },
    {
      id: 'support',
      icon: 'shield',
      title: 'Du soutien, longtemps après',
      body:
        'Adopter, être adopté ou avoir confié son enfant à l’adoption soulève des questions qui reviennent au fil des ans. Vous n’avez pas à y faire face sans aide.',
      points: [
        'Votre CISSS ou CIUSSS offre aux familles adoptives les mêmes services qu’à tous : suivi familial, parental ou individuel, développement de l’enfant, santé physique et mentale.',
        'Adoption au Québec : dès le placement, la DPJ prévoit des rencontres pour soutenir l’intégration de l’enfant. Adoption internationale : une intervenante ou un intervenant vous visite dans les 14 jours après l’arrivée.',
        'Pendant une recherche des origines, le service vous accompagne : réfléchir, préparer des retrouvailles, servir d’intermédiaire, vous soutenir si la recherche n’aboutit pas.',
        'Info-Social 811 (option 2) : conseils gratuits et confidentiels, 24 h sur 24.',
        'Des organismes communautaires en adoption offrent des groupes d’échange, des webinaires et des lignes d’écoute.',
        'La loi confie aux parents adoptifs le soin de dire à l’enfant qu’il a été adopté, et de lui expliquer les règles sur l’identité et le contact. Parlez-en tôt, avec des mots simples.',
      ],
      refs: [ccq('583.11')],
      sources: [`${S}qc-post-adoption`, `${S}qc-origins-services`, `${S}qc-811`],
    },
    {
      id: 'rqap',
      icon: 'family',
      title: 'Prestations du RQAP',
      body:
        'Si vous travaillez, le Régime québécois d’assurance parentale peut vous verser des prestations quand l’enfant arrive chez vous. Vous choisissez le **régime de base** (plus de semaines) ou le **régime particulier** (moins de semaines, mieux payées). Ci-dessous : le régime de base.',
      figures: [
        { value: '5', label: 'semaines pour chaque parent, à 70 % du revenu' },
        { value: '13', label: 'semaines d’accueil et de soutien à partager, à 70 %' },
        { value: '32', label: 'semaines d’adoption à partager : 7 à 70 %, puis 25 à 55 %' },
      ],
      points: [
        'Régime particulier : 3 semaines par parent, puis 12 et 25 semaines à partager, toutes à 75 % du revenu.',
        'En prime : 4 semaines de plus à partager si chaque parent a reçu au moins 8 semaines d’adoption partageables (régime particulier : 3 semaines, après 6). Parent seul : 5 semaines de plus (3 au régime particulier).',
        'Les prestations commencent au plus tôt la semaine de l’arrivée de l’enfant, ou 5 semaines avant pour une adoption hors Québec. Sauf exception, elles finissent au plus tard 78 semaines après l’arrivée.',
        '« Arrivée » : en général, le jour où l’enfant est placé chez vous, Banque mixte comprise. Adoption dans la famille, ou enfant qui vit déjà dans votre famille d’accueil : le jour où la demande d’ordonnance de placement est déposée au tribunal.',
        'Il faut notamment avoir au moins 2 000 $ de revenus assurables. Les deux parents ont le même régime : le premier qui fait sa demande choisit pour les deux, et ce choix ne peut plus changer, sauf circonstances exceptionnelles.',
        'Vous adoptez l’enfant de votre conjoint ? Vérifiez d’abord votre admissibilité auprès du RQAP.',
      ],
      refs: [{ label: 'Loi sur l’assurance parentale', url: `${LQ}A-29.011` }],
      sources: [`${S}rqap-plans`, `${S}rqap-eligibility`, `${S}rqap-planning`, `${S}rqap-apply`],
    },
    {
      id: 'leave',
      icon: 'clock',
      title: 'Congés au travail',
      body:
        'La Loi sur les normes du travail protège votre emploi quand vous adoptez. Ces congés sont **sans salaire**, sauf les 2 premiers jours. Pendant le congé, le RQAP peut remplacer une partie de votre revenu.',
      figures: [
        { value: '5', label: 'jours d’absence, dont les 2 premiers payés' },
        { value: '5', label: 'semaines de congé de paternité, offert aussi aux parents adoptifs' },
        { value: '65', label: 'semaines de congé parental' },
      ],
      points: [
        'Les 5 jours se prennent dans les 15 jours après l’arrivée de l’enfant chez vous. Prévenez votre employeur le plus tôt possible.',
        'Chaque parent salarié qui adopte a droit à ces deux congés, et le congé parental peut suivre le congé de paternité. Vous adoptez l’enfant de votre conjoint ? Vérifiez vos droits auprès de la CNESST.',
        'Adoption hors Québec : ces deux congés peuvent commencer la semaine où vous partez chercher l’enfant.',
        'Le congé de paternité finit au plus tard 78 semaines après l’arrivée de l’enfant ; le congé parental, en général, 85 semaines après.',
        'Donnez un avis écrit à votre employeur au moins 3 semaines avant le début du congé.',
        'Employeur sous compétence fédérale (banque, transport aérien…) ? D’autres règles s’appliquent. Votre convention collective peut aussi offrir plus.',
      ],
      refs: [lnt('81.1'), lnt('81.2'), lnt('81.10'), lnt('81.11'), lnt('81.12')],
      sources: [`${S}educaloi-leave`, `${S}bill12`],
    },
    {
      id: 'tax',
      icon: 'doc',
      title: 'Crédits d’impôt pour frais d’adoption',
      body:
        'Une partie de vos frais d’adoption peut vous revenir : un crédit **remboursable** du Québec et un crédit **non remboursable** du fédéral. Gardez toutes vos factures.',
      figures: [
        { value: '50 %', label: 'des frais admissibles, crédit du Québec (année 2025)' },
        { value: '10 000 $', label: 'crédit maximal du Québec par enfant (20 000 $ de frais)' },
      ],
      points: [
        '« Remboursable » veut dire que vous recevez le montant même si vous n’avez pas d’impôt à payer.',
        'Québec : demandez-le pour l’année où l’adoption est prononcée ou reconnue au Québec (ligne 462 de la déclaration).',
        'Fédéral : pour 2025, jusqu’à 19 580 $ de frais par enfant (ligne 31300). Ce crédit réduit votre impôt, sans remboursement au-delà.',
        'Quels frais comptent ? Vérifiez la liste de Revenu Québec et de l’Agence du revenu du Canada avant de faire votre déclaration.',
      ],
      sources: [`${S}rq-adoption-credit`, `${S}cra-adoption-expenses`],
    },
  ],
}
