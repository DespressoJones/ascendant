import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useGame } from '@/state/store'
import { TodayScreen } from '@/features/today/TodayScreen'
import { OnboardingFlow } from '@/features/onboarding/OnboardingFlow'
import { duration, ease } from '@/motion/motion'

export default function App() {
  const world = useGame((s) => s.world)
  const locale = useGame((s) => s.locale)
  const onboarded = useGame((s) => s.onboarded)

  // Drive the active world + language from the store onto <html>.
  useEffect(() => {
    document.documentElement.dataset.world = world
  }, [world])
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Mobile-first: a centered phone-width column on larger screens, full-bleed on phones.
  return (
    <div
      className="mx-auto min-h-dvh w-full max-w-[430px]"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <AnimatePresence mode="wait">
        {onboarded ? (
          <motion.div
            key="today"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.cinematic, ease: ease.entrance }}
          >
            <TodayScreen />
          </motion.div>
        ) : (
          <motion.div key="onboarding" exit={{ opacity: 0 }} transition={{ duration: duration.slow }}>
            <OnboardingFlow />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
