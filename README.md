# امیرالمؤمنین نورالثقلین — وب‌سایت مجموعه قرآنی و تربیتی

وب‌سایت فارسی (RTL) مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین؛ شامل صفحه اصلی، درباره مجموعه،
فعالیت‌های قرآنی، برنامه‌های تربیتی، فعالیت‌ها، اخبار، گالری، ارتباط با ما و پنل مدیریت محتوا.

- استک: React 19، Vite 8، Tailwind CSS v4، React Router 7، TypeScript
- فونت‌ها: Vazirmatn (متن) و Amiri (آیات) به‌صورت میزبانی‌شده در `public/fonts`
- محتوا: `src/content/defaults.ts` + ویرایش از مسیر `/admin` (ذخیره در حافظه مرورگر)
- تصویر قهرمان: `public/images/hero-architecture.jpg` (تصویر مرجع مجموعه)؛ سایر تصاویر طرح‌های
  هندسی SVG هستند تا از عکس استوک یا تصویر ساختگی استفاده نشود.

## اجرا در محیط توسعه Base44

```bash
docker compose -f docker-compose.base44.yml up -d --build
# http://localhost:3000
```

`docker-compose.base44.yml` سورس را mount می‌کند و Vite را روی پورت ۳۰۰۰ منتشر می‌کند؛ بنابراین
تغییرات بدون rebuild دیده می‌شوند. برای اجرای محلی خارج از Base44:

```bash
pnpm install
pnpm dev
```

## پنل مدیریت

- نشانی: `/admin`
- گذرواژه پیش‌فرض محیط توسعه: `noor1405` — با متغیر `VITE_ADMIN_PASSWORD` قابل تغییر است.
- این پنل یک گیت سمت کلاینت برای پیش‌نمایش است؛ برای CMS چندکاربره و واقعی به سرور، نشست امن و
  کنترل دسترسی نقش‌محور نیاز است.
- نشانی، تلفن، ایمیل، ساعات پاسخگویی، نقشه و شبکه‌های اجتماعی عمداً خالی هستند و از همین پنل
  تکمیل می‌شوند.

## بررسی‌ها

```bash
pnpm check-types
pnpm lint
```

یادداشت‌های راه‌اندازی و نکات غیرمشخص در `AGENTS.md` آمده است.

---

# React Template（⚡️）

⚡️ A minimal React Vite starter template.

## Feature

- ⚡️ Fast - Build tools based on vite.
- 👻 Small - Based on the smallest runnable build.
- 💄 Prettier - Integrated Prettier to help you format the code.
- ✅ Safety - Https is enabled by default.
- 😎 Reliable - Integrated eslint and commitlint.
- 🤖 Intelligent - Integrated renovate to help you maintain the dependent version.

## Preview

[![qekup8.png](https://s1.ax1x.com/2022/03/20/qekup8.png)](https://imgtu.com/i/qekup8)

## Getting Started

```bash
npx degit lzm0x219/template-vite-react myapp

cd myapp

git init
```

### Prerequisites

- `npm` and `pnpm` should be installed.
- `git` should be installed (recommended v2.4.11 or higher)

### Available scripts

#### `pnpm dev`

Runs the app in development mode.
Open https://localhost:5173 to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

#### `pnpm build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.
