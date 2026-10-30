"use client";

import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { PointerArrow } from "@/components/ui/PointerArrow";
import { Reveal } from "@/components/ui/Reveal";
import { workColumns } from "@/data/work";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { WorkCard } from "./WorkCard";

/**
 * Rounded blue stage holding two staggered columns of project cards. The columns
 * drift in opposite directions as the section scrolls, the top/bottom edges fade
 * into the blue, and a pill floats in the middle linking to the full work.
 */
export function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useScrollProgress(ref);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const leftY = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  // Mobile stacks the columns into one list, so both must move together
  const stackY = useTransform(scrollYProgress, [0, 1], [30, -160]);
  const columnY = isDesktop ? [leftY, rightY] : [stackY, stackY];

  return (
    <section id="work" className="bg-white py-8 md:py-16">
      <Container>
        <Reveal inView y={50}>
          <div
            ref={ref}
            className="relative h-[560px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#7cbaff] via-accent to-[#2f86f0] md:h-[600px]"
          >
            {/* Soft light blobs behind the cards for depth */}
            <div
              aria-hidden
              className="absolute -left-20 top-10 size-80 rounded-full bg-white/25 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -right-24 bottom-0 size-96 rounded-full bg-[#1d4ed8]/30 blur-3xl"
            />

            {/* Mobile: one column, one card per row. md+: two staggered columns. */}
            <div className="absolute inset-x-[6%] top-0 flex flex-col gap-3 md:inset-x-[4%] md:flex-row md:gap-[3%]">
              {workColumns.map((column, c) => (
                <motion.div
                  key={c}
                  style={{ y: columnY[c] }}
                  className={`flex w-full flex-col gap-3 md:flex-1 md:gap-5 ${
                    c === 0 ? "md:-mt-10" : "md:mt-14"
                  }`}
                >
                  {column.map((work) => (
                    <WorkCard key={work.title} {...work} />
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Fade the top and bottom edges into the blue */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#7cbaff] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#2f86f0] to-transparent"
            />

            {/* Center pill + link button */}
            <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
              <span className="whitespace-nowrap rounded-full border border-white/60 bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-md md:text-base">
                Seen Recent Works
              </span>
              <Magnetic>
                <a
                  href="#work"
                  aria-label="View all work"
                  className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-[#3b414d] to-[#05070c] text-xl text-white shadow-xl ring-4 ring-white/50"
                >
                  <PointerArrow />
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
