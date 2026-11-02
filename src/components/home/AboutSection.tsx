import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { CornerFrame, StarGlyph } from "@/components/ui/Ornament";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection() {
  const { content } = useContent();
  const { about } = content;

  const pillars = [
    { title: "ماموریت ما", text: about.mission },
    { title: "چشم‌انداز", text: about.vision },
    { title: "فلسفه تربیتی", text: about.philosophy },
  ];

  return (
    <section className="relative overflow-hidden bg-ivory py-20 lg:py-28" id="about">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.05]" />
      <Parallax className="pointer-events-none absolute -right-32 top-24 hidden lg:block" speed={0.07}>
        <StarGlyph className="h-80 w-80 text-gold/10" />
      </Parallax>

      <div className="relative shell">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={about.eyebrow}
              lead={about.description}
              title={about.title}
            />

            <div className="mt-10 space-y-7">
              {pillars.map((pillar, index) => (
                <Reveal delay={index * 90} key={pillar.title}>
                  <div className="group flex gap-5">
                    <div className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold/10">
                      <span className="text-[13px] font-semibold">
                        {["۰۱", "۰۲", "۰۳"][index]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-teal-900">{pillar.title}</h3>
                      <p className="mt-1.5 text-pretty text-[13.5px] leading-[2] text-teal-950/65">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link className={actionClass("outlineDark", "md")} to="/about">
                  بیشتر درباره مجموعه
                  <Icon name="arrow" size={16} />
                </Link>
                <Link
                  className="inline-flex items-center gap-2 text-[13.5px] font-medium text-teal-800 transition-colors hover:text-gold"
                  to="/goals"
                >
                  اهداف و رسالت
                  <Icon name="arrow" size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <div className="stage relative mx-auto w-full max-w-[430px]">
                <div aria-hidden="true" className="absolute -inset-3 rounded-t-full border border-gold/25" />
                <Parallax limit={44} speed={0.06}>
                  <div className="arch-frame layer relative overflow-hidden border border-gold/40 bg-teal-950 p-[6px]">
                    <div className="arch-frame h-[440px] overflow-hidden sm:h-[520px]">
                      <img
                        alt="نمای رواق‌های کاشی‌کاری‌شده مجموعه"
                        className="h-full w-full object-cover object-[50%_42%]"
                        loading="lazy"
                        src="/images/hero-architecture.jpg"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="depth-plate relative -mt-14 mr-4 w-[86%] max-w-[300px] rounded-2xl border border-gold/30 bg-ivory/95 p-5 backdrop-blur">
                    <CornerFrame tone="dark" />
                    <p className="flex items-center gap-2 text-[10px] tracking-[0.24em] text-teal-800">
                      <StarGlyph className="h-2.5 w-2.5 text-gold" />
                      دو یادگار گران‌بها
                    </p>
                    <p className="mt-3 text-[14px] font-semibold text-teal-900">قرآن کریم</p>
                    <div className="my-2.5 h-px w-full bg-teal-900/10" />
                    <p className="text-[14px] font-semibold text-teal-900">
                      اهل‌بیت علیهم‌السلام
                    </p>
                  </div>
                </Parallax>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-teal-900/10 bg-teal-900/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {about.values.map((value, index) => (
            <Reveal delay={index * 70} key={value.id}>
              <div className="group h-full bg-ivory p-6 transition-colors duration-500 hover:bg-white/70">
                <div className="flex items-center gap-2.5">
                  <StarGlyph className="h-3 w-3 text-gold" />
                  <h3 className="text-[14px] font-semibold text-teal-900">{value.title}</h3>
                </div>
                <p className="mt-2 text-[12.5px] leading-6 text-teal-950/55">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
