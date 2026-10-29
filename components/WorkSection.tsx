"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { getOrderedProjects, type Project } from "@/data/projects";
import { ScrollDissolveReveal } from "@/components/ui/scroll-dissolve-reveal";

// First 5 of the same order used on /proyectos — "5 mejores trabajos".
const featured = getOrderedProjects().slice(0, 5);
const SEGMENTS = featured.length - 1;
const VH_PER_SEGMENT = 180;

// The dissolve shader textures these with Three.js, which can't rasterize
// an SVG cover — same artwork as the .svg covers, just pre-rendered to PNG
// so the WebGL texture loader can actually read it. Used only here.
const DISSOLVE_RASTER_COVERS: Record<string, string> = {
  "xunta-galicia": "/covers/cover-xunta-raster.png",
  bicco: "/covers/cover-bicco-raster.png",
};
const dissolveCover = (p: Project) => DISSOLVE_RASTER_COVERS[p.id] ?? p.cover!;

// All 5 covers, loaded once by the single persistent Canvas below (see
// scroll-dissolve-reveal.tsx) instead of per-segment — that's what used to
// cause a black flash on every transition (remounting the canvas recreated
// the WebGL context and recompiled the shaders each time).
const ALL_DISSOLVE_COVERS = featured.map(dissolveCover);

export default function WorkSection() {
  const { lang } = useLang();
  const tx = t[lang].work;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.max(Math.floor(latest * SEGMENTS), 0), SEGMENTS - 1);
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  // 0→1 progress within the current segment only — framer-motion keeps this
  // transformer fresh every render, so it's safe to close over activeIndex.
  const segmentProgress = useTransform(scrollYProgress, (v) => {
    const scaled = v * SEGMENTS - activeIndex;
    return Math.min(Math.max(scaled, 0), 1);
  });
  // Staggered, not a straight crossfade: each title fades out/in over the
  // first/last 35% of the segment, leaving a silent gap in the noisiest
  // middle stretch of the dissolve instead of showing both names at once.
  const frontTitleOpacity = useTransform(segmentProgress, (v) => Math.max(0, 1 - v / 0.35));
  const backTitleOpacity = useTransform(segmentProgress, (v) => Math.max(0, (v - 0.65) / 0.35));

  const front = featured[activeIndex];
  const back = featured[activeIndex + 1];

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ height: `${SEGMENTS * VH_PER_SEGMENT}svh`, background: "#000" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>

        <ScrollDissolveReveal
          images={ALL_DISSOLVE_COVERS}
          activeIndex={activeIndex}
          progress={segmentProgress}
        />

        {/* Dark wash so the centered title stays legible over any cover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }} />

        {/* Centered title — crossfades between the outgoing and incoming
            project name as the dissolve progresses, mirroring the image —
            with the "ver todos" CTA centered right below it */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "1.75rem",
          pointerEvents: "none", padding: "0 var(--space-section-x)",
        }}>
          {/* Fixed height (not driven by whichever title text is longest/
              wraps differently) so re-centering the group never shifts the
              title vertically between projects. */}
          <div style={{ position: "relative", width: "100%", height: "clamp(6.5rem, 13vw, 10.5rem)" }}>
            <motion.div style={{ opacity: frontTitleOpacity, textAlign: "center", position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                {front.category[lang]} · {front.year}
              </span>
              <h3 style={{ margin: "0.5rem 0 0", fontSize: "clamp(2rem, 6vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.02 }}>
                {front.title[lang]}
              </h3>
            </motion.div>
            <motion.div style={{ opacity: backTitleOpacity, textAlign: "center", position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                {back.category[lang]} · {back.year}
              </span>
              <h3 style={{ margin: "0.5rem 0 0", fontSize: "clamp(2rem, 6vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.02 }}>
                {back.title[lang]}
              </h3>
            </motion.div>
          </div>

          {/* `front` — the project whose title is fully visible when you
              arrive at/dwell on this segment, not `back` (the incoming one
              it's crossfading into), which sent clicks to the wrong
              project for most of each segment's scroll range. */}
          <Link href={`/proyectos/${front.id}`} className="btn-invert cursor-hidden" style={{ pointerEvents: "auto" }}>
            {tx.viewProject} →
          </Link>
        </div>

        {/* Footer: progress dots + "ver todos", bottom-aligned with margin */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 var(--space-section-x) clamp(2.5rem, 5vh, 4rem)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
        }}>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {featured.map((p, i) => (
              <span key={p.id} style={{
                width: i === activeIndex || i === activeIndex + 1 ? "18px" : "6px",
                height: "4px", borderRadius: "2px",
                background: i <= activeIndex ? "#fff" : "rgba(255,255,255,0.3)",
                transition: "width 0.3s ease",
              }} />
            ))}
          </div>
          <Link href="/proyectos" className="cursor-hidden" style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#fff", textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px",
          }}>
            {tx.viewAll} →
          </Link>
        </div>

      </div>
    </section>
  );
}
