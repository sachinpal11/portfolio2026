import { cn } from "@/lib/cn";

/**
 * Circle that floods its `group` parent on hover, growing from the pointer's
 * entry point (needs <Magnetic /> above it for `--fx` / `--fy`). The parent
 * must be `group relative overflow-hidden`. Pass the fill color via className.
 */
export function LiquidFill({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-[var(--fx,50%)] top-[var(--fy,50%)] aspect-square w-[320%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full",
        "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100",
        className,
      )}
    />
  );
}
