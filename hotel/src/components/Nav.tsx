import { useCallback, useEffect, useRef, useState } from "react";
import { brand, nav } from "@/data/content";
import { gsap } from "@/lib/motion";
import { getLenis, scrollToHash } from "@/lib/scroll";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reduced motion: jump straight to the end state (callbacks still fire). */
function play(tl: gsap.core.Timeline) {
  if (prefersReducedMotion()) tl.progress(1);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const animating = useRef(false);

  const close = useCallback((then?: () => void) => {
    const el = dialog.current;
    if (!el || animating.current) return;
    animating.current = true;
    const tl = gsap
      .timeline({
        onComplete: () => {
          el.close();
          animating.current = false;
          setOpen(false);
          getLenis()?.start();
          then?.();
        },
      })
      .to(el.querySelectorAll("[data-line]"), { yPercent: -110, duration: 0.5, ease: "power3.in", stagger: 0.03 })
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut" }, "-=0.2");
    play(tl);
  }, []);

  const show = useCallback(() => {
    const el = dialog.current;
    if (!el || animating.current) return;
    animating.current = true;
    setOpen(true);
    getLenis()?.stop();
    el.showModal();
    const tl = gsap
      .timeline({ onComplete: () => void (animating.current = false) })
      .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
      .fromTo(
        el.querySelectorAll("[data-line]"),
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06 },
        "-=0.35",
      );
    play(tl);
  }, []);

  // Esc should animate out rather than snap shut.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, [close]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) close(() => scrollToHash(href));
    else scrollToHash(href);
  };

  return (
    <>
      <header className="gutter pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 text-white mix-blend-difference">
        <a href="#top" onClick={go("#top")} className="pointer-events-auto display text-2xl tracking-tight md:text-3xl">
          {brand.name}
          <span className="sr-only"> — back to top</span>
        </a>

        <nav aria-label="Primary" className="pointer-events-auto hidden items-center gap-8 lg:flex">
          {nav.slice(0, -1).map((item) => (
            <a key={item.href} href={item.href} onClick={go(item.href)} className="eyebrow link-underline pb-1">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="#reserve"
            onClick={go("#reserve")}
            className="eyebrow hidden rounded-full border border-white/60 px-5 py-3 transition-colors hover:bg-white hover:text-black sm:inline-block"
          >
            Reserve
          </a>
          <button
            type="button"
            onClick={show}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="eyebrow flex items-center gap-3 py-3"
          >
            Menu
            <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 self-end bg-current" />
            </span>
          </button>
        </div>
      </header>

      <dialog
        ref={dialog}
        aria-label="Site menu"
        className="grain m-0 h-dvh max-h-none w-screen max-w-none bg-sea p-0 text-paper backdrop:bg-transparent"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="gutter flex h-full flex-col justify-between py-5">
          <div className="flex items-center justify-between">
            <span className="display text-2xl md:text-3xl">{brand.name}</span>
            <button type="button" onClick={() => close()} className="eyebrow py-3" autoFocus>
              Close
            </button>
          </div>

          <nav aria-label="Menu">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="border-t border-paper/15 last:border-b">
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    className="group flex items-baseline justify-between py-2 md:py-3"
                  >
                    <span className="line-mask">
                      <span
                        data-line
                        className="display block text-[clamp(2.75rem,9vw,7.5rem)] transition-[font-style,color] duration-500 group-hover:italic group-hover:text-glow"
                      >
                        {item.label}
                      </span>
                    </span>
                    <span className="eyebrow text-paper/50">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="eyebrow flex flex-col gap-2 text-paper/60 sm:flex-row sm:justify-between">
            <a href={brand.phoneHref} className="link-underline w-fit">{brand.phone}</a>
            <a href={`mailto:${brand.email}`} className="link-underline w-fit">{brand.email}</a>
            <span>{brand.coords}</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
