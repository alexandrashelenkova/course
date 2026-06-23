/**
 * A navigation anchor that renders a primary-colored underline indicator when active. Use it
 * inside navbars to mark the current section and provide clear wayfinding across pages.
 *
 * NavLink — Figma node 44-101.
 * Props: active (bool) or state ('default' | 'active'). Active adds the primary
 * underline indicator. The indicator spans the link text width (as in Figma).
 */
export default function NavLink({
  active = false,
  state,
  children = 'Nav Link',
  href = '#',
  style,
  ...rest
}) {
  const isActive = state ? state === 'active' : active
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: isActive ? 'var(--spacing-space-1)' : 0,
        textDecoration: 'none',
        ...style,
      }}
      {...rest}
    >
      <span
        className="ds-text-label"
        style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-default)' }}
      >
        {children}
      </span>
      {isActive && (
        <span
          style={{
            height: 'var(--navlink-indicator-height)',
            width: '100%',
            background: 'var(--color-primary)',
            borderRadius: 'var(--navlink-indicator-radius)',
          }}
        />
      )}
    </a>
  )
}
