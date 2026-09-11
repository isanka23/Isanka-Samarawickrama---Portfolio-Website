/**
 * Generates a placeholder turnaround sequence so the hero scrub is testable
 * before real photos exist. Delete this script (and public/hero/*.svg) once
 * the real WebP frames are dropped in.
 *
 *   node scripts/gen-placeholder-frames.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const FRAMES = 48;
const W = 1200;
const H = 1600;
const OUT = new URL("../public/hero/", import.meta.url);

mkdirSync(OUT, { recursive: true });

for (let i = 0; i < FRAMES; i++) {
  const t = i / (FRAMES - 1);          // 0 → 1 across the turnaround
  const angle = t * Math.PI * 2;        // full rotation
  const face = Math.cos(angle);         // 1 = front, -1 = back
  const side = Math.sin(angle);

  // Head narrows as it turns away from camera, mimicking a real turnaround.
  const headW = 150 + 70 * Math.abs(face);
  const cx = W / 2 + side * 26;
  const lit = 0.5 + 0.5 * face;         // front-lit vs rim-lit

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="34%" r="62%">
      <stop offset="0%" stop-color="#f6f4ef" stop-opacity="${(0.34 + 0.3 * lit).toFixed(3)}"/>
      <stop offset="55%" stop-color="#6d5ce7" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#08080a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e9e6df" stop-opacity="${(0.72 + 0.2 * lit).toFixed(3)}"/>
      <stop offset="100%" stop-color="#8d8a84" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0b0b0f"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- shoulders / torso -->
  <path d="M ${cx - 300} ${H}
           C ${cx - 280} ${H - 430}, ${cx - 170} ${H - 530}, ${cx} ${H - 530}
           C ${cx + 170} ${H - 530}, ${cx + 280} ${H - 430}, ${cx + 300} ${H}
           Z" fill="url(#body)"/>

  <!-- neck -->
  <rect x="${cx - 44}" y="${H - 640}" width="88" height="140" rx="38"
        fill="#cfcac1" opacity="${(0.5 + 0.3 * lit).toFixed(3)}"/>

  <!-- head -->
  <ellipse cx="${cx}" cy="${H - 760}" rx="${headW}" ry="196"
           fill="#d8d3c9" opacity="${(0.6 + 0.33 * lit).toFixed(3)}"/>

  <!-- hair bun -->
  <circle cx="${cx - side * 42}" cy="${H - 936}" r="62"
          fill="#2e2a26" opacity="0.88"/>

  <!-- rim light, strongest in profile -->
  <ellipse cx="${cx + side * headW * 0.72}" cy="${H - 760}"
           rx="${18 + 14 * Math.abs(side)}" ry="184"
           fill="#ffffff" opacity="${(0.1 + 0.3 * Math.abs(side)).toFixed(3)}"/>

  <text x="${W / 2}" y="112" text-anchor="middle"
        font-family="monospace" font-size="34" fill="#6d5ce7" opacity="0.62">
    PLACEHOLDER FRAME ${String(i).padStart(3, "0")} / ${FRAMES}
  </text>
  <text x="${W / 2}" y="160" text-anchor="middle"
        font-family="monospace" font-size="22" fill="#8b8b99" opacity="0.5">
    ${(t * 360).toFixed(0)}° — replace with real turnaround
  </text>
</svg>`;

  writeFileSync(new URL(`frame_${String(i).padStart(3, "0")}.svg`, OUT), svg);
}

console.log(`Wrote ${FRAMES} placeholder frames to public/hero/`);
