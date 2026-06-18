import { motion, useReducedMotion } from 'motion/react'
import { duration, ease } from '@/motion/motion'
import type { TierStage } from '@/domain/types'

/*
  THE GUARDIAN FAMILIAR — a standing crane rendered as ink gesture.
  An elongated, gradient-filled body (volume, not a flat disc), a folded wing of two
  arcs, a rising S-neck, trailing tail plumes, and thin legs. Strokes are luminous bone
  (--w-fam-stroke); the only colour is the single vermilion eye (--w-fam-aura). On mount
  the strokes "paint on"; at rest the form breathes on a slow 6s sine. Higher tiers reveal
  more of the bird. Honours prefers-reduced-motion (settled + still).
*/

interface Stroke {
  d: string
  w: number
  o: number
}

const STROKES: Stroke[] = [
  { d: 'M186 146 C 178 118 188 86 170 64', w: 5, o: 0.92 }, // neck (rises from chest)
  { d: 'M170 64 C 165 58 160 58 158 62', w: 5, o: 0.95 }, // head
  { d: 'M159 60 L 141 51', w: 2.4, o: 0.95 }, // beak
  { d: 'M112 161 C 140 139 172 141 197 150', w: 5, o: 0.9 }, // wing, outer arc
  { d: 'M121 168 C 145 152 169 152 189 158', w: 3, o: 0.55 }, // wing, inner arc
  { d: 'M104 166 C 84 168 70 174 56 184', w: 3, o: 0.5 }, // tail plume
  { d: 'M106 172 C 88 176 76 182 64 192', w: 2.4, o: 0.36 }, // tail plume
  { d: 'M151 184 C 150 200 147 212 151 230', w: 2, o: 0.8 }, // leg
  { d: 'M167 183 C 169 200 173 212 168 230', w: 2, o: 0.8 }, // leg
]

const BODY =
  'M100 168 C 108 144 150 132 188 144 C 202 148 204 160 194 170 C 162 188 116 188 100 168 Z'
const FEET = 'M151 230 l -8 5 M151 230 l 7 5 M168 230 l -8 5 M168 230 l 7 5'
const SPLATTER = [
  { cx: 58, cy: 150, r: 2, o: 0.5 },
  { cx: 48, cy: 140, r: 1.4, o: 0.4 },
  { cx: 208, cy: 150, r: 1.6, o: 0.45 },
  { cx: 214, cy: 168, r: 1.3, o: 0.33 },
]

const STROKE_COUNT: Record<TierStage, number> = { 1: 3, 2: 5, 3: 7, 4: 9, 5: 9 }

interface FamiliarProps {
  stage?: TierStage
  /** suppress the idle breath (e.g. in a small list) */
  still?: boolean
  className?: string
}

export function Familiar({ stage = 4, still = false, className }: FamiliarProps) {
  const reduce = useReducedMotion() ?? false
  const animate = !reduce && !still

  const visible = STROKES.slice(0, STROKE_COUNT[stage])
  const showAura = stage >= 3
  const showHead = stage >= 2
  const showSplatter = stage >= 4

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: 'center 64%' }}
      animate={animate ? { scale: [1, 1.014, 1] } : undefined}
      transition={animate ? { duration: duration.breath, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <svg viewBox="0 0 280 250" width="100%" role="img" aria-label="Your familiar, a crane painted in ink">
        <title>The familiar</title>
        <defs>
          <linearGradient id="famBody" x1="0.15" y1="0" x2="0.7" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--w-fam-stroke)', stopOpacity: 0.95 }} />
            <stop offset="1" style={{ stopColor: 'var(--w-fam-stroke)', stopOpacity: 0.46 }} />
          </linearGradient>
        </defs>

        <g style={{ color: 'var(--w-fam-stroke)' }}>
          {showAura && (
            <>
              <motion.ellipse
                cx="148"
                cy="150"
                rx="96"
                ry="80"
                style={{ fill: 'var(--w-fam-aura)' }}
                initial={{ opacity: 0.06 }}
                animate={animate ? { opacity: [0.06, 0.085, 0.06] } : undefined}
                transition={animate ? { duration: duration.breath, repeat: Infinity, ease: 'easeInOut' } : undefined}
              />
              <ellipse cx="148" cy="152" rx="60" ry="50" style={{ fill: 'var(--w-fam-aura)' }} opacity={0.05} />
            </>
          )}

          <motion.path
            d={BODY}
            fill="url(#famBody)"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease: ease.entrance, delay: 0.1 }}
          />

          {visible.map((s, i) => (
            <motion.path
              key={s.d}
              d={s.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={s.w}
              strokeLinecap="round"
              initial={reduce ? { pathLength: 1, opacity: s.o } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: s.o }}
              transition={{
                pathLength: { duration: 0.7, ease: ease.entrance, delay: 0.15 + i * 0.06 },
                opacity: { duration: 0.3, delay: 0.15 + i * 0.06 },
              }}
            />
          ))}

          {stage >= 2 && (
            <path d={FEET} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" opacity={0.8} />
          )}

          {showHead && <circle cx="165" cy="62" r="2.6" style={{ fill: 'var(--w-fam-aura)' }} />}

          {showSplatter &&
            SPLATTER.map((p) => (
              <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r={p.r} fill="currentColor" opacity={p.o} />
            ))}
        </g>
      </svg>
    </motion.div>
  )
}
