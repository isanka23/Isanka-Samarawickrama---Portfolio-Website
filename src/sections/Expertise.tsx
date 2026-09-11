import { expertise } from "@/data/expertise";
import { Reveal } from "@/components/Reveal";

export function Expertise() {
  return (
    <section id="expertise" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((item, i) => (
          <Reveal key={item.id} delay={i * 90}>
            <article className="panel group h-full rounded-2xl p-7 transition-colors duration-300 hover:border-white/20">
              <p className="label-mono">// {item.id.replace("-", " ")}</p>
              <h3 className="mt-5 text-lg font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {item.blurb}
              </p>
              <p className="mt-7 inline-block rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-mist transition-colors group-hover:border-violet/50 group-hover:text-chrome">
                {item.tag}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
