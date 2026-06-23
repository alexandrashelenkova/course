import { useState } from 'react'

/**
 * A labeled text field for collecting user-entered text, with optional helper text and three
 * interactive states — default, focused, and error. Use it for single-line input such as names,
 * emails, or search queries; pair with the error state to surface validation feedback.
 *
 * Input — Figma node 44-73.
 * Props: state ('default' | 'focus' | 'error'), error (bool), label,
 * placeholder, helperText. When `state` is omitted, focus is driven live.
 */
const BORDER = {
  default: 'var(--color-border)',
  focus: 'var(--color-primary)',
  error: 'var(--color-danger)',
}

export default function Input({
  label = 'Label',
  placeholder = 'Placeholder text',
  helperText = 'Helper text',
  state,
  error = false,
  style,
  ...rest
}) {
  const [focused, setFocused] = useState(false)
  const visual = error ? 'error' : state ?? (focused ? 'focus' : 'default')
  const shownHelper =
    visual === 'error' && helperText === 'Helper text' ? 'This field has an error' : helperText

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--input-gap)', ...style }}>
      {label && (
        <span className="ds-text-label" style={{ color: 'var(--color-text-strong)' }}>
          {label}
        </span>
      )}
      <input
        className="ds-text-body-sm ds-input-field"
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          display: 'block',
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--color-surface)',
          color: 'var(--color-text-strong)',
          borderWidth: 'var(--border-width)',
          borderStyle: 'solid',
          borderColor: BORDER[visual],
          borderRadius: 'var(--radius-md)',
          padding: 'var(--input-padding-y) var(--input-padding-x)',
          outline: 'none',
          boxShadow: visual === 'focus' ? 'var(--effect-focus-ring)' : 'none',
          lineHeight: 'var(--spacing-space-3)',
        }}
        {...rest}
      />
      {shownHelper && (
        <span
          className="ds-text-caption"
          style={{ color: visual === 'error' ? 'var(--color-danger)' : 'var(--color-text-muted)' }}
        >
          {shownHelper}
        </span>
      )}
    </div>
  )
}
