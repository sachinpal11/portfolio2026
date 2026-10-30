"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import type { ProcessStep } from "@/data/process";
import { EASE_OUT } from "@/lib/motion";

type ProcessCardProps = ProcessStep & { index: number };

/**
 * Tilted card. Below md it's a normal stacked block; from md up it's placed
 * absolutely inside the percentage-based stage (see Process) via CSS vars.
 */
export function ProcessCard({
  number,
  title,
  text,
  pos,
  rotate,
  index,
}: ProcessCardProps) {
  return (
    <motion.article
      style={
        {
          "--l": pos.left,
          "--t": pos.top,
        } as CSSProperties
      }
      initial={{ opacity: 0, y: 70, rotate: rotate * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay: index * 0.15 }}
      whileHover={{
        rotate: 0,
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
      className="relative flex h-72 w-full flex-col justify-between rounded-[28px] bg-[#f3f6fb] p-6 shadow-[0_24px_60px_rgba(11,18,32,0.10)] md:absolute md:left-[var(--l)] md:top-[var(--t)] md:h-[78%] md:w-[31%] md:p-[2.2cqw]"
    >
      <span className="text-5xl font-light tracking-[-0.05em] md:text-[clamp(2.5rem,5.4cqw,4.5rem)]">
        {number}
      </span>
      <div>
        <h3 className="text-2xl font-normal tracking-tight md:text-[clamp(1.25rem,2.4cqw,2rem)]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60 md:text-[clamp(0.75rem,1.3cqw,1rem)]">
          {text}
        </p>
      </div>
    </motion.article>
  );
}
