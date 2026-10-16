"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";
import { IDENTITY_PROJECT } from "./helpers";
import { RevistaClosing, RevistaImagePage, RevistaTextPage } from "./RevistaPages";

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
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  // react-pageflip only ever constructs its underlying PageFlip instance
  // once (guarded by `if (!pageFlip.current)` in its own source) — props
  // like usePortrait are read on that first construction and never re-read
  // on later prop changes. Mounting HTMLFlipBook before isMobile's own
  // effect has resolved would freeze it as landscape-only, even on a phone.
  // Holding the mount one tick (both effects fire in the same post-commit
  // flush, isMobile's hook declared first above) guarantees usePortrait is
  // already correct the one time the library reads it.
  const [readyToMount, setReadyToMount] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReadyToMount(true);
  }, []);

  // Page 0/1 is the opening identity spread (Albert Canadas + the first
  // project's own photo, see IDENTITY_PROJECT in helpers.ts); every real
  // project — including that first one — still gets its own full spread
  // right after, so the 01–07 numbering stays intact. Projects with
  // subProjects (elBulli, Mirazur) render a single spread each, built from
  // the parent's own fields only — their tabs live on /proyectos.
  const pageCount = 2 + projects.length * 2 + 1; // identity spread + project spreads + colophon

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

  const flippingTime = reducedMotion ? 50 : 700;

  const currentProjectTitle = useMemo(() => {
    if (currentPage <= 1) return IDENTITY_PROJECT.title[lang];
    if (currentPage === pageCount - 1) return tx.revista.closingHeading;
    const projectIndex = Math.floor((currentPage - 2) / 2);
    return projects[projectIndex]?.title[lang] ?? null;
  }, [currentPage, pageCount, lang, tx]);

  return (
    <div className="revista-stage" role="region" aria-label="Revista de proyectos">
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      <div className="revista-book-wrap">
        <div className="revista-sheen" aria-hidden="true" />
        {readyToMount && (
          <HTMLFlipBook
            ref={bookRef}
            className="revista-flipbook"
            style={{}}
            width={720}
            height={480}
            size="stretch"
            // Bounds must cover the real rendered range of a single 3:2
            // page across breakpoints — from the mobile single-page book
            // (as narrow as ~345x230 on a small phone) up to a large
            // desktop two-page spread (a single page up to ~880x590). The
            // old 480–900 / 320–600 bounds were sized for the previous
            // portrait ratio and were too large on the low end: StPageFlip
            // "stretch" sizing refuses to shrink below minWidth/minHeight,
            // so on mobile it forced pages wider than the CSS container,
            // overflowing the viewport.
            minWidth={340}
            maxWidth={920}
            minHeight={227}
            maxHeight={613}
            drawShadow
            flippingTime={flippingTime}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize
            maxShadowOpacity={0.55}
            showCover={false}
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            startPage={0}
            onFlip={handleFlip}
          >
            <RevistaTextPage
              project={IDENTITY_PROJECT}
              lang={lang}
              linkOverride={{ href: "/proyectos", label: tx.revista.closingLink }}
            />
            <RevistaImagePage project={projects[0]} lang={lang} />
            {projects.map((project) => [
              <RevistaTextPage key={`${project.id}-text`} project={project} lang={lang} />,
              <RevistaImagePage key={`${project.id}-image`} project={project} lang={lang} />,
            ])}
            <RevistaClosing lang={lang} />
          </HTMLFlipBook>
        )}
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
