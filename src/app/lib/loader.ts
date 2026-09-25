/**
 * Swan preloader (markup + critical CSS live inline in index.html / page.html, so it paints
 * before any stylesheet). It covers the page until the app has mounted, the CSS is applied and
 * the web fonts are in — no flash of unstyled content, no font swap jump — then fades out.
 * Fonts get at most FONT_WAIT_MS: a slow font never holds the page hostage. The HTML keeps a
 * timed fallback too, so the loader can't stay up if this never runs.
 */
const FONT_WAIT_MS = 1500;
const FADE_MS = 450;

export function hideLoader() {
  const el = document.getElementById("cygna-loader");
  if (!el) return;
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const timeout = new Promise((r) => setTimeout(r, FONT_WAIT_MS));
  Promise.race([fonts, timeout]).then(() => {
    // Two frames: the first commits React's DOM, the second paints it with styles applied
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.classList.add("is-done");
        setTimeout(() => el.remove(), FADE_MS);
      })
    );
  });
}
