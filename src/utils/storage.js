import { createInitialWeeks } from '../data/weeks'

const WEEKS_KEY = 'ssc-cgl-weeks'
const LAST_WEEK_KEY = 'ssc-cgl-last-week'

function mergeWeek(saved, initial) {
  return {
    ...initial,
    ...saved,
    weekdays: initial.weekdays.map((day, i) => ({
      ...day,
      ...(saved.weekdays?.[i] ?? {}),
    })),
    weekend: initial.weekend.map((day, i) => ({
      ...day,
      ...(saved.weekend?.[i] ?? {}),
    })),
    weekSummary: {
      ...initial.weekSummary,
      ...(saved.weekSummary ?? {}),
    },
  }
}

export function loadWeeks() {
  try {
    const raw = localStorage.getItem(WEEKS_KEY)
    const initial = createInitialWeeks()
    if (!raw) return initial

    const saved = JSON.parse(raw)
    if (!Array.isArray(saved)) return initial

    return initial.map((week, i) => mergeWeek(saved[i] ?? {}, week))
  } catch {
    return createInitialWeeks()
  }
}

export function saveWeeks(weeks) {
  localStorage.setItem(WEEKS_KEY, JSON.stringify(weeks))
}

export function loadLastWeekIndex() {
  try {
    const raw = localStorage.getItem(LAST_WEEK_KEY)
    if (raw == null) return 0
    const index = parseInt(raw, 10)
    return Number.isNaN(index) ? 0 : Math.min(Math.max(index, 0), 10)
  } catch {
    return 0
  }
}

export function saveLastWeekIndex(index) {
  localStorage.setItem(LAST_WEEK_KEY, String(index))
}

export function resetAllData() {
  localStorage.removeItem(WEEKS_KEY)
  localStorage.removeItem(LAST_WEEK_KEY)
}
