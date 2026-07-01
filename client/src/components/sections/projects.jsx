import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "./project-card";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

export function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index="04"
          kicker="Selected Work"
          title="Projects I'm proud of"
          description="A couple of builds that show how I think across the full stack."
        />

        <Reveal>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            More on GitHub
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
