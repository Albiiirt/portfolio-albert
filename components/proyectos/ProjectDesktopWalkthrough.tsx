"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Dialog } from "@base-ui/react/dialog";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import type { Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project, DesktopWalkthroughStep } from "@/data/projects";

// All `src` thumbnails (both elBulli/Bullipedia and Turisme Jaén) share this
// fixed pixel size — real dimensions passed to next/image so it can reserve
// layout space before the file loads, then shown at `width: 100%; height:
// auto` so the real aspect ratio drives the rendered height (no cropping).
const FRAME_WIDTH = 1568;
const FRAME_HEIGHT = 755;
const FRAME_ASPECT = FRAME_WIDTH / FRAME_HEIGHT;

type ProjectPageTx = (typeof t)["es"]["projectPage"];

// Full-page screenshot pixel heights (at the shared 1568px width) for
// Turisme Jaén's `fullSrc` images — measured once with `sips -g pixelHeight`
// since diseñador's spec only asked for a new `fullSrc` data field, not a
// height field on DesktopWalkthroughStep. Passed to next/image as real
// width/height to avoid layout shift before each image loads in the
// lightbox. Falls back to FRAME_ASPECT for any src not listed here.
const FULL_PAGE_WIDTH = 1568;
const FULL_PAGE_HEIGHT: Record<string, number> = {
  "/mockups/jaen/full/01-portada-full.jpg": 8748,
  "/mockups/jaen/full/02-navegacion-full.jpg": 871,
  "/mockups/jaen/full/03-listado-full.jpg": 1776,
  "/mockups/jaen/full/04-planificador-full.jpg": 1200,
  "/mockups/jaen/full/05-ruta-full.jpg": 7313,
  "/mockups/jaen/full/06-ficha-full.jpg": 4362,
  "/mockups/jaen/full/07-microsite-full.jpg": 5533,
};

