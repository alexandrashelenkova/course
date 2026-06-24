import Avatars from '../atoms/Avatars.jsx'
import Bar     from '../atoms/Bar.jsx'

export default function Team({
  name         = 'Engineering Team',
  count        = '24 people',
  productivity = 89,
  highlight    = 'Petya was drinking too much tea this week',
  moreCount    = 21,
  width        = 462,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)',
      padding: 'var(--space-30)',
      width,
      height: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'var(--surface-card-default)',
      borderRadius: 'var(--radius-12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <p style={{
          fontFamily: 'var(--font-family-grotesk)',
          fontSize: 'var(--font-size-20)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.4px',
          color: 'var(--text-primary)',
        }}>{name}</p>
        <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
          style={{ color: 'var(--text-primary)' }}>
          {count}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{
            fontFamily: 'var(--font-family-grotesk)',
            fontSize: 'var(--font-size-8)',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            color: 'var(--color-gray-200)',
          }}>Productivity</p>
          <p style={{
            fontFamily: 'var(--font-family-grotesk)',
            fontSize: 'var(--font-size-8)',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}>{productivity}%</p>
        </div>
        <Bar value={productivity} colorFilled="var(--status-success)" colorEmpty="var(--surface-card-on-card-green)" />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
        maxWidth: 246,
        textTransform: 'uppercase',
      }}>
        <p style={{
          fontFamily: 'var(--font-family-grotesk)',
          fontSize: 'var(--font-size-8)',
          letterSpacing: '1.6px',
          textTransform: 'uppercase',
          color: 'var(--color-gray-200)',
        }}>Week highlight:</p>
        <p className="text-text-pixel tracking-[2px] uppercase"
          style={{ color: 'var(--text-primary)' }}>
          {highlight}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-14)' }}>
        <Avatars />
        <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
          style={{ color: 'var(--text-primary)' }}>
          +{moreCount} more
        </p>
      </div>
    </div>
  )
}
