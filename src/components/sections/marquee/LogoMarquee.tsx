"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { EASE_OUT } from "@/lib/motion";

type LogoMarqueeProps = {
  logos: string[];
};

/** Outer element (the one observed): drifts up and de-blurs. */
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 70, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: EASE_OUT },
  },
};

/**
 * Inner element: a wipe from the bottom up. Kept off the observed element,
 * because a fully clipped target reports no intersection and never triggers.
 */
const wipeVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.5, ease: EASE_OUT },
  },
};

/**
 * Black-and-white logo strip below the hero; see VelocityMarquee for the motion.
 * The first time it starts entering the viewport, the strip rises in once.
 */
export function LogoMarquee({ logos }: LogoMarqueeProps) {
  return (
    <section
      id="clients"
      className="relative overflow-x-clip bg-white py-12 md:py-16"
    >
      <motion.div
        variants={riseVariants}
        initial="hidden"
        whileInView="show"
        // Starts as soon as the strip begins to enter the viewport
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={wipeVariants}>
          <VelocityMarquee trackClassName="gap-8 pr-8 md:gap-12 md:pr-12">
            {logos.map((src) => (
              <div key={src} className="relative size-20 shrink-0 md:size-24">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain opacity-80 grayscale contrast-125 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </VelocityMarquee>
        </motion.div>
      </motion.div>
    </section>
  );
}
