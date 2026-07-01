import { useReducedMotion } from "framer-motion";
import { useMounted } from "./use-mounted";

/**
 * SSR-safe reduced-motion: returns `false` on the server and the first client
 * render (so hydration matches), then the real user preference after mount.
 * Prevents structural hydration mismatches from reduced-motion branching.
 */
export function useReducedMotionSafe() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  return mounted ? reduced : false;
}
