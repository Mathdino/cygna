import { ArrowRight, CalendarDays, Check, ChevronRight, Clock, ListOrdered } from "lucide-react";
import { postsPublicados, postPath, prepararCorpo, tempoLeitura, type Post } from "../data/blog";
import { getSegmento, segmentoPath, type Segmento } from "../data/segmentos";
import { CADASTRO_URL, PLANOS, SITE, TESTE_GRATIS_DIAS, brl } from "../site/config";
import { Breadcrumb, CtaFinal, FaqList, PageHero, PageShell, Relacionados, dataBR } from "./ui";

/* ─── /blog ───────────────────────────────────────────────────────────────── */
export const BLOG_INDEX = {
  metaTitle: "Blog de gestão para clínicas, salões e autônomas",
  metaDescription:
    "Guias práticos de gestão para salões, barbearias, clínicas de estética, spas e autônomas de beleza: faltas, comissão, pacotes, caixa, preço e retorno.",
  h1: "Blog de gestão para negócios de beleza",
  resumo:
    "Guias práticos para quem administra uma clínica de estética, um salão de beleza, uma barbearia, um spa ou atende sozinha com cílios, unhas, sobrancelhas, maquiagem ou depilação: como diminuir faltas, organizar a ficha das clientes, cobrar sinal, fechar o caixa e manter a agenda cheia de retornos.",
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
  /* "Continue lendo": 3 posts, primeiro os do mesmo segmento (silo), depois os mais recentes. */
  const outros = postsPublicados()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.segmento === post.segmento) - Number(a.segmento === post.segmento))
    .slice(0, 3);
  const corpo = prepararCorpo(post.html);

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

      {corpo.sumario.length >= 3 && (
        <nav aria-labelledby="sumario-titulo" className="px-3 pt-10 sm:px-4">
          <div className="mx-auto max-w-6xl rounded-3xl border border-tinta/10 bg-white p-6 sm:p-8">
            <p id="sumario-titulo" className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-iris">
              <ListOrdered className="h-4 w-4" aria-hidden="true" />
              Neste artigo
            </p>
            <ol className="mt-4 grid list-decimal gap-x-10 gap-y-2 pl-5 text-[15px] leading-snug text-tinta/75 marker:text-iris/60 md:grid-cols-2">
              {corpo.sumario.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="transition-colors hover:text-iris">
                    {s.titulo}
                  </a>
                </li>
              ))}
              <li>
                <a href="#perguntas" className="transition-colors hover:text-iris">
                  Perguntas frequentes
                </a>
              </li>
            </ol>
          </div>
        </nav>
      )}

      <article className="px-3 pt-12 sm:px-4">
        <div className="prose-cygna mx-auto max-w-6xl" dangerouslySetInnerHTML={{ __html: corpo.antes }} />
        <TesteGratis post={post} seg={seg} />
        {corpo.depois && <div className="prose-cygna mx-auto max-w-6xl" dangerouslySetInnerHTML={{ __html: corpo.depois }} />}
      </article>

      <FaqList itens={post.faq} intro={`Respostas rápidas sobre ${post.focusKeyword}.`} />

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

/* Bloco "Teste 14 dias grátis" no meio do artigo: texto ligado ao assunto do
   post + plano indicado do segmento do mesmo assunto. */
function TesteGratis({ post, seg }: { post: Post; seg?: Segmento }) {
  const plano = PLANOS.find((p) => p.id === (post.plano ?? seg?.plano));
  const publico = post.publico ?? seg?.label;
  const itens = ["Sem cartão de crédito", "Sem fidelidade nem multa", "Migração das clientes sem custo", "Funciona no celular, sem instalar nada"];
  return (
    <section aria-labelledby="teste-gratis" className="not-prose mx-auto my-14 max-w-6xl">
      <div data-reveal className="relative overflow-hidden rounded-3xl bg-tinta p-7 text-white sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-iris/60 blur-3xl" aria-hidden="true" />
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-perola">
              {TESTE_GRATIS_DIAS} dias grátis
            </span>
            <h2 id="teste-gratis" className="mt-4 text-balance text-white" style={{ fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em" }}>
              {post.teste.titulo}
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-white/75">{post.teste.texto}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {itens.map((i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14.5px] text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 text-tinta">
            {plano && publico ? (
              <>
                <p className="text-[13px] font-semibold uppercase tracking-wider text-iris">Plano indicado para {publico.toLowerCase()}</p>
                <p className="mt-2 text-[22px] font-semibold tracking-tight">{plano.nome}</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="text-[14px] text-tinta/60">R$</span>
                  <span className="font-display text-[40px] font-semibold leading-none tracking-tight">{brl(plano.mensal)}</span>
                  <span className="text-[14px] text-tinta/60">/mês depois do teste</span>
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-tinta/65">{plano.resumo}</p>
              </>
            ) : (
              <p className="text-[15px] leading-relaxed text-tinta/70">Agenda online, lembrete no WhatsApp, ficha das clientes e financeiro em um só lugar.</p>
            )}
            <a
              href={CADASTRO_URL}
              className="btn group mt-6 flex items-center justify-between gap-3 rounded-full bg-tinta py-2 pl-6 pr-2 text-[14px] font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Começar meu teste grátis
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <p className="mt-3 text-center text-[12.5px] text-tinta/55">Cancela pelo painel quando quiser.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
