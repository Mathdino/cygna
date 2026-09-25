import type { MouseEvent } from "react";
import { scrollToId } from "./scroll";

/**
 * Links do header e do rodapé são URLs reais ("/", "/#planos", "/blog"): o
 * crawler segue e funcionam em qualquer página. Só na home, um link "/#id"
 * cuja seção existe vira rolagem suave pelo ScrollSmoother em vez do salto
 * nativo (que não enxerga o conteúdo transformado).
 */
export function handleNavClick(href: string, after?: () => void) {
  return (e: MouseEvent) => {
    after?.();
    if (typeof window === "undefined" || window.location.pathname !== "/") return;
    const id = href === "/" ? "inicio" : href.startsWith("/#") ? href.slice(2) : "";
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    history.replaceState(null, "", id === "inicio" ? "/" : `/#${id}`);
    scrollToId(id);
  };
}
