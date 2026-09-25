import { ROUTES, findRoute, type Route } from "../routes";
import { SITE } from "./config";
import { renderHead } from "./seo";

/* =============================================================================
   ARQUIVOS DE SEO GERADOS — sitemap.xml, robots.txt, llms.txt, .htaccess e o
   preenchimento das páginas (head + JSON-LD + HTML).

   Uma implementação só, usada nos dois lugares:
    · build → scripts/prerender.mjs grava em dist/
    · dev   → o plugin do vite.config.ts responde as mesmas URLs ao vivo
   Regra de ouro do GUIA TIER: nada disso se edita à mão.
   ========================================================================== */

export const indexaveis = (): Route[] => ROUTES.filter((r) => !r.oculto && !r.meta.noindex);
const urlDe = (p: string) => (p === "/" ? `${SITE.url}/` : `${SITE.url}${p}`);

/* Sem <priority>/<changefreq> (o Google ignora). Só URL indexável e canônica. */
export function sitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexaveis()
  .map((r) => `  <url>\n    <loc>${urlDe(r.path)}</loc>${r.modificado ? `\n    <lastmod>${r.modificado}</lastmod>` : ""}\n  </url>`)
  .join("\n")}
</urlset>
`;
}

/* Crawlers de IA liberados (GUIA-NOVO-PROJETO §8). Content-Signal: busca e
   respostas de IA sim; treino de modelo é decisão do cliente — liberado aqui. */
const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot", "Meta-ExternalAgent", "cohere-ai"];

export function robotsTxt(): string {
  return [
    "# Sinais de uso de conteúdo (contentsignals.org)",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    ...AI.flatMap((ua) => [`User-agent: ${ua}`, "Allow: /", ""]),
    `Sitemap: ${SITE.url}/sitemap.xml`,
    "",
  ].join("\n");
}

export function llmsTxt(): string {
  const idx = indexaveis();
  const secoes = ["Páginas", "Segmentos", "Blog"];
  return [
  `# ${SITE.name}`,
  "",
  `> ${SITE.description}`,
  "",
  "## Empresa",
  `- Site: ${SITE.url}`,
  SITE.contact.email ? `- E-mail: ${SITE.contact.email}` : null,
  SITE.contact.whatsapp ? `- WhatsApp: +${SITE.contact.whatsapp}` : null,
  "- Área de atuação: Brasil (sistema online, sem instalação)",
  "",
  ...secoes.flatMap((s) => {
    const itens = idx.filter((r) => r.llms.secao === s);
    return itens.length ? [`## ${s}`, ...itens.map((r) => `- [${r.llms.titulo}](${urlDe(r.path)}): ${r.llms.descricao}`), ""] : [];
  }),
  "## Informações técnicas",
  "- Planos mensais: Autônoma R$ 49 (1 profissional), Studio R$ 99 (até 5 profissionais) e Clínica R$ 199 (profissionais ilimitados). No plano anual: R$ 39, R$ 79 e R$ 159 por mês.",
  "- 14 dias de teste grátis em qualquer plano, sem cartão de crédito e sem fidelidade; cancelamento pelo próprio painel.",
  "- Funciona no navegador do celular, tablet ou computador; a cliente agenda por link, sem baixar aplicativo.",
  "- Lembrete por WhatsApp um dia antes do horário, com botões para confirmar ou remarcar.",
  "- Sinal via Pix definido por serviço (valor fixo ou porcentagem), cobrado no momento do agendamento (a partir do plano Studio).",
  "- Anamnese digital assinada no celular, fotos de evolução, pacotes com saldo de sessões, salas e equipamentos (plano Clínica).",
  "- Comissão calculada por serviço, caixa do dia, estoque que baixa por atendimento e várias unidades.",
  "- Migração da lista de clientes por planilha feita pelo time de suporte, sem custo.",
  "",
  "## Público-alvo",
  "Clínicas de estética, salões de beleza, lash designers, nail designers, designers de sobrancelha, micropigmentadoras, barbearias, spas e profissionais autônomas de beleza no Brasil.",
  "",
]
  .filter((l) => l !== null)
  .filter((l, i, a) => l !== "" || a[i - 1] !== "")
  .join("\n");
}

/* /contato é servido por /contato/index.html SEM redirecionar (canonical sem
   barra), /contato/ faz 301 para /contato, e URL inexistente responde 404 de
   verdade com a página 404.html. */
export function htaccess(): string {
  return `# Gerado por src/app/site/seo-files.ts (via scripts/prerender.mjs) — não editar à mão.
Options -Indexes
DirectorySlash Off
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # HTTPS e www (ajuste se o domínio canônico for sem www)
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP_HOST} !^(localhost|127\\.0\\.0\\.1)
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Barra final → sem barra (uma única URL por página)
  RewriteCond %{REQUEST_URI} !^/$
  RewriteRule ^(.+)/$ /$1 [L,R=301]

  # /rota → /rota/index.html (sem redirecionar)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.+)$ /$1/index.html [L]
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(js|css|woff2|webp|png|jpg|svg|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(html|xml|txt)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>
`;
}

/* ── Páginas ─────────────────────────────────────────────────────────────── */

/** Home: o app continua o mesmo; só o <head> recebe canonical, OG e JSON-LD. */
export function injectHomeHead(indexHtml: string): string {
  const home = ROUTES.find((r) => r.path === "/")!;
  return indexHtml
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace("</head>", `  ${renderHead(home.meta)}
  </head>`);
}

/** Página interna: template page.html + head + HTML renderizado. */
export function fillPage(template: string, pathname: string, render: (path: string) => string): { html: string; status: number } {
  const route = findRoute(pathname);
  const html = template.replace("<!--app-head-->", renderHead(route.meta)).replace("<!--app-html-->", render(route.path));
  return { html, status: route.path === "/404" && pathname !== "/404" ? 404 : 200 };
}
