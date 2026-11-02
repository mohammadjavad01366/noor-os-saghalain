import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/content/nav";
import { useContent } from "@/content/store";
import { Icon } from "@/components/ui/Icon";
import { BrandMark, StarGlyph } from "@/components/ui/Ornament";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { content } = useContent();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-gold/15 bg-teal-950/92 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-teal-950/70 via-teal-950/22 to-transparent"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-5 lg:h-[80px]">
          <Link
            aria-label={content.brand.fullName}
            className="group flex shrink-0 items-center gap-3"
            onClick={() => setOpen(false)}
            to="/"
          >
            <span className="relative flex h-10 w-10 items-center justify-center text-gold transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-45 lg:h-11 lg:w-11">
              <BrandMark className="h-10 w-10 lg:h-11 lg:w-11" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[12.5px] font-semibold text-ivory sm:text-[14px]">
                {content.brand.name}
              </span>
              <span className="mt-1 text-[8.5px] font-medium tracking-[0.26em] text-gold/70">
                NOOR AL-THAQALAIN
              </span>
            </span>
          </Link>

          <nav aria-label="ناوبری اصلی" className="hidden min-w-0 items-center xl:flex">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[12.5px] transition-colors duration-300 ${
                    active ? "text-gold-300" : "text-ivory/75 hover:text-ivory"
                  }`}
                  key={item.to}
                  to={item.to}
                >
                  {item.short}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0.5 h-px origin-right bg-gold/80 transition-transform duration-500 ease-[var(--ease-soft)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-[12.5px] font-medium text-teal-950 shadow-[0_14px_30px_-18px_rgba(197,154,90,0.9)] transition-transform duration-300 hover:-translate-y-0.5 2xl:inline-flex"
              to="/quran"
            >
              ثبت‌نام دوره‌ها
              <Icon name="arrow" size={14} />
            </Link>

            <button
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold/60 hover:text-gold xl:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              <span
                className={`absolute h-px bg-current transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
                style={{ width: 18 }}
              />
              <span
                className={`absolute h-px bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
                style={{ width: 18 }}
              />
              <span
                className={`absolute h-px bg-current transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
                style={{ width: 18 }}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 xl:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        id="mobile-menu"
        inert={!open}
      >
        <button
          aria-label="بستن منو"
          className={`absolute inset-0 bg-teal-950/70 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          type="button"
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-[400px] flex-col overflow-y-auto bg-teal-950 shadow-[-30px_0_80px_-40px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[var(--ease-soft)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div aria-hidden="true" className="pattern-star pointer-events-none absolute inset-0 opacity-[0.07]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-1/3 h-56 w-56 rounded-full bg-turquoise/15 blur-3xl"
          />

          <div className="relative flex items-center justify-between border-b border-ivory/10 px-6 pb-4 pt-5">
            <div className="flex items-center gap-2 text-gold/80">
              <StarGlyph className="h-3 w-3" />
              <span className="text-[10px] tracking-[0.28em]">فهرست مطالب</span>
            </div>
            <button
              aria-label="بستن منو"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-gold/50 hover:text-gold"
              onClick={() => setOpen(false)}
              type="button"
            >
              <Icon name="close" size={15} />
            </button>
          </div>

          <nav aria-label="ناوبری موبایل" className="relative flex flex-1 flex-col px-6 py-4">
            {navItems.map((item, index) => {
              const active = isActive(item.to);
              return (
                <Link
                  className={`flex items-center justify-between gap-4 border-b border-ivory/8 py-3.5 text-[14.5px] transition-colors duration-300 ${
                    active ? "text-gold-300" : "text-ivory/85 hover:text-gold-300"
                  }`}
                  key={item.to}
                  onClick={() => setOpen(false)}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateX(14px)",
                    transition: `opacity .5s var(--ease-soft) ${80 + index * 35}ms, transform .5s var(--ease-soft) ${80 + index * 35}ms, color .3s`,
                  }}
                  to={item.to}
                >
                  <span>{item.label}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-[10.5px] tabular-nums text-ivory/25">
                      {String(index + 1).padStart(2, "0").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])}
                    </span>
                    <Icon className="text-gold/45" name="arrow" size={15} />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="relative mt-auto px-6 pb-8 pt-4">
            <div className="gold-rule" />
            <p className="mt-5 text-[12px] leading-7 text-ivory/50">{content.brand.fullName}</p>
            <Link
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[12.5px] font-medium text-teal-950"
              onClick={() => setOpen(false)}
              to="/quran"
            >
              ثبت‌نام دوره‌ها
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
