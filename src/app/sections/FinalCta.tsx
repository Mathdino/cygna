import { useRef } from "react";
import { Check, ChevronRight, MessageCircle } from "lucide-react";
import { gsap, useGSAP, MOTION, FINE_POINTER } from "../lib/gsap";
import { CADASTRO_URL, SITE } from "../site/config";
import StrokeTitle from "../components/StrokeTitle";
import GradientText, { GRADIENT_DARK } from "../components/GradientText";

const WORDS = ["cílios", "unhas", "estética", "cabelos", "sobrancelhas", "suas clientes"];
const TRUST = ["14 dias grátis", "Sem cartão de crédito", "Suporte humano no WhatsApp"];

// Swan facing left in a 100×100 box (same silhouette as the hero squares)
const SWAN_BODY = "M30 78C30 95 80 98 94 80C99 72 100 60 96 50C90 58 86 62 80 60C72 46 52 44 44 62C40 70 34 72 30 78Z";
const SWAN_NECK = "M34 76C18 62 44 44 36 26C32 14 20 10 17 20";
const SWAN_WING = "M52 70C60 60 74 58 86 66";
const SWAN_BEAK = "M16 15L3 27L18 24Z";

/** Periodic wave strip: two identical halves so an xPercent: -50 loop is seamless. */
function wavePath(amp: number, wavelength: number, y: number, width = 2400, height = 100) {
  let d = `M0 ${y}`;
  for (let x = 0; x <= width; x += 20) {
    d += `L${x} ${(y + amp * Math.sin((x / wavelength) * Math.PI * 2)).toFixed(1)}`;
  }
  return `${d}L${width} ${height}L0 ${height}Z`;
}

const WAVES = [
  { d: wavePath(6, 400, 18), fill: "rgba(251,248,245,0.10)", speed: 26 },
  { d: wavePath(8, 600, 34), fill: "rgba(74,63,143,0.55)", speed: 38 },
  { d: wavePath(5, 300, 52), fill: "rgba(30,27,46,0.45)", speed: 18 },
];

