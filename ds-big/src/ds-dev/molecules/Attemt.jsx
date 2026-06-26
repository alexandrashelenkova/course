const DEFAULT = {
  left:  { price: '$8 750',  benefits: ['Lead Role', 'Cookies', 'Free Education'] },
  right: { price: '$12 750', benefits: ['Lead Role', 'Remote-work', 'Gym']        },
}
const VARIANT2 = {
  left:  { price: '$?', benefits: ['Lead Role', 'Cookies', 'Gym'] },
  right: { price: '$?', benefits: ['Lead Role', 'Cookies', 'Gym'] },
}

function SalaryCol({ price, benefits, align = 'left' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-14)', width: 290 }}>
      <p style={{
        fontFamily: 'var(--font-family-antiqa)',
        fontSize: 'var(--font-size-40)',
        fontWeight: 'var(--font-weight-400)',
        letterSpacing: '-0.4px',
        color: 'var(--text-primary)',
        textAlign: align,
      }}>{price}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', textAlign: align }}>
        {benefits.map((b, i) => (
          <p key={i} className="text-text-pixel tracking-[2px] uppercase"
            style={{ color: 'var(--text-secondary)' }}>{b}</p>
        ))}
      </div>
    </div>
  )
}

export default function Attemt({ variant = 'Default' }) {
  const isV2   = variant === 'Variant2'
  const data   = isV2 ? VARIANT2 : DEFAULT
  const label  = isV2 ? 'Next attempt' : 'First attempt'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)',
      padding: 'var(--space-30)',
      width: 830,
      backgroundColor: 'var(--surface-card-default)',
      borderRadius: 'var(--radius-12)',
    }}>
      <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
        style={{ color: 'var(--text-primary)' }}>
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <SalaryCol price={data.left.price} benefits={data.left.benefits} />
        {!isV2 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start' }}>
            <span style={{
              display: 'inline-block', width: 5, height: 5,
              borderRadius: '50%', backgroundColor: 'var(--status-error)', flexShrink: 0,
            }} />
            <span className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
              style={{ color: 'var(--status-error)' }}>
              failed
            </span>
          </div>
        )}
        <SalaryCol price={data.right.price} benefits={data.right.benefits} align="right" />
      </div>
    </div>
  )
}
