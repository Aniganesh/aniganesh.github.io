## 1. Branch and foundation

- [x] 1.1 Create and switch to `feature/futuristic-network-portfolio` from the clean `master` state
- [x] 1.2 Add the new portfolio module structure and shared TypeScript types for tabs, nodes, Toolkit items, and modal state
- [x] 1.3 Add the selected icon dependencies/assets and establish a single icon rendering contract for required Toolkit icons

## 2. Portfolio content and assets

- [x] 2.1 Retain the existing work-project data and Indic Games, and remove Rajini Lipsum, Help Me Decide, and Colour Palette Creator from the rendered portfolio data
- [x] 2.2 Add Toolkit data for technologies, libraries, and packages only, excluding non-technology skills and technical leadership, with an icon defined for every item
- [x] 2.3 Adapt the existing contact links into Contact nodes and add any required local or bundled brand icons
- [ ] 2.4 Add the replacement profile image and update the central-node, favicon, and Apple touch icon asset references
- [x] 2.5 Normalize project and brand logo assets for node rendering, retaining local project-specific logos and avoiding runtime CDN dependencies where practical

## 3. Network portfolio interface

- [x] 3.1 Implement the full-page dark futuristic shell with background glow, grid/particle treatment, and responsive central profile node
- [x] 3.2 Implement the SVG connection layer and reusable node component with active, hover, focus, and transition states
- [x] 3.3 Implement the `Projects`, `Toolkit`, and `Contact` tab navigation with Projects selected by default
- [x] 3.4 Render the active tab’s node collection and animate connections/nodes when the active tab changes
- [x] 3.5 Implement project node activation and the glass-style project detail modal
- [x] 3.6 Implement modal dismissal through close control, Escape, and backdrop interaction, with focus restoration
- [x] 3.7 Add the `motion` dependency and replace static node offsets with bounded draggable circular nodes that spring back to their authored home positions
- [x] 3.8 Restyle the network to use borderless circular nodes with separate floating labels, solid non-animated connection lines, centered subtle tabs, and no portfolio eyebrow or animated center orbits

## 4. Responsive and accessibility behavior

- [x] 4.1 Add desktop, tablet, and mobile node layouts without horizontal overflow
- [x] 4.2 Add semantic tab/button/link behavior, labels, visible focus states, and safe external-link handling
- [x] 4.3 Add reduced-motion behavior for network and modal transitions
- [x] 4.4 Verify long project content remains readable and scrollable inside the modal

## 5. Replace legacy UI

- [x] 5.1 Replace the existing Screen composition and root styling with the new network portfolio
- [x] 5.2 Remove the old sidebar, menu, Toolkit, intro, project-card, footer, and project-toggle UI files that are no longer referenced
- [x] 5.3 Remove obsolete hooks, link helpers, theme constants, legacy CSS, and dead type definitions after a repository-wide reference check
- [x] 5.4 Remove orphaned old assets that are not used by the new portfolio, preserving only retained project data/assets and required deployment assets
- [x] 5.5 Audit imports and remove unused packages such as legacy Material-UI, `clsx`, or `react-markdown` when the final implementation no longer needs them
- [x] 5.6 Regenerate `yarn.lock` and verify the dependency tree contains the packages required by the final implementation, including Playwright

## 6. Verification

- [x] 6.1 Add `@playwright/test`, Playwright configuration, and a test web-server command for the CRA application
- [x] 6.2 Install the required Playwright browser and document the local browser-test command
- [x] 6.3 Add Playwright coverage for the default Projects tab, tab switching, and tab-specific node sets
- [x] 6.4 Add Playwright coverage for project-node activation, modal content, close control, Escape, backdrop dismissal, and focus restoration
- [x] 6.5 Add Playwright coverage for Contact links, mobile layout/no horizontal overflow, keyboard navigation, and reduced-motion behavior
- [x] 6.6 Run the Playwright browser suite in a desktop viewport and representative mobile viewport
- [x] 6.7 Run `DISABLE_ESLINT_PLUGIN=true yarn build`
- [x] 6.8 Run relevant tests with `yarn test`
- [x] 6.9 Confirm the working tree contains only intended feature changes and no generated `build/` output
- [x] 6.10 Add Playwright coverage for dragging a node, spring return behavior, and the static connection-line presentation

## 7. Follow-up visual, interaction, and data verification

- [x] 7.1 Confirm the `Toolkit` tab name is used consistently in all user-facing copy and documentation.
- [x] 7.2 Restrict the connection graph to central-profile-to-surrounding-node lines and remove every side-node-to-side-node link.
- [x] 7.3 Add subtle independent wobble motion to each floating node while preserving its authored home position and reduced-motion behavior.
- [x] 7.4 Remove side-node shadows and normalize every logo into a contained circular viewport.
- [x] 7.5 Replace the REBNY Lease Store, Zustand, Pulumi, Socket.IO, PostgreSQL, and Node.js logos with checked-in favicon assets sourced from their specified official sites.
- [x] 7.6 Add a visible backing treatment for the Express.js logo.
- [x] 7.7 Ensure a drag gesture cannot activate a project modal, with Playwright coverage for click-versus-drag behavior.
- [x] 7.8 Verify the Mithya UI Registry duration against the old project data and correct the displayed value if needed.
- [x] 7.9 Restyle project modals as transparent frosted glass with no border, no eyebrow, and an icon-only borderless/backgroundless X close control.
- [x] 7.10 Extend Playwright coverage for central-only topology, wobble/reduced motion, logo containment, modal chrome, and the specified favicon assets.

## 8. Follow-up central profile interaction

- [x] 8.1 Make the central profile node clickable in Projects, Toolkit, and Contact, opening and dismissing an accessible profile modal that describes Aniruddha Ganesh's experience and AI systems expertise; keep the focused Playwright coverage passing.
