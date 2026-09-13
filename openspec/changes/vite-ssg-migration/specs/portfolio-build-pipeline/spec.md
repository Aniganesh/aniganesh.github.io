## ADDED Requirements

### Requirement: Vite production artifact uses the existing deployment directory

The production build SHALL emit the complete static site under `build/`.

#### Scenario: Build output is compatible with GitHub Pages deployment

- **WHEN** `yarn build` succeeds
- **THEN** the deployable site is present under `build/`
- **AND** no runtime SSR server or non-static output is required

### Requirement: TypeScript validation precedes production build

The project SHALL expose an explicit typecheck command and the master deployment workflow SHALL run it before the production build.

#### Scenario: Type errors block deployment

- **WHEN** a push to `master` starts the build-and-deploy workflow
- **THEN** the workflow runs `yarn typecheck` before `yarn build`
- **AND** a failed typecheck prevents the deployment step from running

### Requirement: GitHub Pages deployment contract remains stable

The workflow SHALL continue deploying the Vite-generated `build/` directory to the `gh-pages` branch for its existing manual, repository-dispatch, and `master` push triggers.

#### Scenario: Successful master push deploys the static site

- **WHEN** typecheck and build succeed for a `master` push
- **THEN** the existing GitHub Pages deploy action publishes `build/` to `gh-pages`
- **AND** the GitHub Pages URL `https://aniganesh.github.io/` remains available
- **AND** the preferred external sharing hostname remains represented by the generated canonical metadata

#### Scenario: Existing workflow triggers remain available

- **WHEN** a maintainer starts the workflow manually or sends a repository dispatch event
- **THEN** the same typecheck, build, and deployment job remains available
- **AND** it publishes the same `build/` artifact to `gh-pages`

### Requirement: Migration validation remains build-focused

The migration SHALL require typecheck, production build, and static artifact inspection without adding browser or unit test gates.

#### Scenario: Build-only validation is sufficient for this change

- **WHEN** the migration is validated locally or in implementation review
- **THEN** `yarn typecheck` and `yarn build` are run
- **AND** the generated HTML and required assets are inspected
- **AND** no new browser-test or unit-test command is required
