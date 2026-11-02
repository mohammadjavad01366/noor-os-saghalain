import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { ActivityStatusPill } from "@/components/ui/ActivityStatusPill";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ActivitiesPreview() {
  const { content } = useContent();
  const [featured, ...rest] = content.activities;

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden bg-midnight py-20 text-ivory lg:py-28">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.07]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent"
      />

      <div className="relative shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="فعالیت‌ها و برنامه‌ها"
            lead="از محافل قرآنی و دوره‌های آموزشی تا نشست‌های تربیتی و برنامه‌های فرهنگی؛ برنامه‌های مجموعه در طول سال جریان دارند."
            title="فعالیت‌ها و برنامه‌های مجموعه"
            tone="light"
          />
          <Reveal delay={120}>
            <Link className={actionClass("outlineLight", "md")} to="/activities">
              همه فعالیت‌ها
              <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Link
              className="depth-card depth-card-dark group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ivory/12 bg-teal-950/40 hover:border-gold/35"
              to={`/activities/${featured.slug}`}
            >
              <div className="relative h-64 overflow-hidden sm:h-72">
                <ArtPlate
                  alt={featured.title}
                  className="transition-transform duration-[1.2s] group-hover:scale-105"
                  visual={featured.visual}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="rounded-full bg-teal-950/70 px-3 py-1 text-[10.5px] text-ivory/80 backdrop-blur">
                    {featured.category}
                  </span>
                  <ActivityStatusPill status={featured.status} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-ivory/45">
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" size={13} />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" size={13} />
                    {featured.time}
                  </span>
                </div>
                <h3 className="mt-3 text-[19px] font-semibold leading-8 text-ivory transition-colors group-hover:text-gold-300">
                  {featured.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-[2] text-ivory/58">
                  {featured.description}
                </p>
                <span className="mt-5 flex items-center gap-2 text-[12.5px] text-gold-300">
                  جزئیات و ثبت‌نام
                  <Icon
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                    name="arrow"
                    size={15}
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col">
            {rest.map((activity, index) => (
              <Reveal delay={index * 70} key={activity.id}>
                <Link
                  className="group flex items-center gap-4 border-b border-ivory/10 py-4 first:pt-0"
                  to={`/activities/${activity.slug}`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-ivory/10">
                    <ArtPlate alt="" visual={activity.visual} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10.5px] text-gold/70">
                      <StarGlyph className="h-2 w-2" />
                      <span>{activity.category}</span>
                      <span className="text-ivory/25">·</span>
                      <span className="text-ivory/40">{activity.date}</span>
                    </div>
                    <h3 className="mt-1 truncate text-[14px] font-medium text-ivory/85 transition-colors group-hover:text-gold-300">
                      {activity.title}
                    </h3>
                  </div>
                  <span className="hidden shrink-0 sm:block">
                    <ActivityStatusPill status={activity.status} />
                  </span>
                  <Icon
                    className="shrink-0 text-ivory/25 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-gold"
                    name="arrow"
                    size={16}
                  />
                </Link>
              </Reveal>
            ))}

            <div className="mt-6">
              <SampleNote tone="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
