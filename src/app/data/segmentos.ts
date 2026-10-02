import { Scissors, Sparkles, Eye, type LucideIcon } from "lucide-react";
import type { PlanoId } from "../site/config";

/* =============================================================================
   SEGMENTOS — padrão TIER (dispatcher + array), papel T4 "solução por setor".

   Regra de ouro: criar página = adicionar 1 entrada neste array. A rota, o
   submenu do header, o rodapé, o hub /segmentos, o sitemap.xml, o llms.txt e
   o schema saem daqui (src/app/routes.tsx lê este array).

   REGRAS (DIRETRIZES-CONTEUDO + ESTRUTURA-TIERS §2, §4):
    1. Conteúdo ÚNICO. Os três segmentos não dividem parágrafo: quem decide, o
       que mede, o que dá errado e o FAQ são de fato diferentes.
    2. metaTitle ≤ 60 caracteres, com a keyword, SEM a marca (o head acrescenta).
    3. metaDescription 130–160 caracteres, keyword + diferencial.
    4. resumo ANSWER-FIRST: responde a intenção antes de qualquer contexto.
    5. FAQ de 4 a 6 perguntas reais; resposta abre respondendo (40–60 palavras).
    6. `numeros` só com fato verificável (preço, prazo, recurso). Nada de
       estatística de marketing sem fonte.
   ========================================================================== */

export type Bloco =
  | { tipo: "texto"; titulo: string; paragrafos: string[] }
  | { tipo: "lista"; titulo: string; intro?: string; itens: { titulo: string; texto: string }[] }
  | { tipo: "tabela"; titulo: string; intro?: string; legenda: string; colunas: string[]; linhas: string[][] }
  | { tipo: "passos"; titulo: string; intro?: string; passos: { titulo: string; texto: string }[] };

export type Segmento = {
  slug: string;
  /** Rótulo curto: menu, cards e breadcrumb. */
  label: string;
  /** Linha de apoio no menu suspenso. */
  menuDescricao: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  keyword: string;
  resumo: string;
  imagem: string;
  imagemAlt: string;
  /** Público do Service (BusinessAudience.audienceType). */
  audiencia: string;
  categoria: string;
  numeros: { valor: string; rotulo: string }[];
  blocos: Bloco[];
  /** Plano indicado — aparece na página e vira Offer no schema. */
  plano: PlanoId;
  planoMotivo: string;
  faq: { q: string; a: string }[];
  /** Pirâmide: segmento → posts do mesmo assunto (âncora descritiva). */
  relacionados: { titulo: string; href: string }[];
  atualizado: string;
};

