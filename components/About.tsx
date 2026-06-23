"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import PlanetOrbit from "@/components/PlanetOrbit";
import FadeInView from "@/components/FadeInView";

function IconFrames() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="4" y="8" width="56" height="48" rx="5" stroke="var(--text-muted)" strokeWidth="1" fill="none" />
      <rect x="12" y="16" width="40" height="32" rx="4" stroke="var(--text-muted)" strokeWidth="1" fill="none" />
      <rect x="20" y="24" width="24" height="16" rx="3" stroke="var(--text-muted)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function IconTree() {
  const nodes: [number, number][] = [
    [32, 10],
    [16, 32], [48, 32],
    [8, 54], [24, 54], [40, 54], [56, 54],
  ];
  const edges: [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--text-muted)" strokeWidth="1" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" stroke="var(--text-muted)" strokeWidth="1" fill="none" />
      ))}
    </svg>
  );
}

function IconWand() {
  const sparks: [number, number, number][] = [[52, 10, 4], [60, 22, 3], [50, 26, 2.5]];
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <line x1="10" y1="54" x2="44" y2="20" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="46" cy="18" r="3.5" stroke="var(--text-muted)" strokeWidth="1" fill="none" />
      {sparks.map(([cx, cy, r], i) => (
        <g key={i}>
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

const icons = [IconFrames, IconTree, IconWand];

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [headingA, headingB] = tx.heading.split("\n");

  return (
    <section
      id="about"
      style={{ background: "var(--bg-alt)", padding: "clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)" }}
    >
      <div className="site-content">

        {/* Top row */}
        <div className="about-top" style={{ display: "flex", alignItems: "flex-start", gap: "clamp(2rem, 4vw, 5rem)", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>

          <FadeInView style={{ flex: "1 1 0", minWidth: 0 }}>
            <p className="section-label" style={{ marginBottom: "1.75rem" }}>{tx.label}</p>
            <h2 className="display-heading" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              <span style={{ display: "block" }}>{headingA}</span>
              <span style={{ display: "block", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: "var(--text-muted)" }}>
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
          </FadeInView>

          <FadeInView className="about-orbit" delay={0.15} y={16}>
            <PlanetOrbit />
          </FadeInView>

        </div>

        {/* Service blocks — staggered */}
        <div className="about-services" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", borderTop: "1px solid var(--border)" }}>
          {tx.services.slice(0, 3).map((service, i) => {
            const Icon = icons[i];
            return (
              <FadeInView key={i} delay={i * 0.1} y={16}>
                <div className="about-service-item" style={{ padding: "clamp(1.5rem, 2.5vw, 2.25rem)", borderLeft: i > 0 ? "1px solid var(--border)" : undefined, height: "100%" }}>
                  <div style={{ marginBottom: "1.25rem" }}><Icon /></div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    {service.desc}
                  </p>
                </div>
              </FadeInView>
            );
          })}
        </div>

      </div>
    </section>
  );
}
