import { motion } from 'motion/react'
import { pageContainer, pageItem } from '@/motion/motion'
import { Hairline } from '@/components/Hairline'
import { StatusBar } from './StatusBar'
import { Masthead } from './Masthead'
import { FamiliarHero } from './FamiliarHero'
import { QuestCard } from './QuestCard'
import { SkillLedger } from './SkillLedger'
import { Footer } from './Footer'

/** The flagship screen. Sections enter staggered, like print settling onto the page. */
export function TodayScreen() {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <StatusBar />
      <motion.main variants={pageContainer} initial="hidden" animate="show" className="px-6 pb-8 pt-3">
        <motion.div variants={pageItem}>
          <Masthead />
        </motion.div>
        <motion.div variants={pageItem}>
          <Hairline className="my-4" />
        </motion.div>
        <motion.div variants={pageItem} className="mt-1">
          <FamiliarHero />
        </motion.div>
        <motion.div variants={pageItem} className="mt-[18px]">
          <QuestCard />
        </motion.div>
        <motion.div variants={pageItem} className="mt-6">
          <SkillLedger />
        </motion.div>
        <motion.div variants={pageItem}>
          <Footer />
        </motion.div>
      </motion.main>
    </div>
  )
}
