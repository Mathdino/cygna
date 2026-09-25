/*
 * Official Cygna artwork (public/brand). The wordmark PNG is white-on-transparent,
 * so it's used as a CSS mask: the visible color is `currentColor`, which lets the
 * same file render in Tinta, Pérola or any brand color.
 */
const WORDMARK_SRC = "/brand/cygna-wordmark.png";
const WORDMARK_RATIO = 1000 / 269;

/** Lowercase wordmark. Its height is 1em — size it with font-size (e.g. text-[20px]). */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Cygna"
      className={`inline-block shrink-0 bg-current align-middle ${className}`}
      style={{
        height: "1em",
        aspectRatio: WORDMARK_RATIO,
        WebkitMask: `url(${WORDMARK_SRC}) center / contain no-repeat`,
        mask: `url(${WORDMARK_SRC}) center / contain no-repeat`,
      }}
    />
  );
}

const GLYPH_SRC = "/brand/cygna-g.png";
const GLYPH_RATIO = 238 / 290;

/** The swan "g" alone (no tile), masked like the wordmark so it takes `currentColor`. Size it by height. */
export function Glyph({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        aspectRatio: GLYPH_RATIO,
        WebkitMask: `url(${GLYPH_SRC}) center / contain no-repeat`,
        mask: `url(${GLYPH_SRC}) center / contain no-repeat`,
      }}
    />
  );
}

/** App icon / avatar: swan "g" on an Íris rounded square. */
export function Symbol({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src="/brand/cygna-symbol-192.png"
      srcSet="/brand/cygna-symbol-192.png 192w, /brand/cygna-symbol-512.png 512w"
      sizes="64px"
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
    />
  );
}
