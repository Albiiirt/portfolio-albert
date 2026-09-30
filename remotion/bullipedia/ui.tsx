import { Img, staticFile } from "remotion";
import { BULLIPEDIA, FONT_FAMILY, TEXT } from "./tokens";

// ── Real logo — inlined 1:1 from public/mockups/bullipedia-html/assets/
// logo-bullipedia-18cec3.svg, so it stays crisp at any scale instead of
// rasterizing an <img> of it. ──
export function BullipediaLogo({ height = 24, color = BULLIPEDIA.navy }: { height?: number; color?: string }) {
  return (
    <svg height={height} viewBox="0 0 116.02897 29.99994" style={{ display: "block" }}>
      <path
        fill={color}
        d="M1.93449,2.72312h7.34c4.45,0,6.79,1.9,6.79,5.37,0,1.92-.89,3.26-2.95,4.26a4.73,4.73,0,0,1,3.42,4.92c0,3.84-2.44,5.68-7.45,5.68h-7.15Zm6.84,8.1c2.34,0,3.53-.81,3.53-2.5s-1.25-2.48-3.75-2.48h-2.92v5Zm0,9c2.7,0,4-.89,4-3s-1.25-3-3.78-3h-3.36v6Z"
      />
      <path
        fill={color}
        d="M23.32448,23.23312c-2.7,0-4.06-1.56-4.06-4.7v-10.16h3.45v9.46c0,1.78.41,2.62,1.67,2.62a4.93,4.93,0,0,0,3.22-1.65v-10.43h3.42v14.59h-3.17v-1.7A7,7,0,0,1,23.32448,23.23312Z"
      />
      <path fill={color} d="M34.08448,2.72312h3.45v20.24h-3.45Z" />
      <path fill={color} d="M40.58448,2.72312h3.45v20.24h-3.45Z" />
      <path fill={color} d="M47.07448,2.72312h3.45v3.24h-3.45Zm0,5.65h3.45v14.59h-3.45Z" />
      <path
        fill={color}
        d="M56.93449,28.24312h-3.4v-19.87h2.51l.36,1.59a5,5,0,0,1,4-1.87c3.31,0,5.67,3,5.67,7.57,0,4.7-2.42,7.57-5.56,7.57a4.26,4.26,0,0,1-3.58-1.67Zm2.58-7.82c1.87,0,3.06-1.7,3.06-4.76s-1.13-4.7-3.05-4.7a3.64,3.64,0,0,0-2.59,1.31v6.92a3.8,3.8,0,0,0,2.62,1.23Z"
      />
      <path
        fill={color}
        d="M73.71448,23.23312c-3.87,0-6.18-2.76-6.18-7.54s2.34-7.6,6.12-7.6,6,2.67,6,7.4v.76h-8.72c0,2.75,1.06,4.14,3.09,4.14a3.29,3.29,0,0,0,3-1.86l2.53,1.55A6.14,6.14,0,0,1,73.71448,23.23312Zm2.58-9.46c0-2-1-3.09-2.64-3.09s-2.53,1.11-2.67,3.09Z"
      />
      <path
        fill={color}
        d="M86.86448,23.23312c-3.31,0-5.7-3-5.7-7.57,0-4.7,2.42-7.57,5.56-7.57a4.27,4.27,0,0,1,3.53,1.67v-7h3.4v16.8c0,.69.05,1.83.16,3.39h-2.67l-.36-1.56A4.76,4.76,0,0,1,86.86448,23.23312Zm3.42-11.08a3.77,3.77,0,0,0-2.59-1.19c-1.86,0-3.06,1.67-3.06,4.73s1.17,4.67,3.09,4.67a3.54,3.54,0,0,0,2.56-1.25Z"
      />
      <path fill={color} d="M96.74448,2.72312h3.45v3.24h-3.45Zm0,5.65h3.45v14.59h-3.45Z" />
      <path
        fill={color}
        d="M110.53449,21.67312a7.24,7.24,0,0,1-4.34,1.45,3.57994,3.57994,0,0,1-3.89-3.9c0-3.25,2.69-5,8.26-5.67v-1.14c0-1.06-.73-1.67-2.06-1.67a3.77,3.77,0,0,0-3.2,1.67l-2.37-1.45a6.22,6.22,0,0,1,5.59-2.84c3.43,0,5.35,1.64,5.35,4.32v8.52a12.329,12.329,0,0,0,.22,2h-3.28Zm-4.84-2.71a1.42,1.42,0,0,0,1.56,1.56,4.61,4.61,0,0,0,3.2-1.53v-3.13C107.22448,16.30312,105.69448,17.22312,105.69448,18.96312Z"
      />
    </svg>
  );
}

