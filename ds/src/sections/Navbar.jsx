import Button from '../components/Button.jsx'
import NavLink from '../components/NavLink.jsx'

const NAV_ITEMS = [
  { label: 'Features', active: true },
  { label: 'Pricing', active: false },
  { label: 'About', active: false },
]

/**
 * Section/Navbar — Figma node 44-108.
 * Reuses: Button (primary, lg), NavLink (active/default).
 */
export default function Navbar() {
  return (
    <nav
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        paddingInline: 'var(--spacing-space-6)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo mark + wordmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-space-2)',
          paddingBlock: 'var(--spacing-section-item-gap)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 'var(--logo-size)',
            height: 'var(--logo-size)',
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-sm)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--color-text-strong)',
          }}
        >
          Acme
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-2)' }}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              paddingInline: 'var(--spacing-xs)',
              paddingBlock: 'var(--spacing-space-2)',
            }}
          >
            <NavLink state={item.active ? 'active' : 'default'}>{item.label}</NavLink>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <Button
        variant="primary"
        style={{
          padding: 'var(--button-padding-y-lg) var(--button-padding-x-lg)',
        }}
      >
        Get Started
      </Button>
    </nav>
  )
}
