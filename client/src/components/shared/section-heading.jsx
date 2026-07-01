import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

/** Consistent section header: mono kicker + display title + optional copy. */
export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "left",
  className,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {index && <span className="text-faint">{index}</span>}
          <span className="h-px w-8 bg-linear-to-r from-accent to-transparent" />
          <span>{kicker}</span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        className={cn(
          "max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl",
          centered && "mx-auto",
        )}
      />

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
