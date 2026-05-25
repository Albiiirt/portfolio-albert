"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const lineReveal = {
  hidden: { y: "105%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
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
      {/* Gradient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Hero heading */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
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

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginTop: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          {/* Name + role */}
          <div>
            <p
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#666680",
                marginBottom: "0.25rem",
              }}
            >
              Albert Canadas
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#888899",
                letterSpacing: "0.04em",
              }}
            >
              {tx.role}
            </p>
          </div>

          {/* Availability badge */}
          <div
            className="glass"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.75rem 1.25rem",
            }}
          >
            <span className="status-dot" />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#f0f0f5",
                letterSpacing: "0.02em",
              }}
            >
              {tx.availability}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "clamp(2rem, 4vw, 4rem)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#666680",
          }}
        >
          {tx.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, #7b2fbe, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
