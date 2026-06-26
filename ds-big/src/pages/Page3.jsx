import Topmenu    from '../ds-dev/organisms/Topmenu.jsx'
import SecondRow   from '../ds-dev/organisms/SecondRow.jsx'
import CardTop     from '../ds-dev/organisms/CardTop.jsx'
import Notify      from '../ds-dev/molecules/Notify.jsx'
import Profile     from '../ds-dev/molecules/Profile.jsx'
import IMG_P3_BG      from '../ds-dev/assets/headers/header-p3-bg.webp'
import IMG_P3_OVERLAY from '../ds-dev/assets/headers/header-p3-overlay.webp'

const PROFILES = [
  { name: 'Sarah Johnson',    role: 'Senior Developer',      status: 'green'  },
  { name: 'Michael Smith',    role: 'Product Manager',       status: 'purple' },
  { name: 'Emily Davis',      role: 'UX Designer',           status: 'green'  },
  { name: 'David Brown',      role: 'QA Engineer',           status: 'purple' },
  { name: 'Linda Garcia',     role: 'Data Analyst',          status: 'green'  },
  { name: 'James Wilson',     role: 'Software Engineer',     status: 'red'    },
  { name: 'Alice Thompson',   role: 'Marketing Specialist',  status: 'green'  },
  { name: 'Robert Martinez',  role: 'Sales Executive',       status: 'red'    },
  { name: 'Jessica Taylor',   role: 'Content Strategist',    status: 'green'  },
  { name: 'Charles Lee',      role: 'Systems Analyst',       status: 'red'    },
]

export default function Page3() {
  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh' }}>

      {/* HERO: full-bleed, Topmenu+SecondRow float as absolute overlay */}
      <div style={{ position: 'relative' }}>
        <CardTop
          property1="Variant2"
          fullBleed
          imgSrc={IMG_P3_BG}
          imgPlusLighter={IMG_P3_OVERLAY}
          title="Engineering Team"
          subtitle={"Detailed team overview\nand performance metrics"}
          switchOptions={['Team', 'Campaigns', 'Access']}
          showBtnsGroup={false}
          gapToTabs={106}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <Topmenu property1="all" />
          <SecondRow type="Default" showBack={false} />
        </div>
      </div>

      {/* CONTENT: 830px centered column */}
      <div style={{
        width: '100%',
        maxWidth: 830,
        margin: '0 auto',
        paddingTop: 'var(--space-4)',
        paddingBottom: 'var(--space-90)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <Notify
          text="Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event."
          width="100%"
        />

        <div style={{
          backgroundColor: 'var(--surface-card-default)',
          borderRadius: 'var(--radius-12)',
          padding: 'var(--space-30)',
        }}>
          <p style={{
            fontFamily: 'var(--font-family-antiqa)',
            fontSize: 'var(--font-size-40)',
            letterSpacing: '-0.9px',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-14)',
          }}>Team</p>
          {PROFILES.map((p, i) => (
            <Profile
              key={p.name}
              name={p.name}
              role={p.role}
              status={p.status}
              person="katya"
              noBorderBottom={i === PROFILES.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
