/**
 * PLACEHOLDER PROJECTS — shaped around backend / web / mobile so the section
 * reads correctly, but these are NOT real. Replace each one with work you
 * actually shipped before publishing, and point `code` at the real repos.
 */
export type Project = {
  index: string;
  title: string;
  category: string;
  blurb: string;
  tech: string[];
  code?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Delivery Tracking App",
    category: "Mobile / Flutter",
    blurb:
      "Cross-platform Flutter app with live order tracking, push notifications, and offline-first local caching.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps"],
    code: "https://github.com/isanka23",
  },
  {
    index: "02",
    title: "Inventory Management API",
    category: "Backend / REST",
    blurb:
      "Node.js REST API with role-based access control, stock reconciliation, and audit logging across warehouses.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
    code: "https://github.com/isanka23",
  },
  {
    index: "03",
    title: "Business Dashboard",
    category: "Web Frontend",
    blurb:
      "Responsive React dashboard surfacing sales and stock metrics, with filtering and exportable reports.",
    tech: ["React", "TypeScript", "Tailwind", "Chart.js"],
    code: "https://github.com/isanka23",
  },
  {
    index: "04",
    title: "Appointment Booking Platform",
    category: "Full-Stack",
    blurb:
      "End-to-end booking system — Flutter client, Express API, and an admin web panel sharing one data layer.",
    tech: ["Flutter", "Node.js", "MongoDB", "React"],
    code: "https://github.com/isanka23",
  },
  {
    index: "05",
    title: "Expense Tracker",
    category: "Mobile / Flutter",
    blurb:
      "Offline-capable personal finance app with local persistence, category budgets, and monthly summaries.",
    tech: ["Flutter", "Dart", "SQLite", "Riverpod"],
    code: "https://github.com/isanka23",
  },
  {
    index: "06",
    title: "Auth & Identity Service",
    category: "Backend / Security",
    blurb:
      "Reusable authentication service handling registration, refresh tokens, password reset, and session revocation.",
    tech: ["Node.js", "Express", "Redis", "JWT"],
    code: "https://github.com/isanka23",
  },
];
