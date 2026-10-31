import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { StarGlyph } from "./Ornament";

type Tone = "dark" | "light";
type Align = "start" | "center";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: Align;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "start",
  children,
}: SectionHeadingProps) {
  const isLight = tone === "light";
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <Reveal>
          <div
            className={`flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] ${
              isLight ? "text-gold-300" : "text-teal-800"
            } ${centered ? "justify-center" : ""}`}
          >
            <span
              className={`h-px w-8 ${isLight ? "bg-gold/60" : "bg-teal-900/30"}`}
              aria-hidden="true"
            />
            <span className="uppercase">{eyebrow}</span>
            <StarGlyph className={`h-2.5 w-2.5 ${isLight ? "text-gold/80" : "text-gold"}`} />
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={80}>
        <h2
          className={`mt-4 text-balance text-[1.7rem] font-bold leading-[1.55] sm:text-[2.1rem] lg:text-[2.55rem] ${
            isLight ? "text-ivory" : "text-teal-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={140}>
          <p
            className={`mt-4 max-w-2xl text-pretty text-[15px] leading-[2.05] ${
              isLight ? "text-ivory/72" : "text-teal-950/68"
            } ${centered ? "mx-auto" : ""}`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
