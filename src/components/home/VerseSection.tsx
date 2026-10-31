import { useContent } from "@/content/store";
import { CornerFrame, OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export function VerseSection() {
  const { content } = useContent();
  const { verse } = content;

  return (
    <section className="relative overflow-hidden bg-midnight py-20 sm:py-28">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.06]" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-turquoise/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/45 to-transparent"
      />

      <div className="relative shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-[10.5px] tracking-[0.34em] text-gold-300/80">
              <span className="h-px w-10 bg-gold/50" />
              <StarGlyph className="h-3 w-3" />
              <span>آیه‌ای برای زندگی</span>
              <StarGlyph className="h-3 w-3" />
              <span className="h-px w-10 bg-gold/50" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mt-8 rounded-[2rem] border border-gold/25 bg-teal-950/45 px-6 py-12 backdrop-blur-sm sm:px-12 sm:py-14">
              <CornerFrame />

              <p
                className="font-quran text-[1.55rem] leading-[2.5] text-ivory sm:text-[2rem] sm:leading-[2.4] lg:text-[2.35rem]"
                dir="rtl"
                lang="ar"
              >
                {verse.arabic}
              </p>

              <OrnamentDivider className="my-7" />

              <p className="mx-auto max-w-xl text-pretty text-[14px] leading-[2.15] text-ivory/72 sm:text-[15.5px]">
                {verse.translation}
              </p>

              <p className="mt-6 text-[11.5px] tracking-[0.16em] text-gold-300/85">
                {verse.surah} · آیه {verse.ayah}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
