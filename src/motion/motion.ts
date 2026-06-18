import type { Transition, Variants } from 'motion/react'

/*
  THE MOTION LANGUAGE.
  One vocabulary, used everywhere. Motion is a feature here, not decoration —
  every state change pulls from these so the whole app moves with one intent.
*/

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.28,
  slow: 0.45,
  cinematic: 0.9,
  /** the familiar's idle "breath" — slow enough to read as alive, never a pulse */
  breath: 6,
} as const

/** cubic-bezier curves. standard = settle; entrance = decisive arrival; exit = leave fast */
export const ease: Record<'standard' | 'entrance' | 'exit', [number, number, number, number]> = {
  standard: [0.2, 0.8, 0.2, 1],
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
}

export const spring: Record<'soft' | 'press' | 'stamp', Transition> = {
  soft: { type: 'spring', stiffness: 120, damping: 20 },
  press: { type: 'spring', stiffness: 300, damping: 22 },
  /** percussive — the chop-stamp / tier-up beat */
  stamp: { type: 'spring', stiffness: 420, damping: 26 },
}

export const stagger = { ledger: 0.045, sections: 0.06 } as const

/* The page "sets" like print being laid down: each block fades + rises, staggered. */
export const pageContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger.sections, delayChildren: 0.04 } },
}

export const pageItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.entrance },
  },
}
