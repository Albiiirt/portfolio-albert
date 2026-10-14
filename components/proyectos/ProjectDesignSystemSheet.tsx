"use client";

import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { DesignSystemSheet } from "@/data/projects";

// Palette swatches + typeface specimen, shown inside a project's own
// "system" section (elBulli, Turisme Jaén, Gnoss AI). Uses the same
// `workCards` card language (border/background tint, 1rem radius) for the
// typography row — deliberately not a black-background slide. Renders
// fine with `typography: []` (no row at all, never half-broken), since
// some projects' real typefaces aren't confirmed yet.
export default function ProjectDesignSystemSheet({
  data,
  accentColor,
  tightTop,
}: {
  data?: DesignSystemSheet;
  accentColor: string;
  tightTop?: boolean;
}) {
  const { lang } = useLang();

  if (!data || (!data.palette.length && !data.typography.length)) return null;

  return (
    <div style={{ marginTop: tightTop ? 0 : "clamp(2rem, 4vh, 3rem)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {data.palette.length > 0 && (
        <div className="design-system-palette-breakout">
          <p className="section-label" style={{ marginBottom: "1.75rem" }}>
            {t[lang].projectPage.sectionLabels.palette}
          </p>
          <div className="design-system-palette">
            {data.palette.map((swatch) => (
              <div key={swatch.hex}>
                <div style={{ aspectRatio: "5 / 2", borderRadius: "0.5rem", background: swatch.hex }} />
                <p
                  style={{
                    fontSize: "0.67rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-subtle)",
                    marginTop: "0.6rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {swatch.label[lang]}
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>{swatch.hex}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.typography.length > 0 && (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {data.typography.map((item) => (
            <FadeInView key={item.typeface} style={{ flex: "1 1 220px" }}>
              <div
                style={{
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  border: `1px solid ${accentColor}44`,
                  background: `${accentColor}06`,
                  height: "100%",
                }}
              >
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", margin: "0 0 0.35rem" }}>
                  {item.typeface}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.02em", color: "var(--text)", margin: "0 0 0.75rem" }}>
                  AaBbCcGg · 0123456789 · &?!
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>{item.usage[lang]}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      )}
    </div>
  );
}
