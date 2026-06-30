import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { getCourseById, COURSES } from '../data/handbook'
import { getUpcomingDeadlines } from '../utils/deadlines'
import SubjectCard from '../components/SubjectCard'
import UrgentStrip from '../components/UrgentStrip'
import KeyDatesStrip from '../components/KeyDatesStrip'
import SubjectDetail from '../components/SubjectDetail'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { profile, progress, toggleAssignment, toggleSpecial } = useProgress(user.uid)
  const [openCourseId, setOpenCourseId] = useState(null)

  const enrolledIds = profile?.courses ?? []
  const enrolledCourses = enrolledIds.map(id => getCourseById(id)).filter(Boolean)
  const upcoming = getUpcomingDeadlines(enrolledIds, progress)
  const firstName = user.displayName?.split(' ')[0] ?? 'there'
  const openCourse = openCourseId ? getCourseById(openCourseId) : null

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-maroon z-10" />

      {/* Header */}
      <header className="max-w-2xl mx-auto px-4 pt-10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Hey {firstName} ⚡
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {upcoming.length > 0
              ? `${upcoming.filter(d => d.daysLeft <= 7).length} deadline${upcoming.filter(d => d.daysLeft <= 7).length !== 1 ? 's' : ''} this week`
              : 'All clear this week 🎉'}
          </p>
        </div>
        <button
          onClick={signOut}
          className="text-sm text-gray-400 hover:text-maroon transition-colors font-medium"
        >
          Sign out
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-16">
        <UrgentStrip deadlines={upcoming} />

        <h2 className="text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Your Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {enrolledCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <SubjectCard
                course={course}
                progress={progress}
                onOpen={() => setOpenCourseId(course.id)}
              />
            </motion.div>
          ))}
        </div>

        <KeyDatesStrip />
      </main>

      {/* Subject Detail Overlay */}
      <AnimatePresence>
        {openCourse && (
          <SubjectDetail
            key={openCourse.id}
            course={openCourse}
            progress={progress}
            toggleAssignment={toggleAssignment}
            toggleSpecial={toggleSpecial}
            onClose={() => setOpenCourseId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
