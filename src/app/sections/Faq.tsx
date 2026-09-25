import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MOTION, DESKTOP_MOTION, prefersReducedMotion } from "../lib/gsap";
import StrokeTitle from "../components/StrokeTitle";
import GradientText from "../components/GradientText";
import { Glyph } from "../components/Logo";
import { FAQ_HOME as FAQS } from "../data/faq-home";

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  const { contextSafe } = useGSAP(
    () => {
      // First answer starts open
      gsap.set(".faq-panel", { height: 0 });
      gsap.set(".faq-panel-0", { height: "auto" });
      gsap.set(".faq-icon-0", { rotate: 45 });

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(".faq-item", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.07,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 85%" },
        });
      });
      mm.add(DESKTOP_MOTION, () => {
        gsap.from(".faq-brand", {
          autoAlpha: 0,
          scale: 0.85,
          rotate: -16,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 75%" },
        });
      });
    },
    { scope: root }
  );

  const toggle = contextSafe((i: number) => {
    const d = prefersReducedMotion() ? 0 : 0.45;
    const next = open === i ? null : i;
    if (open !== null) {
      gsap.to(`.faq-panel-${open}`, { height: 0, duration: d, ease: "power3.inOut" });
      gsap.to(`.faq-icon-${open}`, { rotate: 0, duration: d });
    }
    if (next !== null) {
      gsap.to(`.faq-panel-${next}`, {
        height: "auto",
        duration: d,
        ease: "power3.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.to(`.faq-icon-${next}`, { rotate: 45, duration: d });
    } else {
      gsap.delayedCall(d, () => ScrollTrigger.refresh());
    }
    setOpen(next);
  });

  return (
    <section id="duvidas" ref={root} className="px-3 sm:px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative">
          <GradientText className="text-[14px] font-semibold tracking-wide">
            Dúvidas
          </GradientText>
          <StrokeTitle
            className="mt-5 t-display"
          >
            Perguntas <span className="accent-italic">frequentes</span>
          </StrokeTitle>
          <p className="mt-4 max-w-sm text-[16px] text-tinta/70">
            Não achou o que procurava? Fale com a gente pelo WhatsApp — respondemos em minutos.
          </p>

          {/* Faded brand symbol fills the empty left column; that column only exists on desktop */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-4 hidden text-iris opacity-[0.1] lg:block">
            <Glyph className="faq-brand h-80 -rotate-6" />
          </div>
        </div>

        <ul className="faq-list flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <li key={f.q} className="faq-item rounded-2xl border border-tinta/10 bg-white">
              <button
                type="button"
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-medium"
              >
                {f.q}
                <span className={`faq-icon-${i} flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nevoa`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div id={`faq-${i}`} className={`faq-panel faq-panel-${i} overflow-hidden`}>
                <p className="px-6 pb-5 text-[15px] leading-relaxed text-tinta/70">{f.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
