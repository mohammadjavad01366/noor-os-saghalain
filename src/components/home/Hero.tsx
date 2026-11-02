import { type CSSProperties, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { StarGlyph } from "@/components/ui/Ornament";
import { useScrollScrubVideo } from "@/hooks/useScrollScrubVideo";

const VIDEO_SRC = "/videos/hero-scrub.mp4";
const FALLBACK_SRC = "/images/hero-architecture.jpg";

/** The hero track: the sticky viewport holds still for this much scroll. */
const TRACK_HEIGHT = "320vh";

/**
 * Text motion is pure CSS against `--hero-p` (the scroll progress the scrub
 * hook writes on the <section>). Opacity is clamped by the browser, so a
 * progress past the fade-out simply stays at 0.
 */
const textMotion: CSSProperties = {
  opacity: "calc(1 - var(--hero-p, 0) * 2.4)",
  transform: "translate3d(0, calc(var(--hero-p, 0) * -3rem), 0)",
};

const cueMotion: CSSProperties = {
  opacity: "calc(1 - var(--hero-p, 0) * 7)",
};

export function Hero() {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const { state, progress } = useScrollScrubVideo({
    src: VIDEO_SRC,
    sectionRef,
    videoRef,
    enabled: !reducedMotion,
  });

  const videoReady = state === "ready";

  return (
    <section
      className="relative isolate bg-teal-950"
      ref={sectionRef}
      style={reducedMotion ? undefined : { height: TRACK_HEIGHT }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {/* Layer 0 — the institution's own photograph: pre-roll, poster and fallback. */}
          <img
            alt="رواق‌های نورانی معماری ایرانی-اسلامی با کاشی‌کاری فیروزه‌ای"
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
            fetchPriority="high"
            src={FALLBACK_SRC}
          />

          {/* Layer 1 — the scroll-scrubbed clip. Paused forever: only currentTime moves. */}
          {!reducedMotion && (
            <video
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              disablePictureInPicture
              muted
              playsInline
              preload="auto"
              ref={videoRef}
              tabIndex={-1}
            />
          )}

          {/* Layer 2 — light scrims only: the footage stays the dominant element. */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/35 to-transparent [--tw-gradient-from-position:0%] [--tw-gradient-to-position:78%]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal-950/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(75%_75%_at_80%_110%,rgba(4,41,46,0.72),transparent_72%)]" />
          <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        </div>

        <div className="absolute inset-y-0 left-6 hidden items-center lg:flex">
          <div className="flex flex-col items-center gap-6">
            <span className="h-20 w-px bg-gradient-to-b from-transparent to-gold/50" />
            <span
              className="text-[10px] tracking-[0.6em] text-ivory/40"
              style={{ writingMode: "vertical-rl" }}
            >
              نورالثقلین
            </span>
            <span className="h-20 w-px bg-gradient-to-t from-transparent to-gold/50" />
          </div>
        </div>

        <div className="shell relative flex h-full flex-col justify-end pb-28 pt-32 sm:pb-32 lg:pb-36">
          <div className="max-w-3xl" style={textMotion}>
            <div className="flex animate-fade-in items-center gap-3 text-[11px] tracking-[0.3em] text-gold-300">
              <span className="h-px w-10 bg-gold/60" />
              <StarGlyph className="h-3 w-3" />
              <span>{content.hero.kicker}</span>
            </div>

            <h1 className="mt-6 animate-fade-in text-balance text-[2.1rem] font-bold leading-[1.45] text-ivory text-shadow-soft sm:text-[2.9rem] lg:text-[3.6rem]">
              {content.hero.headline}
            </h1>

            <div className="mt-7 max-w-xl animate-fade-in border-r-2 border-gold/50 pr-5 sm:mt-8">
              <p className="text-[15px] font-medium leading-8 text-gold-300/95 text-shadow-soft sm:text-[17px]">
                {content.brand.fullName}
              </p>
              <p className="mt-2 text-[13.5px] leading-7 text-ivory/85 text-shadow-soft sm:text-[15px]">
                {content.hero.subtitle}
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link className={actionClass("gold", "lg")} to="/about">
                {content.hero.primaryCta}
                <Icon
                  className="transition-transform duration-300 group-hover/btn:-translate-x-1"
                  name="arrow"
                  size={17}
                />
              </Link>
              <Link className={actionClass("outlineLight", "lg")} to="/quran">
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div
            className="mt-14 hidden items-center gap-8 border-t border-ivory/12 pt-6 text-[11.5px] text-ivory/55 sm:flex"
            style={textMotion}
          >
            <span className="flex items-center gap-2">
              <StarGlyph className="h-2.5 w-2.5 text-gold/70" />
              آموزش قرآن کریم
            </span>
            <span className="flex items-center gap-2">
              <StarGlyph className="h-2.5 w-2.5 text-gold/70" />
              تربیت اخلاقی
            </span>
            <span className="flex items-center gap-2">
              <StarGlyph className="h-2.5 w-2.5 text-gold/70" />
              رشد معنوی
            </span>
          </div>
        </div>

        {/* Layer 3 — minimal loading treatment while the clip is fetched. */}
        {!reducedMotion && !videoReady && state !== "failed" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex flex-col items-center gap-3 px-6 sm:bottom-28">
            <span className="text-[10px] tracking-[0.34em] text-ivory/55">آماده‌سازی نما</span>
            <span className="block h-px w-36 overflow-hidden bg-ivory/15 sm:w-44">
              <span
                className="block h-px bg-gold transition-[width] duration-500 ease-out"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </span>
          </div>
        )}

        <a
          aria-label="رفتن به بخش بعدی"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/45 transition-colors hover:text-gold-300 sm:flex"
          href="#about"
          style={cueMotion}
        >
          <span className="text-[10px] tracking-[0.28em]">ادامه</span>
          <span className="relative block h-12 w-px bg-ivory/20">
            <span className="animate-scroll-line absolute inset-0 bg-gold" />
          </span>
        </a>
      </div>
    </section>
  );
}
