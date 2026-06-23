/**
 * A compact inline label that conveys semantic status using color — success (green), danger (red),
 * or neutral (gray). Use it to tag items in lists, cards, or tables to communicate their current
 * state at a glance.
 *
 * Badge — Figma node 44-94.
 * Props: variant ('success' | 'danger' | 'neutral').
 */
const STYLES = {
  success: { background: 'var(--color-success-surface)', color: 'var(--color-success-text)' },
  danger: { background: 'var(--color-danger-surface)', color: 'var(--color-danger)' },
  neutral: { background: 'var(--color-neutral-surface)', color: 'var(--color-text-default)' },
}

const LABEL = { success: 'Success', danger: 'Danger', neutral: 'Neutral' }

export default function Badge({ variant = 'success', children, style, ...rest }) {
  const v = STYLES[variant]
  return (
    <span
      className="ds-text-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        paddingInline: 'var(--badge-padding-x)',
        paddingBlock: 'var(--spacing-space-1)',
        borderRadius: 'var(--radius-sm)',
        background: v.background,
        color: v.color,
        ...style,
      }}
      {...rest}
    >
      {children ?? LABEL[variant]}
    </span>
  )
}
