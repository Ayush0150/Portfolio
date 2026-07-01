import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { TiltCard } from "@/components/motion/tilt-card";

export function ProjectCard({ project, index }) {
  const visibleStack = project.stack.slice(0, 6);
  const extra = project.stack.length - visibleStack.length;

  return (
    <TiltCard className="group h-full rounded-3xl" max={6}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl glass p-8 transition-colors duration-300 hover:border-white/15">
        {/* Spotlight glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-0 blur-[90px] transition-opacity duration-500 group-hover:opacity-25"
          style={{ backgroundColor: project.accent }}
        />

        <div className="relative flex items-center justify-between font-mono text-xs text-faint">
          <span>0{index + 1}</span>
          <span>
            {project.year} · {project.role}
          </span>
        </div>

        <h3 className="relative mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p
          className="relative mt-1.5 text-sm font-medium"
          style={{ color: project.accent }}
        >
          {project.tagline}
        </p>
        <p className="relative mt-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {visibleStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-faint">
              +{extra}
            </span>
          )}
        </div>

        <div className="relative mt-8 flex items-center gap-3 pt-2">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Case study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live demo`}
                className="grid size-10 place-items-center rounded-full glass text-muted transition-colors hover:text-foreground"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} source`}
                className="grid size-10 place-items-center rounded-full glass text-muted transition-colors hover:text-foreground"
              >
                <FiGithub className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
