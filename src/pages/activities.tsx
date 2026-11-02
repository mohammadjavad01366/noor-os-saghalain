import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { ActivityStatusPill } from "@/components/ui/ActivityStatusPill";
import { SampleNote } from "@/components/ui/SampleNote";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export default function ActivitiesPage() {
  const { content } = useContent();
  const [category, setCategory] = useState("همه");

  usePageMeta(
    "فعالیت‌ها و برنامه‌ها",
    "محافل قرآنی، دوره‌های آموزشی، نشست‌های تربیتی، مناسبت‌ها و برنامه‌های فرهنگی مجموعه امیرالمؤمنین نورالثقلین.",
  );

  const categories = useMemo(
    () => ["همه", ...Array.from(new Set(content.activities.map((activity) => activity.category)))],
    [content.activities],
  );

  const filtered = content.activities.filter(
    (activity) => category === "همه" || activity.category === category,
  );

  return (
    <>
      <PageHero
        breadcrumb="فعالیت‌ها و برنامه‌ها"
        description="محافل قرآنی، دوره‌های آموزشی، نشست‌های تربیتی، مناسبت‌های مذهبی و برنامه‌های فرهنگی؛ وضعیت ثبت‌نام هر برنامه از پنل مدیریت به‌روزرسانی می‌شود."
        eyebrow="فعالیت‌ها"
        title="فعالیت‌ها و برنامه‌های مجموعه"
      />

      <section className="relative overflow-hidden bg-ivory py-16 lg:py-20">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        <div className="relative shell">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                className={`shrink-0 rounded-full border px-4 py-2 text-[12.5px] transition-colors duration-300 ${
                  category === item
                    ? "border-gold bg-gold/15 text-teal-900"
                    : "border-teal-900/12 text-teal-950/60 hover:border-gold/50 hover:text-teal-900"
                }`}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((activity, index) => (
              <Reveal delay={(index % 3) * 70} key={activity.id}>
                <Link
                  className="depth-card group flex h-full flex-col overflow-hidden rounded-2xl border border-teal-900/10 bg-white/50 hover:border-gold/40 hover:bg-white/80"
                  to={`/activities/${activity.slug}`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <ArtPlate
                      alt={activity.title}
                      className="transition-transform duration-[1.2s] group-hover:scale-105"
                      visual={activity.visual}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950/55 to-transparent" />
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                      <span className="rounded-full bg-teal-950/70 px-3 py-1 text-[10.5px] text-ivory/85 backdrop-blur">
                        {activity.category}
                      </span>
                      <ActivityStatusPill status={activity.status} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-[11px] text-teal-950/45">
                      <Icon name="calendar" size={13} />
                      {activity.date}
                    </div>
                    <h2 className="mt-2.5 text-[16px] font-semibold leading-8 text-teal-900 transition-colors group-hover:text-teal-800">
                      {activity.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[12.8px] leading-[2] text-teal-950/58">
                      {activity.description}
                    </p>
                    <span className="mt-5 flex items-center gap-2 text-[12px] text-teal-800 transition-colors group-hover:text-gold">
                      جزئیات برنامه
                      <Icon
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                        name="arrow"
                        size={14}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-[13px] text-teal-950/50">
              برنامه‌ای در این دسته ثبت نشده است.
            </p>
          ) : null}

          <div className="mt-8 flex justify-center">
            <SampleNote />
          </div>
        </div>
      </section>
    </>
  );
}
