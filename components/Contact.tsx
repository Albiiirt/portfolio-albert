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

  // Reset the cycling phrase when the language changes — adjusted during
  // render (React-recommended pattern) instead of in an effect.
  const [prevLang, setPrevLang] = useState(lang);
  if (lang !== prevLang) {
    setPrevLang(lang);
    setPhraseIndex(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % tx.cyclingPhrases.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [tx.cyclingPhrases.length]);

  return (
    <section
      id="contact"
      style={{ background: "var(--bg-alt)", padding: "clamp(5rem, 10vh, 9rem) var(--space-section-x)", position: "relative" }}
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
                    fontWeight: 800,
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
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "0.01em" }}>
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
