"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project, DesktopWalkthroughStep } from "@/data/projects";

const CHROME_URL = "bullipedia.elbulli.com";

// Desktop counterpart of ProjectScreensShowcase: instead of a mobile-frame
// carousel, walks through 4 steps as scroll-revealed browser-chrome
// screenshots, text always on the left and the frame always on the right.
export default function ProjectDesktopWalkthrough({
  project,
  steps,
}: {
  project: Project;
  steps: DesktopWalkthroughStep[];
}) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;
  const reducedMotion = useReducedMotion();

  if (!steps.length) return null;

  return (
    <section
      style={{
        background: project.gradient,
        padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div className="site-content">
        <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem" }}>
          {tx.sectionLabels.screens}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem, 6vh, 5rem)" }}>
          {steps.map((step, i) => {
            const textMotion = reducedMotion
              ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, y: 36 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.35 },
                };
            const frameMotion = reducedMotion
              ? { initial: { opacity: 1, scale: 1, y: 0 }, animate: { opacity: 1, scale: 1, y: 0 } }
              : {
                  initial: { opacity: 0, y: 36, scale: 0.97 },
                  whileInView: { opacity: 1, y: 0, scale: 1 },
                  viewport: { once: true, amount: 0.35 },
                };

            return (
              <div
                key={step.src}
                className="proj-grid-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(2rem, 5vw, 4rem)",
                  alignItems: "center",
                }}
              >
                <motion.div {...textMotion} transition={{ duration: 0.6, ease: EASE }}>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      color: project.accentColor,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.title[lang]}
                  </p>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                    {step.caption[lang]}
                  </p>
                </motion.div>

                <motion.div {...frameMotion} transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}>
                  <BrowserFrame src={step.src} alt={step.alt[lang]} priority={i === 0} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BrowserFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div
      style={{
        width: "clamp(560px, 62vw, 960px)",
        maxWidth: "100%",
        background: "rgba(255,255,255,0.09)",
        border: "1.5px solid rgba(255,255,255,0.16)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 20px rgba(0,0,0,0.5)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Chrome bar — decorative browser window furniture, not content */}
      <div
        aria-hidden="true"
        className="browser-chrome-bar"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          borderTopLeftRadius: "11px",
          borderTopRightRadius: "11px",
        }}
      >
        <div style={{ position: "absolute", left: 14, display: "flex", gap: 6 }}>
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "block" }}
            />
          ))}
        </div>

        <div
          className="browser-chrome-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "100px",
            padding: "4px 14px",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
            <rect x="2" y="4.5" width="6" height="4.5" rx="1" stroke="#fff" strokeWidth="0.9" />
            <path d="M3.2 4.5V3.2a1.8 1.8 0 0 1 3.6 0V4.5" stroke="#fff" strokeWidth="0.9" fill="none" />
          </svg>
          <span
            className="browser-chrome-url-text"
            style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}
          >
            {CHROME_URL}
          </span>
        </div>
      </div>

      {/* Content panel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1568 / 755",
          background: "#fff",
          borderBottomLeftRadius: "11px",
          borderBottomRightRadius: "11px",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 900px) 92vw, 960px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    </div>
  );
}
