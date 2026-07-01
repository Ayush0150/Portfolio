import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Background } from "@/components/visuals/background";
import { Cursor } from "@/components/visuals/cursor";
import { ScrollProgress } from "@/components/visuals/scroll-progress";
import { Loader } from "@/components/visuals/loader";
import { BackToTop } from "@/components/visuals/back-to-top";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollManager } from "@/components/layout/scroll-manager";
import { Home } from "@/pages/Home";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <Background />
      <Cursor />
      <ScrollProgress />
      <Loader />
      <Navbar />
      <ScrollManager />

      <main id="main-content" className="min-h-dvh">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
