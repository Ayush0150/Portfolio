import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/lib/hooks/use-media-query";

const INTERACTIVE = "a, button, input, textarea, label, [data-cursor='hover']";

/**
 * Custom cursor: a precise dot, a lagging ring, and a soft glow.
 * Only mounts on devices with a real pointer; otherwise the native cursor is used.
 */
export function Cursor() {
  const canHover = usePointerFine();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.35 });

  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!canHover) return;

    document.body.style.cursor = "none";

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      const target = e.target;
      setActive(Boolean(target?.closest(INTERACTIVE)));
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [canHover, x, y]);

  if (!canHover) return null;

  return (
    <>
      {/* Soft glow — kept above the intro loader (z-200) so the pointer
          stays visible over the splash on first load. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[220] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: hidden ? 0 : 1, scale: active ? 1.4 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Lagging ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[221] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: hidden ? 0 : 0.9, scale: active ? 1.6 : 1 }}
        transition={{ duration: 0.18 }}
      />

      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[222] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1, scale: active ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