// Desktop counterpart of ProjectScreensShowcase: instead of a mobile-frame
// carousel, walks through steps as a full-bleed, straight vertical strip —
// one real, uncropped screenshot per step, each with its own subtle
// scroll-linked scale/parallax and (where the data specifies it) a synthetic
// cursor that animates to the step's point of interest on first view.
// Screens with `htmlSrc`/`fullSrc` get a small "view interactive/full page"
// pill in the corner that opens the real content in a lightbox.
export default function ProjectDesktopWalkthrough({
  project,
  steps,
  hideCaptions = false,
}: {
  project: Project;
  steps: DesktopWalkthroughStep[];
  // Hides the title/caption text next to each screen, leaving just the
  // screenshot. Default false keeps Bullipedia's title-above/caption-below
  // text; only Turisme Jaén's data sets this to true.
  hideCaptions?: boolean;
}) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;
  const reducedMotion = useReducedMotion();
  const isDesktopPointer = useIsDesktopPointer();

  if (!steps.length) return null;

  return (
    <section
      style={{
        background: project.gradient,
        padding: "var(--space-section-y) var(--space-section-x)",
      }}
    >
      <div className="site-content">
        <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem" }}>
          {tx.sectionLabels.screens}
        </p>
      </div>

      {/* Full-bleed strip — deliberately outside `site-content` (capped at
         1440px) so each screen can reach up to 1600px wide. */}
      <div className="walkthrough-strip">
        {steps.map((step, i) => (
          <WalkthroughScreen
            key={step.src}
            step={step}
            project={project}
            lang={lang}
            reducedMotion={!!reducedMotion}
            isDesktopPointer={isDesktopPointer}
            tx={tx}
            hideCaptions={hideCaptions}
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  );
}

// Mirrors CustomCursor's own touch-device detection (`pointer: fine`) so the
// scroll-transform and synthetic cursor — both meaningless without a real
// hover/mouse — turn off on the same devices CustomCursor already hides
// itself on, rather than reacting to viewport width. `useSyncExternalStore`
// (rather than a `useState` + `useEffect` pair) reads the real value on the
// client in one pass, with no server/client mismatch and no extra render.
const subscribeNoop = () => () => {};
function useIsDesktopPointer(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

// Fills {title} in a translated template string with the step's title.
function fillTitle(template: string, title: string): string {
  return template.replace("{title}", title);
}

// ── One screen of the strip: scroll-transform, media, caption, cursor, pill ──

function WalkthroughScreen({
  step,
  project,
  lang,
  reducedMotion,
  isDesktopPointer,
  tx,
  hideCaptions,
  priority,
}: {
  step: DesktopWalkthroughStep;
  project: Project;
  lang: Lang;
  reducedMotion: boolean;
  isDesktopPointer: boolean;
  tx: ProjectPageTx;
  hideCaptions: boolean;
  priority?: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ["start end", "end start"] });

  // Deliberately subtle: a slight shrink before the screen enters, settling
  // at full size once centered, plus a 48px-total vertical parallax. Scroll-
  // linked throughout — never `preventDefault`, never blocks the wheel.
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [24, -24]);

  // Reduced motion cancels the transform outright (fixed values, not just a
  // shorter one) — and, following CustomCursor's own convention, so does any
  // device without a real pointer, since neither hover nor scroll-linked
  // motion reads the same without a mouse.
  const disableTransform = reducedMotion || !isDesktopPointer;
  const scale = disableTransform ? 1 : scaleRaw;
  const y = disableTransform ? 0 : yRaw;

  const hasLightbox = Boolean(step.htmlSrc || step.fullSrc);
  const showCursor = Boolean(step.cursorTarget) && isDesktopPointer && !reducedMotion && !step.videoSrc;

  return (
    <div className="walkthrough-screen" ref={itemRef}>
      {!hideCaptions && (
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: project.accentColor,
            marginBottom: "1rem",
          }}
        >
          {step.title[lang]}
        </p>
      )}

      <motion.div className="walkthrough-screen-media" style={{ scale, y }}>
        {step.videoSrc ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              width={FRAME_WIDTH}
              height={FRAME_HEIGHT}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <source src={step.videoSrc} />
            </video>
            <span className="walkthrough-scroll-hint-pill walkthrough-video-pill">{tx.videoLabel}</span>
          </>
        ) : (
          <Image
            src={step.src}
            alt={step.alt[lang]}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            priority={priority}
            sizes="(max-width: 900px) 100vw, 1600px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        )}

        {showCursor && <SyntheticCursor target={step.cursorTarget!} />}

        {hasLightbox && <LightboxTrigger step={step} lang={lang} reducedMotion={reducedMotion} tx={tx} />}
      </motion.div>

      {!hideCaptions && (
        <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)", maxWidth: "640px", marginTop: "1.25rem" }}>
          {step.caption[lang]}
        </p>
      )}
    </div>
  );
}

// ── Synthetic cursor: animates once from a neutral point to `cursorTarget` ──

