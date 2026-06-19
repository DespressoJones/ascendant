import { motion } from 'motion/react'
import { useGame } from '@/state/store'
import { overallLevel, roman, tierStage } from '@/domain/xp'
import { titleFor } from '@/domain/titles'
import { L, lb, sections, stageLabels, ui } from '@/lib/i18n'
import { Eyebrow } from '@/components/Eyebrow'
import { Familiar } from '@/components/Familiar'
import { pageContainer, pageItem } from '@/motion/motion'
import type { TierStage } from '@/domain/types'

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-[12px] border border-line bg-surface-raised px-4 py-3">
      <div className="font-serif text-[24px] leading-none tabular-nums">{value}</div>
      <div className="mt-2">
        <Eyebrow>{label}</Eyebrow>
      </div>
    </div>
  )
}

function Leaderboard() {
  const locale = useGame((s) => s.locale)
  const skills = useGame((s) => s.skills)
  const overall = overallLevel(skills)
  const totalXp = skills.reduce((a, k) => a + k.xp, 0)

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Eyebrow>{L(lb.title, locale)}</Eyebrow>
        <Eyebrow>{L(lb.realOnly, locale)}</Eyebrow>
      </div>
      <div
        className="mt-3 flex items-center gap-3 rounded-[12px] border border-line bg-surface-raised px-4 py-3"
        style={{ borderLeftWidth: 2, borderLeftColor: 'var(--w-accent)' }}
      >
        <span className="font-serif text-[22px] text-accent">1</span>
        <span className="flex-1">
          <span className="block font-sans text-[14px]">{L(lb.you, locale)}</span>
          <span className="block font-mono text-[11px] text-ink-muted">
            {L(titleFor(overall), locale)} · {L(ui.tier, locale)} {roman(tierStage(overall))}
          </span>
        </span>
        <span className="font-mono text-[12px] text-ink-soft">{totalXp.toLocaleString()} XP</span>
      </div>
      <p className="mt-3 text-[12px] leading-[1.6] text-ink-muted">{L(lb.body, locale)}</p>
      <div className="mt-3">
        <span className="inline-block rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {L(lb.soon, locale)}
        </span>
      </div>
    </div>
  )
}

export function ProfileScreen() {
  const locale = useGame((s) => s.locale)
  const skills = useGame((s) => s.skills)
  const streak = useGame((s) => s.streakDays)
  const overall = overallLevel(skills)
  const stage = tierStage(overall)
  const totalXp = skills.reduce((a, k) => a + k.xp, 0)

  return (
    <motion.main variants={pageContainer} initial="hidden" animate="show" className="px-6 pb-10 pt-5">
      <motion.div variants={pageItem} className="flex flex-col items-center">
        <Familiar stage={stage} className="w-[176px]" />
        <div className="mt-1 font-serif text-[40px] leading-none">{L(titleFor(overall), locale)}</div>
        <div className="mt-2">
          <Eyebrow>
            {L(ui.tier, locale)} {roman(stage)} · {L(sections.standing, locale)}
          </Eyebrow>
        </div>
      </motion.div>

      <motion.div variants={pageItem} className="mt-6 flex gap-3">
        <Metric label={L(sections.totalXp, locale)} value={totalXp.toLocaleString()} />
        <Metric label={L(sections.streak, locale)} value={String(streak)} />
      </motion.div>

      <motion.div variants={pageItem} className="mt-8">
        <Eyebrow>{L(sections.codex, locale)}</Eyebrow>
        <p className="mt-1 text-[12px] text-ink-muted">{L(sections.evolution, locale)}</p>
        <div className="mt-3 flex justify-between gap-1">
          {([1, 2, 3, 4, 5] as TierStage[]).map((st) => (
            <div key={st} className="flex flex-1 flex-col items-center" style={{ opacity: st === stage ? 1 : 0.38 }}>
              <Familiar stage={st} still className="w-full" />
              <span
                className={`mt-1 text-[10px] uppercase tracking-[0.1em] ${st === stage ? 'text-accent' : 'text-ink-muted'}`}
              >
                {L(stageLabels[st - 1], locale)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={pageItem} className="mt-8">
        <Leaderboard />
      </motion.div>
    </motion.main>
  )
}
