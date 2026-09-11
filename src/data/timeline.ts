/** DUMMY DATA — the "// ENGINEERING ROADMAP" timeline. */
export type Milestone = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export const timeline: Milestone[] = [
  {
    period: "2025 — Present",
    role: "Senior Full-Stack Engineer",
    org: "Northwind Labs",
    detail:
      "Leading a four-person platform team. Cut p95 API latency 62% by moving hot paths to an event-driven read model.",
  },
  {
    period: "2023 — 2025",
    role: "Full-Stack Engineer",
    org: "Meridian Systems",
    detail:
      "Built the multi-tenant billing core serving 40k organizations. Owned the migration from monolith to service boundaries.",
  },
  {
    period: "2022 — 2023",
    role: "ML Engineer, Contract",
    org: "Cobalt AI",
    detail:
      "Shipped a document-extraction pipeline processing 2M pages/month at 97.4% field accuracy.",
  },
  {
    period: "2021 — 2022",
    role: "Frontend Developer",
    org: "Studio Kestrel",
    detail:
      "Delivered twelve client marketing sites. Established the shared component library still in use today.",
  },
];
