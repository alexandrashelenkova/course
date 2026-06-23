const FOOTER_LINKS = ['Privacy', 'Terms', 'Security', 'Cookies', 'Contact']

/**
 * Section/Footer — Figma node 44-156.
 * No component reuse (the footer links are plain anchors, not NavLink — they
 * have no active underline indicator and sit on a dark bg where NavLink's
 * default color wouldn't apply). Uses --color-text-subtle (same #94a3b8 as
 * Input placeholder; both are present in Figma as raw fills).
 */
export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-text-strong)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-section-item-gap)',
        paddingInline: 'var(--spacing-space-6)',
        paddingBlock: 'var(--spacing-space-5)',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <nav
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'var(--spacing-cta-gap)',
        }}
      >
        {FOOTER_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="ds-text-label"
            style={{ color: 'var(--color-text-subtle)', textDecoration: 'none' }}
          >
            {link}
          </a>
        ))}
      </nav>
      <p className="ds-text-caption" style={{ color: 'var(--color-text-muted)', margin: 0 }}>
        © 2026 Acme Inc. All rights reserved.
      </p>
    </footer>
  )
}
