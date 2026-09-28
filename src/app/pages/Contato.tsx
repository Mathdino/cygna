import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { SEGMENTOS } from "../data/segmentos";
import { SITE, TESTE_GRATIS_DIAS } from "../site/config";
import { REDES_SOCIAIS, urlCurta } from "../site/social";
import { FaqList, PageHero, PageShell } from "./ui";

/* ─── /contato ────────────────────────────────────────────────────────────── */
export const CONTATO = {
  metaTitle: "Contato: fale com o time da Cygna",
  metaDescription:
    "Fale com a Cygna para tirar dúvidas sobre o sistema de agendamento, pedir ajuda na migração da sua agenda ou tratar de privacidade e dados pessoais (LGPD).",
  h1: "Fale com a Cygna",
  resumo:
    "Para falar com a Cygna, preencha o formulário desta página ou escreva direto para o nosso e-mail. Atendemos dúvidas sobre planos e recursos, ajuda na migração da sua agenda e pedidos sobre privacidade e dados pessoais.",
  faq: [
    {
      q: "Como falar com a Cygna?",
      a: "Pelo formulário desta página ou pelo e-mail de contato. Conte o tipo de negócio, quantas profissionais atendem e o que você precisa. Com essas informações, a resposta já vem com a orientação certa para o seu caso, sem idas e vindas.",
    },
    {
      q: "Dá para ver o sistema funcionando antes de assinar?",
      a: `Dá, e o jeito mais rápido é o teste grátis: são ${TESTE_GRATIS_DIAS} dias em qualquer plano, sem cartão de crédito. Você cadastra seus serviços, publica o link e usa a agenda de verdade. Se quiser ajuda para configurar, fale com a gente por aqui.`,
    },
    {
      q: "A Cygna ajuda a migrar os dados da minha agenda atual?",
      a: "Ajuda, sem custo. Você envia a lista de clientes em planilha e o time importa nomes, telefones e datas de nascimento. Também orientamos o cadastro de serviços, profissionais e horários para a agenda nova começar já com a sua rotina.",
    },
    {
      q: "Como peço acesso ou exclusão dos meus dados pessoais?",
      a: "Envie o pedido pelo formulário ou para o e-mail do encarregado de dados informado em Termos e privacidade. A LGPD garante acesso, correção, portabilidade e exclusão dos seus dados. Respondemos dentro do prazo legal, depois de confirmar a sua identidade.",
    },
  ],
};

export function ContatoPage() {
  return (
    <PageShell path="/contato">
      <PageHero
        trilha={[{ nome: "Contato", path: "/contato" }]}
        selo="Contato"
        titulo={CONTATO.h1}
        resumo={CONTATO.resumo}
        acoes={false}
      />

      <section className="px-3 pt-4 sm:px-4">
        <div className="mx-auto grid max-w-6xl gap-3 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-3">
            {SITE.contact.email && (
              <Canal
                Icon={Mail}
                titulo="E-mail"
                texto="Dúvidas sobre planos, recursos e migração."
                href={`mailto:${SITE.contact.email}`}
                valor={SITE.contact.email}
              />
            )}
            {SITE.contact.whatsapp && (
              <Canal
                Icon={MessageCircle}
                titulo="WhatsApp"
                texto="Para conversas rápidas com o time."
                href={`https://wa.me/${SITE.contact.whatsapp}`}
                valor="Abrir conversa"
              />
            )}
            {/* Para reativar: importar ShieldCheck de lucide-react e recriar
                const DPO_EMAIL = SITE.legal.dpoEmail || SITE.contact.email; */}
            {/* {DPO_EMAIL && (
              <Canal
                Icon={ShieldCheck}
                titulo="Privacidade e LGPD"
                texto="Pedidos de acesso, correção ou exclusão de dados pessoais."
                href={`mailto:${DPO_EMAIL}?subject=${encodeURIComponent("Pedido LGPD")}`}
                valor={DPO_EMAIL}
              />
            )} */}
            <Redes />
          </div>
          <Formulario />
        </div>
      </section>

      <FaqList
        itens={CONTATO.faq}
        titulo="Antes de escrever"
        intro="As respostas para o que mais perguntam antes de falar com a gente."
      />
      <div className="h-16" />
    </PageShell>
  );
}

function Canal({
  Icon,
  titulo,
  texto,
  href,
  valor,
}: {
  Icon: typeof Mail;
  titulo: string;
  texto: string;
  href: string;
  valor: string;
}) {
  return (
    <a
      href={href}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group flex items-start gap-4 rounded-3xl border border-tinta/10 bg-white p-6 transition-colors hover:border-iris/40"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-nevoa text-iris transition-colors group-hover:bg-iris group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-[17px] font-semibold tracking-tight">
          {titulo}
        </span>
        <span className="mt-1 block text-[14px] text-tinta/65">{texto}</span>
        <span className="mt-2 block text-[14px] font-medium text-iris">
          {valor}
        </span>
      </span>
    </a>
  );
}

