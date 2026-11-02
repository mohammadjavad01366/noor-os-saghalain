/**
 * One shared scroll loop for every scroll-linked visual on the site.
 *
 * Sections that animate on scroll subscribe here instead of adding their own
 * listeners: a single passive `scroll` listener schedules one
 * `requestAnimationFrame`, and every subscriber is called with that frame's
 * scroll position. That keeps the page at one listener + one frame regardless
 * of how many parallax layers are on screen.
 */
type Subscriber = (scrollY: number) => void;

const subscribers = new Set<Subscriber>();
let scheduled = false;
let listening = false;

const flush = () => {
  scheduled = false;
  const scrollY = window.scrollY;
  for (const subscriber of subscribers) subscriber(scrollY);
};

const onScroll = () => {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(flush);
};

export function subscribeScroll(subscriber: Subscriber): () => void {
  subscribers.add(subscriber);
  if (!listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    listening = true;
  }
  subscriber(window.scrollY);

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0 && listening) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      listening = false;
    }
  };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
