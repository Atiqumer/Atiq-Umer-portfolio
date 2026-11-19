import { experience } from "@/data/services";
import { MaskLine, Reveal } from "./Reveal";

export function Experience() {
  return (
    <section data-nav="about" className="bg-paper px-[6cqw] py-[12cqw] text-ink @2xl:px-[3.5cqw] @2xl:py-[5cqw]">
      <div className="flex flex-col gap-[2cqw] @2xl:flex-row @2xl:items-end @2xl:justify-between">
        <div>
          <p className="t-meta text-muted-foreground">Experience</p>
          <h2 className="t-h2 mt-[2cqw] @2xl:mt-[0.8cqw]"><MaskLine>Where I've worked.</MaskLine></h2>
        </div>
      </div>
      <ol className="mt-[6cqw] border-b border-ink/15 @2xl:mt-[2.5cqw]">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.06} y={14}>
            <li className="group grid gap-[1.5cqw] border-t border-ink/15 py-[5cqw] @2xl:grid-cols-[1fr_1.6fr] @2xl:gap-x-[3cqw] @2xl:py-[1.8cqw]">
              <div>
                <h3 className="t-h3 transition-transform duration-300 group-hover:translate-x-1">{e.company}</h3>
                <p className="t-body mt-[1cqw] font-medium @2xl:mt-[0.4cqw]">{e.role}</p>
                <p className="t-meta mt-[1cqw] text-muted-foreground @2xl:mt-[0.4cqw]">{e.period} · {e.kind}</p>
              </div>
              <div>
                <p className="t-body text-muted-foreground transition-colors group-hover:text-ink">{e.summary}</p>
                <p className="t-meta mt-[1.5cqw] text-muted-foreground @2xl:mt-[0.6cqw]">{e.tech.join(" · ")}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
