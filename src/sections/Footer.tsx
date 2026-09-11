import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 px-6 pt-16 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 pb-12 sm:grid-cols-3">
          <div>
            <p className="label-mono">// System Architecture</p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-mist">
              Full-Stack Web Engineering
              <br />
              AI &amp; Machine Learning Solutions
            </p>
          </div>

          <div className="sm:text-center">
            <p className="label-mono">// Status</p>
            <p className="mt-2 font-mono text-xs text-signal">{profile.status}</p>
            <a href="#projects" className="mt-1 inline-block font-mono text-xs underline underline-offset-4 hover:text-violet">
              View Work
            </a>
          </div>

          <div className="sm:text-right">
            <p className="label-mono">// Region</p>
            <p className="mt-2 font-mono text-xs text-mist">{profile.region}</p>
            <p className="font-mono text-xs text-mist">{profile.year}</p>
          </div>
        </div>

        {/* Oversized wordmark */}
        <h2 className="font-display text-chrome-gradient select-none text-center text-[clamp(3.5rem,17vw,15rem)] uppercase leading-none">
          {profile.firstName}
        </h2>

        <div className="flex flex-col gap-4 border-t border-white/8 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-mist">
            © {profile.year} {profile.legalName} — Built with React &amp; Tailwind
          </p>
          <div className="flex items-center gap-5">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                 className="font-mono text-[11px] text-mist transition-colors hover:text-chrome">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} className="font-mono text-[11px] underline underline-offset-4 hover:text-violet">
              {profile.email}
            </a>
          </div>
          <a href="#home" className="font-mono text-[11px] text-mist hover:text-chrome">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
