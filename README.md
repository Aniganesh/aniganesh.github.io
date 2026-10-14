# portfolio

Built with React, TypeScript, Vite, and build-time static rendering. Hosted on GitHub Pages.

View the portfolio here: https://profile.indic-games.in

Read the engineering note on the [Gemini and Claude RAG evaluation](https://profile.indic-games.in/writing/evaluating-gemini-and-claude-on-the-same-rag-task/).

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
