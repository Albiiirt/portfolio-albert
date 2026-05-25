"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Navigation() {
  const { lang, toggle } = useLang();
  const tx = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
      style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          background: scrolled ? "rgba(7, 7, 15, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          borderRadius: scrolled ? "100px" : "0",
          padding: scrolled ? "0.75rem 1.5rem" : "0",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#f0f0f5",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "none",
          }}
        >
          Albert Canadas
        </button>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("work")} className="nav-link">
            {tx.work}
          </button>
          <button onClick={() => scrollTo("about")} className="nav-link">
            {tx.about}
          </button>
          <button onClick={() => scrollTo("contact")} className="nav-link">
            {tx.contact}
          </button>
        </nav>

        {/* Language toggle */}
        <button
          onClick={toggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#666680",
            background: "none",
            border: "none",
            cursor: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666680")}
        >
          <span style={{ color: lang === "en" ? "#f0f0f5" : "#666680" }}>EN</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ color: lang === "es" ? "#f0f0f5" : "#666680" }}>ES</span>
        </button>
      </div>
    </motion.header>
  );
}
