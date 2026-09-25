/* =============================================================================
   BLOG — padrão TIER (dispatcher + array), papel T4 conteúdo.

   Criar post = adicionar 1 entrada. Rota /blog/{slug}, listagem /blog,
   sitemap.xml, llms.txt e BlogPosting saem daqui.

   Regras (ESTRUTURA-TIERS §4.2, §5.6, §6.4):
    · 1.000+ palavras úteis, tese própria, sem enchimento.
    · `resumo` answer-first: é o trecho marcado como speakable.
    · Cada post linka para o segmento comercial do mesmo assunto (no texto e
      no CTA final) — é o sentido do silo: post → página comercial.
    · Keyword informacional mora no post; a comercial mora no segmento. Os
      dois nunca disputam a mesma keyword principal.
    · Número sem fonte só como EXEMPLO de cálculo, dito como exemplo.
    · Tabelas: o prerender copia o <th> para `data-label` de cada <td>, e o
      CSS empilha a tabela em cartões abaixo de 600px.
   ========================================================================== */

export type Post = {
  slug: string;
  status: "published" | "draft";
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tags: string[];
  publicado: string;
  atualizado: string;
  imagem: string;
  imagemAlt: string;
  /** Segmento comercial do mesmo assunto (CTA e breadcrumb de contexto). */
  segmento: string;
  html: string;
};

