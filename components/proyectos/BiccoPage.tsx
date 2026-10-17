"use client";

import Link from "next/link";
import NextProjectCard from "@/components/proyectos/NextProjectCard";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import BiccoProductSlider, { BiccoRecordsSlider } from "@/components/proyectos/BiccoScreensSlider";
import FadeInView from "@/components/FadeInView";
import SmoothScroll from "@/components/SmoothScroll";
import ProjectDesignSystemSheet from "@/components/proyectos/ProjectDesignSystemSheet";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import { projects } from "@/data/projects";
import { t } from "@/data/translations";

const ACCENT = "#d63900";
const project = projects.find((p) => p.id === "bicco")!;
const page = project.page!;

const chips = ["UX Design", "AI Search", "Vibe Coding"];

export default function BiccoPage() {
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
          background: "linear-gradient(135deg, #081b3d 0%, #0d2b5e 55%, #183880 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(214,57,0,0.28) 0%, transparent 70%)",
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
                {/* No public demo deployed (unlike Xunta's) — scrolls to the
                    screens section below instead of linking out. */}
                <a
                  href="#bicco-screens"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("bicco-screens")?.scrollIntoView({ behavior: "smooth" });
                  }}
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
                    <path d="M6.5 2v9M2 7l4.5 4.5L11 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
            as Xunta Galicia. */}
        <BiccoProductSlider />

        {/* ── El trabajo ── */}
        <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <div style={{ maxWidth: 720 }}>
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
          </div>
        </section>

        {/* ── Las cards de "El trabajo" ── */}
        <section style={{ background: "var(--bg)", padding: "0 var(--space-section-x) var(--space-section-y)" }}>
          <div className="site-content" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-gap-md)" }}>
            {page.workCards!.map((card, i) => (
              <FadeInView key={i} delay={i * 0.08}>
                <div style={{ padding: "1.75rem", borderRadius: "1rem", background: "var(--bg-alt)", height: "100%" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text)" }}>
                    {card.label[lang]}
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    {card.desc[lang]}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </section>

        <BiccoRecordsSlider />

        {/* ── La paleta y tipografía ── */}
        <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.designSystem}</p>
            </FadeInView>
            <ProjectDesignSystemSheet data={project.designSystem} accentColor={ACCENT} tightTop />
          </div>
        </section>

        {/* ── El resultado ── */}
        <section style={{ background: "var(--bg-alt)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.result}</p>
              <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.5rem" }}>
                {page.resultHeading![lang]}
              </h2>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.essentials}</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: 720 }}>
                {project.result[lang]}
              </p>
            </FadeInView>
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

        <NextProjectCard ids={["gnoss-ai", "xunta-galicia", "madrid"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
