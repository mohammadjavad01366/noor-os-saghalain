import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  const { content } = useContent();

  return (
    <section className="relative isolate overflow-hidden bg-teal-950">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax className="absolute -inset-y-[12%] inset-x-0" limit={46} speed={0.07}>
          <img
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[50%_45%]"
            loading="lazy"
            src="/images/hero-architecture.jpg"
          />
        </Parallax>
      </div>
      <div className="absolute inset-0 -z-10 bg-teal-900/82" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-teal-950 via-teal-900/45 to-turquoise/35" />
      <div aria-hidden="true" className="pattern-star absolute inset-0 -z-10 opacity-[0.12]" />

      <div className="shell relative py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <OrnamentDivider />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-7 text-balance text-[1.75rem] font-bold leading-[1.6] text-ivory sm:text-[2.35rem]">
              {content.cta.title}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[13.5px] leading-[2.1] text-ivory/70 sm:text-[15px]">
              {content.cta.description}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link className={actionClass("gold", "lg")} to="/about">
                آشنایی بیشتر
                <Icon name="arrow" size={16} />
              </Link>
              <Link className={actionClass("outlineLight", "lg")} to="/contact">
                ارتباط با مجموعه
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
