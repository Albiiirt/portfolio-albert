import { AbsoluteFill, Img, staticFile } from "remotion";
import { SimCursor, type CursorHop } from "../shared/Cursor";
import { MIRAZUR } from "./tokens";

export const MIRAZUR_GLIMPSE_DURATION = 55;

// ── Mirazur glimpse (new vertical, mirrors remotion/madrid's "real site,
// real screenshot" pattern) — minimal scenes.tsx per spec: one real capture
// (public/screenshots/mirazur-cupon-walkthrough/15-formulario-cupon-
// escribiendo.jpg, 1568×662, already picked by Albert as the clearest
// click→consequence shot: the Nombre field mid-typed, "Albert"), one
// SimCursor hop measured directly off the JPEG (same method as
// remotion/madrid/scenes.tsx's own comment describes), reusing
// remotion/shared/Cursor.tsx directly rather than inventing a cursor.
const SHOT_W = 1568;
const SHOT_H = 662;
const SRC = "screenshots/mirazur-cupon-walkthrough/15-formulario-cupon-escribiendo.jpg";
const URL = "dosgrapas.com/files/mirazur/";

// Measured off the JPEG: the cursor tip sits just right of "Albert" inside
// the NOM input, at roughly (50.3%, 60.7%) of the screenshot's own pixel
// grid — arriving there is what's "already true" in the capture.
const CLICK_TARGET = { x: 50.3, y: 60.7 };
const F = { clickLand: 32 };

function ShotFrame({ children }: { children: React.ReactNode }) {
  const width = 1640;
  const height = (width * SHOT_H) / SHOT_W;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: MIRAZUR.gradient }}>
      <div
        style={{
          position: "relative",
          width,
          height: height + 56,
          borderRadius: 22,
          border: "1.5px solid rgba(255,255,255,0.16)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 20px 60px rgba(0,0,0,0.5)",
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "14px 20px",
            height: 56,
            flexShrink: 0,
            background: "rgba(10,14,6,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef5f57" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f6bd3b" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#62c655" }} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.08)", borderRadius: 100, padding: "6px 22px" }}>{URL}</span>
          </div>
          <div style={{ width: 43 }} />
        </div>
        <div style={{ position: "relative", width, height, overflow: "hidden" }}>{children}</div>
      </div>
    </AbsoluteFill>
  );
}

export function MirazurGlimpseScene() {
  const hops: CursorHop[] = [
    { from: { x: 20, y: 25 }, to: { x: 20, y: 25 }, fromFrame: 0, toFrame: 10 },
    { from: { x: 20, y: 25 }, to: CLICK_TARGET, fromFrame: 10, toFrame: F.clickLand, click: true },
  ];

  return (
    <ShotFrame>
      <Img
        src={staticFile(SRC)}
        alt="Formulario del cupón de Mirazur, campo Nombre con texto escrito"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <SimCursor hops={hops} />
    </ShotFrame>
  );
}
