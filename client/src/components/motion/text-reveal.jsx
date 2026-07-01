import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion/variants";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

const container = (stagger, delay) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const child = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: easeOut } },
};

/**
 * Masked word/character reveal. Each unit slides up from behind a clipped edge.
 * Falls back to plain, instantly-visible text when reduced motion is requested.
 */
export function TextReveal({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  by = "word",
  once = true,
}) {
  const reduce = useReducedMotionSafe();
  const Component = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const units = by === "word" ? text.split(" ") : Array.from(text);

  return (
    <Component
      className={cn(className)}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-8% 0px" }}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
        >
          <motion.span
            variants={child}
            className="inline-block will-change-transform"
          >
            {unit === " " ? " " : unit}
            {by === "word" && i < units.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
