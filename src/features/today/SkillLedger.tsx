import { useGame } from '@/state/store'
import { SKILLS } from '@/domain/skills'
import { levelProgress } from '@/domain/xp'
import { L, ui } from '@/lib/i18n'
import { Eyebrow } from '@/components/Eyebrow'
import type { SkillState } from '@/domain/types'

/** The nine skills as a quiet typographic ledger; the active skill reads in accent. */
export function SkillLedger() {
  const locale = useGame((s) => s.locale)
  const skills = useGame((s) => s.skills)
  const activeSkill = useGame((s) => s.quest.skill)

  const byId = Object.fromEntries(skills.map((k) => [k.id, k])) as Record<string, SkillState>

  return (
    <section>
      <Eyebrow>{L(ui.nineSkills, locale)}</Eyebrow>
      <div className="mt-3 grid grid-cols-2 gap-x-[18px] gap-y-3">
        {SKILLS.map((def) => {
          const st = byId[def.id]
          const { ratio } = levelProgress(st)
          const active = def.id === activeSkill
          return (
            <div key={def.id}>
              <div className="flex items-baseline justify-between">
                <span className={`font-sans text-[12px] ${active ? 'text-ink' : 'text-ink-soft'}`}>
                  {L(def.name, locale)}
                </span>
                <span className={`font-mono text-[11px] ${active ? 'text-accent' : 'text-ink-muted'}`}>
                  {st.level}
                </span>
              </div>
              <div className="mt-[6px] h-[2px] rounded-full bg-line">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round(ratio * 100)}%`,
                    backgroundColor: active ? 'var(--w-accent)' : 'var(--w-ink-soft)',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
