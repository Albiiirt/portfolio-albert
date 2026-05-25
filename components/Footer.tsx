"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  return (
    <footer
      style={{
        padding: "2rem clamp(1.5rem, 5vw, 5rem)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#2a2a40",
        }}
      >
        {tx.copy}
      </span>

      <span
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "#2a2a40",
        }}
      >
        © {new Date().getFullYear()} — {tx.rights}
      </span>

      <div
        style={{
          width: "32px",
          height: "1px",
          background: "linear-gradient(90deg, #7b2fbe, #00d4ff)",
          borderRadius: "1px",
        }}
      />
    </footer>
  );
}
