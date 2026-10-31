import type { ProgramStatus } from "@/content/types";

const labels: Record<ProgramStatus, string> = {
  open: "در حال ثبت‌نام",
  soon: "در حال برنامه‌ریزی",
  archive: "آرشیو دوره‌ها",
};

const tones: Record<ProgramStatus, string> = {
  open: "border-turquoise/40 bg-turquoise/10 text-turquoise",
  soon: "border-gold/35 bg-gold/10 text-gold",
  archive: "border-ivory/20 bg-ivory/5 text-ivory/50",
};

export function ProgramStatusPill({ status }: { status: ProgramStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] ${tones[status]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}
