## 1. Vite toolchain setup

- [x] 1.1 Replace CRA-specific dependencies and scripts with Vite, the React plugin, path-resolution support, `typecheck`, and production preview commands; regenerate `yarn.lock`.
- [x] 1.2 Add `vite.config.ts` with React support, existing `src` aliases, `base: "/"`, and `build.outDir: "build"`.
- [x] 1.3 Replace the CRA environment declaration with Vite client typings and update ignore/config files for any temporary prerender output.

## 2. Static rendering and client bootstrap

- [x] 2.1 Move `public/index.html` to the Vite root HTML entry, replace CRA substitutions, preserve all social metadata, and add the client module entry and SSG outlet.
- [x] 2.2 Update `src/index.tsx` to hydrate the prerendered root with `hydrateRoot` and preserve the existing `App` entry.
- [x] 2.3 Add a server render entry that renders the existing `App` without invoking browser-only effects or APIs.
- [x] 2.4 Add a single-route prerender script that renders the server entry into the generated `build/index.html` and fails on render errors.
- [x] 2.5 Confirm the network portfolio's initial render is deterministic and adjust only browser-global access required for successful prerendering.

## 3. Deployment and validation gates

- [x] 3.1 Update `.github/workflows/master.yml` to run `yarn typecheck` before `yarn build`, remove CRA-only build flags, and preserve the existing manual, repository-dispatch, and `master` push triggers, `build/` folder, `gh-pages` branch, and deploy action.
- [x] 3.2 Update repository development/build instructions to describe Vite, SSG, typechecking, and the unchanged GitHub Pages deployment contract.
- [x] 3.3 Run `yarn install --frozen-lockfile` and `yarn typecheck` successfully.
- [x] 3.4 Run `yarn build` successfully and inspect `build/index.html` for prerendered markup, title, canonical, Open Graph/Twitter metadata, and absolute `profile.indic-games.in` URLs.
- [x] 3.5 Verify `build/og-image.jpg`, profile imagery, other public assets, and `robots.txt` exist at their expected root-relative paths; confirm no generated output is staged for commit.
