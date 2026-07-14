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

const ACCENT = "#b5386e";
const project = projects.find((p) => p.id === "la-rioja-turismo")!;
const page = project.page!;

const chips = ["Figma", "Framer", "Web Design", "Tourism"];

export default function LaRiojaPage() {
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
          background: "linear-gradient(135deg, #1a0010 0%, #5c1a3a 60%, #b5386e 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(181,56,110,0.3) 0%, transparent 70%)",
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
                {project.num} · {project.category[lang]}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                style={{ margin: 0, lineHeight: 1 }}
              >
                <span className="display-heading" style={{ display: "block", color: "#fff" }}>
                  La Rioja Turismo
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

        {/* ── El trabajo ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.work}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "start" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.workHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  {project.process[lang]}
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {page.workCards!.map(({ label, desc }, i) => (
                    <div key={i} style={{
                      padding: "1.25rem 1.5rem",
                      borderRadius: "0.75rem",
                      border: `1px solid ${ACCENT}44`,
                      background: `${ACCENT}06`,
                    }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: "0.5rem" }}>
                        {label[lang]}
                      </p>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "var(--text-muted)", margin: 0 }}>
                        {desc[lang]}
                      </p>
                    </div>
                  ))}
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
              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                {page.resultHeading![lang]}
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                {project.result[lang]}
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                {page.closingLink!.prefix[lang]}<Link href={page.closingLink!.href} style={{ color: ACCENT, textDecoration: "none", borderBottom: `1px solid ${ACCENT}55`, paddingBottom: "1px" }}>{page.closingLink!.linkText[lang]}</Link>{page.closingLink!.suffix[lang]}
              </p>
            </FadeInView>
          </div>
        </section>

        <NextProjectCard ids={["turisme-jaen", "mirazur", "castellera"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
