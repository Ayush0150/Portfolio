import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTailwindcss,
} from "react-icons/si";
import { cn } from "@/lib/utils";

/**
 * Brand avatar (no photo): the "AR" core disc orbited by the stack it's built
 * on. Two counter-rotating rings carry glass tech badges that stay upright as
 * they travel (each badge counter-rotates on the ring's own timeline, so they
 * stay locked). Pure CSS transforms — cheap and 60fps. Under reduced motion the
 * rings freeze with every badge already distributed and upright.
 *
 * Every layer is centered with an explicit width + `aspect-square` (rather than
 * percentage insets) so each stays a true circle; the spin lives on an inner
 * `size-full` child so the ring's centering transform is never clobbered.
 */
const OUTER = [
  { Icon: SiReact, color: "#61DAFB", label: "React" },
  { Icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
  { Icon: SiExpress, color: "#e2e8f0", label: "Express" },
  { Icon: SiMongodb, color: "#47A248", label: "MongoDB" },
];

const INNER = [
  { Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  { Icon: SiTailwindcss, color: "#38BDF8", label: "Tailwind CSS" },
];

const centered =
  "absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2";

export function Avatar({ className }) {
  return (
    <div className={cn("relative aspect-square", className)}>
      {/* Ambient glow */}
      <div
        className={cn(
          centered,
          "rounded-full bg-linear-to-tr from-primary/50 to-accent/50 opacity-50 blur-3xl",
        )}
        style={{ width: "72%" }}
      />

      {/* Orbit paths */}
      <div
        className={cn(centered, "rounded-full border border-white/[0.06]")}
        style={{ width: "90%" }}
      />
      <div
        className={cn(
          centered,
          "rounded-full border border-dashed border-white/[0.09]",
        )}
        style={{ width: "48%" }}
      />

      {/* Orbiting stack */}
      <OrbitRing icons={OUTER} diameter={90} duration={28} />
      <OrbitRing icons={INNER} diameter={48} duration={20} reverse />

      {/* Central core */}
      <div
        className={cn(
          centered,
          "gradient-ring grid place-items-center overflow-hidden rounded-full glass-strong",
        )}
        style={{ width: "31%", containerType: "inline-size" }}
      >
        <div className="bg-dots absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(96,165,250,0.3),transparent_60%)]" />
        <span
          className="relative font-display font-bold leading-none"
          style={{ fontSize: "46cqi" }}
        >
          <span className="text-gradient">AR</span>
        </span>
      </div>
    </div>
  );
}

function OrbitRing({ icons, diameter, duration, reverse = false }) {
  return (
    <div className={centered} style={{ width: `${diameter}%` }}>
      <div
        className={cn(
          "relative size-full",
          reverse ? "animate-orbit-reverse" : "animate-orbit",
        )}
        style={{ "--orbit-duration": `${duration}s` }}
      >
        {icons.map((item, i) => {
          const angle = (360 / icons.length) * i;
          return (
            <div
              key={item.label}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                {/* un-tilt this slot's angle so the icon reads upright */}
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  {/* counter the ring's spin on the same timeline → stays locked */}
                  <div
                    className={
                      reverse ? "animate-orbit" : "animate-orbit-reverse"
                    }
                    style={{ "--orbit-duration": `${duration}s` }}
                  >
                    <span
                      aria-label={item.label}
                      className="grid size-9 place-items-center rounded-xl glass-strong shadow-lg transition-transform duration-300 hover:scale-110 sm:size-11"
                    >
                      <item.Icon
                        className="size-4 sm:size-5"
                        style={{ color: item.color }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