/* Redes sociais: mesma lista do rodapé (site/social.ts). WhatsApp já tem card
   próprio acima, então fica de fora aqui. */
function Redes() {
  const redes = REDES_SOCIAIS.filter((r) => r.label !== "WhatsApp");
  if (!redes.length) return null;
  return (
    <div className="rounded-3xl border border-tinta/10 bg-white p-6">
      <h2 className="text-[17px] font-semibold tracking-tight">
        Redes sociais
      </h2>
      <p className="mt-1 text-[14px] text-tinta/65">
        Novidades, dicas de gestão e bastidores da Cygna.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {redes.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl p-1.5 pr-3 transition-colors hover:bg-nevoa"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nevoa text-iris transition-colors group-hover:bg-iris group-hover:text-white">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span>
                <span className="block text-[14px] font-medium">{label}</span>
                <span className="block text-[13px] text-tinta/60">
                  {urlCurta(href)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const field =
  "mt-1.5 w-full rounded-2xl border border-tinta/15 bg-perola px-4 py-3 text-[15px] text-tinta outline-none transition-colors placeholder:text-tinta/40 focus:border-iris focus:bg-white";

/**
 * Sem backend: o formulário monta a mensagem e abre o WhatsApp (se configurado)
 * ou o e-mail da pessoa, já preenchido. Nada é gravado pelo site.
 */
/** Máscara de celular/telefone BR: (11) 91234-5678 ou (11) 3123-4567. */
function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Formulario() {
  const [enviado, setEnviado] = useState(false);
  const [telefone, setTelefone] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const texto = [
      `Nome: ${d.get("nome")}`,
      `WhatsApp: ${d.get("whatsapp")}`,
      `Negócio: ${d.get("negocio")}`,
      `Profissionais: ${d.get("equipe")}`,
      "",
      String(d.get("mensagem") ?? ""),
    ].join("\n");
    const url = SITE.contact.whatsapp
      ? `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(
          texto
        )}`
      : `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
          `Contato pelo site — ${d.get("nome")}`
        )}&body=${encodeURIComponent(texto)}`;
    window.open(url, SITE.contact.whatsapp ? "_blank" : "_self");
    setEnviado(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-tinta/10 bg-white p-6 sm:p-8"
      aria-labelledby="form-titulo"
    >
      <h2 id="form-titulo" className="text-[22px] font-semibold tracking-tight">
        Envie sua mensagem
      </h2>
      <p className="mt-1.5 text-[14px] text-tinta/65">
        Ao enviar, abrimos seu{" "}
        {SITE.contact.whatsapp ? "WhatsApp" : "aplicativo de e-mail"} com a
        mensagem pronta. O site não guarda o que você escreve.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-[13px] font-medium text-tinta/80">
          Seu nome
          <input
            name="nome"
            required
            autoComplete="name"
            className={field}
            placeholder="Como podemos te chamar?"
          />
        </label>
        <label className="text-[13px] font-medium text-tinta/80">
          Telefone
          <input
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            minLength={14}
            maxLength={15}
            pattern="\(\d{2}\) \d{4,5}-\d{4}"
            title="Informe o DDD e o número, ex.: (11) 91234-5678"
            value={telefone}
            onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
            className={field}
            placeholder="(00) 00000-0000"
          />
        </label>
        <label className="text-[13px] font-medium text-tinta/80">
          Tipo de negócio
          <select
            name="negocio"
            className={field}
            defaultValue={SEGMENTOS[0].label}
          >
            {SEGMENTOS.map((s) => (
              <option key={s.slug}>{s.label}</option>
            ))}
            <option>Outro negócio de beleza</option>
          </select>
        </label>
        <label className="text-[13px] font-medium text-tinta/80">
          Quantas profissionais atendem?
          <select name="equipe" className={field} defaultValue="Só eu">
            <option>Só eu</option>
            <option>2 a 5</option>
            <option>6 ou mais</option>
          </select>
        </label>
        <label className="text-[13px] font-medium text-tinta/80 sm:col-span-2">
          Mensagem
          <textarea
            name="mensagem"
            required
            rows={5}
            className={`${field} resize-y`}
            placeholder="Conte o que você precisa"
          />
        </label>
      </div>
      <p className="mt-4 text-[12.5px] text-tinta/55">
        Usamos seus dados só para responder a este contato. Saiba mais em{" "}
        <a
          href="/termos-e-privacidade#privacidade"
          className="text-iris underline underline-offset-2"
        >
          Termos e privacidade
        </a>
        .
      </p>
      <button
        type="submit"
        className="btn mt-6 inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.02]"
      >
        Enviar mensagem
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
      {enviado && (
        <p
          role="status"
          className="mt-4 rounded-2xl bg-nevoa px-4 py-3 text-[14px] text-tinta/80"
        >
          Pronto! Se a janela não abriu, escreva para {SITE.contact.email}.
        </p>
      )}
    </form>
  );
}
