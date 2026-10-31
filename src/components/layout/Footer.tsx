import { Link } from "react-router-dom";
import { navItems } from "@/content/nav";
import { useContent } from "@/content/store";
import { Icon } from "@/components/ui/Icon";
import { BrandMark, OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";

export function Footer() {
  const { content } = useContent();
  const { contact, socials } = content;

  const contactRows = [
    contact.address ? { icon: "pin" as const, value: contact.address, href: "" } : null,
    contact.phone ? { icon: "phone" as const, value: contact.phone, href: `tel:${contact.phone}` } : null,
    contact.email ? { icon: "mail" as const, value: contact.email, href: `mailto:${contact.email}` } : null,
    contact.hours ? { icon: "clock" as const, value: contact.hours, href: "" } : null,
  ].filter((row): row is { icon: "pin" | "phone" | "mail" | "clock"; value: string; href: string } => row !== null);

  return (
    <footer className="relative overflow-hidden bg-teal-950 text-ivory">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.07]" />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-turquoise/15 blur-3xl"
      />

      <div className="relative shell pb-8 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="h-12 w-12 text-gold" />
              <div>
                <p className="text-[15px] font-semibold text-ivory">{content.brand.name}</p>
                <p className="mt-1 text-[9px] tracking-[0.24em] text-gold/70">
                  NOOR AL-THAQALAIN
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-[2] text-ivory/55">
              {content.hero.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.length > 0 ? (
                socials.map((social) => (
                  <a
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold/60 hover:text-gold"
                    href={social.href}
                    key={social.id}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon name={social.icon} size={17} />
                  </a>
                ))
              ) : (
                <span className="text-[11.5px] text-ivory/35">
                  شبکه‌های اجتماعی از پنل مدیریت افزوده می‌شوند.
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-gold-300">
              <StarGlyph className="h-2.5 w-2.5" />
              دسترسی سریع
            </h3>
            <ul className="mt-5 space-y-3">
              {navItems.slice(1).map((item) => (
                <li key={item.to}>
                  <Link
                    className="text-[13px] text-ivory/60 transition-colors hover:text-gold-300"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-gold-300">
              <StarGlyph className="h-2.5 w-2.5" />
              برنامه‌های آموزشی
            </h3>
            <ul className="mt-5 space-y-3">
              {content.programs.slice(0, 5).map((program) => (
                <li key={program.id}>
                  <Link
                    className="text-[13px] leading-6 text-ivory/60 transition-colors hover:text-gold-300"
                    to="/quran"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-gold-300">
              <StarGlyph className="h-2.5 w-2.5" />
              ارتباط با ما
            </h3>
            {contactRows.length > 0 ? (
              <ul className="mt-5 space-y-3.5">
                {contactRows.map((row) => (
                  <li className="flex items-start gap-2.5 text-[12.5px] leading-6 text-ivory/60" key={row.value}>
                    <Icon className="mt-1 shrink-0 text-gold/60" name={row.icon} size={14} />
                    {row.href ? (
                      <a className="transition-colors hover:text-gold-300" href={row.href}>
                        {row.value}
                      </a>
                    ) : (
                      <span>{row.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[12px] leading-6 text-ivory/40">
                نشانی، شماره تماس و ساعات پاسخگویی پس از تکمیل در پنل مدیریت در همین بخش نمایش داده
                می‌شود.
              </p>
            )}
            <Link
              className="mt-5 inline-flex items-center gap-2 text-[12.5px] text-gold-300 transition-colors hover:text-gold"
              to="/contact"
            >
              <Icon name="message" size={14} />
              ارسال پیام به مجموعه
            </Link>
          </div>
        </div>

        <OrnamentDivider className="mt-14" />

        <div className="mt-6 flex flex-col items-center gap-2 text-center text-[11.5px] text-ivory/38 sm:flex-row sm:justify-between sm:text-right">
          <p>© ۱۴۰۵ — {content.brand.fullName}</p>
          <p className="tracking-[0.12em]">{content.brand.englishName}</p>
        </div>
      </div>
    </footer>
  );
}
