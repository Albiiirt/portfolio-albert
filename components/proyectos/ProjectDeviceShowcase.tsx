"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import FadeInView from "@/components/FadeInView";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project, DeviceShowcase, DeviceShowcaseSlot } from "@/data/projects";

// Diseñador's spec (revised 2026-10-14: glass frame removed — see below).
// Desktop/tablet render frameless (image to the edge, just radius +
// shadow); mobile keeps a solid dark bezel so the notch/dynamic island
// still reads as a chassis. No bezel/padding on desktop/tablet (no chrome
// bar — frontal only, no tilt).
type DeviceKind = "desktop" | "tablet" | "mobile";

const ASPECT: Record<DeviceKind, number> = {
  desktop: 16 / 10,
  tablet: 5 / 4,
  mobile: 9 / 19.5,
};
const RADIUS_OUTER: Record<DeviceKind, number> = { desktop: 14, tablet: 20, mobile: 44 };
const MOBILE_INNER_RADIUS = 36;

// Replaces the old translucent "glass" frame (GLASS_BORDER/HIGHLIGHT/BG,
// removed 2026-10-14): desktop/tablet now go borderless/transparent (just
// radius + shadow, image to the edge); mobile keeps a solid dark bezel so
// the notch/dynamic island still reads as a chassis.
const MOBILE_BEZEL = "#111113";
// Shadow is always neutral black — never tinted with the project's accent,
// per diseñador's spec. The one exception ("float") swaps it for a colored
// ring entirely, it never mixes the two.
const SHADOW_DOMINANT = "0 24px 60px -12px rgba(0,0,0,0.45)";
const SHADOW_SATELLITE = "0 12px 32px -8px rgba(0,0,0,0.4)";

function DeviceFrame({
  kind,
  slot,
  lang,
  dominant = false,
  ring,
  priority,
  style,
}: {
  kind: DeviceKind;
  slot: DeviceShowcaseSlot;
  lang: Lang;
  dominant?: boolean;
  ring?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const isMobile = kind === "mobile";
  const outer = RADIUS_OUTER[kind];

  // "float"'s ring keeps its colored glow as the only shadow (never mixed
  // with the neutral one); everyone else keeps the plain neutral shadow.
  // No border, no inset highlight on either path — frame is gone.
  const boxShadow = ring ? `0 0 0 3px ${ring}40` : dominant ? SHADOW_DOMINANT : SHADOW_SATELLITE;

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: String(ASPECT[kind]),
        borderRadius: outer,
        border: "none",
        boxShadow,
        background: isMobile ? MOBILE_BEZEL : "transparent",
        padding: isMobile ? 10 : 0,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: isMobile ? MOBILE_INNER_RADIUS : outer,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          src={slot.src}
          alt={slot.alt[lang]}
          fill
          priority={priority}
          sizes="(max-width: 860px) 60vw, 480px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        {isMobile && (
          <div
            aria-hidden="true"
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
        )}
      </div>
    </div>
  );
}

// ── Style 1: cascade — diagonal 135deg, decreasing size, desktop→tablet→mobile ──
function CascadeLayout({ desktop, tablet, mobile, lang }: {
  desktop: DeviceShowcaseSlot; tablet: DeviceShowcaseSlot; mobile: DeviceShowcaseSlot; lang: Lang;
}) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 640 }}>
      <FadeInView delay={0}>
        <DeviceFrame kind="desktop" slot={desktop} lang={lang} dominant priority style={{ width: "100%" }} />
      </FadeInView>
      <FadeInView delay={0.08} style={{ position: "absolute", top: "22%", left: "28%", width: "54%", zIndex: 2 }}>
        <DeviceFrame kind="tablet" slot={tablet} lang={lang} style={{ width: "100%" }} />
      </FadeInView>
      <FadeInView delay={0.16} style={{ position: "absolute", top: "48%", left: "50%", width: "30%", zIndex: 3 }}>
        <DeviceFrame kind="mobile" slot={mobile} lang={lang} style={{ width: "100%" }} />
      </FadeInView>
      {/* Reserves breathing room below so the overlapping tablet/mobile
          frames don't collide with whatever section follows. */}
      <div style={{ paddingBottom: "clamp(2rem, 10vw, 4rem)" }} />
    </div>
  );
}

