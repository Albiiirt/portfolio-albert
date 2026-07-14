"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import FadeInView from "@/components/FadeInView";
import SmoothScroll from "@/components/SmoothScroll";
import NextProjectCard from "@/components/proyectos/NextProjectCard";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import { projects } from "@/data/projects";
import { t } from "@/data/translations";

const ACCENT = "#b84040";
const project = projects.find((p) => p.id === "castellera")!;
const page = project.page!;

const chips = ["Claude Code", "Notion", "Web Design"];

// ── SVG: sistema completo ────────────────────────────────────────────────────
function SvgSystem() {
  const nodes = [
    { label: "Notion",         sub: "CMS de contenido",       x: 0,   y: 0,   accent: false },
    { label: "Web",            sub: "Claude Code",            x: 170, y: 0,   accent: true  },
    { label: "GitHub",         sub: "repositorio",            x: 340, y: 0,   accent: false },
    { label: "Servidor",       sub: "dominio contratado",     x: 255, y: 110, accent: false },
    { label: "Email corp.",    sub: "formularios conectados", x: 85,  y: 110, accent: false },
  ];

  const BOX_W = 120, BOX_H = 58;

  const arrows = [
    { x1: 120, y1: 29, x2: 170, y2: 29 },
    { x1: 290, y1: 29, x2: 340, y2: 29 },
    { x1: 400, y1: 58, x2: 315, y2: 110 },
    { x1: 230, y1: 58, x2: 145, y2: 110 },
  ];

  return (
    <svg viewBox="0 0 470 178" fill="none" style={{ width: "100%", maxWidth: 500, height: "auto" }} aria-hidden>
      <defs>
        <marker id="arr-cas" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill={ACCENT} />
        </marker>
        <marker id="arr-cas-n" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill="var(--border-mid)" />
        </marker>
      </defs>

      {arrows.map((a, i) => (
        <line key={i}
          x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
          stroke={i === 0 || i === 3 ? ACCENT : "var(--border-mid)"}
          strokeWidth={1.5}
          markerEnd={i === 0 || i === 3 ? "url(#arr-cas)" : "url(#arr-cas-n)"}
        />
      ))}

      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width={BOX_W} height={BOX_H} rx={8}
            fill="var(--bg-alt)"
            stroke={n.accent ? ACCENT : "var(--border-mid)"}
            strokeWidth={n.accent ? 1.5 : 1} />
          {n.accent && (
            <rect x={n.x + 1} y={n.y + 12} width={3} height={BOX_H - 24} rx={1.5} fill={ACCENT} />
          )}
          <text x={n.x + (n.accent ? 14 : 10)} y={n.y + 26}
            fill={n.accent ? ACCENT : "var(--text-muted)"}
            fontSize={10} fontWeight={n.accent ? 700 : 500} fontFamily="var(--font-sans)">
            {n.label}
          </text>
          <text x={n.x + (n.accent ? 14 : 10)} y={n.y + 42}
            fill="var(--text-subtle)" fontSize={8.5} fontFamily="var(--font-sans)">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function CastelleraPage() {
  const { lang } = useLang();
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>

        {/* ── Hero ── */}
        <section style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(420px, 55svh, 620px)",
          display: "flex",
          flexDirection: "column",
          background: "#0f0505",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          {/* Video background */}
          <video
            autoPlay muted loop playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: 0.55,
            }}
          >
            <source src="/covers/tritoners.mp4" type="video/mp4" />
          </video>

          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.8) 100%)",
            pointerEvents: "none",
          }} />

          {/* Back link */}
          <motion.div
            style={{ position: "fixed", top: "1.25rem", left: "clamp(1.5rem, 5vw, 5rem)", zIndex: 49 }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              href="/#work"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Portfolio
            </Link>
          </motion.div>

          <div className="site-content" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: "clamp(320px, 62%, 680px)" }}>
              <motion.p
                className="section-label"
                style={{ marginBottom: "1rem", color: ACCENT }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              >
                {project.num} · {page.heroEyebrow![lang]}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                style={{ margin: 0, lineHeight: 1 }}
              >
                <span className="display-heading" style={{ display: "block", color: "#fff" }}>
                  Colla Castellera<br />del Baix Montseny
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
                  fontFamily: "var(--font-serif), 'Playfair Display', serif",
                  fontStyle: "italic", fontWeight: 400,
                  lineHeight: 1.25, color: "rgba(255,255,255,0.6)",
                  marginTop: "0.5rem",
                }}>
                  {project.heroTagline![lang]}
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "clamp(1.5rem, 3vh, 2.5rem)" }}
              >
                {chips.map((chip) => (
                  <span key={chip} className="tag">{chip}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "start" }}>
              <FadeInView>
                <p className="section-label" style={{ marginBottom: "1.5rem" }}>{t[lang].projectPage.sectionLabels.project}</p>
                <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75, color: "var(--text-muted)", fontWeight: 400 }}>
                  {project.problem[lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {project.meta!.map((item, i) => {
                    const label = item.labelKey ? t[lang].projectPage.metaLabels[item.labelKey] : item.label![lang];
                    const value = typeof item.value === "string" ? item.value : item.value[lang];
                    return (
                      <div key={i} style={{
                        display: "grid", gridTemplateColumns: "120px 1fr",
                        padding: "0.9rem 0",
                        borderBottom: i < project.meta!.length - 1 ? "1px solid var(--border)" : "none",
                        gap: "1rem",
                      }}>
                        <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                          {label}
                        </span>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.88rem", color: ACCENT, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${ACCENT}55`, paddingBottom: "1px", width: "fit-content" }}>
                            {value} ↗
                          </a>
                        ) : (
                          <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El trabajo ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.work}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.workHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                  {project.process[lang]}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {page.workCards!.map(({ label, desc }, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1rem", alignItems: "start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, marginTop: "0.55rem", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.25rem" }}>{label[lang]}</p>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)", margin: 0 }}>{desc[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgSystem />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El resultado ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content" style={{ maxWidth: 720 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.result}</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                {project.result[lang]}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* ── Aprendizajes ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content" style={{ maxWidth: 720 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.learnings}</p>
              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.75rem" }}>
                {t[lang].projectPage.learningsHeading}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {page.learningsItems!.map((text, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1rem", alignItems: "start" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", color: ACCENT, paddingTop: "0.2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>{text[lang]}</p>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        <NextProjectCard ids={["turisme-jaen", "elbulli", "mirazur"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
