import { useEffect } from "react";

import { profile } from "@/data/profile";
import {
  cv,
  cvEducation,
  cvExperience,
  cvProjects,
  cvSkills,
  type CvEntry,
} from "@/data/cv";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { handleSpotlight } from "@/hooks/useSpotlight";
import { onRouteClick } from "@/lib/router";

const downloadIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-4 w-4 stroke-current">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
  </svg>
);

const backIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-4 w-4 stroke-current">
    <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-3.5 w-3.5 stroke-current">
    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Download + view, used in the header and again at the foot of the page. */
function CvActions({ compact = false }: { compact?: boolean }) {
  const size = compact
    ? "px-4 py-2 text-[11px]"
    : "px-5 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm";

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <a
        href={cv.file}
        target="_blank"
        rel="noreferrer"
        className={`glass inline-flex items-center justify-center gap-1.5 rounded-full font-semibold whitespace-nowrap text-mist hover:-translate-y-0.5 hover:text-chrome ${size}`}
      >
        View PDF
      </a>
      <a
        href={cv.file}
        download={cv.fileName}
        className={`shine glass-bright inline-flex items-center justify-center gap-1.5 rounded-full font-semibold whitespace-nowrap text-void hover:-translate-y-0.5 ${size}`}
      >
        {downloadIcon} Download
      </a>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <SectionLabel>{children}</SectionLabel>
    </Reveal>
  );
}

/** One dated block — shared by Work Experience and Education. */
function EntryCard({ entry, delay }: { entry: CvEntry; delay: number }) {
  return (
    <Reveal delay={delay}>
      <li onMouseMove={handleSpotlight} className="panel spotlight lift rounded-2xl p-5 sm:p-7">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-base font-semibold sm:text-lg">{entry.title}</h3>
          <p className="label-mono shrink-0">{entry.period}</p>
        </div>
        <p className="mt-1 font-mono text-xs text-violet">{entry.org}</p>
        <ul className="mt-4 space-y-2">
          {entry.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-mist">
              <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-violet" />
              {point}
            </li>
          ))}
        </ul>
      </li>
    </Reveal>
  );
}

export function Resume() {
  // Nothing re-renders the document head between routes, so the tab title is
  // set here and handed back when the visitor returns to the portfolio.
  useEffect(() => {
    const previous = document.title;
    document.title = `CV — ${profile.fullName}`;
    return () => {
      document.title = previous;
    };
  }, []);

  const contactLines = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", value: cv.phone, href: `tel:${cv.phone.replace(/\s/g, "")}` },
    { label: "Location", value: profile.region, href: undefined },
    ...profile.socials.map((s) => ({
      label: s.label,
      value: s.href.replace(/^https?:\/\/(www\.)?/, ""),
      href: s.href,
    })),
  ];

  return (
    <div className="min-h-screen">
      {/* The site nav in miniature: its section links point at sections that do
          not exist here, so this page carries its own two actions instead. */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
        <nav className="panel mx-auto flex max-w-[1180px] items-center justify-between gap-3 rounded-full bg-void/70 px-4 py-3 shadow-[0_18px_50px_-24px_rgb(0_0_0/0.9)] md:px-7">
          <a
            href="/"
            onClick={onRouteClick}
            className="inline-flex items-center gap-2 text-xs font-medium text-mist transition-colors hover:text-chrome"
          >
            {backIcon}
            <span className="hidden sm:inline">Back to portfolio</span>
            <span className="sm:hidden">Back</span>
          </a>
          <CvActions compact />
        </nav>
      </header>

      <main className="violet-wash grain relative overflow-hidden px-5 pt-28 pb-24 sm:px-6 md:px-12 md:pt-36 md:pb-32">
        <div className="aurora opacity-50" />

        <div className="relative mx-auto max-w-[1080px]">
          {/* Masthead */}
          <Reveal>
            <SectionLabel>// Curriculum Vitae</SectionLabel>
            <h1 className="font-display text-chrome-gradient mt-6 text-[clamp(2.25rem,8vw,5rem)] uppercase">
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
              {cv.headline}
            </p>
            <p className="label-mono mt-6">// Updated {cv.updated}</p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
            {/* Document body */}
            <div className="min-w-0 space-y-16">
              <section>
                <Heading>// Summary</Heading>
                <Reveal delay={80}>
                  <p className="mt-6 text-sm leading-relaxed text-mist sm:text-[0.95rem]">
                    {cv.summary}
                  </p>
                </Reveal>
              </section>

              <section>
                <Heading>// Work Experience</Heading>
                <ul className="mt-6 space-y-4">
                  {cvExperience.map((entry, i) => (
                    <EntryCard key={entry.title} entry={entry} delay={i * 80} />
                  ))}
                </ul>
              </section>

              <section>
                <Heading>// Key Projects</Heading>
                <ul className="mt-6 space-y-4">
                  {cvProjects.map((project, i) => (
                    <Reveal key={project.title} delay={i * 70}>
                      <li
                        onMouseMove={handleSpotlight}
                        className="panel spotlight lift rounded-2xl p-5 sm:p-7"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold sm:text-lg">{project.title}</h3>
                            <p className="mt-1 font-mono text-xs text-violet">{project.role}</p>
                          </div>

                          {project.links && (
                            <div className="flex shrink-0 flex-wrap gap-2">
                              {project.links.map((link) => (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-mist hover:text-chrome"
                                >
                                  {link.label} {arrowIcon}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        <ul className="mt-4 space-y-2">
                          {project.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-relaxed text-mist">
                              <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-violet" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </section>

              <section>
                <Heading>// Education</Heading>
                <ul className="mt-6 space-y-4">
                  {cvEducation.map((entry, i) => (
                    <EntryCard key={entry.title} entry={entry} delay={i * 80} />
                  ))}
                </ul>
              </section>
            </div>

            {/* Rail — contact details and the skill groups */}
            <aside className="min-w-0 space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="panel rounded-2xl p-5 sm:p-6">
                  <p className="label-mono">// Contact</p>
                  <dl className="mt-4 space-y-3">
                    {contactLines.map((line) => (
                      <div key={line.label}>
                        <dt className="font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                          {line.label}
                        </dt>
                        <dd className="mt-0.5 font-mono text-xs break-all text-chrome">
                          {line.href ? (
                            <a
                              href={line.href}
                              target={line.href.startsWith("http") ? "_blank" : undefined}
                              rel="noreferrer"
                              className="transition-colors hover:text-violet"
                            >
                              {line.value}
                            </a>
                          ) : (
                            line.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="panel rounded-2xl p-5 sm:p-6">
                  <p className="label-mono">// Technical Skills</p>
                  <div className="mt-4 space-y-4">
                    {cvSkills.map((group) => (
                      <div key={group.group}>
                        <p className="font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                          {group.group}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-chrome"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* Closing call to action */}
          <Reveal delay={60}>
            <div
              onMouseMove={handleSpotlight}
              className="panel spotlight mt-16 flex flex-col items-center gap-5 rounded-3xl p-7 text-center sm:p-10"
            >
              <div>
                <h2 className="font-display text-chrome-gradient text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase">
                  Take the full PDF with you
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist">
                  The same CV, formatted for print and ready to forward.
                </p>
              </div>
              <CvActions />
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-[11px] text-mist underline underline-offset-4 transition-colors hover:text-violet"
              >
                Or get in touch →
              </a>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
