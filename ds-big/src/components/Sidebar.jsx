import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Nav config — add sections/subsections here to extend ─────────────────

export const NAV_CONFIG = [
  {
    id: 'styles',
    label: 'Styles',
    path: '/ds-dev/styles',
    subsections: [
      { id: 'colors',     label: 'Colors'     },
      { id: 'semantic',   label: 'Semantic'   },
      { id: 'spacing',    label: 'Spacing'    },
      { id: 'radius',     label: 'Radius'     },
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    id: 'atoms',
    label: 'Atoms',
    path: '/ds-dev/atoms',
    subsections: [
      { id: 'btn',          label: 'btn'          },
      { id: 'switch',       label: 'switch'       },
      { id: 'switch-group', label: 'switch group' },
      { id: 'dropdown',     label: 'dropdown'     },
      { id: 'tag',          label: 'tag'          },
      { id: 'input',        label: 'input'        },
      { id: 'text-area',    label: 'text area'    },
      { id: 'status',       label: 'status'       },
      { id: 'error',        label: 'error'        },
      { id: 'avatar',       label: 'avatar'       },
      { id: 'avatars',      label: 'avatars'      },
      { id: 'bar',          label: 'bar'          },
      { id: 'icons',        label: 'icons'        },
      { id: 'flag',         label: 'flag'         },
      { id: 'list',         label: 'list'         },
      { id: 'graph',        label: 'graph'        },
    ],
  },
  {
    id: 'molecules',
    label: 'Molecules',
    path: '/ds-dev/molecules',
    subsections: [
      { id: 'profile',            label: 'profile'            },
      { id: 'node',               label: 'node'               },
      { id: 'campaign-preview',   label: 'campaign preview'   },
      { id: 'project-preview',    label: 'project preview'    },
      { id: 'experience-preview', label: 'experience preview' },
      { id: 'team',               label: 'team'               },
      { id: 'card-metric',        label: 'card metric'        },
      { id: 'cards-metrica',      label: 'cards metrica'      },
      { id: 'attemt',             label: 'attemt'             },
      { id: 'notify',             label: 'notify'             },
    ],
  },
  {
    id: 'organisms',
    label: 'Organisms',
    path: '/ds-dev/organisms',
    subsections: [
      { id: 'topmenu',     label: 'topmenu'     },
      { id: 'second-row',  label: 'second-row'  },
      { id: 'header',      label: 'header'      },
      { id: 'canban',      label: 'canban'      },
      { id: 'task',        label: 'task'        },
      { id: 'card-top',    label: 'card top'    },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    path: '/all_teams',
    alwaysExpanded: true,
    subsections: [
      { id: 'all_teams',              label: 'All teams',              path: '/all_teams',              newTab: true },
      { id: 'team',                   label: 'Team',                   path: '/team',                   newTab: true },
      { id: 'candidate',              label: 'Candidate',              path: '/candidate',              newTab: true },
      { id: 'hiring_campaign',        label: 'Hiring campaign',        path: '/hiring_campaign',        newTab: true },
      { id: 'automation_mail_editor', label: 'Automation mail editor', path: '/automation_mail_editor', newTab: true },
    ],
  },
]

const SCROLL_OFFSET = 80

// ─── Component ────────────────────────────────────────────────────────────

export default function Sidebar({ onClose }) {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(null)

  // Derive which L1 item matches the current route
  const activeL1 = NAV_CONFIG.find(item =>
    location.pathname === item.path ||
    location.pathname.startsWith(item.path + '/')
  ) ?? (
    // /ds-dev and /ds-dev/ fall back to styles
    (location.pathname === '/ds-dev' || location.pathname === '/ds-dev/')
      ? NAV_CONFIG[0]
      : null
  )

  const sectionIds = activeL1?.subsections.map(s => s.id) ?? []

  // ── scrollspy (generalised for any route with subsections) ────────────

  useEffect(() => {
    if (!sectionIds.length) {
      setActiveSection(null)
      return
    }
    setActiveSection(sectionIds[0])

    const update = () => {
      const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
      if (!els.length) return
      const threshold = window.scrollY + SCROLL_OFFSET
      let current = sectionIds[0]
      for (const el of els) {
        if (el.getBoundingClientRect().top + window.scrollY <= threshold) {
          current = el.id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const handleSubClick = (e, sectionId) => {
    e.preventDefault()
    onClose?.()
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <nav
      aria-label="Design system navigation"
      className="flex flex-col h-full select-none"
      style={{ padding: 'var(--space-24) 0' }}
    >
      {/* ── brand ──────────────────────────────────────────────────── */}
      <div
        className="text-h4 text-[var(--text-primary)]"
        style={{
          padding: '0 var(--space-20)',
          paddingBottom: 'var(--space-20)',
          marginBottom: 'var(--space-14)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        ds-big
      </div>

      {/* ── nav items ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {NAV_CONFIG.map(item => {
          const isL1Active =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + '/') ||
            (item.id === 'styles' && (
              location.pathname === '/ds-dev' || location.pathname === '/ds-dev/'
            ))

          return (
            <div key={item.id}>
              {/* Level 1 — plain label (non-clickable) for alwaysExpanded sections like Pages */}
              {item.alwaysExpanded ? (
                <div
                  className="flex items-center text-text-grotesk text-[var(--text-secondary)]"
                  style={{
                    padding: 'var(--space-8) var(--space-20)',
                    borderRight: '2px solid transparent',
                    fontWeight: 'var(--font-weight-400)',
                  }}
                >
                  {item.label}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={[
                    'flex items-center text-text-grotesk transition-colors',
                    isL1Active
                      ? 'text-[var(--text-primary)] bg-[var(--surface-page)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-page)]',
                  ].join(' ')}
                  style={{
                    padding: 'var(--space-8) var(--space-20)',
                    borderRight: isL1Active
                      ? '2px solid var(--accent-default)'
                      : '2px solid transparent',
                    fontWeight: isL1Active
                      ? 'var(--font-weight-700)'
                      : 'var(--font-weight-400)',
                  }}
                >
                  {item.label}
                </Link>
              )}

              {/* Level 2 — expanded under active L1 or when alwaysExpanded */}
              {(isL1Active || item.alwaysExpanded) && item.subsections.length > 0 && (
                <div style={{ paddingBottom: 'var(--space-8)' }}>
                  {item.subsections.map(sub => {
                    const isSubActive = sub.path
                      ? location.pathname === sub.path
                      : activeSection === sub.id
                    const subClass = [
                      'flex items-center text-caps transition-colors',
                      isSubActive
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                    ].join(' ')
                    const subStyle = {
                      padding: 'var(--space-4) var(--space-20) var(--space-4) var(--space-30)',
                      borderRight: isSubActive
                        ? '2px solid var(--accent-default)'
                        : '2px solid transparent',
                    }
                    if (sub.path && sub.newTab) {
                      return (
                        <a
                          key={sub.id}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className={subClass}
                          style={subStyle}
                        >
                          {sub.label}
                        </a>
                      )
                    }
                    if (sub.path) {
                      return (
                        <Link
                          key={sub.id}
                          to={sub.path}
                          onClick={onClose}
                          className={subClass}
                          style={subStyle}
                        >
                          {sub.label}
                        </Link>
                      )
                    }
                    return (
                      <a
                        key={sub.id}
                        href={`#${sub.id}`}
                        onClick={e => handleSubClick(e, sub.id)}
                        className={subClass}
                        style={subStyle}
                      >
                        {sub.label}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
