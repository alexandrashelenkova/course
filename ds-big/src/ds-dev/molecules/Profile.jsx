import Avatar from '../atoms/Avatar.jsx'
import Status from '../atoms/Status.jsx'
import Bar    from '../atoms/Bar.jsx'

export default function Profile({
  variant  = 'long',
  name     = 'Sarah Johnson',
  role     = 'Senior Developer',
  person   = 'katya',
  status   = 'green',
  barValue = 75,
}) {
  if (variant === 'long') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-14)',
        paddingTop: 'var(--space-14)',
        paddingBottom: 'var(--space-14)',
        borderBottom: '1px solid var(--border-default)',
        width: '100%',
      }}>
        <Avatar person={person} />
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: 333,
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
            width: 243,
            whiteSpace: 'nowrap',
          }}>
            <p style={{
              fontFamily: 'var(--font-family-grotesk)',
              fontSize: 'var(--font-size-20)',
              fontWeight: 'var(--font-weight-400)',
              letterSpacing: '-0.4px',
              color: 'var(--text-primary)',
            }}>{name}</p>
            <p className="text-text-pixel tracking-[2px] uppercase"
              style={{ color: 'var(--text-primary)' }}>
              {role}
            </p>
          </div>
          <Status variant={status} />
        </div>
        <div style={{ flex: '1 0 0', overflow: 'hidden' }}>
          <Bar
            value={barValue}
            colorFilled="var(--status-success)"
            colorEmpty="var(--surface-card-on-card-green)"
          />
        </div>
      </div>
    )
  }

  const bg = variant === 'short'
    ? 'var(--surface-card-on-card-red)'
    : 'var(--border-default)'

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 'var(--space-14)',
      padding: 'var(--space-14)',
      borderRadius: 'var(--radius-4)',
      backgroundColor: bg,
    }}>
      <Avatar person={person} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <p style={{
          fontFamily: 'var(--font-family-grotesk)',
          fontSize: 'var(--font-size-20)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.4px',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
        }}>{name}</p>
        <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
          style={{ color: 'var(--text-primary)' }}>
          {role}
        </p>
      </div>
    </div>
  )
}