export const POSTS: Post[] = [
  /* ─────────────────────────────────────────────────────────────── FALTAS ── */
  {
    slug: "como-reduzir-faltas-de-clientes-no-salao",
    status: "published",
    metaTitle: "Como reduzir faltas de clientes no salão de beleza",
    metaDescription:
      "Como reduzir faltas de clientes no salão: lembrete no WhatsApp na véspera, sinal via Pix no agendamento e política de remarcação clara. Guia com passo a passo.",
    focusKeyword: "como reduzir faltas de clientes no salão",
    titulo: "Como reduzir faltas de clientes no salão: lembrete, sinal e regra clara",
    resumo:
      "Para reduzir faltas de clientes no salão, combine três medidas: lembrete no WhatsApp na véspera com botão de confirmar, sinal via Pix cobrado no momento do agendamento e uma política de remarcação escrita antes da marcação. Juntas, elas transformam a falta sem aviso em remarcação avisada.",
    categoria: "Gestão",
    tags: ["faltas", "no-show", "lembrete WhatsApp", "sinal via Pix", "salão de beleza"],
    publicado: "2026-09-25",
    atualizado: "2026-09-25",
    imagem: "/images/para-quem/saloes-de-beleza.webp",
    imagemAlt: "Recepção de salão de beleza com agenda do dia aberta no celular",
    segmento: "saloes-de-beleza",
    html: `
<h2>Por que a cliente falta sem avisar?</h2>
<p>Na maioria das vezes, a cliente que falta não decidiu faltar: ela esqueceu, teve um imprevisto e não achou um jeito fácil de remarcar, ou marcou com tanta antecedência que o compromisso saiu do radar. A falta de má-fé existe, mas é minoria. Isso muda a estratégia, porque o que resolve esquecimento é lembrete, o que resolve imprevisto é remarcação fácil e o que resolve o pouco caso é compromisso financeiro.</p>
<p>Por isso, nenhuma medida isolada resolve o problema. Um salão que só cobra sinal, mas não lembra ninguém, continua perdendo as clientes distraídas. Um salão que só manda lembrete, mas não tem regra, continua recebendo o "não vou poder ir" meia hora antes. O que funciona é a combinação das três coisas.</p>

<h2>Quanto custa uma falta para o salão?</h2>
<p>Vale fazer a conta com os números do seu próprio salão, porque ela mostra o tamanho do problema. Um <strong>exemplo</strong>: se uma coloração de R$ 180 fica vazia duas vezes por semana, são R$ 360 por semana, ou cerca de R$ 1.440 por mês que não entram. Esse valor não considera o produto já separado, a profissional parada e a cliente da lista de espera que poderia ter ocupado o horário.</p>
<p>Em salões com equipe, a falta ainda tem um custo que não aparece no caixa: a profissional comissionada perde a parte dela, e a relação com o salão desgasta. Quando o horário vazio vira rotina, a conversa sobre comissão fica mais difícil.</p>

<h2>1. Lembrete no WhatsApp na véspera, com botão de confirmar</h2>
<p>O lembrete é a medida mais barata e a que resolve o maior número de casos, porque ataca o esquecimento. Três detalhes fazem diferença:</p>
<ul>
<li><strong>Horário de envio.</strong> Na véspera, e não no mesmo dia. Um dia de antecedência dá tempo para a cliente reorganizar a agenda ou remarcar, e para o salão oferecer o horário a outra pessoa.</li>
<li><strong>Botão de resposta.</strong> "Confirmar" e "Remarcar" em um toque. Mensagem que pede para a cliente digitar uma resposta tem retorno bem menor do que mensagem com botão.</li>
<li><strong>Resposta na agenda.</strong> A confirmação precisa aparecer na agenda da recepção, e não no celular de alguém. Se a informação fica espalhada, ninguém sabe na manhã seguinte quem confirmou.</li>
</ul>
<p>Mandar esse lembrete à mão para vinte clientes por dia toma quase uma hora da recepção. Com um sistema de agendamento como a <a href="/segmentos/saloes-de-beleza">Cygna para salões de beleza</a>, a mensagem sai sozinha um dia antes e a resposta da cliente atualiza a agenda.</p>

<h2>2. Sinal via Pix cobrado no próprio agendamento</h2>
<p>O sinal resolve o pouco caso e filtra quem marca "só para garantir". A cliente que paga uma parte do serviço para reservar o horário tem um motivo concreto para aparecer ou, pelo menos, para avisar com antecedência.</p>
<h3>Quanto cobrar de sinal?</h3>
<p>Não existe um valor obrigatório. Os formatos mais comuns são um valor fixo por serviço, que funciona bem para serviços de preço parecido, ou uma porcentagem do valor total, geralmente entre 20% e 50%, que acompanha serviços mais caros e mais longos. O critério prático é: o sinal deve ser alto o bastante para gerar compromisso e baixo o bastante para não assustar quem está marcando pela primeira vez.</p>
<h3>Quando o sinal é devolvido?</h3>
<p>Defina antes e escreva. O modelo mais usado é: remarcação com pelo menos 24 horas de antecedência mantém o sinal como crédito para o novo horário; falta sem aviso perde o sinal. O que desgasta a relação não é a regra, é a regra criada depois da falta.</p>
<p>Cobrar sinal pelo WhatsApp, conferir o comprovante e só depois confirmar o horário é trabalhoso. Quando a cobrança acontece na mesma tela do agendamento, a cliente paga por Pix e o horário só é reservado depois do pagamento, sem ninguém precisar pedir.</p>

<h2>3. Política de remarcação escrita antes da marcação</h2>
<p>A política é o que dá legitimidade ao sinal. Ela precisa estar visível no momento em que a cliente escolhe o horário, e não só no Instagram ou na parede da recepção. Um bom texto responde três perguntas em poucas linhas:</p>
<ol>
<li>Até quando a cliente pode remarcar sem custo?</li>
<li>O que acontece com o sinal em caso de remarcação e em caso de falta?</li>
<li>Qual a tolerância de atraso antes de o horário ser considerado perdido?</li>
</ol>
<p>Um exemplo curto: "Remarcações até 24 horas antes mantêm o sinal como crédito. Faltas sem aviso não têm devolução do sinal. Atrasos acima de 15 minutos podem reduzir o serviço ou exigir remarcação."</p>

<h2>Como as três medidas se complementam</h2>
<table>
<thead><tr><th>Causa da falta</th><th>Medida que resolve</th><th>Por quê</th></tr></thead>
<tbody>
<tr><td>Esquecimento</td><td>Lembrete na véspera</td><td>Traz o compromisso de volta ao radar a tempo de reorganizar</td></tr>
<tr><td>Imprevisto</td><td>Remarcação em um toque</td><td>Transforma a falta em remarcação avisada</td></tr>
<tr><td>Pouco compromisso</td><td>Sinal via Pix</td><td>Cria um custo real para faltar sem avisar</td></tr>
<tr><td>Conflito depois da falta</td><td>Política escrita</td><td>A regra foi aceita antes, então não há discussão</td></tr>
</tbody>
</table>

<h2>O que fazer com o horário que ficou vago</h2>
<p>Reduzir faltas é metade do trabalho; a outra metade é ocupar o horário que abriu. Quando a cliente remarca pelo botão do lembrete, o horário volta a aparecer no link de agendamento imediatamente, e quem estava procurando um encaixe consegue marcar sem ligar. Manter uma pequena lista de clientes que aceitam encaixe de última hora também ajuda, principalmente em serviços curtos, como escova e design de sobrancelhas.</p>

<h2>Como medir se as faltas diminuíram</h2>
<p>Antes de mudar qualquer coisa, anote por duas semanas quantos horários foram marcados e quantos ficaram vazios sem aviso. Depois de ativar lembrete, sinal e política, compare o mesmo período. A taxa de falta é simples: horários perdidos sem aviso divididos pelo total de horários marcados. Separe remarcação de falta, porque remarcação avisada é o comportamento que você quer incentivar, e não um problema.</p>
<p>Se a taxa não cair, olhe primeiro para o horário do lembrete e para a clareza da política. Em geral, o problema está em um dos dois.</p>

<h2>Resumo prático</h2>
<ul>
<li>Lembrete automático no WhatsApp na véspera, com botões de confirmar e remarcar.</li>
<li>Sinal via Pix cobrado no próprio agendamento, com valor fixo ou porcentagem por serviço.</li>
<li>Política de remarcação curta, visível antes da marcação.</li>
<li>Medição simples: faltas sem aviso divididas pelo total de horários, antes e depois.</li>
</ul>
<p>Para quem atende sozinha, o peso de cada falta é ainda maior. A página de <a href="/segmentos/lash-e-nail-designers">agenda para lash e nail designers</a> mostra como o sinal e o lembrete funcionam para quem não tem recepção.</p>
`,
  },

  /* ───────────────────────────────────────────────────────────── ANAMNESE ── */
  {
    slug: "ficha-de-anamnese-para-estetica-e-lgpd",
    status: "published",
    metaTitle: "Ficha de anamnese para estética: o que perguntar e LGPD",
    metaDescription:
      "Ficha de anamnese para estética: perguntas essenciais por procedimento, termo de consentimento, fotos de evolução e como guardar os dados de saúde pela LGPD.",
    focusKeyword: "ficha de anamnese estética",
    titulo: "Ficha de anamnese para estética: o que perguntar e como guardar pela LGPD",
    resumo:
      "Uma ficha de anamnese para estética precisa registrar dados de identificação, histórico de saúde, alergias, medicamentos, hábitos e as contraindicações do procedimento, seguida de termo de consentimento assinado. Como são dados de saúde, a LGPD os classifica como sensíveis: devem ficar guardados com acesso restrito, e não em papel solto ou no WhatsApp.",
    categoria: "Clínicas",
    tags: ["anamnese", "clínica de estética", "LGPD", "termo de consentimento", "prontuário estético"],
    publicado: "2026-09-25",
    atualizado: "2026-09-25",
    imagem: "/images/para-quem/clinicas-de-estetica.webp",
    imagemAlt: "Profissional de estética revisando ficha de anamnese com a paciente",
    segmento: "clinicas-de-estetica",
    html: `
<h2>Para que serve a anamnese em estética?</h2>
<p>A anamnese é a entrevista que antecede o procedimento. Ela serve a três propósitos ao mesmo tempo: proteger a paciente, identificando contraindicações antes de aplicar um ácido, um laser ou uma corrente; orientar o protocolo, porque o mesmo tratamento é conduzido de forma diferente em pele sensível, pele com melasma ou pele em uso de ácido retinoico; e proteger a profissional, porque registra o que a paciente informou e aceitou antes de começar.</p>
<p>Uma anamnese bem feita não é um formulário longo. É um formulário certo para o procedimento. Perguntar sobre marca-passo para uma limpeza de pele simples cansa a paciente; deixar de perguntar isso antes de uma corrente elétrica é um risco.</p>

<h2>O que toda ficha de anamnese precisa ter</h2>
<p>Independentemente do procedimento, cinco blocos aparecem em qualquer ficha:</p>
<ol>
<li><strong>Identificação.</strong> Nome, data de nascimento, telefone, e-mail e, se a clínica emite recibo, CPF.</li>
<li><strong>Queixa principal.</strong> O que a paciente quer tratar e há quanto tempo, nas palavras dela.</li>
<li><strong>Histórico de saúde.</strong> Doenças crônicas, como diabetes e hipertensão; problemas de cicatrização, como queloide; doenças de pele; cirurgias recentes; gestação ou amamentação.</li>
<li><strong>Medicamentos e alergias.</strong> Uso de anticoagulantes, corticoides, isotretinoína ou ácidos tópicos, e alergias conhecidas a cosméticos, anestésicos ou látex.</li>
<li><strong>Hábitos.</strong> Exposição solar, uso de protetor, tabagismo, ingestão de água e rotina de cuidados em casa.</li>
</ol>

<h2>Perguntas específicas por tipo de procedimento</h2>
<p>O bloco que muda de uma ficha para outra é o de contraindicações. A tabela abaixo reúne pontos de atenção comuns; ela não substitui o protocolo técnico de cada equipamento nem a formação da profissional.</p>
<table>
<thead><tr><th>Procedimento</th><th>O que perguntar</th><th>Por quê</th></tr></thead>
<tbody>
<tr><td>Peeling químico</td><td>Uso de isotretinoína ou ácidos, gestação, herpes recorrente</td><td>Aumentam risco de irritação, mancha ou reativação do herpes</td></tr>
<tr><td>Laser e luz pulsada</td><td>Exposição solar recente, fotossensibilidade, medicamentos fotossensibilizantes</td><td>Pele bronzeada ou sensibilizada tem mais risco de queimadura e mancha</td></tr>
<tr><td>Radiofrequência e correntes</td><td>Marca-passo, implantes metálicos, gestação</td><td>São contraindicações clássicas de equipamentos elétricos</td></tr>
<tr><td>Microagulhamento</td><td>Queloide, uso de anticoagulante, acne inflamada ativa</td><td>Afetam cicatrização e sangramento</td></tr>
<tr><td>Drenagem e massagem</td><td>Trombose, varizes, problemas circulatórios</td><td>Podem contraindicar manobras em áreas específicas</td></tr>
</tbody>
</table>

<h2>Termo de consentimento: o que é e quando usar</h2>
<p>O termo de consentimento é o documento em que a paciente declara que recebeu as informações sobre o procedimento, entendeu os riscos e os cuidados necessários e autoriza a realização. Ele complementa a anamnese, não a substitui. Um termo claro descreve o procedimento em linguagem simples, lista os efeitos esperados e os possíveis efeitos adversos, explica os cuidados antes e depois e registra a autorização de uso de fotos, quando for o caso.</p>
<p>Para procedimentos invasivos ou realizados por profissionais de saúde regulamentados, confirme com o conselho da sua categoria se há modelo ou exigência específica.</p>

<h2>Fotos de evolução: autorização e organização</h2>
<p>A foto de antes e depois é a melhor prova de resultado que uma clínica tem, para a paciente e para a própria equipe. Duas regras evitam problema:</p>
<ul>
<li><strong>Autorização separada.</strong> Fotografar para acompanhar o tratamento é uma coisa; usar a foto em rede social é outra. Peça autorização específica para cada uso, por escrito.</li>
<li><strong>Padronização.</strong> Mesma luz, mesmo ângulo e mesma distância em todas as sessões. Sem isso, a comparação não mostra evolução, mostra a mudança de iluminação.</li>
</ul>

<h2>Anamnese e LGPD: dados de saúde são dados sensíveis</h2>
<p>A Lei Geral de Proteção de Dados (Lei 13.709/2018) classifica dados referentes à saúde como <strong>dados pessoais sensíveis</strong> (art. 5º, II). Quase tudo que uma anamnese estética pergunta, como doenças, medicamentos, gestação e alergias, entra nessa categoria. O art. 11 da lei define em que hipóteses esses dados podem ser tratados, entre elas o consentimento específico e destacado da titular e a tutela da saúde.</p>
<p>Na prática, para uma clínica de estética, isso se traduz em quatro cuidados:</p>
<ol>
<li><strong>Coletar só o necessário.</strong> Pergunte o que é relevante para o procedimento. Dado que não será usado não deve ser coletado.</li>
<li><strong>Informar a finalidade.</strong> A paciente precisa saber para que as informações servem e quem terá acesso a elas.</li>
<li><strong>Restringir o acesso.</strong> A ficha não deve circular em grupo de WhatsApp nem ficar em pasta aberta na recepção. Só quem atende precisa ver o histórico de saúde.</li>
<li><strong>Atender os pedidos da titular.</strong> A paciente pode pedir acesso, correção ou exclusão dos dados (art. 18). Com a ficha espalhada em papel, WhatsApp e galeria do celular, atender esse pedido é quase impossível.</li>
</ol>
<p>Este conteúdo é informativo e não substitui a orientação jurídica. Para o plano de adequação completo, converse com um advogado ou com o encarregado de dados da clínica.</p>

<h2>Papel ou digital: onde guardar a anamnese?</h2>
<p>A ficha de papel tem dois problemas práticos: some, e não acompanha a paciente. Quando ela volta seis meses depois para outro procedimento, alguém precisa encontrar a pasta, e a informação de um tratamento anterior raramente está à mão de quem atende. Já a ficha no WhatsApp resolve o acesso, mas cria um problema maior de privacidade, porque o dado de saúde fica no celular pessoal de cada profissional.</p>
<p>A anamnese digital resolve os dois lados. A paciente preenche e assina pelo celular antes da primeira sessão, e o documento fica na ficha dela, com data, junto com o termo e as fotos de evolução. Na <a href="/segmentos/clinicas-de-estetica">Cygna para clínicas de estética</a>, é isso que acontece: a anamnese, os pacotes de sessões e as fotos ficam no mesmo lugar, e a clínica define quem pode abrir cada informação.</p>

<h2>Checklist rápido da ficha de anamnese</h2>
<ul>
<li>Identificação e queixa principal nas palavras da paciente.</li>
<li>Histórico de saúde, medicamentos, alergias e hábitos.</li>
<li>Bloco de contraindicações específico do procedimento.</li>
<li>Termo de consentimento assinado, com riscos e cuidados.</li>
<li>Autorização separada para uso de fotos.</li>
<li>Armazenamento com acesso restrito, fora do WhatsApp e do papel solto.</li>
<li>Revisão da anamnese a cada novo protocolo ou quando a saúde da paciente mudar.</li>
</ul>
`,
  },

  /* ─────────────────────────────────────────────────────────── MANUTENÇÃO ── */
  {
    slug: "agenda-de-manutencao-de-cilios-e-unhas",
    status: "published",
    metaTitle: "Manutenção de cílios e unhas em gel: agenda de retorno",
    metaDescription:
      "Agenda de manutenção de cílios e unhas em gel: intervalos de retorno por técnica, como lembrar a cliente no WhatsApp e como organizar a semana sem buracos.",
    focusKeyword: "agenda de manutenção de cílios",
    titulo: "Agenda de manutenção de cílios e unhas em gel: como montar e não perder clientes",
    resumo:
      "Uma agenda de manutenção de cílios e unhas em gel funciona quando cada atendimento já termina com o próximo retorno previsto: 15 a 21 dias para extensão de cílios e 21 a 30 dias para alongamento e gel. O lembrete automático no WhatsApp, perto da data, faz a cliente voltar no prazo sem você precisar lembrar de ninguém.",
    categoria: "Autônomas",
    tags: ["manutenção de cílios", "unhas em gel", "lash designer", "nail designer", "agenda de retorno"],
    publicado: "2026-09-25",
    atualizado: "2026-09-25",
    imagem: "/images/para-quem/nail-designers.webp",
    imagemAlt: "Nail designer fazendo manutenção de alongamento em gel",
    segmento: "lash-e-nail-designers",
    html: `
<h2>Por que a manutenção é o coração do faturamento</h2>
<p>Para lash e nail designers, a cliente nova paga a aplicação, mas é a cliente recorrente que sustenta o mês. Extensão de cílios e unhas em gel têm prazo de validade natural: os cílios caem com o próprio ciclo de crescimento, e a unha cresce e afasta o material da cutícula. Isso cria um retorno previsível, e é justamente essa previsibilidade que permite planejar a agenda com semanas de antecedência.</p>
<p>O risco está no intervalo. Se a cliente volta tarde demais, a manutenção vira quase uma nova aplicação, leva mais tempo e o resultado fica pior. Se ela não volta, você perde uma cliente fiel sem perceber, porque ninguém avisa que desistiu.</p>

<h2>Qual o intervalo certo de manutenção?</h2>
<p>Os intervalos abaixo são referências de mercado. O prazo ideal depende da técnica, do material, do ciclo de crescimento de cada cliente e dos cuidados em casa, então vale ajustar cliente a cliente.</p>
<table>
<thead><tr><th>Serviço</th><th>Intervalo de manutenção</th><th>Sinal de que passou do prazo</th></tr></thead>
<tbody>
<tr><td>Extensão de cílios fio a fio</td><td>15 a 21 dias</td><td>Falhas visíveis e fios crescidos, afastados da raiz</td></tr>
<tr><td>Volume brasileiro ou russo</td><td>15 a 21 dias</td><td>Leques abertos ou tortos e perda de densidade</td></tr>
<tr><td>Lash lifting</td><td>45 a 60 dias</td><td>Curvatura se desfazendo com o crescimento dos fios</td></tr>
<tr><td>Alongamento em gel ou fibra</td><td>21 a 30 dias</td><td>Espaço grande perto da cutícula e ponto de apoio deslocado</td></tr>
<tr><td>Esmaltação em gel</td><td>21 a 28 dias</td><td>Crescimento aparente e bordas descolando</td></tr>
</tbody>
</table>

<h2>Como montar a agenda de retorno</h2>
<h3>1. Marque a próxima manutenção antes de a cliente sair</h3>
<p>O momento em que a cliente está mais disposta a marcar é quando acabou de ver o resultado. Sugira a data da manutenção no fim do atendimento, dentro do intervalo da técnica. Mesmo que ela prefira confirmar depois, a data sugerida fica registrada, e o lembrete tem uma referência.</p>
<h3>2. Configure o intervalo por técnica, não por cliente</h3>
<p>Comece com um intervalo padrão para cada serviço, por exemplo 18 dias para volume brasileiro e 25 dias para alongamento em gel, e ajuste só para as clientes que fogem do padrão. Assim o sistema faz a conta sozinho e você só intervém nas exceções.</p>
<h3>3. Lembre a cliente perto da data, com link para escolher o horário</h3>
<p>O lembrete de manutenção é diferente do lembrete de confirmação. O de confirmação chega na véspera de um horário já marcado; o de manutenção chega alguns dias antes do prazo ideal, com o link para a cliente escolher quando vem. Na <a href="/segmentos/lash-e-nail-designers">agenda da Cygna para lash e nail designers</a>, os dois saem sozinhos pelo WhatsApp.</p>
<h3>4. Guarde a ficha técnica de cada cliente</h3>
<p>Manutenção boa é manutenção igual à aplicação. Anote curvatura, espessura, comprimento e cola usados nos cílios, ou formato, técnica, cor e tamanho de tip nas unhas. Na próxima sessão, você repete o trabalho sem depender da memória nem da foto no celular.</p>

<h2>Como organizar a semana para não sobrar buraco</h2>
<p>Com os retornos previstos, dá para enxergar a semana antes de ela começar. Três práticas ajudam:</p>
<ul>
<li><strong>Blocos por tipo de serviço.</strong> Aplicações longas nos períodos em que você rende mais, e manutenções mais curtas nos intervalos. Isso evita terminar o dia com uma janela de 40 minutos em que nada cabe.</li>
<li><strong>Duração realista.</strong> Cadastre o tempo verdadeiro de cada técnica, incluindo preparo e limpeza. Uma agenda apertada no papel vira atraso em cascata na prática.</li>
<li><strong>Janela de encaixe.</strong> Deixe um horário por dia para reparos rápidos, como uma unha quebrada ou um leque caído. Ele protege o resto da agenda.</li>
</ul>

<h2>Quando a cliente some: como identificar e trazer de volta</h2>
<p>Uma cliente que costumava voltar a cada 18 dias e já está no dia 30 sem marcar provavelmente está indo para outra profissional ou desistiu do serviço. O sinal aparece na agenda, mas só se você olhar. Uma lista das clientes que passaram do prazo, revisada uma vez por semana, mostra quem precisa de uma mensagem pessoal, e não de um lembrete automático.</p>
<p>Nessa mensagem, evite o tom de cobrança. Perguntar se está tudo bem e oferecer um horário dentro da semana funciona melhor do que lembrar que "já passou da hora da manutenção".</p>

<h2>Sinal na manutenção: vale cobrar?</h2>
<p>Na aplicação, o sinal protege um horário longo reservado para uma cliente que ainda não te conhece. Na manutenção, a relação já existe, e muitas profissionais preferem não cobrar sinal das clientes frequentes. Um meio-termo comum é cobrar sinal na aplicação e das clientes que já faltaram, e dispensar das clientes com histórico de presença. O guia sobre <a href="/blog/como-reduzir-faltas-de-clientes-no-salao">como reduzir faltas de clientes</a> detalha como definir o valor e a regra de remarcação.</p>

<h2>Exemplo: quanto vale a cliente que volta no prazo</h2>
<p>Um <strong>exemplo</strong> de cálculo mostra o peso do retorno. Imagine uma lash designer com 40 clientes fixas de volume brasileiro, manutenção a cada 18 dias e ticket de R$ 120. Cada cliente faz cerca de 20 manutenções por ano, o que dá R$ 2.400 por cliente e R$ 96.000 no ano com a carteira inteira.</p>
<p>Agora suponha que, sem lembrete, cada cliente atrase em média uma semana por ciclo. O intervalo passa de 18 para 25 dias e o número de visitas cai para cerca de 14 por ano. São 6 manutenções a menos por cliente, ou cerca de R$ 28.800 a menos no ano, sem que nenhuma cliente tenha ido embora.</p>
<p>Os números mudam de negócio para negócio, mas a lógica vale também para unhas em gel: o atraso de cada retorno reduz o faturamento anual mesmo com a carteira intacta. Por isso, para quem atende sozinha, o lembrete de manutenção é um dos recursos que mais pesam no fim do mês.</p>

<h2>Resumo prático</h2>
<ul>
<li>Cílios: manutenção entre 15 e 21 dias; lash lifting entre 45 e 60 dias.</li>
<li>Unhas em gel: entre 21 e 30 dias, conforme a técnica.</li>
<li>Sugira a próxima data no fim de cada atendimento.</li>
<li>Configure o intervalo por técnica e ajuste só as exceções.</li>
<li>Lembrete de manutenção com link, alguns dias antes do prazo.</li>
<li>Ficha técnica atualizada a cada sessão.</li>
<li>Revise toda semana quem passou do prazo e mande uma mensagem pessoal.</li>
</ul>
`,
  },
];

