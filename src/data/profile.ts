/**
 * Replace the remaining placeholder values (email, socials) with real ones.
 * Nothing else in the app hardcodes personal details.
 */
export const profile = {
  firstName: "Isanka",
  lastName: "Samarawickrama",
  fullName: "Isanka Samarawickrama",
  legalName: "Isanka Samarawickrama",
  role: "Full-Stack & Mobile Engineer",
  tagline: "Backend, web, and mobile — end to end",
  email: "hello@example.com", // TODO: real address
  region: "Sri Lanka / Remote",
  status: "Open to Opportunities",
  year: 2026,

  bio: "A full-stack engineer building across the whole product surface — REST APIs and data layers on the backend, responsive interfaces on the web, and cross-platform mobile apps in Flutter. I care about shipping software that holds up: clean architecture, predictable performance, and interfaces people can actually use.",

  socials: [
    { label: "GitHub", href: "https://github.com/isanka23" },
    { label: "LinkedIn", href: "https://linkedin.com/in/example" }, // TODO
    { label: "Instagram", href: "https://instagram.com/example" }, // TODO
  ],
} as const;

/**
 * Hero headline phases — one per discipline. Scroll progress is split evenly
 * across these, so each phase owns a slice of the portrait turnaround.
 */
export const heroPhases = [
  {
    headline: ["Full-Stack", "Developer"],
    label: "// Turning ideas into reality",
    caption:
      "Available for hire. Building complete products from database schema to shipped interface.",
  },
  {
    headline: ["Scalable", "Backends"],
    label: "// Robust server architecture",
    caption:
      "Designing REST APIs, relational data models, authentication flows, and the services behind them.",
  },
  {
    headline: ["Cross-Platform", "Mobile"],
    label: "// Flutter engineering",
    caption:
      "Shipping iOS and Android from a single Flutter codebase — native feel, one team, half the maintenance.",
  },
] as const;
