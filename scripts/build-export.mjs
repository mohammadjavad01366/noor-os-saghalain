/**
 * Builds the two deployable exports for the institution's site:
 *
 *   1. export/noor-al-thaqalain-static/  — plain HTML/CSS/JS for any static
 *      host (cPanel, Apache, Netlify, S3 …). Clean URLs + .htaccess fallback.
 *   2. export/noor-al-thaqalain-theme/   — a real WordPress theme (PHP shell +
 *      the same bundle) that needs no Node.js on the host. Hash routing, so no
 *      rewrite rules are required.
 *
 * Run inside the dev container: `pnpm export:build`
 * Then zip the two folders (scripts/export-zip.sh does it on the sandbox host).
 *
 * No Base44/BaaS dependency is introduced: the output is static files only.
 */
import { execSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const root = process.cwd();
const exportDir = path.join(root, "export");
const themeSlug = "noor-al-thaqalain";

const staticDir = path.join(exportDir, "noor-al-thaqalain-static");
const themeDir = path.join(exportDir, "noor-al-thaqalain-theme", themeSlug);

const run = (command, env = {}) => {
  process.stdout.write(`\n→ ${command}\n`);
  execSync(command, { stdio: "inherit", env: { ...process.env, ...env } });
};

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

// ---------------------------------------------------------------- build ----
rmSync(exportDir, { recursive: true, force: true });
mkdirSync(staticDir, { recursive: true });

run("pnpm exec vite build --base=/ --outDir dist-static --emptyOutDir --logLevel warn");
// Relative base: WordPress may live at the domain root or in a subdirectory,
// and the built URLs must not depend on which.
run("pnpm exec vite build --base=./ --outDir dist-theme --emptyOutDir --manifest --logLevel warn", {
  // Hash URLs: WordPress itself owns the server routes, so the app must not
  // rely on deep-link rewrites it cannot install.
  VITE_ROUTER_MODE: "hash",
});

// ---------------------------------------------------------------- static ----
const stagingStatic = path.join(root, "dist-static");
cpSync(stagingStatic, staticDir, { recursive: true });
cpSync(path.join(root, "scripts/static/.htaccess"), path.join(staticDir, ".htaccess"));
// Hosts without rewrites still get a working 404 page.
cpSync(path.join(staticDir, "index.html"), path.join(staticDir, "404.html"));

// --------------------------------------------------------------- WP theme ---
const themeAssets = path.join(themeDir, "assets");
mkdirSync(themeAssets, { recursive: true });
for (const file of ["style.css", "functions.php", "index.php", "header.php", "footer.php", "readme.txt"]) {
  cpSync(path.join(root, "scripts/wp-theme", file), path.join(themeDir, file));
}

// The whole Vite output (hashed JS/CSS in ./assets, plus the public folders
// fonts/, images/, videos/) becomes <theme>/assets. Because the build uses a
// relative base, its `url(../fonts/…)` and chunk imports resolve inside the
// theme no matter which directory WordPress is installed in — no rewriting of
// built files is needed.
cpSync(path.join(root, "dist-theme"), themeAssets, { recursive: true });

const manifestPath = path.join(themeAssets, ".vite/manifest.json");
const themeManifest = JSON.parse(readFileSync(manifestPath, "utf8"));

// --------------------------------------------------------------- notices ----
writeFileSync(
  path.join(staticDir, "README.txt"),
  `مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین — خروجی استاتیک
==============================================================

محتوای این پوشه، وب‌سایت کامل و آماده انتشار است: HTML، CSS، JavaScript،
فونت‌ها، تصاویر و ویدئوی پس‌زمینه بخش نخست. هیچ سرویس ابری یا حساب کاربری
Base44 برای اجرای آن لازم نیست.

— نصب روی هاست اشتراکی (cPanel / Apache) —
۱. همه فایل‌های این پوشه را در public_html آپلود کنید (.htaccess پنهان است؛
   نمایش فایل‌های مخفی را فعال کنید).
۲. اگر سایت در زیرشاخه است، در .htaccess مقدار RewriteBase را تغییر دهید و
   دوباره با دستور زیر بسازید:
   pnpm exec vite build --base=/noor/
۳. آدرس سایت را باز کنید. مسیرهایی مانند /about و /news/... با کمک .htaccess
   و مرورگر رندر می‌شوند.

— Nginx —
location / {
    try_files $uri $uri/ /index.html;
}

— ساخت مجدد از سورس —
docker compose -f docker-compose.base44.yml exec -T web pnpm export:build

— ویدئوی بخش نخست —
public/videos/hero-scrub.mp4 یک نسخه all-intra برای پیمایش نرم با اسکرول است.
اگر آن را با نسخه دیگری جایگزین می‌کنید، با همان تنظیمات کدگذاری کنید
(ffmpeg -g 1 -sc_threshold 0 -movflags +faststart) وگرنه اسکرول دچار پرش می‌شود.

— وردپرس —
برای نصب به‌صورت پوسته وردپرس، از بسته noor-al-thaqalain-theme.zip استفاده کنید.
`,
  "utf8",
);

writeFileSync(
  path.join(exportDir, "noor-al-thaqalain-theme", "README.txt"),
  `WordPress theme: ${themeSlug}
=============================

Install: zip the ${themeSlug} folder (or use noor-al-thaqalain-theme.zip) and
upload it from Appearance → Themes → Add New → Upload Theme, then activate.

The theme renders the pre-built React app from ./assets. No Node.js, npm or
external service is required on the host. Routes use hash URLs (/#/quran) so the
site works without any rewrite configuration.

Fonts, the hero video and the reference photograph live in ./assets and are
referenced relative to the theme directory, so the install works at the domain
root as well as in a subdirectory where WordPress lives.
`,
  "utf8",
);

// Deployment guide ships with both packages and at the export root.
const deployReadme = path.join(root, "scripts/deploy-README.md");
for (const target of [
  path.join(exportDir, "README.md"),
  path.join(staticDir, "README.md"),
  path.join(exportDir, "noor-al-thaqalain-theme", "README.md"),
  path.join(themeDir, "README.md"),
]) {
  cpSync(deployReadme, target);
}

// ---------------------------------------------------------------- verify ----
const entry = themeManifest["index.html"];

const files = walk(staticDir).length;
const size = walk(staticDir).reduce((total, file) => total + statSync(file).size, 0);

process.stdout.write(
  [
    "",
    "Export complete:",
    `  static  → export/noor-al-thaqalain-static (${files} files, ${(size / 1024 / 1024).toFixed(2)} MB)`,
    `  theme   → export/noor-al-thaqalain-theme/${themeSlug} (${entry?.file ?? "MISSING ENTRY"})`,
    "  both packages carry README.md (deployment guide)",
    "",
  ].join("\n"),
);
