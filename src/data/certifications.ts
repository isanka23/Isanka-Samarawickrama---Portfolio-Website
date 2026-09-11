/** DUMMY DATA — certification grid. */
export type Certification = {
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    year: "2025",
    credentialId: "AWS-SAA-████-4471",
  },
  {
    name: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    year: "2024",
    credentialId: "GCP-PMLE-████-8820",
  },
  {
    name: "Certified Kubernetes Application Developer",
    issuer: "Cloud Native Computing Foundation",
    year: "2024",
    credentialId: "CKAD-████-1193",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2023",
    credentialId: "DLAI-████-6607",
  },
];
