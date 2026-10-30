"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Arrow icon (drawn pointing up-right, i.e. -45°) that turns to face the cursor anywhere on screen. */
export function PointerArrow({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const rotate = useSpring(0, { stiffness: 220, damping: 20, mass: 0.6 });
  const angle = useRef(0); // unwrapped degrees, so the spring never spins the long way round
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const target = (Math.atan2(dy, dx) * 180) / Math.PI + 45;
      const delta = ((((target - angle.current) % 360) + 540) % 360) - 180;
      angle.current += delta;
      rotate.set(angle.current);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, rotate]);

  return (
    <motion.span ref={ref} style={{ rotate }} className="inline-flex">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={cn("size-5 fill-none stroke-current stroke-2", className)}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </motion.span>
  );
}
