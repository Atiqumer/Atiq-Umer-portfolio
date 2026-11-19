import { navItems, type NavId } from "@/data/services";

/** Floating in-screen navigation (doubles as the footer nav). */
export function BottomNav({ active, onNav }: { active: NavId; onNav: (id: NavId) => void }) {
  return (
    <nav aria-label="Main" className="flex items-center gap-0.5 rounded-full bg-ink/55 p-1 text-[13px] text-paper backdrop-blur-xl">
      {navItems.map((n) => (
        <button
          key={n.id}
          onClick={() => onNav(n.id)}
          aria-current={active === n.id ? "location" : undefined}
          className={`min-h-9 rounded-full px-[clamp(6px,2.4vw,10px)] py-1.5 transition-colors min-[400px]:px-3 duration-300 ${active === n.id ? "bg-paper text-ink" : "hover:bg-paper/15"}`}
        >
          {n.label}
        </button>
      ))}
    </nav>
  );
}

export function StatusBar({ side }: { side: "left" | "right" | "both" }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-3.5 text-[12px] font-semibold text-paper mix-blend-difference">
      <span className={side === "right" ? "invisible" : ""}>09:41</span>
      <span className={`flex items-center gap-1.5 ${side === "left" ? "invisible" : ""}`}>
        5G
        <span className="relative h-[11px] w-[22px] rounded-[3px] border border-current p-[1.5px]"><span className="block h-full w-3/4 rounded-[1px] bg-current" /></span>
      </span>
    </div>
  );
}
