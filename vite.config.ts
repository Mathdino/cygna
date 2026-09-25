import { readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Two HTML entries: index.html (the home app, untouched) and page.html (template
 * for every other route, filled in by scripts/prerender.mjs after the build).
 *
 * In dev this plugin serves the same output the build writes, generated live from
 * src/entry-server.tsx: /sitemap.xml, /robots.txt and /llms.txt, the home with its
 * SEO <head>, and every page route rendered on the server with head + JSON-LD —
 * so "view source" in dev shows exactly what crawlers get in production.
 */
const SEO_FILES: Record<string, [string, string]> = {
  "/sitemap.xml": ["sitemapXml", "application/xml; charset=utf-8"],
  "/robots.txt": ["robotsTxt", "text/plain; charset=utf-8"],
  "/llms.txt": ["llmsTxt", "text/plain; charset=utf-8"],
};

function devSeo(): Plugin {
  let server: ViteDevServer;
  const load = () => server.ssrLoadModule("/src/entry-server.tsx");

  return {
    name: "cygna-dev-seo",
    apply: "serve",
    configureServer(s) {
      server = s;
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: (e?: unknown) => void) => {
        const url = (req.url ?? "/").split("?")[0];
        if (req.method !== "GET") return next();
        try {
          const file = SEO_FILES[url];
          if (file) {
            const ssr = await load();
            res.setHeader("Content-Type", file[1]);
            return res.end(ssr[file[0]]());
          }

          const accept = String(req.headers.accept ?? "");
          const isPage = !url.includes(".") && !url.startsWith("/@") && !url.startsWith("/src/") && !url.startsWith("/node_modules/");
          if (!isPage || !accept.includes("text/html")) return next();

          const ssr = await load();
          if (url === "/") {
            const html = await server.transformIndexHtml(url, readFileSync("index.html", "utf8"));
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            return res.end(ssr.injectHomeHead(html));
          }
          const template = await server.transformIndexHtml(url, readFileSync("page.html", "utf8"));
          const { html, status } = ssr.fillPage(template, url, ssr.render);
          res.statusCode = status;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end(html);
        } catch (e) {
          server.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devSeo()],
  build: {
    rollupOptions: {
      input: { main: "index.html", page: "page.html" },
    },
  },
});
