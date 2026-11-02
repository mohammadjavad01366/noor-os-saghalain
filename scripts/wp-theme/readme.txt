=== Noor Al-Thaqalain ===
Contributors: noor-althaqalain
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

قالب وب‌سایت مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین.

== Description ==

این قالب، رابط کاربری فارسی و راست‌به‌چپ وب‌سایت را از یک بسته React از پیش ساخته‌شده
(پوشه assets) بارگذاری می‌کند. هیچ سرویس Node.js روی هاست لازم نیست.

مسیرها به صورت hash هستند (مانند /#/quran) تا بدون تنظیم rewrite روی هر هاست وردپرسی کار کنند.

== Installation ==

1. پوشه noor-al-thaqalain را در wp-content/themes قرار دهید (یا فایل zip را از پیشخوان،
   بخش «پوسته‌ها → افزودن → بارگذاری پوسته» نصب کنید).
2. از بخش «پوسته‌ها» قالب Noor Al-Thaqalain را فعال کنید.
3. صفحه‌ای با قالب پیش‌فرض لازم نیست؛ محتوای سایت به‌طور کامل از بسته assets می‌آید.

== Notes ==

- برای جایگزینی محتوا، بسته assets را دوباره از مخزن پروژه بسازید (pnpm export:build).
- محتوای متنی و تصاویر از پنل مدیریت خود سایت (مسیر /#/admin) قابل ویرایش است.
