import Btn       from '../atoms/Btn.jsx'
import SwitchGroup from '../atoms/SwitchGroup.jsx'
import Icons       from '../atoms/Icons.jsx'
import Dropdown    from '../atoms/Dropdown.jsx'
import headerP1Bg  from '../assets/headers/header-p1-bg.webp'
import headerP2Bg  from '../assets/headers/header-p2-bg.webp'

const IMG_DEFAULT = headerP2Bg
const IMG_V2      = headerP1Bg

const TEAM_OPTIONS  = ['Frontend-team', 'Backend-team', 'Design-team',   'Product-team']
const LAB_OPTIONS   = ['Innovation Lab',  'Core Platform', 'Growth',       'Infrastructure']
const ROLE_OPTIONS  = ['Lead Developer',  'Senior Developer', 'Developer', 'Junior Developer']
const ORG_OPTIONS   = ['Member',          'Owner',            'Admin',     'Viewer']
const LEVEL_OPTIONS = ['Level 1 (Green)', 'Level 2 (Yellow)', 'Level 3 (Orange)', 'Level 4 (Code Red)']

/* Gold pill add button — rounded-999, full interactive states */
function GoldAdd() {
  return (
    <button
      type="button"
      onClick={() => {}}
      className="ds-interactive"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: 32, backgroundColor: 'var(--accent-gold)',
        borderRadius: 'var(--radius-999)',
        paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)',
        paddingLeft: 'var(--space-14)', paddingRight: 'var(--space-14)',
        flexShrink: 0, border: 'none', cursor: 'pointer',
      }}>
      <span
        className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
        style={{ color: 'var(--text-on-color)' }}
      >add</span>
    </button>
  )
}

const CTA_BTNS_ON_COLOR = ['promote', 'negotiate', 'suspend', 'fire']

export default function CardTop({
  property1      = 'Default',
  showBtnsGroup  = true,
  showDropdowns  = true,
  title          = 'Sarah Mitchell',
  subtitle       = 'Senior Software Engineer',
  imgSrc,
  imgPlusLighter,
  screenOverlaySrc,
  switchOptions  = ['Team', 'Projects', 'Reports'],
  fullBleed      = false,
  ctaBtns,
  noDesaturate   = false,
  flatSrc,
  gapToTabs      = 160,
}) {
  if (property1 === 'Variant2') {
    return (
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        gap: gapToTabs, width: '100%', height: 480,
        ...(!fullBleed && { maxWidth: 830, borderRadius: 'var(--radius-12)' }),
        overflow: 'hidden',
        padding: 'var(--space-30)', boxSizing: 'border-box',
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <img
            alt="" src={imgSrc ?? IMG_V2}
            loading="eager" fetchPriority="high" decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {imgPlusLighter && (
            <img
              alt="" src={imgPlusLighter}
              decoding="async"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'plus-lighter' }}
            />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, var(--surface-page) 100%)',
          }} />
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'var(--space-30)', width: '100%', maxWidth: 754,
          position: 'relative', textAlign: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-30)', width: '100%' }}>
            <p style={{
              fontFamily: 'var(--font-family-antiqa)', fontSize: 'var(--font-size-84)',
              letterSpacing: '-0.84px', lineHeight: 0.9, color: 'var(--text-primary)',
            }}>{title}</p>
            <p className="text-text-pixel tracking-[-0.9px] uppercase"
              style={{ fontSize: 'var(--font-size-30)', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.2 }}>
              {subtitle}
            </p>
          </div>
          {showBtnsGroup && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {CTA_BTNS_ON_COLOR.map(label => (
                <Btn key={label} type="small" label={label} />
              ))}
            </div>
          )}
        </div>

        <SwitchGroup options={switchOptions} />
      </div>
    )
  }

  /* Flat-image shortcut — pre-rendered composite; skips blend stack and content overlay */
  if (flatSrc) {
    return (
      <div style={{
        width: '100%', maxWidth: 830, height: 480,
        borderRadius: 'var(--radius-12)', overflow: 'hidden',
      }}>
        <img
          alt=""
          src={flatSrc}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  /* Default: gold blend bg + functional dropdown pills + Promote active */
  return (
    <div style={{
      position: 'relative', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', width: '100%', maxWidth: 830, height: 480,
      borderRadius: 'var(--radius-12)',
      padding: 'var(--space-30)', boxSizing: 'border-box',
    }}>
      {/* Background: image + blend layers — isolated so card overflow:visible works for dropdowns */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, borderRadius: 'var(--radius-12)',
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <img
          alt="" src={imgSrc ?? IMG_DEFAULT}
          loading="eager" fetchPriority="high" decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!noDesaturate && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'black', mixBlendMode: 'color' }} />
        )}
        {/* #ffb700 is the hard-light blend value from Figma — not a token, structural visual technique */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffb700', mixBlendMode: 'hard-light' }} />
        {screenOverlaySrc && (
          <img
            alt="" src={screenOverlaySrc}
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'screen' }}
          />
        )}
      </div>

      {/* Top row: TEAMS / access — hidden when showDropdowns={false} */}
      {showDropdowns && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          width: '100%', position: 'relative',
        }}>
          <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
            style={{ color: 'var(--accent-gold)' }}>TEAMS</p>
          <p className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
            style={{ color: 'var(--accent-gold)' }}>access</p>
        </div>
      )}

      {/* Center: name + role + CTA btns */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--space-30)', width: '90%', maxWidth: 754,
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-30)', width: '100%' }}>
          <p style={{
            fontFamily: 'var(--font-family-antiqa)', fontSize: 'var(--font-size-84)',
            letterSpacing: '-0.84px', lineHeight: 0.9, color: 'var(--text-primary)',
          }}>{title}</p>
          <p className="text-text-pixel uppercase"
            style={{ fontSize: 'var(--font-size-30)', color: 'var(--accent-gold)', letterSpacing: '-0.9px' }}>
            {subtitle}
          </p>
        </div>
        {showBtnsGroup && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            {(ctaBtns ?? CTA_BTNS_ON_COLOR).map((label, i) => (
              <Btn key={label} type="On color" label={label} selected={i === 0} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom row: functional dropdown pills — hidden when showDropdowns={false} */}
      {showDropdowns && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          width: '100%', position: 'relative',
        }}>
          {/* Left: 4 dropdowns + add — w-310 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center', width: 310 }}>
            <Dropdown hug variant="On color" headline="" placeholder="frontend-team"  options={TEAM_OPTIONS}  />
            <Dropdown hug variant="On color" headline="" placeholder="Innovation Lab" options={LAB_OPTIONS}   />
            <Dropdown hug variant="On color" headline="" placeholder="Lead Developer" options={ROLE_OPTIONS}  />
            <Dropdown hug variant="On color" headline="" placeholder="Member"         options={ORG_OPTIONS}   />
            <GoldAdd />
          </div>
          {/* Right: 1 dropdown + add — w-175, wrap justify-end */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--space-2)', alignItems: 'flex-start', width: 175 }}>
            <Dropdown hug variant="On color" headline="" placeholder="LEVEL 4 (CODE RED)" options={LEVEL_OPTIONS} />
            <GoldAdd />
          </div>
        </div>
      )}
    </div>
  )
}
