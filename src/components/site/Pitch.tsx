import { MaskLine, Reveal } from "./Reveal";

const steps = [
  ["Discover", "We define the problem and the goal."],
  ["Build", "I build it and share progress as I go."],
  ["Refine & Deliver", "We test, refine and launch."],
];

export function Process() {
  return (
    <section className="bg-screen-dark px-[6cqw] pt-[14cqw] text-paper @2xl:px-[3.5cqw] @2xl:pt-[6cqw]">
      <p className="t-meta opacity-70">Process</p>
      <h2 className="t-h2 mt-[3cqw] @2xl:mt-[1cqw]"><MaskLine>From idea to</MaskLine><MaskLine delay={0.06}>working product.</MaskLine></h2>
      <ol className="mt-[8cqw] @2xl:mt-[3cqw]">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1} y={20}>
            <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-[5cqw] gap-y-[1.5cqw] border-t border-paper/20 py-[5cqw] @2xl:grid-cols-[9cqw_1fr_1.2fr] @2xl:gap-x-[2cqw] @2xl:py-[2cqw]">
              <span className="font-display text-[16cqw] leading-none opacity-30 @2xl:text-[6cqw]">0{i + 1}</span>
              <h3 className="t-h3">{t}</h3>
              <p className="t-body col-span-2 max-w-[48ch] opacity-80 @2xl:col-span-1">{d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
