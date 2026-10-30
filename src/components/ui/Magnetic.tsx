"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** 0–1: how far the element follows the cursor from its center. */
  strength?: number;
  /** Scale while hovered; use a smaller value for big elements. */
  hoverScale?: number;
};

const SPRING = { stiffness: 220, damping: 14, mass: 0.5 };

/**
 * Pulls its child toward the cursor, springs on hover/press, and exposes the
 * pointer's entry/exit point inside the element as CSS vars `--fx` / `--fy`
 * (inherited by children, e.g. <LiquidFill />).
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  hoverScale = 1.08,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const setOrigin = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--fx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--fy", `${e.clientY - rect.top}px`);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = (e: PointerEvent) => {
    setOrigin(e);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.92, rotate: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      onPointerEnter={setOrigin}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}
