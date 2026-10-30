"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

const LAYERS = 6;

type Edge = "top" | "bottom";

/**
 * Several backdrop-blur layers, each doubling the radius, masked into
 * overlapping bands so the blur ramps up smoothly toward the screen edge
 * instead of starting as a hard line. `to` is the CSS gradient direction that
 * points at the edge, so the strongest blur sits there.
 */
const buildLayers = (to: "top" | "bottom") =>
  Array.from({ length: LAYERS }, (_, i) => {
    const step = 100 / (LAYERS + 1);
    const stops = [i, i + 1, i + 2, i + 3].map((n) => Math.min(n * step, 100));
    const mask = `linear-gradient(to ${to}, transparent ${stops[0]}%, #000 ${stops[1]}%, #000 ${stops[2]}%, transparent ${stops[3]}%)`;
    return { mask, blur: `blur(${0.5 * 2 ** i}px)` };
  });

const LAYER_SETS = { top: buildLayers("top"), bottom: buildLayers("bottom") };

/** Distance (px) from the end of the page over which the bottom band slides away. */
const SLIDE_DISTANCE = 220;

/**
 * Progressive blur pinned to the top or bottom of the viewport (Vignette-style).
 * The bottom band slides off-screen as the page end approaches, so whatever
 * sits at the very bottom (the footer name) is never smeared by it. (Slid
 * rather than faded: a parent with partial opacity disables backdrop-filter.)
 */
export function ProgressiveBlur({ edge }: { edge: Edge }) {
  const remaining = useMotionValue(SLIDE_DISTANCE);
  const y = useTransform(remaining, [0, SLIDE_DISTANCE], ["100%", "0%"], {
    clamp: true,
  });

  useEffect(() => {
    if (edge !== "bottom") return;

    const update = () => {
      const left =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;
      remaining.set(Math.max(0, left));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [edge, remaining]);

  return (
    <motion.div
      aria-hidden
      style={edge === "bottom" ? { y } : undefined}
      className={cn(
        "pointer-events-none fixed inset-x-0 z-30 h-[min(16vh,150px)]",
        edge === "top" ? "top-0" : "bottom-0",
      )}
    >
      {LAYER_SETS[edge].map(({ mask, blur }, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
      ))}
      {/* A faint white wash so the blurred edge melts into the page */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent to-white/40",
          edge === "top" && "rotate-180",
        )}
      />
    </motion.div>
  );
}
