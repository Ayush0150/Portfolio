import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Layers,
  Lightbulb,
  Target,
  Wrench,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { getProject, projects } from "@/lib/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { NotFound } from "@/pages/NotFound";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  if (!project) return <NotFound />;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <PageTransition>
      <article className="px-6 pb-28 pt-32">
        <div className="mx-auto w-full max-w-4xl">
          <Reveal>
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to work
            </Link>
          </Reveal>

          <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="text-faint">{project.year}</span>
            <span className="h-px w-8 bg-linear-to-r from-accent to-transparent" />
            <span>{project.role}</span>
          </div>

          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <TextReveal text={project.title} by="char" stagger={0.03} />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-4 text-lg" style={{ color: project.accent }}>
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ImageFrame
              project={project}
              label={project.title}
              className="mt-10 aspect-[16/9]"
              big
            />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-white"
                >
                  Live demo <ExternalLink className="size-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  Source <FiGithub className="size-4" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-14 text-lg leading-relaxed text-muted">
              {project.overview}
            </p>
          </Reveal>

          <Block icon={Target} title="The problem" accent={project.accent}>
            <p className="text-muted">{project.problem}</p>
          </Block>

          <Block icon={Check} title="Key features" accent={project.accent}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 rounded-xl glass p-4 text-sm leading-relaxed text-muted"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: project.accent }}
                  />

                  {feature}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Layers} title="Architecture" accent={project.accent}>
            <p className="rounded-2xl glass p-6 leading-relaxed text-muted">
              {project.architecture}
            </p>
          </Block>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <ListCard
              icon={Wrench}
              title="Challenges"
              items={project.challenges}
              accent={project.accent}
            />

            <ListCard
              icon={Lightbulb}
              title="What I learned"
              items={project.learnings}
              accent={project.accent}
            />
          </div>

          <Block icon={Layers} title="Tech stack" accent={project.accent}>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Block>

          <div className="mt-20 border-t border-white/5 pt-10">
            <Link
              to={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4"
            >
              <span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  Next project
                </span>
                <span className="mt-1 block font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full glass transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-5" />
              </span>
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}

function SectionLabel({ children }) {
  return (
    <h2 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-faint">
      {children}
    </h2>
  );
}

function Block({ icon: Icon, title, accent, children }) {
  return (
    <Reveal className="mt-12">
      <div className="mb-5 flex items-center gap-3">
        <span
          className="grid size-9 place-items-center rounded-xl glass"
          style={{ color: accent }}
        >
          <Icon className="size-4" />
        </span>
        <SectionLabel>{title}</SectionLabel>
      </div>
      {children}
    </Reveal>
  );
}

function ListCard({ icon: Icon, title, items, accent }) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-2xl glass p-6">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="grid size-9 place-items-center rounded-xl glass"
            style={{ color: accent }}
          >
            <Icon className="size-4" />
          </span>
          <SectionLabel>{title}</SectionLabel>
        </div>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-muted"
            >
              <span
                className="mt-[7px] size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />

              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function ImageFrame({ project, label, className, big = false }) {
  if (project.image) {
    return (
      <div
        className={`group relative overflow-hidden rounded-2xl border border-white/10 ${className ?? ""}`}
      >
        <img
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${className ?? ""}`}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${project.accent}55, transparent 55%), radial-gradient(120% 120% at 100% 100%, #6366f155, transparent 55%), linear-gradient(160deg, #111827, #0b1120)`,
        }}
      />

      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 flex items-end p-5">
        <span
          className={`font-display font-semibold tracking-tight text-foreground/90 ${
            big ? "text-3xl" : "text-base"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
