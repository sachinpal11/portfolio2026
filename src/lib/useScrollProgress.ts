"use client";

import { useMotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";

/**
 * 0 → 1 progress of an element passing through the viewport, as a MotionValue.
 * 0 when the element's top is at `startAt` × viewport height, 1 when its bottom
 * reaches `endAt` × viewport height (fractions measured from the top).
 * Driven by plain scroll/resize listeners.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  startAt = 1,
  endAt = 0,
) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * startAt;
      const endY = vh * endAt;
      const span = startY - endY + height;
      const value = span > 0 ? (startY - top) / span : 0;
      progress.set(Math.min(1, Math.max(0, value)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, startAt, endAt, progress]);

  return progress;
}
