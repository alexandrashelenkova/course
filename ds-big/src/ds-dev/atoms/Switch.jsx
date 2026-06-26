/* Tab-selector button. Not a toggle switch — "on" means this tab is selected.
   Used standalone or inside SwitchGroup. */

export default function Switch({
  label    = 'Team',
  active   = false,
  size     = 'big',
  disabled = false,
  onClick,
}) {
  const isBig        = size === 'big'
  const ariaDisabled = disabled ? 'true' : undefined

  const bg = isBig
    ? active ? 'var(--text-on-color)' : 'transparent'
    : 'var(--control-secondary)'

  const textColor = (!isBig && !active)
    ? 'var(--text-secondary)'
    : 'var(--text-primary)'

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-disabled={ariaDisabled}
      onClick={() => { if (!disabled) onClick?.() }}
      className={`ds-interactive${isBig ? ' text-text-pixel tracking-[2px] uppercase' : ' text-caps'}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        padding: isBig ? 'var(--space-14)' : 'var(--space-8) var(--space-14)',
        borderRadius: 'var(--radius-4)',
        backgroundColor: bg,
        color: textColor,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        letterSpacing: isBig ? undefined : '1.6px',
        transition: 'background-color 140ms ease-out, color 140ms ease-out',
      }}
    >
      {label}
    </button>
  )
}
