import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { LiquidFill } from "./LiquidFill";
import { Magnetic } from "./Magnetic";
import { RollText } from "./RollText";

type Variant = "dark" | "light";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
};

const GLOW = "hover:shadow-[0_0_3cqw_rgba(59,149,255,0.7)]";

const variants: Record<Variant, string> = {
  dark: `bg-gradient-to-b from-[#3b414d] to-[#05070c] text-white ring-4 ring-white/60 shadow-xl ${GLOW}`,
  light: `bg-white text-foreground shadow-lg hover:text-white ${GLOW}`,
};

/** Magnetic pull + liquid fill from the cursor + rolling label + spring bounce. */
export function Button({
  variant = "dark",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Magnetic>
      <a
        className={cn(
          "group relative inline-flex items-center overflow-hidden rounded-full font-semibold",
          "transition-shadow duration-500",
          variants[variant],
          className,
        )}
        {...props}
      >
        <LiquidFill className="bg-accent" />
        <RollText className="gap-[0.8cqw]">{children}</RollText>
      </a>
    </Magnetic>
  );
}
