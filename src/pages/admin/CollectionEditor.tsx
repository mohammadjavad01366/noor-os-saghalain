import { useState } from "react";
import type { IconName, Visual } from "@/content/types";
import { AreaInput, AddButton, DeleteButton, Field, TextInput } from "./fields";

export const visualOptions: { value: Visual; label: string }[] = [
  { value: "photo", label: "تصویر اصلی معماری" },
  { value: "arch", label: "طرح قوس" },
  { value: "rosette", label: "طرح ستاره" },
  { value: "lattice", label: "طرح شبکه هندسی" },
  { value: "mihrab", label: "طرح محراب" },
  { value: "medallion", label: "طرح ترنج" },
  { value: "light", label: "طرح نور" },
];

export const iconOptions: { value: IconName; label: string }[] = [
  { value: "book", label: "کتاب" },
  { value: "sparkle", label: "درخشش" },
  { value: "heart", label: "دل" },
  { value: "users", label: "گروه" },
  { value: "shield", label: "سپر" },
  { value: "bulb", label: "اندیشه" },
  { value: "compass", label: "قطب‌نما" },
  { value: "moon", label: "ماه" },
  { value: "lamp", label: "چراغ" },
  { value: "leaf", label: "برگ" },
  { value: "star", label: "ستاره" },
  { value: "path", label: "مسیر" },
];

export type FieldSpec<T> = {
  key: keyof T & string;
  label: string;
  type: "text" | "textarea" | "lines" | "select" | "visual" | "toggle";
  options?: { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  full?: boolean;
  dir?: "rtl" | "ltr";
};

type CollectionEditorProps<T extends { id: string }> = {
  title: string;
  description: string;
  items: T[];
  fields: FieldSpec<T>[];
  onChange: (items: T[]) => void;
  makeItem: () => T;
  itemTitle: (item: T) => string;
  itemMeta?: (item: T) => string;
  addLabel: string;
};

export function CollectionEditor<T extends { id: string }>({
  title,
  description,
  items,
  fields,
  onChange,
  makeItem,
  itemTitle,
  itemMeta,
  addLabel,
}: CollectionEditorProps<T>) {
  const [openId, setOpenId] = useState<string | null>(null);

  const patch = (index: number, key: string, value: unknown) => {
    const next = items.map((item, itemIndex) =>
      itemIndex === index ? ({ ...item, [key]: value } as T) : item,
    );
    onChange(next);
  };

  return (
    <section className="admin-card">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-teal-900">{title}</h2>
          <p className="mt-1 text-[11.5px] leading-6 text-teal-950/50">{description}</p>
          <p className="mt-1 text-[10.5px] text-teal-950/35">{items.length} مورد</p>
        </div>
        <AddButton
          label={addLabel}
          onClick={() => {
            const item = makeItem();
            onChange([item, ...items]);
            setOpenId(item.id);
          }}
        />
      </header>

      <div className="space-y-2.5">
        {items.map((item, index) => {
          const open = openId === item.id;
          return (
            <div
              className={`overflow-hidden rounded-xl border transition-colors ${
                open ? "border-gold/50 bg-white/70" : "border-teal-900/10 bg-white/40"
              }`}
              key={item.id}
            >
              <div className="flex items-center gap-3 px-3 py-2.5">
                <button
                  className="flex min-w-0 flex-1 items-center gap-3 text-right"
                  onClick={() => setOpenId(open ? null : item.id)}
                  type="button"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-900/8 text-[10px] text-teal-800">
                    {(index + 1).toLocaleString("fa-IR")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-teal-900">
                      {itemTitle(item) || "بدون عنوان"}
                    </span>
                    {itemMeta ? (
                      <span className="mt-0.5 block truncate text-[10.5px] text-teal-950/40">
                        {itemMeta(item)}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-[10px] text-teal-950/40">{open ? "بستن" : "ویرایش"}</span>
                </button>
                <DeleteButton
                  onClick={() => {
                    if (window.confirm("این مورد حذف شود؟")) {
                      onChange(items.filter((_, itemIndex) => itemIndex !== index));
                    }
                  }}
                />
              </div>

              {open ? (
                <div className="grid gap-3.5 border-t border-teal-900/8 p-4 sm:grid-cols-2">
                  {fields.map((field) => {
                    const raw = (item as Record<string, unknown>)[field.key];

                    if (field.type === "toggle") {
                      return (
                        <div className={field.full ? "sm:col-span-2" : ""} key={field.key}>
                          <button
                            aria-pressed={Boolean(raw)}
                            className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-[11.5px] transition-colors ${
                              raw
                                ? "border-turquoise/40 bg-turquoise/8 text-teal-900"
                                : "border-teal-900/12 text-teal-950/50"
                            }`}
                            onClick={() => patch(index, field.key, !raw)}
                            type="button"
                          >
                            {field.label}
                            <span className="text-[10px]">{raw ? "فعال" : "غیرفعال"}</span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <Field full={field.full} hint={field.hint} key={field.key} label={field.label}>
                        {field.type === "textarea" ? (
                          <AreaInput
                            onChange={(value) => patch(index, field.key, value)}
                            rows={3}
                            value={String(raw ?? "")}
                          />
                        ) : null}

                        {field.type === "lines" ? (
                          <AreaInput
                            onChange={(value) =>
                              patch(
                                index,
                                field.key,
                                value.split(/\n\s*\n/).map((line) => line.trim()).filter(Boolean),
                              )
                            }
                            rows={5}
                            value={Array.isArray(raw) ? (raw as string[]).join("\n\n") : ""}
                          />
                        ) : null}

                        {field.type === "text" ? (
                          <TextInput
                            dir={field.dir}
                            onChange={(value) => patch(index, field.key, value)}
                            placeholder={field.placeholder}
                            value={String(raw ?? "")}
                          />
                        ) : null}

                        {field.type === "select" || field.type === "visual" ? (
                          <select
                            className="field"
                            onChange={(event) => patch(index, field.key, event.target.value)}
                            value={String(raw ?? "")}
                          >
                            {(field.type === "visual" ? visualOptions : (field.options ?? [])).map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ),
                            )}
                          </select>
                        ) : null}
                      </Field>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}

        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-teal-900/15 p-6 text-center text-[11.5px] text-teal-950/40">
            هنوز موردی ثبت نشده است.
          </p>
        ) : null}
      </div>
    </section>
  );
}
