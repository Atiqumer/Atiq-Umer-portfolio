import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ABOUT_PORTRAIT_URL } from "@/data/services";
import { CALL_EMAIL, PROJECT_TYPES, buildEnquiryMailto, takePendingProjectType, validateEnquiry, type EnquiryErrors } from "./call-interaction";

type Step = "intro" | "type" | "idea" | "details";

/** Final cover screen: a minimal contact card that opens a small in-phone project enquiry. Independent of the phone timeline. */
export function IncomingCall() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const [step, setStep] = useState<Step>("intro");
  const [type, setType] = useState("");
  const [idea, setIdea] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [opened, setOpened] = useState(false);
  const go = (to: Step) => { setErrors({}); setStep(to); };
  // Inside the short cover (and above a mobile keyboard) keep the focused field in view of the scrollable step.
  const keepInView = (e: FocusEvent<HTMLElement>) => { const t = e.currentTarget; window.setTimeout(() => t.scrollIntoView({ block: "nearest" }), 300); };

  useEffect(() => {
    const preset = takePendingProjectType();
    if (preset) { setType(preset); setStep("idea"); }
  }, []);

  useEffect(() => {
    let inView = true;
    const update = () => setActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { inView = entry?.isIntersecting ?? false; update(); });
    if (rootRef.current) observer.observe(rootRef.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  // Keyboard users keep their place: after a step change, focus the new step's first control.
  const navigated = useRef(false);
  useEffect(() => {
    if (!navigated.current) { navigated.current = true; return; }
    const id = window.setTimeout(() => {
      if (rootRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      rootRef.current?.querySelector<HTMLElement>("[data-step-focus]")?.focus({ preventScroll: true });
    }, reducedMotion ? 50 : 650);
    return () => window.clearTimeout(id);
  }, [step, reducedMotion]);

  const move = reducedMotion ? 0 : 14;
  const motionProps = { initial: { opacity: 0, x: move }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -move }, transition: { duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] as const } };
  const back = (to: Step) => (
    <button type="button" onClick={() => go(to)} className="call-back font-mono text-paper/60 hover:text-paper"><ArrowLeft aria-hidden="true" /> BACK</button>
  );

  return (
    <div ref={rootRef} data-call-screen data-paused={!active || !!reducedMotion} className="call-screen relative h-full w-full bg-screen-dark text-paper">
      <AnimatePresence mode="wait" initial={false}>
        {step === "intro" && (
          <motion.div key="intro" {...motionProps} className="call-layout text-center">
            <header className="call-heading">
              <p className="call-label font-mono text-paper/60">LET'S CONNECT</p>
              <h2 className="font-display">HAVE AN IDEA?</h2>
              <p className="text-paper/65">Let's build something that works.</p>
            </header>
            <div className="call-caller">
              <div className="call-portrait relative">
                <span className="call-outline absolute inset-0 rounded-full border border-paper/40" aria-hidden="true" />
                <img src={ABOUT_PORTRAIT_URL} alt="Atiq Umer" className="relative h-full w-full rounded-full object-cover object-[50%_22%]" />
              </div>
              <div className="call-identity"><p className="font-mono">ATIQ UMER</p><p className="text-paper/70">AI/ML &amp; Full-Stack Developer</p></div>
            </div>
            <Button data-step-focus variant="outline" onClick={() => go("type")} className="call-cta rounded-full border-paper/70 bg-transparent font-mono text-paper hover:bg-paper hover:text-ink">
              START A PROJECT <ArrowUpRight aria-hidden="true" />
            </Button>
            <p className="call-direct text-paper/70">Or email me directly<br /><a href={`mailto:${CALL_EMAIL}`} className="call-direct-link text-paper hover:underline"><Mail aria-hidden="true" />{CALL_EMAIL.toLowerCase()}</a></p>
          </motion.div>
        )}
        {step === "type" && (
          <motion.div key="type" {...motionProps} className="call-layout">
            <div className="call-step">
              {back("intro")}
              <h3 className="font-display">WHAT ARE WE BUILDING?</h3>
              <div className="call-options">
                {PROJECT_TYPES.map((t, i) => (
                  <button key={t} data-step-focus={i === 0 || undefined} type="button" aria-pressed={type === t} onClick={() => { setType(t); go("idea"); }} className="call-option text-paper/85 hover:text-paper">
                    {t} <ArrowUpRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {step === "idea" && (
          <motion.div key="idea" {...motionProps} className="call-layout">
            <form noValidate className="call-step" onSubmit={(e) => { e.preventDefault(); const err = validateEnquiry({ type, idea }, ["type", "idea"]); setErrors(err); if (!Object.keys(err).length) go("details"); }}>
              {back("type")}
              <div>
                <p className="call-label font-mono text-paper/55">{type.toUpperCase()}</p>
                <h3 className="font-display mt-1">TELL ME ABOUT YOUR IDEA.</h3>
              </div>
              <div className="call-form">
                <label htmlFor="call-idea" className="call-label font-mono text-paper/70">YOUR IDEA</label>
                <textarea id="call-idea" data-step-focus value={idea} onFocus={keepInView} onChange={(e) => setIdea(e.target.value)} aria-invalid={!!errors.idea} aria-describedby={errors.idea ? "call-idea-err" : undefined}
                  placeholder="Tell me what you're building, what you need help with, or the problem you're trying to solve..." className="call-field" />
                {errors.idea && <p id="call-idea-err" role="alert" className="call-error">{errors.idea}</p>}
              </div>
              <Button type="submit" className="call-send rounded-full bg-paper font-mono text-ink hover:bg-paper/90">CONTINUE <ArrowUpRight aria-hidden="true" /></Button>
            </form>
          </motion.div>
        )}
        {step === "details" && (
          <motion.div key="details" {...motionProps} className="call-layout">
            <form noValidate className="call-step" onSubmit={(e) => {
              e.preventDefault();
              const err = validateEnquiry({ type, idea, email });
              setErrors(err);
              if (Object.keys(err).length) { if (err.type) go("type"); else if (err.idea) go("idea"); return; }
              window.location.href = buildEnquiryMailto({ type, idea, name, email });
              setOpened(true);
            }}>
              {back("idea")}
              <div>
                <p className="call-label font-mono text-paper/55">{type.toUpperCase()}</p>
                <h3 className="font-display mt-1">HOW CAN I REACH YOU?</h3>
              </div>
              <div className="call-form">
                <label htmlFor="call-name" className="call-label font-mono text-paper/70">NAME <span className="text-paper/45">(OPTIONAL)</span></label>
                <input id="call-name" data-step-focus autoComplete="name" value={name} onFocus={keepInView} onChange={(e) => setName(e.target.value)} className="call-field" />
                <label htmlFor="call-email" className="call-label font-mono text-paper/70">EMAIL</label>
                <input id="call-email" type="email" inputMode="email" autoComplete="email" value={email} onFocus={keepInView} onChange={(e) => { setEmail(e.target.value); setOpened(false); }}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "call-email-err" : undefined} className="call-field" />
                {errors.email && <p id="call-email-err" role="alert" className="call-error">{errors.email}</p>}
              </div>
              <Button type="submit" className="call-send rounded-full bg-paper font-mono text-ink hover:bg-paper/90">SEND PROJECT ENQUIRY <ArrowUpRight aria-hidden="true" /></Button>
              <p className="call-note text-paper/55" role="status">
                {opened ? "Your email app should now be open with everything filled in. Press send there to deliver it." : "Opens your email app with these details filled in. You send it from there."}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
