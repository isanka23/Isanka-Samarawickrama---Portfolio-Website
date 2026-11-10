import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import { Lines } from "@/components/Lines";
import { suites } from "@/data/content";
import { DESKTOP, MOTION_OK, gsap } from "@/lib/motion";
import { scrollToHash } from "@/lib/scroll";

const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/**
 * Desktop: the section pins and the row of suites scrolls sideways.
 * Mobile / reduced motion: a plain vertical list — no scroll hijacking.
 */
export function Suites() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);

    mm.add(MOTION_OK, () => {
      gsap.from("[data-line]", {
        yPercent: 110,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    });

    mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each photo counter-drifts inside its frame while the row moves.
      gsap.utils.toArray<HTMLElement>("[data-suite-img] img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8, scale: 1.18 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("[data-suite]"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="suites"
      aria-labelledby="suites-heading"
      className="relative overflow-hidden bg-ink py-24 text-paper md:flex md:h-svh md:flex-col md:justify-center md:py-0"
    >
      <div className="gutter mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-10">
        <Lines
          as="h2"
          id="suites-heading"
          lines={["Rooms that", "face the water"]}
          className="display text-[clamp(2.75rem,7vw,6.5rem)]"
          emphasis={1}
          emphasisClassName="italic text-glow"
        />
        <p className="max-w-xs text-sm leading-relaxed text-paper/70">
          Four ways to stay. Every room has a deep bath, rain-shower terrace and no television unless you ask.
        </p>
      </div>

      <div
        ref={track}
        className="gutter flex flex-col gap-14 md:w-max md:flex-row md:gap-8 md:pr-[30vw]"
      >
        {suites.map((s, i) => (
          <article key={s.name} data-suite className="group md:w-[min(30vw,44svh)]">
            <a
              href="#reserve"
              data-cursor="Reserve"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#reserve");
              }}
              className="block"
            >
              <div data-suite-img className="aspect-[4/5] overflow-hidden">
                <Img
                  photo={s.photo}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  sizes="(min-width: 900px) 30vw, 100vw"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2 text-paper/50">
                    0{i + 1} — {s.kind}
                  </p>
                  <h3 className="display text-4xl transition-[font-style] group-hover:italic md:text-5xl">{s.name}</h3>
                </div>
                <p className="text-right text-sm text-paper/70">
                  from <span className="display block text-2xl text-glow">{price.format(s.from)}</span>
                  <span className="sr-only">per night</span>
                </p>
              </div>
              <p className="eyebrow mt-4 flex gap-4 text-paper/50">
                <span>{s.size}</span>
                <span aria-hidden="true">·</span>
                <span>{s.guests}</span>
              </p>
            </a>
          </article>
        ))}
      </div>

      <div className="gutter mt-10 hidden md:block" aria-hidden="true">
        <div className="h-px w-full bg-paper/15">
          <div data-progress className="h-full origin-left scale-x-0 bg-glow" />
        </div>
      </div>
    </section>
  );
}
