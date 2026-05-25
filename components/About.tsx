"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
      {/* Background glow — like morning light through canopy */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-15%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(196,163,90,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-label"
        style={{ marginBottom: "1.75rem" }}
      >
        {tx.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="display-heading"
        style={{ maxWidth: "780px", marginBottom: "1.5rem" }}
      >
        {tx.heading.split("\n")[0]}
        <br />
        <span className="text-gradient">{tx.heading.split("\n")[1]}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
          lineHeight: 1.75,
          color: "rgba(221,234,224,0.5)",
          maxWidth: "540px",
          marginBottom: "clamp(3rem, 6vw, 6rem)",
        }}
      >
        {tx.intro}
      </motion.p>

      {/* Steps — Liquid Glass cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {tx.steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
            className="liquid-glass"
            style={{
              padding: "clamp(1.5rem, 2.5vw, 2.25rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ghost number */}
            <span
              style={{
                position: "absolute",
                top: "-0.75rem",
                right: "0.75rem",
                fontSize: "5.5rem",
                fontWeight: 700,
                color: "rgba(61,190,111,0.04)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {step.num}
            </span>

            {/* Step num label */}
            <p
              style={{
                fontSize: "0.63rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(61,190,111,0.65)",
                marginBottom: "1rem",
              }}
            >
              {step.num}
            </p>

            {/* Accent line */}
            <div
              style={{
                width: "28px",
                height: "1.5px",
                background: "linear-gradient(90deg, #3dbe6f, #c4a35a)",
                borderRadius: "1px",
                marginBottom: "1.25rem",
              }}
            />

            <h3
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#ddeae0",
                marginBottom: "0.75rem",
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(221,234,224,0.45)",
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
