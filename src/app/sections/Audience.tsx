import { useRef, useState } from "react";
import { ArrowRight, Brush, Check, Eye, Hand, Scissors, Sparkles, UserRound, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP, DESKTOP_MOTION, MOBILE_MOTION, MOTION } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";

type Persona = {
  icon: LucideIcon;
  title: string;
  text: string;
  bullets: string[];
  next: { time: string; service: string; client: string };
  tone: string;
  /** Background photo. Drop the file in public/images/para-quem/ — until it exists the card keeps its gradient. */
  image: string;
};

const IMG = "/images/para-quem";

const PERSONAS: Persona[] = [
  {
    icon: Sparkles,
    title: "Clínicas de estética",
    text: "Protocolos, pacotes de sessões e evolução de cada paciente com fotos.",
    bullets: ["Pacotes com saldo de sessões", "Anamnese assinada no celular", "Salas e equipamentos na agenda"],
    next: { time: "09:00", service: "Limpeza de pele profunda", client: "Renata S." },
    tone: "from-rose to-perola",
    image: `${IMG}/clinicas-de-estetica.webp`,
  },
  {
    icon: Scissors,
    title: "Salões de beleza",
    text: "Vários profissionais, comissões e o caixa do dia em uma única tela.",
    bullets: ["Agenda por profissional", "Comissão calculada por serviço", "Venda de produtos no caixa"],
    next: { time: "10:30", service: "Coloração + escova", client: "Patrícia M." },
    tone: "from-nevoa to-perola",
    image: `${IMG}/saloes-de-beleza.webp`,
  },
  {
    icon: Eye,
    title: "Lash designers",
    text: "Manutenção a cada 15 dias? A Cygna lembra a cliente por você.",
    bullets: ["Retorno de manutenção automático", "Sinal via Pix contra faltas", "Ficha com curvatura e espessura"],
    next: { time: "14:00", service: "Volume brasileiro", client: "Ana Luiza" },
    tone: "from-rose to-nevoa",
    image: `${IMG}/lash-designers.webp`,
  },
  {
    icon: Hand,
    title: "Nail designers",
    text: "Agenda encaixada no minuto e catálogo de nail art direto no link.",
    bullets: ["Duração exata por técnica", "Galeria de trabalhos no link", "Lembrete de manutenção do gel"],
    next: { time: "15:30", service: "Alongamento em gel", client: "Beatriz C." },
    tone: "from-nevoa to-rose",
    image: `${IMG}/nail-designers.webp`,
  },
  {
    icon: Brush,
    title: "Sobrancelhas & micro",
    text: "Retoque de 30 dias já sai marcado junto com o procedimento.",
    bullets: ["Retoque agendado automaticamente", "Termo de consentimento digital", "Fotos de antes e depois"],
    next: { time: "16:45", service: "Design + henna", client: "Larissa P." },
    tone: "from-perola to-nevoa",
    image: `${IMG}/sobrancelhas-e-micro.webp`,
  },
  {
    icon: UserRound,
    title: "Autônomas",
    text: "Comece sozinha, pelo celular, e cresça sem trocar de sistema.",
    bullets: ["Tudo pelo celular", "Link na bio em 5 minutos", "Plano a partir de R$ 49"],
    next: { time: "18:00", service: "Pé e mão", client: "Fernanda O." },
    tone: "from-rose to-perola",
    image: `${IMG}/autonomas.webp`,
  },
];

/** Card photo that only shows once it actually loads; a missing file leaves the gradient untouched. */
function PersonaPhoto({ src, alt }: { src: string; alt: string }) {
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  if (state === "missing") return null;
  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setState("ok")}
        onError={() => setState("missing")}
        className={`persona-img pointer-events-none absolute inset-y-0 -left-[8%] h-full w-[116%] max-w-none object-cover object-top saturate-[.85] transition-opacity duration-700 ${
          state === "ok" ? "opacity-100" : "opacity-0"
        }`}
      />
      {state === "ok" && (
        <>
          {/* Photo stays clear in the top band; Pérola takes over where the text starts. */}
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-perola from-45% via-perola/85 via-60% to-perola/0 to-90%"
            aria-hidden="true"
          />
          {/* Soft top shade so the white number and icon chip read on bright photos. */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-tinta/35 to-transparent" aria-hidden="true" />
        </>
      )}
    </>
  );
}

