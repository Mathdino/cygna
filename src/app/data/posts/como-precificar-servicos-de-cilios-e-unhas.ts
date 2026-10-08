import type { Post } from "../blog";

const post: Post = {
  slug: "como-precificar-servicos-de-cilios-e-unhas",
  status: "published",
  metaTitle: "Como precificar serviços de cílios e unhas: passo a passo",
  metaDescription:
    "Como precificar serviços de cílios e unhas: custo do material, custo da sua hora, taxas, impostos e margem. Fórmula com exemplo e quando reajustar o preço.",
  focusKeyword: "como precificar serviços de cílios e unhas",
  titulo: "Como precificar serviços de cílios e unhas: fórmula, exemplo e quando reajustar",
  resumo:
    "Para precificar serviços de cílios e unhas, some o custo do material de cada atendimento ao custo da sua hora multiplicado pelo tempo do serviço e divida o total por (1 − taxas − impostos − margem desejada). O resultado é o preço mínimo que paga as contas e gera lucro. Depois, compare com o mercado da sua região para posicionar o preço, e nunca o contrário.",
  categoria: "Autônomas",
  tags: ["precificação", "preço de extensão de cílios", "preço de unhas em gel", "lash designer", "nail designer", "custo por hora"],
  publicado: "2026-10-08",
  atualizado: "2026-10-08",
  imagem: "/images/blog/como-precificar-servicos-de-cilios-e-unhas.webp",
  imagemAlt: "Lash designer calculando o preço dos serviços com calculadora e materiais de extensão de cílios na bancada",
  segmento: "lash-e-nail-designers",
  teste: {
    titulo: "Veja quanto cada serviço realmente fatura no mês",
    texto:
      "Na Cygna, cada serviço tem duração e preço próprios, o sinal via Pix protege os horários longos e o financeiro mostra quanto entrou por serviço. Com esses números, reajustar o preço deixa de ser chute.",
  },
  faq: [
    {
      q: "Qual a fórmula para calcular o preço de um serviço de beleza?",
      a: "Preço = (custo do material + custo da hora × duração do serviço) ÷ (1 − taxas − impostos − margem). Taxas, impostos e margem entram como porcentagem do preço final. A fórmula mostra o preço mínimo que cobre custos e gera o lucro desejado.",
    },
    {
      q: "Como calcular o custo da minha hora de trabalho?",
      a: "Some todos os custos fixos do mês, como aluguel, energia, internet, sistema, contador, DAS do MEI e o pró-labore que você quer retirar, e divida pelo número de horas que você realmente atende no mês. Use horas atendidas, e não horas abertas, porque intervalos e faltas não geram receita.",
    },
    {
      q: "Devo cobrar o mesmo preço que a concorrência?",
      a: "Não como ponto de partida. Primeiro calcule seu preço mínimo pelos seus custos; depois compare com o mercado para decidir o posicionamento. Copiar o preço da concorrente sem conhecer os próprios custos pode significar trabalhar no prejuízo sem perceber.",
    },
    {
      q: "De quanto em quanto tempo reajustar o preço?",
      a: "Revise os preços pelo menos uma vez por ano e sempre que um custo importante subir, como material, aluguel ou taxa. Comunique o reajuste às clientes com algumas semanas de antecedência, explicando o motivo, e aplique primeiro para clientes novas, se quiser suavizar a mudança.",
    },
    {
      q: "Manutenção deve custar quanto em relação à aplicação?",
      a: "Calcule a manutenção pela mesma fórmula, com o tempo e o material reais dela. Como a manutenção leva menos tempo e usa menos material, o preço costuma ser menor que o da aplicação. Defina também um prazo limite: manutenção feita muito depois do intervalo pode ser cobrada como reaplicação.",
    },
  ],
  html: `
<h2>Por que tantas profissionais cobram menos do que deveriam</h2>
<p>A forma mais comum de definir preço na beleza é olhar o Instagram das concorrentes e cobrar parecido, às vezes um pouco menos para atrair clientes. O problema é que a concorrente tem outros custos, outro aluguel, outro tempo de atendimento e, muitas vezes, também não sabe se está tendo lucro.</p>
<p>Para quem atende sozinha, o erro de preço pesa ainda mais. Cada hora na cadeira tem que pagar o material, o espaço, as contas, os impostos e o seu salário. Se o preço não cobre tudo isso, a agenda cheia só esconde o prejuízo.</p>

<h2>Os quatro componentes do preço</h2>
<ol>
<li><strong>Custo do material por atendimento.</strong> Fios, cola, primer, removedor, gel, tips, lixas, descartáveis.</li>
<li><strong>Custo da sua hora.</strong> Os custos fixos do mês e o seu pró-labore, divididos pelas horas atendidas.</li>
<li><strong>Taxas e impostos.</strong> Taxa da maquininha ou do Pix, imposto sobre o faturamento quando houver.</li>
<li><strong>Margem de lucro.</strong> O que sobra para reinvestir em curso, equipamento e reserva.</li>
</ol>

<h2>Passo 1: calcule o custo do material por atendimento</h2>
<p>Divida o preço de cada produto pelo número de atendimentos que ele rende. Um <strong>exemplo</strong> com valores fictícios para uma aplicação de volume brasileiro:</p>
<table>
<thead><tr><th>Material</th><th>Preço</th><th>Rende</th><th>Custo por aplicação</th></tr></thead>
<tbody>
<tr><td>Bandeja de fios</td><td>R$ 60</td><td>4 aplicações</td><td>R$ 15,00</td></tr>
<tr><td>Cola</td><td>R$ 90</td><td>30 aplicações</td><td>R$ 3,00</td></tr>
<tr><td>Primer, removedor e higienização</td><td>R$ 80</td><td>40 aplicações</td><td>R$ 2,00</td></tr>
<tr><td>Descartáveis (fita, microbrush, escovinha)</td><td>R$ 50</td><td>25 aplicações</td><td>R$ 2,00</td></tr>
<tr><td>Total</td><td>—</td><td>—</td><td>R$ 22,00</td></tr>
</tbody>
</table>
<p>Faça a mesma conta para cada serviço. A manutenção usa menos fios, então o custo dela é menor.</p>

<h2>Passo 2: calcule o custo da sua hora</h2>
<p>Liste todos os custos fixos do mês, incluindo o salário que você quer tirar. Um <strong>exemplo</strong>:</p>
<table>
<thead><tr><th>Custo fixo mensal (exemplo)</th><th>Valor</th></tr></thead>
<tbody>
<tr><td>Aluguel da sala ou parte do espaço</td><td>R$ 900</td></tr>
<tr><td>Energia, água e internet</td><td>R$ 250</td></tr>
<tr><td>Sistema de agendamento, contador e DAS do MEI</td><td>R$ 300</td></tr>
<tr><td>Reposição de equipamentos e cursos (reserva)</td><td>R$ 250</td></tr>
<tr><td>Pró-labore desejado</td><td>R$ 4.000</td></tr>
<tr><td>Total</td><td>R$ 5.700</td></tr>
</tbody>
</table>
<p>Agora conte as horas que você realmente atende. Se você trabalha 8 horas por dia, 22 dias por mês, mas entre intervalos, faltas e horários vazios atende 6 horas por dia, são 132 horas atendidas. O custo da sua hora é <strong>R$ 5.700 ÷ 132 = R$ 43,18</strong>.</p>
<p>Usar horas abertas no lugar de horas atendidas é o erro que mais derruba o preço. A agenda nunca fica 100% ocupada, e o preço precisa absorver isso.</p>
<!--teste-gratis-->
<h2>Passo 3: aplique a fórmula do preço</h2>
<p>A fórmula junta tudo:</p>
<p><strong>Preço = (material + custo da hora × duração) ÷ (1 − taxas − impostos − margem)</strong></p>
<p>Continuando o <strong>exemplo</strong> da aplicação de volume brasileiro, com 2h30 de duração, taxa média de pagamento de 2%, imposto de 0% (o DAS do MEI já está no custo fixo) e margem desejada de 20%:</p>
<ul>
<li>Custo direto: R$ 22 + R$ 43,18 × 2,5 = R$ 129,95</li>
<li>Divisor: 1 − 0,02 − 0 − 0,20 = 0,78</li>
<li>Preço mínimo: R$ 129,95 ÷ 0,78 = <strong>R$ 166,60</strong></li>
</ul>
<p>Esse é o piso. Abaixo dele, você trabalha sem a margem que definiu ou sem o pró-labore que precisa.</p>
<h3>Exemplo para outros serviços</h3>
<table>
<thead><tr><th>Serviço (exemplo)</th><th>Material</th><th>Duração</th><th>Preço mínimo</th></tr></thead>
<tbody>
<tr><td>Volume brasileiro (aplicação)</td><td>R$ 22</td><td>2h30</td><td>R$ 166,60</td></tr>
<tr><td>Manutenção de volume</td><td>R$ 10</td><td>1h15</td><td>R$ 82,02</td></tr>
<tr><td>Alongamento em gel (aplicação)</td><td>R$ 25</td><td>2h30</td><td>R$ 170,45</td></tr>
<tr><td>Esmaltação em gel</td><td>R$ 8</td><td>1h15</td><td>R$ 79,46</td></tr>
</tbody>
</table>
<p>Todos os números são ilustrativos e usam o mesmo custo de hora e a mesma margem. Refaça com os seus.</p>

<h2>Passo 4: compare com o mercado e posicione</h2>
<p>Só agora vale olhar a concorrência. Com o preço mínimo em mãos, você tem três cenários:</p>
<ul>
<li><strong>Seu piso está abaixo do mercado:</strong> há espaço para cobrar mais, principalmente se você tem portfólio, especialização ou boas avaliações.</li>
<li><strong>Seu piso está na média do mercado:</strong> diferencie pelo atendimento, pela pontualidade e pela facilidade de agendar.</li>
<li><strong>Seu piso está acima do mercado:</strong> revise custos, tempo de atendimento e ocupação da agenda antes de baixar o preço.</li>
</ul>

<h2>Como a ocupação da agenda muda o preço</h2>
<p>O custo da hora depende das horas atendidas. Se você aumenta a ocupação de 6 para 7 horas por dia, o mesmo custo fixo se divide por 154 horas, e o custo da hora cai de R$ 43,18 para R$ 37,01. Isso significa que reduzir faltas e horários vazios tem o mesmo efeito de cortar custos.</p>
<p>Por isso, para quem atende sozinha, duas medidas pesam tanto quanto o preço: o sinal via Pix nos horários longos e o lembrete de manutenção, que traz a cliente de volta no prazo. Os guias sobre <a href="/blog/como-reduzir-faltas-de-clientes-no-salao">como reduzir faltas</a> e <a href="/blog/agenda-de-manutencao-de-cilios-e-unhas">agenda de manutenção de cílios e unhas</a> detalham as duas. Na <a href="/segmentos/lash-e-nail-designers">agenda da Cygna para lash e nail designers</a>, as duas funcionam juntas.</p>

<h2>Quando e como reajustar o preço</h2>
<ul>
<li><strong>Revise uma vez por ano</strong> e sempre que um custo importante subir.</li>
<li><strong>Avise com antecedência</strong>, de duas a quatro semanas, explicando o motivo.</li>
<li><strong>Comece pelas clientes novas</strong>, se quiser suavizar a mudança para as antigas.</li>
<li><strong>Reajuste por serviço</strong>, e não todos ao mesmo tempo, priorizando os que estão abaixo do piso.</li>
</ul>

<h2>Resumo prático</h2>
<ul>
<li>Calcule o material por atendimento, produto por produto.</li>
<li>Calcule o custo da hora com horas atendidas, e não horas abertas.</li>
<li>Aplique a fórmula: (material + hora × duração) ÷ (1 − taxas − impostos − margem).</li>
<li>Compare com o mercado só depois de conhecer seu piso.</li>
<li>Aumente a ocupação da agenda: ela reduz o custo de cada hora.</li>
<li>Reveja os preços pelo menos uma vez por ano.</li>
</ul>
`,
};

export default post;
