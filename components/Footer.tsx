"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  return (
    <footer style={{ padding: "1.75rem clamp(1.5rem, 5vw, 5rem)", borderTop: "1px solid rgba(90,140,106,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", background: "#f7f3ea" }}>
      <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,26,20,0.28)" }}>{tx.copy}</span>
      <span style={{ fontSize: "0.64rem", letterSpacing: "0.08em", color: "rgba(30,26,20,0.22)" }}>© {new Date().getFullYear()} — {tx.rights}</span>
      <div style={{ width: "26px", height: "1px", background: "linear-gradient(90deg, #5a8c6a, #8c6a3c)", borderRadius: "1px", opacity: 0.45 }} />
    </footer>
  );
}
