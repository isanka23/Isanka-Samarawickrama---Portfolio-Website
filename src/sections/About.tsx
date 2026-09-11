import { profile } from "@/data/profile";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="violet-wash relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 md:grid-cols-2">
        <Reveal>
          {/* Placeholder portrait — swap for a real image. */}
          <div className="panel aspect-[4/5] overflow-hidden rounded-3xl">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.07] to-transparent">
              <span className="label-mono text-center leading-relaxed">
                Portrait
                <br />
                placeholder
              </span>
            </div>
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

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/8 pt-8">
            <div>
              <dt className="label-mono">// Status</dt>
              <dd className="mt-1 text-sm text-signal">{profile.status}</dd>
            </div>
            <div>
              <dt className="label-mono">// Region</dt>
              <dd className="mt-1 text-sm">{profile.region}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
