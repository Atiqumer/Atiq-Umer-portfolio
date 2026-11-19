import { motion } from "framer-motion";
import { Lightbulb, MessagesSquare, Wrench } from "lucide-react";
import { ABOUT_PORTRAIT_URL, highlights } from "@/data/services";
import { MaskLine, Reveal } from "./Reveal";
import { useScreenReveal } from "./screen-context";

const principles = [
  { icon: Lightbulb, title: "Problem first" },
  { icon: MessagesSquare, title: "Clear communication" },
  { icon: Wrench, title: "Practical, maintainable builds" },
];

export function About() {
  const [ref, shown] = useScreenReveal<HTMLDivElement>();
  return (
    <section data-section="about" className="bg-screen-dark px-[6cqw] py-[12cqw] text-paper @2xl:px-[3.5cqw] @2xl:py-[4.5cqw]">
      <div className="grid gap-[7cqw] @2xl:grid-cols-[0.75fr_1fr] @2xl:items-stretch @2xl:gap-[4cqw]">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[22px] @2xl:aspect-[4/5] @2xl:self-start">
          <motion.div className="absolute inset-0" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: shown ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <motion.img src={ABOUT_PORTRAIT_URL} alt="Atiq Umer, front-facing portrait" loading="lazy" initial={{ scale: 1.12 }} animate={{ scale: shown ? 1 : 1.12 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover object-[50%_25%]" />
          </motion.div>
        </div>
        <div className="flex flex-col">
          <p className="t-meta opacity-70">About me</p>
          <h2 className="t-h2 mt-[3cqw] @2xl:mt-[1cqw]">
            <MaskLine>The developer</MaskLine><MaskLine delay={0.06}>behind the work.</MaskLine>
          </h2>
          <Reveal delay={0.1}>
            <ul aria-label="How I work" className="mt-[5cqw] flex flex-wrap gap-[2cqw] @2xl:mt-[2cqw] @2xl:gap-[0.7cqw]">
              {principles.map(({ icon: Icon, title }) => (
                <li key={title} className="t-meta inline-flex items-center gap-2 rounded-full border border-paper/25 px-[3.5cqw] py-[1.8cqw] @2xl:px-[1.1cqw] @2xl:py-[0.55cqw]">
                  <Icon aria-hidden="true" strokeWidth={1.6} className="size-[1.2em] shrink-0 opacity-70" />{title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3} className="mt-[7cqw] grid border-t border-paper/20 @2xl:mt-auto @2xl:grid-cols-3 @2xl:gap-x-[2cqw] @2xl:pt-[1.4cqw]">
            {highlights.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-[3cqw] border-b border-paper/20 py-[3.5cqw] @2xl:flex-col @2xl:justify-start @2xl:gap-[0.6cqw] @2xl:border-b-0 @2xl:py-0">
                <div className="whitespace-nowrap font-display uppercase leading-none text-[clamp(1.4rem,7cqw,1.9rem)] @2xl:text-[clamp(1.5rem,2.3cqw,2.3rem)]">{s.value}</div>
                <div className="t-meta text-right opacity-70 @2xl:text-left">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
