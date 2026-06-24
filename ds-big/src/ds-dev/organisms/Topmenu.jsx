import Btn from '../atoms/Btn.jsx'

function MenuSwitch({ label, active = false }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      padding: 10,
      borderRadius: 'var(--radius-4)',
      flexShrink: 0,
      border: active ? '1px solid var(--text-on-color)' : '1px solid transparent',
    }}>
      <span style={{
        fontFamily: 'var(--font-family-grotesk)',
        fontSize: 'var(--font-size-11)',
        color: 'var(--text-primary)',
        whiteSpace: 'nowrap',
      }}>{label}</span>
    </div>
  )
}

export default function Topmenu({ property1 = 'all' }) {
  const teamsActive     = property1 === 'all'
  const templatesActive = property1 === 'templates'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-14) var(--space-20)',
      borderBottom: '1px solid var(--text-on-color)',
      width: '100%',
    }}>
      {/* Left: brand + nav — gap-90 = var(--space-90) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-90)',
        flex: '1 1 auto',
        minWidth: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-family-antiqa)',
          fontSize: 23,
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>Hired &amp; Wired</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-20)', flexWrap: 'wrap', minWidth: 0 }}>
          <Btn type="On color" label="Generate report" />
          <MenuSwitch label="All teams"     active={teamsActive} />
          <MenuSwitch label="All templates" active={templatesActive} />
        </div>
      </div>

      {/* Right: account links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-8)',
        fontFamily: 'var(--font-family-grotesk)',
        fontSize: 'var(--font-size-11)',
        color: 'var(--text-primary)',
        whiteSpace: 'nowrap',
      }}>
        <span>Profile</span>
        <span>Log out</span>
      </div>
    </div>
  )
}
