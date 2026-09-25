import { useRef } from "react";
import { gsap, useGSAP, MOTION, countUp } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";

// Placeholder figures — replace with real product metrics before launch.
const STATS = [
  { value: 68, prefix: "-", suffix: "%", decimals: 0, label: "de faltas com lembrete automático no WhatsApp" },
  { value: 40, prefix: "+", suffix: "%", decimals: 0, label: "de clientes voltando no prazo de manutenção" },
  { value: 10, prefix: "", suffix: "h", decimals: 0, label: "economizadas por semana respondendo mensagens" },
  { value: 4.9, prefix: "", suffix: "", decimals: 1, label: "de nota média dada pelas profissionais" },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>(".stat").forEach((stat, i) => {
          const num = stat.querySelector<HTMLElement>("[data-count]")!;
          const st = { trigger: ".stats-grid", start: "top 80%" };
          countUp(num, { duration: 2, delay: i * 0.12, scrollTrigger: st });
          gsap.from(stat, { autoAlpha: 0, y: 40, duration: 0.8, delay: i * 0.12, ease: "power3.out", scrollTrigger: st });
          gsap.from(stat.querySelector(".stat-line"), {
            scaleX: 0,
            duration: 1.2,
            delay: 0.2 + i * 0.12,
            ease: "power3.inOut",
            scrollTrigger: st,
          });
        });

        // Soft glow drifts with scroll
        gsap.to(".stats-glow", {
          xPercent: 60,
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-3 sm:px-4">
      <div className="relative overflow-hidden rounded-3xl bg-tinta px-6 py-20 text-white sm:px-12 sm:py-28">
        <div
          className="stats-glow pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #4A3F8F 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <StrokeTitle
            className="stats-title max-w-6xl t-display"
          >
            Resultados que aparecem na agenda — e no caixa
          </StrokeTitle>
          <div className="stats-grid mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <span
                  data-count={s.value}
                  data-prefix={s.prefix}
                  data-suffix={s.suffix}
                  data-decimals={s.decimals}
                  className="block text-[56px] font-semibold leading-none tracking-tight sm:text-[64px]"
                >
                  {s.prefix}
                  {s.value.toLocaleString("pt-BR", { minimumFractionDigits: s.decimals })}
                  {s.suffix}
                </span>
                <span className="stat-line mt-5 block h-px origin-left bg-white/25" />
                <p className="mt-4 max-w-[240px] text-[14px] leading-relaxed text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
