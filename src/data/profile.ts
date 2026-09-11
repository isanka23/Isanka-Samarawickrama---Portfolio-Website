/**
 * DUMMY DATA — replace every value here with the real profile.
 * Nothing else in the app hardcodes personal details.
 */
export const profile = {
  firstName: "Isanka",
  lastName: "Samarawickrama",
  fullName: "Isanka Samarawickrama",
  legalName: "Isanka Samarawickrama",
  role: "Full-Stack AI & ML Engineer",
  tagline: "Turning ideas into reality",
  email: "hello@example.com",
  region: "Remote / Worldwide",
  status: "Open to Opportunities",
  year: 2026,

  bio: "A passionate Full-Stack Developer dedicated to crafting clean, functional, and highly scalable web applications. Specializing in high-performance architectures, intuitive user experiences, and robust backend pipelines.",

  socials: [
    { label: "GitHub", href: "https://github.com/example" },
    { label: "LinkedIn", href: "https://linkedin.com/in/example" },
    { label: "Instagram", href: "https://instagram.com/example" },
  ],
} as const;

/**
 * Hero headline phases. Scroll progress is split evenly across these,
 * so each phase owns a slice of the portrait turnaround.
 */
export const heroPhases = [
  {
    headline: ["Creative", "Developer"],
    label: "// Turning ideas into reality",
    caption:
      "Available for hire. Building fast, responsive web applications using modern tech stacks.",
  },
  {
    headline: ["Scalable", "Systems"],
    label: "// Robust backend architecture",
    caption:
      "Architecting robust backend pipelines, cloud microservices, and database optimization.",
  },
  {
    headline: ["Intelligent", "Interfaces"],
    label: "// Applied machine learning",
    caption:
      "Shipping production ML — retrieval pipelines, LLM tooling, and computer vision at scale.",
  },
] as const;
