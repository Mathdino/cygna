import { SITE, PLANOS } from "./config";

/* =============================================================================
   SCHEMA.ORG — construtores de nós JSON-LD.

   O grafo sai no HTML pré-renderizado (scripts/prerender.mjs), nunca montado
   no navegador: JSON-LD injetado por JavaScript some para todo agente que não
   executa script.

   Regras que valem para todos os nós:
    · Não marque o que não está na tela. Preço, pergunta e nome de serviço no
      JSON-LD precisam existir no HTML renderizado daquela URL.
    · Grafo costurado por @id. Organization e WebSite entram em toda página e
      os demais nós apontam para eles (provider, publisher, isPartOf) sem
      redeclarar a marca.
    · Campo sem dado real é omitido. Nada de rating, review ou endereço
      inventado para "completar" o nó.
   ========================================================================== */

export const ID_ORG = `${SITE.url}/#organization`;
export const ID_SITE = `${SITE.url}/#website`;
export const ID_SOFTWARE = `${SITE.url}/#software`;

type Node = Record<string, unknown>;

export function urlAbs(path: string): string {
  if (path.startsWith("http")) return path;
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

const filled = (values: readonly string[]) => values.filter((v) => v.trim() !== "");

/* ─── Organization ────────────────────────────────────────────────────────── */
export function schemaOrganization(): Node {
  const sameAs = filled([SITE.social.instagram, SITE.social.linkedin, SITE.social.youtube]);
  const contactPoint = SITE.contact.email
    ? [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: SITE.contact.email,
          ...(SITE.contact.whatsapp ? { telephone: `+${SITE.contact.whatsapp}` } : {}),
          areaServed: "BR",
          availableLanguage: "Portuguese",
        },
      ]
    : undefined;

  return {
    "@type": "Organization",
    "@id": ID_ORG,
    name: SITE.name,
    url: urlAbs("/"),
    logo: { "@type": "ImageObject", url: urlAbs(SITE.logo), width: 512, height: 512, caption: SITE.name },
    image: urlAbs(SITE.ogImage),
    description: SITE.description,
    slogan: SITE.tagline,
    ...(SITE.legal.razaoSocial ? { legalName: SITE.legal.razaoSocial } : {}),
    ...(SITE.legal.cnpj ? { taxID: SITE.legal.cnpj } : {}),
    ...(SITE.contact.email ? { email: SITE.contact.email } : {}),
    ...(contactPoint ? { contactPoint } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: [...SITE.knowsAbout],
  };
}

/* ─── WebSite ─────────────────────────────────────────────────────────────── */
/* Sem SearchAction: o site não tem busca interna, e declarar uma seria falso. */
export function schemaWebSite(): Node {
  return {
    "@type": "WebSite",
    "@id": ID_SITE,
    url: urlAbs("/"),
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ID_ORG },
    inLanguage: SITE.language,
  };
}

/* ─── BreadcrumbList ──────────────────────────────────────────────────────── */
/**
 * `trilha` não inclui a home (adicionada aqui). O último item é a página atual
 * e sai sem `item`. A mesma trilha desenha o breadcrumb visível (Breadcrumb.tsx).
 */
export type Trilha = { nome: string; path: string }[];

export function schemaBreadcrumb(trilha: Trilha, canonical: string): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${urlAbs(canonical)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: urlAbs("/") },
      ...trilha.map((t, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: t.nome,
        ...(i === trilha.length - 1 ? {} : { item: urlAbs(t.path) }),
      })),
    ],
  };
}

