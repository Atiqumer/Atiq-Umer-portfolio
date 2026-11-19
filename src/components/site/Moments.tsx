import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { moments } from "@/data/moments";
import { MaskLine, Reveal } from "./Reveal";

/* Shared deck position: the phone renders this section twice (one copy per screen half), so both copies read one store. */
let current = 0;
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
const setCurrent = (i: number) => { current = (i + moments.length) % moments.length; listeners.forEach((l) => l()); };

const ROTATE = [0, 4, -3.5, 6];
const pad = (n: number) => String(n).padStart(2, "0");

/** "Beyond the code": interactive stacked photo deck of real event photos. */
export function Moments() {
  const index = useSyncExternalStore(subscribe, () => current, () => 0);
  const reduced = useReducedMotion();
  const n = moments.length;
  const active = moments[index] ?? moments[0]!;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) setCurrent(index + 1);
    else if (info.offset.x > 70 || info.velocity.x > 500) setCurrent(index - 1);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setCurrent(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); setCurrent(index - 1); }
  };

  return (
    <section data-nav="about" className="bg-paper px-[6cqw] py-[12cqw] text-ink @2xl:px-[3.5cqw] @2xl:py-[5cqw]">
      <div className="grid gap-[8cqw] @2xl:grid-cols-[0.8fr_1fr] @2xl:items-center @2xl:gap-[4cqw]">
        <div>
          <p className="t-meta text-muted-foreground">Moments &amp; milestones</p>
          <h2 className="t-h2 mt-[2cqw] @2xl:mt-[0.8cqw]"><MaskLine>Beyond the code.</MaskLine></h2>
          <Reveal delay={0.1}><p className="t-body mt-[3cqw] max-w-[30ch] text-muted-foreground @2xl:mt-[1.2cqw]">Building, learning and connecting beyond the screen.</p></Reveal>
        </div>

        <div>
          <div
            role="group"
            aria-roledescription="photo deck"
            aria-label={`Event photos, ${index + 1} of ${n}: ${active.caption}`}
            tabIndex={0}
            onKeyDown={onKey}
            className="relative mx-auto h-[var(--deck-h)] w-full rounded-[16px] [--deck-h:92cqw] @2xl:[--deck-h:34cqw] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {moments.map((m, i) => {
              const rel = (i - index + n) % n;
              const visible = rel < 4;
              const front = rel === 0;
              return (
                <motion.div
                  key={m.src}
                  aria-hidden={!front}
                  className="absolute left-1/2 top-1/2 overflow-hidden rounded-[14px] bg-secondary shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--ink)_55%,transparent)]"
                  style={{
                    width: `min(86%, calc(var(--deck-h) * 0.9 * ${m.w / m.h}))`,
                    aspectRatio: `${m.w} / ${m.h}`,
                    zIndex: n - rel,
                    translateX: "-50%",
                    translateY: "-50%",
                    touchAction: front ? "pan-y" : undefined,
                    cursor: front ? "grab" : undefined,
                    pointerEvents: front ? "auto" : "none",
                  }}
                  initial={false}
                  animate={{
                    x: (visible ? rel : 3) * 16 - 24,
                    y: visible ? rel * -6 : -18,
                    rotate: reduced ? 0 : (ROTATE[rel] ?? 0),
                    scale: visible ? 1 - rel * 0.05 : 0.85,
                    opacity: visible ? (front ? 1 : 0.9 - rel * 0.12) : 0,
                  }}
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
                  drag={front ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  dragSnapToOrigin
                  onDragEnd={(e, info) => { if (front) onDragEnd(e, info); }}
                  whileDrag={{ cursor: "grabbing" }}
                >
                  <img src={m.src} alt={front ? m.alt : ""} width={m.w} height={m.h} draggable={false}
                    loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async"
                    className="h-full w-full select-none object-cover" />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-[5cqw] flex items-center justify-between gap-[3cqw] @2xl:mt-[1.6cqw]">
            <div className="min-w-0" aria-live="polite">
              <p className="t-meta text-muted-foreground">{active.category} · {pad(index + 1)} / {pad(n)}</p>
              <p className="t-h3 mt-[1cqw] @2xl:mt-[0.3cqw]">{active.caption}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" aria-label="Previous photo" onClick={() => setCurrent(index - 1)} className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-secondary"><ChevronLeft className="size-4" aria-hidden /></button>
              <button type="button" aria-label="Next photo" onClick={() => setCurrent(index + 1)} className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-secondary"><ChevronRight className="size-4" aria-hidden /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
