/* Button with 5 Figma types.
   CTA types (black bg): small (pixel font), big (antiqa 40px).
   Non-CTA types: secondary (gray-100), On color (white), node (card-like, radius-4). */

export default function Btn({
  type     = 'secondary',
  label    = 'More info',
  sublabel,
  selected = false,
  disabled = false,
  onClick,
  bg,
}) {
  const ariaDisabled = disabled ? 'true' : undefined

  const handleClick = () => { if (!disabled) onClick?.() }

  if (type === 'big') {
    return (
      <button
        type="button"
        aria-disabled={ariaDisabled}
        aria-pressed={selected || undefined}
        onClick={handleClick}
        className="ds-interactive"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'var(--space-14)',
          paddingBottom: 'var(--space-20)',
          paddingLeft: 'var(--space-14)',
          paddingRight: 'var(--space-14)',
          borderRadius: 'var(--radius-999)',
          backgroundColor: 'var(--text-primary)',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span
          className="text-h2 whitespace-nowrap"
          style={{ color: 'var(--surface-page)', letterSpacing: '-0.4px' }}
        >
          {label}
        </span>
      </button>
    )
  }

  if (type === 'node') {
    return (
      <button
        type="button"
        aria-disabled={ariaDisabled}
        onClick={handleClick}
        className="ds-interactive"
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--space-8)',
          padding: 'var(--space-14)',
          borderRadius: 'var(--radius-4)',
          backgroundColor: bg ?? 'var(--surface-card-on-card-red)',
          color: 'var(--text-primary)',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          wordBreak: 'break-word',
        }}
      >
        <span className="text-text-grotesk">{label}</span>
        {sublabel !== undefined && (
          <span className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap">
            {sublabel}
          </span>
        )}
      </button>
    )
  }

  const bgMap = {
    secondary:  selected ? 'var(--accent-default)' : 'var(--control-secondary)',
    'On color': selected ? 'var(--text-primary)'    : 'var(--control-on-color)',
    small:      'var(--text-primary)',
  }

  const colorMap = {
    secondary:  'var(--text-primary)',
    'On color': selected ? 'var(--surface-page)' : 'var(--text-primary)',
    small:      'var(--surface-page)',
  }

  return (
    <button
      type="button"
      aria-disabled={ariaDisabled}
      aria-pressed={['secondary', 'On color'].includes(type) ? selected : undefined}
      onClick={handleClick}
      className="ds-interactive text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        padding: 'var(--space-8) var(--space-14)',
        borderRadius: 'var(--radius-999)',
        backgroundColor: bgMap[type] ?? 'var(--control-secondary)',
        color: colorMap[type] ?? 'var(--text-primary)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 140ms ease-out',
      }}
    >
      {label}
    </button>
  )
}
