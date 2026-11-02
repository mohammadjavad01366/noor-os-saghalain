import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useContent } from "@/content/store";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { CornerFrame, OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";

export default function AboutPage() {
  const { content } = useContent();
  const { about, quranVerse } = content;

  usePageMeta("درباره مجموعه", about.description);

  const pillars = [
    { number: "۰۱", title: "ماموریت ما", text: about.mission },
    { number: "۰۲", title: "چشم‌انداز", text: about.vision },
    { number: "۰۳", title: "فلسفه تربیتی", text: about.philosophy },
  ];

  return (
    <>
      <PageHero
        breadcrumb="درباره مجموعه"
        description={about.description}
        eyebrow={about.eyebrow}
        title={about.title}
      />

      <section className="relative overflow-hidden bg-ivory py-20 lg:py-28">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.05]" />
        <div className="relative shell">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3 text-[10.5px] tracking-[0.3em] text-teal-800">
                <StarGlyph className="h-3 w-3 text-gold" />
                مسیر ما
              </div>
              <h2 className="mt-4 text-[1.6rem] font-bold leading-[1.6] text-teal-900 sm:text-[2rem]">
                آموزش قرآن، زمانی اثرگذار است که با تربیت همراه شود.
              </h2>
              <p className="mt-5 text-pretty text-[14px] leading-[2.15] text-teal-950/68">
                {about.description}
              </p>

              <div className="mt-10 space-y-6">
                {pillars.map((pillar, index) => (
                  <Reveal delay={index * 80} key={pillar.title}>
                    <div className="depth-card relative rounded-2xl border border-teal-900/10 bg-white/50 p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-[11.5px] text-gold">
                          {pillar.number}
                        </span>
                        <h3 className="text-[15px] font-semibold text-teal-900">{pillar.title}</h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-[2.05] text-teal-950/62">{pillar.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Reveal>
                <div className="arch-frame relative overflow-hidden border border-gold/40 bg-teal-950 p-[6px]">
                  <div className="arch-frame h-[380px] overflow-hidden">
                    <img
                      alt="معماری ایرانی-اسلامی با کاشی‌کاری فیروزه‌ای"
                      className="h-full w-full object-cover object-[50%_40%]"
                      loading="lazy"
                      src={asset("/images/hero-architecture.jpg")}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="relative rounded-2xl bg-teal-900 p-6 text-ivory">
                  <CornerFrame />
                  <StarGlyph className="h-4 w-4 text-gold" />
                  <p
                    className="mt-4 font-quran text-[1.3rem] leading-[2.2] text-ivory sm:text-[1.5rem]"
                    dir="rtl"
                    lang="ar"
                  >
                    {quranVerse.arabic}
                  </p>
                  <OrnamentDivider className="my-4" />
                  <p className="text-[12.5px] leading-7 text-ivory/70">{quranVerse.translation}</p>
                  <p className="mt-3 text-[11px] text-gold-300/80">
                    {quranVerse.surah} · آیه {quranVerse.ayah}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-teal-900/25" />
              <h2 className="text-[15px] font-semibold text-teal-900">ارزش‌های محوری مجموعه</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((value, index) => (
                <Reveal delay={index * 70} key={value.id}>
                  <div className="depth-card group h-full rounded-2xl border border-teal-900/10 bg-white/45 p-6 hover:border-gold/40 hover:bg-white/75">
                    <div className="flex items-center justify-between">
                      <StarGlyph className="h-4 w-4 text-gold" />
                      <span className="text-[10px] tracking-[0.2em] text-teal-900/25">
                        {["۰۱", "۰۲", "۰۳", "۰۴"][index]}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[14.5px] font-semibold text-teal-900">{value.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-6 text-teal-950/55">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <Link className={actionClass("solid", "md")} to="/quran">
              فعالیت‌های قرآنی
              <Icon name="arrow" size={16} />
            </Link>
            <Link className={actionClass("outlineDark", "md")} to="/contact">
              ارتباط با مجموعه
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