function SyntheticCursor({ target }: { target: { x: number; y: number } }) {
  // Starts centered, unless the target sits in the top half of the frame —
  // then it starts from the bottom-left corner instead, so the cursor never
  // has to cross over the point of interest on its way in.
  const start = target.y < 50 ? { x: 8, y: 92 } : { x: 50, y: 50 };
  const [rippleKey, setRippleKey] = useState(0);

  return (
    <motion.div
      aria-hidden="true"
      className="walkthrough-cursor"
      initial={{ left: `${start.x}%`, top: `${start.y}%`, opacity: 0 }}
      whileInView={{ left: `${target.x}%`, top: `${target.y}%`, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => setRippleKey((k) => k + 1)}
    >
      <span className="walkthrough-cursor-ring" />
      <span className="walkthrough-cursor-dot" />
      {rippleKey > 0 && (
        <motion.span
          key={rippleKey}
          className="walkthrough-cursor-ripple"
          initial={{ width: 32, height: 32, opacity: 1 }}
          animate={{ width: 56, height: 56, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}

// ── Lightbox: a small corner pill opens the real content, simple fade-in ──
// No shared-element morph (there's no collage card to morph from anymore) —
// just the backdrop and popup fading in centered, same iframe crossfade for
// Bullipedia and same scrollable full-page view for Turisme Jaén as before.

function LightboxTrigger({
  step,
  lang,
  reducedMotion,
  tx,
}: {
  step: DesktopWalkthroughStep;
  lang: Lang;
  reducedMotion: boolean;
  tx: ProjectPageTx;
}) {
  const [open, setOpen] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const actionsRef = useRef<{ unmount: () => void; close: () => void } | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // `initialFocus={closeBtnRef}` below should be enough on its own, but
  // real-browser testing showed the iframe still ending up as
  // `document.activeElement` right after opening. Force it explicitly once
  // the popup is mounted — this plain effect runs after Base UI's own
  // focus-management layout effect, so it always gets the last word.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Reset the iframe/static-image crossfade whenever `open` flips, computed
  // during render (not an effect) per React's "adjusting state when a prop
  // changes" pattern. Reduced motion shows the iframe immediately, since
  // there's no popup-fade completion signal worth waiting on.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setIframeVisible(false);
    else if (reducedMotion) setIframeVisible(true);
  }

  const badgeLabel = step.htmlSrc ? tx.interactivePreviewBadge : tx.fullPageBadge;
  const dialogAriaLabel = fillTitle(tx.lightboxAriaLabel, step.title[lang]);
  const crossfadeMs = closing ? 100 : 150;

  // Closing runs in reverse: fade the live iframe out first so only the
  // static screenshot is ever visible mid-flight, THEN let the popup fade
  // out (Dialog handles the backdrop fade in parallel). Reduced motion skips
  // the delay — there's no motion to protect the iframe from.
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

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} modal>
      <Dialog.Trigger
        className="walkthrough-lightbox-trigger"
        aria-label={`${badgeLabel} — ${step.title[lang]}`}
      >
        {badgeLabel}
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
                <motion.div
                  className="walkthrough-popup"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reducedMotion ? { duration: 0.12, ease: "linear" } : { duration: 0.25, ease: "easeOut" }}
                  onAnimationComplete={() => {
                    if (open) setIframeVisible(true);
                  }}
                />
              }
            >
              <div className="walkthrough-frame">
                <span className="walkthrough-badge">{badgeLabel}</span>
                <Dialog.Close ref={closeBtnRef} className="walkthrough-close-btn" aria-label={tx.closeLightbox}>
                  <CloseIcon />
                </Dialog.Close>

                {step.htmlSrc ? (
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
                ) : (
                  <FullPageScrollContent step={step} lang={lang} tx={tx} />
                )}
              </div>
            </Dialog.Popup>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
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

// Points at the scroll hint pill in the full-page-screenshot lightbox.
function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 5L7 10L12 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Scrollable full-page screenshot shown in the lightbox when a step has
// `fullSrc` but no `htmlSrc` (Turisme Jaén) — replaces the fixed-height
// crossfade (Image + iframe) used for the interactive case. The image is
// rendered at its real aspect ratio (width 100%, height auto) instead of a
// cropped `fill`, so the whole page is visible by scrolling.
function FullPageScrollContent({
  step,
  lang,
  tx,
}: {
  step: DesktopWalkthroughStep;
  lang: Lang;
  tx: ProjectPageTx;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hintVisible, setHintVisible] = useState(true);

  // Recalculated on scroll and on the image's `onLoad` (its real height,
  // and so whether it overflows the panel at all, isn't known before that).
  // Starts visible, matching "visible al abrir".
  const recalcHint = () => {
    const el = scrollRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setHintVisible(remaining > 24);
  };

  const fullSrc = step.fullSrc!;
  const fullHeight = FULL_PAGE_HEIGHT[fullSrc] ?? Math.round(FULL_PAGE_WIDTH / FRAME_ASPECT);

  return (
    <div className="walkthrough-frame-content walkthrough-frame-content--scroll" ref={scrollRef} onScroll={recalcHint}>
      <Image
        src={fullSrc}
        alt={step.alt[lang]}
        width={FULL_PAGE_WIDTH}
        height={fullHeight}
        sizes="(max-width: 900px) 100vw, 92vw"
        style={{ width: "100%", height: "auto", display: "block" }}
        onLoad={recalcHint}
      />
      <div className="walkthrough-scroll-hint" aria-hidden="true" style={{ opacity: hintVisible ? 1 : 0 }}>
        <span className="walkthrough-scroll-hint-pill">
          {tx.scrollHint}
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
}
