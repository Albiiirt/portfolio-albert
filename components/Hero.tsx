"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};

const lineReveal = {
  hidden: { y: "108%", opacity: 0 },
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
        background: "#f7f3ea",
      }}
    >
      {/* Organic dappled light blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />

      {/* Very light vignette to keep edges warm */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 150% 100% at 60% 40%, transparent 30%, rgba(247,243,234,0.45) 100%)",
          pointerEvents: "none", zIndex: 1,
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
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8b8a0", marginBottom: "0.3rem" }}>
              Albert Canadas
            </p>
            <p style={{ fontSize: "0.875rem", color: "rgba(30,26,20,0.4)", letterSpacing: "0.03em" }}>
              {tx.role}
            </p>
          </div>

          {/* Availability — Liquid Glass pill */}
          <div className="liquid-pill" style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.65rem 1.3rem" }}>
            <span className="status-dot" />
            <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#2a5038" }}>
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
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8b8a0" }}>
          {tx.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "32px", background: "linear-gradient(180deg, #5a8c6a, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
