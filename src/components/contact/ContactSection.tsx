import { useContent } from "@/content/store";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { OrnamentDivider, StarGlyph } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const { content } = useContent();
  const { contact, socials } = content;

  const rows = [
    contact.address ? { icon: "pin" as const, label: "نشانی مجموعه", value: contact.address, href: "" } : null,
    contact.phone
      ? { icon: "phone" as const, label: "شماره تماس", value: contact.phone, href: `tel:${contact.phone}` }
      : null,
    contact.email
      ? { icon: "mail" as const, label: "ایمیل", value: contact.email, href: `mailto:${contact.email}` }
      : null,
    contact.hours ? { icon: "clock" as const, label: "ساعات پاسخگویی", value: contact.hours, href: "" } : null,
  ].filter((row): row is { icon: "pin" | "phone" | "mail" | "clock"; label: string; value: string; href: string } => row !== null);

  return (
    <section className="relative overflow-hidden bg-ivory py-20 lg:py-28" id="contact">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.04]" />
      <div className="relative shell">
        {showHeading ? (
          <SectionHeading
            align="center"
            eyebrow="ارتباط با ما"
            lead="برای پرسش‌ها، پیشنهادها و هماهنگی برنامه‌ها از راه‌های زیر با مجموعه در تماس باشید."
            title="ارتباط با مجموعه"
          />
        ) : null}

        <div className={`grid gap-6 lg:grid-cols-[1.05fr_0.95fr] ${showHeading ? "mt-12" : ""}`}>
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-teal-900 p-6 text-ivory sm:p-8">
              <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.1]" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10.5px] tracking-[0.28em] text-gold-300/85">
                  <StarGlyph className="h-2.5 w-2.5" />
                  اطلاعات تماس
                </div>
                <h3 className="mt-3 text-[18px] font-semibold">در خدمت شما هستیم</h3>

                {rows.length > 0 ? (
                  <ul className="mt-7 space-y-5">
                    {rows.map((row) => (
                      <li className="flex items-start gap-3.5" key={row.label}>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                          <Icon name={row.icon} size={17} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10.5px] tracking-[0.14em] text-ivory/45">{row.label}</p>
                          {row.href ? (
                            <a
                              className="mt-1 block break-words text-[13.5px] leading-7 text-ivory/90 transition-colors hover:text-gold-300"
                              dir={row.icon === "mail" ? "ltr" : "rtl"}
                              href={row.href}
                            >
                              {row.value}
                            </a>
                          ) : (
                            <p className="mt-1 text-[13.5px] leading-7 text-ivory/90">{row.value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-6 rounded-2xl border border-gold/25 bg-teal-950/40 p-5">
                    <p className="text-[12.5px] leading-7 text-ivory/65">
                      نشانی، شماره تماس، ایمیل و ساعات پاسخگویی هنوز ثبت نشده است. این اطلاعات از پنل
                      مدیریت مجموعه تکمیل و در همین بخش نمایش داده می‌شود.
                    </p>
                  </div>
                )}

                {contact.whatsapp ? (
                  <a
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[12px] text-gold-300 transition-colors hover:bg-gold hover:text-teal-950"
                    href={contact.whatsapp}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon name="whatsapp" size={16} />
                    گفت‌وگو در واتساپ
                  </a>
                ) : null}

                {contact.mapEmbedUrl ? (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-ivory/15">
                    <iframe
                      className="h-56 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={contact.mapEmbedUrl}
                      title="نقشه موقعیت مجموعه"
                    />
                  </div>
                ) : (
                  <p className="mt-6 text-[11.5px] leading-6 text-ivory/40">
                    نقشه موقعیت مجموعه پس از ثبت نشانی دقیق در پنل مدیریت نمایش داده می‌شود.
                  </p>
                )}

                {socials.length > 0 ? (
                  <>
                    <OrnamentDivider className="my-6" />
                    <div className="flex flex-wrap items-center gap-2.5">
                      {socials.map((social) => (
                        <a
                          aria-label={social.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/18 text-ivory/75 transition-colors hover:border-gold/60 hover:text-gold"
                          href={social.href}
                          key={social.id}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Icon name={social.icon} size={17} />
                        </a>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
