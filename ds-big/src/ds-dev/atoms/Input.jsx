import { useId } from 'react'

export default function Input({
  headline = 'head line',
  value    = '',
  placeholder = '',
  disabled = false,
  onChange,
}) {
  const id = useId()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', width: 180 }}>
      {headline && (
        <label
          htmlFor={id}
          className="text-caps"
          style={{ color: 'var(--text-primary)', letterSpacing: '1.6px' }}
        >
          {headline}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        aria-disabled={disabled ? 'true' : undefined}
        className="ds-interactive text-text-pixel tracking-[2px] uppercase"
        style={{
          height: 32,
          padding: 'var(--space-8) var(--space-14)',
          borderRadius: 'var(--radius-4)',
          backgroundColor: 'var(--control-secondary)',
          color: value ? 'var(--text-primary)' : 'var(--text-secondary)',
          border: 'none',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  )
}
