import { siCss, siDjango, siFlask, siGit, siGithub, siHtml5, siJavascript, siMediapipe, siMysql, siNumpy, siOpencv, siPandas, siPostgresql, siPostman, siPython, siReact, siScikitlearn, siTailwindcss, siTensorflow, type SimpleIcon } from "simple-icons";
import { MaskLine, Reveal } from "./Reveal";

const row1: [SimpleIcon, string][] = [[siPython, "Python"], [siTensorflow, "TensorFlow"], [siScikitlearn, "Scikit-learn"], [siOpencv, "OpenCV"], [siPandas, "Pandas"], [siNumpy, "NumPy"], [siMediapipe, "MediaPipe"], [siDjango, "Django"], [siFlask, "Flask"], [siPostgresql, "PostgreSQL"]];
const row2: [SimpleIcon, string][] = [[siMysql, "MySQL"], [siReact, "React"], [siJavascript, "JavaScript"], [siTailwindcss, "Tailwind CSS"], [siHtml5, "HTML5"], [siCss, "CSS3"], [siGit, "Git"], [siGithub, "GitHub"], [siPostman, "Postman"]];

function Row({ items, reverse }: { items: [SimpleIcon, string][]; reverse?: boolean }) {
  // Two identical copies; the track slides by exactly one copy (-50%) for a seamless loop.
  const copy = (k: string) => items.map(([icon, name]) => (
    <li key={k + name} aria-hidden={k === "b" || undefined} className="tech-item group flex shrink-0 items-center gap-[2.4cqw] pr-[8cqw] @2xl:gap-[0.8cqw] @2xl:pr-[3.4cqw]" style={{ ["--brand" as string]: `#${icon.hex}` }}>
      <svg viewBox="0 0 24 24" role="img" aria-label={name} className="h-[6cqw] w-[6cqw] fill-current opacity-80 transition-[color,opacity] duration-300 group-hover:opacity-100 @2xl:h-[1.9cqw] @2xl:w-[1.9cqw]"><path d={icon.path} /></svg>
      <span className="whitespace-nowrap font-display text-[6cqw] @2xl:text-[1.9cqw]">{name}</span>
    </li>
  ));
  return (
    <div role="region" aria-label={reverse ? "Technologies, row 2" : "Technologies, row 1"} className="marquee overflow-hidden border-t border-paper/15 py-[5cqw] @2xl:py-[1.8cqw]">
      <ul className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}>{copy("a")}{copy("b")}</ul>
    </div>
  );
}

export function Skills() {
  return (
    <section data-section="skills" className="bg-screen-dark pt-[14cqw] text-paper @2xl:pt-[6cqw]">
      <div className="flex flex-col gap-[3cqw] px-[6cqw] @2xl:flex-row @2xl:items-end @2xl:justify-between @2xl:px-[3.5cqw]">
        <h2 className="t-h2"><MaskLine>The tools behind</MaskLine><MaskLine delay={0.06}>the work.</MaskLine></h2>
        <Reveal delay={0.1}><p className="t-body max-w-[36ch] opacity-75 @2xl:pb-[0.6cqw]">What I build with.</p></Reveal>
      </div>
      <div className="mt-[8cqw] border-b border-paper/15 @2xl:mt-[3cqw]">
        <Row items={row1} />
        <Row items={row2} reverse />
      </div>
    </section>
  );
}
