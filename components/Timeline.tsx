"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { EASE } from "@/lib/animations";
import FadeInView from "@/components/FadeInView";

type Lang = "en" | "es" | "ca";

type TimelineItem = {
  year: string;
  title: { en: string; es: string; ca: string };
  place: string;
  description?: { en: string; es: string; ca: string };
  tags?: string[];
  type: "education" | "work";
  current?: boolean;
};

const items: TimelineItem[] = [
  {
    year: "2020 – 2023",
    title: { en: "Higher Degree in Graphic Design", es: "CFGS Diseño Gráfico", ca: "CFGS Disseny Gràfic" },
    place: "EMAD · La Garriga",
    type: "education",
  },
  {
    year: "2021 – 2023",
    title: { en: "Graphic Designer", es: "Diseñador Gráfico", ca: "Dissenyador Gràfic" },
    place: "EREBUS / Ionfilter / BMK",
    type: "work",
  },
  {
    year: "2023 – 2024",
    title: { en: "Master in Digital Experience Design", es: "Máster en Digital Experience Design", ca: "Màster en Digital Experience Design" },
    place: "BAU · Barcelona",
    type: "education",
  },
  {
    year: "2024",
    title: { en: "UX Designer (Internship)", es: "UX Designer (Prácticas)", ca: "UX Designer (Pràctiques)" },
    place: "BAU · Barcelona",
    description: {
      en: "User research, UX mapping, brand analysis and competitive benchmarking.",
      es: "Investigación de usuarios, UX mapping, análisis de marca y benchmarking.",
      ca: "Recerca d'usuaris, UX mapping, anàlisi de marca i benchmarking.",
    },
    type: "work",
  },
  {
    year: "2024",
    title: { en: "Volunteer UX Designer", es: "Voluntario UX Designer", ca: "Voluntari UX Designer" },
    place: "8000 Estels",
    description: {
      en: "IA, UX analysis, web audits, brand manuals and wireframes.",
      es: "IA, análisis UX, auditorías web, manuales de marca y wireframes.",
      ca: "IA, anàlisi UX, auditories web, manuals de marca i wireframes.",
    },
    type: "work",
  },
  {
    year: "2025 –",
    title: { en: "Master in Marketing & Digital Communication", es: "Máster en Marketing y Comunicación Digital", ca: "Màster en Màrqueting i Comunicació Digital" },
    place: "En curs",
    tags: ["Google Ads", "Meta Ads", "Figma", "WordPress"],
    type: "education",
    current: true,
  },
  {
    year: "Oct. 2025 –",
    title: { en: "Web Designer / Frontend", es: "Diseñador Web / Frontend", ca: "Dissenyador Web / Frontend" },
    place: "Dosgrapas",
    description: {
      en: "UI design for clients in tourism, tech and culture. Figma → Framer. Clients: Turisme Jaén, La Rioja, GNOSS (AI), Fundació Picasso.",
      es: "Diseño UI para clientes de turismo, tecnología y cultura. Figma → Framer. Clientes: Turisme Jaén, La Rioja, GNOSS (IA), Fundació Picasso.",
      ca: "Disseny UI per a clients de turisme, tecnologia i cultura. Figma → Framer. Clients: Turisme Jaén, La Rioja, GNOSS (IA), Fundació Picasso.",
    },
    type: "work",
    current: true,
  },
];

const tx = {
  en: { label: "background", heading: "Trajectory &\nexperience", education: "Education", work: "Experience", current: "Current", close: "Close", swipe: "Swipe" },
  es: { label: "trayectoria", heading: "Formación y\nexperiencia", education: "Formación", work: "Experiencia", current: "Actual", close: "Cerrar", swipe: "Desliza" },
  ca: { label: "trajectòria", heading: "Formació i\nexperiència", education: "Formació", work: "Experiència", current: "Actual", close: "Tancar", swipe: "Llisca" },
};

