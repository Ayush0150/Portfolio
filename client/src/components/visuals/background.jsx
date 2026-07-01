/**
 * Ambient page background: layered aurora blobs + grid + vignette.
 * Pure CSS animation (no per-frame JS) so it stays cheap and 60fps.
 * Server component — no interactivity here; the cursor handles pointer glow.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* Grid, fading toward the bottom */}
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />

      {/* Aurora / mesh blobs */}
      <div
        className="absolute -left-[10%] -top-[15%] h-[55vh] w-[55vw] rounded-full bg-primary/25 blur-[130px]"
        style={{ animation: "aurora-drift 20s ease-in-out infinite" }}
      />

      <div
        className="absolute right-[-10%] top-[5%] h-[50vh] w-[45vw] rounded-full bg-accent/20 blur-[130px]"
        style={{ animation: "aurora-drift 26s ease-in-out infinite reverse" }}
      />

      <div
        className="absolute bottom-[-20%] left-[20%] h-[55vh] w-[55vw] rounded-full bg-indigo/20 blur-[150px]"
        style={{ animation: "aurora-drift 32s ease-in-out infinite" }}
      />

      {/* Center vignette to seat content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent_30%,var(--color-background)_92%)]" />
    </div>
  );
}
