import type { Post } from "../blog";

const post: Post = {
  slug: "controle-de-estoque-na-clinica-de-estetica",
  status: "published",
  metaTitle: "Controle de estoque na clínica de estética: lote e validade",
  metaDescription:
    "Controle de estoque na clínica de estética: ficha técnica por procedimento, lote e validade, primeiro que vence primeiro que sai, ponto de pedido e inventário.",
  focusKeyword: "controle de estoque clínica de estética",
  titulo: "Controle de estoque na clínica de estética: ficha técnica, lote, validade e ponto de pedido",
  resumo:
    "O controle de estoque na clínica de estética funciona quando cada procedimento tem uma ficha técnica com os produtos e as quantidades usadas, o estoque baixa a cada atendimento, cada entrada registra lote e validade, a saída segue a regra do primeiro que vence, primeiro que sai, e cada produto tem um ponto de pedido. Assim a clínica não perde produto vencido, não fica sem material no meio do protocolo e sabe o custo real de cada sessão.",
  categoria: "Clínicas",
  tags: ["controle de estoque", "clínica de estética", "lote e validade", "ficha técnica", "custo por procedimento", "inventário"],
  publicado: "2026-10-08",
  atualizado: "2026-10-08",
  imagem: "/images/blog/controle-de-estoque-na-clinica-de-estetica.webp",
  imagemAlt: "Esteticista organizando ácidos, máscaras e ampolas por validade no armário de estoque da clínica",
  segmento: "clinicas-de-estetica",
  teste: {
    titulo: "Estoque que baixa sozinho a cada atendimento",
    texto:
      "Na Cygna, os produtos ficam vinculados ao serviço, com lote e validade. Cada atendimento baixa o que foi usado e o sistema avisa antes de um item acabar, para a clínica não parar um protocolo por falta de material.",
  },
  faq: [
    {
      q: "Como fazer controle de estoque em clínica de estética?",
      a: "Cadastre cada produto com unidade de medida, custo, lote e validade, monte a ficha técnica de cada procedimento com as quantidades usadas e faça o estoque baixar a cada atendimento. Defina um ponto de pedido por produto e faça inventário periódico para corrigir diferenças.",
    },
    {
      q: "Por que registrar lote e validade dos produtos?",
      a: "Para usar primeiro o que vence primeiro, evitar aplicar produto vencido e conseguir rastrear quais pacientes receberam determinado lote se houver recolhimento ou reação adversa. O rótulo dos cosméticos já traz lote e validade; o trabalho da clínica é registrar essas informações na entrada.",
    },
    {
      q: "O que é ficha técnica de procedimento estético?",
      a: "É a lista de produtos e quantidades usadas em um procedimento, como 2 ml de ácido, uma máscara e um par de luvas. Com ela, o estoque baixa automaticamente a cada atendimento e a clínica sabe o custo de material de cada sessão, o que é essencial para precificar.",
    },
    {
      q: "Como calcular o ponto de pedido de um produto?",
      a: "Multiplique o consumo médio diário do produto pelo prazo de entrega do fornecedor em dias e some um estoque de segurança. Quando o saldo chegar a esse número, é hora de comprar. Produtos com entrega demorada ou uso muito variável pedem estoque de segurança maior.",
    },
    {
      q: "De quanto em quanto tempo fazer inventário?",
      a: "Faça uma contagem completa pelo menos uma vez por mês e contagens rápidas semanais dos itens mais caros ou mais usados. Diferença entre o saldo do sistema e a contagem física indica desperdício, ficha técnica desatualizada ou uso sem registro, e deve ser investigada.",
    },
  ],
  html: `
<h2>Por que o estoque é um problema maior na estética</h2>
<p>Em uma clínica de estética, o estoque não é só uma lista de compras. Ácidos, ativos, ampolas, máscaras, ponteiras e descartáveis têm validade, alguns são caros e outros são indispensáveis para um protocolo que já foi vendido em pacote. Três problemas aparecem com frequência quando o controle é feito no olho:</p>
<ul>
<li><strong>Produto vencido no armário.</strong> Comprado em quantidade grande para ganhar desconto e esquecido atrás do lote mais novo.</li>
<li><strong>Falta de material no meio do protocolo.</strong> A paciente está na quinta sessão de um pacote e o ativo acabou.</li>
<li><strong>Custo de sessão desconhecido.</strong> Sem saber quanto produto cada procedimento consome, o preço do pacote é definido no escuro.</li>
</ul>
<p>Todos têm a mesma raiz: o estoque não está ligado aos atendimentos.</p>

<h2>Passo 1: cadastre os produtos do jeito certo</h2>
<p>Cada produto precisa de cinco informações no cadastro:</p>
<table>
<thead><tr><th>Campo</th><th>Exemplo</th><th>Por que importa</th></tr></thead>
<tbody>
<tr><td>Unidade de uso</td><td>ml, g, unidade, par</td><td>O procedimento consome em ml, mesmo que você compre o frasco</td></tr>
<tr><td>Custo por unidade de uso</td><td>Frasco de 30 ml por R$ 180 = R$ 6 por ml</td><td>Permite calcular o custo de cada sessão</td></tr>
<tr><td>Lote</td><td>Número impresso no rótulo</td><td>Rastreabilidade em caso de recolhimento ou reação</td></tr>
<tr><td>Validade</td><td>Data do rótulo e prazo depois de aberto</td><td>Ordem de uso e descarte correto</td></tr>
<tr><td>Ponto de pedido</td><td>Quantidade mínima antes de comprar</td><td>Evita ficar sem produto</td></tr>
</tbody>
</table>
<p>Atenção à validade depois de aberto: muitos produtos indicam um prazo de uso a partir da abertura, que é menor que a validade do rótulo. Anote a data de abertura no frasco.</p>

<h2>Passo 2: monte a ficha técnica de cada procedimento</h2>
<p>A ficha técnica é a receita do procedimento: quais produtos e quanto de cada um são usados em uma sessão. Um <strong>exemplo</strong> com valores fictícios para um peeling químico:</p>
<table>
<thead><tr><th>Item</th><th>Quantidade por sessão</th><th>Custo unitário</th><th>Custo na sessão</th></tr></thead>
<tbody>
<tr><td>Solução de limpeza</td><td>5 ml</td><td>R$ 0,40/ml</td><td>R$ 2,00</td></tr>
<tr><td>Ácido para peeling</td><td>2 ml</td><td>R$ 6,00/ml</td><td>R$ 12,00</td></tr>
<tr><td>Neutralizante</td><td>3 ml</td><td>R$ 1,00/ml</td><td>R$ 3,00</td></tr>
<tr><td>Máscara calmante</td><td>1 unidade</td><td>R$ 8,00</td><td>R$ 8,00</td></tr>
<tr><td>Descartáveis (luvas, gaze, touca, lençol)</td><td>1 kit</td><td>R$ 5,00</td><td>R$ 5,00</td></tr>
<tr><td>Total de material</td><td>—</td><td>—</td><td>R$ 30,00</td></tr>
</tbody>
</table>
<p>Com a ficha técnica, duas coisas passam a acontecer sozinhas: o estoque baixa a cada sessão e o custo de material de cada procedimento fica conhecido. Esse número é a base para precificar sessões e <a href="/blog/pacotes-de-sessoes-na-clinica-de-estetica">pacotes de sessões</a> sem perder margem.</p>
<!--teste-gratis-->
<h2>Passo 3: faça o estoque baixar no atendimento</h2>
<p>O controle manual, em que alguém anota na planilha o que foi usado no fim do dia, falha no primeiro dia corrido. O caminho confiável é vincular os produtos ao serviço: quando o atendimento é finalizado na agenda, o sistema baixa automaticamente as quantidades da ficha técnica. Se em um atendimento específico for usado mais produto, a profissional ajusta só aquele registro.</p>
<p>Na <a href="/segmentos/clinicas-de-estetica">Cygna para clínicas de estética</a>, ácidos, máscaras, ponteiras e descartáveis ficam vinculados ao serviço, e cada atendimento baixa o que foi usado. O sistema avisa antes de um produto acabar.</p>

<h2>Passo 4: primeiro que vence, primeiro que sai</h2>
<p>A regra de saída mais segura para produtos com validade é a do <strong>primeiro que vence, primeiro que sai</strong>, conhecida pela sigla em inglês FEFO. Na prática:</p>
<ul>
<li>Organize o armário com os lotes de validade mais próxima na frente.</li>
<li>Ao receber mercadoria nova, coloque atrás do que já está na prateleira, e não na frente.</li>
<li>Revise mensalmente os produtos que vencem nos próximos 60 dias e priorize o uso deles na agenda.</li>
<li>Descarte o que venceu, registre a perda e use esse número para ajustar a próxima compra.</li>
</ul>

<h2>Passo 5: defina o ponto de pedido</h2>
<p>O ponto de pedido é o saldo que, quando atingido, indica a hora de comprar. A fórmula:</p>
<p><strong>Ponto de pedido = consumo médio diário × prazo de entrega (dias) + estoque de segurança</strong></p>
<p>Um <strong>exemplo</strong>: a clínica usa 6 ml de um ácido por dia, o fornecedor entrega em 7 dias e a clínica quer uma folga de 3 dias de consumo. Ponto de pedido = 6 × 7 + 6 × 3 = 60 ml. Quando o saldo chegar a 60 ml, faça o pedido.</p>
<p>Comprar muito acima disso para ganhar desconto só vale para produtos de validade longa e uso constante. Para ativos de validade curta, o desconto vira perda.</p>

<h2>Passo 6: faça inventário e investigue as diferenças</h2>
<p>Mesmo com baixa automática, o saldo do sistema e o físico se afastam com o tempo: produto derramado, quantidade usada diferente da ficha, item retirado sem registro. O inventário corrige isso:</p>
<ul>
<li><strong>Mensal:</strong> contagem completa de todos os itens.</li>
<li><strong>Semanal:</strong> contagem rápida dos itens mais caros e mais usados.</li>
<li><strong>Diferença recorrente:</strong> revise a ficha técnica do procedimento ou o processo de retirada.</li>
</ul>

<h2>Lote, rastreabilidade e segurança da paciente</h2>
<p>Registrar o lote na entrada do produto permite saber quais pacientes receberam cada lote. Se um fabricante recolher um lote ou se uma paciente tiver uma reação, a clínica consegue identificar rapidamente quem mais foi atendida com o mesmo produto. Esse cuidado complementa a anamnese, que registra alergias e contraindicações. O guia de <a href="/blog/ficha-de-anamnese-para-estetica-e-lgpd">ficha de anamnese para estética</a> mostra como organizar essas informações.</p>

<h2>Resumo prático</h2>
<ul>
<li>Cadastre produtos com unidade de uso, custo, lote, validade e ponto de pedido.</li>
<li>Monte a ficha técnica de cada procedimento.</li>
<li>Faça o estoque baixar na finalização do atendimento.</li>
<li>Siga a regra do primeiro que vence, primeiro que sai.</li>
<li>Compre pelo ponto de pedido, e não pelo desconto.</li>
<li>Faça inventário mensal e investigue as diferenças.</li>
<li>Use o lote para rastrear pacientes em caso de recolhimento.</li>
</ul>
`,
};

export default post;
