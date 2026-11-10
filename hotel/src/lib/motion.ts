import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Media query used with gsap.matchMedia so reduced-motion users get static content. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Wide, fine-pointer layouts get the heavier effects (pinning, cursor-follow). */
export const DESKTOP = "(min-width: 900px)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export const EASE = "expo.out";

export { gsap, ScrollTrigger };
