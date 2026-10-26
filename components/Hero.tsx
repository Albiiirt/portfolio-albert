"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { EASE } from "@/lib/animations";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { SpotlightReveal } from "@/components/ui/spotlight-reveal";
import { ProjectLayoutsGrid } from "@/components/ui/project-layouts-grid";

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;
  // Two phases cycling in the same spot: 1) greeting (one line), 2) what
  // Albert does (two lines — too long for one line on mobile at this size).
  const phases = [`${tx.line1} ${tx.line2}`, `${tx.line3}\n${tx.line4}`];

  return (
    <section
      id="hero"
      data-theme="dark"
      style={{
        position: "relative",
        minHeight: "80svh",
        background: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Dark by default; hovering drags a soft, feathered circle of light
          across it that reveals a drifting mosaic of real project layouts
          underneath. */}
      <SpotlightReveal className="h-full w-full" revealContent={<ProjectLayoutsGrid />} />

      <div className="hero-inner" style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        paddingTop: "clamp(4rem, 7vh, 6rem)",
        paddingBottom: "clamp(3rem, 6vh, 5rem)",
        paddingLeft: "var(--space-section-x)",
        paddingRight: "var(--space-section-x)",
      }}>

        {/* Text block — centered, capped width so it doesn't stretch
            edge-to-edge on wide screens */}
        <div style={{ maxWidth: "min(960px, 68ch)", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "clamp(1rem, 1.8vh, 1.75rem)" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.55rem", flexWrap: "wrap" }}
          >
            <svg width="9" height="11" viewBox="0 0 12 15" fill="none" aria-hidden="true">
              <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 6 3.5 1.5 1.5 0 0 1 6 6.5z" fill="var(--text-muted)" />
            </svg>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Barcelona
            </span>
            <span style={{ width: "1px", height: "10px", background: "var(--border-mid)", flexShrink: 0 }} aria-hidden="true" />
            <span className="status-dot" style={{ width: "6px", height: "6px" }} aria-hidden="true" />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              {tx.availability}
            </span>
          </motion.div>

          {/* Heading — two phases flip-fading in the same spot: greeting,
              then a one-line role description. Centered, single line, and
              slow enough (4.8s hold) to actually be readable. */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
            style={{ margin: 0, minWidth: 0, width: "100%" }}
          >
            <FlipFadeText
              words={phases}
              interval={4800}
              letterDuration={0.45}
              staggerDelay={0.035}
              exitStaggerDelay={0.02}
              className="justify-center"
              textClassName="hero-heading flex-nowrap justify-center"
            />
          </motion.h1>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.34 }}
            style={{ marginTop: "clamp(0.75rem, 2vh, 1.5rem)", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          >
            <Link href="/proyectos" className="btn-invert">
              {tx.viewWork}
            </Link>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4l6 4.5L14 4M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {tx.cta}
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
