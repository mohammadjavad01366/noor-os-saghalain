import type { SiteContent } from "@/content/types";
import { useContent } from "@/content/store";
import { CollectionEditor } from "./CollectionEditor";
import { AreaInput, Field, Panel, TextInput } from "./fields";

type SectionKey = "brand" | "hero" | "about" | "verse" | "quranVerse" | "cta";

export function ContentEditor() {
  const { content, update } = useContent();

  const patch = <K extends SectionKey>(key: K, value: Partial<SiteContent[K]>) => {
    update((current) => {
      const section = { ...current[key], ...value } as SiteContent[K];
      return { ...current, [key]: section } as SiteContent;
    });
  };

  return (
    <div className="space-y-5">
      <Panel description="نام و شعار مجموعه در سربرگ، پابرگ و عنوان‌ها استفاده می‌شود." title="هویت مجموعه">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="نام کوتاه">
            <TextInput onChange={(value) => patch("brand", { name: value })} value={content.brand.name} />
          </Field>
          <Field label="نام کامل">
            <TextInput
              onChange={(value) => patch("brand", { fullName: value })}
              value={content.brand.fullName}
            />
          </Field>
          <Field label="نام لاتین">
            <TextInput
              dir="ltr"
              onChange={(value) => patch("brand", { englishName: value })}
              value={content.brand.englishName}
            />
          </Field>
          <Field label="شعار کوتاه">
            <TextInput
              onChange={(value) => patch("brand", { tagline: value })}
              value={content.brand.tagline}
            />
          </Field>
        </div>
      </Panel>

      <Panel description="متن‌های بخش نخست صفحه اصلی (تصویر پس‌زمینه ثابت است)." title="بخش قهرمان (Hero)">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="بالانویس">
            <TextInput onChange={(value) => patch("hero", { kicker: value })} value={content.hero.kicker} />
          </Field>
          <Field label="عنوان اصلی">
            <TextInput onChange={(value) => patch("hero", { headline: value })} value={content.hero.headline} />
          </Field>
          <Field full label="زیرعنوان">
            <TextInput onChange={(value) => patch("hero", { subtitle: value })} value={content.hero.subtitle} />
          </Field>
          <Field full label="توضیح کوتاه (همچنین در پابرگ)">
            <AreaInput onChange={(value) => patch("hero", { description: value })} value={content.hero.description} />
          </Field>
          <Field label="دکمه اصلی">
            <TextInput
              onChange={(value) => patch("hero", { primaryCta: value })}
              value={content.hero.primaryCta}
            />
          </Field>
          <Field label="دکمه دوم">
            <TextInput
              onChange={(value) => patch("hero", { secondaryCta: value })}
              value={content.hero.secondaryCta}
            />
          </Field>
        </div>
      </Panel>

      <Panel description="بخش معرفی مجموعه در صفحه اصلی و صفحه درباره مجموعه." title="درباره مجموعه">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="بالانویس">
            <TextInput onChange={(value) => patch("about", { eyebrow: value })} value={content.about.eyebrow} />
          </Field>
          <Field label="عنوان">
            <TextInput onChange={(value) => patch("about", { title: value })} value={content.about.title} />
          </Field>
          <Field full label="متن معرفی">
            <AreaInput
              onChange={(value) => patch("about", { description: value })}
              rows={4}
              value={content.about.description}
            />
          </Field>
          <Field label="ماموریت">
            <AreaInput onChange={(value) => patch("about", { mission: value })} value={content.about.mission} />
          </Field>
          <Field label="چشم‌انداز">
            <AreaInput onChange={(value) => patch("about", { vision: value })} value={content.about.vision} />
          </Field>
          <Field full label="فلسفه تربیتی">
            <AreaInput onChange={(value) => patch("about", { philosophy: value })} value={content.about.philosophy} />
          </Field>
        </div>
      </Panel>

      <CollectionEditor
        addLabel="افزودن ارزش"
        description="ارزش‌های محوری که در بخش درباره مجموعه نمایش داده می‌شوند."
        fields={[
          { key: "title", label: "عنوان", type: "text" },
          { key: "description", label: "توضیح", type: "text" },
        ]}
        itemTitle={(item) => item.title}
        items={content.about.values}
        makeItem={() => ({ id: crypto.randomUUID(), title: "", description: "" })}
        onChange={(values) => patch("about", { values })}
        title="ارزش‌های محوری"
      />

      <Panel description="آیه‌ای که در بخش «آیه‌ای برای زندگی» صفحه اصلی نمایش داده می‌شود." title="آیه صفحه اصلی">
        <div className="grid gap-3.5">
          <Field hint="متن عربی را بدون تغییر و از منبع معتبر وارد کنید." label="متن عربی">
            <AreaInput
              onChange={(value) => patch("verse", { arabic: value })}
              rows={2}
              value={content.verse.arabic}
            />
          </Field>
          <Field label="ترجمه فارسی">
            <AreaInput
              onChange={(value) => patch("verse", { translation: value })}
              rows={2}
              value={content.verse.translation}
            />
          </Field>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="نام سوره">
              <TextInput onChange={(value) => patch("verse", { surah: value })} value={content.verse.surah} />
            </Field>
            <Field label="شماره آیه">
              <TextInput onChange={(value) => patch("verse", { ayah: value })} value={content.verse.ayah} />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel description="آیه‌ای که در صفحه فعالیت‌های قرآنی نمایش داده می‌شود." title="آیه صفحه قرآن">
        <div className="grid gap-3.5">
          <Field label="متن عربی">
            <AreaInput
              onChange={(value) => patch("quranVerse", { arabic: value })}
              rows={2}
              value={content.quranVerse.arabic}
            />
          </Field>
          <Field label="ترجمه فارسی">
            <AreaInput
              onChange={(value) => patch("quranVerse", { translation: value })}
              rows={2}
              value={content.quranVerse.translation}
            />
          </Field>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="نام سوره">
              <TextInput
                onChange={(value) => patch("quranVerse", { surah: value })}
                value={content.quranVerse.surah}
              />
            </Field>
            <Field label="شماره آیه">
              <TextInput
                onChange={(value) => patch("quranVerse", { ayah: value })}
                value={content.quranVerse.ayah}
              />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel description="بخش دعوت به همراهی، پیش از بخش ارتباط با ما." title="دعوت به همراهی">
        <div className="grid gap-3.5">
          <Field label="عنوان">
            <TextInput onChange={(value) => patch("cta", { title: value })} value={content.cta.title} />
          </Field>
          <Field label="توضیح">
            <AreaInput
              onChange={(value) => patch("cta", { description: value })}
              value={content.cta.description}
            />
          </Field>
        </div>
      </Panel>
    </div>
  );
}
