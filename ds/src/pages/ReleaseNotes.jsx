import notes from '../../RELEASE-NOTES.md?raw'

/**
 * Parses the simplified release-notes markdown format:
 *   ## date · vX.Y.Z — title
 *   - bullet
 */
function parseNotes(md) {
  const sections = []
  let current = null
  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current)
      current = { headline: line.slice(3).trim(), bullets: [] }
    } else if (line.startsWith('- ') && current) {
      current.bullets.push(line.slice(2).trim())
    }
  }
  if (current) sections.push(current)
  return sections
}

export default function ReleaseNotes() {
  const sections = parseNotes(notes)

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--spacing-space-6) var(--spacing-space-4)',
        }}
      >
        <header style={{ marginBottom: 'var(--spacing-space-6)' }}>
          <div className="ds-text-caption" style={{ color: 'var(--color-text-muted)' }}>
            /release-notes/
          </div>
          <h1 className="ds-text-display" style={{ color: 'var(--color-text-strong)' }}>
            Release Notes
          </h1>
          <p className="ds-text-body" style={{ color: 'var(--color-text-muted)', maxWidth: 560 }}>
            Changelog for the WBL AI Design System. Source of truth:{' '}
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '12px',
              }}
            >
              RELEASE-NOTES.md
            </span>
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-5)' }}>
          {sections.map((s) => (
            <div
              key={s.headline}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-space-4)',
              }}
            >
              <h2
                className="ds-text-subheading"
                style={{ color: 'var(--color-text-strong)', marginBottom: 'var(--spacing-space-3)' }}
              >
                {s.headline}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-2)' }}>
                {s.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="ds-text-body-sm"
                    style={{ color: 'var(--color-text-muted)', display: 'flex', gap: 'var(--spacing-space-2)', alignItems: 'flex-start' }}
                  >
                    <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer
          className="ds-text-caption"
          style={{
            color: 'var(--color-text-muted)',
            paddingTop: 'var(--spacing-space-4)',
            marginTop: 'var(--spacing-space-6)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {'Source: Figma "WBL AI Design System Shorts" · file YJlrRZ0qVDw0pwdLsbouF2'}
        </footer>
      </div>
    </div>
  )
}
