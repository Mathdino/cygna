import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SEGMENTOS, segmentoPath, type Segmento } from "../data/segmentos";
import { getPost, postPath } from "../data/blog";
import { PLANOS, TESTE_GRATIS_DIAS, brl } from "../site/config";
import { Blocos, CtaFinal, FaqList, Numeros, PageHero, PageShell, Relacionados, Tabela } from "./ui";

/* ─── /segmentos/{slug} ───────────────────────────────────────────────────── */
export function SegmentoPage({ seg }: { seg: Segmento }) {
  const path = segmentoPath(seg);
  const plano = PLANOS.find((p) => p.id === seg.plano)!;
  const irmas = SEGMENTOS.filter((s) => s.slug !== seg.slug);

  const leitura = seg.relacionados.map((r) => {
    const post = getPost(r.href.replace("/blog/", ""));
    return { titulo: r.titulo, href: r.href, texto: post?.metaDescription, selo: post ? `Blog · ${post.categoria}` : "Blog" };
  });

  return (
    <PageShell path={path}>
      <PageHero
        trilha={[
          { nome: "Segmentos", path: "/segmentos" },
          { nome: seg.label, path },
        ]}
        selo={seg.label}
        titulo={seg.h1}
        resumo={seg.resumo}
        imagem={seg.imagem}
        imagemAlt={seg.imagemAlt}
      />

      <Numeros itens={seg.numeros} />

      <Blocos blocos={seg.blocos} />

      {/* Plano indicado — o Offer do schema existe porque este preço está na tela */}
      <section className="px-3 pt-16 sm:px-4 sm:pt-20">
        <div data-reveal className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl border border-iris/20 bg-white p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wider text-iris">Plano indicado</span>
            <h2 className="mt-3 t-title">Plano {plano.nome} para {seg.label.toLowerCase()}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-tinta/75">{seg.planoMotivo}</p>
          </div>
          <div className="rounded-3xl bg-perola p-6">
            <p className="flex items-baseline gap-1">
              <span className="text-[15px] text-tinta/60">R$</span>
              <span className="font-display text-[52px] font-semibold leading-none tracking-tight">{brl(plano.mensal)}</span>
              <span className="text-[15px] text-tinta/60">/mês</span>
            </p>
            <p className="mt-1 text-[13px] text-tinta/60">ou R$ {brl(plano.anual)}/ano no plano anual (2 meses grátis)</p>
            <p className="mt-4 flex items-start gap-2 text-[14px] text-tinta/75">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-iris" aria-hidden="true" />
              {plano.resumo}
            </p>
            <a
              href="/#planos"
              className="btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-iris py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.01]"
            >
              Testar {TESTE_GRATIS_DIAS} dias grátis
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <FaqList itens={seg.faq} titulo={`Dúvidas de ${seg.label.toLowerCase()}`} intro="Perguntas que ouvimos de quem está escolhendo um sistema para o próprio negócio." />

      <Relacionados titulo="Leia também" itens={leitura} />

      <Relacionados
        titulo="Outros segmentos atendidos"
        itens={irmas.map((s) => ({ titulo: s.label, href: segmentoPath(s), texto: s.menuDescricao, selo: "Segmento" }))}
      />

      <CtaFinal />
    </PageShell>
  );
}

/* ─── /segmentos (hub) ────────────────────────────────────────────────────── */
/* O conteúdo que só o hub tem é o comparativo entre os segmentos — hub que só
   resume as filhas é página fina (ESTRUTURA-TIERS §4.1). */
