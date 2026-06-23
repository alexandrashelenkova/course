import Status from '../atoms/Status.jsx'
import Btn    from '../atoms/Btn.jsx'

const DEFAULT_STATS = [
  { value: '142', label: 'applied'     },
  { value: '89',  label: 'rejected'    },
  { value: '282', label: 'in progress' },
  { value: '31',  label: 'Final round' },
  { value: '4',   label: 'offers sent' },
]

export default function CampaignPreview({
  title  = 'Senior DevOps',
  stats  = DEFAULT_STATS,
  status = 'green',
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-90)',
      padding: 'var(--space-30)',
      width: 696,
      backgroundColor: 'var(--surface-card-default)',
      borderRadius: 'var(--radius-12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{
          fontFamily: 'var(--font-family-antiqa)',
          fontSize: 'var(--font-size-40)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.4px',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
        }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-14)' }}>
          <Status variant={status} />
          <Btn type="secondary" label="more info" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', width: '100%' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          {stats.map((s, i) => (
            <p key={i} style={{
              flex: '1 0 0',
              fontFamily: 'var(--font-family-antiqa)',
              fontSize: 'var(--font-size-84)',
              fontWeight: 'var(--font-weight-400)',
              letterSpacing: '-0.84px',
              lineHeight: 0.9,
              color: 'var(--text-primary)',
            }}>{s.value}</p>
          ))}
        </div>
        <div style={{ display: 'flex', width: '100%' }}>
          {stats.map((s, i) => (
            <p key={i} style={{
              flex: '1 0 0',
              fontFamily: 'var(--font-family-grotesk)',
              fontSize: 'var(--font-size-8)',
              fontWeight: 'var(--font-weight-400)',
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}>{s.label}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
