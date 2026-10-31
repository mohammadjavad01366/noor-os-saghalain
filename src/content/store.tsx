import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultContent } from "./defaults";
import type {
  ContactMessage,
  Registration,
  SiteContent,
} from "./types";

const CONTENT_KEY = "noor:content:v1";
const SUBMISSIONS_KEY = "noor:submissions:v1";
const SESSION_KEY = "noor:admin:v1";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "noor1405";

/** True while the panel still uses the built-in development passphrase. */
export const adminPasswordIsDefault = !import.meta.env.VITE_ADMIN_PASSWORD;

type Submissions = {
  messages: ContactMessage[];
  registrations: Registration[];
};

type ContentContextValue = {
  content: SiteContent;
  update: (updater: (current: SiteContent) => SiteContent) => void;
  reset: () => void;
  submissions: Submissions;
  addMessage: (message: Omit<ContactMessage, "id" | "createdAt">) => void;
  addRegistration: (registration: Omit<Registration, "id" | "createdAt">) => void;
  removeSubmission: (kind: "messages" | "registrations", id: string) => void;
  isAdmin: boolean;
  signIn: (password: string) => boolean;
  signOut: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep working in memory */
  }
}

/** Merge stored content with the defaults so new fields never come back undefined. */
function hydrate(stored: Partial<SiteContent> | null): SiteContent {
  if (!stored) return defaultContent;

  return {
    ...defaultContent,
    ...stored,
    meta: { ...defaultContent.meta, ...stored.meta },
    brand: { ...defaultContent.brand, ...stored.brand },
    hero: { ...defaultContent.hero, ...stored.hero },
    about: { ...defaultContent.about, ...stored.about },
    verse: { ...defaultContent.verse, ...stored.verse },
    quranVerse: { ...defaultContent.quranVerse, ...stored.quranVerse },
    cta: { ...defaultContent.cta, ...stored.cta },
    contact: { ...defaultContent.contact, ...stored.contact },
    socials: stored.socials ?? defaultContent.socials,
    programs: stored.programs ?? defaultContent.programs,
    tracks: stored.tracks ?? defaultContent.tracks,
    activities: stored.activities ?? defaultContent.activities,
    articles: stored.articles ?? defaultContent.articles,
    gallery: stored.gallery ?? defaultContent.gallery,
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() =>
    hydrate(readStorage<Partial<SiteContent> | null>(CONTENT_KEY, null)),
  );
  const [submissions, setSubmissions] = useState<Submissions>(() =>
    readStorage<Submissions>(SUBMISSIONS_KEY, { messages: [], registrations: [] }),
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    writeStorage(CONTENT_KEY, content);
  }, [content]);

  useEffect(() => {
    writeStorage(SUBMISSIONS_KEY, submissions);
  }, [submissions]);

  const update = useCallback((updater: (current: SiteContent) => SiteContent) => {
    setContent((current) => updater(current));
  }, []);

  const reset = useCallback(() => {
    setContent(defaultContent);
  }, []);

  const addMessage = useCallback(
    (message: Omit<ContactMessage, "id" | "createdAt">) => {
      setSubmissions((current) => ({
        ...current,
        messages: [
          {
            ...message,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
          ...current.messages,
        ],
      }));
    },
    [],
  );

  const addRegistration = useCallback(
    (registration: Omit<Registration, "id" | "createdAt">) => {
      setSubmissions((current) => ({
        ...current,
        registrations: [
          {
            ...registration,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
          ...current.registrations,
        ],
      }));
    },
    [],
  );

  const removeSubmission = useCallback(
    (kind: "messages" | "registrations", id: string) => {
      setSubmissions((current) => ({
        ...current,
        [kind]:
          kind === "messages"
            ? current.messages.filter((item) => item.id !== id)
            : current.registrations.filter((item) => item.id !== id),
      }));
    },
    [],
  );

  const signIn = useCallback((password: string) => {
    const ok = password.trim() === ADMIN_PASSWORD;
    if (ok) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setIsAdmin(true);
    }
    return ok;
  }, []);

  const signOut = useCallback(() => {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setIsAdmin(false);
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      update,
      reset,
      submissions,
      addMessage,
      addRegistration,
      removeSubmission,
      isAdmin,
      signIn,
      signOut,
    }),
    [
      content,
      update,
      reset,
      submissions,
      addMessage,
      addRegistration,
      removeSubmission,
      isAdmin,
      signIn,
      signOut,
    ],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
}
