import Btn from '../atoms/Btn.jsx'

export default function SecondRow({ type = 'Default', showBack = true, bg }) {
  if (type === 'builder') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-14) var(--space-20)',
        width: '100%',
        ...(bg !== undefined && { backgroundColor: bg }),
      }}>
        <Btn type="secondary" label="Back" />
        <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
          <Btn type="secondary" label="save" />
          <Btn type="small" label="deploy" />
        </div>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: 'var(--space-14) var(--space-20)',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexShrink: 0 }}>
        {showBack && (
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 32,
            padding: 'var(--space-8) var(--space-14)',
            borderRadius: 'var(--radius-999)',
            backgroundColor: 'var(--control-on-color)',
            border: '1px solid var(--status-success)',
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            <span className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
              style={{ color: 'var(--text-primary)' }}>Back</span>
          </button>
        )}

        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)',
          fontFamily: 'var(--font-family-grotesk)',
          fontSize: 'var(--font-size-11)',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
        }}>
          <span>Home</span>
          <span>•</span>
          <span>Something</span>
          <span>•</span>
          <span>Something</span>
        </div>
      </div>
    </div>
  )
}