export const SEGMENTOS: Segmento[] = [
  /* ══════════════════════════════════════════════════ CLÍNICAS DE ESTÉTICA ══ */
  {
    slug: "clinicas-de-estetica",
    label: "Clínicas de estética",
    menuDescricao: "Anamnese, pacotes e salas",
    icon: Sparkles,
    metaTitle: "Sistema para clínica de estética: agenda e anamnese",
    metaDescription:
      "Sistema para clínica de estética com agenda online, anamnese digital assinada no celular, pacotes de sessões, salas e fotos de evolução. Teste grátis 14 dias.",
    h1: "Sistema para clínica de estética: agenda, anamnese e pacotes em um lugar só",
    keyword: "sistema para clínica de estética",
    resumo:
      "A Cygna é um sistema para clínica de estética que junta agenda online, anamnese digital assinada no celular, controle de pacotes de sessões e reserva de salas e equipamentos. A paciente agenda pelo link, confirma pelo WhatsApp e a ficha dela fica completa, com fotos de evolução, sem papel.",
    imagem: "/images/para-quem/clinicas-de-estetica.webp",
    imagemAlt: "Profissional de estética atendendo paciente em uma sala de clínica",
    audiencia: "Clínicas de estética facial e corporal",
    categoria: "Software de gestão para clínica de estética",
    numeros: [
      { valor: "R$ 219,90", rotulo: "por mês no plano Clínica, com profissionais ilimitados" },
      { valor: "1 dia", rotulo: "antes do horário sai o lembrete com botão de confirmar" },
      { valor: "14 dias", rotulo: "de teste grátis, sem cartão de crédito" },
      { valor: "0", rotulo: "fidelidade: cancela pelo painel quando quiser" },
    ],
    blocos: [
      {
        tipo: "texto",
        titulo: "O que muda na rotina de uma clínica de estética",
        paragrafos: [
          "Clínica de estética não vende um horário, vende um protocolo. Uma limpeza de pele pode ser avulsa, mas uma drenagem, uma radiofrequência ou um tratamento para melasma quase sempre vem em pacote de 5, 8 ou 10 sessões, com intervalo definido entre elas. O problema raramente é marcar a primeira sessão: é saber, na sexta sessão, quanto ainda resta no pacote, se o intervalo foi respeitado e se a paciente assinou o termo daquele procedimento.",
          "Na Cygna, cada pacote vendido vira um saldo de sessões na ficha da paciente. A cada atendimento o saldo baixa sozinho, e a recepção vê na hora quantas sessões faltam e quando vence o pacote. A paciente também recebe o aviso de que o pacote está acabando, o que abre espaço para a renovação sem abordagem forçada no balcão.",
          "A outra metade do trabalho é o prontuário estético. Anamnese, termo de consentimento e fotos de antes e depois deixam de ficar em pasta física ou no rolo da câmera do celular da profissional. Ficam na ficha da paciente, com data, e aparecem para quem vai atender antes mesmo de ela entrar na sala.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Recursos da Cygna pensados para clínica",
        intro: "Estes recursos fazem parte do plano Clínica e resolvem problemas que um salão ou uma profissional autônoma dificilmente têm.",
        itens: [
          {
            titulo: "Anamnese digital assinada no celular",
            texto: "A paciente preenche o questionário e assina pelo próprio celular antes da primeira sessão. O documento fica guardado na ficha, com data, e pode ser consultado a qualquer atendimento seguinte.",
          },
          {
            titulo: "Pacotes com saldo de sessões",
            texto: "Venda o protocolo uma vez e acompanhe o consumo sessão a sessão. O saldo aparece na agenda, na ficha e no caixa, e a paciente é avisada perto do fim do pacote.",
          },
          {
            titulo: "Salas e equipamentos na agenda",
            texto: "Cada serviço pode exigir uma sala ou um aparelho específico. A agenda não deixa marcar dois procedimentos no mesmo equipamento ao mesmo tempo, mesmo com profissionais diferentes.",
          },
          {
            titulo: "Fotos de evolução por paciente",
            texto: "As fotos de antes e depois ficam na ficha, organizadas por data e por procedimento. A comparação entre a primeira e a última sessão deixa de depender da memória ou da galeria do celular.",
          },
          {
            titulo: "Estoque que baixa por atendimento",
            texto: "Ácidos, máscaras, ponteiras e descartáveis são vinculados ao serviço. Cada atendimento baixa o que foi usado e o sistema avisa antes de um produto acabar.",
          },
          {
            titulo: "Várias unidades no mesmo painel",
            texto: "Clínicas com mais de um endereço veem a agenda e o caixa de cada unidade separados, e o total de todas juntas em um único relatório.",
          },
        ],
      },
      {
        tipo: "texto",
        titulo: "Anamnese, fotos e LGPD: por que a ficha não pode ficar no WhatsApp",
        paragrafos: [
          "Informação sobre saúde é dado pessoal sensível pela Lei Geral de Proteção de Dados (Lei 13.709/2018, art. 5º, II). Alergias, uso de medicamentos, gestação, histórico de queloide e cirurgias anteriores, que são exatamente as perguntas de uma anamnese estética, entram nessa categoria e pedem cuidado maior no armazenamento e no acesso.",
          "Na prática, isso significa tirar a ficha do grupo de WhatsApp da equipe e do papel solto na recepção. Na Cygna, a ficha fica em um único lugar, acessível para quem atende, e a clínica decide quais profissionais podem abrir cada informação. Quando a paciente pede uma cópia ou a exclusão dos dados, tudo está reunido e é fácil de localizar.",
          "Para quem quer montar ou revisar o próprio questionário, o [guia de ficha de anamnese para estética](/blog/ficha-de-anamnese-para-estetica-e-lgpd) explica o que perguntar em cada tipo de procedimento e como guardar as respostas.",
        ],
      },
      {
        tipo: "tabela",
        titulo: "Como fica o fluxo de uma paciente, do agendamento à renovação",
        intro: "Exemplo de um protocolo corporal de 10 sessões, do primeiro contato à renovação do pacote.",
        legenda: "Etapas de atendimento em clínica de estética com a Cygna",
        colunas: ["Etapa", "O que a paciente faz", "O que a Cygna faz"],
        linhas: [
          ["Agendamento", "Escolhe a avaliação pelo link na bio", "Mostra só horários com sala e profissional livres"],
          ["Antes da 1ª sessão", "Preenche e assina a anamnese no celular", "Guarda o documento na ficha, com data"],
          ["Véspera de cada sessão", "Confirma ou remarca com um toque", "Envia o lembrete pelo WhatsApp e atualiza a agenda"],
          ["Durante o protocolo", "Comparece às sessões", "Baixa o saldo do pacote e o estoque usado"],
          ["Fim do pacote", "Recebe o aviso de renovação", "Mostra à recepção quem está perto de terminar"],
        ],
      },
      {
        tipo: "passos",
        titulo: "Como migrar a clínica para a Cygna",
        intro: "A migração não exige parar a agenda. O time de suporte ajuda sem custo em cada etapa.",
        passos: [
          { titulo: "Importe as pacientes", texto: "Envie a lista de clientes em planilha. O time importa nomes, telefones e datas de nascimento." },
          { titulo: "Cadastre serviços, salas e pacotes", texto: "Cada protocolo recebe duração, preço, sala ou aparelho necessário e número de sessões." },
          { titulo: "Suba o modelo de anamnese", texto: "Use o questionário que a clínica já aplica ou comece por um modelo e ajuste por procedimento." },
          { titulo: "Publique o link de agendamento", texto: "Coloque o link na bio do Instagram e no WhatsApp. A partir daí, as novas sessões já entram no sistema." },
        ],
      },
    ],
    plano: "clinica",
    planoMotivo:
      "O plano Clínica é o único que inclui anamnese com fotos de evolução, salas e equipamentos, estoque de produtos e várias unidades, que são os recursos que uma clínica usa todo dia.",
    faq: [
      {
        q: "Qual o melhor sistema para clínica de estética pequena?",
        a: "Para clínica pequena, o ideal é um sistema que junte agenda, anamnese e pacotes sem exigir instalação. A Cygna funciona no navegador, custa R$ 219,90 por mês no plano Clínica com profissionais ilimitados e pode ser testada por 14 dias grátis, sem cartão e sem fidelidade.",
      },
      {
        q: "A anamnese digital tem validade como a de papel?",
        a: "Sim, desde que a paciente preencha e assine e o documento fique guardado com data. Na Cygna a anamnese é assinada no celular da paciente e fica na ficha dela. Para procedimentos invasivos, confirme com o conselho profissional da sua área se há exigência de documento adicional.",
      },
      {
        q: "Consigo controlar pacotes de sessões e o saldo de cada paciente?",
        a: "Consegue. O pacote vendido vira um saldo de sessões na ficha da paciente, que baixa a cada atendimento. A recepção vê quantas sessões restam, a data de vencimento do pacote e quem está perto de terminar, o que facilita a renovação no momento certo.",
      },
      {
        q: "O sistema impede marcar dois atendimentos no mesmo aparelho?",
        a: "Impede. Cada serviço pode ser vinculado a uma sala ou a um equipamento, e a agenda só oferece horários em que o recurso está livre. Isso vale para o agendamento online da paciente e para a marcação feita pela recepção.",
      },
      {
        q: "Os dados das pacientes ficam seguros de acordo com a LGPD?",
        a: "A clínica continua sendo a controladora dos dados das pacientes, e a Cygna trata essas informações apenas para operar o sistema. Anamnese e fotos ficam na ficha, com acesso restrito à equipe definida pela clínica, e podem ser exportadas ou excluídas quando a paciente pedir.",
      },
    ],
    relacionados: [
      { titulo: "Ficha de anamnese para estética: o que perguntar e como guardar", href: "/blog/ficha-de-anamnese-para-estetica-e-lgpd" },
      { titulo: "Como diminuir faltas com lembrete no WhatsApp e sinal via Pix", href: "/blog/como-reduzir-faltas-de-clientes-no-salao" },
    ],
    atualizado: "2026-09-25",
  },

  /* ═══════════════════════════════════════════════════════ SALÕES DE BELEZA ══ */
  {
    slug: "saloes-de-beleza",
    label: "Salões de beleza",
    menuDescricao: "Equipe, comissão e caixa",
    icon: Scissors,
    metaTitle: "Sistema para salão de beleza: agenda, comissão e caixa",
    metaDescription:
      "Sistema para salão de beleza com agenda por profissional, comissão por serviço, caixa do dia, venda de produtos e lembrete no WhatsApp. 14 dias grátis.",
    h1: "Sistema para salão de beleza que organiza agenda, comissão e caixa",
    keyword: "sistema para salão de beleza",
    resumo:
      "A Cygna é um sistema para salão de beleza que coloca a agenda de cada profissional, a comissão calculada por serviço e o caixa do dia na mesma tela. A cliente marca pelo link, recebe lembrete no WhatsApp, e no fim do expediente cada profissional sabe exatamente quanto tem a receber.",
    imagem: "/images/para-quem/saloes-de-beleza.webp",
    imagemAlt: "Cabeleireira finalizando escova em cliente em um salão de beleza",
    audiencia: "Salões de beleza com equipe de profissionais",
    categoria: "Software de gestão para salão de beleza",
    numeros: [
      { valor: "R$ 99,90", rotulo: "por mês no plano Studio, com até 5 profissionais" },
      { valor: "5", rotulo: "agendas independentes numa só tela no plano Studio" },
      { valor: "1 toque", rotulo: "para a cliente confirmar ou remarcar pelo WhatsApp" },
      { valor: "14 dias", rotulo: "de teste grátis, sem cartão de crédito" },
    ],
    blocos: [
      {
        tipo: "texto",
        titulo: "O desafio de um salão é coordenar gente, não horários",
        paragrafos: [
          "Em um salão com três, quatro ou cinco profissionais, a agenda de papel quebra no primeiro sábado cheio. Uma coloração que leva duas horas e meia, uma escova de quarenta minutos e um corte masculino de trinta disputam as mesmas cadeiras, e a recepção precisa saber na hora quem está livre para um encaixe. Quando a informação fica espalhada entre caderno, WhatsApp de cada profissional e memória da recepcionista, o resultado é horário duplicado, cliente esperando e profissional ocioso.",
          "Na Cygna, cada profissional tem a própria agenda, com os serviços que faz, a duração de cada um e os dias de folga. A cliente escolhe o serviço e o profissional pelo link, e o sistema só mostra horários em que aquela pessoa está realmente disponível. A recepção vê todas as agendas lado a lado e encaixa sem risco de sobrepor.",
          "O segundo ponto de atrito é o dinheiro. Comissão calculada no fim do mês, na planilha, gera discussão. Quando cada serviço registrado já calcula a parte do profissional, todo mundo vê o que tem a receber ao fim do dia, e o fechamento deixa de ser uma negociação.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Recursos da Cygna para salão de beleza",
        intro: "O plano Studio foi desenhado para equipes de até cinco profissionais. Salões maiores ou com mais de uma unidade usam o plano Clínica.",
        itens: [
          {
            titulo: "Agenda por profissional",
            texto: "Cada profissional com seus serviços, durações e folgas. A cliente escolhe com quem quer ser atendida e só vê horários reais.",
          },
          {
            titulo: "Comissão calculada por serviço",
            texto: "Defina um percentual por serviço ou por profissional. Cada atendimento finalizado já registra quanto é do salão e quanto é de quem atendeu.",
          },
          {
            titulo: "Caixa do dia e venda de produtos",
            texto: "Serviços, produtos de revenda, entradas e saídas no mesmo caixa. O saldo do dia é atualizado a cada atendimento.",
          },
          {
            titulo: "Lembrete e confirmação no WhatsApp",
            texto: "Um dia antes, a cliente recebe a mensagem com botões para confirmar ou remarcar, e a resposta aparece direto na agenda. Veja [como reduzir faltas no salão](/blog/como-reduzir-faltas-de-clientes-no-salao).",
          },
          {
            titulo: "Pacotes e fidelidade",
            texto: "Pacote de escovas, hidratação mensal ou programa de pontos. O saldo de cada cliente fica visível para a recepção.",
          },
          {
            titulo: "Relatórios por serviço e profissional",
            texto: "Veja quais serviços e quais profissionais mais faturam no mês, e quais horários ficam vazios com mais frequência.",
          },
        ],
      },
      {
        tipo: "texto",
        titulo: "Salão-parceiro e comissão: o que a Lei 13.352/2016 muda no controle",
        paragrafos: [
          "Muitos salões trabalham no modelo de salão-parceiro, regulamentado pela Lei 13.352/2016, a chamada Lei do Salão Parceiro. Nesse modelo, o profissional-parceiro não é empregado: ele recebe uma cota-parte do valor de cada serviço, e o salão fica com a parte referente ao espaço, aos produtos e à gestão, retendo e recolhendo os tributos do profissional.",
          "A lei exige contrato por escrito, e o repasse precisa ser transparente. É aí que o controle por serviço faz diferença: com a Cygna, cada atendimento registra o valor cobrado, o profissional e o percentual acordado, e o relatório do período mostra a cota-parte de cada um. Esse registro não substitui a orientação do contador, mas deixa o fechamento conferível pelos dois lados.",
        ],
      },
      {
        tipo: "tabela",
        titulo: "Planilha, agenda de papel ou sistema: o que muda no salão",
        intro: "Comparação entre as três formas mais comuns de organizar um salão com equipe.",
        legenda: "Comparativo de ferramentas de gestão para salão de beleza",
        colunas: ["Tarefa", "Papel e WhatsApp", "Planilha", "Cygna"],
        linhas: [
          ["Ver quem está livre para encaixe", "Perguntar a cada profissional", "Consultar arquivo atualizado à mão", "Todas as agendas lado a lado"],
          ["Confirmar horários do dia seguinte", "Mensagem manual, uma a uma", "Mensagem manual, uma a uma", "Lembrete automático com botão"],
          ["Calcular comissão", "Somar no fim do mês", "Fórmula mantida por alguém", "Calculada a cada atendimento"],
          ["Fechar o caixa", "Caderno de caixa", "Lançamento posterior", "Atualizado a cada venda"],
        ],
      },
      {
        tipo: "passos",
        titulo: "Como colocar a equipe do salão na Cygna",
        passos: [
          { titulo: "Cadastre os profissionais", texto: "Nome, serviços que cada um faz, dias e horários de trabalho e percentual de comissão." },
          { titulo: "Monte o catálogo de serviços", texto: "Preço e duração realista de cada serviço, incluindo tempo de pausa em coloração e química." },
          { titulo: "Importe as clientes", texto: "A lista em planilha é importada pelo time de suporte, sem custo." },
          { titulo: "Divulgue o link", texto: "O link vai para a bio do salão e para o WhatsApp da recepção. As clientes passam a marcar sozinhas." },
        ],
      },
    ],
    plano: "studio",
    planoMotivo:
      "O plano Studio atende salões de até 5 profissionais com comissões automáticas, pacotes, sinal via Pix e relatórios por serviço. Acima disso ou com mais de uma unidade, o plano Clínica libera profissionais ilimitados.",
    faq: [
      {
        q: "Qual o melhor sistema para salão de beleza com vários profissionais?",
        a: "É o que mostra a agenda de cada profissional lado a lado e calcula a comissão por serviço. A Cygna faz isso no plano Studio, por R$ 99,90 por mês para até 5 profissionais, com lembrete no WhatsApp e caixa do dia. Dá para testar 14 dias grátis, sem cartão.",
      },
      {
        q: "Como o sistema calcula a comissão de cada profissional?",
        a: "Você define o percentual por serviço, por profissional ou pelos dois. Cada atendimento finalizado registra o valor, quem atendeu e a parte de cada um. No fim do dia ou do período, o relatório mostra quanto cada profissional tem a receber, sem planilha paralela.",
      },
      {
        q: "A cliente consegue escolher o profissional na hora de agendar?",
        a: "Consegue. No link de agendamento, a cliente escolhe o serviço e, em seguida, o profissional. O sistema só mostra horários em que aquela pessoa está trabalhando e livre, considerando a duração do serviço escolhido e os intervalos configurados.",
      },
      {
        q: "Serve para salão que trabalha como salão-parceiro?",
        a: "Serve. A Cygna registra o valor de cada serviço, o profissional e o percentual acordado, o que facilita o cálculo da cota-parte prevista na Lei 13.352/2016. O contrato de parceria e o recolhimento de tributos continuam sendo responsabilidade do salão, com apoio do contador.",
      },
      {
        q: "Dá para vender produtos no mesmo caixa dos serviços?",
        a: "Dá. Produtos de revenda, como shampoo e finalizadores, entram no mesmo caixa dos serviços. O estoque baixa a cada venda e o sistema avisa quando um item está acabando, então o salão não perde venda por falta de produto na prateleira.",
      },
    ],
    relacionados: [
      { titulo: "Como reduzir faltas de clientes no salão com lembrete e sinal", href: "/blog/como-reduzir-faltas-de-clientes-no-salao" },
      { titulo: "Agenda de manutenção: como trazer a cliente de volta no prazo", href: "/blog/agenda-de-manutencao-de-cilios-e-unhas" },
    ],
    atualizado: "2026-09-25",
  },

  /* ═══════════════════════════════════════════════ LASH E NAIL DESIGNERS ══ */
  {
    slug: "lash-e-nail-designers",
    label: "Lash e nail designers",
    menuDescricao: "Manutenção, sinal e link na bio",
    icon: Eye,
    metaTitle: "Agenda para lash e nail designer com lembrete e Pix",
    metaDescription:
      "Agenda online para lash e nail designer: link na bio, sinal via Pix contra faltas, lembrete de manutenção no WhatsApp e ficha técnica. Desde R$ 39,90 por mês.",
    h1: "Agenda para lash e nail designers que lembra a manutenção por você",
    keyword: "agenda para lash designer",
    resumo:
      "A Cygna é uma agenda online para lash e nail designers que atendem sozinhas ou em dupla: a cliente marca pelo link na bio, paga o sinal via Pix para reservar o horário e recebe no WhatsApp o lembrete da próxima manutenção. Tudo funciona pelo celular, a partir de R$ 39,90 por mês.",
    imagem: "/images/para-quem/lash-designers.webp",
    imagemAlt: "Lash designer aplicando extensão de cílios fio a fio em uma cliente",
    audiencia: "Lash designers e nail designers autônomas",
    categoria: "Agenda online para profissionais autônomas de beleza",
    numeros: [
      { valor: "R$ 39,90", rotulo: "por mês no plano Autônoma, para 1 profissional" },
      { valor: "5 min", rotulo: "para cadastrar os serviços e publicar o link na bio" },
      { valor: "100%", rotulo: "pelo celular, sem instalar nada" },
      { valor: "14 dias", rotulo: "de teste grátis, sem cartão de crédito" },
    ],
    blocos: [
      {
        tipo: "texto",
        titulo: "O negócio da lash e da nail designer vive de retorno",
        paragrafos: [
          "Extensão de cílios e unhas em gel não são serviços de uma vez só. Os fios caem com o ciclo natural dos cílios e a unha cresce, então a cliente fiel volta em intervalos previsíveis: a manutenção de cílios costuma ficar entre 15 e 21 dias, e a de alongamento ou esmaltação em gel, entre 21 e 30 dias. Quem atende sozinha sabe que o faturamento do mês depende menos de cliente nova e mais de a cliente antiga voltar na data certa.",
          "O problema é que lembrar cada cliente da manutenção, responder mensagem no meio de um procedimento de duas horas e cobrar o horário de quem faltou tira a profissional da cadeira. Com as mãos ocupadas no volume brasileiro ou no alongamento, não dá para pegar o celular a cada notificação.",
          "Na Cygna, a manutenção já sai sugerida no fim de cada atendimento, com o intervalo que você definir para cada técnica. Quando se aproxima a data, a cliente recebe o lembrete no WhatsApp com o link para escolher o horário. Você não precisa lembrar de ninguém: a agenda faz isso. O guia de [agenda de manutenção de cílios e unhas](/blog/agenda-de-manutencao-de-cilios-e-unhas) mostra como definir cada intervalo.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Recursos da Cygna para quem atende sozinha",
        intro: "O plano Autônoma cobre uma profissional. O sinal via Pix e as agendas separadas para quem divide o espaço com uma parceira começam no plano Studio.",
        itens: [
          {
            titulo: "Link na bio em 5 minutos",
            texto: "Cadastre os serviços e publique o link no Instagram. A cliente vê seus horários livres e agenda sem precisar mandar mensagem.",
          },
          {
            titulo: "Sinal via Pix contra faltas",
            texto: "Defina um valor fixo ou uma porcentagem por serviço. O horário só fica reservado depois que o sinal é pago, e quem paga o sinal tende a comparecer.",
          },
          {
            titulo: "Retorno de manutenção automático",
            texto: "Cada técnica tem o próprio intervalo de manutenção. A Cygna avisa a cliente na hora certa, com o link para ela escolher o próximo horário.",
          },
          {
            titulo: "Ficha técnica da cliente",
            texto: "Curvatura, espessura, comprimento e cola usados nos cílios; formato, técnica e cor nas unhas. Na manutenção, você repete o trabalho sem adivinhar.",
          },
          {
            titulo: "Duração exata por técnica",
            texto: "Fio a fio, volume brasileiro, volume russo, gel, fibra ou banho de gel: cada serviço com o tempo real, para a agenda encaixar sem apertar.",
          },
          {
            titulo: "Galeria de trabalhos no link",
            texto: "Mostre suas nail arts e seus mapeamentos de cílios no próprio link de agendamento, para a cliente escolher o estilo antes de marcar.",
          },
        ],
      },
      {
        tipo: "tabela",
        titulo: "Intervalos de manutenção mais usados",
        intro: "Referências de mercado para configurar o lembrete de retorno. Ajuste conforme a técnica, o material e o ciclo de cada cliente.",
        legenda: "Intervalo sugerido de manutenção por serviço de cílios e unhas",
        colunas: ["Serviço", "Manutenção sugerida", "Duração média do atendimento"],
        linhas: [
          ["Extensão de cílios fio a fio", "15 a 21 dias", "1h30 a 2h (aplicação)"],
          ["Volume brasileiro ou russo", "15 a 21 dias", "2h a 2h30 (aplicação)"],
          ["Lash lifting", "45 a 60 dias", "1h"],
          ["Alongamento em gel ou fibra", "21 a 30 dias", "2h a 3h (aplicação)"],
          ["Esmaltação em gel", "21 a 28 dias", "1h a 1h30"],
        ],
      },
      {
        tipo: "texto",
        titulo: "Sinal via Pix: como cobrar sem constranger a cliente",
        paragrafos: [
          "A falta sem aviso pesa mais para quem atende sozinha: um horário de duas horas vazio é, muitas vezes, o faturamento de uma tarde inteira. Por isso tantas lash e nail designers passaram a cobrar sinal, mas cobrar pelo WhatsApp, conferir o comprovante e só depois confirmar o horário é trabalhoso e cria um momento desconfortável.",
          "Na Cygna, a cobrança acontece no próprio agendamento. A cliente escolhe o horário, vê o valor do sinal e paga por Pix na mesma tela, e o horário só é reservado depois do pagamento. A regra fica clara antes da marcação, e você não precisa pedir nada a ninguém. O artigo sobre [como reduzir faltas de clientes](/blog/como-reduzir-faltas-de-clientes-no-salao) explica como definir o valor do sinal e a política de remarcação.",
        ],
      },
      {
        tipo: "passos",
        titulo: "Como começar a usar a agenda",
        passos: [
          { titulo: "Cadastre suas técnicas", texto: "Preço, duração e intervalo de manutenção de cada serviço." },
          { titulo: "Defina o sinal", texto: "Valor fixo ou porcentagem por serviço, cobrado via Pix no agendamento." },
          { titulo: "Publique o link na bio", texto: "Coloque o link no Instagram e responda as mensagens com ele." },
          { titulo: "Deixe os lembretes com a Cygna", texto: "Confirmação na véspera e lembrete de manutenção saem sozinhos." },
        ],
      },
    ],
    plano: "autonoma",
    planoMotivo:
      "O plano Autônoma cobre uma profissional com agenda online, link na bio, lembretes no WhatsApp, ficha de clientes e financeiro básico. Para cobrar sinal via Pix ou dividir o espaço com uma parceira, o plano Studio sai por R$ 99,90.",
    faq: [
      {
        q: "Qual a melhor agenda para lash designer que atende sozinha?",
        a: "É uma agenda que funcione pelo celular, tenha link na bio e lembre a cliente da manutenção sem você digitar nada. A Cygna faz isso no plano Autônoma, por R$ 39,90 por mês, com lembretes no WhatsApp e ficha técnica de cada cliente. Dá para testar 14 dias grátis.",
      },
      {
        q: "Como cobrar sinal de agendamento de cílios e unhas?",
        a: "O jeito mais simples é cobrar o sinal via Pix no próprio agendamento, com a regra visível antes da marcação. Na Cygna você define um valor fixo ou uma porcentagem por serviço, e o horário só fica reservado depois que o Pix é pago. O recurso está no plano Studio.",
      },
      {
        q: "A agenda lembra a cliente da manutenção automaticamente?",
        a: "Lembra. Cada serviço tem o próprio intervalo de manutenção, como 15 dias para cílios ou 21 dias para gel. Perto da data, a cliente recebe no WhatsApp uma mensagem com o link para escolher o horário, sem você precisar acompanhar a lista à mão.",
      },
      {
        q: "Preciso de computador para usar a Cygna?",
        a: "Não. A Cygna funciona no navegador do celular, do tablet ou do computador, e não é preciso instalar aplicativo. A cliente também não baixa nada: ela agenda pelo link que você coloca na bio do Instagram ou envia pelo WhatsApp.",
      },
      {
        q: "Consigo registrar curvatura, espessura e técnica de cada cliente?",
        a: "Consegue. A ficha de cada cliente guarda os dados técnicos do atendimento, como curvatura, espessura, comprimento e cola nos cílios, ou formato, técnica e cor nas unhas. Na manutenção, a informação está ali e você repete o trabalho exatamente como da última vez.",
      },
    ],
    relacionados: [
      { titulo: "Agenda de manutenção de cílios e unhas em gel: como montar", href: "/blog/agenda-de-manutencao-de-cilios-e-unhas" },
      { titulo: "Sinal via Pix e lembrete: como diminuir faltas na agenda", href: "/blog/como-reduzir-faltas-de-clientes-no-salao" },
    ],
    atualizado: "2026-09-25",
  },
];

export const getSegmento = (slug: string) => SEGMENTOS.find((s) => s.slug === slug);
export const segmentoPath = (s: Pick<Segmento, "slug">) => `/segmentos/${s.slug}`;
