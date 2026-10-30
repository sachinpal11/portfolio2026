"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Copies of the content in the track; one copy's width is the wrap distance. */
const COPIES = 4;
/** Scroll speed (px/s) that doubles the marquee speed. */
const BOOST_AT = 1000;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type VelocityMarqueeProps = {
  children: ReactNode;
  /** Resting speed in % of the track per second (≈ px/s × 100 / trackWidth). */
  speed?: number;
  className?: string;
  trackClassName?: string;
};

/**
 * Endless marquee. Drifts slowly left at rest, speeds up with scroll velocity,
 * and flips direction whenever the user scrolls up (down scrolls it back left).
 */
export function VelocityMarquee({
  children,
  speed = 0.8,
  className,
  trackClassName,
}: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const direction = useRef(-1); // -1 = leftwards, 1 = rightwards

  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;

    const v = smoothVelocity.get();
    if (v > 20) direction.current = -1;
    else if (v < -20) direction.current = 1;

    const boost = Math.abs(v) / BOOST_AT;
    baseX.set(
      baseX.get() + direction.current * speed * (1 + boost) * (delta / 1000),
    );
  });

  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn("flex shrink-0 items-center", trackClassName)}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
