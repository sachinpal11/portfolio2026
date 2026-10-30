import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const ROLL =
  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

type RollTextProps = {
  children: ReactNode;
  /** Applied to both copies (e.g. a gap between icon and label). */
  className?: string;
};

/** On parent `group` hover, the label rolls up and a duplicate rises in. */
export function RollText({ children, className }: RollTextProps) {
  return (
    <span className="relative block overflow-hidden">
      <span
        className={cn(
          "flex items-center group-hover:-translate-y-[130%]",
          ROLL,
          className,
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 flex translate-y-[130%] items-center group-hover:translate-y-0",
          ROLL,
          className,
        )}
      >
        {children}
      </span>
    </span>
  );
}
