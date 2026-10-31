import { useMemo, useState } from "react";
import { useContent } from "@/content/store";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { NewsCard } from "@/components/news/NewsCard";
import { SampleNote } from "@/components/ui/SampleNote";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export default function NewsPage() {
  const { content } = useContent();
  const [category, setCategory] = useState("همه");
  const [query, setQuery] = useState("");

  usePageMeta(
    "اخبار و رویدادها",
    "آخرین اطلاعیه‌ها، رویدادهای قرآنی، کارگاه‌های آموزشی و گزارش برنامه‌های مجموعه امیرالمؤمنین نورالثقلین.",
  );

  const categories = useMemo(
    () => ["همه", ...Array.from(new Set(content.articles.map((article) => article.category)))],
    [content.articles],
  );

  const filtered = useMemo(() => {
    const term = query.trim();
    return content.articles.filter((article) => {
      const matchesCategory = category === "همه" || article.category === category;
      const matchesQuery =
        term.length === 0 ||
        article.title.includes(term) ||
        article.excerpt.includes(term) ||
        article.category.includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [category, content.articles, query]);

  return (
    <>
      <PageHero
        breadcrumb="اخبار و رویدادها"
        description="اطلاعیه‌ها، رویدادها، کارگاه‌ها و گزارش برنامه‌های مجموعه در یک نگاه."
        eyebrow="اخبار"
        title="تازه‌ترین اخبار و رویدادها"
      />

      <section className="relative overflow-hidden bg-ivory py-16 lg:py-20">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
        <div className="relative shell">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
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

            <label className="relative block w-full lg:w-72">
              <span className="sr-only">جست‌وجو در اخبار</span>
              <Icon
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-teal-900/40"
                name="search"
                size={16}
              />
              <input
                className="field pr-11"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جست‌وجو در اخبار…"
                type="search"
                value={query}
              />
            </label>
          </div>

          <p className="mt-5 text-[11.5px] text-teal-950/45">
            {filtered.length} مورد یافت شد
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, index) => (
              <Reveal delay={(index % 3) * 70} key={article.id}>
                <NewsCard article={article} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-3 text-center">
              <Icon className="text-teal-900/30" name="search" size={30} />
              <p className="text-[13px] text-teal-950/55">
                موردی با این عنوان یا دسته‌بندی پیدا نشد.
              </p>
              <button
                className="text-[12px] font-medium text-teal-800 hover:text-gold"
                onClick={() => {
                  setQuery("");
                  setCategory("همه");
                }}
                type="button"
              >
                پاک کردن فیلترها
              </button>
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <SampleNote />
          </div>
        </div>
      </section>
    </>
  );
}
