## Why

The network currently lets visitors move surrounding nodes but leaves the central profile node fixed, making the primary visual anchor feel inconsistent with the rest of the interaction. The site also lacks social-preview metadata and is using an unnecessarily large PNG for profile imagery, so shared links do not present the portfolio's current AI-native full-stack positioning.

## What Changes

- Make the central profile node pointer/touch draggable while preserving its click and keyboard activation behavior.
- Have the central node and connection-line origins follow the pointer during a drag, then return to and remain pinned at the exact visual center on drop.
- Suppress profile-modal activation after a meaningful central-node drag while preserving normal click, Enter, and Space activation.
- Make network imagery and surrounding visual content unselectable during pointer interaction, and disable native image dragging.
- Add a generated 1200x630 Open Graph JPEG using the profile portrait, orange-to-navy gradient, and restrained technology/network motifs.
- Use the metadata title `Aniruddha Ganesh | AI-Native Full-Stack Engineer` with matching Open Graph/Twitter metadata and an absolute social-preview image URL.
- Replace the in-page profile image reference with the smaller JPEG profile asset where appropriate, while keeping the dedicated social-preview crop separate.
- Add browser coverage for central-node drag/return, click-versus-drag behavior, unselectable imagery, and social metadata.

## Capabilities

### New Capabilities

- `portfolio-interactions`: Draggable central profile-node behavior, exact center return, pointer interaction semantics, and selection suppression.
- `portfolio-social-metadata`: Search and social-preview title, description, image, URL, and image-format requirements.

### Modified Capabilities

<!-- No existing active capability specs are present in openspec/specs/. -->

## Impact

- Updates `src/Portfolio/NetworkPortfolio.tsx`, `src/Portfolio/styles.css`, `public/index.html`, and Playwright coverage.
- Adds `public/og-image.jpg` and the JPEG profile asset used by the page.
- Does not change portfolio content, external destinations, dependencies, backend behavior, or deployment infrastructure.
