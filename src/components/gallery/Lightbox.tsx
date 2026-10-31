import { useCallback, useEffect } from "react";
import type { GalleryItem } from "@/content/types";
import { ArtPlate } from "@/components/ui/ArtPlate";
import { Icon } from "@/components/ui/Icon";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const item = items[index];

  const go = useCallback(
    (direction: 1 | -1) => {
      onChange((index + direction + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(1);
      if (event.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [go, onClose]);

  if (!item) return null;

  return (
    <div
      aria-label="نمایش تصویر"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-teal-950/96 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative flex h-full max-h-[86vh] w-full max-w-5xl flex-col items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-gold/25 bg-teal-900/60">
          {item.kind === "video" && item.videoUrl ? (
            <video
              className="max-h-[72vh] w-full bg-black"
              controls
              autoPlay
              playsInline
              src={item.videoUrl}
            />
          ) : (
            <div className="aspect-[4/3] w-full max-h-[72vh]">
              <ArtPlate alt={item.caption} visual={item.visual} />
            </div>
          )}
        </div>

        <div className="mt-4 flex w-full flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13.5px] text-ivory/90">{item.caption}</p>
            <p className="mt-1 text-[11px] text-gold/70">{item.category}</p>
          </div>
          <p className="text-[11px] tracking-[0.2em] text-ivory/40" dir="ltr">
            {index + 1} / {items.length}
          </p>
        </div>

        <button
          aria-label="بستن"
          className="absolute -top-2 left-0 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold sm:-top-12"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" size={18} />
        </button>

        {items.length > 1 ? (
          <>
            <button
              aria-label="تصویر بعدی"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-teal-950/60 text-ivory transition-colors hover:border-gold hover:text-gold sm:-right-16"
              onClick={() => go(1)}
              type="button"
            >
              <Icon name="arrow" size={20} />
            </button>
            <button
              aria-label="تصویر قبلی"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full border border-ivory/20 bg-teal-950/60 text-ivory transition-colors hover:border-gold hover:text-gold sm:-left-16"
              onClick={() => go(-1)}
              type="button"
            >
              <Icon name="arrow" size={20} />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
