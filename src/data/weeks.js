const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const PLAN_START = new Date(2026, 7, 17)
export const PLAN_END = new Date(2026, 9, 31)
const TOTAL_WEEKS = 11

function addDays(date, days) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  result.setDate(result.getDate() + days)
  return result
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function toDateString(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseDateString(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDate(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`
}

function formatDayLabel(date) {
  return `${DAY_NAMES[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isPastDay(dateStr) {
  const today = startOfDay(new Date())
  const day = startOfDay(parseDateString(dateStr))
  return day < today
}

export function isToday(dateStr) {
  const today = startOfDay(new Date())
  const day = startOfDay(parseDateString(dateStr))
  return isSameDay(day, today)
}

function createWeekdayEntry(date) {
  return {
    day: formatDayLabel(date),
    date: toDateString(date),
    vocabDone: false,
    grammarVideoNumber: '',
    reasoningMockDone: false,
    notes: '',
  }
}

function createWeekendEntry(date) {
  return {
    day: formatDayLabel(date),
    date: toDateString(date),
    vocabDone: false,
    mathTopic: '',
    mockScore: '',
    weakAreas: '',
  }
}

function createWeek(weekNumber, startDate, endDate) {
  const phase = weekNumber <= 9 ? 'Building Phase' : 'Revision Phase'
  const label = `Week ${weekNumber} (${formatDate(startDate)} – ${formatDate(endDate)})`

  const weekdays = []
  const weekend = []

  for (let offset = 0; offset < 7; offset += 1) {
    const dayDate = addDays(startDate, offset)
    if (dayDate > endDate) break

    const dayOfWeek = dayDate.getDay()
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdays.push(createWeekdayEntry(dayDate))
    } else {
      weekend.push(createWeekendEntry(dayDate))
    }
  }

  return {
    weekNumber,
    startDate: toDateString(startDate),
    endDate: toDateString(endDate),
    label,
    phase,
    weekdays,
    weekend,
    weekSummary: {
      videosDone: 0,
      mocksTaken: 0,
      biggestWeakPoint: '',
    },
  }
}

export function createInitialWeeks() {
  const weeks = []

  for (let i = 0; i < TOTAL_WEEKS; i += 1) {
    const weekStart = addDays(PLAN_START, i * 7)
    const normalWeekEnd = addDays(weekStart, 6)
    const weekEnd = normalWeekEnd > PLAN_END ? PLAN_END : normalWeekEnd
    weeks.push(createWeek(i + 1, weekStart, weekEnd))
  }

  return weeks
}

function countPlanDays(weeks) {
  return weeks.reduce((sum, week) => sum + week.weekdays.length + week.weekend.length, 0)
}

export const TOTAL_GRAMMAR_VIDEOS = 70
export const TOTAL_DAYS = countPlanDays(createInitialWeeks())
