## Why

The current portfolio presents information as a conventional sidebar, sections, and project-card layout. A full replacement with an interactive network centered on the portfolio owner will make the site more distinctive, give visitors a direct way to explore projects and skills, and provide a cohesive home for project, Toolkit, and contact information.

## What Changes

- **BREAKING**: Replace the existing homepage UI and layout with a futuristic dark-themed network interface centered on a new profile image.
- Add three top-level tabs: `Projects`, `Toolkit`, and `Contact`, with `Projects` active by default.
- Change the connected nodes around the profile image when the active tab changes.
- Make the central profile node clickable from `Projects`, `Toolkit`, and `Contact`, opening a profile modal describing Aniruddha Ganesh, his experience, and expertise in AI systems.
- Reuse existing work-project content and retain `Indic Games`; remove the other small personal projects.
- Show technologies, libraries, and packages in the Toolkit view, with an icon required for every Toolkit item; omit non-technology skills and technical leadership.
- Make surrounding nodes circular, draggable, and spatially floating, with a subtle independent wobble and a gentle spring return to their configured home positions.
- Connect every surrounding node only to the central profile node. Use solid, non-animated connection lines and subtle centered tab controls.
- Open project details in glass-style modals originating from the selected project node.
- Use a hybrid icon strategy: Phosphor or Material icons for generic UI symbols, Devicon for development technologies, Simple Icons for brands and social links, and local SVG/image assets for project-specific logos. Use the specified official-site favicon sources for REBNY Lease Store, Zustand, Pulumi, Socket.IO, PostgreSQL, and Node.js.
- Replace the current profile image and update related profile/favicon assets.
- Remove the old sidebar, section, card, and project-toggle presentation code rather than preserving or archiving it.
- Add Playwright browser tests covering the core tab, node, modal, responsive, keyboard, and reduced-motion interactions.
- Add cross-tab Playwright coverage for opening and closing the central profile modal.
- Ensure dragging a project node does not open its modal.
- Verify the Mithya UI Registry duration against the old project data before displaying it.
- Remove legacy source code, styles, assets, and npm packages that are no longer referenced after the rewrite.

## Capabilities

### New Capabilities

- `network-portfolio`: Interactive tabbed network presentation of projects, Toolkit items, and contact links, including node interactions and project detail modals.

### Modified Capabilities

<!-- No existing OpenSpec capabilities are present. -->

## Impact

- Replaces the React screen composition and portfolio styling in `src/`.
- Reuses and filters the existing project and contact data in `src/Screen/Sections/Constants.ts`.
- Adds Toolkit-item content and a required icon contract for each Toolkit node.
- Adds or updates icon dependencies/assets and the new profile image.
- Updates favicon and Apple touch icon references in `public/index.html`.
- Adds Playwright configuration, browser test fixtures, and the required browser-test dependency/tooling.
- Removes obsolete UI dependencies and updates `package.json`/`yarn.lock` to match the new implementation.
- Does not change backend APIs or deployment infrastructure.
