import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DevelopmentTracks() {
  const { content } = useContent();

  return (
    <section className="relative overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="relative shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="برنامه‌های تربیتی"
            lead="تربیت در نگاه ما یک برنامه جانبی نیست؛ ستون اصلی مسیر آموزشی است. این محورها در کنار آموزش قرآن، رشد همه‌جانبه فراگیر را دنبال می‌کنند."
            title="تربیت، رشد و تعالی انسان"
          />

          <Reveal delay={140}>
            <Link className={`${actionClass("solid", "md")} mt-9`} to="/education">
              برنامه‌های تربیتی
              <Icon name="arrow" size={16} />
            </Link>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 hidden items-center gap-4 lg:flex">
              <StarGlyph className="animate-spin-slow h-16 w-16 text-gold/45" />
              <p className="max-w-[190px] text-[12px] leading-6 text-teal-950/45">
                همه محورهای تربیتی با همراهی مربیان و مشارکت خانواده‌ها اجرا می‌شود.
              </p>
            </div>
          </Reveal>
        </div>

        <div>
          {content.tracks.map((track, index) => (
            <Reveal delay={index * 60} key={track.id}>
              <div className="group flex gap-5 border-b border-teal-900/10 py-6 first:pt-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-900/12 bg-white/50 text-teal-800 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:text-gold">
                  <Icon name={track.icon} size={19} strokeWidth={1.4} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-[15.5px] font-semibold text-teal-900">{track.title}</h3>
                    <span className="text-[10px] tracking-[0.2em] text-gold/60">
                      {["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶"][index]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-[2] text-teal-950/62">
                    {track.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
