import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BEZEL, RIM, useDeviceSize, type ViewportSeed } from "@/hooks/useDeviceSize";
import type { NavId } from "@/data/services";
import { ScreenContent } from "./ScreenContent";
import { offsetWithinScreen } from "./screen-context";
import { LockScreen } from "./LockScreen";
import { IncomingCall } from "./IncomingCall";
import { BottomNav, StatusBar } from "./BottomNav";
import { SiteChrome, type StageStyle, type FrameColor } from "./SiteChrome";

/** Scroll timeline, as fractions of the pinned section. */
const T = { unfoldEnd: 0.07, scrollStart: 0.1, scrollEnd: 0.86, foldStart: 0.88, foldEnd: 0.95, contact: 0.985 };
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const SHADOW = "0 40px 60px -30px oklch(0 0 0 / 35%)";
const HERO_NAME_EASE = [0.22, 1, 0.36, 1] as const;

export function getHeroNameEntrance(direction: "left" | "right") {
  return {
    initial: { opacity: 0, x: direction === "left" ? "-110vw" : "110vw" },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.05, ease: HERO_NAME_EASE },
  };
}

/**
 * On side-by-side screens, the static half extends one CSS pixel under the
 * hinged half. This avoids a fractional-device-pixel gap between their two
 * independently clipped composited surfaces; the matching offset keeps both
 * ScreenContent copies in the same global coordinate space.
 */
export function getStaticHalfGeometry(side: boolean, W: number, H: number) {
  return side
    ? { width: W + 1, height: H, contentOffset: { left: -(W - RIM - BEZEL) + 1, top: 0 } }
    : { width: W, height: H / 2, contentOffset: { left: 0, top: -(H / 2 - RIM - BEZEL) } };
}

function HeroName({ direction, children }: { direction: "left" | "right"; children: string }) {
  return <motion.span className="inline-block" {...getHeroNameEntrance(direction)}>{children}</motion.span>;
}

