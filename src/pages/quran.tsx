import { usePageMeta } from "@/hooks/usePageMeta";
import { useContent } from "@/content/store";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { ProgramStatusPill } from "@/components/ui/ProgramStatusPill";
import { SampleNote } from "@/components/ui/SampleNote";
import { Icon } from "@/components/ui/Icon";
import { OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export default function QuranPage() {
  const { content } = useContent();
  const { quranVerse, programs } = content;

  usePageMeta(
    "آموزش و انس با قرآن کریم",
    "دوره‌های روخوانی، تجوید، حفظ، تدبر و تفسیر قرآن کریم در مجموعه امیرالمؤمنین نورالثقلین.",
  );

  return (
    <>
      <PageHero
        breadcrumb="فعالیت‌های قرآنی"
        description="دوره‌های آموزشی مجموعه در سطوح مختلف و با تمرکز بر فهم، تمرین و انس پیوسته با قرآن کریم طراحی شده‌اند. وضعیت ثبت‌نام هر دوره از پنل مدیریت به‌روزرسانی می‌شود."
        eyebrow="فعالیت‌های قرآنی"
        title="آموزش و انس با قرآن کریم"
      />

      <section className="relative overflow-hidden bg-ivory py-20 lg:py-24">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        <div className="relative shell">
          <div className="mx-auto max-w-3xl text-center">
            <StarGlyph className="mx-auto h-5 w-5 text-gold" />
            <p
              className="mt-5 font-quran text-[1.35rem] leading-[2.3] text-teal-900 sm:text-[1.7rem]"
              dir="rtl"
              lang="ar"
            >
              {quranVerse.arabic}
            </p>
            <p className="mt-4 text-[13px] leading-7 text-teal-950/60">{quranVerse.translation}</p>
            <p className="mt-2 text-[11px] tracking-[0.14em] text-teal-800/70">
              {quranVerse.surah} · آیه {quranVerse.ayah}
            </p>
            <OrnamentDivider className="mt-8" tone="dark" />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {programs.map((program, index) => (
              <Reveal delay={(index % 2) * 80} key={program.id}>
                <article className="group flex h-full flex-col rounded-2xl border border-teal-900/10 bg-white/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/80 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 text-teal-800 transition-colors group-hover:text-gold">
                      <Icon name={program.icon} size={22} strokeWidth={1.3} />
                    </span>
                    <span className="text-[10px] tracking-[0.24em] text-teal-900/25">
                      {["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶"][index]}
                    </span>
                  </div>

                  <h2 className="mt-5 text-[17px] font-semibold leading-8 text-teal-900">
                    {program.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-7 text-teal-950/62">{program.description}</p>
                  <p className="mt-3 flex-1 text-[12.5px] leading-[2] text-teal-950/50">
                    {program.fullDescription}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-teal-900/10 pt-4">
                    <span className="rounded-full border border-teal-900/12 bg-white/60 px-2.5 py-1">
                      <ProgramStatusPill status={program.status} />
                    </span>
                    <a
                      className="flex items-center gap-1.5 text-[11.5px] text-teal-800 transition-colors hover:text-gold"
                      href="#contact"
                    >
                      درخواست اطلاعات
                      <Icon name="arrow" size={14} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <SampleNote />
          </div>
        </div>
      </section>

      <ContactSection />
      <CtaSection />
    </>
  );
}
