import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import { intro } from "@/data/content";
import { MOTION_OK, gsap } from "@/lib/motion";

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(MOTION_OK, () => {
      // Words brighten as the paragraph scrolls through the viewport.
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.fromTo(
        "[data-intro-photo]",
        { clipPath: "inset(18% 12% 18% 12%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: "[data-intro-photo]", start: "top 90%", end: "center 55%", scrub: true },
        },
      );
      gsap.fromTo(
        "[data-intro-photo] img",
        { scale: 1.3 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-intro-photo]", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      gsap.from("[data-stat]", {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-stats]", start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  const words = intro.statement.split(" ");

  return (
    <section ref={root} aria-labelledby="intro-heading" className="gutter py-24 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 id="intro-heading" className="eyebrow text-muted md:col-span-3">
          <span aria-hidden="true" className="mr-3 inline-block h-2 w-2 rounded-full bg-clay" />
          {intro.eyebrow}
        </h2>
        <p
          data-statement
          className="display text-[clamp(1.75rem,4.4vw,4.25rem)] leading-[1.05] md:col-span-9"
        >
          {words.map((w, i) => (
            <span key={i} data-word className="inline">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-20 grid items-end gap-10 md:mt-32 md:grid-cols-12">
        <div data-intro-photo className="aspect-[4/5] md:col-span-5 md:col-start-2" style={{ clipPath: "inset(0)" }}>
          <Img photo={intro.photo} className="h-full w-full" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>

        <dl data-stats className="grid gap-8 md:col-span-5 md:col-start-8">
          {intro.stats.map((s) => (
            <div key={s.label} data-stat className="flex items-baseline justify-between border-t border-ink/15 pt-4">
              <dt className="eyebrow text-muted">{s.label}</dt>
              <dd className="display text-6xl md:text-7xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
