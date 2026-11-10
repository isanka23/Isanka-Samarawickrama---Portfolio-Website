import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/Img";
import { Lines } from "@/components/Lines";
import { experiences } from "@/data/content";
import { FINE_POINTER, MOTION_OK, gsap } from "@/lib/motion";

/**
 * Index list. With a mouse, a photo floats after the cursor and swaps per
 * row; on touch, each row shows its photo inline instead.
 */
export function Experiences() {
  const root = useRef<HTMLElement>(null);
  const floater = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

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
      gsap.from("[data-row]", {
        y: 50,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-rows]", start: "top 80%" },
      });
    });

    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const el = floater.current!;
      const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const rot = gsap.quickTo(el, "rotate", { duration: 0.9, ease: "power3.out" });
      let lastX = 0;
      const onMove = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="experiences"
      aria-labelledby="experiences-heading"
      className="gutter py-24 md:py-40"
      onPointerLeave={() => setActive(null)}
    >
      <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
        <p className="eyebrow text-muted md:col-span-3">
          <span aria-hidden="true" className="mr-3 inline-block h-2 w-2 rounded-full bg-clay" />
          Days at Solenne
        </p>
        <Lines
          as="h2"
          id="experiences-heading"
          lines={["Nothing scheduled,", "everything arranged"]}
          emphasis={1}
          emphasisClassName="italic text-clay"
          className="display text-[clamp(2.75rem,7vw,6.5rem)] md:col-span-9"
        />
      </div>

      <ul data-rows className="border-b border-ink/15">
        {experiences.map((x, i) => (
          <li
            key={x.title}
            data-row
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            className="group grid gap-4 border-t border-ink/15 py-8 md:grid-cols-12 md:items-center md:py-10"
          >
            <span className="eyebrow text-muted md:col-span-1">{x.index}</span>
            <h3 className="display text-[clamp(2.25rem,5.5vw,5rem)] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] md:col-span-6 md:group-hover:translate-x-6 md:group-hover:italic md:group-hover:text-clay">
              {x.title}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:col-span-4 md:col-start-9">{x.blurb}</p>
            <Img
              photo={x.photo}
              className="aspect-[16/10] md:col-span-12 [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hidden"
              sizes="100vw"
            />
          </li>
        ))}
      </ul>

      {/* Cursor-follow preview (mouse only). Decorative: the list carries the content. */}
      <div
        ref={floater}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 hidden [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block"
      >
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] ${
            active === null ? "[clip-path:inset(50%_50%_50%_50%)]" : "[clip-path:inset(0)]"
          } h-[22rem] w-[17rem]`}
        >
          {experiences.map((x, i) => (
            <div
              key={x.title}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            >
              <Img photo={{ ...x.photo, alt: "" }} className="h-full w-full" sizes="17rem" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
