"use client";

import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextProjectCard from "@/components/proyectos/NextProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import FadeInView from "@/components/FadeInView";
import SmoothScroll from "@/components/SmoothScroll";
import { EASE } from "@/lib/animations";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { projects } from "@/data/projects";
import { t } from "@/data/translations";

const ACCENT = "#7aad3a";
const project = projects.find((p) => p.id === "mirazur")!;
const subProjects = project.subProjects!;
const DEFAULT_SUB_ID = "cupon";

const chips = ["Figma", "Claude Design", "Web Design"];

const tabsAriaLabel: Record<Lang, string> = {
  en: "Mirazur — projects",
  es: "Mirazur — proyectos",
  ca: "Mirazur — projectes",
};

function resolveSubId(id?: string): string {
  return subProjects.some((s) => s.id === id) ? (id as string) : DEFAULT_SUB_ID;
}

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
        fill="var(--text-subtle)" fontSize={9} fontFamily="var(--font-sans)" letterSpacing={0.3}>
        Acceso a recetas exclusivas de restaurantes de alta cocina
      </text>
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function MirazurPage({ initialTab }: { initialTab?: string } = {}) {
  const { lang } = useLang();
  const router = useRouter();
  const [activeId, setActiveId] = useState(() => resolveSubId(initialTab));
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeSubProject = subProjects.find((s) => s.id === activeId) ?? subProjects[0];
  const page = activeSubProject.page;

  const selectTab = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    router.replace(`/proyectos/mirazur?p=${id}`, { scroll: false });
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = subProjects[(index + dir + subProjects.length) % subProjects.length];
    selectTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>

        {/* ── Hero (shared, client-level — doesn't re-animate on tab switch) ── */}
        <section style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(420px, 55svh, 620px)",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)",
          paddingTop: "clamp(5.5rem, 9vh, 8rem)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}>
          {/* Video background */}
          <video
            autoPlay muted loop playsInline
            poster="/covers/cover-mirazur.webp"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: 0.52,
            }}
          >
            <source src="/covers/mirazur.mp4" type="video/mp4" />
          </video>

          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(122,173,58,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(21,34,10,0.78) 0%, rgba(29,46,15,0.4) 30%, rgba(29,46,15,0.4) 68%, rgba(15,26,7,0.88) 100%)",
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
                  Mirazur
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
            </div>
          </div>
        </section>

        {/* ── Intro compartida (cliente) — no se re-anima al cambiar de pestaña ── */}
        <section style={{ background: "var(--bg-alt)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content">
            <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-gap-lg)", alignItems: "start" }}>
              <FadeInView>
                <p className="section-label" style={{ marginBottom: "1.5rem" }}>{t[lang].projectPage.sectionLabels.project}</p>
                <p style={{ fontSize: "var(--text-body)", lineHeight: 1.75, color: "var(--text-muted)" }}>
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

        {/* ── Control de pestañas ── */}
        <section style={{ background: "var(--bg)", padding: "clamp(2.5rem, 5vh, 3.5rem) var(--space-section-x) 0" }}>
          <div className="site-content">
            <div role="tablist" aria-label={tabsAriaLabel[lang]} style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {subProjects.map((sp, i) => {
                const selected = sp.id === activeId;
                return (
                  <button
                    key={sp.id}
                    ref={(el) => { tabRefs.current[sp.id] = el; }}
                    type="button"
                    role="tab"
                    id={`tab-${sp.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${sp.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(sp.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, i)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      padding: "0.6rem 1.4rem",
                      borderRadius: "100px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      border: `1px solid ${selected ? ACCENT : "var(--border-mid)"}`,
                      background: selected ? ACCENT : "transparent",
                      color: selected ? "#fff" : "var(--text-muted)",
                      transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    }}
                  >
                    {sp.tabLabel[lang]}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Cuerpo de ficha — parametrizado por la pestaña activa ── */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSubProject.id}
            id={`panel-${activeSubProject.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeSubProject.id}`}
            tabIndex={0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {activeSubProject.id === "recetas" && (
              <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
                <div className="site-content">
                  <FadeInView>
                    <p className="section-label" style={{ marginBottom: "0.5rem", color: ACCENT }}>{page!.project1Label![lang]}</p>
                    <p className="section-label" style={{ marginBottom: "1.75rem" }}>{page!.project1SectionLabel![lang]}</p>
                  </FadeInView>
                  <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-gap-lg)", alignItems: "center" }}>
                    <FadeInView>
                      <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.5rem" }}>
                        {page!.project1Heading![lang]}
                      </h2>
                      <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                        {page!.project1Body![0][lang]}
                      </p>
                      <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                        {page!.project1Body![1][lang]}
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
            )}

            {activeSubProject.id === "cupon" && (
              <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
                <div className="site-content">
                  <FadeInView>
                    <p className="section-label" style={{ marginBottom: "0.5rem", color: ACCENT }}>{page!.project2Label![lang]}</p>
                    <p className="section-label" style={{ marginBottom: "1.75rem" }}>{page!.project2SectionLabel![lang]}</p>
                  </FadeInView>
                  <div className="proj-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-gap-lg)", alignItems: "start" }}>
                    <FadeInView>
                      <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.5rem" }}>
                        {page!.project2Heading![lang]}
                      </h2>
                      <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                        {page!.project2Body![0][lang]}
                      </p>
                      <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                        {page!.project2Body![1][lang]}
                      </p>
                    </FadeInView>
                    <FadeInView delay={0.1}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {page!.project2Cards!.map(({ label, desc }, i) => (
                          <div key={i} style={{
                            padding: "1.25rem 1.5rem",
                            borderRadius: "0.75rem",
                            border: "1px solid var(--border-mid)",
                            background: "var(--bg-alt)",
                          }}>
                            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: "0.5rem" }}>
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
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── El enfoque / El resultado (compartido — sintetiza los dos proyectos) ── */}
        <section style={{ background: "var(--bg-alt)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content" style={{ maxWidth: 720, margin: 0, display: "flex", flexDirection: "column", gap: "clamp(2.5rem, 5vh, 3.5rem)" }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.approach}</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                {project.process[lang]}
              </p>
            </FadeInView>
            <FadeInView delay={0.05}>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.result}</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                {project.result[lang]}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* ── Aprendizajes (compartido) ── */}
        <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
          <div className="site-content" style={{ maxWidth: 720, margin: 0 }}>
            <FadeInView>
              <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t[lang].projectPage.sectionLabels.learnings}</p>
              <h2 className="display-heading" style={{ fontSize: "var(--text-heading)", marginBottom: "1.75rem" }}>
                {t[lang].projectPage.learningsHeading}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {project.page!.learningsItems!.map((text, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1rem", alignItems: "start" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", color: ACCENT, paddingTop: "0.2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)" }}>{text[lang]}</p>
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
