import Topmenu   from '../ds-dev/organisms/Topmenu.jsx'
import SecondRow  from '../ds-dev/organisms/SecondRow.jsx'
import CardMetric from '../ds-dev/molecules/CardMetric.jsx'
import Team       from '../ds-dev/molecules/Team.jsx'
import SwitchGroup from '../ds-dev/atoms/SwitchGroup.jsx'

/* Figma CDN — refreshed 2026-06-23; expire 7 days. See DECISIONS.md R5. */
const IMG_BG1 = 'https://www.figma.com/api/mcp/asset/984e7eaf-09ea-44e1-b679-c8bb0b9d0e01'
const IMG_BG2 = 'https://www.figma.com/api/mcp/asset/a8247f65-d136-4bdb-b49e-6031f3f6a12a'

const METRIC_CARDS = [
  { title: 'Health',       bars: [100, 58], label: 'Overall: Good',    bg: 'var(--surface-card-red)'    },
  { title: 'Productivity', bars: [100, 58], label: '+12% This Month',  bg: 'var(--surface-card-pink)'   },
  { title: 'Distribution', bars: [100, 58], label: '8 Teams Active',   bg: 'var(--surface-card-violet)' },
  { title: 'Hiring',       bars: [100, 58], label: '15 Open Position', bg: 'var(--surface-card-yellow)' },
]

const TEAMS = [
  { name: 'Engineering Team', count: '24 people', productivity: 89, highlight: 'Petya was drinking too much tea this week',   moreCount: 21 },
  { name: 'Design Team',      count: '12 people', productivity: 75, highlight: 'All design deliverables shipped on schedule', moreCount: 9  },
  { name: 'Product Team',     count: '8 people',  productivity: 91, highlight: 'Sprint goal achieved three days early',       moreCount: 5  },
  { name: 'Marketing Team',   count: '15 people', productivity: 68, highlight: 'New campaign launched successfully',          moreCount: 12 },
  { name: 'Sales Team',       count: '20 people', productivity: 83, highlight: 'Exceeded quarterly target by 15%',           moreCount: 17 },
  { name: 'Support Team',     count: '10 people', productivity: 77, highlight: 'Customer satisfaction score increased',      moreCount: 7  },
]

/* ⚠️ FLAG: Topmenu uses --text-primary (black) on image background — contrast
   depends on image brightness; validate with actual renders. */

function AllTeamsHero() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 160,
      width: '100%',
      height: 658,
      overflow: 'hidden',
      padding: 'var(--space-30)',
      boxSizing: 'border-box',
    }}>
      {/* Background layers */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--surface-page)' }} />
        <img alt="" src={IMG_BG1}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <img alt="" src={IMG_BG2}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'plus-lighter' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, var(--surface-page) 100%)',
        }} />
      </div>

      {/* Title + subtitle + add button */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-30)',
        width: '100%',
        maxWidth: 754,
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-30)', width: '100%' }}>
          <p style={{
            fontFamily: 'var(--font-family-antiqa)',
            fontSize: 'var(--font-size-84)',
            letterSpacing: '-0.84px',
            lineHeight: 0.9,
            color: 'var(--text-primary)',
          }}>All teams</p>
          <p className="text-text-pixel uppercase"
            style={{ fontSize: 'var(--font-size-30)', letterSpacing: '-0.9px', color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Overview of all teams<br />and their performance metrics
          </p>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          height: 32, backgroundColor: 'var(--text-primary)', borderRadius: 'var(--radius-999)',
          padding: 'var(--space-8) var(--space-14)' }}>
          <span className="text-text-pixel tracking-[2px] uppercase"
            style={{ color: 'var(--surface-page)' }}>add team</span>
        </div>
      </div>

      <SwitchGroup options={['Overview', 'Employees', 'Report']} />
    </div>
  )
}

export default function Page1() {
  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh' }}>

      {/* HERO: full-bleed, header floats as absolute overlay */}
      <div style={{ position: 'relative' }}>
        <AllTeamsHero />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <Topmenu property1="all" />
          <SecondRow type="Default" showBack={false} />
        </div>
      </div>

      {/* CONTENT: shared 830px column — metric cards + team grid aligned */}
      <div style={{
        width: '100%',
        maxWidth: 830,
        margin: '0 auto',
        paddingTop: 'var(--space-4)',
        paddingBottom: 'var(--space-90)',
        boxSizing: 'border-box',
      }}>
        {/* 4 metric cards */}
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          {METRIC_CARDS.map(card => (
            <div key={card.title} style={{ flex: '1 1 0', minWidth: 0 }}>
              <CardMetric
                title={card.title}
                bars={card.bars}
                label={card.label}
                bg={card.bg}
                width="100%"
              />
            </div>
          ))}
        </div>

        {/* 6 team cards — 2-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-4)',
        }}>
          {TEAMS.map(team => (
            <div key={team.name} style={{ minWidth: 0 }}>
              <Team {...team} width="100%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
