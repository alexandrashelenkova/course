import Icons from './Icons.jsx'

export default function Tag({
  variant  = 'control',
  label    = 'React',
  selected = false,
  disabled = false,
  onRemove,
  onClick,
}) {
  const isControl  = variant === 'control'
  const ariaDisabled = disabled ? 'true' : undefined

  const bg = selected
    ? 'var(--accent-default)'
    : isControl
      ? 'var(--control-secondary)'
      : 'var(--surface-card-on-card-red)'

  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  const Tag = isControl ? 'button' : 'span'

  return (
    <Tag
      type={isControl ? 'button' : undefined}
      aria-pressed={isControl ? selected : undefined}
      aria-disabled={ariaDisabled}
      onClick={isControl ? handleClick : undefined}
      className={`ds-interactive text-text-pixel whitespace-nowrap tracking-[2px] uppercase${isControl ? '' : ' cursor-default'}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isControl ? 'var(--space-4)' : undefined,
        height: 24,
        padding: '0 var(--space-8)',
        borderRadius: 'var(--radius-4)',
        backgroundColor: bg,
        color: 'var(--text-primary)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : isControl ? 'pointer' : 'default',
        transition: 'background-color 140ms ease-out',
      }}
    >
      {label}
      {isControl && onRemove && (
        <span
          onClick={(e) => { e.stopPropagation(); onRemove?.() }}
          style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 2 }}
        >
          <Icons name="close" size={12} />
        </span>
      )}
    </Tag>
  )
}