export const HUB_SEGMENTOS = {
  metaTitle: "Sistema para negócios de beleza por segmento",
  metaDescription:
    "Compare como a Cygna atende clínicas de estética, salões de beleza e lash e nail designers: quem decide, a dor principal, o recurso-chave e o plano indicado.",
  h1: "Um sistema de gestão para cada tipo de negócio de beleza",
  resumo:
    "A Cygna atende três perfis de negócio de beleza com necessidades diferentes: clínicas de estética, que vivem de protocolos e anamnese; salões de beleza, que coordenam equipe e comissão; e lash e nail designers, que dependem do retorno de manutenção. Cada perfil tem uma página própria e um plano indicado.",
  faq: [
    {
      q: "Qual plano da Cygna escolher para o meu negócio?",
      a: "Depende do tamanho da equipe e dos recursos. Quem atende sozinha começa no Autônoma, por R$ 39,90 por mês. Equipes de até 5 profissionais usam o Studio, por R$ 99,90. Clínicas com prontuário, salas, estoque ou equipe grande usam o Clínica, por R$ 219,90. No plano anual, 2 meses saem grátis. Todos têm 14 dias grátis.",
    },
    {
      q: "Posso mudar de plano depois de começar?",
      a: "Pode. A troca de plano é feita pelo painel e os dados continuam os mesmos: clientes, histórico, fichas e agenda. É comum começar no Autônoma e subir para o Studio quando entra uma segunda profissional, sem precisar migrar nada nem trocar de sistema.",
    },
    {
      q: "A Cygna atende barbearias, spas e designers de sobrancelha?",
      a: "Atende. Os recursos de agenda, lembrete no WhatsApp, sinal via Pix e financeiro servem para qualquer negócio de beleza com horário marcado. As páginas de segmento detalham os três perfis mais comuns, mas barbearias, spas, micropigmentadoras e designers de sobrancelha usam os mesmos planos.",
    },
    {
      q: "Preciso de um sistema diferente se tenho clínica e salão juntos?",
      a: "Não. No plano Clínica, cada profissional tem a própria agenda e os serviços dela, então tratamentos estéticos com anamnese e serviços de salão com comissão convivem no mesmo painel, com o caixa unificado e relatórios separados por serviço e por profissional.",
    },
  ],
} as const;

const COMPARATIVO = {
  colunas: ["Critério", "Clínicas de estética", "Salões de beleza", "Lash e nail designers"],
  linhas: [
    ["Quem decide", "Dona ou responsável técnica da clínica", "Dono do salão ou gerente", "A própria profissional"],
    ["Dor principal", "Controlar protocolo, pacote e anamnese", "Coordenar equipe, comissão e caixa", "Trazer a cliente de volta na manutenção"],
    ["Recurso-chave", "Anamnese digital e saldo de sessões", "Agenda por profissional e comissão", "Lembrete de retorno e sinal via Pix"],
    ["Plano indicado", "Clínica · R$ 219,90/mês", "Studio · R$ 99,90/mês", "Autônoma · R$ 39,90/mês"],
  ],
};

export function SegmentosHub() {
  return (
    <PageShell path="/segmentos">
      <PageHero trilha={[{ nome: "Segmentos", path: "/segmentos" }]} selo="Segmentos" titulo={HUB_SEGMENTOS.h1} resumo={HUB_SEGMENTOS.resumo} />

      <section className="px-3 pt-4 sm:px-4">
        <ul className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
          {SEGMENTOS.map((s) => (
            <li key={s.slug} data-reveal>
              <a href={segmentoPath(s)} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tinta/10 bg-white transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-iris/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-nevoa">
                  <img src={s.imagem} alt={s.imagemAlt} width={640} height={400} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-iris backdrop-blur">
                    <s.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-[20px] font-semibold tracking-tight">{s.label}</h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-tinta/70">{s.metaDescription}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-medium text-iris">
                    Ver a solução para {s.label.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-3 pt-16 sm:px-4 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="max-w-6xl">
            <h2 className="t-title">Como cada segmento usa a Cygna</h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-tinta/75">
              O sistema é o mesmo, mas o que pesa na decisão muda de um negócio para outro. A comparação abaixo ajuda a encontrar o ponto de partida certo.
            </p>
          </div>
          <div data-reveal className="mt-8">
            <Tabela legenda="Comparativo entre clínicas de estética, salões de beleza e lash e nail designers" colunas={COMPARATIVO.colunas} linhas={COMPARATIVO.linhas} />
          </div>
        </div>
      </section>

      <FaqList itens={[...HUB_SEGMENTOS.faq]} titulo="Qual é o meu caso?" />

      <Relacionados
        titulo="Conteúdos por segmento"
        itens={SEGMENTOS.flatMap((s) => s.relacionados.slice(0, 1)).map((r) => {
          const post = getPost(r.href.replace("/blog/", ""));
          return { titulo: post?.titulo ?? r.titulo, href: post ? postPath(post) : r.href, texto: post?.metaDescription, selo: post ? `Blog · ${post.categoria}` : "Blog" };
        })}
      />

      <CtaFinal />
    </PageShell>
  );
}
