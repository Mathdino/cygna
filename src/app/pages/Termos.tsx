import type { ReactNode } from "react";
import { Cookie } from "lucide-react";
import { SITE, TESTE_GRATIS_DIAS } from "../site/config";
import { openCookiePreferences } from "../lib/consent";
import { PageHero, PageShell, Tabela, dataBR } from "./ui";

/* ─── /termos-e-privacidade ───────────────────────────────────────────────── */
/* Modelo de base para LGPD (Lei 13.709/2018) e Marco Civil (Lei 12.965/2014).
   PRECISA de revisão jurídica e dos dados da empresa (config.ts → legal) antes
   de publicar. Os trechos sobre cookies descrevem exatamente o banner do site. */
export const TERMOS = {
  metaTitle: "Termos de uso, privacidade e cookies",
  metaDescription:
    "Termos de uso, política de privacidade e política de cookies da Cygna: como tratamos seus dados pela LGPD, seus direitos como titular e as regras do serviço.",
  h1: "Termos de uso, privacidade e cookies",
  resumo:
    "Esta página reúne as regras de uso do sistema Cygna, a forma como tratamos dados pessoais conforme a LGPD e os cookies usados no site. Em resumo: coletamos só o necessário para operar o serviço, não vendemos dados e você pode pedir acesso, correção ou exclusão a qualquer momento.",
  atualizado: "2026-09-25",
};

const EMPRESA = SITE.legal.razaoSocial ? `${SITE.legal.razaoSocial}${SITE.legal.cnpj ? `, inscrita no CNPJ ${SITE.legal.cnpj}` : ""}` : SITE.name;
const DPO = SITE.legal.dpoEmail || SITE.contact.email;

