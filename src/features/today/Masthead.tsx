import { useGame } from '@/state/store'
import { L, ui } from '@/lib/i18n'
import { overallLevel, roman, tierStage } from '@/domain/xp'
import { Eyebrow } from '@/components/Eyebrow'

/** Dateline + the two-tone serif masthead ("Today / the work"). */
export function Masthead() {
  const locale = useGame((s) => s.locale)
  const skills = useGame((s) => s.skills)

  const stage = tierStage(overallLevel(skills))
  const now = new Date()
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(now)
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(now)
  const dateline = `${weekday} · ${now.getDate()} ${month} · ${L(ui.tier, locale)} ${roman(stage)}`

  return (
    <header>
      <Eyebrow>{dateline}</Eyebrow>
      <h1 className="mt-2 font-serif text-[33px] font-normal leading-[1.05]">
        {L(ui.mastheadLead, locale)}
        <span className="italic text-ink-muted"> {L(ui.mastheadTrail, locale)}</span>
      </h1>
    </header>
  )
}
