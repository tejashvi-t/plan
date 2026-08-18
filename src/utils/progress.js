import { TOTAL_GRAMMAR_VIDEOS, TOTAL_DAYS } from '../data/weeks'

export function parseVideoNumbers(text) {
  if (!text || !text.trim()) return []
  return text
    .split(/[,;\s]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => parseInt(part, 10))
    .filter((num) => !Number.isNaN(num) && num > 0)
}

export function countVideosFromWeeks(weeks, upToWeekNumber = Infinity) {
  let count = 0
  for (const week of weeks) {
    if (week.weekNumber > upToWeekNumber) break
    for (const day of week.weekdays) {
      count += parseVideoNumbers(day.grammarVideoNumber).length
    }
  }
  return count
}

export function countAllLoggedVideos(weeks) {
  return countVideosFromWeeks(weeks, Infinity)
}

export function countMocksTaken(weeks) {
  let count = 0
  for (const week of weeks) {
    for (const day of week.weekdays) {
      if (day.reasoningMockDone) count += 1
    }
    for (const day of week.weekend) {
      if (day.mockScore?.trim()) count += 1
    }
  }
  return count
}

function isWeekdayFilled(day) {
  return (
    day.vocabDone ||
    day.grammarVideoNumber?.trim() ||
    day.reasoningMockDone ||
    day.notes?.trim()
  )
}

function isWeekendFilled(day) {
  return (
    day.vocabDone ||
    day.mathTopic?.trim() ||
    day.mockScore?.trim() ||
    day.weakAreas?.trim()
  )
}

export function countFilledDays(weeks) {
  let filled = 0
  for (const week of weeks) {
    for (const day of week.weekdays) {
      if (isWeekdayFilled(day)) filled += 1
    }
    for (const day of week.weekend) {
      if (isWeekendFilled(day)) filled += 1
    }
  }
  return filled
}

export function calculateDayCompletionPercent(weeks) {
  return Math.round((countFilledDays(weeks) / TOTAL_DAYS) * 100)
}

export function getMockScores(weeks) {
  const scores = []
  for (const week of weeks) {
    for (const day of week.weekend) {
      const trimmed = day.mockScore?.trim()
      if (!trimmed) continue
      const num = parseFloat(trimmed)
      if (!Number.isNaN(num)) scores.push(num)
    }
  }
  return scores
}

export function averageMockScore(weeks) {
  const scores = getMockScores(weeks)
  if (scores.length === 0) return null
  const sum = scores.reduce((acc, s) => acc + s, 0)
  return Math.round((sum / scores.length) * 10) / 10
}

export function getProgressStats(weeks) {
  const videosLogged = countAllLoggedVideos(weeks)
  const mocksTaken = countMocksTaken(weeks)
  const daysFilled = countFilledDays(weeks)
  const dayCompletionPercent = calculateDayCompletionPercent(weeks)

  return {
    videosLogged,
    videoTarget: TOTAL_GRAMMAR_VIDEOS,
    videoPercent: Math.min(Math.round((videosLogged / TOTAL_GRAMMAR_VIDEOS) * 100), 100),
    mocksTaken,
    daysFilled,
    totalDays: TOTAL_DAYS,
    dayCompletionPercent,
  }
}

export function getMonthlyCheckpoints(weeks) {
  const endOfAugVideos = countVideosFromWeeks(weeks, 2)
  const endOfSepVideos = countVideosFromWeeks(weeks, 7)
  const oct18Videos = countVideosFromWeeks(weeks, 9)

  return {
    endOfAug: { done: endOfAugVideos, target: 34, total: TOTAL_GRAMMAR_VIDEOS },
    endOfSep: { done: endOfSepVideos, target: 66, total: TOTAL_GRAMMAR_VIDEOS },
    oct18: { complete: oct18Videos >= TOTAL_GRAMMAR_VIDEOS },
    oct31: {
      mocksTaken: countMocksTaken(weeks),
      averageScore: averageMockScore(weeks),
    },
  }
}
