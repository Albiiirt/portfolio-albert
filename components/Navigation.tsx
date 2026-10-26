"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function Navigation() {
  const { lang } = useLang();
  const tx = t[lang].nav;
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    // One-time sync read of the theme set synchronously by the anti-flash
    // inline script in app/layout.tsx before hydration — not available during
    // SSR, so it can't be read as a lazy initial state instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

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

        {/* Nav links + separators — hidden on mobile, replaced by hamburger below */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ width: 1, height: 16, background: "var(--border-mid)", flexShrink: 0 }} />
          <Link href="/proyectos" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            {tx.work}
          </Link>
          <Link href="/#about" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            {tx.about}
          </Link>
          <Link href="/#timeline" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            {tx.timeline}
          </Link>
          <Link href="/#testimonials" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            {tx.testimonials}
          </Link>
          <Link href="/#contact" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            {tx.contact}
          </Link>
          <Link href="/cv" className="nav-link" style={{ padding: "0.35rem 0.75rem", textDecoration: "none" }}>
            CV
          </Link>
          <div style={{ width: 1, height: 16, background: "var(--border-mid)", flexShrink: 0 }} />
        </nav>

        {/* Hamburger — mobile only, gives access to the links hidden above */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-hamburger cursor-hidden"
          style={{
            display: "none", alignItems: "center", justifyContent: "center",
            width: "28px", height: "28px", borderRadius: "50%",
            background: "none", border: "none", color: "var(--text)",
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <MenuIcon open={menuOpen} />
        </button>

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

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav
          className="liquid-pill nav-mobile-panel"
          style={{
            marginTop: "0.6rem",
            display: "flex",
            flexDirection: "column",
            padding: "0.65rem",
            gap: "0.1rem",
          }}
        >
          <Link href="/proyectos" className="nav-link" style={{ padding: "0.7rem 0.9rem", textDecoration: "none" }} onClick={closeMenu}>
            {tx.work}
          </Link>
          <Link href="/#about" className="nav-link" style={{ padding: "0.7rem 0.9rem", textDecoration: "none" }} onClick={closeMenu}>
            {tx.about}
          </Link>
          <Link href="/#timeline" className="nav-link" style={{ padding: "0.7rem 0.9rem", textDecoration: "none" }} onClick={closeMenu}>
            {tx.timeline}
          </Link>
          <Link href="/#testimonials" className="nav-link" style={{ padding: "0.7rem 0.9rem", textDecoration: "none" }} onClick={closeMenu}>
            {tx.testimonials}
          </Link>
          <Link href="/#contact" className="nav-link" style={{ padding: "0.7rem 0.9rem", textDecoration: "none" }} onClick={closeMenu}>
            {tx.contact}
          </Link>
          <Link href="/cv" className="nav-link" style={{ padding: "0.7rem 0.9rem", textDecoration: "none" }} onClick={closeMenu}>
            CV
          </Link>
        </nav>
      )}
    </div>
  );
}
