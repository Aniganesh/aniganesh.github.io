## Context

The portfolio is currently a Create React App application with a single root page. The interactive network is entirely client-side, but its authored initial state is deterministic and the page does not depend on a route parameter, remote data, or a runtime server. The existing GitHub Actions workflow builds a `build/` directory and publishes it to `gh-pages` with `JamesIves/github-pages-deploy-action`.

The migration must keep the public behavior and deployment contract while making the initial document useful to crawlers. The preferred sharing hostname remains `https://profile.indic-games.in/`; `https://aniganesh.github.io/` remains the GitHub Pages URL managed alongside the external Cloudflare hostname.

## Goals / Non-Goals

**Goals:**

- Replace CRA's bundler and development server with Vite.
- Generate a static, prerendered `/index.html` during the build.
- Hydrate the same React application in the browser without changing the network interactions.
- Preserve the current title, canonical URL, Open Graph/Twitter metadata, social image, public assets, root URL, and `build/` deployment output.
- Make TypeScript validation an explicit CI gate before the Vite build.
- Keep validation limited to typecheck, production build, and inspection of generated static output.

**Non-Goals:**

- No request-time SSR server or non-static hosting runtime.
- No dynamic routes, data loaders, API integration, or route-specific metadata.
- No browser-test or unit-test additions or workflow gates.
- No `CNAME` file, canonical-host redirect, or Cloudflare configuration change.
- No redesign of the network portfolio or changes to portfolio content.

## Decisions

### Use Vite with a small single-route prerender step

The client build will use Vite with `build.outDir` set to `build` so the existing deployment action can remain pointed at the same directory. After the client build, `scripts/prerender.mjs` will create a Vite SSR module-loading server with HMR and WebSockets disabled, load `src/entry-server.tsx`, render `App` to a string, and atomically replace an explicit outlet in `build/index.html`. The result is static SSG output; no Node server is deployed.

Alternatives considered:

- **Vite client-only build:** simpler, but leaves the application root empty until JavaScript runs and does not fulfill the SSG objective.
- **Runtime Vite SSR:** rejected because GitHub Pages cannot execute a request-time server.
- **Full SSG framework or router:** rejected because there is one route, no remote data, and no route enumeration to manage.

### Keep metadata in the Vite HTML entry

The current CRA template will move to the repository-root `index.html`, where Vite expects the HTML entry. Its title, description, canonical, Open Graph, Twitter, and absolute `profile.indic-games.in` image URLs will remain authored in the document head. The prerender step will fill only the root content outlet.

This keeps metadata available even if a crawler does not execute JavaScript and avoids a runtime metadata dependency.

### Hydrate the existing application

The browser entry will use React 18 `hydrateRoot` against the prerendered `#root`. The server entry will render the same `App` component. Browser-only work in the network component remains inside effects or guarded initializers; no simulation is started during the server render.

The initial state must remain deterministic between server and browser. In particular, the initial tab remains Projects, authored positions remain stable before the first effect, and browser media-query/simulation updates continue after hydration.

### Preserve source imports through Vite path configuration

The current `src` `baseUrl` aliases such as `App`, `Portfolio`, `Assets`, and `Screen` will be supported through Vite's native `resolve.tsconfigPaths` option while retaining the strict TypeScript configuration. This avoids rewriting unrelated imports during the toolchain migration. A separate `tsconfig.node.json` covers `vite.config.ts`; the application check continues to cover the `src` server entry.

### Make typecheck and build separate gates

`package.json` will expose `typecheck` as separate application and Vite-config checks. The workflow will use Node 24, run `yarn typecheck` before `yarn build`, and remove the CRA-only `DISABLE_ESLINT_PLUGIN` environment variable. The production build command will include client bundling and prerendering, and its final output will remain under `build/`.

## Risks / Trade-offs

- **[Risk]** Server and first client render differ, causing hydration warnings. → **Mitigation:** keep initial React state deterministic, avoid browser reads during render, and inspect the generated root HTML after the build.
- **[Risk]** A transitive component accesses browser globals during prerender. → **Mitigation:** retain browser APIs inside effects or `typeof window` guards and make the prerender command fail on module/render errors.
- **[Risk]** CRA path aliases or environment assumptions stop resolving. → **Mitigation:** configure Vite path resolution, replace CRA environment typings, and run `yarn typecheck` before build.
- **[Risk]** Moving `public/index.html` drops metadata or CRA substitutions. → **Mitigation:** preserve the metadata checklist and replace `%PUBLIC_URL%` with root-relative Vite paths.
- **[Risk]** GitHub Pages receives an unexpected directory or asset base. → **Mitigation:** set Vite `base: "/"`, `build.outDir: "build"`, and inspect the final artifact before deployment.
- **[Risk]** Dependency versions require a newer Node runtime in Actions. → **Mitigation:** install Node 24 explicitly in the workflow, matching the Vite toolchain selected for this migration.

## Migration Plan

1. Add Vite, the React plugin, path-resolution support, and the required scripts; regenerate `yarn.lock`.
2. Add Vite configuration with root base and `build/` output.
3. Move/adapt the HTML entry and replace CRA-specific environment typings.
4. Add a server render entry and a one-route prerender script; switch the browser entry to hydration.
5. Add the explicit typecheck step and remove CRA-only workflow flags while retaining the existing deploy action and branch.
6. Run `yarn install --frozen-lockfile`, `yarn typecheck`, and `yarn build`, then inspect `build/index.html`, `build/og-image.jpg`, and the generated asset paths.

Rollback is a revert of the migration commit. The existing CRA workflow and source remain the fallback until the new build is accepted.

## Open Questions

<!-- No implementation questions remain for this change. -->
