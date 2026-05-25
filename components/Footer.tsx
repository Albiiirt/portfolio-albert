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
        borderTop: "1px solid rgba(120,180,140,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(74,106,84,0.5)",
        }}
      >
        {tx.copy}
      </span>

      <span
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.08em",
          color: "rgba(74,106,84,0.35)",
        }}
      >
        © {new Date().getFullYear()} — {tx.rights}
      </span>

      <div
        style={{
          width: "28px",
          height: "1px",
          background: "linear-gradient(90deg, #3dbe6f, #c4a35a)",
          borderRadius: "1px",
          opacity: 0.5,
        }}
      />
    </footer>
  );
}
