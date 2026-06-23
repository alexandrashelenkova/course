/**
 * A contained surface for grouping related content with an optional icon, heading, body text,
 * and action link. Use it to present feature highlights, info items, or any grouped content that
 * benefits from visual separation in a grid or list layout.
 *
 * Card — Figma node 44-89 (Card/Default).
 * Props: heading, body, actionLabel. Pass `children` to fully override the body.
 * Width is left to the consumer (the Figma frame's 340px is just a demo size).
 */
export default function Card({
  icon,
  heading = 'Card Heading',
  body = 'Card body text goes here. Describe the feature or content in a concise way.',
  actionLabel = 'Learn more →',
  children,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-space-3)',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-space-4)',
        boxSizing: 'border-box',
        boxShadow: 'var(--effect-card-shadow)',
        minHeight: 0,
        ...style,
      }}
      {...rest}
    >
      {children ?? (
        <>
          {icon && (
            <div
              style={{
                width: 48,
                height: 48,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-primary-surface)',
                borderRadius: 'var(--radius-md)',
                fontSize: 22,
              }}
            >
              {icon}
            </div>
          )}
          <span className="ds-text-subheading" style={{ color: 'var(--color-text-strong)' }}>
            {heading}
          </span>
          <span className="ds-text-body-sm" style={{ color: 'var(--color-text-muted)' }}>
            {body}
          </span>
          {actionLabel && (
            <span className="ds-text-button" style={{ color: 'var(--color-primary)' }}>
              {actionLabel}
            </span>
          )}
        </>
      )}
    </div>
  )
}
