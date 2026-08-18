const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const WEEKEND_NAMES = ['Sat', 'Sun']

function createWeekday(day) {
  return {
    day,
    vocabDone: false,
    grammarVideoNumber: '',
    reasoningMockDone: false,
    notes: '',
  }
}

function createWeekendDay(day) {
  return {
    day,
    vocabDone: false,
    mathTopic: '',
    mockScore: '',
    weakAreas: '',
  }
}

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getDate()}`
}

function createWeek(weekNumber, startDate, endDate) {
  const phase = weekNumber <= 9 ? 'Building Phase' : 'Revision Phase'
  const label = `Week ${weekNumber} (${formatDate(startDate)} – ${formatDate(endDate)})`

  return {
    weekNumber,
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    label,
    phase,
    weekdays: WEEKDAY_NAMES.map(createWeekday),
    weekend: WEEKEND_NAMES.map(createWeekendDay),
    weekSummary: {
      videosDone: 0,
      mocksTaken: 0,
      biggestWeakPoint: '',
    },
  }
}

export function createInitialWeeks() {
  const ranges = [
    [new Date(2026, 7, 18), new Date(2026, 7, 24)],
    [new Date(2026, 7, 25), new Date(2026, 7, 31)],
    [new Date(2026, 8, 1), new Date(2026, 8, 7)],
    [new Date(2026, 8, 8), new Date(2026, 8, 14)],
    [new Date(2026, 8, 15), new Date(2026, 8, 21)],
    [new Date(2026, 8, 22), new Date(2026, 8, 28)],
    [new Date(2026, 8, 29), new Date(2026, 9, 5)],
    [new Date(2026, 9, 6), new Date(2026, 9, 12)],
    [new Date(2026, 9, 13), new Date(2026, 9, 19)],
    [new Date(2026, 9, 20), new Date(2026, 9, 26)],
    [new Date(2026, 9, 27), new Date(2026, 9, 31)],
  ]

  return ranges.map(([start, end], index) => createWeek(index + 1, start, end))
}

export const TOTAL_GRAMMAR_VIDEOS = 70
export const TOTAL_DAYS = 11 * 7
