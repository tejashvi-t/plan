import { useState } from 'react'
import { TOTAL_GRAMMAR_VIDEOS } from '../data/weeks'

function CheckpointRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-sm text-slate-600">{children}</span>
    </div>
  )
}

export default function MonthlyCheckpoints({ checkpoints }) {
  const [open, setOpen] = useState(false)
  const { endOfAug, endOfSep, oct18, oct31 } = checkpoints

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left sm:px-5"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-700">Monthly Checkpoints</span>
        <span className="text-calm-600">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 pb-4 sm:px-5">
          <CheckpointRow label="End of Aug">
            <span>
              {endOfAug.done} / {endOfAug.total} videos
              <span className="ml-2 text-xs text-slate-400">(target ~{endOfAug.target})</span>
            </span>
          </CheckpointRow>

          <CheckpointRow label="End of Sep">
            <span>
              {endOfSep.done} / {endOfSep.total} videos
              <span className="ml-2 text-xs text-slate-400">(target ~{endOfSep.target})</span>
            </span>
          </CheckpointRow>

          <CheckpointRow label="Oct 18 — All 70 videos complete?">
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                oct18.complete
                  ? 'bg-sage-100 text-sage-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {oct18.complete ? 'Yes' : 'No'}
            </span>
          </CheckpointRow>

          <CheckpointRow label="Oct 31 — Mocks & average score">
            <span>
              {oct31.mocksTaken} mocks taken
              {oct31.averageScore != null ? (
                <span className="ml-2">· Avg score: {oct31.averageScore}</span>
              ) : (
                <span className="ml-2 text-xs text-slate-400">(enter numeric scores for average)</span>
              )}
            </span>
          </CheckpointRow>

          <p className="mt-3 text-xs text-slate-400">
            Video counts total entries logged (e.g. &quot;12,13&quot; = 2). Target: {TOTAL_GRAMMAR_VIDEOS} total.
          </p>
        </div>
      )}
    </section>
  )
}
