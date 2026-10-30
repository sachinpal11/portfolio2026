import Image from "next/image";
import { BlurWords } from "@/components/ui/BlurWords";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@/data/testimonials";

/** Quote on the left, a quote mark pinned top-right, author row underneath. */
export function TestimonialCard({ quote, name, role, image }: Testimonial) {
  return (
    <figure className="relative px-2 py-10 md:px-12 md:py-14">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="absolute right-2 top-10 size-7 fill-accent md:right-12 md:top-14"
      >
        <path d="M6 17h3l2-4V7H5v6h3l-2 4Zm8 0h3l2-4V7h-6v6h3l-2 4Z" />
      </svg>

      <blockquote className="max-w-md pr-10 md:pr-0">
        <BlurWords
          text={quote}
          className="text-lg font-light leading-relaxed tracking-tight text-foreground md:text-[1.35rem]"
        />
      </blockquote>

      <Reveal inView delay={0.3} y={16} className="mt-8">
        <figcaption className="flex items-center gap-3">
          <span
            aria-hidden
            className="relative flex size-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#7cbaff] to-accent text-base font-medium text-white"
          >
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              name.charAt(0)
            )}
          </span>
          <span className="flex flex-col leading-tight">
            <cite className="text-base font-medium not-italic">{name}</cite>
            <span className="mt-0.5 text-sm text-foreground/50">{role}</span>
          </span>
        </figcaption>
      </Reveal>
    </figure>
  );
}
