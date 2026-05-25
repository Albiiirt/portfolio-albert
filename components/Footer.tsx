"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  return (
    <footer
      style={{
        padding: "1.75rem clamp(1.5rem, 5vw, 5rem)",
        borderTop: "1px solid rgba(74,122,92,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(28,43,32,0.3)" }}>
        {tx.copy}
      </span>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "rgba(28,43,32,0.25)" }}>
        © {new Date().getFullYear()} — {tx.rights}
      </span>
      <div style={{ width: "28px", height: "1px", background: "linear-gradient(90deg, #4a7a5c, #9a7040)", borderRadius: "1px", opacity: 0.5 }} />
    </footer>
  );
}
