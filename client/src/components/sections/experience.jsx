import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { timeline } from "@/lib/data/experience";

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 35%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        kicker="Journey"
        title="Experience & education"
        description="A short timeline of where I've worked and studied."
      />

      <div ref={ref} className="relative mt-14">
        {/* Animated rail */}
        <div className="absolute left-[18px] top-1 h-[calc(100%-0.5rem)] w-px bg-white/10">
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-linear-to-b from-primary via-accent to-primary"
          />
        </div>

        <div className="space-y-8">
          {timeline.map((item, i) => {
            const Icon = item.type === "work" ? Briefcase : GraduationCap;
            return (
              <Reveal
                key={`${item.org}-${i}`}
                delay={i * 0.05}
                className="relative pl-14 sm:pl-16"
              >
                <span className="absolute left-0 top-1 grid size-9 place-items-center rounded-full glass-strong text-accent">
                  <Icon className="size-4" />
                </span>

                <div className="rounded-2xl glass p-6 transition-colors duration-300 hover:border-white/15 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-accent">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary-light">
                    {item.org}
                    {item.location && (
                      <span className="text-faint"> · {item.location}</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>

                  {item.highlights && (
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-faint">
                      {item.type === "work"
                        ? "Key contributions"
                        : "Highlights"}
                    </p>
                  )}
                  {item.highlights && (
                    <ul className="mt-3 space-y-2.5">
                      {item.highlights.map((highlight, hi) => (
                        <li
                          key={hi}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-linear-to-r from-primary to-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
