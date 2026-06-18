import { useGame } from '@/state/store'

/** The native status row: clock + a working FR · EN language toggle. */
export function StatusBar() {
  const locale = useGame((s) => s.locale)
  const toggleLocale = useGame((s) => s.toggleLocale)

  return (
    <div className="flex items-center justify-between px-6 pt-3 font-mono text-[11px] text-ink-muted">
      <span className="pwa-clock">9:41</span>
      <button onClick={toggleLocale} className="tracking-[0.12em]" aria-label="Toggle language">
        <span className={locale === 'fr' ? 'text-ink' : ''}>FR</span>
        <span className="px-1">·</span>
        <span className={locale === 'en' ? 'text-ink' : ''}>EN</span>
      </button>
    </div>
  )
}
