import { Link, useParams } from "react-router-dom";
import { useContent } from "@/content/store";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { RegistrationForm } from "@/components/activities/RegistrationForm";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { ActivityStatusPill, activityStatusLabels } from "@/components/ui/ActivityStatusPill";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export default function ActivityPage() {
  const { slug } = useParams();
  const { content } = useContent();
  const activity = content.activities.find((item) => item.slug === slug);

  usePageMeta(
    activity ? activity.title : "برنامه یافت نشد",
    activity?.description,
  );

  if (!activity) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-6 text-center">
        <StarGlyph className="h-8 w-8 text-gold" />
        <h1 className="mt-6 text-[22px] font-semibold text-teal-900">این برنامه یافت نشد</h1>
        <p className="mt-3 max-w-md text-[13px] leading-7 text-teal-950/60">
          ممکن است نشانی تغییر کرده یا برنامه از فهرست حذف شده باشد.
        </p>
        <Link className={`${actionClass("solid", "md")} mt-7`} to="/activities">
          بازگشت به فعالیت‌ها
        </Link>
      </div>
    );
  }

  const related = content.activities.filter((item) => item.id !== activity.id).slice(0, 3);
  const registrationOpen = activity.registration && activity.status === "open";

  return (
    <>
      <PageHero
        breadcrumb={activity.category}
        description={activity.description}
        eyebrow={activity.category}
        title={activity.title}
      />

      <section className="relative overflow-hidden bg-ivory py-14 lg:py-20">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        <div className="relative shell grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <Reveal>
              <div className="h-[300px] overflow-hidden rounded-3xl border border-teal-900/10 sm:h-[400px]">
                <ArtPlate alt={activity.title} visual={activity.visual} />
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-[12px] text-teal-950/55">
              <span className="flex items-center gap-1.5">
                <Icon name="calendar" size={14} /> {activity.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={14} /> {activity.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="pin" size={14} /> {activity.location}
              </span>
            </div>

            <div className="mt-7 space-y-5">
              {activity.body.map((paragraph, index) => (
                <p className="text-pretty text-[13.5px] leading-[2.2] text-teal-950/70" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            <OrnamentDivider className="mt-10" tone="dark" />

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.2em] text-teal-900/40">وضعیت برنامه</p>
              <div className="mt-2 flex items-center gap-3">
                <ActivityStatusPill status={activity.status} tone="light" />
                <span className="text-[12px] text-teal-950/50">
                  {activityStatusLabels[activity.status]}
                </span>
              </div>
            </div>
          </div>

          <aside className="self-start lg:sticky lg:top-28">
            <div className="rounded-3xl border border-teal-900/10 bg-white/60 p-6">
              <div className="flex items-center gap-2 text-[10.5px] tracking-[0.24em] text-teal-800">
                <StarGlyph className="h-2.5 w-2.5 text-gold" />
                اطلاعات برنامه
              </div>

              <ul className="mt-5 space-y-4">
                {[
                  { icon: "calendar" as const, label: "تاریخ", value: activity.date },
                  { icon: "clock" as const, label: "زمان", value: activity.time },
                  { icon: "pin" as const, label: "مکان", value: activity.location },
                  { icon: "users" as const, label: "دسته‌بندی", value: activity.category },
                ].map((row) => (
                  <li className="flex items-start gap-3" key={row.label}>
                    <Icon className="mt-1 shrink-0 text-gold" name={row.icon} size={15} />
                    <div>
                      <p className="text-[10.5px] text-teal-950/40">{row.label}</p>
                      <p className="mt-0.5 text-[12.5px] leading-6 text-teal-900">{row.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-teal-900/10" />

              {registrationOpen ? (
                <>
                  <h2 className="text-[14px] font-semibold text-teal-900">ثبت‌نام در این برنامه</h2>
                  <p className="mt-1.5 text-[11.5px] leading-6 text-teal-950/50">
                    پس از ثبت درخواست، هماهنگی نهایی از سوی مجموعه انجام می‌شود.
                  </p>
                  <div className="mt-4">
                    <RegistrationForm
                      activitySlug={activity.slug}
                      activityTitle={activity.title}
                    />
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-4">
                  <p className="text-[12px] leading-7 text-teal-950/65">
                    ثبت‌نام این برنامه در حال حاضر باز نیست. برای اطلاع از زمان ثبت‌نام، از بخش
                    ارتباط با ما پیام بفرستید.
                  </p>
                  <Link
                    className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-teal-800 hover:text-gold"
                    to="/contact"
                  >
                    ارتباط با مجموعه
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <div className="relative shell mt-16">
            <h2 className="text-[15px] font-semibold text-teal-900">برنامه‌های دیگر</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  className="group flex items-center gap-3 rounded-2xl border border-teal-900/10 bg-white/40 p-3 transition-colors hover:border-gold/40 hover:bg-white/70"
                  key={item.id}
                  to={`/activities/${item.slug}`}
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <ArtPlate alt="" visual={item.visual} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10.5px] text-teal-950/40">{item.date}</p>
                    <p className="mt-0.5 truncate text-[12.5px] font-medium text-teal-900 group-hover:text-teal-800">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
