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
import Image from "next/image";

const ACCENT = "#8c3a5a";

const meta = [
  { label: "Cliente",  value: "Enoturismo Madrid" },
  { label: "Año",      value: "2026" },
  { label: "Estado",   value: "Completado · Live" },
  { label: "Rol",      value: "Diseño y desarrollo · Proyecto en solitario" },
  { label: "Stack",    value: "Next.js · Claude Code · Figma" },
];

const chips = ["Next.js", "Claude Code", "Figma"];

// ── SVG: flujo de trabajo ────────────────────────────────────────────────────
function SvgWorkflow() {
  const steps = [
    { label: "Base IA",         sub: "entregada por el cliente" },
    { label: "Nuevas páginas",  sub: "diseño y desarrollo",      accent: true },
    { label: "Consistencia",    sub: "entre todas las vistas",   accent: true },
    { label: "Responsive",      sub: "todas las resoluciones",   accent: true },
  ];

  const BOX_W = 100, BOX_H = 68, GAP = 16;
  const totalW = steps.length * BOX_W + (steps.length - 1) * GAP + 24;

  return (
    <svg viewBox={`0 0 ${totalW} 100`} fill="none" style={{ width: "100%", maxWidth: 520, height: "auto" }} aria-hidden>
      <defs>
        <marker id="arr-mad" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill={ACCENT} />
        </marker>
        <marker id="arr-mad-n" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill="var(--border-mid)" />
        </marker>
      </defs>

      {steps.map((s, i) => {
        const x = 12 + i * (BOX_W + GAP);
        const isLast = i === steps.length - 1;
        return (
          <g key={i}>
            <rect x={x} y={8} width={BOX_W} height={BOX_H} rx={8}
              fill="var(--bg-alt)"
              stroke={s.accent ? ACCENT : "var(--border-mid)"}
              strokeWidth={s.accent ? 1.5 : 1} />
            {s.accent && (
              <rect x={x + 1} y={18} width={3} height={BOX_H - 28} rx={1.5} fill={ACCENT} />
            )}
            <text x={x + (s.accent ? 13 : 9)} y={38}
              fill={s.accent ? ACCENT : "var(--text-subtle)"}
              fontSize={9.5} fontWeight={s.accent ? 700 : 500} fontFamily="var(--font-sans)">
              {s.label}
            </text>
            <text x={x + (s.accent ? 13 : 9)} y={54}
              fill="var(--text-subtle)" fontSize={8} fontFamily="var(--font-sans)">
              {s.sub}
            </text>
            {!isLast && (
              <line
                x1={x + BOX_W + 3} y1={42}
                x2={x + BOX_W + GAP - 4} y2={42}
                stroke={s.accent ? ACCENT : "var(--border-mid)"}
                strokeWidth={1.5}
                markerEnd={s.accent ? "url(#arr-mad)" : "url(#arr-mad-n)"}
              />
            )}
          </g>
        );
      })}

      <text x={totalW / 2} y={94} textAnchor="middle"
        fill="var(--text-subtle)" fontSize={9} fontFamily="var(--font-sans)" fontStyle="italic" letterSpacing={0.3}>
        De una base generada por IA a un producto terminado
      </text>
    </svg>
  );
}

