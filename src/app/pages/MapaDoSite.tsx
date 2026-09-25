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

export function MapaDoSitePage() {
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
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mapaGrupos().map((g) => (
            <nav key={g.titulo} aria-label={g.titulo} className="rounded-3xl border border-tinta/10 bg-white p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-iris">{g.titulo}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[15px] leading-snug text-tinta/80 transition-colors hover:text-iris">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>
      <div className="h-16" />
    </PageShell>
  );
}
