import Avatar from './Avatar.jsx'

const DEFAULT_PEOPLE = ['katya', 'petya', 'dog']

export default function Avatars({ people = DEFAULT_PEOPLE, size = 30 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {people.map((person, i) => (
        <div
          key={person + i}
          style={{
            marginRight: i < people.length - 1 ? 'var(--space-neg-8)' : 0,
            zIndex: people.length - i,
            position: 'relative',
          }}
        >
          <Avatar person={person} size={size} />
        </div>
      ))}
    </div>
  )
}
