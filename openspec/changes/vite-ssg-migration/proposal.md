## Why

The portfolio is a single, data-independent page, but its current Create React App toolchain only produces an empty application root that is populated after JavaScript loads. Migrating to Vite with build-time static rendering will produce crawler-visible portfolio markup while preserving the existing GitHub Pages deployment and preferred sharing URL.

Vite also does not typecheck during its build, so the deployment gate must explicitly run TypeScript validation before producing the deployable artifact.

## What Changes

- Replace the Create React App build and development toolchain with Vite and the React Vite plugin.
- Add a single-route build-time prerender step that emits the root portfolio page into `build/index.html`.
- Hydrate the prerendered page in the browser while preserving the existing interactive network portfolio behavior.
- Move the CRA HTML template to Vite's root `index.html` entry and preserve the title, canonical URL, Open Graph, Twitter, and social-image metadata.
- Preserve root-relative public assets, the `profile.indic-games.in` canonical/share hostname, and the equivalent `aniganesh.github.io` GitHub Pages URL.
- Add a `typecheck` script and run it before the production build in the master deployment workflow.
- Keep deployment on pushes to `master`, publishing `build/` to `gh-pages` through the existing GitHub Pages deploy action.
- Do not add or require browser tests, unit tests, a runtime SSR server, a repository `CNAME`, or dynamic route handling.

## Capabilities

### New Capabilities

- `portfolio-static-rendering`: Build-time prerendering and browser hydration for the single portfolio route.
- `portfolio-build-pipeline`: Vite build output, explicit TypeScript validation, and GitHub Pages deployment invariants.

### Modified Capabilities

<!-- Existing portfolio interaction and social-metadata requirements remain unchanged. -->

## Impact

- Replaces CRA dependencies and scripts in `package.json` and updates `yarn.lock`.
- Adds Vite configuration, a server-render entry, and a build-time prerender script.
- Moves and adapts `public/index.html` to the Vite HTML entry while preserving metadata and assets.
- Updates the browser entry point and CRA-specific TypeScript environment declaration.
- Minimally updates `.github/workflows/master.yml` to typecheck before building and removes CRA-only build flags.
- Does not change portfolio content, public routes, external links, deployment branch, hosting provider, or the preferred canonical hostname.
