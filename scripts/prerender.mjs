/* =============================================================================
   PRERENDER — roda depois de `vite build` e `vite build --ssr`.

   Gera, a partir da MESMA tabela de rotas do app (src/app/routes.tsx):
     · dist/{rota}/index.html  — HTML completo (head + JSON-LD + conteúdo)
     · dist/index.html          — a home continua o app de sempre; só ganha o
                                  <head> de SEO (canonical, OG, JSON-LD, GA)
     · dist/404.html            — noindex, servido com status 404
     · dist/sitemap.xml         — só URLs indexáveis, com lastmod real
     · dist/llms.txt            — mapa do site para agentes de IA
     · dist/robots.txt          — Content-Signal, crawlers de IA liberados
     · dist/.htaccess           — URLs sem barra final, 404 real, cache, HTTPS
   Regra de ouro do GUIA TIER: nada disso se edita à mão.

   Também valida os campos do guia (title ≤ 60, description 130–160) e avisa
   no console o que sair do padrão.
   ========================================================================== */

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssr = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
const { ROUTES, render, fillPage, injectHomeHead, sitemapXml, llmsTxt, robotsTxt, htaccess, indexaveis } = ssr;

const template = await readFile(join(dist, "page.html"), "utf8");
const avisos = [];

/* ── Validação dos campos do guia ─────────────────────────────────────────── */
for (const r of ROUTES) {
  if (r.oculto) continue;
  const t = r.meta.title.length;
  const d = r.meta.description.length;
  if (!r.meta.titleAbsoluto && t > 60) avisos.push(`${r.path}: title com ${t} caracteres (máx. 60)`);
  if (d < 130 || d > 160) avisos.push(`${r.path}: description com ${d} caracteres (130–160)`);
}

/* ── Páginas internas ─────────────────────────────────────────────────────── */
let paginas = 0;
const contagem = [];
for (const r of ROUTES) {
  if (!r.render) continue;
  const { html } = fillPage(template, r.path, render);
  const out = r.path === "/404" ? join(dist, "404.html") : join(dist, r.path, "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  paginas++;

  /* Só o conteúdo principal conta (sem header, rodapé e CTA final repetido). */
  const main = (/<main[^>]*>([\s\S]*)<\/main>/.exec(html)?.[1] ?? "").replace(/<[^>]+>/g, " ");
  const palavras = main.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
  contagem.push(`${r.path}: ${palavras}`);
  if (r.path.startsWith("/segmentos/") && palavras < 800) avisos.push(`${r.path}: ${palavras} palavras na página (T4 pede 800+)`);
  if (r.path.startsWith("/blog/") && palavras < 1000) avisos.push(`${r.path}: ${palavras} palavras na página (post pede 1.000+)`);
}
await rm(join(dist, "page.html"));

/* ── Home: só o <head> ────────────────────────────────────────────────────── */
await writeFile(join(dist, "index.html"), injectHomeHead(await readFile(join(dist, "index.html"), "utf8")));

/* ── sitemap.xml, llms.txt, robots.txt, .htaccess (src/app/site/seo-files.ts) ─ */
await writeFile(join(dist, "sitemap.xml"), sitemapXml());
await writeFile(join(dist, "llms.txt"), llmsTxt());
await writeFile(join(dist, "robots.txt"), robotsTxt());
await writeFile(join(dist, ".htaccess"), htaccess());
const totalSitemap = indexaveis().length;

await rm(join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`[prerender] palavras no <main>:\n  ${contagem.join("\n  ")}`);
console.log(`\n[prerender] ${paginas} páginas, ${totalSitemap} URLs no sitemap, llms.txt, robots.txt e .htaccess gerados.`);
if (avisos.length) console.warn(`[prerender] avisos do guia:\n  - ${avisos.join("\n  - ")}`);
