import { motion } from 'framer-motion'
import ProgressRing from './ProgressRing'
import { courseProgress, getUpcomingDeadlines } from '../utils/deadlines'

export default function SubjectCard({ course, progress, onOpen }) {
  const pct = courseProgress(course.id, progress)
  const upcoming = getUpcomingDeadlines([course.id], progress)
  const next = upcoming[0]

  const urgencyColor = {
    red:    'text-red-600 bg-red-50',
    orange: 'text-orange-600 bg-orange-50',
    normal: 'text-gray-500 bg-gray-50',
    past:   'text-gray-400 bg-gray-50',
  }

  return (
    <motion.div
      onClick={onOpen}
      className="card-3d bg-white border border-gray-100 rounded-3xl p-6 cursor-pointer shadow-md"
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="font-display font-bold text-gray-900 text-base leading-snug">
            {course.name}
          </h3>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-maroon-100 text-maroon capitalize font-medium">
            {course.level}
          </span>
        </div>
        <ProgressRing percent={pct} size={68} />
      </div>

      {next ? (
        <div className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${urgencyColor[next.urgency ?? 'normal']}`}>
          <span className="truncate">{next.label}</span>
          <span className="whitespace-nowrap font-semibold ml-auto">
            {next.daysLeft === 0 ? 'Today!' : `${next.daysLeft}d`}
          </span>
        </div>
      ) : (
        <div className="rounded-xl px-3 py-2 bg-green-50 text-green-700 text-sm font-medium">
          All caught up ✓
        </div>
      )}

      {course.project && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 font-medium mb-1">Project</div>
          <div className="text-sm text-gray-700 font-display font-semibold">
            {course.project.milestones[0]?.label}
          </div>
          <div className="text-xs text-maroon mt-0.5">
            Due {new Date(course.project.milestones[0]?.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </div>
        </div>
      )}
    </motion.div>
  )
}
