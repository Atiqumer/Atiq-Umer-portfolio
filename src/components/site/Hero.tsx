import { MaskLine, Reveal } from "./Reveal";
import { Portrait } from "./Portrait";
import { GITHUB, LINKEDIN, type NavId } from "@/data/services";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export function Hero({ onNav, height }: { onNav: (id: NavId) => void; height: number }) {
  return (
    <section data-section="home" className="flex flex-col bg-paper @2xl:grid @2xl:grid-cols-2" style={{ minHeight: height }}>
      <div className="relative order-first min-h-[62cqw] flex-1 overflow-hidden @2xl:hidden"><Portrait /></div>
      <div className="flex flex-col px-[6cqw] pb-[calc(80px+env(safe-area-inset-bottom))] pt-[4.5cqw] @2xl:px-[3.5cqw] @2xl:pb-[7cqw] @2xl:pt-[8cqw]">
        <Reveal y={8}>
          <p className="t-meta text-ink">Atiq Umer — AI/ML &amp; Full-Stack Developer</p>
          <p className="mt-[1cqw] -ml-2.5 flex text-muted-foreground @2xl:mt-[0.3cqw]">
            <a href={GITHUB} aria-label="GitHub (opens in a new tab)" title="GitHub" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full transition-colors hover:text-ink"><GithubIcon className="size-[18px] transition-transform duration-300 hover:-translate-y-0.5" /></a>
            <a href={LINKEDIN} aria-label="LinkedIn (opens in a new tab)" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full transition-colors hover:text-ink"><LinkedinIcon className="size-[18px] transition-transform duration-300 hover:-translate-y-0.5" /></a>
          </p>
        </Reveal>
        <div className="mt-[4cqw] @2xl:mt-auto">
          <h1 className="t-hero text-ink">
            <MaskLine>I build</MaskLine><MaskLine delay={0.06}>intelligent</MaskLine><MaskLine delay={0.12}>digital products.</MaskLine>
          </h1>
          <Reveal delay={0.2}>
            <p className="t-lead mt-[3cqw] max-w-[34ch] text-muted-foreground @2xl:mt-[1.6cqw]">
              AI apps, Python backends and modern web products.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-[4cqw] flex flex-wrap items-center gap-[2cqw] @2xl:mt-[2cqw] @2xl:gap-[0.8cqw]">
            <button onClick={() => onNav("contact")} className="t-body rounded-full bg-ink px-[5.5cqw] py-[2.6cqw] font-medium text-paper transition-transform hover:-translate-y-0.5 @2xl:px-[1.8cqw] @2xl:py-[0.9cqw]">
              Let's Work Together ↗
            </button>
            <button onClick={() => onNav("work")} className="t-body rounded-full bg-secondary px-[5cqw] py-[2.6cqw] font-medium text-ink transition-colors hover:bg-border @2xl:px-[1.6cqw] @2xl:py-[0.9cqw]">
              Explore My Work ↗
            </button>
          </Reveal>
        </div>
      </div>
      <div className="relative hidden overflow-hidden @2xl:block"><Portrait position="object-[22%_center] scale-[1.32] origin-[26%_58%]" /></div>
    </section>
  );
}
