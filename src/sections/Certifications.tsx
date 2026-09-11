import { certifications } from "@/data/certifications";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="text-center">
          <SectionLabel>// Verified Credentials</SectionLabel>
          <h2 className="font-display text-chrome-gradient mt-6 text-[clamp(2rem,4.5vw,3.25rem)] uppercase">
            Certifications
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.credentialId} delay={i * 80}>
              <article className="panel flex h-full items-start justify-between gap-5 rounded-2xl p-6">
                <div>
                  <h3 className="font-semibold leading-snug">{cert.name}</h3>
                  <p className="mt-1.5 text-sm text-mist">{cert.issuer}</p>
                  <p className="mt-4 font-mono text-[11px] text-mist/70">
                    ID {cert.credentialId}
                  </p>
                </div>
                <span className="label-mono shrink-0">{cert.year}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
