"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { EASE } from "@/lib/animations";
import PlanetOrbit from "@/components/PlanetOrbit";

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "80svh",
        background: "var(--bg)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="hero-inner" style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "clamp(3rem, 6vw, 8rem)",
        paddingTop: "clamp(4rem, 7vh, 6rem)",
        paddingBottom: "clamp(3rem, 6vh, 5rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
      }}>

        {/* Left: text */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: "clamp(1rem, 1.8vh, 1.75rem)" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexWrap: "wrap" }}
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

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
            style={{ margin: 0, lineHeight: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
          >
            <span style={{ color: "var(--text)", fontSize: "clamp(1.8rem, 4vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" }}>
              {`${tx.line1} ${tx.line2}`}
            </span>
            <span className="text-gradient" style={{ fontSize: "clamp(2.4rem, 8vw, 9.5rem)", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "0em", lineHeight: 0.92, minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" }}>
              {tx.line3}
            </span>
            <span style={{ color: "var(--text)", fontSize: "clamp(2.4rem, 8vw, 9.5rem)", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "0em", lineHeight: 0.92, minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" }}>
              {tx.line4}
            </span>
          </motion.h1>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.34 }}
            style={{ marginTop: "clamp(0.75rem, 2vh, 1.5rem)" }}
          >
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

        {/* Right: planet */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
          className="hero-orbit"
          style={{ flexShrink: 0, width: "clamp(260px, 36vw, 480px)" }}
        >
          <PlanetOrbit />
        </motion.div>

      </div>
    </section>
  );
}
