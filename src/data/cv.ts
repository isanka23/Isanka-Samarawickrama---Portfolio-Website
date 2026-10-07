/**
 * The CV page's content, transcribed from the PDF in `public/` so the page is
 * real text — selectable, searchable, and indexable — rather than an embedded
 * document. Keep the two in sync: when the PDF is replaced, update the entries
 * below and `cv.updated`.
 */

export const cv = {
  /** Served from `public/`. Also the download target. */
  file: "/Isanka-Samarawickrama-CV.pdf",
  /** Suggested filename when the visitor saves it. */
  fileName: "Isanka-Samarawickrama-CV.pdf",
  updated: "October 2026",
  headline: "Junior Software Engineer — Mobile / Web / Backend",
  summary:
    "Full-stack software engineer with 2 years and 7 months of professional experience building scalable web and cross-platform mobile applications. Works mainly in TypeScript, Next.js, React, Node.js, NestJS and PostgreSQL, with hands-on Flutter and Dart experience for mobile. Builds backend services, REST APIs and responsive interfaces, and handles deployment and hosting. Actively works with AI and new technologies to build smarter, modern products.",
  phone: "+94 71 952 3132",
} as const;

export type CvSkillGroup = { group: string; items: string[] };

export const cvSkills: CvSkillGroup[] = [
  { group: "Frontend", items: ["TypeScript", "Next.js", "React", "Tailwind CSS"] },
  {
    group: "Backend & Data",
    items: ["Node.js", "NestJS", "REST APIs", "PostgreSQL", "Prisma", "Firebase"],
  },
  {
    group: "Mobile",
    items: ["Flutter", "Dart", "Provider", "Go Router", "Hive", "SharedPreferences"],
  },
  { group: "AI & ML", items: ["Python", "PyTorch", "Prompt Engineering"] },
  { group: "Tools", items: ["Git", "GitHub", "Vercel"] },
];

export type CvEntry = {
  period: string;
  title: string;
  org: string;
  points: string[];
};

export const cvEducation: CvEntry[] = [
  {
    period: "Jan 2023 — Aug 2026",
    title: "BEng (Hons) in Software Engineering with Industrial Placement",
    org: "University of Westminster",
    points: ["Graduated with Upper Second Class Honours."],
  },
];

export const cvExperience: CvEntry[] = [
  {
    period: "May 2025 — Present",
    title: "Junior Software Engineer — Full Stack",
    org: "Azbow (Pvt) Ltd",
    points: [
      "Develop full-stack applications end to end, from Flutter mobile apps and Next.js/React web interfaces to Node.js/NestJS backend services, REST APIs, and deployment.",
      "Integrate AI features into products and use AI tools to speed up development and improve code quality.",
    ],
  },
  {
    period: "May 2024 — May 2025",
    title: "Software Engineer Intern — Mobile",
    org: "Azbow (Pvt) Ltd",
    points: [
      "Completed a one-year internship during my third year of university, specializing in mobile development.",
      "Developed, tested, and released cross-platform mobile apps using Flutter and Dart, and maintained them after launch.",
    ],
  },
];

export type CvProject = {
  title: string;
  role: string;
  points: string[];
  links?: { label: string; href: string }[];
};

export const cvProjects: CvProject[] = [
  {
    title: "Mosam Sujeewa Prasannaarachchi Mobile App",
    role: "Mobile Developer",
    points: [
      "Built a cross-platform app in Flutter with authentication, API integration, payments, and state management.",
      "Handled development, testing, and release on Google Play and the App Store, plus post-launch maintenance.",
    ],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.azbow.mosamApp&pcampaignid=web_share",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/lk/app/mosam-sujeewa-prasannaarachchi/id6749929485",
      },
    ],
  },
  {
    title: "Bhawana Mobile App",
    role: "Mobile Developer",
    points: [
      "Built a cross-platform app in Flutter with authentication, API integration, payments, and state management.",
      "Published to Google Play and the App Store, and shipped ongoing updates and bug fixes.",
    ],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.azbow.bhawana&pcampaignid=web_share",
      },
      { label: "App Store", href: "https://apps.apple.com/lk/app/bhawana/id6504860966" },
    ],
  },
  {
    title: "Classmate Web App",
    role: "Front-end Web Developer",
    points: [
      "Built the web app and admin dashboard for a UAE-based platform using React and TypeScript, with full Arabic (RTL) support.",
      "Designed REST APIs with authentication and role-based access for managers and team members.",
    ],
  },
  {
    title: "Creative Scheduler Web App",
    role: "Back-end Developer",
    points: [
      "Built a NestJS backend for managing digital and creative team members, covering scheduling, task assignment, and workload tracking.",
      "Designed REST APIs with authentication and role-based access for managers and team members.",
    ],
  },
];
