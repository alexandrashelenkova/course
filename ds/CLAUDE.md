# WBL AI Design System — Claude Rules

## Project context

React + Vite SPA. No TypeScript. Tailwind with inline arbitrary values. All colors/spacing/radius/effects come from CSS custom properties in `src/tokens.css` — **never hardcode values**.

- **`/ds-dev/`** — live design-system reference page (DsDev.jsx). Keep strictly separate from `/page/`.
- **`/page/`** — marketing page using the design system. Do not touch btn-playground.
- **`/release-notes/`** — rendered from `RELEASE-NOTES.md` via Vite `?raw` import.

Figma file: **WBL AI Design System Shorts** (ID: `YJlrRZ0qVDw0pwdLsbouF2`). Components in nodes 44-52. Release Notes page: node `57:13`.

---

## Required: on any component creation or change

1. **Update description in the `.jsx` comment** — the opening sentence(s) of the JSDoc block at the top of the component file must reflect what the component is and when to use it.

2. **Update description in `/ds-dev/`** — the matching `description` prop on the `ComponentGroup` element in `DsDev.jsx` must stay in sync with the `.jsx` comment.

3. **Update Figma description** — if write access is available, write the updated description into the component's description field in Figma using the figma-sync skill. If not available, record the reason in `DECISIONS.md` and add manual steps to `MANUAL-FIGMA-STEPS.md`.

4. **Add an entry to `RELEASE-NOTES.md`** — format: `## YYYY-MM-DD · vX.Y.Z — short title` followed by `- bullet` lines. Prepend at the TOP (newest first). One entry per meaningful change session.

5. **Mirror to Figma Release Notes page** — add the same entry as a styled card on Figma page `57:13`, matching the layout of existing cards. Read back the new node ID as proof.

6. **Update `ds/figma-snapshot.json`** — keep the snapshot current: name, figmaNode, variants, props, description for each component.

---

## Mandatory completion check

**A task that changed any component, layout, or description is NOT complete until:**

- [ ] A dated `RELEASE-NOTES.md` entry exists for today's changes
- [ ] That entry is mirrored as a card on the Figma Release Notes page (node `57:13`) — report the card node ID

Before declaring any task done, run this self-check: *"Did I write a RELEASE-NOTES.md entry AND mirror it to Figma page 57:13?"* If either is missing, complete it before closing out.

---

## Skill: figma-sync

Run `/figma-sync` (or say "update release notes", "log changes", "log today's changes") to sync Figma state, update the codebase, and write release notes to both places. See `.claude/skills/figma-sync/SKILL.md` for the full workflow.
