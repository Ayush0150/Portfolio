import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeInOut, easeOut } from "@/lib/motion/variants";
import { siteConfig } from "@/lib/data/site";

const DURATION = 1600;

/**
 * One-time splash / loading screen. Counts to 100, reveals the brand, then
 * lifts away. Gated by sessionStorage so in-session navigation never re-blocks
 * (protecting LCP). Skipped entirely under reduced motion.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce || sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    const tick = (now) => {
      // easeOutCubic for a natural, decelerating count
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("intro-seen", "1");
        window.setTimeout(() => setShow(false), 450);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: easeInOut }}
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

          <div className="relative flex flex-col items-center gap-7">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="gradient-ring grid size-24 place-items-center rounded-2xl glass-strong"
            >
              <span className="font-display text-3xl font-bold">
                <span className="text-gradient">AR</span>
              </span>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
                  className="font-display text-lg font-semibold tracking-tight"
                >
                  {siteConfig.name}
                </motion.p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="font-mono text-xs text-faint"
              >
                {siteConfig.role}
              </motion.p>
            </div>
          </div>

          {/* Progress */}
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-8">
            <div className="flex w-full max-w-xs items-end justify-between">
              <span className="font-mono text-xs text-faint">Loading</span>
              <span className="font-display text-2xl font-bold tabular-nums text-foreground">
                {progress}
                <span className="text-sm text-faint">%</span>
              </span>
            </div>
            <div className="h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-accent shadow-[0_0_12px_rgba(6,182,212,0.7)] transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
