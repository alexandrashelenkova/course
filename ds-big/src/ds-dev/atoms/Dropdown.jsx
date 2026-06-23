import Icons from './Icons.jsx'

export default function Dropdown({
  variant  = 'default',
  headline = 'head line',
  value    = '',
  placeholder = 'frontend-team',
  disabled = false,
  onClick,
}) {
  const isOnColor = variant === 'On color'
  const filled    = Boolean(value)

  const bg        = isOnColor ? 'var(--accent-gold)' : 'var(--control-secondary)'
  const headColor = isOnColor ? 'var(--accent-gold)'  : 'var(--text-primary)'
  const textColor = filled
    ? isOnColor ? 'var(--text-on-color)' : 'var(--text-primary)'
    : isOnColor ? 'var(--text-on-color)' : 'var(--text-secondary)'
  const opacity   = !filled ? 0.5 : 1

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
        width: 180,
      }}
    >
      {headline && (
        <span
          className="text-caps"
          style={{ color: headColor, letterSpacing: '1.6px' }}
        >
          {headline}
        </span>
      )}
      <button
        type="button"
        aria-disabled={disabled ? 'true' : undefined}
        aria-haspopup="listbox"
        onClick={() => { if (!disabled) onClick?.() }}
        className="ds-interactive"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'auto',
          padding: 'var(--space-8) var(--space-14)',
          borderRadius: 'var(--radius-4)',
          backgroundColor: bg,
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
      >
        <span
          className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
          style={{ color: textColor, opacity, marginRight: -5 }}
        >
          {value || placeholder}
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            paddingLeft: 'var(--space-8)',
            opacity,
            color: textColor,
          }}
        >
          <Icons name="arrow-down" size={16} />
        </span>
      </button>
    </div>
  )
}
