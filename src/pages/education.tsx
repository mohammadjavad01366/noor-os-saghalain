import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useContent } from "@/content/store";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export default function EducationPage() {
  const { content } = useContent();
  const { tracks } = content;

  usePageMeta(
    "برنامه‌های تربیتی",
    "تربیت اخلاقی و معنوی، سبک زندگی اسلامی، مهارت‌های فردی و اجتماعی و پرورش تفکر در مجموعه امیرالمؤمنین نورالثقلین.",
  );

  return (
    <>
      <PageHero
        breadcrumb="برنامه‌های تربیتی"
        description="تربیت، مسیر اصلی مجموعه است؛ مسیری که با آموزش قرآن آغاز می‌شود و در رفتار، انتخاب و رابطه انسان با خود، خانواده و جامعه ادامه می‌یابد."
        eyebrow="برنامه‌های تربیتی"
        title="تربیت، رشد و تعالی انسان"
      />

      <section className="relative overflow-hidden bg-ivory py-20 lg:py-24">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        <div className="relative shell">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="self-start lg:sticky lg:top-28">
              <div className="flex items-center gap-3 text-[10.5px] tracking-[0.3em] text-teal-800">
                <span className="h-px w-8 bg-teal-900/25" />
                <StarGlyph className="h-2.5 w-2.5 text-gold" />
                محورهای تربیتی
              </div>
              <h2 className="mt-4 text-[1.55rem] font-bold leading-[1.65] text-teal-900 sm:text-[1.85rem]">
                شش محور برای رشد همه‌جانبه فراگیران
              </h2>
              <p className="mt-4 text-[13.5px] leading-[2.1] text-teal-950/60">
                هر محور با برنامه‌ها و جلسات مشخصی اجرا می‌شود و متناسب با گروه سنی و سطح فراگیر
                تنظیم می‌گردد. جزئیات زمان‌بندی از طریق پنل مدیریت مجموعه اعلام می‌شود.
              </p>

              <div className="mt-8 space-y-3">
                <Link className={actionClass("solid", "md")} to="/activities">
                  مشاهده فعالیت‌ها
                  <Icon name="arrow" size={16} />
                </Link>
                <p className="text-[11.5px] leading-6 text-teal-950/45">
                  برای هماهنگی حضور در جلسات، از بخش ارتباط با ما پیام بفرستید.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {tracks.map((track, index) => (
                <Reveal delay={(index % 2) * 80} key={track.id}>
                  <div className="depth-card group relative h-full overflow-hidden rounded-2xl border border-teal-900/10 bg-white/50 p-6 hover:border-gold/40 hover:bg-white/80">
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 -top-6 text-[64px] font-bold leading-none text-teal-900/[0.045]"
                    >
                      {["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶"][index]}
                    </span>
                    <div className="relative">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-900/12 bg-white/60 text-teal-800 transition-colors group-hover:border-gold/50 group-hover:text-gold">
                        <Icon name={track.icon} size={19} strokeWidth={1.4} />
                      </span>
                      <h3 className="mt-4 text-[15px] font-semibold text-teal-900">{track.title}</h3>
                      <p className="mt-2 text-[12.8px] leading-[2] text-teal-950/60">
                        {track.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-teal-900 py-16 text-ivory">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
        <div className="relative shell grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "همراهی مربی",
              text: "هر گروه با یک مربی همراه است تا مسیر رشد به‌صورت پیوسته پیگیری شود.",
            },
            {
              title: "مشارکت خانواده",
              text: "هماهنگی با خانواده‌ها بخشی از برنامه تربیتی است، نه فعالیتی جانبی.",
            },
            {
              title: "تمرین در زندگی",
              text: "آموزه‌ها به تمرین‌های عملی و قابل اجرا در زندگی روزمره تبدیل می‌شوند.",
            },
          ].map((item, index) => (
            <Reveal delay={index * 80} key={item.title}>
              <div>
                <StarGlyph className="h-4 w-4 text-gold" />
                <h3 className="mt-4 text-[15px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[12.5px] leading-[2] text-ivory/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
