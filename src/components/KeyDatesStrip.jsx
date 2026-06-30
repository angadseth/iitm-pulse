import { KEY_DATES } from '../data/handbook'
import { daysUntil } from '../utils/deadlines'

export default function KeyDatesStrip() {
  const dates = Object.values(KEY_DATES)

  return (
    <div className="mt-10 pt-6 border-t border-gray-100">
      <h2 className="text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Key Dates
      </h2>
      <div className="flex flex-wrap gap-3">
        {dates.map(d => {
          const days = daysUntil(d.date)
          const past = days < 0
          return (
            <div
              key={d.label}
              className={`px-4 py-3 rounded-2xl border flex flex-col
                ${past ? 'bg-gray-50 border-gray-100 opacity-50' : 'bg-maroon-50 border-maroon-100'}`}
            >
              <span className="text-xs text-gray-500">{d.label}</span>
              <span className={`font-display font-bold text-sm ${past ? 'text-gray-400' : 'text-maroon'}`}>
                {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <span className="text-xs text-gray-400">{d.time}</span>
              {!past && (
                <span className="text-xs font-semibold text-maroon-light mt-1">
                  {days === 0 ? 'Today!' : `in ${days} days`}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
