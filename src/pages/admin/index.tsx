import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { adminPasswordIsDefault, useContent } from "@/content/store";
import type { Activity, Article, GalleryItem, Program, Track } from "@/content/types";
import { BrandMark, StarGlyph } from "@/components/ui/Ornament";
import { Icon } from "@/components/ui/Icon";
import { CollectionEditor } from "./CollectionEditor";
import { ContentEditor } from "./ContentEditor";
import { ContactEditor } from "./ContactEditor";
import { Inbox } from "./Inbox";
import { Panel, Toggle } from "./fields";

const tabs = [
  { key: "content", label: "محتوای صفحه اصلی" },
  { key: "programs", label: "برنامه‌های قرآنی" },
  { key: "tracks", label: "محورهای تربیتی" },
  { key: "activities", label: "فعالیت‌ها" },
  { key: "articles", label: "اخبار و رویدادها" },
  { key: "gallery", label: "گالری" },
  { key: "contact", label: "ارتباط و شبکه‌ها" },
  { key: "inbox", label: "پیام‌ها و ثبت‌نام‌ها" },
  { key: "settings", label: "تنظیمات" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const programStatusOptions = [
  { value: "open", label: "در حال ثبت‌نام" },
  { value: "soon", label: "در حال برنامه‌ریزی" },
  { value: "archive", label: "آرشیو" },
];

const activityStatusOptions = [
  { value: "open", label: "ثبت‌نام باز" },
  { value: "soon", label: "به‌زودی" },
  { value: "full", label: "ظرفیت تکمیل" },
  { value: "archive", label: "برگزار شده" },
];

function AdminLogin({ onSignIn }: { onSignIn: (password: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSignIn(password)) {
      setError("گذرواژه نادرست است.");
      return;
    }
    setError("");
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-teal-950 px-5 py-16">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
      <div className="relative w-full max-w-md rounded-3xl border border-gold/25 bg-teal-900/70 p-7 text-ivory backdrop-blur sm:p-9">
        <div className="flex items-center gap-3">
          <BrandMark className="h-12 w-12 text-gold" />
          <div>
            <p className="text-[14px] font-semibold">پنل مدیریت مجموعه</p>
            <p className="mt-1 text-[10px] tracking-[0.22em] text-gold/70">ADMIN PANEL</p>
          </div>
        </div>

        <p className="mt-6 text-[12px] leading-7 text-ivory/60">
          برای ویرایش محتوا، مدیریت برنامه‌ها و دیدن پیام‌ها وارد شوید.
        </p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-[11.5px] text-ivory/70">گذرواژه</span>
            <input
              aria-invalid={Boolean(error)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-ivory/20 bg-teal-950/50 px-4 py-3 text-[13px] text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-gold/70"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="text-[11.5px] text-terracotta">{error}</p> : null}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[13px] font-medium text-teal-950 transition-colors hover:bg-gold-300"
            type="submit"
          >
            ورود به پنل
            <Icon name="arrow" size={16} />
          </button>
        </form>

        {adminPasswordIsDefault ? (
          <p className="mt-5 rounded-xl border border-gold/20 bg-teal-950/40 p-3 text-[10.5px] leading-6 text-ivory/50">
            گذرواژه پیش‌فرض: <span dir="ltr" className="text-gold-300">noor1405</span> — برای محیط
            اصلی، متغیر محیطی <span dir="ltr">VITE_ADMIN_PASSWORD</span> را تنظیم کنید.
          </p>
        ) : null}

        <Link
          className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] text-ivory/50 transition-colors hover:text-gold-300"
          to="/"
        >
          <Icon className="rotate-180" name="arrow" size={14} />
          بازگشت به سایت
        </Link>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAdmin, signIn, signOut, content, update, reset } = useContent();
  const [tab, setTab] = useState<TabKey>("content");

  usePageMeta("پنل مدیریت");

  if (!isAdmin) return <AdminLogin onSignIn={signIn} />;

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "noor-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-ivory-200/40">
      <header className="sticky top-0 z-30 border-b border-teal-900/10 bg-ivory/95 backdrop-blur">
        <div className="shell flex h-[68px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10 text-gold" />
            <div>
              <p className="text-[13px] font-semibold text-teal-900">پنل مدیریت مجموعه</p>
              <p className="mt-0.5 text-[10px] text-teal-950/45">{content.brand.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="hidden items-center gap-1.5 rounded-full border border-teal-900/15 px-4 py-2 text-[11.5px] text-teal-900 transition-colors hover:border-gold/60 sm:inline-flex"
              to="/"
            >
              <Icon name="external" size={14} />
              مشاهده سایت
            </Link>
            <button
              className="rounded-full bg-teal-900 px-4 py-2 text-[11.5px] text-ivory transition-colors hover:bg-turquoise"
              onClick={signOut}
              type="button"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="shell grid gap-6 py-7 lg:grid-cols-[230px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="no-scrollbar flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((item) => (
              <button
                className={`shrink-0 rounded-xl px-3.5 py-2.5 text-right text-[12px] transition-colors ${
                  tab === item.key
                    ? "bg-teal-900 text-ivory"
                    : "text-teal-950/60 hover:bg-white/60 hover:text-teal-900"
                }`}
                key={item.key}
                onClick={() => setTab(item.key)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-4 hidden rounded-xl border border-gold/25 bg-gold/[0.06] p-4 lg:block">
            <StarGlyph className="h-3.5 w-3.5 text-gold" />
            <p className="mt-2 text-[10.5px] leading-6 text-teal-950/55">
              تغییرات به‌صورت خودکار در همین مرورگر ذخیره می‌شوند.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          {tab === "content" ? <ContentEditor /> : null}

          {tab === "programs" ? (
            <CollectionEditor
              addLabel="افزودن دوره"
              description="دوره‌های بخش «آموزش و انس با قرآن کریم»."
              fields={[
                { key: "title", label: "عنوان", type: "text" },
                { key: "icon", label: "آیکون", type: "select", options: [
                  { value: "book", label: "کتاب" },
                  { value: "sparkle", label: "درخشش" },
                  { value: "moon", label: "ماه" },
                  { value: "bulb", label: "اندیشه" },
                  { value: "compass", label: "قطب‌نما" },
                  { value: "heart", label: "دل" },
                ] },
                { key: "description", label: "توضیح کوتاه", type: "textarea", full: true },
                { key: "fullDescription", label: "توضیح کامل", type: "textarea", full: true },
                { key: "status", label: "وضعیت", type: "select", options: programStatusOptions },
              ]}
              itemMeta={(item) => item.description}
              itemTitle={(item) => item.title}
              items={content.programs}
              makeItem={() =>
                ({
                  id: crypto.randomUUID(),
                  title: "",
                  description: "",
                  fullDescription: "",
                  icon: "book",
                  status: "soon",
                }) as Program
              }
              onChange={(programs) => update((current) => ({ ...current, programs }))}
              title="برنامه‌های قرآنی"
            />
          ) : null}

          {tab === "tracks" ? (
            <CollectionEditor
              addLabel="افزودن محور"
              description="محورهای بخش «تربیت، رشد و تعالی انسان»."
              fields={[
                { key: "title", label: "عنوان", type: "text" },
                { key: "icon", label: "آیکون", type: "select", options: [
                  { value: "heart", label: "دل" },
                  { value: "leaf", label: "برگ" },
                  { value: "users", label: "گروه" },
                  { value: "compass", label: "قطب‌نما" },
                  { value: "shield", label: "سپر" },
                  { value: "bulb", label: "اندیشه" },
                ] },
                { key: "description", label: "توضیح", type: "textarea", full: true },
              ]}
              itemTitle={(item) => item.title}
              items={content.tracks}
              makeItem={() =>
                ({ id: crypto.randomUUID(), title: "", description: "", icon: "heart" }) as Track
              }
              onChange={(tracks) => update((current) => ({ ...current, tracks }))}
              title="محورهای تربیتی"
            />
          ) : null}

          {tab === "activities" ? (
            <CollectionEditor
              addLabel="افزودن فعالیت"
              description="فعالیت‌ها در صفحه اصلی و صفحه فعالیت‌ها نمایش داده می‌شوند. نشانی (slug) باید یکتا و لاتین باشد."
              fields={[
                { key: "title", label: "عنوان", type: "text" },
                { key: "slug", label: "نشانی صفحه", type: "text", dir: "ltr" },
                { key: "category", label: "دسته‌بندی", type: "text" },
                { key: "date", label: "تاریخ", type: "text" },
                { key: "time", label: "زمان", type: "text" },
                { key: "location", label: "مکان", type: "text" },
                { key: "status", label: "وضعیت", type: "select", options: activityStatusOptions },
                { key: "visual", label: "تصویر", type: "visual" },
                { key: "description", label: "توضیح کوتاه", type: "textarea", full: true },
                { key: "body", label: "متن کامل", type: "lines", full: true, hint: "هر پاراگراف را با یک خط خالی جدا کنید." },
                { key: "registration", label: "ثبت‌نام آنلاین فعال باشد", type: "toggle", full: true },
              ]}
              itemMeta={(item) => `${item.date} · ${item.category}`}
              itemTitle={(item) => item.title}
              items={content.activities}
              makeItem={() =>
                ({
                  id: crypto.randomUUID(),
                  slug: `activity-${Date.now()}`,
                  title: "",
                  category: "",
                  description: "",
                  body: [],
                  date: "",
                  time: "",
                  location: "",
                  status: "soon",
                  visual: "arch",
                  registration: false,
                }) as Activity
              }
              onChange={(activities) => update((current) => ({ ...current, activities }))}
              title="فعالیت‌ها"
            />
          ) : null}

          {tab === "articles" ? (
            <CollectionEditor
              addLabel="افزودن خبر"
              description="اخبار، اطلاعیه‌ها و گزارش‌ها."
              fields={[
                { key: "title", label: "عنوان", type: "text" },
                { key: "slug", label: "نشانی صفحه", type: "text", dir: "ltr" },
                { key: "category", label: "دسته‌بندی", type: "text" },
                { key: "date", label: "تاریخ انتشار", type: "text" },
                { key: "visual", label: "تصویر", type: "visual" },
                { key: "excerpt", label: "خلاصه", type: "textarea", full: true },
                { key: "body", label: "متن کامل", type: "lines", full: true, hint: "هر پاراگراف را با یک خط خالی جدا کنید." },
              ]}
              itemMeta={(item) => `${item.date} · ${item.category}`}
              itemTitle={(item) => item.title}
              items={content.articles}
              makeItem={() =>
                ({
                  id: crypto.randomUUID(),
                  slug: `article-${Date.now()}`,
                  title: "",
                  category: "",
                  excerpt: "",
                  body: [],
                  date: "",
                  visual: "light",
                }) as Article
              }
              onChange={(articles) => update((current) => ({ ...current, articles }))}
              title="اخبار و رویدادها"
            />
          ) : null}

          {tab === "gallery" ? (
            <CollectionEditor
              addLabel="افزودن تصویر"
              description="برای افزودن عکس واقعی، نشانی تصویر را در فیلد ویدیو/تصویر خارجی وارد کنید یا از طرح‌های آماده استفاده کنید."
              fields={[
                { key: "caption", label: "توضیح تصویر", type: "text" },
                { key: "category", label: "دسته‌بندی", type: "text" },
                { key: "kind", label: "نوع", type: "select", options: [
                  { value: "image", label: "تصویر" },
                  { value: "video", label: "ویدیو" },
                ] },
                { key: "visual", label: "طرح/تصویر", type: "visual" },
                { key: "videoUrl", label: "نشانی ویدیو (اختیاری)", type: "text", dir: "ltr", full: true },
              ]}
              itemMeta={(item) => item.category}
              itemTitle={(item) => item.caption}
              items={content.gallery}
              makeItem={() =>
                ({
                  id: crypto.randomUUID(),
                  kind: "image",
                  visual: "rosette",
                  videoUrl: "",
                  caption: "",
                  category: "عمومی",
                }) as GalleryItem
              }
              onChange={(gallery) => update((current) => ({ ...current, gallery }))}
              title="گالری"
            />
          ) : null}

          {tab === "contact" ? <ContactEditor /> : null}
          {tab === "inbox" ? <Inbox /> : null}

          {tab === "settings" ? (
            <div className="space-y-5">
              <Panel description="یادداشت «محتوای نمونه» در بخش‌های عمومی سایت." title="نمایش یادداشت محتوا">
                <Toggle
                  checked={content.meta.showDemoNote}
                  label="یادداشت محتوای نمونه نمایش داده شود"
                  onChange={(value) =>
                    update((current) => ({ ...current, meta: { ...current.meta, showDemoNote: value } }))
                  }
                />
                <p className="mt-3 text-[11px] leading-6 text-teal-950/40">
                  پس از جایگزینی محتوای واقعی، این یادداشت را خاموش کنید.
                </p>
              </Panel>

              <Panel description="نسخه پشتیبان از تمام محتوای فعلی سایت." title="پشتیبان‌گیری">
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-full bg-teal-900 px-5 py-2.5 text-[11.5px] text-ivory transition-colors hover:bg-turquoise"
                    onClick={exportContent}
                    type="button"
                  >
                    دریافت فایل JSON
                  </button>
                  <button
                    className="rounded-full border border-terracotta/30 px-5 py-2.5 text-[11.5px] text-terracotta transition-colors hover:bg-terracotta/10"
                    onClick={() => {
                      if (window.confirm("همه محتوا به حالت پیش‌فرض بازگردانده شود؟")) reset();
                    }}
                    type="button"
                  >
                    بازگردانی محتوای پیش‌فرض
                  </button>
                </div>
              </Panel>

              <Panel description="پیکربندی امنیت پنل." title="دسترسی">
                <ul className="space-y-2 text-[11.5px] leading-6 text-teal-950/60">
                  <li>• گذرواژه پنل از متغیر محیطی <span dir="ltr" className="text-gold">VITE_ADMIN_PASSWORD</span> خوانده می‌شود.</li>
                  <li>• نشانی پنل: <span dir="ltr" className="text-teal-900">/admin</span></li>
                  <li>• محتوا در حافظه همین مرورگر ذخیره می‌شود؛ برای CMS چندکاربره، اتصال به سرور لازم است.</li>
                </ul>
              </Panel>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
