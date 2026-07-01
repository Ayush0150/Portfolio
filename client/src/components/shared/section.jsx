import { cn } from "@/lib/utils";

/** Standard section shell: scroll offset, vertical rhythm, centered container. */
export function Section({ id, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-6 py-24 sm:py-28 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
