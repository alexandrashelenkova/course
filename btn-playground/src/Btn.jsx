/** The 4 states defined by the Figma "btn" component set (node 1-5). */
export const BUTTON_STATES = ['default', 'hover', 'active', 'disabled']

// Styles taken straight from Figma node 1-5, written as Tailwind "arbitrary
// values" so everything lives here in the component (no tailwind.config tokens).
//   padding:  px-[16px] py-[8px]
//   radius:   rounded-[8px]
//   text:     text-[12px], white, Inter Regular
const base =
  "inline-flex items-center justify-center px-[16px] py-[8px] rounded-[12px] " +
  "font-['Inter'] font-normal leading-normal text-[12px] text-white select-none"

const byState = {
  // Gradient at rest. On hover/press we drop the gradient (bg-none) and show
  // the solid Hover / Active colour instead — same behaviour as the Figma states.
  default:
    'bg-[linear-gradient(112.551deg,_#ff0051_10.702%,_#ff0095_94.171%)] ' +
    'hover:bg-none hover:bg-[#c10071] active:bg-none active:bg-[#ff0095]',
  hover: 'bg-[#c10071]',
  active: 'bg-[#ff0095]',
  disabled:
    'bg-[linear-gradient(112.551deg,_#ff1900_10.702%,_#ff0095_94.171%)] opacity-50 cursor-not-allowed',
}

export default function Btn({ state = 'default', className, children, ...rest }) {
  return (
    <button
      type="button"
      disabled={state === 'disabled'}
      className={`${base} ${byState[state]}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children ?? 'button'}
    </button>
  )
}
