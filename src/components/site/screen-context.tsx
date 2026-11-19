import { createContext, useContext, useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * The phone content is rendered once per screen half and moved with a transform,
 * so reveals are driven by the shared scroll offset instead of IntersectionObserver.
 * That keeps both halves animating in perfect sync.
 */
type Ctx = { y: MotionValue<number>; screenH: number };
export const ScreenCtx = createContext<Ctx | null>(null);

export function offsetWithinScreen(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && !node.hasAttribute("data-screen-root")) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useScreenReveal<T extends HTMLElement>(threshold = 0.88): [RefObject<T | null>, boolean] {
  const ctx = useContext(ScreenCtx);
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  const check = (y: number) => {
    const el = ref.current;
    if (!el || !ctx || shown) return;
    if (offsetWithinScreen(el) + y < ctx.screenH * threshold) setShown(true);
  };
  useEffect(() => { if (ctx) check(ctx.y.get()); else setShown(true); });
  // Keyboard focus inside (or on the mirrored twin, via "force-reveal") shows the content right away.
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const force = () => setShown(true);
    el.addEventListener("focusin", force);
    el.addEventListener("force-reveal", force);
    return () => { el.removeEventListener("focusin", force); el.removeEventListener("force-reveal", force); };
  }, [shown]);
  const fallback = useMotionValue(0);
  useMotionValueEvent(ctx?.y ?? fallback, "change", check);
  return [ref, shown];
}
