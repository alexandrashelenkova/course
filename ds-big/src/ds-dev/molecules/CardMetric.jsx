import Graph from '../atoms/Graph.jsx'

export default function CardMetric({
  title = 'Health',
  bars  = [100, 58],
  label = 'Overall: Good',
  bg    = 'var(--surface-card-green)',
  width = 190,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)',
      padding: 'var(--space-30)',
      width,
      boxSizing: 'border-box',
      backgroundColor: bg,
      borderRadius: 'var(--radius-12)',
    }}>
      <p style={{
        fontFamily: 'var(--font-family-grotesk)',
        fontSize: 'var(--font-size-20)',
        fontWeight: 'var(--font-weight-400)',
        letterSpacing: '-0.4px',
        color: 'var(--text-primary)',
      }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <Graph bars={bars} color="var(--surface-page)" width="100%" />
        <p className="text-text-pixel tracking-[2px] uppercase"
          style={{ color: 'var(--text-primary)' }}>{label}</p>
      </div>
    </div>
  )
}
