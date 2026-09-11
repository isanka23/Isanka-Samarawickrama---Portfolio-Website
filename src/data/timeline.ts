/**
 * ⚠️ PLACEHOLDER — replace with your real history before publishing.
 *
 * The previous entries invented employers and dates. Since this repo is public
 * under your real name, these are deliberately generic rather than fabricated
 * specifics: swap in actual roles, or delete entries you cannot fill.
 */
export type Milestone = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export const timeline: Milestone[] = [
  {
    period: "Present",
    role: "Full-Stack & Mobile Engineer",
    org: "Add your current role",
    detail:
      "Describe what you own end to end — the backend services, the web frontend, and the Flutter apps you ship.",
  },
  {
    period: "Add period",
    role: "Add role",
    org: "Add employer or client",
    detail:
      "One or two sentences on the problem, what you built, and a number if you have one (users, latency, release cadence).",
  },
  {
    period: "Add period",
    role: "Add role",
    org: "Add employer or client",
    detail:
      "Keep each entry concrete. Reviewers skim this section, so lead with impact rather than tooling.",
  },
];
