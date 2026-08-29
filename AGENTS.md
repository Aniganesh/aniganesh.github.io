# AGENTS.md

## Project overview

This repository contains Aniruddha Ganesh's personal portfolio site. It is a Create React App application written in TypeScript, styled with Material-UI v4, and deployed to GitHub Pages at `profile.indic-games.in`.

Use Yarn for dependency installation and scripts because the repository is committed with `yarn.lock` and CI runs `yarn install --frozen-lockfile`.

## Repository layout

- `src/App.tsx` and `src/RootLayout.tsx`: application shell and theme setup.
- `src/Screen/`: main page and its sections (`AboutMe`, `Projects`, `Footer`, navigation, and intro/hero content).
- `src/Components/`: reusable UI components, especially `ProjectCard`.
- `src/Screen/Sections/Constants.ts`: portfolio project and work-history content.
- `src/Theme/`: Material-UI theme and shared design constants.
- `src/Assets/`: local fonts, images, and technology icons.
- `public/`: static assets referenced by root-relative URLs.
- `.github/workflows/master.yml`: builds and deploys the `build/` output to the `gh-pages` branch.

## Common commands

```bash
yarn install --frozen-lockfile
yarn start
yarn build
yarn test
```

For a CI-equivalent production build, use:

```bash
DISABLE_ESLINT_PLUGIN=true yarn build
```

The project has no separate lint script; the build invokes the Create React App checks. Run the relevant build or test command after changes, especially changes to TypeScript, routing/layout, or styling.

## Development conventions

- Keep TypeScript strict and preserve `forceConsistentCasingInFileNames` compatibility.
- Use functional React components and existing project patterns for hooks and props.
- `src` is the TypeScript `baseUrl`, so existing absolute imports such as `Constants` and `Hooks/useCustomMediaQuery` are intentional. Follow that convention consistently.
- Use the existing Material-UI v4 APIs (`ThemeProvider`, `makeStyles`, `theme.breakpoints`, and `theme.spacing`) rather than introducing a second styling system.
- Preserve responsive behavior for desktop and small-screen layouts. Check both navigation variants and section spacing when changing layout or styles.
- Keep portfolio content in the existing constants/data structures instead of embedding repeated content in presentational components.
- Prefer local assets in `src/Assets` or `public/projects`. Use root-relative paths for assets under `public/`.
- Avoid adding dependencies for small UI changes; if a dependency is necessary, update `package.json` and `yarn.lock` together.

## Validation and deployment

- Before handing off a change, run `DISABLE_ESLINT_PLUGIN=true yarn build` and `yarn test` when tests are relevant.
- Do not commit generated `build/` output; GitHub Actions generates it during deployment.
- A push to `master` triggers the build-and-deploy workflow. Deployment publishes the contents of `build/` to the `gh-pages` branch.
- Keep external links and project URLs valid when editing portfolio data.
