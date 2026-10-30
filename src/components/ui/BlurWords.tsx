"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

type BlurWordsProps = {
  text: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
};

const container = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: delay } },
});

/** Each word un-blurs and fades in, one after another, when scrolled into view. */
const word: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 6 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function BlurWords({ text, className, delay = 0 }: BlurWordsProps) {
  return (
    <motion.p
      aria-label={text}
      variants={container(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={cn(className)}
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={word}
          className="inline-block whitespace-pre"
        >
          {w + " "}
        </motion.span>
      ))}
    </motion.p>
  );
}