// ── Style 2: diptych — desktop plate à la ProjectDesktopWalkthrough (frame
// only on 2 sides), tablet+mobile pair anchored to its bottom-right corner ──
function DiptychLayout({ desktop, tablet, mobile, lang }: {
  desktop: DeviceShowcaseSlot; tablet: DeviceShowcaseSlot; mobile: DeviceShowcaseSlot; lang: Lang;
}) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 760 }}>
      <FadeInView delay={0}>
        <DeviceFrame
          kind="desktop"
          slot={desktop}
          lang={lang}
          dominant
          priority
          style={{
            width: "100%",
            // The "cut corner" now reads purely from the asymmetric radius +
            // shadow — no border on any side (glass frame removed).
            borderRadius: "14px 0 0 0",
            boxShadow: SHADOW_DOMINANT,
          }}
        />
      </FadeInView>
      <FadeInView delay={0.08} style={{ position: "absolute", bottom: "8%", right: "10%", width: "24%", zIndex: 2 }}>
        <DeviceFrame kind="tablet" slot={tablet} lang={lang} style={{ width: "100%" }} />
      </FadeInView>
      <FadeInView delay={0.16} style={{ position: "absolute", bottom: "3%", right: "3%", width: "15%", zIndex: 3 }}>
        <DeviceFrame kind="mobile" slot={mobile} lang={lang} style={{ width: "100%" }} />
      </FadeInView>
    </div>
  );
}

// ── Style 3: triptych — horizontal, no overlap, common baseline, top edge
// stepping up left→right as each device's own aspect ratio gets taller ──
function TriptychLayout({ desktop, tablet, mobile, lang }: {
  desktop: DeviceShowcaseSlot; tablet: DeviceShowcaseSlot; mobile: DeviceShowcaseSlot; lang: Lang;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "var(--space-gap-lg)", flexWrap: "wrap", width: "100%" }}>
      <FadeInView delay={0}>
        <DeviceFrame kind="desktop" slot={desktop} lang={lang} priority style={{ width: "clamp(220px, 30vw, 380px)" }} />
      </FadeInView>
      <FadeInView delay={0.08}>
        <DeviceFrame kind="tablet" slot={tablet} lang={lang} style={{ width: "clamp(140px, 18vw, 220px)" }} />
      </FadeInView>
      <FadeInView delay={0.16}>
        <DeviceFrame kind="mobile" slot={mobile} lang={lang} style={{ width: "clamp(90px, 11vw, 150px)" }} />
      </FadeInView>
    </div>
  );
}

// ── Style 4: float — one dominant frame with an accent-colored ring
// (never a black shadow), the other two as small stacked satellites ──
const PRIMARY_WIDTH: Record<DeviceKind, string> = {
  desktop: "clamp(280px, 36vw, 480px)",
  tablet: "clamp(220px, 28vw, 340px)",
  mobile: "clamp(180px, 20vw, 240px)",
};

function FloatLayout({
  accentColor, primary, desktop, tablet, mobile, lang,
}: {
  accentColor: string;
  primary: DeviceKind;
  desktop: DeviceShowcaseSlot; tablet: DeviceShowcaseSlot; mobile: DeviceShowcaseSlot; lang: Lang;
}) {
  const slots: Record<DeviceKind, DeviceShowcaseSlot> = { desktop, tablet, mobile };
  const satellites = (["desktop", "tablet", "mobile"] as DeviceKind[]).filter((k) => k !== primary);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(1.5rem, 3vw, 2.5rem)", flexWrap: "wrap" }}>
      <FadeInView delay={0} style={{ position: "relative" }}>
        {/* Optional solid accent backdrop card, reinforcing depth behind the ring */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-6% -5%",
            background: `${accentColor}12`,
            borderRadius: RADIUS_OUTER[primary] + 10,
            zIndex: 0,
          }}
        />
        <DeviceFrame
          kind={primary}
          slot={slots[primary]}
          lang={lang}
          dominant
          ring={accentColor}
          priority
          style={{ width: PRIMARY_WIDTH[primary], position: "relative", zIndex: 1 }}
        />
      </FadeInView>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {satellites.map((kind, i) => (
          <FadeInView key={kind} delay={0.08 * (i + 1)}>
            <DeviceFrame kind={kind} slot={slots[kind]} lang={lang} style={{ width: "clamp(56px, 8vw, 96px)" }} />
          </FadeInView>
        ))}
      </div>
    </div>
  );
}

