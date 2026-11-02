import { type RefObject, useEffect, useState } from "react";

/**
 * Scroll-driven video scrubbing ("scroll = camera").
 *
 * The video is never played: no `video.play()` anywhere, no autoplay, no loop.
 * Only `video.currentTime` is written, so the user's scroll position *is* the
 * playhead. Writing currentTime from a raw scroll handler is what makes these
 * experiences stutter, so the work is split in two:
 *
 *   scroll (passive)  -> only records the TARGET time
 *   requestAnimationFrame loop -> eases the RENDER time towards the target and
 *                                 seeks at most once per frame
 *
 * Smoothing keeps the motion cinematic without decoupling it from the finger/
 * wheel: a 0.2 fraction-of-the-gap-per-frame lerp settles in ~100ms, fast enough
 * to feel direct, soft enough to absorb the coarse jumps of mouse wheels.
 *
 * ── Encoding requirements (this is what actually makes scrubbing smooth) ──
 * Seeking in a normal MP4 means decoding every frame from the last keyframe, so
 * the source clip supplied for this hero (4s, 24fps, ONE keyframe for the whole
 * clip) is unusable for scrubbing. `public/videos/hero-scrub.mp4` is a
 * re-encode of it, tuned for random access:
 *   - H.264 High, yuv420p, `-movflags +faststart` (moov atom first)
 *   - all-intra: `-g 1` → every frame is a keyframe, so one seek = one frame
 *   - no audio track (silent scrub, ~10% smaller)
 *   - source resolution kept (496x864): no pointless upscale, fast to decode
 * Re-encoding at a longer GOP (e.g. `-g 3`) is smaller but needs a mini-GOP
 * decode per seek; keep it at 1 for scrubbing, or 2-3 at most.
 * A WebM/VP9 alternative was measured (5.1MB all-intra) and dropped: it is
 * larger than the H.264 version, so there is no benefit in shipping both.
 */

export type ScrubVideoState = "loading" | "ready" | "failed";

/** Fraction of the remaining gap closed per 60fps frame (frame-rate corrected). */
const SMOOTHING = 0.2;
/** Sub-frame differences would re-seek to the frame that is already shown. */
const MIN_SEEK_DELTA = 1 / 48;
/** Some browsers clamp a seek to exactly `duration`, so stop one sliver earlier. */
const END_EPSILON = 0.008;
/** Loading progress is reported in ~4% steps: no render per network chunk. */
const LOAD_STEP = 0.04;

type Options = {
  src: string;
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  /** `false` for reduced motion: nothing is fetched and the engine stays off. */
  enabled: boolean;
};

export function useScrollScrubVideo({ src, sectionRef, videoRef, enabled }: Options) {
  const [state, setState] = useState<ScrubVideoState>("loading");
  const [progress, setProgress] = useState(0);

  // 1. Preload the clip into a Blob so every seek hits local memory instead of
  //    waiting on the network, and report a minimal load progress meanwhile.
  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    const controller = new AbortController();
    let objectUrl: string | null = null;
    let cancelled = false;
    let lastReport = 0;

    const markReady = () => {
      if (cancelled) return;
      setProgress(1);
      setState("ready");
    };
    const markFailed = () => {
      if (!cancelled) setState("failed");
    };

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("error", markFailed);

    const load = async () => {
      try {
        const response = await fetch(src, { signal: controller.signal });
        if (!response.ok) throw new Error(`video request failed: ${response.status}`);

        const total = Number(response.headers.get("content-length")) || 0;
        const chunks: Uint8Array[] = [];
        let received = 0;

        if (response.body) {
          const reader = response.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            if (!value) continue;
            chunks.push(value);
            received += value.byteLength;
            if (total) {
              const ratio = Math.min(0.98, received / total);
              if (ratio - lastReport >= LOAD_STEP) {
                lastReport = ratio;
                if (!cancelled) setProgress(ratio);
              }
            }
          }
        } else {
          chunks.push(new Uint8Array(await response.arrayBuffer()));
          received = chunks[0].byteLength;
        }

        if (cancelled || !received) return;
        objectUrl = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: "video/mp4" }));
        video.src = objectUrl;
        video.load();
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") markFailed();
      }
    };

    void load();

    return () => {
      cancelled = true;
      controller.abort();
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("error", markFailed);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [enabled, src, videoRef]);

  // 2. The scroll → timeline engine. Runs only once the clip can be decoded.
  useEffect(() => {
    if (!enabled || state !== "ready") return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const duration =
      Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 4.04;
    const maxTime = Math.max(0, duration - END_EPSILON);

    let sectionTop = 0;
    let travel = 1;
    let lastProgress = -1;
    let targetTime = 0;
    let renderTime = 0;
    let lastSeek = -1;
    let frame = 0;
    let lastTick = 0;

    // Layout is read here only, never inside the scroll handler or the loop.
    const measure = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      travel = Math.max(1, rect.height - window.innerHeight);
    };

    const tick = (now: number) => {
      frame = 0;
      const elapsed = lastTick ? Math.min(64, now - lastTick) : 16.667;
      lastTick = now;

      const gap = targetTime - renderTime;
      const settled = Math.abs(gap) < 0.0025;
      renderTime = settled ? targetTime : renderTime + gap * (1 - (1 - SMOOTHING) ** (elapsed / 16.667));

      // Anti-flood: one seek per frame at most, and never while the previous
      // seek is still in flight — queued seeks are what make scrubbing lag.
      if (!video.seeking && Math.abs(renderTime - lastSeek) >= MIN_SEEK_DELTA) {
        lastSeek = renderTime;
        video.currentTime = renderTime;
      }

      if (!settled || video.seeking) frame = window.requestAnimationFrame(tick);
      else lastTick = 0;
    };

    const start = () => {
      if (frame) return;
      lastTick = 0;
      frame = window.requestAnimationFrame(tick);
    };

    const readScroll = () => {
      const value = (window.scrollY - sectionTop) / travel;
      const progress = value < 0 ? 0 : value > 1 ? 1 : value;

      if (Math.abs(progress - lastProgress) > 0.0004) {
        lastProgress = progress;
        // One CSS variable drives the text parallax/fade: no React state, so
        // scrolling never re-renders a component.
        section.style.setProperty("--hero-p", progress.toFixed(4));
      }

      targetTime = progress * maxTime;
      start();
    };

    const onScroll = () => readScroll();
    const onResize = () => {
      measure();
      readScroll();
    };

    measure();
    readScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Park the loop while the hero is off-screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          measure();
          readScroll();
        } else if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "10% 0px" },
    );
    observer.observe(section);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, state, sectionRef, videoRef]);

  return { state, progress };
}
