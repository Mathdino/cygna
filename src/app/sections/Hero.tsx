import { useRef, useSyncExternalStore } from "react";
import { ChevronRight } from "lucide-react";
import DashboardPreview from "../components/DashboardPreview";
import BlinkingSquares from "../components/BlinkingSquares";
import { gsap, SplitText, useGSAP, MOTION } from "../lib/gsap";
import { CADASTRO_URL } from "../site/config";
import GradientText from "../components/GradientText";

const WIDE = "(min-width: 768px)";
const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Two swans facing each other across the headline
const SWANS = [
  { x: 0.13, y: 0.5, size: 0.42, flip: true },
  { x: 0.87, y: 0.42, size: 0.5 },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  // The swans need room beside the headline, so they only appear from tablet width up
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // Intro choreography (the navbar runs its own)
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
        tl.from(".hero-badge", { y: 12, autoAlpha: 0, duration: 0.5 }, 0.15)
          .from(".hero-sub", { y: 16, autoAlpha: 0 }, 0.55)
          .from(".hero-cta", { y: 16, autoAlpha: 0, scale: 0.96 }, 0.65)
          .from(".hero-note", { autoAlpha: 0 }, 0.8)
          .from(".dash-tray", { y: 120, autoAlpha: 0, duration: 1.1 }, 0.5)
          .from(".dash-card", { y: 40, autoAlpha: 0, stagger: 0.08 }, 0.75);

        SplitText.create(".hero-title", {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, { yPercent: 110, duration: 0.9, stagger: 0.07, ease: "power4.out", delay: 0.25 }),
        });
        // The swash draws itself under the promise once the words have landed
        tl.from(".hero-swash path", { drawSVG: "0%", duration: 0.9, ease: "power2.inOut" }, 0.95);

        // Scroll-out: gentle parallax only — nothing fades, so the CTA stays readable
        gsap
          .timeline({ scrollTrigger: { trigger: frame.current, start: "top top", end: "bottom top", scrub: true } })
          .to(".hero-copy", { y: -60, ease: "none" }, 0)
          .to(".hero-bg", { scale: 1.12, ease: "none" }, 0);
      });
    },
    { scope: root }
  );

  return (
    <div id="inicio" ref={root} className="w-full bg-perola">
      {/* Banner frame. Top padding leaves room for the fixed navbar; the bottom padding is
          where the dashboard overlaps the banner edge. */}
      <div
        ref={frame}
        className="relative w-full overflow-hidden rounded-2xl bg-white pb-[190px] pt-20 sm:rounded-3xl sm:pb-[230px] sm:pt-24"
      >
        <div className="hero-bg pointer-events-none absolute inset-0">
          {wide ? (
            <BlinkingSquares backgroundColor="#FFFFFF" gridSize={64} shape="swan" figures={SWANS} symmetric ambient={0.32} />
          ) : (
            <BlinkingSquares backgroundColor="#FFFFFF" />
          )}
        </div>

        <section className="hero-copy relative z-10 flex flex-col items-center px-4 pt-8 text-center sm:pt-12">
          <GradientText className="text-[14px] font-semibold tracking-wide hero-badge">
            Para clínicas, salões, lash e nail designers
          </GradientText>

          <h1
            className="hero-title mt-5 max-w-4xl text-tinta sm:mt-6"
            style={{ fontSize: "clamp(38px, 7.6vw, 76px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.035em" }}
          >
            Cuidamos da gestão
            <br />
            <span className="accent-italic font-normal text-iris">
              enquanto{" "}
              <span className="relative inline-block whitespace-nowrap">
                você atende.
                <svg
                  aria-hidden="true"
                  className="hero-swash pointer-events-none absolute -bottom-[0.14em] left-[2%] h-[0.3em] w-[96%] text-purple-500"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M4 16 C 90 5, 190 4, 290 10 S 380 18, 396 8"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-4 max-w-xl px-2 text-tinta/75 sm:mt-6" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
            Suas clientes marcam pelo link na bio, recebem lembrete no WhatsApp e confirmam com um toque. Leve na
            superfície, precisa nos bastidores — como um cisne.
          </p>

          <a
            href={CADASTRO_URL}
            className="btn hero-cta group mt-6 inline-flex items-center gap-3 rounded-full bg-tinta py-2 pl-6 pr-2 text-[14px] font-medium text-white transition-transform hover:scale-[1.02] sm:mt-8 sm:py-2.5 sm:pl-7"
          >
            Testar grátis por 14 dias
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 sm:h-7 sm:w-7">
              <ChevronRight className="h-4 w-4" />
            </span>
          </a>
          
        </section>
      </div>

      {/* Floats over the banner's bottom edge and the next section; it stays in normal
          flow below, so it never covers the content that follows. */}
      <div className="relative z-20 -mt-[160px] sm:-mt-[200px]">
        <DashboardPreview />
      </div>
    </div>
  );
}
