import type { Post } from "../blog";

const post: Post = {
  slug: "como-calcular-comissao-no-salao-de-beleza",
  status: "published",
  metaTitle: "Como calcular comissão no salão de beleza: guia prático",
  metaDescription:
    "Como calcular comissão no salão de beleza: base de cálculo, desconto de produto e taxa de cartão, comissão por serviço ou escalonada e fechamento sem planilha.",
  focusKeyword: "como calcular comissão no salão de beleza",
  titulo: "Como calcular comissão no salão de beleza: base de cálculo, modelos e fechamento",
  resumo:
    "Para calcular a comissão no salão de beleza, defina primeiro a base de cálculo (valor bruto do serviço ou valor depois de descontar produto e taxa de cartão), depois o percentual de cada serviço ou profissional e, por fim, a periodicidade do repasse. Comissão = base de cálculo × percentual. O que evita conflito é a regra escrita no contrato e o registro de cada atendimento no momento em que ele acontece, e não na planilha do fim do mês.",
  categoria: "Gestão",
  tags: ["comissão", "salão de beleza", "cabeleireiro", "salão parceiro", "fechamento de caixa", "gestão de equipe"],
  publicado: "2026-10-08",
  atualizado: "2026-10-08",
  imagem: "/images/blog/como-calcular-comissao-no-salao-de-beleza.webp",
  imagemAlt: "Dona de salão de beleza conferindo o relatório de comissão das profissionais no fim do dia",
  segmento: "saloes-de-beleza",
  teste: {
    titulo: "Comissão calculada a cada atendimento, sem planilha no fim do mês",
    texto:
      "Na Cygna, você define o percentual por serviço, por profissional ou pelos dois. Cada atendimento finalizado já registra quanto é do salão e quanto é de quem atendeu, e o relatório do período fica pronto para o repasse.",
  },
  faq: [
    {
      q: "Qual a porcentagem de comissão mais comum em salão de beleza?",
      a: "Não existe porcentagem oficial. Na prática, os percentuais variam bastante conforme o serviço, quem paga o produto e o modelo de contratação. Serviços com produto caro, como coloração, costumam ter percentual menor que serviços de mão de obra, como corte e escova. Defina com base nos seus custos, e não só no que o mercado pratica.",
    },
    {
      q: "Pode descontar a taxa da maquininha antes de calcular a comissão?",
      a: "Pode, desde que isso esteja previsto no contrato com a profissional. Muitos salões calculam a comissão sobre o valor líquido, depois da taxa do cartão, porque o dinheiro que efetivamente entra é menor. O importante é a regra ser conhecida antes e aplicada igual para todas.",
    },
    {
      q: "Comissão deve ser calculada sobre o valor com ou sem o produto?",
      a: "Depende do acordo. Quando o salão fornece produtos caros, como tinta e química, é comum descontar o custo do produto antes de aplicar o percentual, ou usar um percentual menor sobre o valor cheio. As duas formas funcionam; o que não funciona é mudar o critério de um mês para o outro.",
    },
    {
      q: "Qual a diferença entre comissão e cota-parte do salão parceiro?",
      a: "Comissão é a parte do valor que o salão paga a quem atendeu. Cota-parte é o nome usado pela Lei 13.352/2016 no modelo de salão-parceiro: o salão recebe o valor do serviço, retém a parte dele e repassa a cota-parte da profissional-parceira, recolhendo os tributos dela. A conta é parecida, mas a relação jurídica é diferente.",
    },
    {
      q: "Com que frequência pagar a comissão das profissionais?",
      a: "O mais comum é semanal, quinzenal ou mensal, conforme o contrato. Repasse mais frequente melhora a relação com a equipe, mas exige fechamento confiável. Com cada atendimento registrado no sistema, o fechamento de qualquer período sai em minutos, e a frequência deixa de ser um problema.",
    },
  ],
  html: `
<h2>Por que a comissão gera tanto conflito no salão</h2>
<p>A comissão é a principal fonte de atrito entre dona de salão e equipe, e quase nunca pelo percentual em si. O conflito nasce de três situações: a regra não está escrita, o cálculo é feito no fim do mês a partir de anotações incompletas e a profissional não consegue conferir a conta. Quando um desses três pontos falha, cada fechamento vira uma negociação.</p>
<p>A boa notícia é que todos eles são resolvidos com organização, e não com mais dinheiro. Uma regra clara, registrada antes, e um cálculo feito no momento do atendimento eliminam a maior parte das discussões.</p>

<h2>A fórmula básica da comissão</h2>
<p>A conta em si é simples:</p>
<p><strong>Comissão = base de cálculo × percentual da profissional</strong></p>
<p>O que muda de um salão para outro é o que entra na base de cálculo. Existem três formas comuns, e cada uma tem prós e contras.</p>
<table>
<thead><tr><th>Base de cálculo</th><th>Como funciona</th><th>Quando faz sentido</th></tr></thead>
<tbody>
<tr><td>Valor bruto</td><td>Percentual sobre o preço cobrado da cliente</td><td>Serviços de mão de obra, com pouco produto, como corte e escova</td></tr>
<tr><td>Valor menos produto</td><td>Desconta o custo do produto antes de aplicar o percentual</td><td>Serviços químicos, como coloração, mechas e progressiva</td></tr>
<tr><td>Valor líquido</td><td>Desconta produto e taxa do cartão</td><td>Salões com alta proporção de pagamento no crédito parcelado</td></tr>
</tbody>
</table>

<h2>Exemplo de cálculo passo a passo</h2>
<p>Um <strong>exemplo</strong> com números fictícios mostra como a base de cálculo muda o valor final. Uma coloração cobrada por R$ 250, paga no cartão de crédito, com custo de produto de R$ 60, taxa de cartão de 3% e percentual da profissional de 40%:</p>
<table>
<thead><tr><th>Base usada</th><th>Conta</th><th>Base de cálculo</th><th>Comissão (40%)</th></tr></thead>
<tbody>
<tr><td>Valor bruto</td><td>R$ 250</td><td>R$ 250,00</td><td>R$ 100,00</td></tr>
<tr><td>Valor menos produto</td><td>R$ 250 − R$ 60</td><td>R$ 190,00</td><td>R$ 76,00</td></tr>
<tr><td>Valor líquido</td><td>R$ 250 − R$ 60 − R$ 7,50</td><td>R$ 182,50</td><td>R$ 73,00</td></tr>
</tbody>
</table>
<p>Repare que a diferença entre o primeiro e o último cenário é de R$ 27 em um único atendimento. Por isso o critério precisa estar escrito: duas pessoas fazendo a "mesma" conta podem chegar a valores bem diferentes.</p>

<h2>Modelos de comissão mais usados</h2>
<h3>Percentual fixo por profissional</h3>
<p>Cada profissional tem um percentual único, aplicado a todos os serviços. É o modelo mais fácil de entender e de calcular, mas ignora que serviços diferentes têm custos diferentes. Funciona bem em salões com cardápio pequeno.</p>
<h3>Percentual por serviço</h3>
<p>Cada serviço tem o próprio percentual: maior em serviços de mão de obra, menor em serviços com produto caro. É mais justo com a margem do salão e mais fácil de defender, porque a lógica é visível. Exige um sistema que aplique o percentual certo em cada atendimento.</p>
<h3>Comissão escalonada por meta</h3>
<p>O percentual sobe quando a profissional passa de um faturamento no mês. Um <strong>exemplo</strong>: 35% até R$ 6.000 e 40% sobre o que passar disso. O modelo incentiva produtividade, mas precisa de regra clara sobre o que conta para a meta, como serviços, venda de produtos e pacotes.</p>
<h3>Comissão sobre venda de produtos</h3>
<p>Muitos salões pagam um percentual menor sobre produtos de revenda, como shampoo e finalizador indicados pela profissional. Isso transforma a indicação em hábito e aumenta o ticket médio sem custo de mão de obra.</p>
<!--teste-gratis-->
<h2>O que precisa estar no acordo de comissão</h2>
<p>Seja um contrato de parceria, seja um acordo interno, o documento precisa responder a seis perguntas:</p>
<ol>
<li><strong>Qual a base de cálculo?</strong> Valor bruto, menos produto ou líquido.</li>
<li><strong>Qual o percentual?</strong> Por profissional, por serviço ou escalonado.</li>
<li><strong>O que acontece com desconto e cortesia?</strong> Se a dona dá 10% de desconto para uma cliente, a comissão é sobre o valor cheio ou com desconto?</li>
<li><strong>Como entram os pacotes?</strong> A comissão é paga na venda do pacote ou a cada sessão realizada?</li>
<li><strong>Quando o repasse acontece?</strong> Semanal, quinzenal ou mensal, e em que dia.</li>
<li><strong>Como a profissional confere?</strong> Relatório por atendimento, com data, cliente, serviço e valor.</li>
</ol>
<p>A pergunta sobre pacotes é a que mais gera confusão. O critério mais seguro é pagar a comissão por sessão realizada: se a cliente vendeu um pacote de 10 escovas e usou 4, a profissional recebe pelas 4. Isso evita pagar comissão sobre um serviço que pode não ser prestado.</p>

<h2>Comissão e salão-parceiro: o que muda com a Lei 13.352/2016</h2>
<p>No modelo de salão-parceiro, regulado pela Lei 13.352/2016, a profissional não é empregada. O salão centraliza o pagamento da cliente, retém a cota-parte dele, que remunera espaço, produtos e gestão, e repassa a cota-parte da profissional-parceira, sendo responsável por reter e recolher os tributos dela.</p>
<p>A conta é parecida com a da comissão, mas a lei exige contrato escrito com o percentual de retenção, a periodicidade do pagamento e outras cláusulas obrigatórias. O guia sobre a <a href="/blog/lei-do-salao-parceiro-como-funciona">Lei do Salão Parceiro</a> explica cada ponto. Em qualquer modelo, a orientação do contador é indispensável para a parte tributária.</p>

<h2>Como fechar a comissão sem planilha</h2>
<p>O fechamento manual costuma seguir este caminho: a recepção anota os atendimentos em um caderno, alguém passa para a planilha no fim do mês, a planilha tem uma fórmula que só uma pessoa entende e a profissional confere com as próprias anotações. Cada etapa é uma chance de erro.</p>
<p>O fechamento fica confiável quando o cálculo acontece no momento do atendimento:</p>
<ul>
<li>O serviço é agendado com a profissional certa.</li>
<li>Ao finalizar o atendimento, o valor cobrado e a forma de pagamento são registrados.</li>
<li>O sistema aplica o percentual configurado e separa a parte do salão e a da profissional.</li>
<li>No fim do período, o relatório já mostra o total de cada uma, atendimento por atendimento.</li>
</ul>
<p>Na <a href="/segmentos/saloes-de-beleza">Cygna para salões de beleza</a>, é assim que funciona: cada profissional vê o que tem a receber ao fim do dia, e o fechamento deixa de ser uma negociação.</p>

<h2>Erros comuns no cálculo da comissão</h2>
<ul>
<li><strong>Mudar a regra no meio do mês.</strong> Qualquer ajuste de percentual ou de base de cálculo deve valer a partir do próximo período, com aviso prévio.</li>
<li><strong>Esquecer os descontos.</strong> Desconto dado pelo salão sem combinar com a profissional reduz a comissão dela sem aviso.</li>
<li><strong>Pagar comissão de pacote na venda.</strong> Se a cliente cancela, o salão já pagou por sessões que não aconteceram.</li>
<li><strong>Não separar gorjeta.</strong> A gorjeta é da profissional e não deve entrar na base de cálculo.</li>
<li><strong>Não guardar o histórico.</strong> Sem registro por atendimento, qualquer dúvida vira palavra contra palavra.</li>
</ul>

<h2>Resumo prático</h2>
<ul>
<li>Comissão = base de cálculo × percentual.</li>
<li>Escolha a base: valor bruto, menos produto ou líquido, e escreva.</li>
<li>Prefira percentual por serviço quando o custo de produto varia muito.</li>
<li>Defina regra para desconto, cortesia, pacote e gorjeta.</li>
<li>Registre cada atendimento na hora e feche o período por relatório.</li>
<li>No modelo de salão-parceiro, siga o contrato exigido pela Lei 13.352/2016.</li>
</ul>
<p>Comissão organizada também depende de agenda cheia. Veja <a href="/blog/como-reduzir-faltas-de-clientes-no-salao">como reduzir faltas de clientes no salão</a> para que nenhuma profissional perca a parte dela por um horário vazio.</p>
`,
};

export default post;
