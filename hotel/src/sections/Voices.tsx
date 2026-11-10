import { Marquee } from "@/components/Marquee";
import { voices } from "@/data/content";

export function Voices() {
  return (
    <section id="voices" aria-labelledby="voices-heading" className="overflow-hidden bg-paper py-24 md:py-32">
      <h2 id="voices-heading" className="eyebrow gutter mb-12 text-muted">
        <span aria-hidden="true" className="mr-3 inline-block h-2 w-2 rounded-full bg-clay" />
        What the press wrote
      </h2>
      <Marquee duration={55} className="border-y border-ink/15 py-8 md:py-12">
        {voices.map((v) => (
          <figure key={v.source} className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
            <blockquote className="display text-[clamp(2.25rem,6vw,5.5rem)] whitespace-nowrap italic">
              “{v.quote}”
            </blockquote>
            <figcaption className="eyebrow whitespace-nowrap text-muted">— {v.source}</figcaption>
            <span aria-hidden="true" className="text-3xl text-clay">✦</span>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
