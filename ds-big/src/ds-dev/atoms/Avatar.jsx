/* Avatar image URLs are Figma MCP asset links — they expire after 7 days.
   Replace with local /public/avatars/ paths in production. */

const SRCS = {
  katya: 'https://www.figma.com/api/mcp/asset/37977747-5300-41ec-9cef-0ee3bf926bff',
  dog:   'https://www.figma.com/api/mcp/asset/dcbd0d06-4051-444a-bc87-a2524bad8520',
  petya: 'https://www.figma.com/api/mcp/asset/99b3efc1-6b24-4c60-bd84-183d9a939501',
}

export default function Avatar({ person = 'katya', size = 30 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <img
        src={SRCS[person] ?? SRCS.katya}
        alt={person}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}
