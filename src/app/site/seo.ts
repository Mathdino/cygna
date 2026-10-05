import { SITE } from "./config";
import { urlAbs } from "./schema";
import { consentBootstrapScript } from "../lib/consent";

/* =============================================================================
   <head> de cada página, montado no build (scripts/prerender.mjs).

   Regras (GUIA TIER / DIRETRIZES-CONTEUDO):
    · title ≤ 60 caracteres SEM a marca — o " | Cygna" é acrescentado aqui.
    · description 130–160 caracteres. O mesmo texto vai para og:description,
      twitter:description e o description do WebPage no JSON-LD.
    · canonical absoluto, sempre apontando para a própria URL (sem barra final).
    · noindex só em página útil que não deve aparecer na busca (ex.: 404).
   ========================================================================== */

export type PageMeta = {
  path: string;
  /** Sem a marca. Home usa `titleAbsoluto`. */
  title: string;
  titleAbsoluto?: boolean;
  description: string;
  image?: string;
  imageAlt?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  publicado?: string;
  modificado?: string;
  jsonLd?: object;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON dentro de <script>: impede que um "</script>" no conteúdo feche a tag. */
const jsonForScript = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export function fullTitle(meta: PageMeta): string {
  return meta.titleAbsoluto ? meta.title : `${meta.title} | ${SITE.name}`;
}

export function renderHead(meta: PageMeta): string {
  const url = urlAbs(meta.path);
  const title = fullTitle(meta);
  const image = urlAbs(meta.image ?? SITE.ogImage);
  const imageAlt = meta.imageAlt ?? title;
  const robots = meta.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    meta.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.ogType ?? "website"}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    meta.publicado ? `<meta property="article:published_time" content="${meta.publicado}" />` : "",
    meta.modificado ? `<meta property="article:modified_time" content="${meta.modificado}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    SITE.verification.google ? `<meta name="google-site-verification" content="${esc(SITE.verification.google)}" />` : "",
    SITE.verification.bing ? `<meta name="msvalidate.01" content="${esc(SITE.verification.bing)}" />` : "",
    `<link rel="manifest" href="/site.webmanifest" />`,
    meta.jsonLd ? `<script type="application/ld+json">${jsonForScript(meta.jsonLd)}</script>` : "",
    analyticsTags(),
  ];

  return tags.filter(Boolean).join("\n    ");
}

/**
 * Consent Mode v2 + GA4. O padrão "negado" entra no dataLayer ANTES do gtag.js.
 * O gtag.js vai como <script async src> estático no <head> — é o formato que o
 * Search Console procura na verificação "Google Analytics" (e o Bing importa
 * a propriedade do GSC). Em localhost o config não roda, então nada é medido
 * (GUIA-NOVO-PROJETO §1).
 */
export function analyticsTags(): string {
  const id = SITE.analytics.ga4;
  if (!id) return "";
  return [
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`,
    `<script>${consentBootstrapScript(id)}</script>`,
  ].join("\n    ");
}
