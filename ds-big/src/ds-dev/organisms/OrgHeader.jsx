import Topmenu   from './Topmenu.jsx'
import SecondRow from './SecondRow.jsx'
import Bar       from '../atoms/Bar.jsx'

const STAGES = [
  'applied', 'interviewed', 'onboarding', 'half-term',
  'common', 'leads team', 'minus one', 'c-level', 'fired',
]

export default function OrgHeader({ showProgressBar = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      <Topmenu property1="all" />
      <SecondRow type="Default" />

      {/* Big progress bar + stage labels — px-20 matches Figma padding */}
      {showProgressBar && (
        <div style={{ paddingLeft: 20, paddingRight: 20, width: '100%', boxSizing: 'border-box' }}>
          <Bar size="big" value={57} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 'var(--space-8)',
          }}>
            {STAGES.map(stage => (
              <p
                key={stage}
                style={{
                  flex: '1 1 0',
                  minWidth: 0,
                  overflow: 'hidden',
                  fontFamily: 'var(--font-family-grotesk)',
                  fontSize: 'var(--font-size-8)',
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >{stage}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