// Deterministic "random" stars so SSR/StrictMode renders match
const STARS = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37.3) % 100}%`,
  top: `${4 + ((i * 53.7) % 48)}%`,
  size: 1 + (i % 3),
}));

function Swan({ reflection = false }: { reflection?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="block h-full w-full overflow-visible" aria-hidden="true">
      <g transform={reflection ? "matrix(1 0 0 -1 0 100)" : undefined}>
        <g className={reflection ? undefined : "swan-fill"} fill="#FBF8F5">
          <path d={SWAN_BODY} />
          <path d={SWAN_NECK} fill="none" stroke="#FBF8F5" strokeWidth="8.5" strokeLinecap="round" />
          <circle cx="19" cy="19" r="6" />
          <path d={SWAN_BEAK} fill="#FF7A59" />
        </g>
        {!reflection && (
          <>
            {/* Outline drawn on entry, before the fill fades in */}
            <path className="swan-draw" d={SWAN_BODY} fill="none" stroke="#FBF8F5" strokeWidth="1.2" />
            <path className="swan-draw" d={SWAN_NECK} fill="none" stroke="#FBF8F5" strokeWidth="1.2" strokeLinecap="round" />
            <path className="swan-wing" d={SWAN_WING} fill="none" stroke="#4A3F8F" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="21" cy="17" r="1.1" fill="#1E1B2E" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const el = root.current!;

      mm.add(MOTION, () => {
        const whileVisible = { trigger: el, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" };

        // Rotating word with scramble transition
        const word = el.querySelector<HTMLElement>(".cta-word")!;
        const cycle = gsap.timeline({ repeat: -1, scrollTrigger: whileVisible });
        WORDS.slice(1)
          .concat(WORDS[0])
          .forEach((w) => cycle.to(word, { duration: 0.9, scrambleText: { text: w, chars: "lowerCase", speed: 0.6 } }, "+=1.4"));

        // Entrance
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 70%" } })
          .from(".cta-inner > *", { autoAlpha: 0, y: 40, stagger: 0.12, duration: 0.9, ease: "power3.out" })
          .from(".cta-trust li", { autoAlpha: 0, y: 12, stagger: 0.1, duration: 0.5 }, "-=0.4")
          .from(".swan-draw", { drawSVG: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.2 }, 0.2)
          .from(".swan-fill", { autoAlpha: 0, duration: 0.8 }, 1.2)
          .to(".swan-draw", { autoAlpha: 0, duration: 0.6 }, 1.6)
          .from(".swan-wing", { drawSVG: 0, duration: 0.8 }, 1.5)
          .from(".swan-reflection", { autoAlpha: 0, duration: 1 }, 1.4)
          .from(".cta-moon", { scale: 0.4, autoAlpha: 0, duration: 1.2, ease: "power3.out" }, 0);

        gsap.from(".cta-box", {
          scale: 0.94,
          borderRadius: 80,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true },
        });

        // The swan glides across the lake, bobbing, trailing ripples
        const rig = el.querySelector<HTMLElement>(".swan-rig")!;
        const box = el.querySelector<HTMLElement>(".cta-box")!;
        gsap.fromTo(
          rig,
          { x: () => box.clientWidth + 40 },
          { x: () => -rig.offsetWidth - 40, duration: 34, ease: "none", repeat: -1, repeatRefresh: true, scrollTrigger: whileVisible }
        );
        gsap.to(".swan-bob", { y: -5, rotation: -1.5, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".swan-reflection", { skewX: 6, scaleY: 0.94, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.fromTo(
          ".wake",
          { scaleX: 0.2, scaleY: 0.2, autoAlpha: 0.55 },
          { scaleX: 1, scaleY: 1, autoAlpha: 0, duration: 3.2, ease: "sine.out", stagger: { each: 0.8, repeat: -1 } }
        );

        // Lake surface
        el.querySelectorAll<SVGSVGElement>(".wave").forEach((wave, i) => {
          gsap.to(wave, { xPercent: -50, duration: WAVES[i].speed, ease: "none", repeat: -1 });
        });

        // Night sky and moon reflection
        gsap.to(".star", {
          autoAlpha: "random(0.15, 0.9)",
          scale: "random(0.6, 1.3)",
          duration: "random(1.2, 3)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          stagger: { each: 0.08, from: "random" },
        });
        gsap.to(".moon-glint", {
          scaleX: "random(0.4, 1.2)",
          autoAlpha: "random(0.2, 0.8)",
          duration: "random(0.8, 1.6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          stagger: { each: 0.15, from: "random" },
        });
        gsap.to(".cta-moon", { boxShadow: "0 0 90px 30px rgba(243,214,210,0.45)", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      // Magnetic button
      mm.add(FINE_POINTER, () => {
        const btn = el.querySelector<HTMLElement>(".magnetic")!;
        const label = btn.querySelector<HTMLElement>(".magnetic-label")!;
        const bx = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
        const by = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
        const lx = gsap.quickTo(label, "x", { duration: 0.5, ease: "power3.out" });
        const ly = gsap.quickTo(label, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          bx(dx * 0.35);
          by(dy * 0.35);
          lx(dx * 0.15);
          ly(dy * 0.15);
        };
        const leave = () => gsap.to([btn, label], { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        return () => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root }
  );

  return (
    <section id="cta-final" ref={root} className="px-3 py-10 sm:px-4">
      <div
        className="cta-box relative overflow-hidden rounded-3xl text-center text-perola [--lake:200px] [--swan:150px] sm:[--lake:230px] sm:[--swan:210px]"
        style={{ background: "linear-gradient(180deg, #1E1B2E 0%, #2E2760 42%, #4A3F8F 72%, #3A3179 100%)" }}
      >
        {/* Sky */}
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star pointer-events-none absolute rounded-full bg-perola/70"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            aria-hidden="true"
          />
        ))}
        <span
          className="cta-moon pointer-events-none absolute right-[12%] top-12 h-14 w-14 rounded-full bg-rose sm:h-20 sm:w-20"
          style={{ boxShadow: "0 0 60px 18px rgba(243,214,210,0.3)" }}
          aria-hidden="true"
        />

        {/* Copy */}
        <div className="cta-inner relative z-10 mx-auto max-w-6xl px-6 pb-[calc(var(--lake)+70px)] pt-20 sm:pt-24">
          <GradientText as="p" className="text-[14px] font-semibold tracking-wide mx-auto" colors={GRADIENT_DARK}>
            Comece hoje, sem cartão
          </GradientText>
          <StrokeTitle className="mt-5 t-display" strokeColor="#F3D6D2" start="top 70%">
            Mais tempo para
            {/* Own line so the scrambling word never reflows the rest of the headline */}
            <span className="cta-word accent-italic block text-rose" data-stroke-skip>{WORDS[0]}</span>
            menos tempo no WhatsApp
          </StrokeTitle>
          <p className="mx-auto mt-5 text-[16px] leading-relaxed text-perola/80">
            Enquanto você atende, a Cygna confirma os horários, lembra suas clientes da manutenção.<br />Você cuida da beleza; o resto acontece sozinho.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CADASTRO_URL}
              className="btn magnetic inline-flex items-center gap-3 rounded-full bg-bico py-3 pl-8 pr-3 text-[15px] font-semibold text-tinta shadow-[0_20px_40px_-12px_rgba(255,122,89,0.6)]"
            >
              <span className="magnetic-label inline-flex items-center gap-3">
                Criar minha conta grátis
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tinta/10">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </span>
            </a>
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 rounded-full border border-perola/25 px-6 py-3 text-[15px] font-medium text-perola transition-colors hover:bg-perola/10"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com a gente
            </a>
          </div>
          <ul className="cta-trust mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-perola/75">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-rose" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Lake */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--lake)] overflow-hidden" aria-hidden="true">
          {WAVES.map((w, i) => (
            <svg key={i} className="wave absolute left-0 top-0 h-full w-[200%]" viewBox="0 0 2400 100" preserveAspectRatio="none">
              <path d={w.d} fill={w.fill} />
            </svg>
          ))}
          {/* Moon glints on the water, under the moon */}
          <div className="absolute right-[12%] top-6 flex w-20 flex-col items-center gap-2 sm:w-24">
            {[0, 1, 2, 3, 4].map((k) => (
              <span key={k} className="moon-glint block h-[2px] rounded-full bg-rose/70" style={{ width: `${90 - k * 14}%` }} />
            ))}
          </div>
        </div>

        {/* Swan rig: its bottom edge is the waterline */}
        <div
          className="swan-rig pointer-events-none absolute left-0 z-[5] w-[var(--swan)]"
          style={{ bottom: "calc(var(--lake) * 0.82 - var(--swan) * 0.06)", height: "var(--swan)", transform: "translateX(62vw)" }}
          aria-hidden="true"
        >
          <div className="swan-bob absolute inset-x-0 bottom-[-4%] h-full">
            <Swan />
          </div>
          <div className="swan-reflection absolute inset-x-0 top-[84%] h-full opacity-20 blur-[1px]" style={{ transformOrigin: "50% 0%" }}>
            <Swan reflection />
          </div>
          {[0, 1, 2, 3].map((k) => (
            <span
              key={k}
              className="wake absolute bottom-[-6%] left-[20%] h-[18%] w-[90%] rounded-[50%] border border-perola/40"
              style={{ transformOrigin: "30% 50%" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
