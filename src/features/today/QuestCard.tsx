import { motion } from 'motion/react'
import { useGame } from '@/state/store'
import { SKILL_BY_ID } from '@/domain/skills'
import { L, ui } from '@/lib/i18n'
import { Eyebrow } from '@/components/Eyebrow'
import { spring } from '@/motion/motion'

/** The day's generated quest. Begin awards real XP and re-inks the named stroke. */
export function QuestCard() {
  const locale = useGame((s) => s.locale)
  const quest = useGame((s) => s.quest)
  const completeQuest = useGame((s) => s.completeQuest)

  const skill = SKILL_BY_ID[quest.skill]
  const meta = `+${quest.xp} XP · ${L(ui.reinks, locale)} ${L(skill.familiarPart, locale)} · ${L(quest.detail, locale)}`

  return (
    <div className="rounded-[12px] border border-l-2 border-line border-l-accent bg-surface-raised px-4 py-4">
      <Eyebrow>
        {L(ui.questEyebrow, locale)} · {L(skill.name, locale)}
      </Eyebrow>
      <p className="mt-2 font-serif text-[18px] leading-[1.35]">{L(quest.title, locale)}</p>
      <p className="mt-2 font-sans text-[12px] leading-[1.5] text-ink-muted">{meta}</p>
      <div className="mt-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={spring.press}
          onClick={completeQuest}
          disabled={quest.done}
          className="inline-flex items-center rounded-full border border-[color:var(--w-hairline-strong)] px-4 py-[7px] text-[11px] uppercase tracking-[0.22em] disabled:opacity-100"
        >
          {quest.done ? <span className="text-accent">{L(ui.done, locale)}</span> : L(ui.begin, locale)}
        </motion.button>
      </div>
    </div>
  )
}
