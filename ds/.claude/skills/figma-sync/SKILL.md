# Skill: figma-sync

**Trigger:** User asks to "sync with Figma", "pull changes from Figma", "update from Figma", "update release notes", "log changes", "log today's changes", "backfill notes", or similar.

**Purpose:** Diff the current Figma component state against `ds/figma-snapshot.json`, propagate any changes into the codebase, and write a dated release-notes entry to **both** `RELEASE-NOTES.md` and the Figma "Release Notes" page.

---

## Workflow

### 0. Load current snapshot
Read `ds/figma-snapshot.json`. This is the last known state — the diff baseline.

### 1. Read Figma nodes SEQUENTIALLY
Read each component node **one at a time** using `mcp__figma-mcp__get_design_context` or `mcp__figma-mcp__get_metadata`. Do NOT batch all nodes in one call — this causes timeouts.

Target nodes (file `YJlrRZ0qVDw0pwdLsbouF2`):
- `44-54` → Button
- `44-73` → Input
- `44-94` → Badge
- `44-89` → Card
- `44-101` → NavLink

On an API error for any node: log the error to DECISIONS.md, skip that node, and **continue** — do not abort. Use the cached snapshot entry for that node.

### 2. Diff snapshot vs. live Figma state
For each component compare:
- **name** — did it get renamed?
- **description** — did the Figma description change?
- **variants / props** — were variants added or removed?

Classify each component as: `unchanged` | `changed` | `new` | `removed`.

### 3. Propagate changes (for each changed / new component)

**a) Update the `.jsx` description comment**
Edit the opening JSDoc block in `src/components/<Name>.jsx`:
- Keep the 1–2 sentence description accurate.
- Keep the existing Figma node reference and props docs below it.

**b) Update the `/ds-dev/` caption**
In `src/DsDev.jsx`, update the `description` prop on the matching `<ComponentGroup>` element to match the new description.

**c) Write description back to Figma (if write access is available)**
Use `mcp__figma-mcp__use_figma` (after reading the figma-use skill instructions) to update the component's description field in Figma. If write access is unavailable:
- Record the reason in `DECISIONS.md`.
- Append the manual steps to `MANUAL-FIGMA-STEPS.md`.

**d) Update `figma-snapshot.json`**
Overwrite the component's entry with the new name, variants, props, and description. Update `snapshotAt` to today's date.

### 4. Handle removed components
If a component present in the snapshot is no longer found in Figma, log a warning in DECISIONS.md. Do **not** delete the component from the codebase automatically — flag it for human review.

### 5. Log every decision
Any non-obvious choice (skipped node, conflict resolution, write failure) must be appended to `DECISIONS.md` with a date prefix.

### 6. Write release notes — MANDATORY FINAL STEP

This step is **required** regardless of whether any components changed. It fires at the end of every sync and after any task that changed a component, layout, or description.

**a) Write to `RELEASE-NOTES.md`**
Prepend a new dated entry at the TOP of the file:
```
## YYYY-MM-DD · vX.Y.Z — <short title>

- <component or area>: <what changed>
- ...
```
Bump the patch version (e.g. v0.1.0 → v0.1.1) for fixes and doc updates; bump minor (v0.1.x → v0.2.0) for new components or significant API changes.

**b) Mirror to Figma "Release Notes" page (node 57:13)**
Using `use_figma`, create a new card frame on the Release Notes page that replicates the styling of the existing cards:
- VERTICAL auto-layout frame, 24px padding all sides, 14px item spacing, 12px corner radius
- White fill (`{r:1,g:1,b:1}`), border stroke (`{r:0.886,g:0.910,b:0.941}`)
- Heading: Inter Bold 20px, dark color `{r:0.059,g:0.090,b:0.161}`
- Bullets: HORIZONTAL row frames (itemSpacing:8), dash "—" in Inter Medium 14px blue `{r:0.145,g:0.380,b:0.921}`, text in Inter Regular 14px muted `{r:0.392,g:0.455,b:0.545}`
- Place below the last existing card (y = last card bottom + 24px), same x:48, width:688

Read back the new card node ID as proof.

---

## File locations

| File | Purpose |
|------|---------|
| `ds/figma-snapshot.json` | Last-known Figma state (diff baseline) |
| `ds/RELEASE-NOTES.md` | Human-readable changelog; rendered at `/release-notes/` |
| `ds/DECISIONS.md` | Log of non-obvious choices made during sync |
| `ds/MANUAL-FIGMA-STEPS.md` | Steps to apply manually if Figma write is unavailable |
| `ds/src/components/*.jsx` | Component implementations; JSDoc description at top |
| `ds/src/DsDev.jsx` | Design-system reference page; `description` prop on `ComponentGroup` |
| Figma page `57:13` | "Release Notes" page; cards mirror `RELEASE-NOTES.md` entries |

---

## Notes

- Always read nodes **one at a time**. Figma MCP calls can timeout on bulk requests.
- Before calling `use_figma`, read the figma-use skill instructions (resource: `skill://figma/figma-use/SKILL.md`).
- The `?raw` import in `ReleaseNotes.jsx` re-embeds `RELEASE-NOTES.md` at build time — no extra steps needed after editing the file.
- If `figma-snapshot.json` does not exist, treat all live Figma components as "new" and build the snapshot from scratch.
- **Append cards to Figma before setting FILL** — Figma API requires a node to be a child of an auto-layout frame before `layoutSizingHorizontal = 'FILL'` can be set.
