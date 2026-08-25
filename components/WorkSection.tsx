"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import { projects } from "@/data/projects";
import { EASE } from "@/lib/animations";
import FadeInView from "@/components/FadeInView";
import Image from "next/image";

const FEATURED_IDS = ["elbulli", "madrid", "castellera", "turisme-jaen", "mirazur"];
const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);

function SlideCard({
  p,
  lang,
  viewCase,
  active,
  idx,
  cardRef,
}: {
  p: typeof featured[0];
  lang: Lang;
  viewCase: string;
  active: boolean;
  idx: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={cardRef}
      data-idx={idx}
      className="work-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        position: "relative",
        flex: "0 0 auto",
        width: "clamp(280px, 78vw, 440px)",
        aspectRatio: "3 / 4",
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: p.gradient,
        scrollSnapAlign: "start",
        border: active ? "1px solid var(--border-mid)" : "1px solid transparent",
        transition: "border-color 0.35s",
      }}
    >
      <Link
        href={`/proyectos/${p.id}`}
        className="cursor-hidden"
        style={{ display: "block", position: "absolute", inset: 0, textDecoration: "none" }}
      >
        {p.video && (
          <video autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={p.video} type="video/mp4" />
          </video>
        )}
        {!p.video && p.cover && (
          <Image src={p.cover} alt="" fill sizes="(max-width: 640px) 78vw, 440px"
            style={{ objectFit: "cover", objectPosition: "center" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.76) 45%, rgba(0,0,0,0.16) 72%, transparent 100%)" }} />

        <div style={{ position: "absolute", top: "1.25rem", left: "1.5rem", right: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "0.28rem 0.7rem", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)" }}>
            {p.category[lang]}
          </span>
          <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
            {p.year}
          </span>
          <span style={{ marginLeft: "auto", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>
            {p.num}
          </span>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          <h3 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.15, margin: 0 }}>
            {p.title[lang]}
          </h3>
          <p className="work-card-desc" style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "rgba(255,255,255,0.78)", margin: 0 }}>
            {p.description[lang]}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.15rem" }}>
            {p.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", padding: "0.2rem 0.6rem", borderRadius: "100px" }}>
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px", alignSelf: "flex-start", marginTop: "0.2rem" }}>
            {viewCase} →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// Desktop featured-card variants — animate on the X axis since the trigger
// is now a horizontal numbered row, not vertical page scroll.
const cardVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

const cardVariantsReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function WorkSection() {
  const { lang } = useLang();
  const tx = t[lang].work;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIdx = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const project = featured[active];

  // Track which card is most visible inside the slider as the user scrolls/swipes.
  // Scoped entirely to the slider container (IntersectionObserver root) — never
  // touches window/document scroll, so it can't ever intercept the nav's
  // scroll-to-anchor clicks the way a page-level scroll listener would.
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    const ratios = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          ratios.set(idx, entry.intersectionRatio);
        });
        let bestIdx = 0;
        let bestRatio = -1;
        ratios.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        // Only trust a genuine intersection. The sentinel starts at -1, so a
        // ratio of 0 would otherwise "win" and could reset the featured
        // desktop card to a stale index while the slider sits hidden
        // (display: none) behind the ≥901px breakpoint.
        if (bestRatio > 0) setActive(bestIdx);
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    cardEls.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    prevIdx.current = i;
    const container = sliderRef.current;
    const card = cardEls.current[i];
    if (container && card) {
      const padLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      const delta = card.getBoundingClientRect().left - container.getBoundingClientRect().left;
      container.scrollTo({ left: container.scrollLeft + delta - padLeft, behavior: "smooth" });
    }
    setActive(i);
  };

  return (
    <section id="work" className="work-section" style={{ background: "var(--bg)", padding: "clamp(5rem, 10vh, 9rem) 0" }}>

      {/* Heading */}
      <div style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)", marginBottom: "clamp(2.5rem, 4.5vh, 3.5rem)" }}>
        <div className="site-content">
          <FadeInView>
            <p className="section-label" style={{ marginBottom: "0.65rem" }}>{tx.label}</p>
            <h2 style={{ margin: 0, lineHeight: 1.05 }}>
              <span style={{ display: "block", fontSize: "var(--text-display)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>
                {tx.heading}
              </span>
              <span style={{ display: "block", fontSize: "var(--text-display)", fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: "var(--text-muted)" }}>
                {tx.headingItalic}
              </span>
            </h2>
          </FadeInView>
        </div>
      </div>

      {/* Numbered nav — horizontal, scrolls its own row on narrow screens */}
      <div style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)", marginBottom: "clamp(1.75rem, 3.5vh, 2.75rem)" }}>
        <FadeInView delay={0.05} y={12}>
          <div className="site-content work-nav" style={{ display: "flex", gap: "clamp(1rem, 2.5vw, 2.25rem)", overflowX: "auto", scrollbarWidth: "none", borderBottom: "1px solid var(--border)" }}>
            {featured.map((p, i) => (
              <button
                key={p.id}
                className="work-nav-item"
                onClick={() => goTo(i)}
                aria-current={i === active ? "true" : undefined}
                style={{
                  all: "unset", cursor: "inherit",
                  display: "flex", alignItems: "center", gap: "0.55rem",
                  padding: "0 0 0.85rem 0",
                  flexShrink: 0,
                  borderBottom: `2px solid ${i === active ? "var(--text)" : "transparent"}`,
                  marginBottom: "-1px",
                  transition: "border-color 0.35s",
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
                  fontSize: "0.85rem",
                  fontWeight: i === active ? 700 : 400,
                  color: i === active ? "var(--text)" : "var(--text-muted)",
                  whiteSpace: "nowrap",
                  transition: "color 0.35s, font-weight 0.1s",
                }}>
                  {p.title[lang]}
                </span>
              </button>
            ))}
          </div>
        </FadeInView>
      </div>

      {/* Horizontal slider — mobile/tablet (≤900px) */}
      <div className="work-slider-wrap">
        <FadeInView delay={0.1} y={16}>
          <div
            ref={sliderRef}
            className="work-slider"
            style={{
              display: "flex",
              gap: "clamp(1rem, 2vw, 1.5rem)",
              overflowX: "auto",
              scrollSnapType: "x proximity",
              paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
              paddingRight: "clamp(1.5rem, 5vw, 5rem)",
              paddingBottom: "0.5rem",
              scrollbarWidth: "none",
              scrollPaddingLeft: "clamp(1.5rem, 5vw, 5rem)",
              scrollPaddingRight: "clamp(1.5rem, 5vw, 5rem)",
            }}
          >
            {featured.map((p, i) => (
              <SlideCard
                key={p.id}
                p={p}
                lang={lang}
                viewCase={tx.viewCase}
                active={i === active}
                idx={i}
                cardRef={(el) => { cardEls.current[i] = el; }}
              />
            ))}
          </div>
        </FadeInView>
      </div>

      {/* Featured card — desktop (≥901px), driven by the numbered nav above */}
      <div className="work-featured-wrap" style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}>
        <FadeInView delay={0.1} y={16}>
          <div className="site-content">
            <div style={{ position: "relative", maxWidth: "880px", aspectRatio: "3 / 2" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={prefersReducedMotion ? cardVariantsReduced : cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.42, ease: EASE }}
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
                    className="cursor-hidden"
                    style={{ display: "block", position: "absolute", inset: 0, textDecoration: "none" }}
                  >
                    {project.video && (
                      <video autoPlay muted loop playsInline
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
                        <source src={project.video} type="video/mp4" />
                      </video>
                    )}
                    {!project.video && project.cover && (
                      <Image src={project.cover} alt="" fill
                        sizes="(max-width: 900px) 100vw, 880px"
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
        </FadeInView>
      </div>

      {/* Ver todos */}
      <div style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)", marginTop: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="site-content">
          <Link href="/proyectos" className="btn-ghost">
            {tx.viewAll} →
          </Link>
        </div>
      </div>

    </section>
  );
}
