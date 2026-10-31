type GlyphProps = { className?: string };

/** Eight-pointed star — the recurring geometric signature of the site. */
export function StarGlyph({ className = "" }: GlyphProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 1.6 15 8.9 22.4 12 15 15.1 12 22.4 9 15.1 1.6 12 9 8.9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.1"
      />
    </svg>
  );
}

/** Brand mark: a rub-el-hizb style star inside a fine gold ring. */
export function BrandMark({ className = "" }: GlyphProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" fill="none" />
      <circle cx="32" cy="32" r="25.5" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
      <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6">
        <path d="M32 9.5 39 24l15 1.3-11.4 10 3.4 14.7L32 42.4 18 50l3.4-14.7L10 25.3 25 24Z" />
      </g>
      <circle cx="32" cy="32" r="6.4" fill="none" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.1" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

/** Thin gold rule with a star at its centre. */
export function OrnamentDivider({ className = "", tone = "gold" }: GlyphProps & { tone?: "gold" | "dark" }) {
  const line = tone === "dark" ? "via-teal-900/25" : "via-gold/60";
  const star = tone === "dark" ? "text-teal-800/70" : "text-gold/80";

  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-4 ${className}`}>
      <span className={`h-px w-16 bg-gradient-to-l from-transparent ${line} to-transparent`} />
      <StarGlyph className={`h-3 w-3 ${star}`} />
      <span className={`h-px w-16 bg-gradient-to-r from-transparent ${line} to-transparent`} />
    </div>
  );
}

/** Corner bracket frame used on hero and feature panels. */
export function CornerFrame({ className = "", tone = "light" }: GlyphProps & { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "border-gold/45" : "border-teal-900/20";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`absolute right-0 top-0 h-10 w-10 border-r border-t ${color}`} />
      <span className={`absolute left-0 top-0 h-10 w-10 border-l border-t ${color}`} />
      <span className={`absolute bottom-0 right-0 h-10 w-10 border-b border-r ${color}`} />
      <span className={`absolute bottom-0 left-0 h-10 w-10 border-b border-l ${color}`} />
    </div>
  );
}
