import { Feather, HeartHandshake, KeyRound, Unlock } from "lucide-react";
import { SEGMENTOS, segmentoPath } from "../data/segmentos";
import { PLANOS, SITE, TESTE_GRATIS_DIAS, brl } from "../site/config";
import { CtaFinal, FaqList, Numeros, PageHero, PageShell, Relacionados } from "./ui";

/* ─── /empresa (AboutPage) ────────────────────────────────────────────────── */
/* Só fatos que o próprio site sustenta (planos, teste, política de cancelamento,
   migração). Data de fundação, fundadores e cidade-sede entram aqui e no schema
   quando forem informados — não se chuta dado de entidade. */
export const EMPRESA = {
  metaTitle: "Sobre a Cygna: software de gestão para beleza",
  metaDescription:
    "Conheça a Cygna, software de agendamento e gestão feito para clínicas de estética, salões de beleza, lash e nail designers: o que fazemos e como trabalhamos.",
  h1: "Sobre a Cygna: tecnologia leve para quem cuida da beleza",
  resumo:
    "A Cygna é uma empresa de software que desenvolve um sistema de agendamento e gestão para negócios de beleza: clínicas de estética, salões, lash e nail designers. Nosso trabalho é tirar da profissional as tarefas repetitivas, como confirmar horário, cobrar sinal e lembrar a manutenção, para que ela use o tempo atendendo.",
  faq: [
    {
      q: "O que é a Cygna?",
      a: "A Cygna é um sistema de agendamento e gestão online para negócios de beleza. Reúne agenda com link na bio, lembretes no WhatsApp, sinal via Pix, ficha e anamnese das clientes, comissões e financeiro, e funciona no navegador do celular ou do computador, sem instalar nada.",
    },
    {
      q: "Para quem a Cygna foi feita?",
      a: "Para quem vive de beleza com horário marcado: clínicas de estética, salões de beleza, lash e nail designers, designers de sobrancelha, micropigmentadoras, barbearias e spas. O mesmo sistema serve do studio de uma pessoa só à clínica com várias salas e mais de uma unidade.",
    },
    {
      q: "Quanto custa usar a Cygna?",
      a: `Há três planos mensais: Autônoma, por R$ ${brl(PLANOS[0].mensal)}; Studio, por R$ ${brl(PLANOS[1].mensal)}; e Clínica, por R$ ${brl(PLANOS[2].mensal)}. No plano anual você ganha 2 meses grátis e paga R$ ${brl(PLANOS[0].anual)}, R$ ${brl(PLANOS[1].anual)} e R$ ${brl(PLANOS[2].anual)} por ano. Todos têm ${TESTE_GRATIS_DIAS} dias grátis, sem cartão e sem fidelidade.`,
    },
    {
      q: "De quem são os dados das minhas clientes?",
      a: "Seus. O negócio de beleza é o controlador dos dados das próprias clientes, e a Cygna trata essas informações só para fazer o sistema funcionar. Você pode exportar tudo a qualquer momento, inclusive ao cancelar, e os pedidos das titulares seguem a LGPD.",
    },
    {
      q: "Como falar com a empresa?",
      a: `Pela página de contato ou pelo e-mail ${SITE.contact.email}. Atendemos dúvidas sobre planos e recursos, ajudamos na migração da agenda atual sem custo e recebemos pedidos sobre privacidade e dados pessoais pelo canal do encarregado de dados.`,
    },
  ],
};

const PRINCIPIOS = [
  {
    Icon: HeartHandshake,
    titulo: "Cuide de quem cuida",
    texto: "Quem trabalha com beleza passa o dia cuidando dos outros. O sistema existe para cuidar da parte que ninguém vê: a agenda, o caixa e as mensagens.",
  },
  {
    Icon: Feather,
    titulo: "Leve na superfície",
    texto: "A cliente vê um link simples e uma mensagem clara no WhatsApp. Nos bastidores, a agenda cruza profissional, sala, sinal e manutenção, como o cisne que desliza sem mostrar esforço.",
  },
  {
    Icon: Unlock,
    titulo: "Sem amarras",
    texto: "Sem instalação, sem cartão para testar e sem fidelidade. Quem fica, fica porque a ferramenta ajuda, e pode sair quando quiser levando os próprios dados.",
  },
  {
    Icon: KeyRound,
    titulo: "O dado é da profissional",
    texto: "Ficha, histórico e anamnese pertencem ao negócio e às clientes dele. Tratamos essas informações só para operar o sistema, com acesso restrito e conforme a LGPD.",
  },
];

export function EmpresaPage() {
  return (
    <PageShell path="/empresa">
      <PageHero trilha={[{ nome: "Empresa", path: "/empresa" }]} selo="A empresa" titulo={EMPRESA.h1} resumo={EMPRESA.resumo} />

      <Numeros
        itens={[
          { valor: "3", rotulo: "planos, do studio de uma pessoa à clínica com várias unidades" },
          { valor: `${TESTE_GRATIS_DIAS} dias`, rotulo: "de teste grátis em qualquer plano, sem cartão" },
          { valor: "R$ 0", rotulo: "para migrar a lista de clientes da agenda atual" },
          { valor: "0", rotulo: "fidelidade: o cancelamento é feito pelo próprio painel" },
        ]}
      />

      <section className="px-3 pt-16 sm:px-4 sm:pt-24">
        <div data-reveal className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="t-title">Por que o nome Cygna</h2>
            <div className="mt-5 flex flex-col gap-4 text-[16.5px] leading-[1.75] text-tinta/80">
              <p>
                Cygna vem de <em>cygnus</em>, o cisne em latim. Escolhemos o cisne porque ele resume o que queremos que o sistema seja para
                quem trabalha com beleza: leve na superfície e preciso nos bastidores. Quem olha vê um movimento tranquilo; quem está na água sabe
                o trabalho constante que sustenta esse deslizar.
              </p>
              <p>
                Uma agenda de beleza funciona do mesmo jeito. A cliente só enxerga o link, o horário e a mensagem de confirmação. Por trás,
                o sistema confere se a profissional está livre, se a sala ou o aparelho estão disponíveis, se o sinal foi pago e quando a
                manutenção vence. O cisne está no nosso símbolo por isso.
              </p>
            </div>
          </div>
          <div>
            <h2 className="t-title">O que a Cygna faz</h2>
            <div className="mt-5 flex flex-col gap-4 text-[16.5px] leading-[1.75] text-tinta/80">
              <p>
                A Cygna reúne em um só lugar o que antes ficava espalhado entre caderno, planilha e WhatsApp: agenda online com link na bio,
                lembrete e confirmação automáticos, sinal via Pix, ficha e anamnese das clientes, pacotes de sessões, comissões, estoque e
                caixa do dia.
              </p>
              <p>
                O sistema funciona no navegador, sem instalar nada, e foi pensado para a rotina brasileira de quem vive de beleza: pagamento
                por Pix, conversa pelo WhatsApp e cuidado com dados de saúde exigido pela LGPD.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 pt-16 sm:px-4 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <h2 data-reveal className="t-title">No que acreditamos</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPIOS.map(({ Icon, titulo, texto }) => (
              <li key={titulo} data-reveal className="rounded-3xl border border-tinta/10 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nevoa text-iris">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-tight">{titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-tinta/70">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Relacionados
        titulo="Para quem trabalhamos"
        itens={SEGMENTOS.map((s) => ({ titulo: s.label, href: segmentoPath(s), texto: s.metaDescription, selo: "Segmento" }))}
      />

      <FaqList itens={EMPRESA.faq} titulo="Sobre a empresa" />

      <CtaFinal />
    </PageShell>
  );
}
