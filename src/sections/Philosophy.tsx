import { profile } from "@/data/profile";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <SectionLabel>// Engineering Philosophy</SectionLabel>

        <span
          aria-hidden
          className="text-chrome-gradient pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 select-none font-display text-[7rem] leading-none opacity-10 md:text-[10rem]"
        >
          &ldquo;
        </span>

        <blockquote className="relative mt-10">
          <p className="text-chrome-gradient text-[clamp(1.4rem,3.2vw,2.5rem)] italic leading-snug">
            Code that works today is easy. Code someone else can trust a year
            from now — that&apos;s the job.
          </p>
        </blockquote>

        <p className="label-mono mt-8">— {profile.fullName}</p>
      </Reveal>
    </section>
  );
}
