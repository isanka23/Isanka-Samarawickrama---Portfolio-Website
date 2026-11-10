import { useEffect, useRef, useState } from "react";
import { brand, nav } from "@/data/content";
import { MOTION_OK, gsap } from "@/lib/motion";
import { scrollToHash } from "@/lib/scroll";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(MOTION_OK, () => {
      gsap.from("[data-char]", {
        yPercent: 100,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom bottom", scrub: 1 },
      });
    });
    return () => mm.revert();
  }, []);

  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer ref={root} className="gutter overflow-hidden bg-ink pt-24 text-paper">
      <div className="grid gap-12 border-b border-paper/15 pb-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="eyebrow mb-4 text-paper/50">Find us</p>
          <address className="not-italic leading-relaxed text-paper/85">
            {brand.address.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
        </div>
        <div>
          <p className="eyebrow mb-4 text-paper/50">Talk to us</p>
          <a href={brand.phoneHref} className="link-underline block w-fit text-paper/85">{brand.phone}</a>
          <a href={`mailto:${brand.email}`} className="link-underline mt-1 block w-fit text-paper/85">{brand.email}</a>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-paper/50">Explore</p>
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(n.href);
                  }}
                  className="link-underline text-paper/85"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4 text-paper/50">Check-in</p>
          <p className="text-paper/85">From 14:00</p>
          <p className="text-paper/85">Until 11:00</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display flex justify-between overflow-hidden pt-6 text-[clamp(5rem,24vw,26rem)] leading-[0.78] text-glow"
      >
        {brand.name.split("").map((c, i) => (
          <span key={i} data-char className="inline-block">{c}</span>
        ))}
      </p>

      <div className="eyebrow flex flex-col gap-2 py-6 text-paper/40 sm:flex-row sm:justify-between">
        <span>© {year} {brand.name} {brand.tagline}</span>
        <span>{brand.coords}</span>
      </div>
    </footer>
  );
}
