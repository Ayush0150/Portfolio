import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/data/site";

const user = siteConfig.githubUser;
const theme =
  "hide_border=true&bg_color=00000000&title_color=60a5fa&text_color=94a3b8&icon_color=22d3ee";

/** GitHub stat image with a graceful fallback if the embed service is down. */
function GhImage({ src, alt, className }) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer noopener"
        className="flex w-full flex-col items-center justify-center gap-2.5 py-6 text-center"
      >
        <FiGithub className="size-7 text-accent" />
        <span className="text-sm text-muted">Live GitHub activity</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
          @{user} <ArrowUpRight className="size-4" />
        </span>
      </a>
    );
  }

  return (
    <img
      loading="lazy"
      alt={alt}
      className={className}
      src={src}
      onError={() => setOk(false)}
    />
  );
}

export function GitHub() {
  return (
    <Section id="github">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index="05"
          kicker="Open Source"
          title="My GitHub activity"
          description="A live look at what I've been building and committing."
        />
        <Reveal>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <FiGithub className="size-4" />@{user}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full min-h-[180px] items-center justify-center rounded-2xl glass p-6">
            <GhImage
              alt={`${user}'s GitHub statistics`}
              className="w-full max-w-md"
              src={`https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&${theme}`}
            />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex h-full min-h-[180px] items-center justify-center rounded-2xl glass p-6">
            <GhImage
              alt={`${user}'s most-used languages`}
              className="w-full max-w-xs"
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&langs_count=8&${theme}`}
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-5 flex min-h-[140px] items-center overflow-x-auto rounded-2xl glass p-6">
          <GhImage
            alt={`${user}'s contribution graph`}
            className="w-full min-w-[680px]"
            src={`https://ghchart.rshah.org/3b82f6/${user}`}
          />
        </div>
      </Reveal>
    </Section>
  );
}
