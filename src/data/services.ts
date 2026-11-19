import heroPhoto from "@/assets/atiq-hero-profile.jpg";
import aboutPhoto from "@/assets/atiq-about-portrait.jpg";

export const EMAIL = "atiqumer15@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/atiq-umer/";
export const GITHUB = "https://github.com/Atiqumer";
/** Calendly booking page; null hides every "Book a Call" action until the real link is set. */
export const CALENDLY_URL: string | null = "https://calendly.com/atiqumer/30-minute-meeting";
export const LOCATION = "Based in Pakistan";

export const PORTRAIT_URL: string | null = heroPhoto;
export const ABOUT_PORTRAIT_URL: string = aboutPhoto;

export const services = [
  { number: "01", title: "AI & Intelligent Applications", projectType: "AI / Automation", description: "Machine learning and computer vision, built into your product.", examples: ["AI-powered web applications", "Computer vision features", "Intelligent classification", "AI integrations"] },
  { number: "02", title: "Web Apps & MVP Development", projectType: "Web App / MVP", description: "From idea to a working web app, front to back.", examples: ["Startup MVPs", "Business dashboards", "Custom web applications", "Internal management platforms"] },
  { number: "03", title: "Python Backend & APIs", projectType: "Python Backend / API", description: "APIs, databases and authentication that hold up.", examples: ["Django and Flask development", "REST APIs", "Database integrations", "Backend improvements"] },
  { number: "04", title: "Automation & Integrations", projectType: "AI / Automation", description: "Connect your tools and automate repetitive work.", examples: ["Workflow automation", "API integrations", "Data processing", "Custom Python scripts"] },
];

/** About highlights; "2+ years" means overall development experience, not full-time employment. */
export const highlights = [
  { value: "2+ Years", label: "Development experience" },
  { value: "AI + Full Stack", label: "Core development focus" },
  { value: "End-to-End", label: "From idea to implementation" },
];

/** Facts come from the resume; `kind` keeps employment, internships and training distinct. */
export const experience = [
  { company: "NeuralFlex", role: "Virtual Tech Assistant", kind: "Remote role", period: "Apr 2025 — Present", summary: "Web apps, dashboards and automated RTSP camera recording.", tech: ["Python", "Django", "Flask", "React", "FFmpeg", "AWS Secrets Manager"] },
  { company: "Samsung Innovation Campus", role: "AI Trainee", kind: "Training programme", period: "Jan 2026 — Apr 2026", summary: "AI/ML training: preprocessing, model evaluation, computer vision.", tech: ["Python", "Machine Learning", "Computer Vision"] },
  { company: "LoopLab", role: "Technical Team Member", kind: "Remote role", period: "Nov 2025 — Feb 2026", summary: "Django and React work in a small team.", tech: ["Python", "Django", "React"] },
  { company: "DI Tech Solutions", role: "Junior WordPress Developer", kind: "Internship", period: "Feb 2025 — Apr 2025", summary: "Responsive, SEO-friendly WordPress sites.", tech: ["WordPress", "Elementor", "PHP", "CSS"] },
];

export const skillGroups = [
  { title: "AI & Machine Learning", items: ["Machine Learning", "Computer Vision", "Scikit-learn", "Pandas", "NumPy", "MediaPipe", "OpenCV", "DNN"] },
  { title: "Backend Engineering", items: ["Python", "Django", "Flask", "REST APIs", "JWT", "Pydantic", "HTMX"] },
  { title: "Frontend Development", items: ["JavaScript", "React.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"] },
  { title: "Databases, Cloud & Tools", items: ["PostgreSQL", "MySQL", "IndexedDB", "AWS Secrets Manager", "Git/GitHub", "Postman", "FFmpeg", "RTSP"] },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
export type NavId = (typeof navItems)[number]["id"];

export const ENQUIRY_MAILTO = `mailto:${EMAIL}?subject=Project%20Enquiry`;
