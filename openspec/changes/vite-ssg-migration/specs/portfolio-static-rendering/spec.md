## ADDED Requirements

### Requirement: Build-time static portfolio document

The build SHALL generate a static root document containing the portfolio's initial React markup without requiring a browser or runtime server.

#### Scenario: Root page is prerendered

- **WHEN** the production build completes
- **THEN** `build/index.html` contains non-empty portfolio markup inside the root element
- **AND** the document is deployable as static files by GitHub Pages

### Requirement: Static social metadata is preserved

The generated root document SHALL preserve the preferred sharing metadata for `https://profile.indic-games.in/`.

#### Scenario: Crawler reads the generated head

- **WHEN** a crawler reads `build/index.html` without executing JavaScript
- **THEN** the title is `Aniruddha Ganesh | AI-Native Full-Stack Engineer`
- **AND** canonical and `og:url` identify `https://profile.indic-games.in/`
- **AND** `og:image` and the Twitter image identify `https://profile.indic-games.in/og-image.jpg`
- **AND** the existing description, Open Graph, and Twitter card fields remain present

### Requirement: Browser hydration preserves portfolio behavior

The prerendered document SHALL hydrate the existing React portfolio in the browser without changing its authored initial state or interactive behavior.

#### Scenario: Client bootstraps the static document

- **WHEN** the browser loads the generated root page and JavaScript executes
- **THEN** React hydrates the existing root markup
- **AND** the Projects tab remains the initial tab
- **AND** the network simulation, tab controls, node interactions, and modals remain available after hydration

### Requirement: Public assets retain root-relative URLs

The SSG output SHALL include the existing public assets at root-relative paths.

#### Scenario: Social and profile assets are copied

- **WHEN** the production build completes
- **THEN** `build/og-image.jpg` exists
- **AND** the profile image, favicons, project assets, and `robots.txt` retain their existing root-relative locations