export function PhoneExperience({ initialViewport }: { initialViewport: ViewportSeed }) {
  const size = useDeviceSize(initialViewport);
  const { W, H, axis, vh, top } = size;
  const side = axis === "side";
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<StageStyle>("basic");
  const [frame, setFrame] = useState<FrameColor>("silver");
  const [phase, setPhase] = useState<"lock" | "open" | "call">("lock");
  const [active, setActive] = useState<NavId>("home");
  const open = phase === "open";
  const coverRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);

  // Track keyboard focus so that when folding/unfolding makes it inert, it moves to the now-active side instead of being lost.
  useEffect(() => {
    const onFocus = (e: FocusEvent) => { lastFocus.current = e.target as Element; };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);
  useEffect(() => {
    const last = lastFocus.current;
    if (!last) return;
    // Only rescue focus that was actually lost: caught in an inert side, or its element unmounted (lock screen -> contact swap).
    const lost = last.closest("[inert]") || (!last.isConnected && (document.activeElement === document.body || !document.activeElement));
    if (!lost) return;
    const target = open ? navRef.current : coverRef.current;
    const el = target?.querySelector<HTMLElement>("[data-step-focus]") ?? target?.querySelector<HTMLElement>("a[href],button:not([disabled]),input,textarea");
    el?.focus({ preventScroll: true });
  }, [open, phase]);

  // Geometry: device box, half box, visible screen size and the content's offset in the static half.
  const boxW = side ? W * 2 : W;
  const halfW = side ? W : W;
  const halfH = side ? H : H / 2;
  const contentW = side ? boxW - 2 * (BEZEL + RIM) : W - 2 * (BEZEL + RIM);
  const screenH = H - 2 * (BEZEL + RIM);
  const bGeometry = getStaticHalfGeometry(side, W, H);
  const bOffset = bGeometry.contentOffset;
  const foldShift = side ? -W / 2 : vh / 2 - (top + (3 * H) / 4);

  const sR = side ? 38 : 40; // screen corner radius
  const oR = sR + BEZEL + RIM; // outer radius
  const oRadius = oR;
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const shiftMv = useMotionValue(foldShift);
  const travel = useMotionValue(2000);
  useEffect(() => { shiftMv.set(foldShift); }, [foldShift, shiftMv]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => travel.set(Math.max(0, el.offsetHeight - screenH));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [screenH, travel, contentW, axis]);

  const unfold = useTransform(p, [0, T.unfoldEnd, T.foldStart, T.foldEnd], [0, 1, 1, 0]);
  // Positive rotateY / negative rotateX swing the hinged half toward the viewer as it opens (matches the reference).
  const angle = useTransform(unfold, (u) => (side ? 180 : -180) * (1 - u));
  const shift = useTransform([unfold, shiftMv] as MotionValue<number>[], ([u, s]) => (s as number) * (1 - (u as number)));
  const y = useTransform([p, travel] as MotionValue<number>[], ([v, t]) => -clamp01(((v as number) - T.scrollStart) / (T.scrollEnd - T.scrollStart)) * (t as number));
  const navOpacity = useTransform(unfold, [0.85, 1], [0, 1]);
  // Inner screen dims while the panel is mid-fold, like light falling off the crease.
  const hingeR = useTransform(unfold, (u) => Math.round(oRadius * Math.max(0, 1 - u * 1.4)));
  const bRadiusMv = useTransform(hingeR, (h) => (side ? `${h}px ${oRadius}px ${oRadius}px ${h}px` : `${h}px ${h}px ${oRadius}px ${oRadius}px`));
  const aRadiusMv = useTransform(hingeR, (h) => (side ? `${oRadius}px ${h}px ${h}px ${oRadius}px` : `${oRadius}px ${oRadius}px ${h}px ${h}px`));
  const hs = (h: number) => Math.max(0, h - RIM);
  const bScreenRMv = useTransform(hingeR, (h) => (side ? `${hs(h)}px ${sR}px ${sR}px ${hs(h)}px` : `${hs(h)}px ${hs(h)}px ${sR}px ${sR}px`));
  const aFrontOpacity = useTransform(unfold, (u) => (u < 0.02 ? 0 : 1));
  const wordsOpacity = useTransform(unfold, [0, 0.6], [1, 0]);
  const crease = useTransform(unfold, [0, 0.5, 1], [0.55, 0.25, 0]);

  const update = useCallback((v: number) => {
    setPhase(v >= (T.foldStart + T.foldEnd) / 2 ? "call" : v > T.unfoldEnd * 0.5 ? "open" : "lock");
    const el = contentRef.current;
    if (!el) return;
    if (v >= T.foldStart) return setActive("contact");
    const pos = clamp01((v - T.scrollStart) / (T.scrollEnd - T.scrollStart)) * travel.get() + screenH * 0.4;
    // Walk section markers in page order; the last one above the reading line wins. data-nav lets a section
    // (e.g. Services, Experience) count toward a nav item without becoming that item's scroll target.
    let cur: NavId = "home";
    for (const m of el.querySelectorAll<HTMLElement>("[data-section],[data-nav]")) {
      if (m.offsetTop > pos) break;
      cur = (m.dataset["nav"] ?? m.dataset["section"]) as NavId;
    }
    setActive(cur);
  }, [travel, screenH]);
  useMotionValueEvent(p, "change", update);

  const scrollToProgress = useCallback((v: number) => {
    const s = sectionRef.current;
    if (!s) return;
    window.scrollTo({ top: s.offsetTop + v * (s.offsetHeight - window.innerHeight), behavior: "smooth" });
  }, []);

  // Keyboard focus inside the open phone: undo any browser scroll of the clipped containers and move the
  // shared scroll timeline so the focused control sits fully inside the screen, clear of the bottom nav.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const NAV_CLEAR = 96;
    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const content = contentRef.current;
      if (!content || !content.contains(el) || phase !== "open") return;
      let node: HTMLElement | null = el.parentElement;
      while (node && node !== section) { if (node.scrollTop || node.scrollLeft) { node.scrollTop = 0; node.scrollLeft = 0; } node = node.parentElement; }
      const t = travel.get();
      if (!t) return;
      const top = offsetWithinScreen(el);
      const pos = -y.get();
      const h = el.offsetHeight;
      if (top >= pos + 16 && top + h <= pos + screenH - NAV_CLEAR) return;
      const target = Math.min(t, Math.max(0, top - screenH * 0.35));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const v = T.scrollStart + (target / t) * (T.scrollEnd - T.scrollStart);
      window.scrollTo({ top: section.offsetTop + v * (section.offsetHeight - window.innerHeight), behavior: reduce ? "auto" : "smooth" });
    };
    section.addEventListener("focusin", onFocus);
    return () => section.removeEventListener("focusin", onFocus);
  }, [phase, travel, y, screenH]);

  const onNav = useCallback((id: NavId) => {
    if (id === "contact") return scrollToProgress(T.contact);
    if (id === "home") return scrollToProgress(T.scrollStart);
    const el = contentRef.current?.querySelector<HTMLElement>(`[data-section="${id}"]`);
    const t = travel.get();
    if (!el || !t) return;
    scrollToProgress(T.scrollStart + Math.min(1, el.offsetTop / t) * (T.scrollEnd - T.scrollStart));
  }, [travel, scrollToProgress]);

  // Rounded corners and screen insets for each half (no rim or bezel along the hinge).
  const aScreenR = side ? `${sR}px 0 0 ${sR}px` : `${sR}px ${sR}px 0 0`;
  const aBorder = side ? { borderRightWidth: 0 } as { borderRightWidth?: number; borderBottomWidth?: number } : { borderBottomWidth: 0 };
  const bBorder = side ? { borderLeftWidth: 0 } as { borderLeftWidth?: number; borderTopWidth?: number } : { borderTopWidth: 0 };
  // The hinged screen overlaps the static one by 1px so no hairline seam shows down the middle when open.
  const aInset = side ? `${BEZEL}px -1px ${BEZEL}px ${BEZEL}px` : `${BEZEL}px ${BEZEL}px -1px ${BEZEL}px`;
  const bInset = side ? `${BEZEL}px ${BEZEL}px ${BEZEL}px 0` : `0 ${BEZEL}px ${BEZEL}px ${BEZEL}px`;

  const half = { width: halfW, height: halfH };

  return (
    <div ref={sectionRef} data-style={style} data-frame={frame} className="relative" style={{ height: side ? "950vh" : "1380vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="stage-bg absolute inset-0" />
        {style === "orbit" && (
          <div aria-hidden className="absolute inset-0">
            {[1.1, 1.6, 2.2].map((m) => <span key={m} className="orbit-ring" style={{ width: H * m, height: H * m }} />)}
          </div>
        )}

        {/* Oversized split name behind the device */}
        {side ? (
          <motion.div aria-hidden style={{ opacity: wordsOpacity }} className="pointer-events-none absolute inset-0 select-none text-ink">
            <span className="font-display absolute -translate-x-full -translate-y-1/2 text-[min(17vw,30vh)]" style={{ left: `calc(50vw - ${W / 2 - 30}px)`, top: "44vh" }}><HeroName direction="left">Atiq</HeroName></span>
            <span className="font-display absolute -translate-y-1/2 text-[min(15vw,24vh)]" style={{ left: `calc(50vw + ${W / 2 - 10}px)`, top: "47vh" }}><HeroName direction="right">Umer</HeroName></span>
          </motion.div>
        ) : (
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none text-ink">
            <span className="font-display absolute left-1/2 -translate-x-1/2 text-[min(32vw,15vh)]" style={{ bottom: `calc(50vh + ${H / 4 + 22}px)` }}><HeroName direction="left">Atiq</HeroName></span>
            <span className="font-display absolute left-1/2 -translate-x-1/2 text-[min(27vw,15vh)]" style={{ top: `calc(50vh + ${H / 4 + 26}px)` }}><HeroName direction="right">Umer</HeroName></span>
          </div>
        )}

        <SiteChrome style={style} setStyle={setStyle} frame={frame} setFrame={setFrame} onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

        {/* The foldable device */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top }}>
          <motion.div className="relative" style={{ width: boxW, height: H, x: side ? shift : 0, y: side ? 0 : shift, perspective: 2400 }}>
            {/* Static half B (right / bottom) */}
            <motion.div className="absolute bottom-0 right-0 border-[3px] border-frame bg-bezel" style={{ width: bGeometry.width, height: bGeometry.height, ...bBorder, borderRadius: bRadiusMv, boxShadow: SHADOW }}>
              <motion.div inert={!open} className="absolute overflow-hidden" style={{ inset: bInset, borderRadius: bScreenRMv }}>
                <motion.div className="absolute" style={{ ...bOffset, y }}>
                  <ScreenContent ref={contentRef} y={y} width={contentW} screenH={screenH} onNav={onNav} />
                </motion.div>
                {side && phase !== "call" && <StatusBar side="right" />}
                <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: crease }} />
              </motion.div>
              {side && (
                <>
                  <span className="absolute -right-[6px] top-[16%] h-16 w-[3px] rounded-r bg-frame" />
                  <span className="absolute -right-[6px] top-[28%] h-10 w-[3px] rounded-r bg-frame" />
                </>
              )}
            </motion.div>

            {/* Hinged half A (left / top): front is the inner screen, back is the cover */}
            <motion.div
              className="absolute left-0 top-0"
              style={{ ...half, rotateY: side ? angle : 0, rotateX: side ? 0 : angle, transformOrigin: side ? "right center" : "center bottom", transformStyle: "preserve-3d" }}
            >
              <motion.div inert={!open} className="absolute inset-0 border-[3px] border-frame bg-bezel [backface-visibility:hidden]" style={{ ...aBorder, borderRadius: aRadiusMv, opacity: aFrontOpacity }}>
                <div className="absolute overflow-hidden" style={{ inset: aInset, borderRadius: aScreenR }}>
                  <motion.div className="absolute left-0 top-0" style={{ y }}>
                    <ScreenContent y={y} width={contentW} screenH={screenH} onNav={onNav} ariaHidden />
                  </motion.div>
                  <StatusBar side={side ? "left" : "both"} />
                  <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: crease }} />
                </div>
              </motion.div>
              <div
                ref={coverRef}
                inert={open}
                aria-hidden={open || undefined}
                className={`absolute inset-0 border-[3px] border-frame bg-bezel [backface-visibility:hidden] ${open ? "pointer-events-none" : ""}`}
                style={{ transform: `${side ? "rotateY" : "rotateX"}(180deg) translateZ(1px)`, borderRadius: oR, boxShadow: SHADOW }}
              >
                <div className="absolute overflow-hidden" style={{ inset: BEZEL, borderRadius: sR }}>
                  {phase === "call" ? <IncomingCall /> : <LockScreen compact={!side} onUnfold={() => scrollToProgress(T.scrollStart)} />}
                </div>
              </div>
            </motion.div>

            <motion.div ref={navRef} inert={!open} style={{ opacity: navOpacity }} className={`absolute left-1/2 z-30 -translate-x-1/2 ${side ? "bottom-6" : "bottom-5"} ${phase === "open" ? "" : "pointer-events-none"}`}>
              <BottomNav active={active} onNav={onNav} />
            </motion.div>
          </motion.div>
          <div aria-hidden className="pointer-events-none absolute -bottom-12 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-ink/10 blur-xl" />
        </div>
      </div>
    </div>
  );
}
