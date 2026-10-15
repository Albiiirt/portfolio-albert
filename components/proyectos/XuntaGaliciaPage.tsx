"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NextProjectCard from "@/components/proyectos/NextProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import FadeInView from "@/components/FadeInView";
import SmoothScroll from "@/components/SmoothScroll";
import ProjectDesignSystemSheet from "@/components/proyectos/ProjectDesignSystemSheet";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import { projects } from "@/data/projects";
import { t } from "@/data/translations";

const ACCENT = "#2a8c8c";
const project = projects.find((p) => p.id === "xunta-galicia")!;
const page = project.page!;

const chips = ["UX Research", "Product Design", "Figma"];

// 4 real screens of the live demo (xunta-thesaurus-demo.vercel.app, linked
// from this page's Hero CTA), captured at the demo's own desktop width —
// 1600×1000 exactly, so they render at natural aspect with no crop. Shown
// at desktop size deliberately: an earlier pass captured these at mobile
// width, but the tool has no real mobile layout (one desktop stylesheet,
// no responsive breakpoints — a narrow viewport just overflows it), so
// presenting that as "mobile" would misrepresent the product, 2026-10-15.
// Screens 3-4 (ficha.html, in 2 of its real states) aren't linked anywhere
// in the static HTML — terminos.js builds each href as a template literal
// per row (`ficha.html?grupo=${t.grupoId}` / `?termino=${t.id}`), only
// found by reading the page's own JS directly.
//
// Dropped a 5th screen (the same merge comparison with a 3-candidate group,
// g003 instead of g001): Albert flagged it as both too repetitive next to
// the 2-candidate version already here, and badly cropped mid-table — that
// group's comparison table is taller than fits in a 1600×1000 capture, so
// the screenshot just cut off wherever the viewport ended. Not worth a
// taller re-capture for a screen that was already redundant.
//
// Two more interactive states exist (trabajo.html's Kanban⇄Listado toggle,
// ficha.html's MARC⇄ISAAR schema toggle) but both are pure in-memory JS
// state with no URL param, so a static screenshot can't reach them without
// a real click.
const XUNTA_SCREENS = [
  {
    src: "/projects/xunta-galicia/screen-1.png",
    caption: {
      en: "Term list, with filters by unification status and proposal size.",
      es: "Listado de términos, con filtros por estado de unificación y tamaño de la propuesta.",
      ca: "Llistat de termes, amb filtres per estat d'unificació i mida de la proposta.",
    },
  },
  {
    src: "/projects/xunta-galicia/screen-2.png",
    caption: {
      en: "Work board, proposals grouped by status.",
      es: "Tablero de trabajo, propuestas agrupadas por estado.",
      ca: "Tauler de treball, propostes agrupades per estat.",
    },
  },
  {
    src: "/projects/xunta-galicia/screen-3.png",
    caption: {
      en: "Merge comparison, field by field, with the chosen value highlighted.",
      es: "Comparación de fusión, campo a campo, con el valor elegido resaltado.",
      ca: "Comparació de fusió, camp a camp, amb el valor triat ressaltat.",
    },
  },
  {
    src: "/projects/xunta-galicia/screen-5.png",
    caption: {
      en: "A single record with no duplicate candidates found.",
      es: "Un registro individual sin candidatos a duplicado.",
      ca: "Un registre individual sense candidats a duplicat.",
    },
  },
];

