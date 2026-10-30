"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate on scroll into view instead of on mount. */
  inView?: boolean;
};

/** Fade + rise entrance. Use `delay` to stagger siblings. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  inView = false,
}: RevealProps) {
  const target = { opacity: 1, y: 0 };
  const transition = { duration: DURATION.base, ease: EASE_OUT, delay };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(inView
        ? { whileInView: target, viewport: { once: true, margin: "-10%" } }
        : { animate: target })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
