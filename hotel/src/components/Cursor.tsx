import { useEffect, useRef, useState } from "react";
import { FINE_POINTER, MOTION_OK, gsap } from "@/lib/motion";

/**
 * Trailing cursor ring that grows and shows a label over `[data-cursor]`
 * elements. Mouse-only; the native cursor is kept, so nothing is lost if
 * this never mounts.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`${FINE_POINTER} and ${MOTION_OK}`);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    const onEnter = () => gsap.to(el, { autoAlpha: 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const active = label !== "";
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`eyebrow grid place-items-center rounded-full text-[0.62rem] transition-all duration-500 ease-[var(--ease-out-expo)] ${
          active
            ? "h-24 w-24 bg-glow text-ink"
            : "h-3 w-3 bg-white mix-blend-difference"
        }`}
      >
        <span className={`transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
