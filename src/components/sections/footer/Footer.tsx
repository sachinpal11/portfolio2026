import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { site } from "@/data/site";

/**
 * Contact call-to-action on a blue sky background, a link row with copyright, and the
 * name blown up to full width and cropped at the bottom edge.
 */
export function Footer() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-white">
      {/*
        Blue sky image at the start of the footer, fading to white at its lower
        edge. `-z-10` (inside the footer's `isolate` stacking context) keeps it
        behind everything: its opaque white lower half used to paint over the
        top of the giant name on wide windows.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[max(520px,56vw)]"
      >
        <Image
          src={site.images.footerBackground}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <Container className="relative flex flex-col items-center pt-24 text-center md:pt-32">
        <Reveal inView y={40}>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1] tracking-[-0.045em]">
            {site.footer.heading}
          </h2>
        </Reveal>
        <Reveal inView y={30} delay={0.1}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            {site.footer.text}
          </p>
        </Reveal>
        <Reveal inView y={30} delay={0.2} className="mt-10">
          <Button href={`mailto:${site.email}`} className="px-8 py-4 text-base">
            <span aria-hidden>&rarr;</span> {site.footer.cta}
          </Button>
        </Reveal>
      </Container>

      <Container className="relative mt-24 flex flex-col gap-6 md:mt-32 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {site.nav.map((link) => (
            <Magnetic key={link.label} strength={0.2}>
              <a href={link.href} className="group block py-1 text-base">
                <RollText>{link.label}</RollText>
              </a>
            </Magnetic>
          ))}
        </nav>
        <p className="text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>

      {/*
        Huge name as SVG text: the baseline sits at a fixed y and `textLength`
        stretches it to the full width, so the crop (just under the baseline)
        is identical at every window size and independent of font metrics.
      */}
      <Reveal inView y={80} className="mt-8 md:mt-12">
        <svg
          role="img"
          aria-label={site.name}
          viewBox="0 30 1000 262"
          className="block w-full select-none"
        >
          <text
            x="10"
            y="300"
            fontSize="340"
            fontWeight="300"
            fill="currentColor"
            textLength="980"
            lengthAdjust="spacingAndGlyphs"
            style={{
              fontFamily:
                "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {site.name}
          </text>
        </svg>
      </Reveal>
    </footer>
  );
}
