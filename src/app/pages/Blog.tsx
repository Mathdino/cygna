import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { postsPublicados, postPath, prepararTabelas, tempoLeitura, type Post } from "../data/blog";
import { getSegmento, segmentoPath } from "../data/segmentos";
import { SITE } from "../site/config";
import { Breadcrumb, CtaFinal, PageHero, PageShell, Relacionados, dataBR } from "./ui";

/* ─── /blog ───────────────────────────────────────────────────────────────── */
export const BLOG_INDEX = {
  metaTitle: "Blog de gestão para clínicas, salões e autônomas",
  metaDescription:
    "Blog da Cygna com guias práticos de gestão para negócios de beleza: como reduzir faltas, montar a ficha de anamnese e organizar a agenda de manutenção.",
  h1: "Blog de gestão para negócios de beleza",
  resumo:
    "Guias práticos para quem administra uma clínica de estética, um salão de beleza ou atende sozinha: como diminuir faltas, organizar a ficha das clientes, cobrar sinal e manter a agenda cheia de retornos.",
};

export function BlogIndex() {
  const posts = postsPublicados();
  return (
    <PageShell path="/blog">
      <PageHero trilha={[{ nome: "Blog", path: "/blog" }]} selo="Blog" titulo={BLOG_INDEX.h1} resumo={BLOG_INDEX.resumo} acoes={false} />
      <section className="px-3 pt-4 sm:px-4">
        <ul className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} data-reveal>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>
      <CtaFinal />
    </PageShell>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <a href={postPath(post)} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tinta/10 bg-white transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-iris/40">
      <div className="aspect-[16/10] overflow-hidden bg-nevoa">
        <img src={post.imagem} alt={post.imagemAlt} width={640} height={400} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-iris">{post.categoria}</span>
        <h2 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight">{post.titulo}</h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-tinta/65">{post.metaDescription}</p>
        <span className="mt-auto flex items-center justify-between pt-5 text-[13px] text-tinta/55">
          <time dateTime={post.publicado}>{dataBR(post.publicado)}</time>
          <span className="flex items-center gap-1.5 font-medium text-iris">
            Ler
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </span>
      </div>
    </a>
  );
}

/* ─── /blog/{slug} ────────────────────────────────────────────────────────── */
export function BlogPost({ post }: { post: Post }) {
  const path = postPath(post);
  const seg = getSegmento(post.segmento);
  const outros = postsPublicados().filter((p) => p.slug !== post.slug);

  return (
    <PageShell path={path}>
      <div className="p-3 sm:p-4">
        <header className="relative overflow-hidden rounded-3xl bg-white px-5 pb-10 pt-28 sm:px-10 sm:pt-32">
          <div className="mx-auto max-w-6xl">
            <Breadcrumb
              trilha={[
                { nome: "Blog", path: "/blog" },
                { nome: post.titulo, path },
              ]}
            />
            <span className="mt-6 inline-block rounded-full bg-nevoa px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-iris">{post.categoria}</span>
            <h1 className="mt-4 text-balance" style={{ fontSize: "clamp(32px, 4.6vw, 50px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.03em" }}>
              {post.titulo}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-tinta/60">
              <span>
                Por <strong className="font-medium text-tinta/80">Equipe {SITE.name}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.publicado}>{dataBR(post.publicado)}</time>
              </span>
              {post.atualizado !== post.publicado && (
                <span>
                  Atualizado em <time dateTime={post.atualizado}>{dataBR(post.atualizado)}</time>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {tempoLeitura(post)} min de leitura
              </span>
            </div>
            {/* Answer-first: é este parágrafo que o speakable do JSON-LD aponta (.post-resumo) */}
            <p className="post-resumo mt-8 rounded-3xl bg-perola p-6 text-[17px] leading-relaxed text-tinta/85">{post.resumo}</p>
          </div>
        </header>
      </div>

      <div className="px-3 sm:px-4">
        <figure className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-nevoa">
          <img src={post.imagem} alt={post.imagemAlt} width={1200} height={630} fetchPriority="high" className="aspect-[1200/630] w-full object-cover" />
        </figure>
      </div>

      <article className="px-3 pt-12 sm:px-4">
        <div className="prose-cygna mx-auto max-w-6xl" dangerouslySetInnerHTML={{ __html: prepararTabelas(post.html) }} />
      </article>

      {seg && (
        <aside className="px-3 pt-14 sm:px-4">
          <div data-reveal className="mx-auto flex max-w-6xl flex-col gap-5 rounded-3xl bg-tinta p-7 text-white sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-perola">
              <seg.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-[18px] font-semibold tracking-tight">A Cygna para {seg.label.toLowerCase()}</p>
              <p className="mt-1 text-[14.5px] text-white/70">{seg.menuDescricao} — veja como o sistema resolve isso no dia a dia.</p>
            </div>
            <a href={segmentoPath(seg)} className="btn inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-tinta">
              Conhecer
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </aside>
      )}

      <Relacionados
        titulo="Continue lendo"
        itens={outros.map((p) => ({ titulo: p.titulo, href: postPath(p), texto: p.metaDescription, selo: p.categoria }))}
      />

      <CtaFinal />
    </PageShell>
  );
}
