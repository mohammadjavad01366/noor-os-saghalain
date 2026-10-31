import type { ReactNode } from "react";

export function Panel({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="admin-card">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-teal-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-[11.5px] leading-6 text-teal-950/50">{description}</p>
          ) : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
  full = false,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[11.5px] text-teal-950/65">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[10.5px] leading-5 text-teal-950/40">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  dir,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  type?: "text" | "url" | "email" | "search";
}) {
  return (
    <input
      className="field"
      dir={dir}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}

export function AreaInput({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      className="field resize-y leading-7"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      value={value}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      aria-pressed={checked}
      className="flex items-center gap-3 text-[12px] text-teal-950/70"
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-turquoise" : "bg-teal-900/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            checked ? "left-0.5" : "left-4.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      className="inline-flex items-center gap-1.5 rounded-full bg-teal-900 px-4 py-2 text-[11.5px] text-ivory transition-colors hover:bg-turquoise"
      onClick={onClick}
      type="button"
    >
      <svg fill="none" height="13" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="13">
        <path d="M12 5v14M5 12h14" />
      </svg>
      {label}
    </button>
  );
}

export function DeleteButton({ onClick, label = "حذف" }: { onClick: () => void; label?: string }) {
  return (
    <button
      className="inline-flex items-center gap-1 rounded-full border border-terracotta/30 px-3 py-1.5 text-[10.5px] text-terracotta transition-colors hover:bg-terracotta/10"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
