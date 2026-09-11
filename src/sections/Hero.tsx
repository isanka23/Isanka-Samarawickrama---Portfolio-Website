import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroPhases, profile } from "@/data/profile";
import { useFrameSequence, HERO_FRAME_COUNT } from "@/hooks/useFrameSequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, ready } = useFrameSequence();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  /** Draws one frame with cover-fit math so it never distorts. */
  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = images[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  useEffect(() => {
    if (!ready) return;

    // Reduced motion / small screens: a single static frame, no pin.
    if (reduced) {
      draw(0);
      return;
    }

    const state = { frame: 0 };

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const target = Math.min(
          HERO_FRAME_COUNT - 1,
          Math.round(self.progress * (HERO_FRAME_COUNT - 1)),
        );
        if (target !== state.frame) {
          state.frame = target;
          draw(target);
        }
        setPhase(
          Math.min(
            heroPhases.length - 1,
            Math.floor(self.progress * heroPhases.length),
          ),
        );
      },
    });

    draw(0);
    const onResize = () => draw(state.frame);
    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [ready, reduced, images]);

  const active = heroPhases[phase];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-void grain"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Vignette keeps the headline readable over any frame */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(8 8 10 / 0.92) 0%, rgb(8 8 10 / 0.35) 32%, transparent 50%, rgb(8 8 10 / 0.35) 68%, rgb(8 8 10 / 0.92) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-6 md:px-12">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          {/* Left — headline */}
          <div>
            <p className="label-mono mb-5">
              Hi, I&apos;m{" "}
              <span className="text-chrome underline underline-offset-4">
                {profile.firstName}
              </span>
            </p>
            <h1 className="font-display text-chrome-gradient text-[clamp(3rem,8vw,7rem)] uppercase">
              {active.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div aria-hidden className="hidden md:block md:w-[38vw]" />

          {/* Right — rotating caption */}
          <div className="max-w-xs md:justify-self-end md:text-right lg:max-w-sm">
            <p className="label-mono mb-3">{active.label}</p>
            <p className="text-sm leading-relaxed text-mist">
              {active.caption}
            </p>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-4">
          <p className="label-mono hidden animate-pulse sm:block">
            ↓ Scroll to scrub timeline
          </p>
          <div className="flex gap-3">
            <a
              href="#projects"
              className="shine rounded-full bg-chrome px-7 py-3 text-sm font-semibold text-void transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_-12px_rgb(255_255_255/0.35)]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="shine rounded-full border border-white/15 bg-void/70 px-7 py-3 text-sm font-semibold text-chrome backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-violet/50"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
