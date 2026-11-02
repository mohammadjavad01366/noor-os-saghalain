export type NavItem = { label: string; to: string; short: string };

/**
 * Full site map — used by the mobile menu, the footer and the desktop bar
 * (which shows `short` so nine destinations still fit beside the brand).
 */
export const navItems: NavItem[] = [
  { label: "صفحه اصلی", to: "/", short: "صفحه اصلی" },
  { label: "درباره مجموعه", to: "/about", short: "درباره" },
  { label: "اهداف و رسالت", to: "/goals", short: "اهداف و رسالت" },
  { label: "دوره‌ها و کلاس‌های قرآنی", to: "/quran", short: "دوره‌های قرآنی" },
  { label: "برنامه‌های تربیتی و فرهنگی", to: "/education", short: "برنامه‌های تربیتی" },
  { label: "فعالیت‌ها و رویدادها", to: "/activities", short: "رویدادها" },
  { label: "اخبار و اطلاعیه‌ها", to: "/news", short: "اخبار" },
  { label: "گالری تصاویر و ویدئوها", to: "/gallery", short: "گالری" },
  { label: "ارتباط با ما", to: "/contact", short: "تماس" },
];
