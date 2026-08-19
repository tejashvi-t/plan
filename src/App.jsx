import { useCallback, useEffect, useMemo, useState } from 'react'
import { createInitialWeeks } from './data/weeks'
import {
  loadLastWeekIndex,
  loadWeeks,
  resetAllData,
  saveLastWeekIndex,
  saveWeeks,
} from './utils/storage'
import { getMonthlyCheckpoints, getProgressStats } from './utils/progress'
import ProgressBar from './components/ProgressBar'
import WeekView from './components/WeekView'
import MonthlyCheckpoints from './components/MonthlyCheckpoints'

export default function App() {
  const [weeks, setWeeks] = useState(() => loadWeeks())
  const [currentWeekIndex, setCurrentWeekIndex] = useState(() => loadLastWeekIndex())

  const currentWeek = weeks[currentWeekIndex]
  const stats = useMemo(() => getProgressStats(weeks), [weeks])
  const checkpoints = useMemo(() => getMonthlyCheckpoints(weeks), [weeks])

  useEffect(() => {
    saveWeeks(weeks)
  }, [weeks])

  useEffect(() => {
    saveLastWeekIndex(currentWeekIndex)
  }, [currentWeekIndex])

  const updateWeekField = useCallback((section, dayIndex, field, value) => {
    setWeeks((prev) =>
      prev.map((week, wi) => {
        if (wi !== currentWeekIndex) return week

        if (section === 'weekSummary') {
          return {
            ...week,
            weekSummary: { ...week.weekSummary, [field]: value },
          }
        }

        const updatedSection = week[section].map((day, di) =>
          di === dayIndex ? { ...day, [field]: value } : day,
        )

        return { ...week, [section]: updatedSection }
      }),
    )
  }, [currentWeekIndex])

  const goToWeek = (index) => {
    setCurrentWeekIndex(Math.min(Math.max(index, 0), weeks.length - 1))
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Reset all progress? This clears every checkbox, score, and note. This cannot be undone.',
    )
    if (!confirmed) return

    resetAllData()
    setWeeks(createInitialWeeks())
    setCurrentWeekIndex(0)
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-calm-900 sm:text-3xl">
          SSC CGL Prep Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-500">Aug 17 – Oct 31 · 11-week study plan</p>
      </header>

      <div className="mb-6">
        <ProgressBar stats={stats} />
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Last opened:{' '}
          <span className="font-medium text-calm-700">Week {currentWeek.weekNumber}</span>
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden gap-1 sm:flex">
            {weeks.map((week, index) => (
              <button
                key={week.weekNumber}
                type="button"
                onClick={() => goToWeek(index)}
                className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                  index === currentWeekIndex
                    ? 'bg-calm-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-calm-100'
                }`}
                title={week.label}
              >
                W{week.weekNumber}
              </button>
            ))}
          </div>
          <label htmlFor="week-select" className="sr-only">
            Jump to week
          </label>
          <select
            id="week-select"
            value={currentWeekIndex}
            onChange={(e) => goToWeek(parseInt(e.target.value, 10))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-400"
          >
            {weeks.map((week, index) => (
              <option key={week.weekNumber} value={index}>
                {week.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <main className="mb-6 rounded-xl border border-calm-200 bg-white p-4 shadow-sm sm:p-6">
        <WeekView week={currentWeek} onUpdate={updateWeekField} />

        <nav className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => goToWeek(currentWeekIndex - 1)}
            disabled={currentWeekIndex === 0}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-calm-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <span className="text-xs text-slate-400">
            {currentWeekIndex + 1} of {weeks.length}
          </span>

          <button
            type="button"
            onClick={() => goToWeek(currentWeekIndex + 1)}
            disabled={currentWeekIndex === weeks.length - 1}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-calm-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </nav>
      </main>

      <div className="mb-6">
        <MonthlyCheckpoints checkpoints={checkpoints} />
      </div>

      <footer className="text-center">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 underline-offset-2 transition hover:text-red-500 hover:underline"
        >
          Reset All Data
        </button>
      </footer>
    </div>
  )
}
