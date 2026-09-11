import { useRef } from "react";
import { projects } from "@/data/projects";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);

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

        <div className="mt-6 flex justify-end gap-2">
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

      {/* Native scroll-snap: keyboard- and touch-accessible by default. */}
      <div
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-6 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Project carousel"
      >
        {projects.map((project) => (
          <article
            key={project.index}
            className="panel group flex w-[86vw] shrink-0 snap-start flex-col rounded-2xl p-7 sm:w-[420px]"
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
                  className="inline-flex items-center gap-2 font-mono text-xs text-signal transition-colors hover:text-chrome"
                >
                  LIVE <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
