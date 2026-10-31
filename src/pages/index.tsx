import { usePageMeta } from "@/hooks/usePageMeta";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { QuranPrograms } from "@/components/home/QuranPrograms";
import { DevelopmentTracks } from "@/components/home/DevelopmentTracks";
import { ActivitiesPreview } from "@/components/home/ActivitiesPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { VerseSection } from "@/components/home/VerseSection";
import { CtaSection } from "@/components/home/CtaSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Index() {
  usePageMeta(
    "",
    "مجموعه قرآنی و تربیتی امیرالمؤمنین نورالثقلین؛ آموزش و انس با قرآن کریم، تربیت اخلاقی و رشد معنوی در مسیر تربیت انسان قرآنی.",
  );

  return (
    <>
      <Hero />
      <AboutSection />
      <QuranPrograms />
      <DevelopmentTracks />
      <ActivitiesPreview />
      <NewsPreview />
      <GalleryPreview />
      <VerseSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