function S({ id, titulo, children }: { id?: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="t-title">{titulo}</h2>
      <div className="mt-5 flex flex-col gap-4 text-[16px] leading-[1.75] text-tinta/80">{children}</div>
    </section>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-tinta">{children}</h3>;
}

export function TermosPage() {
  return (
    <PageShell path="/termos-e-privacidade">
      <PageHero trilha={[{ nome: "Termos e privacidade", path: "/termos-e-privacidade" }]} selo="Transparência" titulo={TERMOS.h1} resumo={TERMOS.resumo} acoes={false}>
        <p className="mt-6 text-[13px] text-tinta/55">Última atualização: {dataBR(TERMOS.atualizado)}</p>
      </PageHero>

      <div className="px-3 pt-4 sm:px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Nesta página" className="lg:sticky lg:top-28 lg:self-start">
            <ol className="flex flex-wrap gap-2 text-[14px] lg:flex-col">
              {[
                ["#termos", "1. Termos de uso"],
                ["#privacidade", "2. Política de privacidade"],
                ["#direitos", "3. Seus direitos"],
                ["#cookies", "4. Cookies"],
                ["#contato-dados", "5. Encarregado de dados"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={`/termos-e-privacidade${href}`} className="block rounded-full border border-tinta/10 bg-white px-4 py-2 text-tinta/75 hover:border-iris/40 hover:bg-iris hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex max-w-6xl flex-col gap-14 rounded-3xl bg-white p-6 sm:p-10">
            <S id="termos" titulo="1. Termos de uso">
              <p>
                Estes termos regem o uso do site e do sistema {SITE.name}, oferecidos por {EMPRESA} (“Cygna”, “nós”). Ao criar uma conta ou
                usar o sistema, você declara que leu e concorda com estas regras. Se usa a Cygna em nome de um negócio, declara ter poderes
                para aceitar os termos por ele.
              </p>
              <H>1.1 O serviço</H>
              <p>
                A Cygna é um sistema online de agendamento e gestão para negócios de beleza. Ele inclui agenda com link de agendamento,
                lembretes e confirmações por WhatsApp, cobrança de sinal via Pix, ficha e anamnese de clientes, comissões, estoque e controle
                financeiro, conforme o plano contratado. Os recursos de cada plano estão descritos na seção de planos do site.
              </p>
              <H>1.2 Conta e acesso</H>
              <p>
                Você é responsável pelas informações de cadastro, pela guarda da senha e pelas ações feitas com o seu login e o das pessoas
                da sua equipe que você autorizar. Avise-nos imediatamente se suspeitar de uso indevido da conta.
              </p>
              <H>1.3 Teste grátis, planos e pagamento</H>
              <p>
                Todo plano pode ser testado por {TESTE_GRATIS_DIAS} dias sem cartão de crédito. Ao fim do teste, o uso continua mediante a
                contratação de um plano, com cobrança mensal ou anual conforme a opção escolhida. Alterações de preço são comunicadas com
                antecedência e valem a partir do ciclo seguinte.
              </p>
              <H>1.4 Cancelamento</H>
              <p>
                Não há fidelidade nem multa. O cancelamento é feito pelo próprio painel e interrompe as cobranças seguintes. Antes de
                cancelar, você pode exportar seus dados. Após o cancelamento, os dados da conta são mantidos pelo período descrito na
                política de privacidade e depois excluídos.
              </p>
              <H>1.5 Dados das suas clientes</H>
              <p>
                Os dados que você cadastra sobre as suas clientes, como contato, histórico, anamnese e fotos, pertencem ao seu negócio. Para
                esses dados, o seu negócio é o <strong>controlador</strong> e a Cygna atua como <strong>operadora</strong> (LGPD, art. 5º,
                VI e VII): tratamos as informações apenas para prestar o serviço, conforme as suas instruções. Cabe ao seu negócio informar
                as clientes sobre o tratamento e obter o consentimento quando exigido, em especial para dados de saúde.
              </p>
              <H>1.6 Uso adequado</H>
              <p>
                Não é permitido usar o sistema para enviar mensagens não solicitadas em massa, armazenar conteúdo ilícito, tentar acessar
                dados de outras contas ou prejudicar o funcionamento do serviço. O descumprimento pode levar à suspensão da conta.
              </p>
              <H>1.7 Disponibilidade e responsabilidade</H>
              <p>
                Trabalhamos para manter o sistema disponível e seguro, mas podem ocorrer interrupções para manutenção ou por falhas de
                terceiros, como provedores de internet, de mensagens e de pagamento. Não respondemos por danos indiretos ou por decisões
                tomadas com base em informações cadastradas incorretamente pelo usuário.
              </p>
              <H>1.8 Alterações e foro</H>
              <p>
                Estes termos podem ser atualizados; a data da última versão fica no topo da página e mudanças relevantes são comunicadas aos
                clientes. Aplica-se a lei brasileira, e fica eleito o foro do domicílio do consumidor para as questões de relação de consumo.
              </p>
            </S>

            <S id="privacidade" titulo="2. Política de privacidade">
              <p>
                Esta política explica como {EMPRESA} trata dados pessoais de visitantes do site e de clientes que usam o sistema, conforme a
                Lei Geral de Proteção de Dados (Lei 13.709/2018). Para os dados de visitantes e dos titulares das contas, a Cygna é a
                controladora.
              </p>
              <H>2.1 Dados que coletamos e para quê</H>
              <Tabela
                legenda="Dados pessoais tratados pela Cygna, finalidade e base legal"
                colunas={["Dado", "Finalidade", "Base legal (LGPD)"]}
                linhas={[
                  ["Nome, e-mail e telefone do cadastro", "Criar e manter a conta, prestar suporte", "Execução de contrato (art. 7º, V)"],
                  ["Dados de cobrança", "Processar pagamentos e emitir documentos fiscais", "Execução de contrato e obrigação legal (art. 7º, II e V)"],
                  ["Registros de acesso ao sistema", "Segurança e cumprimento do Marco Civil da Internet", "Obrigação legal (art. 7º, II)"],
                  ["Mensagens do formulário de contato", "Responder ao seu pedido", "Legítimo interesse e procedimentos preliminares (art. 7º, V e IX)"],
                  ["Dados de navegação (Google Analytics)", "Medir o uso do site de forma agregada", "Consentimento (art. 7º, I), pelo aviso de cookies"],
                ]}
              />
              <H>2.2 Com quem compartilhamos</H>
              <p>
                Não vendemos dados pessoais. Compartilhamos apenas o necessário com fornecedores que viabilizam o serviço: provedores de
                hospedagem e banco de dados em nuvem, o serviço de mensagens usado para os lembretes por WhatsApp, os intermediadores de
                pagamento responsáveis pelo Pix e, com o seu consentimento, o Google Analytics. Também podemos fornecer dados quando exigido
                por lei ou por ordem judicial.
              </p>
              <H>2.3 Transferência internacional</H>
              <p>
                Alguns fornecedores podem armazenar dados em servidores fora do Brasil. Nesses casos, a transferência segue as hipóteses do
                art. 33 da LGPD, com cláusulas contratuais que exigem nível de proteção compatível com a lei brasileira.
              </p>
              <H>2.4 Por quanto tempo guardamos</H>
              <p>
                Mantemos os dados enquanto a conta estiver ativa. Após o cancelamento, os dados da conta ficam disponíveis para exportação e
                são excluídos em seguida, salvo os que a lei manda guardar: registros de acesso por 6 meses (Marco Civil, art. 15) e
                documentos fiscais pelo prazo da legislação tributária.
              </p>
              <H>2.5 Segurança</H>
              <p>
                Usamos conexão criptografada (HTTPS), controle de acesso por perfil e registro das operações sensíveis. Dados de saúde, como a
                anamnese, ficam visíveis apenas para os usuários que o negócio autorizar.
              </p>
            </S>

            <S id="direitos" titulo="3. Seus direitos como titular">
              <p>A LGPD (art. 18) garante a você, a qualquer momento e mediante pedido:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>confirmação de que tratamos seus dados e acesso a eles;</li>
                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
                <li>portabilidade dos dados a outro fornecedor;</li>
                <li>informação sobre com quem compartilhamos seus dados;</li>
                <li>revogação do consentimento e eliminação dos dados tratados com base nele.</li>
              </ul>
              <p>
                Se você é cliente de um negócio que usa a Cygna, o pedido deve ser feito primeiro a esse negócio, que é o controlador dos seus
                dados; nós o apoiamos no atendimento. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados
                (ANPD).
              </p>
            </S>

            <S id="cookies" titulo="4. Política de cookies">
              <p>
                Cookies são pequenos arquivos gravados no navegador. O site da Cygna usa cookies em três categorias, e só as essenciais ficam
                ativas sem a sua autorização:
              </p>
              <Tabela
                legenda="Categorias de cookies usadas no site da Cygna"
                colunas={["Categoria", "Para que serve", "Precisa de consentimento?"]}
                linhas={[
                  ["Essenciais", "Manter o site funcionando e lembrar a sua escolha de cookies (cygna_consent, 12 meses)", "Não"],
                  ["Análise", "Google Analytics: páginas visitadas e tempo de navegação, de forma agregada (_ga, _ga_*)", "Sim"],
                  ["Marketing", "Medição de anúncios e remarketing. O site não usa hoje; a escolha já vale se passar a usar", "Sim"],
                ]}
              />
              <p>
                Usamos o Modo de Consentimento do Google: enquanto você não autoriza, o Google Analytics não grava cookies. Ao recusar ou
                retirar o consentimento, os cookies de análise já gravados são apagados. A escolha vale por 12 meses e pode ser alterada a
                qualquer momento.
              </p>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="btn inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-tinta/15 px-5 py-2.5 text-[14px] font-medium text-tinta transition-colors hover:bg-nevoa/60"
              >
                <Cookie className="h-4 w-4" aria-hidden="true" />
                Alterar preferências de cookies
              </button>
            </S>

            <S id="contato-dados" titulo="5. Encarregado de dados e contato">
              <p>
                Pedidos sobre dados pessoais, dúvidas sobre esta política ou comunicações relacionadas à LGPD podem ser enviados ao
                encarregado pelo tratamento de dados pessoais
                {DPO ? (
                  <>
                    {" "}
                    pelo e-mail{" "}
                    <a href={`mailto:${DPO}`} className="font-medium text-iris underline underline-offset-4">
                      {DPO}
                    </a>
                  </>
                ) : null}{" "}
                ou pela <a href="/contato" className="font-medium text-iris underline underline-offset-4">página de contato</a>. Respondemos
                dentro do prazo legal, após confirmar a identidade de quem faz o pedido.
              </p>
            </S>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </PageShell>
  );
}