export default function Audience() {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Same pinned horizontal scroll on every screen size; on phones each card also snaps to the centre.
      mm.add({ desktop: DESKTOP_MOTION, mobile: MOBILE_MOTION }, (ctx) => {
        const { mobile } = ctx.conditions!;
        const trackEl = track.current!;
        const panels = gsap.utils.toArray<HTMLElement>(".persona");
        gsap.set(scroller.current, { overflowX: "visible" });
        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

        // Pin just the card stage and keep it centred (slightly high, clear of the floating CTA).
        // If the stage is taller than the viewport, pin from its top instead so nothing is cut.
        const stage = root.current!.querySelector<HTMLElement>(".audience-stage")!;
        const start = () => (stage.offsetHeight > window.innerHeight * 0.9 ? "top top" : "center 46%");
        // Extra scroll the pin holds after the last card lands, so card 06 gets a beat before the page moves on.
        const hold = () => window.innerHeight * 0.6;

        // Pin first, on its own trigger, so it can outlast the horizontal scroll by `hold`.
        ScrollTrigger.create({
          trigger: stage,
          start,
          end: () => `+=${distance() + hold()}`,
          pin: true,
          invalidateOnRefresh: true,
        });

        // Scroll progress at which each card sits centred in the viewport
        const centred = () =>
          panels.map((panel) =>
            gsap.utils.clamp(0, 1, (panel.offsetLeft - trackEl.offsetLeft + panel.offsetWidth / 2 - window.innerWidth / 2) / (distance() || 1))
          );

        const scrollTween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none", // must be linear for containerAnimation
          scrollTrigger: {
            trigger: stage,
            start,
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phones: when scrolling stops mid-way, settle on the nearest centred card. Done by hand through the
        // smoother because ScrollTrigger's own `snap` fights ScrollSmoother here and throws the page to the top.
        let settle: (() => void) | undefined;
        if (mobile) {
          settle = () => {
            const st = scrollTween.scrollTrigger!;
            if (st.progress <= 0 || st.progress >= 1) return;
            const target = gsap.utils.snap(centred(), st.progress);
            if (Math.abs(target - st.progress) < 0.003) return;
            const y = st.start + target * (st.end - st.start);
            const smoother = ScrollSmoother.get();
            if (smoother) smoother.scrollTo(y, true);
            else window.scrollTo({ top: y, behavior: "smooth" });
          };
          ScrollTrigger.addEventListener("scrollEnd", settle);
        }

        gsap.to(".audience-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start,
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Each panel's contents are scrubbed by its own horizontal position. Scrub (not toggle
        // actions) keeps panels that are already on screen before the pin starts fully rendered.
        panels.forEach((panel) => {
          const opts = { containerAnimation: scrollTween, trigger: panel };
          // Finish the reveal at 55% of the viewport, or where the panel comes to rest if it never gets that far
          // (the last card stops short of 55%, which left its bullets half-faded).
          const revealEnd = () => {
            const restLeft = panel.offsetLeft - trackEl.offsetLeft - distance();
            return `left ${Math.max(window.innerWidth * 0.55, restLeft + 24)}px`;
          };
          gsap
            .timeline({ scrollTrigger: { ...opts, start: "left right", end: revealEnd, scrub: true } })
            .from(panel, { scale: 0.9, rotate: 2, ease: "none" }, 0)
            .from(panel.querySelector(".persona-icon"), { scale: 0.3, rotate: -90, ease: "none" }, 0)
            .from(panel.querySelectorAll(".persona-bullet"), { autoAlpha: 0, x: 40, stagger: 0.1, ease: "none" }, 0.2)
            .from(panel.querySelector(".persona-next"), { autoAlpha: 0, y: 40, rotate: 4, ease: "none" }, 0.4);

          const photo = panel.querySelector(".persona-img");
          if (photo) {
            gsap.fromTo(photo, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { ...opts, start: "left right", end: "right left", scrub: true } });
          }

          gsap.fromTo(
            panel.querySelector(".persona-num"),
            { xPercent: 40 },
            { xPercent: -40, ease: "none", scrollTrigger: { ...opts, start: "left right", end: "right left", scrub: true } }
          );
        });

        return () => {
          if (settle) ScrollTrigger.removeEventListener("scrollEnd", settle);
        };
      });

      mm.add(MOTION, () => {
        gsap.from(".audience-head > *", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          // Trigger on the section, not the head: the head sits inside the pinned element.
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="para-quem" ref={root} className="overflow-hidden">
      <div className="py-16 sm:py-20">
        <div className="audience-head mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <GradientText className="text-[14px] font-semibold tracking-wide">
            Para quem é
          </GradientText>
            <StrokeTitle
              className="mt-5 max-w-6xl t-display"
            >
              Um sistema, <span className="accent-italic">o seu jeito</span> de atender
            </StrokeTitle>
          </div>
          <p className="flex items-center gap-2 text-[14px] text-tinta/60">
            Role para conhecer <ArrowRight className="h-4 w-4" />
          </p>
        </div>

        <div className="audience-stage pt-6">
        <div className="mx-auto hidden h-[2px] w-full max-w-6xl px-6 md:block">
          <div className="h-full w-full bg-tinta/10">
            <div className="audience-progress h-full origin-left scale-x-0 bg-iris" />
          </div>
        </div>

        <div ref={scroller} className="no-scrollbar mt-8 snap-x snap-mandatory overflow-x-auto">
          <div ref={track} className="flex w-max gap-4 px-6 sm:gap-6">
            {PERSONAS.map((p, i) => (
              <article
                key={p.title}
                className={`persona relative flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${p.tone} p-6 shadow-[0_24px_50px_-30px_rgb(30_27_46/0.35)] ring-1 ring-tinta/[0.06] sm:w-[430px] sm:p-8`}
              >
                <PersonaPhoto src={p.image} alt={p.title} />
                <span
                  className="persona-num pointer-events-none absolute -right-4 -top-6 select-none text-[140px] font-semibold leading-none text-white/70 sm:text-[180px]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="persona-icon relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-iris shadow-sm">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-28 text-[26px] font-semibold tracking-tight uppercase">{p.title}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-tinta/80">{p.text}</p>
                <ul className="relative mt-5 flex flex-col gap-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="persona-bullet flex items-center gap-2 text-[14px] text-tinta/90">
                      <Check className="h-4 w-4 text-iris" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="persona-next relative mt-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <span className="rounded-xl bg-tinta px-3 py-2 text-[13px] font-semibold text-white">{p.next.time}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium">{p.next.service}</span>
                    <span className="block text-[12px] text-tinta/60">{p.next.client} · confirmado no WhatsApp</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
