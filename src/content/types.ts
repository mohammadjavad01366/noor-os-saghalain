export type IconName =
  | "book"
  | "sparkle"
  | "heart"
  | "users"
  | "shield"
  | "bulb"
  | "calendar"
  | "star"
  | "compass"
  | "moon"
  | "lamp"
  | "leaf"
  | "scale"
  | "path"
  | "message"
  | "send"
  | "check"
  | "check-circle"
  | "alert"
  | "mail"
  | "phone"
  | "pin"
  | "clock"
  | "search"
  | "menu"
  | "close"
  | "arrow"
  | "play"
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "youtube"
  | "quote"
  | "external"
  | "trash"
  | "plus";

export type ArtVariant = "arch" | "rosette" | "lattice" | "mihrab" | "medallion" | "light";

/** A card / gallery visual: one of the built-in ornamental plates, or the uploaded photograph. */
export type Visual = ArtVariant | "photo";

export type ProgramStatus = "open" | "soon" | "archive";

export type Program = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: IconName;
  status: ProgramStatus;
};

export type Track = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
};

export type ActivityStatus = "open" | "soon" | "full" | "archive";

export type Activity = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  body: string[];
  date: string;
  time: string;
  location: string;
  status: ActivityStatus;
  visual: Visual;
  registration: boolean;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  date: string;
  visual: Visual;
};

export type GalleryItem = {
  id: string;
  kind: "image" | "video";
  visual: Visual;
  videoUrl: string;
  caption: string;
  category: string;
};

export type Verse = {
  arabic: string;
  translation: string;
  surah: string;
  ayah: string;
};

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  whatsapp: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: IconName;
};

export type SiteContent = {
  meta: { showDemoNote: boolean };
  brand: {
    name: string;
    fullName: string;
    englishName: string;
    tagline: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    eyebrow: string;
    description: string;
    mission: string;
    vision: string;
    philosophy: string;
    values: { id: string; title: string; description: string }[];
  };
  verse: Verse;
  quranVerse: Verse;
  cta: { title: string; description: string };
  contact: ContactInfo;
  socials: SocialLink[];
  programs: Program[];
  tracks: Track[];
  activities: Activity[];
  articles: Article[];
  gallery: GalleryItem[];
};

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type Registration = {
  id: string;
  activitySlug: string;
  activityTitle: string;
  name: string;
  phone: string;
  age: string;
  note: string;
  createdAt: string;
};
