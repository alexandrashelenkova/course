import DsCard from '../components/Card.jsx'

const FEATURES = [
  {
    icon: '⚡',
    heading: 'Real-time Collaboration',
    body: 'Work alongside your team live, with instant sync across all devices and platforms.',
  },
  {
    icon: '📊',
    heading: 'Advanced Analytics',
    body: 'Deep insights into usage, performance, and customer behavior at every step.',
  },
  {
    icon: '🔗',
    heading: 'Seamless Integrations',
    body: 'Connect to 200+ tools your team already uses — no code required.',
  },
]

/**
 * Section/Feature Row — Figma node 44-133.
 * Reuses: Card (with icon prop, feature shadow override).
 * Note: feature cards use --effect-feature-shadow (blur 16px) not the default
 * card shadow (blur 8px) — see tokens.css.
 */
export default function FeatureRow() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-feature-gap)',
        paddingInline: 'var(--spacing-space-6)',
        paddingBlock: 'var(--spacing-section-y)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs)',
        }}
      >
        <h2 className="ds-text-section-heading" style={{ color: 'var(--color-text-strong)', margin: 0 }}>
          Everything you need
        </h2>
        <p className="ds-text-body" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
          Powerful features designed to help your team move faster.
        </p>
      </div>

      {/* Feature cards — responsive 3-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--spacing-space-4)',
        }}
      >
        {FEATURES.map((f) => (
          <DsCard
            key={f.heading}
            icon={f.icon}
            heading={f.heading}
            body={f.body}
            style={{ boxShadow: 'var(--effect-feature-shadow)' }}
          />
        ))}
      </div>
    </div>
  )
}
