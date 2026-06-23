import Button from '../components/Button.jsx'

/**
 * Section/Hero — Figma node 44-123.
 * Reuses: Button (primary + secondary, lg padding).
 */
export default function Hero() {
  return (
    <div
      style={{
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-cta-gap)',
        paddingInline: 'var(--spacing-space-6)',
        paddingBlock: 'var(--spacing-space-5)',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      {/* Beta badge pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--color-primary-surface)',
          border: '1px solid var(--color-primary-border-light)',
          borderRadius: 'var(--radius-full)',
          paddingInline: 'var(--spacing-xs)',
          paddingBlock: 'var(--spacing-space-1)',
        }}
      >
        <span className="ds-text-badge" style={{ color: 'var(--color-primary)' }}>
          ✦ Now in public beta
        </span>
      </div>

      {/* Headline — 52px Bold, not a named Figma text style */}
      <h1 className="ds-text-hero" style={{ color: 'var(--color-text-strong)', margin: 0 }}>
        Build products your
        <br />
        customers will love
      </h1>

      {/* Subtext */}
      <p className="ds-text-body" style={{ color: 'var(--color-text-muted)', margin: 0, maxWidth: 560 }}>
        Acme brings your team together with tools for collaboration,
        analysis, and delivery — all in one place.
      </p>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: 'var(--spacing-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="primary"
          style={{
            padding: 'var(--button-padding-y-lg) var(--button-padding-x-lg)',
          }}
        >
          Start for free
        </Button>
        <Button
          variant="secondary"
          style={{
            padding: 'var(--button-padding-y-lg) var(--button-padding-x-lg)',
          }}
        >
          See how it works
        </Button>
      </div>
    </div>
  )
}
