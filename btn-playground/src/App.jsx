import { useState } from 'react'
import Btn, { BUTTON_STATES } from './Btn'

const LABELS = {
  default: 'Default',
  hover: 'Hover',
  active: 'Active',
  disabled: 'Disable',
}

export default function App() {
  const [liveState, setLiveState] = useState('default')
  const [clicks, setClicks] = useState(0)

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900 flex flex-col items-center justify-center gap-8 p-8">
      <header className="text-center">
        <h1 className="text-xl font-semibold">Btn playground</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Figma node 1-5 · 4 states: Default / Hover / Active / Disable
        </p>
      </header>

      {/* 1. All states side by side */}
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wide text-neutral-400">
          All states
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {BUTTON_STATES.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <Btn state={s} />
              <span className="text-xs text-neutral-500">{LABELS[s]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2 + 3. Live instance with state switcher and real interactions */}
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wide text-neutral-400">
          Live instance
        </h2>

        <div className="mb-8 inline-flex rounded-lg bg-neutral-100 p-1" role="tablist">
          {BUTTON_STATES.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={liveState === s}
              onClick={() => setLiveState(s)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                liveState === s
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {LABELS[s]}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-neutral-200 py-12">
          <Btn state={liveState} onClick={() => setClicks((c) => c + 1)} />
          <p className="text-xs text-neutral-400">
            clicked {clicks} {clicks === 1 ? 'time' : 'times'}
          </p>
        </div>

        <p className="mt-4 text-xs text-neutral-400">
          In <span className="font-medium text-neutral-500">Default</span> the button is fully
          interactive — hover and press it to see the real Hover / Active styles.{' '}
          <span className="font-medium text-neutral-500">Disable</span> blocks clicks for real.
        </p>
      </section>
    </div>
  )
}
