"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Navigation() {
  const { lang, toggle } = useLang();
  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "ca", label: "CA" },
  ];
  const tx = t[lang].nav;
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
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
          gap: "0.25rem",
          padding: "0.5rem 0.75rem",
        }}
      >
        {/* Logo mark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ddeae0",
            background: "none",
            border: "none",
            cursor: "none",
            padding: "0.35rem 0.75rem",
          }}
        >
          AC
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "18px",
            background: "rgba(120,180,140,0.2)",
            flexShrink: 0,
          }}
        />

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
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

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "18px",
            background: "rgba(120,180,140,0.2)",
            flexShrink: 0,
          }}
        />

        {/* Language selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.1rem", padding: "0 0.25rem" }}>
          {langs.map(({ code, label }, i) => (
            <span key={code} style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
              <button
                onClick={toggle}
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  padding: "0.35rem 0.5rem",
                  color: lang === code ? "#ddeae0" : "rgba(221,234,224,0.3)",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </button>
              {i < langs.length - 1 && (
                <span style={{ color: "rgba(120,180,140,0.25)", fontSize: "0.6rem" }}>/</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
