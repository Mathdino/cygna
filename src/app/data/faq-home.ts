/* FAQ da home. Módulo só de dados: o acordeão (sections/Faq.tsx) e o FAQPage do
   JSON-LD da home (routes.tsx) leem este MESMO array — paridade tela ↔ schema. */
export const FAQ_HOME: { q: string; a: string }[] = [
  {
    q: "Preciso instalar alguma coisa?",
    a: "Não. A Cygna funciona no navegador do celular, tablet ou computador. É só entrar com seu e-mail e começar.",
  },
  {
    q: "Minhas clientes precisam baixar um app?",
    a: "Não. Elas agendam pelo seu link — que você coloca na bio do Instagram, no WhatsApp ou no Google. Escolhem serviço, horário e pronto.",
  },
  {
    q: "Como funcionam os lembretes no WhatsApp?",
    a: "Um dia antes do horário, a cliente recebe uma mensagem com botões para confirmar ou remarcar. Você vê a resposta direto na agenda.",
  },
  {
    q: "Consigo cobrar sinal para evitar faltas?",
    a: "Sim. Você define o valor ou a porcentagem do sinal por serviço e a cliente paga via Pix na hora de agendar.",
  },
  {
    q: "Dá para trazer os dados da minha agenda atual?",
    a: "Dá. Importamos sua lista de clientes por planilha e nosso time de suporte ajuda na migração sem custo.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Sem multa e sem fidelidade. Você cancela quando quiser pelo próprio painel e pode exportar seus dados.",
  },
];
