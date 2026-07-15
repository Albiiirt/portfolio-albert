"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function WorkSection() {
  const { lang } = useLang();
  const tx = t[lang].work;
  const [active, setActive] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);

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
        setActive(bestIdx);
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    cardEls.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    const container = sliderRef.current;
    const card = cardEls.current[i];
    if (!container || !card) return;
    const padLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const delta = card.getBoundingClientRect().left - container.getBoundingClientRect().left;
    container.scrollTo({ left: container.scrollLeft + delta - padLeft, behavior: "smooth" });
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
                onClick={() => goTo(i)}
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

      {/* Horizontal slider — full-bleed to the viewport edge, cards never hidden */}
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
