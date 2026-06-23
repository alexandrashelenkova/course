import DsDev from './DsDev.jsx'
import Page from './pages/Page.jsx'
import ReleaseNotes from './pages/ReleaseNotes.jsx'

/**
 * Minimal path-based routing — no router dependency needed.
 * Vite's SPA fallback serves index.html for any deep link / refresh.
 */
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') // strip trailing slash

  if (path === '/ds-dev') return <DsDev />
  if (path === '/page') return <Page />
  if (path === '/release-notes') return <ReleaseNotes />

  return (
    <div
      style={{
        background: 'var(--color-bg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-3)' }}>
        <h1 className="ds-text-heading" style={{ color: 'var(--color-text-strong)' }}>
          WBL AI Design System
        </h1>
        <div style={{ display: 'flex', gap: 'var(--spacing-space-4)', justifyContent: 'center' }}>
          <a href="/page/" className="ds-text-label" style={{ color: 'var(--color-primary)' }}>
            /page/
          </a>
          <a href="/ds-dev/" className="ds-text-label" style={{ color: 'var(--color-text-muted)' }}>
            /ds-dev/
          </a>
          <a href="/release-notes/" className="ds-text-label" style={{ color: 'var(--color-text-muted)' }}>
            /release-notes/
          </a>
        </div>
      </div>
    </div>
  )
}
