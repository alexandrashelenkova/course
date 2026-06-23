const PATHS = {
  play: (
    <>
      <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
    </>
  ),
  user: (
    <>
      <circle cx="8" cy="5" r="3" fill="currentColor" />
      <path d="M2 15C2 11.7 4.7 9 8 9C11.3 9 14 11.7 14 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  more: (
    <>
      <circle cx="4"  cy="8" r="1.5" fill="currentColor" />
      <circle cx="8"  cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  close: (
    <>
      <path d="M3 3L13 13M3 13L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

export default function Icons({ name = 'play', size = 16, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={color ? { color } : undefined}
    >
      {PATHS[name] ?? null}
    </svg>
  )
}
