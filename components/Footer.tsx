"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  return (
    <footer style={{ padding: "1.75rem clamp(1.5rem, 5vw, 5rem)", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="site-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>{tx.copy}</span>
        <span style={{ fontSize: "0.64rem", letterSpacing: "0.08em", color: "var(--text-subtle)" }}>© {new Date().getFullYear()} — {tx.rights}</span>
        <div style={{ width: "26px", height: "1px", background: "var(--border-mid)", borderRadius: "1px" }} />
      </div>
    </footer>
  );
}
