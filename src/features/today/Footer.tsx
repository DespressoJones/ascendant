import { useGame } from '@/state/store'
import { L, ui } from '@/lib/i18n'
import type { WorldId } from '@/domain/types'

const WORLDS: { id: WorldId; label: string }[] = [
  { id: 'ink', label: 'Ink' },
  { id: 'bronze', label: 'Bronze' },
  { id: 'atelier', label: 'Atelier' },
  { id: 'paper', label: 'Paper' },
]

/** Streak line + a live world switcher that proves the token-driven theming engine. */
export function Footer() {
  const locale = useGame((s) => s.locale)
  const tended = useGame((s) => s.streakDays)
  const world = useGame((s) => s.world)
  const setWorld = useGame((s) => s.setWorld)

  return (
    <footer className="mt-5 flex items-center justify-between">
      <span className="font-serif text-[13px] italic text-ink-muted">
        {tended} {L(ui.tended, locale)}
      </span>
      <div className="flex items-center gap-2" role="group" aria-label="Theme world">
        {WORLDS.map((w) => (
          <button
            key={w.id}
            onClick={() => setWorld(w.id)}
            aria-label={w.label}
            aria-pressed={world === w.id}
            className="h-[7px] w-[7px] rounded-full transition-colors"
            style={{ backgroundColor: world === w.id ? 'var(--w-accent)' : 'var(--w-hairline-strong)' }}
          />
        ))}
      </div>
    </footer>
  )
}
