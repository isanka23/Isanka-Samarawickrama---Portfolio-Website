import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Minimum time the boot sequence stays on screen, in ms. */
const MIN_DURATION = 2400;

/** How long the filled name holds before the push-through. */
const HOLD_AT_FULL = 450;

const STAGES = [
  "Establishing connection",
  "Loading modules",
  "Compiling interface",
  "Ready",
];

const NAME_TYPE =
  "font-display text-center text-[clamp(2rem,9vw,7rem)] uppercase";

/**
 * Boot sequence. The bar is paced against MIN_DURATION so it reads as a real
 * boot rather than flashing past on a fast connection, but it still cannot
 * finish before the site's assets have actually loaded.
 *
 * The name is drawn twice: a hairline outline, and a chrome-filled copy
 * clipped from the baseline up — so the wordmark itself is the gauge. Once
 * full, it scales up and blurs as the camera pushes through it into the hero.
 * `onReveal` fires as that starts, so the hero plays its entrance behind.
 */
export function BootLoader({
  progress,
  onReveal,
}: {
  progress: number;
  onReveal: () => void;
}) {
  const [gone, setGone] = useState(false);
  const [shown, setShown] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-boot-word]", {
        opacity: 0,
        y: 26,
        filter: "blur(10px)",
        duration: 1.1,
        ease: "expo.out",
      });
      gsap.from("[data-boot-fade]", {
        opacity: 0,
        y: 14,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.2,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (shown < 100) return;

    if (reduced) {
      onReveal();
      setGone(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          delay: HOLD_AT_FULL / 1000,
          onComplete: () => setGone(true),
        })
        .to("[data-boot-word]", {
          scale: 2.2,
          opacity: 0,
          filter: "blur(14px)",
          duration: 1.2,
          ease: "expo.inOut",
          onStart: onReveal,
        })
        .to("[data-boot-fade]", { opacity: 0, duration: 0.45 }, 0)
        .to(
          rootRef.current,
          { opacity: 0, duration: 0.75, ease: "power2.inOut" },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, [shown, reduced, onReveal]);

  if (gone) return null;

  const stage =
    STAGES[Math.min(STAGES.length - 1, Math.floor((shown / 100) * STAGES.length))];

  const name = (
    <>
      <span className="block whitespace-nowrap">{profile.firstName}</span>
      <span className="block whitespace-nowrap">{profile.lastName}</span>
    </>
  );

  return (
    <div
      ref={rootRef}
      className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void px-6"
      role="status"
      aria-live="polite"
    >
      <div className="aurora opacity-60" />

      <p data-boot-fade className="label-mono absolute top-7 left-6 md:left-12">
        // Initializing system
      </p>
      <p
        data-boot-fade
        className="label-mono absolute top-7 right-6 md:right-12"
      >
        Portfolio {profile.year}
      </p>

      <div data-boot-word className="relative">
        <h1 className={`text-outline ${NAME_TYPE}`}>{name}</h1>

        {/* Chrome fill, clipped from the baseline up by progress */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ height: `${shown}%` }}
        >
          <h1
            className={`text-chrome-gradient absolute inset-x-0 bottom-0 ${NAME_TYPE}`}
          >
            {name}
          </h1>
          <div className="absolute inset-x-0 top-0 h-px bg-violet/70" />
        </div>
      </div>

      <div data-boot-fade className="absolute inset-x-6 bottom-7 md:inset-x-12">
        <div className="h-px w-full bg-white/12">
          <div
            className="h-px bg-chrome"
            style={{ width: `${Math.round(shown)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-6">
          <span className="label-mono">{stage}…</span>
          <span className="label-mono text-chrome">{Math.round(shown)}%</span>
        </div>
      </div>
    </div>
  );
}
