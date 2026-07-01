import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Download, MousePointer2 } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { siteConfig, socials, heroHighlights } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { Avatar } from "@/components/shared/avatar";
import { ParticleField } from "@/components/visuals/particle-field";
import { usePointerFine } from "@/lib/hooks/use-media-query";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";
import { easeOut } from "@/lib/motion/variants";

const ROTATING = [
  "fast web apps",
  "secure REST APIs",
  "real-time dashboards",
  "end-to-end MERN products",
];

export function Hero() {
  const canHover = usePointerFine();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });

  const avatarX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const avatarY = useTransform(sy, [-0.5, 0.5], [24, -24]);
  const orbX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const orbY = useTransform(sy, [-0.5, 0.5], [-40, 40]);

  function handleMove(e) {
    if (!canHover) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      className="relative flex min-h-dvh items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <ParticleField className="pointer-events-none absolute inset-0 opacity-70" />

      <motion.div
        aria-hidden
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute right-[12%] top-[20%] h-72 w-72 rounded-full bg-primary/20 blur-[100px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities · {siteConfig.location}
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <TextReveal text="Ayush Rai" by="char" stagger={0.04} />
          </h1>

          <div className="mt-4">
            <TextReveal
              as="p"
              text="Full Stack Developer (MERN)"
              delay={0.3}
              className="font-display text-2xl font-semibold tracking-tight text-gradient sm:text-3xl"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.7 }}
            className="mt-6 max-w-md text-lg text-foreground/90"
          >
            I build <RoleRotator />.
            <br />
            Clean React front-ends and secure Node, Express &amp; MongoDB back
            ends.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.8 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {heroHighlights.map((h) => (
              <li
                key={h.label}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs"
              >
                <span className="text-faint">{h.label}: </span>
                <span className="font-medium text-foreground">{h.value}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.3}>
              <Button asChild size="lg">
                <a href="#work">
                  View my work
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button asChild variant="outline" size="lg">
                <a href={siteConfig.resume} download>
                  <Download />
                  Résumé
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button asChild variant="outline" size="lg">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FiGithub />
                  GitHub
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-8 flex items-center gap-3"
          >
            {socials.map((social) => (
              <Magnetic key={social.label} strength={0.5}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full glass text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <social.icon className="size-[18px]" />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.5 }}
          style={{ x: avatarX, y: avatarY }}
          className="relative mx-auto w-full max-w-[14rem] sm:max-w-xs lg:mx-0 lg:max-w-sm"
        >
          <Avatar />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex"
      >
        <MousePointer2 className="size-4" />
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
        >
          Scroll
        </motion.span>
      </motion.a>
    </section>
  );
}

function RoleRotator() {
  const reduce = useReducedMotionSafe();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING.length),
      1000,
    );
    return () => clearInterval(timer);
  }, [reduce]);

  // Reduced motion: show a single stable phrase, no looping animation.
  if (reduce) {
    return <span className="font-medium text-gradient">{ROTATING[0]}</span>;
  }

  return (
    <span className="relative inline-block whitespace-nowrap font-medium">
      {/* Invisible spacer reserves width and keeps the baseline aligned */}
      <span className="invisible" aria-hidden>
        {ROTATING[index]}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        {/* Overlapping enter/exit (default sync mode) + blur for a soft, premium crossfade */}
        <AnimatePresence initial={false}>
          <motion.span
            key={index}
            initial={{ y: "65%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-65%", opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="absolute inset-0 block text-gradient will-change-transform"
          >
            {ROTATING[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
