import { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/content/store";
import { GalleryMasonry } from "@/components/gallery/GalleryMasonry";
import { Lightbox } from "@/components/gallery/Lightbox";
import { actionClass } from "@/components/ui/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryPreview() {
  const { content } = useContent();
  const [active, setActive] = useState<number | null>(null);
  const items = content.gallery.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-teal-900 py-20 text-ivory lg:py-28">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
      <div className="relative shell">
        <SectionHeading
          align="center"
          eyebrow="گالری تصاویر"
          lead="قاب‌هایی از معماری، نقوش و فضای معنوی مجموعه؛ تصاویر واقعی برنامه‌ها از پنل مدیریت افزوده می‌شود."
          title="قاب‌هایی از مسیر نور و معرفت"
          tone="light"
        />

        <div className="mt-12">
          <GalleryMasonry items={items} onOpen={setActive} />
        </div>

        <OrnamentDivider className="mt-8" />

        <div className="mt-8 flex justify-center">
          <Link className={actionClass("gold", "md")} to="/gallery">
            مشاهده گالری کامل
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>

      {active !== null ? (
        <Lightbox
          index={active}
          items={items}
          onChange={setActive}
          onClose={() => setActive(null)}
        />
      ) : null}
    </section>
  );
}