// ── Style 5: pedestal — studio-vitrine mockup, assigned to Madrid. Unlike
// the other 4 styles this is a forced-perspective still life, not a flat
// composition: the tablet sits furthest back (and highest in frame), the
// laptop is the dominant frontal hero, the mobile sits closest to the
// floor off to one side. Devices keep DeviceFrame fully intact (no
// bezel/glass, per Part A) — only tilted via a wrapping transform, never
// recolored. Widths/positions/z-index below are this component's own
// compositional choices; only the pedestal proportions (height, width
// ratio, bottom) and device rotations come from diseñador's spec.
const PEDESTAL_TOP_FACE_H = 9; // px — fixed regardless of stage size
const PEDESTAL_DELAY: Record<DeviceKind, number> = { desktop: 0, tablet: 0.08, mobile: 0.16 };

type PedestalSpec = {
  kind: DeviceKind;
  widthPct: number; // device width, % of stage width
  centerXPct: number; // device/pedestal shared horizontal center, % of stage width
  rotate: string;
  bottomPct: number; // pedestal's own bottom, % of stage height
  heightPct: number; // pedestal's own front-face height, % of stage height
  widthRatio: number; // pedestal width, relative to the device's own width
  zIndex: number;
};

const PEDESTAL_SPECS: PedestalSpec[] = [
  { kind: "tablet", widthPct: 22, centerXPct: 30, rotate: "rotateY(-14deg)", bottomPct: 46, heightPct: 30, widthRatio: 0.6, zIndex: 1 },
  { kind: "desktop", widthPct: 48, centerXPct: 53, rotate: "rotateY(-6deg) rotateX(1deg)", bottomPct: 18, heightPct: 14, widthRatio: 0.92, zIndex: 3 },
  { kind: "mobile", widthPct: 13, centerXPct: 80, rotate: "rotateY(18deg) rotateZ(-3deg)", bottomPct: 14, heightPct: 10, widthRatio: 0.7, zIndex: 2 },
];

