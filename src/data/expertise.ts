/** DUMMY DATA — the four "// ROOT 0n" capability cards. */
export type Expertise = {
  id: string;
  title: string;
  blurb: string;
  tag: string;
};

export const expertise: Expertise[] = [
  {
    id: "root-01",
    title: "Frontend Development",
    blurb: "Architecting responsive, high-performance UI components.",
    tag: "React & Tailwind",
  },
  {
    id: "root-02",
    title: "Backend Development",
    blurb: "Building robust REST APIs and secure data pipelines.",
    tag: "Node.js & Databases",
  },
  {
    id: "root-03",
    title: "AI & Machine Learning",
    blurb: "Integrating intelligent models into production workflows.",
    tag: "Generative AI & LLMs",
  },
  {
    id: "root-04",
    title: "Cloud & Deployment",
    blurb: "Containerized delivery with zero-downtime releases.",
    tag: "Docker & CI/CD",
  },
];
