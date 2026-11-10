# Solenne — Hotel & Spa

A standalone, animation-led hotel site. It is separate from the portfolio app in the repo root and uses the same stack: Vite, React 19, strict TypeScript, Tailwind v4, GSAP with ScrollTrigger, and Lenis.

```bash
cd hotel
npm install
npm run dev
```

## What's in it

| Section | Motion |
| --- | --- |
| Preloader | Counter to 100 that waits for the webfonts, then a curtain wipe |
| Hero | Per-letter rise, image scale-in, scroll parallax |
| Intro | Words brighten as you scroll; photo opens from an inset clip |
| Suites | Pinned horizontal scroll with in-frame parallax (desktop only; it stacks on mobile) |
| Experiences | Index list with a cursor-follow image preview (mouse only; images show inline on touch) |
| Dining | Arched frame that opens to full-bleed as you scroll |
| Press | Infinite marquee that pauses on hover |
| Reserve | Validated booking form |
| Footer | Scrubbed giant wordmark |

All motion goes through `gsap.matchMedia`, so `prefers-reduced-motion` users get static, fully visible content. Those users also skip the preloader and Lenis.

## Before launch

- **Content and branding** live in `src/data/content.ts`. "Solenne", the address and the phone number are placeholders.
- **Photos** are hot-linked from Unsplash as placeholders. Replace them with the property's own photography and self-host them. If an image fails to load, its frame falls back to a tonal colour.
- **Booking**: set `VITE_BOOKING_ENDPOINT` to a URL that accepts a JSON `BookingRequest` (see `src/lib/booking.ts`). If it is unset, the form tells guests to call or email instead of pretending it sent the request.
