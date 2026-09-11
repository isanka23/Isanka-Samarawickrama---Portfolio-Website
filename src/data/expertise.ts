/** The four "// ROOT 0n" capability cards. */
export type Expertise = {
  id: string;
  title: string;
  blurb: string;
  tag: string;
};

export const expertise: Expertise[] = [
  {
    id: "root-01",
    title: "Backend Development",
    blurb:
      "Designing REST APIs, relational schemas, and authentication flows that stay fast under load.",
    tag: "APIs & Databases",
  },
  {
    id: "root-02",
    title: "Web Frontend",
    blurb:
      "Building responsive, accessible interfaces with modern component architecture.",
    tag: "React & Tailwind",
  },
  {
    id: "root-03",
    title: "Mobile Development",
    blurb:
      "Shipping iOS and Android from one Flutter codebase, with native performance and feel.",
    tag: "Flutter & Dart",
  },
  {
    id: "root-04",
    title: "Deployment & Delivery",
    blurb:
      "Version control, CI pipelines, and release workflows to the web and app stores.",
    tag: "Git & CI/CD",
  },
];
