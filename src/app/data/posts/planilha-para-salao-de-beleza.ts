import type { Post } from "../blog";

const post: Post = {
  slug: "planilha-para-salao-de-beleza",
  status: "published",
  metaTitle: "Planilha para salão de beleza: como montar e quando trocar",
  metaDescription:
    "Planilha para salão de beleza: abas e colunas para agenda, clientes, caixa, comissão e preços, com fórmulas e os sinais de que é hora de usar um sistema.",
  focusKeyword: "planilha para salão de beleza",
  titulo: "Planilha para salão de beleza: abas, colunas e fórmulas para controlar agenda, caixa e comissão",
  resumo:
    "Uma planilha para salão de beleza precisa de, no mínimo, cinco abas: atendimentos (data, cliente, serviço, profissional, valor e forma de pagamento), clientes, fluxo de caixa com entradas e saídas, comissão por profissional e precificação dos serviços. Ela funciona bem para quem está começando, mas deixa de funcionar quando a agenda, o caixa e a comissão passam a ser preenchidos por mais de uma pessoa ao mesmo tempo.",
  categoria: "Gestão",
  tags: ["planilha para salão de beleza", "planilha financeira", "fluxo de caixa", "planilha de comissão", "planilha de agendamento", "gestão de salão"],
  publicado: "2026-10-08",
  atualizado: "2026-10-08",
  imagem: "/images/blog/planilha-para-salao-de-beleza.webp",
  imagemAlt: "Dona de salão preenchendo planilha de controle financeiro no notebook na recepção",
  segmento: "saloes-de-beleza",
  teste: {
    titulo: "Quando a planilha não der mais conta",
    texto:
      "Na Cygna, cada atendimento finalizado na agenda já alimenta o caixa, a comissão e a ficha da cliente. O que você montaria em cinco abas de planilha acontece sozinho, sem fórmula quebrada nem dado digitado duas vezes.",
  },
  faq: [
    {
      q: "Quais abas uma planilha para salão de beleza deve ter?",
      a: "No mínimo: atendimentos, com data, cliente, serviço, profissional, valor e forma de pagamento; clientes, com contato e histórico; fluxo de caixa, com entradas e saídas; comissão por profissional; e precificação dos serviços. Uma aba de resumo mensal ajuda a acompanhar faturamento e ticket médio.",
    },
    {
      q: "Como fazer o cálculo de comissão na planilha?",
      a: "Na aba de atendimentos, crie uma coluna com o percentual de comissão de cada serviço ou profissional e outra com o valor da comissão, multiplicando a base de cálculo pelo percentual. Na aba de comissão, some por profissional e período com SOMASES. Defina antes se a base é o valor bruto, menos produto ou líquido.",
    },
    {
      q: "Planilha de agendamento funciona para salão?",
      a: "Funciona para quem atende sozinha e com pouco volume, mas tem limites: não impede dois agendamentos no mesmo horário, não envia lembrete e não permite que a cliente marque sozinha. Com mais de uma profissional ou mais de dez atendimentos por dia, os conflitos de horário tendem a aparecer.",
    },
    {
      q: "Quando trocar a planilha por um sistema de gestão?",
      a: "Quando mais de uma pessoa preenche a planilha, quando aparecem horários duplicados, quando o fechamento de comissão gera discussão, quando os dados ficam desatualizados ou quando o tempo gasto digitando passa de alguns minutos por dia. Nesses casos, um sistema integrado reduz erro e retrabalho.",
    },
    {
      q: "Qual a diferença entre fluxo de caixa e controle de atendimentos?",
      a: "O controle de atendimentos registra o que foi vendido: serviço, cliente, profissional e valor. O fluxo de caixa registra o dinheiro que entra e sai da conta, incluindo despesas, e considera a data real de recebimento, como no cartão de crédito. Os dois são necessários e se complementam.",
    },
  ],
  html: `
<h2>Planilha ainda serve para um salão?</h2>
<p>Serve, principalmente para quem está começando, atende sozinha ou tem uma equipe pequena. A planilha é gratuita, flexível e obriga a dona do salão a pensar em quais números importam. O problema não é a planilha em si, mas o que acontece quando o salão cresce: mais pessoas preenchendo, mais atendimentos por dia, mais fórmulas para manter.</p>
<p>Este guia mostra como montar uma planilha que realmente ajuda e quais sinais indicam que é hora de trocar por um sistema.</p>

<h2>Estrutura recomendada: cinco abas</h2>
<table>
<thead><tr><th>Aba</th><th>Para que serve</th></tr></thead>
<tbody>
<tr><td>Atendimentos</td><td>Registro de cada serviço realizado, uma linha por atendimento</td></tr>
<tr><td>Clientes</td><td>Cadastro com contato, aniversário e observações</td></tr>
<tr><td>Fluxo de caixa</td><td>Entradas e saídas de dinheiro com data real</td></tr>
<tr><td>Comissão</td><td>Total a pagar por profissional no período</td></tr>
<tr><td>Preços</td><td>Custo e preço de cada serviço</td></tr>
</tbody>
</table>

<h2>Aba 1: atendimentos</h2>
<p>É o coração da planilha. Cada linha é um atendimento. Colunas sugeridas:</p>
<table>
<thead><tr><th>Coluna</th><th>Exemplo</th></tr></thead>
<tbody>
<tr><td>Data</td><td>08/10/2026</td></tr>
<tr><td>Cliente</td><td>Ana Souza</td></tr>
<tr><td>Serviço</td><td>Coloração</td></tr>
<tr><td>Profissional</td><td>Júlia</td></tr>
<tr><td>Valor cobrado</td><td>R$ 180,00</td></tr>
<tr><td>Desconto</td><td>R$ 0,00</td></tr>
<tr><td>Forma de pagamento</td><td>Crédito</td></tr>
<tr><td>Custo de produto</td><td>R$ 40,00</td></tr>
<tr><td>Percentual de comissão</td><td>40%</td></tr>
<tr><td>Comissão</td><td>Fórmula: (valor − desconto − produto) × percentual</td></tr>
</tbody>
</table>
<p>Use listas suspensas (validação de dados) para serviço, profissional e forma de pagamento. Isso evita "Coloraçao", "coloração" e "Color" contados como serviços diferentes.</p>

<h2>Aba 2: clientes</h2>
<p>Nome, telefone, data de nascimento, como conheceu o salão, alergias ou observações técnicas e data da última visita. A última visita pode ser calculada com a fórmula MÁXIMOSES sobre a aba de atendimentos, e permite filtrar quem não volta há mais de 60 dias.</p>

<h2>Aba 3: fluxo de caixa</h2>
<p>Registra o dinheiro, e não o serviço. Colunas: data, descrição, categoria (serviço, produto, aluguel, fornecedor, salário, imposto), entrada, saída e saldo acumulado. No cartão de crédito, lance a entrada na data em que o dinheiro cai na conta, já descontada a taxa, para o saldo refletir o dinheiro disponível de verdade.</p>
<!--teste-gratis-->
<h2>Aba 4: comissão</h2>
<p>Uma tabela com os profissionais nas linhas e o período nas colunas, somando a coluna de comissão da aba de atendimentos com SOMASES, filtrando por profissional e intervalo de datas. Antes de montar a fórmula, defina a base de cálculo: valor bruto, valor menos produto ou valor líquido. O guia de <a href="/blog/como-calcular-comissao-no-salao-de-beleza">como calcular comissão no salão</a> explica cada opção.</p>

<h2>Aba 5: preços</h2>
<p>Para cada serviço: material por atendimento, duração, custo da hora, taxas, margem e preço sugerido. A fórmula do preço mínimo é (material + custo da hora × duração) ÷ (1 − taxas − impostos − margem), detalhada no guia de <a href="/blog/como-precificar-servicos-de-cilios-e-unhas">como precificar serviços</a>.</p>

<h2>Resumo mensal</h2>
<p>Uma última aba com os números do mês, calculados a partir das outras:</p>
<ul>
<li>Faturamento total e por profissional.</li>
<li>Número de atendimentos e ticket médio.</li>
<li>Serviços mais vendidos.</li>
<li>Clientes novas e clientes que voltaram.</li>
<li>Despesas por categoria e resultado do mês.</li>
</ul>

<h2>E a agenda? Os limites da planilha de agendamento</h2>
<p>Dá para montar uma grade de horários na planilha, com profissionais nas colunas e horários nas linhas. Mas ela tem limites que nenhuma fórmula resolve:</p>
<ul>
<li>Não impede duas pessoas de marcarem o mesmo horário ao mesmo tempo.</li>
<li>Não considera a duração do serviço: uma coloração de 2h30 precisa ocupar várias linhas manualmente.</li>
<li>Não envia lembrete para a cliente.</li>
<li>Não deixa a cliente marcar sozinha.</li>
<li>Não conversa com o caixa: o atendimento agendado precisa ser digitado de novo na aba de atendimentos.</li>
</ul>

<h2>Sinais de que é hora de trocar a planilha</h2>
<table>
<thead><tr><th>Sinal</th><th>O que está acontecendo</th></tr></thead>
<tbody>
<tr><td>Horário duplicado</td><td>Duas pessoas marcando na mesma grade</td></tr>
<tr><td>Fechamento com discussão</td><td>Comissão calculada com dados incompletos</td></tr>
<tr><td>Dado digitado duas vezes</td><td>Agenda, atendimentos e caixa em lugares diferentes</td></tr>
<tr><td>Fórmula quebrada</td><td>Alguém apagou ou mudou uma célula sem perceber</td></tr>
<tr><td>Planilha desatualizada</td><td>No corre-corre, ninguém lança na hora</td></tr>
<tr><td>Muito tempo digitando</td><td>Mais tempo na planilha do que analisando os números</td></tr>
</tbody>
</table>
<p>Quando dois ou três desses sinais aparecem, a planilha está custando mais do que economiza. Um sistema integrado faz com que o atendimento finalizado na agenda alimente sozinho o caixa, a comissão e a ficha da cliente.</p>

<h2>Como migrar da planilha sem perder dados</h2>
<ol>
<li>Limpe a aba de clientes: nomes padronizados, telefones com DDD, sem duplicados.</li>
<li>Exporte a aba em formato de planilha simples para importação.</li>
<li>Cadastre serviços com preço e duração e profissionais com percentual de comissão.</li>
<li>Defina uma data de corte: a partir dela, tudo entra só no sistema.</li>
<li>Guarde a planilha antiga como histórico.</li>
</ol>
<p>Na <a href="/segmentos/saloes-de-beleza">Cygna para salões de beleza</a>, a lista de clientes em planilha é importada pelo time de suporte sem custo, e agenda, comissão e caixa passam a funcionar juntos.</p>
`,
};

export default post;
