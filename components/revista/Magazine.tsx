"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";
import { RevistaImagePage, RevistaTextPage } from "./RevistaPages";

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

// The site has no shared theme context/hook — Navigation.tsx just flips
// `document.documentElement.dataset.theme` directly on click, with no event
// of its own. A MutationObserver on that one attribute is the only way for
// this component to notice a toggle that happens while already on /revista.
function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const read = () => document.documentElement.dataset.theme === "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(read());
    const observer = new MutationObserver(() => setIsDark(read()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
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
// react-pageflip types onChangeState's event as `any` too — the real values
// are PageFlip's own FlippingState, confirmed in
// node_modules/page-flip/src/Flip/Flip.ts. "fold_corner" is the resting
// hover/peek state (see foldActive below); "user_fold" and "flipping" are
// an active drag/turn.
type FoldState = "user_fold" | "fold_corner" | "flipping" | "read";
interface ChangeStateEvent {
  data: FoldState;
}

export default function Magazine() {
  const { lang } = useLang();
  const tx = t[lang];
  const bookRef = useRef<FlipBookHandle | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const isDarkTheme = useIsDarkTheme();

  // A black outer/inner shadow barely registers against the near-black
  // dark-mode page background, so it needs more intensity there to read at
  // all — while on the light (paper-white) page a lower value already looks
  // convincingly heavy. Flat 0.55 (the library default) under-sold the fold
  // in both themes.
  const maxShadowOpacity = isDarkTheme ? 0.75 : 0.85;

  // StPageFlip's own cast shadow (outerShadow/innerShadow, driven by
  // maxShadowOpacity above) is computed from the same "progress" as the
  // fold's width — fine mid-drag, but the resting corner-peek hint
  // (showPageCorners, fold_corner state) fixes that progress to a tiny
  // sliver (fixedCornerSize = 50px in node_modules/page-flip/src/Flip/
  // Flip.ts, showCorner()), so the library's own shadow there is only a
  // few px wide and effectively invisible — confirmed by reading its
  // shadow.width formula, not guessed. .revista-corner-shadow is a second,
  // independent shadow anchored to the corner actually being turned,
  // visible whenever StPageFlip reports anything other than "read".
  const bookWrapRef = useRef<HTMLDivElement | null>(null);
  const lastClientXRef = useRef<number | null>(null);
  const [activeCorner, setActiveCorner] = useState<"left" | "right" | null>(null);

  // Lightweight, always-on position tracking (no React state, so no
  // re-renders) — just enough to know, the instant a fold starts, which
  // half of the book the pointer is on.
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      lastClientXRef.current = e.clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) lastClientXRef.current = e.touches[0].clientX;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // onChangeState's event only carries a state string, never which corner
  // (confirmed in Flip.ts/Settings.ts — PageState has no corner field), so
  // the corner is inferred from pointer position instead: which half of the
  // book the cursor/touch is on when the fold starts. Good enough since a
  // forward flip is always dragged from the right page's corner and a
  // backward one from the left, so the pointer doesn't cross the midline
  // mid-gesture.
  const handleChangeState = useCallback((e: ChangeStateEvent) => {
    if (e.data === "read") {
      setActiveCorner(null);
      return;
    }
    const wrap = bookWrapRef.current;
    const clientX = lastClientXRef.current;
    if (!wrap || clientX === null) return;
    const rect = wrap.getBoundingClientRect();
    setActiveCorner(clientX < rect.left + rect.width / 2 ? "left" : "right");
  }, []);

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

  // No cover, no closing page — just the projects, each a 2-page spread
  // (text + image). Projects with subProjects (elBulli, Mirazur) render a
  // single spread each, built from the parent's own fields only — their
  // tabs live on /proyectos.
  const pageCount = projects.length * 2;

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

  // Which project (1-based) the open spread belongs to — two StPageFlip
  // pages per project, so this is page-pair index, not the raw page number.
  const currentProjectIndex = Math.floor(currentPage / 2);

  const currentProjectTitle = useMemo(
    () => projects[currentProjectIndex]?.title[lang] ?? null,
    [currentProjectIndex, lang]
  );

  return (
    <div className="revista-stage" role="region" aria-label="Revista de proyectos">
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      <div className="revista-book-wrap" ref={bookWrapRef}>
        <div className="revista-sheen" aria-hidden="true" />
        <div
          className={`revista-corner-shadow revista-corner-shadow--left${activeCorner === "left" ? " is-active" : ""}`}
          aria-hidden="true"
        />
        <div
          className={`revista-corner-shadow revista-corner-shadow--right${activeCorner === "right" ? " is-active" : ""}`}
          aria-hidden="true"
        />
        {readyToMount && (
          <HTMLFlipBook
            // react-pageflip/StPageFlip constructs its PageFlip instance once
            // (guarded internally) and never re-reads props like
            // maxShadowOpacity after that — exactly the same one-shot-read
            // issue usePortrait already has above. Keying on the theme forces
            // React to unmount/remount HTMLFlipBook when it changes, so the
            // new maxShadowOpacity is actually picked up. startPage is read
            // from currentPage (instead of the fixed 0 below) so that remount
            // reopens on the same spread rather than jumping back to the start.
            key={isDarkTheme ? "dark" : "light"}
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
            maxShadowOpacity={maxShadowOpacity}
            showCover={false}
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            startPage={currentPage}
            onFlip={handleFlip}
            onChangeState={handleChangeState}
          >
            {projects.map((project) => [
              <RevistaTextPage key={`${project.id}-text`} project={project} lang={lang} />,
              <RevistaImagePage key={`${project.id}-image`} project={project} lang={lang} />,
            ])}
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
          {String(currentProjectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
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
