"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";
import { EASE } from "@/lib/animations";
import Image from "next/image";

const FEATURED_IDS = ["elbulli", "madrid", "castellera", "turisme-jaen", "mirazur"];
const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);

const cardVariants = {
  enter: (dir: number) => ({ y: dir * 50, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir * -50, opacity: 0 }),
};

function AccordionCard({ p, lang, viewCase }: { p: typeof featured[0]; lang: string; viewCase: string }) {
  return (
    <Link href={`/proyectos/${p.id}`} style={{ display: "block", textDecoration: "none", cursor: "none" }}>
      <div style={{
        position: "relative",
        height: "clamp(200px, 38vw, 300px)",
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: p.gradient,
        marginTop: "0.25rem",
        marginBottom: "0.5rem",
      }}>
        {p.video && (
          <video autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={p.video} type="video/mp4" />
          </video>
        )}
        {!p.video && p.cover && (
          <Image src={p.cover} alt="" fill sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.15) 75%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "1rem", left: "1.25rem", display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "0.25rem 0.65rem", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)" }}>
            {(p.category as Record<string, string>)[lang]}
          </span>
          <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
            {p.year}
          </span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.15, margin: 0 }}>
            {(p.title as Record<string, string>)[lang]}
          </h3>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.55, color: "rgba(255,255,255,0.75)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
            {(p.description as Record<string, string>)[lang]}
          </p>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px", alignSelf: "flex-end" }}>
            {viewCase} →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function WorkSection() {
  const { lang } = useLang();
  const tx = t[lang].work;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIdx = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const project = featured[active];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * featured.length), featured.length - 1);
    if (idx !== prevIdx.current) {
      setDirection(idx > prevIdx.current ? 1 : -1);
      setActive(idx);
      prevIdx.current = idx;
    }
  });

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
    prevIdx.current = i;
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work-section"
      style={{ height: `${featured.length * 100}svh`, background: "var(--bg)" }}
    >
      {/* Sticky viewport */}
      <div className="work-sticky" style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(5rem, 9vh, 7rem) clamp(1.5rem, 5vw, 5rem) clamp(2.5rem, 5vh, 4.5rem)",
      }}>
        <div className="site-content" style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

          {/* Heading */}
          <div style={{ marginBottom: "clamp(2rem, 4vh, 3.5rem)", flexShrink: 0 }}>
            <p className="section-label" style={{ marginBottom: "0.65rem" }}>{tx.label}</p>
            <h2 style={{ margin: 0, lineHeight: 1.05 }}>
              <span style={{ display: "block", fontSize: "var(--text-display)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>
                {tx.heading}
              </span>
              <span style={{ display: "block", fontSize: "var(--text-display)", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: "var(--text-muted)" }}>
                {tx.headingItalic}
              </span>
            </h2>
          </div>

          {/* Grid: list + card */}
          <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(2rem, 4vw, 5rem)", flex: 1, minHeight: 0 }}>

            {/* Left: list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vh, 1.5rem)", alignSelf: "start" }}>
              <nav style={{ display: "flex", flexDirection: "column" }}>
                {featured.map((p, i) => (
                  <div key={p.id}>
                    <button
                      onClick={() => goTo(i)}
                      style={{
                        all: "unset", cursor: "none",
                        display: "flex", alignItems: "center", gap: "1rem",
                        padding: "0.85rem 0",
                        borderBottom: "1px solid var(--border)",
                        width: "100%",
                      }}
                    >
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em",
                        color: i === active ? "var(--text)" : "var(--text-subtle)",
                        transition: "color 0.35s", flexShrink: 0,
                      }}>
                        {p.num}
                      </span>
                      <span style={{
                        fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                        fontWeight: i === active ? 700 : 400,
                        color: i === active ? "var(--text)" : "var(--text-muted)",
                        transition: "color 0.35s, font-weight 0.1s",
                      }}>
                        {p.title[lang]}
                      </span>
                      {i === active && (
                        <span style={{ marginLeft: "auto", width: "5px", height: "5px", borderRadius: "50%", background: "var(--text)", flexShrink: 0 }} />
                      )}
                    </button>

                    {/* Accordion panel — visible on tablet/mobile only via CSS */}
                    <AnimatePresence initial={false}>
                      {i === active && (
                        <motion.div
                          key={`accordion-${p.id}`}
                          className="work-accordion"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ overflow: "hidden" }}
                        >
                          <AccordionCard p={p} lang={lang} viewCase={tx.viewCase} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Ver todos */}
              <div style={{ paddingTop: "0.75rem" }}>
                <a href="/proyectos" className="btn-ghost">
                  {tx.viewAll} →
                </a>
              </div>
            </div>

            {/* Right: card column — desktop only */}
            <div className="work-card-wrap" style={{ position: "relative", height: "100%", minHeight: 0, maxHeight: "min(74vh, 740px)" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: EASE }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    background: project.gradient,
                  }}
                >
                  <Link
                    href={`/proyectos/${project.id}`}
                    style={{ display: "block", position: "absolute", inset: 0, textDecoration: "none", cursor: "none" }}
                  >
                    {project.video && (
                      <video autoPlay muted loop playsInline
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
                        <source src={project.video} type="video/mp4" />
                      </video>
                    )}
                    {!project.video && project.cover && (
                      <Image src={project.cover} alt="" fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        style={{ objectFit: "cover", objectPosition: "center" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.18) 70%, transparent 100%)" }} />
                    <div style={{ position: "absolute", top: "1.5rem", left: "1.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "0.3rem 0.75rem", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {project.category[lang]}
                      </span>
                      <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                        {project.year}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      <h3 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.15, margin: 0 }}>
                        {project.title[lang]}
                      </h3>
                      <p className="work-card-desc" style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)", margin: 0, maxWidth: "520px" }}>
                        {project.description[lang]}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", padding: "0.22rem 0.65rem", borderRadius: "100px" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px", letterSpacing: "0.01em" }}>
                          {tx.viewCase} →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
