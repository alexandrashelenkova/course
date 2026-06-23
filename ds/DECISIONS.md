# Design & Implementation Decisions

---

## 2026-06-18 — Figma Release Notes card rebuild + ordering fix

### v0.1.1 card broken (body text collapsed to 0px width)
**Decision:** Deleted all broken v0.1.1 card attempts and rebuilt by cloning the working v0.1.0 card (57:16), then updating only the text content.
**Why:** Three from-scratch creation attempts all produced body text nodes at 0px width causing heights of 11546–12634px. Root cause: setting `layoutSizingHorizontal = 'FILL'` + `textAutoResize = 'HEIGHT'` on a text node inside a HORIZONTAL auto-layout row does not reliably resolve in the `use_figma` script context — the layout engine does not apply FILL until after the script ends, so the text renders at 0px wide then wraps to thousands of pixels tall. Cloning a working node inherits pre-resolved layout property values and bypasses this boot-order issue entirely.
**How applied:** `card010.clone()` → update heading characters → update 5 existing bullet body text nodes → clone `card010`'s last row 3 more times, update body text → append to card011. All 8 bullets at bodyWidth:618, dashWidth:14, rowWidth:640.

### v0.1.1 card placed below v0.1.0 (wrong order)
**Decision:** After rebuilding, placed v0.1.1 at y:171 (the top card slot) and moved v0.1.0 to y:617 (= 171 + 422 + 24).
**Why:** The Release Notes page is free-layout (PAGE with layoutMode:NONE), so order is determined by y position, not child index. Newest entry must have the lowest y value to appear on top.

---

## 2026-06-18 — Figma canvas fixes + description labels

### Input "field" frames collapsed to 10px (canvas)
**Decision:** Set `counterAxisSizingMode = 'AUTO'` (HUG) on each field FRAME inside the three Input states (44:76, 44:81, 44:86). Kept `primaryAxisSizingMode = 'FIXED'` and explicitly `resize(280, height)` to preserve the 280px width.
**Why:** For a HORIZONTAL-layout frame, primary axis = width, counter axis = height. Both were `'FIXED'` at 10px, which is less than the 10+10px padding alone. HUG-ing the counter axis lets height expand to padding+content (37px). Setting only the counter axis avoids the mistake of also HUG-ing the width (which shrank to 136px in an earlier attempt — caught and corrected immediately).

### Card/Default collapsed to 10px (canvas)
**Decision:** Set `primaryAxisSizingMode = 'AUTO'` (HUG height) and `counterAxisSizingMode = 'FIXED'` (width stays 340px) on Card 44:89. Explicit `resize(340, height)` after to restore width.
**Why:** Card is VERTICAL-layout, so primary axis = height. Height was fixed at 10px with 24px top+bottom padding and three children at y:24/64/114 — all outside the frame. HUG-ing the primary axis lets the frame expand to contain all children (result: 155px). Counter axis kept FIXED because HUG-ing both collapsed the width to 181px (the card's content is narrower than 340px).

### Badge/NavLink 49px overlap (canvas)
**Decision:** Moved Nav Link 44:101 from x:600 to x:670. Badge 44:94 ends at x:649 (x:400 + w:249); 670 provides a 21px gap.
**Why:** Both nodes were placed at y:400 in the same free-layout frame. Badge right edge was at 649, NavLink started at 600 — 49px overlap. Moved NavLink rather than Badge since Badge's position (x:400) aligns with the Card column edge (Card is at x:24, w:340, so there's room at x:400 for a separate column).

### Visible description labels on canvas (Task A)
**Decision:** Created five TEXT nodes (68:2–68:6) as children of "03 Components" frame (44:52), each placed 12px below its corresponding component. Font: Inter Regular 11px, muted gray (RGB 0.42, 0.45, 0.51). `textAutoResize = 'HEIGHT'` so text wraps within the component's own width.
**Why:** The component `Description` fields were already filled (session 2). These labels make the descriptions visible on the Figma canvas itself, matching the `/ds-dev/` caption pattern. Used the component's own width as the text wrap width to keep the label visually anchored below its component.

---

## 2026-06-18 — Visual bug fixes

