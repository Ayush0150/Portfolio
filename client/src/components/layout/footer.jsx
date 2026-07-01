import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { navItems, siteConfig, socials } from "@/lib/data/site";
import { Logo } from "@/components/shared/logo";

const lastUpdated = "June 2026";

const resources = [
  { label: "Résumé", href: siteConfig.resume, download: true },
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "Email", href: siteConfig.links.email },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-base font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full glass text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-8">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-faint">
                Navigate
              </p>
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={{ pathname: "/", hash: item.href }}
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-faint">
                Resources
              </p>
              <nav className="flex flex-col gap-3">
                {resources.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    download={r.download || undefined}
                    target={r.external ? "_blank" : undefined}
                    rel={r.external ? "noreferrer noopener" : undefined}
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {r.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {year} {siteConfig.name} · {siteConfig.version} · Updated{" "}
            {lastUpdated}
          </p>
          <div className="flex items-center gap-5">
            <p className="hidden font-mono text-xs text-faint sm:block">
              Built with React · Express · MongoDB · Node.js
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
            >
              Top
              <span className="grid size-7 place-items-center rounded-full glass transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp className="size-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
