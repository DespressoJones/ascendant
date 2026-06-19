import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useGame } from '@/state/store'
import { SKILLS } from '@/domain/skills'
import { levelProgress } from '@/domain/xp'
import { L, sections } from '@/lib/i18n'
import { duration, ease, pageContainer, pageItem } from '@/motion/motion'
import type { SkillState } from '@/domain/types'

export function SkillsScreen() {
  const locale = useGame((s) => s.locale)
  const skills = useGame((s) => s.skills)
  const byId = Object.fromEntries(skills.map((k) => [k.id, k])) as Record<string, SkillState>
  const [open, setOpen] = useState<string | null>(null)

  return (
    <motion.main variants={pageContainer} initial="hidden" animate="show" className="px-6 pb-10 pt-5">
      <motion.div variants={pageItem}>
        <h1 className="font-serif text-[28px] leading-[1.1]">{L(sections.skillsTitle, locale)}</h1>
        <p className="mt-2 text-[13px] text-ink-muted">{L(sections.skillsLede, locale)}</p>
      </motion.div>

      <motion.div variants={pageItem} className="mt-5 space-y-2.5">
        {SKILLS.map((def) => {
          const st = byId[def.id]
          const { into, span, ratio } = levelProgress(st)
          const isOpen = open === def.id
          return (
            <div key={def.id} className="rounded-[12px] border border-line bg-surface-raised">
              <button
                onClick={() => setOpen(isOpen ? null : def.id)}
                className="flex w-full items-center gap-4 px-4 py-3 text-left"
              >
                <span className="w-9 font-serif text-[26px] leading-none tabular-nums">{st.level}</span>
                <span className="flex-1">
                  <span className="block font-sans text-[14px]">{L(def.name, locale)}</span>
                  <span className="mt-2 block h-[2px] rounded-full bg-line">
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${Math.round(ratio * 100)}%` }} />
                  </span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">{def.group}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: duration.base, ease: ease.standard }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 border-t border-line px-4 py-3 text-[12px] leading-[1.6] text-ink-muted">
                      <div className="flex justify-between">
                        <span>{L(sections.brightens, locale)}</span>
                        <span className="text-ink-soft">{L(def.familiarPart, locale)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono">
                          {into} / {span} XP
                        </span>
                        <span>{L(sections.intoLevel, locale)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </motion.div>
    </motion.main>
  )
}
