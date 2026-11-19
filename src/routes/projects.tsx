import { createFileRoute, Link } from "@tanstack/react-router";
import { allProjects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

const TITLE = "All Projects | Atiq Umer";
const DESC = "Ten projects by Atiq Umer: AI and computer vision apps, Python tools, voice assistants and live websites.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/projects") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/projects") }],
  }),
  component: ProjectsPage,
});

const newTab = (label: string, title: string) => `${label} for ${title} (opens in a new tab)`;

function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-20 pt-6 text-foreground sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link to="/" className="font-display text-2xl uppercase leading-none">Atiq Umer</Link>
        <Link to="/" className="t-meta inline-flex min-h-11 items-center gap-1 rounded-full bg-secondary px-4 transition-colors hover:bg-border">
          Back to portfolio <span aria-hidden>↗</span>
        </Link>
      </header>
      <div className="mx-auto mt-14 max-w-6xl sm:mt-20">
        <p className="t-meta text-muted-foreground">Project archive</p>
        <h1 className="mt-2 font-display text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.9]">All projects</h1>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((p) => (
            <li key={p.number} className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-foreground/40 hover:bg-secondary/60">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-xs text-muted-foreground">{p.number}</span>
                <span className="font-mono text-[0.72rem] uppercase tracking-wide text-muted-foreground">{p.category}</span>
              </div>
              <h2 className="mt-6 font-display text-[2rem] uppercase leading-none">{p.title}</h2>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {p.stack.map((t) => <li key={t} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.7rem] uppercase">{t}</li>)}
              </ul>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-5">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={newTab(l.label, p.title)} className="t-meta inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline">
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