function PedestalLayout({
  accentColor, desktop, tablet, mobile, lang,
}: {
  accentColor: string;
  desktop: DeviceShowcaseSlot; tablet: DeviceShowcaseSlot; mobile: DeviceShowcaseSlot; lang: Lang;
}) {
  const slots: Record<DeviceKind, DeviceShowcaseSlot> = { desktop, tablet, mobile };
  const wallTint = `color-mix(in srgb, ${accentColor} 16%, #eef1ee 84%)`;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 920,
        aspectRatio: "3 / 2",
        margin: "0 auto",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        boxShadow: SHADOW_DOMINANT,
      }}
    >
      {/* Walls */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "68%",
          background: `linear-gradient(100deg, ${wallTint} 0%, ${wallTint} 54%, #e4e6e8 56%, #e4e6e8 100%)`,
        }}
      />
      {/* Floor */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "32%", background: "#f4f3f1" }}
      >
        {/* Contact-shadow vignette where the floor meets the wall — the
            gradient's own hotspot sits at its box's bottom (center 50% 100%);
            flipped vertically so it reads at the floor's *top* edge instead. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 140% 60% at 50% 100%, rgba(0,0,0,0.05), transparent 70%)",
            transform: "scaleY(-1)",
          }}
        />
      </div>

      {PEDESTAL_SPECS.map((spec) => {
        const pedestalWidthPct = spec.widthPct * spec.widthRatio;
        const pedestalLeftPct = spec.centerXPct - pedestalWidthPct / 2;
        const deviceLeftPct = spec.centerXPct - spec.widthPct / 2;
        const shadowWidthPct = pedestalWidthPct * 1.22;
        const shadowLeftPct = spec.centerXPct - shadowWidthPct / 2;
        const topFaceBottom = `${spec.bottomPct + spec.heightPct}%`;
        const deviceBottom = `calc(${spec.bottomPct + spec.heightPct}% + ${PEDESTAL_TOP_FACE_H}px)`;

        return (
          <FadeInView
            key={spec.kind}
            delay={PEDESTAL_DELAY[spec.kind]}
            style={{ position: "absolute", inset: 0, zIndex: spec.zIndex }}
          >
            {/* Contact shadow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${shadowLeftPct}%`,
                width: `${shadowWidthPct}%`,
                bottom: `calc(${spec.bottomPct}% - 6px)`,
                height: 16,
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
            {/* Pedestal front face */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${pedestalLeftPct}%`,
                width: `${pedestalWidthPct}%`,
                bottom: `${spec.bottomPct}%`,
                height: `${spec.heightPct}%`,
                background: "linear-gradient(180deg, #ffffff 0%, #f1f0ee 100%)",
                borderRadius: "3px 3px 0 0",
              }}
            />
            {/* Pedestal top face */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${pedestalLeftPct}%`,
                width: `${pedestalWidthPct}%`,
                bottom: topFaceBottom,
                height: PEDESTAL_TOP_FACE_H,
                background: "#ffffff",
                clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
              }}
            />
            {/* Device, tilted, resting on top of the pedestal */}
            <div
              style={{
                position: "absolute",
                left: `${deviceLeftPct}%`,
                width: `${spec.widthPct}%`,
                bottom: deviceBottom,
                perspective: 1400,
                transformOrigin: "bottom center",
              }}
            >
              <div style={{ transform: spec.rotate, transformOrigin: "bottom center" }}>
                <DeviceFrame
                  kind={spec.kind}
                  slot={slots[spec.kind]}
                  lang={lang}
                  priority={spec.kind === "desktop"}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </FadeInView>
        );
      })}
    </div>
  );
}

// ── Fallback (<~860px, shared by all 4 styles): one centered mobile frame,
// desktop+tablet as two small chips underneath ──
function Fallback({ desktop, tablet, mobile, lang }: {
  desktop: DeviceShowcaseSlot; tablet: DeviceShowcaseSlot; mobile: DeviceShowcaseSlot; lang: Lang;
}) {
  return (
    <div className="device-showcase-fallback" style={{ flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "100%" }}>
      <FadeInView delay={0}>
        <DeviceFrame kind="mobile" slot={mobile} lang={lang} dominant style={{ width: "clamp(200px, 56vw, 260px)" }} />
      </FadeInView>
      <FadeInView delay={0.08} style={{ display: "flex", gap: "0.75rem", width: "100%", maxWidth: 320, justifyContent: "center" }}>
        <DeviceFrame kind="desktop" slot={desktop} lang={lang} style={{ width: "30%" }} />
        <DeviceFrame kind="tablet" slot={tablet} lang={lang} style={{ width: "30%" }} />
      </FadeInView>
    </div>
  );
}

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

  const { style, desktop, tablet, mobile, caption } = data;
  const primary = data.primary ?? "mobile";

  return (
    <section style={{ background: project.gradient, padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FadeInView>
          <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem", textAlign: "center" }}>
            {tx.sectionLabels.deviceShowcase}
          </p>
        </FadeInView>

        <div className="device-showcase-main" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {style === "cascade" && <CascadeLayout desktop={desktop} tablet={tablet} mobile={mobile} lang={lang} />}
          {style === "diptych" && <DiptychLayout desktop={desktop} tablet={tablet} mobile={mobile} lang={lang} />}
          {style === "triptych" && <TriptychLayout desktop={desktop} tablet={tablet} mobile={mobile} lang={lang} />}
          {style === "float" && (
            <FloatLayout accentColor={project.accentColor} primary={primary} desktop={desktop} tablet={tablet} mobile={mobile} lang={lang} />
          )}
          {style === "pedestal" && (
            <PedestalLayout accentColor={project.accentColor} desktop={desktop} tablet={tablet} mobile={mobile} lang={lang} />
          )}
        </div>

        <Fallback desktop={desktop} tablet={tablet} mobile={mobile} lang={lang} />

        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          {caption[lang]}
        </p>
      </div>
    </section>
  );
}
