import { Link } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { StarGlyph } from "@/components/ui/Ornament";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: string;
};

export function PageHero({ eyebrow, title, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-teal-950 pb-16 pt-32 sm:pb-20 lg:pt-40">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_42%] opacity-30"
        src="/images/hero-architecture.jpg"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-950 via-teal-950/85 to-teal-950/70" />
      <div aria-hidden="true" className="pattern-star absolute inset-0 -z-10 opacity-[0.08]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent"
      />

      <div className="relative shell">
        <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[11px] text-ivory/45">
          <Link className="transition-colors hover:text-gold-300" to="/">
            صفحه اصلی
          </Link>
          <Icon className="rotate-180 text-ivory/25" name="arrow" size={12} />
          <span className="text-gold-300/80">{breadcrumb}</span>
        </nav>

        <div className="mt-7 flex items-center gap-3 text-[10.5px] tracking-[0.3em] text-gold-300">
          <span className="h-px w-8 bg-gold/50" />
          <StarGlyph className="h-2.5 w-2.5" />
          <span>{eyebrow}</span>
        </div>

        <h1 className="mt-5 max-w-3xl text-balance text-[1.9rem] font-bold leading-[1.5] text-ivory sm:text-[2.5rem] lg:text-[3rem]">
          {title}
        </h1>

        {description ? (
          <p className="mt-5 max-w-2xl text-pretty text-[13.5px] leading-[2.1] text-ivory/65 sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
