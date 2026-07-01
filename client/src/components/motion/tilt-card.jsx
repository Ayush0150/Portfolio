import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePointerFine } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

const springConfig = { stiffness: 180, damping: 18, mass: 0.5 };

/** 3D pointer tilt with a moving specular glare. Flat + static on touch. */
export function TiltCard({ children, className, max = 9, glare = true }) {
  const ref = useRef(null);
  const canHover = usePointerFine();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(py, [0, 1], [max, -max]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-max, max]),
    springConfig,
  );

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), transparent 42%)`;

  function handleMove(event) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (!canHover) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
