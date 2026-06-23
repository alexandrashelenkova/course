import { useState } from 'react'

/**
 * A clickable action element with three visual variants — primary for the main call to action,
 * secondary for alternative actions, and ghost for low-emphasis actions. Use it wherever users
 * need to trigger an action: form submissions, navigation, or dialog confirmations.
 *
 * Button — Figma node 44-54.
 * Props: variant ('primary' | 'secondary' | 'ghost'), state ('default' |
 * 'hover' | 'disabled'), disabled (bool). When `state` is omitted, hover is
 * driven live by the mouse. All values come from design tokens.
 */
const STYLES = {
  primary: {
    default: { background: 'var(--color-primary)', color: 'var(--color-surface)', borderColor: 'transparent' },
    hover: { background: 'var(--color-primary-hover)', color: 'var(--color-surface)', borderColor: 'transparent' },
    disabled: { background: 'var(--color-primary)', color: 'var(--color-surface)', borderColor: 'transparent' },
  },
  secondary: {
    default: { background: 'var(--color-surface)', color: 'var(--color-text-strong)', borderColor: 'var(--color-border)' },
    hover: { background: 'var(--color-bg)', color: 'var(--color-text-strong)', borderColor: 'var(--color-primary)' },
    disabled: { background: 'var(--color-surface)', color: 'var(--color-text-strong)', borderColor: 'var(--color-border)' },
  },
  ghost: {
    default: { background: 'transparent', color: 'var(--color-text-strong)', borderColor: 'transparent' },
    hover: { background: 'var(--color-primary-tint)', color: 'var(--color-primary)', borderColor: 'transparent' },
    disabled: { background: 'transparent', color: 'var(--color-text-muted)', borderColor: 'transparent' },
  },
}

export default function Button({
  variant = 'primary',
  state,
  disabled = false,
  children = 'Button',
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false)
  const visual = disabled ? 'disabled' : state ?? (hovered ? 'hover' : 'default')
  const v = STYLES[variant][visual]

  return (
    <button
      type="button"
      disabled={disabled || visual === 'disabled'}
      className="ds-text-button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 'var(--spacing-space-2) var(--spacing-space-3)',
        borderRadius: 'var(--radius-md)',
        borderWidth: 'var(--border-width)',
        borderStyle: 'solid',
        borderColor: v.borderColor,
        background: v.background,
        color: v.color,
        opacity: visual === 'disabled' ? 'var(--opacity-disabled)' : 1,
        cursor: visual === 'disabled' ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
