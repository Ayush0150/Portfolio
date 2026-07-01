import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button that fades in after scrolling, with a circular
 * ring that tracks scroll progress.
 */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setShow(v > 0.12));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group fixed bottom-6 right-6 z-[70] grid size-12 place-items-center rounded-full glass-strong text-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
        >
          <svg
            className="absolute inset-0 size-full -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              stroke="url(#btt-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="48" y2="48">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
