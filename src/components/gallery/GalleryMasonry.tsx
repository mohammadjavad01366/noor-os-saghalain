import type { GalleryItem } from "@/content/types";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { Icon } from "@/components/ui/Icon";

const ratios = ["aspect-[4/5]", "aspect-square", "aspect-[5/6]", "aspect-[4/5]", "aspect-[3/2]", "aspect-square"];

type GalleryMasonryProps = {
  items: GalleryItem[];
  onOpen: (index: number) => void;
};

export function GalleryMasonry({ items, onOpen }: GalleryMasonryProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <button
          aria-label={`بزرگ‌نمایی: ${item.caption}`}
          className="depth-card depth-card-dark group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-ivory/10 text-right"
          key={item.id}
          onClick={() => onOpen(index)}
          type="button"
        >
          <div className={`${ratios[index % ratios.length]} w-full`}>
            <ArtPlate
              alt={item.caption}
              className="transition-transform duration-[1.3s] ease-out group-hover:scale-[1.05]"
              visual={item.visual}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-gold/75">{item.category}</p>
              <p className="mt-1 text-[12.5px] leading-6 text-ivory/90">{item.caption}</p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory/80 transition-colors group-hover:border-gold group-hover:text-gold">
              <Icon name={item.kind === "video" ? "play" : "plus"} size={14} />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
