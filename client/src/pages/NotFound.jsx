import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/motion/page-transition";

export function NotFound() {
  return (
    <PageTransition>
      <section className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
          404 — Not found
        </p>
        <h1 className="font-display text-6xl font-bold tracking-tight text-gradient sm:text-7xl md:text-8xl">
          Lost in space
        </h1>
        <p className="max-w-md text-muted">
          The page you&apos;re looking for has drifted off into the void.
          Let&apos;s get you back to safety.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link to="/">
            <ArrowLeft />
            Back home
          </Link>
        </Button>
      </section>
    </PageTransition>
  );
}
