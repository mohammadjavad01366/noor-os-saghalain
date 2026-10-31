import { useMemo, useState } from "react";
import { useContent } from "@/content/store";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryMasonry } from "@/components/gallery/GalleryMasonry";
import { Lightbox } from "@/components/gallery/Lightbox";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { SampleNote } from "@/components/ui/SampleNote";

export default function GalleryPage() {
  const { content } = useContent();
  const [category, setCategory] = useState("همه");
  const [active, setActive] = useState<number | null>(null);

  usePageMeta(
    "گالری تصاویر",
    "قاب‌هایی از معماری، نقوش و فضای معنوی مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین.",
  );

  const categories = useMemo(
    () => ["همه", ...Array.from(new Set(content.gallery.map((item) => item.category)))],
    [content.gallery],
  );

  const filtered = content.gallery.filter(
    (item) => category === "همه" || item.category === category,
  );

  return (
    <>
      <PageHero
        breadcrumb="گالری"
        description="نگاهی به معماری، نقوش و فضای معنوی مجموعه. تصاویر و ویدیوهای واقعی برنامه‌ها از پنل مدیریت افزوده می‌شود."
        eyebrow="گالری تصاویر"
        title="قاب‌هایی از مسیر نور و معرفت"
      />

      <section className="relative overflow-hidden bg-teal-900 py-16 text-ivory lg:py-20">
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
        <div className="relative shell">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                className={`shrink-0 rounded-full border px-4 py-2 text-[12.5px] transition-colors duration-300 ${
                  category === item
                    ? "border-gold bg-gold/15 text-gold-300"
                    : "border-ivory/15 text-ivory/60 hover:border-gold/50 hover:text-gold-300"
                }`}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-7">
            <GalleryMasonry items={filtered} onOpen={setActive} />
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-[13px] text-ivory/50">
              تصویری در این دسته ثبت نشده است.
            </p>
          ) : null}

          <OrnamentDivider className="mt-10" />

          <div className="mt-7 flex justify-center">
            <SampleNote tone="light" />
          </div>
        </div>
      </section>

      {active !== null ? (
        <Lightbox
          index={active}
          items={filtered}
          onChange={setActive}
          onClose={() => setActive(null)}
        />
      ) : null}
    </>
  );
}