/* ─── WebPage (e subtipos) ────────────────────────────────────────────────── */
export function schemaWebPage({
  canonical,
  nome,
  descricao,
  tipo = "WebPage",
  imagem,
  mainEntity,
  speakable,
  semBreadcrumb,
  dataModificada,
}: {
  canonical: string;
  nome: string;
  descricao: string;
  tipo?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  imagem?: string;
  mainEntity?: string;
  /** Seletores CSS do trecho answer-first (só nos posts, recurso em beta). */
  speakable?: string[];
  semBreadcrumb?: boolean;
  dataModificada?: string;
}): Node {
  const url = urlAbs(canonical);
  return {
    "@type": tipo,
    "@id": `${url}#webpage`,
    url,
    name: nome,
    description: descricao,
    inLanguage: SITE.language,
    isPartOf: { "@id": ID_SITE },
    about: { "@id": ID_ORG },
    publisher: { "@id": ID_ORG },
    ...(imagem ? { primaryImageOfPage: { "@type": "ImageObject", url: urlAbs(imagem) } } : {}),
    ...(semBreadcrumb ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
    ...(speakable ? { speakable: { "@type": "SpeakableSpecification", cssSelector: speakable } } : {}),
    ...(dataModificada ? { dateModified: dataModificada } : {}),
  };
}

/* ─── Service + BusinessAudience (páginas de segmento) ────────────────────── */
export function schemaService({
  canonical,
  nome,
  descricao,
  audiencia,
  categoria,
  planoId,
}: {
  canonical: string;
  nome: string;
  descricao: string;
  audiencia: string;
  categoria: string;
  /** Plano mostrado na página — o Offer só existe porque o preço está na tela. */
  planoId?: (typeof PLANOS)[number]["id"];
}): Node {
  const url = urlAbs(canonical);
  const plano = PLANOS.find((p) => p.id === planoId);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: nome,
    description: descricao,
    serviceType: "Software de agendamento e gestão (SaaS)",
    category: categoria,
    provider: { "@id": ID_ORG },
    areaServed: { "@type": "Country", name: "Brasil" },
    audience: { "@type": "BusinessAudience", audienceType: audiencia },
    ...(plano
      ? {
          offers: {
            "@type": "Offer",
            name: `Plano ${plano.nome}`,
            price: String(plano.mensal),
            priceCurrency: "BRL",
            description: plano.resumo,
            url: urlAbs("/#planos"),
            seller: { "@id": ID_ORG },
          },
        }
      : {}),
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

/* ─── SoftwareApplication (home) ──────────────────────────────────────────── */
/* Fora do método Tier (que usa Service), mas é o tipo correto de um SaaS e os
   três preços estão visíveis na seção Planos da home. Sem aggregateRating: os
   depoimentos da home ainda são ilustrativos. */
export function schemaSoftware(): Node {
  return {
    "@type": "SoftwareApplication",
    "@id": ID_SOFTWARE,
    name: SITE.name,
    url: urlAbs("/"),
    description: SITE.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Agendamento e gestão para negócios de beleza",
    operatingSystem: "Web, Android, iOS (navegador)",
    inLanguage: SITE.language,
    publisher: { "@id": ID_ORG },
    offers: PLANOS.map((p) => ({
      "@type": "Offer",
      name: `Plano ${p.nome}`,
      price: String(p.mensal),
      priceCurrency: "BRL",
      description: p.resumo,
      url: urlAbs("/#planos"),
    })),
  };
}

/* ─── FAQPage ─────────────────────────────────────────────────────────────── */
/** Recebe o MESMO array que o acordeão da página renderiza. */
export function schemaFaq(faq: readonly { q: string; a: string }[], canonical: string): Node | null {
  if (!faq.length) return null;
  const url = urlAbs(canonical);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    isPartOf: { "@id": ID_SITE },
    about: { "@id": ID_ORG },
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ─── ItemList (listagens) ────────────────────────────────────────────────── */
/** Lista o que está na tela daquela listagem, nada além. */
export function schemaItemList(canonical: string, itens: { nome: string; path: string; descricao?: string }[]): Node {
  return {
    "@type": "ItemList",
    "@id": `${urlAbs(canonical)}#itemlist`,
    numberOfItems: itens.length,
    itemListElement: itens.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nome,
      url: urlAbs(it.path),
      ...(it.descricao ? { description: it.descricao } : {}),
    })),
  };
}

/* ─── BlogPosting ─────────────────────────────────────────────────────────── */
export function schemaBlogPosting({
  canonical,
  titulo,
  descricao,
  imagem,
  publicado,
  modificado,
  secao,
  palavras,
  tags,
}: {
  canonical: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  publicado: string;
  modificado: string;
  secao: string;
  palavras: number;
  tags: readonly string[];
}): Node {
  const url = urlAbs(canonical);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: titulo,
    description: descricao,
    inLanguage: SITE.language,
    datePublished: publicado,
    dateModified: modificado,
    articleSection: secao,
    wordCount: palavras,
    keywords: tags.join(", "),
    /* Sem autor pessoa cadastrado: a autoria é da organização (GUIA-NOVO-PROJETO §1). */
    author: { "@id": ID_ORG },
    publisher: { "@id": ID_ORG },
    ...(imagem ? { image: [urlAbs(imagem)] } : {}),
    isPartOf: { "@id": ID_SITE },
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

/* ─── Emissão ─────────────────────────────────────────────────────────────── */
export function montarGrafo(nos: (Node | null | undefined)[]): Node {
  return {
    "@context": "https://schema.org",
    "@graph": [schemaOrganization(), schemaWebSite(), ...nos.filter(Boolean)],
  };
}
