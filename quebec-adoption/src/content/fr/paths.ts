// Researched content — verified 2026-11-13
import type { Paths } from '../types'
import { hospital } from './paths/hospital'
import { home } from './paths/home'
import { family } from './paths/family'
import { adopt } from './paths/adopt'
import { abroad } from './paths/abroad'
import { after } from './paths/after'

export const paths: Paths = {
  eyebrow: 'Votre situation',
  title: 'Trouvez votre chemin, une étape à la fois.',
  lede:
    'Choisissez la situation qui vous ressemble. Vous verrez, dans l’ordre, ce qui se passe, qui est impliqué, vos droits et les délais à surveiller. **Lire ce guide ne vous engage à rien.**',
  pickerLabel: 'Où en êtes-vous ?',
  stepWord: 'Étape',
  ofWord: 'sur',
  whoLabel: 'Qui est impliqué',
  rightsLabel: 'Vos droits',
  watchLabel: 'Attention',
  detailsLabel: 'En savoir plus',
  backToPicker: 'Changer de situation',
  journeys: [hospital, home, family, adopt, abroad, after],
}
