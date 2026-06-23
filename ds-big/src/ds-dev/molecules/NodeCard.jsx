import Icons from '../atoms/Icons.jsx'

export default function NodeCard({
  label    = 'Start Trigger',
  subtitle = 'New Application received',
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)',
      padding: 'var(--space-14)',
      width: 280,
      backgroundColor: 'var(--surface-card-red)',
      borderRadius: 'var(--radius-8)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-14)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Icons name="play" size={16} />
          <Icons name="more" size={16} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <p style={{
            fontFamily: 'var(--font-family-grotesk)',
            fontSize: 'var(--font-size-11)',
            fontWeight: 'var(--font-weight-400)',
            color: 'var(--text-primary)',
          }}>{label}</p>
          <p className="text-text-pixel tracking-[2px] uppercase"
            style={{ color: 'var(--text-primary)' }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{
          display: 'inline-block',
          width: 10, height: 10,
          borderRadius: '50%',
          backgroundColor: 'var(--text-secondary)',
        }} />
        <span style={{
          display: 'inline-block',
          width: 10, height: 10,
          borderRadius: '50%',
          backgroundColor: 'var(--color-black)',
        }} />
      </div>
    </div>
  )
}
