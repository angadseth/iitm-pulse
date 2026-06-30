import { motion } from 'framer-motion'
import { daysUntil, urgencyLevel } from '../utils/deadlines'

export default function SubjectDetail({ course, progress, toggleAssignment, toggleSpecial, onClose }) {
  const cp = progress[course.id] ?? {}

  const deadlineLabel = (dateStr) => {
    const days = daysUntil(dateStr)
    const formatted = new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    if (days < 0) return { text: formatted, color: 'text-gray-400' }
    if (days === 0) return { text: 'Today!', color: 'text-red-600 font-bold' }
    if (days <= 3) return { text: `${formatted} (${days}d)`, color: 'text-red-500 font-semibold' }
    if (days <= 7) return { text: `${formatted} (${days}d)`, color: 'text-orange-500' }
    return { text: formatted, color: 'text-gray-500' }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-maroon z-10" />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-maroon font-display font-semibold mb-8 hover:opacity-70 transition-opacity"
        >
          ← Dashboard
        </button>

        <h1 className="text-3xl font-display font-bold text-gray-900 mb-1">
          {course.name}
        </h1>
        <p className="text-sm text-gray-400 font-mono mb-8">{course.gradingFormula}</p>

        {/* Weekly Assignments */}
        <section className="mb-10">
          <h2 className="text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Weekly Assignments
          </h2>
          <div className="space-y-2">
            {course.assignments.map(a => {
              const done = cp.assignments?.[a.week] ?? false
              const dl = deadlineLabel(a.deadline)
              return (
                <label
                  key={a.week}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                    ${done ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white hover:border-maroon-100'}`}
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleAssignment(course.id, a.week)}
                    className="w-5 h-5 accent-maroon flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className={`font-display font-semibold text-sm ${done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {a.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${done ? 'text-gray-300' : dl.color}`}>{dl.text}</div>
                  </div>
                  {done && <span className="text-green-500 text-lg">✓</span>}
                </label>
              )
            })}
          </div>
        </section>

        {/* Special Items */}
        {course.specialItems.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Exams & Special Submissions
            </h2>
            <div className="space-y-2">
              {course.specialItems.map(item => {
                const done = cp.special?.[item.id] ?? false
                const dl = deadlineLabel(item.deadline)
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                      ${done ? 'border-green-200 bg-green-50' : 'border-maroon-100 bg-maroon-50 hover:border-maroon'}`}
                  >
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleSpecial(course.id, item.id)}
                      className="w-5 h-5 accent-maroon flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className={`font-display font-semibold text-sm ${done ? 'line-through text-gray-400' : 'text-maroon'}`}>
                        {item.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${done ? 'text-gray-300' : dl.color}`}>{dl.text}</div>
                    </div>
                    {done && <span className="text-green-500 text-lg">✓</span>}
                  </label>
                )
              })}
            </div>
          </section>
        )}

        {/* Project Milestones */}
        {course.project && (
          <section>
            <h2 className="text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Project Milestones
            </h2>
            <div className="space-y-2">
              {course.project.milestones.map((m, i) => {
                const dl = deadlineLabel(m.deadline)
                return (
                  <div key={i} className="p-4 rounded-2xl border-2 border-maroon bg-maroon-50">
                    <div className="font-display font-bold text-maroon">{m.label}</div>
                    <div className={`text-xs mt-1 ${dl.color}`}>{dl.text}</div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  )
}
