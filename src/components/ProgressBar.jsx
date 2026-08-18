export default function ProgressBar({ stats }) {
  const {
    videosLogged,
    videoTarget,
    videoPercent,
    mocksTaken,
    daysFilled,
    totalDays,
    dayCompletionPercent,
  } = stats

  return (
    <section className="rounded-xl border border-calm-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-calm-700">
        Overall Progress
      </h2>

      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-600">Grammar Videos</span>
            <span className="font-medium text-calm-800">
              {videosLogged} / {videoTarget}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-calm-100">
            <div
              className="h-full rounded-full bg-calm-500 transition-all duration-300"
              style={{ width: `${videoPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-sage-50 px-3 py-2">
            <p className="text-xs text-sage-600">Mocks Taken</p>
            <p className="text-lg font-semibold text-sage-800">{mocksTaken}</p>
          </div>
          <div className="rounded-lg bg-calm-50 px-3 py-2">
            <p className="text-xs text-calm-600">Days Logged</p>
            <p className="text-lg font-semibold text-calm-800">
              {daysFilled} / {totalDays}
            </p>
          </div>
          <div className="col-span-2 rounded-lg bg-slate-50 px-3 py-2 sm:col-span-1">
            <p className="text-xs text-slate-500">Day Completion</p>
            <p className="text-lg font-semibold text-slate-800">{dayCompletionPercent}%</p>
          </div>
        </div>
      </div>
    </section>
  )
}
