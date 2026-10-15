"use client";

import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project, DeviceShowcase, DeviceShowcaseSlot } from "@/data/projects";

// Diseñador's "editorial, frameless" spec (2026-10-15) — the single style
// for this component across the whole site. No device chrome (no bezel, no
// radius, no shadow): each of the 3 images runs full-bleed, captioned in a
// monospace running line underneath.
//
// LAYOUT OVERRIDE (Albert, 2026-10-15): diseñador's spec recommended a
// "desktop on top + tablet/mobile 2-up" grid for the lower two slots. Albert
// asked explicitly for a single alternating column instead — image, its
// caption, next image, its caption, next image, its caption, one below the
// other, with no 2-column grid at any breakpoint. That's what's built below;
// every other part of diseñador's spec (typography, running head, dek,
// frameless images, fixed `var(--bg)`) is unchanged.
type DeviceKind = "desktop" | "tablet" | "mobile";

const ASPECT: Record<DeviceKind, number> = {
  desktop: 16 / 10,
  tablet: 5 / 4,
  mobile: 9 / 19.5,
};

const ORDER: DeviceKind[] = ["desktop", "tablet", "mobile"];

// Shown between a project page's Hero and Overview sections. For elBulli and
// Mirazur (tabbed clients), `data` is the active sub-project's own
// deviceShowcase — the composition changes with the tab, same convention as
// ProjectWalkthroughVideo.
export default function ProjectDeviceShowcase({
  project,
  data,
}: {
  project: Project;
  data?: DeviceShowcase;
}) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;

  if (!data) return null;

  const slots: Record<DeviceKind, DeviceShowcaseSlot> = {
    desktop: data.desktop,
    tablet: data.tablet,
    mobile: data.mobile,
  };

  return (
    <section style={{ background: "var(--bg)", padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content">
        {/* Running head */}
        <FadeInView>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              flexWrap: "wrap",
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 11,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              borderBottom: "1px solid var(--border-mid)",
              paddingBottom: 18,
              marginBottom: "clamp(2.5rem, 6vw, 3.5rem)",
            }}
          >
            <span style={{ color: project.accentColor, fontWeight: 700 }}>{project.num}</span>
            <span>
              {project.category[lang]} / {project.title[lang]}
            </span>
            <span>{project.year}</span>
          </div>
        </FadeInView>

        {/* Editorial headline — h2, the page's own h1 lives in its Hero */}
        <FadeInView>
          <h2
            className="device-showcase-headline"
            style={{
              fontFamily: 'Georgia, "Iowan Old Style", "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "var(--text-display)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              maxWidth: "16ch",
              marginBottom: "0.5rem",
              color: "var(--text)",
            }}
          >
            {project.heroTagline?.[lang]}
          </h2>
        </FadeInView>

        {/* Italic subhead (the old "caption") */}
        <FadeInView delay={0.06}>
          <p
            style={{
              fontStyle: "italic",
              color: "var(--text-muted)",
              fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
              marginBottom: "1.25rem",
            }}
          >
            {data.caption[lang]}
          </p>
        </FadeInView>

        {/* Dek */}
        <FadeInView delay={0.1}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body)",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              maxWidth: "48ch",
              marginBottom: "clamp(3rem, 6vw, 4rem)",
            }}
          >
            {project.description[lang]}
          </p>
        </FadeInView>

        {/* Alternating image / caption, stacked — see LAYOUT OVERRIDE above:
            no 2-column grid at any breakpoint, desktop → tablet → mobile. */}
        {ORDER.map((kind, i) => {
          const slot = slots[kind];
          const isLast = i === ORDER.length - 1;
          return (
            <FadeInView key={kind} delay={0.06 * i}>
              <figure style={{ margin: 0, marginBottom: isLast ? 0 : "clamp(2.5rem, 5vw, 4rem)" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: String(ASPECT[kind]) }}>
                  <Image
                    src={slot.src}
                    alt={slot.alt[lang]}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 900px) 100vw, 1200px"
                    style={{ objectFit: "cover", objectPosition: "top center", borderRadius: 0, display: "block" }}
                  />
                </div>
                <figcaption
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "1rem",
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
                    fontSize: 11,
                    color: "var(--text-muted)",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 10,
                    marginTop: 14,
                  }}
                >
                  <b style={{ color: "var(--text)", fontWeight: 600 }}>
                    {String(i + 1).padStart(2, "0")} · {tx.deviceLabels[kind]}
                  </b>
                  <span>{slot.alt[lang]}</span>
                </figcaption>
              </figure>
            </FadeInView>
          );
        })}
      </div>
    </section>
  );
}
