import type { Post } from "../blog";

const post: Post = {
  slug: "fechamento-de-caixa-no-salao-de-beleza",
  status: "published",
  metaTitle: "Fechamento de caixa no salão de beleza: passo a passo",
  metaDescription:
    "Fechamento de caixa no salão de beleza: conferência por forma de pagamento, sangria, taxas de cartão, comissões e diferenças, com checklist diário e exemplo.",
  focusKeyword: "fechamento de caixa salão de beleza",
  titulo: "Fechamento de caixa no salão de beleza: passo a passo diário, taxas e diferenças",
  resumo:
    "O fechamento de caixa no salão de beleza é a conferência, no fim do dia, entre o que o sistema registrou e o que de fato entrou em cada forma de pagamento: dinheiro na gaveta, Pix na conta e vendas na maquininha. Ele inclui as saídas do dia, como sangrias e despesas, separa as comissões e explica qualquer diferença antes de o dia virar. Feito todo dia, leva poucos minutos; feito no fim do mês, vira investigação.",
  categoria: "Gestão",
  tags: ["fechamento de caixa", "controle financeiro", "salão de beleza", "fluxo de caixa", "taxa de cartão", "sangria"],
  publicado: "2026-10-08",
  atualizado: "2026-10-08",
  imagem: "/images/blog/fechamento-de-caixa-no-salao-de-beleza.webp",
  imagemAlt: "Recepcionista de salão de beleza conferindo o caixa do dia no fim do expediente",
  segmento: "saloes-de-beleza",
  teste: {
    titulo: "Fechamento do dia pronto quando o último atendimento termina",
    texto:
      "Na Cygna, cada atendimento e cada venda de produto entram no caixa com a forma de pagamento, e a comissão de cada profissional já é calculada. No fim do dia, o fechamento mostra o que entrou por forma de pagamento, as despesas e os estornos.",
  },
  faq: [
    {
      q: "Como fazer o fechamento de caixa do salão?",
      a: "No fim do dia, compare o que o sistema registrou com o que entrou em cada forma de pagamento: conte o dinheiro da gaveta, confira o extrato do Pix e o relatório da maquininha. Lance as saídas do dia, como sangrias e despesas, e anote qualquer diferença com a explicação antes de encerrar.",
    },
    {
      q: "O que é sangria de caixa?",
      a: "Sangria é a retirada de dinheiro da gaveta durante o dia, para depósito, pagamento de despesa ou para não acumular muito dinheiro em espécie. Cada sangria precisa ser registrada com valor, horário, motivo e quem retirou, para que o fechamento bata no fim do dia.",
    },
    {
      q: "A taxa da maquininha entra no fechamento de caixa?",
      a: "Sim. O valor vendido no cartão não é o valor que cai na conta: a operadora desconta a taxa e, no crédito, pode pagar em datas diferentes. No fechamento, registre o valor bruto vendido e acompanhe o valor líquido e a data de recebimento para não superestimar o dinheiro disponível.",
    },
    {
      q: "O que fazer quando o caixa não bate?",
      a: "Primeiro, refaça a contagem do dinheiro e confira se todas as vendas foram lançadas com a forma de pagamento certa. Os erros mais comuns são Pix lançado como dinheiro, desconto não registrado, troco errado e sangria sem anotação. Se a diferença persistir, registre com a explicação e acompanhe se se repete.",
    },
    {
      q: "Preciso separar as contas pessoais das contas do salão?",
      a: "Sim. Misturar conta pessoal e conta do salão é a forma mais rápida de perder o controle do lucro. Tenha conta e maquininha no nome do salão, defina um pró-labore fixo para a dona e trate qualquer retirada além dele como distribuição de lucro, registrada.",
    },
  ],
  html: `
<h2>Por que fechar o caixa todo dia</h2>
<p>O salão recebe de várias formas ao mesmo tempo: dinheiro, Pix, débito, crédito à vista e parcelado, às vezes vale-presente e pacote pago antes. Entre um atendimento e outro, alguém dá troco, faz uma sangria para pagar o entregador e concede um desconto para a cliente antiga. Cada uma dessas operações é uma chance de erro.</p>
<p>Quando o caixa é conferido no mesmo dia, a diferença tem explicação: todo mundo ainda lembra do Pix que foi lançado como dinheiro. Quando a conferência fica para o fim do mês, a diferença vira um número sem dono.</p>

<h2>O que o fechamento confere</h2>
<table>
<thead><tr><th>Forma de pagamento</th><th>Onde conferir</th><th>Ponto de atenção</th></tr></thead>
<tbody>
<tr><td>Dinheiro</td><td>Contagem da gaveta</td><td>Troco inicial, sangrias e troco errado</td></tr>
<tr><td>Pix</td><td>Extrato da conta do salão</td><td>Pix caído na conta pessoal de alguém</td></tr>
<tr><td>Débito</td><td>Relatório da maquininha</td><td>Taxa descontada no recebimento</td></tr>
<tr><td>Crédito</td><td>Relatório da maquininha</td><td>Taxa maior e recebimento em outra data</td></tr>
<tr><td>Pacote ou vale usado</td><td>Saldo no sistema</td><td>Atendimento sem entrada de dinheiro no dia</td></tr>
</tbody>
</table>

<h2>Passo a passo do fechamento diário</h2>
<h3>1. Confirme que todos os atendimentos foram finalizados</h3>
<p>Atendimento esquecido aberto na agenda é venda que não entrou no caixa. Antes de contar dinheiro, confira se cada cliente do dia tem o atendimento finalizado, com o valor e a forma de pagamento certos.</p>
<h3>2. Conte o dinheiro da gaveta</h3>
<p>Separe o troco inicial, conte o restante e compare com o total de dinheiro registrado no sistema, menos as sangrias.</p>
<h3>3. Confira Pix e cartão</h3>
<p>Compare os Pix registrados com o extrato da conta do salão e as vendas de cartão com o relatório da maquininha. A soma de débito e crédito no sistema deve bater com o total vendido na máquina.</p>
<h3>4. Lance as saídas do dia</h3>
<p>Sangrias, compras pequenas, pagamento de entregador, adiantamento a profissional. Toda saída com valor, motivo e quem retirou.</p>
<h3>5. Registre e explique as diferenças</h3>
<p>Diferença pequena e explicada é normal. Diferença sem explicação, repetida, é sinal de processo falho, ou de algo mais sério.</p>
<!--teste-gratis-->
<h2>Exemplo de fechamento</h2>
<p>Um <strong>exemplo</strong> com números fictícios de um sábado:</p>
<table>
<thead><tr><th>Item</th><th>Sistema</th><th>Conferido</th><th>Diferença</th></tr></thead>
<tbody>
<tr><td>Dinheiro (sem troco inicial e após sangria de R$ 100)</td><td>R$ 420,00</td><td>R$ 410,00</td><td>− R$ 10,00</td></tr>
<tr><td>Pix</td><td>R$ 1.350,00</td><td>R$ 1.350,00</td><td>R$ 0,00</td></tr>
<tr><td>Débito</td><td>R$ 980,00</td><td>R$ 980,00</td><td>R$ 0,00</td></tr>
<tr><td>Crédito</td><td>R$ 1.640,00</td><td>R$ 1.640,00</td><td>R$ 0,00</td></tr>
<tr><td>Total</td><td>R$ 4.390,00</td><td>R$ 4.380,00</td><td>− R$ 10,00</td></tr>
</tbody>
</table>
<p>A diferença de R$ 10 no dinheiro, explicada como troco dado a mais, é registrada com a observação. Se diferenças assim aparecerem toda semana, vale rever o processo de troco.</p>

<h2>Taxa de cartão e prazo de recebimento</h2>
<p>O valor vendido no cartão não é o valor disponível. A operadora desconta a taxa e, no crédito, paga em data diferente, às vezes parcela por parcela. Um <strong>exemplo</strong>: R$ 1.640 vendidos no crédito com taxa média de 3% resultam em R$ 1.590,80 líquidos, que podem cair em 30 dias ou em parcelas mensais.</p>
<p>Por isso, além do fechamento do dia, acompanhe o <strong>contas a receber</strong>: quanto vai cair na conta, em qual data. É ele que diz se haverá dinheiro para pagar o aluguel no dia 10.</p>

<h2>Comissão no fechamento</h2>
<p>O fechamento é o momento de conferir a comissão do dia de cada profissional. Quando cada atendimento já registra quem atendeu e o percentual, a profissional vê o que tem a receber no mesmo dia, e o repasse semanal ou mensal é só a soma dos dias conferidos. O guia sobre <a href="/blog/como-calcular-comissao-no-salao-de-beleza">como calcular comissão no salão</a> mostra como tratar taxa de cartão e produto na base de cálculo.</p>

<h2>Pacotes e vales: atendimento sem dinheiro no dia</h2>
<p>Quando a cliente usa uma sessão de pacote pago no mês passado, há atendimento sem entrada de dinheiro. Isso não é diferença de caixa, e o fechamento precisa mostrar separadamente: dinheiro que entrou hoje e serviços consumidos de pacotes. Misturar os dois faz o dia parecer mais fraco, ou mais forte, do que foi.</p>

<h2>Erros que mais desequilibram o caixa</h2>
<ul>
<li><strong>Pix lançado como dinheiro</strong>, ou o contrário.</li>
<li><strong>Desconto não registrado</strong>: o sistema espera R$ 80 e entraram R$ 70.</li>
<li><strong>Sangria sem anotação.</strong></li>
<li><strong>Pix na conta pessoal</strong> de alguém da equipe.</li>
<li><strong>Venda de produto fora do sistema</strong>, que também bagunça o estoque.</li>
<li><strong>Contas pessoais misturadas com as do salão.</strong></li>
</ul>

<h2>Checklist diário</h2>
<ul>
<li>Todos os atendimentos do dia finalizados com forma de pagamento.</li>
<li>Dinheiro contado, troco inicial separado.</li>
<li>Pix conferido no extrato da conta do salão.</li>
<li>Cartão conferido no relatório da maquininha.</li>
<li>Sangrias e despesas lançadas.</li>
<li>Diferenças registradas com explicação.</li>
<li>Comissões do dia conferidas.</li>
</ul>
<p>Na <a href="/segmentos/saloes-de-beleza">Cygna para salões de beleza</a>, o fechamento do dia mostra o que entrou por forma de pagamento, as despesas e os estornos, com a comissão de cada profissional já calculada.</p>
`,
};

export default post;
