import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { useContent } from "@/content/store";
import { Icon } from "@/components/ui/Icon";
import { CornerFrame, OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/home/CtaSection";

export default function Goals() {
  const { content } = useContent();
  const { about } = content;

  usePageMeta(
    "اهداف و رسالت",
    "اهداف، رسالت، چشم‌انداز و ارزش‌های مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین.",
  );

  const pillars = [
    { title: "رسالت ما", text: about.mission },
    { title: "چشم‌انداز", text: about.vision },
    { title: "فلسفه تربیتی", text: about.philosophy },
  ];

  return (
    <>
      <PageHero
        breadcrumb="اهداف و رسالت"
        description={about.description}
        eyebrow="چرایی و مسیر"
        title="اهداف و رسالت مجموعه"
      />

      <section className="relative overflow-hidden bg-ivory py-20 lg:py-28">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.045]" />
        <Parallax className="pointer-events-none absolute -left-24 top-16 hidden lg:block" speed={0.08}>
          <StarGlyph className="h-64 w-64 text-gold/12" />
        </Parallax>

        <div className="relative shell">
          <SectionHeading
            eyebrow="سه ستون مسیر"
            lead="مسیر مجموعه بر سه پایه روشن استوار است: آنچه بر عهده داریم، آنچه به سوی آن می‌رویم و روشی که در تربیت برمی‌گزینیم."
            title="رسالت، چشم‌انداز و روش تربیتی"
          />

          <div className="stage mt-12 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal delay={index * 90} key={pillar.title}>
                <article className="depth-card relative h-full overflow-hidden border border-teal-900/10 bg-white/60 p-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-4 font-quran text-[54px] leading-none text-gold/15"
                  >
                    {["۰۱", "۰۲", "۰۳"][index]}
                  </span>
                  <div className="flex items-center gap-2.5 text-teal-800">
                    <StarGlyph className="h-3 w-3 text-gold" />
                    <h3 className="text-[15px] font-semibold text-teal-900">{pillar.title}</h3>
                  </div>
                  <p className="mt-4 text-pretty text-[13.5px] leading-[2.1] text-teal-950/68">
                    {pillar.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-teal-900 py-20 text-ivory lg:py-28">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-turquoise/18 blur-[120px]"
        />
        <div className="relative shell">
          <SectionHeading
            eyebrow="ارزش‌های بنیادین"
            lead="ارزش‌هایی که در هر کلاس، هر محفل و هر رابطه آموزشی بازتاب می‌یابند."
            title="آنچه بر آن پافشاری می‌کنیم"
            tone="light"
          />

          <div className="stage mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <Reveal delay={index * 70} key={value.id}>
                <div className="depth-card depth-card-dark h-full rounded-2xl border border-ivory/12 bg-ivory/[0.045] p-6">
                  <div className="flex items-center gap-2.5">
                    <StarGlyph className="h-3 w-3 text-gold" />
                    <h3 className="text-[13.5px] font-semibold text-ivory">{value.title}</h3>
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-6 text-ivory/58">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <OrnamentDivider className="mt-14" />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.tracks.map((track, index) => (
              <Reveal delay={(index % 3) * 70} key={track.id}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-ivory/10 bg-teal-950/40 p-5 transition-colors duration-500 hover:border-gold/35">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors duration-500 group-hover:bg-gold/10">
                    <Icon name={track.icon} size={19} strokeWidth={1.3} />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-ivory">{track.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.95] text-ivory/55">
                      {track.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <CornerFrame tone="light" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
