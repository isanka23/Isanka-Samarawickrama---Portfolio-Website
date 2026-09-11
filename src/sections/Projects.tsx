import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Pixels per second the track drifts on its own. */
const SPEED = 38;

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // The list is rendered twice so the drift can loop seamlessly.
  const loop = [...projects, ...projects];

  /**
   * Keeps scrollLeft inside the first copy. Because the second copy is
   * identical, wrapping by half the track width is invisible to the viewer.
   */
  const wrap = useCallback((el: HTMLElement) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  }, []);

  // Continuous drift, driven by rAF so it tracks real elapsed time.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced || paused) return;

    let frame = 0;
    let last = performance.now();
    // scrollLeft is floored to whole pixels, so sub-pixel steps would be
    // discarded every frame. Accumulate the true position separately.
    let pos = el.scrollLeft;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1); // clamp after tab-away
      last = now;

      pos += SPEED * dt;
      const half = el.scrollWidth / 2;
      if (half > 0 && pos >= half) pos -= half;

      el.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, paused, wrap]);

  // Manual scrolling (wheel, trackpad, drag) still needs to wrap. The drift
  // loop re-reads scrollLeft when it restarts, so the two stay in sync.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !paused) return;
    const onScroll = () => wrap(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [wrap, paused]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="projects" className="violet-wash relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="text-center">
          <SectionLabel>// Portfolio Work</SectionLabel>
          <h2 className="font-display text-chrome-gradient mt-6 text-[clamp(2rem,5vw,3.75rem)] uppercase">
            Featured Engineering Projects
          </h2>
        </Reveal>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="mr-1 rounded-full border border-white/12 px-4 py-2 font-mono text-[11px] text-mist transition hover:border-white/35 hover:text-chrome"
          >
            {paused ? "▶ Play" : "❚❚ Pause"}
          </button>
          <button
            onClick={() => nudge(-1)}
            aria-label="Previous projects"
            className="rounded-full border border-white/12 p-3 transition hover:border-white/35 hover:bg-white/5"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Next projects"
            className="rounded-full border border-white/12 p-3 transition hover:border-white/35 hover:bg-white/5"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        {/* Edge fades so cards dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent md:w-28" />

        {/*
          Auto-drifts, but stays a real scroll container: wheel, trackpad,
          touch and keyboard all still work. Drift pauses while the pointer
          is over it or focus is inside, so nothing slides away mid-read.
        */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-6 pb-6 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Project carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {loop.map((project, i) => (
            <article
              key={`${project.index}-${i}`}
              // The duplicate half is presentational only.
              aria-hidden={i >= projects.length}
              className="panel group flex w-[86vw] shrink-0 flex-col rounded-2xl p-7 sm:w-[420px]"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="label-mono">// Project {project.index}</p>
                <p className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-mist">
                  {project.category}
                </p>
              </div>

              <h3 className="mt-6 text-2xl font-semibold leading-tight">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                {project.blurb}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 px-2.5 py-1.5 font-mono text-[11px] text-mist"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-5">
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={i >= projects.length ? -1 : undefined}
                    className="inline-flex items-center gap-2 font-mono text-xs text-chrome transition-colors hover:text-violet"
                  >
                    CODE <span aria-hidden>→</span>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={i >= projects.length ? -1 : undefined}
                    className="inline-flex items-center gap-2 font-mono text-xs text-signal transition-colors hover:text-chrome"
                  >
                    LIVE <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
