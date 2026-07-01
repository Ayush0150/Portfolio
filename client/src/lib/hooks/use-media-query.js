import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns false on the server / first paint. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the device has a fine pointer + hover (i.e. a real cursor). */
export function usePointerFine() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
