"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

/**
 * Tilted dark photo card with social links and the name/role caption underneath.
 * The wrapper padding keeps the tilted corners inside the section's left edge,
 * and the caption row shares the card's edges.
 */
export function ProfileCard() {
  return (
    <div className="px-3 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -9 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2.5 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        whileHover={{
          rotate: 0,
          scale: 1.015,
          transition: { type: "spring", stiffness: 200, damping: 18 },
        }}
        className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#16181d] shadow-[0_24px_60px_rgba(11,18,32,0.18)]"
      >
        <Image
          src={site.images.portrait}
          alt={site.name}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="origin-bottom translate-y-[20%] scale-[1.22] object-contain object-bottom"
        />
        {/* Blend the portrait's pale bottom fade into the dark card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#16181d] to-transparent"
        />
      </motion.div>

      <div className="mt-8 flex items-end justify-between">
        <div className="flex items-center gap-5">
          {about.socials.map((social) => (
            <Magnetic key={social.label} strength={0.4}>
              <SocialIcon {...social} />
            </Magnetic>
          ))}
        </div>
        <p className="text-right leading-tight">
          <span className="block text-sm font-medium">{site.name}</span>
          <span className="block text-sm text-foreground/50">{about.role}</span>
        </p>
      </div>
    </div>
  );
}
