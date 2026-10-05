/* =============================================================================
   CONFIGURAÇÃO DO SITE — fonte única da marca, do domínio e das integrações.

   Tudo que aparece no <head>, no JSON-LD, no sitemap, no robots.txt e no
   llms.txt sai daqui. Campo vazio ("") = recurso desligado: o gerador não
   emite a tag, o schema não recebe o campo e a interface esconde o botão.
   Nada de valor inventado para "preencher": dado falso no schema é pior do
   que dado ausente.
   ========================================================================== */

type Contato = { email: string; whatsapp?: string };
type Social = Partial<Record<"instagram" | "linkedin" | "facebook" | "youtube", string>>;

export const SITE = {
  name: "Cygna",
  /** Domínio de produção, sem barra no fim. Sem www: a Vercel redireciona www → cygna.com.br. */
  url: "https://cygna.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  tagline: "A plataforma de agendamentos para o seu negócio de beleza",
  description:
    "Cygna é o sistema de gestão e agendamento online para clínicas de estética, salões de beleza, lash e nail designers: agenda 24h, WhatsApp, Pix e financeiro.",
  ogImage: "/og/cygna-og.png",
  logo: "/brand/cygna-symbol-512.png",
  themeColor: "#4A3F8F",

  /* Contato — só aparece no site/schema quando preenchido. */
  contact: {
    /** TODO: confirmar a caixa de e-mail oficial. */
    email: "contato@cygna.com.br",
    /** Só dígitos, com DDI e DDD (ex.: 5511999999999). Descomente e preencha para ligar o
        WhatsApp no rodapé, no contato (card + envio do formulário), no schema e no llms.txt. */
    // whatsapp: "5511999999999",
  } as Contato,

  /* Redes sociais — aparecem no rodapé, na página de contato e no schema (sameAs).
     Para ativar uma rede, descomente a linha e coloque a URL completa do perfil.
     TODO: instagram/linkedin estão com URL provisória — confirmar os perfis reais antes de publicar. */
  social: {
    instagram: "https://www.instagram.com/cygna.app",
    linkedin: "https://www.linkedin.com/company/cygna",
    // facebook: "https://www.facebook.com/cygna",
    // youtube: "https://www.youtube.com/@cygna",
  } as Social,

  /* Dados jurídicos exibidos em Termos e privacidade. TODO: preencher antes de publicar. */
  legal: {
    razaoSocial: "",
    cnpj: "",
    /** E-mail do encarregado de dados (DPO), art. 41 da LGPD. Vazio = usa o e-mail de contato. */
    dpoEmail: "",
  },

  /* Integrações — ID vazio = script/tag não é emitido. */
  analytics: {
    /** Google Analytics 4 (G-XXXXXXX). */
    ga4: "G-VDMGDFCCH4",
  },
  verification: {
    /** Conteúdo da meta google-site-verification (Search Console, método "tag HTML"). */
    google: "",
    /** Conteúdo da meta msvalidate.01 (Bing Webmaster Tools). */
    bing: "",
  },

  /** Temas que ancoram a marca (Organization.knowsAbout) — o que a Cygna domina de fato. */
  knowsAbout: [
    "Sistema de agendamento online",
    "Software de gestão para clínica de estética",
    "Sistema para salão de beleza",
    "Agenda para lash designer",
    "Agenda para nail designer",
    "Lembrete de agendamento por WhatsApp",
    "Sinal de agendamento via Pix",
    "Anamnese digital",
    "Comissão de profissionais de beleza",
    "LGPD em clínicas de estética",
  ],
} as const;

export type SiteConfig = typeof SITE;

/**
 * Planos exibidos na home (seção Planos). Mesmo valor em todo lugar que cita preço.
 * mensal = preço por mês; anual = valor total cobrado por ano (plano anual = 2 meses grátis).
 */
export const PLANOS = [
  {
    id: "autonoma",
    nome: "Solo",
    mensal: 39.9,
    anual: 399.9,
    resumo: "1 profissional, agenda online com link na bio, lembretes no WhatsApp com mensagem pronta, ficha de clientes, lista de espera, vendas e financeiro básico.",
  },
  {
    id: "studio",
    nome: "Studio",
    mensal: 99.9,
    anual: 990.9,
    resumo: "Até 5 profissionais, comissões automáticas, pacotes de sessões com compra pelo link, relatórios por serviço e profissional e equipe com cargos e logins próprios.",
  },
  {
    id: "clinica",
    nome: "Premium",
    mensal: 219.9,
    anual: 2190.9,
    resumo: "Profissionais ilimitados, prontuário com anamnese, fotos de evolução e termos, estoque com lotes e validade, salas e equipamentos e acesso restrito por cargo.",
  },
] as const;

/** Valor em reais no formato brasileiro, sem o "R$": 39.9 → "39,90"; 2190.9 → "2.190,90". */
export const brl = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Quanto o plano anual sai por mês (arredondado ao centavo): 399,90/ano → 33,33. */
export const anualPorMes = (anual: number) => Math.round(Math.round(anual * 100) / 12) / 100;

export type PlanoId = (typeof PLANOS)[number]["id"];

export const TESTE_GRATIS_DIAS = 14;
