import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { stackRowOne, stackRowTwo } from "@/data/stack";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { handleSpotlight } from "@/hooks/useSpotlight";

/** Floored from the industrial-placement start date, so it self-updates. */
const EXPERIENCE_START = new Date(2024, 4, 1);
const yearsExperience = Math.max(
  1,
  Math.floor((Date.now() - EXPERIENCE_START.getTime()) / (1000 * 60 * 60 * 24 * 365.25)),
);

const stats = [
  { value: projects.length, suffix: "+", label: "// Projects Shipped" },
  {
    value: projects.filter((p) => p.playStore || p.appStore).length,
    suffix: "",
    label: "// Live Store Apps",
  },
  { value: yearsExperience, suffix: "+", label: "// Years Experience" },
  {
    value: new Set([...stackRowOne, ...stackRowTwo]).size,
    suffix: "+",
    label: "// Technologies",
  },
];

export function About() {
  return (
    <section id="about" className="violet-wash relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 md:grid-cols-2">
        <Reveal>
          <div
            onMouseMove={handleSpotlight}
            className="panel spotlight lift group aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <img
              src="/portrait.png"
              alt={profile.fullName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionLabel>// System Profile</SectionLabel>
          <h2 className="font-display text-chrome-gradient mt-6 text-[clamp(2.25rem,5vw,3.75rem)] uppercase">
            Hello, I&apos;m
            <br />
            {profile.fullName}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-mist">{profile.bio}</p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
            I work alongside AI tools — Claude, ChatGPT, and Gemini — to move
            faster through research, debugging, and iteration, while keeping
            design decisions and code quality my own.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/8 pt-8">
            <div>
              <dt className="label-mono">// Status</dt>
              <dd className="mt-1 text-sm text-signal">{profile.status}</dd>
            </div>
            <div>
              <dt className="label-mono">// Region</dt>
              <dd className="mt-1 text-sm">{profile.region}</dd>
            </div>
            <div>
              <dt className="label-mono">// Currently</dt>
              <dd className="mt-1 text-sm">{profile.company}</dd>
            </div>
            <div>
              <dt className="label-mono">// Focus</dt>
              <dd className="mt-1 text-sm">Backend · Web · Mobile</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal
        delay={200}
        className="mx-auto mt-16 grid max-w-[1200px] grid-cols-2 gap-8 border-t border-white/8 pt-10 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </Reveal>
    </section>
  );
}
