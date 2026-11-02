import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion, subscribeScroll } from "@/lib/scrollEngine";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Multiplier of the element's distance from the viewport centre (keep < 0.25). */
  speed?: number;
  /** Maximum travel in pixels. */
  limit?: number;
};

/**
 * Moves its children against the scroll direction to fake camera depth.
 * Only a CSS variable is written — the transform itself lives in the
 * stylesheet (`[data-parallax]`), so this never triggers layout or a
 * React render, and it shares the site's single scroll frame.
 */
export function Parallax({ children, className = "", speed = 0.12, limit = 70 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const shift = () => {
      const rect = node.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
      const travel = Math.max(-limit, Math.min(limit, distance * -speed));
      node.style.setProperty("--parallax-y", `${travel.toFixed(2)}px`);
    };

    return subscribeScroll(shift);
  }, [speed, limit]);

  return (
    <div className={className} data-parallax="" ref={ref}>
      {children}
    </div>
  );
}
