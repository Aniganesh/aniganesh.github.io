## ADDED Requirements

### Requirement: Network portfolio shell

The portfolio SHALL render a full-page dark-themed network interface with the profile image as the central node and a connected set of surrounding nodes.

#### Scenario: Initial portfolio load

- **WHEN** a visitor loads the portfolio
- **THEN** the network interface is visible with the supplied profile image centered and the Projects tab active

#### Scenario: Profile asset unavailable

- **WHEN** the replacement profile image has not yet been supplied during development
- **THEN** the interface SHALL use an explicitly configured temporary asset without breaking the central node layout

### Requirement: Primary tab navigation

The portfolio SHALL provide exactly three primary views named `Projects`, `Toolkit`, and `Contact`, and SHALL expose their active state to keyboard and assistive-technology users.

#### Scenario: Default tab

- **WHEN** the portfolio first loads
- **THEN** `Projects` is selected and its tab has the active visual and semantic state

#### Scenario: Switching tabs

- **WHEN** a visitor selects `Toolkit` or `Contact`
- **THEN** the selected tab changes and the corresponding node collection becomes visible

### Requirement: Project node content

The Projects view SHALL display existing work projects and `Indic Games`, and SHALL exclude the former small personal projects other than `Indic Games`.

#### Scenario: Projects node set

- **WHEN** the Projects tab is active
- **THEN** work-project entries and Indic Games are rendered as nodes
- **AND** Rajini Lipsum, Help Me Decide, and Colour Palette Creator are not rendered

#### Scenario: Project node activation

- **WHEN** a visitor activates a project node
- **THEN** the selected project is identified and its detail modal opens

### Requirement: Toolkit node content

The Toolkit view SHALL display only technologies, libraries, and packages, SHALL exclude non-technology skills and technical leadership, and SHALL require every Toolkit item to provide an icon component or local asset.

#### Scenario: Toolkit nodes have icons

- **WHEN** the Toolkit tab is active
- **THEN** every rendered Toolkit node displays its configured icon
- **AND** no Toolkit node is rendered without an icon

#### Scenario: Non-technology items omitted

- **WHEN** the Toolkit node collection is assembled
- **THEN** generic skill categories that are not technologies, libraries, or packages are not included

#### Scenario: Technical leadership omitted

- **WHEN** the Toolkit node collection is assembled
- **THEN** an item labeled technical leadership is not included

### Requirement: Floating circular nodes

All surrounding network nodes SHALL render as circular, borderless interactive elements with their logo or icon contained inside the circle and their text label outside it. Side nodes SHALL NOT use drop shadows, and each node SHALL have a subtle independent wobble that conveys floating in space.

#### Scenario: Node presentation

- **WHEN** a project, Toolkit, or Contact node is rendered
- **THEN** its visual node is circular and does not use a card border or rectangular card background
- **AND** its label is rendered separately beneath or beside the circle

#### Scenario: Node drag and return

- **WHEN** a visitor drags an interactive node within the network
- **THEN** the node moves within its configured free-space bounds
- **AND** when the drag ends, the node gently springs back to its authored home position
- **AND** the node remains keyboard- and screen-reader-accessible

#### Scenario: Independent floating motion

- **WHEN** multiple surrounding nodes are visible
- **THEN** each node wobbles independently with a subtle, non-synchronized motion
- **AND** the wobble does not alter the node’s authored home position

### Requirement: Static connection lines

The network SHALL render exactly one solid connection line from the central profile node to each active surrounding node, without side-node-to-side-node links, dash, pulse, or path-drawing animation.

#### Scenario: Connection styling

- **WHEN** a network view is displayed
- **THEN** its connection lines are solid and visually static
- **AND** line geometry follows a node immediately while that node is being dragged

#### Scenario: Central-only topology

- **WHEN** a network view is displayed
- **THEN** every surrounding node is connected directly to the central profile node
- **AND** no connection exists between two surrounding nodes

### Requirement: Contact node content

The Contact view SHALL render the configured contact and social links as connected nodes with icons and SHALL open external destinations safely when activated.

#### Scenario: Existing contact links

- **WHEN** the Contact tab is active
- **THEN** the configured GitHub, LinkedIn, Instagram, YouTube, and Stack Overflow links are available as contact nodes

