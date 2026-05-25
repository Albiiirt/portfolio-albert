"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function Navigation() {
  const { lang, toggle } = useLang();
  const tx = t[lang].nav;
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "ca", label: "CA" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        position: "fixed",
        top: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "max-content",
        maxWidth: "calc(100vw - 2rem)",
      }}
    >
      <div
        className="liquid-pill"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
          padding: "0.45rem 0.65rem",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1c2b20",
            background: "none",
            border: "none",
            cursor: "none",
            padding: "0.35rem 0.8rem",
          }}
        >
          AC
        </button>

        <div style={{ width: 1, height: 16, background: "rgba(74,122,92,0.2)", flexShrink: 0 }} />

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: tx.work, id: "work" },
            { label: tx.about, id: "about" },
            { label: tx.contact, id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link"
              style={{ padding: "0.35rem 0.75rem" }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ width: 1, height: 16, background: "rgba(74,122,92,0.2)", flexShrink: 0 }} />

        {/* Language selector */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 0.3rem", gap: "0.05rem" }}>
          {langs.map(({ code, label }, i) => (
            <span key={code} style={{ display: "flex", alignItems: "center", gap: "0.05rem" }}>
              <button
                onClick={toggle}
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  padding: "0.35rem 0.45rem",
                  color: lang === code ? "#1c2b20" : "rgba(28,43,32,0.3)",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </button>
              {i < langs.length - 1 && (
                <span style={{ color: "rgba(74,122,92,0.25)", fontSize: "0.55rem" }}>/</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
