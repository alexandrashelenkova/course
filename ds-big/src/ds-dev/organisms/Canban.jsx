import Avatar from '../atoms/Avatar.jsx'

/* KanbanCard composes Avatar directly — Profile short-outlined uses display:inline-flex
   and cannot fill column width from outside without restyling. See DECISIONS.md R4. */
function KanbanCard({ name, role }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-14)',
      padding: 'var(--space-14)',
      borderRadius: 'var(--radius-4)',
      backgroundColor: 'var(--border-default)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <Avatar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <p style={{
          fontFamily: 'var(--font-family-grotesk)',
          fontSize: 'var(--font-size-20)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.4px',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
        }}>{name}</p>
        <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
          style={{ color: 'var(--text-primary)' }}>{role}</p>
      </div>
    </div>
  )
}

const COLUMNS = [
  {
    id: 'applied', label: 'Applied', count: 4,
    cards: [
      { name: 'Michael Thompson',  role: 'Product Manager'        },
      { name: 'Emily Carter',      role: 'UX Designer'            },
      { name: 'James Wilson',      role: 'Data Analyst'           },
      { name: 'Olivia Brown',      role: 'Marketing Specialist'   },
    ],
  },
  {
    id: 'screening', label: 'Screening', count: 6,
    cards: [
      { name: 'Michael Thompson',  role: 'Project Manager'        },
      { name: 'Emily Davis',       role: 'UX Designer'            },
      { name: 'David Garcia',      role: 'Data Analyst'           },
      { name: 'Jessica Martinez',  role: 'Marketing Specialist'   },
      { name: 'Daniel Lee',        role: 'Systems Administrator'  },
      { name: 'Laura Wilson',      role: 'Product Owner'          },
    ],
  },
  {
    id: 'interview', label: 'Interview', count: 3,
    cards: [
      { name: 'Michael Thompson',  role: 'Product Manager'        },
      { name: 'Jessica Williams',  role: 'UI/UX Designer'         },
      { name: 'David Brown',       role: 'Data Scientist'         },
    ],
  },
  {
    id: 'offer', label: 'Offer', count: 1,
    cards: [
      { name: 'Sophia Martinez',   role: 'UX Designer'            },
    ],
  },
]

export default function Canban() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 50,
      paddingBottom: 'var(--font-size-84)',
      paddingLeft: 'var(--space-30)',
      paddingRight: 'var(--space-30)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <p style={{
        fontFamily: 'var(--font-family-antiqa)',
        fontSize: 'var(--font-size-84)',
        letterSpacing: '-0.84px',
        lineHeight: 0.9,
        color: 'var(--text-primary)',
        textAlign: 'center',
        width: '100%',
        maxWidth: 830,
      }}>Pipeline</p>

      <div style={{
        display: 'flex',
        gap: 'var(--space-24)',
        alignItems: 'flex-start',
        padding: 'var(--space-30)',
        width: '100%',
        backgroundColor: 'var(--surface-card-default)',
        borderRadius: 'var(--radius-12)',
        boxSizing: 'border-box',
      }}>
        {COLUMNS.map(col => (
          <div key={col.id} style={{
            flex: '1 1 0',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-20)',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-4)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              fontFamily: 'var(--font-family-antiqa)',
              fontSize: 'var(--font-size-40)',
              letterSpacing: '-0.4px',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: 'var(--text-primary)' }}>{col.label}</span>
              <span style={{ color: 'var(--color-gray-200)' }}>{col.count}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {col.cards.map((card, i) => (
                <KanbanCard key={i} name={card.name} role={card.role} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
