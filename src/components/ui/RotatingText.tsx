"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { DURATION } from "@/lib/motion";

type RotatingTextProps = {
  words: readonly string[];
  /** Time between swaps, in ms. */
  interval?: number;
  /** Delay (s) before the very first word appears. */
  delay?: number;
  className?: string;
};

const wordVariants = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: delay } },
  exit: { transition: { staggerChildren: 0.02 } },
});

/** Letters never move: they only dissolve through a blur, in a soft left-to-right wave. */
const letterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    filter: "blur(14px)",
    transition: { duration: 0.45, ease: "easeIn" },
  },
};

/** Cycles through `words`; each one blurs away in place as the next blurs into focus. */
export function RotatingText({
  words,
  interval = 3800,
  delay = 0,
  className,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setStarted(true);
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index];

  if (reduceMotion) {
    return (
      <span className="block">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            className={cn("block whitespace-nowrap", className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  return (
    <span className="block">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          aria-label={word}
          className={cn("block whitespace-nowrap", className)}
          variants={wordVariants(started ? 0 : delay)}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {[...word].map((char, i) =>
            char === " " ? (
              <span key={i} aria-hidden className="inline-block w-[0.28em]" />
            ) : (
              <motion.span
                key={i}
                aria-hidden
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ),
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
