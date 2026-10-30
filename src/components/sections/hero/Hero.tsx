"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Button } from "@/components/ui/Button";
import { ParallaxLayer, ParallaxProvider } from "@/components/ui/Parallax";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { RotatingText } from "@/components/ui/RotatingText";
import { site } from "@/data/site";
import { DURATION, EASE_OUT } from "@/lib/motion";

/**
 * Fills the window. Inside, a container frame defines the `cqw` unit that all
 * sizes use, so the composition scales with it:
 * - mobile (<md): the frame is the full window, a stacked portrait layout;
 * - md+: the largest centered 16:9 frame that fits the window.
 * The background covers the whole section so no gaps show.
 *
 * Depth layers (back → front) shift with the cursor at different rates:
 * background (against), headline, UI, portrait.
 */
export function Hero() {
  return (
    <ParallaxProvider>
      <section className="relative flex w-full items-center justify-center overflow-x-clip bg-white pb-[34vw] pt-[8vw] md:h-svh md:min-h-[360px] md:pb-0 md:pt-0">
        {/* Shifted up with the content; the image fades to white at the bottom */}
        <ParallaxLayer depth={-18}>
          <div className="absolute inset-0 scale-[1.06] md:-translate-y-[6%]">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DURATION.slow * 1.4, ease: EASE_OUT }}
            >
              <Image
                src={site.images.background}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </ParallaxLayer>

        <div className="@container relative aspect-[5/8] w-full md:aspect-[16/9] md:w-[min(100vw,calc(max(100svh,360px)*16/9))] md:-translate-y-[6%]">
          <ParallaxLayer depth={12} className="z-10">
            {/* Greeting + signature on one line, the rotating role beneath at the same size */}
            <h1 className="absolute inset-x-0 top-[14%] text-center font-display leading-[1] tracking-[-0.045em] md:top-[18%]">
              {/* Not masked: the signature is drawn larger than its box and must not be clipped */}
              <Reveal
                delay={0.4}
                y={40}
                className="text-[10cqw] font-medium md:text-[6.5cqw]"
              >
                Hi, I&apos;m
                <span className="relative ml-[0.35em] inline-block h-[0.8em] w-[2.3em] align-middle">
                  <Image
                    src={site.images.signature}
                    alt={site.name}
                    fill
                    priority
                    sizes="(min-width: 768px) 25vw, 55vw"
                    className="origin-center -translate-y-[6%] scale-[1.9] object-contain"
                  />
                </span>
              </Reveal>
              {/* Longest role is 20 chars, so the mobile size is lower to stay on one line */}
              <RotatingText
                words={site.roles}
                delay={0.55}
                className="mt-[0.5cqw] text-[8.5cqw] font-light text-foreground/90 md:text-[6.5cqw]"
              />
            </h1>
          </ParallaxLayer>

          {/* Portrait sits above the headline so the head overlaps the role line */}
          <ParallaxLayer depth={38} className="z-20">
            <motion.div
              className="absolute -bottom-[6%] left-1/2 h-[84%] w-[118%] -translate-x-1/2 md:-bottom-[8%] md:h-[88%] md:w-[48%]"
              initial={{ opacity: 0, y: "8%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASE_OUT,
                delay: 0.5,
              }}
            >
              <Image
                src={site.images.portrait}
                alt={site.name}
                fill
                priority
                sizes="(min-width: 768px) 48vw, 118vw"
                className="object-contain object-bottom"
              />
            </motion.div>
          </ParallaxLayer>

          {/* Mobile: fade the cropped bottom of the portrait into the white page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-[8%] z-[25] h-[42%] bg-gradient-to-t from-white from-[30%] via-white/80 to-transparent md:hidden"
          />

          <ParallaxLayer depth={24} className="z-30">
            <Reveal
              delay={0.9}
              className="absolute bottom-[29%] left-[4cqw] md:bottom-[38%] md:left-[3.5cqw]"
            >
              <Pill
                tone="solid"
                className="gap-[2cqw] px-[3.5cqw] py-[2.2cqw] text-[3.2cqw] md:gap-[0.8cqw] md:px-[1.3cqw] md:py-[0.85cqw] md:text-[1.2cqw]"
              >
                <span className="flex size-[4cqw] items-center justify-center rounded-full bg-accent/30 md:size-[1.6cqw]">
                  <span className="size-[2cqw] animate-pulse rounded-full bg-accent md:size-[0.8cqw]" />
                </span>
                {site.availability}
              </Pill>
            </Reveal>

            <Reveal
              delay={1}
              className="absolute hidden md:block md:inset-x-auto md:bottom-[34%] md:right-[4.5cqw] md:w-[24cqw] md:text-left"
            >
              <p className="text-[3.4cqw] leading-relaxed md:text-[1.2cqw]">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal
              delay={1.1}
              className="absolute inset-x-[4cqw] -bottom-[16%] flex justify-center md:inset-x-auto md:bottom-[4%] md:left-[3.5cqw] md:block md:w-[26cqw]"
            >
              <div className="flex items-center gap-[2.5cqw] text-[2.9cqw] leading-snug text-black/60 md:gap-[1cqw] md:text-[1.1cqw]">
                <AvatarStack images={site.clients.avatars} />
                <p>
                  Trusted by{" "}
                  <b className="text-foreground">{site.clients.count}</b>{" "}
                  {site.clients.suffix}
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={1.2}
              className="pointer-events-auto absolute inset-x-0 bottom-[15%] flex justify-center md:inset-x-auto md:bottom-[4%] md:right-[10%] md:block"
            >
              <Button
                href={site.cta.href}
                className="px-[7cqw] py-[3.4cqw] text-[3.8cqw] md:px-[2.4cqw] md:py-[1.2cqw] md:text-[1.2cqw]"
              >
                <span aria-hidden>&rarr;</span> {site.cta.label}
              </Button>
            </Reveal>
          </ParallaxLayer>
        </div>
      </section>
    </ParallaxProvider>
  );
}
