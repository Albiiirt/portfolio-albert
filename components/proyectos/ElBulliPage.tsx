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
import { t } from "@/data/translations";
import Image from "next/image";

const ACCENT = "#4a8fcc";
const project = projects.find((p) => p.id === "elbulli")!;
const page = project.page!;

const chips = ["AI", "Strapi", "Figma"];

// ── SVG 1: Antes / Después ──────────────────────────────────────────────────
function SvgBottleneck() {
  const BOX_W = 84, BOX_H = 40, GAP = 17, LABEL_W = 64;
  const antesY = 46, despuesY = 116;

  const antes = [
    { title: "Contenido",  sub: "listo" },
    { title: "Solicitud",  sub: "técnica",    friction: true },
    { title: "En cola",    sub: "esperando",  friction: true },
    { title: "DEV",        sub: "implementa", friction: true },
    { title: "Publicado",  sub: "" },
  ];

  const despues = [
    { title: "Contenido", sub: "listo" },
    { title: "Publicado", sub: "", success: true },
  ];

  return (
    <svg viewBox="0 0 560 156" fill="none" style={{ width: "100%", maxWidth: 560, height: "auto" }} aria-hidden>
      <defs>
        <marker id="arr-a" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill="var(--border-mid)" />
        </marker>
        <marker id="arr-s" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill={ACCENT} />
        </marker>
      </defs>

      {/* Row labels */}
      <text x={2} y={antesY + 4}
        fill="var(--text-subtle)" fontSize={8.5} fontWeight={700} letterSpacing={0.8} fontFamily="var(--font-sans)">
        ANTES
      </text>
      <text x={2} y={despuesY + 4}
        fill={ACCENT} fontSize={8.5} fontWeight={700} letterSpacing={0.8} fontFamily="var(--font-sans)">
        OBJETIVO
      </text>

      {/* Divider */}
      <line x1={0} y1={82} x2={560} y2={82} stroke="var(--border)" strokeWidth={0.8} />

      {/* Antes */}
      {antes.map((s, i) => {
        const x = LABEL_W + i * (BOX_W + GAP);
        return (
          <g key={i}>
            <rect x={x} y={antesY - BOX_H / 2} width={BOX_W} height={BOX_H} rx={7}
              fill="var(--bg-alt)"
              stroke={s.friction ? `${ACCENT}88` : "var(--border-mid)"}
              strokeWidth={s.friction ? 1.5 : 1} />
            {s.friction && (
              <rect x={x + 1} y={antesY - BOX_H / 2 + 8} width={3} height={BOX_H - 16} rx={1.5}
                fill={`${ACCENT}88`} />
            )}
            <text x={x + (s.friction ? 13 : 8)} y={antesY - 3}
              fill={s.friction ? "var(--text)" : "var(--text-muted)"}
              fontSize={10} fontWeight={s.friction ? 600 : 400} fontFamily="var(--font-sans)">
              {s.title}
            </text>
            {s.sub && (
              <text x={x + (s.friction ? 13 : 8)} y={antesY + 12}
                fill="var(--text-subtle)" fontSize={8.5} fontFamily="var(--font-sans)">
                {s.sub}
              </text>
            )}
            {i < antes.length - 1 && (
              <line x1={x + BOX_W + 3} y1={antesY} x2={x + BOX_W + GAP - 4} y2={antesY}
                stroke="var(--border-mid)" strokeWidth={1.5} markerEnd="url(#arr-a)" />
            )}
          </g>
        );
      })}

      {/* Después */}
      {despues.map((s, i) => {
        const x = LABEL_W + i * (BOX_W + GAP);
        return (
          <g key={i}>
            <rect x={x} y={despuesY - BOX_H / 2} width={BOX_W} height={BOX_H} rx={7}
              fill="var(--bg-alt)"
              stroke={s.success ? ACCENT : "var(--border-mid)"}
              strokeWidth={s.success ? 1.5 : 1} />
            {s.success && (
              <rect x={x + 1} y={despuesY - BOX_H / 2 + 8} width={3} height={BOX_H - 16} rx={1.5}
                fill={ACCENT} />
            )}
            <text x={x + (s.success ? 13 : 8)} y={despuesY - 3}
              fill={s.success ? ACCENT : "var(--text-muted)"}
              fontSize={10} fontWeight={s.success ? 700 : 400} fontFamily="var(--font-sans)">
              {s.title}
            </text>
            {i < despues.length - 1 && (
              <line x1={x + BOX_W + 3} y1={despuesY} x2={x + BOX_W + GAP - 4} y2={despuesY}
                stroke={ACCENT} strokeWidth={1.5} markerEnd="url(#arr-s)" />
            )}
          </g>
        );
      })}

      {/* Caption */}
      <text x={280} y={150} textAnchor="middle"
        fill="var(--text-subtle)" fontSize={9} fontFamily="var(--font-sans)" fontStyle="italic" letterSpacing={0.3}>
        3 pasos de fricción que dependían de intervención técnica
      </text>
    </svg>
  );
}

