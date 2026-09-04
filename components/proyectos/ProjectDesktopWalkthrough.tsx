"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";
import { Dialog } from "@base-ui/react/dialog";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import type { Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project, DesktopWalkthroughStep } from "@/data/projects";

const FRAME_ASPECT = 1568 / 755;

// Spring used for the shared-element (layoutId) morph between a collage
// card and its lightbox — deliberately snappier than the collage's own
// scroll-entrance spring below, which is untouched.
const MORPH_SPRING = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };

type ProjectPageTx = (typeof t)["es"]["projectPage"];

type CollageLayout = {
  widthPct: number;
  left?: number;
  right?: number;
  top: number;
  rotate: number;
  z: number;
  restShadow: string;
  hoverShadow: string;
};

// Collage positions/rotations for the ≥900px "overlapping deck" layout.
// Values from diseñador's spec, used as-is — no Chrome MCP in this session
// to eyeball/tune overlap, spring feel or shadow steps against the real page.
const COLLAGE_LAYOUT: CollageLayout[] = [
  { widthPct: 46, left: 6, top: 30, rotate: -2, z: 40, restShadow: "0 20px 60px rgba(0,0,0,0.55)", hoverShadow: "0 26px 72px rgba(0,0,0,0.6)" },
  { widthPct: 34, right: 4, top: 6, rotate: 3, z: 30, restShadow: "0 14px 40px rgba(0,0,0,0.45)", hoverShadow: "0 20px 60px rgba(0,0,0,0.55)" },
  { widthPct: 30, right: 18, top: 48, rotate: -4, z: 20, restShadow: "0 10px 28px rgba(0,0,0,0.4)", hoverShadow: "0 14px 40px rgba(0,0,0,0.45)" },
  { widthPct: 26, left: 42, top: 0, rotate: 5, z: 10, restShadow: "0 8px 20px rgba(0,0,0,0.35)", hoverShadow: "0 10px 28px rgba(0,0,0,0.4)" },
];

