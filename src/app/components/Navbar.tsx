import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronRight, LogIn, Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MOTION, prefersReducedMotion } from "../lib/gsap";
import { handleNavClick } from "../lib/nav";
import { SEGMENTOS, segmentoPath } from "../data/segmentos";
import { CADASTRO_URL } from "../site/config";
import { Wordmark } from "./Logo";

type Item = {
  label: string;
  href: string;
  /** Seção da home que deixa este item ativo enquanto está na tela. */
  homeId?: string;
  /** Prefixo de rota que deixa o item ativo nas páginas internas. */
  match?: string;
  dropdown?: boolean;
};

/* Menu enxuto (GUIA TIER: até ~8 itens). "Segmentos" é hub com submenu montado
   do MESMO array que gera as páginas — segmento novo entra no menu sozinho. */
const ITEMS: Item[] = [
  { label: "Início", href: "/", homeId: "inicio" },
  { label: "Recursos", href: "/#recursos", homeId: "recursos" },
  { label: "Segmentos", href: "/segmentos", homeId: "para-quem", match: "/segmentos", dropdown: true },
  { label: "Empresa", href: "/empresa", match: "/empresa" },
  { label: "Planos", href: "/#planos", homeId: "planos" },
  { label: "Blog", href: "/blog", match: "/blog" },
  { label: "Contato", href: "/contato", match: "/contato" },
];

const SUB = SEGMENTOS.map((s) => ({ label: s.label, descricao: s.menuDescricao, href: segmentoPath(s), Icon: s.icon }));


/**
 * Fixed glass header, rendered outside the ScrollSmoother content.
 * - Hides while scrolling down, slides back in from the top on any scroll up.
 * - A sliding pill follows the hovered link and otherwise rests on the active item:
 *   the section in view on the home, the current route elsewhere.
 * - "Segmentos" opens a dropdown on hover/focus. Its links are always in the DOM
 *   (visibility is CSS), so crawlers follow them without simulating interaction.
 */
