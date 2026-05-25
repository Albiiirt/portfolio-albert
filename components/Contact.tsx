"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function Contact() {
  const { lang } = useLang();
  const tx = t[lang].contact;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "clamp(5rem, 10vw, 12rem) clamp(1.5rem, 5vw, 5rem)", position: "relative", overflow: "hidden", background: "#f7f3ea" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 65%, rgba(140,195,155,0.38) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label" style={{ marginBottom: "1.75rem" }}>
          {tx.label}
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: EASE }} className="display-heading" style={{ marginBottom: "1.25rem" }}>
          {tx.heading.split("\n")[0]}<br />
          <span className="text-gradient">{tx.heading.split("\n")[1]}</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: "1rem", color: "rgba(30,26,20,0.42)", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          {tx.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center", marginBottom: "clamp(3rem, 6vw, 6rem)" }}
        >
          <a href={`mailto:${tx.email}`} className="btn-primary">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 4l6 4.5L14 4M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {tx.cta}
          </a>
          <a href="https://www.linkedin.com/in/albertcanadas/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {tx.linkedin}
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
          <div className="divider" style={{ marginBottom: "1.75rem" }} />
          <a
            href={`mailto:${tx.email}`}
            style={{ fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)", color: "rgba(90,140,106,0.5)", letterSpacing: "0.06em", textDecoration: "none", fontWeight: 500, transition: "color 0.28s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1e1a14")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(90,140,106,0.5)")}
          >
            {tx.email}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
