## MODIFIED Requirements

### Requirement: Floating circular nodes

All surrounding network nodes SHALL render as circular, borderless interactive elements with their logo or icon contained inside the circle and their text label outside it. Side nodes SHALL NOT use drop shadows. Their positions SHALL be controlled by the bounded force simulation rather than fixed CSS wobble alone.

#### Scenario: Node presentation

- **WHEN** a project, Toolkit, or Contact node is rendered
- **THEN** its visual node is circular and does not use a card border or rectangular card background
- **AND** its label is rendered separately beneath or beside the circle

#### Scenario: Node drag and settle

- **WHEN** a visitor drags an interactive node within the network
- **THEN** the node moves within the simulation's configured bounds
- **AND** the simulation is temporarily reheated during the drag
- **AND** when the drag ends, the node settles toward its authored target region
- **AND** the node remains keyboard- and screen-reader-accessible

#### Scenario: Independent floating motion

- **WHEN** multiple surrounding nodes are visible and reduced motion is not preferred
- **THEN** each node receives subtle independent force-driven movement
- **AND** the movement does not escape the network bounds or destroy the authored composition

### Requirement: Static connection lines

The network SHALL render exactly one solid connection line from the central profile node to each active surrounding node, without side-node-to-side-node links, dash, pulse, or path-drawing animation. The line endpoints MAY update as the force simulation moves nodes, but the line presentation SHALL remain visually static.

#### Scenario: Connection styling

- **WHEN** a network view is displayed
- **THEN** its connection lines are solid and visually static
- **AND** line geometry follows the simulation position of each node

#### Scenario: Central-only topology

- **WHEN** a network view is displayed
- **THEN** every surrounding node is connected directly to the central profile node
- **AND** no connection exists between two surrounding nodes

### Requirement: Responsive and accessible interaction

The portfolio SHALL remain usable across supported viewport sizes and SHALL provide semantic controls, visible focus states, readable labels, bounded force-driven positioning, and reduced-motion behavior.

#### Scenario: Small-screen layout

- **WHEN** the viewport is narrow
- **THEN** the force simulation uses mobile-sized nodes, collision bounds, and target regions
- **AND** nodes and connections remain legible without horizontal overflow or inaccessible controls

#### Scenario: Keyboard navigation

- **WHEN** a visitor uses the keyboard
- **THEN** they can move through tabs and interactive nodes, activate them, observe focus, and dismiss an open modal

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion
- **THEN** ambient force drift and continuous layout animation are disabled after initial settling
- **AND** state changes and content access remain available
