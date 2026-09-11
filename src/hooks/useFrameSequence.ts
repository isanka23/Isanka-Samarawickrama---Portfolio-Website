import { useEffect, useRef, useState } from "react";

/** Frames live in public/hero/. Swap extension when real WebPs land. */
export const HERO_FRAME_COUNT = 48;

export const heroFrameSrc = (i: number) =>
  `/hero/frame_${String(i).padStart(3, "0")}.svg`;

type SequenceState = {
  images: HTMLImageElement[];
  loaded: number;
  ready: boolean;
};

/**
 * Preloads the whole turnaround up front. The boot loader is gated on this,
 * so the scrub never stutters on a cold frame.
 */
export function useFrameSequence(count = HERO_FRAME_COUNT): SequenceState {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let settled = 0;

    const images = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      const bump = () => {
        if (cancelled) return;
        settled += 1;
        setLoaded(settled);
      };
      img.onload = bump;
      img.onerror = bump; // a missing frame must not wedge the loader
      img.src = heroFrameSrc(i);
      return img;
    });

    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [count]);

  return {
    images: imagesRef.current,
    loaded,
    ready: loaded >= count,
  };
}
