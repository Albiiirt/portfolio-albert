"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";
import { RevistaClosing, RevistaCover, RevistaImagePage, RevistaTextPage } from "./RevistaPages";

// StPageFlip reads the DOM/canvas directly — never render it on the server.
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

const MOBILE_QUERY = "(max-width: 900px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// StPageFlip sizes itself from fixed width/height props, not from CSS — so
// the "contenedor con altura acotada ≤85vh" rule needs the actual viewport
// height, re-measured on resize/rotate.
function useViewportHeight() {
  const [height, setHeight] = useState(860);
  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return height;
}

// Minimal shape of what we actually call on the StPageFlip instance/ref —
// react-pageflip itself only types these as `any`.
interface PageFlipController {
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
}
interface FlipBookHandle {
  pageFlip: () => PageFlipController;
}
interface FlipEvent {
  data: number;
}

export default function Magazine() {
  const { lang } = useLang();
  const tx = t[lang];
  const bookRef = useRef<FlipBookHandle | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const viewportHeight = useViewportHeight();
  const bookMaxHeight = Math.max(420, Math.min(860, Math.round(viewportHeight * 0.85)));

  // One project = one spread (text page + image page). Projects with
  // subProjects (elBulli, Mirazur) still render a single spread here, built
  // from the parent's own fields only — their tabs live on /proyectos.
  const pageCount = projects.length * 2 + 2; // cover + spreads + colophon

  const handleFlip = useCallback((e: FlipEvent) => {
    setCurrentPage(e.data);
  }, []);

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  // Keyboard support — StPageFlip doesn't ship this on its own.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  // First-use "this can be grabbed" hint: curl the front cover's corner once,
  // on a plain CSS animation, never touching the real StPageFlip canvas.
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setShowHint(true), 900);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const flippingTime = reducedMotion ? 50 : 700;

  const currentProjectTitle = useMemo(() => {
    if (currentPage === 0) return null;
    if (currentPage === pageCount - 1) return tx.revista.closingHeading;
    const projectIndex = Math.floor((currentPage - 1) / 2);
    return projects[projectIndex]?.title[lang] ?? null;
  }, [currentPage, pageCount, lang, tx]);

  return (
    <div
      className="revista-stage"
      role="region"
      aria-label="Revista de proyectos"
    >
      <div className="revista-book-wrap">
        {!reducedMotion && (
          <div
            className={`revista-hint-corner${showHint ? " is-playing" : ""}`}
            aria-hidden="true"
            onAnimationEnd={() => setShowHint(false)}
          />
        )}
        <HTMLFlipBook
          ref={bookRef}
          className="revista-flipbook"
          style={{}}
          width={560}
          height={bookMaxHeight}
          size="stretch"
          // StPageFlip also applies minWidth as a literal CSS min-width on
          // its own wrapper (times 1 when usePortrait, see page-flip's
          // UI.ts) — keep this at a value every real phone clears. Portrait
          // mode itself is still driven by usePortrait={isMobile} below;
          // StPageFlip switches to single-page under ~560px of its own
          // accord, which covers every phone width.
          minWidth={280}
          maxWidth={560}
          minHeight={420}
          maxHeight={bookMaxHeight}
          drawShadow
          flippingTime={flippingTime}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.55}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          startPage={0}
          onFlip={handleFlip}
        >
          <RevistaCover lang={lang} />
          {projects.map((project) => [
            <RevistaTextPage key={`${project.id}-text`} project={project} lang={lang} />,
            <RevistaImagePage key={`${project.id}-image`} project={project} lang={lang} />,
          ])}
          <RevistaClosing lang={lang} />
        </HTMLFlipBook>
      </div>

      <div className="revista-controls">
        <button
          type="button"
          className="btn-ghost revista-arrow"
          aria-label={tx.revista.prevPage}
          onClick={goPrev}
          disabled={currentPage === 0}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 2.5L4.5 8l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="revista-counter" aria-hidden="true">
          {String(currentPage + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
        </span>

        <button
          type="button"
          className="btn-ghost revista-arrow"
          aria-label={tx.revista.nextPage}
          onClick={goNext}
          disabled={currentPage === pageCount - 1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 2.5L11.5 8L6 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {currentProjectTitle}
      </p>
    </div>
  );
}
