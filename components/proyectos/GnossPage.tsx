"use client";

import Link from "next/link";
import NextProjectCard from "@/components/proyectos/NextProjectCard";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import FadeInView from "@/components/FadeInView";
import SmoothScroll from "@/components/SmoothScroll";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import { projects } from "@/data/projects";

const ACCENT = "#c4a35a";
const project = projects.find((p) => p.id === "gnoss-ai")!;
const resultLabel = { en: "The result", es: "El resultado", ca: "El resultat" };

const meta = [
  { label: "Cliente",  value: "GNOSS" },
  { label: "Año",      value: "2026" },
  { label: "Estado",   value: "Completado" },
  { label: "Rol",      value: "Diseño web · Mantenimiento UI" },
  { label: "Stack",    value: "Figma" },
];

const chips = ["Figma", "Design System", "Web Design"];

// ── SVG: sistema heredado ────────────────────────────────────────────────────
function SvgSystem() {
  const cols = 4;
  const rows = 3;
  const CW = 72, CH = 48, GAP_X = 12, GAP_Y = 10;
  const START_X = 10, START_Y = 10;
  const newItems = [7, 8, 10]; // indices que son "nuevas páginas"

  return (
    <svg
      viewBox={`0 0 ${START_X * 2 + cols * CW + (cols - 1) * GAP_X} ${START_Y * 2 + rows * CH + (rows - 1) * GAP_Y + 20}`}
      fill="none"
      style={{ width: "100%", maxWidth: 380, height: "auto" }}
      aria-hidden
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = START_X + col * (CW + GAP_X);
        const y = START_Y + row * (CH + GAP_Y);
        const isNew = newItems.includes(i);

        return (
          <g key={i}>
            <rect x={x} y={y} width={CW} height={CH} rx={6}
              fill="var(--bg-alt)"
              stroke={isNew ? ACCENT : "var(--border-mid)"}
              strokeWidth={isNew ? 1.5 : 1}
              strokeDasharray={isNew ? "none" : "none"}
            />
            {/* Content bars */}
            <rect x={x + 6} y={y + 8} width={CW - 12} height={6} rx={2}
              fill={isNew ? `${ACCENT}55` : "var(--border)"}
              opacity={isNew ? 1 : 0.7}
            />
            <rect x={x + 6} y={y + 20} width={(CW - 12) * 0.7} height={4} rx={2}
              fill="var(--border)" opacity={0.4} />
            <rect x={x + 6} y={y + 28} width={(CW - 12) * 0.5} height={4} rx={2}
              fill="var(--border)" opacity={0.3} />
            {isNew && (
              <text x={x + CW - 6} y={y + 14}
                textAnchor="end" fill={ACCENT}
                fontSize={7} fontWeight={700} fontFamily="var(--font-sans)" letterSpacing={0.5}>
                NEW
              </text>
            )}
          </g>
        );
      })}

      <text x={(START_X * 2 + cols * CW + (cols - 1) * GAP_X) / 2}
        y={START_Y * 2 + rows * CH + (rows - 1) * GAP_Y + 16}
        textAnchor="middle" fill="var(--text-subtle)"
        fontSize={9} fontFamily="var(--font-sans)" fontStyle="italic" letterSpacing={0.3}>
        Sistema existente · páginas nuevas integradas
      </text>
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function GnossPage() {
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
          background: "linear-gradient(135deg, #1a2a0a 0%, #2d5c1a 50%, #c4a35a 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(196,163,90,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)",
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
            <div style={{ maxWidth: "clamp(320px, 58%, 640px)" }}>
              <motion.p
                className="section-label"
                style={{ marginBottom: "1rem", color: ACCENT }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              >
                06 · Sistema de Diseño
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                style={{ margin: 0, lineHeight: 1 }}
              >
                <span className="display-heading" style={{ display: "block", color: "#fff" }}>
                  GNOSS
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
                  fontFamily: "var(--font-serif), 'Playfair Display', serif",
                  fontStyle: "italic", fontWeight: 400,
                  lineHeight: 1.25, color: "rgba(255,255,255,0.6)",
                  marginTop: "0.5rem",
                }}>
                  mantenimiento y expansión de un sistema de diseño web
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
                <p className="section-label" style={{ marginBottom: "1.5rem" }}>El proyecto</p>
                <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75, color: "var(--text-muted)" }}>
                  {project.problem[lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {meta.map(({ label, value }, i) => (
                    <div key={label} style={{
                      display: "grid", gridTemplateColumns: "120px 1fr",
                      padding: "0.9rem 0",
                      borderBottom: i < meta.length - 1 ? "1px solid var(--border)" : "none",
                      gap: "1rem",
                    }}>
                      <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                        {label}
                      </span>
                      <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El reto ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>El reto</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  Entrar en un sistema ajeno y no romperlo
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  El reto no era inventar, sino leer. Entender las decisiones de diseño que otros habían tomado, por qué existían y cómo se relacionaban entre sí. Cualquier página nueva tenía que parecer parte del mismo sistema — no un añadido.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  La web de GNOSS es grande. Eso significa muchas páginas, muchos contextos distintos y muchas veces en que la consistencia es lo único que mantiene la coherencia del conjunto.
                </p>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgSystem />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El trabajo ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1rem" }}>El trabajo</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.75rem", maxWidth: 720 }}>
                {project.process[lang]}
              </p>
            </FadeInView>
            <div className="proj-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(1rem, 2vw, 2rem)" }}>
              {[
                {
                  title: "Mantenimiento",
                  desc: "Actualización de páginas existentes — ajustes de contenido, revisiones de componentes, correcciones de consistencia a lo largo de toda la web.",
                },
                {
                  title: "Nuevas páginas",
                  desc: "Creación de páginas inéditas siguiendo el design system establecido: misma gramática visual, mismos componentes, mismo tono.",
                },
                {
                  title: "Escala",
                  desc: "Al tratarse de una web grande, el trabajo requería atención al detalle y capacidad para mantener la coherencia en muchos contextos distintos de forma simultánea.",
                },
              ].map(({ title, desc }) => (
                <FadeInView key={title}>
                  <div style={{
                    padding: "1.75rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--border-mid)",
                    background: "var(--bg)",
                    height: "100%",
                  }}>
                    <div style={{
                      width: 32, height: 3, borderRadius: 2,
                      background: ACCENT, marginBottom: "1.25rem",
                    }} />
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem" }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-muted)", margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* ── El resultado ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content" style={{ maxWidth: 720 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{resultLabel[lang]}</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                {project.result[lang]}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* ── Aprendizajes ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content" style={{ maxWidth: 720 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>Aprendizajes</p>
              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.75rem" }}>
                Lo que me llevé
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { n: "01", text: "Trabajar dentro de un sistema es una habilidad en sí misma. No se trata de imponer criterio propio, sino de entender el criterio existente lo suficientemente bien como para extenderlo sin que se note la costura." },
                  { n: "02", text: "La escala revela los problemas de consistencia que en proyectos pequeños pasan desapercibidos. En una web grande, cualquier pequeña inconsistencia se amplifica y acaba siendo visible." },
                ].map(({ n, text }) => (
                  <div key={n} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1rem", alignItems: "start" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", color: ACCENT, paddingTop: "0.2rem" }}>{n}</span>
                    <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        <NextProjectCard ids={["elbulli", "madrid", "turisme-jaen"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
