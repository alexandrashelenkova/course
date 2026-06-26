import OrgHeader  from '../ds-dev/organisms/OrgHeader.jsx'
import CardTop    from '../ds-dev/organisms/CardTop.jsx'
import Notify     from '../ds-dev/molecules/Notify.jsx'
import Profile    from '../ds-dev/molecules/Profile.jsx'
import Bar        from '../ds-dev/atoms/Bar.jsx'
import Btn        from '../ds-dev/atoms/Btn.jsx'
import headerP2Bg from '../ds-dev/assets/headers/header-p2-bg.webp'

const ACHIEVEMENTS = [
  { title: 'Top performer', date: 'Q4 2024' },
  { title: 'Team player',   date: 'Q4 2024' },
  { title: 'Innovator',     date: 'Q4 2023' },
  { title: 'Mentor',        date: 'Q4 2025' },
]

const DEV_STAGES = ['onboarding', 'adapting', 'performing', 'ready']

const REPORTS_TO = [
  { name: 'Michael Lee',   role: 'Product Manager', person: 'katya', bg: 'var(--surface-card-on-card-red)'    },
  { name: 'Emily Carter',  role: 'UX Designer',      person: 'katya', bg: 'var(--surface-card-on-card-green)'  },
  { name: 'David Smith',   role: 'Data Analyst',     person: 'katya', bg: 'var(--surface-card-on-card-pink)'   },
]

const MENTORING = [
  { name: 'Michael Thompson', role: 'Project Manager', person: 'katya', bg: 'var(--surface-card-yellow)' },
  { name: 'Emily Davis',      role: 'UX Designer',     person: 'katya', bg: 'var(--surface-card-on-card-violet)' },
  { name: 'James Wilson',     role: 'Data Analyst',    person: 'katya', bg: 'var(--surface-card-on-card-red)'    },
]

function SectionCard({ children, bg = 'var(--surface-card-default)' }) {
  return (
    <div style={{
      backgroundColor: bg,
      borderRadius: 'var(--radius-12)',
      padding: 'var(--space-30)',
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children, color = 'var(--text-primary)' }) {
  return (
    <p style={{
      fontFamily: 'var(--font-family-antiqa)',
      fontSize: 'var(--font-size-40)',
      letterSpacing: '-0.9px',
      color,
      marginBottom: 'var(--space-24)',
    }}>{children}</p>
  )
}

export default function Page2() {
  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh' }}>
      <OrgHeader />
      <div style={{
        width: '100%',
        maxWidth: 830,
        margin: '0 auto',
        paddingTop: 'var(--space-90)',
        paddingBottom: 'var(--space-90)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        {/* Card top — Default: brings yellow card, PROMOTE/NEGOTIATE/SUSPEND/FIRE, Teams/Access */}
        <CardTop imgSrc={headerP2Bg} />

        {/* Notify */}
        <Notify width="100%" />

        {/* Achievements — yellow bg, dark text */}
        <SectionCard bg="var(--surface-card-yellow)">
          <SectionTitle color="var(--text-yellow-dark)">Achievements</SectionTitle>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: 'var(--space-14)',
            paddingBottom: 'var(--space-14)',
          }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <p style={{
                  fontFamily: 'var(--font-family-grotesk)',
                  fontSize: 'var(--font-size-20)',
                  fontWeight: 'var(--font-weight-400)',
                  letterSpacing: '-0.4px',
                  color: 'var(--text-yellow-dark)',
                }}>{a.title}</p>
                <p className="text-text-pixel tracking-[2px] uppercase"
                  style={{ color: 'var(--text-yellow-dark)' }}>{a.date}</p>
              </div>
            ))}
          </div>
          {/* Yellow pill button — real button with full interactive states */}
          <button
            type="button"
            onClick={() => {}}
            className="ds-interactive"
            style={{
              marginTop: 'var(--space-24)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              backgroundColor: 'var(--surface-card-on-card-yellow)',
              borderRadius: 'var(--radius-999)',
              padding: 'var(--space-8) var(--space-14)',
              border: 'none',
              cursor: 'pointer',
            }}>
            <span className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
              style={{ color: 'var(--text-yellow-dark)' }}>all achievements</span>
          </button>
        </SectionCard>

        {/* Personal Development */}
        <SectionCard>
          <SectionTitle>Personal Development</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginBottom: 'var(--space-24)' }}>
            <Bar size="big" value={60}
              colorFilled="var(--status-success)"
              colorEmpty="var(--surface-card-on-card-green)"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {DEV_STAGES.map(s => (
                <p key={s} className="text-caps"
                  style={{ color: 'var(--text-primary)' }}>{s}</p>
              ))}
            </div>
          </div>

          {/* Next Level card — outer gap-14 between blocks, inner gap-8 within each pair (per Figma 357:59035) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-14)', marginBottom: 'var(--space-24)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <p style={{
                fontFamily: 'var(--font-family-grotesk)',
                fontSize: 'var(--font-size-20)',
                fontWeight: 'var(--font-weight-400)',
                letterSpacing: '-0.4px',
                color: 'var(--text-secondary)',
              }}>Next Level</p>
              <p style={{
                fontFamily: 'var(--font-family-grotesk)',
                fontSize: 'var(--font-size-20)',
                fontWeight: 'var(--font-weight-400)',
                letterSpacing: '-0.4px',
                color: 'var(--text-primary)',
              }}>Lead Software Engineer</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <p className="text-caps" style={{ color: 'var(--text-secondary)' }}>Prediction:</p>
              <p style={{
                fontFamily: 'var(--font-family-grotesk)',
                fontSize: 'var(--font-size-20)',
                fontWeight: 'var(--font-weight-400)',
                letterSpacing: '-0.4px',
                color: 'var(--text-primary)',
              }}>February 2026</p>
            </div>
          </div>

          <Btn type="secondary" label="More info" />
        </SectionCard>

        {/* Relations — Reports to + Mentoring */}
        <SectionCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-90)' }}>
            {/* Reports to */}
            <div>
              <SectionTitle>Reports to</SectionTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-24)' }}>
                {REPORTS_TO.map(p => (
                  <Profile key={p.name} variant="short" name={p.name} role={p.role} person={p.person} bg={p.bg} />
                ))}
              </div>
              <Btn type="secondary" label="Org. chart" />
            </div>

            {/* Mentoring */}
            <div>
              <SectionTitle>Mentoring:</SectionTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {MENTORING.map(p => (
                  <Profile key={p.name} variant="short" name={p.name} role={p.role} person={p.person} bg={p.bg} />
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
