import { readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const outputPath = resolve(root, "build/index.html");
const temporaryPath = `${outputPath}.tmp`;
const outlet = "<!--ssr-outlet-->";

const server = await createServer({
  appType: "custom",
  logLevel: "error",
  root,
  server: {
    hmr: false,
    middlewareMode: true,
    ws: false,
  },
});

try {
  const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
  const renderedApp = render();

  if (!renderedApp.trim()) {
    throw new Error("The server render returned an empty application.");
  }

  const template = await readFile(outputPath, "utf8");
  if (!template.includes(outlet)) {
    throw new Error(`Could not find the ${outlet} marker in ${outputPath}.`);
  }

  await writeFile(temporaryPath, template.replace(outlet, renderedApp));
  await rename(temporaryPath, outputPath);
} finally {
  await server.close();
}