// ── Slider for the 5 real screens — a plain crossfade + arrows + dots, not
// ProjectScreensShowcase (that component is a phone-frame carousel, fixed
// 9:19.5 portrait; these are 16:10 desktop captures). No autoplay: 5 dense
// screens read at their own pace, not on a timer. ──────────────────────────
function XuntaScreensSlider() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const count = XUNTA_SCREENS.length;
  const current = XUNTA_SCREENS[active];

  const goTo = (i: number) => setActive((i + count) % count);

  return (
    <section style={{ background: "#001515", padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content">
        <FadeInView>
          {/* Arrows sit outside the image now (flex siblings, not absolutely
              positioned over it) and the frame is smaller still — Albert's
              follow-up after the first pass still read as too big. Caption
              dropped for now (Albert: "el texto de momento lo quitamos").
              No `mode="wait"` on the AnimatePresence: that mode fades the
              old slide fully out before starting the new one in, which
              reads as a flash/blank beat rather than a dissolve; default
              (sync) mode overlaps exit and enter for a real crossfade. */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label={lang === "en" ? "Previous screen" : lang === "ca" ? "Pantalla anterior" : "Pantalla anterior"}
              style={{
                flexShrink: 0,
                width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer",
                background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div style={{ width: "100%", maxWidth: "70%", borderRadius: 10, overflow: "hidden", position: "relative", aspectRatio: "1600 / 1000" }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={current.src}
                    alt={current.caption[lang]}
                    fill
                    sizes="(max-width: 860px) 100vw, 900px"
                    priority={active === 0}
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label={lang === "en" ? "Next screen" : lang === "ca" ? "Pantalla següent" : "Pantalla siguiente"}
              style={{
                flexShrink: 0,
                width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer",
                background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {XUNTA_SCREENS.map((screen, i) => (
                <button
                  key={screen.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${i + 1}/${count}`}
                  aria-current={i === active}
                  style={{
                    width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
                    background: i === active ? ACCENT : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

export default function XuntaGaliciaPage() {
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
          background: "linear-gradient(135deg, #001515 0%, #0d3d3d 60%, #2a8c8c 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(42,140,140,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Back link */}
          <motion.div
            style={{ position: "fixed", top: "1.25rem", left: "var(--space-section-x)", zIndex: 49 }}
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

          <div
            className="site-content"
            style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          >
            <div style={{ maxWidth: "clamp(320px, 58%, 640px)" }}>
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
                  {project.title[lang]}
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
                  fontWeight: 800,
                  lineHeight: 1.25, color: "rgba(255,255,255,0.6)",
                  marginTop: "0.5rem",
                }}>
                  {project.heroTagline![lang]}
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "var(--space-gap-sm)" }}
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
                  href="https://xunta-thesaurus-demo.vercel.app"
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
                  {page.heroCta![lang]}
                </a>
              </motion.div>
            </div>
          </div>

          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)",
            pointerEvents: "none",
          }} />
        </section>

        {/* ── Overview ── */}
        <section style={{ background: "var(--bg-alt)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-gap-lg)", alignItems: "start" }}>
              <FadeInView>
                <p className="section-label" style={{ marginBottom: "1.5rem" }}>{t[lang].projectPage.sectionLabels.project}</p>
                <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.essentials}</p>
                <p style={{ fontSize: "var(--text-body)", lineHeight: 1.75, color: "var(--text-muted)", fontWeight: 400 }}>
                  {project.problem[lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
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

        {/* Visual showcase after the intro text, same placement convention
            as Madrid (MadridInterficiaShowcase after "El punto de partida")
            and Mirazur (ProjectMobileFlowStrip after the cupon intro text) —
            used to sit right after the Hero with no text context first. */}
        <XuntaScreensSlider />

        {/* ── El trabajo ── */}
        <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content" style={{ maxWidth: 720, margin: 0 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.work}</p>
              <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.5rem" }}>
                {page.workHeading![lang]}
              </h2>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.essentials}</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                {project.process[lang]}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* ── La paleta y tipografía — Albert, 2026-10-15: movida a después
            de "El trabajo" (antes la precedía) ── */}
        <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.designSystem}</p>
            </FadeInView>
            <ProjectDesignSystemSheet data={project.designSystem} accentColor={ACCENT} tightTop />
          </div>
        </section>

        {/* ── El resultado — vídeo a la derecha del texto, Albert, 2026-10-15
            (era su propia sección con XuntaUnificadorVideo, ahora borrado) ── */}
        <section style={{ background: "var(--bg-alt)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-gap-lg)", alignItems: "center" }}>
              <FadeInView>
                <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.result}</p>
                <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.5rem" }}>
                  {page.resultHeading![lang]}
                </h2>
                <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.essentials}</p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  {project.result[lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <div style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={`${project.title[lang]} — vista previa del producto`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  >
                    <source src="/videos/xunta-unificador.mp4" type="video/mp4" />
                  </video>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── Aprendizajes ── */}
        <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-gap-lg)", alignItems: "start" }}>
            <FadeInView>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <p className="section-label" style={{ margin: 0 }}>{t[lang].projectPage.sectionLabels.learnings}</p>
                {page.learningsBadge && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                    background: `${ACCENT}18`, border: `1px solid ${ACCENT}55`,
                    color: ACCENT, padding: "0.2rem 0.6rem", borderRadius: "100px",
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
                    {page.learningsBadge[lang]}
                  </span>
                )}
              </div>

              <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.75rem" }}>
                {page.learningsHeading![lang]}
              </h2>

              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.essentials}</p>

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

        <NextProjectCard ids={["gnoss-ai", "madrid", "turisme-jaen"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
