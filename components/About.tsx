"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-20%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-label"
        style={{ marginBottom: "2rem" }}
      >
        {tx.label}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="display-heading"
        style={{
          maxWidth: "800px",
          marginBottom: "clamp(1.5rem, 3vw, 3rem)",
          whiteSpace: "pre-line",
        }}
      >
        {tx.heading.split("\n").map((line, i) =>
          i === 0 ? (
            <span key={i}>
              {line}
              <br />
            </span>
          ) : (
            <span key={i} className="text-gradient">
              {line}
            </span>
          )
        )}
      </motion.h2>

      {/* Intro text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
          lineHeight: 1.75,
          color: "#888899",
          maxWidth: "580px",
          marginBottom: "clamp(3rem, 6vw, 6rem)",
        }}
      >
        {tx.intro}
      </motion.p>

      {/* Steps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {tx.steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="glass"
            style={{
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Big background number */}
            <span
              style={{
                position: "absolute",
                top: "-0.5rem",
                right: "1rem",
                fontSize: "5rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.03)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {step.num}
            </span>

            {/* Step number */}
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7b2fbe",
                marginBottom: "1rem",
              }}
            >
              {step.num}
            </p>

            {/* Divider */}
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "linear-gradient(90deg, #7b2fbe, #00d4ff)",
                borderRadius: "1px",
                marginBottom: "1.25rem",
              }}
            />

            {/* Title */}
            <h3
              style={{
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#f0f0f5",
                marginBottom: "0.75rem",
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "#666680",
              }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
