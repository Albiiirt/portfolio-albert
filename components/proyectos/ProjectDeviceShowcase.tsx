"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import FadeInView from "@/components/FadeInView";
import { useLang, type Lang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project, DeviceShowcase, DeviceShowcaseSlot } from "@/data/projects";

// Diseñador's spec, reused literally from ProjectScreensShowcase's mobile
// frame tokens — never reinvented. Desktop/tablet share the same glass
// border/highlight/background, just a different single radius and no
// bezel/padding (no dynamic island, no chrome bar — frontal only, no tilt).
type DeviceKind = "desktop" | "tablet" | "mobile";

const ASPECT: Record<DeviceKind, number> = {
  desktop: 16 / 10,
  tablet: 3 / 4,
  mobile: 9 / 19.5,
};
const RADIUS_OUTER: Record<DeviceKind, number> = { desktop: 14, tablet: 20, mobile: 44 };
const MOBILE_INNER_RADIUS = 36;

const GLASS_BORDER = "1.5px solid rgba(255,255,255,0.16)";
const GLASS_HIGHLIGHT = "0 1px 0 rgba(255,255,255,0.14) inset";
const GLASS_BG = "rgba(255,255,255,0.09)";
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

  const border = ring ? `1.5px solid ${ring}` : GLASS_BORDER;
  const boxShadow = ring
    ? `${GLASS_HIGHLIGHT}, 0 0 0 3px ${ring}40`
    : `${GLASS_HIGHLIGHT}, ${dominant ? SHADOW_DOMINANT : SHADOW_SATELLITE}`;

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: String(ASPECT[kind]),
        borderRadius: outer,
        border,
        boxShadow,
        background: GLASS_BG,
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
            borderTop: GLASS_BORDER,
            borderLeft: GLASS_BORDER,
            borderRight: "none",
            borderBottom: "none",
            borderRadius: "14px 0 0 0",
            boxShadow: `${GLASS_HIGHLIGHT}, ${SHADOW_DOMINANT}`,
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
