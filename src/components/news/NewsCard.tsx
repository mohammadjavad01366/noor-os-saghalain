import { Link } from "react-router-dom";
import type { Article } from "@/content/types";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { Icon } from "@/components/ui/Icon";

export function NewsCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-teal-900/10 bg-white/45 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/75 hover:shadow-[0_30px_60px_-45px_rgba(6,60,67,0.8)] ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "h-56 sm:h-auto sm:w-[46%]" : "aspect-[16/10]"
        }`}
      >
        <ArtPlate
          alt={article.title}
          className="transition-transform duration-[1.2s] group-hover:scale-[1.06]"
          visual={article.visual}
        />
        <span className="absolute right-4 top-4 rounded-full bg-teal-950/75 px-3 py-1 text-[10.5px] text-ivory/85 backdrop-blur">
          {article.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:justify-center sm:p-8" : ""}`}>
        <div className="flex items-center gap-2 text-[11px] text-teal-950/45">
          <Icon name="calendar" size={13} />
          {article.date}
        </div>

        <h3
          className={`mt-2.5 font-semibold leading-8 text-teal-900 transition-colors group-hover:text-teal-800 ${
            featured ? "text-[19px] sm:text-[21px]" : "text-[16px]"
          }`}
        >
          <Link className="outline-none" to={`/news/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-pretty text-[12.8px] leading-[2] text-teal-950/58">
          {article.excerpt}
        </p>

        <Link
          className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-teal-800 transition-colors hover:text-gold"
          to={`/news/${article.slug}`}
        >
          ادامه مطلب
          <Icon
            className="transition-transform duration-300 group-hover:-translate-x-1"
            name="arrow"
            size={14}
          />
        </Link>
      </div>
    </article>
  );
}
