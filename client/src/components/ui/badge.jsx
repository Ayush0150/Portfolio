import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs font-medium text-muted backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
