import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/contact/ContactSection";

export default function ContactPage() {
  usePageMeta(
    "ارتباط با ما",
    "راه‌های ارتباط با مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین.",
  );

  return (
    <>
      <PageHero
        breadcrumb="ارتباط با ما"
        description="برای پرسش‌ها، پیشنهادها و هماهنگی برنامه‌ها از فرم زیر یا راه‌های ارتباطی مجموعه استفاده کنید."
        eyebrow="ارتباط با ما"
        title="در خدمت شما هستیم"
      />
      <ContactSection showHeading={false} />
    </>
  );
}
