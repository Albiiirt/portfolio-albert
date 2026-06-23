"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import FadeInView from "@/components/FadeInView";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Contact() {
  const { lang } = useLang();
  const tx = t[lang].contact;
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    setPhraseIndex(0);
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % tx.cyclingPhrases.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [tx.cyclingPhrases.length]);

  return (
    <section
      id="contact"
      style={{ background: "var(--bg-alt)", padding: "clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)", position: "relative" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 70%, var(--border) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="site-content" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>

          <FadeInView>
            <p className="section-label" style={{ marginBottom: "1.75rem" }}>{tx.label}</p>

            <div style={{ marginBottom: "1.25rem" }}>
              <span
                className="display-heading"
                style={{ display: "block", fontFamily: "var(--font-sans)", fontWeight: 700 }}
              >
                {tx.cyclingPrefix}
              </span>

              <AnimatePresence mode="wait">
                <motion.span
                  key={`${lang}-${phraseIndex}`}
                  className="display-heading"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif), 'Playfair Display', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "var(--text-muted)",
                  }}
                >
                  {tx.cyclingPhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              {tx.sub}
            </p>
          </FadeInView>

          <FadeInView delay={0.12}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center", marginBottom: "clamp(3rem, 6vw, 6rem)" }}>
              <a href={`mailto:${tx.email}`} className="btn-primary">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4l6 4.5L14 4M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {tx.cta}
              </a>
              <a href="https://www.linkedin.com/in/albertcanadas/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {tx.linkedin}
              </a>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "0.01em" }}>
              {tx.ps}
            </p>
            <div>
              <div className="divider" style={{ marginBottom: "1.75rem" }} />
              <a
                href={`mailto:${tx.email}`}
                style={{ fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)", color: "var(--text-subtle)", letterSpacing: "0.06em", textDecoration: "none", fontWeight: 500, transition: "color 0.28s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                {tx.email}
              </a>
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  );
}
