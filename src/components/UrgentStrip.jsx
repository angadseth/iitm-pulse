import { motion } from 'framer-motion'
import { urgencyLevel } from '../utils/deadlines'

export default function UrgentStrip({ deadlines }) {
  const top = deadlines.slice(0, 4)
  if (top.length === 0) return null

  const colors = {
    red:    'bg-red-50 border-red-200 text-red-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    normal: 'bg-gray-50 border-gray-200 text-gray-600',
  }

  return (
    <div className="mb-6 space-y-2">
      <h2 className="text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Coming Up
      </h2>
      {top.map((item, i) => {
        const level = urgencyLevel(item.daysLeft)
        return (
          <motion.div
            key={`${item.courseId}-${item.label}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${colors[level] ?? colors.normal}`}
          >
            {level === 'red' && (
              <motion.div
                className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            )}
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm truncate block">{item.courseName}</span>
              <span className="text-xs opacity-75 truncate block">{item.label}</span>
            </div>
            <div className="font-display font-bold text-sm flex-shrink-0">
              {item.daysLeft === 0 ? 'Today!' : item.daysLeft === 1 ? 'Tomorrow' : `${item.daysLeft} days`}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
