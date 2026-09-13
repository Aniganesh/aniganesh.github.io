# portfolio-interactions Specification

## Purpose
TBD - created by archiving change movable-profile-node-and-social-metadata. Update Purpose after archive.
## Requirements
### Requirement: Movable central profile node

The portfolio SHALL allow the central profile node to be dragged with pointer or touch input while preserving its accessible role and profile-modal activation behavior.

#### Scenario: Central node follows a drag

- **WHEN** a visitor presses the central profile node and moves the pointer
- **THEN** the profile node follows the pointer within bounds
- **AND** each connection line's origin follows the displaced profile node

#### Scenario: Central node returns to center on drop

- **WHEN** a visitor releases the central profile node after moving it
- **THEN** the node returns to the exact horizontal and vertical midpoint of the network panel
- **AND** the node remains pinned at that midpoint after the return completes

#### Scenario: Central node remains bounded

- **WHEN** the central profile node is dragged toward any panel edge
- **THEN** the full circular profile control remains within the network panel bounds

### Requirement: Central drag and activation distinction

The portfolio SHALL distinguish a meaningful central-node drag from a click and SHALL preserve keyboard activation for the profile modal.

#### Scenario: Meaningful central drag does not open the modal

- **WHEN** a visitor displaces the central profile node beyond the movement threshold and releases it
- **THEN** the profile modal does not open
- **AND** the node returns to the center

#### Scenario: Central click opens the modal

- **WHEN** a visitor presses and releases the central profile node without meaningful movement
- **THEN** the profile modal opens

#### Scenario: Keyboard activation remains available

- **WHEN** the central profile control has focus and the visitor presses Enter or Space
- **THEN** the profile modal opens

### Requirement: Network surface is selection-safe

The interactive network surface SHALL prevent text selection and native image dragging during pointer interaction while leaving modal copy selectable.

#### Scenario: Network contents cannot be selected

- **WHEN** a visitor begins a drag on the network surface
- **THEN** the network panel and its node labels, images, and SVG layer expose `user-select: none`
- **AND** profile and node images are not natively draggable

#### Scenario: Modal copy remains usable

- **WHEN** a project or profile modal is open
- **THEN** its textual content remains selectable