// ── SVG 2: Las tres capas ───────────────────────────────────────────────────
function SvgLayers() {
  const NODE_X = 22;
  const CARD_X = 54;
  const CARD_W = 300;
  const CARD_H = 64;
  const GAP = 24;

  // Top → bottom: nivel 3 (usuario) → nivel 1 (base)
  const layers = [
    { num: "3", label: "Contenido del equipo", sub: "Texto · Imágenes · Datos",        accent: true  },
    { num: "2", label: "Bloques de contenido", sub: "Plantillas · Estructura",          accent: false },
    { num: "1", label: "Design System",        sub: "Estilos · Tipografías · Colores",  accent: false },
  ];

  const totalH = layers.length * CARD_H + (layers.length - 1) * GAP;

  return (
    <svg
      viewBox={`0 0 ${CARD_X + CARD_W + 16} ${totalH + 24}`}
      fill="none"
      style={{ width: "100%", maxWidth: 400, height: "auto" }}
      aria-hidden
    >
      {/* Vertical spine */}
      <line
        x1={NODE_X} y1={CARD_H / 2 + 4}
        x2={NODE_X} y2={totalH - CARD_H / 2 + 4}
        stroke="var(--border-mid)" strokeWidth={1} strokeDasharray="3 3"
      />

      {layers.map((l, i) => {
        const cardY = i * (CARD_H + GAP) + 4;
        const midY  = cardY + CARD_H / 2;

        return (
          <g key={l.num}>
            {/* Node circle */}
            <circle cx={NODE_X} cy={midY} r={11}
              fill={l.accent ? ACCENT : "var(--bg-alt)"}
              stroke={l.accent ? ACCENT : "var(--border-mid)"}
              strokeWidth={1.5}
            />
            <text x={NODE_X} y={midY + 4}
              textAnchor="middle"
              fill={l.accent ? "var(--bg)" : "var(--text-subtle)"}
              fontSize={9} fontWeight={700} fontFamily="var(--font-sans)"
            >
              {l.num}
            </text>

            {/* Horizontal connector */}
            <line x1={NODE_X + 11} y1={midY} x2={CARD_X} y2={midY}
              stroke="var(--border)" strokeWidth={1}
            />

            {/* Card */}
            <rect x={CARD_X} y={cardY} width={CARD_W} height={CARD_H} rx={8}
              fill="var(--bg-alt)"
              stroke={l.accent ? ACCENT : "var(--border-mid)"}
              strokeWidth={l.accent ? 1.5 : 1}
            />

            {/* Accent left bar */}
            <rect x={CARD_X + 1} y={cardY + 10} width={3} height={CARD_H - 20} rx={1.5}
              fill={l.accent ? ACCENT : "var(--border)"}
            />

            {/* Label */}
            <text x={CARD_X + 18} y={cardY + 25}
              fill={l.accent ? "var(--text)" : "var(--text-muted)"}
              fontSize={12} fontWeight={700} fontFamily="var(--font-sans)" letterSpacing={-0.2}
            >
              {l.label}
            </text>
            <text x={CARD_X + 18} y={cardY + 43}
              fill="var(--text-subtle)" fontSize={10} fontFamily="var(--font-sans)" letterSpacing={0.1}
            >
              {l.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── SVG 3: El sistema de bloques ────────────────────────────────────────────
function SvgBlocks() {
  const blocks = [
    { label: "Hero",        w: 200, h: 52, x: 0,   y: 0   },
    { label: "Texto",       w: 95,  h: 52, x: 0,   y: 64  },
    { label: "Imagen",      w: 95,  h: 52, x: 105, y: 64  },
    { label: "Galería",     w: 200, h: 36, x: 0,   y: 128 },
    { label: "Cita",        w: 95,  h: 36, x: 0,   y: 176 },
    { label: "Cronología",  w: 95,  h: 36, x: 105, y: 176 },
    { label: "Ficha",       w: 200, h: 44, x: 0,   y: 224 },
  ];

  return (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      style={{ width: "100%", maxWidth: 280, height: "auto" }}
      aria-hidden
    >
      {blocks.map((b, i) => {
        const isAccent = i === 0;
        return (
          <g key={i} transform="translate(20, 8)">
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6}
              fill="var(--bg-alt)"
              stroke={isAccent ? ACCENT : "var(--border-mid)"}
              strokeWidth={isAccent ? 1.5 : 1} />
            {isAccent && (
              <rect x={b.x + 8} y={b.y + 8} width={b.w - 16} height={8} rx={3}
                fill={ACCENT} opacity={0.25} />
            )}
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + (isAccent ? 6 : 4)}
              textAnchor="middle"
              fill={isAccent ? ACCENT : "var(--text-muted)"}
              fontSize={10} fontWeight={isAccent ? 700 : 500}
              fontFamily="var(--font-sans)" letterSpacing={0.3}
            >
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function ElBulliPage() {
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
          minHeight: "clamp(480px, 62svh, 700px)",
          display: "flex",
          flexDirection: "column",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          {/* Cover image — full background */}
          <Image
            src="/covers/cover-elbulli.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />

          {/* Gradient: dark left → transparent right */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #000 0%, #000 28%, rgba(0,0,0,0.88) 48%, rgba(0,0,0,0.35) 70%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Top + bottom fade for nav/footer blending */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
          }} />

          {/* Back link — fixed at nav height */}
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
            {/* Text — bottom, constrained to left half */}
            <div style={{ maxWidth: "clamp(320px, 52%, 600px)" }}>
              <motion.p
                className="section-label"
                style={{ marginBottom: "1rem", color: ACCENT }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              >
                {project.num} · {project.category[lang]}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                style={{ margin: 0, lineHeight: 1 }}
              >
                <span className="display-heading" style={{ display: "block", color: "#fff" }}>
                  Fundació elBulli
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
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {project.meta!.map((item, i) => (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "120px 1fr",
                      padding: "0.9rem 0",
                      borderBottom: i < project.meta!.length - 1 ? "1px solid var(--border)" : "none",
                      gap: "1rem",
                    }}>
                      <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                        {item.labelKey ? t[lang].projectPage.metaLabels[item.labelKey] : item.label![lang]}
                      </span>
                      <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        {typeof item.value === "string" ? item.value : item.value[lang]}
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
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.challenge}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.challengeHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  {page.challengeBody![0][lang]}
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  {page.challengeBody![1][lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgBottleneck />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── La solución ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.solution}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgLayers />
                </div>
              </FadeInView>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.solutionHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  {project.process[lang]}
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El sistema de bloques ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.system}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.systemHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  {page.systemBody![0][lang]}
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.75rem" }}>
                  {page.systemBody![1][lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgBlocks />
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <p className="section-label" style={{ margin: 0 }}>{t[lang].projectPage.sectionLabels.learnings}</p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  background: `${ACCENT}18`, border: `1px solid ${ACCENT}55`,
                  color: ACCENT, padding: "0.2rem 0.6rem", borderRadius: "100px",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
                  {page.learningsBadge![lang]}
                </span>
              </div>

              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.75rem" }}>
                {page.learningsHeading![lang]}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {page.learningsItems!.map((text, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1rem", alignItems: "start" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", color: ACCENT, paddingTop: "0.2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>{text[lang]}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--text-subtle)", fontStyle: "italic", marginTop: "2.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                {page.learningsFootnote![lang]}
              </p>
            </FadeInView>
          </div>
        </section>

        <NextProjectCard ids={["madrid", "castellera", "gnoss-ai"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
