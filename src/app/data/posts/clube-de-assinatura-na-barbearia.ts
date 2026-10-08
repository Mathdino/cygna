import type { Post } from "../blog";

const post: Post = {
  slug: "clube-de-assinatura-na-barbearia",
  status: "published",
  metaTitle: "Clube de assinatura na barbearia: como montar o plano mensal",
  metaDescription:
    "Clube de assinatura na barbearia: como definir preço e cortes do plano, regras de uso e cancelamento, comissão do barbeiro e controle do saldo de cada cliente.",
  focusKeyword: "clube de assinatura barbearia",
  titulo: "Clube de assinatura na barbearia: preço, regras e controle do plano mensal de cortes",
  resumo:
    "Um clube de assinatura na barbearia é um plano mensal em que o cliente paga um valor fixo e tem direito a um número de cortes, ou de cortes e barbas, no mês. Para dar lucro, o preço precisa ser calculado sobre o uso real dos assinantes, e não sobre o uso máximo, as regras de uso e cancelamento devem ser escritas antes da venda e o saldo de cada cliente precisa estar visível na agenda.",
  categoria: "Barbearias",
  tags: ["clube de assinatura", "barbearia", "plano mensal de cortes", "receita recorrente", "fidelização", "pacotes"],
  publicado: "2026-10-08",
  atualizado: "2026-10-08",
  imagem: "/images/blog/clube-de-assinatura-na-barbearia.webp",
  imagemAlt: "Cliente assinante da barbearia sendo atendido para o corte do mês",
  segmento: "barbearias",
  teste: {
    titulo: "Pacote mensal de cortes com saldo controlado sozinho",
    texto:
      "Na Cygna, você cria o pacote do mês, o cliente compra pelo link ou no balcão e cada visita baixa uma unidade do saldo. A recepção vê quantos cortes restam e quando o pacote vence, e a comissão é calculada por atendimento.",
  },
  faq: [
    {
      q: "Clube de assinatura de barbearia dá lucro?",
      a: "Dá, quando o preço é calculado sobre o uso médio real dos assinantes e o plano ocupa horários que ficariam vazios. O lucro vem da previsibilidade e da frequência maior do cliente, que também compra produtos e indica amigos. Plano ilimitado com preço baixo e assinante que corta toda semana pode dar prejuízo.",
    },
    {
      q: "Quanto cobrar no plano mensal de cortes?",
      a: "Parta do preço avulso e do número de cortes incluídos e aplique um desconto que caiba na margem. Um plano com 2 cortes de R$ 50 pode sair por R$ 85 a R$ 90. Para planos ilimitados, calcule pelo uso médio esperado e limite a frequência, por exemplo um corte a cada 7 dias.",
    },
    {
      q: "O assinante pode cancelar o clube a qualquer momento?",
      a: "O contrato deve prever como funciona o cancelamento, com aviso prévio e sem cláusula que faça o cliente perder valores de forma desproporcional, o que tende a ser considerado abusivo pelo Código de Defesa do Consumidor. Muitos clubes funcionam mês a mês, sem fidelidade, o que facilita a adesão.",
    },
    {
      q: "Cortes não usados no mês acumulam para o mês seguinte?",
      a: "Depende da regra que você definir, mas o mais comum é não acumular, para manter a agenda previsível. Se preferir permitir, limite o acúmulo, por exemplo, a um corte por mês. O importante é a regra estar escrita e ser aceita antes da contratação.",
    },
    {
      q: "Como pagar a comissão do barbeiro no clube de assinatura?",
      a: "O critério mais usado é pagar por atendimento realizado, com base em um valor de referência por corte do plano, por exemplo o valor do plano dividido pelo número de cortes incluídos. Assim a comissão acompanha o trabalho efetivamente feito, e não a venda.",
    },
  ],
  html: `
<h2>Por que tantas barbearias estão criando clube de assinatura</h2>
<p>A barbearia tem uma característica que poucos negócios têm: o cliente fiel volta em intervalos curtos e previsíveis. Quem mantém o degradê corta a cada duas ou três semanas; quem cuida da barba aparece ainda mais. O clube de assinatura transforma essa frequência em receita mensal garantida. O cliente paga um valor fixo e tem direito a um número de serviços no mês.</p>
<p>Os ganhos para a barbearia são três:</p>
<ul>
<li><strong>Receita previsível.</strong> No começo do mês, a casa já sabe quanto entra dos assinantes.</li>
<li><strong>Frequência maior.</strong> O assinante corta mais vezes, porque já pagou, e mantém o visual sempre em dia.</li>
<li><strong>Fidelidade.</strong> Quem assina não troca de barbearia por causa de uma promoção da concorrente.</li>
</ul>
<p>O risco está na conta: um plano mal precificado lota a agenda de cortes que dão prejuízo.</p>

<h2>Modelos de clube mais usados</h2>
<table>
<thead><tr><th>Modelo</th><th>Como funciona</th><th>Ponto de atenção</th></tr></thead>
<tbody>
<tr><td>Cortes limitados</td><td>2 ou 4 cortes por mês por valor fixo</td><td>O mais seguro para a margem</td></tr>
<tr><td>Corte e barba</td><td>Combinação mensal, como 2 cortes e 4 barbas</td><td>Equilibrar serviços longos e curtos</td></tr>
<tr><td>Ilimitado com intervalo</td><td>Quantos cortes quiser, com mínimo de 7 dias entre eles</td><td>Exige cálculo pelo uso médio e regra de intervalo</td></tr>
<tr><td>Ilimitado em dias fracos</td><td>Uso livre de segunda a quinta</td><td>Ótimo para ocupar horários ociosos</td></tr>
</tbody>
</table>
<p>O modelo de dias fracos merece atenção: ele vende justamente os horários que ficariam vazios, como terça e quarta à tarde, e deixa sexta e sábado para o cliente avulso, que paga preço cheio.</p>

<h2>Como precificar o plano</h2>
<h3>Plano com número fixo de cortes</h3>
<p>Parta do preço avulso. Um <strong>exemplo</strong> com números fictícios, para corte avulso de R$ 50:</p>
<table>
<thead><tr><th>Plano</th><th>Valor avulso equivalente</th><th>Preço do plano</th><th>Desconto</th></tr></thead>
<tbody>
<tr><td>2 cortes por mês</td><td>R$ 100</td><td>R$ 90</td><td>10%</td></tr>
<tr><td>4 cortes por mês</td><td>R$ 200</td><td>R$ 160</td><td>20%</td></tr>
<tr><td>2 cortes e 4 barbas (barba a R$ 35)</td><td>R$ 240</td><td>R$ 190</td><td>21%</td></tr>
</tbody>
</table>
<p>Antes de definir o desconto, calcule a margem do corte. Se o custo por corte, somando comissão, produto e custos fixos, é de R$ 35, a margem do corte de R$ 50 é de R$ 15. No plano de 4 cortes por R$ 160, cada corte sai a R$ 40 e a margem cai para R$ 5. Ainda é lucro, mas pequeno: o plano só compensa se trouxer frequência e venda de produtos.</p>
<h3>Plano ilimitado</h3>
<p>No ilimitado, o preço se calcula pelo uso médio, e não pelo máximo. Se, na média, os assinantes cortam 2,5 vezes por mês, o custo médio por assinante com corte a R$ 35 de custo é de R$ 87,50. Um plano de R$ 119 deixa margem. O risco está no assinante que corta toda semana; por isso a regra de intervalo mínimo é essencial.</p>
<!--teste-gratis-->
<h2>Regras que precisam estar escritas</h2>
<p>O clube precisa de um regulamento curto, aceito antes da primeira cobrança. Os pontos essenciais:</p>
<ol>
<li><strong>O que está incluído.</strong> Serviços, quantidade por mês e intervalo mínimo entre usos.</li>
<li><strong>Uso pessoal.</strong> O plano é intransferível, para evitar que um assinante traga o irmão e o primo.</li>
<li><strong>Acúmulo.</strong> Se cortes não usados passam para o mês seguinte, e até quanto.</li>
<li><strong>Agendamento.</strong> Se o assinante precisa marcar horário e se há dias ou horários restritos.</li>
<li><strong>Cobrança e renovação.</strong> Data de pagamento e o que acontece em caso de atraso.</li>
<li><strong>Cancelamento.</strong> Prazo de aviso e como fica o mês em curso.</li>
</ol>
<p>Pelo Código de Defesa do Consumidor, a regra precisa ser clara antes da contratação, e cláusulas que façam o cliente perder valores de forma desproporcional tendem a ser consideradas abusivas. Este conteúdo é informativo; peça a um advogado para revisar o regulamento.</p>

<h2>Como controlar o saldo de cada assinante</h2>
<p>O clube só funciona se a recepção sabe, na hora, quantos cortes o cliente ainda tem no mês. Controle em caderno ou em planilha falha quando dois barbeiros atendem o mesmo cliente na mesma semana ou quando ninguém lembra de anotar. O controle confiável segue três regras:</p>
<ul>
<li><strong>O saldo baixa no atendimento</strong>, e não depois, por anotação.</li>
<li><strong>O saldo aparece na agenda</strong>, para quem atende e para quem está no balcão.</li>
<li><strong>A validade é visível</strong>, para a recepção lembrar o cliente de usar o que pagou e oferecer a renovação.</li>
</ul>
<p>Na <a href="/segmentos/barbearias">Cygna para barbearias</a>, o plano é vendido como pacote: o cliente compra pelo link ou no balcão, o saldo fica na ficha e baixa a cada visita.</p>

<h2>Comissão do barbeiro no clube</h2>
<p>A comissão é o ponto que mais gera dúvida. O critério mais justo é pagar por atendimento realizado, usando um valor de referência por serviço do plano. No <strong>exemplo</strong> do plano de 4 cortes por R$ 160, o valor de referência é R$ 40 por corte; com comissão de 40%, o barbeiro recebe R$ 16 por corte de assinante. A regra deve estar no contrato com o barbeiro, e o guia sobre <a href="/blog/como-calcular-comissao-no-salao-de-beleza">como calcular comissão</a> detalha as bases de cálculo mais usadas.</p>

<h2>Como divulgar o clube</h2>
<ul>
<li><strong>No fim do corte.</strong> O cliente que acabou de sair satisfeito é o melhor candidato.</li>
<li><strong>Para quem vem com frequência.</strong> Mostre a conta: "você cortou três vezes no mês passado e gastou R$ 150; no clube, sairia por R$ 120".</li>
<li><strong>Cartaz no espelho e QR Code no balcão.</strong> Com o preço e o que está incluído.</li>
<li><strong>Stories com assinantes.</strong> Com autorização, mostre clientes do clube e o visual sempre em dia.</li>
</ul>

<h2>Indicadores do clube</h2>
<table>
<thead><tr><th>Indicador</th><th>Como calcular</th></tr></thead>
<tbody>
<tr><td>Assinantes ativos</td><td>Clientes com plano pago no mês</td></tr>
<tr><td>Uso médio</td><td>Serviços usados ÷ assinantes ativos</td></tr>
<tr><td>Cancelamento mensal</td><td>Assinantes que cancelaram ÷ assinantes do início do mês × 100</td></tr>
<tr><td>Receita recorrente</td><td>Soma dos planos pagos no mês</td></tr>
<tr><td>Venda extra por assinante</td><td>Produtos e serviços fora do plano ÷ assinantes</td></tr>
</tbody>
</table>

<h2>Resumo prático</h2>
<ul>
<li>Escolha o modelo: cortes limitados, combo com barba, ilimitado com intervalo ou dias fracos.</li>
<li>Precifique sobre a margem e o uso médio, e não sobre o uso máximo.</li>
<li>Escreva regulamento com uso, acúmulo, cancelamento e intervalo.</li>
<li>Controle o saldo ligado à agenda.</li>
<li>Pague comissão por atendimento realizado, com valor de referência.</li>
<li>Acompanhe uso médio e cancelamento todo mês.</li>
</ul>
<p>Assinatura e agenda andam juntas: veja também <a href="/blog/agendamento-ou-ordem-de-chegada-na-barbearia">agendamento ou ordem de chegada na barbearia</a>.</p>
`,
};

export default post;
