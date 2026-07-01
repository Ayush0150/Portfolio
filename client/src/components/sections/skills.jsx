import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { skillCategories } from "@/lib/data/skills";

export function Skills() {
  const marqueeIcons = skillCategories
    .flatMap((category) => category.skills)
    .map((skill) => skill.icon)
    .filter((Icon) => Boolean(Icon));

  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        kicker="Toolbox"
        title="Skills & technologies"
        description="The stack I reach for to take products from idea to production."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl glass p-6 transition-colors duration-300 hover:border-white/15">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-accent">
                  <category.icon className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {category.title}
                </h3>
              </div>
              <p className="mb-5 text-sm text-muted">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="group/chip relative inline-flex cursor-default items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground"
                  >
                    {skill.icon ? (
                      <skill.icon className="size-4 transition-transform duration-300 group-hover/chip:scale-110" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-linear-to-r from-primary to-accent transition-transform duration-300 group-hover/chip:scale-125" />
                    )}
                    {skill.name}
                    {skill.desc && (
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-max max-w-[12rem] -translate-x-1/2 scale-95 rounded-lg border border-white/10 bg-surface px-2.5 py-1.5 text-center text-xs text-foreground opacity-0 shadow-xl transition-all duration-200 group-hover/chip:scale-100 group-hover/chip:opacity-100"
                      >
                        {skill.desc}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Infinite logo marquee */}
      <div className="mask-fade-edges mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 py-3 text-muted/50">
          {[...marqueeIcons, ...marqueeIcons].map((Icon, i) => (
            <Icon key={i} className="size-7 shrink-0" aria-hidden />
          ))}
        </div>
      </div>
    </Section>
  );
}
