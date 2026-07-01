import { PageTransition } from "@/components/motion/page-transition";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { GitHub } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";

export function Home() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GitHub />
      <Contact />
    </PageTransition>
  );
}
