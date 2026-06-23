"use client";

import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FadeInView from "@/components/FadeInView";
import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

const experience = [
  {
    company: "Dosgrapas",
    period: "Oct. 2025 – Actualidad",
    role: "Diseñador Web / Frontend",
    bullets: [
      "Diseño de sistemas de interfaz completos para clientes de turismo, cultura y tecnología",
      "Clientes: Turisme Jaén, La Rioja Turismo, Fundació elBulli, GNOSS (IA), BICCO",
      "Diseño en Figma e implementación con Framer, Next.js y Claude Code",
      "Diseño y mantenimiento de sistemas de diseño a escala",
      "Entrega hasta producción — no solo archivos Figma",
    ],
  },
  {
    company: "8000 Estels",
    period: "2024",
    role: "Voluntario · UX Designer",
    bullets: [
      "Arquitectura de la información y análisis de experiencia de usuario",
      "Auditoría de webs y análisis de usabilidad",
      "Manuales de marca, wireframes y presentaciones para clientes",
    ],
  },
  {
    company: "BAU – Universitat d'Art i Disseny",
    period: "2024",
    role: "UX Designer · Prácticas",
    bullets: [
      "Investigación de usuarios, UX y business mapping",
      "Análisis de marca, tendencias y competencia",
    ],
  },
  {
    company: "EREBUS / Ionfilter / BMK",
    period: "2021 – 2023",
    role: "Diseñador Gráfico",
    bullets: [
      "Diseño gráfico y comunicación visual para marcas de sectores industriales y de consumo",
    ],
  },
];

const education = [
  {
    degree: "Máster en Marketing y Comunicación Digital",
    school: "En curso",
    period: "2025 – actualidad",
    tags: ["Google Ads", "Meta Ads", "Figma", "WordPress"],
  },
  {
    degree: "Máster en Digital Experience Design",
    school: "BAU – Universitat d'Art i Disseny · Barcelona",
    period: "2023 – 2024",
    tags: [],
  },
  {
    degree: "CFGS Diseño Gráfico · 2x3",
    school: "EMAD · La Garriga",
    period: "2020 – 2023",
    tags: [],
  },
];

const tools = [
  "Figma", "Framer", "Next.js", "React", "Claude Code",
  "HTML & CSS", "FigJam", "WordPress", "Illustrator",
  "Photoshop", "After Effects", "Google Ads", "Meta Ads",
];

const skills = [
  "Diseño UI/UX",
  "Wireframing y prototipado",
  "Investigación de usuarios",
  "Arquitectura de la información",
  "Accesibilidad (WCAG)",
  "Design Thinking",
];

const languages = [
  { name: "Catalán", level: "Nativo" },
  { name: "Castellano", level: "Nativo" },
  { name: "Inglés", level: "Intermedio" },
];

