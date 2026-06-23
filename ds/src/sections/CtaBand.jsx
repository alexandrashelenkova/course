import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'

/**
 * Section/CTA Band — Figma node 44-164.
 * Reuses: Input (no label/helper, fixed width), Button (primary, lg padding).
 */
export default function CtaBand() {
  return (
    <div
      style={{
        background: 'var(--color-primary-surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-cta-gap)',
        paddingInline: 'var(--spacing-space-6)',
        paddingBlock: 'var(--spacing-section-y)',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <h2 className="ds-text-section-heading" style={{ color: 'var(--color-text-strong)', margin: 0 }}>
        Start building for free today
      </h2>
      <p className="ds-text-body" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
        No credit card required. Cancel anytime.
      </p>

      {/* Email capture row */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-space-2)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Input with label and helper suppressed — just the field */}
        <Input
          label=""
          helperText=""
          placeholder="Enter your email"
          state="default"
          style={{ width: 'var(--input-cta-width)' }}
        />
        <Button
          variant="primary"
          style={{
            padding: 'var(--button-padding-y-lg) var(--button-padding-x-lg)',
          }}
        >
          Get early access
        </Button>
      </div>
    </div>
  )
}
