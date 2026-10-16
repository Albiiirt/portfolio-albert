"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { EASE } from "@/lib/animations";

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
        paddingTop: "clamp(4rem, 7vh, 6rem)",
        paddingBottom: "clamp(3rem, 6vh, 5rem)",
        paddingLeft: "var(--space-section-x)",
        paddingRight: "var(--space-section-x)",
      }}>

        {/* Text block — capped width so it doesn't stretch edge-to-edge
            on wide screens; aligned left, air to the right is intentional */}
        <div style={{ maxWidth: "min(900px, 68ch)", display: "flex", flexDirection: "column", gap: "clamp(1rem, 1.8vh, 1.75rem)" }}>

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
            style={{ margin: 0, lineHeight: 1, display: "flex", flexDirection: "column", minWidth: 0, textWrap: "balance" }}
          >
            <span style={{ color: "var(--text)", fontSize: "clamp(1.8rem, 4vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" }}>
              {`${tx.line1} ${tx.line2}`}
            </span>
            <span className="hero-heading text-gradient" style={{ minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" }}>
              {tx.line3}
            </span>
            <span className="hero-heading" style={{ minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" }}>
              {tx.line4}
            </span>
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