// ── Top nav bar — present on every screen of the real product (header,
// sticky, h-16/64px, border-b rule, logo inside a 1400px mx-auto rail). ──
export function PageHeader() {
  return (
    <div
      style={{
        height: 64,
        flexShrink: 0,
        borderBottom: `1px solid ${BULLIPEDIA.rule}`,
        background: BULLIPEDIA.white,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: 1400, width: "100%", margin: "0 auto", padding: "0 32px" }}>
        <BullipediaLogo />
      </div>
    </div>
  );
}

// ── Sticky sub-header used on the chapter/article screens — back link,
// current title, "Apartado n de m" counter, and (article only) the thin
// reading-progress rail underneath. ──
export function SubHeader({
  backLabel,
  title,
  counter,
  progress,
}: {
  backLabel: string;
  title: string;
  counter?: string;
  progress?: number; // 0..1, renders the green rail when set
}) {
  return (
    <div style={{ flexShrink: 0, borderBottom: `1px solid ${BULLIPEDIA.rule}`, background: BULLIPEDIA.white }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 32px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: TEXT.meta, fontWeight: 700, color: BULLIPEDIA.inkSoft, flexShrink: 0 }}>
          <span style={{ fontSize: 17, lineHeight: 1 }}>‹</span> {backLabel}
        </span>
        <div style={{ flex: 1, minWidth: 0, fontSize: TEXT.meta, fontWeight: 700, color: BULLIPEDIA.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </div>
        {counter && <div style={{ flexShrink: 0, fontSize: TEXT.label, letterSpacing: "0.025em", color: BULLIPEDIA.muted }}>{counter}</div>}
      </div>
      {progress !== undefined && (
        <div style={{ height: 3, background: BULLIPEDIA.rule }}>
          <div style={{ height: 3, width: `${progress * 100}%`, background: BULLIPEDIA.green }} />
        </div>
      )}
    </div>
  );
}

// ── The collapsed-rail → 308px sidebar (public/mockups/bullipedia-html/
// 3-*.html .sidebar-panel), driven by an explicit 0..1 openProgress instead
// of :hover, so the video can script the same expand it performs on mouse
// arrival. ──
export type SidebarSubEntry = { title: string; active?: boolean };
export type SidebarSection = { title: string; active: boolean; subEntries?: SidebarSubEntry[]; open?: boolean };

export function BookSidebar({ openProgress, sections }: { openProgress: number; sections: SidebarSection[] }) {
  const width = 64 + (308 - 64) * openProgress;
  const labelOpacity = Math.max(0, openProgress - 0.4) / 0.6;

  return (
    <div
      style={{
        width,
        flexShrink: 0,
        alignSelf: "stretch",
        borderRight: `1px solid ${BULLIPEDIA.rule}`,
        background: BULLIPEDIA.white,
        overflow: "hidden",
        boxShadow: openProgress > 0.05 ? `${16 * openProgress}px 0 ${44 * openProgress}px rgba(0,0,0,${0.09 * openProgress})` : "none",
      }}
    >
      <div style={{ width: 308, padding: "22px 12px 14px 20px", opacity: labelOpacity }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: BULLIPEDIA.muted }}>Índice del libro</span>
      </div>
      <div style={{ width: 308, padding: "0 12px 26px" }}>
        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 10px" }}>
              <span style={{ width: 24, height: 2, flexShrink: 0, background: section.active ? BULLIPEDIA.green : BULLIPEDIA.ruleStrong }} />
              <span
                style={{
                  minWidth: 0,
                  flex: 1,
                  fontSize: 15.5,
                  lineHeight: 1.25,
                  fontWeight: 700,
                  color: section.active ? BULLIPEDIA.greenDark : BULLIPEDIA.inkSoft,
                  opacity: labelOpacity,
                  whiteSpace: "nowrap",
                }}
              >
                {section.title}
              </span>
            </div>
            {section.subEntries && section.open && (
              <div style={{ padding: "2px 12px 8px 40px", opacity: labelOpacity }}>
                {section.subEntries.map((entry) => (
                  <div
                    key={entry.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px",
                      margin: "1px 0",
                      borderRadius: 7,
                      background: entry.active ? BULLIPEDIA.soft : "transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ minWidth: 0, flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: BULLIPEDIA.ink }}>
                      {entry.title}
                    </span>
                    <span style={{ fontSize: 12, color: BULLIPEDIA.muted }}>›</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Book cover — the .book-stage / .book-stage-detail 3D card, aspect 3/4,
// with the "pages" backdrop underneath and the real Plan Origen cover
// (public/mockups/bullipedia-html/assets/portada_*.jpeg) on top. `rotateY`
// drives the hover/open tilt; `badge` renders the green "Comprado" ribbon. ──
export function BookCover({
  width,
  rotateY,
  badge,
  coverSrc,
  shade = 0,
}: {
  width: number;
  rotateY: number;
  badge?: string;
  coverSrc?: string;
  shade?: number; // 0..1 — the page-shade + cover-shade opacity that ramps in alongside the tilt
}) {
  const height = (width * 4) / 3;
  return (
    <div style={{ width, height, position: "relative", perspective: 1100 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: "#fbfaf6",
          boxShadow: "inset -14px 0 22px -10px rgba(0,0,0,.14)",
          left: 6,
        }}
      >
        <div style={{ padding: `${height * 0.09}px ${width * 0.09}px 0 ${width * 0.12}px` }}>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: BULLIPEDIA.greenDark, marginBottom: 12 }}>Índice</div>
          {[82, 64, 74, 52].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 6, marginBottom: 9, background: i < 2 ? "#e7e5dd" : "#eeece5" }} />
          ))}
        </div>
        <span
          style={{
            position: "absolute",
            inset: 0,
            left: "auto",
            width: "52%",
            background: "linear-gradient(90deg, rgba(0,0,0,.34), rgba(0,0,0,.08) 52%, transparent)",
            opacity: shade,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          transformOrigin: "left center",
          transform: `rotateY(${rotateY}deg)`,
          boxShadow: rotateY < -1 ? `${26 * Math.min(1, -rotateY / 40)}px ${22 * Math.min(1, -rotateY / 40)}px 50px rgba(0,0,0,${0.38 * Math.min(1, -rotateY / 40)})` : "2px 4px 15px rgba(0,0,0,.24)",
        }}
      >
        {coverSrc ? (
          <Img src={staticFile(coverSrc)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: BULLIPEDIA.panel }} />
        )}
        {badge && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "6px 10px 5px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: BULLIPEDIA.white,
              background: BULLIPEDIA.green,
            }}
          >
            {badge}
          </span>
        )}
        <span
          style={{
            position: "absolute",
            inset: 0,
            right: "auto",
            width: "34%",
            background: "linear-gradient(90deg, rgba(0,0,0,.22), transparent)",
            opacity: shade,
          }}
        />
      </div>
    </div>
  );
}

export function SectionLabel({ children, color = BULLIPEDIA.greenDark }: { children: React.ReactNode; color?: string }) {
  return <span style={{ fontSize: TEXT.eyebrow, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color }}>{children}</span>;
}

export const fontStyle = { fontFamily: FONT_FAMILY } as const;
