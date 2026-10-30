import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  /** Image paths in /public, one per avatar. */
  images: readonly string[];
  className?: string;
};

/** Overlapping round photos (client headshots). */
export function AvatarStack({ images, className }: AvatarStackProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 -space-x-[2cqw] md:-space-x-[0.8cqw]",
        className,
      )}
    >
      {images.map((src) => (
        <span
          key={src}
          className="relative size-[8cqw] overflow-hidden rounded-full border-2 border-white bg-slate-200 md:size-[3.2cqw]"
        >
          <Image src={src} alt="" fill sizes="64px" className="object-cover" />
        </span>
      ))}
    </div>
  );
}
