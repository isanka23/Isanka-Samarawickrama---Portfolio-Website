import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import { Lines } from "@/components/Lines";
import { dining } from "@/data/content";
import { MOTION_OK, gsap } from "@/lib/motion";

/** A framed photo that opens out to full-bleed as you scroll into it. */
export function Dining() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(MOTION_OK, () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top top", scrub: true },
        })
        .fromTo(
          "[data-dining-frame]",
          { clipPath: "inset(14% 22% 14% 22% round 999px 999px 0 0)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0 0)", ease: "none" },
        )
        .fromTo("[data-dining-frame] img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0);

      gsap.from("[data-line]", {
        yPercent: 110,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-dining-copy]", start: "top 80%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="dining" aria-labelledby="dining-heading" className="relative bg-paper">
      <div data-dining-frame className="relative h-[110svh] overflow-hidden bg-ink text-paper">
        <Img photo={dining.photo} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" aria-hidden="true" />

        <div data-dining-copy className="gutter absolute inset-x-0 bottom-0 grid gap-10 pb-12 md:grid-cols-12 md:pb-16">
          <div className="md:col-span-7">
            <p className="eyebrow mb-6 text-glow">{dining.eyebrow}</p>
            <Lines
              as="h2"
              id="dining-heading"
              lines={dining.title}
              emphasis={1}
              emphasisClassName="italic"
              className="display text-[clamp(2.75rem,7.5vw,7rem)]"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="mb-8 text-sm leading-relaxed text-paper/80 md:text-base">{dining.body}</p>
            <dl className="divide-y divide-paper/20 border-y border-paper/20">
              {dining.hours.map((h) => (
                <div key={h.label} className="flex justify-between py-3">
                  <dt className="eyebrow text-paper/60">{h.label}</dt>
                  <dd className="tabular-nums">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
