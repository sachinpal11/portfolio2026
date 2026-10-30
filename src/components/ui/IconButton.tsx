import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { LiquidFill } from "./LiquidFill";
import { Magnetic } from "./Magnetic";

/** Round, glassy icon-only button: magnetic, with a dark liquid fill on hover. */
export function IconButton({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <Magnetic>
      <button
        className={cn(
          "group relative flex size-10 items-center justify-center overflow-hidden rounded-full",
          "border border-black/10 bg-white/80 shadow-sm",
          "transition-shadow duration-500 hover:shadow-[0_0_24px_rgba(59,149,255,0.6)]",
          className,
        )}
        {...props}
      >
        <LiquidFill className="bg-foreground" />
        <span className="relative">{children}</span>
      </button>
    </Magnetic>
  );
}
