import { useRef } from "react";
import { Link2, ListChecks, Wand2, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, DESKTOP_MOTION, MOTION } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ListChecks,
    title: "Cadastre seus serviços",
    text: "Preço, duração e quem atende. Leva uns 5 minutos — e nosso time ajuda pelo WhatsApp.",
  },
  {
    icon: Link2,
    title: "Coloque o link na bio",
    text: "Suas clientes escolhem serviço, dia e horário sozinhas, pelo Instagram ou WhatsApp.",
  },
  {
    icon: Wand2,
    title: "Deixe a Cygna trabalhar",
    text: "Confirmações, lembretes, sinal via Pix e financeiro acontecem no automático.",
  },
];

// Wave through three evenly spaced anchors (x = 200, 600, 1000) in a 1200×120 box.
const WAVE = "M200 60 C 330 -10 470 130 600 60 S 870 -10 1000 60";

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".how-wave", start: "top 75%", end: "top 25%", scrub: 1 },
        });
        tl.from(".how-path", { drawSVG: 0, duration: 1 }, 0)
          .from(".how-dot", { autoAlpha: 0, duration: 0.05 }, 0)
          .to(
            ".how-dot",
            { motionPath: { path: ".how-path", align: ".how-path", alignOrigin: [0.5, 0.5] }, duration: 1 },
            0
          );
        gsap.utils.toArray<HTMLElement>(".how-node").forEach((node, i) => {
          tl.from(node, { scale: 0.4, backgroundColor: "#ffffff", color: "#4A3F8F", duration: 0.12, ease: "back.out(3)" }, i * 0.5);
        });

        gsap.from(".how-step", {
          autoAlpha: 0,
          y: 40,
          stagger: 0.18,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".how-steps", start: "top 80%" },
        });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".how-line", {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: ".how-mobile", start: "top 70%", end: "bottom 60%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".how-mobile-step").forEach((step) => {
          gsap.from(step, { autoAlpha: 0, x: 30, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 80%" } });
        });
      });

      mm.add(MOTION, () => {
        gsap.from(".how-head > *", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          scrollTrigger: { trigger: ".how-head", start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-3 sm:px-4 ">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-14 sm:px-10 sm:py-20">
        <div className="how-head mx-auto max-w-2xl text-center">
          <GradientText className="text-[14px] font-semibold tracking-wide">
            Como funciona
          </GradientText>
          <StrokeTitle
            className="mt-5 t-display"
          >
            Do cadastro à agenda cheia em <span className="accent-italic">três passos</span>
          </StrokeTitle>
        </div>

        {/* Desktop: wave + nodes share one aspect-locked box so they stay aligned */}
        <div className="how-wave relative mt-16 hidden aspect-[10/1] w-full md:block" aria-hidden="true">
          <svg viewBox="0 0 1200 120" className="absolute inset-0 h-full w-full overflow-visible">
            <path d={WAVE} fill="none" stroke="#F3D6D2" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
            <path className="how-path" d={WAVE} fill="none" stroke="#4A3F8F" strokeWidth="3" strokeLinecap="round" />
            <circle className="how-dot" r="9" fill="#4A3F8F" stroke="#fff" strokeWidth="4" cx="200" cy="60" />
          </svg>
          {STEPS.map((s, i) => (
            <span
              key={s.title}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${((2 * i + 1) / 6) * 100}%` }}
            >
              <span className="how-node flex h-14 w-14 items-center justify-center rounded-full border-2 border-iris bg-iris text-white">
                <s.icon className="h-6 w-6" />
              </span>
            </span>
          ))}
        </div>

        <div className="how-steps mt-10 hidden grid-cols-3 gap-8 text-center md:grid">
          {STEPS.map((s, i) => (
            <div key={s.title} className="how-step">
              <span className="text-[13px] font-medium text-iris">Passo {i + 1}</span>
              <h3 className="mt-2 text-[22px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-tinta/70">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="how-mobile relative mt-12 flex flex-col gap-10 pl-16 md:hidden">
          <span className="absolute bottom-7 left-[27px] top-7 w-[2px] bg-rose" aria-hidden="true">
            <span className="how-line block h-full w-full origin-top bg-iris" />
          </span>
          {STEPS.map((s, i) => (
            <li key={s.title} className="how-mobile-step relative">
              <span className="absolute -left-16 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-iris text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="text-[13px] font-medium text-iris">Passo {i + 1}</span>
              <h3 className="mt-1 text-[20px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-tinta/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
