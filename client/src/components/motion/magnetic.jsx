import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/lib/hooks/use-media-query";

/** Pulls its child toward the cursor with a soft spring. No-op on touch. */
export function Magnetic({ children, className, strength = 0.35 }) {
  const ref = useRef(null);
  const canHover = usePointerFine();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(event) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={canHover ? handleMove : undefined}
      onMouseLeave={canHover ? reset : undefined}
    >
      {children}
    </motion.div>
  );
}