// Desktop counterpart of ProjectScreensShowcase: instead of a mobile-frame
// carousel, walks through steps as browser-chrome screenshots.
// - ≥900px: the 4 frames are laid out as an overlapping, rotated collage
//   ("deck of cards" spring entrance, hover/focus lift per card). Clicking a
//   card opens a lightbox with the real, interactive HTML page in an iframe.
// - <900px: unchanged stacked list, one frame per scroll block — each frame
//   opens the same lightbox as a fullscreen slide-up sheet.
export default function ProjectDesktopWalkthrough({
  project,
  steps,
}: {
  project: Project;
  steps: DesktopWalkthroughStep[];
}) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;
  const reducedMotion = useReducedMotion();

  if (!steps.length) return null;

  // The ≥900px collage only has fixed positions for COLLAGE_LAYOUT.length
  // cards. With more steps than that, reusing positions via modulo would
  // stack a later card exactly on top of an earlier one — so beyond that
  // count we skip the collage entirely and always use the stacked list
  // (full viewport width, one frame per scroll block) instead.
  const useCollage = steps.length <= COLLAGE_LAYOUT.length;

  return (
    <section
      style={{
        background: project.gradient,
        padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div className="site-content">
        <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem" }}>
          {tx.sectionLabels.screens}
        </p>

        {useCollage && <WalkthroughCollage steps={steps} lang={lang} reducedMotion={!!reducedMotion} tx={tx} />}

        <div
          className="walkthrough-list"
          style={{ flexDirection: "column", gap: "clamp(3rem, 6vh, 5rem)", ...(useCollage ? null : { display: "flex" }) }}
        >
          {steps.map((step, i) => {
            const textMotion = reducedMotion
              ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, y: 36 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.35 },
                };
            const frameMotion = reducedMotion
              ? { initial: { opacity: 1, scale: 1, y: 0 }, animate: { opacity: 1, scale: 1, y: 0 } }
              : {
                  initial: { opacity: 0, y: 36, scale: 0.97 },
                  whileInView: { opacity: 1, y: 0, scale: 1 },
                  viewport: { once: true, amount: 0.35 },
                };

            // Odd steps (2nd, 4th, 6th... 0-based i = 1, 3, 5) mirror the
            // column order — image on the left, text on the right — so the
            // stacked list doesn't read as one long, monotonous column.
            const isMirrored = i % 2 === 1;

            return (
              <div
                key={step.src}
                className="proj-grid-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(2rem, 5vw, 4rem)",
                  alignItems: "center",
                }}
              >
                <motion.div {...textMotion} transition={{ duration: 0.6, ease: EASE }} style={{ order: isMirrored ? 2 : 1 }}>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      color: project.accentColor,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.title[lang]}
                  </p>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                    {step.caption[lang]}
                  </p>
                </motion.div>

                <motion.div
                  {...frameMotion}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                  style={{ minWidth: 0, order: isMirrored ? 1 : 2 }}
                >
                  <MobileFrameLightbox step={step} lang={lang} reducedMotion={!!reducedMotion} tx={tx} priority={i === 0} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── ≥900px collage stage ──

function WalkthroughCollage({
  steps,
  lang,
  reducedMotion,
  tx,
}: {
  steps: DesktopWalkthroughStep[];
  lang: Lang;
  reducedMotion: boolean;
  tx: ProjectPageTx;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setDims({ width: el.offsetWidth, height: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Only animate the "closed deck" entrance once we know the stage's real
  // pixel size — otherwise render frames straight in their resting spot.
  const canAnimateEntrance = !reducedMotion && dims !== null;

  return (
    <div className="walkthrough-stage">
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: "min(100%, 1100px)",
          height: "clamp(380px, 46vw, 620px)",
          margin: "0 auto",
        }}
      >
        {steps.map((step, i) => {
          const layout = COLLAGE_LAYOUT[i % COLLAGE_LAYOUT.length];
          const restState = {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: layout.rotate,
            zIndex: layout.z,
            boxShadow: layout.restShadow,
          };

          // Hover/focus lift carries its own immediate tween so it never
          // waits on (or gets overridden by) the entrance spring below.
          const hoverTransitionTween = { duration: 0.22, ease: "easeOut" as const };
          const hoverTarget = reducedMotion
            ? { zIndex: 99, boxShadow: layout.hoverShadow, transition: hoverTransitionTween }
            : { y: -10, scale: 1.04, zIndex: 99, boxShadow: layout.hoverShadow, transition: hoverTransitionTween };

          const entranceTransition = { type: "spring" as const, stiffness: 120, damping: 18, mass: 0.9, delay: i * 0.09 };
          const entranceProps = canAnimateEntrance
            ? {
                initial: {
                  opacity: 0,
                  ...computeInitialOffset(dims!, layout),
                  scale: 0.82,
                  rotate: 0,
                  zIndex: layout.z,
                  boxShadow: layout.restShadow,
                },
                whileInView: restState,
                viewport: { once: true, amount: 0.3 },
              }
            : { initial: restState, animate: restState };

          return (
            <CollageCardLightbox
              key={step.src}
              step={step}
              i={i}
              layout={layout}
              lang={lang}
              reducedMotion={reducedMotion}
              tx={tx}
              entranceProps={entranceProps}
              hoverTarget={hoverTarget}
              entranceTransition={canAnimateEntrance ? entranceTransition : undefined}
            />
          );
        })}
      </div>

      <p className="collage-legend">
        {steps.map((step, i) => (
          <span key={step.src}>
            {step.title[lang]}
            {i < steps.length - 1 ? "  —  " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}

function computeInitialOffset(
  dims: { width: number; height: number },
  layout: CollageLayout,
): { x: number; y: number } {
  const w = (layout.widthPct / 100) * dims.width;
  const h = w / FRAME_ASPECT;
  const left = layout.left != null ? (layout.left / 100) * dims.width : dims.width - ((layout.right ?? 0) / 100) * dims.width - w;
  const top = (layout.top / 100) * dims.height;
  const centerX = left + w / 2;
  const centerY = top + h / 2;
  return { x: dims.width / 2 - centerX, y: dims.height / 2 - centerY };
}

// Fills {title} in a translated template string with the step's title.
function fillTitle(template: string, title: string): string {
  return template.replace("{title}", title);
}

// ── Desktop (≥900px) collage card: trigger + shared-element lightbox ──

type MotionDivProps = React.ComponentProps<typeof motion.div>;

function CollageCardLightbox({
  step,
  i,
  layout,
  lang,
  reducedMotion,
  tx,
  entranceProps,
  hoverTarget,
  entranceTransition,
}: {
  step: DesktopWalkthroughStep;
  i: number;
  layout: CollageLayout;
  lang: Lang;
  reducedMotion: boolean;
  tx: ProjectPageTx;
  entranceProps: Partial<MotionDivProps>;
  hoverTarget: TargetAndTransition;
  entranceTransition?: Transition;
}) {
  const [open, setOpen] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const actionsRef = useRef<{ unmount: () => void; close: () => void } | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Real DOM node behind the trigger — used to force genuine browser focus
  // on mouse click (see onPointerDown below) so Base UI has something real
  // to return focus to when the dialog closes.
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // `initialFocus={closeBtnRef}` below should be enough on its own, but
  // real-browser testing showed the iframe still ending up as
  // `document.activeElement` right after opening (verified: Escape then
  // never reached this document, since it landed inside the iframe's own).
  // Force it explicitly once the popup is mounted — this is a plain effect,
  // so it runs after Base UI's own focus-management layout effect, meaning
  // it always gets the last word.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Reset the iframe/static-image crossfade whenever `open` flips, computed
  // during render (not an effect) per React's "adjusting state when a prop
  // changes" pattern — avoids an extra commit-then-effect render pass.
  // Reduced motion skips the layoutId morph entirely, so there's no
  // spring-complete signal to wait for — show the iframe as soon as the
  // (instant, opacity-only) popup is open.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setIframeVisible(false);
    else if (reducedMotion) setIframeVisible(true);
  }

  const layoutId = reducedMotion ? undefined : `walkthrough-frame-${step.src}`;
  const expandLabel = fillTitle(tx.expandLabel, step.title[lang]);
  const ariaLabel = `${expandLabel} — ${step.caption[lang]}`;
  const dialogAriaLabel = fillTitle(tx.lightboxAriaLabel, step.title[lang]);
  const crossfadeMs = closing ? 100 : 150;

  // Closing runs in reverse of the opening morph: fade the live iframe out
  // first so only the static screenshot is ever visible mid-flight, THEN
  // let the frame spring back to the card (Dialog handles the backdrop
  // fade in parallel). Reduced motion skips the delay — there's no motion
  // to protect the iframe from.
  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setOpen(true);
      return;
    }
    if (reducedMotion || !iframeVisible) {
      setOpen(false);
      return;
    }
    setClosing(true);
    setIframeVisible(false);
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 100);
  }

  // No interactive mockup behind this step — keep the card's collage
  // position and entrance animation, but drop every affordance that would
  // promise a click does something: no Dialog.Trigger, no expand icon, no
  // hover/focus lift, no "interactive" badge. All the hooks above still ran
  // unconditionally, so this early return stays consistent across renders.
  if (!step.htmlSrc) {
    return (
      <motion.div
        {...entranceProps}
        transition={entranceTransition}
        className="collage-frame-static"
        style={{
          position: "absolute",
          width: `${layout.widthPct}%`,
          top: `${layout.top}%`,
          left: layout.left != null ? `${layout.left}%` : undefined,
          right: layout.right != null ? `${layout.right}%` : undefined,
        }}
      >
        <BrowserFrameInner src={step.src} alt={step.alt[lang]} priority={i === 0} />
      </motion.div>
    );
  }

  // Three ways to close, all wired: the X button (Dialog.Close below),
  // clicking the backdrop (Base UI's own outside-press dismissal — more
  // robust than a hand-rolled `event.target === event.currentTarget` check,
  // since it uses real hit-testing rather than DOM event-target identity),
  // and Escape (Base UI's default dismiss binding). Escape is NOT reliable
  // here once focus moves inside the iframe — it's a separate document, so
  // the key never reaches this page — which is why the X button, not
  // Escape, is the primary/guaranteed way to close.
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} modal>
      <Dialog.Trigger
        nativeButton={false}
        aria-label={ariaLabel}
        render={
          <motion.div
            {...entranceProps}
            ref={triggerRef}
            // A `role="button"` div isn't reliably auto-focused by every
            // browser on mouse click the way a native <button> is (that's
            // what let real-browser testing catch focus landing on an
            // unrelated tabpanel after closing) — force real DOM focus here
            // so Base UI has this exact card to return to when it closes.
            onPointerDown={() => triggerRef.current?.focus()}
            whileHover={hoverTarget}
            whileFocus={hoverTarget}
            transition={entranceTransition}
            className="collage-frame"
            style={{
              position: "absolute",
              width: `${layout.widthPct}%`,
              top: `${layout.top}%`,
              left: layout.left != null ? `${layout.left}%` : undefined,
              right: layout.right != null ? `${layout.right}%` : undefined,
            }}
          />
        }
      >
        <BrowserFrameInner src={step.src} alt={step.alt[lang]} priority={i === 0} layoutId={layoutId} showExpandIcon />
      </Dialog.Trigger>

      <Dialog.Portal keepMounted>
        <AnimatePresence>
          {open && (
            <Dialog.Backdrop
              key="backdrop"
              render={
                <motion.div
                  className="walkthrough-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reducedMotion ? { duration: 0.12, ease: "linear" } : { duration: 0.25, ease: "easeOut" }}
                />
              }
            />
          )}
        </AnimatePresence>

        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          {open && (
            <Dialog.Popup
              key="popup"
              initialFocus={closeBtnRef}
              aria-label={dialogAriaLabel}
              aria-modal="true"
              render={
                // No visual change on this outer positioning shell — it only
                // needs SOME exit variant so AnimatePresence keeps the whole
                // subtree mounted while the nested badge/close-button fades
                // and the shared-element frame's own spring below play out
                // (AnimatePresence waits for every exiting descendant, not
                // just this one, before calling onExitComplete).
                <motion.div
                  className="walkthrough-popup"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.01 }}
                />
              }
            >
              <motion.span
                className="walkthrough-badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.1 }}
              >
                {tx.interactivePreviewBadge}
              </motion.span>

              <motion.div
                layoutId={layoutId}
                className="walkthrough-frame"
                initial={reducedMotion ? { opacity: 0 } : undefined}
                animate={reducedMotion ? { opacity: 1 } : undefined}
                exit={reducedMotion ? { opacity: 0 } : undefined}
                transition={reducedMotion ? { duration: 0.12, ease: "linear" } : MORPH_SPRING}
                onLayoutAnimationComplete={() => {
                  if (open) setIframeVisible(true);
                }}
              >
                <ChromeBar
                  rightSlot={
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.1 }}
                    >
                      <Dialog.Close ref={closeBtnRef} className="walkthrough-close-btn" aria-label={tx.closeLightbox}>
                        <CloseIcon />
                      </Dialog.Close>
                    </motion.span>
                  }
                />
                <div className="walkthrough-frame-content">
                  <Image
                    src={step.src}
                    alt={step.alt[lang]}
                    fill
                    sizes="92vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                      opacity: iframeVisible ? 0 : 1,
                      transition: `opacity ${crossfadeMs}ms ease-out`,
                    }}
                  />
                  <iframe
                    src={step.htmlSrc}
                    title={step.title[lang]}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      opacity: iframeVisible ? 1 : 0,
                      transition: `opacity ${crossfadeMs}ms ease-out`,
                    }}
                  />
                </div>
              </motion.div>
            </Dialog.Popup>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ── <900px list frame: trigger + fullscreen slide-up lightbox ──
