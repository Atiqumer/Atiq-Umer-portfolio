import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { MaskLine, Reveal } from "./Reveal";
import { useScreenReveal } from "./screen-context";

const newTab = (label: string, title: string) => `${label} for ${title} (opens in a new tab)`;

export function ProjectCard({ project, height }: { project: Project; height: number }) {
  const [ref, shown] = useScreenReveal<HTMLAnchorElement>(1);
  const [primary, ...rest] = project.links;
  return (
    <article className="group grid @2xl:grid-cols-2" style={{ minHeight: height }}>
      {/* Image is a mouse/touch shortcut to the primary action; the button below is the single keyboard stop. */}
      <a ref={ref} href={primary?.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className={`relative block overflow-hidden ${project.contain ? "bg-art-ink" : "bg-ink"}`} style={{ minHeight: height * 0.62 }}>
        {project.image ? <motion.img
          src={project.image}
          alt=""
          width={1024}
          height={768}
          loading="lazy"
          className={`absolute inset-0 ${project.contain ? "m-auto h-auto max-h-full w-full object-contain [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" : "h-full w-full object-cover"} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] ${project.artwork ? "object-center" : "object-left-top"}`}
          initial={{ scale: 1.15 }}
          animate={{ scale: shown ? 1 : 1.15 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        /> : (
          <div className="absolute inset-0 flex items-end p-[6cqw] @2xl:p-[3cqw]">
            <span className="font-display text-[16cqw] uppercase leading-[0.85] text-paper/15 @2xl:text-[6cqw]">{project.title}</span>
          </div>
        )}
      </a>
      <div className={`flex flex-col px-[6cqw] pb-[10cqw] pt-[6cqw] text-paper @2xl:px-[3.5cqw] @2xl:pb-[3.5cqw] @2xl:pt-[3cqw] ${project.panel}`}>
        <div className="font-display text-[24cqw] leading-[0.8] @2xl:text-[9cqw]"><MaskLine>{project.number}</MaskLine></div>
        <div className="mt-auto pt-[8cqw] @2xl:pt-[3cqw]">
          <Reveal y={10}><p className="t-meta opacity-80">{project.category}</p></Reveal>
          <h3 className="t-h2 mt-[1.5cqw] @2xl:mt-[0.5cqw]"><MaskLine delay={0.05}>{project.title}</MaskLine></h3>
          <Reveal delay={0.12} y={10}>
            <p className="t-lead mt-[3cqw] max-w-[44ch] @2xl:mt-[1cqw]">{project.description}</p>
            <ul className="t-meta mt-[4cqw] flex flex-wrap gap-x-[3cqw] gap-y-[1cqw] opacity-75 @2xl:mt-[1.4cqw] @2xl:gap-x-[1cqw]" aria-label="Technologies">
              {project.stack.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {primary && (
              <div className="t-meta mt-[5cqw] flex flex-wrap items-center gap-[4cqw] @2xl:mt-[1.6cqw] @2xl:gap-[1.4cqw]">
                <a href={primary.href} target="_blank" rel="noopener noreferrer" aria-label={newTab(primary.label, project.title)} className="group/btn inline-flex min-h-11 items-center gap-1 rounded-full bg-paper px-[4.5cqw] text-ink transition-transform hover:-translate-y-0.5 @2xl:min-h-0 @2xl:px-[1.2cqw] @2xl:py-[0.6cqw]">
                  {primary.label} <span aria-hidden className="inline-block transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">↗</span>
                </a>
                {rest.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={newTab(l.label, project.title)} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline @2xl:min-h-0">{l.label} ↗</a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  );
}
