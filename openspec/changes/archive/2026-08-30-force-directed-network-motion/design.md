## Context

The portfolio currently renders each surrounding node at an authored percentage position and uses Motion for bounded dragging plus a very small CSS wobble. This keeps the composition predictable, but nodes do not react to one another and the network feels static. The existing portfolio has at most a small number of visible nodes per tab, so a lightweight client-side simulation is appropriate.

The central profile node must remain fixed and clickable. Surrounding nodes must remain semantic controls or links, must connect only to the profile node, and must remain usable on narrow screens. Existing project/toolkit/contact data and both modal experiences are outside the physics rewrite.

## Goals / Non-Goals

**Goals:**

- Give surrounding nodes organic spacing, visible ambient motion, collision avoidance, and natural settling.
- Keep the central node fixed at the visual center and preserve central-only connection topology.
- Preserve authored target regions so the simulation remains a portfolio composition rather than an arbitrary graph.
- Make dragging temporarily influence the simulation and allow the node to settle back toward its target region.
- Keep the layout bounded and responsive across desktop, tablet, and mobile viewports.
- Respect reduced-motion preferences by disabling ambient drift and stopping continuous simulation motion when appropriate.

**Non-Goals:**

- No data-driven graph changes, side-node links, or force simulation of the profile node.
- No autonomous rearrangement of the project, toolkit, or contact content order.
- No replacement of the existing modals, labels, icon assets, or tab semantics.
- No server-side simulation or persistence of user-dragged positions.

## Decisions

### Use focused D3 force modules

Use `d3-force` for the simulation and its TypeScript types. The implementation only needs force calculation, not the complete D3 visualization stack. Remove `motion` after the new interaction is wired because Motion's authored-position snap-back is the behavior being replaced.

### Simulate in panel pixels, render in responsive percentages

Maintain simulation coordinates in the current network panel's pixel dimensions. Convert the coordinates to percentages for the absolutely positioned HTML nodes and SVG line endpoints. A `ResizeObserver` will update the simulation bounds and target coordinates when the panel changes size, avoiding a mobile-specific grid fallback or horizontal overflow.

### Combine intentional targets with gentle physics

Each surrounding node receives an authored target coordinate derived from its tab/index. The simulation combines:

- a fixed center node at the panel midpoint;
- one low-strength link force from the center to each surrounding node;
- weak many-body repulsion;
- collision force sized to the rendered node plus label clearance;
- weak X/Y attraction toward each node's authored target region;
- a bounded custom drift force for visible, independent ambient movement.

The link force preserves the visual relationship to the profile while target forces prevent the network from collapsing or wandering out of composition. The line layer continues to render one solid line per surrounding node; simulation ticks only update its endpoints.

The node shell itself remains transparent. The logo viewport or icon backing may retain its own contrast treatment where required, but the surrounding button does not create a tinted sphere behind the mark.

### Use pointer events for drag control

Keep node activation in semantic `<button>` and `<a>` elements and use pointer events with pointer capture for dragging. On pointer down, pin the dragged node, raise the simulation alpha target, and suppress activation when movement exceeds a small threshold. On release, unpin the node, lower the alpha target, and let target/collision forces settle it. This avoids coupling the physics model to a second animation/gesture library.

### Batch simulation ticks into React updates

The simulation will run from a ref and publish positions through a requestAnimationFrame-batched state update. This prevents a React render for every D3 tick while keeping node and line geometry synchronized. The simulation will stop after settling when ambient motion is disabled, and will be cleaned up whenever the tab or component changes.

### Treat reduced motion as a stable layout mode

When reduced motion is preferred, initialize nodes at their target positions, omit drift, use a short settle phase, and stop the simulation once collision resolution is complete. Dragging remains available, but it will not introduce continuous ambient movement after release.

## Risks / Trade-offs

- **[Risk]** A simulation can make nodes drift away from intentional visual regions. → **Mitigation:** use target forces, bounded coordinates, modest link/charge strengths, and collision padding tuned per viewport.
- **[Risk]** Continuous ticks can increase CPU use on mobile. → **Mitigation:** cap the node count already defined by the tabs, batch React updates, lower the alpha target after settling, and stop completely for reduced motion.
- **[Risk]** A node can move while a visitor is trying to click it. → **Mitigation:** keep drift low, use a movement threshold to distinguish drag from click, and suppress activation only after a real displacement.
- **[Risk]** Force results can be nondeterministic and make browser tests flaky. → **Mitigation:** use deterministic seeded target coordinates, assert spatial invariants rather than exact pixels, and wait for a settled simulation state in Playwright.
- **[Risk]** Labels can collide even when circular logos do not. → **Mitigation:** include label clearance in collision radii and use bounded/wrapped mobile labels.

## Migration Plan

1. Add `d3-force` and its TypeScript types, then remove `motion` if no other source uses it.
2. Replace percentage-only placement and Motion drag props with simulation state, target metadata, pointer drag handling, and resize synchronization.
3. Keep the SVG connection layer central-only while deriving endpoints from simulated positions.
4. Tune desktop and mobile force constants and verify no overflow or inaccessible controls.
5. Update Playwright coverage for settling, collision spacing, drag behavior, reduced motion, and central-only lines.
6. Run the production build, unit-test command, and desktop/mobile browser suite.

Rollback is a revert of this follow-up change; the committed `feature/futuristic-network-portfolio` snapshot remains the fallback.

## Open Questions

- Whether the final visual tuning should favor more pronounced drift or faster settling after the first browser review.
- Whether mobile labels need a dedicated compact label treatment after testing with the final node count.
