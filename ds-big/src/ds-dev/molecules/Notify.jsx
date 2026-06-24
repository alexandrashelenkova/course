import Btn from '../atoms/Btn.jsx'

export default function Notify({
  text    = 'Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.',
  showBtn = false,
  width   = 830,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-14)',
      padding: 'var(--space-30)',
      width,
      backgroundColor: 'var(--surface-card-green)',
      borderRadius: 'var(--radius-12)',
    }}>
      <p style={{
        fontFamily: 'var(--font-family-pixel)',
        fontSize: 'var(--font-size-30)',
        fontWeight: 'var(--font-weight-400)',
        textTransform: 'uppercase',
        letterSpacing: '-0.9px',
        color: 'var(--status-success)',
      }}>{text}</p>
      {showBtn && (
        <div style={{ display: 'flex' }}>
          <Btn type="On color" label="More info" />
        </div>
      )}
    </div>
  )
}
