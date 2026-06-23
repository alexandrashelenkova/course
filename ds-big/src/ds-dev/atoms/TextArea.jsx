import { useId } from 'react'

export default function TextArea({
  headline    = 'head line',
  value       = '',
  placeholder = 'type something here',
  disabled    = false,
  rows        = 3,
  onChange,
}) {
  const id = useId()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', width: 240 }}>
      {headline && (
        <label
          htmlFor={id}
          className="text-caps"
          style={{ color: 'var(--text-primary)', letterSpacing: '1.6px' }}
        >
          {headline}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        onChange={(e) => onChange?.(e.target.value)}
        aria-disabled={disabled ? 'true' : undefined}
        className="ds-interactive text-text-pixel tracking-[2px] uppercase"
        style={{
          padding: 'var(--space-8) var(--space-14)',
          borderRadius: 'var(--radius-4)',
          backgroundColor: 'var(--control-secondary)',
          color: value ? 'var(--text-primary)' : 'var(--color-gray-200)',
          border: 'none',
          outline: 'none',
          resize: 'vertical',
          width: '100%',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'text',
          fontFamily: 'inherit',
        }}
      />
    </div>
  )
}
