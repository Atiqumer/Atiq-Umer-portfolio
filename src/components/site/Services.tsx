import { services, type NavId } from "@/data/services";
import { MaskLine, Reveal } from "./Reveal";
import { setPendingProjectType } from "./call-interaction";

export function Services({ onNav }: { onNav: (id: NavId) => void }) {
  const discuss = (type: string) => { setPendingProjectType(type); onNav("contact"); };
  return (
    <section data-nav="work" className="bg-paper px-[6cqw] py-[14cqw] text-ink @2xl:px-[3.5cqw] @2xl:py-[6cqw]">
      <p className="t-meta text-muted-foreground">Services</p>
      <div className="mt-[3cqw] flex flex-col gap-[3cqw] @2xl:mt-[1cqw] @2xl:flex-row @2xl:items-end @2xl:justify-between">
        <h2 className="t-h2"><MaskLine>What can I</MaskLine><MaskLine delay={0.06}>build for you?</MaskLine></h2>
        <Reveal delay={0.1}><p className="t-body max-w-[40ch] text-muted-foreground">Practical software for real business needs.</p></Reveal>
      </div>
      <div className="mt-[8cqw] border-b border-ink/15 @2xl:mt-[3cqw]">
        {services.map((s, i) => (
          <Reveal key={s.number} delay={i * 0.06} y={16}>
            <div className="group grid gap-[3cqw] border-t border-ink/15 px-[2cqw] py-[6cqw] transition-colors duration-300 hover:bg-secondary/60 @2xl:grid-cols-[7cqw_1.1fr_1fr] @2xl:gap-x-[2cqw] @2xl:px-[1cqw] @2xl:py-[2.4cqw]">
              <span className="font-display text-[clamp(2.5rem,14cqw,3.5rem)] leading-none text-muted-foreground transition-colors duration-300 group-hover:text-ink @2xl:text-[clamp(3rem,4.5cqw,4.5rem)]">{s.number}</span>
              <div>
                <h3 className="t-h3">{s.title}</h3>
                <p className="t-body mt-[2cqw] max-w-[44ch] text-muted-foreground @2xl:mt-[0.6cqw]">{s.description}</p>
                <button type="button" aria-label={`Discuss ${s.title}`} onClick={() => discuss(s.projectType)} className="t-meta mt-[3cqw] inline-flex min-h-11 items-center gap-1 text-ink underline-offset-4 hover:underline @2xl:mt-[1cqw]">
                  Discuss this service <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </button>
              </div>
              <ul className="t-body @2xl:pt-[0.3cqw]">
                {s.examples.map((e) => <li key={e} className="flex gap-[2cqw] @2xl:gap-[0.6cqw]"><span aria-hidden className="text-muted-foreground">→</span>{e}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
