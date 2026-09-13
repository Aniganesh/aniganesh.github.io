# portfolio-social-metadata Specification

## Purpose
TBD - created by archiving change movable-profile-node-and-social-metadata. Update Purpose after archive.
## Requirements
### Requirement: Descriptive portfolio document metadata

The document SHALL identify the portfolio with the title `Aniruddha Ganesh | AI-Native Full-Stack Engineer` and a description that accurately summarizes full-stack JavaScript/TypeScript product engineering and enterprise AI workflow experience.

#### Scenario: Browser title and description are present

- **WHEN** a crawler or browser reads the initial document head
- **THEN** the document title is `Aniruddha Ganesh | AI-Native Full-Stack Engineer`
- **AND** a non-empty description meta tag is present

### Requirement: Open Graph social preview

The document SHALL expose a complete Open Graph preview for the canonical portfolio URL.

#### Scenario: Open Graph fields identify the portfolio

- **WHEN** a social crawler reads the initial document head
- **THEN** `og:type` is `website`
- **AND** `og:title` is `Aniruddha Ganesh | AI-Native Full-Stack Engineer`
- **AND** `og:description` is non-empty and aligned with the portfolio description
- **AND** `og:url` is the absolute canonical URL `https://profile.indic-games.in/`

#### Scenario: Open Graph image is crawler-compatible

- **WHEN** a social crawler reads the Open Graph image fields
- **THEN** `og:image` is an absolute URL ending in `/og-image.jpg`
- **AND** `og:image:type` is `image/jpeg`
- **AND** the declared image dimensions are 1200 by 630
- **AND** `og:image:alt` identifies Aniruddha Ganesh

### Requirement: Twitter preview fallback

The document SHALL provide a large-image Twitter card using the same title, description, and social-preview image.

#### Scenario: Twitter card fields are present

- **WHEN** a Twitter/X crawler reads the initial document head
- **THEN** `twitter:card` is `summary_large_image`
- **AND** `twitter:title`, `twitter:description`, and `twitter:image` are present

### Requirement: Optimized served profile image

The portfolio SHALL use the supplied JPEG portrait as its served in-page profile image and SHALL keep the dedicated 1200x630 social-preview composition separate.

#### Scenario: Profile image uses the optimized asset

- **WHEN** the profile node or profile modal renders
- **THEN** its image source resolves to the served JPEG profile asset
- **AND** the Open Graph image remains the dedicated social-preview asset
