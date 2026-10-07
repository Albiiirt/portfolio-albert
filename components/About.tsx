"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { EASE } from "@/lib/animations";
import { t } from "@/data/translations";
import PlanetOrbit from "@/components/PlanetOrbit";
import FadeInView from "@/components/FadeInView";

// Disclosure chevron — same stroke style (currentColor, 1.5, round caps) as
// the other line icons on the site (location pin, Download PDF arrow).
function SkillArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <path d="M1 4.5L4 7.5L7 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [headingA, headingB] = tx.heading.split("\n");
  const [openSkill, setOpenSkill] = useState<number | null>(null);

  return (
    <section
      id="about"
      style={{ background: "var(--bg-alt)", padding: "clamp(5rem, 10vh, 9rem) var(--space-section-x)" }}
    >
      <div className="site-content">

        {/* Top row */}
        <div className="about-top" style={{ display: "flex", alignItems: "flex-start", gap: "clamp(2rem, 4vw, 5rem)", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>

          <FadeInView style={{ flex: "1 1 0", minWidth: 0 }}>
            <p className="section-label" style={{ marginBottom: "1.75rem" }}>{tx.label}</p>
            <h2 className="display-heading" style={{ fontSize: "var(--text-section)", marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              <span style={{ display: "block" }}>{headingA}</span>
              <span style={{ display: "block", fontWeight: 800, color: "var(--text-muted)" }}>
                {headingB}
              </span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexWrap: "wrap" }}>
              <svg width="9" height="11" viewBox="0 0 12 15" fill="none" aria-hidden="true">
                <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 6 3.5 1.5 1.5 0 0 1 6 6.5z" fill="var(--text-muted)" />
              </svg>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{tx.location}</span>
              <span style={{ width: "1px", height: "10px", background: "var(--border-mid)", flexShrink: 0 }} aria-hidden="true" />
              <span className="status-dot" style={{ width: "6px", height: "6px" }} aria-hidden="true" />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{tx.availability}</span>
            </div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-muted)", marginTop: "1.5rem", maxWidth: "34rem" }}>
              {tx.intro}
            </p>
            <ul className="skill-list" style={{ listStyle: "none", padding: 0, margin: "1.25rem 0 0" }}>
              {tx.skills.map((skill, i) => {
                const isOpen = openSkill === i;
                const descId = `skill-desc-${i}`;
                // Data already lists the 4 featured skills first, then the
                // 6 standard ones — the only extra gap is the boundary
                // between those two groups, no new heading/copy needed.
                const isGroupBoundary = skill.featured && !tx.skills[i + 1]?.featured;
                return (
                  <li
                    key={skill.text}
                    style={{
                      borderBottom: "1px solid var(--border-mid)",
                      paddingBottom: isGroupBoundary ? "1.8rem" : "0.9rem",
                    }}
                  >
                    <button
                      type="button"
                      id={`skill-row-${i}`}
                      className="skill-row"
                      onClick={() => setOpenSkill(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={descId}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <span
                          aria-hidden="true"
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: skill.featured ? "var(--text)" : "var(--text-subtle)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: skill.featured ? 700 : 500,
                            color: skill.featured ? "var(--text)" : "var(--text-muted)",
                          }}
                        >
                          {skill.text}
                        </span>
                      </span>
                      <span className="skill-row-arrow">
                        <SkillArrowIcon open={isOpen} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={descId}
                          style={{ overflow: "hidden" }}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                        >
                          <p
                            style={{
                              fontSize: "0.8rem",
                              lineHeight: 1.5,
                              color: "var(--text-subtle)",
                              margin: "0 0 0.5rem",
                              paddingLeft: "calc(4px + 0.65rem)",
                            }}
                          >
                            {skill.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </FadeInView>

          <FadeInView className="about-orbit" delay={0.15} y={16}>
            <PlanetOrbit />
          </FadeInView>

        </div>

      </div>
    </section>
  );
}
