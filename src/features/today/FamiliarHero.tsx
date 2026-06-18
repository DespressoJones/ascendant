import { motion } from 'motion/react'
import { Familiar } from '@/components/Familiar'
import { useGame } from '@/state/store'
import { overallLevel, tierStage } from '@/domain/xp'
import { coach, L } from '@/lib/i18n'

/** The hero: the living familiar at its current stage + one line in the guide's voice. */
export function FamiliarHero() {
  const locale = useGame((s) => s.locale)
  const skills = useGame((s) => s.skills)
  const done = useGame((s) => s.quest.done)

  const stage = tierStage(overallLevel(skills))
  const line = done ? coach.questDone : coach.morning

  return (
    <div className="flex flex-col items-center">
      <Familiar stage={stage} className="w-[240px]" />
      <motion.p
        key={done ? 'done' : 'morning'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-2 text-center font-serif text-[15.5px] italic leading-[1.5] text-ink-soft"
      >
        {L(line, locale)}
      </motion.p>
    </div>
  )
}
