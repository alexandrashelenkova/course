const CONFIG = {
  purple:  { token: 'var(--status-info)',    label: 'Rocket Growth' },
  green:   { token: 'var(--status-success)', label: 'On Track'      },
  red:     { token: 'var(--status-error)',   label: 'Failing'       },
  stopped: { token: 'var(--color-gray-200)', label: 'Failing'       },
}

export default function Status({ variant = 'purple', label }) {
  const cfg = CONFIG[variant] ?? CONFIG.purple
  const text = label ?? cfg.label

  return (
    <div
      className="flex items-center"
      style={{ gap: 10 }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: cfg.token,
          flexShrink: 0,
        }}
      />
      <span
        className="text-text-pixel whitespace-nowrap tracking-[2px] uppercase"
        style={{ color: cfg.token }}
      >
        {text}
      </span>
    </div>
  )
}
