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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-gold/15 bg-teal-950/95 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "bg-gradient-to-b from-teal-950/65 via-teal-950/20 to-transparent"
        }`}
      >
        <div className="shell flex h-[74px] items-center justify-between gap-4 lg:h-[84px]">
          <Link
            aria-label={content.brand.fullName}
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
            to="/"
          >
            <span className="relative flex h-11 w-11 items-center justify-center text-gold transition-transform duration-500 group-hover:rotate-45">
              <BrandMark className="h-11 w-11" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[13.5px] font-semibold text-ivory sm:text-[15px]">
                {content.brand.name}
              </span>
              <span className="mt-1 text-[9px] font-medium tracking-[0.24em] text-gold/75">
                NOOR AL-THAQALAIN
              </span>
            </span>
          </Link>

          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <Link
                className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                  isActive(item.to) ? "text-gold-300" : "text-ivory/78 hover:text-ivory"
                }`}
                key={item.to}
                to={item.to}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-right bg-gold/80 transition-transform duration-300 ${
                    isActive(item.to) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[12.5px] text-gold-300 transition-colors duration-300 hover:bg-gold hover:text-teal-950 xl:inline-flex"
              to="/contact"
            >
              <Icon name="message" size={15} />
              ارتباط با مجموعه
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
                className={`absolute h-px w-4.5 bg-current transition-all duration-300 ${
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
        className={`fixed inset-0 z-40 overflow-y-auto bg-teal-950 transition-opacity duration-500 xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        id="mobile-menu"
        inert={!open}
      >
        <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
        <div className="relative flex min-h-full flex-col px-6 pb-10 pt-24 sm:px-10">
          <p className="text-[10px] tracking-[0.3em] text-gold/70">فهرست مطالب</p>
          <nav aria-label="ناوبری موبایل" className="mt-6 flex flex-col">
            {navItems.map((item, index) => (
              <Link
                className={`flex items-center justify-between border-b border-ivory/10 py-4 text-lg transition-colors ${
                  isActive(item.to) ? "text-gold-300" : "text-ivory/85 hover:text-gold-300"
                } ${open ? "animate-fade-in" : ""}`}
                key={item.to}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${60 + index * 45}ms` }}
                to={item.to}
              >
                <span>{item.label}</span>
                <span className="flex items-center gap-3">
                  <span className="text-[11px] text-ivory/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="text-gold/50" name="arrow" size={16} />
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <div className="flex items-center gap-2 text-gold/70">
              <StarGlyph className="h-3 w-3" />
              <span className="text-[11px] tracking-[0.2em]">{content.brand.tagline}</span>
            </div>
            <p className="mt-3 text-[13px] leading-7 text-ivory/50">{content.brand.fullName}</p>
          </div>
        </div>
      </div>
    </>
  );
}
