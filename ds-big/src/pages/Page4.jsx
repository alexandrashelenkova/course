import OrgHeader    from '../ds-dev/organisms/OrgHeader.jsx'
import CardTop      from '../ds-dev/organisms/CardTop.jsx'
import TaskRow      from '../ds-dev/organisms/TaskRow.jsx'
import Canban       from '../ds-dev/organisms/Canban.jsx'
import CardsMetrica from '../ds-dev/molecules/CardsMetrica.jsx'
import IMG_P4_FLAT from '../ds-dev/assets/headers/header-p4-flat.jpg'

const TASKS = [
  { title: 'Confirm budget allocation',                    property1: 'Default',  showError: false, showBtn: false },
  { title: 'Define role requirements and job description', property1: 'Default',  showError: false, showBtn: true  },
  { title: 'Post job in job boards',                       property1: 'Default',  showError: false, showBtn: true  },
  { title: 'Review applications',                          property1: 'Variant2', showError: false, showBtn: true,  btnLabel: 'review'   },
  { title: 'Conduct initial interviews',                   property1: 'Variant2', showError: false, showBtn: false },
  { title: 'Onboarding paperwork',                         property1: 'Variant2', showError: false, showBtn: true,  btnLabel: 'generate', noBorderBottom: true },
]

const METRICS = [
  { title: 'Applications',    value: '142',   label: 'Total received'           },
  { title: 'In Progress',     value: '28',    label: 'Active candidates'        },
  { title: 'Conversion Rate', value: '19.7%', label: 'Application to interview' },
]

const FUNNEL = [
  { value: '142', label: 'Applied'     },
  { value: '89',  label: 'Rejected'    },
  { value: '28',  label: 'In Progress' },
  { value: '31',  label: 'Final Round' },
  { value: '4',   label: 'Offers Sent' },
]

export default function Page4() {
  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh' }}>
      <OrgHeader showProgressBar={false} />

      {/* 830px centered column — banner + task + metrics */}
      <div style={{
        width: '100%',
        maxWidth: 830,
        margin: '0 auto',
        paddingTop: 'var(--space-90)',
        paddingBottom: 'var(--space-4)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        {/* Banner */}
        <CardTop flatSrc={IMG_P4_FLAT} />

        {/* Task section */}
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
          }}>Task</p>
          {TASKS.map(t => (
            <TaskRow
              key={t.title}
              property1={t.property1}
              title={t.title}
              showError={t.showError}
              showBtn={t.showBtn}
              btnLabel={t.btnLabel}
              noBorderBottom={t.noBorderBottom}
              flagScheme="inverted"
              width="100%"
            />
          ))}
        </div>

        {/* Applications / In Progress / Conversion Rate */}
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          {METRICS.map(m => (
            <CardsMetrica
              key={m.title}
              title={m.title}
              value={m.value}
              label={m.label}
              width="100%"
            />
          ))}
        </div>
      </div>

      {/* Funnel — full-width section */}
      <div style={{
        width: '100%',
        paddingLeft: 'var(--space-30)',
        paddingRight: 'var(--space-30)',
        paddingTop: 0,
        paddingBottom: 'var(--font-size-84)',
        boxSizing: 'border-box',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 830,
          margin: '0 auto',
          backgroundColor: 'var(--surface-card-default)',
          borderRadius: 'var(--radius-12)',
          padding: 'var(--space-30)',
          boxSizing: 'border-box',
        }}>
          <p style={{
            fontFamily: 'var(--font-family-antiqa)',
            fontSize: 'var(--font-size-40)',
            letterSpacing: '-0.4px',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-30)',
          }}>Funnel</p>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            {FUNNEL.map(f => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', flex: '1 1 0' }}>
                <p style={{
                  fontFamily: 'var(--font-family-antiqa)',
                  fontSize: 'var(--font-size-84)',
                  letterSpacing: '-0.84px',
                  lineHeight: 0.9,
                  color: 'var(--text-primary)',
                }}>{f.value}</p>
                <p className="text-text-pixel tracking-[2px] uppercase"
                  style={{ color: 'var(--text-primary)' }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline — full-width Canban */}
      <Canban />
    </div>
  )
}
