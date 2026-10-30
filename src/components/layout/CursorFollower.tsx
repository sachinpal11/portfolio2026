"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const SIZE = 14;
/** Size multiplier over clickable elements (14px → 35px). */
const HOVER_SCALE = 2.5;
const SPRING = { stiffness: 400, damping: 32, mass: 0.4 };
const INTERACTIVE = "a, button, [role='button']";

/** Small black dot that trails the pointer; over links/buttons it grows 2.5× and becomes a transparent ring with a 1px white border. Hidden on touch devices. */
export function CursorFollower() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    setEnabled(fine.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX - SIZE / 2);
      rawY.set(e.clientY - SIZE / 2);
      setVisible(true);
      setActive(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
      style={{ x, y, width: SIZE, height: SIZE }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: active ? HOVER_SCALE : 1,
        backgroundColor: active ? "rgba(11, 18, 32, 0)" : "rgba(11, 18, 32, 1)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* The ring is an SVG stroke that doesn't scale, so it stays a constant 1px at any size */}
      <svg viewBox="0 0 14 14" className="absolute inset-0 size-full">
        <motion.circle
          cx="7"
          cy="7"
          r="6.5"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          animate={{
            stroke: active ? "rgb(255, 255, 255)" : "rgb(11, 18, 32)",
          }}
          transition={{ duration: 0.25 }}
        />
      </svg>
    </motion.div>
  );
}
