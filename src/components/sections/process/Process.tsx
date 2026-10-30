"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/data/process";
import { EASE_OUT } from "@/lib/motion";
import { ProcessCard } from "./ProcessCard";

/** Hand-drawn connectors between the cards, in the stage's 1100×450 coordinates. */
const CONNECTORS = [
  {
    path: "M296 214 C 296 84, 338 46, 404 52",
    from: [296, 214],
    to: [404, 52],
  },
  {
    path: "M690 300 C 722 296, 744 290, 750 270 C 756 246, 722 244, 722 268 C 722 292, 764 290, 774 262",
    from: [690, 300],
    to: [774, 262],
  },
] as const;

const DOT_R = 7;

/**
 * Eyebrow + heading, then three tilted step cards on a stage that scales
 * uniformly (so the connector lines always meet the cards) on md+, and a plain
 * stacked list on mobile.
 */
export function Process() {
  return (
    <section id="process" className="relative bg-white py-20 md:py-28">
      <Container>
        <div className="text-center">
          <Reveal inView>
            <p className="text-sm tracking-wide text-foreground/60">
              {process.eyebrow}
            </p>
          </Reveal>
          <Reveal inView delay={0.1} y={30}>
            <h2 className="mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.045em]">
              {process.heading}
            </h2>
          </Reveal>
        </div>

        <div className="@container relative mx-auto mt-14 max-w-[1100px] md:mt-20 md:aspect-[1100/450]">
          {/* Soft blue glow behind the cards */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[6%] inset-y-[8%] rounded-full bg-accent/25 blur-[90px]"
          />

          <div className="relative flex flex-col gap-6 md:block md:h-full">
            {process.steps.map((step, i) => (
              <ProcessCard key={step.number} {...step} index={i} />
            ))}
          </div>

          <svg
            aria-hidden
            viewBox="0 0 1100 450"
            className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible md:block"
          >
            {CONNECTORS.map(({ path, from, to }, i) => (
              <g key={i} className="stroke-accent" fill="none">
                <motion.path
                  d={path}
                  strokeWidth={3}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 1.6,
                    ease: EASE_OUT,
                    delay: 0.9 + i * 0.3,
                  }}
                />
                {[from, to].map(([cx, cy], d) => (
                  <motion.circle
                    key={d}
                    cx={cx}
                    cy={cy}
                    r={DOT_R}
                    strokeWidth={3}
                    className="fill-white"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                    transition={{
                      duration: 0.5,
                      delay: 0.9 + i * 0.3 + d * 1.1,
                    }}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>
      </Container>
    </section>
  );
}
