import { Fragment, useRef, type ReactNode } from "react";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { gsap, useGSAP, MOTION } from "../lib/gsap";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import CookieConsent from "../components/CookieConsent";
import GradientText from "../components/GradientText";
import { Glyph } from "../components/Logo";
import type { Bloco } from "../data/segmentos";
import type { Trilha } from "../site/schema";
import { TESTE_GRATIS_DIAS } from "../site/config";

/* =============================================================================
   Peças das páginas internas. Tudo aqui renderiza no servidor (prerender) e
   hidrata no navegador, então nada lê window/document durante o render.

   Animação (regras do lp-marketgru, GUIA TIER):
    · estado inicial aplicado por JS (gsap.from), nunca por CSS — sem script,
      o conteúdo aparece;
    · só anima o que está ABAIXO da dobra na chegada (o hero não pisca);
    · gatilho em "top 95%", duração < 0,5s; prefers-reduced-motion = nada anima.
   ========================================================================== */

export function PageShell({ path, children }: { path: string; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) return;
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[70] rounded-full bg-tinta px-4 py-2 text-[14px] text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Pular para o conteúdo
      </a>
      <Navbar path={path} />
      <main id="conteudo" ref={root} className="bg-perola font-sans text-tinta">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

/* Mesma trilha que alimenta o BreadcrumbList do JSON-LD — fonte única. */
export function Breadcrumb({ trilha }: { trilha: Trilha }) {
  const itens = [{ nome: "Início", path: "/" }, ...trilha];
  return (
    <nav aria-label="Você está em" className="text-[13px] text-tinta/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        {itens.map((t, i) => {
          const last = i === itens.length - 1;
          return (
            <li key={t.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-tinta/85">
                  {t.nome}
                </span>
              ) : (
                <>
                  <a href={t.path} className="transition-colors hover:text-iris">
                    {t.nome}
                  </a>
                  <ChevronRight className="h-3.5 w-3.5 text-tinta/30" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Texto com links e negrito leves: [âncora](/url) e **destaque**. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        if (link)
          return (
            <a key={i} href={link[2]} className="font-medium text-iris underline decoration-iris/30 underline-offset-4 transition-colors hover:decoration-iris">
              {link[1]}
            </a>
          );
        const bold = /^\*\*([^*]+)\*\*$/.exec(p);
        if (bold) return <strong key={i} className="font-semibold text-tinta">{bold[1]}</strong>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function PageHero({
  trilha,
  selo,
  titulo,
  resumo,
  resumoClass = "resumo",
  imagem,
  imagemAlt,
  acoes = true,
  children,
}: {
  trilha: Trilha;
  selo: string;
  titulo: ReactNode;
  resumo: string;
  resumoClass?: string;
  imagem?: string;
  imagemAlt?: string;
  acoes?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="p-3 sm:p-4">
      <section className="relative overflow-hidden rounded-3xl bg-white px-5 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-32">
        <Glyph className="pointer-events-none absolute -right-10 -top-6 hidden h-[420px] rotate-6 text-iris opacity-[0.05] lg:block" />
        <div className={`relative mx-auto grid max-w-6xl items-center gap-10 ${imagem ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
          <div>
            <Breadcrumb trilha={trilha} />
            <GradientText className="mt-6 text-[14px] font-semibold tracking-wide">{selo}</GradientText>
            <h1 className="mt-3 text-balance text-tinta" style={{ fontSize: "clamp(34px, 5.2vw, 56px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.03em" }}>
              {titulo}
            </h1>
            <p className={`${resumoClass} mt-5 max-w-4xl text-[17px] leading-relaxed text-tinta/75`}>{resumo}</p>
            {acoes && <HeroActions />}
            {children}
          </div>
          {imagem && (
            <div className="relative">
              <div className="overflow-hidden rounded-3xl bg-nevoa shadow-[0_40px_80px_-40px_rgba(30,27,46,0.45)]">
                <img src={imagem} alt={imagemAlt ?? ""} width={720} height={860} fetchPriority="high" className="aspect-[5/6] h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a
        href="/#planos"
        className="btn group inline-flex items-center gap-3 rounded-full bg-tinta py-2 pl-6 pr-2 text-[14px] font-medium text-white transition-transform hover:scale-[1.02]"
      >
        Testar grátis por {TESTE_GRATIS_DIAS} dias
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
          <ChevronRight className="h-4 w-4" />
        </span>
      </a>
      <a href="/contato" className="btn inline-flex items-center gap-2 rounded-full border border-tinta/15 px-5 py-3 text-[14px] font-medium text-tinta transition-colors hover:bg-nevoa/60">
        Falar com a gente
      </a>
    </div>
  );
}

export function Numeros({ itens }: { itens: { valor: string; rotulo: string }[] }) {
  return (
    <section aria-label="Em números" className="px-3 pt-4 sm:px-4">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4">
        {itens.map((n) => (
          <div key={n.rotulo} data-reveal className="rounded-3xl border border-tinta/10 bg-white p-5 sm:p-6">
            <dt className="sr-only">{n.rotulo}</dt>
            <dd>
              <span className="block font-display text-[34px] font-semibold leading-none tracking-tight text-iris sm:text-[40px]">{n.valor}</span>
              <span className="mt-3 block text-[13.5px] leading-snug text-tinta/70">{n.rotulo}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* Tabela: o rótulo de cada coluna vai para data-label, e o CSS (.tabela-cygna)
   empilha em cartões abaixo de 600px quando há 3+ colunas. */
export function Tabela({ legenda, colunas, linhas }: { legenda: string; colunas: string[]; linhas: string[][] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-tinta/10 bg-white">
      <table className={`tabela-cygna ${colunas.length >= 3 ? "tabela-empilha" : ""}`}>
        <caption className="sr-only">{legenda}</caption>
        <thead>
          <tr>
            {colunas.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i}>
              {l.map((cel, j) => (
                <td key={j} data-label={colunas[j]}>
                  {cel}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((b, i) => (
        <section key={b.titulo} className={`px-3 sm:px-4 ${i === 0 ? "pt-16 sm:pt-24" : "pt-16 sm:pt-20"}`}>
          <div className="mx-auto max-w-6xl">
            {b.tipo === "texto" && (
              <div data-reveal className="max-w-6xl">
                <h2 className="t-title">{b.titulo}</h2>
                <div className="mt-5 flex flex-col gap-4 text-[16.5px] leading-[1.75] text-tinta/80">
                  {b.paragrafos.map((p, k) => (
                    <p key={k}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              </div>
            )}

            {b.tipo === "lista" && (
              <>
                <div data-reveal className="max-w-6xl">
                  <h2 className="t-title">{b.titulo}</h2>
                  {b.intro && <p className="mt-4 text-[16.5px] leading-relaxed text-tinta/75">{b.intro}</p>}
                </div>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {b.itens.map((it) => (
                    <li key={it.titulo} data-reveal className="rounded-3xl border border-tinta/10 bg-white p-6">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nevoa text-iris">
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-[18px] font-semibold tracking-tight">{it.titulo}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-tinta/70">
                        <Rich text={it.texto} />
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {b.tipo === "tabela" && (
              <>
                <div data-reveal className="max-w-6xl">
                  <h2 className="t-title">{b.titulo}</h2>
                  {b.intro && <p className="mt-4 text-[16.5px] leading-relaxed text-tinta/75">{b.intro}</p>}
                </div>
                <div data-reveal className="mt-8">
                  <Tabela legenda={b.legenda} colunas={b.colunas} linhas={b.linhas} />
                </div>
              </>
            )}

            {b.tipo === "passos" && (
              <>
                <div data-reveal className="max-w-6xl">
                  <h2 className="t-title">{b.titulo}</h2>
                  {b.intro && <p className="mt-4 text-[16.5px] leading-relaxed text-tinta/75">{b.intro}</p>}
                </div>
                <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {b.passos.map((p, k) => (
                    <li key={p.titulo} data-reveal className="relative rounded-3xl bg-tinta p-6 text-white">
                      <span className="font-display text-[40px] font-semibold leading-none text-perola/25">{String(k + 1).padStart(2, "0")}</span>
                      <h3 className="mt-4 text-[18px] font-semibold tracking-tight">{p.titulo}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{p.texto}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

/* FAQ com <details> nativo: a resposta está no HTML mesmo fechada (crawler e IA
   leem tudo), abre sem JavaScript e o `name` faz um acordeão exclusivo. O MESMO
   array vira o FAQPage do JSON-LD. */
export function FaqList({ itens, titulo = "Perguntas frequentes", intro, id = "perguntas" }: { itens: { q: string; a: string }[]; titulo?: string; intro?: string; id?: string }) {
  return (
    <section id={id} className="px-3 pt-20 sm:px-4 sm:pt-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal>
          <GradientText className="text-[14px] font-semibold tracking-wide">Dúvidas</GradientText>
          <h2 className="mt-4 t-display">{titulo}</h2>
          {intro && <p className="mt-4 max-w-sm text-[16px] text-tinta/70">{intro}</p>}
        </div>
        <div className="flex flex-col gap-3">
          {itens.map((f, i) => (
            <details key={f.q} name={`faq-${id}`} open={i === 0} data-reveal className="faq-details group rounded-2xl border border-tinta/10 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                <h3 className="text-[16px] font-medium tracking-normal">{f.q}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nevoa transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="px-6 pb-5 text-[15px] leading-relaxed text-tinta/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Relacionados({ titulo, itens }: { titulo: string; itens: { titulo: string; href: string; texto?: string; selo?: string }[] }) {
  if (!itens.length) return null;
  return (
    <section className="px-3 pt-20 sm:px-4 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal className="t-title">{titulo}</h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {itens.map((it) => (
            <li key={it.href} data-reveal>
              <a href={it.href} className="group flex h-full flex-col rounded-3xl border border-tinta/10 bg-white p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-iris/40">
                {it.selo && <span className="text-[12px] font-semibold uppercase tracking-wider text-iris">{it.selo}</span>}
                <span className="mt-2 text-[18px] font-semibold leading-snug tracking-tight">{it.titulo}</span>
                {it.texto && <span className="mt-2 text-[14.5px] leading-relaxed text-tinta/65">{it.texto}</span>}
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-medium text-iris">
                  Ler
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaFinal({ titulo = "Sua agenda organizada ainda esta semana", texto }: { titulo?: string; texto?: string }) {
  return (
    <section className="px-3 pb-10 pt-20 sm:px-4 sm:pt-24">
      <div data-reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-tinta px-6 py-14 text-center text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-iris/50 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-bico/25 blur-3xl" aria-hidden="true" />
        <h2 className="relative mx-auto max-w-2xl t-display text-white">{titulo}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-[16px] text-white/70">
          {texto ?? `${TESTE_GRATIS_DIAS} dias grátis em qualquer plano. Sem cartão, sem fidelidade e com ajuda do nosso time na migração.`}
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <a href="/#planos" className="btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-tinta transition-transform hover:scale-[1.02]">
            Começar teste grátis
            <ChevronRight className="h-4 w-4" />
          </a>
          <a href="/contato" className="btn inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10">
            Falar com a gente
          </a>
        </div>
      </div>
    </section>
  );
}

export function dataBR(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${y}`;
}
