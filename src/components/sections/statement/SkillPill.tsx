"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import type { Skill, SkillIconName } from "@/data/statement";
import { EASE_OUT } from "@/lib/motion";

type SkillPillProps = Skill & { index: number };

/** 24×24 outline icons, drawn in white on the gradient badge. */
const ICON_PATHS: Record<SkillIconName, string> = {
  code: "M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16",
  phone:
    "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM11 18h2",
  pen: "m4 20 4-1 11-11-3-3L5 16l-1 4ZM14 7l3 3",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z",
  sparkle: "m12 3 2.4 5.6L20 11l-5.6 2.4L12 19l-2.4-5.6L4 11l5.6-2.4L12 3Z",
};

/** Lighter at the top, the base color at the bottom. */
const badgeGradient = (color: string) =>
  `linear-gradient(to bottom, color-mix(in srgb, ${color} 55%, white), ${color})`;

/**
 * Floating skill chip. Below lg it flows in a wrapped row; from lg up it's
 * placed absolutely around the statement (via CSS vars) and bobs gently.
 */
export function SkillPill({
  label,
  icon,
  color,
  pos,
  rotate,
  index,
}: SkillPillProps) {
  return (
    <motion.div
      style={
        {
          "--t": pos.top,
          "--l": pos.left ?? "auto",
          "--r": pos.right ?? "auto",
        } as CSSProperties
      }
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 + index * 0.1 }}
      className="lg:absolute lg:left-[var(--l)] lg:right-[var(--r)] lg:top-[var(--t)]"
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 3.2 + (index % 3) * 0.6,
          ease: "easeInOut",
          repeat: Infinity,
          delay: index * 0.4,
        }}
        className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white py-2.5 pl-2.5 pr-5 shadow-[0_10px_30px_rgba(11,18,32,0.10)]"
      >
        <span
          aria-hidden
          className="flex size-9 items-center justify-center rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
          style={{ background: badgeGradient(color) }}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-[18px] fill-none stroke-white stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={ICON_PATHS[icon]} />
          </svg>
        </span>
        <span className="text-sm font-medium">{label}</span>
      </motion.div>
    </motion.div>
  );
}
