import { readFile, rename, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const outputPath = resolve(root, "build/index.html");
const outlet = "<!--ssr-outlet-->";
const routePath = "writing/evaluating-gemini-and-claude-on-the-same-rag-task";
const server = await createServer({
  appType: "custom",
  logLevel: "error",
  root,
  server: { hmr: false, middlewareMode: true, ws: false },
});

try {
  const { render, renderBlog } = await server.ssrLoadModule("/src/entry-server.tsx");
  const template = await readFile(outputPath, "utf8");
  if (!template.includes(outlet)) throw new Error(`Could not find the ${outlet} marker in ${outputPath}.`);

  const writePage = async (path, html) => {
    if (!html.trim()) throw new Error(`The server render returned an empty page for ${path}.`);
    const temporaryPath = `${path}.tmp`;
    await mkdir(dirname(path), { recursive: true });
    await writeFile(temporaryPath, template.replace(outlet, html));
    await rename(temporaryPath, path);
  };

  await writePage(outputPath, render());
  const blogPath = resolve(root, `build/${routePath}/index.html`);
  await writePage(blogPath, renderBlog());
  const blogSource = await readFile(blogPath, "utf8");
  await writeFile(blogPath, blogSource.replace("<title>Aniruddha Ganesh | AI-Native Full-Stack Engineer</title>", "<title>Evaluating Gemini and Claude on the Same RAG Task | Aniruddha Ganesh</title>")
    .replace('<meta name="description" content="AI-native full-stack engineer with 5+ years building React, React Native, Next.js, and Node.js products, including agentic AI platforms, streaming interfaces, and complex product workflows." />', '<meta name="description" content="How I built a shared-context RAG harness to compare Gemini and Claude on RFP answering, with live rendered sources, citation checks and failure review." />')
    .replace('<link rel="canonical" href="https://profile.indic-games.in/" />', `<link rel="canonical" href="https://profile.indic-games.in/${routePath}/" />`)
    .replace('<meta property="og:title" content="Aniruddha Ganesh | AI-Native Full-Stack Engineer" />', '<meta property="og:title" content="Evaluating Gemini and Claude on the Same RAG Task | Aniruddha Ganesh" />')
    .replace('<meta property="og:description" content="AI-native full-stack engineer with 5+ years building React, React Native, Next.js, and Node.js products, including agentic AI platforms, streaming interfaces, and complex product workflows." />', '<meta property="og:description" content="How I built a shared-context RAG harness to compare Gemini and Claude on RFP answering, with live rendered sources, citation checks and failure review." />')
    .replace('<meta name="twitter:title" content="Aniruddha Ganesh | AI-Native Full-Stack Engineer" />', '<meta name="twitter:title" content="Evaluating Gemini and Claude on the Same RAG Task | Aniruddha Ganesh" />')
    .replace('<meta name="twitter:description" content="AI-native full-stack engineer with 5+ years building React, React Native, Next.js, and Node.js products, including agentic AI platforms, streaming interfaces, and complex product workflows." />', '<meta name="twitter:description" content="How I built a shared-context RAG harness to compare Gemini and Claude on RFP answering, with live rendered sources, citation checks and failure review." />')
    .replace('<meta property="og:url" content="https://profile.indic-games.in/" />', `<meta property="og:url" content="https://profile.indic-games.in/${routePath}/" />`));
} finally {
  await server.close();
}