#### Scenario: External contact activation

- **WHEN** a visitor activates an external contact node
- **THEN** its destination opens using an accessible link without replacing the portfolio page unexpectedly

### Requirement: Project detail modal

The portfolio SHALL present project details in a transparent frosted-glass modal associated with the intentionally activated project node. The modal SHALL have no visible border or eyebrow text, and its close control SHALL be an icon-only X with no border or background.

#### Scenario: Modal contents

- **WHEN** a project modal opens
- **THEN** it displays the project title, image or logo, summary, available roles, duration, detailed content, and external link
- **AND** the modal background is transparent and frosted without a border or eyebrow

#### Scenario: Modal dismissal

- **WHEN** a visitor activates the close control, presses Escape, or activates the modal backdrop
- **THEN** the project modal closes and focus returns to the originating project node when possible

#### Scenario: Drag does not activate modal

- **WHEN** a visitor drags and releases a project node
- **THEN** the node returns toward its home position
- **AND** no project modal opens from that drag gesture

### Requirement: Central profile modal

The central profile node SHALL be a clickable, keyboard-accessible control in the `Projects`, `Toolkit`, and `Contact` views. Activating it SHALL open a profile modal describing Aniruddha Ganesh, his professional experience, and expertise in AI systems.

#### Scenario: Profile node available in every tab

- **WHEN** any of the `Projects`, `Toolkit`, or `Contact` views is active
- **THEN** the central profile node is visible and exposes an accessible name for Aniruddha Ganesh
- **AND** it is activatable by mouse, touch, or keyboard

#### Scenario: Profile modal contents

- **WHEN** a visitor activates the central profile node from any primary view
- **THEN** a profile dialog opens
- **AND** it identifies Aniruddha Ganesh
- **AND** it describes his professional experience and expertise in AI systems

#### Scenario: Profile modal dismissal

- **WHEN** a visitor activates the profile modal close control or presses Escape
- **THEN** the profile modal closes
- **AND** focus returns to the central profile node when possible

### Requirement: Icon source handling

The portfolio SHALL use the approved hybrid icon strategy: Phosphor for generic UI concepts, Devicon assets for selected development technologies, Simple Icons assets for selected brand/social marks, and local assets for project-specific logos. The following logos SHALL use favicon assets sourced from their corresponding official sites: REBNY Lease Store from `https://www.rebny.com/`, Zustand from `https://zustand.docs.pmnd.rs/`, Pulumi from `https://www.pulumi.com/`, Socket.IO from `https://socket.io/`, PostgreSQL from `https://www.postgresql.org/`, and Node.js from `https://nodejs.org/en`.

#### Scenario: Technology icon rendering

- **WHEN** a Toolkit technology has a selected Devicon or local technology asset
- **THEN** the node renders that asset within the standard icon viewport

#### Scenario: Brand icon rendering

- **WHEN** a Contact or Toolkit item represents a supported brand
- **THEN** the node renders its selected Simple Icons asset or approved local equivalent

#### Scenario: Express logo legibility

- **WHEN** the Express.js node is rendered
- **THEN** its logo is contained within the circular logo container
- **AND** a visible backing treatment provides contrast against the dark background

### Requirement: Retained project metadata verification

The displayed Mithya UI Registry duration SHALL be verified against the old project data before the new portfolio is considered complete.

#### Scenario: Mithya duration check

- **WHEN** the Mithya UI Registry project data is migrated or displayed
- **THEN** its duration is compared with the old repository data
- **AND** the verified old duration is used if the current value is incorrect

### Requirement: Responsive and accessible interaction

The portfolio SHALL remain usable across supported viewport sizes and SHALL provide semantic controls, visible focus states, readable labels, and reduced-motion behavior.

#### Scenario: Small-screen layout

- **WHEN** the viewport is narrow
- **THEN** nodes and connections reflow into a legible mobile layout without horizontal overflow or inaccessible controls

#### Scenario: Keyboard navigation

- **WHEN** a visitor uses the keyboard
- **THEN** they can move through tabs and interactive nodes, activate them, observe focus, and dismiss an open modal

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion
- **THEN** network and modal transitions use reduced or no animation while preserving state changes and content access
