export default function List({
  name      = 'Sarah Johnson',
  type      = 'Document',
  createdBy = 'created by Alan',
  date      = '24.05.2025',
  disabled  = false,
  onEdit,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-14)',
        padding: 'var(--space-14) 0',
        borderBottom: '1px solid var(--border-default)',
        width: '100%',
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <p
        className="text-h4 min-w-0"
        style={{
          flex: '1 0 0',
          color: 'var(--text-primary)',
          letterSpacing: '-0.4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </p>
      <p
        className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap shrink-0"
        style={{ color: 'var(--text-primary)', width: 114 }}
      >
        {type}
      </p>
      <p
        className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap shrink-0"
        style={{ color: 'var(--text-primary)', width: 162 }}
      >
        {createdBy}
      </p>
      <p
        className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap shrink-0 text-right"
        style={{ color: 'var(--text-primary)', width: 74 }}
      >
        {date}
      </p>
      <button
        type="button"
        aria-disabled={disabled ? 'true' : undefined}
        onClick={() => { if (!disabled) onEdit?.() }}
        className="ds-interactive text-text-pixel tracking-[2px] uppercase whitespace-nowrap shrink-0"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 32,
          padding: 'var(--space-8) var(--space-14)',
          borderRadius: 'var(--radius-999)',
          backgroundColor: 'var(--control-secondary)',
          color: 'var(--text-primary)',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        edit
      </button>
    </div>
  )
}
