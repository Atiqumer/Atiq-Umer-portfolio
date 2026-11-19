import { forwardRef, useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { ScreenCtx } from "./screen-context";
import type { NavId } from "@/data/services";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { SelectedWork } from "./SelectedWork";
import { Process } from "./Pitch";
import { About } from "./About";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Moments } from "./Moments";
import { ContactCTA } from "./ContactCTA";

type Props = { y: MotionValue<number>; width: number; screenH: number; onNav: (id: NavId) => void; ariaHidden?: boolean };

/** The full unfolded-screen website; rendered once per screen half. Client-focused order: offer → proof → trust → contact. */
const FOCUSABLE = "a[href],button,input,textarea,select,[tabindex],.marquee";

/**
 * The mirror copy stays clickable but is removed from the tab order; when the real copy's
 * element gets keyboard focus, the matching mirror element shows the same focus ring.
 */
function useMirror(ariaHidden?: boolean) {
  const mirrorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ariaHidden) return;
    const mirror = mirrorRef.current;
    if (!mirror) return;
    const list = () => Array.from(mirror.querySelectorAll<HTMLElement>(FOCUSABLE));
    const untab = () => list().forEach((el) => { if (el.tabIndex !== -1) el.tabIndex = -1; });
    untab();
    const mo = new MutationObserver(untab);
    mo.observe(mirror, { childList: true, subtree: true });
    const clear = () => mirror.querySelectorAll("[data-mirror-focus]").forEach((el) => el.removeAttribute("data-mirror-focus"));
    const onFocus = (e: FocusEvent) => {
      clear();
      const t = e.target as HTMLElement;
      const real = document.querySelector<HTMLElement>("[data-screen-root]:not([aria-hidden='true'])");
      if (!real?.contains(t)) return;
      if (!t.matches(":focus-visible")) { list()[Array.from(real.querySelectorAll<HTMLElement>(FOCUSABLE)).indexOf(t)]?.dispatchEvent(new CustomEvent("force-reveal", { bubbles: true })); return; }
      const i = Array.from(real.querySelectorAll<HTMLElement>(FOCUSABLE)).indexOf(t);
      const twin = list()[i];
      twin?.setAttribute("data-mirror-focus", "");
      twin?.dispatchEvent(new CustomEvent("force-reveal", { bubbles: true }));
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", clear);
    return () => { mo.disconnect(); document.removeEventListener("focusin", onFocus); document.removeEventListener("focusout", clear); };
  }, [ariaHidden]);
  return mirrorRef;
}

export const ScreenContent = forwardRef<HTMLDivElement, Props>(function ScreenContent({ y, width, screenH, onNav, ariaHidden }, ref) {
  const mirrorRef = useMirror(ariaHidden);
  return (
    <ScreenCtx.Provider value={{ y, screenH }}>
    <div ref={ariaHidden ? mirrorRef : ref} data-screen-root aria-hidden={ariaHidden} className="@container relative bg-screen-dark" style={{ width }}>
      <Hero onNav={onNav} height={screenH} />
      <Services onNav={onNav} />
      <SelectedWork height={screenH * 0.92} />
      <About />
      <Experience />
      <Moments />
      <Skills />
      <Process />
      <ContactCTA />
    </div>
    </ScreenCtx.Provider>
  );
});
