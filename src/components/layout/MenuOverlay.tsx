"use client";

import { AnimatePresence, motion } from "motion/react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RollText } from "@/components/ui/RollText";
import { site } from "@/data/site";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

/** Three full-height columns (1/3 width each), staggered in from the top. */
const PANELS = 3;

const PANEL_EASE = [0.76, 0, 0.24, 1] as const;
const STAGGER = 0.1;

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          aria-label="Main menu"
          data-lenis-prevent
          className="fixed inset-0 z-40"
          exit={{ pointerEvents: "none" }}
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: PANELS }, (_, i) => (
              <motion.div
                key={i}
                className="h-full w-1/3 bg-black"
                initial={{ y: "-100%" }}
                animate={{
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: PANEL_EASE,
                    delay: i * STAGGER,
                  },
                }}
                exit={{
                  y: "-100%",
                  transition: {
                    duration: 0.7,
                    ease: PANEL_EASE,
                    delay: (PANELS - 1 - i) * STAGGER,
                  },
                }}
              />
            ))}
          </div>

          <ul className="group/list absolute inset-0 flex flex-col items-start justify-center gap-2 px-6 text-white md:gap-4 md:px-16">
            {site.nav.map((link, i) => (
              <li key={link.label} className="[clip-path:inset(0_-4rem)]">
                {/* Same hover as the footer links: magnetic pull + rolling label */}
                <Magnetic
                  strength={0.12}
                  hoverScale={1.03}
                  className="origin-left"
                >
                  <motion.a
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-3 py-2 text-[clamp(2.25rem,min(9vw,11vh),6.5rem)] font-light leading-[1.1] tracking-[-0.05em] transition-opacity duration-300 group-hover/list:[&:not(:hover)]:opacity-30"
                    initial={{ y: "110%" }}
                    animate={{
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: PANEL_EASE,
                        delay: 0.55 + i * 0.08,
                      },
                    }}
                    exit={{ y: "110%", transition: { duration: 0.35 } }}
                  >
                    <span className="text-sm font-normal opacity-60">
                      0{i + 1}
                    </span>
                    <RollText>{link.label}</RollText>
                  </motion.a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
