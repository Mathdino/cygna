import type { ReactNode } from "react";
import { SEGMENTOS, segmentoPath } from "./data/segmentos";
import { postsPublicados, postPath, contarPalavras } from "./data/blog";
import { FAQ_HOME } from "./data/faq-home";
import type { PageMeta } from "./site/seo";
import {
  montarGrafo,
  schemaBlogPosting,
  schemaBreadcrumb,
  schemaFaq,
  schemaItemList,
  schemaService,
  schemaSoftware,
  schemaWebPage,
  urlAbs,
  ID_ORG,
  ID_SOFTWARE,
} from "./site/schema";
import { SegmentoPage, SegmentosHub, HUB_SEGMENTOS } from "./pages/Segmentos";
import { BlogIndex, BlogPost, BLOG_INDEX } from "./pages/Blog";
import { ContatoPage, CONTATO } from "./pages/Contato";
import { EmpresaPage, EMPRESA } from "./pages/Empresa";
import { TermosPage, TERMOS } from "./pages/Termos";
import { NotFoundPage } from "./pages/NotFound";
import { MapaDoSitePage, MAPA } from "./pages/MapaDoSite";

/* =============================================================================
   DISPATCHER — padrão TIER "dispatcher + array".

   Cada rota diz: o <head> (meta + JSON-LD), o componente e como aparece no
   sitemap.xml e no llms.txt. scripts/prerender.mjs lê ESTA lista para gerar
   dist/{rota}/index.html, o sitemap e o llms.txt; o navegador lê a mesma
   lista para hidratar. Página nova de segmento ou de blog = 1 entrada no
   array de dados (data/segmentos.ts, data/blog.ts), nada aqui.

   A home ("/") é a única sem `render`: continua sendo o app de index.html,
   intocado. O prerender só injeta o <head> dela.
   ========================================================================== */

export type Route = {
  path: string;
  meta: PageMeta;
  render?: () => ReactNode;
  /** Fora do sitemap e do llms.txt (ex.: 404). */
  oculto?: boolean;
  llms: { secao: "Páginas" | "Segmentos" | "Blog"; titulo: string; descricao: string };
  modificado?: string;
};

const HOJE = "2026-09-25";

/* Title e description da home ficam exatamente como já estavam no index.html. */
const HOME_TITLE = "Cygna — A agenda que trabalha em silêncio";
const HOME_DESCRIPTION =
  "Cygna é a plataforma de agendamentos para clínicas de estética, salões de beleza e autônomas de cílios e unhas: agenda online 24h, lembretes no WhatsApp, anamnese e financeiro.";

const home: Route = {
  path: "/",
  meta: {
    path: "/",
    title: HOME_TITLE,
    titleAbsoluto: true,
    description: HOME_DESCRIPTION,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/", nome: HOME_TITLE, descricao: HOME_DESCRIPTION, semBreadcrumb: true, mainEntity: ID_SOFTWARE }),
      schemaSoftware(),
      schemaFaq(FAQ_HOME, "/"),
    ]),
  },
  llms: {
    secao: "Páginas",
    titulo: "Início",
    descricao: "Visão geral do sistema: agenda online, lembretes no WhatsApp, anamnese, financeiro, planos a partir de R$ 39,90 e perguntas frequentes.",
  },
  modificado: HOJE,
};

const segmentos: Route[] = SEGMENTOS.map((s) => {
  const path = segmentoPath(s);
  const trilha = [
    { nome: "Segmentos", path: "/segmentos" },
    { nome: s.label, path },
  ];
  return {
    path,
    meta: {
      path,
      title: s.metaTitle,
      description: s.metaDescription,
      image: s.imagem,
      imageAlt: s.imagemAlt,
      jsonLd: montarGrafo([
        schemaWebPage({ canonical: path, nome: s.h1, descricao: s.metaDescription, imagem: s.imagem, mainEntity: `${urlAbs(path)}#service`, dataModificada: s.atualizado }),
        schemaBreadcrumb(trilha, path),
        schemaService({ canonical: path, nome: s.h1, descricao: s.resumo, audiencia: s.audiencia, categoria: s.categoria, planoId: s.plano }),
        schemaFaq(s.faq, path),
      ]),
    },
    render: () => <SegmentoPage seg={s} />,
    llms: { secao: "Segmentos", titulo: s.label, descricao: s.resumo },
    modificado: s.atualizado,
  };
});

const hubSegmentos: Route = {
  path: "/segmentos",
  meta: {
    path: "/segmentos",
    title: HUB_SEGMENTOS.metaTitle,
    description: HUB_SEGMENTOS.metaDescription,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/segmentos", nome: HUB_SEGMENTOS.h1, descricao: HUB_SEGMENTOS.metaDescription, tipo: "CollectionPage", mainEntity: `${urlAbs("/segmentos")}#itemlist` }),
      schemaBreadcrumb([{ nome: "Segmentos", path: "/segmentos" }], "/segmentos"),
      schemaItemList("/segmentos", SEGMENTOS.map((s) => ({ nome: s.label, path: segmentoPath(s), descricao: s.metaDescription }))),
      schemaFaq(HUB_SEGMENTOS.faq, "/segmentos"),
    ]),
  },
  render: () => <SegmentosHub />,
  llms: { secao: "Segmentos", titulo: "Segmentos (comparativo)", descricao: HUB_SEGMENTOS.resumo },
  modificado: HOJE,
};

