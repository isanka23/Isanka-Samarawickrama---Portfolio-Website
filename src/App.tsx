import { useEffect, useState } from "react";
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
import { useFrameSequence, HERO_FRAME_COUNT } from "@/hooks/useFrameSequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function App() {
  const { loaded } = useFrameSequence();
  const reduced = useReducedMotion();
  const [booted, setBooted] = useState(false);

  const progress = Math.round((loaded / HERO_FRAME_COUNT) * 100);

  useEffect(() => {
    if (progress >= 100) setBooted(true);
  }, [progress]);

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
      <BootLoader progress={progress} />
      <CursorGlow />
      <Nav />
      <main aria-busy={!booted}>
        <Hero />
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