export default function Navbar({ path = "/" }: { path?: string }) {
  const isHome = path === "/";
  const routeActive = isHome ? 0 : ITEMS.findIndex((it) => it.match && path.startsWith(it.match));
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [active, setActive] = useState(routeActive);
  const header = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const linksRow = useRef<HTMLDivElement>(null);
  const dropTimer = useRef<number | undefined>(undefined);
  const openRef = useRef(open);
  const activeRef = useRef(active);
  openRef.current = open;
  activeRef.current = active;

  const { contextSafe } = useGSAP(
    () => {
      const el = header.current!;
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".nav-pill", { y: -30, autoAlpha: 0, scaleX: 0.86, duration: 0.8 })
          .from(".nav-logo", { clipPath: "inset(0% 100% 0% 0%)", duration: 0.7, ease: "power2.inOut" }, 0.25)
          .from(".nav-link", { y: -10, autoAlpha: 0, stagger: 0.06, duration: 0.45 }, 0.35)
          .from(".nav-login", { autoAlpha: 0, x: 8, duration: 0.45 }, 0.5);
      });

      // Headroom behaviour
      let hidden = false;
      const setHidden = (h: boolean) => {
        if (h === hidden) return;
        hidden = h;
        gsap.to(el, {
          yPercent: h ? -150 : 0,
          duration: prefersReducedMotion() ? 0 : h ? 0.35 : 0.55,
          ease: h ? "power2.in" : "power3.out",
          overwrite: "auto",
        });
      };
      ScrollTrigger.create({
        start: 0,
        end: "max",
        refreshPriority: -1,
        onUpdate: (self) => {
          const y = self.scroll();
          el.classList.toggle("is-scrolled", y > 40);
          if (openRef.current || y < 120) setHidden(false);
          else {
            setHidden(self.direction === 1);
            if (self.direction === 1) setDrop(false);
          }
        },
      });

      // On the home, the section in view drives the resting position of the pill
      if (isHome) {
        ITEMS.forEach((it, i) => {
          const section = it.homeId && document.getElementById(it.homeId);
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top 45%",
            end: "bottom 45%",
            refreshPriority: -1,
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      }

      const onResize = () => moveTo(activeRef.current, true);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: header }
  );

  const moveTo = contextSafe((i: number, instant = false) => {
    const link = linkRefs.current[i];
    const d = instant || prefersReducedMotion() ? 0 : 0.45;
    if (!link) {
      gsap.to(".nav-ind", { autoAlpha: 0, duration: d, overwrite: "auto" });
      return;
    }
    // offsetLeft is layout-based (immune to the intro's scale), but the dropdown trigger sits in its
    // own positioned wrapper, so add up offsets until the links row.
    let x = 0;
    for (let el: HTMLElement | null = link; el && el !== linksRow.current; el = el.offsetParent as HTMLElement | null) x += el.offsetLeft;
    gsap.to(".nav-ind", {
      x,
      width: link.offsetWidth,
      autoAlpha: 1,
      duration: d,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  // Rest on the active item; first placement is instant
  const placed = useRef(false);
  useGSAP(
    () => {
      moveTo(active, !placed.current);
      placed.current = true;
    },
    { dependencies: [active] }
  );

  // Mobile panel
  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(".mobile-panel", { autoAlpha: 0, y: -8, scale: 0.98, transformOrigin: "top center", duration: 0.3, ease: "power2.out" });
        gsap.from(".mobile-panel a", { autoAlpha: 0, x: -8, duration: 0.3, stagger: 0.04, delay: 0.05 });
      });
    },
    { scope: header, dependencies: [open] }
  );

  // Escape closes the dropdown and hands focus back to its trigger
  useEffect(() => {
    if (!drop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDrop(false);
      linkRefs.current[2]?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drop]);

  const showDrop = () => {
    window.clearTimeout(dropTimer.current);
    setDrop(true);
  };
  const hideDrop = () => {
    window.clearTimeout(dropTimer.current);
    dropTimer.current = window.setTimeout(() => setDrop(false), 140);
  };

  const close = () => setOpen(false);

  return (
    <header
      ref={header}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5"
    >
      <nav
        aria-label="Principal"
        className="nav-pill pointer-events-auto relative w-full max-w-[1240px] rounded-full border border-tinta/10 bg-white/80 py-2 pl-2 pr-2 sm:py-2.5 lg:py-3 lg:pl-3 lg:pr-3 shadow-sm backdrop-blur-xl transition-[box-shadow,background-color] duration-300"
      >
        {/* Three parts, justify-between: logo | nav | Entrar + CTA. The two outer parts share the leftover
            space equally (flex-1), so the nav sits in the true center of the bar. */}
        <div className="flex items-center justify-between gap-4 px-2">
          <a
            href="/"
            onClick={handleNavClick("/", close)}
            className="nav-logo flex flex-1 shrink-0 items-center pl-3 text-tinta"
            aria-label="Cygna — início"
          >
            <Wordmark className="text-[22px] sm:text-[24px] lg:text-[26px]" />
          </a>

          <div
            ref={linksRow}
            className="relative hidden items-center lg:flex"
            onMouseLeave={() => moveTo(activeRef.current)}
          >
            <span
              className="nav-ind invisible absolute inset-y-0 left-0 w-0 rounded-full bg-nevoa"
              aria-hidden="true"
            />
            {ITEMS.map((it, i) => {
              const current = active === i;
              const cls = `nav-link relative flex items-center gap-1 rounded-full px-2.5 py-2.5 text-[14px] xl:px-3.5 xl:text-[15px] transition-colors duration-300 ${
                current
                  ? "font-medium text-tinta"
                  : "text-tinta/65 hover:text-tinta"
              }`;
              const ref = (node: HTMLAnchorElement | null) => {
                linkRefs.current[i] = node;
              };

              if (!it.dropdown) {
                return (
                  <a
                    key={it.href}
                    ref={ref}
                    href={it.href}
                    onClick={handleNavClick(it.href)}
                    onMouseEnter={() => moveTo(i)}
                    aria-current={current && !isHome ? "page" : undefined}
                    className={cls}
                  >
                    {it.label}
                  </a>
                );
              }

              return (
                <div
                  key={it.href}
                  className="relative"
                  onMouseEnter={() => {
                    moveTo(i);
                    showDrop();
                  }}
                  onMouseLeave={hideDrop}
                  onFocus={showDrop}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node))
                      hideDrop();
                  }}
                >
                  <a
                    ref={ref}
                    href={it.href}
                    aria-haspopup="true"
                    aria-expanded={drop}
                    aria-current={current && !isHome ? "page" : undefined}
                    className={cls}
                  >
                    {it.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        drop ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </a>

                  {/* Bridge keeps the hover alive across the gap between trigger and panel */}
                  <div
                    data-open={drop}
                    className={`absolute left-1/2 top-full z-30 w-[400px] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ${
                      drop
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="rounded-3xl border border-tinta/10 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(30,27,46,0.4)]">
                      <ul className="flex flex-col">
                        {SUB.map(({ label, descricao, href, Icon }) => (
                          <li key={href}>
                            <a
                              href={href}
                              aria-current={path === href ? "page" : undefined}
                              className={`group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-perola ${
                                path === href ? "bg-perola" : ""
                              }`}
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nevoa text-iris transition-colors group-hover:bg-iris group-hover:text-white">
                                <Icon
                                  className="h-[18px] w-[18px]"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[14px] font-medium text-tinta">
                                  {label}
                                </span>
                                <span className="block text-[12.5px] text-tinta/60">
                                  {descricao}
                                </span>
                              </span>
                              <ChevronRight
                                className="ml-auto h-4 w-4 text-tinta/30 transition-transform group-hover:translate-x-0.5 group-hover:text-iris"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="/segmentos"
                        className="mt-1 flex items-center justify-between rounded-2xl bg-perola px-4 py-3 text-[13px] font-medium text-iris transition-colors hover:bg-nevoa"
                      >
                        Compare os segmentos
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            {/* The one highlighted action in the bar */}
            <a
              href={CADASTRO_URL}
              className="btn nav-login group inline-flex shrink-0 items-center gap-2 rounded-full bg-iris py-2 pl-4 pr-2 text-[14px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(74,63,143,0.7)] transition-transform hover:scale-[1.03] lg:py-2.5 lg:pl-5 lg:text-[15px]"
            >
              Entrar
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 lg:h-7 lg:w-7">
                <LogIn className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="flex h-9 w-9 items-center justify-center rounded-full text-tinta/90 hover:bg-nevoa lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="menu-mobile"
            className="mobile-panel absolute left-2 right-2 top-full z-20 mt-2 flex max-h-[calc(100dvh-6rem)] flex-col overflow-y-auto rounded-3xl border border-tinta/10 bg-white p-3 shadow-lg lg:hidden"
          >
            {ITEMS.map((it, i) => (
              <div key={it.href}>
                <a
                  href={it.href}
                  onClick={handleNavClick(it.href, close)}
                  className={`flex items-center gap-2 rounded-2xl px-3 py-2.5 text-[15px] ${
                    active === i
                      ? "bg-nevoa font-medium text-tinta"
                      : "text-tinta/80"
                  }`}
                >
                  {it.label}
                </a>
                {/* Submenu flattened on mobile: hiding pages behind an accordion inside a closed menu hides them twice */}
                {it.dropdown && (
                  <ul className="mb-1 ml-3 flex flex-col border-l border-tinta/10 pl-2">
                    {SUB.map(({ label, href, Icon }) => (
                      <li key={href}>
                        <a
                          href={href}
                          onClick={close}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[14px] ${
                            path === href
                              ? "font-medium text-iris"
                              : "text-tinta/75"
                          }`}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-nevoa text-iris">
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
