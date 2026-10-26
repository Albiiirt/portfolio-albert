"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import FadeInView from "@/components/FadeInView";

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [headingA, headingB] = tx.heading.split("\n");
  const featuredSkills = tx.skills.filter((skill) => skill.featured);

  return (
    <section
      id="about"
      style={{ background: "var(--bg-alt)", padding: "clamp(5rem, 10vh, 9rem) var(--space-section-x)" }}
    >
      <div className="site-content">

        <FadeInView>
          <p className="section-label" style={{ marginBottom: "1.75rem" }}>{tx.label}</p>
          <h2 className="display-heading" style={{ fontSize: "var(--text-section)", marginBottom: "clamp(1.75rem, 3.5vw, 3rem)" }}>
            <span style={{ display: "block" }}>{headingA}</span>
            <span style={{ display: "block", fontWeight: 800, color: "var(--text-muted)" }}>
              {headingB}
            </span>
          </h2>

          {/* Voice-first paragraph (no comma-separated skills list) — the
              location/availability badge is dropped here too, since the
              Hero already states it. The 4 featured skills stay as cards,
              Albert's preferred treatment over a text list. */}
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)", maxWidth: "42rem" }}>
            {tx.intro}
          </p>

          <ul className="skill-cards" style={{ listStyle: "none", padding: 0, margin: "2rem 0 0" }}>
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

          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/cv" className="btn-invert">
              {tx.viewCv} →
            </Link>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
