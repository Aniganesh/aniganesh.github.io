## Context

The current portfolio uses a D3 force simulation for surrounding nodes, but the profile node is initialized with fixed `fx`/`fy` coordinates and is rendered at static `50%`/`50%` CSS coordinates. Connection lines consequently always originate at the visual center. The profile image is also loaded from a large PNG, and `public/index.html` has only basic document metadata.

The requested follow-up needs to extend the existing pointer-drag model without changing node semantics or the central-only graph topology. It also needs a stable, crawler-friendly social image that reflects the portfolio's AI-native full-stack positioning.

## Goals / Non-Goals

**Goals:**

- Make the central profile node draggable with mouse, touch, and pointer capture.
- Keep the profile node, line origins, and line endpoints synchronized while it is displaced.
- Distinguish a central-node drag from a click and preserve click, Enter, and Space profile-modal activation.
- Ease the profile node back to the exact network midpoint on release and leave it pinned there.
- Prevent selection and native image dragging on the interactive network surface.
- Serve the smaller JPEG profile asset in the page and add a generated 1200x630 JPEG social-preview asset.
- Add descriptive title, description, canonical URL, Open Graph, and Twitter metadata.
- Verify the behavior through focused Playwright assertions and a production build.

**Non-Goals:**

- Do not make the profile node permanently free-floating or persist dragged positions.
- Do not change the surrounding-node force model, project/toolkit/contact data, modal content, or external links.
- Do not disable useful text selection inside project and profile dialogs.
- Do not make generated artwork responsible for rendering exact technology brand logos or metadata text.
- Do not add a runtime dependency or server-side metadata system.

## Decisions

### Extend the existing pointer-drag lifecycle

The central profile control will use the same pointer-capture and movement-threshold pattern already used by surrounding nodes. Its simulation node remains fixed while idle. Pointer down pins it to its current coordinates, pointer move updates `fx`/`fy` and publishes the profile position, and pointer end starts the return sequence. This keeps the role-based control and existing keyboard behavior intact while avoiding a second gesture library.

Alternatives considered:

- CSS-only dragging: rejected because the D3 node and SVG line geometry would become unsynchronized.
- Making the profile node permanently simulated: rejected because other forces could move it away from the exact visual center after release.

### Return through a short deterministic tween

On release, the profile node will remain temporarily pinned while its pixel coordinates are eased from the released position to `bounds.width / 2` and `bounds.height / 2`. Each animation frame updates the node and the published percentage position, so the profile image and all connection-line origins travel together. The final frame explicitly sets the exact midpoint and retains `fx`/`fy` there. Reduced-motion mode skips the tween and applies the midpoint immediately.

Alternatives considered:

- Releasing the node into `forceX`/`forceY`: rejected because charge, link, and collision forces could leave it slightly off-center.
- Immediate snap-back: rejected because it is visually abrupt and makes the line origin jump.

### Publish the central position with surrounding positions

The existing batched React position state will include the `profile` node. The central control will receive an inline percentage position, and each SVG line will use that same position for `x1`/`y1`, while surrounding endpoints continue to use their simulated positions. The default remains `50%`/`50%` before the first simulation frame.

### Scope selection suppression to the network surface

The network panel, node imagery, labels, and SVG connection layer will use `user-select: none`; images will also be marked non-draggable. Modal copy remains selectable so visitors can copy project and profile details. This addresses accidental selection during dragging without degrading the information surface.

### Use JPEG for page and social imagery

The supplied `Me_orange_bg.jpg` is the same portrait as the existing PNG at roughly 497 KB versus 6.9 MB. It will become the served profile asset under `public/`. The generated `public/og-image.jpg` is a separate 1200x630 JPEG with the portrait on the left, orange-to-navy gradient, and restrained technology/network motifs on the right. The Open Graph URL will be absolute and point to the generated JPEG for broad crawler compatibility.

### Keep metadata static and crawler-visible

`public/index.html` will contain the title, description, canonical URL, Open Graph fields, and Twitter `summary_large_image` fallback. The title will be `Aniruddha Ganesh | AI-Native Full-Stack Engineer`; the description will clarify the React, React Native, Next.js, Node.js, streaming, and agentic-AI product experience without implying model-research specialization.

## Risks / Trade-offs

- **[Risk]** A profile drag could accidentally open the modal on release. → **Mitigation:** reuse the 4px movement threshold and suppress the next click after meaningful displacement.
- **[Risk]** The center return animation could race with simulation ticks. → **Mitigation:** keep the profile pinned throughout the tween, update its `x`/`y` directly, and re-pin the exact midpoint at completion.
- **[Risk]** The profile could be dragged partly outside the panel. → **Mitigation:** clamp it using its larger center-node radius rather than the surrounding-node padding.
- **[Risk]** JPEG social assets can be cropped differently by social platforms. → **Mitigation:** use the dedicated 1200x630 composition with the face and important motifs inside safe margins.
- **[Risk]** AI-generated technology imagery may resemble inaccurate logos. → **Mitigation:** keep motifs abstract and avoid generated text or brand marks; exact logos can be composited separately later if needed.
- **[Risk]** `user-select: none` could reduce discoverability of the interaction. → **Mitigation:** keep the scope to the network surface and retain visible grab/grabbing cursors.

## Migration Plan

1. Promote the supplied JPEG into `public/`, add the generated `public/og-image.jpg`, and update profile image references.
2. Extend simulation position publishing, central placement, line origins, and pointer handlers.
3. Add selection-safe CSS and static metadata.
4. Add or update Playwright coverage for drag/return, click suppression, selection styles, and metadata.
5. Run the production build and the relevant browser suite; inspect the generated JPEG and built document metadata.

Rollback is a revert of this change. The existing PNG, static center node, and current document metadata remain the fallback.

## Open Questions

- Whether authentic technology logo marks should be composited into a later revision of the generated social image. The current implementation intentionally uses abstract motifs to avoid inaccurate generated logos.
