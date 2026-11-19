import { motion } from "framer-motion";
import { CalendarDays, Mail } from "lucide-react";
import { CALENDLY_URL, EMAIL, ENQUIRY_MAILTO, GITHUB, LINKEDIN } from "@/data/services";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useScreenReveal } from "./screen-context";

export function ContactCTA() {
  const [ref, shown] = useScreenReveal<HTMLDivElement>();
  return (
    <section className="bg-screen-dark px-[6cqw] pb-[30cqw] pt-[12cqw] @2xl:px-[3.5cqw] @2xl:pb-[10cqw] @2xl:pt-[5cqw]">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[3cqw] bg-paper px-[6cqw] py-[8cqw] text-ink @2xl:rounded-[1cqw] @2xl:px-[3cqw] @2xl:py-[3.5cqw]">
        <p className="t-meta text-muted-foreground">Start a conversation</p>
        <h2 className="t-h2 mt-[2cqw] @2xl:mt-[0.8cqw]">Got an idea? Let's build it.</h2>
        <div className="mt-[6cqw] flex flex-wrap items-center gap-[2cqw] @2xl:mt-[2cqw] @2xl:gap-[0.6cqw]">
          <a href={ENQUIRY_MAILTO} className="t-body rounded-full bg-ink px-[5.5cqw] py-[3cqw] font-medium text-paper transition-transform hover:-translate-y-0.5 @2xl:px-[1.8cqw] @2xl:py-[0.9cqw]">Discuss Your Project ↗</a>
          {CALENDLY_URL && <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a call on Calendly (opens in a new tab)" className="t-body inline-flex items-center gap-2 rounded-full border border-ink/25 px-[5.5cqw] py-[3cqw] font-medium transition-transform hover:-translate-y-0.5 @2xl:px-[1.8cqw] @2xl:py-[0.9cqw]"><CalendarDays aria-hidden="true" className="size-[1.1em]" />Book a Call</a>}
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn" className="grid size-11 place-items-center rounded-full bg-secondary transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink @2xl:size-[3.2cqw] @2xl:min-h-11 @2xl:min-w-11"><LinkedinIcon className="size-[18px]" /></a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" title="GitHub" className="grid size-11 place-items-center rounded-full bg-secondary transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink @2xl:size-[3.2cqw] @2xl:min-h-11 @2xl:min-w-11"><GithubIcon className="size-[18px]" /></a>
        </div>
        <div className="t-meta mt-[6cqw] flex flex-wrap gap-x-[5cqw] gap-y-[1.5cqw] border-t border-ink/10 pt-[4cqw] @2xl:mt-[2.5cqw] @2xl:gap-x-[2cqw] @2xl:pt-[1.4cqw]">
          <a href={`mailto:${EMAIL}`} className="-my-2 inline-flex items-center gap-2 py-2 normal-case tracking-normal hover:underline"><Mail aria-hidden="true" className="size-[1.1em] shrink-0" />{EMAIL.toLowerCase()}</a>
        </div>
      </motion.div>
      <p className="t-meta mt-[8cqw] text-center text-paper/50 @2xl:mt-[3cqw]">© 2026 Atiq Umer</p>
    </section>
  );
}
