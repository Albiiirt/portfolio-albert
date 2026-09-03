"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import FadeInView from "@/components/FadeInView";
import { EASE } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project } from "@/data/projects";
import { resolveScreens } from "@/lib/projectScreens";

const AUTOPLAY_MS = 4200;
const DRAG_THRESHOLD = 60;

export default function ProjectScreensShowcase({ project }: { project: Project }) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;
  const reducedMotion = useReducedMotion();

  const screens = resolveScreens(project, lang);
  const count = screens.length;
  const isFallback = !project.screens?.length;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.5 });

  const autoplayActive = count >= 2 && !userInteracted && !reducedMotion && inView && !hovered;

  useEffect(() => {
    if (!autoplayActive) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplayActive, count]);

  const goTo = (i: number) => {
    setUserInteracted(true);
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const handleDragStart = useCallback(() => {
    setUserInteracted(true);
  }, []);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (count < 2) return;
    if (info.offset.x < -DRAG_THRESHOLD) {
      setDirection(1);
      setActive((i) => (i + 1) % count);
    } else if (info.offset.x > DRAG_THRESHOLD) {
      setDirection(-1);
      setActive((i) => (i - 1 + count) % count);
    }
  }, [count]);

  if (count === 0) return null;

  const current = screens[active];
  const idleFloat = count === 1;

  return (
    <section
      ref={sectionRef}
      style={{
        background: project.gradient,
        padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div className="site-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FadeInView>
          <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem", textAlign: "center" }}>
            {tx.sectionLabels.screens}
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={idleFloat ? "screens-idle-float" : undefined}
            style={{
              width: "clamp(240px, 24vw, 320px)",
              aspectRatio: "9 / 19.5",
              borderRadius: "2.75rem",
              background: "rgba(255,255,255,0.09)",
              border: "1.5px solid rgba(255,255,255,0.16)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 20px rgba(0,0,0,0.5)",
              padding: "10px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "2.25rem",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, y: direction * 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction * -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  drag={count >= 2 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  style={{ position: "absolute", inset: 0 }}
                >
                  {current.video ? (
                    <video
                      autoPlay muted loop playsInline
                      aria-label={current.alt}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    >
                      <source src={current.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 768px) 60vw, 320px"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Abstract dynamic island */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "34%",
                  height: 20,
                  borderRadius: "100px",
                  background: "rgba(0,0,0,0.85)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </FadeInView>

        {count >= 2 && (
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
            {screens.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver pantalla ${i + 1} de ${count}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className="screens-dot"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: i === active ? project.accentColor : "rgba(255,255,255,0.3)",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {isFallback && (
          <p
            style={{
              marginTop: "1.5rem",
              fontStyle: "italic",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.5)",
              textAlign: "center",
            }}
          >
            {tx.screensPreviewNote}
          </p>
        )}
      </div>
    </section>
  );
}
