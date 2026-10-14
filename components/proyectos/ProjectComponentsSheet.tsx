"use client";

import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type { ComponentsSheet } from "@/data/projects";

// Real rendered component specimens (buttons, one card crop), shown inside
// Turisme Jaén's "La estructura" section, right after
// ProjectDesignSystemSheet. Same `workCards` card language. Buttons render
// as real <button> elements (never a cropped screenshot). Renders nothing
// until Albert confirms the real button values and supplies a card crop —
// an empty `buttons` array and an absent `cardSpecimen` never show a
// half-built card, same convention as ProjectDesignSystemSheet's `typography`.
export default function ProjectComponentsSheet({
  data,
  accentColor,
}: {
  data?: ComponentsSheet;
  accentColor: string;
}) {
  const { lang } = useLang();

  if (!data || (!data.buttons.length && !data.cardSpecimen)) return null;

  return (
    <div style={{ marginTop: "clamp(2rem, 4vh, 3rem)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {data.buttons.map((btn, i) => (
        <FadeInView key={i} style={{ flex: "1 1 200px" }}>
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              border: `1px solid ${accentColor}44`,
              background: `${accentColor}06`,
              height: "100%",
            }}
          >
            <div
              style={{
                minHeight: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${accentColor}06`,
                borderRadius: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <button
                type="button"
                disabled
                style={{
                  background: btn.render.background,
                  color: btn.render.color,
                  borderRadius: btn.render.borderRadius,
                  height: btn.render.height,
                  border: "none",
                  padding: "0 1.5rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "default",
                }}
              >
                {btn.render.label[lang]}
              </button>
            </div>
            <p
              style={{
                fontSize: "0.67rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
                marginBottom: "0.3rem",
              }}
            >
              {btn.name[lang]}
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>{btn.specLine[lang]}</p>
          </div>
        </FadeInView>
      ))}

      {data.cardSpecimen && (
        <FadeInView style={{ flex: "1 1 200px" }}>
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              border: `1px solid ${accentColor}44`,
              background: `${accentColor}06`,
              height: "100%",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1rem" }}>
              <Image src={data.cardSpecimen.src} alt={data.cardSpecimen.alt[lang]} fill sizes="320px" style={{ objectFit: "cover" }} />
            </div>
            <p
              style={{
                fontSize: "0.67rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
                marginBottom: "0.3rem",
              }}
            >
              {data.cardSpecimen.name[lang]}
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>{data.cardSpecimen.specLine[lang]}</p>
          </div>
        </FadeInView>
      )}
    </div>
  );
}
