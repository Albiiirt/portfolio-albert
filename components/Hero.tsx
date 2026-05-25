"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

const lineReveal = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "clamp(3rem, 6vw, 6rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Blobs — these bleed through the glass components */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />

      {/* Soft vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 130% 90% at 55% 45%, transparent 35%, rgba(240,235,224,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <motion.div variants={container} initial="hidden" animate="show">
          {[tx.line1, tx.line2, tx.line3, tx.line4].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.h1
                variants={lineReveal}
                className={`hero-heading${i === 2 ? " text-gradient" : ""}`}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginTop: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8db89a",
                marginBottom: "0.3rem",
              }}
            >
              Albert Canadas
            </p>
            <p style={{ fontSize: "0.875rem", color: "rgba(28,43,32,0.45)", letterSpacing: "0.04em" }}>
              {tx.role}
            </p>
          </div>

          {/* Liquid Glass availability badge */}
          <div
            className="liquid-pill"
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.65rem 1.25rem" }}
          >
            <span className="status-dot" />
            <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#2d5a3c" }}>
              {tx.availability}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vw, 3rem)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8db89a" }}>
          {tx.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "36px", background: "linear-gradient(180deg, #4a7a5c, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
