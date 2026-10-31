import { useEffect } from "react";

/** Keeps the document title and description in sync with the current page. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const base = "امیرالمؤمنین نورالثقلین";
    document.title = title ? `${title} — ${base}` : base;

    if (description) {
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute("content", description);
    }
  }, [title, description]);
}
