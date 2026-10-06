import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Symbol } from "./Logo";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { CADASTRO_URL } from "../site/config";

/** Fixed UI that lives outside the ScrollSmoother content (fixed elements can't be transformed parents' children). */
export default function Overlays() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const setProgress = gsap.quickSetter(".scroll-progress", "scaleX");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        refreshPriority: -1,
        onUpdate: (self) => setProgress(self.progress),
      });

      const bar = ".floating-cta";
      gsap.set(bar, { yPercent: 160, autoAlpha: 0 });
      ScrollTrigger.create({
        // Page-level ids live outside this component's scope, so pass the elements directly.
        trigger: document.getElementById("inicio"),
        start: "bottom 30%",
        endTrigger: document.getElementById("cta-final"),
        end: "top bottom",
        // Created outside the page flow, so refresh after every pin spacer is in place.
        refreshPriority: -1,
        onToggle: (self) =>
          gsap.to(bar, {
            yPercent: self.isActive ? 0 : 160,
            autoAlpha: self.isActive ? 1 : 0,
            duration: prefersReducedMotion() ? 0 : 0.5,
            ease: self.isActive ? "back.out(1.6)" : "power2.in",
            overwrite: true,
          }),
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
        <div className="scroll-progress h-full origin-left scale-x-0 bg-iris" />
      </div>

      <div className="floating-cta invisible fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
        <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-tinta/10 bg-white/90 py-2 pl-3 pr-2 shadow-lg backdrop-blur">
          <Symbol className="h-8 w-8 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-[13px] sm:text-[14px]">
            <strong className="font-semibold">14 dias grátis</strong>
          </span>
          <a
            href={CADASTRO_URL}
            className="btn inline-flex shrink-0 items-center gap-1.5 rounded-full bg-iris py-2 pl-4 pr-2 text-[13px] font-medium text-white"
          >
            Começar
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