const posts: Route[] = postsPublicados().map((p) => {
  const path = postPath(p);
  return {
    path,
    meta: {
      path,
      title: p.metaTitle,
      description: p.metaDescription,
      image: p.imagem,
      imageAlt: p.imagemAlt,
      ogType: "article",
      publicado: p.publicado,
      modificado: p.atualizado,
      jsonLd: montarGrafo([
        schemaWebPage({ canonical: path, nome: p.titulo, descricao: p.metaDescription, imagem: p.imagem, mainEntity: `${urlAbs(path)}#article`, speakable: [".post-resumo"], dataModificada: p.atualizado }),
        schemaBreadcrumb(
          [
            { nome: "Blog", path: "/blog" },
            { nome: p.titulo, path },
          ],
          path
        ),
        schemaBlogPosting({
          canonical: path,
          titulo: p.titulo,
          descricao: p.metaDescription,
          imagem: p.imagem,
          publicado: p.publicado,
          modificado: p.atualizado,
          secao: p.categoria,
          palavras: contarPalavras(p),
          tags: p.tags,
        }),
      ]),
    },
    render: () => <BlogPost post={p} />,
    llms: { secao: "Blog", titulo: p.titulo, descricao: p.resumo },
    modificado: p.atualizado,
  };
});

const blog: Route = {
  path: "/blog",
  meta: {
    path: "/blog",
    title: BLOG_INDEX.metaTitle,
    description: BLOG_INDEX.metaDescription,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/blog", nome: BLOG_INDEX.h1, descricao: BLOG_INDEX.metaDescription, tipo: "CollectionPage", mainEntity: `${urlAbs("/blog")}#itemlist` }),
      schemaBreadcrumb([{ nome: "Blog", path: "/blog" }], "/blog"),
      schemaItemList("/blog", postsPublicados().map((p) => ({ nome: p.titulo, path: postPath(p), descricao: p.metaDescription }))),
    ]),
  },
  render: () => <BlogIndex />,
  llms: { secao: "Páginas", titulo: "Blog", descricao: BLOG_INDEX.resumo },
  modificado: postsPublicados().map((p) => p.atualizado).sort().at(-1) ?? HOJE,
};

const contato: Route = {
  path: "/contato",
  meta: {
    path: "/contato",
    title: CONTATO.metaTitle,
    description: CONTATO.metaDescription,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/contato", nome: CONTATO.h1, descricao: CONTATO.metaDescription, tipo: "ContactPage", mainEntity: ID_ORG }),
      schemaBreadcrumb([{ nome: "Contato", path: "/contato" }], "/contato"),
      schemaFaq(CONTATO.faq, "/contato"),
    ]),
  },
  render: () => <ContatoPage />,
  llms: { secao: "Páginas", titulo: "Contato", descricao: CONTATO.resumo },
  modificado: HOJE,
};

const empresa: Route = {
  path: "/empresa",
  meta: {
    path: "/empresa",
    title: EMPRESA.metaTitle,
    description: EMPRESA.metaDescription,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/empresa", nome: EMPRESA.h1, descricao: EMPRESA.metaDescription, tipo: "AboutPage", mainEntity: ID_ORG }),
      schemaBreadcrumb([{ nome: "Empresa", path: "/empresa" }], "/empresa"),
      schemaFaq(EMPRESA.faq, "/empresa"),
    ]),
  },
  render: () => <EmpresaPage />,
  llms: { secao: "Páginas", titulo: "Sobre a Cygna", descricao: EMPRESA.resumo },
  modificado: HOJE,
};

const termos: Route = {
  path: "/termos-e-privacidade",
  meta: {
    path: "/termos-e-privacidade",
    title: TERMOS.metaTitle,
    description: TERMOS.metaDescription,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/termos-e-privacidade", nome: TERMOS.h1, descricao: TERMOS.metaDescription, dataModificada: TERMOS.atualizado }),
      schemaBreadcrumb([{ nome: "Termos e privacidade", path: "/termos-e-privacidade" }], "/termos-e-privacidade"),
    ]),
  },
  render: () => <TermosPage />,
  llms: { secao: "Páginas", titulo: "Termos, privacidade e cookies", descricao: TERMOS.resumo },
  modificado: TERMOS.atualizado,
};

/* Índice raso para pessoas: noindex, follow e fora do sitemap.xml/llms.txt. */
const mapa: Route = {
  path: "/mapa-do-site",
  meta: {
    path: "/mapa-do-site",
    title: MAPA.title,
    description: MAPA.description,
    noindex: true,
    jsonLd: montarGrafo([
      schemaWebPage({ canonical: "/mapa-do-site", nome: MAPA.title, descricao: MAPA.description }),
      schemaBreadcrumb([{ nome: "Mapa do site", path: "/mapa-do-site" }], "/mapa-do-site"),
    ]),
  },
  render: () => <MapaDoSitePage />,
  oculto: true,
  llms: { secao: "Páginas", titulo: "Mapa do site", descricao: MAPA.description },
};

const notFound: Route = {
  path: "/404",
  meta: { path: "/404", title: "Página não encontrada", description: "A página procurada não existe no site da Cygna. Veja os atalhos para os segmentos, o blog e o contato.", noindex: true },
  render: () => <NotFoundPage />,
  oculto: true,
  llms: { secao: "Páginas", titulo: "404", descricao: "" },
};

export const ROUTES: Route[] = [home, hubSegmentos, ...segmentos, blog, ...posts, empresa, contato, termos, mapa, notFound];

export function findRoute(pathname: string): Route {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ROUTES.find((r) => r.path === clean) ?? notFound;
}
