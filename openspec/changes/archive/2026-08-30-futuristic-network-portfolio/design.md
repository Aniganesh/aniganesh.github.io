## Context

The current site is a Create React App written in TypeScript and styled with Material-UI v4. Its main screen is composed of a sidebar, introductory content, Toolkit content, project cards, and a footer. The new experience will replace that presentation entirely while preserving selected portfolio data and the existing deployment setup.

The new homepage needs a responsive visual system for a central profile image, connected nodes, tab-specific content, project detail modals, and a dark glass/neon aesthetic. It also needs a consistent way to render both generic skill icons and exact technology, social, and project logos.

## Goals / Non-Goals

**Goals:**

- Replace the old homepage UI with a single interactive network portfolio experience.
- Provide `Projects`, `Toolkit`, and `Contact` tabs, with `Projects` selected initially.
- Reuse work-project data and retain only `Indic Games` from the former personal-project list.
- Represent Toolkit entries for technologies, libraries, and packages only, excluding generic skills and technical leadership, with a required icon on every entry.
- Provide project detail glass modals and accessible tab/node interactions.
- Make the central profile node an interactive control in every tab, with a profile modal covering Aniruddha Ganesh's experience and AI systems expertise.
- Support desktop, mobile, keyboard navigation, and reduced-motion preferences.
- Make the network nodes circular, borderless, draggable, and floating, with a subtle independent wobble and a gentle spring return to their configured home positions.
- Connect each surrounding node only to the central profile node. Keep connection lines solid and visually static while allowing their geometry to follow a node during a drag.
- Use local or bundled visual assets so the network does not depend on remote image availability at runtime. Approved favicon sources are REBNY Lease Store `https://www.rebny.com/`, Zustand `https://zustand.docs.pmnd.rs/`, Pulumi `https://www.pulumi.com/`, Socket.IO `https://socket.io/`, PostgreSQL `https://www.postgresql.org/`, and Node.js `https://nodejs.org/en`.
- Verify user-visible browser behavior with Playwright.

**Non-Goals:**

- No backend, CMS, authentication, or API changes.
- No preservation, archive route, or fallback view for the old portfolio layout.
- No new small-project section beyond Indic Games.
- No requirement for Toolkit or Contact nodes to use project-style modals; their interaction can remain a link or lightweight detail treatment.
- No retention of dead legacy code or dependencies solely for rollback; rollback is provided by the feature branch history.

## Decisions

### Replace the screen composition in place

The root screen will render the new network portfolio directly. Obsolete sidebar, section, card, and project-toggle components will be removed rather than retained or archived. React, TypeScript, the existing build/deployment configuration, and useful static assets will remain.

### Keep the existing Project shape

The existing `Project` fields already cover project node labels, imagery, descriptions, roles, duration, detailed content, and links. The new UI will consume that data directly and filter the retained set instead of introducing layout fields or duplicating project content. Indic Games will be combined with the work projects for the Projects tab.

### Add a separate Toolkit-item contract

Technologies, libraries, and packages do not have the semantics of a project, so Toolkit entries will use a small dedicated type. Its `icon` field will be required and will accept a React icon component, allowing every node to render deterministically without a missing-icon placeholder. Non-technology skill categories will not be represented as Toolkit nodes.

### Use a hybrid icon strategy

- Use `@phosphor-icons/react` for generic interface and skill concepts, such as mail, code, database, globe, and terminal. Its configurable size, color, and weight fit the network styling.
- Use selected Devicon SVGs for development technologies when an exact technology mark is needed.
- Use selected Simple Icons SVGs for social and brand marks.
- Keep project-specific logos as local assets from `public/projects` or newly supplied local assets.
- Prefer checked-in SVG assets for Devicon/Simple Icons selections instead of runtime CDN URLs, keeping rendering reliable and bundle usage intentional.

Material-UI icons may remain available for compatibility during the rewrite, but they will not be the primary brand-icon source.

### Render the network with HTML/CSS and SVG

Use an SVG layer for solid connection paths, with HTML/React nodes positioned above it. Draw exactly one connection from the central profile node to each active surrounding node; do not draw side-node-to-side-node links. This keeps lines responsive and styleable while preserving semantic buttons/links for keyboard and screen-reader access. Connection geometry may update immediately as a node is dragged, but the lines themselves will not use dash, pulse, or path animations. Node placement will be view metadata or computed from the active item index, not stored in project content.

### Use Motion for draggable node interaction

Use the `motion` package and its React bindings for node gestures and spring behavior. Each node will retain a deterministic home position, render as a circular interactive element with a separate floating label, and expose a bounded drag offset. On release, Motion will spring the node back to its home position. This is a better fit than a force simulation because the design calls for authored positions and temporary user displacement, not autonomous repulsion or continuously changing layout. D3-force remains an option only if the experience later needs collision resolution or self-organizing links.

### Use state-driven interaction

