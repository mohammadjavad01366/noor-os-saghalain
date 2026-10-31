import { useContent } from "@/content/store";
import { Icon } from "./Icon";

/** A quiet, dismissible-from-admin note that seeded editorial content is a placeholder. */
export function SampleNote({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { content } = useContent();
  if (!content.meta.showDemoNote) return null;

  return (
    <p
      className={`flex items-start gap-2 text-[12px] leading-6 ${
        tone === "light" ? "text-ivory/45" : "text-teal-950/45"
      } ${className}`}
    >
      <Icon className="mt-1 shrink-0" name="alert" size={13} />
      <span>محتوای این بخش نمونه است و از پنل مدیریت مجموعه قابل ویرایش و جایگزینی است.</span>
    </p>
  );
}
