## 1. Profile assets and document metadata

- [x] 1.1 Add the supplied JPEG portrait under `public/` and update the profile node and profile modal to use it.
- [x] 1.2 Verify the generated `public/og-image.jpg` is present, 1200x630, and uses the portrait plus orange-to-navy technology composition.
- [x] 1.3 Update `public/index.html` with the AI-native full-stack title, accurate description, canonical URL, Open Graph fields, and Twitter large-image fields.

## 2. Central profile-node interaction

- [x] 2.1 Publish the profile simulation position alongside surrounding-node positions and render the central node from that shared state.
- [x] 2.2 Update SVG line origins to follow the rendered profile position while preserving one line per surrounding node.
- [x] 2.3 Add pointer capture, movement-threshold tracking, and drag handlers for the central role-based profile control.
- [x] 2.4 Implement bounded central dragging and deterministic reduced-motion-aware return to the exact panel midpoint, leaving the profile pinned after release.
- [x] 2.5 Preserve profile-modal click, Enter, and Space activation while suppressing activation after a meaningful drag.

## 3. Selection-safe styling

- [x] 3.1 Prevent selection on the network surface, node labels, imagery, and SVG connection layer; disable native image dragging there without affecting modal text selection.
- [x] 3.2 Add grab/grabbing cursor and interaction styling for the central profile node.

## 4. Browser verification

- [x] 4.1 Add Playwright coverage for central-node displacement, line-origin movement, exact center return, and drag-versus-click behavior.
- [x] 4.2 Add Playwright coverage for keyboard profile activation, network selection styles, optimized profile image sources, and Open Graph/Twitter metadata.
- [x] 4.3 Run the production build and relevant Playwright suite, then inspect the built metadata and final social image.
- [x] 4.4 Confirm the working tree contains only the intended OpenSpec artifacts, profile assets, source changes, and tests.