export default function CvPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main style={{
        background: "var(--bg)",
        paddingTop: "clamp(6rem, 12vh, 9rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
        paddingRight: "clamp(1.5rem, 6vw, 6rem)",
        minHeight: "100svh",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--border-mid)",
              marginBottom: "clamp(2.5rem, 5vh, 4rem)",
            }}
          >
            <div>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.5rem" }}>
                Currículum
              </p>
              <h1 style={{ margin: 0, lineHeight: 1, display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                <span style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)" }}>
                  Albert
                </span>
                <span style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: "var(--text-muted)", letterSpacing: "-0.01em" }}>
                  Canadés
                </span>
              </h1>
              <p style={{ marginTop: "0.75rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                Diseñador Web · UI/UX · Frontend
              </p>
            </div>

            <a
              href="/albert-canadas-cv.pdf"
              download="Albert-Canadas-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flexShrink: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 2v8M4 7l4 4 4-4M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Descargar PDF
            </a>
          </motion.div>

          {/* ── Bio ── */}
          <FadeInView>
            <p style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: "720px",
              marginBottom: "clamp(3rem, 6vh, 5rem)",
              borderLeft: "2px solid var(--border-mid)",
              paddingLeft: "1.5rem",
            }}>
              Diseñador web con experiencia real en producción. Trabajo en turismo, cultura y tecnología — proyectos como Turisme Jaén, La Rioja Turismo, Fundació elBulli y Enoturismo Madrid. Mi diferencial: diseño sistemas de interfaz completos en Figma y los llevo al navegador con Framer, Next.js y Claude Code. No entrego solo archivos.
            </p>
          </FadeInView>

          {/* ── Two columns ── */}
          <div className="cv-grid" style={{
            display: "grid",
            gridTemplateColumns: "clamp(180px, 22%, 260px) 1fr",
            gap: "clamp(2.5rem, 6vw, 6rem)",
            alignItems: "start",
          }}>

            {/* ── Sidebar ── */}
            <aside className="cv-sidebar" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* Contact */}
              <FadeInView delay={0.05}>
                <div>
                  <p className="section-label" style={{ marginBottom: "1rem" }}>Contacto</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { label: "Email", value: "acanades@gmail.com", href: "mailto:acanades@gmail.com" },
                      { label: "Tel", value: "636 976 307", href: "tel:+34636976307" },
                      { label: "Ciudad", value: "Barcelona" },
                      { label: "LinkedIn", value: "albertcanadas", href: "https://www.linkedin.com/in/albertcanadas/" },
                    ].map(({ label, value, href }) => (
                      <div key={label}>
                        <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.15rem" }}>{label}</p>
                        {href ? (
                          <a href={href} style={{ fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", borderBottom: "1px solid var(--border-mid)" }}>{value}</a>
                        ) : (
                          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInView>

              {/* Herramientas */}
              <FadeInView delay={0.1}>
                <div>
                  <p className="section-label" style={{ marginBottom: "1rem" }}>Herramientas</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {tools.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </FadeInView>

              {/* Competencias */}
              <FadeInView delay={0.15}>
                <div>
                  <p className="section-label" style={{ marginBottom: "1rem" }}>Competencias</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {skills.map((s) => (
                      <li key={s} style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-subtle)", flexShrink: 0 }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>

              {/* Idiomas */}
              <FadeInView delay={0.2}>
                <div>
                  <p className="section-label" style={{ marginBottom: "1rem" }}>Idiomas</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {languages.map(({ name, level }) => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{name}</span>
                        <span style={{ fontSize: "0.67rem", fontWeight: 500, color: "var(--text-subtle)", letterSpacing: "0.04em" }}>{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInView>

            </aside>

            {/* ── Main content ── */}
            <div className="cv-main" style={{ display: "flex", flexDirection: "column", gap: "clamp(2.5rem, 5vh, 4rem)" }}>

              {/* Experiencia */}
              <FadeInView delay={0.05}>
                <div>
                  <p className="section-label" style={{ marginBottom: "1.75rem" }}>Experiencia profesional</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {experience.map((job) => (
                      <div key={job.company} style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.35rem" }}>
                          <h2 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: 0 }}>
                            {job.company}
                          </h2>
                          <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--text-subtle)", flexShrink: 0 }}>
                            {job.period}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: job.bullets.length ? "0.85rem" : 0, letterSpacing: "0.02em" }}>
                          {job.role}
                        </p>
                        {job.bullets.length > 0 && (
                          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            {job.bullets.map((b) => (
                              <li key={b} style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--text-muted)", display: "flex", gap: "0.75rem" }}>
                                <span style={{ color: "var(--text-subtle)", flexShrink: 0, marginTop: "0.45em" }}>·</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInView>

              {/* Formación */}
              <FadeInView delay={0.1}>
                <div>
                  <p className="section-label" style={{ marginBottom: "1.75rem" }}>Formación</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {education.map((ed) => (
                      <div key={ed.degree} style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <h2 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: 0 }}>
                            {ed.degree}
                          </h2>
                          <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--text-subtle)", flexShrink: 0 }}>
                            {ed.period}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-subtle)", marginBottom: ed.tags.length ? "0.75rem" : 0 }}>
                          {ed.school}
                        </p>
                        {ed.tags.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                            {ed.tags.map((tag) => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInView>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
