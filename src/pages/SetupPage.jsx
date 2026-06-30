import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { detectCourses } from '../utils/detectCourses'
import { COURSES } from '../data/handbook'

export default function SetupPage() {
  const { user } = useAuth()
  const { saveProfile } = useProgress(user?.uid)
  const navigate = useNavigate()
  const detected = detectCourses(user?.email ?? '')
  const [selected, setSelected] = useState(new Set(detected))
  const [saving, setSaving] = useState(false)

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    await saveProfile({
      email: user.email,
      displayName: user.displayName,
      courses: [...selected],
      setupComplete: true,
    })
    navigate('/')
  }

  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  return (
    <div className="min-h-screen bg-white px-4 py-12 flex flex-col items-center">
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-maroon" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-1">
          Hey {firstName} 👋
        </h1>
        <p className="text-gray-500 mb-8">
          We auto-detected your courses. Confirm or adjust — this only takes a few seconds.
        </p>

        <div className="space-y-3 mb-8">
          {COURSES.map(course => (
            <label
              key={course.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                ${selected.has(course.id)
                  ? 'border-maroon bg-maroon-50'
                  : 'border-gray-100 bg-gray-50'}`}
            >
              <input
                type="checkbox"
                checked={selected.has(course.id)}
                onChange={() => toggle(course.id)}
                className="w-5 h-5 accent-maroon"
              />
              <div>
                <div className="font-display font-semibold text-gray-900">{course.name}</div>
                <div className="text-xs text-gray-500 capitalize">{course.level}</div>
              </div>
            </label>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving || selected.size === 0}
          className="w-full py-4 bg-maroon text-white rounded-2xl font-display font-semibold text-base
                     hover:bg-maroon-light transition-colors disabled:opacity-60 shadow-lg"
        >
          {saving ? 'Saving…' : `Let's go →`}
        </motion.button>
      </motion.div>
    </div>
  )
}
