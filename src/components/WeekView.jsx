function WeekdayTable({ weekdays, weekNumber, onUpdate }) {
  const isRevision = weekNumber >= 10

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table>
        <thead>
          <tr>
            <th className="w-16">Day</th>
            <th className="w-16 text-center">Vocab</th>
            <th>{isRevision ? 'Sectional / Mixed' : 'Grammar Video #'}</th>
            <th className="w-24 text-center">Reasoning Mock</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {weekdays.map((day, index) => (
            <tr key={day.day} className="hover:bg-calm-50/50">
              <td className="font-medium text-slate-700">{day.day}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={day.vocabDone}
                  onChange={(e) =>
                    onUpdate('weekdays', index, 'vocabDone', e.target.checked)
                  }
                  aria-label={`${day.day} vocab done`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={day.grammarVideoNumber}
                  onChange={(e) =>
                    onUpdate('weekdays', index, 'grammarVideoNumber', e.target.value)
                  }
                  placeholder={isRevision ? 'Mock / revision' : 'e.g. 12 or 12,13'}
                  className="w-full min-w-[120px]"
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={day.reasoningMockDone}
                  onChange={(e) =>
                    onUpdate('weekdays', index, 'reasoningMockDone', e.target.checked)
                  }
                  aria-label={`${day.day} reasoning mock done`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={day.notes}
                  onChange={(e) => onUpdate('weekdays', index, 'notes', e.target.value)}
                  placeholder="Notes"
                  className="w-full min-w-[100px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WeekendTable({ weekend, onUpdate }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table>
        <thead>
          <tr>
            <th className="w-16">Day</th>
            <th className="w-16 text-center">Vocab</th>
            <th>Math Topic</th>
            <th className="w-24">Mock Score</th>
            <th>Weak Areas</th>
          </tr>
        </thead>
        <tbody>
          {weekend.map((day, index) => (
            <tr key={day.day} className="hover:bg-sage-50/50">
              <td className="font-medium text-slate-700">{day.day}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={day.vocabDone}
                  onChange={(e) =>
                    onUpdate('weekend', index, 'vocabDone', e.target.checked)
                  }
                  aria-label={`${day.day} vocab done`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={day.mathTopic}
                  onChange={(e) => onUpdate('weekend', index, 'mathTopic', e.target.value)}
                  placeholder="Topic revised"
                  className="w-full min-w-[120px]"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={day.mockScore}
                  onChange={(e) => onUpdate('weekend', index, 'mockScore', e.target.value)}
                  placeholder="Score"
                  className="w-full"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={day.weakAreas}
                  onChange={(e) => onUpdate('weekend', index, 'weakAreas', e.target.value)}
                  placeholder="Weak areas"
                  className="w-full min-w-[100px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WeekSummary({ summary, onUpdate }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">Week Summary</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs text-slate-500">Videos Done</span>
          <input
            type="number"
            min="0"
            value={summary.videosDone}
            onChange={(e) =>
              onUpdate('weekSummary', null, 'videosDone', parseInt(e.target.value, 10) || 0)
            }
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-500">Mocks Taken</span>
          <input
            type="number"
            min="0"
            value={summary.mocksTaken}
            onChange={(e) =>
              onUpdate('weekSummary', null, 'mocksTaken', parseInt(e.target.value, 10) || 0)
            }
            className="w-full"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1 block text-xs text-slate-500">Biggest Weak Point</span>
          <input
            type="text"
            value={summary.biggestWeakPoint}
            onChange={(e) =>
              onUpdate('weekSummary', null, 'biggestWeakPoint', e.target.value)
            }
            placeholder="Main area to improve"
            className="w-full"
          />
        </label>
      </div>
    </div>
  )
}

export default function WeekView({ week, onUpdate }) {
  const phaseColor =
    week.phase === 'Building Phase'
      ? 'bg-calm-100 text-calm-800'
      : 'bg-amber-100 text-amber-800'

  return (
    <article className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{week.label}</h2>
          <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${phaseColor}`}>
            {week.phase}
          </span>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-calm-700">Weekdays</h3>
        <p className="mb-2 text-xs text-slate-500">English vocab · Grammar videos · Reasoning mocks</p>
        <WeekdayTable weekdays={week.weekdays} weekNumber={week.weekNumber} onUpdate={onUpdate} />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-sage-700">Weekend</h3>
        <p className="mb-2 text-xs text-slate-500">Math revision · Prelims mocks</p>
        <WeekendTable weekend={week.weekend} onUpdate={onUpdate} />
      </div>

      <WeekSummary summary={week.weekSummary} onUpdate={onUpdate} />
    </article>
  )
}
