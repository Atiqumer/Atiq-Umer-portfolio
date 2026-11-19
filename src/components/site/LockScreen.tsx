import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { CALENDLY_URL, GITHUB, LINKEDIN, PORTRAIT_URL } from "@/data/services";

/** Cover screen shown while the phone is folded. */
function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  return now;
}

export function LockScreen({ onUnfold, compact }: { onUnfold: () => void; compact?: boolean }) {
  const now = useClock();
  const time = now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "\u00a0";
  const date = now ? now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" }) : "\u00a0";
  return (
    <div className="[container-type:size] relative h-full w-full overflow-hidden bg-screen-dark text-paper">
      {PORTRAIT_URL && (
        <motion.img src={PORTRAIT_URL} alt="" aria-hidden initial={{ scale: 1.12 }} animate={{ scale: 1.04 }} transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[28%_center]" />
      )}
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--screen-dark) 60%, transparent) 0%, transparent 38%, transparent 55%, color-mix(in oklab, var(--screen-dark) 75%, transparent) 100%)" }} />
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="relative pt-[9cqmin] text-center">
        <p className="text-[3cqmin] opacity-90">{date === "\u00a0" ? "\u00a0" : "Atiq Umer · AI/ML Engineer"}</p>
        <div className="font-display text-[30cqmin] leading-[0.85] normal-case tabular-nums">{time}</div>
        <p className="mt-[3cqmin] text-[3.4cqmin] font-medium">{date}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-[5cqmin] bottom-[19cqmin] flex items-center gap-[3cqmin] rounded-[3.6cqmin] bg-paper/85 p-[3cqmin] text-ink backdrop-blur-xl">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[max(10px,2.5cqmin)] uppercase tracking-wider opacity-70">Let's connect</p>
          <p className="mt-[0.6cqmin] text-[max(12px,3.4cqmin)] font-semibold leading-tight">Have an idea in mind?</p>
          {!compact && <p className="text-[max(11px,3cqmin)] leading-tight opacity-75">Let's talk about building it.</p>}
        </div>
        {CALENDLY_URL && (
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a call on Calendly (opens in a new tab)"
            className="inline-flex shrink-0 items-center gap-[1.4cqmin] rounded-full bg-ink px-[3cqmin] py-[1.8cqmin] text-[max(11px,2.9cqmin)] text-paper transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            <CalendarDays aria-hidden="true" className="size-[1.2em]" />Book a Call
          </a>
        )}
      </motion.div>
      <div className="absolute inset-x-[5cqmin] bottom-[5cqmin] flex items-center justify-between">
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="grid h-[11cqmin] w-[11cqmin] place-items-center rounded-full bg-paper/85 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"><LinkedinIcon className="h-[4.6cqmin] w-[4.6cqmin] text-ink" />
        </a>
        <button onClick={onUnfold} className="hint-bob rounded-full bg-paper/85 px-[3.2cqmin] py-[1.7cqmin] text-[3cqmin] text-ink transition-colors hover:bg-paper">Scroll to unfold</button>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="grid h-[11cqmin] w-[11cqmin] place-items-center rounded-full bg-paper/85 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"><GithubIcon className="h-[5cqmin] w-[5cqmin] text-ink" />
        </a>
      </div>
    </div>
  );
}
