"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

const SPRING = { stiffness: 70, damping: 18, mass: 0.6 };

const ParallaxContext = createContext<Pointer | null>(null);

/** Tracks the pointer as -0.5…0.5 across the window, smoothed with a spring. */
export function ParallaxProvider({ children }: { children: ReactNode }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <ParallaxContext.Provider value={{ x, y }}>
      {children}
    </ParallaxContext.Provider>
  );
}

type ParallaxLayerProps = {
  children: ReactNode;
  /** Total travel in px from one window edge to the other. Negative moves against the cursor. */
  depth: number;
  className?: string;
};

/** Fills its positioned parent and shifts with the pointer; larger depth = closer to the viewer. */
export function ParallaxLayer({
  children,
  depth,
  className,
}: ParallaxLayerProps) {
  const pointer = useContext(ParallaxContext);
  const reduce = useReducedMotion();
  const travel = reduce ? 0 : depth;

  // Fall back to a static value when used outside a provider.
  const fallback = useMotionValue(0);
  const x = useTransform(pointer?.x ?? fallback, (v) => v * travel);
  const y = useTransform(pointer?.y ?? fallback, (v) => v * travel);

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
