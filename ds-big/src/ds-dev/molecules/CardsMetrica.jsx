export default function CardsMetrica({
  title = 'Applications',
  value = '142',
  label = 'Total received',
  width = 202,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-90)',
      padding: 'var(--space-30) var(--space-14)',
      width,
      backgroundColor: 'var(--surface-card-default)',
      borderRadius: 'var(--radius-12)',
      color: 'var(--text-primary)',
    }}>
      <p style={{
        fontFamily: 'var(--font-family-antiqa)',
        fontSize: 'var(--font-size-40)',
        fontWeight: 'var(--font-weight-400)',
        letterSpacing: '-0.4px',
      }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <p style={{
          fontFamily: 'var(--font-family-antiqa)',
          fontSize: 'var(--font-size-84)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.84px',
          lineHeight: 0.9,
        }}>{value}</p>
        <p className="text-text-pixel tracking-[2px] uppercase"
          style={{ color: 'var(--text-primary)' }}>{label}</p>
      </div>
    </div>
  )
}
