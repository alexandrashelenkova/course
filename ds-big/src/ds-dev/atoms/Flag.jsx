export default function Flag({
  active    = false,
  disabled  = false,
  onChange,
}) {
  const ariaDisabled = disabled ? 'true' : undefined

  const handleClick = (e) => {
    if (disabled) return
    onChange?.(!active)
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-disabled={ariaDisabled}
      aria-label={active ? 'Remove flag' : 'Add flag'}
      onClick={handleClick}
      className="ds-interactive"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        background: 'none',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 'var(--space-2)',
        borderRadius: 'var(--radius-4)',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}
    >
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
        <path
          d="M3 1.5H13V14.5L8 11.5L3 14.5V1.5Z"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
