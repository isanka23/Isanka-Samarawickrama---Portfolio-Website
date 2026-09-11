/** DUMMY DATA — horizontal carousel cards. */
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
    title: "Neural Search Engine",
    category: "AI / Retrieval",
    blurb:
      "Hybrid vector and keyword search over 8M documents, returning ranked results in under 120ms.",
    tech: ["Python", "FastAPI", "pgvector", "React"],
    code: "https://github.com/example",
  },
  {
    index: "02",
    title: "Payment Gateway System",
    category: "Fintech & Security",
    blurb:
      "Developed a full-stack payment processing simulator with idempotent transaction handling and audit trails.",
    tech: ["Node.js", "PostgreSQL", "Stripe", "Redis"],
    code: "https://github.com/example",
  },
  {
    index: "03",
    title: "Multi-Tenant SaaS Platform",
    category: "Cloud Architecture",
    blurb:
      "Architected a containerized multi-tenant SaaS platform enforcing strict tenant data isolation and secure schema routing.",
    tech: ["Node.js", "MongoDB", "Docker", "Express"],
    code: "https://github.com/example",
  },
  {
    index: "04",
    title: "Productivity Suite Extension",
    category: "Browser Automation",
    blurb:
      "Developed a browser extension leveraging Chrome APIs to automate repetitive workflows and boost daily efficiency.",
    tech: ["JavaScript", "Chrome APIs", "Tailwind CSS"],
    code: "https://github.com/example",
  },
  {
    index: "05",
    title: "Realtime Collab Canvas",
    category: "Distributed Systems",
    blurb:
      "CRDT-backed whiteboard supporting 200 concurrent editors per room with offline reconciliation.",
    tech: ["TypeScript", "WebSocket", "Yjs", "Canvas"],
    code: "https://github.com/example",
  },
  {
    index: "06",
    title: "Vision QC Pipeline",
    category: "Computer Vision",
    blurb:
      "On-device defect detection for a manufacturing line, cutting manual inspection load by 78%.",
    tech: ["PyTorch", "ONNX", "OpenCV", "Rust"],
    code: "https://github.com/example",
  },
];
