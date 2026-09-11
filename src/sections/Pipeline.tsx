import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { handleSpotlight } from "@/hooks/useSpotlight";

const icon = "h-6 w-6 stroke-current";

const steps = [
  {
    label: "Build",
    detail: "Feature branches, code review, typed end to end.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className={icon}>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
        <path d="M12 3v9m0 0l8-4.5M12 12L4 7.5m8 4.5v9" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Test",
    detail: "Manual QA and automated checks before anything ships.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className={icon}>
        <path d="M9 3h6M10 3v6.2L5.5 18a2 2 0 001.8 3h9.4a2 2 0 001.8-3L14 9.2V3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 15h9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Deploy",
    detail: "CI pipelines pushing to web hosts and app stores.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className={icon}>
        <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Monitor",
    detail: "Watching real usage once it's live — mine to keep running.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className={icon}>
        <path d="M3 12h4l2 7 4-14 2 7h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    active: true,
  },
];

export function Pipeline() {
  return (
    <section className="relative px-6 py-20 md:px-12 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>// Service Pipeline</SectionLabel>
        <h2 className="font-display text-chrome-gradient mt-6 text-[clamp(2rem,4.5vw,3.25rem)] uppercase">
          End-to-End, Not Just Code
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          From the first commit to what happens after launch — I own the
          whole delivery pipeline, not just the feature.
        </p>
      </Reveal>

      <Reveal
        delay={120}
        className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-0"
      >
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex flex-col items-center gap-10 sm:flex-1 sm:flex-row sm:items-start sm:last:flex-none"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div
                  onMouseMove={handleSpotlight}
                  className={`panel spotlight lift flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${
                    step.active ? "border-signal/40 text-signal" : "text-mist"
                  }`}
                >
                  {step.icon}
                </div>
                {step.active && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-void bg-signal text-void">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth={3} className="h-3 w-3 stroke-current">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="label-mono mt-4">{step.label}</p>
              <p className="mt-2 max-w-[9.5rem] text-xs leading-relaxed text-mist">
                {step.detail}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-white/5 sm:mt-8 sm:block" />
            )}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
