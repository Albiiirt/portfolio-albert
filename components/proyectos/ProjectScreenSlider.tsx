/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import FadeInView from "@/components/FadeInView";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import type { LocalizedText } from "@/data/projects";

// Screen evidence for projects whose only material is full-page desktop
// exports — Turisme Jaén (25 of them) and GNOSS (6), see JaenScreensSlider
// and GnossScreensSlider for the data. Built for Jaén first (Albert,
// 2026-10-17) and generalised when GNOSS turned out to need the same thing.
//
// Those exports are 2880/3840px wide and up to 21428px tall, so neither of
// the two patterns already in the repo fits:
// ProjectDeviceShowcase crops to fixed boxes (it was rendering zoomed-in
// fragments of a page at 1:1) and Madrid's MobileRowBlock shows whole shots
// at natural height, which here would mean a single image over 10000px tall.
//
// Instead each page is shown inside a browser window at a fixed 16:10
// viewport and travels *inside* it, so a 21000px page costs the same vertical
// space on the portfolio as a short one. Carousel + filmstrip for the volume,
// per Albert's "busca maneras de mostrarlo todo, sliders por ejemplo".
//
// The window pans on its own rather than scrolling natively. A native inner
// scroller was tried first and traps the wheel: with the cursor over the
// frame, the visitor has to run through all 8036px of the homepage before the
// portfolio itself resumes scrolling. Panning on a loop captures no input at
// all, and it matches what the Madrid case study does one section away, where
// the evidence is autoplaying video.
//
// Sources are 1440px-wide WebP under the caller's `basePath`, with 16:10
// top-crop thumbnails in `<basePath>/thumbs` for the filmstrip.
//
// Plain <img>, not next/image: these decode to as much as 1440x8036, only one
// is mounted at a time to keep that bounded, and they are already sized and
// compressed for the one width they are displayed at, so the optimizer would
// only add a re-encode of a very large source on every cold request.
const DARK_BG = "#12100e";
const PANEL_BG = "#1c1a17";
const CAPTION_LIGHT = "#cfc9bd";
// The browser window's own proportions. Started at 16:10 and cut to 75% of
// that height at Albert's call (2026-10-17) — a full-width 16:10 window ate
// most of the viewport, which made the frame read as the page rather than as
// evidence inside it. A page shorter than this (the planner screens, 1440x800)
// gets a window its own height instead, so it is never letterboxed — see
// `frameAspect`.
const VIEWPORT_ASPECT = 16 / 7.5;

// The filmstrip keeps the 16:10 of the generated thumbnails, so shortening the
// window above does not re-crop them.
const THUMB_ASPECT = 16 / 10;

export type ProjectScreen = { slug: string; w: number; h: number; caption: LocalizedText };

const frameAspect = (s: ProjectScreen) => Math.max(s.w / s.h, VIEWPORT_ASPECT);
// How far the image has to travel, as a share of its own height: the part of
// it that does not fit the window. (Percentages on translateY resolve against
// the element's own height, so this needs no measured pixels.)
const travelPct = (s: ProjectScreen) => Math.max(0, (1 - s.w / s.h / frameAspect(s)) * 100);

// Roughly constant reading speed rather than a fixed duration, so the
// homepage does not fly past while a short page crawls. Held at both ends so
// the top and the footer each get a beat.
const panSeconds = (s: ProjectScreen) => Math.min(26, Math.max(7, (travelPct(s) / 100) * (s.h / s.w) * 9));

