import type { IconName } from "@/content/types";
import { useContent } from "@/content/store";
import { CollectionEditor, iconOptions } from "./CollectionEditor";
import { AreaInput, Field, Panel, TextInput } from "./fields";

export function ContactEditor() {
  const { content, update } = useContent();

  const setContact = (patch: Partial<typeof content.contact>) => {
    update((current) => ({ ...current, contact: { ...current.contact, ...patch } }));
  };

  return (
    <div className="space-y-5">
      <Panel
        description="هر فیلدی که خالی بماند در سایت نمایش داده نمی‌شود. برای نمایش نقشه، نشانی دقیق را وارد کنید و سپس نشانی embed نقشه را در فیلد مربوطه قرار دهید."
        title="اطلاعات تماس"
      >
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field full label="نشانی مجموعه">
            <AreaInput onChange={(value) => setContact({ address: value })} rows={2} value={content.contact.address} />
          </Field>
          <Field label="شماره تماس">
            <TextInput
              dir="ltr"
              onChange={(value) => setContact({ phone: value })}
              placeholder="021-00000000"
              value={content.contact.phone}
            />
          </Field>
          <Field label="ایمیل">
            <TextInput
              dir="ltr"
              onChange={(value) => setContact({ email: value })}
              placeholder="info@example.com"
              value={content.contact.email}
            />
          </Field>
          <Field label="ساعات پاسخگویی">
            <TextInput
              onChange={(value) => setContact({ hours: value })}
              placeholder="شنبه تا پنجشنبه، ۱۶ تا ۲۰"
              value={content.contact.hours}
            />
          </Field>
          <Field hint="مثلاً https://wa.me/98912…" label="لینک واتساپ">
            <TextInput
              dir="ltr"
              onChange={(value) => setContact({ whatsapp: value })}
              value={content.contact.whatsapp}
            />
          </Field>
          <Field
            full
            hint="نشانی embed گوگل مپ (src داخل iframe)."
            label="نشانی نقشه (embed)"
          >
            <TextInput
              dir="ltr"
              onChange={(value) => setContact({ mapEmbedUrl: value })}
              value={content.contact.mapEmbedUrl}
            />
          </Field>
        </div>
      </Panel>

      <CollectionEditor
        addLabel="افزودن شبکه اجتماعی"
        description="آیکون‌ها در پابرگ و بخش ارتباط با ما نمایش داده می‌شوند."
        fields={[
          { key: "label", label: "نام", type: "text" },
          { key: "href", label: "نشانی", type: "text", dir: "ltr" },
          { key: "icon", label: "آیکون", type: "select", options: iconOptions.filter((option) => ["instagram", "telegram", "whatsapp", "youtube", "message", "external"].includes(option.value)) },
        ]}
        itemTitle={(item) => item.label}
        itemMeta={(item) => item.href}
        items={content.socials}
        makeItem={() => ({
          id: crypto.randomUUID(),
          label: "",
          href: "",
          icon: "instagram" as IconName,
        })}
        onChange={(socials) => update((current) => ({ ...current, socials }))}
        title="شبکه‌های اجتماعی"
      />
    </div>
  );
}
