/**
 * Based on public details from github.com/isanka23 (@azbow, Colombo,
 * BEng (Hons) Software Engineering graduate).
 */
export type Milestone = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export const timeline: Milestone[] = [
  {
    period: "2026",
    role: "BEng (Hons) in Software Engineering with Industrial Placement",
    org: "University of Westminster",
    detail:
      "Graduated with Upper Second Class Honours. Final year project: AquaClean, an underwater waste detection system using computer vision.",
  },
  {
    period: "May 2025 — Present",
    role: "Junior Software Engineer",
    org: "Azbow (pvt) Ltd · Hybrid, Colombo",
    detail:
      "Full stack developer building across backend, web frontend, and Flutter mobile. Replace this with the systems you own and the problems you solved.",
  },
  {
    period: "May 2024 — May 2025",
    role: "Software Engineer Intern",
    org: "Azbow (pvt) Ltd",
    detail:
      "One-year internship building full stack features across backend, web, and mobile — the foundation for the full-time role that followed.",
  },
];
