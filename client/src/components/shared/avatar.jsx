import { SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import { cn } from "@/lib/utils";

/**
 * Designed brand avatar (no photo): an animated gradient ring around a glass
 * disc with the "AR" monogram, plus orbiting stack badges. Sizes fluidly via
 * container query units.
 */
export function Avatar({ className }) {
  return (
    <div
      className={cn("relative aspect-square", className)}
      style={{ containerType: "inline-size" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-[8%] rounded-full bg-linear-to-tr from-primary/50 to-accent/50 opacity-60 blur-3xl" />

      {/* Ring + disc */}
      <div className="gradient-ring relative grid size-full place-items-center overflow-hidden rounded-full glass-strong animate-float">
        <div className="bg-dots absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(96,165,250,0.25),transparent_55%)]" />
        <span
          className="relative font-display font-bold leading-none"
          style={{ fontSize: "32cqi" }}
        >
          <span className="text-gradient">AR</span>
        </span>
      </div>

      {/* Orbiting stack badges */}
      <FloatingBadge className="left-[-6%] top-[18%]" delay="0s">
        <SiReact className="text-[#61DAFB]" />
      </FloatingBadge>
      <FloatingBadge className="right-[-7%] top-[40%]" delay="1.2s">
        <SiNodedotjs className="text-[#5FA04E]" />
      </FloatingBadge>
      <FloatingBadge className="bottom-[6%] left-[12%]" delay="0.6s">
        <SiMongodb className="text-[#47A248]" />
      </FloatingBadge>
    </div>
  );
}

function FloatingBadge({ children, className, delay }) {
  return (
    <div
      className={cn(
        "absolute grid size-11 place-items-center rounded-2xl glass-strong text-lg shadow-lg",
        className,
      )}
      style={{
        animation: "float 6s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}
