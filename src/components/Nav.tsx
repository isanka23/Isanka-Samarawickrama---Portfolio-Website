import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

export function Nav() {
  const [active, setActive] = useState<string>("home");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section nearest the top third wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
