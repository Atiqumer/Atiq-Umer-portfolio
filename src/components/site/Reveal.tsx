import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useScreenReveal } from "./screen-context";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts its children in once they scroll into the phone screen. */
export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const [ref, shown] = useScreenReveal<HTMLDivElement>();
  const reduced = useReducedMotion();
  const dy = reduced ? 0 : y;
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: dy }} animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: dy }} transition={reduced ? { duration: 0.15 } : { duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** Line mask reveal for big display type. */
export function MaskLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, shown] = useScreenReveal<HTMLSpanElement>(0.95);
  const reduced = useReducedMotion();
  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.04em] ${className ?? ""}`}>
      <motion.span className="block" initial={{ y: "105%" }} animate={{ y: shown ? "0%" : "105%" }} transition={reduced ? { duration: 0 } : { duration: 0.9, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}
