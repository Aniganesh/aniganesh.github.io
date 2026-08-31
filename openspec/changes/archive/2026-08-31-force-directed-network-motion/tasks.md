## 1. Simulation foundation

- [x] 1.1 Add `d3-force` and the required TypeScript types; remove `motion` after confirming no remaining source imports depend on it.
- [x] 1.2 Define simulation node state, authored targets, central fixed-node state, viewport bounds, and deterministic initialization metadata.
- [x] 1.3 Implement simulation forces for central attraction, authored target attraction, collision avoidance, weak repulsion, and bounded independent drift.

## 2. Network integration

- [x] 2.1 Replace Motion-based placement and snap-back behavior with a lifecycle-managed D3 simulation tied to the active tab.
- [x] 2.2 Batch simulation ticks into React position updates and keep SVG central-only line endpoints synchronized.
- [x] 2.3 Add ResizeObserver handling and separate desktop/mobile force constants without reintroducing a mobile grid fallback.
- [x] 2.4 Implement pointer capture dragging, simulation reheating, movement-threshold click suppression, and post-drag settling.
- [x] 2.5 Preserve the central profile control, surrounding node semantics, project/toolkit/contact activation, and both modal flows.

## 3. Motion and accessibility

- [x] 3.1 Add reduced-motion simulation behavior that removes ambient drift and stops after initial settling.
- [x] 3.2 Tune circular node and label collision radii, bounds, and mobile scale to prevent overlap and horizontal overflow.
- [x] 3.3 Remove obsolete wobble CSS and any dependency/source code made unnecessary by the force simulation.

## 4. Verification

- [x] 4.1 Add Playwright coverage for force-driven bounds, non-overlap, central-only lines, and stable tab-specific node collections.
- [x] 4.2 Add Playwright coverage for drag reheating/settling, drag-versus-click behavior, and profile/project modal preservation.
- [x] 4.3 Add Playwright coverage for mobile layout and reduced-motion stopping behavior.
- [x] 4.4 Run `DISABLE_ESLINT_PLUGIN=true yarn build` and the relevant unit-test command.
- [x] 4.5 Run the Playwright suite at desktop and mobile viewports, then confirm no generated artifacts or unintended changes remain.

## 5. Visual energy tuning

- [x] 5.1 Remove tinted backgrounds from surrounding node shells while preserving only necessary logo/icon contrast treatments.
- [x] 5.2 Increase charge strength, influence radius, drift, and simulation energy while retaining target attraction, collision avoidance, and bounds.
- [x] 5.3 Add browser coverage for transparent node shells and perceptible live force movement, then rerun the complete suite.
- [x] 5.4 Remove the background grid layer while retaining the subdued radial, scanline, ambient, and star-field depth treatments.
- [x] 5.5 Dim the connecting strokes, lower background chroma, and soften the central profile glow.

## 6. Cross-browser mobile refinement

- [x] 6.1 Replace the central profile button with an accessible role-based control that supports click, Enter, and Space activation.
- [x] 6.2 Give the central control and profile frame explicit equal dimensions so Firefox cannot resolve them as a vertically flattened ellipse.
- [x] 6.3 Reduce mobile repulsion, link pull, target attraction, drift, and simulation energy while increasing mobile damping; preserve desktop tuning.
- [x] 6.4 Add Playwright coverage for role-based profile activation and square mobile profile geometry.
- [x] 6.5 Run the production build and complete Playwright suite after the cross-browser/mobile refinement.
