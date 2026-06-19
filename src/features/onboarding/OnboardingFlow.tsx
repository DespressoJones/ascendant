import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useGame } from '@/state/store'
import { L, onboarding as t, toneSample } from '@/lib/i18n'
import {
  CONSTRAINTS,
  CONTEXTS,
  EQUIPMENT,
  GOALS,
  TIME_OPTIONS,
  WORLD_SWATCHES,
} from '@/domain/onboarding'
import type { ConstraintId, ContextId, EquipmentId, GoalId, PlayerProfile } from '@/domain/types'
import { Familiar } from '@/components/Familiar'
import { Eyebrow } from '@/components/Eyebrow'
import { duration, ease, spring } from '@/motion/motion'

const STEPS = 8 // 0 intro · 1 goals · 2 time · 3 place · 4 constraints · 5 tone · 6 world · 7 reveal

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={spring.press}
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
        selected ? 'border-accent text-accent' : 'border-line text-ink-soft'
      }`}
      style={selected ? { backgroundColor: 'color-mix(in srgb, var(--w-accent) 10%, transparent)' } : undefined}
    >
      {children}
    </motion.button>
  )
}

function StepHead({ children, italic }: { children: ReactNode; italic?: ReactNode }) {
  return (
    <h1 className="font-serif text-[30px] font-normal leading-[1.1]">
      {children}
      {italic ? <span className="italic text-ink-muted"> {italic}</span> : null}
    </h1>
  )
}

export function OnboardingFlow() {
  const reduce = useReducedMotion() ?? false
  const locale = useGame((s) => s.locale)
  const toggleLocale = useGame((s) => s.toggleLocale)
  const world = useGame((s) => s.world)
  const setWorld = useGame((s) => s.setWorld)
  const completeOnboarding = useGame((s) => s.completeOnboarding)

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [goals, setGoals] = useState<GoalId[]>([])
  const [minutes, setMinutes] = useState<number | null>(null)
  const [context, setContext] = useState<ContextId | null>(null)
  const [equipment, setEquipment] = useState<EquipmentId | null>(null)
  const [constraints, setConstraints] = useState<ConstraintId[]>([])
  const [tone, setTone] = useState(0.5)

  const canContinue =
    step === 1 ? goals.length > 0 : step === 2 ? minutes != null : step === 3 ? context != null && equipment != null : true

  function go(delta: number) {
    setDir(delta)
    setStep((s) => Math.min(STEPS - 1, Math.max(0, s + delta)))
  }

  function finish() {
    const profile: PlayerProfile = {
      handle: 'you',
      goals,
      minutesPerDay: minutes ?? 20,
      context: context ?? 'home',
      equipment: equipment ?? 'none',
      constraints,
      tone,
      world,
      createdAt: '2026-06-19',
    }
    completeOnboarding(profile)
  }

  function next() {
    if (step === STEPS - 1) finish()
    else if (canContinue) go(1)
  }

  function toggle<T>(list: T[], v: T, set: (l: T[]) => void, max = Infinity) {
    if (list.includes(v)) set(list.filter((x) => x !== v))
    else if (list.length < max) set([...list, v])
  }

  const toneKey = tone < 0.34 ? 'gentle' : tone > 0.66 ? 'tough' : 'mid'

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      {/* top bar: back · progress · language */}
      <div className="flex items-center gap-3 px-6 pt-4">
        <button
          onClick={() => go(-1)}
          aria-label={L(t.back, locale)}
          className={`font-mono text-[13px] text-ink-muted transition-opacity ${step === 0 ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          ←
        </button>
        <div className="h-px flex-1 bg-line">
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: `${(step / (STEPS - 1)) * 100}%` }}
            transition={{ duration: duration.base, ease: ease.standard }}
          />
        </div>
        <button onClick={toggleLocale} className="font-mono text-[11px] tracking-[0.12em] text-ink-muted" aria-label="Toggle language">
          <span className={locale === 'fr' ? 'text-ink' : ''}>FR</span>
          <span className="px-1">·</span>
          <span className={locale === 'en' ? 'text-ink' : ''}>EN</span>
        </button>
      </div>

      {/* step content */}
      <div className="relative flex-1 overflow-hidden px-6">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -70) next()
              else if (info.offset.x > 70) go(-1)
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28 }}
            transition={{ duration: duration.base, ease: ease.standard }}
            className="flex h-full flex-col justify-center py-6"
          >
            {step === 0 && (
              <div className="flex flex-col items-center text-center">
                <Familiar stage={1} className="mb-4 w-[200px]" />
                <StepHead italic={L(t.introLeadItalic, locale)}>{L(t.introLead, locale)}</StepHead>
                <p className="mt-4 max-w-[20rem] font-serif text-[16px] italic leading-[1.5] text-ink-soft">
                  {L(t.introBody, locale)}
                </p>
              </div>
            )}

            {step === 1 && (
              <div>
                <Eyebrow>01</Eyebrow>
                <StepHead>{L(t.goalsTitle, locale)}</StepHead>
                <p className="mt-2 text-[13px] text-ink-muted">{L(t.goalsHint, locale)}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <Chip key={g.id} selected={goals.includes(g.id)} onClick={() => toggle(goals, g.id, setGoals, 3)}>
                      {L(g.label, locale)}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <Eyebrow>02</Eyebrow>
                <StepHead>{L(t.timeTitle, locale)}</StepHead>
                <p className="mt-2 text-[13px] text-ink-muted">{L(t.timeHint, locale)}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {TIME_OPTIONS.map((o) => (
                    <Chip key={o.minutes} selected={minutes === o.minutes} onClick={() => setMinutes(o.minutes)}>
                      {L(o.label, locale)}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <Eyebrow>03</Eyebrow>
                <StepHead italic={L(t.placeTitleItalic, locale)}>{L(t.placeTitle, locale)}</StepHead>
                <div className="mt-6 flex flex-wrap gap-2">
                  {CONTEXTS.map((c) => (
                    <Chip key={c.id} selected={context === c.id} onClick={() => setContext(c.id)}>
                      {L(c.label, locale)}
                    </Chip>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EQUIPMENT.map((e) => (
                    <Chip key={e.id} selected={equipment === e.id} onClick={() => setEquipment(e.id)}>
                      {L(e.label, locale)}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <Eyebrow>04</Eyebrow>
                <StepHead>{L(t.constraintsTitle, locale)}</StepHead>
                <p className="mt-2 text-[13px] text-ink-muted">{L(t.constraintsHint, locale)}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {CONSTRAINTS.map((c) => (
                    <Chip
                      key={c.id}
                      selected={constraints.includes(c.id)}
                      onClick={() => toggle(constraints, c.id, setConstraints)}
                    >
                      {L(c.label, locale)}
                    </Chip>
                  ))}
                  <Chip selected={constraints.length === 0} onClick={() => setConstraints([])}>
                    {L(t.none, locale)}
                  </Chip>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <Eyebrow>05</Eyebrow>
                <StepHead>{L(t.toneTitle, locale)}</StepHead>
                <div className="mt-8 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  <span>{L(t.toneGentle, locale)}</span>
                  <span>{L(t.toneTough, locale)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={tone}
                  onChange={(e) => setTone(Number(e.target.value))}
                  className="mt-2 w-full"
                  aria-label={L(t.toneTitle, locale)}
                />
                <p className="mt-8 min-h-[4.5rem] font-serif text-[16px] italic leading-[1.5] text-ink-soft">
                  {L(toneSample[toneKey], locale)}
                </p>
              </div>
            )}

            {step === 6 && (
              <div>
                <Eyebrow>06</Eyebrow>
                <StepHead>{L(t.worldTitle, locale)}</StepHead>
                <p className="mt-2 text-[13px] text-ink-muted">{L(t.worldHint, locale)}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {WORLD_SWATCHES.map((w) => (
                    <motion.button
                      key={w.id}
                      whileTap={{ scale: 0.97 }}
                      transition={spring.press}
                      onClick={() => setWorld(w.id)}
                      aria-pressed={world === w.id}
                      className="overflow-hidden rounded-[14px] border text-left"
                      style={{
                        backgroundColor: w.bg,
                        borderColor: world === w.id ? 'var(--w-accent)' : 'rgba(127,127,127,0.25)',
                        borderWidth: world === w.id ? 2 : 1,
                      }}
                    >
                      <div className="flex h-[88px] items-center justify-center">
                        <span className="h-9 w-9 rounded-full" style={{ backgroundColor: w.accent, opacity: 0.9 }} />
                      </div>
                      <div className="px-3 py-2 text-[12px]" style={{ color: w.ink }}>
                        {L(w.name, locale)}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col items-center text-center">
                <Familiar stage={2} className="mb-4 w-[200px]" />
                <Eyebrow>{L(t.revealEyebrow, locale)}</Eyebrow>
                <StepHead italic={L(t.revealTitleItalic, locale)}>{L(t.revealTitle, locale)}</StepHead>
                <p className="mt-4 max-w-[20rem] text-[13px] leading-[1.6] text-ink-muted">
                  {goals.map((g) => L(GOALS.find((x) => x.id === g)!.label, locale)).join(' · ')}
                  {goals.length ? ' · ' : ''}
                  {minutes ?? 20} min · {context ? L(CONTEXTS.find((c) => c.id === context)!.label, locale) : ''}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* footer continue */}
      <div className="px-6 pb-8 pt-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={spring.press}
          onClick={next}
          disabled={!canContinue}
          className="w-full rounded-full border border-accent/60 py-3 text-[12px] uppercase tracking-[0.22em] text-accent transition-opacity disabled:opacity-35"
        >
          {step === 0
            ? L(t.begin, locale)
            : step === STEPS - 1
              ? L(t.enter, locale)
              : L(t.continue, locale)}
        </motion.button>
      </div>
    </div>
  )
}
