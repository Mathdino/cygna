import { useRef, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { gsap, Flip, useGSAP, MOTION, prefersReducedMotion } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";
import { CADASTRO_URL, PLANOS, anualPorMes, brl, type PlanoId } from "../site/config";

type Plan = {
  name: string;
  tagline: string;
  /** Preço por mês (R$). */
  monthly: number;
  /** Valor total do plano anual (R$) — 2 meses grátis. */
  annual: number;
  features: string[];
  featured?: boolean;
};

const price = (id: PlanoId) => {
  const p = PLANOS.find((x) => x.id === id)!;
  return { monthly: p.mensal, annual: p.anual };
};

const PLANS: Plan[] = [
  {
    name: "Solo",
    tagline: "Para quem atende sozinha",
    ...price("autonoma"),
    features: [
      "1 profissional",
      "Agenda online + link na bio",
      "Lembretes no WhatsApp com mensagem pronta",
      "Ficha de clientes e lista de espera",
      "Vendas e recebimentos",
      "Financeiro básico",
    ],
  },
  {
    name: "Studio",
    tagline: "Para equipes pequenas",
    ...price("studio"),
    featured: true,
    features: [
      "Até 5 profissionais",
      "Tudo do Solo",
      "Comissões automáticas",
      "Pacotes de sessões, com compra pelo link",
      "Relatórios por serviço e profissional",
      "Equipe com cargos e logins próprios",
    ],
  },
  {
    name: "Premium",
    tagline: "Para clínicas e salões maiores",
    ...price("clinica"),
    features: [
      "Profissionais ilimitados",
      "Tudo do Studio",
      "Prontuário, anamnese, fotos de evolução e termos",
      "Estoque com lotes, validade e fornecedores",
      "Salas e equipamentos",
      "Acesso restrito por página para cada cargo",
    ],
  },
];

export default function Pricing() {
  const root = useRef<HTMLElement>(null);
  const [annual, setAnnual] = useState(false);
  const pillState = useRef<Flip.FlipState | null>(null);
  const shown = useRef<number[]>(PLANS.map((p) => p.monthly));

  // Entrance
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(".plan", {
          autoAlpha: 0,
          y: 80,
          rotateX: -18,
          transformPerspective: 1000,
          transformOrigin: "center top",
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".plans", start: "top 80%" },
        });
        gsap.from(".plan-feature", {
          autoAlpha: 0,
          x: -12,
          stagger: 0.03,
          duration: 0.4,
          delay: 0.5,
          scrollTrigger: { trigger: ".plans", start: "top 80%" },
        });
        gsap.from(".pricing-head > *", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          scrollTrigger: { trigger: ".pricing-head", start: "top 85%" },
        });
        gsap.to(".glow-border", { "--angle": "360deg", duration: 6, ease: "none", repeat: -1 });
      });
    },
    { scope: root }
  );

  // Toggle: FLIP the pill between buttons and count prices to their new values
  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      if (pillState.current && !reduced) {
        Flip.from(pillState.current, { targets: ".toggle-pill", duration: 0.45, ease: "power3.inOut" });
      }
      pillState.current = null;

      gsap.utils.toArray<HTMLElement>(".price").forEach((el, i) => {
        const target = annual ? anualPorMes(PLANS[i].annual) : PLANS[i].monthly;
        const state = { v: shown.current[i] };
        const write = () => {
          el.textContent = brl(state.v);
        };
        if (reduced || state.v === target) {
          state.v = target;
          write();
        } else {
          gsap.to(state, { v: target, duration: 0.6, ease: "power2.out", onUpdate: write });
          gsap.fromTo(el, { yPercent: annual ? -20 : 20 }, { yPercent: 0, duration: 0.5, ease: "back.out(2)" });
        }
        shown.current[i] = target;
      });
    },
    { scope: root, dependencies: [annual] }
  );

  const choose = (value: boolean) => {
    if (value === annual) return;
    pillState.current = Flip.getState(".toggle-pill");
    setAnnual(value);
  };

  return (
    <section id="planos" ref={root} className="px-3 sm:px-4 ">
      <div className="mx-auto max-w-6xl">
        <div className="pricing-head mx-auto max-w-6xl text-center">
          <GradientText className="text-[14px] font-semibold tracking-wide">
            Planos
          </GradientText>
          <StrokeTitle
            className="mt-5 t-display"
          >
            Preço de <span className="accent-italic">um atendimento</span> por mês
          </StrokeTitle>
          <p className="mt-4 text-[16px] text-tinta/70">14 dias grátis em qualquer plano. Sem cartão, sem fidelidade.</p>

          <div className="mt-8 inline-flex rounded-full bg-white p-1 shadow-sm" role="group" aria-label="Período de cobrança">
            {[
              { value: false, label: "Mensal" },
              { value: true, label: "Anual", extra: "2 meses grátis" },
            ].map((opt) => {
              const active = annual === opt.value;
              return (
                <button
                  key={opt.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(opt.value)}
                  className={`relative rounded-full px-6 py-2.5 text-[14px] transition-colors ${active ? "text-white" : "text-tinta/80"}`}
                >
                  {active && <span data-flip-id="pill" className="toggle-pill absolute inset-0 rounded-full bg-tinta" />}
                  <span className="relative flex items-center gap-2">
                    {opt.label}
                    {opt.extra && (
                      <span className="rounded-full bg-purple-400 px-2 py-0.5 text-[11px] font-semibold text-tinta">{opt.extra}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="plans mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`plan relative flex flex-col rounded-3xl p-7 sm:p-8 ${
                p.featured ? "glow-border text-white shadow-xl lg:-my-3 lg:py-11" : "border border-purple-200 bg-white"
              }`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-purple-400 px-3 py-1 text-[12px] font-semibold text-tinta">
                  Mais escolhido
                </span>
              )}
              <h3 className="text-[22px] font-semibold tracking-tight">{p.name}</h3>
              <p className={`mt-1 text-[14px] ${p.featured ? "text-white/60" : "text-tinta/60"}`}>{p.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1 overflow-hidden">
                <span className="text-[18px] font-medium">R$</span>
                <span className="price inline-block text-[44px] font-semibold leading-none tracking-tight sm:text-[52px]">{brl(p.monthly)}</span>
                <span className={`text-[14px] ${p.featured ? "text-white/60" : "text-tinta/60"}`}>/mês</span>
              </div>
              <p className={`mt-1 h-5 text-[12px] ${p.featured ? "text-white/60" : "text-tinta/60"}`}>
                {annual ? `R$ ${brl(p.annual)} cobrado por ano` : "cobrado mensalmente"}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="plan-feature flex items-center gap-3 text-[14px]">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        p.featured ? "bg-iris text-white" : "bg-rose text-iris"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={CADASTRO_URL}
                className={`btn mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-medium transition-transform hover:scale-[1.02] ${
                  p.featured ? "bg-perola text-tinta" : "bg-iris text-white"
                }`}
              >
                Começar 14 dias grátis
                <ChevronRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
