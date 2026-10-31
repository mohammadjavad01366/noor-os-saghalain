import type { ActivityStatus } from "@/content/types";

export const activityStatusLabels: Record<ActivityStatus, string> = {
  open: "ثبت‌نام باز",
  soon: "به‌زودی",
  full: "ظرفیت تکمیل",
  archive: "برگزار شده",
};

const tones: Record<ActivityStatus, string> = {
  open: "border-turquoise/45 bg-turquoise/12 text-turquoise",
  soon: "border-gold/40 bg-gold/12 text-gold",
  full: "border-terracotta/40 bg-terracotta/10 text-terracotta",
  archive: "border-ivory/20 bg-ivory/5 text-ivory/50",
};

export function ActivityStatusPill({
  status,
  tone = "dark",
}: {
  status: ActivityStatus;
  tone?: "dark" | "light";
}) {
  const palette =
    tone === "light" && status === "open"
      ? "border-turquoise/45 bg-turquoise/10 text-teal-800"
      : tone === "light" && status === "soon"
        ? "border-gold/50 bg-gold/10 text-teal-800"
        : tones[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] ${palette}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {activityStatusLabels[status]}
    </span>
  );
}
