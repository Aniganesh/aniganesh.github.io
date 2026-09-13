# portfolio

Built with React, TypeScript, Vite, and build-time static rendering. Hosted on GitHub Pages.

View the portfolio here: https://profile.indic-games.in

## Development

```bash
yarn install --frozen-lockfile
yarn start
```

Run the production typecheck and build with:

```bash
yarn typecheck
yarn build
```

The build emits the static site to `build/`. A push to `master` typechecks,
builds, and deploys that directory to the `gh-pages` branch.

Run the browser tests with Playwright:

```bash
yarn playwright install chromium
yarn test:e2e
```
