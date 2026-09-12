import { useState } from "react";
import { profile } from "@/data/profile";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { handleSpotlight } from "@/hooks/useSpotlight";

const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-6 w-6 stroke-current">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-4 w-4 stroke-current">
    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the mailto button still works.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-xs text-mist hover:-translate-y-0.5 hover:text-chrome"
    >
      {copied ? "✓ Copied" : "Copy Email"}
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="violet-wash relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
      {/* Faint blueprint grid, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 25%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 25%, black, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-3">
            <SectionLabel>// Live Dispatch Node</SectionLabel>
            <span className="label-mono inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/[0.06] px-4 py-1.5 text-signal">
              <span className="h-1 w-1 animate-pulse rounded-full bg-signal" />
              {profile.status}
            </span>
          </div>

          <h2 className="font-display text-chrome-gradient mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] uppercase">
            Let&apos;s Build Something Exceptional.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">
            Reach out through any of the channels below. I read every message
            and reply within 24 hours.
          </p>
        </Reveal>

        {/* Primary channel — email */}
        <Reveal delay={100}>
          <div
            onMouseMove={handleSpotlight}
            className="panel spotlight lift mt-12 rounded-3xl p-8 sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                  {mailIcon}
                </span>
                <div className="min-w-0">
                  <p className="label-mono">// Primary Channel</p>
                  <p className="mt-2 truncate font-mono text-base text-chrome sm:text-lg">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CopyEmailButton email={profile.email} />
                <a
                  href={`mailto:${profile.email}`}
                  className="shine glass-bright inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold text-void hover:-translate-y-0.5"
                >
                  Send Email {arrowIcon}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Secondary channels — socials */}
        <Reveal delay={180} className="mt-4 grid gap-4 sm:grid-cols-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              onMouseMove={handleSpotlight}
              className="panel spotlight lift group flex min-w-0 items-center justify-between gap-4 rounded-2xl p-6 transition-colors hover:border-violet/40"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="mt-1 truncate font-mono text-[11px] text-mist">
                  {s.href.replace(/^https?:\/\/(www\.)?/, "")}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-violet/50 group-hover:text-chrome">
                {arrowIcon}
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
