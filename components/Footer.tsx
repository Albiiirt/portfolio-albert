"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  return (
    <footer style={{ padding: "1.75rem var(--space-section-x)", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="site-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>{tx.copy}</span>
        <span style={{ fontSize: "0.64rem", letterSpacing: "0.08em", color: "var(--text-subtle)" }}>© {new Date().getFullYear()} — {tx.rights}</span>
        <a
          href="https://www.linkedin.com/in/albertcanadas/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{ display: "inline-flex", color: "var(--text-subtle)", transition: "color 0.28s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
