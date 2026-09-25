import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION } from "../lib/gsap";
import GradientText, { GRADIENT_DARK } from "../components/GradientText";

const SWAPS = [
  ["Agenda no caderno", "Agenda online 24h"],
  ["Cliente que falta sem avisar", "Lembrete automático no WhatsApp"],
  ["“Tem horário amanhã?” o dia inteiro", "Link de agendamento na bio"],
  ["Comissão na calculadora", "Comissões calculadas sozinhas"],
];

export default function Problem() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION, pinnable: "(min-width: 1024px) and (min-height: 700px)" }, (ctx) => {
        const { motion, pinnable } = ctx.conditions as { motion: boolean; pinnable: boolean };
        if (!motion) return;
        const split = SplitText.create(".manifesto", { type: "words" });

        // Desktop pins the panel; small screens scrub the same timeline while scrolling past.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: pinnable
            ? { trigger: root.current, start: "top top", end: "+=220%", pin: true, scrub: 0.8 }
            : { trigger: root.current, start: "top 75%", end: "bottom 70%", scrub: 0.8 },
        });

        tl.from(split.words, { opacity: 0.12, stagger: 0.1, duration: 0.5 })
          .from(".swap", { autoAlpha: 0, y: 40, stagger: 0.25, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .from(".swap-strike", { scaleX: 0, stagger: 0.35, duration: 0.5 }, ">-0.2")
          .to(".swap-pain", { opacity: 0.35, stagger: 0.35, duration: 0.5 }, "<")
          .from(".swap-fix", { autoAlpha: 0, x: -16, stagger: 0.35, duration: 0.5, ease: "power2.out" }, "<0.15")
          .to({}, { duration: 0.4 }); // brief hold before unpinning
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-3 sm:px-4">
      <div className="flex min-h-[calc(100vh-24px)] flex-col justify-center rounded-3xl bg-tinta px-6 py-16 text-perola sm:min-h-[calc(100vh-32px)] sm:px-12 lg:px-20">
        <GradientText className="text-[14px] font-semibold tracking-wide mb-6 self-start" colors={GRADIENT_DARK}>
          Soa familiar?
        </GradientText>
        <p
          className="manifesto max-w-5xl font-display"
          style={{ fontSize: "clamp(24px, 4.2vw, 48px)", lineHeight: 1.18, letterSpacing: "-0.02em", fontWeight: 500 }}
        >
          Você é ótima no que faz. Mas perde horas respondendo mensagem, anotando horário em caderno e correndo atrás de
          cliente que não apareceu. <span className="accent-italic text-rose">A CYGNA cuida da parte chata</span>{" "}
          — para você cuidar das suas clientes.
        </p>

        <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {SWAPS.map(([pain, fix]) => (
            <li key={pain} className="swap rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="swap-pain relative inline-block text-[14px] text-white/80">
                {pain}
                <span className="swap-strike absolute left-0 right-0 top-1/2 h-[2px] origin-left bg-bico" />
              </span>
              <span className="swap-fix mt-3 flex items-center gap-2 text-[15px] font-medium text-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
                  <Check className="h-3 w-3" />
                </span>
                {fix}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