// No shared-element morph here by spec — the collage is hidden below 900px
// anyway, so this is reached only through the stacked list.

function MobileFrameLightbox({
  step,
  lang,
  reducedMotion,
  tx,
  priority,
}: {
  step: DesktopWalkthroughStep;
  lang: Lang;
  reducedMotion: boolean;
  tx: ProjectPageTx;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const actionsRef = useRef<{ unmount: () => void; close: () => void } | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // Real DOM node behind the trigger — used to force genuine browser focus
  // on tap/click (see onPointerDown below) so Base UI has something real to
  // return focus to when the sheet closes.
  const triggerRef = useRef<HTMLDivElement>(null);

  const expandLabel = fillTitle(tx.expandLabel, step.title[lang]);
  const ariaLabel = `${expandLabel} — ${step.caption[lang]}`;
  const dialogAriaLabel = fillTitle(tx.lightboxAriaLabel, step.title[lang]);

  // `initialFocus={closeBtnRef}` below should be enough on its own, but
  // real-browser testing on the desktop lightbox showed the iframe still
  // stealing initial focus — force it explicitly here too, once mounted.
  // A plain effect runs after Base UI's own focus-management layout effect,
  // so it always gets the last word.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // No interactive mockup behind this step (e.g. Turisme Jaén, screenshots
  // only) — render the same browser-chrome frame with no click affordance:
  // no Dialog.Trigger, no pointer cursor/focus ring, no lightbox at all.
  // Showing any of that would promise an interaction that isn't there.
  if (!step.htmlSrc) {
    return <BrowserFrame src={step.src} alt={step.alt[lang]} priority={priority} />;
  }

  // Two close paths here (X button, Escape) — no visible/clickable backdrop
  // by spec, since the sheet already covers the full viewport, so there's no
  // "outside" area left to tap. See CollageCardLightbox for the longer note;
  // Escape still won't fire once focus is inside the iframe's own document,
  // which is why the X button is the one guaranteed way to close.
  return (
    <Dialog.Root open={open} onOpenChange={setOpen} actionsRef={actionsRef} modal>
      <Dialog.Trigger
        nativeButton={false}
        aria-label={ariaLabel}
        render={
          <div
            ref={triggerRef}
            // A `role="button"` div isn't reliably auto-focused by every
            // browser on click the way a native <button> is — force real
            // DOM focus here so Base UI has this exact card to return to.
            onPointerDown={() => triggerRef.current?.focus()}
            className="mobile-frame-trigger"
          />
        }
      >
        <BrowserFrame src={step.src} alt={step.alt[lang]} priority={priority} />
      </Dialog.Trigger>

      <Dialog.Portal keepMounted>
        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          {open && (
            <Dialog.Popup
              key="popup"
              initialFocus={closeBtnRef}
              aria-label={dialogAriaLabel}
              aria-modal="true"
              render={
                <motion.div
                  className="walkthrough-sheet"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 1, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 1, y: "100%" }}
                  transition={reducedMotion ? { duration: 0.01, ease: "linear" } : { duration: 0.28, ease: EASE }}
                />
              }
            >
              <ChromeBar
                rightSlot={
                  <Dialog.Close ref={closeBtnRef} className="walkthrough-close-btn" aria-label={tx.closeLightbox}>
                    <CloseIcon />
                  </Dialog.Close>
                }
              />
              <span className="walkthrough-badge">{tx.interactivePreviewBadge}</span>
              <div className="walkthrough-frame-content">
                <iframe
                  src={step.htmlSrc}
                  title={step.title[lang]}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
              </div>
            </Dialog.Popup>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ── Shared bits: chrome bar, close/expand icons, browser-chrome frame ──

// Chrome bar — decorative browser window furniture by default (just the 3
// dots; no fake URL to keep up to date), with an optional real close button
// slotted into the right side for the lightbox. That slot is intentionally
// NOT covered by aria-hidden, so the close button stays reachable to
// assistive tech.
function ChromeBar({ rightSlot }: { rightSlot?: React.ReactNode }) {
  return (
    <div
      className="browser-chrome-bar"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        borderTopLeftRadius: "11px",
        borderTopRightRadius: "11px",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: 14, display: "flex", gap: 6 }}>
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "block" }}
          />
        ))}
      </div>

      {rightSlot ? (
        <div style={{ position: "absolute", right: 14, display: "flex", alignItems: "center" }}>{rightSlot}</div>
      ) : null}
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 1H13V5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 1L8 6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 13H1V9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 13L6 8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4L12 12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 4L4 12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BrowserFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div
      style={{
        width: "clamp(560px, 62vw, 960px)",
        maxWidth: "100%",
        background: "rgba(255,255,255,0.09)",
        border: "1.5px solid rgba(255,255,255,0.16)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 20px rgba(0,0,0,0.5)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <BrowserFrameInner src={src} alt={alt} priority={priority} />
    </div>
  );
}

// Chrome bar + content panel only, sized to fill whatever container wraps it.
// Reused as-is by both the fixed-width list frame and the percentage-width
// collage frame — same visuals, different outer sizing strategy. Renders as
// a motion.div throughout (layoutId is undefined outside the collage, so it
// behaves like a plain div — no wasted animation wiring on the list variant).
function BrowserFrameInner({
  src,
  alt,
  priority,
  layoutId,
  showExpandIcon,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  layoutId?: string;
  showExpandIcon?: boolean;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.09)",
        border: "1.5px solid rgba(255,255,255,0.16)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 20px rgba(0,0,0,0.5)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <ChromeBar />

      {/* Content panel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1568 / 755",
          background: "#fff",
          borderBottomLeftRadius: "11px",
          borderBottomRightRadius: "11px",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 900px) 92vw, 46vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        {showExpandIcon ? (
          <span className="collage-expand-icon" aria-hidden="true">
            <ExpandIcon />
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
