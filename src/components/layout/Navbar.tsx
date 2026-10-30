"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Container } from "@/components/ui/Container";
import { IconButton } from "@/components/ui/IconButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { DURATION, EASE_OUT } from "@/lib/motion";

const BAR =
  "h-px w-4 bg-foreground transition-all duration-500 group-hover:bg-white";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE_OUT, delay: 0.2 }}
      >
        <Container className="flex h-16 items-center justify-between">
          <Magnetic strength={0.25}>
            <a
              href="#"
              onClick={() => setOpen(false)}
              aria-label={site.name}
              className="block"
            >
              {/* Black signature on a transparent PNG; inverted to white over the dark menu */}
              <Image
                src={site.images.signature}
                alt={site.name}
                width={112}
                height={56}
                priority
                className={cn(
                  "h-14 w-auto transition-[filter] duration-500",
                  open && "invert",
                )}
              />
            </a>
          </Magnetic>
          <IconButton
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Three bars morph into an X while the menu is open */}
            <span className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  BAR,
                  open ? "translate-y-[5px] rotate-45" : "group-hover:w-5",
                )}
              />
              <span
                className={cn(BAR, open ? "opacity-0" : "group-hover:w-2")}
              />
              <span
                className={cn(
                  BAR,
                  open ? "-translate-y-[5px] -rotate-45" : "group-hover:w-5",
                )}
              />
            </span>
          </IconButton>
        </Container>
      </motion.header>
    </>
  );
}
