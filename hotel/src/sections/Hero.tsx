import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import { brand, hero } from "@/data/content";
import { MOTION_OK, gsap } from "@/lib/motion";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Intro: plays once the preloader curtain starts lifting.
  useEffect(() => {
    if (!ready || !root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(MOTION_OK, () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-hero-media]", { scale: 1.35, duration: 2.2 })
        .from("[data-char]", { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.045 }, 0.1)
        .from("[data-hero-meta]", { y: 20, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.6);
    });
    return () => mm.revert();
  }, [ready]);

  // Scroll: image drifts and darkens, title lifts away faster than the page.
  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(MOTION_OK, () => {
      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-parallax]", { yPercent: 18, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-hero-shade]", { opacity: 0.65, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-hero-title]", { yPercent: -35, ease: "none", scrollTrigger: scrub });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-svh min-h-[560px] overflow-hidden bg-ink text-paper">
      <div data-hero-parallax className="absolute inset-0">
        <div data-hero-media className="h-full w-full">
          <Img photo={hero} priority className="h-full w-full" />
        </div>
      </div>
      <div data-hero-shade className="absolute inset-0 bg-ink opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" aria-hidden="true" />

      <div className="gutter relative flex h-full flex-col justify-end pb-8 md:pb-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-2">
          <p data-hero-meta className="eyebrow max-w-[16rem] text-paper/80">
            {brand.tagline} — {brand.location}
          </p>
          <p data-hero-meta className="eyebrow text-paper/80">{brand.coords}</p>
        </div>

        <h1 data-hero-title aria-label={`${brand.name} ${brand.tagline}`} className="display -ml-[0.04em] text-[clamp(5rem,23.5vw,24rem)] leading-[0.82]">
          <span className="line-mask" aria-hidden="true">
            {brand.name.split("").map((c, i) => (
              <span key={i} data-char className="inline-block origin-bottom-left">
                {c}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-6 flex items-center justify-between">
          <p data-hero-meta className="max-w-sm text-sm leading-relaxed text-paper/80 md:text-base">
            A forty-two key hideaway on the cliffs, where the lighthouse still turns at dusk.
          </p>
          <span data-hero-meta className="eyebrow hidden items-center gap-3 text-paper/80 md:flex" aria-hidden="true">
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-paper/25">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-in-out-quart)_infinite] bg-paper" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