const UI = {
  prev: { es: "Pantalla anterior", en: "Previous screen", ca: "Pantalla anterior" },
  next: { es: "Pantalla siguiente", en: "Next screen", ca: "Pantalla següent" },
} satisfies Record<string, LocalizedText>;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M8 1L3 6l5 5" : "M4 1l5 5-5 5"}
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectScreenSlider({
  screens,
  eyebrow,
  basePath,
  accent,
  // Accent colour for the eyebrow. Defaults to `accent`, but a brand colour
  // that works as a surface can still fail as text on DARK_BG — GNOSS's
  // #0a66f2 is only 4.1:1 there — so a project can pass a lighter tone for
  // the text alone.
  accentText = accent,
  // Anchor for a hero CTA that scrolls here instead of linking out — Bicco has
  // no public deployment to link to.
  id,
}: {
  screens: ProjectScreen[];
  eyebrow: LocalizedText;
  basePath: string;
  accent: string;
  accentText?: string;
  id?: string;
}) {
  const { lang } = useLang();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const count = screens.length;
  const current = screens[active];
  const travel = travelPct(current);
  // Only the slide on screen animates, and never under reduced motion.
  const panning = travel > 0 && inView && !reducedMotion;

  const go = useCallback((next: number) => {
    setDirection(next > active ? 1 : -1);
    setActive(((next % count) + count) % count);
  }, [active, count]);

  const onDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) go(active + 1);
    else if (info.offset.x > 70) go(active - 1);
  }, [active, go]);

  const arrowStyle = {
    all: "unset" as const,
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: CAPTION_LIGHT,
    flexShrink: 0,
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{ background: DARK_BG, padding: "var(--space-section-y) var(--space-section-x)" }}
    >
      <div className="site-content">
        <FadeInView>
          {/* Running head: what this group of screens is, and where you are in it */}
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem",
          }}>
            <p className="section-label" style={{ color: accentText, margin: 0 }}>{eyebrow[lang]}</p>
            <p style={{
              margin: 0, fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 12, letterSpacing: ".08em", color: CAPTION_LIGHT,
            }}>
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          </div>

          {/* Browser window */}
          <div style={{ borderRadius: 10, overflow: "hidden", background: PANEL_BG, border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Chrome bar — same three-dot language as this page's own
                AnimatedPageTypes mock, so the two read as one family */}
            <div style={{
              height: 34, display: "flex", alignItems: "center", gap: 6,
              paddingLeft: 14, background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              {[`${accent}99`, "rgba(255,255,255,0.18)", "rgba(255,255,255,0.18)"].map((c, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              ))}
            </div>

            <motion.div
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragDirectionLock
              onDragEnd={onDragEnd}
              className="proj-screen-viewport"
              style={{
                aspectRatio: String(frameAspect(current)),
                overflow: "hidden",
                position: "relative",
                background: "#fff",
              }}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {/* Two layers on purpose: the wrapper owns the crossfade
                    between slides, the image owns the loop. They both animate
                    opacity, and a single element cannot run a 0.32s slide
                    change and a 26s looping keyframe on the same property. */}
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <motion.img
                    src={`${basePath}/${current.slug}.webp`}
                    alt={current.caption[lang]}
                    width={current.w}
                    height={current.h}
                    draggable={false}
                    animate={
                      panning
                        ? {
                            // Down the page, hold at the foot, fade out, cut
                            // back to the top while invisible, fade in. Albert,
                            // 2026-10-17: rewinding in view read as the page
                            // scrolling backwards, which nothing on a real site
                            // does.
                            y: ["0%", "0%", `-${travel}%`, `-${travel}%`, `-${travel}%`, "0%", "0%"],
                            opacity: [1, 1, 1, 1, 0, 0, 1],
                          }
                        : { y: "0%", opacity: 1 }
                    }
                    transition={
                      panning
                        ? {
                            duration: panSeconds(current),
                            times: [0, 0.04, 0.74, 0.84, 0.9, 0.92, 1],
                            repeat: Infinity,
                            ease: ["easeInOut", "easeInOut", "linear", "linear", "linear", "easeOut"],
                          }
                        : { duration: 0 }
                    }
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Caption + arrows */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "1.5rem", marginTop: 16, flexWrap: "wrap",
          }}>
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.slug}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  style={{ margin: 0, fontSize: 14, lineHeight: 1.4, color: CAPTION_LIGHT }}
                >
                  {current.caption[lang]}
                </motion.p>
              </AnimatePresence>
            </div>

            {count > 1 && (
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" aria-label={UI.prev[lang]} onClick={() => go(active - 1)} style={arrowStyle} className="cursor-hidden">
                  <Chevron dir="left" />
                </button>
                <button type="button" aria-label={UI.next[lang]} onClick={() => go(active + 1)} style={arrowStyle} className="cursor-hidden">
                  <Chevron dir="right" />
                </button>
              </div>
            )}
          </div>

          {/* Filmstrip — every screen in the group reachable in one click, which
              is the only way 17 of them stay navigable */}
          <div
            className="proj-filmstrip"
            style={{ display: "flex", gap: 8, marginTop: 22, overflowX: "auto", paddingBottom: 6 }}
          >
            {screens.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => go(i)}
                aria-label={s.caption[lang]}
                aria-current={i === active}
                className="cursor-hidden"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  flex: "0 0 auto",
                  width: 104,
                  aspectRatio: String(THUMB_ASPECT),
                  borderRadius: 5,
                  overflow: "hidden",
                  outline: i === active ? `2px solid ${accent}` : "1px solid rgba(255,255,255,0.12)",
                  outlineOffset: i === active ? -1 : 0,
                  opacity: i === active ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              >
                <img
                  src={`${basePath}/thumbs/${s.slug}.webp`}
                  alt=""
                  loading="lazy"
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

