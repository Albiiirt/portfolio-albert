"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";
import { EASE } from "@/lib/animations";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const { lang } = useLang();
  const tx = t[lang].work;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/proyectos/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-hidden project-card"
      style={{
        display: "block",
        position: "relative",
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: project.gradient,
        aspectRatio: "16/9",
        textDecoration: "none",
        width: "100%",
      }}
    >
      {/* Cover image */}
      {project.cover && (
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
      }} />

      {/* Top row: category + year */}
      <div style={{
        position: "absolute", top: "1.5rem", left: "1.75rem",
        display: "flex", gap: "0.5rem", alignItems: "center",
      }}>
        <span style={{
          fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.9)",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)", padding: "0.3rem 0.75rem",
          borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)",
        }}>
          {project.category[lang]}
        </span>
        <span style={{
          fontSize: "0.6rem", fontWeight: 600,
          color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em",
        }}>
          {project.year}
        </span>
      </div>

      {/* Bottom content */}
      <div className="project-card-body" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1.75rem",
        display: "flex", flexDirection: "column", gap: "0.65rem",
      }}>
        <h2 style={{
          fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
          fontWeight: 700, letterSpacing: "-0.03em",
          color: "#fff", lineHeight: 1.15, margin: 0,
        }}>
          {project.title[lang]}
        </h2>

        <p className="project-card-desc" style={{
          fontSize: "0.85rem", lineHeight: 1.6,
          color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: "520px",
        }}>
          {project.description[lang]}
        </p>

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "0.75rem",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{
                fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.65)",
                background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.16)",
                padding: "0.2rem 0.6rem", borderRadius: "100px",
              }}>
                {tag}
              </span>
            ))}
          </div>

          <span style={{
              fontSize: "0.8rem", fontWeight: 600,
              color: "#fff", letterSpacing: "0.01em",
              borderBottom: "1px solid rgba(255,255,255,0.5)",
              paddingBottom: "2px", whiteSpace: "nowrap",
            }}
          >
            {tx.viewCase} →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProyectosPage() {
  const { lang } = useLang();

  const heading: Record<string, string> = {
    en: "Selected work",
    es: "Trabajo seleccionado",
    ca: "Treball seleccionat",
  };
  const label: Record<string, string> = {
    en: "Projects",
    es: "Proyectos",
    ca: "Projectes",
  };
  const subline: Record<string, string> = {
    en: `${projects.length} projects · UI/UX, Web, Design Systems`,
    es: `${projects.length} proyectos · UI/UX, Web, Sistemas de diseño`,
    ca: `${projects.length} projectes · UI/UX, Web, Sistemes de disseny`,
  };

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navigation />

        <main style={{
          minHeight: "100svh",
          padding: "clamp(6rem, 12vh, 9rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 8vh, 6rem)",
          background: "var(--bg)",
        }}>
          <div className="site-content">

            {/* Header */}
            <FadeInView>
              <div style={{ marginBottom: "clamp(3rem, 6vh, 5rem)" }}>
                <p className="section-label" style={{ marginBottom: "0.65rem" }}>
                  {label[lang]}
                </p>
                <div style={{
                  display: "flex", alignItems: "flex-end",
                  justifyContent: "space-between", gap: "2rem",
                  flexWrap: "wrap",
                }}>
                  <h1 style={{
                    fontSize: "var(--text-display)",
                    fontFamily: "var(--font-serif), 'Playfair Display', serif",
                    fontStyle: "italic", fontWeight: 400,
                    lineHeight: 1.05, color: "var(--text)", margin: 0,
                  }}>
                    {heading[lang]}
                  </h1>
                  <p style={{
                    fontSize: "0.82rem", color: "var(--text-subtle)",
                    letterSpacing: "0.02em", paddingBottom: "0.3rem",
                  }}>
                    {subline[lang]}
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* Mosaic grid */}
            <div className="projects-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(0.75rem, 1.2vw, 1.25rem)",
            }}>
              {projects.map((project, i) => (
                <FadeInView
                  key={project.id}
                  delay={i * 0.06}
                  style={{ height: "100%" }}
                >
                  <ProjectCard project={project} />
                </FadeInView>
              ))}
            </div>

          </div>
        </main>

        <Footer />
      </SmoothScroll>
    </>
  );
}