The portfolio will maintain active tab, selected project, selected profile modal, and node interaction state in the new screen component. Changing tabs will replace the visible node collection and transition the network without line animation. The central profile node will remain available and clickable in every tab, opening a profile modal with Aniruddha Ganesh's background, experience, and AI systems expertise. Selecting a project will open a modal with the selected project data only after an intentional click/tap activation; completing a drag must not activate the project modal. Escape, close control, and backdrop interaction will dismiss either modal, with focus restored to the originating control when possible. The header will contain only subtle, centered tab controls; the portfolio title/eyebrow will be omitted. Toolkit is the user-facing name everywhere.

### Central profile modal

The central profile image will be wrapped in a semantic interactive control with a stable accessible name. Its profile modal will use the same transparent frosted-glass treatment as project modals while presenting profile-specific content: Aniruddha Ganesh's professional experience, areas of expertise, and work with AI systems. The modal will expose a dialog role, an accessible heading, and a keyboard-usable icon-only close control. The profile interaction and modal state will not depend on which primary tab is active.

### Normalize node and modal presentation

Each node logo must fit inside a circular container without clipping or distortion, and side nodes must not cast shadows. Project modals must use a transparent frosted-glass background with no visible border and no eyebrow text. The close control must be an icon-only X with no border or background. The Express logo requires a visible backing treatment so it remains legible against the dark network.

### Verify retained project metadata

Before finalizing displayed metadata, compare the Mithya UI Registry duration with the old project data in the repository and use the verified old value when the current value is inaccurate.

### Remove obsolete implementation after the replacement is wired

Once the new root composition builds, remove the old sidebar, menu, section, project-card, project-toggle, media-query, and link-helper code that has no remaining consumers. Remove obsolete styles, theme constants, and orphaned assets after a repository-wide reference check. Audit `package.json` and `yarn.lock` and remove packages made unnecessary by the rewrite, such as legacy Material-UI, `clsx`, or `react-markdown` dependencies when they are no longer imported. Keep React, TypeScript, the CRA toolchain, Playwright, and any dependency still required by the final implementation.

### Treat the new profile image as a first-class asset

The supplied replacement profile image will be stored locally, used in the center node, and referenced by favicon/apple-touch-icon configuration where appropriate. The implementation will not depend on the old `Me3.png` once the replacement is available.

### Use Playwright for browser-level verification

Add `@playwright/test` and a Playwright configuration that starts the CRA development server for browser tests. Tests will exercise the rendered experience rather than implementation details: the default tab, tab-driven node changes, project modal open/close behavior, contact links, responsive layouts, keyboard operation, and reduced-motion behavior. Use stable accessible names and semantic roles as selectors so the tests validate the public interface.

## Risks / Trade-offs

- **[Risk]** A radial network can become crowded on small screens. → **Mitigation:** use breakpoint-specific layouts and a mobile node list/stack while keeping the central profile prominent.
- **[Risk]** SVG lines and glow effects can reduce performance or readability. → **Mitigation:** keep the connection graph bounded, use solid non-animated paths, update geometry only when node layout or drag state changes, and respect reduced-motion preferences.
- **[Risk]** Brand logos may have different proportions and visual styles. → **Mitigation:** normalize them inside fixed icon viewports and retain local assets for logos that need exact treatment.
- **[Risk]** Long project descriptions can overwhelm a glass modal. → **Mitigation:** preserve the existing detailed content but constrain modal dimensions, provide scrolling, and keep the summary visible first.
- **[Risk]** New icon dependencies can increase the initial bundle. → **Mitigation:** import only selected Phosphor icons and check in only the selected external SVG assets.
- **[Risk]** Browser tests can be brittle if they depend on animation timing or node coordinates. → **Mitigation:** assert semantic state and accessible content, disable or reduce motion where appropriate, and avoid pixel-coordinate selectors.
- **[Risk]** A profile modal could become inconsistent across tab-specific network states. → **Mitigation:** keep the central control outside the tab-specific node collection and exercise open/close behavior in every tab with Playwright.
- **[Risk]** Removing a seemingly unused package or asset can break a remaining entry point. → **Mitigation:** perform repository-wide import/reference checks, remove items incrementally, regenerate the lockfile with Yarn, and run the build, unit tests, and Playwright suite afterward.

## Migration Plan

1. Create and work on `feature/futuristic-network-portfolio`.
2. Add the new screen, data adapters, icon assets, and profile image.
3. Replace the old root screen composition and remove obsolete UI components.
4. Update favicon/apple-touch-icon references and verify asset paths.
5. Install the Playwright browser used by the test suite and run browser tests at desktop and mobile breakpoints.
6. Run the production build and relevant unit/browser tests.
7. Rollback, if needed, by reverting the feature branch; `master` remains unchanged until the replacement is accepted.

## Open Questions

- Final replacement profile image file and preferred crop/aspect ratio.
- Final Toolkit-item list and which entries should have descriptions or external links.
- Whether Toolkit nodes should open a detail treatment or remain non-modal visual nodes.
- Whether Contact should include an email node in addition to the existing social links.
