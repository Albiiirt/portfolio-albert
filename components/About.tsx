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
      style={{ padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)", position: "relative", overflow: "hidden", background: "#f7f3ea" }}
    >
      {/* Warm amber light — bleeds through glass cards */}
      <div style={{ position: "absolute", top: "5%", right: "-8%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(210,175,110,0.55) 0%, transparent 65%)", filter: "blur(65px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "15%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(140,195,155,0.5) 0%, transparent 65%)", filter: "blur(75px)", pointerEvents: "none" }} />

      <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label" style={{ marginBottom: "1.75rem" }}>
        {tx.label}
      </motion.p>

      <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: EASE }} className="display-heading" style={{ maxWidth: "780px", marginBottom: "1.5rem" }}>
        {tx.heading.split("\n")[0]}<br />
        <span className="text-gradient">{tx.heading.split("\n")[1]}</span>
      </motion.h2>

      <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.08rem)", lineHeight: 1.8, color: "rgba(30,26,20,0.5)", maxWidth: "520px", marginBottom: "clamp(3rem, 6vw, 6rem)" }}>
        {tx.intro}
      </motion.p>

      {/* Liquid Glass cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        {tx.steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
            className="liquid-glass-card"
            style={{ padding: "clamp(1.5rem, 2.5vw, 2.25rem)", position: "relative", overflow: "hidden" }}
          >
            <span style={{ position: "absolute", top: "-0.5rem", right: "0.75rem", fontSize: "5rem", fontWeight: 700, color: "rgba(90,140,106,0.06)", letterSpacing: "-0.05em", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
              {step.num}
            </span>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8b8a0", marginBottom: "1rem" }}>{step.num}</p>
            <div style={{ width: "26px", height: "1.5px", background: "linear-gradient(90deg, #5a8c6a, #8c6a3c)", borderRadius: "1px", marginBottom: "1.25rem" }} />
            <h3 style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1e1a14", marginBottom: "0.75rem" }}>{step.title}</h3>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.72, color: "rgba(30,26,20,0.5)" }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
