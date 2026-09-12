import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BootLoader } from "@/components/BootLoader";
import { CursorGlow } from "@/components/CursorGlow";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Philosophy } from "@/sections/Philosophy";
import { Expertise } from "@/sections/Expertise";
import { Pipeline } from "@/sections/Pipeline";
import { Skills } from "@/sections/Skills";
import { Timeline } from "@/sections/Timeline";
import { Projects } from "@/sections/Projects";
import { Certifications } from "@/sections/Certifications";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function App() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const onReveal = useCallback(() => setRevealed(true), []);
  const progress = ready ? 100 : 0;

  // A reload should always land on the hero: stop the browser restoring the
  // previous scroll position, and drop any #section left in the URL by the nav.
  // Runs before Lenis starts so it initialises at the top.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);
  }, []);

  // Gate the boot bar on the assets the first screen actually needs.
  useEffect(() => {
    const img = new Image();
    img.src = "/portrait.webp";
    const decoded = img.decode().catch(() => undefined);
    const fonts = document.fonts?.ready ?? Promise.resolve();

    let cancelled = false;
    Promise.all([decoded, fonts]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Smooth scroll, driving ScrollTrigger off the same RAF loop.
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <>
      <BootLoader progress={progress} onReveal={onReveal} />
      <CursorGlow />
      <Nav />
      <main aria-busy={!revealed}>
        <Hero ready={revealed} />
        <About />
        <Philosophy />
        <Expertise />
        <Pipeline />
        <Skills />
        <Timeline />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
