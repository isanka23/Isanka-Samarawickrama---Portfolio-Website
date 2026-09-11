import { stackRowOne, stackRowTwo } from "@/data/stack";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

function Marquee({
  items,
  reverse = false,
  duration = 48,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  // Track is duplicated so the -50% translate loops seamlessly.
  const track = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden py-2.5">
      <div
        className="flex shrink-0 gap-3 pr-3"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 font-mono text-[13px] text-mist backdrop-blur transition-colors hover:border-violet/50 hover:text-chrome"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="violet-wash relative overflow-hidden py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl px-6 text-center">
        <SectionLabel>Technical Stack</SectionLabel>
        <h2 className="font-display text-chrome-gradient mt-6 text-[clamp(2rem,4.5vw,3.25rem)] uppercase">
          Technologies I Work With
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          Backend services, responsive web interfaces, and cross-platform
          mobile applications.
        </p>
      </Reveal>

      <div className="relative mt-14">
        {/* Edge fades so chips dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent md:w-40" />

        <Marquee items={stackRowOne} duration={52} />
        <Marquee items={stackRowTwo} duration={44} reverse />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
