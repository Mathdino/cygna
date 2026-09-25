import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { ROUTES } from "./app/routes";
import { renderHead } from "./app/site/seo";
import { SITE } from "./app/site/config";

/* Módulo de servidor: usado pelo scripts/prerender.mjs (build) e pelo plugin do
   vite.config.ts (dev). Nunca vai para o navegador. */
export { ROUTES, SITE, renderHead };
export { sitemapXml, robotsTxt, llmsTxt, htaccess, injectHomeHead, fillPage, indexaveis } from "./app/site/seo-files";

export function render(path: string): string {
  const route = ROUTES.find((r) => r.path === path);
  if (!route?.render) return "";
  return renderToString(<StrictMode>{route.render()}</StrictMode>);
}
