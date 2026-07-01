import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On route change: scroll to the hash target if present (e.g. /#work),
 * otherwise jump to the top of the page.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Wait a frame so the target section is mounted/laid out.
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
