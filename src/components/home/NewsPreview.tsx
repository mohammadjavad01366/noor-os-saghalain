import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { NewsCard } from "@/components/news/NewsCard";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsPreview() {
  const { content } = useContent();
  const [lead, ...others] = content.articles;

  if (!lead) return null;

  return (
    <section className="relative overflow-hidden bg-ivory-200/60 py-20 lg:py-28">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
      <div className="relative shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="اخبار و رویدادها"
            lead="آخرین اطلاعیه‌ها، رویدادهای قرآنی و گزارش برنامه‌های مجموعه."
            title="تازه‌ترین اخبار و رویدادها"
          />
          <Reveal delay={120}>
            <Link className={actionClass("outlineDark", "md")} to="/news">
              آرشیو اخبار
              <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <NewsCard article={lead} featured />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {others.slice(0, 2).map((article, index) => (
              <Reveal delay={index * 80} key={article.id}>
                <NewsCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <SampleNote />
        </div>
      </div>
    </section>
  );
}
