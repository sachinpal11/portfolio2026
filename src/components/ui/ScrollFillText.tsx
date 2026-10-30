"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/lib/useScrollProgress";

const MUTED = "rgba(11, 18, 32, 0.16)";
const FILLED = "rgb(11, 18, 32)";

type ScrollFillTextProps = {
  text: string;
  className?: string;
};

function Word({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const color = useTransform(progress, [start, end], [MUTED, FILLED]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

/**
 * Starts fully muted; as the paragraph scrolls up the screen each word, in
 * reading order, transitions from pale gray to the full text color.
 */
export function ScrollFillText({ text, className }: ScrollFillTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollYProgress = useScrollProgress(ref, 0.85, 0.6);

  const words = text.split(" ");

  return (
    <p ref={ref} aria-label={text} className={cn(className)}>
      {words.map((w, i) =>
        reduceMotion ? (
          <span key={i} aria-hidden>
            {w}{" "}
          </span>
        ) : (
          <span key={i} aria-hidden>
            <Word
              progress={scrollYProgress}
              start={i / words.length}
              end={Math.min((i + 1.5) / words.length, 1)}
            >
              {w}
            </Word>{" "}
          </span>
        ),
      )}
    </p>
  );
}