### Root cause: CSS logical properties on replaced elements
**Decision:** Replaced all `paddingBlock`/`paddingInline` logical properties on `<button>` and `<input>` elements with physical `padding` shorthand (`padding: 'Y X'`). Also switched `border: \`...\`` shorthand on `<input>` and `<button>` to individual `borderWidth`/`borderStyle`/`borderColor` properties.
**Why:** Tailwind v3's preflight injects `button,input { padding: 0 }` and `* { border: 0 solid ... }` as unlayered CSS. Although inline styles should always win, Vite + some browser versions apply `padding: 0` (shorthand) after logical property inline styles for replaced elements (`<input>`, `<button>`), collapsing the input to its font line-height (~17px, a "thin line") and collapsing button padding. Physical `padding` shorthand eliminates this ambiguity. CSS logical properties on `<div>`, `<nav>`, and other non-replaced elements are unaffected and left as-is.
**How applied:** Input.jsx (padding + border), Button.jsx (padding + border), CtaBand/Hero/Navbar sections (Button style overrides using physical padding shorthand).

### ComponentGroup layout: flex-column + gap instead of block + margin
**Decision:** Changed `ComponentGroup` in DsDev.jsx from default block display with `marginBottom` to `display: flex; flex-direction: column; gap: var(--spacing-space-3)`. Removed `marginBottom` from `VariantRow` (now uses flex gap from parent).
**Why:** In a block-formatting context, the `marginBottom` of the last VariantRow child (24px) was collapsing into ComponentGroup's own marginBottom (40px), producing max(40px,24px)=40px effective spacing. This was tight enough that in some viewport widths the Badge and NavLink sections appeared to collide. The flex-column approach creates an independent formatting context (no margin collapse) and produces explicit, reliable spacing between all children.

### Card: added boxSizing + minHeight
**Decision:** Added `boxSizing: 'border-box'` and `minHeight: 0` to Card's outer div inline styles.
**Why:** Without `boxSizing: border-box`, `padding: var(--spacing-space-4)` (24px each side) adds to the width/height rather than being included within it — this can cause the card to overflow its container in a flex context, appearing as a thin collapsed strip. `minHeight: 0` ensures the card participates correctly in flex-column sizing in FeatureRow's grid.

---

## 2026-06-18 — Initial setup

### Skill path: project-level vs. global `.claude/`
**Decision:** Created the `figma-sync` skill at `.claude/skills/figma-sync/SKILL.md` inside the `ds/` project root, not at the global `~/.claude/` level.
**Why:** The skill is specific to this design system and references project-specific file paths (figma-snapshot.json, RELEASE-NOTES.md, DECISIONS.md). Keeping it project-level avoids polluting the global skill namespace and makes the skill portable with the repo.

### Release notes rendering: `?raw` import vs. runtime fetch
**Decision:** Used Vite's `?raw` import (`import notes from '../../RELEASE-NOTES.md?raw'`) to embed the markdown at build time, then parsed it with a minimal inline parser.
**Why:** No server-side rendering; the SPA can't read the filesystem at runtime. A `?raw` import is zero-dependency, build-time safe, and HMR-friendly. A full markdown library (remark, marked) was not justified for the simple `## headline / - bullets` format used in RELEASE-NOTES.md.

### Release notes markdown format
**Decision:** `## YYYY-MM-DD · vX.Y.Z — title` followed by `- bullet` lines. No sub-headings, no code blocks.
**Why:** The custom parser in ReleaseNotes.jsx is intentionally minimal. If richer markdown is needed later, switch to a library and update the parser.

### Component description placement in DsDev.jsx
**Decision:** Added a `description` prop to the `ComponentGroup` helper component and rendered it as a `<p>` below the name/node row, max-width 560px, using `ds-text-body-sm` and `color-text-muted`.
**Why:** Matches the visual hierarchy already used in the page (muted caption text under section headings). Max-width 560 keeps line length readable without breaking the existing layout.

### figma-snapshot.json location
**Decision:** Created at `ds/figma-snapshot.json` (project root).
**Why:** Peer to CLAUDE.md and RELEASE-NOTES.md — all "meta" files about the design system live at the root level for easy discovery and gitignore exclusion if needed.

### Figma write access
**Decision:** Figma write succeeded via MCP `use_figma` tool. All 5 component descriptions were written to their respective nodes (44:54 Button, 44:73 Input, 44:94 Badge, 44:89 Card/Default, 44:101 Nav Link). A "Release Notes" page was also created (node 57:13) with the v0.1.0 card (node 57:16).
**Why:** Write access was available; no manual steps required. MANUAL-FIGMA-STEPS.md was not created.
