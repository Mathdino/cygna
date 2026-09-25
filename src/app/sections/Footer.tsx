import { useRef, type ComponentType } from "react";
import { Cookie, Mail } from "lucide-react";
import { Wordmark } from "../components/Logo";
import { gsap, useGSAP, MOTION } from "../lib/gsap";
import { handleNavClick } from "../lib/nav";
import { openCookiePreferences } from "../lib/consent";
import { SEGMENTOS, segmentoPath } from "../data/segmentos";
import { SITE } from "../site/config";
import { REDES_SOCIAIS } from "../site/social";

/* Rodapé em 4 colunas (GUIA TIER): marca + contato, e três colunas de links reais.
   Os segmentos saem do mesmo array das páginas; contatos e redes, do config —
   canal sem valor configurado simplesmente não aparece. */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Produto",
    links: [
      { label: "Recursos", href: "/#recursos" },
      { label: "Planos e preços", href: "/#planos" },
      { label: "Perguntas frequentes", href: "/#duvidas" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Segmentos",
    links: [...SEGMENTOS.map((s) => ({ label: s.label, href: segmentoPath(s) })), { label: "Comparar segmentos", href: "/segmentos" }],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre a Cygna", href: "/empresa" },
      { label: "Contato", href: "/contato" },
      { label: "Privacidade e Termos de uso", href: "/termos-e-privacidade" },
    ],
  },
];

// Redes (Instagram, LinkedIn, Facebook, YouTube, WhatsApp) saem de site/social.ts;
// o e-mail entra por último.
const CHANNELS: { label: string; href: string; Icon: ComponentType<{ className?: string }> }[] = [
  ...REDES_SOCIAIS,
  ...(SITE.contact.email ? [{ label: "E-mail", href: `mailto:${SITE.contact.email}`, Icon: Mail }] : []),
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(".wordmark-big", {
          yPercent: 105,
          duration: 1.1,
          ease: "power4.out",
          // The mark sits at the very bottom of the page, so key it off the footer
          // (its own top can land past max scroll and never fire).
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
        gsap.from(".footer-col", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.6,
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="overflow-hidden rounded-3xl bg-tinta px-6 pt-16 text-white sm:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="footer-col sm:col-span-2 md:col-span-1">
            <a href="/" onClick={handleNavClick("/")} aria-label="Cygna — início" className="inline-block">
              <Wordmark className="text-[28px] text-perola" />
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/60">
              Sistema de gestão e agendamento online para clínicas de estética, salões de beleza, lash e nail designers.
            </p>
            {SITE.contact.email && (
              <a href={`mailto:${SITE.contact.email}`} className="mt-4 inline-block text-[14px] text-white/80 transition-colors hover:text-white">
                {SITE.contact.email}
              </a>
            )}
            {CHANNELS.length > 0 && (
              <div className="mt-6 flex gap-3">
                {CHANNELS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title} className="footer-col">
              <h2 className="text-[13px] font-medium uppercase tracking-wider text-white/40">{c.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={handleNavClick(l.href)} className="text-[14px] text-white/80 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
                {c.title === "Empresa" && (
                  <li>
                    <button
                      type="button"
                      onClick={openCookiePreferences}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-left text-[14px] text-white/80 transition-colors hover:text-white"
                    >
                      <Cookie className="h-3.5 w-3.5" aria-hidden="true" />
                      Preferências de cookies
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.legal.razaoSocial || SITE.name}
            {SITE.legal.cnpj ? ` · CNPJ ${SITE.legal.cnpj}` : ""}. Todos os direitos reservados.
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="/mapa-do-site" className="transition-colors hover:text-white/80">
              Mapa do site
            </a>
            <span>Cuide de quem cuida.</span>
          </span>
        </div>

        <div className="mt-6 flex justify-center overflow-hidden pb-[3%]" aria-hidden="true">
          <Wordmark className="wordmark-big pointer-events-none select-none text-[clamp(58px,17vw,245px)] text-perola/[0.06]" />
        </div>
      </div>
    </footer>
  );
}
