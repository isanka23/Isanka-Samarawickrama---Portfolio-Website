import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-white/8 bg-void/80 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-12">
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

        <a
          href="#contact"
          className="shine rounded-full border border-white/15 px-5 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:border-violet/50 hover:bg-white/5"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}
