import { PORTRAIT_SIZES, PORTRAIT_SRC_SET, PORTRAIT_URL } from "@/data/services";

/** Seeded pseudo-random contribution grid (decorative, deterministic for SSR). */
export function ContributionGrid({ cols = 22, rows = 7, className = "" }: { cols?: number; rows?: number; className?: string }) {
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    return Math.floor((v - Math.floor(v)) * 5);
  });
  const shade = ["bg-paper/[0.06]", "bg-call-green/30", "bg-call-green/50", "bg-call-green/75", "bg-call-green"];
  return (
    <div className={`grid gap-[3px] ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-hidden>
      {cells.map((c, i) => <span key={i} className={`aspect-square rounded-[2px] ${shade[c]}`} />)}
    </div>
  );
}

/** Hero portrait: Atiq's real photo when provided, otherwise a typographic panel (never a stand-in face). */
export function Portrait({ position = "object-[30%_center]" }: { position?: string }) {
  if (PORTRAIT_URL) {
    return <img src={PORTRAIT_URL} srcSet={PORTRAIT_SRC_SET} sizes={PORTRAIT_SIZES} width={1920} height={1440} loading="lazy" decoding="async" alt="Portrait of Atiq Umer" className={`absolute inset-0 h-full w-full object-cover ${position}`} />;
  }
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-screen-dark p-[3cqw] text-paper">
      <div className="flex items-center justify-between font-mono text-[0.85cqw] uppercase tracking-wide opacity-70">
        <span>github.com/Atiqumer</span><span>PK</span>
      </div>
      <div className="font-display text-[22cqw] leading-[0.78] opacity-95">AU</div>
      <div>
        <ContributionGrid cols={42} className="w-full opacity-80" />
        <p className="mt-[1cqw] font-mono text-[0.8cqw] uppercase tracking-wide opacity-60">Python · Django · Computer Vision · React</p>
      </div>
    </div>
  );
}
