import { Award, User, Code2, Target, BookOpen } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { certifications } from "@/lib/data/experience";
import { aboutContent } from "@/lib/data/site";

const blocks = [
  { icon: User, label: "Who I Am", text: aboutContent.whoIAm },
  { icon: Code2, label: "What I Do", text: aboutContent.whatIDo },
  { icon: Target, label: "Career Goal", text: aboutContent.careerGoal },
  {
    icon: BookOpen,
    label: "Currently Learning",
    text: aboutContent.currentlyLearning,
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        kicker="About"
        title="A full-stack developer who sweats the details"
        description="Who I am, what I do, and where I'm headed."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Story blocks */}
        <div className="space-y-6">
          {blocks.map((block, i) => (
            <Reveal key={block.label} delay={i * 0.05}>
              <div className="flex gap-4">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-accent">
                  <block.icon className="size-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {block.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {block.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Snapshot */}
        <Reveal delay={0.05}>
          <div className="rounded-3xl glass p-8">
            <div className="flex items-end gap-4">
              <span className="font-display text-5xl font-bold tracking-tight text-gradient">
                <AnimatedCounter value={8.6} decimals={1} />
              </span>
              <span className="pb-1.5 text-sm leading-snug text-muted">
                CGPA
                <br />
                B.Sc. IT · 2026
              </span>
            </div>

            <div className="my-7 h-px bg-white/10" />

            <dl className="space-y-4">
              {[
                ["Role", "Full Stack Developer (MERN)"],
                ["Currently", "DESS Digital Meetings"],
                ["Education", "B.Sc. IT · University of Mumbai"],
                ["Based in", "Mumbai, India"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-faint">
                    {label}
                  </dt>
                  <dd className="font-medium text-foreground sm:text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="my-7 h-px bg-white/10" />

            <div className="space-y-2.5">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <Award className="mt-0.5 size-4 shrink-0 text-accent" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
