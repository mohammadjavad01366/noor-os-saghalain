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

## خروجی آماده انتشار (بدون Base44)

دو بسته مستقل از Base44 ساخته می‌شود؛ هیچ حساب کاربری یا سرویس ابری لازم نیست و همه دارایی‌ها
(فونت، تصویر، ویدئوی بخش نخست) داخل خود بسته قرار می‌گیرند:

```bash
# داخل کانتینر توسعه
docker compose -f docker-compose.base44.yml exec -T web pnpm export:build
# ساخت فایل‌های zip
bash scripts/export-zip.sh
```

| بسته | محل | کاربرد |
| --- | --- | --- |
| `export/noor-al-thaqalain-static.zip` | `dist` استاتیک + `.htaccess` + `404.html` + `README.txt` | هر هاست ساده (cPanel/Apache/Nginx/Netlify) |
| `export/noor-al-thaqalain-theme.zip` | پوسته واقعی وردپرس (`style.css`، `functions.php`، `index.php`، `header.php`، `footer.php`، `assets/`) | نصب از «پوسته‌ها → افزودن → بارگذاری پوسته» |

- **استاتیک:** فایل‌ها را در `public_html` آپلود کنید؛ `.htaccess` مسیرهای تمیز (`/about`، `/news/...`)
  را به `index.html` هدایت می‌کند. برای زیرشاخه، با `--base=/noor/` دوباره بسازید.
- **وردپرس:** قالب همان بسته React را از پوشه `assets` بارگذاری می‌کند و به Node.js روی هاست نیاز
  ندارد. مسیرها به‌شکل hash هستند (`/#/quran`) تا بدون تنظیم rewrite کار کند.
- هر دو بسته با `vite build` واقعی ساخته می‌شوند (minify + هش فایل‌ها)؛ سورس دست‌نخورده در
  پوشه‌های `dist-static` و `dist-theme` نیز باقی می‌ماند.

### ویدئوی بخش نخست

`public/videos/hero-scrub.mp4` نسخه‌ای است که هر فریم آن keyframe است تا پیمایش با اسکرول بدون پرش
انجام شود. اگر آن را عوض کردید، با همان تنظیمات کدگذاری کنید:

```bash
ffmpeg -i input.mp4 -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
  -g 1 -sc_threshold 0 -movflags +faststart public/videos/hero-scrub.mp4
```

## ساختار طراحی

- پالت و تایپوگرافی در `src/styles/tailwind.css` (`@theme`) تعریف شده‌اند: teal تیره، فیروزه‌ای،
  عاج گرم و طلایی.
- عمق سه‌بعدی با کلاس‌های `.stage`، `.depth-card`، `.depth-plate` و لایه‌های `Parallax` ساخته می‌شود؛
  همه با transform و بدون کتابخانه ۳بعدی.
- همه لایه‌های اسکرول از یک listener مشترک (`src/lib/scrollEngine.ts`) تغذیه می‌شوند.

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
