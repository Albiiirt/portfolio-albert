"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextProjectCard from "@/components/proyectos/NextProjectCard";
import { motion, AnimatePresence } from "framer-motion";
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

const ACCENT = "#c4813a";
const project = projects.find((p) => p.id === "turisme-jaen")!;
const page = project.page!;

const chips = ["Figma", "Web Design"];

function Bar({ w = "100%", h = 8, accent = false, opacity = 1, mt = 0 }: {
  w?: string | number; h?: number; accent?: boolean; opacity?: number; mt?: number;
}) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 3, flexShrink: 0, marginTop: mt,
      background: accent ? ACCENT : "var(--border)",
      opacity: accent ? 0.7 : opacity,
    }} />
  );
}

function PortadaLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <div style={{ borderRadius: 6, background: `${ACCENT}18`, border: `1px solid ${ACCENT}35`, height: "40%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", flexDirection: "column", gap: 5 }}>
          <Bar w={72} h={7} accent />
          <Bar w={50} h={5} opacity={0.35} />
        </div>
      </div>
      <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, flexShrink: 0 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ height: 34, borderRadius: 5, background: "var(--bg)", border: "1px solid var(--border)" }} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, paddingTop: 4 }}>
        {[100,80,95,65].map((w, i) => <Bar key={i} w={`${w}%`} h={5} opacity={0.45} />)}
      </div>
    </div>
  );
}

function ListadoLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, height: "100%" }}>
      <Bar h={18} opacity={0.5} />
      <Bar h={10} opacity={0.3} />
      <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, flex: 1 }}>
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{ borderRadius: 5, background: "var(--bg)", border: "1px solid var(--border)", minHeight: 44, position: "relative", overflow: "hidden" }}>
            <div style={{ height: "40%", background: "var(--border)", opacity: 0.5 }} />
            <div style={{ padding: "6px 7px", display: "flex", flexDirection: "column", gap: 4 }}>
              <Bar w="80%" h={5} opacity={0.5} />
              <Bar w="55%" h={4} opacity={0.3} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RutaLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <Bar h={22} opacity={0.5} />
      <div style={{ flex: 1, position: "relative", paddingLeft: 22 }}>
        <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 2, background: "var(--border)", borderRadius: 1 }} />
        {[0,1,2,3].map(i => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 3 ? 18 : 0 }}>
            <div style={{
              position: "absolute", left: 0,
              width: 13, height: 13, borderRadius: "50%", flexShrink: 0,
              background: i === 0 ? ACCENT : "var(--bg-alt)",
              border: `2px solid ${i === 0 ? ACCENT : "var(--border-mid)"}`,
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <Bar w={i === 0 ? "85%" : "70%"} h={6} opacity={i === 0 ? 0.7 : 0.4} />
              <Bar w="50%" h={4} opacity={0.25} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FichaLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <div style={{ height: "30%", borderRadius: 6, background: "var(--border)", opacity: 0.5, flexShrink: 0 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, flex: 1 }}>
        <div style={{ borderRadius: 5, background: "var(--bg)", border: "1px solid var(--border)", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          {[70,50,70,50,60].map((w, i) => <Bar key={i} w={`${w}%`} h={4} opacity={0.4} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingTop: 2 }}>
          <Bar w="90%" h={6} opacity={0.6} />
          {[100,80,95,60,85].map((w, i) => <Bar key={i} w={`${w}%`} h={4} opacity={0.35} />)}
        </div>
      </div>
    </div>
  );
}

const LAYOUTS = [PortadaLayout, ListadoLayout, RutaLayout, FichaLayout];

function AnimatedPageTypes({ lang }: { lang: "en" | "es" | "ca" }) {
  const [current, setCurrent] = useState(0);
  const PAGE_TYPES = page.pageTypes!;

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % PAGE_TYPES.length), 3000);
    return () => clearInterval(id);
  }, [PAGE_TYPES.length]);

  const Layout = LAYOUTS[current];

  return (
    <div style={{ width: "100%", maxWidth: 260, margin: "0 auto" }}>
      {/* Browser frame */}
      <div style={{ borderRadius: 12, border: "1px solid var(--border-mid)", overflow: "hidden", background: "var(--bg-alt)" }}>
        {/* Chrome bar */}
        <div style={{ height: 26, background: "var(--bg)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", paddingLeft: 10, gap: 5 }}>
          {[ACCENT + "99", "var(--border-mid)", "var(--border-mid)"].map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
        </div>
        {/* Page area */}
        <div style={{ height: 320, position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ position: "absolute", inset: 0, padding: 14 }}
            >
              <Layout />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Label + progress dots */}
      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ fontSize: "0.8rem", fontWeight: 700, color: ACCENT, margin: 0 }}
            >
              {PAGE_TYPES[current].label[lang]}
            </motion.p>
          </AnimatePresence>
          <p style={{ fontSize: "0.7rem", color: "var(--text-subtle)", margin: "0.2rem 0 0" }}>
            {PAGE_TYPES[current].sub[lang]}
          </p>
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {PAGE_TYPES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="cursor-hidden"
              style={{
                width: i === current ? 18 : 6, height: 6, borderRadius: 3, padding: 0, border: "none",
                background: i === current ? ACCENT : "var(--border-mid)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SVG 2: Módulo compartido ─────────────────────────────────────────────────
function SvgModular() {
  const cards = [
    { label: "Ruta",       color: ACCENT },
    { label: "Municipio",  color: "#7a9e6a" },
    { label: "Evento",     color: "#9a7aaa" },
  ];
  const CW = 130, CH = 98, GAP = 20;

  return (
    <svg viewBox="0 0 450 116" fill="none" style={{ width: "100%", maxWidth: 480, height: "auto" }} aria-hidden>
      {cards.map((c, i) => {
        const x = 15 + i * (CW + GAP);
        return (
          <g key={i}>
            <rect x={x} y={4} width={CW} height={CH} rx={8}
              fill="var(--bg-alt)" stroke="var(--border-mid)" strokeWidth={1} />
            <rect x={x} y={4} width={CW} height={28} rx={8}
              fill={`${c.color}20`} />
            <rect x={x} y={24} width={CW} height={8} fill={`${c.color}20`} />
            <rect x={x + 1} y={4} width={3} height={82} rx={1.5}
              fill={`${c.color}77`} />
            <text x={x + 12} y={21}
              fill={c.color} fontSize={8.5} fontWeight={700} fontFamily="var(--font-sans)" letterSpacing={0.6}>
              {c.label.toUpperCase()}
            </text>
            <rect x={x + 10} y={38} width={CW - 22} height={7} rx={2}
              fill="var(--text-muted)" opacity={0.4} />
            <rect x={x + 10} y={50} width={CW - 36} height={4} rx={2}
              fill="var(--border-mid)" />
            <rect x={x + 10} y={62} width={CW - 22} height={3} rx={2} fill="var(--border)" />
            <rect x={x + 10} y={69} width={CW - 32} height={3} rx={2} fill="var(--border)" />
            <rect x={x + 10} y={82} width={38} height={12} rx={3}
              fill={`${c.color}20`} stroke={`${c.color}55`} strokeWidth={0.8} />
          </g>
        );
      })}
      <text x={225} y={112} textAnchor="middle"
        fill="var(--text-subtle)" fontSize={9} fontFamily="var(--font-sans)" fontStyle="italic" letterSpacing={0.3}>
        Mismo componente · tres contextos distintos
      </text>
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function JaenPage() {
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
          background: "#2d1b00",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          {/* Background photo */}
          <Image
            src="/covers/cover-jaen.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}
          />
          {/* Gradient overlay — dark left, transparent right */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #000 0%, #000 25%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.35) 68%, transparent 100%)",
            pointerEvents: "none",
          }} />
          {/* Top/bottom darkening */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.6) 100%)",
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
                  Turisme Jaén
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

        {/* ── El doble reto ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.challenge}</p>
              <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "clamp(2.5rem, 4vh, 4rem)" }}>
                {page.challengeHeading![lang]}
              </h2>
            </FadeInView>

            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.5rem, 3vw, 3rem)" }}>
              {page.challengeCards!.map((card, i) => (
                <FadeInView key={i} delay={i * 0.1}>
                  <div style={{
                    padding: "clamp(1.5rem, 3vw, 2.5rem)",
                    borderRadius: "1rem",
                    border: i === 0 ? "1px solid var(--border-mid)" : `1px solid ${ACCENT}55`,
                    background: i === 0 ? "var(--bg-alt)" : `${ACCENT}08`,
                    height: "100%",
                  }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: i === 0 ? "var(--text-subtle)" : ACCENT, marginBottom: "1rem" }}>
                      {card.badge[lang]}
                    </p>
                    <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 700, color: "var(--text)", marginBottom: "1rem", lineHeight: 1.25 }}>
                      {card.heading[lang]}
                    </h3>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                      {card.body[lang]}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tipos de página ── */}
        <section style={{ background: "var(--bg-alt)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.structure}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.structureHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  {page.structureBody![0][lang]}
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  {page.structureBodyBold!.prefix[lang]}<span style={{ color: "var(--text)", fontWeight: 600 }}>{page.structureBodyBold!.bold[lang]}</span>
                </p>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AnimatedPageTypes lang={lang} />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── El proceso ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
          <div className="site-content">
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.process}</p>
            </FadeInView>
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "center" }}>
              <FadeInView delay={0.1}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <SvgModular />
                </div>
              </FadeInView>
              <FadeInView>
                <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "1.5rem" }}>
                  {page.processHeading![lang]}
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  {project.process[lang]}
                </p>
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

        <NextProjectCard ids={["mirazur", "gnoss-ai", "madrid"]} />

      </main>
      <Footer />
    </SmoothScroll>
  );
}
