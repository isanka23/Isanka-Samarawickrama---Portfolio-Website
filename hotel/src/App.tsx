import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollTrigger, gsap } from "@/lib/motion";
import { setLenis } from "@/lib/scroll";
import { Dining } from "@/sections/Dining";
import { Experiences } from "@/sections/Experiences";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/sections/Intro";
import { Reserve } from "@/sections/Reserve";
import { Suites } from "@/sections/Suites";
import { Voices } from "@/sections/Voices";

export default function App() {
  const reduced = useReducedMotion();
  // Reduced motion skips the preloader entirely.
  const [revealed, setRevealed] = useState(reduced);
  const [loaderDone, setLoaderDone] = useState(reduced);

  // Smooth scroll on the GSAP ticker so ScrollTrigger and Lenis share one frame.
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // Lock scroll under the preloader; re-measure triggers once fonts and layout settle.
  useEffect(() => {
    document.body.dataset.loading = String(!loaderDone);
    if (loaderDone) ScrollTrigger.refresh();
  }, [loaderDone]);

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-glow px-5 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      {!loaderDone && (
        <Preloader onReveal={() => setRevealed(true)} onDone={() => setLoaderDone(true)} />
      )}
      <Cursor />
      <Nav />

      <main id="main" inert={!loaderDone}>
        <Hero ready={revealed} />
        <Intro />
        <Suites />
        <Experiences />
        <Dining />
        <Voices />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
