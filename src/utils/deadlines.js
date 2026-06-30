import { COURSES } from '../data/handbook'

export function daysUntil(dateStr) {
  const target = new Date(dateStr)
  const today  = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

export function urgencyLevel(days) {
  if (days < 0)  return 'past'
  if (days <= 3) return 'red'
  if (days <= 7) return 'orange'
  return 'normal'
}

// Returns upcoming deadlines sorted by date, excluding past ones
export function getUpcomingDeadlines(enrolledCourseIds, progress = {}) {
  const results = []

  for (const courseId of enrolledCourseIds) {
    const course = COURSES.find(c => c.id === courseId)
    if (!course) continue

    for (const a of course.assignments) {
      const done = progress[courseId]?.assignments?.[a.week] ?? false
      if (done) continue
      const days = daysUntil(a.deadline)
      if (days >= 0) results.push({ courseId, courseName: course.name, label: a.label, deadline: a.deadline, daysLeft: days, type: 'assignment' })
    }

    for (const s of course.specialItems) {
      const done = progress[courseId]?.special?.[s.id] ?? false
      if (done) continue
      const days = daysUntil(s.deadline)
      if (days >= 0) results.push({ courseId, courseName: course.name, label: s.label, deadline: s.deadline, daysLeft: days, type: s.type })
    }
  }

  return results.sort((a, b) => a.daysLeft - b.daysLeft)
}

// Returns % of assignments + special items completed for a course
export function courseProgress(courseId, progress = {}) {
  const course = COURSES.find(c => c.id === courseId)
  if (!course) return 0
  const total = course.assignments.length + course.specialItems.length
  if (total === 0) return 100
  const done =
    Object.values(progress[courseId]?.assignments ?? {}).filter(Boolean).length +
    Object.values(progress[courseId]?.special    ?? {}).filter(Boolean).length
  return Math.round((done / total) * 100)
}
