import { Link } from "@tanstack/react-router";
import { featuredProjects } from "@/data/projects";
import { GITHUB } from "@/data/services";
import { ProjectCard } from "./ProjectCard";
import { MaskLine, Reveal } from "./Reveal";

export function SelectedWork({ height }: { height: number }) {
  return (
    <section data-section="work" className="bg-screen-dark">
      <div className="flex flex-col gap-[4cqw] px-[6cqw] pb-[6cqw] pt-[12cqw] @2xl:flex-row @2xl:items-end @2xl:justify-between @2xl:px-[3cqw] @2xl:pb-[2.5cqw] @2xl:pt-[5cqw]">
        <div>
          <p className="t-meta text-paper/70">Featured projects</p>
          <h2 className="t-h2 mt-[2cqw] text-paper @2xl:mt-[0.8cqw]"><MaskLine>Selected work</MaskLine></h2>
          <Reveal delay={0.08}><p className="t-body mt-[3cqw] max-w-[48ch] text-paper/75 @2xl:mt-[1cqw]">AI, Python and real websites.</p></Reveal>
        </div>
        <Reveal y={8}>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="All repositories on GitHub (opens in a new tab)" className="inline-block shrink-0 rounded-full bg-paper/10 px-[4cqw] py-[2.4cqw] t-body text-paper transition-colors hover:bg-paper/20 @2xl:mb-[1cqw] @2xl:px-[1.4cqw] @2xl:py-[0.8cqw]">All repositories ↗</a>
        </Reveal>
      </div>
      {featuredProjects.map((p) => <ProjectCard key={p.number} project={p} height={height} />)}
      <div className="flex justify-center px-[6cqw] py-[10cqw] @2xl:py-[4cqw]">
        <Reveal y={10}>
          <Link to="/projects" className="t-meta inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/30 px-[6cqw] py-[3cqw] text-paper transition-colors hover:bg-paper hover:text-ink @2xl:px-[2cqw] @2xl:py-[1cqw]">
            View all projects <span aria-hidden>↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
