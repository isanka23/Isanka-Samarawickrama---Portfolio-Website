import { useEffect, useLayoutEffect, useRef } from "react";
import { brand } from "@/data/content";
import { gsap } from "@/lib/motion";

/**
 * Counts to 100, waits for the webfonts, then lifts like a curtain.
 * `onReveal` fires as the curtain starts to move so the hero can animate in
 * underneath it; `onDone` fires once it is out of the way.
 */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  // Keep the latest callbacks without restarting the timeline.
  const cb = useRef({ onReveal, onDone });
  useLayoutEffect(() => {
    cb.current = { onReveal, onDone };
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const count = { v: 0 };
      const tl = gsap.timeline();
      tl.from("[data-pl-word]", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06 })
        .to(
          count,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to("[data-pl-bar]", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0);

      tl.then(async () => {
        // Don't reveal the hero in a fallback face.
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
        if (cancelled) return;
        gsap
          .timeline({ onComplete: () => cb.current.onDone() })
          .to("[data-pl-inner]", { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power3.in" })
          .add(() => cb.current.onReveal())
          .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "<0.15");
      });
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      role="status"
      aria-label={`Loading ${brand.name}`}
      className="grain fixed inset-0 z-[70] bg-ink text-paper"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div data-pl-inner className="gutter flex h-full flex-col justify-between py-8">
        <div className="eyebrow flex justify-between text-paper/60">
          <span>{brand.location}</span>
          <span>{brand.established}</span>
        </div>

        <div className="display text-[clamp(3.5rem,14vw,12rem)]">
          {[brand.name, brand.tagline].map((w, i) => (
            <span key={w} className="line-mask">
              <span data-pl-word className={`block ${i === 1 ? "italic text-glow" : ""}`}>
                {w}
              </span>
            </span>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-end justify-between">
            <span className="eyebrow text-paper/60">Preparing your stay</span>
            <span ref={counter} className="display text-5xl tabular-nums md:text-7xl">
              000
            </span>
          </div>
          <div className="h-px w-full bg-paper/15">
            <div data-pl-bar className="h-full origin-left scale-x-0 bg-glow" />
          </div>
        </div>
      </div>
    </div>
  );
}
