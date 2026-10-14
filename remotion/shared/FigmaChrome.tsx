import { AbsoluteFill } from "remotion";
import { SimCursor, type CursorHop } from "./Cursor";

// ── Shared Figma-style editor chrome — Capítulos 2 (Bullipedia) y 4
// (Mirazur) of the new hero-teaser guion both stage their beat as "a glimpse
// of the TOOL Albert designs in" rather than the shipped product again (the
// whole point of the rewrite). Deliberately Figma's OWN dark chrome, not the
// portfolio's own design tokens — same convention as remotion/bullipedia/
// ui.tsx and remotion/xunta/ui.tsx rebuilding their real products' own UI
// instead of the site's.
//
// Layers panel (~220px) + canvas with a dashed selection marquee and the 8
// classic corner/edge resize handles + properties panel (~260px: X/Y/W/H,
// fill swatch, radius, opacity) — reusing SimCursor (remotion/shared/
// Cursor.tsx) to drag one of those handles, exactly per the brief.
const FIGMA = {
  panelBg: "#2c2c2c",
  panelBorder: "#1e1e1e",
  canvasBg: "#242424",
  textPrimary: "#e8e8e8",
  textMuted: "#9a9a9a",
  inputBg: "#1e1e1e",
  inputBorder: "#454545",
};

export type FigmaLayer = { name: string; active?: boolean };
export type FigmaProperties = { x: number; y: number; w: number; h: number; color: string; radius: number; opacity: number };
export type FigmaSelection = { xPct: number; yPct: number; wPct: number; hPct: number };

function selectionHandles(sel: FigmaSelection): { x: number; y: number }[] {
  const { xPct: x, yPct: y, wPct: w, hPct: h } = sel;
  return [
    { x, y },
    { x: x + w / 2, y },
    { x: x + w, y },
    { x, y: y + h / 2 },
    { x: x + w, y: y + h / 2 },
    { x, y: y + h },
    { x: x + w / 2, y: y + h },
    { x: x + w, y: y + h },
  ];
}

export function FigmaChrome({
  fileName,
  accentColor,
  layers,
  properties,
  selection,
  cursorHops,
  children,
}: {
  fileName: string;
  /** Rides the selection marquee, handles, active layer dot and ripple. */
  accentColor: string;
  layers: FigmaLayer[];
  properties: FigmaProperties;
  selection: FigmaSelection;
  cursorHops: CursorHop[];
  children?: React.ReactNode;
}) {
  const fields: Array<[string, number]> = [
    ["X", properties.x],
    ["Y", properties.y],
    ["W", properties.w],
    ["H", properties.h],
  ];

  return (
    <AbsoluteFill style={{ background: FIGMA.canvasBg, fontFamily: "'Space Grotesk', sans-serif" }}>
      <div
        style={{
          height: 40,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 16px",
          background: FIGMA.panelBg,
          borderBottom: `1px solid ${FIGMA.panelBorder}`,
        }}
      >
        <span style={{ width: 16, height: 16, borderRadius: 4, background: accentColor, flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: FIGMA.textPrimary }}>{fileName}</span>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Layers */}
        <div
          style={{
            width: 220,
            flexShrink: 0,
            background: FIGMA.panelBg,
            borderRight: `1px solid ${FIGMA.panelBorder}`,
            padding: "14px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: FIGMA.textMuted, padding: "0 8px 10px" }}>
            Capas
          </span>
          {layers.map((layer) => (
            <div
              key={layer.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 8px",
                borderRadius: 5,
                background: layer.active ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 3, background: layer.active ? accentColor : "#5c5c5c", flexShrink: 0 }} />
              <span
                style={{
                  fontSize: 12.5,
                  color: layer.active ? FIGMA.textPrimary : FIGMA.textMuted,
                  fontWeight: layer.active ? 600 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {layer.name}
              </span>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, position: "relative", background: FIGMA.canvasBg, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 24 }}>{children}</div>
          <div
            style={{
              position: "absolute",
              left: `${selection.xPct}%`,
              top: `${selection.yPct}%`,
              width: `${selection.wPct}%`,
              height: `${selection.hPct}%`,
              border: `1.5px dashed ${accentColor}`,
              pointerEvents: "none",
            }}
          />
          {selectionHandles(selection).map((h, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${h.x}%`,
                top: `${h.y}%`,
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                background: "#ffffff",
                border: `1.5px solid ${accentColor}`,
                borderRadius: 1.5,
              }}
            />
          ))}
          <SimCursor hops={cursorHops} pointerFill="#ffffff" pointerStroke="#1a1a1a" rippleColor={accentColor} />
        </div>

        {/* Properties */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            background: FIGMA.panelBg,
            borderLeft: `1px solid ${FIGMA.panelBorder}`,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {fields.map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: FIGMA.inputBg,
                  border: `1px solid ${FIGMA.inputBorder}`,
                  borderRadius: 5,
                  padding: "6px 8px",
                }}
              >
                <span style={{ fontSize: 11, color: FIGMA.textMuted, fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 12, color: FIGMA.textPrimary, fontVariantNumeric: "tabular-nums" }}>{value}</span>
              </div>
            ))}
          </div>
          <div>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: FIGMA.textMuted }}>Relleno</span>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: FIGMA.inputBg,
                border: `1px solid ${FIGMA.inputBorder}`,
                borderRadius: 5,
                padding: "6px 8px",
              }}
            >
              <span style={{ width: 18, height: 18, borderRadius: 4, background: properties.color, border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: FIGMA.textPrimary, fontFamily: "monospace" }}>{properties.color}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, background: FIGMA.inputBg, border: `1px solid ${FIGMA.inputBorder}`, borderRadius: 5, padding: "6px 8px" }}>
              <span style={{ fontSize: 11, color: FIGMA.textMuted, fontWeight: 600 }}>Radio</span>
              <span style={{ fontSize: 12, color: FIGMA.textPrimary }}>{properties.radius}</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, background: FIGMA.inputBg, border: `1px solid ${FIGMA.inputBorder}`, borderRadius: 5, padding: "6px 8px" }}>
              <span style={{ fontSize: 11, color: FIGMA.textMuted, fontWeight: 600 }}>Opac.</span>
              <span style={{ fontSize: 12, color: FIGMA.textPrimary }}>{properties.opacity}%</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
