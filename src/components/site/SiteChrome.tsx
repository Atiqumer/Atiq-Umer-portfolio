export type StageStyle = "basic" | "glow" | "orbit";
export type FrameColor = "silver" | "graphite" | "rose" | "sage";

const styles: StageStyle[] = ["basic", "glow", "orbit"];
const frames: { id: FrameColor; swatch: string }[] = [
  { id: "silver", swatch: "bg-[var(--frame-silver)]" },
  { id: "graphite", swatch: "bg-[var(--frame-graphite)]" },
  { id: "rose", swatch: "bg-[var(--frame-rose)]" },
  { id: "sage", swatch: "bg-[var(--frame-sage)]" },
];

/** Fixed brand mark, stage-style switch and frame-colour picker around the device. */
export function SiteChrome({ style, setStyle, frame, setFrame, onHome }: { style: StageStyle; setStyle: (s: StageStyle) => void; frame: FrameColor; setFrame: (f: FrameColor) => void; onHome: () => void }) {
  return (
    <>
      <button onClick={onHome} className="absolute left-5 top-5 z-50 font-display text-[22px] text-ink md:left-7">
        Atiq Umer
      </button>
      <div className="absolute right-4 top-4 z-50 flex rounded-full bg-paper p-1 text-[13px] shadow-[0_6px_20px_-8px_oklch(0_0_0/0.25)] md:right-7">
        {styles.map((s) => (
          <button key={s} onClick={() => setStyle(s)} className={`rounded-full px-3 py-1.5 capitalize transition-colors ${style === s ? "bg-ink text-paper" : "text-ink hover:bg-secondary"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="absolute bottom-5 left-5 z-50 flex gap-1.5 rounded-full bg-paper p-1.5 shadow-[0_6px_20px_-8px_oklch(0_0_0/0.25)] md:bottom-4 md:left-1/2 md:-translate-x-1/2">
        {frames.map((f) => (
          <button key={f.id} aria-label={`${f.id} frame`} onClick={() => setFrame(f.id)} className={`h-4 w-4 rounded-full transition-transform hover:scale-110 ${f.swatch} ${frame === f.id ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`} />
        ))}
      </div>
    </>
  );
}
