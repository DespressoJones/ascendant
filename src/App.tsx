import { useEffect } from 'react'
import { useGame } from '@/state/store'
import { TodayScreen } from '@/features/today/TodayScreen'

export default function App() {
  const world = useGame((s) => s.world)
  const locale = useGame((s) => s.locale)

  // Drive the active world + language from the store onto <html>.
  useEffect(() => {
    document.documentElement.dataset.world = world
  }, [world])
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Mobile-first: a centered phone-width column on larger screens, full-bleed on phones.
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px]">
      <TodayScreen />
    </div>
  )
}