// Education icon (graduation cap simplified)
function IconEdu() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8 2L15 6l-7 4L1 6l7-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M4 8.5v3.5c0 1 1.8 2 4 2s4-1 4-2V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <line x1="15" y1="6" x2="15" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// Work icon (briefcase simplified)
function IconWork() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="1.5" y="5.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M5.5 5.5V4a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 10.5 4v1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <line x1="1.5" y1="9.5" x2="14.5" y2="9.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const LINE_Y = 62; // px from top of the scroll strip where line sits
const ITEM_W = 200; // px per item

export default function Timeline() {
  const { lang } = useLang();
  const t = tx[lang];
  const [headingA, headingB] = t.heading.split("\n");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  const active = selected !== null ? items[selected] : null;

  return (
    <section id="timeline" style={{ background: "var(--bg)", padding: "clamp(5rem, 10vh, 9rem) 0" }}>

      {/* Heading */}
      <div style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)", marginBottom: "clamp(3rem, 5vw, 4.5rem)" }}>
        <div className="site-content">
          <FadeInView>
            <p className="section-label" style={{ marginBottom: "1.75rem" }}>{t.label}</p>
            <h2 className="display-heading" style={{ maxWidth: "600px" }}>
              <span style={{ display: "block" }}>{headingA}</span>
              <span style={{ display: "block", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: "var(--text-muted)" }}>
                {headingB}
              </span>
            </h2>
          </FadeInView>
        </div>
      </div>

      {/* Horizontal scroll */}
      <FadeInView delay={0.1} y={12}>
      <div style={{ position: "relative" }}>
        {/* Mobile scroll hint */}
        <div className="timeline-hint" style={{
          display: "none",
          alignItems: "center",
          gap: "0.4rem",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          marginBottom: "0.75rem",
          color: "var(--text-subtle)",
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.swipe}
        </div>
        <div
          ref={scrollRef}
          style={{
            overflowX: "auto",
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
            scrollbarWidth: "none",
          }}
        >
          {/* Inner container with known height for absolute positioning of line */}
          <div style={{ position: "relative", minWidth: "max-content", height: "260px" }}>

            {/* The real timeline line */}
            <div style={{
              position: "absolute",
              top: `${LINE_Y}px`,
              left: "60px",
              right: "60px",
              height: "1px",
              background: "var(--border-mid)",
            }} />

            {/* Items flex row */}
            <div style={{ display: "flex", alignItems: "flex-start", position: "absolute", top: 0, left: 0 }}>
              {items.map((item, i) => {
                const isEdu = item.type === "education";
                const isActive = selected === i;
                const isDimmed = selected !== null && !isActive;

                return (
                  <button
                    key={i}
                    onClick={() => setSelected(isActive ? null : i)}
                    aria-label={item.title[lang]}
                    aria-expanded={isActive}
                    style={{
                      all: "unset",
                      cursor: "none",
                      width: `${ITEM_W}px`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      opacity: isDimmed ? 0.3 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {/* Year + type badge: height = LINE_Y - dot_radius = 62 - 6 = 56px */}
                    <div style={{
                      height: `${LINE_Y - 6}px`, // 56px, ends 6px above line center
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: "10px",
                      gap: "0.28rem",
                    }}>
                      <span style={{
                        fontSize: "0.58rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: item.current ? "var(--text)" : "var(--text-muted)",
                        textAlign: "center",
                      }}>
                        {item.year}
                      </span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.28rem",
                        fontSize: "0.52rem",
                        fontWeight: 700,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "var(--text-subtle)",
                        border: isEdu
                          ? "1px solid var(--border-mid)"
                          : "1px dashed var(--border-mid)",
                        padding: "0.18rem 0.55rem",
                        borderRadius: "100px",
                        whiteSpace: "nowrap",
                        background: isActive ? "var(--glass-bg)" : "transparent",
                        backdropFilter: isActive ? "var(--glass-filter)" : "none",
                        WebkitBackdropFilter: isActive ? "var(--glass-filter)" : "none",
                        transition: "background 0.25s",
                      }}>
                        {isEdu ? <IconEdu /> : <IconWork />}
                        {isEdu ? t.education : t.work}
                        {item.current ? ` · ${t.current}` : ""}
                      </span>
                    </div>

                    {/* Dot — 12px, centered on the LINE_Y */}
                    <div style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: isActive ? "var(--text)" : isEdu ? "var(--bg)" : "var(--text-subtle)",
                      border: `1.5px solid ${isActive ? "var(--text)" : "var(--border-mid)"}`,
                      boxShadow: isActive ? `0 0 0 3px var(--bg), 0 0 0 5px var(--border-mid)` : "none",
                      transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                      position: "relative",
                      zIndex: 2,
                    }} />

                    {/* Connector line dot→card */}
                    <div style={{
                      width: "1px",
                      height: "14px",
                      background: isActive ? "var(--border-mid)" : "var(--border)",
                      transition: "background 0.25s",
                      flexShrink: 0,
                    }} />

                    {/* Card */}
                    <div style={{
                      padding: "0.8rem 0.9rem",
                      borderRadius: "1.1rem",
                      width: "calc(100% - 1.6rem)",
                      textAlign: "left",
                      background: isActive ? "var(--glass-bg)" : "transparent",
                      backdropFilter: isActive ? "var(--glass-filter)" : "none",
                      WebkitBackdropFilter: isActive ? "var(--glass-filter)" : "none",
                      border: `1px solid ${isActive ? "var(--glass-border)" : "transparent"}`,
                      boxShadow: isActive ? "0 1px 0 var(--glass-inset) inset, 0 4px 20px var(--glass-shadow)" : "none",
                      transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                    }}>
                      <p style={{
                        fontSize: "0.77rem",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: "var(--text)",
                        lineHeight: 1.3,
                        marginBottom: "0.2rem",
                      }}>
                        {item.title[lang]}
                      </p>
                      <p style={{
                        fontSize: "0.64rem",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}>
                        {item.place}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      </FadeInView>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(0,0,0,0.28)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Overlay panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(560px, calc(100vw - 3rem))",
              zIndex: 50,
              background: "var(--glass-bg)",
              backdropFilter: "var(--glass-filter)",
              WebkitBackdropFilter: "var(--glass-filter)",
              border: "1px solid var(--glass-border)",
              borderRadius: "1.75rem",
              boxShadow: "0 1px 0 var(--glass-inset) inset, 0 20px 60px var(--glass-shadow)",
              padding: "1.75rem 2rem",
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.28rem",
                  fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--text-subtle)",
                  border: active.type === "education" ? "1px solid var(--border-mid)" : "1px dashed var(--border-mid)",
                  padding: "0.2rem 0.65rem", borderRadius: "100px",
                }}>
                  {active.type === "education" ? <IconEdu /> : <IconWork />}
                  {active.type === "education" ? t.education : t.work}
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-muted)" }}>{active.year}</span>
                {active.current && (
                  <span style={{
                    fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    background: "var(--text)", color: "var(--bg)", padding: "0.2rem 0.6rem", borderRadius: "100px",
                  }}>
                    {t.current}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label={t.close}
                style={{
                  all: "unset", cursor: "none",
                  width: "28px", height: "28px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  color: "var(--text-muted)",
                  background: "var(--surface-bg)",
                  border: "1px solid var(--surface-border)",
                  fontSize: "1rem", lineHeight: 1,
                  transition: "color 0.2s",
                }}
              >
                ×
              </button>
            </div>

            {/* Title + place */}
            <h3 style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              lineHeight: 1.2,
              marginBottom: "0.35rem",
            }}>
              {active.title[lang]}
            </h3>
            <p style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              fontWeight: 500,
              marginBottom: active.description || active.tags ? "1rem" : 0,
            }}>
              {active.place}
            </p>

            {active.description && (
              <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
                {active.description[lang]}
              </p>
            )}

            {active.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "1rem" }}>
                {active.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            )}

            {/* No description fallback */}
            {!active.description && !active.tags && (
              <p style={{ fontSize: "0.82rem", color: "var(--text-subtle)", fontStyle: "italic" }}>—</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
