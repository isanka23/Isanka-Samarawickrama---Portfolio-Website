import { timeline } from "@/data/timeline";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function Timeline() {
  return (
    <section id="timeline" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="text-center">
          <SectionLabel>// Engineering Roadmap</SectionLabel>
        </Reveal>

        <ol className="mt-16 border-l border-white/10">
          {timeline.map((item, i) => (
            <Reveal key={item.period} delay={i * 80}>
              <li className="relative pb-14 pl-8 md:pl-12">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-void bg-violet" />
                <p className="label-mono">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                <p className="mt-1 font-mono text-xs text-violet">{item.org}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
                  {item.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
