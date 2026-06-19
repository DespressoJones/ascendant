import { motion } from 'motion/react'
import { useGame } from '@/state/store'
import { SKILL_BY_ID } from '@/domain/skills'
import { L, sections, ui } from '@/lib/i18n'
import { Eyebrow } from '@/components/Eyebrow'
import { pageContainer, pageItem, spring } from '@/motion/motion'
import type { Quest } from '@/domain/types'

function QuestRow({ quest }: { quest: Quest }) {
  const locale = useGame((s) => s.locale)
  const complete = useGame((s) => s.completeQuest)
  const skill = SKILL_BY_ID[quest.skill]
  const counted = (quest.target ?? 1) > 1
  const meta = `+${quest.xp} XP${counted ? ` · ${quest.progress ?? 0} / ${quest.target}` : ''}`

  return (
    <div
      className={`rounded-[12px] border border-line bg-surface-raised px-4 py-4 ${quest.done ? 'opacity-55' : ''}`}
      style={{ borderLeftWidth: 2, borderLeftColor: 'var(--w-accent)' }}
    >
      <Eyebrow>{L(skill.name, locale)}</Eyebrow>
      <p className="mt-2 font-serif text-[17px] leading-[1.3]">{L(quest.title, locale)}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[11px] text-ink-muted">{meta}</span>
        <motion.button
          whileTap={{ scale: 0.96 }}
          transition={spring.press}
          onClick={() => complete(quest.id)}
          disabled={quest.done}
          className="rounded-full border border-[color:var(--w-hairline-strong)] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] disabled:opacity-100"
        >
          {quest.done ? <span className="text-accent">{L(ui.done, locale)}</span> : L(sections.complete, locale)}
        </motion.button>
      </div>
    </div>
  )
}

function Group({ label, quests }: { label: string; quests: Quest[] }) {
  if (!quests.length) return null
  return (
    <motion.div variants={pageItem} className="mt-6">
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-3 space-y-3">
        {quests.map((q) => (
          <QuestRow key={q.id} quest={q} />
        ))}
      </div>
    </motion.div>
  )
}

export function QuestsScreen() {
  const locale = useGame((s) => s.locale)
  const quests = useGame((s) => s.quests)

  return (
    <motion.main variants={pageContainer} initial="hidden" animate="show" className="px-6 pb-10 pt-5">
      <motion.div variants={pageItem}>
        <h1 className="font-serif text-[28px] leading-[1.1]">{L(sections.questsTitle, locale)}</h1>
        <p className="mt-2 text-[13px] text-ink-muted">{L(sections.questsLede, locale)}</p>
      </motion.div>
      <Group label={L(sections.live, locale)} quests={quests.filter((q) => q.kind === 'live')} />
      <Group label={L(sections.daily, locale)} quests={quests.filter((q) => q.kind === 'daily')} />
      <Group label={L(sections.challenge, locale)} quests={quests.filter((q) => q.kind === 'challenge')} />
    </motion.main>
  )
}
