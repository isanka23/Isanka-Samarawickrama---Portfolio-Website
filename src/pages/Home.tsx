import { useCallback, useEffect, useState } from "react";

import { BootLoader } from "@/components/BootLoader";
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

/**
 * The boot sequence is a first-impression, not a loading spinner — coming back
 * from the CV page should drop straight into the site. Module scope, so it
 * survives Home unmounting and remounting across routes.
 */
let booted = false;

export function Home() {
  const [ready, setReady] = useState(booted);
  const [revealed, setRevealed] = useState(booted);

  const onReveal = useCallback(() => {
    booted = true;
    setRevealed(true);
  }, []);

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
    if (booted) return;

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

  return (
    <>
      {!booted && <BootLoader progress={progress} onReveal={onReveal} />}
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
