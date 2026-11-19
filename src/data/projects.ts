import voxasignArt from "@/assets/voxasign-artwork.webp";
import pydanticeArt from "@/assets/pydantice-artwork.webp";
import pulseArt from "@/assets/pulse-vision-artwork.webp";
import sentinel from "@/assets/sentinel-screenshot.jpg";
import neuralflexSite from "@/assets/neuralflex-website.jpg";
import monalSite from "@/assets/monal-london-website.jpg";

export type ProjectLink = { label: string; href: string };
export type Project = {
  number: string;
  title: string;
  category: string;
  /** One sentence; only verified functionality. */
  description: string;
  stack: string[];
  /** First link is the primary action. Only verified URLs. */
  links: ProjectLink[];
  /** Real screenshot only; omitted projects show a typographic panel. */
  image?: string;
  /** True for conceptual artwork (centred crop), false/absent for real screenshots. */
  artwork?: boolean;
  /** Show the whole image (wide compositions) instead of cropping to fill. */
  contain?: boolean;
  /** Tailwind background class for the colour panel (design token). */
  panel: string;
};

const GH = "https://github.com/Atiqumer";

/** All projects, in the user's chosen order. The first four are featured on the homepage. */
export const allProjects: Project[] = [
  {
    number: "01", title: "VoxaSign", category: "AI / Computer Vision",
    description: "Recognises ASL and PSL signs from the camera and speaks them, on the device.",
    stack: ["JavaScript", "TensorFlow.js", "MediaPipe"],
    links: [{ label: "Live Demo", href: "https://voxasign.netlify.app/" }, { label: "View Code", href: `${GH}/VoxaSign` }],
    image: voxasignArt, artwork: true, panel: "bg-proj-plum",
  },
  {
    number: "02", title: "Pydantice", category: "Python / AI Agent",
    description: "Pydantic data validation plus a Pydantic AI agent that posts updates to Slack.",
    stack: ["Python", "Pydantic", "Pydantic AI", "Slack API"],
    links: [{ label: "View Code", href: `${GH}/pydantic-validation-and-ai-agent` }],
    image: pydanticeArt, artwork: true, contain: true, panel: "bg-proj-teal",
  },
  {
    number: "03", title: "Pulse Vision", category: "AI / Computer Vision · In progress",
    description: "Browser face tracking and webcam quality checks for contactless pulse research — not a medical device.",
    stack: ["TypeScript", "Next.js", "MediaPipe"],
    links: [{ label: "View Code", href: `${GH}/PulseVision` }],
    image: pulseArt, artwork: true, panel: "bg-proj-blue",
  },
  {
    number: "04", title: "NeuralFlex Website", category: "Company Website",
    description: "WordPress website I build and maintain for NeuralFlex, a vision-AI startup.",
    stack: ["WordPress"],
    links: [{ label: "Live Website", href: "https://neuralflex.io/" }],
    image: neuralflexSite, panel: "bg-proj-amber",
  },
  {
    number: "05", title: "Monal London Website", category: "Business Website",
    description: "WordPress website for Monal, a London restaurant — I contributed to its development.",
    stack: ["WordPress"],
    links: [{ label: "Live Website", href: "https://monallondon.com/" }],
    image: monalSite, panel: "bg-proj-pink",
  },
  {
    number: "06", title: "Django Query Sentinel", category: "Open Source / Developer Tool",
    description: "PyPI package that flags slow, repeated and N+1 queries during development.",
    stack: ["Python", "Django"],
    links: [{ label: "View on PyPI", href: "https://pypi.org/project/django-query-sentinel/" }, { label: "View Code", href: `${GH}/django-querywatch` }],
    image: sentinel, panel: "bg-proj-blue",
  },
  {
    number: "07", title: "AI Virtual Mouse", category: "Computer Vision",
    description: "Webcam hand tracking turns gestures into cursor moves and clicks.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    links: [{ label: "View Code", href: `${GH}/AI-Virtual-Mouse` }],
    panel: "bg-proj-teal",
  },
  {
    number: "08", title: "Personal AI Voice Assistant", category: "AI / Voice",
    description: "Speak to an AI assistant — a web app (Nexa Web) and a desktop version.",
    stack: ["Python", "Streamlit", "OpenRouter", "gTTS"],
    links: [{ label: "Live App", href: "https://nexa-web.streamlit.app/" }, { label: "Web Code", href: `${GH}/nexa-web` }, { label: "Desktop Code", href: `${GH}/ai-voice-assistant` }],
    panel: "bg-proj-plum",
  },
  {
    number: "09", title: "NeuralHire", category: "Full-Stack Development",
    description: "Recruitment platform with role-based JWT sign-in.",
    stack: ["React", "Django", "JWT"],
    links: [{ label: "GitHub Profile", href: GH }],
    panel: "bg-proj-amber",
  },
  {
    number: "10", title: "Employee Project", category: "Business Web App",
    description: "Employees, salaries and expenses with role-based access.",
    stack: ["Django", "PostgreSQL", "HTMX"],
    links: [{ label: "GitHub Profile", href: GH }],
    panel: "bg-proj-sage",
  },
];

export const featuredProjects = allProjects.slice(0, 4);
