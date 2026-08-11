export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// Intentionally empty: LinkedIn (the source requested for certifications) returns
// an authentication wall to every automated fetch, and no certification data
// could be verified from the resume or GitHub. Add verified entries here —
// the Certifications section renders automatically once this array is non-empty.
export const certifications: Certification[] = [];
