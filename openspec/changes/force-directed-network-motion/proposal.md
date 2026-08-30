## Why

The current network uses authored coordinates, a tiny CSS wobble, and a direct snap-back after dragging. It remains orderly, but it does not feel like a living network in free space. A bounded force simulation will add organic spacing, inertia, collision avoidance, and ambient movement while keeping the portfolio's intentional central composition.

## What Changes

- **BREAKING**: Replace the current static node-placement and Motion snap-back model with a bounded force-directed simulation.
- Keep the profile node fixed at the center and preserve exactly one connection from each surrounding node to the profile node.
- Add gentle attraction toward authored target regions, collision avoidance, weak repulsion, and low-amplitude ambient drift so the layout feels alive without becoming chaotic.
- Increase the simulation's visible energy after browser review: transparent node shells, stronger repulsion, a larger force radius, and more pronounced independent drift while retaining composition bounds.
- Make drag interactions temporarily reheat the simulation and let nodes settle naturally after release.
- Keep node labels, project/toolkit/contact behavior, profile and project modals, and central-only connection topology unchanged.
- Tune simulation bounds, node radius, and force strength for desktop and mobile layouts independently.
- Add Playwright coverage for stable initial placement, non-overlapping mobile nodes, drag reheating/settling, central-only links, and reduced-motion behavior.
- Remove the implementation and dependency code that is no longer needed after the force simulation is wired.

## Capabilities

### New Capabilities

- `force-directed-network-motion`: Organic force-based layout and interaction behavior for the portfolio network.

### Modified Capabilities

- `network-portfolio`: Change the node-motion and responsive-layout requirements while retaining the existing content, modal, accessibility, and central-only topology requirements.

## Impact

- Updates `src/Portfolio/NetworkPortfolio.tsx`, `src/Portfolio/styles.css`, and possibly portfolio types/data for simulation metadata.
- Adds the focused `d3-force` dependency rather than the current position-only motion mechanism, if the implementation confirms it is needed.
- Updates Playwright browser tests and the active portfolio specs/design artifacts.
- No backend, project content, contact destinations, or deployment infrastructure changes.
