"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function NavAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link href={`/#${id}`} className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default function Navigation() {
  const { lang, setLang } = useLang();
  const tx = t[lang].nav;
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "ca", label: "CA" },
  ];

  return (
    <div style={{
      position: "fixed",
      top: "1.25rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      width: "max-content",
      maxWidth: "calc(100vw - 2rem)",
    }}>
      <div className="liquid-pill" style={{ display: "flex", alignItems: "center", gap: "0.2rem", padding: "0.45rem 0.65rem" }}>

        {/* Logo */}
        <Link
          href="/"
          className="cursor-hidden"
          style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", textDecoration: "none", padding: "0.35rem 0.8rem" }}
        >
          AC
        </Link>

        {/* Nav links + separators — hidden on mobile */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ width: 1, height: 16, background: "var(--border-mid)", flexShrink: 0 }} />
          <NavAnchor id="work">{tx.work}</NavAnchor>
          <NavAnchor id="about">{tx.about}</NavAnchor>
          <NavAnchor id="contact">{tx.contact}</NavAnchor>
          <Link href="/cv" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            CV
          </Link>
          <div style={{ width: 1, height: 16, background: "var(--border-mid)", flexShrink: 0 }} />
        </nav>

        {/* Language selector */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 0.3rem", gap: "0.05rem" }}>
          {langs.map(({ code, label }, i) => (
            <span key={code} style={{ display: "flex", alignItems: "center", gap: "0.05rem" }}>
              <button
                onClick={() => setLang(code)}
                className="cursor-hidden"
                style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "none", border: "none", padding: "0.35rem 0.45rem",
                  color: lang === code ? "var(--text)" : "var(--text-subtle)", transition: "color 0.2s",
                }}
              >
                {label}
              </button>
              {i < langs.length - 1 && <span style={{ color: "var(--border-mid)", fontSize: "0.55rem" }}>/</span>}
            </span>
          ))}
        </div>

        <div style={{ width: 1, height: 16, background: "var(--border-mid)", flexShrink: 0 }} />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="cursor-hidden"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "28px", height: "28px", borderRadius: "50%",
            background: "var(--glass-bg)", backdropFilter: "var(--glass-filter)", WebkitBackdropFilter: "var(--glass-filter)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 1px 0 var(--glass-inset) inset",
            color: "var(--text)", transition: "background 0.3s, border-color 0.3s",
            marginLeft: "0.2rem",
          }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

      </div>
    </div>
  );
}
