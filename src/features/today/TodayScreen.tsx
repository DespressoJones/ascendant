import { motion } from 'motion/react'
import { pageContainer, pageItem } from '@/motion/motion'
import { Hairline } from '@/components/Hairline'
import { Masthead } from './Masthead'
import { FamiliarHero } from './FamiliarHero'
import { QuestCard } from './QuestCard'
import { SkillLedger } from './SkillLedger'
import { Footer } from './Footer'

/** The Today section. Lives inside the app shell, which provides bg, header, and nav. */
export function TodayScreen() {
  return (
    <motion.main variants={pageContainer} initial="hidden" animate="show" className="px-6 pb-10 pt-4">
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
  )
}
