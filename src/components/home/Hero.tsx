import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { StarGlyph } from "@/components/ui/Ornament";

export function Hero() {
  const { content } = useContent();
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const offset = Math.min(window.scrollY, 900);
        if (imageRef.current) {
          imageRef.current.style.transform = `translate3d(0, ${offset * 0.18}px, 0) scale(1.04)`;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-teal-950">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 will-change-transform" ref={imageRef}>
          <img
            alt="رواق‌های نورانی معماری ایرانی-اسلامی با کاشی‌کاری فیروزه‌ای"
            className="h-[112%] w-full object-cover object-[50%_38%]"
            fetchPriority="high"
            src="/images/hero-architecture.jpg"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/55 to-teal-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_75%_5%,rgba(8,126,131,0.32),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_70%_at_25%_105%,rgba(197,154,90,0.22),transparent_70%)]" />
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.06]" />
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

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-28 pt-32 sm:pb-32 lg:pb-36">
        <div className="max-w-3xl">
          <div className="flex animate-fade-in items-center gap-3 text-[11px] tracking-[0.3em] text-gold-300">
            <span className="h-px w-10 bg-gold/60" />
            <StarGlyph className="h-3 w-3" />
            <span>{content.hero.kicker}</span>
          </div>

          <h1 className="mt-6 animate-fade-in text-balance text-[2.1rem] font-bold leading-[1.45] text-ivory text-shadow-soft sm:text-[2.9rem] lg:text-[3.6rem]">
            {content.hero.headline}
          </h1>

          <div className="mt-7 max-w-xl animate-fade-in border-r-2 border-gold/50 pr-5 sm:mt-8">
            <p className="text-[15px] font-medium leading-8 text-gold-300/95 sm:text-[17px]">
              {content.brand.fullName}
            </p>
            <p className="mt-2 text-[13.5px] leading-7 text-ivory/70 sm:text-[15px]">
              {content.hero.subtitle}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link className={actionClass("gold", "lg")} to="/about">
              {content.hero.primaryCta}
              <Icon className="transition-transform duration-300 group-hover/btn:-translate-x-1" name="arrow" size={17} />
            </Link>
            <Link className={actionClass("outlineLight", "lg")} to="/quran">
              {content.hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="mt-14 hidden items-center gap-8 border-t border-ivory/12 pt-6 text-[11.5px] text-ivory/55 sm:flex">
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

      <a
        aria-label="رفتن به بخش بعدی"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/45 transition-colors hover:text-gold-300 sm:flex"
        href="#about"
      >
        <span className="text-[10px] tracking-[0.28em]">ادامه</span>
        <span className="relative block h-12 w-px bg-ivory/20">
          <span className="animate-scroll-line absolute inset-0 bg-gold" />
        </span>
      </a>
    </section>
  );
}
