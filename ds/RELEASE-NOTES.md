## 2026-06-18 · v0.1.1 — Component docs + Figma canvas fixes

- All components: descriptions added to JSDoc blocks, /ds-dev/ captions, and Figma Description fields
- Figma canvas: visible text description labels added below each component (nodes 68:2–68:6)
- Figma canvas: Input field frames fixed — height collapsed to 10px; now HUG at 37px (counterAxisSizingMode AUTO)
- Figma canvas: Card/Default fixed — height collapsed to 10px; now HUG at 155px (primaryAxisSizingMode AUTO)
- Figma canvas: Badge + Nav Link overlap fixed — Nav Link moved from x:600 to x:670 (21px gap after Badge)
- React: Input + Button CSS logical property collapse fixed — switched to physical `padding` shorthand
- React: Card missing boxSizing border-box fixed — no longer collapses in flex context
- React: Badge/NavLink section spacing fixed — ComponentGroup uses flex-column + gap

## 2026-06-18 · v0.1.0 — Initial design system

- Button: primary, secondary, and ghost variants with live hover tracking and design-token styling
- Input: labeled text field with helper text and error/focus states driven live
- Badge: compact status label with success, danger, and neutral color variants
- Card: content surface with optional icon, heading, body text, and action link
- NavLink: navigation anchor with active underline indicator
