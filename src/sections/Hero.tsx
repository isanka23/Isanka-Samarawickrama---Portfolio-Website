import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroPhases, profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LocalClock } from "@/components/LocalClock";

const PHASE_MS = 5000;

const TICKER_TOP = "Software Engineer ✦ Backend ✦ Web ✦ Mobile ✦ ";
const TICKER_BOTTOM = "Flutter ✦ React ✦ Node.js ✦ REST APIs ✦ ";

/** One ticker row. The content is doubled so the -50% loop is seamless. */
function Ticker({ text, direction }: { text: string; direction: "l" | "r" }) {
  return (
    <div className={`marquee marquee-${direction}`}>
      <span className="text-outline font-display text-[clamp(4rem,12vw,13rem)] uppercase">
        {text.repeat(3)}
      </span>
      <span
        aria-hidden="true"
        className="text-outline font-display text-[clamp(4rem,12vw,13rem)] uppercase"
      >
        {text.repeat(3)}
      </span>
    </div>
  );
}

export function Hero({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  // Timeout rather than interval, so a manual pick restarts the dwell.
  useEffect(() => {
    if (reduced || !ready) return;
    const id = setTimeout(
      () => setPhase((p) => (p + 1) % heroPhases.length),
      PHASE_MS,
    );
    return () => clearTimeout(id);
  }, [phase, reduced, ready]);

  useLayoutEffect(() => {
    if (reduced || !ready) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mask-line]",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 },
      );
      gsap.fromTo(
        "[data-fade-line]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.12 },
      );
    }, copyRef);
    return () => ctx.revert();
  }, [phase, reduced, ready]);

  // One-shot entrance for the furniture and portrait as the curtain lifts.
  useLayoutEffect(() => {
    if (reduced || !ready) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-disc]", {
        scale: 0.88,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
      });
      gsap.from("[data-hero-rise]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, ready]);

  const active = heroPhases[phase];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-void grain"
    >
      <div className="aurora" />

      {/* Kinetic outline type, framing the composition top and bottom */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between overflow-hidden py-[4vh]">
        <Ticker text={TICKER_TOP} direction="l" />
        <Ticker text={TICKER_BOTTOM} direction="r" />
      </div>

      {/* Keeps the copy readable where it crosses the portrait */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/75 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-6 pt-28 pb-8 md:px-12 md:pt-24">
        <div className="flex flex-1 flex-col justify-center">
        {/* Below md the disc stacks above the copy (column-reverse, since it is
            second in the DOM) so the two can never collide on a small screen.
            From md they sit side by side and items-start pins the disc's top
            edge to the status pill's. */}
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between lg:gap-10">
        <div ref={copyRef} className="max-w-3xl md:min-w-0 md:flex-1">
          <div
            data-hero-rise
            className="panel inline-flex items-center gap-2.5 rounded-full px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="label-mono text-chrome">{profile.status}</span>
          </div>

          <p className="label-mono mt-7 mb-4 text-chrome/85">
            Hi, I&apos;m{" "}
            <span className="text-chrome underline underline-offset-4">
              {profile.firstName}
            </span>
          </p>

          <h1 className="font-display text-chrome-gradient text-[clamp(2.5rem,7.5vw,6.5rem)] uppercase">
            {active.headline.map((line) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.09em] -mb-[0.09em]"
              >
                {/* nowrap so a phrase like "Cross-Platform" never splits */}
                <span data-mask-line className="block whitespace-nowrap">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div data-fade-line className="mt-8 max-w-md">
            <p className="label-mono mb-3 text-chrome/90">{active.label}</p>
            <p className="text-sm leading-relaxed text-chrome/80 [text-shadow:0_2px_16px_rgb(8_8_10/0.8)]">
              {active.caption}
            </p>
          </div>

          <div className="mt-8 flex gap-2" role="tablist" aria-label="Hero focus">
            {heroPhases.map((p, i) => (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={i === phase}
                aria-label={p.headline.join(" ")}
                onClick={() => setPhase(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === phase ? "w-10 bg-violet" : "w-5 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>

          <div data-hero-rise className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="shine glass-bright rounded-full px-7 py-3 text-sm font-semibold text-void hover:-translate-y-0.5"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="shine glass rounded-full px-7 py-3 text-sm font-semibold text-chrome hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Portrait disc: multiply drops the photo's white studio backdrop into
            the violet, leaving a duotone cut-out inside a bloom. */}
        <div
          data-hero-disc
          className="halo pointer-events-none relative aspect-square w-[54%] max-w-[560px] shrink-0 self-end md:-mr-6 md:w-[34%] md:self-start lg:-mr-10 lg:w-[36%]"
        >
          {/* Absolute so the portrait's own 3:4 ratio can't drive this box's
              height — otherwise the flex column sizes it from content and the
              disc turns into an oval. */}
          <div className="absolute inset-0 overflow-hidden rounded-full bg-[#b3a8f7]">
            <img
              src="/portrait.webp"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[50%_10%] brightness-[1.06] contrast-[1.04] mix-blend-multiply"
            />
          </div>
        </div>
        </div>
        </div>

        <div
          data-hero-rise
          className="mt-10 flex items-center justify-between gap-4"
        >
          <div className="glass hidden items-center gap-5 rounded-full px-5 py-1 md:inline-flex">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="label-mono py-1.5 transition-colors hover:text-chrome"
              >
                {s.label}
              </a>
            ))}
          </div>
          <LocalClock />
        </div>
      </div>
    </section>
  );
}
