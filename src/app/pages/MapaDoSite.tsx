import { SEGMENTOS, segmentoPath } from "../data/segmentos";
import { postsPublicados, postPath } from "../data/blog";
import { PageHero, PageShell } from "./ui";

/* ─── /mapa-do-site ───────────────────────────────────────────────────────── */
/* Mapa em HTML para pessoas (e atalho de rastreio). Montado dos mesmos arrays
   das páginas, então nunca fica desatualizado. É um índice raso: sai com
   `noindex, follow` e fora do sitemap.xml (ESTRUTURA-TIERS §7.4) — os links
   continuam sendo seguidos. O mapa para robôs é o /sitemap.xml. */
export const MAPA = {
  title: "Mapa do site",
  description: "Todas as páginas do site da Cygna em um só lugar: segmentos atendidos, artigos do blog, empresa, contato, termos e privacidade e o sitemap XML.",
};

export function mapaGrupos() {
  return [
    {
      titulo: "Principais",
      links: [
        { label: "Início", href: "/" },
        { label: "Recursos", href: "/#recursos" },
        { label: "Planos e preços", href: "/#planos" },
        { label: "Perguntas frequentes", href: "/#duvidas" },
      ],
    },
    {
      titulo: "Segmentos",
      links: [{ label: "Comparar segmentos", href: "/segmentos" }, ...SEGMENTOS.map((s) => ({ label: s.label, href: segmentoPath(s) }))],
    },
    {
      titulo: "Blog",
      links: [{ label: "Todos os artigos", href: "/blog" }, ...postsPublicados().map((p) => ({ label: p.titulo, href: postPath(p) }))],
    },
    {
      titulo: "Empresa",
      links: [
        { label: "Sobre a Cygna", href: "/empresa" },
        { label: "Contato", href: "/contato" },
        { label: "Termos de uso", href: "/termos-e-privacidade#termos" },
        { label: "Privacidade e LGPD", href: "/termos-e-privacidade#privacidade" },
        { label: "Política de cookies", href: "/termos-e-privacidade#cookies" },
        { label: "Sitemap XML", href: "/sitemap.xml" },
      ],
    },
  ];
}

type Grupo = ReturnType<typeof mapaGrupos>[number];

function GrupoCard({ grupo, className = "", listaClassName = "mt-4 flex flex-col gap-3", linkClassName = "text-[15px]" }: { grupo: Grupo; className?: string; listaClassName?: string; linkClassName?: string }) {
  return (
    <nav aria-label={grupo.titulo} className={`rounded-3xl border border-tinta/10 bg-white p-6 ${className}`}>
      <h2 className="text-[13px] font-semibold uppercase tracking-wider text-iris">{grupo.titulo}</h2>
      <ul className={listaClassName}>
        {grupo.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={`${linkClassName} leading-snug text-tinta/80 transition-colors hover:text-iris`}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MapaDoSitePage() {
  const grupos = mapaGrupos();
  const blog = grupos.find((g) => g.titulo === "Blog");
  return (
    <PageShell path="/mapa-do-site">
      <PageHero
        trilha={[{ nome: "Mapa do site", path: "/mapa-do-site" }]}
        selo="Navegação"
        titulo="Mapa do site"
        resumo="Todas as páginas do site da Cygna reunidas por assunto: os segmentos que atendemos, os artigos do blog e as páginas institucionais."
        acoes={false}
      />
      <section className="px-3 pt-4 sm:px-4">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
          {grupos.filter((g) => g.titulo !== "Blog").map((g) => (
            <GrupoCard key={g.titulo} grupo={g} />
          ))}
          {/* Blog tem dezenas de links: ocupa a linha inteira e quebra em colunas
              para o card não ficar comprido. */}
          {blog && <GrupoCard grupo={blog} className="md:col-span-3" listaClassName="mt-4 gap-x-8 sm:columns-2 lg:columns-3 [&>li]:mb-2.5 [&>li]:break-inside-avoid" linkClassName="text-[14px]" />}
        </div>
      </section>
      <div className="h-16" />
    </PageShell>
  );
}