export const postsPublicados = () => POSTS.filter((p) => p.status === "published");
export const getPost = (slug: string) => postsPublicados().find((p) => p.slug === slug);
export const postPath = (p: Pick<Post, "slug">) => `/blog/${p.slug}`;

/** Palavras úteis do post (resumo + corpo), para wordCount e tempo de leitura. */
export function contarPalavras(p: Post): number {
  const texto = `${p.resumo} ${p.html.replace(/<[^>]+>/g, " ")}`;
  return texto.split(/\s+/).filter(Boolean).length;
}
export const tempoLeitura = (p: Post) => Math.max(1, Math.round(contarPalavras(p) / 200));

/**
 * Tabelas do corpo do post: copia o texto de cada <th> para `data-label` dos
 * <td> da mesma coluna e marca a tabela para o CSS empilhar em cartões abaixo
 * de 600px (3+ colunas). Roda no render, então o HTML pré-renderizado já sai
 * pronto — nada depende de JavaScript no navegador.
 */
export function prepararTabelas(html: string): string {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, inner: string) => {
    const heads = [...inner.matchAll(/<th>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/"/g, "&quot;"));
    const body = inner.replace(/<tr>([\s\S]*?)<\/tr>/g, (row: string, cells: string) => {
      if (!cells.includes("<td>")) return row;
      let i = 0;
      return `<tr>${cells.replace(/<td>/g, () => `<td data-label="${heads[i++] ?? ""}">`)}</tr>`;
    });
    const cls = heads.length >= 3 ? "tabela-cygna tabela-empilha" : "tabela-cygna";
    return `<div class="tabela-wrap"><table class="${cls}">${body}</table></div>`;
  });
}
