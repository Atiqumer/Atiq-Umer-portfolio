export const CALL_EMAIL = "atiqumer15@gmail.com";
export const PROJECT_TYPES = ["AI / Automation", "Web App / MVP", "Python Backend / API", "Something Else"] as const;

export type Enquiry = { type: string; idea: string; name?: string; email?: string };

/** Builds the mailto link for the in-phone enquiry; there is no backend, so the visitor's mail app sends it. */
export function buildEnquiryMailto({ type, idea, name, email }: Enquiry) {
  const body = [`Project type: ${type}`, "", idea.trim() || "(no description)", "", `Name: ${name?.trim() || "—"}`, `Email: ${email?.trim() || "—"}`].join("\n");
  return `mailto:${CALL_EMAIL}?subject=${encodeURIComponent(`Project Enquiry: ${type}`)}&body=${encodeURIComponent(body)}`;
}

export type EnquiryErrors = Partial<Record<"type" | "idea" | "email", string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Lightweight checks: a type, a description and a reply email in a basic valid format; name stays optional. */
export function validateEnquiry({ type, idea, email }: Enquiry, fields: ("type" | "idea" | "email")[] = ["type", "idea", "email"]): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (fields.includes("type") && !type) e.type = "Choose a project type.";
  if (fields.includes("idea") && !idea.trim()) e.idea = "Add a short description of your idea.";
  if (fields.includes("email")) {
    if (!email?.trim()) e.email = "Add your email so I can reply.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Check your email address format.";
  }
  return e;
}

/** A project type chosen elsewhere on the site (e.g. "Discuss this service"); the contact cover opens on the details step with it. */
let pendingProjectType: string | null = null;
export function setPendingProjectType(type: string) { pendingProjectType = type; }
export function takePendingProjectType() { const t = pendingProjectType; pendingProjectType = null; return t; }
