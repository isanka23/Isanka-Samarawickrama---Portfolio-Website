/**
 * ⚠️ Nothing here is verified — GitHub exposes no credentials.
 *
 * Add only certifications you actually hold, or remove the section entirely
 * by deleting <Certifications /> from src/App.tsx. An early-career portfolio
 * reads better with no certifications section than with an empty one.
 */
export type Certification = {
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
};

export const certifications: Certification[] = [];
