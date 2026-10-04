import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CursorGlow } from "@/components/CursorGlow";
import { Home } from "@/pages/Home";
import { Resume } from "@/pages/Resume";
import { useRoute } from "@/lib/router";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function App() {
  const reduced = useReducedMotion();
  const route = useRoute();
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll, driving ScrollTrigger off the same RAF loop.
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // A new page starts at its own top, not wherever the previous one was left.
  // Through Lenis when it is running, so its internal position stays in sync.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [route]);

  return (
    <>
      <CursorGlow />
      {route === "/cv" ? <Resume /> : <Home />}
    </>
  );
}