// ── SVG: responsive breakpoints ──────────────────────────────────────────────
function SvgResponsive() {
  const devices = [
    { label: "Desktop",  w: 160, h: 110, x: 0 },
    { label: "Tablet",   w: 100, h: 130, x: 175 },
    { label: "Mobile",   w: 60,  h: 130, x: 290 },
  ];

  return (
    <svg viewBox="0 0 370 160" fill="none" style={{ width: "100%", maxWidth: 400, height: "auto" }} aria-hidden>
      {devices.map((d, i) => {
        const isFirst = i === 0;
        const frameY = isFirst ? 10 : 0;
        return (
          <g key={d.label}>
            {/* Device frame */}
            <rect x={d.x} y={frameY} width={d.w} height={d.h} rx={6}
              fill="var(--bg-alt)"
              stroke={isFirst ? ACCENT : "var(--border-mid)"}
              strokeWidth={isFirst ? 1.5 : 1} />
            {/* Screen area */}
            <rect x={d.x + 5} y={frameY + 5} width={d.w - 10} height={d.h - 14} rx={3}
              fill="var(--bg)" />
            {/* Content bars */}
            <rect x={d.x + 9} y={frameY + 10} width={d.w - 22} height={isFirst ? 14 : 10} rx={2}
              fill={`${ACCENT}30`} />
            {[0, 1, 2].map((j) => (
              <rect key={j}
                x={d.x + 9}
                y={frameY + (isFirst ? 30 : 26) + j * (isFirst ? 14 : 12)}
                width={`${[100, 75, 85][j]}%`.replace("%", "")}
                height={isFirst ? 6 : 5}
                rx={2}
                fill="var(--border)"
                style={{ width: `${[d.w - 22, (d.w - 22) * 0.75, (d.w - 22) * 0.85][j]}px` }}
              />
            ))}
            {/* Label */}
            <text x={d.x + d.w / 2} y={frameY + d.h + 14}
              textAnchor="middle"
              fill={isFirst ? ACCENT : "var(--text-subtle)"}
              fontSize={9} fontWeight={isFirst ? 700 : 400} fontFamily="var(--font-sans)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function MadridPage() {
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
          background: "linear-gradient(135deg, #1a0a0f 0%, #4a1528 60%, #8c3a5a 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          <Image
            src="/covers/cover-madrid.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #000 0%, #000 25%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.35) 68%, transparent 100%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.6) 100%)",
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
                02 · Diseño Web
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                style={{ margin: 0, lineHeight: 1 }}
              >
                <span className="display-heading" style={{ display: "block", color: "#fff" }}>
                  Enoturismo Madrid
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
                  fontFamily: "var(--font-serif), 'Playfair Display', serif",
                  fontStyle: "italic", fontWeight: 400,
                  lineHeight: 1.25, color: "rgba(255,255,255,0.6)",
                  marginTop: "0.5rem",
                }}>
                  diseño y desarrollo de las rutas del vino de Madrid
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
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.48 }}
                style={{ marginTop: "1.5rem" }}
              >
                <a
                  href="https://madridenoturismo.gnoss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.65rem 1.25rem",
                    borderRadius: "100px",
                    background: ACCENT,
                    color: "#fff",
                    fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.04em",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Ver el resultado
                </a>
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
                <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75, color: "var(--text-muted)", fontWeight: 400 }}>
                  El cliente entregó una primera versión generada por IA — en HTML, no solo como imagen. Tenía dirección visual pero no tenía estructura: sin componentes, sin sistema, sin forma de escalar. Como responsable del diseño del proyecto, lo migré a Next.js, construí el sistema de componentes y diseñé e implementé el site de la primera a la última página.
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

        {/* ── El punto de partida ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>El punto de partida</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  Una base generada por IA
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  Tenía una base de partida, pero el diseño necesitaba más carácter y personalización. Además, el HTML que entregó el cliente no tenía estructura: sin componentes, sin sistema, sin forma de escalar.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  Antes de diseñar nada nuevo, migré la base a Next.js — un entorno de código real, con componentes reutilizables, sobre el que construir todo lo demás sin perder la coherencia visual de lo que ya existía.
                </p>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgWorkflow />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El trabajo ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>El trabajo</p>
              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "clamp(2.5rem, 4vh, 4rem)" }}>
                De la base al producto terminado
              </h2>
            </FadeInView>

            <div className="proj-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(1rem, 2vw, 1.5rem)" }}>
              {[
                {
                  label: "De la primera a la última",
                  desc: "Diseñé y desarrollé cada página del site en solitario — en Next.js, con componentes compartidos que garantizan coherencia sin repetir trabajo.",
                },
                {
                  label: "Consistencia",
                  desc: "Un sistema de estilos compartidos. Independientemente del contenido, todas las páginas hablan el mismo lenguaje visual.",
                },
                {
                  label: "Responsive y animaciones",
                  desc: "La base no tenía responsive. Cada página, ajustada para desktop, tablet y móvil. Las animaciones, exploradas en Figma e implementadas en código.",
                },
              ].map(({ label, desc }) => (
                <FadeInView key={label}>
                  <div style={{
                    padding: "clamp(1.5rem, 2.5vw, 2rem)",
                    borderRadius: "1rem",
                    border: `1px solid ${ACCENT}44`,
                    background: `${ACCENT}06`,
                    height: "100%",
                  }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: "1rem" }}>
                      {label}
                    </p>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
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
                  { n: "01", text: "Código como medio de diseño. Ver el resultado real en el navegador es más rápido — y más honesto — que cualquier prototipo." },
                  { n: "02", text: "Extender es un ejercicio de escucha. Antes de añadir nada, hay que entender las decisiones que ya se tomaron — para continuarlas, no romperlas." },
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

        <NextProjectCard ids={["castellera", "turisme-jaen", "elbulli"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
