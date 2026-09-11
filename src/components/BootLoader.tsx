import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/** Minimum time the boot sequence stays on screen, in ms. */
const MIN_DURATION = 2600;

/** How long the finished screen holds at 100% before fading out. */
const HOLD_AT_FULL = 700;

/**
 * Boot sequence from the reference. The bar is paced against MIN_DURATION so
 * it reads as a real boot rather than flashing past on a fast connection, but
 * it still cannot finish before the hero frames have actually preloaded.
 */
export function BootLoader({ progress }: { progress: number }) {
  const [gone, setGone] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const id = setInterval(() => {
      const elapsed = performance.now() - start;
      // Ceiling from the clock: never outruns the minimum duration.
      const paced = (elapsed / MIN_DURATION) * 100;
      // Ceiling from reality: never outruns the actual asset load.
      const target = Math.min(paced, progress);

      setShown((s) => {
        if (s >= 100) return 100;
        // Ease in, so the last few percent feel deliberate.
        const step = Math.max(0.35, (target - s) * 0.08);
        return Math.min(100, Math.max(s, Math.min(target, s + step)));
      });
    }, 16);

    return () => clearInterval(id);
  }, [progress]);

  useEffect(() => {
    if (shown < 100) return;
    const id = setTimeout(() => setGone(true), HOLD_AT_FULL);
    return () => clearTimeout(id);
  }, [shown]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void px-6 transition-opacity duration-500"
      style={{ opacity: shown >= 100 ? 0 : 1 }}
      role="status"
      aria-live="polite"
    >
      <p className="label-mono absolute left-6 top-6">Initializing system</p>
      <p className="label-mono absolute right-6 top-6">Portfolio 2026</p>

      {/* Long surnames wrap rather than overflow the viewport. */}
      <h1 className="font-display text-chrome-gradient max-w-[92vw] px-4 text-center text-[clamp(1.5rem,5.5vw,4.5rem)] uppercase">
        <span className="block sm:inline">{profile.firstName}</span>{" "}
        <span className="block opacity-45 sm:inline">{profile.lastName}</span>
      </h1>
      <p className="label-mono mt-3">{profile.role}</p>

      <p className="font-display text-chrome-gradient mt-10 text-[clamp(3rem,10vw,7rem)]">
        {Math.round(shown)}%
      </p>

      <div className="absolute bottom-16 w-[min(62vw,640px)]">
        <div className="h-px w-full bg-white/12">
          <div
            className="h-px bg-chrome transition-[width] duration-150 ease-linear"
            style={{ width: `${Math.round(shown)}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span className="label-mono">Loading modules…</span>
          <span className="label-mono">Secure connection</span>
        </div>
      </div>
    </div>
  );
}
