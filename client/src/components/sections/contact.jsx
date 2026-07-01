import { useState } from "react";
import { Mail, MapPin, Copy, Check, Clock, FileText } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";
import { siteConfig, socials } from "@/lib/data/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <Section id="contact">
      <div className="overflow-hidden rounded-3xl glass p-8 sm:p-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <SectionHeading
              index="06"
              kicker="Contact"
              title="Let's build something great"
              description="Have a role, a project, or just want to say hi? My inbox is open."
            />

            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <Clock className="size-3.5" />
              {siteConfig.responseTime}
            </div>

            <div className="mt-8 space-y-3">
              {/* Email + copy */}
              <div className="flex items-center gap-4 rounded-2xl glass p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-accent">
                  <Mail className="size-5" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-mono text-xs text-faint">Email</span>
                  <a
                    href={siteConfig.links.email}
                    className="truncate text-sm text-foreground transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:text-foreground"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl glass p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-accent">
                  <MapPin className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-xs text-faint">Based in</span>
                  <span className="text-sm text-foreground">
                    {siteConfig.location}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <a href={siteConfig.resume} download>
                  <FileText />
                  Résumé
                </a>
              </Button>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full glass text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <social.icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
