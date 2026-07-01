import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion/variants";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";

/** Generic in-view fade + rise. The workhorse for scroll reveals. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  duration = 0.7,
  once = true,
}) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
