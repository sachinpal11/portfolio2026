import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type PillProps = ComponentPropsWithoutRef<"div"> & {
  tone?: "glass" | "solid";
};

const tones = {
  glass: "border border-black/10 bg-white/70 backdrop-blur",
  solid: "bg-white shadow-lg",
} as const;

export function Pill({ tone = "glass", className, ...props }: PillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
