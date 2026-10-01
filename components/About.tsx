"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import PlanetOrbit from "@/components/PlanetOrbit";
import FadeInView from "@/components/FadeInView";

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [headingA, headingB] = tx.heading.split("\n");

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
            <ul style={{ display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: "0.6rem", columnGap: "0.5rem", marginTop: "1.25rem", listStyle: "none", padding: 0 }}>
              {tx.skills.map((skill) => (
                <li key={skill.text} style={{ display: "flex", alignItems: "center" }}>
                  <span className="tag">{skill.text}</span>
                </li>
              ))}
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
