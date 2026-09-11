import type { MouseEvent } from "react";

/**
 * Writes pointer position as --x/--y on the target element. Paired with the
 * `.spotlight` utility, which reads those vars to paint a radial glow that
 * tracks the cursor — no re-renders, just CSS custom properties.
 */
export function handleSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}
