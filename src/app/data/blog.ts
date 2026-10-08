/* =============================================================================
   BLOG — padrão TIER (dispatcher + array), papel T4 conteúdo.

   Criar post = 1 arquivo em data/posts/{slug}.ts + 1 linha no array POSTS
   abaixo. Rota /blog/{slug}, listagem /blog, sitemap.xml, llms.txt,
   BlogPosting e FAQPage saem daqui.

   Regras (ESTRUTURA-TIERS §4.2, §5.6, §6.4):
    · 1.000+ palavras úteis, tese própria, sem enchimento.
    · `resumo` answer-first: é o trecho marcado como speakable.
    · Cada post linka para o segmento comercial do mesmo assunto (no texto e
      no CTA final) — é o sentido do silo: post → página comercial.
    · Keyword informacional mora no post; a comercial mora no segmento. Os
      dois nunca disputam a mesma keyword principal.
    · Número sem fonte só como EXEMPLO de cálculo, dito como exemplo.
    · Tabelas: o prerender copia o <th> para `data-label` de cada <td>, e o
      CSS empilha a tabela em cartões abaixo de 600px.
    · `<!--teste-gratis-->` no html marca onde entra o bloco "Teste 14 dias
      grátis" no meio do artigo (sem o marcador, ele vai depois do texto).
    · FAQ de 4 a 6 perguntas reais, resposta abrindo com a resposta. O mesmo
      array vira o acordeão da página e o FAQPage do JSON-LD.
    · Imagem: /images/blog/{slug}.webp, 1200×630.
   ========================================================================== */

import type { PlanoId } from "../site/config";
import comoReduzirFaltas from "./posts/como-reduzir-faltas-de-clientes-no-salao";
import fichaAnamnese from "./posts/ficha-de-anamnese-para-estetica-e-lgpd";
import agendaManutencao from "./posts/agenda-de-manutencao-de-cilios-e-unhas";
import comissaoSalao from "./posts/como-calcular-comissao-no-salao-de-beleza";
import salaoParceiro from "./posts/lei-do-salao-parceiro-como-funciona";
import pacotesSessoes from "./posts/pacotes-de-sessoes-na-clinica-de-estetica";
import precificarServicos from "./posts/como-precificar-servicos-de-cilios-e-unhas";
import linkInstagram from "./posts/link-de-agendamento-no-instagram";
import fidelizarClientes from "./posts/como-fidelizar-clientes-no-salao-de-beleza";
import estoqueClinica from "./posts/controle-de-estoque-na-clinica-de-estetica";
import barbeariaAgendamento from "./posts/agendamento-ou-ordem-de-chegada-na-barbearia";
import barbeariaClube from "./posts/clube-de-assinatura-na-barbearia";
import micropigmentacao from "./posts/retoque-de-micropigmentacao-e-design-de-sobrancelhas";
import spaMassagem from "./posts/agenda-de-spa-e-espaco-de-massagem";
import maquiadora from "./posts/agenda-para-maquiadora-noivas-e-eventos";
import depilacao from "./posts/intervalo-entre-sessoes-de-depilacao";
import indicadoresClinica from "./posts/indicadores-de-gestao-para-clinica-de-estetica";
import fechamentoCaixa from "./posts/fechamento-de-caixa-no-salao-de-beleza";
import perfilGoogle from "./posts/perfil-da-empresa-no-google-para-negocios-de-beleza";
import montarBarbearia from "./posts/como-montar-uma-barbearia";
import atrairBarbearia from "./posts/como-atrair-clientes-para-barbearia";
import montarSalao from "./posts/como-montar-um-salao-de-beleza";
import marketingSalao from "./posts/marketing-para-salao-de-beleza";
import planilhaSalao from "./posts/planilha-para-salao-de-beleza";
import montarClinica from "./posts/como-montar-uma-clinica-de-estetica";
import atrairClinica from "./posts/como-atrair-clientes-para-clinica-de-estetica";
import comecarManicure from "./posts/como-comecar-como-manicure-e-nail-designer";
import comecarLash from "./posts/como-comecar-como-lash-designer";
import appGratuito from "./posts/app-de-agendamento-gratuito-vale-a-pena";
import agendamentoWhatsapp from "./posts/como-fazer-agendamento-pelo-whatsapp";
import organizarAgenda from "./posts/como-organizar-agenda-de-clientes";
import faturamentoSalao from "./posts/como-aumentar-o-faturamento-do-salao-de-beleza";
import comecarSobrancelha from "./posts/como-comecar-como-designer-de-sobrancelhas";

