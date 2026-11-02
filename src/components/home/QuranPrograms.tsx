import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { ProgramStatusPill } from "@/components/ui/ProgramStatusPill";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function QuranPrograms() {
  const { content } = useContent();

  return (
    <section className="relative overflow-hidden bg-teal-900 py-20 text-ivory lg:py-28">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.09]" />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-turquoise/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-[110px]"
      />

      <div className="relative shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="فعالیت‌های قرآنی"
            lead="برنامه‌های آموزشی مجموعه در سطوح مختلف و با تمرکز بر فهم، تمرین و انس پیوسته با قرآن کریم طراحی شده است."
            title="آموزش و انس با قرآن کریم"
            tone="light"
          />
          <Reveal delay={120}>
            <Link className={actionClass("outlineLight", "md")} to="/quran">
              جزئیات برنامه‌ها
              <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.programs.map((program, index) => (
            <Reveal delay={(index % 3) * 80} key={program.id}>
              <Link
                className="depth-card depth-card-dark group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/12 bg-ivory/[0.035] p-6 hover:border-gold/40 hover:bg-ivory/[0.07]"
                to="/quran"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 text-[10px] tracking-[0.2em] text-gold/40"
                >
                  {["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶"][index] ?? "۰۱"}
                </span>

                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
                  <Icon name={program.icon} size={22} strokeWidth={1.3} />
                </span>

                <h3 className="mt-5 text-[15.5px] font-semibold leading-7 text-ivory">
                  {program.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[12.5px] leading-[1.95] text-ivory/58">
                  {program.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-ivory/10 pt-4">
                  <ProgramStatusPill status={program.status} />
                  <span className="flex items-center gap-1.5 text-[11.5px] text-gold-300/85 transition-colors group-hover:text-gold">
                    بیشتر بدانید
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SampleNote tone="light" />
          <p className="text-[12px] text-ivory/40">
            وضعیت هر دوره از پنل مدیریت مجموعه به‌روزرسانی می‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}
