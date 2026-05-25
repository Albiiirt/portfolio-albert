"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";

export default function WorkSection() {
  const { lang } = useLang();
  const tx = t[lang].work;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="work"
      style={{
        padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "clamp(3rem, 6vw, 6rem)",
        }}
      >
        <div>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            {tx.label}
          </p>
          <div className="divider" />
        </div>
        <span
          style={{
            fontSize: "0.7rem",
            color: "#444460",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          {tx.count}
        </span>
      </div>

      {/* Projects list */}
      <div style={{ position: "relative" }}>
        {projects.map((project, i) => (
          <div key={project.id}>
            {/* Project row */}
            <div
              className="project-row"
              style={{
                paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
                paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                cursor: "none",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() =>
                setExpandedIndex(expandedIndex === i ? null : i)
              }
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto",
                  alignItems: "center",
                  gap: "clamp(1rem, 3vw, 3rem)",
                }}
              >
                {/* Number */}
                <motion.span
                  animate={{
                    color: hoveredIndex === i ? "#7b2fbe" : "#2a2a40",
                    scale: hoveredIndex === i ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    fontVariantNumeric: "tabular-nums",
                    minWidth: "2rem",
                  }}
                >
                  {project.num}
                </motion.span>

                {/* Title block */}
                <div>
                  <motion.h3
                    animate={{
                      x: hoveredIndex === i ? 8 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                    style={{
                      fontSize: "clamp(1.3rem, 3.5vw, 2.8rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      color: hoveredIndex === i ? "#f0f0f5" : "#888899",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {project.title[lang]}
                  </motion.h3>
                </div>

                {/* Category + year */}
                <div
                  className="hidden md:flex"
                  style={{ flexDirection: "column", alignItems: "flex-end", gap: "0.2rem" }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#666680",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {project.category[lang]}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "#3a3a55",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{
                    rotate: expandedIndex === i ? 90 : 0,
                    x: hoveredIndex === i ? 4 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                  style={{
                    width: "clamp(28px, 3vw, 40px)",
                    height: "clamp(28px, 3vw, 40px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "50%",
                    color: hoveredIndex === i ? "#f0f0f5" : "#444460",
                    transition: "color 0.3s, border-color 0.3s",
                    borderColor: hoveredIndex === i ? "rgba(123,47,190,0.5)" : "rgba(255,255,255,0.08)",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Gradient preview bar on hover */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                style={{
                  marginTop: "1rem",
                  height: "2px",
                  background: project.gradient,
                  transformOrigin: "left",
                  borderRadius: "1px",
                }}
              />
            </div>

            {/* Expanded case study */}
            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "clamp(2rem, 4vw, 4rem)",
                      marginBottom: "1rem",
                      borderRadius: "16px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {/* Gradient visual */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: project.gradient,
                        opacity: 0.08,
                      }}
                    />
                    <div
                      style={{
                        border: `1px solid ${project.accentColor}22`,
                        borderRadius: "12px",
                        padding: "clamp(1.5rem, 3vw, 3rem)",
                        background: "rgba(255,255,255,0.02)",
                        backdropFilter: "blur(12px)",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "2rem",
                        }}
                      >
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 3 columns: Problem / Process / Result */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "2rem",
                        }}
                      >
                        {[
                          {
                            label: lang === "en" ? "The Problem" : "El Problema",
                            text: project.problem[lang],
                            accent: project.accentColor,
                          },
                          {
                            label: lang === "en" ? "The Process" : "El Proceso",
                            text: project.process[lang],
                            accent: project.accentColor,
                          },
                          {
                            label: lang === "en" ? "The Result" : "El Resultado",
                            text: project.result[lang],
                            accent: project.accentColor,
                          },
                        ].map((col) => (
                          <div key={col.label}>
                            <p
                              style={{
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: col.accent,
                                marginBottom: "0.75rem",
                              }}
                            >
                              {col.label}
                            </p>
                            <p
                              style={{
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                color: "#a0a0b8",
                              }}
                            >
                              {col.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Final border */}
        <div className="divider" />
      </div>
    </section>
  );
}