export type Post = {
  slug: string;
  status: "published" | "draft";
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tags: string[];
  publicado: string;
  atualizado: string;
  imagem: string;
  imagemAlt: string;
  /** Segmento comercial do mesmo assunto (CTA e breadcrumb de contexto). "" = post geral, sem caixa de segmento. */
  segmento: string;
  /** Nicho sem página própria (ex.: maquiadoras): substitui o rótulo e o plano do segmento no bloco de teste grátis. */
  publico?: string;
  plano?: PlanoId;
  /** Texto do bloco "Teste 14 dias grátis", ligado ao assunto do post. */
  teste: { titulo: string; texto: string };
  faq: { q: string; a: string }[];
  html: string;
};

export const POSTS: Post[] = [
  comoReduzirFaltas,
  fichaAnamnese,
  agendaManutencao,
  comissaoSalao,
  salaoParceiro,
  pacotesSessoes,
  precificarServicos,
  linkInstagram,
  fidelizarClientes,
  estoqueClinica,
  barbeariaAgendamento,
  barbeariaClube,
  micropigmentacao,
  spaMassagem,
  maquiadora,
  depilacao,
  indicadoresClinica,
  fechamentoCaixa,
  perfilGoogle,
  montarBarbearia,
  atrairBarbearia,
  montarSalao,
  marketingSalao,
  planilhaSalao,
  montarClinica,
  atrairClinica,
  comecarManicure,
  comecarLash,
  appGratuito,
  agendamentoWhatsapp,
  organizarAgenda,
  faturamentoSalao,
  comecarSobrancelha,
];

/** Mais recente primeiro (listagem, "continue lendo", ItemList). */
export const postsPublicados = () =>
  POSTS.filter((p) => p.status === "published").sort((a, b) => b.publicado.localeCompare(a.publicado));
export const getPost = (slug: string) => postsPublicados().find((p) => p.slug === slug);
export const postPath = (p: Pick<Post, "slug">) => `/blog/${p.slug}`;

/** Palavras úteis do post (resumo + corpo + FAQ), para wordCount e tempo de leitura. */
export function contarPalavras(p: Post): number {
  const faq = p.faq.map((f) => `${f.q} ${f.a}`).join(" ");
  const texto = `${p.resumo} ${p.html.replace(/<[^>]+>/g, " ")} ${faq}`;
  return texto.split(/\s+/).filter(Boolean).length;
}
export const tempoLeitura = (p: Post) => Math.max(1, Math.round(contarPalavras(p) / 200));

const slugify = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Corpo do post pronto para render: dá `id` a cada <h2> (âncora do sumário),
 * prepara as tabelas e separa o texto no marcador do bloco de teste grátis.
 * Roda no render, então o HTML pré-renderizado já sai pronto.
 */
export function prepararCorpo(html: string): { sumario: { id: string; titulo: string }[]; antes: string; depois: string } {
  const sumario: { id: string; titulo: string }[] = [];
  const usados = new Set<string>();
  const comIds = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, titulo: string) => {
    let id = slugify(titulo) || "secao";
    while (usados.has(id)) id += "-2";
    usados.add(id);
    sumario.push({ id, titulo: titulo.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${titulo}</h2>`;
  });
  const [antes, depois = ""] = prepararTabelas(comIds).split("<!--teste-gratis-->");
  return { sumario, antes, depois };
}

/**
 * Tabelas do corpo do post: copia o texto de cada <th> para `data-label` dos
 * <td> da mesma coluna e marca a tabela para o CSS empilhar em cartões abaixo
 * de 600px (3+ colunas). Roda no render, então o HTML pré-renderizado já sai
 * pronto — nada depende de JavaScript no navegador.
 */
export function prepararTabelas(html: string): string {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, inner: string) => {
    const heads = [...inner.matchAll(/<th>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/"/g, "&quot;"));
    const body = inner.replace(/<tr>([\s\S]*?)<\/tr>/g, (row: string, cells: string) => {
      if (!cells.includes("<td>")) return row;
      let i = 0;
      return `<tr>${cells.replace(/<td>/g, () => `<td data-label="${heads[i++] ?? ""}">`)}</tr>`;
    });
    const cls = heads.length >= 3 ? "tabela-cygna tabela-empilha" : "tabela-cygna";
    return `<div class="tabela-wrap"><table class="${cls}">${body}</table></div>`;
  });
}
