"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

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
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "clamp(2.5rem, 5vw, 5rem)",
        }}
      >
        <p className="section-label">{tx.label}</p>
        <span
          style={{
            fontSize: "0.68rem",
            color: "rgba(74,106,84,0.6)",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          {tx.count}
        </span>
      </div>

      <div className="divider" style={{ marginBottom: 0 }} />

      {/* List */}
      {projects.map((project, i) => (
        <div key={project.id}>
          {/* Row */}
          <div
            className="project-row"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            {/* Hover glass background */}
            <motion.div
              animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(61,190,111,0.04) 0%, transparent 100%)",
                borderRadius: "4px",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto auto",
                alignItems: "center",
                gap: "clamp(1rem, 2.5vw, 2.5rem)",
                padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
                position: "relative",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: hoveredIndex === i ? "#3dbe6f" : "rgba(74,106,84,0.5)",
                  transition: "color 0.3s ease",
                }}
              >
                {project.num}
              </span>

              {/* Title */}
              <motion.h3
                animate={{ x: hoveredIndex === i ? 6 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{
                  fontSize: "clamp(1.3rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color:
                    hoveredIndex === i
                      ? "#ddeae0"
                      : "rgba(221,234,224,0.55)",
                  transition: "color 0.3s ease",
                }}
              >
                {project.title[lang]}
              </motion.h3>

              {/* Category + year */}
              <div
                className="hidden md:flex"
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(106,155,120,0.7)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {project.category[lang]}
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(74,106,84,0.5)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.year}
                </span>
              </div>

              {/* Toggle indicator */}
              <motion.div
                animate={{
                  rotate: expandedIndex === i ? 45 : 0,
                }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{
                  width: "clamp(26px, 2.5vw, 36px)",
                  height: "clamp(26px, 2.5vw, 36px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: `1px solid ${
                    hoveredIndex === i
                      ? "rgba(61,190,111,0.3)"
                      : "rgba(120,180,140,0.12)"
                  }`,
                  color:
                    hoveredIndex === i
                      ? "rgba(61,190,111,0.9)"
                      : "rgba(74,106,84,0.5)",
                  transition: "border-color 0.3s, color 0.3s",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2v8M2 6h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Expanded case study — Liquid Glass */}
          <AnimatePresence>
            {expandedIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="liquid-glass"
                  style={{
                    margin: "0 0 1.5rem 0",
                    padding: "clamp(1.5rem, 3vw, 3rem)",
                  }}
                >
                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 3 cols */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "2rem",
                    }}
                  >
                    {[
                      {
                        label: lang === "en" ? "The Problem" : "El Problema",
                        text: project.problem[lang],
                      },
                      {
                        label: lang === "en" ? "The Process" : "El Proceso",
                        text: project.process[lang],
                      },
                      {
                        label: lang === "en" ? "The Result" : "El Resultado",
                        text: project.result[lang],
                      },
                    ].map((col) => (
                      <div key={col.label}>
                        <p
                          style={{
                            fontSize: "0.63rem",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(61,190,111,0.7)",
                            marginBottom: "0.75rem",
                          }}
                        >
                          {col.label}
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            lineHeight: 1.75,
                            color: "rgba(221,234,224,0.6)",
                          }}
                        >
                          {col.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="divider" />
    </section>
  );
}
