import Switch from './Switch.jsx'

export default function SwitchGroup({
  options  = ['Team', 'Projects', 'Reports'],
  value,
  size     = 'big',
  disabled = false,
  onChange,
}) {
  const active = value ?? options[0]

  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-8)',
        backgroundColor: 'var(--accent-default)',
        position: 'relative',
      }}
    >
      {options.map((opt) => (
        <Switch
          key={opt}
          label={opt}
          size={size}
          active={opt === active}
          disabled={disabled}
          onClick={() => onChange?.(opt)}
        />
      ))}
    </div>
  )
}
