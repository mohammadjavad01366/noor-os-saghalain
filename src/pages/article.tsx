import { Link, useParams } from "react-router-dom";
import { useContent } from "@/content/store";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";

export default function ArticlePage() {
  const { slug } = useParams();
  const { content } = useContent();
  const article = content.articles.find((item) => item.slug === slug);

  usePageMeta(article ? article.title : "خبر یافت نشد", article?.excerpt);

  if (!article) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-6 text-center">
        <StarGlyph className="h-8 w-8 text-gold" />
        <h1 className="mt-6 text-[22px] font-semibold text-teal-900">این خبر یافت نشد</h1>
        <p className="mt-3 max-w-md text-[13px] leading-7 text-teal-950/60">
          ممکن است نشانی تغییر کرده یا مطلب از فهرست حذف شده باشد.
        </p>
        <Link className={`${actionClass("solid", "md")} mt-7`} to="/news">
          بازگشت به اخبار
        </Link>
      </div>
    );
  }

  const related = content.articles.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <article>
      <div className="relative isolate overflow-hidden bg-teal-950 pb-14 pt-32 lg:pt-40">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_40%] opacity-25"
          src={asset("/images/hero-architecture.jpg")}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-950 via-teal-950/88 to-teal-950/75" />

        <div className="relative shell">
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[11px] text-ivory/45">
            <Link className="transition-colors hover:text-gold-300" to="/">
              صفحه اصلی
            </Link>
            <Icon className="rotate-180 text-ivory/25" name="arrow" size={12} />
            <Link className="transition-colors hover:text-gold-300" to="/news">
              اخبار و رویدادها
            </Link>
            <Icon className="rotate-180 text-ivory/25" name="arrow" size={12} />
            <span className="text-gold-300/80">{article.category}</span>
          </nav>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[11px] text-ivory/50">
            <span className="rounded-full border border-gold/40 px-3 py-1 text-gold-300">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="calendar" size={13} />
              {article.date}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-balance text-[1.8rem] font-bold leading-[1.55] text-ivory sm:text-[2.4rem]">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-[13.5px] leading-[2.1] text-ivory/65">
            {article.excerpt}
          </p>
        </div>
      </div>

      <section className="relative overflow-hidden bg-ivory py-14 lg:py-20">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        <div className="relative shell">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.75fr]">
            <div>
              <Reveal>
                <div className="h-[260px] overflow-hidden rounded-3xl border border-teal-900/10 sm:h-[360px]">
                  <ArtPlate alt={article.title} visual={article.visual} />
                </div>
              </Reveal>

              <div className="mt-8 space-y-5">
                {article.body.map((paragraph, index) => (
                  <p
                    className="text-pretty text-[13.5px] leading-[2.25] text-teal-950/72"
                    key={index}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <OrnamentDivider className="mt-10" tone="dark" />

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link className={actionClass("solid", "sm")} to="/news">
                  <Icon className="rotate-180" name="arrow" size={15} />
                  همه اخبار
                </Link>
                <Link className={actionClass("outlineDark", "sm")} to="/contact">
                  ارتباط با مجموعه
                </Link>
              </div>
            </div>

            <aside className="self-start lg:sticky lg:top-28">
              <div className="rounded-3xl border border-teal-900/10 bg-white/55 p-6">
                <h2 className="flex items-center gap-2 text-[12.5px] font-semibold text-teal-900">
                  <StarGlyph className="h-3 w-3 text-gold" />
                  مطالب مرتبط
                </h2>
                <ul className="mt-5 space-y-4">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link className="group flex gap-3" to={`/news/${item.slug}`}>
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                          <ArtPlate alt="" visual={item.visual} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10.5px] text-teal-950/40">{item.date}</p>
                          <p className="mt-0.5 text-[12.5px] leading-6 text-teal-900 transition-colors group-hover:text-teal-800">
                            {item.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
