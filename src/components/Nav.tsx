import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { onRouteClick } from "@/lib/router";

const docIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-3.5 w-3.5 stroke-current">
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
);

export function Nav() {
  const [active, setActive] = useState<string>("home");
  const [solid, setSolid] = useState(false);

  // Scroll-spy: whichever nav section's top has most recently crossed the
  // ~35%-down line stays active. Position-based rather than intersection-based
  // so it keeps working across the un-navved sections (Philosophy, Pipeline)
  // sitting between the tracked ones — an IntersectionObserver band can go
  // empty while scrolling through those gaps and freeze on the last hit.
  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      setSolid(window.scrollY > 40);

      const line = window.innerHeight * 0.35;
      let current = sections[0]?.id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
      <nav
        className={`panel mx-auto flex max-w-[1180px] items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7 ${
          solid ? "bg-void/70 shadow-[0_18px_50px_-24px_rgb(0_0_0/0.9)]" : ""
        }`}
      >
        <a href="#home" className="text-lg font-bold tracking-tight">
          {profile.firstName}
          <span className="text-violet">.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-xs font-medium transition-colors ${
                  active === id
                    ? "text-chrome"
                    : "text-mist hover:text-chrome"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* The CV lives on its own route, so it sits beside the actions rather
            than in the section list the scroll-spy tracks. Kept visible at
            every width — there is no mobile menu to fall back on. */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/cv"
            onClick={onRouteClick}
            className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap text-mist hover:-translate-y-0.5 hover:text-chrome md:px-5"
          >
            {docIcon} CV
          </a>

          <a
            href="#contact"
            className="shine glass rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap hover:-translate-y-0.5 md:px-5"
          >
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  );
}
