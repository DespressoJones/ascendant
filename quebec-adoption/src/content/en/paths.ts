// Researched content — verified 2026-11-13
import type { Paths } from '../types'
import { hospital } from './paths/hospital'
import { home } from './paths/home'
import { family } from './paths/family'
import { adopt } from './paths/adopt'
import { abroad } from './paths/abroad'
import { after } from './paths/after'

export const paths: Paths = {
  eyebrow: 'Your situation',
  title: 'Find your path, one step at a time.',
  lede:
    'Choose the situation that sounds like yours. You will see, in order, what happens, who is involved, your rights and the deadlines to watch. **Reading this guide commits you to nothing.**',
  pickerLabel: 'Where are you starting from?',
  stepWord: 'Step',
  ofWord: 'of',
  whoLabel: 'Who’s involved',
  rightsLabel: 'Your rights',
  watchLabel: 'Watch out',
  detailsLabel: 'More details',
  backToPicker: 'Choose another situation',
  journeys: [hospital, home, family, adopt, abroad, after],
}
