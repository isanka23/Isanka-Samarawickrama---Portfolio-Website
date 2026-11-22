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
  updated: "November 2026",
  headline: "Full-Stack Software Engineer — Flutter / React / NestJS",
  summary:
    "Full-stack engineer at Azbow since May 2025, after a one-year Flutter internship there. Builds Flutter apps, React/Next.js web apps and NestJS/PostgreSQL backends, and integrates AI into production apps. Rising Star Award winner, with final-year research in transformer-based computer vision.",
  phone: "+94 71 952 3132",
} as const;

export type CvSkillGroup = { group: string; items: string[] };

export const cvSkills: CvSkillGroup[] = [
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  {
    group: "Backend & Data",
    items: ["Node.js", "NestJS", "REST APIs", "PostgreSQL", "Prisma", "Firebase"],
  },
  {
    group: "Mobile",
    items: [
      "Flutter",
      "Dart",
      "Bloc",
      "Riverpod",
      "Provider",
      "Go Router",
      "Hive",
      "SharedPreferences",
    ],
  },
  {
    group: "AI & ML",
    items: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Chatbot Integration",
      "Prompt Engineering",
    ],
  },
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
    title: "BEng (Hons) Software Engineering with Industrial Placement",
    org: "University of Westminster (Informatics Institute of Technology, Sri Lanka) · Upper Second Class Honours",
    points: [
      "Final-year project: AquaClean — Underwater Waste Detection (PyTorch, Hugging Face).",
      "Two-stage pipeline: an attention-based GAN (CBAM) restores low-light, turbid images, then a fine-tuned DETR transformer (ResNet-50) detects waste.",
      "Reached mAP50 of 0.726 on Trash-ICRA19; wrote a Pascal VOC to COCO annotation converter.",
      "CustomTkinter desktop GUI with background-thread inference to keep the UI responsive.",
    ],
  },
];

export const cvAwards: CvEntry[] = [
  {
    period: "2026",
    title: "Rising Star Award",
    org: "Azbow (Pvt) Ltd",
    points: ["For strong contributions soon after joining."],
  },
];

export const cvExperience: CvEntry[] = [
  {
    period: "May 2025 — Present",
    title: "Junior Software Engineer — Full Stack",
    org: "Azbow (Pvt) Ltd",
    points: [
      "Build client products end to end across Flutter, React/Next.js and Node.js/NestJS with PostgreSQL and Prisma, including REST APIs, auth, deployment and hosting.",
      "Built an AI chatbot and integrated AI features into production apps.",
      "Release and maintain apps on Google Play and the App Store, shipping updates and bug fixes.",
    ],
  },
  {
    period: "May 2024 — May 2025",
    title: "Software Engineer Intern — Mobile",
    org: "Azbow (Pvt) Ltd",
    points: [
      "One-year industrial placement: developed, tested and released cross-platform Flutter/Dart apps on both stores, and maintained them after launch.",
    ],
  },
];

export type CvProject = {
  title: string;
  /** The project type and stack, shown under the title. */
  role: string;
  points: string[];
  links?: { label: string; href: string }[];
};

/** Azbow client projects. */
export const cvProjects: CvProject[] = [
  {
    title: "Mosam Sujeewa Prasannaarachchi",
    role: "Novel Reading App · Flutter",
    points: [
      "Reading app for novels by Sri Lankan author Sujeewa Prasannaarachchi, with auth, API integration and payments.",
      "Owned development, testing, store release and maintenance.",
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
    title: "Bhawana",
    role: "Magazine Reading App · Flutter",
    points: [
      "Digital magazine reading app with auth, API integration and payments, released on Google Play and the App Store.",
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
    title: "Classmate",
    role: "Web App & Admin Dashboard · React, TypeScript",
    points: [
      "Built the web app and admin dashboard for a UAE-based platform with full Arabic (RTL) support.",
    ],
  },
  {
    title: "Creative Scheduler",
    role: "Backend · NestJS",
    points: [
      "NestJS backend for creative teams covering scheduling, task assignment and workload tracking.",
      "REST APIs with authentication and role-based access for managers and team members.",
    ],
  },
];
