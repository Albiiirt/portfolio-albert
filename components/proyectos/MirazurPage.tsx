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

const ACCENT = "#7aad3a";

const meta = [
  { label: "Cliente",      value: "Mirazur" },
  { label: "Proyecto 01",  value: "2025 · Portal de recetas" },
  { label: "Proyecto 02",  value: "2026 · Página de experiencia" },
  { label: "Estado",       value: "Diseño completado" },
  { label: "Rol",          value: "Diseño web · UX" },
  { label: "Stack",        value: "Figma · Claude Design" },
];

const chips = ["Figma", "Claude Design", "Web Design"];

// ── SVG: flujo del portal de recetas ────────────────────────────────────────
function SvgRecipeFlow() {
  const steps = [
    { n: "01", title: "Restaurante",  sub: "publica la receta" },
    { n: "02", title: "Usuario",      sub: "descubre y paga",   accent: true },
    { n: "03", title: "Acceso",       sub: "receta desbloqueada" },
  ];
  const BOX_W = 130, BOX_H = 76, GAP = 28;

  return (
    <svg viewBox="0 0 460 110" fill="none" style={{ width: "100%", maxWidth: 460, height: "auto" }} aria-hidden>
      <defs>
        <marker id="arr-m" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill="var(--border-mid)" />
        </marker>
        <marker id="arr-ma" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
          <path d="M0,0.5 L0,6 L7,3 z" fill={ACCENT} />
        </marker>
      </defs>

      {steps.map((s, i) => {
        const x = 12 + i * (BOX_W + GAP);
        const isLast = i === steps.length - 1;
        return (
          <g key={i}>
            <rect x={x} y={8} width={BOX_W} height={BOX_H} rx={10}
              fill="var(--bg-alt)"
              stroke={s.accent ? ACCENT : "var(--border-mid)"}
              strokeWidth={s.accent ? 1.5 : 1} />
            {s.accent && (
              <rect x={x + 1} y={20} width={3} height={BOX_H - 32} rx={1.5} fill={ACCENT} />
            )}
            <text x={x + (s.accent ? 14 : 10)} y={38}
              fill={s.accent ? ACCENT : "var(--text-muted)"}
              fontSize={12} fontWeight={s.accent ? 700 : 500} fontFamily="var(--font-sans)">
              {s.title}
            </text>
            <text x={x + (s.accent ? 14 : 10)} y={56}
              fill="var(--text-subtle)" fontSize={9} fontFamily="var(--font-sans)">
              {s.sub}
            </text>
            <text x={x + BOX_W - 10} y={22}
              textAnchor="end" fill={s.accent ? ACCENT : "var(--border-mid)"}
              fontSize={8} fontWeight={700} fontFamily="var(--font-sans)" letterSpacing={0.5}>
              {s.n}
            </text>
            {!isLast && (
              <line
                x1={x + BOX_W + 3} y1={46}
                x2={x + BOX_W + GAP - 4} y2={46}
                stroke={s.accent ? ACCENT : "var(--border-mid)"}
                strokeWidth={1.5}
                markerEnd={s.accent ? "url(#arr-ma)" : "url(#arr-m)"}
              />
            )}
          </g>
        );
      })}

      <text x={230} y={102} textAnchor="middle"
        fill="var(--text-subtle)" fontSize={9} fontFamily="var(--font-sans)" fontStyle="italic" letterSpacing={0.3}>
        Acceso a recetas exclusivas de restaurantes de alta cocina
      </text>
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function MirazurPage() {
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
          background: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(122,173,58,0.3) 0%, transparent 70%)",
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
                05 · Diseño Web
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                style={{ margin: 0, lineHeight: 1 }}
              >
                <span className="display-heading" style={{ display: "block", color: "#fff" }}>
                  Mirazur
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
                  fontFamily: "var(--font-serif), 'Playfair Display', serif",
                  fontStyle: "italic", fontWeight: 400,
                  lineHeight: 1.25, color: "rgba(255,255,255,0.6)",
                  marginTop: "0.5rem",
                }}>
                  portal de recetas y página de experiencia
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
                  Dos proyectos reales con Mirazur, restaurante de tres estrellas Michelin en Menton. En los dos casos el trabajo estaba a medias — yo los retomé y los terminé. Cada uno con una herramienta distinta, por razones distintas.
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

        {/* ── Proyecto 1: Portal de recetas ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "0.5rem", color: ACCENT }}>Proyecto 01</p>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>Portal de recetas</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  Alta cocina accesible
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  El proyecto llegó a medias. La idea era clara — un portal donde los usuarios pagan para acceder a las recetas del restaurante, un modelo que lleva la alta cocina más allá de la mesa — pero el diseño estaba incompleto.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  Lo retomé y lo terminé en Figma: el listado de recetas, la ficha individual, el flujo de acceso y el perfil del restaurante.
                </p>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgRecipeFlow />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── Proyecto 2: Página de experiencia ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "0.5rem", color: ACCENT }}>Proyecto 02</p>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>Página de experiencia</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "start" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  Diseñar una experiencia antes de vivirla
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  Este también llegó a medias. Elegí terminarlo con Claude Design por una razón concreta: el sistema de diseño ya estaba construido, y usarlo como base me daba velocidad sin sacrificar coherencia visual.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  El resultado es una página narrativa — no una carta ni una web corporativa — que explica qué significa comer en el Mirazur antes de haber ido: el entorno, los platos, la filosofía, la secuencia del menú.
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { label: "El entorno",    desc: "El jardín y la ubicación en Menton, al borde del Mediterráneo." },
                    { label: "Los platos",    desc: "Los ingredientes de temporada, la filosofía de Mauro Colagreco." },
                    { label: "La experiencia",desc: "Cómo es la secuencia de un menú degustación en el restaurante." },
                  ].map(({ label, desc }) => (
                    <div key={label} style={{
                      padding: "1.25rem 1.5rem",
                      borderRadius: "0.75rem",
                      border: "1px solid var(--border-mid)",
                      background: "var(--bg)",
                    }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: "0.5rem" }}>
                        {label}
                      </p>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "var(--text-muted)", margin: 0 }}>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── Aprendizajes ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content" style={{ maxWidth: 720 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>Aprendizajes</p>
              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.75rem" }}>
                Lo que me llevé
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { n: "01", text: "Retomar un proyecto a medias obliga a entender antes de tocar. Primero hay que leer lo que ya está — las decisiones, la lógica, el tono — para poder continuarlo sin que se note la costura." },
                  { n: "02", text: "La página de experiencia la construí con Claude Design. Lo que en Figma habría tardado días, tomó horas — sin perder el control sobre las decisiones de diseño." },
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

        <NextProjectCard ids={["gnoss-ai", "castellera", "turisme-jaen"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
