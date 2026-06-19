import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useGame } from '@/state/store'
import { L, nav } from '@/lib/i18n'
import { TodayScreen } from '@/features/today/TodayScreen'
import { QuestsScreen } from '@/features/quests/QuestsScreen'
import { SkillsScreen } from '@/features/skills/SkillsScreen'
import { ProfileScreen } from '@/features/profile/ProfileScreen'
import type { Localized } from '@/domain/types'

const TABS: { id: string; label: Localized; render: () => ReactNode }[] = [
  { id: 'today', label: nav.today, render: () => <TodayScreen /> },
  { id: 'quests', label: nav.quests, render: () => <QuestsScreen /> },
  { id: 'skills', label: nav.skills, render: () => <SkillsScreen /> },
  { id: 'profile', label: nav.profile, render: () => <ProfileScreen /> },
]

/* The app shell: a slim header, four gesture-paged sections (native scroll-snap), and a
   bottom tab bar. Each section scrolls vertically on its own. */
export function AppShell() {
  const locale = useGame((s) => s.locale)
  const toggleLocale = useGame((s) => s.toggleLocale)
  const cycleWorld = useGame((s) => s.cycleWorld)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    setActive(i)
    // Instant snap is reliable with mandatory snap; native swipe provides the smooth paging.
    el.scrollTo({ left: i * el.clientWidth })
  }
  const onScroll = () => {
    const el = trackRef.current
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div
      className="flex flex-col bg-canvas text-ink"
      style={{ height: 'calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom))' }}
    >
      <header className="flex items-center justify-between px-6 pb-2 pt-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">Ascendant</span>
        <div className="flex items-center gap-4">
          <button onClick={cycleWorld} aria-label="Cycle theme" className="h-[11px] w-[11px] rounded-full bg-accent" />
          <button
            onClick={toggleLocale}
            className="font-mono text-[11px] tracking-[0.12em] text-ink-muted"
            aria-label="Toggle language"
          >
            <span className={locale === 'fr' ? 'text-ink' : ''}>FR</span>
            <span className="px-1">·</span>
            <span className={locale === 'en' ? 'text-ink' : ''}>EN</span>
          </button>
        </div>
      </header>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {TABS.map((t) => (
          <section key={t.id} className="no-scrollbar h-full w-full shrink-0 snap-start overflow-y-auto">
            {t.render()}
          </section>
        ))}
      </div>

      <nav className="flex border-t border-line">
        {TABS.map((t, i) => (
          <button key={t.id} onClick={() => goTo(i)} className="relative flex-1 py-3.5 text-center">
            {active === i && <span className="absolute inset-x-0 top-0 mx-auto h-[2px] w-8 bg-accent" />}
            <span
              className={`text-[11px] uppercase tracking-[0.16em] ${active === i ? 'text-ink' : 'text-ink-muted'}`}
            >
              {L(t.label, locale)}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
