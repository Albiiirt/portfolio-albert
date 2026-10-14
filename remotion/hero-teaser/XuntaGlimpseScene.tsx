import { AbsoluteFill, useCurrentFrame } from "remotion";
import { GNOSS } from "../xunta/tokens";
import { BrowserFrame, FacetSidebar, GnossHeader, ResultRow, SearchBar } from "../xunta/ui";
import { SimCursor, type CursorHop } from "../xunta/Cursor";
import { TERMINOS } from "../xunta/data";

export const XUNTA_GLIMPSE_DURATION = 55;

// ── Scene 4 — Xunta glimpse, 55 frames (~1.8s): a single flat click (no
// tilt, no scroll — "the only 3D in the teaser" per spec is Bullipedia's
// BookCover) on a trimmed Términos screen, reusing remotion/xunta/ui.tsx's
// own pieces (GnossHeader, FacetSidebar, ResultRow, SearchBar) and
// remotion/xunta/Cursor.tsx's SimCursor, the same two modules
// remotion/xunta/scenes.tsx itself is built from.
const F = { clickLand: 30 };
const ROWS = TERMINOS.slice(0, 4);

export function XuntaGlimpseScene() {
  const frame = useCurrentFrame();
  const activeEstado = frame >= F.clickLand ? "pendiente" : "revision";
  const flashing = frame - F.clickLand >= 0 && frame - F.clickLand < 10;

  const hops: CursorHop[] = [
    { from: { x: 55, y: 15 }, to: { x: 55, y: 15 }, fromFrame: 0, toFrame: 10 },
    { from: { x: 55, y: 15 }, to: { x: 9.25, y: 29.5 }, fromFrame: 10, toFrame: F.clickLand, click: true },
  ];

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "48px 150px", background: GNOSS.grisFondo }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <BrowserFrame url="unificador.xunta.gal/terminos">
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <GnossHeader tab="terminos" trabajoCount={13} />
            <div style={{ display: "flex", gap: 28, padding: "22px 32px", flex: 1, minHeight: 0 }}>
              <FacetSidebar activeEstado={activeEstado} flashing={flashing} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
                <SearchBar value="" caret={false} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {ROWS.map((t) => (
                    <ResultRow key={t.id} nombre={t.nombre} idControl={t.ficha.idControl} fuente={t.fuente} estado={t.estado} isGrupo={Boolean(t.grupoId)} />
                  ))}
                </div>
              </div>
            </div>
            <SimCursor hops={hops} />
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
}
