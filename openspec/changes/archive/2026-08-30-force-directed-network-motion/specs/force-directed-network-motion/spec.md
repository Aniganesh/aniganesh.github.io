## ADDED Requirements

### Requirement: Force-directed node layout

The portfolio SHALL use a bounded force simulation to position surrounding nodes in the active network view. The simulation SHALL preserve authored target regions while adding visible independent drift, stronger repulsion across a broad influence radius, and collision avoidance.

#### Scenario: Organic settled layout

- **WHEN** a network view is active
- **THEN** surrounding nodes settle into bounded positions influenced by their authored target regions
- **AND** nodes avoid overlapping their circular logo containers or labels
- **AND** the profile node remains fixed at the center

#### Scenario: Ambient motion

- **WHEN** reduced motion is not preferred and the network is displayed
- **THEN** surrounding nodes exhibit subtle independent movement after settling
- **AND** the movement remains within the network bounds
- **AND** the movement is perceptible without making the composition chaotic

### Requirement: Force simulation lifecycle

The simulation SHALL initialize and clean up with the active tab and SHALL recompute its bounds when the network panel is resized. It SHALL batch position updates so node and connection geometry remain synchronized without unnecessary rendering work.

#### Scenario: Tab change

- **WHEN** a visitor switches between Projects, Toolkit, and Contact
- **THEN** the prior simulation is cleaned up
- **AND** the active node collection receives a fresh bounded simulation

#### Scenario: Responsive resize

- **WHEN** the network panel changes dimensions
- **THEN** simulation bounds and authored target coordinates are updated
- **AND** visible nodes remain inside the panel without horizontal overflow

### Requirement: Physics-aware dragging

The portfolio SHALL allow visitors to drag surrounding nodes with pointer or touch input. A drag SHALL temporarily reheat the simulation, keep the dragged node under the pointer within bounds, suppress click activation after meaningful movement, and allow the node to settle toward its authored target after release.

#### Scenario: Drag and settle

- **WHEN** a visitor drags and releases a surrounding node
- **THEN** the node follows the pointer within the simulation bounds
- **AND** the simulation becomes active during the drag
- **AND** the node settles toward its authored target region after release

#### Scenario: Click remains distinct from drag

- **WHEN** a visitor presses and releases a surrounding node without meaningful movement
- **THEN** the node's existing button or link activation occurs
- **AND** a meaningful drag does not activate the project modal

### Requirement: Reduced-motion simulation behavior

The portfolio SHALL disable continuous ambient force motion when the visitor prefers reduced motion while preserving the initial layout, drag access, and semantic interaction behavior.

#### Scenario: Reduced-motion preference

- **WHEN** a visitor prefers reduced motion
- **THEN** nodes initialize and settle without continuous drift
- **AND** the simulation stops after the layout is resolved
- **AND** tabs, nodes, links, and modals remain usable
