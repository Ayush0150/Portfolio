import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data/site";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { Logo } from "@/components/shared/logo";
import { Magnetic } from "@/components/motion/magnetic";
import { easeOut } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 16));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] px-4 transition-all duration-300",
          scrolled
            ? "border-b border-white/10 py-2.5 glass shadow-[0_8px_30px_-16px_rgba(0,0,0,0.85)]"
            : "py-4",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <Logo />
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              Ayush<span className="text-muted">.dev</span>
            </span>
          </Link>

          <ul
            className={cn(
              "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full p-1.5 transition-all duration-300 lg:flex",
              scrolled ? "" : "glass-strong",
            )}
          >
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <Link
                    to={{ pathname: "/", hash: item.href }}
                    className={cn(
                      "relative block rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-primary/25 to-accent/25 ring-1 ring-inset ring-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden lg:block" strength={0.4}>
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(59,130,246,0.8)] transition-all duration-300 hover:brightness-110"
              >
                Let&apos;s talk
                <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full glass-strong text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col glass-strong lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full glass text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-3">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, ease: easeOut }}
                >
                  <Link
                    to={{ pathname: "/", hash: item.href }}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-6 py-4 font-medium text-white"
              >
                Let&apos;s work together
                <ArrowUpRight className="size-4" />
              </Link>
              <p className="mt-4 text-center font-mono text-xs text-faint">
                {siteConfig.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
