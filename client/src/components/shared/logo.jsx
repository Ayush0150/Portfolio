import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";

/** Compact brand mark — the "AR" monogram in a glass tile. */
export function Logo({ className }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center rounded-xl glass font-display text-sm font-bold tracking-tight transition-transform duration-300 group-hover:scale-105",
        className,
      )}
      aria-label={siteConfig.name}
    >
      <span className="text-gradient">AR</span>
    </span>
  );
}
