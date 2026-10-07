"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import FadeInView from "@/components/FadeInView";

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [headingA, headingB] = tx.heading.split("\n");
  const featuredSkills = tx.skills.filter((skill) => skill.featured);
  const standardSkills = tx.skills.filter((skill) => !skill.featured);
  // Builds the "A, B, C y D." phrasing natively in the active language,
  // instead of hand-writing the conjunction per locale.
  const standardSkillsText = new Intl.ListFormat(lang, {
    style: "long",
    type: "conjunction",
  }).format(standardSkills.map((skill) => `${skill.text}`));

  return (
    <section
      id="about"
      style={{ background: "var(--bg-alt)", padding: "clamp(5rem, 10vh, 9rem) var(--space-section-x)" }}
    >
      <div className="site-content">

        <FadeInView>
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
          <div style={{ marginTop: "1.25rem" }}>
            {/* Experimental: 4 always-visible cards replacing the old
                disclosure rows for the featured skills — Albert wants to
                compare this against the row pattern before committing. */}
            <ul className="skill-cards" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {featuredSkills.map((skill) => (
                <li key={skill.text} className="skill-card">
                  <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>
                    {skill.text}
                  </p>
                  <p style={{ margin: "0.4rem 0 0", fontSize: "0.78rem", lineHeight: 1.5, color: "var(--text-subtle)" }}>
                    {skill.desc}
                  </p>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.8rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.7, color: "var(--text-muted)", margin: 0, maxWidth: "34rem" }}>
                {standardSkillsText}.
              </p>
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
